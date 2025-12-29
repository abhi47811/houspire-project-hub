import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useCreateBatch, useUpdateBatch } from '@/hooks/useBatches';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Upload, X, Check, AlertCircle, Loader2, ImageIcon } from 'lucide-react';

// Proper wrapper interface - don't extend File as Object.assign on Files is unreliable
interface FileWithPreview {
  file: File;           // Original File object (never mutated)
  preview: string;
  roomName: string;
  roomType: string;
  uploadStatus: 'pending' | 'uploading' | 'success' | 'error';
  error?: string;
}

interface BulkUploadProps {
  projectId: string;
  maxRooms: number;
  currentRoomCount: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const roomTypes = [
  { value: 'living_room', label: 'Living Room' },
  { value: 'master_bedroom', label: 'Master Bedroom' },
  { value: 'bedroom', label: 'Bedroom' },
  { value: 'kitchen', label: 'Kitchen' },
  { value: 'dining_room', label: 'Dining Room' },
  { value: 'balcony', label: 'Balcony' },
  { value: 'study_room', label: 'Study Room' },
  { value: 'kids_room', label: "Kids Room" },
  { value: 'guest_room', label: 'Guest Room' },
  { value: 'pooja_room', label: 'Pooja Room' },
  { value: 'home_office', label: 'Home Office' },
  { value: 'gym', label: 'Gym' },
  { value: 'entertainment_room', label: 'Entertainment Room' },
  { value: 'utility_room', label: 'Utility Room' },
];

export function BulkUpload({
  projectId,
  maxRooms,
  currentRoomCount,
  open,
  onOpenChange,
}: BulkUploadProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const createBatch = useCreateBatch();
  const updateBatch = useUpdateBatch();
  
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  const remainingSlots = maxRooms - currentRoomCount;

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const limitedFiles = acceptedFiles.slice(0, remainingSlots);
    
    if (acceptedFiles.length > remainingSlots) {
      toast({
        title: 'Too many files',
        description: `Only ${remainingSlots} room slots remaining. First ${remainingSlots} files selected.`,
        variant: 'destructive',
      });
    }

    const newFiles: FileWithPreview[] = limitedFiles.map((file, index) => {
      // Extract room name from filename
      const fileName = file.name || 'unknown';
      const nameWithoutExt = fileName.replace(/\.[^/.]+$/, '');
      const cleanName = nameWithoutExt
        .replace(/[-_]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

      // Use proper wrapper pattern instead of Object.assign on File objects
      return {
        file,  // Store original File object
        preview: URL.createObjectURL(file),
        roomName: cleanName || `Room ${currentRoomCount + index + 1}`,
        roomType: 'living_room',
        uploadStatus: 'pending' as const,
      };
    });

    setFiles(prev => [...prev, ...newFiles].slice(0, remainingSlots));
  }, [remainingSlots, currentRoomCount, toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.heic'],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    disabled: isUploading || files.length >= remainingSlots,
  });

  const removeFile = (index: number) => {
    setFiles(prev => {
      const newFiles = [...prev];
      URL.revokeObjectURL(newFiles[index].preview);
      newFiles.splice(index, 1);
      return newFiles;
    });
  };

