import { useState, useEffect, useRef, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useEnhancedKeyboardShortcuts, getShortcutHint, SHORTCUTS } from '@/hooks/useEnhancedKeyboardShortcuts';
import { useProjectStyle } from '@/hooks/useProjectStyle';
import { useApplyStyleToAllRooms } from '@/hooks/useBulkOperations';
import { StyleConflictDialog } from '@/components/dialogs/StyleConflictDialog';
import { handleApiError } from '@/lib/api-error';
import {
  CheckCircle,
  RefreshCw,
  Square,
  CircleDot,
  Zap,
  Ruler,
  Loader2,
  Pencil,
  X,
  Clock,
  AlertCircle,
  SkipForward,
} from 'lucide-react';
import { visionService } from '@/services/api';

const ANALYSIS_TIMEOUT_MS = 90000; // 90 second timeout

interface Room {
  id: string;
  current_phase: number;
  phase_2_completed: boolean;
  length_feet: number | null;
  width_feet: number | null;
  height_feet: number | null;
}

interface RoomAnalysis {
  id: string;
  room_id: string;
  window_count: number;
  window_positions: any[];
  mirror_count?: number;
  mirror_positions?: any[];
  door_count: number;
  door_positions: any[];
  ceiling_fan_count: number;
  ac_unit_count?: number;
  outlet_count: number;
  other_features: any[];
  detected_length_feet: number | null;
  detected_width_feet: number | null;
  detected_height_feet: number | null;
  measurement_confidence: number | null;
  suggested_styles: SuggestedStyle[];
  selected_style: string | null;
  is_verified: boolean;
}

interface SuggestedStyle {
  name: string;
  confidence: number;
  description?: string;
}

interface PhaseAnalyzeProps {
  room: Room;
  projectId: string;
}

// Removed mock data - now showing proper error states when analysis is missing

