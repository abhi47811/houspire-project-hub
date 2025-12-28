-- ============================================================================
-- ADMIN & QUALITY CONTROL MIGRATION
-- ============================================================================
-- Creates renders table, render_feedback, quality_metrics, project_activity_log
-- ============================================================================

-- ============================================================================
-- 1. CREATE RENDERS TABLE (Primary storage for generated renders)
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.renders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id UUID NOT NULL REFERENCES public.rooms(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  storage_path TEXT,
  prompt_used TEXT,
  model_used TEXT,
  provider TEXT,
  generation_time_ms INTEGER,
  -- Approval workflow
  approval_status TEXT DEFAULT 'pending' CHECK (approval_status IN ('pending', 'approved', 'rejected', 'needs_revision')),
  approved_by UUID REFERENCES public.profiles(id),
  approved_at TIMESTAMPTZ,
  rejection_reason TEXT,
  -- Quality scoring
  quality_score DECIMAL(3,2) CHECK (quality_score >= 0 AND quality_score <= 1),
  quality_details JSONB,
  -- Version tracking
  version_number INTEGER DEFAULT 1,
  parent_render_id UUID REFERENCES public.renders(id),
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on renders
ALTER TABLE public.renders ENABLE ROW LEVEL SECURITY;

-- RLS Policies for renders
CREATE POLICY "Users can view renders for their project rooms"
ON public.renders FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.rooms r
    JOIN public.projects p ON p.id = r.project_id
    WHERE r.id = renders.room_id
    AND (p.created_by = auth.uid() OR p.assigned_to = auth.uid())
  )
);

CREATE POLICY "Users can create renders for their project rooms"
ON public.renders FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.rooms r
    JOIN public.projects p ON p.id = r.project_id
    WHERE r.id = renders.room_id
    AND (p.created_by = auth.uid() OR p.assigned_to = auth.uid())
  )
);

CREATE POLICY "Users can update renders for their project rooms"
ON public.renders FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.rooms r
    JOIN public.projects p ON p.id = r.project_id
    WHERE r.id = renders.room_id
    AND (p.created_by = auth.uid() OR p.assigned_to = auth.uid())
  )
);

CREATE POLICY "Admins can manage all renders"
ON public.renders FOR ALL
USING (get_user_role(auth.uid()) = 'admin');

-- ============================================================================
-- 2. ADD COLUMNS TO PROJECTS TABLE (skip deadline, it exists)
-- ============================================================================

ALTER TABLE public.projects
ADD COLUMN IF NOT EXISTS deadline_alert_sent BOOLEAN DEFAULT FALSE,
ADD COLUMN IF NOT EXISTS priority TEXT DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent'));

-- ============================================================================
-- 3. CREATE RENDER FEEDBACK TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.render_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  render_id UUID NOT NULL REFERENCES public.renders(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  feedback_type TEXT NOT NULL CHECK (feedback_type IN ('admin_review', 'client_feedback', 'internal_note')),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  issues JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on render_feedback
ALTER TABLE public.render_feedback ENABLE ROW LEVEL SECURITY;

-- RLS Policies for render_feedback
CREATE POLICY "Users can view feedback on their renders"
ON public.render_feedback FOR SELECT
USING (
  auth.uid() IN (
    SELECT p.created_by FROM public.projects p
    JOIN public.rooms r ON p.id = r.project_id
    JOIN public.renders rn ON r.id = rn.room_id
    WHERE rn.id = render_feedback.render_id
  )
  OR auth.uid() = user_id
);

CREATE POLICY "Users can create feedback"
ON public.render_feedback FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can manage all feedback"
ON public.render_feedback FOR ALL
USING (get_user_role(auth.uid()) = 'admin');

-- ============================================================================
-- 4. CREATE QUALITY METRICS TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.quality_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  render_id UUID NOT NULL REFERENCES public.renders(id) ON DELETE CASCADE,
  metric_name TEXT NOT NULL,
  score DECIMAL(3,2) NOT NULL CHECK (score >= 0 AND score <= 1),
  details JSONB,
  measured_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(render_id, metric_name)
);

-- Enable RLS on quality_metrics
ALTER TABLE public.quality_metrics ENABLE ROW LEVEL SECURITY;

-- RLS Policies for quality_metrics
CREATE POLICY "Users can view quality metrics"
ON public.quality_metrics FOR SELECT
USING (true);

CREATE POLICY "System can insert quality metrics"
ON public.quality_metrics FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can manage all quality metrics"
ON public.quality_metrics FOR ALL
USING (get_user_role(auth.uid()) = 'admin');

-- ============================================================================
-- 5. CREATE PROJECT ACTIVITY LOG TABLE
-- ============================================================================

CREATE TABLE IF NOT EXISTS public.project_activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  room_id UUID REFERENCES public.rooms(id) ON DELETE CASCADE,
  render_id UUID REFERENCES public.renders(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  activity_type TEXT NOT NULL,
  description TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on project_activity_log
ALTER TABLE public.project_activity_log ENABLE ROW LEVEL SECURITY;

-- RLS Policies for project_activity_log
CREATE POLICY "Users can view activity on their projects"
ON public.project_activity_log FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.projects p
    WHERE p.id = project_activity_log.project_id
    AND (p.created_by = auth.uid() OR p.assigned_to = auth.uid())
  )
);

CREATE POLICY "System can insert activity logs"
ON public.project_activity_log FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can manage all activity logs"
ON public.project_activity_log FOR ALL
USING (get_user_role(auth.uid()) = 'admin');

-- ============================================================================
-- 6. CREATE INDEXES FOR PERFORMANCE
-- ============================================================================

