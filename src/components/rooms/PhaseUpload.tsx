import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { ImageUpload } from './ImageUpload';
import { ImageViewer } from './ImageViewer';

interface Room {
  id: string;
  current_phase: number | null;
  phase_1_completed: boolean | null;
}

interface PhaseUploadProps {
  room: Room;
  projectId: string;
  onPhaseComplete?: () => void;
}

export function PhaseUpload({ room, projectId, onPhaseComplete }: PhaseUploadProps) {
  const queryClient = useQueryClient();
  const [uploadComplete, setUploadComplete] = useState(false);

  const { data: existingImage } = useQuery({
    queryKey: ['room-images', room.id, 1, 'original'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('room_images')
        .select('*')
        .eq('room_id', room.id)
        .eq('phase', 1)
        .eq('image_type', 'original')
        .maybeSingle();

      if (error) throw error;
      return data;
    },
  });

  const hasImage = !!existingImage || uploadComplete;

  const handleUploadComplete = () => {
    setUploadComplete(true);
    queryClient.invalidateQueries({ queryKey: ['rooms'] });
  };

  const handleContinue = async () => {
    // Update room to move to next phase
    await supabase
      .from('rooms')
      .update({ current_phase: 2 })
      .eq('id', room.id);
    
    queryClient.invalidateQueries({ queryKey: ['rooms'] });
    onPhaseComplete?.();
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold">Phase 1: Upload</h3>
          {hasImage && (
            <CheckCircle2 className="h-5 w-5 text-green-500" />
          )}
        </div>
        <p className="text-sm text-muted-foreground mt-1">
          Upload room images for analysis
        </p>
      </div>

      {/* Upload or View Area */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <p className="text-sm font-medium mb-2">Upload Image</p>
          <ImageUpload
            projectId={projectId}
            roomId={room.id}
            phase={1}
            imageType="original"
            targetResolution={1024}
            onUploadComplete={handleUploadComplete}
          />
        </div>

        {hasImage && (
          <div>
            <p className="text-sm font-medium mb-2">Preview</p>
            <ImageViewer
              roomId={room.id}
              phase={1}
              imageType="original"
              showControls={true}
            />
          </div>
        )}
      </div>

      {/* Guidelines */}
      <div className="space-y-2 text-sm bg-muted/50 rounded-lg p-4">
        <h4 className="font-medium">Image Guidelines:</h4>
        <ul className="list-disc list-inside text-muted-foreground space-y-1">
          <li>Upload clear, well-lit photos</li>
          <li>Capture all walls and corners</li>
          <li>Include windows and doors</li>
          <li>Supported formats: JPG, PNG, WebP</li>
          <li>Max file size: 10MB (will be resized to 1024×1024)</li>
        </ul>
      </div>

      {/* Actions */}
      <div className="pt-4 border-t flex justify-end">
        <Button 
          onClick={handleContinue}
          disabled={!hasImage}
        >
          Continue to Analysis
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
