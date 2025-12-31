-- Fix the quality_score column in renders table to support 0-100 scores
-- Current: numeric(3,2) can only store -9.99 to 9.99
-- New: numeric(5,2) can store up to 999.99, supporting 0-100 scores

ALTER TABLE public.renders 
ALTER COLUMN quality_score TYPE numeric(5,2);

-- Also fix quality_metrics.score if it has the same issue
ALTER TABLE public.quality_metrics 
ALTER COLUMN score TYPE numeric(5,2);

-- Fix render_versions.quality_score as well
ALTER TABLE public.render_versions 
ALTER COLUMN quality_score TYPE numeric(5,2);

-- Fix render_versions.ai_validation_score
ALTER TABLE public.render_versions 
ALTER COLUMN ai_validation_score TYPE numeric(5,2);