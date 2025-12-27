-- Fix the SECURITY DEFINER view issue by dropping it
-- The view causes security issues - use RLS on the base table instead

DROP VIEW IF EXISTS public.api_logs_safe;

-- The api_logs table already has proper RLS policies
-- Admins can query metadata directly, non-admins get filtered data in application layer