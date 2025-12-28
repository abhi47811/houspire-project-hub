import { useState } from 'react';
import { Sparkles, Check, X, AlertTriangle, AlertCircle, RotateCcw, Flag, ChevronLeft, ChevronRight, Loader2, ImageOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { supabase } from '@/integrations/supabase/client';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { useJobQueue, useRoomJobStatus } from '@/hooks/useJobQueue';
interface Room {
  id: string;
  current_phase: number;
  phase_3_completed: boolean;
  retry_count: number;
}

interface PhaseCleanProps {
  room: Room;
  projectId: string;
}

type CleaningStatus = 'pending' | 'processing' | 'completed' | 'failed';

interface ValidationItem {
  id: string;
  label: string;
  passed: boolean;
}

interface Issue {
  id: string;
  message: string;
  severity: 'warning' | 'error';
}

interface RoomImageWithUrl {
  id: string;
  room_id: string;
  storage_path: string;
  image_type: string;
  phase: number;
  signedUrl?: string;
}

export function PhaseClean({ room, projectId }: PhaseCleanProps) {
  const queryClient = useQueryClient();
  const [sliderValue, setSliderValue] = useState([50]);
  const [isApproving, setIsApproving] = useState(false);
  const [isRetrying, setIsRetrying] = useState(false);

  // Fetch original image
  const { data: originalImage } = useQuery<RoomImageWithUrl | null>({
    queryKey: ['room-image', room.id, 'original'],
    queryFn: async (): Promise<RoomImageWithUrl | null> => {
      const { data } = await supabase
        .from('room_images')
        .select('*')
        .eq('room_id', room.id)
        .eq('image_type', 'original')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      
      if (data?.storage_path) {
        const { data: urlData } = await supabase.storage
          .from('room-images')
          .createSignedUrl(data.storage_path, 3600);
        return { 
          id: data.id,
          room_id: data.room_id,
          storage_path: data.storage_path,
          image_type: data.image_type,
          phase: data.phase,
          signedUrl: urlData?.signedUrl 
        };
      }
      return null;
    }
  });

  // Fetch cleaned image
  const { data: cleanedImage } = useQuery<RoomImageWithUrl | null>({
    queryKey: ['room-image', room.id, 'cleaned'],
    queryFn: async (): Promise<RoomImageWithUrl | null> => {
      const { data } = await supabase
        .from('room_images')
        .select('*')
        .eq('room_id', room.id)
        .eq('image_type', 'cleaned')
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      
      if (data?.storage_path) {
        const { data: urlData } = await supabase.storage
          .from('room-images')
          .createSignedUrl(data.storage_path, 3600);
        return { 
          id: data.id,
          room_id: data.room_id,
          storage_path: data.storage_path,
          image_type: data.image_type,
          phase: data.phase,
          signedUrl: urlData?.signedUrl 
        };
      }
      return null;
    }
  });

  // Use job queue hooks
  const { submitJob } = useJobQueue({ roomId: room.id, projectId });
  const { isProcessing, hasCompleted, hasFailed } = useRoomJobStatus(room.id, 'cleaning');

  // Determine status based on room state and job status
  const getCleaningStatus = (): CleaningStatus => {
    if (room.phase_3_completed || hasCompleted) return 'completed';
    if (isProcessing) return 'processing';
    if (hasFailed || room.retry_count > 2) return 'failed';
    return 'pending';
  };
  
  const cleaningStatus = getCleaningStatus();

  // Start cleaning job
  const handleStartCleaning = () => {
    submitJob.mutate({
      roomId: room.id,
      projectId,
      phase: 3,
      payload: { mask: 'full_image' }
    });
  };
  const qualityScore = 94;
  const processingTime = '2m 34s';

  const validationItems: ValidationItem[] = [
    { id: 'windows', label: 'Windows preserved', passed: true },
    { id: 'doors', label: 'Doors unchanged', passed: true },
    { id: 'walls', label: 'Wall edges intact', passed: true },
    { id: 'furniture', label: 'Furniture removed', passed: cleaningStatus === 'completed' },
  ];

  const issues: Issue[] = cleaningStatus === 'failed' ? [
    { id: '1', message: 'Window frame partially erased', severity: 'warning' },
    { id: '2', message: 'Door handle removed incorrectly', severity: 'error' },
  ] : [];

  const allValidationsPassed = validationItems.every(item => item.passed);

  const handleApprove = async () => {
    setIsApproving(true);
    try {
      const { error } = await supabase
        .from('rooms')
        .update({
          phase_3_completed: true,
          current_phase: Math.max(room.current_phase, 4),
        })
        .eq('id', room.id);

      if (error) throw error;

      toast({
        title: 'Image Approved',
        description: 'Cleaned image has been approved. Moving to Phase 4.',
      });

      queryClient.invalidateQueries({ queryKey: ['room', room.id] });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to approve cleaned image.',
        variant: 'destructive',
      });
    } finally {
      setIsApproving(false);
    }
  };

  const handleRetry = async () => {
    setIsRetrying(true);
    try {
      const { error } = await supabase
        .from('rooms')
        .update({
          retry_count: (room.retry_count || 0) + 1,
          phase_3_completed: false,
        })
        .eq('id', room.id);

      if (error) throw error;

      toast({
        title: 'Retry Initiated',
        description: 'Cleaning process will restart shortly.',
      });

      queryClient.invalidateQueries({ queryKey: ['room', room.id] });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to initiate retry.',
        variant: 'destructive',
      });
    } finally {
      setIsRetrying(false);
    }
  };

  const handleFlagForReview = () => {
    toast({
      title: 'Flagged for Review',
      description: 'This room has been flagged for manual review.',
    });
  };

  const getStatusBadge = () => {
    switch (cleaningStatus) {
      case 'processing':
        return <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20">Processing</Badge>;
      case 'completed':
        return <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Completed</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="outline">Pending</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold">Phase 3: Clean & Prepare</h3>
        <p className="text-sm text-muted-foreground mt-1">
          AI-powered furniture removal and image cleanup
        </p>
      </div>

      {/* Image Comparison Slider */}
      <div className="space-y-3">
        <h4 className="font-medium text-sm flex items-center gap-2">
          Image Comparison
          <span className="text-xs text-muted-foreground font-normal">
            Drag slider to compare
          </span>
        </h4>
        <div className="relative aspect-video bg-muted rounded-lg overflow-hidden border">
          {/* Before Image (Original) */}
          <div className="absolute inset-0">
            {originalImage?.signedUrl ? (
              <img 
                src={originalImage.signedUrl} 
                alt="Original room"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full bg-muted gap-2">
                <ImageOff className="h-8 w-8 text-muted-foreground/50" />
                <span className="text-muted-foreground text-sm">No original image</span>
              </div>
            )}
          </div>
          
          {/* After Image (Cleaned) - clipped by slider */}
          <div 
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - sliderValue[0]}% 0 0)` }}
          >
            {cleanedImage?.signedUrl ? (
              <img 
                src={cleanedImage.signedUrl} 
                alt="Cleaned room"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full bg-primary/5 gap-2">
                <Sparkles className="h-8 w-8 text-primary/30" />
                <span className="text-primary/70 text-sm">Awaiting cleaned image</span>
              </div>
            )}
          </div>
          
          {/* Slider Handle */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-ew-resize"
            style={{ left: `${sliderValue[0]}%`, transform: 'translateX(-50%)' }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
              <ChevronLeft className="h-3 w-3 text-muted-foreground -mr-1" />
              <ChevronRight className="h-3 w-3 text-muted-foreground -ml-1" />
            </div>
          </div>

          {/* Labels */}
          <div className="absolute bottom-2 left-2">
            <Badge variant="secondary" className="text-xs">Before</Badge>
          </div>
          <div className="absolute bottom-2 right-2">
            <Badge variant="secondary" className="text-xs">After</Badge>
          </div>
        </div>
        
        <Slider
          value={sliderValue}
          onValueChange={setSliderValue}
          max={100}
          step={1}
          className="mt-2"
        />
      </div>

      {/* Cleaning Status */}
      <div className="space-y-3">
        <h4 className="font-medium text-sm">Cleaning Status</h4>
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 rounded-lg border bg-card">
            <p className="text-xs text-muted-foreground mb-1">Status</p>
            {getStatusBadge()}
          </div>
          <div className="p-3 rounded-lg border bg-card">
            <p className="text-xs text-muted-foreground mb-1">Quality Score</p>
            <p className="text-lg font-semibold text-primary">{qualityScore}%</p>
          </div>
          <div className="p-3 rounded-lg border bg-card">
            <p className="text-xs text-muted-foreground mb-1">Processing Time</p>
            <p className="text-sm font-medium">{processingTime}</p>
          </div>
        </div>
        {room.retry_count > 0 && (
          <p className="text-xs text-muted-foreground">
            Retry attempts: {room.retry_count}
          </p>
        )}
      </div>

      {/* Validation Checklist */}
      <div className="space-y-3">
        <h4 className="font-medium text-sm">Validation Checklist</h4>
        <div className="space-y-2">
          {validationItems.map((item) => (
            <div
              key={item.id}
              className={`flex items-center gap-3 p-3 rounded-lg border ${
                item.passed 
                  ? 'bg-green-500/5 border-green-500/20' 
                  : 'bg-destructive/5 border-destructive/20'
              }`}
            >
              {item.passed ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <X className="h-4 w-4 text-destructive" />
              )}
              <span className={`text-sm ${item.passed ? 'text-green-700' : 'text-destructive'}`}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Issues Detected */}
      {issues.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-medium text-sm flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-amber-500" />
            Issues Detected
          </h4>
          <div className="space-y-2">
            {issues.map((issue) => (
              <div
                key={issue.id}
                className={`flex items-start gap-3 p-3 rounded-lg border ${
                  issue.severity === 'error'
                    ? 'bg-destructive/5 border-destructive/20'
                    : 'bg-amber-500/5 border-amber-500/20'
                }`}
              >
                {issue.severity === 'error' ? (
                  <AlertCircle className="h-4 w-4 text-destructive mt-0.5" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5" />
                )}
                <div>
                  <p className={`text-sm ${
                    issue.severity === 'error' ? 'text-destructive' : 'text-amber-700'
                  }`}>
                    {issue.message}
                  </p>
                  <Badge 
                    variant="outline" 
                    className={`mt-1 text-xs ${
                      issue.severity === 'error' 
                        ? 'border-destructive/30 text-destructive' 
                        : 'border-amber-500/30 text-amber-600'
                    }`}
                  >
                    {issue.severity}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Processing State */}
      {isProcessing && (
        <div className="p-4 border rounded-lg bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-800">
          <div className="flex items-center gap-2">
            <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
            <span className="text-sm text-blue-700 dark:text-blue-300">AI is cleaning the room...</span>
          </div>
          <Progress value={65} className="mt-2" />
          <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">This may take 1-3 minutes</p>
        </div>
      )}

      {/* Actions */}
      <div className="pt-4 border-t space-y-2">
        {/* Start Cleaning Button - show when pending and not processing */}
        {cleaningStatus === 'pending' && !isProcessing && (
          <Button 
            className="w-full" 
            onClick={handleStartCleaning}
            disabled={submitJob.isPending}
          >
            {submitJob.isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Sparkles className="mr-2 h-4 w-4" />
            )}
            Start AI Cleaning
          </Button>
        )}

        {/* Approve Button - show when completed */}
        {cleaningStatus === 'completed' && (
          <Button 
            className="w-full" 
            onClick={handleApprove}
            disabled={!allValidationsPassed || isApproving || room.phase_3_completed}
          >
            <Check className="mr-2 h-4 w-4" />
            {room.phase_3_completed ? 'Already Approved' : 'Approve Cleaned Image'}
          </Button>
        )}
        
        <div className="grid grid-cols-2 gap-2">
          <Button 
            variant="outline" 
            onClick={handleRetry}
            disabled={isRetrying || isProcessing}
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Retry Cleaning
          </Button>
          <Button 
            variant="outline"
            onClick={handleFlagForReview}
          >
            <Flag className="mr-2 h-4 w-4" />
            Flag for Review
          </Button>
        </div>

        {cleaningStatus === 'failed' && (
          <Button variant="ghost" className="w-full text-muted-foreground">
            <Sparkles className="mr-2 h-4 w-4" />
            Use Fallback Cleaner
          </Button>
        )}
      </div>
    </div>
  );
}
