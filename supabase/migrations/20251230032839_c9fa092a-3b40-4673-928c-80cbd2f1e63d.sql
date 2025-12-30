-- Add unique constraint on perceptual_hash to prevent future duplicates
CREATE UNIQUE INDEX IF NOT EXISTS style_library_unique_perceptual_hash 
ON style_library (perceptual_hash) 
WHERE perceptual_hash IS NOT NULL AND status = 'active';