-- Create batches table for tracking batch operations
CREATE TABLE public.batches (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  batch_type TEXT NOT NULL, -- 'upload', 'analyze', 'cleanup', 'generate', 'export'
  total_items INTEGER NOT NULL DEFAULT 0,
  completed_items INTEGER NOT NULL DEFAULT 0,
  failed_items INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'pending', -- 'pending', 'processing', 'completed', 'failed', 'cancelled'
  started_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  error_message TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add batch columns to rooms table
ALTER TABLE public.rooms
ADD COLUMN batch_id UUID REFERENCES public.batches(id) ON DELETE SET NULL,
ADD COLUMN batch_position INTEGER;

-- Create index for batch lookups
CREATE INDEX idx_rooms_batch_id ON public.rooms(batch_id);
CREATE INDEX idx_batches_project_id ON public.batches(project_id);
CREATE INDEX idx_batches_status ON public.batches(status);

-- Enable RLS on batches
ALTER TABLE public.batches ENABLE ROW LEVEL SECURITY;

-- RLS Policies for batches
CREATE POLICY "Admins can manage all batches"
ON public.batches FOR ALL
USING (get_user_role(auth.uid()) = 'admin'::user_role);

CREATE POLICY "Users can view batches for their projects"
ON public.batches FOR SELECT
USING (EXISTS (
  SELECT 1 FROM projects p
  WHERE p.id = batches.project_id
  AND (p.created_by = auth.uid() OR p.assigned_to = auth.uid())
));

CREATE POLICY "Users can create batches for their projects"
ON public.batches FOR INSERT
WITH CHECK (EXISTS (
  SELECT 1 FROM projects p
  WHERE p.id = batches.project_id
  AND (p.created_by = auth.uid() OR p.assigned_to = auth.uid())
));

CREATE POLICY "Users can update batches for their projects"
ON public.batches FOR UPDATE
USING (EXISTS (
  SELECT 1 FROM projects p
  WHERE p.id = batches.project_id
  AND (p.created_by = auth.uid() OR p.assigned_to = auth.uid())
));

-- Helper function to increment batch completed count
CREATE OR REPLACE FUNCTION public.increment_batch_completed(p_batch_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_total INTEGER;
  v_completed INTEGER;
BEGIN
  UPDATE batches
  SET completed_items = completed_items + 1,
      updated_at = now()
  WHERE id = p_batch_id
  RETURNING total_items, completed_items INTO v_total, v_completed;
  
  -- Auto-complete batch if all items done
  IF v_completed >= v_total THEN
    UPDATE batches
    SET status = 'completed',
        completed_at = now(),
        updated_at = now()
    WHERE id = p_batch_id;
  END IF;
END;
$$;

-- Helper function to increment batch failed count
CREATE OR REPLACE FUNCTION public.increment_batch_failed(p_batch_id UUID, p_error TEXT DEFAULT NULL)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_total INTEGER;
  v_completed INTEGER;
  v_failed INTEGER;
BEGIN
  UPDATE batches
  SET failed_items = failed_items + 1,
      error_message = COALESCE(p_error, error_message),
      updated_at = now()
  WHERE id = p_batch_id
  RETURNING total_items, completed_items, failed_items INTO v_total, v_completed, v_failed;
  
  -- Auto-complete batch if all items processed
  IF (v_completed + v_failed) >= v_total THEN
    UPDATE batches
    SET status = CASE WHEN v_failed > 0 THEN 'completed' ELSE 'completed' END,
        completed_at = now(),
        updated_at = now()
    WHERE id = p_batch_id;
  END IF;
END;
$$;

-- Helper function to get batch progress
CREATE OR REPLACE FUNCTION public.get_batch_progress(p_batch_id UUID)
RETURNS TABLE(
  total_items INTEGER,
  completed_items INTEGER,
  failed_items INTEGER,
  progress_percent NUMERIC,
  status TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    b.total_items,
    b.completed_items,
    b.failed_items,
    CASE WHEN b.total_items > 0 
      THEN ROUND((b.completed_items + b.failed_items)::NUMERIC / b.total_items * 100, 1)
      ELSE 0
    END as progress_percent,
    b.status
  FROM batches b
  WHERE b.id = p_batch_id;
END;
$$;

-- Enable realtime for batches table
ALTER PUBLICATION supabase_realtime ADD TABLE public.batches;