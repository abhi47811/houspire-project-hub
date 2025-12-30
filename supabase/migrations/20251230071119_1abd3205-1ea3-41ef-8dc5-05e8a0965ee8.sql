-- ============================================
-- FEATURE 2: Smart AI Recommendations Engine
-- 3 Tables, 40+ Fields, Indexes, RLS, Realtime
-- ============================================

-- ============================================
-- TABLE 1: ai_recommendations (18+ fields)
-- ============================================
CREATE TABLE public.ai_recommendations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  room_id UUID NOT NULL REFERENCES public.rooms(id) ON DELETE CASCADE,
  recommendation_type TEXT NOT NULL CHECK (recommendation_type IN ('style', 'furniture', 'budget', 'trend', 'comprehensive')),
  room_context JSONB NOT NULL DEFAULT '{}'::jsonb,
  recommended_styles JSONB DEFAULT '[]'::jsonb,
  furniture_suggestions JSONB DEFAULT '[]'::jsonb,
  budget_alternatives JSONB DEFAULT '[]'::jsonb,
  trend_data JSONB DEFAULT '{}'::jsonb,
  model_used TEXT DEFAULT 'google/gemini-2.5-flash',
  confidence_score NUMERIC(5,2) CHECK (confidence_score >= 0 AND confidence_score <= 100),
  reasoning TEXT,
  was_accepted BOOLEAN DEFAULT false,
  selected_option TEXT,
  user_feedback TEXT,
  generated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (now() + INTERVAL '7 days'),
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT valid_recommendation_data CHECK (
    (recommendation_type = 'style' AND jsonb_array_length(recommended_styles) > 0) OR
    (recommendation_type = 'furniture' AND jsonb_array_length(furniture_suggestions) > 0) OR
    (recommendation_type = 'budget' AND jsonb_array_length(budget_alternatives) > 0) OR
    (recommendation_type = 'trend' AND trend_data IS NOT NULL AND trend_data != '{}'::jsonb) OR
    (recommendation_type = 'comprehensive')
  )
);

-- Indexes for ai_recommendations
CREATE INDEX idx_ai_recommendations_room_id ON public.ai_recommendations(room_id);
CREATE INDEX idx_ai_recommendations_type ON public.ai_recommendations(recommendation_type);
CREATE INDEX idx_ai_recommendations_generated_at ON public.ai_recommendations(generated_at DESC);

-- Enable RLS
ALTER TABLE public.ai_recommendations ENABLE ROW LEVEL SECURITY;

-- RLS Policies for ai_recommendations (4 policies)
CREATE POLICY "Users can view recommendations for their rooms"
  ON public.ai_recommendations FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM rooms r
      JOIN projects p ON p.id = r.project_id
      WHERE r.id = ai_recommendations.room_id
      AND (p.created_by = auth.uid() OR p.assigned_to = auth.uid())
    )
  );

CREATE POLICY "Users can create recommendations for their rooms"
  ON public.ai_recommendations FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM rooms r
      JOIN projects p ON p.id = r.project_id
      WHERE r.id = ai_recommendations.room_id
      AND (p.created_by = auth.uid() OR p.assigned_to = auth.uid())
    )
  );

CREATE POLICY "Users can update recommendations for their rooms"
  ON public.ai_recommendations FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM rooms r
      JOIN projects p ON p.id = r.project_id
      WHERE r.id = ai_recommendations.room_id
      AND (p.created_by = auth.uid() OR p.assigned_to = auth.uid())
    )
  );

CREATE POLICY "Admins can manage all recommendations"
  ON public.ai_recommendations FOR ALL
  USING (get_user_role(auth.uid()) = 'admin'::user_role);

