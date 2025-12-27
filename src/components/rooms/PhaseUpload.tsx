import { Upload, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Room {
  id: string;
  current_phase: number;
  phase_1_completed: boolean;
}

interface PhaseUploadProps {
  room: Room;
  projectId: string;
}

export function PhaseUpload({ room, projectId }: PhaseUploadProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Phase 1: Upload</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Upload room images for analysis
        </p>
      </div>

      {/* Upload Area */}
      <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
        <Upload className="h-10 w-10 mx-auto text-muted-foreground" />
        <h4 className="mt-4 font-medium">Drop images here</h4>
        <p className="text-sm text-muted-foreground mt-1">
          or click to browse
        </p>
        <Button className="mt-4">
          <Image className="mr-2 h-4 w-4" />
          Select Images
        </Button>
      </div>

      {/* Guidelines */}
      <div className="space-y-2 text-sm">
        <h4 className="font-medium">Image Guidelines:</h4>
        <ul className="list-disc list-inside text-muted-foreground space-y-1">
          <li>Upload clear, well-lit photos</li>
          <li>Capture all walls and corners</li>
          <li>Include windows and doors</li>
          <li>Minimum 3 images recommended</li>
          <li>Supported formats: JPG, PNG, HEIC</li>
        </ul>
      </div>

      {/* Actions */}
      <div className="pt-4 border-t">
        <Button className="w-full" disabled={!room.phase_1_completed}>
          Continue to Analysis
        </Button>
      </div>
    </div>
  );
}
