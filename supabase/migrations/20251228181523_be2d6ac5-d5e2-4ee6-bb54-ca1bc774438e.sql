-- Add version tracking to rooms table for cleaning refinements
ALTER TABLE rooms 
ADD COLUMN IF NOT EXISTS cleaning_versions JSONB DEFAULT '[]'::jsonb;

-- Add version tracking to renders table for render refinements
ALTER TABLE renders 
ADD COLUMN IF NOT EXISTS render_versions JSONB DEFAULT '[]'::jsonb;

-- Add index for faster queries
CREATE INDEX IF NOT EXISTS idx_rooms_cleaning_versions ON rooms USING GIN (cleaning_versions);
CREATE INDEX IF NOT EXISTS idx_renders_render_versions ON renders USING GIN (render_versions);