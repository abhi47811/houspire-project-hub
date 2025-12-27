-- Fix SECURITY DEFINER views by recreating them with SECURITY INVOKER
-- This ensures views respect the RLS policies of the querying user

-- Drop existing views
DROP VIEW IF EXISTS public.library_performance_summary;
DROP VIEW IF EXISTS public.library_top_performers;
DROP VIEW IF EXISTS public.user_library_contributions;

-- Recreate views with SECURITY INVOKER (default, but explicitly set)
CREATE VIEW public.library_performance_summary
WITH (security_invoker = on)
AS
SELECT 
  id,
  image_url,
  source_type,
  room_type,
  design_style,
  city,
  quality_score,
  tier,
  times_selected,
  times_led_to_approval,
  times_led_to_rejection,
  approval_rate,
  CASE 
    WHEN times_selected = 0 THEN 'Unused'
    WHEN approval_rate >= 0.9 THEN 'Excellent'
    WHEN approval_rate >= 0.8 THEN 'Good'
    WHEN approval_rate >= 0.7 THEN 'Fair'
    ELSE 'Poor'
  END as performance_label,
  CASE 
    WHEN times_selected < 5 THEN 50
    ELSE LEAST(100, (approval_rate * 100) + (times_selected / 2))
  END as trust_score,
  status,
  created_at,
  last_used_at
FROM public.style_library
WHERE status = 'active';

CREATE VIEW public.library_top_performers
WITH (security_invoker = on)
AS
SELECT 
  id,
  image_url,
  thumbnail_url,
  source_type,
  room_type,
  design_style,
  city,
  quality_score,
  tier,
  approval_rate,
  times_selected,
  ranking_score
FROM public.style_library
WHERE 
  status = 'active'
  AND times_selected >= 5
  AND approval_rate >= 0.85
ORDER BY 
  ranking_score DESC,
  approval_rate DESC,
  times_selected DESC
LIMIT 100;

CREATE VIEW public.user_library_contributions
WITH (security_invoker = on)
AS
SELECT 
  sl.original_uploader_id as user_id,
  COUNT(*) as total_contributions,
  COUNT(*) FILTER (WHERE sl.tier = 'featured') as featured_count,
  COUNT(*) FILTER (WHERE sl.tier = 'standard') as standard_count,
  COUNT(*) FILTER (WHERE sl.tier = 'unverified') as unverified_count,
  SUM(sl.times_selected) as total_times_selected,
  SUM(sl.times_led_to_approval) as total_approvals,
  AVG(sl.approval_rate) as avg_approval_rate,
  MAX(sl.created_at) as last_contribution_at
FROM public.style_library sl
WHERE 
  sl.source_type = 'user_upload'
  AND sl.status = 'active'
GROUP BY sl.original_uploader_id;