-- Create api_logs table for cost tracking
CREATE TABLE public.api_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
  room_id UUID REFERENCES public.rooms(id) ON DELETE SET NULL,
  service TEXT NOT NULL,
  endpoint TEXT NOT NULL,
  model TEXT,
  input_tokens INTEGER,
  output_tokens INTEGER,
  cost_usd NUMERIC(10, 6) NOT NULL DEFAULT 0,
  latency_ms INTEGER,
  status TEXT NOT NULL DEFAULT 'success',
  error_message TEXT,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

-- Create indexes for efficient querying
CREATE INDEX idx_api_logs_project ON public.api_logs(project_id);
CREATE INDEX idx_api_logs_created_at ON public.api_logs(created_at DESC);
CREATE INDEX idx_api_logs_service ON public.api_logs(service);

-- Enable RLS
ALTER TABLE public.api_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view logs for their projects"
ON public.api_logs
FOR SELECT
USING (
  project_id IS NULL OR
  EXISTS (
    SELECT 1 FROM projects p
    WHERE p.id = api_logs.project_id
    AND (p.created_by = auth.uid() OR p.assigned_to = auth.uid())
  )
);

CREATE POLICY "System can insert logs"
ON public.api_logs
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can manage all logs"
ON public.api_logs
FOR ALL
USING (get_user_role(auth.uid()) = 'admin');