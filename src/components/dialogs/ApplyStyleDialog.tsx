import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { useApplyStyleToAllRooms } from '@/hooks/useBulkOperations';
import { useAuth } from '@/contexts/AuthContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Paintbrush, Check } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

const DESIGN_STYLES = [
  { id: 'modern', name: 'Modern', description: 'Clean lines, minimalist aesthetic' },
  { id: 'contemporary', name: 'Contemporary', description: 'Current trends, flexible design' },
  { id: 'traditional', name: 'Traditional', description: 'Classic elegance, timeless appeal' },
  { id: 'minimalist', name: 'Minimalist', description: 'Less is more, functional simplicity' },
  { id: 'scandinavian', name: 'Scandinavian', description: 'Light, airy, natural materials' },
  { id: 'industrial', name: 'Industrial', description: 'Raw materials, urban edge' },
  { id: 'bohemian', name: 'Bohemian', description: 'Eclectic, colorful, artistic' },
  { id: 'mid_century', name: 'Mid-Century Modern', description: 'Retro-inspired, organic forms' },
  { id: 'transitional', name: 'Transitional', description: 'Blend of traditional and modern' },
  { id: 'coastal', name: 'Coastal', description: 'Beach-inspired, relaxed vibes' },
  { id: 'rustic', name: 'Rustic', description: 'Natural textures, warm atmosphere' },
  { id: 'art_deco', name: 'Art Deco', description: 'Bold geometry, luxurious details' },
  { id: 'japanese', name: 'Japanese Zen', description: 'Harmony, balance, natural elements' },
];

interface ApplyStyleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projectId: string;
  selectedRoomCount: number;
}

export function ApplyStyleDialog({
  open,
  onOpenChange,
  projectId,
  selectedRoomCount,
}: ApplyStyleDialogProps) {
  const { user } = useAuth();
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const applyStyleMutation = useApplyStyleToAllRooms();

  const { data: smartDefaults } = useQuery({
    queryKey: ['smart-defaults'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('smart_defaults')
        .select('*');
      if (error) throw error;
      return data;
    },
    enabled: open,
  });

  const getSmartDefaultForStyle = (styleId: string) => {
    return smartDefaults?.find((sd) => sd.style_slug === styleId);
  };

  const handleApply = () => {
    if (!selectedStyle || !user) return;

    applyStyleMutation.mutate(
      {
        projectId,
        designStyle: selectedStyle,
        userId: user.id,
      },
      {
        onSuccess: () => {
          onOpenChange(false);
          setSelectedStyle(null);
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Paintbrush className="h-5 w-5" />
            Apply Design Style
          </DialogTitle>
          <DialogDescription>
            Select a design style to apply to {selectedRoomCount} room
            {selectedRoomCount !== 1 ? 's' : ''}.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[400px] pr-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {DESIGN_STYLES.map((style) => {
              const smartDefault = getSmartDefaultForStyle(style.id);
              const isSelected = selectedStyle === style.id;

              return (
                <Card
                  key={style.id}
                  className={cn(
                    'cursor-pointer transition-all hover:shadow-md',
                    isSelected && 'ring-2 ring-primary'
                  )}
                  onClick={() => setSelectedStyle(style.id)}
                >
                  <CardContent className="p-3 relative">
                    {isSelected && (
                      <div className="absolute top-2 right-2">
                        <Check className="h-4 w-4 text-primary" />
                      </div>
                    )}
                    <div className="space-y-1">
                      <h4 className="font-medium text-sm">{style.name}</h4>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {style.description}
                      </p>
                      {smartDefault && (
                        <Badge variant="secondary" className="text-xs mt-1">
                          Smart defaults available
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </ScrollArea>

        {selectedStyle && (
          <div className="rounded-lg bg-muted p-3">
            <h4 className="text-sm font-medium mb-1">Preview</h4>
            <p className="text-xs text-muted-foreground">
              {DESIGN_STYLES.find((s) => s.id === selectedStyle)?.description}
            </p>
            {getSmartDefaultForStyle(selectedStyle) && (
              <p className="text-xs text-primary mt-1">
                ✓ Includes preset furniture and color recommendations
              </p>
            )}
          </div>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleApply}
            disabled={!selectedStyle || applyStyleMutation.isPending}
          >
            {applyStyleMutation.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Apply to {selectedRoomCount} room{selectedRoomCount !== 1 ? 's' : ''}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