  const updateFile = (index: number, updates: Partial<FileWithPreview>) => {
    setFiles(prev => {
      const newFiles = [...prev];
      newFiles[index] = { ...newFiles[index], ...updates };
      return newFiles;
    });
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    setIsUploading(true);
    setUploadProgress(0);
    setCompletedCount(0);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // Create batch record
      const batch = await createBatch.mutateAsync({
        projectId,
        batchType: 'upload',
        totalItems: files.length,
        metadata: { fileNames: files.map(f => f.file?.name || 'unknown') },
      });

      // Get current max room number
      const { data: existingRooms } = await supabase
        .from('rooms')
        .select('room_number')
        .eq('project_id', projectId)
        .order('room_number', { ascending: false })
        .limit(1);

      let roomNumber = (existingRooms?.[0]?.room_number || 0) + 1;

      // Upload files in parallel with concurrency limit
      const CONCURRENCY = 3;
      const results: { success: boolean; roomId?: string; error?: string }[] = [];

      for (let i = 0; i < files.length; i += CONCURRENCY) {
        const chunk = files.slice(i, i + CONCURRENCY);
        
        const chunkResults = await Promise.all(
          chunk.map(async (file, chunkIndex) => {
            const fileIndex = i + chunkIndex;
            const currentRoomNumber = roomNumber + fileIndex;

            try {
              // Update file status to uploading
              updateFile(fileIndex, { uploadStatus: 'uploading' });

              // Create room record
              const { data: room, error: roomError } = await supabase
                .from('rooms')
                .insert({
                  project_id: projectId,
                  room_number: currentRoomNumber,
                  room_name: file.roomName,
                  room_type: file.roomType as any,
                  batch_id: batch.id,
                  batch_position: fileIndex,
                  current_phase: 1,
                })
                .select()
                .single();

              if (roomError) throw roomError;

              // Upload image to storage - use file.file for the actual File object
              const originalFile = file.file;
              const fileExt = originalFile.name?.split('.').pop() || 'jpg';
              const storagePath = `${room.id}/original.${fileExt}`;
              
              const { error: uploadError } = await supabase.storage
                .from('room-images')
                .upload(storagePath, originalFile);

              if (uploadError) throw uploadError;

              // Create room_images record
              const { error: imageError } = await supabase
                .from('room_images')
                .insert({
                  room_id: room.id,
                  storage_path: storagePath,
                  file_name: originalFile.name || 'unknown',
                  file_size: originalFile.size || 0,
                  image_type: 'original',
                  phase: 1,
                  resolution: 'original',
                });

              if (imageError) throw imageError;

              // Update room phase_1_completed
              await supabase
                .from('rooms')
                .update({ phase_1_completed: true })
                .eq('id', room.id);

              // Update batch progress
              await supabase.rpc('increment_batch_completed', { p_batch_id: batch.id });

              updateFile(fileIndex, { uploadStatus: 'success' });
              setCompletedCount(prev => prev + 1);
              setUploadProgress(((fileIndex + 1) / files.length) * 100);

              return { success: true, roomId: room.id };
            } catch (error) {
              const errorMsg = error instanceof Error ? error.message : 'Upload failed';
              updateFile(fileIndex, { uploadStatus: 'error', error: errorMsg });
              await supabase.rpc('increment_batch_failed', { 
                p_batch_id: batch.id,
                p_error: errorMsg,
              });
              return { success: false, error: errorMsg };
            }
          })
        );

        results.push(...chunkResults);
      }

      const successCount = results.filter(r => r.success).length;
      const failedCount = results.filter(r => !r.success).length;

      // Invalidate queries
      queryClient.invalidateQueries({ queryKey: ['rooms', projectId] });
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });

      toast({
        title: 'Bulk upload complete',
        description: `${successCount} rooms uploaded${failedCount > 0 ? `, ${failedCount} failed` : ''}`,
        variant: failedCount > 0 ? 'destructive' : 'default',
      });

      if (failedCount === 0) {
        onOpenChange(false);
        setFiles([]);
      }
    } catch (error) {
      toast({
        title: 'Upload failed',
        description: error instanceof Error ? error.message : 'Unknown error',
        variant: 'destructive',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleClose = () => {
    if (!isUploading) {
      files.forEach(file => URL.revokeObjectURL(file.preview));
      setFiles([]);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Bulk Upload Rooms
          </DialogTitle>
          <DialogDescription>
            Upload multiple room images at once. {remainingSlots} room slots remaining.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Dropzone */}
          <div
            {...getRootProps()}
            className={`
              border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
              transition-colors
              ${isDragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25 hover:border-primary/50'}
              ${isUploading || files.length >= remainingSlots ? 'opacity-50 cursor-not-allowed' : ''}
            `}
          >
            <input {...getInputProps()} />
            <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            {isDragActive ? (
              <p className="text-primary">Drop images here...</p>
            ) : (
              <>
                <p className="font-medium">Drag & drop room images here</p>
                <p className="text-sm text-muted-foreground mt-1">
                  or click to select files (max 10MB each)
                </p>
              </>
            )}
          </div>

          {/* File List */}
          {files.length > 0 && (
            <ScrollArea className="h-[300px] border rounded-lg p-4 overflow-x-hidden">
              <div className="space-y-3 overflow-x-hidden">
                {files.map((file, index) => (
                  <div
                    key={`${file.file?.name || 'file'}-${index}`}
                    className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg"
                  >
                    {/* Preview */}
                    <div className="h-16 w-16 rounded overflow-hidden flex-shrink-0 bg-muted">
                      {file.preview ? (
                        <img
                          src={file.preview}
                          alt={file.roomName}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center">
                          <ImageIcon className="h-8 w-8 text-muted-foreground" />
                        </div>
                      )}
                    </div>

                    {/* Details - Grid layout to prevent overflow */}
                    <div className="flex-1 min-w-0 space-y-2">
                      <div className="grid grid-cols-[1fr_140px] gap-2">
                        <Input
                          value={file.roomName}
                          onChange={(e) => updateFile(index, { roomName: e.target.value })}
                          className="h-8 min-w-0"
                          disabled={isUploading}
                        />
                        <Select
                          value={file.roomType}
                          onValueChange={(value) => updateFile(index, { roomType: value })}
                          disabled={isUploading}
                        >
                          <SelectTrigger className="h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="z-[1000]">
                            {roomTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        {file.file?.name || 'Unknown file'} ({((file.file?.size || 0) / 1024 / 1024).toFixed(2)} MB)
                      </p>
                    </div>

                    {/* Status */}
                    <div className="flex-shrink-0">
                      {file.uploadStatus === 'pending' && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => removeFile(index)}
                          disabled={isUploading}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                      {file.uploadStatus === 'uploading' && (
                        <Loader2 className="h-5 w-5 animate-spin text-primary" />
                      )}
                      {file.uploadStatus === 'success' && (
                        <Check className="h-5 w-5 text-success" />
                      )}
                      {file.uploadStatus === 'error' && (
                        <AlertCircle className="h-5 w-5 text-destructive" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}

          {/* Upload Progress */}
          {isUploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Uploading {completedCount} of {files.length} rooms...</span>
                <span>{Math.round(uploadProgress)}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2" />
            </div>
          )}

          {/* Actions */}
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              {files.length} file{files.length !== 1 ? 's' : ''} selected
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleClose} disabled={isUploading}>
                Cancel
              </Button>
              <Button
                onClick={handleUpload}
                disabled={files.length === 0 || isUploading}
              >
                {isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload {files.length} Room{files.length !== 1 ? 's' : ''}
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
