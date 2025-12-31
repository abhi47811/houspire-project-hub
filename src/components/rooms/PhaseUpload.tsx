import { useState, useRef, useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CheckCircle2, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { ImageUpload } from './ImageUpload';
import { ImageViewer } from './ImageViewer';
import { PhaseUploadSkeleton } from './PhaseSkeletons';
import { useToast } from '@/hooks/use-toast';
import { useEnhancedKeyboardShortcuts, getShortcutHint, SHORTCUTS } from '@/hooks/useEnhancedKeyboardShortcuts';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useRoomAnalysis } from '@/hooks/useRoomAnalysis';

interface Room {
  id: string;
  current_phase: number | null;
  phase_1_completed: boolean | null;
}

interface PhaseUploadProps {
  room: Room;
  projectId: string;
  onPhaseComplete?: () => void;
}

export function PhaseUpload({ room, projectId, onPhaseComplete }: PhaseUploadProps) {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const [uploadComplete, setUploadComplete] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // AI Room Analysis Hook
  const { analysisResult, isAnalyzing, analyzeImage } = useRoomAnalysis(room.id);

  const { data: existingImage, isLoading: isLoadingImage } = useQuery({
    queryKey: ['room-images', room.id, 1, 'original'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('room_images')
        .select('*')
        .eq('room_id', room.id)
        .eq('phase', 1)
        .eq('image_type', 'original')
        .maybeSingle();

      if (error) throw error;
      return data;
    },
  });

  const hasImage = !!existingImage || uploadComplete;

  // Show skeleton while loading initial data
  if (isLoadingImage) {
    return <PhaseUploadSkeleton />;
  }

  // Keyboard shortcut: trigger file picker
  const triggerUpload = useCallback(() => {
    // Try to click the hidden file input in ImageUpload
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    fileInput?.click();
  }, []);

  // Keyboard shortcut: continue to analysis
  const handleKeyboardContinue = useCallback(() => {
    if (hasImage && !isLoading) {
      handleContinue();
    }
  }, [hasImage, isLoading]);

  // Register keyboard shortcuts
  useEnhancedKeyboardShortcuts({
    onUpload: triggerUpload,
    onContinue: handleKeyboardContinue,
  });

  const handleUploadComplete = (imageUrl: string) => {
    setUploadComplete(true);
    queryClient.invalidateQueries({ queryKey: ['room', room.id] });
    queryClient.invalidateQueries({ queryKey: ['room-images', room.id] });
    
    // Trigger AI analysis automatically
    if (imageUrl) {
      analyzeImage.mutate({ imageUrl });
    }
  };

  const handleContinue = async () => {
    setIsLoading(true);
    
    try {
      const { error } = await supabase
        .from('rooms')
        .update({ 
          current_phase: Math.max(room.current_phase || 1, 2),
          phase_1_completed: true,
          updated_at: new Date().toISOString(),
        })
        .eq('id', room.id);
      
      if (error) throw error;
      
      // Fix: Use correct query key
      queryClient.invalidateQueries({ queryKey: ['room', room.id] });
      
      toast({
        title: 'Moving to Analysis',
        description: 'Proceeding to Phase 2...',
      });
      
      onPhaseComplete?.();
      
    } catch (error) {
      console.error('Error continuing to analysis:', error);
      toast({
        title: 'Error',
        description: 'Failed to continue. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold">Phase 1: Upload</h3>
          {hasImage && (
            <CheckCircle2 className="h-5 w-5 text-green-500" />
          )}
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Upload room images for analysis
        </p>
      </div>

      {/* Upload or View Area */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <p className="text-sm font-medium mb-2">Upload Image</p>
          <ImageUpload
            projectId={projectId}
            roomId={room.id}
            phase={1}
            imageType="original"
            targetResolution={1024}
            onUploadComplete={handleUploadComplete}
          />
        </div>

        {hasImage && (
          <div>
            <p className="text-sm font-medium mb-2">Preview</p>
            <ImageViewer
              roomId={room.id}
              phase={1}
              imageType="original"
              showControls={true}
            />
          </div>
        )}
      </div>

      {/* AI Analysis Results */}
      {isAnalyzing && (
        <Card className="border-primary/50 bg-primary/5">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
              <div>
                <p className="font-medium">Analyzing Room...</p>
                <p className="text-sm text-muted-foreground">
                  AI is detecting doors, windows, and estimating dimensions
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {analysisResult && !isAnalyzing && (
        <Card className="border-green-500/50 bg-green-50 dark:bg-green-950/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Sparkles className="h-5 w-5 text-green-600" />
              AI Analysis Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Room Type */}
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Room Type</p>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-base">
                  {analysisResult.room_type.replace('_', ' ').toUpperCase()}
                </Badge>
                <Badge variant="outline">
                  {analysisResult.confidence}% confidence
                </Badge>
              </div>
            </div>

            {/* Detected Features */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Doors</p>
                <Badge variant="secondary" className="text-base">
                  {analysisResult.detected_features.doors.reduce((sum, d) => sum + d.count, 0)}
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Windows</p>
                <Badge variant="secondary" className="text-base">
                  {analysisResult.detected_features.windows.reduce((sum, w) => sum + w.count, 0)}
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Length</p>
                <Badge variant="outline" className="text-base">
                  {analysisResult.dimensions.length_feet} ft
                </Badge>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Width</p>
                <Badge variant="outline" className="text-base">
                  {analysisResult.dimensions.width_feet} ft
                </Badge>
              </div>
            </div>

            {/* Dimensions Details */}
            <div className="space-y-2 text-sm">
              <p className="font-medium">Estimated Dimensions:</p>
              <div className="grid grid-cols-2 gap-2 text-muted-foreground">
                <div className="flex justify-between">
                  <span>Length:</span>
                  <span className="font-medium text-foreground">{analysisResult.dimensions.length_feet} ft</span>
                </div>
                <div className="flex justify-between">
                  <span>Width:</span>
                  <span className="font-medium text-foreground">{analysisResult.dimensions.width_feet} ft</span>
                </div>
                <div className="flex justify-between">
                  <span>Height:</span>
                  <span className="font-medium text-foreground">{analysisResult.dimensions.height_feet} ft</span>
                </div>
                <div className="flex justify-between">
                  <span>Area:</span>
                  <span className="font-medium text-foreground">{analysisResult.dimensions.area_sqft} sq ft</span>
                </div>
              </div>
            </div>

            {/* Room Analysis Complete */}
            <div className="text-sm text-muted-foreground">
              Room analysis complete. Proceed to the next phase.
            </div>
            )}

            {/* Lighting Analysis */}
            {analysisResult.lighting && (
              <div className="text-sm space-y-1">
                <p className="font-medium">Lighting Analysis:</p>
                <div className="flex gap-2">
                  <Badge variant="outline">
                    Natural: {analysisResult.lighting.natural_light_level}
                  </Badge>
                  <Badge variant="outline">
                    Quality: {(analysisResult.lighting as any).overall_quality || 'N/A'}
                  </Badge>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Guidelines */}
      <div className="space-y-2 text-sm bg-muted/50 rounded-lg p-4">
        <h4 className="font-medium">Image Guidelines:</h4>
        <ul className="list-disc list-inside text-muted-foreground space-y-1">
          <li>Upload clear, well-lit photos</li>
          <li>Capture all walls and corners</li>
          <li>Include windows and doors</li>
          <li>Supported formats: JPG, PNG, WebP</li>
          <li>Max file size: 10MB (will be resized to 1024×1024)</li>
        </ul>
      </div>

      {/* Actions */}
      <div className="pt-4 border-t flex justify-end gap-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              variant="outline"
              onClick={triggerUpload}
              disabled={isLoading}
            >
              Upload Image
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Upload Image ({getShortcutHint(SHORTCUTS.upload)})</p>
          </TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button 
              onClick={handleContinue}
              disabled={!hasImage || isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  Continue to Analysis
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Continue ({getShortcutHint(SHORTCUTS.continue)})</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
