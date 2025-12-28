import { useState, useEffect } from 'react';
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
import { useToast } from '@/hooks/use-toast';
import {
  CheckCircle,
  RefreshCw,
  Square,
  CircleDot,
  Zap,
  Ruler,
  Loader2,
} from 'lucide-react';

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
  door_count: number;
  door_positions: any[];
  ceiling_fan_count: number;
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

// Mock analysis data for demo
const mockAnalysis: Omit<RoomAnalysis, 'id' | 'room_id'> = {
  window_count: 2,
  window_positions: [
    { position: 'North Wall', size: '4x5 ft' },
    { position: 'East Wall', size: '3x4 ft' }
  ],
  door_count: 1,
  door_positions: [
    { position: 'South Wall', height: '7 ft', type: 'Entry' }
  ],
  ceiling_fan_count: 1,
  outlet_count: 4,
  other_features: [
    { type: 'AC Unit', position: 'West Wall' }
  ],
  detected_length_feet: 15,
  detected_width_feet: 12,
  detected_height_feet: 10,
  measurement_confidence: 87.5,
  suggested_styles: [
    { name: 'Modern Minimalist', confidence: 92, description: 'Clean lines and neutral tones' },
    { name: 'Contemporary Indian', confidence: 85, description: 'Blend of modern and traditional' },
    { name: 'Scandinavian', confidence: 78, description: 'Light, airy with natural materials' }
  ],
  selected_style: null,
  is_verified: false,
};

export function PhaseAnalyze({ room, projectId }: PhaseAnalyzeProps) {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [isEditingMeasurements, setIsEditingMeasurements] = useState(false);
  const [measurements, setMeasurements] = useState({
    length: room.length_feet || 0,
    width: room.width_feet || 0,
    height: room.height_feet || 0,
  });
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);

  // Fetch analysis
  const { data: analysis, isLoading } = useQuery({
    queryKey: ['room-analysis', room.id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('room_analysis')
        .select('*')
        .eq('room_id', room.id)
        .maybeSingle();
      
      if (error) throw error;
      
      // If no analysis exists, return mock data for demo
      if (!data) {
        return { ...mockAnalysis, id: 'mock', room_id: room.id };
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

  // Update selected style when analysis loads
  useEffect(() => {
    if (analysis?.selected_style) {
      setSelectedStyle(analysis.selected_style);
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
          })
          .eq('room_id', room.id);
        if (error) throw error;
      } else {
        // Create new
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
            window_count: mockAnalysis.window_count,
            door_count: mockAnalysis.door_count,
            ceiling_fan_count: mockAnalysis.ceiling_fan_count,
            outlet_count: mockAnalysis.outlet_count,
            measurement_confidence: mockAnalysis.measurement_confidence,
            suggested_styles: mockAnalysis.suggested_styles as unknown as any,
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['room-analysis', room.id] });
      queryClient.invalidateQueries({ queryKey: ['room', room.id] });
      toast({ title: 'Analysis verified', description: 'Moving to Phase 3: Clean' });
    },
    onError: (error: Error) => {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    },
  });

  if (isLoading) {
    return <PhaseAnalyzeSkeleton />;
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
        <h4 className="font-medium text-sm flex items-center gap-2">
          <Square className="h-4 w-4" />
          Architectural Features
        </h4>
        <div className="grid grid-cols-2 gap-3">
          <FeatureCard 
            label="Windows" 
            value={analysis?.window_count || 0}
            details={analysis?.window_positions}
          />
          <FeatureCard 
            label="Doors" 
            value={analysis?.door_count || 0}
            details={analysis?.door_positions}
          />
          <FeatureCard 
            label="Ceiling Fans" 
            value={analysis?.ceiling_fan_count || 0}
          />
          <FeatureCard 
            label="Outlets" 
            value={analysis?.outlet_count || 0}
          />
        </div>
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
        
        <RadioGroup value={selectedStyle || ''} onValueChange={setSelectedStyle}>
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

      {/* Actions */}
      <div className="pt-4 border-t space-y-2">
        <Button 
          className="w-full" 
          onClick={() => verifyAnalysis.mutate()}
          disabled={verifyAnalysis.isPending || analysis?.is_verified}
        >
          {verifyAnalysis.isPending ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <CheckCircle className="mr-2 h-4 w-4" />
          )}
          {analysis?.is_verified ? 'Verified' : 'Verify & Approve'}
        </Button>
        <Button variant="outline" className="w-full">
          <RefreshCw className="mr-2 h-4 w-4" />
          Re-analyze
        </Button>
      </div>
    </div>
  );
}

function FeatureCard({ 
  label, 
  value, 
  details 
}: { 
  label: string; 
  value: number; 
  details?: any[];
}) {
  return (
    <div className="p-3 rounded-lg bg-muted/50 border">
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
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
