
-- Storage policies for room-images bucket

-- Allow authenticated users to upload images
CREATE POLICY "Users can upload room images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'room-images' 
  AND auth.uid() IS NOT NULL
);

-- Allow users to view images for their projects
CREATE POLICY "Users can view room images for their projects"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'room-images'
  AND (
    EXISTS (
      SELECT 1 FROM public.room_images ri
      JOIN public.rooms r ON r.id = ri.room_id
      JOIN public.projects p ON p.id = r.project_id
      WHERE ri.storage_path = name
      AND (p.created_by = auth.uid() OR p.assigned_to = auth.uid())
    )
    OR
    -- Admin access
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  )
);

-- Allow users to delete their own uploaded images
CREATE POLICY "Users can delete room images for their projects"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'room-images'
  AND (
    EXISTS (
      SELECT 1 FROM public.room_images ri
      JOIN public.rooms r ON r.id = ri.room_id
      JOIN public.projects p ON p.id = r.project_id
      WHERE ri.storage_path = name
      AND (p.created_by = auth.uid() OR p.assigned_to = auth.uid())
    )
    OR
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE id = auth.uid() AND role = 'admin'
    )
  )
);

-- Allow admins full access to all images
CREATE POLICY "Admins can manage all room images"
ON storage.objects
FOR ALL
TO authenticated
USING (
  bucket_id = 'room-images'
  AND EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = 'admin'
  )
);