-- ============================================
-- TABLE 2: recommendation_feedback (12+ fields)
-- ============================================
CREATE TABLE public.recommendation_feedback (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  recommendation_id UUID NOT NULL REFERENCES public.ai_recommendations(id) ON DELETE CASCADE,
  room_id UUID NOT NULL REFERENCES public.rooms(id) ON DELETE CASCADE,
  feedback_type TEXT NOT NULL CHECK (feedback_type IN ('accept', 'reject', 'modify', 'helpful', 'not_helpful', 'other')),
  selected_option TEXT,
  rejection_reason TEXT,
  modification_details JSONB DEFAULT '{}'::jsonb,
  helpfulness_score INTEGER CHECK (helpfulness_score >= 1 AND helpfulness_score <= 5),
  user_comment TEXT,
  feedback_data JSONB DEFAULT '{}'::jsonb,
  created_by UUID NOT NULL REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Indexes for recommendation_feedback
CREATE INDEX idx_recommendation_feedback_rec_id ON public.recommendation_feedback(recommendation_id);
CREATE INDEX idx_recommendation_feedback_room_id ON public.recommendation_feedback(room_id);

-- Enable RLS
ALTER TABLE public.recommendation_feedback ENABLE ROW LEVEL SECURITY;

-- RLS Policies for recommendation_feedback (3 policies)
CREATE POLICY "Users can view feedback for their rooms"
  ON public.recommendation_feedback FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM rooms r
      JOIN projects p ON p.id = r.project_id
      WHERE r.id = recommendation_feedback.room_id
      AND (p.created_by = auth.uid() OR p.assigned_to = auth.uid())
    )
  );

CREATE POLICY "Users can create feedback for their rooms"
  ON public.recommendation_feedback FOR INSERT
  WITH CHECK (
    auth.uid() = created_by AND
    EXISTS (
      SELECT 1 FROM rooms r
      JOIN projects p ON p.id = r.project_id
      WHERE r.id = recommendation_feedback.room_id
      AND (p.created_by = auth.uid() OR p.assigned_to = auth.uid())
    )
  );

CREATE POLICY "Admins can manage all feedback"
  ON public.recommendation_feedback FOR ALL
  USING (get_user_role(auth.uid()) = 'admin'::user_role);

-- ============================================
-- TABLE 3: similar_projects (10+ fields)
-- ============================================
CREATE TABLE public.similar_projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  source_room_id UUID NOT NULL REFERENCES public.rooms(id) ON DELETE CASCADE,
  similar_room_id UUID NOT NULL REFERENCES public.rooms(id) ON DELETE CASCADE,
  similarity_score NUMERIC(5,2) NOT NULL CHECK (similarity_score >= 0 AND similarity_score <= 100),
  matching_factors TEXT[] DEFAULT '{}',
  similar_room_preview JSONB DEFAULT '{}'::jsonb,
  calculated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (now() + INTERVAL '24 hours'),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT unique_similar_pair UNIQUE (source_room_id, similar_room_id),
  CONSTRAINT no_self_reference CHECK (source_room_id != similar_room_id)
);

-- Indexes for similar_projects
CREATE INDEX idx_similar_projects_source_score ON public.similar_projects(source_room_id, similarity_score DESC);
CREATE INDEX idx_similar_projects_expires ON public.similar_projects(expires_at);

-- Enable RLS
ALTER TABLE public.similar_projects ENABLE ROW LEVEL SECURITY;

-- RLS Policies for similar_projects (2 policies)
CREATE POLICY "Users can view similar projects for their rooms"
  ON public.similar_projects FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM rooms r
      JOIN projects p ON p.id = r.project_id
      WHERE r.id = similar_projects.source_room_id
      AND (p.created_by = auth.uid() OR p.assigned_to = auth.uid())
    )
  );

CREATE POLICY "System can manage similar projects"
  ON public.similar_projects FOR ALL
  USING (true)
  WITH CHECK (true);

-- ============================================
-- Enable Realtime for all 3 tables
-- ============================================
ALTER PUBLICATION supabase_realtime ADD TABLE public.ai_recommendations;
ALTER PUBLICATION supabase_realtime ADD TABLE public.recommendation_feedback;
ALTER PUBLICATION supabase_realtime ADD TABLE public.similar_projects;

-- ============================================
-- Updated_at trigger function (reuse existing or create)
-- ============================================
CREATE OR REPLACE FUNCTION public.update_recommendation_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Triggers for updated_at
CREATE TRIGGER update_ai_recommendations_updated_at
  BEFORE UPDATE ON public.ai_recommendations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_recommendation_updated_at();

CREATE TRIGGER update_similar_projects_updated_at
  BEFORE UPDATE ON public.similar_projects
  FOR EACH ROW
  EXECUTE FUNCTION public.update_recommendation_updated_at();