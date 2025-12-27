-- Security fixes for identified vulnerabilities

-- 1. Fix vendors table: Restrict to authenticated users only, not public
-- Drop the permissive "true" policy and replace with authenticated-only
DROP POLICY IF EXISTS "Authenticated users can view vendors" ON public.vendors;

CREATE POLICY "Authenticated users can view vendors" 
ON public.vendors 
FOR SELECT 
TO authenticated
USING (true);

-- 2. Restrict pricing_reference to authenticated users only
DROP POLICY IF EXISTS "Authenticated users can view pricing" ON public.pricing_reference;

CREATE POLICY "Authenticated users can view pricing" 
ON public.pricing_reference 
FOR SELECT 
TO authenticated
USING (true);

-- 3. Restrict smart_defaults to authenticated users only  
DROP POLICY IF EXISTS "Authenticated users can view smart defaults" ON public.smart_defaults;

CREATE POLICY "Authenticated users can view smart defaults" 
ON public.smart_defaults 
FOR SELECT 
TO authenticated
USING (true);

-- 4. Restrict api_logs metadata - hide sensitive data from non-admins
DROP POLICY IF EXISTS "Users can view logs for their projects" ON public.api_logs;

CREATE POLICY "Users can view limited logs for their projects" 
ON public.api_logs 
FOR SELECT
USING (
  ((project_id IS NULL) OR (EXISTS ( SELECT 1
   FROM projects p
  WHERE ((p.id = api_logs.project_id) AND ((p.created_by = auth.uid()) OR (p.assigned_to = auth.uid()))))))
);

-- 5. Fix job_queue "System can update job status" - should be service role only
DROP POLICY IF EXISTS "System can update job status" ON public.job_queue;

-- The system updates should happen via security definer functions only
-- which already exist (claim_job, complete_job, fail_job)

-- 6. Add session expiry - sessions older than 30 days should be auto-cleaned
-- Create a function to clean old sessions
CREATE OR REPLACE FUNCTION public.cleanup_expired_sessions()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_deleted INTEGER;
BEGIN
  -- Delete sessions older than 30 days
  DELETE FROM user_sessions 
  WHERE created_at < now() - interval '30 days';
  
  GET DIAGNOSTICS v_deleted = ROW_COUNT;
  RETURN v_deleted;
END;
$$;

-- 7. Create a view for api_logs that hides sensitive metadata for non-admins
CREATE OR REPLACE VIEW public.api_logs_safe AS
SELECT 
  id,
  service,
  endpoint,
  status,
  cost_usd,
  input_tokens,
  output_tokens,
  latency_ms,
  error_message,
  project_id,
  room_id,
  created_at,
  created_by,
  model,
  -- Hide metadata for non-admins
  CASE 
    WHEN get_user_role(auth.uid()) = 'admin' THEN metadata
    ELSE NULL
  END as metadata
FROM api_logs;

-- 8. Grant access to the safe view
GRANT SELECT ON public.api_logs_safe TO authenticated;

-- 9. Add input validation function for file uploads
CREATE OR REPLACE FUNCTION public.validate_file_upload(
  p_file_name text,
  p_file_size integer,
  p_content_type text
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_max_size INTEGER := 10485760; -- 10MB
  v_allowed_types TEXT[] := ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/heic'];
BEGIN
  -- Check file size
  IF p_file_size > v_max_size THEN
    RAISE EXCEPTION 'File size exceeds maximum allowed (10MB)';
  END IF;
  
  -- Check content type
  IF NOT (p_content_type = ANY(v_allowed_types)) THEN
    RAISE EXCEPTION 'File type not allowed. Allowed: JPEG, PNG, WebP, HEIC';
  END IF;
  
  -- Check file name for suspicious patterns (basic sanitization)
  IF p_file_name ~ '[<>:"/\\|?*]' THEN
    RAISE EXCEPTION 'Invalid characters in file name';
  END IF;
  
  RETURN true;
END;
$$;