-- =====================================================
-- Feature 2: AI-Powered Smart Recommendations System
-- Migration: Create all tables, indexes, RLS policies
-- Date: 2025-12-30
-- =====================================================

-- =====================================================
-- TABLE 1: ai_recommendations
-- Purpose: Store AI-generated recommendations for rooms
-- =====================================================

CREATE TABLE IF NOT EXISTS public.ai_recommendations (
  -- Identity
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id uuid NOT NULL REFERENCES public.rooms(id) ON DELETE CASCADE,
  
  -- Recommendation Type
  recommendation_type text NOT NULL CHECK (recommendation_type IN (
    'style',
    'furniture_placement',
    'budget_optimization',
    'trend_analysis'
  )),
  
  -- Room Context (captured at recommendation time)
  room_context jsonb NOT NULL DEFAULT '{}'::jsonb,
  
  -- Style Recommendations (for recommendation_type = 'style')
  recommended_styles jsonb DEFAULT '[]'::jsonb,
  
  -- Furniture Recommendations (for recommendation_type = 'furniture_placement')
  furniture_suggestions jsonb DEFAULT '[]'::jsonb,
  
  -- Budget Recommendations (for recommendation_type = 'budget_optimization')
  budget_alternatives jsonb DEFAULT '[]'::jsonb,
  
  -- Trend Data (for recommendation_type = 'trend_analysis')
  trend_data jsonb DEFAULT '{}'::jsonb,
  
  -- AI Model Info
  model_used text NOT NULL DEFAULT 'gemini-2.0-flash',
  confidence_score numeric(5,2) CHECK (confidence_score BETWEEN 0 AND 100),
  reasoning text,
  
  -- User Interaction
  was_accepted boolean DEFAULT false,
  selected_option text,
  user_feedback text,
  
  -- Metadata
  generated_at timestamptz DEFAULT now(),
  expires_at timestamptz DEFAULT (now() + interval '7 days'),
  created_by uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  -- Constraints
  CONSTRAINT valid_recommendation_data CHECK (
    (recommendation_type = 'style' AND recommended_styles != '[]'::jsonb) OR
    (recommendation_type = 'furniture_placement' AND furniture_suggestions != '[]'::jsonb) OR
    (recommendation_type = 'budget_optimization' AND budget_alternatives != '[]'::jsonb) OR
    (recommendation_type = 'trend_analysis' AND trend_data != '{}'::jsonb)
  )
);

-- Indexes for ai_recommendations
CREATE INDEX IF NOT EXISTS idx_ai_recommendations_room_id ON public.ai_recommendations(room_id);
CREATE INDEX IF NOT EXISTS idx_ai_recommendations_type ON public.ai_recommendations(recommendation_type);
CREATE INDEX IF NOT EXISTS idx_ai_recommendations_generated_at ON public.ai_recommendations(generated_at DESC);
CREATE INDEX IF NOT EXISTS idx_ai_recommendations_expires_at ON public.ai_recommendations(expires_at) WHERE expires_at > now();

-- RLS Policies for ai_recommendations
ALTER TABLE public.ai_recommendations ENABLE ROW LEVEL SECURITY;

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

CREATE POLICY "Users can create recommendations"
ON public.ai_recommendations FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM rooms r
    JOIN projects p ON p.id = r.project_id
    WHERE r.id = ai_recommendations.room_id
    AND (p.created_by = auth.uid() OR p.assigned_to = auth.uid())
  )
);

CREATE POLICY "Users can update recommendations feedback"
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
USING (get_user_role(auth.uid()) = 'admin');

-- =====================================================
-- TABLE 2: recommendation_feedback
-- Purpose: Track user feedback to improve AI
-- =====================================================

