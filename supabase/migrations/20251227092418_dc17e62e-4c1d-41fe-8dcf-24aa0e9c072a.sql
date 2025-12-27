-- ============================================================================
-- HOUSPIRE DUAL-SOURCE LIBRARY - DATABASE MIGRATION
-- Unified library for user-uploaded references and generated renders
-- ============================================================================

-- Create source type enum
CREATE TYPE public.library_source_type AS ENUM ('user_upload', 'houspire_generated');

-- Create tier enum
CREATE TYPE public.library_tier AS ENUM ('featured', 'standard', 'learning', 'unverified');

-- Create status enum
CREATE TYPE public.library_status AS ENUM ('active', 'archived', 'flagged', 'pending_review');

-- ============================================================================
-- MAIN TABLE: style_library (Unified for both sources)
-- ============================================================================
CREATE TABLE public.style_library (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- IMAGE DATA
  image_url TEXT NOT NULL,
  thumbnail_url TEXT,
  storage_path TEXT, -- For images stored in Supabase storage
  
  -- SOURCE TYPE
  source_type library_source_type NOT NULL,
  
  -- SOURCE: USER UPLOAD
  original_uploader_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  upload_project_id UUID REFERENCES public.projects(id) ON DELETE SET NULL,
  uploaded_at TIMESTAMP WITH TIME ZONE,
  upload_source TEXT, -- 'pinterest', 'instagram', 'upload', 'paste'
  
  -- SOURCE: HOUSPIRE GENERATED
  source_project_hash TEXT, -- Anonymized project ID for privacy
  source_room_id UUID REFERENCES public.rooms(id) ON DELETE SET NULL,
  renderer_anonymous_id TEXT, -- Anonymized renderer ID
  generated_at TIMESTAMP WITH TIME ZONE,
  generation_cost NUMERIC, -- Cost in rupees for this render
  
  -- CATEGORIZATION
  room_type TEXT NOT NULL,
  design_style TEXT NOT NULL,
  city TEXT, -- Mumbai, Delhi, Bangalore, etc.
  
  -- QUALITY METRICS
  quality_score INTEGER CHECK (quality_score IS NULL OR (quality_score >= 0 AND quality_score <= 100)),
  tier library_tier DEFAULT 'unverified',
  
  -- AI ANALYSIS
  analysis_data JSONB DEFAULT '{}'::jsonb,
  matched_elements JSONB DEFAULT '{}'::jsonb,
  color_palette JSONB DEFAULT '{}'::jsonb,
  furniture_list JSONB DEFAULT '{}'::jsonb,
  layout_pattern JSONB DEFAULT '{}'::jsonb,
  
  -- PERFORMANCE TRACKING
  times_viewed INTEGER DEFAULT 0,
  times_selected INTEGER DEFAULT 0,
  times_led_to_approval INTEGER DEFAULT 0,
  times_led_to_rejection INTEGER DEFAULT 0,
  approval_rate FLOAT CHECK (approval_rate IS NULL OR (approval_rate >= 0 AND approval_rate <= 1)),
  initial_performance_known BOOLEAN DEFAULT FALSE,
  
  -- CLONE DETECTION
  perceptual_hash TEXT,
  is_duplicate_of UUID REFERENCES public.style_library(id) ON DELETE SET NULL,
  similarity_score FLOAT,
  
  -- CURATION & STATUS
  status library_status DEFAULT 'active',
  curator_verified BOOLEAN DEFAULT FALSE,
  curator_verified_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  curator_notes TEXT,
  curator_verified_at TIMESTAMP WITH TIME ZONE,
  
  -- SEARCH & DISCOVERY
  tags TEXT[],
  search_vector tsvector,
  
  -- RANKING
  ranking_score FLOAT DEFAULT 0,
  
  -- METADATA
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  last_used_at TIMESTAMP WITH TIME ZONE,
  last_ranked_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE public.style_library ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- LIBRARY USAGE TRACKING
-- ============================================================================
CREATE TABLE public.library_usage (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  library_image_id UUID NOT NULL REFERENCES public.style_library(id) ON DELETE CASCADE,
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  room_id UUID NOT NULL REFERENCES public.rooms(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  
  selected_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  
  -- Outcome
  render_completed BOOLEAN DEFAULT FALSE,
  render_approved BOOLEAN,
  render_quality_score INTEGER CHECK (render_quality_score IS NULL OR (render_quality_score >= 0 AND render_quality_score <= 100)),
  render_cost NUMERIC,
  outcome_recorded_at TIMESTAMP WITH TIME ZONE,
  
  -- Metadata
  variation_used JSONB,
  smart_default_used JSONB,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.library_usage ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- INDEXES
-- ============================================================================

-- Primary lookup: room + style + source
CREATE INDEX idx_library_lookup ON public.style_library(room_type, design_style, source_type, status);

-- Source type filtering
CREATE INDEX idx_library_source ON public.style_library(source_type) WHERE status = 'active';

-- Performance-based sorting
CREATE INDEX idx_library_performance ON public.style_library(approval_rate DESC NULLS LAST, times_selected DESC) WHERE status = 'active';

-- Ranking score
CREATE INDEX idx_library_ranking ON public.style_library(ranking_score DESC) WHERE status = 'active';

-- Tier filtering
CREATE INDEX idx_library_tier ON public.style_library(tier, source_type) WHERE status = 'active';

-- City-specific lookup
CREATE INDEX idx_library_city ON public.style_library(city, room_type, design_style) WHERE status = 'active';

-- Clone detection
CREATE INDEX idx_library_phash ON public.style_library(perceptual_hash);

-- Full-text search
CREATE INDEX idx_library_search ON public.style_library USING gin(search_vector);

-- User contributions tracking
CREATE INDEX idx_library_uploader ON public.style_library(original_uploader_id) WHERE source_type = 'user_upload';

-- Recent additions
CREATE INDEX idx_library_recent ON public.style_library(created_at DESC);

-- Usage indexes
CREATE INDEX idx_usage_library ON public.library_usage(library_image_id, render_approved);
CREATE INDEX idx_usage_project ON public.library_usage(project_id, room_id);
CREATE INDEX idx_usage_outcome ON public.library_usage(render_approved) WHERE outcome_recorded_at IS NOT NULL;
CREATE INDEX idx_usage_user ON public.library_usage(user_id);

-- ============================================================================
-- VIEWS
-- ============================================================================

-- View: Library Performance Summary
CREATE VIEW public.library_performance_summary AS
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

-- View: Top Performing References
CREATE VIEW public.library_top_performers AS
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

-- View: User Library Contributions
CREATE VIEW public.user_library_contributions AS
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

-- ============================================================================
-- FUNCTIONS
-- ============================================================================

-- Function: Update approval rate
CREATE OR REPLACE FUNCTION public.update_library_approval_rate(lib_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE style_library
  SET 
    approval_rate = (
      SELECT 
        CAST(COUNT(*) FILTER (WHERE render_approved = TRUE) AS FLOAT) / 
        NULLIF(COUNT(*), 0)
      FROM library_usage
      WHERE library_image_id = lib_id
        AND outcome_recorded_at IS NOT NULL
    ),
    updated_at = now()
  WHERE id = lib_id;
END;
$$;

-- Function: Auto-promote tier based on performance
CREATE OR REPLACE FUNCTION public.auto_promote_tier(lib_id UUID)
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  img RECORD;
  new_tier library_tier;
BEGIN
  SELECT * INTO img FROM style_library WHERE id = lib_id;
  
  IF img IS NULL THEN
    RETURN NULL;
  END IF;
  
  -- Only user_uploads can be promoted
  IF img.source_type != 'user_upload' THEN
    RETURN img.tier::TEXT;
  END IF;
  
  -- Promotion logic
  IF img.approval_rate >= 0.9 AND img.times_selected >= 10 THEN
    new_tier := 'featured';
  ELSIF img.approval_rate >= 0.8 AND img.times_selected >= 5 THEN
    new_tier := 'standard';
  ELSIF img.approval_rate >= 0.7 AND img.times_selected >= 3 THEN
    new_tier := 'learning';
  ELSE
    new_tier := 'unverified';
  END IF;
  
  -- Update if changed
  IF new_tier != img.tier THEN
    UPDATE style_library
    SET 
      tier = new_tier,
      curator_notes = COALESCE(curator_notes, '') || 
        E'\nAuto-promoted to ' || new_tier::TEXT || ' on ' || NOW(),
      updated_at = now()
    WHERE id = lib_id;
  END IF;
  
  RETURN new_tier::TEXT;
END;
$$;

-- Function: Auto-archive poor performers
CREATE OR REPLACE FUNCTION public.auto_archive_poor_performers()
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  archived_count INTEGER;
BEGIN
  WITH archived AS (
    UPDATE style_library
    SET 
      status = 'archived',
      curator_notes = COALESCE(curator_notes, '') || 
        E'\nAuto-archived: <50% approval after 10+ uses on ' || NOW(),
      updated_at = now()
    WHERE 
      status = 'active'
      AND approval_rate < 0.5
      AND times_selected >= 10
    RETURNING id
  )
  SELECT COUNT(*) INTO archived_count FROM archived;
  
  RETURN archived_count;
END;
$$;

-- Function: Record library usage outcome
CREATE OR REPLACE FUNCTION public.record_library_usage_outcome(
  p_usage_id UUID,
  p_approved BOOLEAN,
  p_quality_score INTEGER DEFAULT NULL
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_library_id UUID;
BEGIN
  -- Update usage record
  UPDATE library_usage
  SET 
    render_completed = TRUE,
    render_approved = p_approved,
    render_quality_score = p_quality_score,
    outcome_recorded_at = now(),
    updated_at = now()
  WHERE id = p_usage_id
  RETURNING library_image_id INTO v_library_id;
  
  -- Update library stats
  IF v_library_id IS NOT NULL THEN
    UPDATE style_library
    SET 
      times_led_to_approval = times_led_to_approval + CASE WHEN p_approved THEN 1 ELSE 0 END,
      times_led_to_rejection = times_led_to_rejection + CASE WHEN NOT p_approved THEN 1 ELSE 0 END,
      last_used_at = now(),
      updated_at = now()
    WHERE id = v_library_id;
    
    -- Update approval rate
    PERFORM update_library_approval_rate(v_library_id);
    
    -- Check for tier promotion
    PERFORM auto_promote_tier(v_library_id);
  END IF;
END;
$$;

-- ============================================================================
-- TRIGGERS
-- ============================================================================

-- Auto-update search_vector
CREATE OR REPLACE FUNCTION public.update_library_search_vector()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.search_vector := to_tsvector('english', 
    COALESCE(array_to_string(NEW.tags, ' '), '') || ' ' ||
    COALESCE(NEW.room_type, '') || ' ' ||
    COALESCE(NEW.design_style, '') || ' ' ||
    COALESCE(NEW.city, '')
  );
  NEW.updated_at := now();
  RETURN NEW;
END;
$$;

CREATE TRIGGER trigger_update_library_search_vector
BEFORE INSERT OR UPDATE OF tags, room_type, design_style, city
ON public.style_library
FOR EACH ROW
EXECUTE FUNCTION public.update_library_search_vector();

-- Auto-update updated_at
CREATE TRIGGER update_style_library_updated_at
BEFORE UPDATE ON public.style_library
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_library_usage_updated_at
BEFORE UPDATE ON public.library_usage
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================================================
-- RLS POLICIES
-- ============================================================================

-- style_library policies
CREATE POLICY "Anyone can view active library images"
ON public.style_library FOR SELECT
USING (status = 'active');

CREATE POLICY "Admins can manage all library images"
ON public.style_library FOR ALL
USING (get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Users can insert their own uploads"
ON public.style_library FOR INSERT
WITH CHECK (
  auth.uid() = original_uploader_id 
  OR source_type = 'houspire_generated'
);

CREATE POLICY "Users can update their own uploads"
ON public.style_library FOR UPDATE
USING (auth.uid() = original_uploader_id)
WITH CHECK (auth.uid() = original_uploader_id);

-- library_usage policies
CREATE POLICY "Users can view usage for their projects"
ON public.library_usage FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM projects p
    WHERE p.id = library_usage.project_id
    AND (p.created_by = auth.uid() OR p.assigned_to = auth.uid())
  )
);

CREATE POLICY "Users can create usage for their projects"
ON public.library_usage FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM projects p
    WHERE p.id = library_usage.project_id
    AND (p.created_by = auth.uid() OR p.assigned_to = auth.uid())
  )
);

CREATE POLICY "Admins can manage all usage"
ON public.library_usage FOR ALL
USING (get_user_role(auth.uid()) = 'admin');