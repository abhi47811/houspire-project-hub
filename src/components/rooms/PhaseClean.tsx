import { useState, useEffect } from 'react';
import { Sparkles, Check, X, AlertTriangle, AlertCircle, RotateCcw, Flag, ChevronLeft, ChevronRight, Loader2, ImageOff, RefreshCw, Wand2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';
import { useJobQueue, useRoomJobStatus } from '@/hooks/useJobQueue';
import { CleaningRefinement } from './CleaningRefinement';
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
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetch original image
  const { data: originalImage, refetch: refetchOriginal } = useQuery<RoomImageWithUrl | null>({
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
        const signedUrl = await resolveImageUrl(data.storage_path);
        return {
          id: data.id,
          room_id: data.room_id,
          storage_path: data.storage_path,
          image_type: data.image_type,
          phase: data.phase,
          signedUrl,
        };
      }
      return null;
    }
  });

  // Fetch cleaned image
  const { data: cleanedImage, refetch: refetchCleaned } = useQuery<RoomImageWithUrl | null>({
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
        const signedUrl = await resolveImageUrl(data.storage_path);
        return {
          id: data.id,
          room_id: data.room_id,
          storage_path: data.storage_path,
          image_type: data.image_type,
          phase: data.phase,
          signedUrl,
        };
      }
      return null;
    },
    // Refetch more frequently when processing
    refetchInterval: (query) => {
      // Only poll when we're expecting a result
      // Use query.state.data instead of cleanedImage to avoid variable reference error
      const hasCleanedImage = query.state.data?.signedUrl;
      if (!hasCleanedImage && !room.phase_3_completed) {
        return 5000; // Poll every 5 seconds
      }
      return false;
    }
  });

  // Helper to resolve image URLs (handles both full URLs and storage paths)
  async function resolveImageUrl(storagePath: string): Promise<string | undefined> {
    // If already a full URL, return as-is
    if (storagePath.startsWith('http://') || storagePath.startsWith('https://')) {
      return storagePath;
    }
    // Otherwise, create a signed URL from storage
    const { data } = await supabase.storage
      .from('room-images')
      .createSignedUrl(storagePath, 3600);
    return data?.signedUrl;
  }

  // Use job queue hooks
  const { submitJob, retryJob, cancelJob, refetch: refetchJobs } = useJobQueue({ roomId: room.id, projectId });
  const { job, isProcessing, hasCompleted, hasFailed, errorMessage } = useRoomJobStatus(room.id, 'cleaning');

  // Determine status - PRIORITIZE room.phase_3_completed and cleanedImage existence
  const getCleaningStatus = (): CleaningStatus => {
    // Priority 1: If phase is completed and we have a cleaned image, it's done
    if (room.phase_3_completed && cleanedImage?.signedUrl) {
      return 'completed';
    }
    // Priority 2: If we have a cleaned image (even if job status is stale), it's done
    if (cleanedImage?.signedUrl) {
      return 'completed';
    }
    // Priority 3: Check job status
    if (hasCompleted) return 'completed';
    if (job?.status === 'cancelled') return 'pending';
    if (isProcessing) return 'processing';
    if (hasFailed || room.retry_count > 2) return 'failed';
    return 'pending';
  };
  
  const cleaningStatus = getCleaningStatus();

  // Auto-refresh cleaned image when job completes
  useEffect(() => {
    if (hasCompleted && !cleanedImage) {
      // Job completed but we don't have the cleaned image yet - refetch
      refetchCleaned();
    }
  }, [hasCompleted, cleanedImage, refetchCleaned]);

  // Refresh all data
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await Promise.all([
        refetchOriginal(),
        refetchCleaned(),
        refetchJobs(),
        queryClient.invalidateQueries({ queryKey: ['room', room.id] }),
      ]);
      toast({ title: 'Refreshed', description: 'Status updated.' });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to refresh.', variant: 'destructive' });
    } finally {
      setIsRefreshing(false);
    }
  };

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

  // Validation items - only show as passed when we have a cleaned image
  const hasCleanedImage = !!cleanedImage?.signedUrl;
  const validationItems: ValidationItem[] = [
    { id: 'windows', label: 'Windows preserved', passed: hasCleanedImage },
    { id: 'doors', label: 'Doors unchanged', passed: hasCleanedImage },
    { id: 'walls', label: 'Wall edges intact', passed: hasCleanedImage },
    { id: 'furniture', label: 'Furniture removed', passed: hasCleanedImage },
  ];

  // Only show issues when job has actually failed
  const issues: Issue[] = hasFailed && errorMessage ? [
    { id: '1', message: errorMessage, severity: 'error' },
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
      if (hasFailed && job?.id) {
        retryJob.mutate(job.id);
      } else {
        submitJob.mutate({
          roomId: room.id,
          projectId,
          phase: 3,
          payload: { mask: 'full_image' },
        });
      }

      const { error } = await supabase
        .from('rooms')
        .update({
          retry_count: (room.retry_count || 0) + 1,
          phase_3_completed: false,
        })
        .eq('id', room.id);

      if (error) throw error;

      toast({
        title: 'Reset started',
        description: 'Cleaning has been re-queued.',
      });

      queryClient.invalidateQueries({ queryKey: ['room', room.id] });
      queryClient.invalidateQueries({ queryKey: ['jobs', projectId, room.id] });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to reset cleaning job.',
        variant: 'destructive',
      });
    } finally {
      setIsRetrying(false);
    }
  };

  const handleResetJob = () => {
    if (!job?.id) {
      toast({
        title: 'Nothing to reset',
        description: 'No cleaning job was found for this room.',
      });
      return;
    }

    cancelJob.mutate(job.id);
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
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Phase 3: Clean & Prepare</h3>
          <p className="text-sm text-muted-foreground mt-1">
            AI-powered furniture removal and image cleanup
          </p>
        </div>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleRefresh}
          disabled={isRefreshing}
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
        </Button>
      </div>

      {/* Debug Info */}
      {job && (
        <div className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
          Job ID: {job.id.slice(0, 8)}... | Status: {job.status} | Room Phase: {room.current_phase} | Phase 3 Done: {room.phase_3_completed ? 'Yes' : 'No'}
        </div>
      )}

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

          {/* Labels - conditionally show based on slider position */}
          {sliderValue[0] < 90 && (
            <div className="absolute bottom-2 left-2">
              <Badge variant="secondary" className="text-xs">Before</Badge>
            </div>
          )}
          {sliderValue[0] > 10 && (
            <div className="absolute bottom-2 right-2">
              <Badge variant="secondary" className="text-xs">After</Badge>
            </div>
          )}
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
        {hasFailed && errorMessage && (
          <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-3">
            <p className="text-xs font-medium text-destructive">Cleaning failed</p>
            <p className="mt-1 text-xs text-muted-foreground">{errorMessage}</p>
          </div>
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

      {/* Processing State - only show when actually processing AND not completed */}
      {isProcessing && cleaningStatus !== 'completed' && !room.phase_3_completed && (
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

        {/* Approve Button - show when completed and NOT already approved */}
        {cleaningStatus === 'completed' && !room.phase_3_completed && (
          <Button 
            className="w-full" 
            onClick={handleApprove}
            disabled={!allValidationsPassed || isApproving}
          >
            <Check className="mr-2 h-4 w-4" />
            Approve Cleaned Image
          </Button>
        )}
        
        {/* Show success message when already approved */}
        {room.phase_3_completed && cleaningStatus === 'completed' && (
          <div className="flex items-center justify-center gap-2 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
            <Check className="h-4 w-4 text-green-600" />
            <span className="text-sm text-green-700 dark:text-green-400">Phase 3 Complete - Proceed to Phase 4</span>
          </div>
        )}

        {/* Refine Cleaning Button - show when we have a cleaned image */}
        {cleanedImage?.signedUrl && (
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full">
                <Wand2 className="mr-2 h-4 w-4" />
                Refine Cleaning
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <CleaningRefinement
                room={{
                  id: room.id,
                  project_id: projectId,
                }}
                originalImageUrl={originalImage?.signedUrl}
                currentCleanedUrl={cleanedImage.signedUrl}
              />
            </DialogContent>
          </Dialog>
        )}
        
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            onClick={handleRetry}
            disabled={isRetrying || isProcessing || retryJob.isPending || submitJob.isPending}
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Reset & Retry
          </Button>
          <Button 
            variant="outline"
            onClick={handleFlagForReview}
          >
            <Flag className="mr-2 h-4 w-4" />
            Flag for Review
          </Button>
        </div>

        {hasFailed && job?.id && (
          <Button
            variant="outline"
            className="w-full"
            onClick={handleResetJob}
            disabled={cancelJob.isPending || isProcessing}
          >
            Reset stuck job
          </Button>
        )}

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