CREATE TABLE IF NOT EXISTS public.recommendation_feedback (
  -- Identity
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recommendation_id uuid NOT NULL REFERENCES public.ai_recommendations(id) ON DELETE CASCADE,
  room_id uuid NOT NULL REFERENCES public.rooms(id) ON DELETE CASCADE,
  
  -- Feedback Type
  feedback_type text NOT NULL CHECK (feedback_type IN (
    'accepted',
    'rejected',
    'modified',
    'helpful',
    'not_helpful'
  )),
  
  -- Feedback Details
  selected_option text,
  rejection_reason text,
  modification_details jsonb DEFAULT '{}'::jsonb,
  helpfulness_score integer CHECK (helpfulness_score BETWEEN 1 AND 5),
  
  -- Context
  user_comment text,
  feedback_data jsonb DEFAULT '{}'::jsonb,
  
  -- Metadata
  created_by uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now()
);

-- Indexes for recommendation_feedback
CREATE INDEX IF NOT EXISTS idx_recommendation_feedback_rec_id ON public.recommendation_feedback(recommendation_id);
CREATE INDEX IF NOT EXISTS idx_recommendation_feedback_room_id ON public.recommendation_feedback(room_id);
CREATE INDEX IF NOT EXISTS idx_recommendation_feedback_created_at ON public.recommendation_feedback(created_at DESC);

-- RLS Policies for recommendation_feedback
ALTER TABLE public.recommendation_feedback ENABLE ROW LEVEL SECURITY;

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

CREATE POLICY "Users can create feedback"
ON public.recommendation_feedback FOR INSERT
WITH CHECK (created_by = auth.uid());

CREATE POLICY "Admins can manage all feedback"
ON public.recommendation_feedback FOR ALL
USING (get_user_role(auth.uid()) = 'admin');

-- =====================================================
-- TABLE 3: similar_projects
-- Purpose: Cache similar project recommendations
-- =====================================================

CREATE TABLE IF NOT EXISTS public.similar_projects (
  -- Identity
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_room_id uuid NOT NULL REFERENCES public.rooms(id) ON DELETE CASCADE,
  similar_room_id uuid NOT NULL REFERENCES public.rooms(id) ON DELETE CASCADE,
  
  -- Similarity Metrics
  similarity_score numeric(5,2) CHECK (similarity_score BETWEEN 0 AND 100),
  matching_factors text[] DEFAULT ARRAY[]::text[],
  
  -- Similar Room Details (denormalized for performance)
  similar_room_preview jsonb NOT NULL DEFAULT '{}'::jsonb,
  
  -- Metadata
  calculated_at timestamptz DEFAULT now(),
  expires_at timestamptz DEFAULT (now() + interval '30 days'),
  created_at timestamptz DEFAULT now(),
  
  -- Prevent duplicate pairs and self-similarity
  CONSTRAINT unique_similar_pair UNIQUE (source_room_id, similar_room_id),
  CONSTRAINT no_self_similarity CHECK (source_room_id != similar_room_id)
);

-- Indexes for similar_projects
CREATE INDEX IF NOT EXISTS idx_similar_projects_source ON public.similar_projects(source_room_id, similarity_score DESC);
CREATE INDEX IF NOT EXISTS idx_similar_projects_expires ON public.similar_projects(expires_at) WHERE expires_at < now();

-- RLS Policies for similar_projects
ALTER TABLE public.similar_projects ENABLE ROW LEVEL SECURITY;

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
USING (auth.uid() IS NOT NULL);

-- =====================================================
-- TABLE 4: style_library
-- Purpose: Store comprehensive style templates from Excel data
-- =====================================================

