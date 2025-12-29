import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Upload,
  X,
  Image as ImageIcon,
  Loader2,
} from 'lucide-react';
import { cities } from '@/hooks/useProjectsData';

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

interface BulkUploadProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface UploadedFile {
  file: File;
  preview: string;
  id: string;
  roomType: string;
}

export function BulkUploadProjectModal({
  open,
  onOpenChange,
}: BulkUploadProjectModalProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [projectName, setProjectName] = useState('');
  const [clientName, setClientName] = useState('');
  const [city, setCity] = useState<string>('');
  const [budgetTier, setBudgetTier] = useState<string>('mid_range');
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [autoDetectRooms, setAutoDetectRooms] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Calculate deadline (72 hours from now)
  const defaultDeadline = new Date(Date.now() + 72 * 60 * 60 * 1000).toISOString().split('T')[0];
  const [deadline, setDeadline] = useState(defaultDeadline);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.slice(0, 20 - uploadedFiles.length).map(file => ({
      file,
      preview: URL.createObjectURL(file),
      id: crypto.randomUUID(),
      roomType: 'living_room',
    }));
    setUploadedFiles(prev => [...prev, ...newFiles]);
  }, [uploadedFiles.length]);

  const updateFileRoomType = (id: string, roomType: string) => {
    setUploadedFiles(prev => 
      prev.map(f => f.id === id ? { ...f, roomType } : f)
    );
  };

  const applyRoomTypeToAll = (roomType: string) => {
    setUploadedFiles(prev => prev.map(f => ({ ...f, roomType })));
    toast({ title: `Applied "${roomTypes.find(r => r.value === roomType)?.label}" to all images` });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp'],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    maxFiles: 20,
  });

  const removeFile = (id: string) => {
    setUploadedFiles(prev => {
      const file = prev.find(f => f.id === id);
      if (file) {
        URL.revokeObjectURL(file.preview);
      }
      return prev.filter(f => f.id !== id);
    });
  };

  const handleSubmit = async () => {
    if (!projectName.trim()) {
      toast({ title: 'Please enter a project name', variant: 'destructive' });
      return;
    }
    if (uploadedFiles.length === 0) {
      toast({ title: 'Please upload at least one image', variant: 'destructive' });
      return;
    }
    if (!user) {
      toast({ title: 'You must be logged in', variant: 'destructive' });
      return;
    }

    setIsSubmitting(true);
    setUploadProgress(0);

    try {
      // 1. Create the project
      const projectInsert: any = {
        name: projectName,
        client_name: clientName || null,
        budget_tier: budgetTier,
        deadline: deadline ? new Date(deadline).toISOString() : null,
        created_by: user.id,
        status: 'draft' as const,
        current_phase: 1,
        max_rooms: Math.max(uploadedFiles.length, 7),
        total_rooms: uploadedFiles.length,
      };
      
      if (city) {
        projectInsert.city = city as any;
      }

      const { data: project, error: projectError } = await supabase
        .from('projects')
        .insert(projectInsert)
        .select()
        .single();

      if (projectError) throw projectError;

      setUploadProgress(10);

      // 2. Create rooms and upload images
      const totalFiles = uploadedFiles.length;
      for (let i = 0; i < uploadedFiles.length; i++) {
        const { file, id } = uploadedFiles[i];
        
        // Create room
        const roomTypeLabel = roomTypes.find(t => t.value === uploadedFiles[i].roomType)?.label || 'Room';
        const { data: room, error: roomError } = await supabase
          .from('rooms')
          .insert({
            project_id: project.id,
            room_number: i + 1,
            room_name: `${roomTypeLabel} ${i + 1}`,
            room_type: uploadedFiles[i].roomType as any,
            current_phase: 1,
          })
          .select()
          .single();

        if (roomError) throw roomError;

        // Upload image to storage
        const fileExt = file.name.split('.').pop();
        const fileName = `${room.id}/original.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('room-images')
          .upload(fileName, file, {
            cacheControl: '3600',
            upsert: true,
          });

        if (uploadError) throw uploadError;

        // Create room_images record
        const { error: imageError } = await supabase
          .from('room_images')
          .insert({
            room_id: room.id,
            file_name: file.name,
            storage_path: fileName,
            image_type: 'original',
            phase: 1,
            resolution: '1920x1080', // Default, will be updated by analysis
            file_size: file.size,
          });

        if (imageError) throw imageError;

        // Update progress
        setUploadProgress(10 + ((i + 1) / totalFiles) * 80);
      }

      setUploadProgress(95);

      // 3. If auto-detect is enabled, trigger analysis (optional)
      // This would call an edge function to analyze rooms

      setUploadProgress(100);

      // Refresh projects list
      queryClient.invalidateQueries({ queryKey: ['enriched-projects'] });
      queryClient.invalidateQueries({ queryKey: ['projects'] });

      toast({
        title: 'Project created successfully',
        description: `${uploadedFiles.length} rooms have been added to "${projectName}"`,
      });

      // Navigate to the new project
      onOpenChange(false);
      navigate(`/projects/${project.id}`);

    } catch (error) {
      console.error('Error creating project:', error);
      toast({
        title: 'Failed to create project',
        description: error instanceof Error ? error.message : 'Unknown error',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      // Cleanup previews
      uploadedFiles.forEach(f => URL.revokeObjectURL(f.preview));
      setUploadedFiles([]);
      setProjectName('');
      setClientName('');
      setCity('');
      setBudgetTier('mid_range');
      setDeadline(defaultDeadline);
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Bulk Upload - Create New Project
          </DialogTitle>
          <DialogDescription>
            Create a new project and upload multiple room images at once (1-20 images)
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 pr-4">
          <div className="space-y-6 py-4">
            {/* Project Details */}
            <div className="space-y-4">
              <h3 className="font-medium">Project Details</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="project-name">Project Name *</Label>
                  <Input
                    id="project-name"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="e.g., Mumbai Apartment"
                    disabled={isSubmitting}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client-name">Client Name</Label>
                  <Input
                    id="client-name"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g., Sharma Residence"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Select value={city} onValueChange={setCity} disabled={isSubmitting}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      {cities.map((c) => (
                        <SelectItem key={c} value={c}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="budget-tier">Budget Tier</Label>
                  <Select value={budgetTier} onValueChange={setBudgetTier} disabled={isSubmitting}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select tier" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      <SelectItem value="premium">Premium (₹500)</SelectItem>
                      <SelectItem value="mid_range">Mid-Range (₹300)</SelectItem>
                      <SelectItem value="budget">Budget (₹100)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deadline">Deadline</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                    disabled={isSubmitting}
                  />
                </div>
              </div>
            </div>

            {/* Upload Zone */}
            <div className="space-y-4">
              <h3 className="font-medium">Upload Room Images (1-20)</h3>
              
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                  isDragActive 
                    ? 'border-primary bg-primary/5' 
                    : 'border-border hover:border-primary/50'
                } ${isSubmitting ? 'pointer-events-none opacity-50' : ''}`}
              >
                <input {...getInputProps()} />
                <Upload className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                {isDragActive ? (
                  <p className="text-primary font-medium">Drop images here...</p>
                ) : (
                  <div>
                    <p className="font-medium">Drag & drop images here</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      or click to browse • JPG, PNG, WEBP • Max 10MB each
                    </p>
                  </div>
                )}
              </div>

              {/* Uploaded Files Preview */}
              {uploadedFiles.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      Uploaded: {uploadedFiles.length} images
                    </span>
                    <div className="flex items-center gap-2">
                      {!isSubmitting && (
                        <Select onValueChange={applyRoomTypeToAll}>
                          <SelectTrigger className="w-[160px] h-8">
                            <SelectValue placeholder="Apply to all..." />
                          </SelectTrigger>
                          <SelectContent className="bg-popover">
                            {roomTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                      {!isSubmitting && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => {
                            uploadedFiles.forEach(f => URL.revokeObjectURL(f.preview));
                            setUploadedFiles([]);
                          }}
                        >
                          Clear All
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-3">
                    {uploadedFiles.map((file) => (
                      <div key={file.id} className="space-y-2">
                        <div className="relative group aspect-square">
                          <img
                            src={file.preview}
                            alt={file.file.name}
                            className="w-full h-full object-cover rounded-lg"
                          />
                          {!isSubmitting && (
                            <Button
                              variant="destructive"
                              size="icon"
                              className="absolute top-1 right-1 h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => removeFile(file.id)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          )}
                        </div>
                        <Select 
                          value={file.roomType} 
                          onValueChange={(v) => updateFileRoomType(file.id, v)}
                          disabled={isSubmitting}
                        >
                          <SelectTrigger className="h-8 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-popover">
                            {roomTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* AI Options */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="auto-detect"
                  checked={autoDetectRooms}
                  onCheckedChange={(checked) => setAutoDetectRooms(checked as boolean)}
                  disabled={isSubmitting}
                />
                <Label htmlFor="auto-detect" className="text-sm">
                  Auto-detect room types using AI
                </Label>
              </div>
            </div>

            {/* Upload Progress */}
            {isSubmitting && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Creating project...</span>
                  <span>{Math.round(uploadProgress)}%</span>
                </div>
                <Progress value={uploadProgress} className="h-2" />
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="flex justify-end gap-3 pt-4 border-t border-border">
          <Button variant="outline" onClick={handleClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting || !projectName.trim() || uploadedFiles.length === 0}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                Create Project
                {uploadedFiles.length > 0 && ` (${uploadedFiles.length} rooms)`}
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
