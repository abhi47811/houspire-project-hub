import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Download, Loader2, Image, Check } from 'lucide-react';

interface Room {
  id: string;
  room_name: string | null;
  room_type: string | null;
  phase_5_completed: boolean;
}

interface Render {
  id: string;
  room_id: string;
  image_url: string;
  storage_path: string | null;
  approval_status: string | null;
}

interface BatchExportProps {
  projectId: string;
  projectName: string;
  rooms: Room[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BatchExport({
  projectId,
  projectName,
  rooms,
  open,
  onOpenChange,
}: BatchExportProps) {
  const { toast } = useToast();

  const [selectedRoomIds, setSelectedRoomIds] = useState<Set<string>>(new Set());
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [includeOriginal, setIncludeOriginal] = useState(false);
  const [includeCleaned, setIncludeCleaned] = useState(false);

  // Rooms with completed renders
  const completedRooms = rooms.filter(r => r.phase_5_completed);

  // Fetch renders for the project
  const { data: renders = [] } = useQuery({
    queryKey: ['renders', projectId],
    queryFn: async () => {
      const roomIds = completedRooms.map(r => r.id);
      if (roomIds.length === 0) return [];

      const { data, error } = await supabase
        .from('renders')
        .select('*')
        .in('room_id', roomIds)
        .eq('approval_status', 'approved')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Render[];
    },
    enabled: open && completedRooms.length > 0,
  });

  const toggleRoom = (roomId: string) => {
    setSelectedRoomIds(prev => {
      const next = new Set(prev);
      if (next.has(roomId)) {
        next.delete(roomId);
      } else {
        next.add(roomId);
      }
      return next;
    });
  };

  const selectAll = () => {
    setSelectedRoomIds(new Set(completedRooms.map(r => r.id)));
  };

  const deselectAll = () => {
    setSelectedRoomIds(new Set());
  };

  const exportToZip = async () => {
    if (selectedRoomIds.size === 0) {
      toast({
        title: 'No rooms selected',
        description: 'Please select at least one room to export.',
        variant: 'destructive',
      });
      return;
    }

    setIsExporting(true);
    setExportProgress(0);

    try {
      const zip = new JSZip();
      const selectedRooms = completedRooms.filter(r => selectedRoomIds.has(r.id));
      const totalFiles = selectedRooms.length * (1 + (includeOriginal ? 1 : 0) + (includeCleaned ? 1 : 0));
      let processedFiles = 0;

      for (const room of selectedRooms) {
        const roomFolder = zip.folder(room.room_name || `room_${room.id.slice(0, 8)}`);
        if (!roomFolder) continue;

        // Get render for this room
        const roomRenders = renders.filter(r => r.room_id === room.id);
        
        for (const render of roomRenders.slice(0, 1)) { // Take latest render
          try {
            // Download render image
            if (render.storage_path) {
              const { data } = await supabase.storage
                .from('room-images')
                .download(render.storage_path);
              
              if (data) {
                const ext = render.storage_path.split('.').pop() || 'png';
                roomFolder.file(`render.${ext}`, data);
              }
            } else if (render.image_url) {
              // Fetch from URL
              const response = await fetch(render.image_url);
              const blob = await response.blob();
              roomFolder.file('render.png', blob);
            }
            
            processedFiles++;
            setExportProgress((processedFiles / totalFiles) * 100);
          } catch (error) {
            console.error(`Failed to download render for room ${room.room_name}:`, error);
          }
        }

        // Include original image if requested
        if (includeOriginal) {
          try {
            const { data: images } = await supabase
              .from('room_images')
              .select('storage_path')
              .eq('room_id', room.id)
              .eq('image_type', 'original')
              .limit(1);

            if (images?.[0]?.storage_path) {
              const { data } = await supabase.storage
                .from('room-images')
                .download(images[0].storage_path);

              if (data) {
                const ext = images[0].storage_path.split('.').pop() || 'jpg';
                roomFolder.file(`original.${ext}`, data);
              }
            }
            processedFiles++;
            setExportProgress((processedFiles / totalFiles) * 100);
          } catch (error) {
            console.error(`Failed to download original for room ${room.room_name}:`, error);
          }
        }

        // Include cleaned image if requested
        if (includeCleaned) {
          try {
            const { data: images } = await supabase
              .from('room_images')
              .select('storage_path')
              .eq('room_id', room.id)
              .eq('image_type', 'cleaned')
              .limit(1);

            if (images?.[0]?.storage_path) {
              const { data } = await supabase.storage
                .from('room-images')
                .download(images[0].storage_path);

              if (data) {
                const ext = images[0].storage_path.split('.').pop() || 'jpg';
                roomFolder.file(`cleaned.${ext}`, data);
              }
            }
            processedFiles++;
            setExportProgress((processedFiles / totalFiles) * 100);
          } catch (error) {
            console.error(`Failed to download cleaned for room ${room.room_name}:`, error);
          }
        }
      }

      // Generate and download ZIP
      const zipBlob = await zip.generateAsync({ type: 'blob' });
      const fileName = `${projectName.replace(/[^a-z0-9]/gi, '_')}_renders.zip`;
      saveAs(zipBlob, fileName);

      toast({
        title: 'Export complete',
        description: `Downloaded ${selectedRooms.length} room renders.`,
      });

      onOpenChange(false);
    } catch (error) {
      toast({
        title: 'Export failed',
        description: error instanceof Error ? error.message : 'Unknown error',
        variant: 'destructive',
      });
    } finally {
      setIsExporting(false);
      setExportProgress(0);
    }
  };

  const handleClose = () => {
    if (!isExporting) {
      setSelectedRoomIds(new Set());
      setIncludeOriginal(false);
      setIncludeCleaned(false);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Export Renders
          </DialogTitle>
          <DialogDescription>
            Download approved renders as a ZIP file.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Options */}
          <div className="flex items-center gap-6 p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2">
              <Checkbox
                id="include-original"
                checked={includeOriginal}
                onCheckedChange={(checked) => setIncludeOriginal(!!checked)}
              />
              <Label htmlFor="include-original" className="text-sm">
                Include original images
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="include-cleaned"
                checked={includeCleaned}
                onCheckedChange={(checked) => setIncludeCleaned(!!checked)}
              />
              <Label htmlFor="include-cleaned" className="text-sm">
                Include cleaned images
              </Label>
            </div>
          </div>

          {/* Room Selection */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Select Rooms ({selectedRoomIds.size} selected)</Label>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" onClick={selectAll}>
                  Select All
                </Button>
                <Button variant="ghost" size="sm" onClick={deselectAll}>
                  Deselect All
                </Button>
              </div>
            </div>
            
            <ScrollArea className="h-[250px] border rounded-lg p-4">
              <div className="space-y-2">
                {completedRooms.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No completed renders available for export.
                  </p>
                ) : (
                  completedRooms.map((room) => {
                    const roomRenders = renders.filter(r => r.room_id === room.id);
                    const approvedCount = roomRenders.length;
                    
                    return (
                      <div
                        key={room.id}
                        className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <Checkbox
                            checked={selectedRoomIds.has(room.id)}
                            onCheckedChange={() => toggleRoom(room.id)}
                          />
                          <div className="flex items-center gap-2">
                            <Image className="h-4 w-4 text-muted-foreground" />
                            <span className="text-sm font-medium">
                              {room.room_name || 'Unnamed Room'}
                            </span>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {approvedCount} render{approvedCount !== 1 ? 's' : ''}
                        </Badge>
                      </div>
                    );
                  })
                )}
              </div>
            </ScrollArea>
          </div>

          {/* Progress */}
          {isExporting && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Preparing download...</span>
                <span>{Math.round(exportProgress)}%</span>
              </div>
              <Progress value={exportProgress} className="h-2" />
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleClose} disabled={isExporting}>
              Cancel
            </Button>
            <Button
              onClick={exportToZip}
              disabled={selectedRoomIds.size === 0 || isExporting}
            >
              {isExporting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-4 w-4" />
                  Download ZIP ({selectedRoomIds.size} rooms)
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
