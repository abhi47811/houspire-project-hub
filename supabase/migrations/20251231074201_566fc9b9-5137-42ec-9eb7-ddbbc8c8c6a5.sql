-- Drop the old CHECK constraint that limits quality_score to 0-1
-- We need scores to be 0-100
ALTER TABLE public.renders DROP CONSTRAINT IF EXISTS renders_quality_score_check;

-- Add a new CHECK constraint for 0-100 range
ALTER TABLE public.renders ADD CONSTRAINT renders_quality_score_check 
CHECK (quality_score >= 0 AND quality_score <= 100);