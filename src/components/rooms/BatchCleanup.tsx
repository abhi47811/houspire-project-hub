import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useCreateBatch, useCancelBatch } from '@/hooks/useBatches';
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
import { Eraser, Loader2, Check, AlertCircle, Play, Square } from 'lucide-react';

interface Room {
  id: string;
  room_name: string | null;
  room_type: string | null;
  phase_2_completed: boolean;
  phase_3_completed: boolean;
}

interface RoomCleanupStatus {
  roomId: string;
  roomName: string;
  status: 'pending' | 'cleaning' | 'success' | 'error';
  error?: string;
}

interface BatchCleanupProps {
  projectId: string;
  rooms: Room[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BatchCleanup({
  projectId,
  rooms,
  open,
  onOpenChange,
}: BatchCleanupProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const createBatch = useCreateBatch();
  const cancelBatch = useCancelBatch();

  const [isCleaning, setIsCleaning] = useState(false);
  const [roomStatuses, setRoomStatuses] = useState<RoomCleanupStatus[]>([]);
  const [currentBatchId, setCurrentBatchId] = useState<string | null>(null);
  const [isCancelled, setIsCancelled] = useState(false);

  // Rooms that have analysis done but not cleaned
  const roomsToClean = rooms.filter(r => r.phase_2_completed && !r.phase_3_completed);
  const completedCount = roomStatuses.filter(r => r.status === 'success').length;
  const failedCount = roomStatuses.filter(r => r.status === 'error').length;
  const progress = roomStatuses.length > 0 
    ? ((completedCount + failedCount) / roomStatuses.length) * 100 
    : 0;

  const cleanRoom = async (roomId: string): Promise<boolean> => {
    try {
      // Get original room image
      const { data: images } = await supabase
        .from('room_images')
        .select('storage_path')
        .eq('room_id', roomId)
        .eq('image_type', 'original')
        .limit(1);

      if (!images || images.length === 0) {
        throw new Error('No original image found');
      }

      // Get image URL
      const { data: urlData } = await supabase.storage
        .from('room-images')
        .createSignedUrl(images[0].storage_path, 600);

      if (!urlData?.signedUrl) {
        throw new Error('Failed to get image URL');
      }

      // Call image-processing edge function for cleanup
      const { data, error } = await supabase.functions.invoke('image-processing', {
        body: {
          imageUrl: urlData.signedUrl,
          operation: 'clean',
          roomId,
        },
      });

      if (error) throw error;

      // The edge function should handle saving the cleaned image
      // Update room phase
      await supabase
        .from('rooms')
        .update({ 
          current_phase: 3,
          phase_3_completed: true,
          updated_at: new Date().toISOString(),
        })
        .eq('id', roomId);

      return true;
    } catch (error) {
      console.error(`Cleanup failed for room:`, error);
      throw error;
    }
  };

  const startBatchCleanup = async () => {
    if (roomsToClean.length === 0) {
      toast({
        title: 'No rooms to clean',
        description: 'All analyzed rooms have already been cleaned.',
      });
      return;
    }

    setIsCleaning(true);
    setIsCancelled(false);

    // Initialize room statuses
    const initialStatuses: RoomCleanupStatus[] = roomsToClean.map(room => ({
      roomId: room.id,
      roomName: room.room_name || 'Room',
      status: 'pending',
    }));
    setRoomStatuses(initialStatuses);

    try {
      // Create batch record
      const batch = await createBatch.mutateAsync({
        projectId,
        batchType: 'cleanup',
        totalItems: roomsToClean.length,
        metadata: { roomIds: roomsToClean.map(r => r.id) },
      });
      setCurrentBatchId(batch.id);

      // Process rooms with concurrency limit (lower for image processing)
      const CONCURRENCY = 2;
      
      for (let i = 0; i < roomsToClean.length && !isCancelled; i += CONCURRENCY) {
        const chunk = roomsToClean.slice(i, i + CONCURRENCY);
        
        await Promise.all(
          chunk.map(async (room, chunkIndex) => {
            if (isCancelled) return;
            
            const roomIndex = i + chunkIndex;
            
            // Update status to cleaning
            setRoomStatuses(prev => {
              const updated = [...prev];
              updated[roomIndex] = { ...updated[roomIndex], status: 'cleaning' };
              return updated;
            });

            try {
              await cleanRoom(room.id);
              
              // Update status to success
              setRoomStatuses(prev => {
                const updated = [...prev];
                updated[roomIndex] = { ...updated[roomIndex], status: 'success' };
                return updated;
              });

              await supabase.rpc('increment_batch_completed', { p_batch_id: batch.id });
            } catch (error) {
              const errorMsg = error instanceof Error ? error.message : 'Cleanup failed';
              
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

      toast({
        title: isCancelled ? 'Batch cleanup cancelled' : 'Batch cleanup complete',
        description: `${completedCount} rooms cleaned${failedCount > 0 ? `, ${failedCount} failed` : ''}`,
        variant: failedCount > 0 ? 'destructive' : 'default',
      });

    } catch (error) {
      toast({
        title: 'Batch cleanup failed',
        description: error instanceof Error ? error.message : 'Unknown error',
        variant: 'destructive',
      });
    } finally {
      setIsCleaning(false);
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
    if (!isCleaning) {
      setRoomStatuses([]);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Eraser className="h-5 w-5" />
            Batch Image Cleanup
          </DialogTitle>
          <DialogDescription>
            Clean and enhance all room images using AI to remove clutter and imperfections.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Stats */}
          <div className="flex items-center gap-4 text-sm">
            <Badge variant="outline">
              {roomsToClean.length} rooms to clean
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
          {isCleaning && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Cleaning images...</span>
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
                      {room.status === 'cleaning' && (
                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                          <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                          Cleaning
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
            <Button variant="outline" onClick={handleClose} disabled={isCleaning}>
              {isCleaning ? 'Close' : 'Cancel'}
            </Button>
            {isCleaning ? (
              <Button variant="destructive" onClick={handleCancel}>
                <Square className="mr-2 h-4 w-4" />
                Stop Cleanup
              </Button>
            ) : (
              <Button
                onClick={startBatchCleanup}
                disabled={roomsToClean.length === 0}
              >
                <Play className="mr-2 h-4 w-4" />
                Clean {roomsToClean.length} Rooms
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