export function PhaseAnalyze({ room, projectId }: PhaseAnalyzeProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [isEditingMeasurements, setIsEditingMeasurements] = useState(false);
  const [isEditingFeatures, setIsEditingFeatures] = useState(false);
  const [measurements, setMeasurements] = useState({
    length: room.length_feet || 0,
    width: room.width_feet || 0,
    height: room.height_feet || 0,
  });
  const [features, setFeatures] = useState({
    windowCount: 0,
    mirrorCount: 0,
    doorCount: 0,
    ceilingFanCount: 0,
    acUnitCount: 0,
    outletCount: 0,
  });
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  
  // Project style conflict detection
  const { 
    checkAndConfirmStyle, 
    conflictDialog, 
    closeConflictDialog,
    refetch: refetchProjectStyles 
  } = useProjectStyle(projectId, room.id);
  const applyStyleToAll = useApplyStyleToAllRooms();
  
  // Analysis timing state
  const [analysisStartTime, setAnalysisStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const abortControllerRef = useRef<AbortController | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Fetch analysis - returns null if none exists (no mock data)
  const { data: analysis, isLoading, error: queryError } = useQuery({
    queryKey: ['room-analysis', room.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('room_analysis')
        .select('*')
        .eq('room_id', room.id)
        .maybeSingle();
      
      if (error) throw error;
      
      // Return null if no analysis exists - don't use mock data
      if (!data) {
        // Log in development for debugging
        if (import.meta.env.DEV) {
          console.warn('⚠️ Room analysis missing for room:', room.id);
        }
        return null;
      }
      
      // Parse suggested_styles if it's a JSON string
      const suggestedStyles = Array.isArray(data.suggested_styles) 
        ? (data.suggested_styles as unknown as SuggestedStyle[])
        : [];
      
      return {
        ...data,
        suggested_styles: suggestedStyles,
      } as RoomAnalysis;
    },
  });

  // Update selected style and features when analysis loads
  useEffect(() => {
    if (analysis?.selected_style) {
      setSelectedStyle(analysis.selected_style);
    }
    if (analysis) {
      setFeatures({
        windowCount: analysis.window_count || 0,
        mirrorCount: analysis.mirror_count || 0,
        doorCount: analysis.door_count || 0,
        ceilingFanCount: analysis.ceiling_fan_count || 0,
        acUnitCount: analysis.ac_unit_count || 0,
        outletCount: analysis.outlet_count || 0,
      });
    }
  }, [analysis]);

  // Submit cleaning job helper
  const submitCleaningJob = async () => {
    try {
      const { error } = await supabase.functions.invoke('process-room-phase', {
        body: {
          action: 'submit',
          roomId: room.id,
          projectId,
          jobType: 'cleaning',
          payload: { mask: 'full_image' }
        }
      });
      if (error) {
        console.error('Failed to submit cleaning job:', error);
        toast({ 
          title: 'Warning', 
          description: 'Cleaning job submission failed. You can start it manually in Phase 3.',
          variant: 'destructive'
        });
      } else {
        toast({ 
          title: 'Cleaning job submitted', 
          description: 'AI cleaning will begin shortly...'
        });
      }
    } catch (err) {
      console.error('Error submitting cleaning job:', err);
    }
  };

  // Start elapsed time timer
  const startTimer = useCallback(() => {
    setAnalysisStartTime(Date.now());
    setElapsedTime(0);
    timerRef.current = setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);
  }, []);

  // Stop elapsed time timer
  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setAnalysisStartTime(null);
  }, []);

  // Cancel analysis
  const cancelAnalysis = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    stopTimer();
    toast({ title: 'Analysis cancelled', description: 'You can try again when ready.' });
  }, [stopTimer, toast]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, []);

  // Ref for tracking if auto-analysis was triggered
  const hasTriggeredAutoAnalysis = useRef(false);

  // Re-analyze room using AI
  const reAnalyze = useMutation({
    mutationFn: async () => {
      // Create abort controller for timeout
      abortControllerRef.current = new AbortController();
      startTimer();
      
      // Set timeout
      const timeoutId = setTimeout(() => {
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }
      }, ANALYSIS_TIMEOUT_MS);
      
      try {
        // Get the original uploaded image URL from room_images
        const { data: imageData, error: imageError } = await supabase
          .from('room_images')
          .select('storage_path')
          .eq('room_id', room.id)
          .eq('image_type', 'original')
          .order('created_at', { ascending: false })
          .limit(1)
          .maybeSingle();
        
        if (imageError) throw imageError;
        if (!imageData?.storage_path) {
          throw new Error('No uploaded image found. Please upload an image first.');
        }
        
        // Build full URL for the image
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const imageUrl = imageData.storage_path.startsWith('http') 
          ? imageData.storage_path 
          : `${supabaseUrl}/storage/v1/object/public/room-images/${imageData.storage_path}`;
        
        // Call vision AI service
        const response = await visionService.analyzeRoom(imageUrl, projectId, room.id);
        
        // Cast to any since API response has different shape than DB type
        const result = response.result as any;
        
        // Upsert results to room_analysis - now including mirror and AC fields
        const analysisData = {
          room_id: room.id,
          window_count: result.window_count ?? 0,
          mirror_count: result.mirror_count ?? 0,
          mirror_positions: result.mirror_positions ?? [],
          door_count: result.door_count ?? 0,
          ceiling_fan_count: result.ceiling_fan_count ?? 0,
          ac_unit_count: result.ac_unit_count ?? 0,
          outlet_count: result.outlet_count ?? 0,
          detected_length_feet: result.dimensions?.length_feet ?? null,
          detected_width_feet: result.dimensions?.width_feet ?? null,
          detected_height_feet: result.dimensions?.height_feet ?? null,
          measurement_confidence: result.measurement_confidence ?? null,
          window_positions: result.window_positions ?? [],
          door_positions: result.door_positions ?? [],
          other_features: result.other_features ?? [],
          suggested_styles: result.suggested_styles ?? [],
          is_verified: false,
        };
        
        // Check if record exists
        const { data: existing } = await supabase
          .from('room_analysis')
          .select('id')
          .eq('room_id', room.id)
          .maybeSingle();
        
        if (existing) {
          const { error } = await supabase
            .from('room_analysis')
            .update(analysisData)
            .eq('room_id', room.id);
          if (error) throw error;
        } else {
          const { error } = await supabase
            .from('room_analysis')
            .insert([analysisData]);
          if (error) throw error;
        }
        
        // Update local state with new features
        setFeatures({
          windowCount: result.window_count ?? 0,
          mirrorCount: result.mirror_count ?? 0,
          doorCount: result.door_count ?? 0,
          ceilingFanCount: result.ceiling_fan_count ?? 0,
          acUnitCount: result.ac_unit_count ?? 0,
          outletCount: result.outlet_count ?? 0,
        });
        
        if (result.dimensions) {
          setMeasurements({
            length: result.dimensions.length_feet ?? 0,
            width: result.dimensions.width_feet ?? 0,
            height: result.dimensions.height_feet ?? 0,
          });
        }
        
        return result;
      } finally {
        clearTimeout(timeoutId);
        stopTimer();
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['room-analysis', room.id] });
      toast({ 
        title: 'Analysis complete', 
        description: `Room analyzed in ${elapsedTime}s. Review and adjust if needed.` 
      });
    },
    onError: (error: Error) => {
      stopTimer();
      if (error.name === 'AbortError' || error.message.includes('aborted')) {
        toast({ title: 'Analysis timed out', description: 'Try again or check your connection.', variant: 'destructive' });
      } else {
        handleApiError(error, { showToast: true });
      }
    },
  });

  // Auto-trigger analysis when entering phase 2 without existing analysis
  useEffect(() => {
    // Only auto-trigger if:
    // 1. Loading is complete
    // 2. No analysis exists
    // 3. Not already analyzing
    // 4. Haven't already triggered in this session
    // 5. Room is at phase 2
    if (
      !isLoading && 
      !analysis && 
      !reAnalyze.isPending && 
      !hasTriggeredAutoAnalysis.current &&
      room.current_phase >= 2
    ) {
      hasTriggeredAutoAnalysis.current = true;
      console.log('Auto-triggering analysis for room:', room.id);
      reAnalyze.mutate();
    }
  }, [isLoading, analysis, reAnalyze.isPending, room.id, room.current_phase, reAnalyze]);

  // Verify analysis mutation
  const verifyAnalysis = useMutation({
    mutationFn: async () => {
      // Check if analysis record exists
      const { data: existing } = await supabase
        .from('room_analysis')
        .select('id')
        .eq('room_id', room.id)
        .maybeSingle();

      if (existing) {
        // Update existing
        const { error } = await supabase
          .from('room_analysis')
          .update({
            is_verified: true,
            verified_at: new Date().toISOString(),
            verified_by: user?.id,
            selected_style: selectedStyle,
            detected_length_feet: measurements.length,
            detected_width_feet: measurements.width,
            detected_height_feet: measurements.height,
            window_count: features.windowCount,
            mirror_count: features.mirrorCount,
            door_count: features.doorCount,
            ceiling_fan_count: features.ceilingFanCount,
            ac_unit_count: features.acUnitCount,
            outlet_count: features.outletCount,
          })
          .eq('room_id', room.id);
        if (error) throw error;
      } else {
        // Create new - use current state values (no mock data)
        const { error } = await supabase
          .from('room_analysis')
          .insert([{
            room_id: room.id,
            is_verified: true,
            verified_at: new Date().toISOString(),
            verified_by: user?.id,
            selected_style: selectedStyle,
            detected_length_feet: measurements.length,
            detected_width_feet: measurements.width,
            detected_height_feet: measurements.height,
            window_count: features.windowCount,
            mirror_count: features.mirrorCount,
            door_count: features.doorCount,
            ceiling_fan_count: features.ceilingFanCount,
            ac_unit_count: features.acUnitCount,
            outlet_count: features.outletCount,
            measurement_confidence: null,
            suggested_styles: [],
          }]);
        if (error) throw error;
      }

      // Update room phase
      const { error: roomError } = await supabase
        .from('rooms')
        .update({
          phase_2_completed: true,
          current_phase: 3,
          length_feet: measurements.length,
          width_feet: measurements.width,
          height_feet: measurements.height,
          selected_style: selectedStyle,
        })
        .eq('id', room.id);
      if (roomError) throw roomError;

      // Auto-submit cleaning job
      await submitCleaningJob();
    },
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ['room-analysis', room.id] });
      queryClient.invalidateQueries({ queryKey: ['room', room.id] });
      
      // Log activity for analysis verification
      try {
        await supabase.rpc('log_project_activity', {
          p_project_id: projectId,
          p_user_id: user?.id,
          p_activity_type: 'analysis_verified',
          p_description: `Room analysis verified with style: ${selectedStyle || 'None'}`,
          p_room_id: room.id,
        });
      } catch (err) {
        console.error('Failed to log activity:', err);
      }
      
      toast({ title: 'Analysis verified', description: 'Moving to Phase 3: Clean' });
    },
    onError: (error: Error) => {
      handleApiError(error, { showToast: true });
    },
  });

  // Keyboard shortcut handlers - must be after verifyAnalysis is defined
  const handleKeyboardContinue = useCallback(() => {
    if (!verifyAnalysis.isPending && !analysis?.is_verified && !reAnalyze.isPending) {
      verifyAnalysis.mutate();
    }
  }, [verifyAnalysis, analysis?.is_verified, reAnalyze.isPending]);

  const handleKeyboardRegenerate = useCallback(() => {
    if (!reAnalyze.isPending) {
      reAnalyze.mutate();
    }
  }, [reAnalyze]);

  // Register keyboard shortcuts
  useEnhancedKeyboardShortcuts({
    onContinue: handleKeyboardContinue,
    onRegenerate: handleKeyboardRegenerate,
  });

  // Skip analysis and proceed to next phase
  const skipAnalysis = async () => {
    try {
      await supabase
        .from('rooms')
        .update({
          phase_2_completed: true,
          current_phase: 3,
        })
        .eq('id', room.id);
      
      queryClient.invalidateQueries({ queryKey: ['room', room.id] });
      toast({
        title: 'Analysis Skipped',
        description: 'Proceeding to Phase 3. Results may vary without analysis data.',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to skip analysis',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return <PhaseAnalyzeSkeleton />;
  }

  // Show error/missing state when no analysis exists
  if (queryError || !analysis) {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold">Phase 2: Analyze</h3>
          <p className="text-sm text-muted-foreground mt-1">
            AI-powered room analysis
          </p>
        </div>
        
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Analysis Not Available</AlertTitle>
          <AlertDescription>
            {queryError 
              ? `Error loading analysis: ${queryError.message}`
              : 'Room analysis data is missing. This could mean the analysis wasn\'t run yet or failed to complete.'
            }
          </AlertDescription>
        </Alert>
        
        <div className="text-sm space-y-2 text-muted-foreground">
          <p className="font-medium">Possible reasons:</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Analysis was never started</li>
            <li>Image quality too low for detection</li>
            <li>Room not clearly visible in image</li>
            <li>Network connection issue during analysis</li>
          </ul>
        </div>
        
        <div className="flex gap-2 pt-4 border-t">
          {reAnalyze.isPending ? (
            <div className="flex-1 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Analyzing...
                </span>
                <span className="flex items-center gap-1 text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {elapsedTime}s
                </span>
              </div>
              <Progress value={(elapsedTime / (ANALYSIS_TIMEOUT_MS / 1000)) * 100} className="h-2" />
              <Button 
                variant="outline" 
                size="sm"
                className="w-full"
                onClick={cancelAnalysis}
              >
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
            </div>
          ) : (
            <>
              <Button 
                className="flex-1"
                onClick={() => reAnalyze.mutate()}
                disabled={reAnalyze.isPending}
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Run Analysis
              </Button>
              <Button 
                variant="outline"
                onClick={skipAnalysis}
              >
                <SkipForward className="mr-2 h-4 w-4" />
                Skip & Continue
              </Button>
            </>
          )}
        </div>
      </div>
    );
  }

  const area = measurements.length * measurements.width;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Phase 2: Analyze</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Review detected features and measurements
        </p>
      </div>

      {/* Architectural Features */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-sm flex items-center gap-2">
            <Square className="h-4 w-4" />
            Architectural Features
          </h4>
          <div className="flex items-center gap-2">
            <Label htmlFor="edit-features" className="text-xs">Adjust</Label>
            <Switch
              id="edit-features"
              checked={isEditingFeatures}
              onCheckedChange={setIsEditingFeatures}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <EditableFeatureCard 
            label="Windows" 
            value={features.windowCount}
            isEditing={isEditingFeatures}
            onChange={(val) => setFeatures(prev => ({ ...prev, windowCount: val }))}
          />
          <EditableFeatureCard 
            label="Mirrors" 
            value={features.mirrorCount}
            isEditing={isEditingFeatures}
            onChange={(val) => setFeatures(prev => ({ ...prev, mirrorCount: val }))}
          />
          <EditableFeatureCard 
            label="Doors" 
            value={features.doorCount}
            isEditing={isEditingFeatures}
            onChange={(val) => setFeatures(prev => ({ ...prev, doorCount: val }))}
          />
          <EditableFeatureCard 
            label="Ceiling Fans" 
            value={features.ceilingFanCount}
            isEditing={isEditingFeatures}
            onChange={(val) => setFeatures(prev => ({ ...prev, ceilingFanCount: val }))}
          />
          <EditableFeatureCard 
            label="AC Units" 
            value={features.acUnitCount}
            isEditing={isEditingFeatures}
            onChange={(val) => setFeatures(prev => ({ ...prev, acUnitCount: val }))}
          />
          <EditableFeatureCard 
            label="Outlets" 
            value={features.outletCount}
            isEditing={isEditingFeatures}
            onChange={(val) => setFeatures(prev => ({ ...prev, outletCount: val }))}
          />
        </div>
        {isEditingFeatures && (
          <p className="text-xs text-muted-foreground">
            <Pencil className="h-3 w-3 inline mr-1" />
            Adjust counts if AI detected incorrectly (e.g., mirrors counted as windows)
          </p>
        )}
      </div>

      {/* Measurements */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h4 className="font-medium text-sm flex items-center gap-2">
            <Ruler className="h-4 w-4" />
            Measurements
          </h4>
          <div className="flex items-center gap-2">
            <Label htmlFor="edit-measurements" className="text-xs">Adjust</Label>
            <Switch
              id="edit-measurements"
              checked={isEditingMeasurements}
              onCheckedChange={setIsEditingMeasurements}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <div>
            <Label className="text-xs text-muted-foreground">Length (ft)</Label>
            <Input
              type="number"
              value={measurements.length}
              onChange={(e) => setMeasurements(prev => ({ ...prev, length: parseFloat(e.target.value) || 0 }))}
              disabled={!isEditingMeasurements}
              className="h-9"
            />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Width (ft)</Label>
            <Input
              type="number"
              value={measurements.width}
              onChange={(e) => setMeasurements(prev => ({ ...prev, width: parseFloat(e.target.value) || 0 }))}
              disabled={!isEditingMeasurements}
              className="h-9"
            />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Height (ft)</Label>
            <Input
              type="number"
              value={measurements.height}
              onChange={(e) => setMeasurements(prev => ({ ...prev, height: parseFloat(e.target.value) || 0 }))}
              disabled={!isEditingMeasurements}
              className="h-9"
            />
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Area: <strong>{area.toFixed(0)} sq ft</strong></span>
          {analysis?.measurement_confidence && (
            <Badge variant="secondary" className="gap-1">
              <Zap className="h-3 w-3" />
              {analysis.measurement_confidence}% confidence
            </Badge>
          )}
        </div>
      </div>

      {/* Suggested Styles */}
      <div className="space-y-3">
        <h4 className="font-medium text-sm flex items-center gap-2">
          <CircleDot className="h-4 w-4" />
          Suggested Styles
        </h4>
        
        <RadioGroup 
          value={selectedStyle || ''} 
          onValueChange={async (newStyle) => {
            const previousStyle = selectedStyle;
            const action = await checkAndConfirmStyle(newStyle);
            
            if (action === 'cancel') {
              // Revert to previous style (user cancelled)
              return;
            }
            
            if (action === 'apply_all') {
              // Apply to all rooms in project
              try {
                await applyStyleToAll.mutateAsync({
                  projectId,
                  designStyle: newStyle,
                  userId: user?.id || '',
                });
                setSelectedStyle(newStyle);
                refetchProjectStyles();
                toast({
                  title: 'Style applied to all rooms',
                  description: `"${newStyle}" has been applied to all rooms in this project.`,
                });
              } catch (error) {
                toast({
                  title: 'Failed to apply style',
                  description: error instanceof Error ? error.message : 'Unknown error',
                  variant: 'destructive',
                });
              }
              return;
            }
            
            // Override: apply to this room only
            setSelectedStyle(newStyle);
          }}
        >
          <div className="space-y-2">
            {analysis?.suggested_styles?.map((style) => (
              <label
                key={style.name}
                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                  selectedStyle === style.name 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:bg-muted/50'
                }`}
              >
                <RadioGroupItem value={style.name} />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">{style.name}</span>
                    <Badge variant="outline" className="text-xs">
                      {style.confidence}%
                    </Badge>
                  </div>
                  {style.description && (
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {style.description}
                    </p>
                  )}
                </div>
              </label>
            ))}
          </div>
        </RadioGroup>
      </div>

      {/* Style Conflict Dialog */}
      <StyleConflictDialog
        open={conflictDialog.isOpen}
        onOpenChange={(open) => !open && closeConflictDialog()}
        newStyle={conflictDialog.newStyle}
        existingStyles={conflictDialog.existingStyles}
        dominantStyle={conflictDialog.dominantStyle}
        onResolve={conflictDialog.onResolve || (() => {})}
      />

      {/* Actions */}
      <div className="pt-4 border-t space-y-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              className="w-full" 
              onClick={() => verifyAnalysis.mutate()}
              disabled={verifyAnalysis.isPending || analysis?.is_verified || reAnalyze.isPending}
            >
              {verifyAnalysis.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <CheckCircle className="mr-2 h-4 w-4" />
              )}
              {analysis?.is_verified ? 'Verified' : 'Verify & Approve'}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Verify & Continue ({getShortcutHint(SHORTCUTS.continue)})</p>
          </TooltipContent>
        </Tooltip>
        
        {reAnalyze.isPending ? (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                Analyzing...
              </span>
              <span className="flex items-center gap-1 text-muted-foreground">
                <Clock className="h-3 w-3" />
                {elapsedTime}s
              </span>
            </div>
            <Progress value={(elapsedTime / (ANALYSIS_TIMEOUT_MS / 1000)) * 100} className="h-2" />
            <Button 
              variant="outline" 
              size="sm"
              className="w-full"
              onClick={cancelAnalysis}
            >
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
          </div>
        ) : (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => reAnalyze.mutate()}
                disabled={reAnalyze.isPending}
              >
                <RefreshCw className="mr-2 h-4 w-4" />
                Re-analyze
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Re-analyze ({getShortcutHint(SHORTCUTS.regenerate)})</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </div>
  );
}

function EditableFeatureCard({ 
  label, 
  value, 
  isEditing,
  onChange 
}: { 
  label: string; 
  value: number; 
  isEditing: boolean;
  onChange: (value: number) => void;
}) {
  return (
    <div className="p-3 rounded-lg bg-muted/50 border">
      {isEditing ? (
        <Input
          type="number"
          min={0}
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value) || 0)}
          className="h-8 text-lg font-bold w-full"
        />
      ) : (
        <div className="text-2xl font-bold">{value}</div>
      )}
      <div className="text-xs text-muted-foreground mt-1">{label}</div>
    </div>
  );
}

function PhaseAnalyzeSkeleton() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-4 w-48 mt-1" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        {[1, 2, 3, 4].map(i => (
          <Skeleton key={i} className="h-16 rounded-lg" />
        ))}
      </div>
      <div className="space-y-2">
        <Skeleton className="h-4 w-24" />
        <div className="grid grid-cols-3 gap-2">
          <Skeleton className="h-9" />
          <Skeleton className="h-9" />
          <Skeleton className="h-9" />
        </div>
      </div>
      <div className="space-y-2">
        {[1, 2, 3].map(i => (
          <Skeleton key={i} className="h-16 rounded-lg" />
        ))}
      </div>
    </div>
  );
}
