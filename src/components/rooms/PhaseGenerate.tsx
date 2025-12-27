import { Image, Download, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

interface Room {
  id: string;
  current_phase: number;
  phase_5_completed: boolean;
  selected_style: string | null;
  final_quality_score: number | null;
}

interface PhaseGenerateProps {
  room: Room;
  projectId: string;
}

export function PhaseGenerate({ room, projectId }: PhaseGenerateProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Phase 5: Generate</h3>
        <p className="text-sm text-muted-foreground mt-1">
          AI-generated interior design renders
        </p>
      </div>

      {/* Generation Status */}
      <div className="p-4 rounded-lg bg-muted/50 border">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Ready to Generate</span>
          <Badge variant="outline">0/4 renders</Badge>
        </div>
        <Progress value={0} className="h-2" />
      </div>

      {/* Quality Settings */}
      <div className="space-y-3">
        <h4 className="font-medium text-sm">Render Quality</h4>
        <div className="grid grid-cols-3 gap-2">
          {['Draft', 'Standard', 'High'].map((quality) => (
            <button
              key={quality}
              className={`p-2 rounded-lg border text-center text-sm ${
                quality === 'Standard' ? 'border-primary bg-primary/5' : ''
              }`}
            >
              {quality}
            </button>
          ))}
        </div>
      </div>

      {/* Render Variations */}
      <div className="space-y-3">
        <h4 className="font-medium text-sm">Variations</h4>
        <div className="grid grid-cols-2 gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="aspect-square rounded-lg bg-muted border flex items-center justify-center"
            >
              <Image className="h-8 w-8 text-muted-foreground/50" />
            </div>
          ))}
        </div>
      </div>

      {/* Quality Score */}
      {room.final_quality_score && (
        <div className="p-3 rounded-lg bg-success/10 border border-success/20">
          <div className="flex items-center justify-between">
            <span className="text-sm">Quality Score</span>
            <Badge className="bg-success text-success-foreground">
              {room.final_quality_score}%
            </Badge>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="pt-4 border-t space-y-2">
        <Button className="w-full">
          <Image className="mr-2 h-4 w-4" />
          Generate Renders
        </Button>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline">
            <RefreshCw className="mr-2 h-4 w-4" />
            Retry
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
        </div>
      </div>
    </div>
  );
}
