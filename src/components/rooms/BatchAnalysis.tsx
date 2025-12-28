import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useCreateBatch, useBatches, useCancelBatch } from '@/hooks/useBatches';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Scan, Loader2, Check, AlertCircle, X, Play, Square } from 'lucide-react';

interface Room {
  id: string;
  room_name: string | null;
  room_type: string | null;
  phase_2_completed: boolean;
}

interface RoomAnalysisStatus {
  roomId: string;
  roomName: string;
  status: 'pending' | 'analyzing' | 'success' | 'error';
  error?: string;
}

interface BatchAnalysisProps {
  projectId: string;
  rooms: Room[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BatchAnalysis({
  projectId,
  rooms,
  open,
  onOpenChange,
}: BatchAnalysisProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const createBatch = useCreateBatch();
  const cancelBatch = useCancelBatch();
  const { activeBatch } = useBatches(projectId);

  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [roomStatuses, setRoomStatuses] = useState<RoomAnalysisStatus[]>([]);
  const [currentBatchId, setCurrentBatchId] = useState<string | null>(null);
  const [isCancelled, setIsCancelled] = useState(false);

  const roomsToAnalyze = rooms.filter(r => !r.phase_2_completed);
  const completedCount = roomStatuses.filter(r => r.status === 'success').length;
  const failedCount = roomStatuses.filter(r => r.status === 'error').length;
  const progress = roomStatuses.length > 0 
    ? ((completedCount + failedCount) / roomStatuses.length) * 100 
    : 0;

  const analyzeRoom = async (roomId: string, roomName: string): Promise<boolean> => {
    try {
      // Get room image
      const { data: images } = await supabase
        .from('room_images')
        .select('storage_path')
        .eq('room_id', roomId)
        .eq('image_type', 'original')
        .limit(1);

      if (!images || images.length === 0) {
        throw new Error('No image found');
      }

      // Get image URL
      const { data: urlData } = await supabase.storage
        .from('room-images')
        .createSignedUrl(images[0].storage_path, 600);

      if (!urlData?.signedUrl) {
        throw new Error('Failed to get image URL');
      }

      // Call vision-ai edge function
      const { data, error } = await supabase.functions.invoke('vision-ai', {
        body: {
          imageUrl: urlData.signedUrl,
          analysisType: 'room_analysis',
        },
      });

      if (error) throw error;

      // Save analysis results
      const analysisData = data.analysis || data;
      
      await supabase
        .from('room_analysis')
        .upsert({
          room_id: roomId,
          detected_length_feet: analysisData.dimensions?.length,
          detected_width_feet: analysisData.dimensions?.width,
          detected_height_feet: analysisData.dimensions?.height,
          door_count: analysisData.features?.doors || 0,
          window_count: analysisData.features?.windows || 0,
          mirror_count: analysisData.features?.mirrors || 0,
          ac_unit_count: analysisData.features?.ac_units || 0,
          ceiling_fan_count: analysisData.features?.ceiling_fans || 0,
          suggested_styles: analysisData.suggested_styles || [],
          raw_analysis_data: analysisData,
          is_verified: false,
          updated_at: new Date().toISOString(),
        });

      // Update room phase
      await supabase
        .from('rooms')
        .update({ 
          current_phase: 2,
          updated_at: new Date().toISOString(),
        })
        .eq('id', roomId);

      return true;
    } catch (error) {
      console.error(`Analysis failed for room ${roomName}:`, error);
      throw error;
    }
  };

  const startBatchAnalysis = async () => {
    if (roomsToAnalyze.length === 0) {
      toast({
        title: 'No rooms to analyze',
        description: 'All rooms have already been analyzed.',
      });
      return;
    }

    setIsAnalyzing(true);
    setIsCancelled(false);

    // Initialize room statuses
    const initialStatuses: RoomAnalysisStatus[] = roomsToAnalyze.map(room => ({
      roomId: room.id,
      roomName: room.room_name || `Room`,
      status: 'pending',
    }));
    setRoomStatuses(initialStatuses);

    try {
      // Create batch record
      const batch = await createBatch.mutateAsync({
        projectId,
        batchType: 'analyze',
        totalItems: roomsToAnalyze.length,
        metadata: { roomIds: roomsToAnalyze.map(r => r.id) },
      });
      setCurrentBatchId(batch.id);

      // Process rooms with concurrency limit
      const CONCURRENCY = 3;
      
      for (let i = 0; i < roomsToAnalyze.length && !isCancelled; i += CONCURRENCY) {
        const chunk = roomsToAnalyze.slice(i, i + CONCURRENCY);
        
        await Promise.all(
          chunk.map(async (room, chunkIndex) => {
            if (isCancelled) return;
            
            const roomIndex = i + chunkIndex;
            
            // Update status to analyzing
            setRoomStatuses(prev => {
              const updated = [...prev];
              updated[roomIndex] = { ...updated[roomIndex], status: 'analyzing' };
              return updated;
            });

            try {
              await analyzeRoom(room.id, room.room_name || 'Room');
              
              // Update status to success
              setRoomStatuses(prev => {
                const updated = [...prev];
                updated[roomIndex] = { ...updated[roomIndex], status: 'success' };
                return updated;
              });

              await supabase.rpc('increment_batch_completed', { p_batch_id: batch.id });
            } catch (error) {
              const errorMsg = error instanceof Error ? error.message : 'Analysis failed';
              
              setRoomStatuses(prev => {
                const updated = [...prev];
                updated[roomIndex] = { ...updated[roomIndex], status: 'error', error: errorMsg };
                return updated;
              });

              await supabase.rpc('increment_batch_failed', { 
                p_batch_id: batch.id,
                p_error: errorMsg,
              });
            }
          })
        );
      }

      // Invalidate queries
      queryClient.invalidateQueries({ queryKey: ['rooms', projectId] });
      queryClient.invalidateQueries({ queryKey: ['room-analysis'] });

      const finalSuccessCount = roomStatuses.filter(r => r.status === 'success').length;
      const finalFailedCount = roomStatuses.filter(r => r.status === 'error').length;

      toast({
        title: isCancelled ? 'Batch analysis cancelled' : 'Batch analysis complete',
        description: `${finalSuccessCount} rooms analyzed${finalFailedCount > 0 ? `, ${finalFailedCount} failed` : ''}`,
        variant: finalFailedCount > 0 ? 'destructive' : 'default',
      });

    } catch (error) {
      toast({
        title: 'Batch analysis failed',
        description: error instanceof Error ? error.message : 'Unknown error',
        variant: 'destructive',
      });
    } finally {
      setIsAnalyzing(false);
      setCurrentBatchId(null);
    }
  };

  const handleCancel = () => {
    setIsCancelled(true);
    if (currentBatchId) {
      cancelBatch.mutate(currentBatchId);
    }
  };

  const handleClose = () => {
    if (!isAnalyzing) {
      setRoomStatuses([]);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Scan className="h-5 w-5" />
            Batch Room Analysis
          </DialogTitle>
          <DialogDescription>
            Analyze all rooms using AI vision to detect dimensions, features, and suggest styles.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Stats */}
          <div className="flex items-center gap-4 text-sm">
            <Badge variant="outline">
              {roomsToAnalyze.length} rooms to analyze
            </Badge>
            {roomStatuses.length > 0 && (
              <>
                <Badge variant="secondary" className="bg-success/10 text-success">
                  {completedCount} completed
                </Badge>
                {failedCount > 0 && (
                  <Badge variant="destructive">
                    {failedCount} failed
                  </Badge>
                )}
              </>
            )}
          </div>

          {/* Progress */}
          {isAnalyzing && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Analyzing rooms...</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}

          {/* Room List */}
          {roomStatuses.length > 0 && (
            <ScrollArea className="h-[300px] border rounded-lg p-4">
              <div className="space-y-2">
                {roomStatuses.map((room, index) => (
                  <div
                    key={room.roomId}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium w-6">{index + 1}.</span>
                      <span className="text-sm">{room.roomName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {room.status === 'pending' && (
                        <Badge variant="outline">Pending</Badge>
                      )}
                      {room.status === 'analyzing' && (
                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                          <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                          Analyzing
                        </Badge>
                      )}
                      {room.status === 'success' && (
                        <Badge variant="secondary" className="bg-success/10 text-success">
                          <Check className="mr-1 h-3 w-3" />
                          Done
                        </Badge>
                      )}
                      {room.status === 'error' && (
                        <Badge variant="destructive">
                          <AlertCircle className="mr-1 h-3 w-3" />
                          Failed
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleClose} disabled={isAnalyzing}>
              {isAnalyzing ? 'Close' : 'Cancel'}
            </Button>
            {isAnalyzing ? (
              <Button variant="destructive" onClick={handleCancel}>
                <Square className="mr-2 h-4 w-4" />
                Stop Analysis
              </Button>
            ) : (
              <Button
                onClick={startBatchAnalysis}
                disabled={roomsToAnalyze.length === 0}
              >
                <Play className="mr-2 h-4 w-4" />
                Analyze {roomsToAnalyze.length} Rooms
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