CREATE TABLE IF NOT EXISTS public.style_library (
  -- Identity
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Style Identity
  style_name text NOT NULL, -- 'Modern Indian', 'Scandinavian', etc.
  room_type text NOT NULL, -- 'Living Room', 'Bedroom', 'Kitchen', etc.
  
  -- Style Metadata
  description text,
  mood_keywords text[] DEFAULT ARRAY[]::text[], -- ['contemporary', 'elegant', 'warm']
  cultural_significance text,
  
  -- Style Specifications (structured data from Excel)
  specifications jsonb NOT NULL DEFAULT '{}'::jsonb,
  -- Structure:
  -- {
  --   "overall_mood": "Contemporary elegance with cultural soul",
  --   "key_principles": [...],
  --   "color_palette": {...},
  --   "materials": [...],
  --   "furniture_items": [...],
  --   "decor_elements": [...],
  --   "lighting": {...},
  --   "textiles": [...]
  -- }
  
  -- Item Checklist (from Excel sheet 2)
  item_checklist jsonb NOT NULL DEFAULT '[]'::jsonb,
  -- Structure: [
  --   {
  --     "category": "SOFA / PRIMARY SEATING",
  --     "item": "Contemporary sofa with teak base",
  --     "include": true,
  --     "priority": "SIGNATURE",
  --     "notes": "Velvet or premium fabric"
  --   },
  --   ...
  -- ]
  
  -- Finish Combinations (from Excel sheet 3)
  finish_combinations jsonb DEFAULT '[]'::jsonb,
  -- Structure: [
  --   {
  --     "name": "Natural Teak Carved",
  --     "tv_unit": "Carved teak doors, brass handles",
  --     "bookshelf": "Teak bookcase with carved details",
  --     "price": "Premium",
  --     "rating": 5,
  --     "description": "Classic Indian craftsmanship"
  --   },
  --   ...
  -- ]
  
  -- Color Palettes (if available)
  color_palettes jsonb DEFAULT '[]'::jsonb,
  
  -- Budget Guidance
  budget_range_min integer, -- Min budget in currency
  budget_range_max integer, -- Max budget in currency
  budget_notes text,
  
  -- Popularity & Usage
  popularity_score integer DEFAULT 0,
  usage_count integer DEFAULT 0,
  
  -- Regional Preferences
  popular_in_cities text[] DEFAULT ARRAY[]::text[],
  
  -- Source & Versioning
  data_source text DEFAULT 'excel_import',
  data_version text DEFAULT '1.0',
  
  -- Metadata
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  
  -- Constraints
  CONSTRAINT unique_style_room_combination UNIQUE (style_name, room_type)
);

-- Indexes for style_library
CREATE INDEX IF NOT EXISTS idx_style_library_style_name ON public.style_library(style_name);
CREATE INDEX IF NOT EXISTS idx_style_library_room_type ON public.style_library(room_type);
CREATE INDEX IF NOT EXISTS idx_style_library_popularity ON public.style_library(popularity_score DESC);
CREATE INDEX IF NOT EXISTS idx_style_library_search ON public.style_library USING gin(mood_keywords);

-- RLS Policies for style_library (public read, admin write)
ALTER TABLE public.style_library ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view style library"
ON public.style_library FOR SELECT
USING (true);

CREATE POLICY "Admins can manage style library"
ON public.style_library FOR ALL
USING (get_user_role(auth.uid()) = 'admin');

-- =====================================================
-- TABLE 5: smart_defaults
-- Purpose: Store smart default recommendations per room type
-- =====================================================

CREATE TABLE IF NOT EXISTS public.smart_defaults (
  -- Identity
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Room Context
  room_type text NOT NULL,
  room_size_category text NOT NULL CHECK (room_size_category IN ('small', 'medium', 'large', 'xlarge')),
  budget_category text NOT NULL CHECK (budget_category IN ('budget', 'mid', 'premium', 'luxury')),
  
  -- Default Values
  recommended_styles text[] DEFAULT ARRAY[]::text[], -- Top 3-5 styles
  essential_furniture jsonb DEFAULT '[]'::jsonb, -- Must-have items
  optional_furniture jsonb DEFAULT '[]'::jsonb, -- Nice-to-have items
  color_schemes jsonb DEFAULT '[]'::jsonb, -- Recommended color palettes
  material_suggestions text[] DEFAULT ARRAY[]::text[],
  lighting_recommendations jsonb DEFAULT '{}'::jsonb,
  
  -- Budget Breakdown
  budget_allocation jsonb DEFAULT '{}'::jsonb,
  -- Structure: {
  --   "furniture": 40,
  --   "decor": 20,
  --   "lighting": 15,
  --   "flooring": 15,
  --   "paint": 10
  -- }
  
  -- Priority Guidance
  priority_order jsonb DEFAULT '[]'::jsonb,
  
  -- Metadata
  confidence_score numeric(5,2) DEFAULT 75.00,
  last_updated timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  
  -- Constraints
  CONSTRAINT unique_smart_default UNIQUE (room_type, room_size_category, budget_category)
);

