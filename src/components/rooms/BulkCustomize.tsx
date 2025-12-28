import { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useApplyStyleToAllRooms } from '@/hooks/useBulkOperations';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Palette, Loader2, Check, Settings } from 'lucide-react';

interface Room {
  id: string;
  room_name: string | null;
  room_type: string | null;
  selected_style: string | null;
  phase_2_completed: boolean;
}

interface BulkCustomizeProps {
  projectId: string;
  rooms: Room[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BulkCustomize({
  projectId,
  rooms,
  open,
  onOpenChange,
}: BulkCustomizeProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const applyStyleMutation = useApplyStyleToAllRooms();

  const [selectedRoomIds, setSelectedRoomIds] = useState<Set<string>>(new Set());
  const [selectedStyle, setSelectedStyle] = useState<string>('');
  const [isApplying, setIsApplying] = useState(false);

  // Fetch available styles
  const { data: availableStyles = [] } = useQuery({
    queryKey: ['available-styles'],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_available_styles');
      if (error) throw error;
      return data as { style: string; style_slug: string }[];
    },
  });

  // Rooms that have completed analysis
  const customizableRooms = rooms.filter(r => r.phase_2_completed);

  useEffect(() => {
    if (open) {
      // Pre-select all customizable rooms
      setSelectedRoomIds(new Set(customizableRooms.map(r => r.id)));
    }
  }, [open]);

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
    setSelectedRoomIds(new Set(customizableRooms.map(r => r.id)));
  };

  const deselectAll = () => {
    setSelectedRoomIds(new Set());
  };

  const applyToSelected = useMutation({
    mutationFn: async () => {
      if (!selectedStyle || selectedRoomIds.size === 0) return;

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const roomIds = Array.from(selectedRoomIds);

      // Update rooms with selected style
      const { error } = await supabase
        .from('rooms')
        .update({
          selected_style: selectedStyle,
          phase_4_completed: true,
          current_phase: 4,
          updated_at: new Date().toISOString(),
        })
        .in('id', roomIds);

      if (error) throw error;

      // Also update room_analysis
      await supabase
        .from('room_analysis')
        .update({
          selected_style: selectedStyle,
          updated_at: new Date().toISOString(),
        })
        .in('room_id', roomIds);

      return { count: roomIds.length };
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['rooms', projectId] });
      queryClient.invalidateQueries({ queryKey: ['room-analysis'] });
      
      toast({
        title: 'Style applied',
        description: `Applied "${selectedStyle}" to ${data?.count} rooms.`,
      });

      onOpenChange(false);
    },
    onError: (error) => {
      toast({
        title: 'Failed to apply style',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const applyToAll = async () => {
    if (!selectedStyle) return;

    setIsApplying(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      await applyStyleMutation.mutateAsync({
        projectId,
        designStyle: selectedStyle,
        userId: user.id,
      });

      onOpenChange(false);
    } catch (error) {
      toast({
        title: 'Failed to apply style',
        description: error instanceof Error ? error.message : 'Unknown error',
        variant: 'destructive',
      });
    } finally {
      setIsApplying(false);
    }
  };

  const handleClose = () => {
    if (!applyToSelected.isPending && !isApplying) {
      setSelectedRoomIds(new Set());
      setSelectedStyle('');
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Bulk Customize Rooms
          </DialogTitle>
          <DialogDescription>
            Apply design style and settings to multiple rooms at once.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Style Selection */}
          <div className="space-y-2">
            <Label>Design Style</Label>
            <Select value={selectedStyle} onValueChange={setSelectedStyle}>
              <SelectTrigger>
                <SelectValue placeholder="Select a design style..." />
              </SelectTrigger>
              <SelectContent>
                {availableStyles.map((style) => (
                  <SelectItem key={style.style_slug} value={style.style}>
                    {style.style}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
                {customizableRooms.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No rooms available. Complete analysis phase first.
                  </p>
                ) : (
                  customizableRooms.map((room) => (
                    <div
                      key={room.id}
                      className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <Checkbox
                          checked={selectedRoomIds.has(room.id)}
                          onCheckedChange={() => toggleRoom(room.id)}
                        />
                        <div>
                          <span className="text-sm font-medium">
                            {room.room_name || 'Unnamed Room'}
                          </span>
                          {room.selected_style && (
                            <p className="text-xs text-muted-foreground">
                              Current: {room.selected_style}
                            </p>
                          )}
                        </div>
                      </div>
                      {room.selected_style && (
                        <Badge variant="outline" className="text-xs">
                          {room.selected_style}
                        </Badge>
                      )}
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </div>

          {/* Actions */}
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              {selectedStyle 
                ? `Will apply "${selectedStyle}" to selected rooms`
                : 'Select a style to apply'
              }
            </p>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={handleClose} 
                disabled={applyToSelected.isPending || isApplying}
              >
                Cancel
              </Button>
              <Button
                variant="outline"
                onClick={() => applyToSelected.mutate()}
                disabled={!selectedStyle || selectedRoomIds.size === 0 || applyToSelected.isPending || isApplying}
              >
                {applyToSelected.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Applying...
                  </>
                ) : (
                  <>
                    <Settings className="mr-2 h-4 w-4" />
                    Apply to Selected ({selectedRoomIds.size})
                  </>
                )}
              </Button>
              <Button
                onClick={applyToAll}
                disabled={!selectedStyle || isApplying || applyToSelected.isPending}
              >
                {isApplying ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Applying...
                  </>
                ) : (
                  <>
                    <Palette className="mr-2 h-4 w-4" />
                    Apply to All
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
