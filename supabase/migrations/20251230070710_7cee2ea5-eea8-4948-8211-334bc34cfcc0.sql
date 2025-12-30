-- First, deduplicate existing render_versions by keeping the newest per (room_id, storage_path)
WITH duplicates AS (
  SELECT id, 
         ROW_NUMBER() OVER (PARTITION BY room_id, storage_path ORDER BY created_at DESC) as rn
  FROM public.render_versions
  WHERE storage_path IS NOT NULL AND storage_path != ''
)
DELETE FROM public.render_versions
WHERE id IN (SELECT id FROM duplicates WHERE rn > 1);

-- Now add a unique constraint to prevent future duplicates
CREATE UNIQUE INDEX IF NOT EXISTS render_versions_room_storage_unique 
ON public.render_versions (room_id, storage_path) 
WHERE storage_path IS NOT NULL AND storage_path != '';