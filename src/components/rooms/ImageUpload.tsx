import { useState, useCallback, useRef } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, X, Image as ImageIcon, Loader2, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  projectId: string;
  roomId: string;
  phase: number;
  imageType: string;
  targetResolution?: number;
  onUploadComplete?: (imageUrl: string) => void;
  className?: string;
}

async function resizeImage(file: File, targetSize: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    
    img.onload = () => {
      URL.revokeObjectURL(url);
      
      const canvas = document.createElement('canvas');
      canvas.width = targetSize;
      canvas.height = targetSize;
      
      const ctx = canvas.getContext('2d');
      if (!ctx) {
        reject(new Error('Could not get canvas context'));
        return;
      }

      // Calculate crop dimensions to make it square
      const minDim = Math.min(img.width, img.height);
      const sx = (img.width - minDim) / 2;
      const sy = (img.height - minDim) / 2;

      // Draw image cropped and scaled
      ctx.drawImage(img, sx, sy, minDim, minDim, 0, 0, targetSize, targetSize);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Could not create blob'));
          }
        },
        'image/png',
        0.9
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Could not load image'));
    };

    img.src = url;
  });
}

export function ImageUpload({
  projectId,
  roomId,
  phase,
  imageType,
  targetResolution = 1024,
  onUploadComplete,
  className,
}: ImageUploadProps) {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      setUploadProgress(10);

      // Resize image
      const resizedBlob = await resizeImage(file, targetResolution);
      setUploadProgress(40);

      const fileName = `phase${phase}_${imageType}_${targetResolution}.png`;
      const storagePath = `${projectId}/${roomId}/${fileName}`;

      // Upload to storage
      const { error: uploadError } = await supabase.storage
        .from('room-images')
        .upload(storagePath, resizedBlob, {
          cacheControl: '3600',
          upsert: true,
        });

      if (uploadError) throw uploadError;
      setUploadProgress(70);

      // Delete existing record if any
      await supabase
        .from('room_images')
        .delete()
        .eq('room_id', roomId)
        .eq('phase', phase)
        .eq('image_type', imageType);

      setUploadProgress(85);

      // Insert room_images record - use relative storage path, NOT full URL
      // This ensures consistency across the app (edge functions expect relative paths)
      const { error: insertError } = await supabase.from('room_images').insert({
        room_id: roomId,
        phase,
        image_type: imageType,
        resolution: `${targetResolution}x${targetResolution}`,
        storage_path: storagePath, // Use relative path, not full URL
        file_name: fileName,
        file_size: resizedBlob.size,
      });

      if (insertError) throw insertError;
      setUploadProgress(95);

      // Update room phase completion
      if (phase === 1) {
        await supabase
          .from('rooms')
          .update({ phase_1_completed: true, updated_at: new Date().toISOString() })
          .eq('id', roomId);
      }

      setUploadProgress(100);
      
      // Return the public URL for display purposes
      const { data: urlData } = supabase.storage
        .from('room-images')
        .getPublicUrl(storagePath);
      return urlData.publicUrl;
    },
    onSuccess: (url) => {
      toast({
        title: 'Image Uploaded',
        description: 'Your image has been uploaded and processed successfully.',
      });
      queryClient.invalidateQueries({ queryKey: ['room-images', roomId] });
      queryClient.invalidateQueries({ queryKey: ['rooms'] });
      onUploadComplete?.(url);
      
      // Reset after short delay
      setTimeout(() => {
        setPreview(null);
        setSelectedFile(null);
        setUploadProgress(0);
      }, 1500);
    },
    onError: (error) => {
      toast({
        title: 'Upload Failed',
        description: error.message,
        variant: 'destructive',
      });
      setUploadProgress(0);
    },
  });

  const handleFileSelect = useCallback((file: File) => {
    if (!file.type.match(/^image\/(jpeg|png|webp)$/)) {
      toast({
        title: 'Invalid File Type',
        description: 'Please upload a JPEG, PNG, or WebP image.',
        variant: 'destructive',
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: 'File Too Large',
        description: 'Please upload an image smaller than 10MB.',
        variant: 'destructive',
      });
      return;
    }

    setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = (e) => setPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFileSelect(file);
    },
    [handleFileSelect]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFileSelect(file);
    },
    [handleFileSelect]
  );

  const handleUpload = () => {
    if (selectedFile) {
      uploadMutation.mutate(selectedFile);
    }
  };

  const handleCancel = () => {
    setPreview(null);
    setSelectedFile(null);
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const isUploading = uploadMutation.isPending;
  const isComplete = uploadProgress === 100;

  return (
    <Card className={cn('overflow-hidden', className)}>
      <CardContent className="p-4">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleInputChange}
          className="hidden"
        />

        {!preview ? (
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => fileInputRef.current?.click()}
            className={cn(
              'flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-8 cursor-pointer transition-colors',
              isDragging
                ? 'border-primary bg-primary/5'
                : 'border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50'
            )}
          >
            <Upload className="h-10 w-10 text-muted-foreground mb-3" />
            <p className="text-sm font-medium">
              Drag & drop or click to upload
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              JPEG, PNG, or WebP up to 10MB
            </p>
            <p className="text-xs text-muted-foreground">
              Will be resized to {targetResolution}x{targetResolution}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Preview */}
            <div className="relative aspect-square rounded-lg overflow-hidden bg-muted">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
              {isComplete && (
                <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                  <CheckCircle2 className="h-16 w-16 text-green-500" />
                </div>
              )}
              {!isUploading && !isComplete && (
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={handleCancel}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>

            {/* Progress */}
            {isUploading && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Uploading...</span>
                  <span className="font-medium">{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}

            {/* Actions */}
            {!isUploading && !isComplete && (
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button onClick={handleUpload} className="flex-1">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
