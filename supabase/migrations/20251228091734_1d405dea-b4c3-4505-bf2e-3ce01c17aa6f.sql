-- Add library_reference_id column to rooms table for tracking which library image was used
ALTER TABLE public.rooms 
ADD COLUMN IF NOT EXISTS library_reference_id uuid REFERENCES public.style_library(id);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_rooms_library_reference_id ON public.rooms(library_reference_id);