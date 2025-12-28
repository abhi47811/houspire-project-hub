-- Add generation_path and custom_prompt columns to rooms table
ALTER TABLE public.rooms 
ADD COLUMN IF NOT EXISTS generation_path TEXT CHECK (generation_path IN ('smart_defaults', 'library', 'manual', 'bypass')),
ADD COLUMN IF NOT EXISTS custom_prompt TEXT;