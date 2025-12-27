-- Create storage bucket for room images
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'room-images',
  'room-images',
  false,
  10485760, -- 10MB
  ARRAY['image/jpeg', 'image/png', 'image/webp']
);

-- Create room_images table
CREATE TABLE public.room_images (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  room_id UUID NOT NULL REFERENCES public.rooms(id) ON DELETE CASCADE,
  phase INTEGER NOT NULL,
  image_type TEXT NOT NULL,
  resolution TEXT NOT NULL,
  storage_path TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_size INTEGER,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create index for faster lookups
CREATE INDEX idx_room_images_room_phase ON public.room_images(room_id, phase);

-- Enable RLS
ALTER TABLE public.room_images ENABLE ROW LEVEL SECURITY;

-- RLS Policies for room_images
CREATE POLICY "Users can view images for their project rooms"
ON public.room_images
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM rooms r
    JOIN projects p ON p.id = r.project_id
    WHERE r.id = room_images.room_id
    AND (p.created_by = auth.uid() OR p.assigned_to = auth.uid())
  )
);

CREATE POLICY "Users can insert images for their project rooms"
ON public.room_images
FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM rooms r
    JOIN projects p ON p.id = r.project_id
    WHERE r.id = room_images.room_id
    AND (p.created_by = auth.uid() OR p.assigned_to = auth.uid())
  )
);

CREATE POLICY "Users can delete images for their project rooms"
ON public.room_images
FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM rooms r
    JOIN projects p ON p.id = r.project_id
    WHERE r.id = room_images.room_id
    AND (p.created_by = auth.uid() OR p.assigned_to = auth.uid())
  )
);

CREATE POLICY "Admins can manage all room images"
ON public.room_images
FOR ALL
USING (get_user_role(auth.uid()) = 'admin');

-- Storage policies for room-images bucket
CREATE POLICY "Users can view images in their projects"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'room-images'
  AND EXISTS (
    SELECT 1 FROM projects p
    WHERE p.id::text = (storage.foldername(name))[1]
    AND (p.created_by = auth.uid() OR p.assigned_to = auth.uid())
  )
);

CREATE POLICY "Users can upload images to their projects"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'room-images'
  AND EXISTS (
    SELECT 1 FROM projects p
    WHERE p.id::text = (storage.foldername(name))[1]
    AND (p.created_by = auth.uid() OR p.assigned_to = auth.uid())
  )
);

CREATE POLICY "Users can delete images from their projects"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'room-images'
  AND EXISTS (
    SELECT 1 FROM projects p
    WHERE p.id::text = (storage.foldername(name))[1]
    AND (p.created_by = auth.uid() OR p.assigned_to = auth.uid())
  )
);

CREATE POLICY "Admins can manage all storage objects"
ON storage.objects
FOR ALL
USING (
  bucket_id = 'room-images'
  AND get_user_role(auth.uid()) = 'admin'
);

-- Trigger for updated_at
CREATE TRIGGER update_room_images_updated_at
BEFORE UPDATE ON public.room_images
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();