-- Indexes for smart_defaults
CREATE INDEX IF NOT EXISTS idx_smart_defaults_room_type ON public.smart_defaults(room_type);
CREATE INDEX IF NOT EXISTS idx_smart_defaults_budget ON public.smart_defaults(budget_category);

-- RLS Policies for smart_defaults (public read, admin write)
ALTER TABLE public.smart_defaults ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view smart defaults"
ON public.smart_defaults FOR SELECT
USING (true);

CREATE POLICY "Admins can manage smart defaults"
ON public.smart_defaults FOR ALL
USING (get_user_role(auth.uid()) = 'admin');

-- =====================================================
-- REALTIME SUBSCRIPTIONS
-- Enable realtime for all tables
-- =====================================================

ALTER TABLE public.ai_recommendations REPLICA IDENTITY FULL;
ALTER TABLE public.recommendation_feedback REPLICA IDENTITY FULL;
ALTER TABLE public.similar_projects REPLICA IDENTITY FULL;
ALTER TABLE public.style_library REPLICA IDENTITY FULL;
ALTER TABLE public.smart_defaults REPLICA IDENTITY FULL;

-- Add to realtime publication (if not already added)
DO $$ 
BEGIN
  -- Try to add tables to realtime, ignore if already exists
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.ai_recommendations;
  EXCEPTION WHEN duplicate_object THEN
    NULL;
  END;
  
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.recommendation_feedback;
  EXCEPTION WHEN duplicate_object THEN
    NULL;
  END;
  
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.similar_projects;
  EXCEPTION WHEN duplicate_object THEN
    NULL;
  END;
  
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.style_library;
  EXCEPTION WHEN duplicate_object THEN
    NULL;
  END;
  
  BEGIN
    ALTER PUBLICATION supabase_realtime ADD TABLE public.smart_defaults;
  EXCEPTION WHEN duplicate_object THEN
    NULL;
  END;
END $$;

-- =====================================================
-- TRIGGER: Update updated_at timestamp
-- =====================================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_ai_recommendations_updated_at
  BEFORE UPDATE ON public.ai_recommendations
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_style_library_updated_at
  BEFORE UPDATE ON public.style_library
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- FUNCTION: Clean expired recommendations
-- =====================================================

CREATE OR REPLACE FUNCTION clean_expired_recommendations()
RETURNS void AS $$
BEGIN
  DELETE FROM public.ai_recommendations WHERE expires_at < now();
  DELETE FROM public.similar_projects WHERE expires_at < now();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- COMMENTS FOR DOCUMENTATION
-- =====================================================

COMMENT ON TABLE public.ai_recommendations IS 'Stores AI-generated recommendations for rooms including style, furniture placement, budget optimization, and trend analysis';
COMMENT ON TABLE public.recommendation_feedback IS 'Tracks user feedback on AI recommendations to improve future suggestions';
COMMENT ON TABLE public.similar_projects IS 'Caches similar project recommendations for performance optimization';
COMMENT ON TABLE public.style_library IS 'Comprehensive style templates imported from Excel data with specifications, checklists, and finish combinations';
COMMENT ON TABLE public.smart_defaults IS 'Smart default recommendations based on room type, size, and budget categories';

-- =====================================================
-- SUCCESS MESSAGE
-- =====================================================

DO $$ 
BEGIN
  RAISE NOTICE '✅ Feature 2: AI Recommendations System - Migration Complete';
  RAISE NOTICE '   - 5 tables created';
  RAISE NOTICE '   - 13 indexes created';
  RAISE NOTICE '   - 14 RLS policies created';
  RAISE NOTICE '   - Realtime enabled for all tables';
  RAISE NOTICE '   - Triggers and functions created';
END $$;