CREATE INDEX IF NOT EXISTS idx_renders_room_id ON public.renders(room_id);
CREATE INDEX IF NOT EXISTS idx_renders_approval_status ON public.renders(approval_status);
CREATE INDEX IF NOT EXISTS idx_renders_approved_by ON public.renders(approved_by);
CREATE INDEX IF NOT EXISTS idx_renders_quality_score ON public.renders(quality_score);
CREATE INDEX IF NOT EXISTS idx_renders_parent_render_id ON public.renders(parent_render_id);
CREATE INDEX IF NOT EXISTS idx_projects_priority ON public.projects(priority);
CREATE INDEX IF NOT EXISTS idx_render_feedback_render_id ON public.render_feedback(render_id);
CREATE INDEX IF NOT EXISTS idx_render_feedback_user_id ON public.render_feedback(user_id);
CREATE INDEX IF NOT EXISTS idx_quality_metrics_render_id ON public.quality_metrics(render_id);
CREATE INDEX IF NOT EXISTS idx_project_activity_log_project_id ON public.project_activity_log(project_id);
CREATE INDEX IF NOT EXISTS idx_project_activity_log_created_at ON public.project_activity_log(created_at DESC);

-- ============================================================================
-- 7. CREATE HELPER FUNCTIONS
-- ============================================================================

-- Function: Get pending renders for admin review
CREATE OR REPLACE FUNCTION public.get_pending_renders_for_review()
RETURNS TABLE (
  render_id UUID,
  project_id UUID,
  project_name TEXT,
  room_type TEXT,
  renderer_name TEXT,
  created_at TIMESTAMPTZ,
  quality_score DECIMAL
) 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    rn.id AS render_id,
    p.id AS project_id,
    p.name AS project_name,
    rm.room_type::TEXT,
    prof.full_name AS renderer_name,
    rn.created_at,
    rn.quality_score
  FROM public.renders rn
  JOIN public.rooms rm ON rn.room_id = rm.id
  JOIN public.projects p ON rm.project_id = p.id
  JOIN public.profiles prof ON p.created_by = prof.id
  WHERE rn.approval_status = 'pending'
  ORDER BY rn.created_at ASC;
END;
$$;

-- Function: Get render version history
CREATE OR REPLACE FUNCTION public.get_render_version_history(p_render_id UUID)
RETURNS TABLE (
  render_id UUID,
  version_number INTEGER,
  image_url TEXT,
  approval_status TEXT,
  quality_score DECIMAL,
  created_at TIMESTAMPTZ,
  approved_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  RETURN QUERY
  WITH RECURSIVE version_tree AS (
    SELECT 
      r.id,
      r.version_number,
      r.image_url,
      r.approval_status,
      r.quality_score,
      r.created_at,
      r.approved_at,
      r.parent_render_id
    FROM public.renders r
    WHERE r.id = p_render_id
    
    UNION ALL
    
    SELECT 
      r.id,
      r.version_number,
      r.image_url,
      r.approval_status,
      r.quality_score,
      r.created_at,
      r.approved_at,
      r.parent_render_id
    FROM public.renders r
    JOIN version_tree vt ON r.id = vt.parent_render_id
  )
  SELECT 
    vt.id,
    vt.version_number,
    vt.image_url,
    vt.approval_status,
    vt.quality_score,
    vt.created_at,
    vt.approved_at
  FROM version_tree vt
  ORDER BY vt.version_number DESC;
END;
$$;

-- Function: Calculate overall quality score for a render
CREATE OR REPLACE FUNCTION public.calculate_quality_score(p_render_id UUID)
RETURNS DECIMAL
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  avg_score DECIMAL;
BEGIN
  SELECT AVG(score) INTO avg_score
  FROM public.quality_metrics
  WHERE render_id = p_render_id;
  
  RETURN COALESCE(avg_score, 0);
END;
$$;

-- Function: Log project activity
CREATE OR REPLACE FUNCTION public.log_project_activity(
  p_project_id UUID,
  p_user_id UUID,
  p_activity_type TEXT,
  p_description TEXT,
  p_room_id UUID DEFAULT NULL,
  p_render_id UUID DEFAULT NULL,
  p_metadata JSONB DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  activity_id UUID;
BEGIN
  INSERT INTO public.project_activity_log (
    project_id,
    room_id,
    render_id,
    user_id,
    activity_type,
    description,
    metadata
  ) VALUES (
    p_project_id,
    p_room_id,
    p_render_id,
    p_user_id,
    p_activity_type,
    p_description,
    p_metadata
  )
  RETURNING id INTO activity_id;
  
  RETURN activity_id;
END;
$$;

-- ============================================================================
-- 8. CREATE TRIGGERS
-- ============================================================================

-- Trigger function: Update quality_score when quality_metrics change
CREATE OR REPLACE FUNCTION public.update_render_quality_score()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = 'public'
AS $$
BEGIN
  UPDATE public.renders
  SET quality_score = calculate_quality_score(NEW.render_id),
      updated_at = NOW()
  WHERE id = NEW.render_id;
  
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trigger_update_quality_score ON public.quality_metrics;
CREATE TRIGGER trigger_update_quality_score
AFTER INSERT OR UPDATE ON public.quality_metrics
FOR EACH ROW
EXECUTE FUNCTION public.update_render_quality_score();

-- Trigger function: Auto-update updated_at on renders
CREATE OR REPLACE FUNCTION public.update_renders_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = 'public'
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trigger_renders_updated_at ON public.renders;
CREATE TRIGGER trigger_renders_updated_at
BEFORE UPDATE ON public.renders
FOR EACH ROW
EXECUTE FUNCTION public.update_renders_updated_at();