import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Loader2, Copy } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Room {
  id: string;
  room_name: string | null;
  room_number: number;
  room_type: string | null;
}

interface CopySettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sourceRoom: Room;
  availableRooms: Room[];
}

export function CopySettingsDialog({
  open,
  onOpenChange,
  sourceRoom,
  availableRooms,
}: CopySettingsDialogProps) {
  const queryClient = useQueryClient();
  const [copyStyle, setCopyStyle] = useState(true);
  const [copyRequirements, setCopyRequirements] = useState(false);
  const [copyVastu, setCopyVastu] = useState(false);
  const [selectedRooms, setSelectedRooms] = useState<string[]>([]);

  const targetRooms = availableRooms.filter((r) => r.id !== sourceRoom.id);
  const allSelected = selectedRooms.length === targetRooms.length;

  const copyMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.rpc('copy_room_settings', {
        p_source_room_id: sourceRoom.id,
        p_target_room_ids: selectedRooms,
        p_copy_style: copyStyle,
        p_copy_requirements: copyRequirements,
        p_copy_vastu: copyVastu,
      });

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      const result = data[0];
      toast({
        title: 'Settings Copied',
        description: `Successfully copied settings to ${result.success_count} room(s).`,
      });
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
      queryClient.invalidateQueries({ queryKey: ['room-analysis'] });
      onOpenChange(false);
      resetState();
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      });
    },
  });

  const resetState = () => {
    setCopyStyle(true);
    setCopyRequirements(false);
    setCopyVastu(false);
    setSelectedRooms([]);
  };

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedRooms([]);
    } else {
      setSelectedRooms(targetRooms.map((r) => r.id));
    }
  };

  const handleRoomToggle = (roomId: string) => {
    setSelectedRooms((prev) =>
      prev.includes(roomId)
        ? prev.filter((id) => id !== roomId)
        : [...prev, roomId]
    );
  };

  const getRoomLabel = (room: Room) => {
    return room.room_name || `Room ${room.room_number}`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Copy className="h-5 w-5" />
            Copy Settings
          </DialogTitle>
          <DialogDescription>
            Copy settings from "{getRoomLabel(sourceRoom)}" to other rooms.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* What to Copy */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">What to copy</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="copy-style"
                  checked={copyStyle}
                  onCheckedChange={(checked) => setCopyStyle(checked === true)}
                />
                <Label htmlFor="copy-style" className="text-sm font-normal">
                  Design style
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="copy-requirements"
                  checked={copyRequirements}
                  onCheckedChange={(checked) => setCopyRequirements(checked === true)}
                />
                <Label htmlFor="copy-requirements" className="text-sm font-normal">
                  Custom requirements
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="copy-vastu"
                  checked={copyVastu}
                  onCheckedChange={(checked) => setCopyVastu(checked === true)}
                />
                <Label htmlFor="copy-vastu" className="text-sm font-normal">
                  Vastu preferences
                </Label>
              </div>
            </div>
          </div>

          {/* Target Rooms */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">Target rooms</Label>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSelectAll}
                className="h-auto p-0 text-xs text-primary"
              >
                {allSelected ? 'Deselect All' : 'Select All'}
              </Button>
            </div>
            <ScrollArea className="h-40 rounded-md border p-2">
              <div className="space-y-2">
                {targetRooms.map((room) => (
                  <div key={room.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`room-${room.id}`}
                      checked={selectedRooms.includes(room.id)}
                      onCheckedChange={() => handleRoomToggle(room.id)}
                    />
                    <Label
                      htmlFor={`room-${room.id}`}
                      className="text-sm font-normal"
                    >
                      {getRoomLabel(room)}
                      {room.room_type && (
                        <span className="ml-2 text-xs text-muted-foreground">
                          ({room.room_type.replace(/_/g, ' ')})
                        </span>
                      )}
                    </Label>
                  </div>
                ))}
                {targetRooms.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No other rooms available
                  </p>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => copyMutation.mutate()}
            disabled={
              copyMutation.isPending ||
              selectedRooms.length === 0 ||
              (!copyStyle && !copyRequirements && !copyVastu)
            }
          >
            {copyMutation.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Copy to {selectedRooms.length} room{selectedRooms.length !== 1 ? 's' : ''}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
