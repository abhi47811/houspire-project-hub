-- Create job_queue table for background processing
CREATE TABLE public.job_queue (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  job_type TEXT NOT NULL CHECK (job_type IN ('analysis', 'cleaning', 'generation', 'upscale', 'validation')),
  room_id UUID NOT NULL REFERENCES public.rooms(id) ON DELETE CASCADE,
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'cancelled')),
  priority INTEGER NOT NULL DEFAULT 5 CHECK (priority >= 0 AND priority <= 10),
  retry_count INTEGER NOT NULL DEFAULT 0,
  max_retries INTEGER NOT NULL DEFAULT 3,
  error_message TEXT,
  payload JSONB DEFAULT '{}'::jsonb,
  result JSONB DEFAULT NULL,
  scheduled_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes for efficient querying
CREATE INDEX idx_job_queue_status ON public.job_queue(status);
CREATE INDEX idx_job_queue_room_id ON public.job_queue(room_id);
CREATE INDEX idx_job_queue_project_id ON public.job_queue(project_id);
CREATE INDEX idx_job_queue_priority_scheduled ON public.job_queue(priority DESC, scheduled_at ASC) WHERE status = 'pending';

-- Enable RLS
ALTER TABLE public.job_queue ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Users can view jobs for their projects"
ON public.job_queue FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM projects p
    WHERE p.id = job_queue.project_id
    AND (p.created_by = auth.uid() OR p.assigned_to = auth.uid())
  )
);

CREATE POLICY "Users can create jobs for their projects"
ON public.job_queue FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM projects p
    WHERE p.id = job_queue.project_id
    AND (p.created_by = auth.uid() OR p.assigned_to = auth.uid())
  )
);

CREATE POLICY "Users can update jobs for their projects"
ON public.job_queue FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM projects p
    WHERE p.id = job_queue.project_id
    AND (p.created_by = auth.uid() OR p.assigned_to = auth.uid())
  )
);

CREATE POLICY "Admins can manage all jobs"
ON public.job_queue FOR ALL
USING (get_user_role(auth.uid()) = 'admin');

-- System policy for edge functions to update jobs
CREATE POLICY "System can update job status"
ON public.job_queue FOR UPDATE
USING (true);

-- Trigger for updated_at
CREATE TRIGGER update_job_queue_updated_at
BEFORE UPDATE ON public.job_queue
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for job_queue
ALTER PUBLICATION supabase_realtime ADD TABLE public.job_queue;

-- Function to get next pending job
CREATE OR REPLACE FUNCTION public.get_next_job(p_project_id UUID DEFAULT NULL)
RETURNS SETOF job_queue
LANGUAGE sql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
  SELECT * FROM job_queue
  WHERE status = 'pending'
  AND scheduled_at <= now()
  AND (p_project_id IS NULL OR project_id = p_project_id)
  ORDER BY priority DESC, scheduled_at ASC
  LIMIT 1
  FOR UPDATE SKIP LOCKED;
$$;

-- Function to claim a job for processing
CREATE OR REPLACE FUNCTION public.claim_job(p_job_id UUID)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  UPDATE job_queue
  SET status = 'processing',
      started_at = now(),
      updated_at = now()
  WHERE id = p_job_id
  AND status = 'pending';
  
  RETURN FOUND;
END;
$$;

-- Function to complete a job
CREATE OR REPLACE FUNCTION public.complete_job(
  p_job_id UUID,
  p_result JSONB DEFAULT NULL
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  UPDATE job_queue
  SET status = 'completed',
      result = p_result,
      completed_at = now(),
      updated_at = now()
  WHERE id = p_job_id
  AND status = 'processing';
  
  RETURN FOUND;
END;
$$;

-- Function to fail a job with retry logic
CREATE OR REPLACE FUNCTION public.fail_job(
  p_job_id UUID,
  p_error_message TEXT
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_retry_count INTEGER;
  v_max_retries INTEGER;
  v_new_status TEXT;
BEGIN
  SELECT retry_count, max_retries INTO v_retry_count, v_max_retries
  FROM job_queue WHERE id = p_job_id;
  
  IF v_retry_count < v_max_retries THEN
    v_new_status := 'pending';
  ELSE
    v_new_status := 'failed';
  END IF;
  
  UPDATE job_queue
  SET status = v_new_status,
      error_message = p_error_message,
      retry_count = retry_count + 1,
      scheduled_at = CASE 
        WHEN v_new_status = 'pending' THEN now() + (power(2, retry_count + 1) * interval '1 second')
        ELSE scheduled_at
      END,
      completed_at = CASE WHEN v_new_status = 'failed' THEN now() ELSE NULL END,
      updated_at = now()
  WHERE id = p_job_id;
  
  RETURN FOUND;
END;
$$;