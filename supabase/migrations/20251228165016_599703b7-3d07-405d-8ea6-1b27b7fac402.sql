-- Add mirror_count, mirror_positions, and ac_unit_count to room_analysis table
ALTER TABLE public.room_analysis
ADD COLUMN IF NOT EXISTS mirror_count integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS mirror_positions jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS ac_unit_count integer DEFAULT 0;