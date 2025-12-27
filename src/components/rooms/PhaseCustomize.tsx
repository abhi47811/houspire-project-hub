import { Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

interface Room {
  id: string;
  current_phase: number;
  phase_4_completed: boolean;
  selected_style: string | null;
}

interface PhaseCustomizeProps {
  room: Room;
  projectId: string;
}

const stylePresets = [
  { name: 'Modern Minimalist', color: 'bg-slate-100' },
  { name: 'Contemporary Indian', color: 'bg-amber-100' },
  { name: 'Scandinavian', color: 'bg-sky-100' },
  { name: 'Industrial', color: 'bg-zinc-100' },
  { name: 'Bohemian', color: 'bg-rose-100' },
  { name: 'Art Deco', color: 'bg-emerald-100' },
];

export function PhaseCustomize({ room, projectId }: PhaseCustomizeProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Phase 4: Customize</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Select style and customize design parameters
        </p>
      </div>

      {/* Current Style */}
      {room.selected_style && (
        <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
          <p className="text-xs text-muted-foreground">Selected Style</p>
          <p className="font-semibold text-primary">{room.selected_style}</p>
        </div>
      )}

      {/* Style Presets */}
      <div className="space-y-3">
        <h4 className="font-medium text-sm">Style Presets</h4>
        <div className="grid grid-cols-2 gap-2">
          {stylePresets.map((style) => (
            <button
              key={style.name}
              className={`p-3 rounded-lg border text-left transition-colors hover:border-primary ${
                room.selected_style === style.name ? 'border-primary bg-primary/5' : ''
              }`}
            >
              <div className={`h-8 w-full rounded mb-2 ${style.color}`} />
              <p className="text-xs font-medium">{style.name}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Style Intensity */}
      <div className="space-y-3">
        <Label className="text-sm font-medium">Style Intensity</Label>
        <Slider defaultValue={[70]} max={100} step={10} />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Subtle</span>
          <span>Bold</span>
        </div>
      </div>

      {/* Color Preferences */}
      <div className="space-y-3">
        <h4 className="font-medium text-sm">Color Preferences</h4>
        <div className="flex gap-2">
          {['#E58550', '#B8A090', '#1E2238', '#2D5A45', '#8B4B62'].map((color) => (
            <button
              key={color}
              className="h-8 w-8 rounded-full border-2 border-transparent hover:border-primary transition-colors"
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="pt-4 border-t space-y-2">
        <Button className="w-full">
          <Palette className="mr-2 h-4 w-4" />
          Apply Style
        </Button>
        <Button variant="outline" className="w-full">
          Preview Changes
        </Button>
      </div>
    </div>
  );
}
