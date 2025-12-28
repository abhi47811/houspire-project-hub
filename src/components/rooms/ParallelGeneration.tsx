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
import { Sparkles, Loader2, Check, AlertCircle, Play, Square, Image } from 'lucide-react';

interface Room {
  id: string;
  room_name: string | null;
  room_type: string | null;
  selected_style: string | null;
  phase_3_completed: boolean;
  phase_4_completed: boolean;
  phase_5_completed: boolean;
}

interface RoomGenerationStatus {
  roomId: string;
  roomName: string;
  style: string;
  status: 'pending' | 'generating' | 'success' | 'error';
  error?: string;
  imageUrl?: string;
}

interface ParallelGenerationProps {
  projectId: string;
  rooms: Room[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ParallelGeneration({
  projectId,
  rooms,
  open,
  onOpenChange,
}: ParallelGenerationProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const createBatch = useCreateBatch();
  const cancelBatch = useCancelBatch();

  const [isGenerating, setIsGenerating] = useState(false);
  const [roomStatuses, setRoomStatuses] = useState<RoomGenerationStatus[]>([]);
  const [currentBatchId, setCurrentBatchId] = useState<string | null>(null);
  const [isCancelled, setIsCancelled] = useState(false);

  // Rooms that have style set but not generated
  const roomsToGenerate = rooms.filter(r => 
    r.phase_3_completed && 
    r.selected_style && 
    !r.phase_5_completed
  );
  const completedCount = roomStatuses.filter(r => r.status === 'success').length;
  const failedCount = roomStatuses.filter(r => r.status === 'error').length;
  const progress = roomStatuses.length > 0 
    ? ((completedCount + failedCount) / roomStatuses.length) * 100 
    : 0;

  const generateRoom = async (room: Room): Promise<string> => {
    try {
      // Get cleaned image
      const { data: images } = await supabase
        .from('room_images')
        .select('storage_path')
        .eq('room_id', room.id)
        .eq('image_type', 'cleaned')
        .limit(1);

      // Fallback to original if no cleaned image
      let imagePath = images?.[0]?.storage_path;
      if (!imagePath) {
        const { data: origImages } = await supabase
          .from('room_images')
          .select('storage_path')
          .eq('room_id', room.id)
          .eq('image_type', 'original')
          .limit(1);
        imagePath = origImages?.[0]?.storage_path;
      }

      if (!imagePath) {
        throw new Error('No source image found');
      }

      // Get image URL
      const { data: urlData } = await supabase.storage
        .from('room-images')
        .createSignedUrl(imagePath, 600);

      if (!urlData?.signedUrl) {
        throw new Error('Failed to get image URL');
      }

      // Call generate-ai edge function
      const { data, error } = await supabase.functions.invoke('generate-ai', {
        body: {
          imageUrl: urlData.signedUrl,
          roomId: room.id,
          style: room.selected_style,
          roomType: room.room_type,
        },
      });

      if (error) throw error;

      // Update room phase
      await supabase
        .from('rooms')
        .update({ 
          current_phase: 5,
          phase_5_completed: true,
          updated_at: new Date().toISOString(),
        })
        .eq('id', room.id);

      return data.imageUrl || data.result?.imageUrl;
    } catch (error) {
      console.error(`Generation failed for room:`, error);
      throw error;
    }
  };

  const startBatchGeneration = async () => {
    if (roomsToGenerate.length === 0) {
      toast({
        title: 'No rooms to generate',
        description: 'All styled rooms have already been rendered.',
      });
      return;
    }

    setIsGenerating(true);
    setIsCancelled(false);

    // Initialize room statuses
    const initialStatuses: RoomGenerationStatus[] = roomsToGenerate.map(room => ({
      roomId: room.id,
      roomName: room.room_name || 'Room',
      style: room.selected_style || 'Unknown',
      status: 'pending',
    }));
    setRoomStatuses(initialStatuses);

    try {
      // Create batch record
      const batch = await createBatch.mutateAsync({
        projectId,
        batchType: 'generate',
        totalItems: roomsToGenerate.length,
        metadata: { roomIds: roomsToGenerate.map(r => r.id) },
      });
      setCurrentBatchId(batch.id);

      // Process rooms with concurrency limit (lower for generation)
      const CONCURRENCY = 2;
      
      for (let i = 0; i < roomsToGenerate.length && !isCancelled; i += CONCURRENCY) {
        const chunk = roomsToGenerate.slice(i, i + CONCURRENCY);
        
        await Promise.all(
          chunk.map(async (room, chunkIndex) => {
            if (isCancelled) return;
            
            const roomIndex = i + chunkIndex;
            
            // Update status to generating
            setRoomStatuses(prev => {
              const updated = [...prev];
              updated[roomIndex] = { ...updated[roomIndex], status: 'generating' };
              return updated;
            });

            try {
              const imageUrl = await generateRoom(room);
              
              // Update status to success
              setRoomStatuses(prev => {
                const updated = [...prev];
                updated[roomIndex] = { ...updated[roomIndex], status: 'success', imageUrl };
                return updated;
              });

              await supabase.rpc('increment_batch_completed', { p_batch_id: batch.id });
            } catch (error) {
              const errorMsg = error instanceof Error ? error.message : 'Generation failed';
              
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
      queryClient.invalidateQueries({ queryKey: ['renders'] });

      toast({
        title: isCancelled ? 'Batch generation cancelled' : 'Batch generation complete',
        description: `${completedCount} renders created${failedCount > 0 ? `, ${failedCount} failed` : ''}`,
        variant: failedCount > 0 ? 'destructive' : 'default',
      });

    } catch (error) {
      toast({
        title: 'Batch generation failed',
        description: error instanceof Error ? error.message : 'Unknown error',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
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
    if (!isGenerating) {
      setRoomStatuses([]);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Parallel Render Generation
          </DialogTitle>
          <DialogDescription>
            Generate AI renders for all styled rooms simultaneously.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Stats */}
          <div className="flex items-center gap-4 text-sm">
            <Badge variant="outline">
              {roomsToGenerate.length} rooms to render
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
          {isGenerating && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Generating renders...</span>
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
                      <div>
                        <span className="text-sm">{room.roomName}</span>
                        <p className="text-xs text-muted-foreground">{room.style}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {room.status === 'pending' && (
                        <Badge variant="outline">Pending</Badge>
                      )}
                      {room.status === 'generating' && (
                        <Badge variant="secondary" className="bg-primary/10 text-primary">
                          <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                          Generating
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

          {/* Preview of rooms to generate */}
          {roomStatuses.length === 0 && roomsToGenerate.length > 0 && (
            <ScrollArea className="h-[200px] border rounded-lg p-4">
              <div className="space-y-2">
                {roomsToGenerate.map((room, index) => (
                  <div
                    key={room.id}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium w-6">{index + 1}.</span>
                      <div>
                        <span className="text-sm">{room.room_name || 'Room'}</span>
                        <p className="text-xs text-muted-foreground">{room.selected_style}</p>
                      </div>
                    </div>
                    <Badge variant="outline">Ready</Badge>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleClose} disabled={isGenerating}>
              {isGenerating ? 'Close' : 'Cancel'}
            </Button>
            {isGenerating ? (
              <Button variant="destructive" onClick={handleCancel}>
                <Square className="mr-2 h-4 w-4" />
                Stop Generation
              </Button>
            ) : (
              <Button
                onClick={startBatchGeneration}
                disabled={roomsToGenerate.length === 0}
              >
                <Play className="mr-2 h-4 w-4" />
                Generate {roomsToGenerate.length} Renders
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
