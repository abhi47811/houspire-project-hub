import { Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Room {
  id: string;
  current_phase: number;
  phase_3_completed: boolean;
}

interface PhaseCleanProps {
  room: Room;
  projectId: string;
}

export function PhaseClean({ room, projectId }: PhaseCleanProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Phase 3: Clean</h3>
        <p className="text-sm text-muted-foreground mt-1">
          AI-powered image cleanup and enhancement
        </p>
      </div>

      {/* Before/After Toggle */}
      <div className="flex items-center gap-2">
        <Badge variant="outline">Before</Badge>
        <div className="flex-1 h-1 bg-muted rounded-full">
          <div className="w-1/2 h-full bg-primary rounded-full" />
        </div>
        <Badge variant="outline">After</Badge>
      </div>

      {/* Cleanup Options */}
      <div className="space-y-3">
        <h4 className="font-medium text-sm">Cleanup Options</h4>
        <div className="space-y-2">
          {[
            { name: 'Remove furniture', description: 'Clear the room of existing items' },
            { name: 'Fix lighting', description: 'Balance shadows and highlights' },
            { name: 'Straighten walls', description: 'Correct perspective distortion' },
            { name: 'Enhance quality', description: 'Upscale and sharpen image' },
          ].map((option) => (
            <div
              key={option.name}
              className="flex items-center gap-3 p-3 rounded-lg border"
            >
              <input type="checkbox" className="rounded" defaultChecked />
              <div>
                <p className="text-sm font-medium">{option.name}</p>
                <p className="text-xs text-muted-foreground">{option.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="pt-4 border-t space-y-2">
        <Button className="w-full">
          <Sparkles className="mr-2 h-4 w-4" />
          Start Cleanup
        </Button>
        <Button variant="outline" className="w-full">
          Approve & Continue
        </Button>
      </div>
    </div>
  );
}
