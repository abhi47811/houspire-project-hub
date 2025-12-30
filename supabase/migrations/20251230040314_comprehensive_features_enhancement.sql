-- ============================================================================
-- HOUSPIRE AI - COMPREHENSIVE FEATURES ENHANCEMENT
-- Migration: 20251230040314
-- Description: Database schema for selected enhancement features
-- ============================================================================

-- ============================================================================
-- 1. RENDER VERSION CONTROL & HISTORY
-- ============================================================================

-- Render versions table for version control
CREATE TABLE IF NOT EXISTS render_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id UUID NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
  version_number INTEGER NOT NULL,
  parent_version_id UUID REFERENCES render_versions(id),
  
  -- Render data
  render_url TEXT NOT NULL,
  thumbnail_url TEXT,
  storage_path TEXT NOT NULL,
  
  -- Configuration snapshot
  style_config JSONB DEFAULT '{}',
  generation_params JSONB DEFAULT '{}',
  prompt_used TEXT,
  
  -- Quality metrics
  quality_score NUMERIC(5,2),
  ai_validation_score NUMERIC(5,2),
  user_rating INTEGER CHECK (user_rating BETWEEN 1 AND 5),
  
  -- Change tracking
  changes_from_parent JSONB DEFAULT '[]',
  change_summary TEXT,
  
  -- Metadata
  is_approved BOOLEAN DEFAULT false,
  is_final BOOLEAN DEFAULT false,
  approved_by UUID REFERENCES auth.users(id),
  approved_at TIMESTAMPTZ,
  
  notes TEXT,
  tags TEXT[],
  
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  
  UNIQUE(room_id, version_number)
);

-- Index for performance
CREATE INDEX idx_render_versions_room ON render_versions(room_id);
CREATE INDEX idx_render_versions_approved ON render_versions(is_approved);
CREATE INDEX idx_render_versions_created ON render_versions(created_at DESC);

-- Function to auto-increment version number
CREATE OR REPLACE FUNCTION get_next_version_number(p_room_id UUID)
RETURNS INTEGER AS $$
BEGIN
  RETURN COALESCE(
    (SELECT MAX(version_number) + 1 FROM render_versions WHERE room_id = p_room_id),
    1
  );
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- 2. SMART AI RECOMMENDATIONS ENGINE
-- ============================================================================

-- Style recommendations table
CREATE TABLE IF NOT EXISTS style_recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id UUID NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  
  -- Recommendations
  recommended_styles JSONB NOT NULL DEFAULT '[]',
  -- Format: [{"style": "modern_indian", "confidence": 0.85, "reasoning": "..."}, ...]
  
  furniture_suggestions JSONB DEFAULT '[]',
  color_palette_suggestions JSONB DEFAULT '[]',
  
  -- Context factors
  budget_range_min NUMERIC(10,2),
  budget_range_max NUMERIC(10,2),
  city TEXT,
  room_type TEXT,
  
  -- Similar projects
  similar_project_ids UUID[],
  
  -- User interaction
  user_selected_style TEXT,
  user_feedback TEXT,
  was_helpful BOOLEAN,
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_style_recommendations_room ON style_recommendations(room_id);
CREATE INDEX idx_style_recommendations_project ON style_recommendations(project_id);

-- Trending styles tracking
CREATE TABLE IF NOT EXISTS style_trends (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  style_name TEXT NOT NULL,
  city TEXT NOT NULL,
  room_type TEXT NOT NULL,
  
  usage_count INTEGER DEFAULT 1,
  approval_rate NUMERIC(5,2) DEFAULT 0,
  average_quality_score NUMERIC(5,2),
  
  month_year TEXT NOT NULL, -- Format: "2024-01"
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  
  UNIQUE(style_name, city, room_type, month_year)
);

CREATE INDEX idx_style_trends_city ON style_trends(city);
CREATE INDEX idx_style_trends_month ON style_trends(month_year DESC);

-- ============================================================================
-- 3. USER PREFERENCE LEARNING (SMART DEFAULTS 2.0)
-- ============================================================================

-- User preference profiles
CREATE TABLE IF NOT EXISTS user_preference_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  client_id UUID, -- Optional: for specific client preferences
  
  -- Learned preferences
  preferred_styles JSONB DEFAULT '[]',
  -- Format: [{"style": "modern_indian", "frequency": 12, "avg_satisfaction": 4.5}, ...]
  
  color_palette_preferences JSONB DEFAULT '{}',
  -- Format: {"primary_colors": ["#fff", "#333"], "accent_colors": [...]}
  
  furniture_preferences JSONB DEFAULT '{}',
  material_preferences JSONB DEFAULT '{}',
  
  -- Budget patterns
  budget_tier TEXT CHECK (budget_tier IN ('economy', 'mid_range', 'luxury')),
  average_project_budget NUMERIC(10,2),
  
  -- Regional context
  primary_city TEXT,
  secondary_cities TEXT[],
  
  -- Learned from
  learned_from_projects UUID[],
  total_projects_analyzed INTEGER DEFAULT 0,
  
  -- Seasonal preferences
  seasonal_adjustments JSONB DEFAULT '{}',
  
  -- Metadata
  confidence_score NUMERIC(5,2) DEFAULT 0,
  last_updated TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  
  UNIQUE(user_id, client_id)
);

CREATE INDEX idx_user_preferences_user ON user_preference_profiles(user_id);
CREATE INDEX idx_user_preferences_client ON user_preference_profiles(client_id);

-- Client profiles for saved preferences
CREATE TABLE IF NOT EXISTS client_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  client_name TEXT NOT NULL,
  client_email TEXT,
  client_phone TEXT,
  
  -- Saved preferences
  style_preferences JSONB DEFAULT '[]',
  budget_range JSONB DEFAULT '{}',
  special_requirements TEXT[],
  
  -- Tags
  tags TEXT[],
  notes TEXT,
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_client_profiles_user ON client_profiles(user_id);

-- ============================================================================
-- 4. QUALITY ASSURANCE AUTOMATION
-- ============================================================================

-- Multi-model validation results
CREATE TABLE IF NOT EXISTS quality_validations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  render_id UUID, -- Can be render_version or room_image
  room_id UUID NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
  
  -- Validation models used
  models_used TEXT[] NOT NULL,
  -- e.g., ["gpt-4-vision", "claude-vision", "gemini-vision"]
  
  -- Individual scores
  model_scores JSONB NOT NULL DEFAULT '{}',
  -- Format: {"gpt-4-vision": {"score": 8.5, "issues": [...]}, ...}
  
  -- Consensus analysis
  consensus_score NUMERIC(5,2),
  disagreements TEXT[],
  overall_confidence NUMERIC(5,2),
  
  -- Quality dimensions
  architectural_preservation_score NUMERIC(5,2),
  photorealism_score NUMERIC(5,2),
  style_accuracy_score NUMERIC(5,2),
  lighting_quality_score NUMERIC(5,2),
  
  -- Pass/Fail
  passes_quality_gate BOOLEAN DEFAULT false,
  quality_issues TEXT[],
  recommendations TEXT[],
  
  -- Cost tracking
  validation_cost_usd NUMERIC(10,4),
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_quality_validations_room ON quality_validations(room_id);
CREATE INDEX idx_quality_validations_pass ON quality_validations(passes_quality_gate);
CREATE INDEX idx_quality_validations_created ON quality_validations(created_at DESC);

-- Quality feedback loop
CREATE TABLE IF NOT EXISTS quality_feedback (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  render_version_id UUID REFERENCES render_versions(id) ON DELETE CASCADE,
  room_id UUID NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
  
  -- User feedback
  user_approved BOOLEAN,
  user_rating INTEGER CHECK (user_rating BETWEEN 1 AND 5),
  rejection_reasons TEXT[],
  quality_issues_reported TEXT[],
  
  -- Client feedback
  client_approved BOOLEAN,
  client_feedback TEXT,
  
  -- AI prediction vs reality
  predicted_quality_score NUMERIC(5,2),
  actual_user_rating INTEGER,
  prediction_accuracy NUMERIC(5,2),
  
  -- Learning data
  used_for_training BOOLEAN DEFAULT false,
  training_date TIMESTAMPTZ,
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_quality_feedback_room ON quality_feedback(room_id);
CREATE INDEX idx_quality_feedback_training ON quality_feedback(used_for_training);

-- Quality trends over time
CREATE TABLE IF NOT EXISTS quality_trends (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  
  -- Aggregated metrics
  total_renders INTEGER DEFAULT 0,
  average_quality_score NUMERIC(5,2),
  pass_rate NUMERIC(5,2),
  average_user_rating NUMERIC(5,2),
  
  -- By category
  metrics_by_style JSONB DEFAULT '{}',
  metrics_by_room_type JSONB DEFAULT '{}',
  metrics_by_city JSONB DEFAULT '{}',
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  
  UNIQUE(period_start, period_end)
);

-- ============================================================================
-- 5. BUDGET INTELLIGENCE
-- ============================================================================

-- Budget predictions
CREATE TABLE IF NOT EXISTS budget_predictions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  
  -- Prediction inputs
  room_type TEXT NOT NULL,
  style TEXT NOT NULL,
  city TEXT NOT NULL,
  room_dimensions JSONB,
  
  -- Predicted costs
  estimated_min NUMERIC(10,2),
  estimated_max NUMERIC(10,2),
  estimated_average NUMERIC(10,2),
  confidence_level NUMERIC(5,2),
  
  -- Breakdown
  cost_breakdown JSONB DEFAULT '{}',
  -- Format: {"furniture": 40000, "lighting": 15000, ...}
  
  -- Comparison data
  similar_projects_analyzed INTEGER,
  market_data_points INTEGER,
  
  -- Accuracy tracking
  actual_cost NUMERIC(10,2),
  prediction_accuracy NUMERIC(5,2),
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_budget_predictions_project ON budget_predictions(project_id);

-- Cost optimization suggestions
CREATE TABLE IF NOT EXISTS cost_optimizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  budget_item_id UUID NOT NULL REFERENCES budget_items(id) ON DELETE CASCADE,
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  
  -- Original item
  original_item_name TEXT,
  original_rate NUMERIC(10,2),
  
  -- Alternative suggestions
  alternatives JSONB DEFAULT '[]',
  -- Format: [{"item": "...", "rate": 5000, "savings": 2000, "trade_offs": "..."}, ...]
  
  potential_savings NUMERIC(10,2),
  
  -- User action
  user_accepted BOOLEAN,
  selected_alternative JSONB,
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_cost_optimizations_project ON cost_optimizations(project_id);

-- Market price tracking
CREATE TABLE IF NOT EXISTS market_prices (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  item_name TEXT NOT NULL,
  category TEXT NOT NULL,
  specification TEXT,
  
  -- Pricing
  current_price NUMERIC(10,2) NOT NULL,
  previous_price NUMERIC(10,2),
  price_change_percent NUMERIC(5,2),
  
  -- Location
  city TEXT NOT NULL,
  vendor_id UUID REFERENCES vendors(id),
  
  -- Time tracking
  price_date DATE NOT NULL,
  last_updated TIMESTAMPTZ NOT NULL DEFAULT now(),
  
  UNIQUE(item_name, category, city, vendor_id, price_date)
);

CREATE INDEX idx_market_prices_item ON market_prices(item_name, city);
CREATE INDEX idx_market_prices_date ON market_prices(price_date DESC);

-- ============================================================================
-- 6. ADVANCED ANALYTICS
-- ============================================================================

-- Revenue analytics
CREATE TABLE IF NOT EXISTS revenue_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  period_start DATE NOT NULL,
  period_end DATE NOT NULL,
  
  -- Revenue metrics
  total_revenue NUMERIC(12,2) DEFAULT 0,
  revenue_by_room_type JSONB DEFAULT '{}',
  revenue_by_style JSONB DEFAULT '{}',
  revenue_by_city JSONB DEFAULT '{}',
  
  -- Profitability
  total_costs NUMERIC(12,2) DEFAULT 0,
  api_costs NUMERIC(12,2) DEFAULT 0,
  gross_profit NUMERIC(12,2) DEFAULT 0,
  profit_margin NUMERIC(5,2) DEFAULT 0,
  
  -- Project metrics
  total_projects INTEGER DEFAULT 0,
  completed_projects INTEGER DEFAULT 0,
  average_project_value NUMERIC(10,2),
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  
  UNIQUE(period_start, period_end)
);

-- Performance metrics
CREATE TABLE IF NOT EXISTS performance_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  metric_date DATE NOT NULL,
  
  -- Render success metrics
  total_renders_attempted INTEGER DEFAULT 0,
  successful_renders INTEGER DEFAULT 0,
  failed_renders INTEGER DEFAULT 0,
  success_rate NUMERIC(5,2) DEFAULT 0,
  retry_rate NUMERIC(5,2) DEFAULT 0,
  
  -- Performance
  average_generation_time_seconds NUMERIC(8,2),
  average_quality_score NUMERIC(5,2),
  
  -- User behavior
  most_used_styles JSONB DEFAULT '[]',
  bottleneck_phases TEXT[],
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  
  UNIQUE(metric_date)
);

-- User behavior tracking
CREATE TABLE IF NOT EXISTS user_behavior_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  
  session_id UUID,
  event_type TEXT NOT NULL,
  event_data JSONB DEFAULT '{}',
  
  -- Context
  project_id UUID REFERENCES projects(id),
  room_id UUID REFERENCES rooms(id),
  
  page_url TEXT,
  user_agent TEXT,
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_user_behavior_user ON user_behavior_analytics(user_id);
CREATE INDEX idx_user_behavior_event ON user_behavior_analytics(event_type);
CREATE INDEX idx_user_behavior_created ON user_behavior_analytics(created_at DESC);

-- Predictive analytics data
CREATE TABLE IF NOT EXISTS predictive_analytics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  
  -- Predictions
  predicted_completion_date DATE,
  predicted_final_cost NUMERIC(12,2),
  predicted_quality_score NUMERIC(5,2),
  
  risk_factors JSONB DEFAULT '[]',
  confidence_level NUMERIC(5,2),
  
  -- Actual vs predicted (filled after completion)
  actual_completion_date DATE,
  actual_final_cost NUMERIC(12,2),
  actual_quality_score NUMERIC(5,2),
  prediction_accuracy NUMERIC(5,2),
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_predictive_analytics_project ON predictive_analytics(project_id);

-- ============================================================================
-- 7. AI TRAINING GROUND
-- ============================================================================

-- Render ratings for human-in-the-loop
CREATE TABLE IF NOT EXISTS render_ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  render_version_id UUID REFERENCES render_versions(id) ON DELETE CASCADE,
  room_id UUID NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
  
  -- Rater info
  rater_id UUID NOT NULL REFERENCES auth.users(id),
  rater_role TEXT,
  
  -- Detailed ratings
  overall_rating INTEGER NOT NULL CHECK (overall_rating BETWEEN 1 AND 10),
  photorealism_rating INTEGER CHECK (photorealism_rating BETWEEN 1 AND 10),
  style_accuracy_rating INTEGER CHECK (style_accuracy_rating BETWEEN 1 AND 10),
  architectural_preservation_rating INTEGER CHECK (architectural_preservation_rating BETWEEN 1 AND 10),
  lighting_quality_rating INTEGER CHECK (lighting_quality_rating BETWEEN 1 AND 10),
  
  -- Feedback
  strengths TEXT[],
  weaknesses TEXT[],
  improvement_suggestions TEXT,
  
  -- Training use
  used_for_model_training BOOLEAN DEFAULT false,
  training_weight NUMERIC(5,2) DEFAULT 1.0,
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_render_ratings_render ON render_ratings(render_version_id);
CREATE INDEX idx_render_ratings_room ON render_ratings(room_id);
CREATE INDEX idx_render_ratings_training ON render_ratings(used_for_model_training);

-- A/B testing experiments
CREATE TABLE IF NOT EXISTS ab_test_experiments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  experiment_name TEXT NOT NULL UNIQUE,
  description TEXT,
  
  -- Test parameters
  variant_a_config JSONB NOT NULL,
  variant_b_config JSONB NOT NULL,
  
  -- Metrics
  variant_a_success_count INTEGER DEFAULT 0,
  variant_a_total_count INTEGER DEFAULT 0,
  variant_b_success_count INTEGER DEFAULT 0,
  variant_b_total_count INTEGER DEFAULT 0,
  
  -- Status
  status TEXT DEFAULT 'active' CHECK (status IN ('draft', 'active', 'completed', 'cancelled')),
  winner TEXT CHECK (winner IN ('a', 'b', 'inconclusive')),
  
  started_at TIMESTAMPTZ,
  ended_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- A/B test results
CREATE TABLE IF NOT EXISTS ab_test_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  experiment_id UUID NOT NULL REFERENCES ab_test_experiments(id) ON DELETE CASCADE,
  
  room_id UUID NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
  variant TEXT NOT NULL CHECK (variant IN ('a', 'b')),
  
  -- Result
  render_url TEXT,
  quality_score NUMERIC(5,2),
  user_approved BOOLEAN,
  
  generation_time_seconds NUMERIC(8,2),
  cost_usd NUMERIC(10,4),
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_ab_test_results_experiment ON ab_test_results(experiment_id);

-- Quality benchmark library
CREATE TABLE IF NOT EXISTS quality_benchmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  benchmark_name TEXT NOT NULL,
  category TEXT NOT NULL,
  
  -- Reference images
  reference_image_url TEXT NOT NULL,
  thumbnail_url TEXT,
  
  -- Quality metrics
  target_quality_score NUMERIC(5,2) NOT NULL,
  photorealism_score NUMERIC(5,2),
  
  -- Metadata
  style TEXT,
  room_type TEXT,
  tags TEXT[],
  
  description TEXT,
  why_gold_standard TEXT,
  
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_quality_benchmarks_category ON quality_benchmarks(category);
CREATE INDEX idx_quality_benchmarks_style ON quality_benchmarks(style);

-- ============================================================================
-- 8. SUSTAINABILITY SCORING
-- ============================================================================

-- Sustainability assessments
CREATE TABLE IF NOT EXISTS sustainability_assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  room_id UUID REFERENCES rooms(id) ON DELETE CASCADE,
  
  -- Overall scores
  overall_sustainability_score NUMERIC(5,2),
  carbon_footprint_kg NUMERIC(10,2),
  
  -- Detailed scores
  material_sustainability_score NUMERIC(5,2),
  energy_efficiency_score NUMERIC(5,2),
  water_efficiency_score NUMERIC(5,2),
  indoor_air_quality_score NUMERIC(5,2),
  
  -- Eco-friendly materials detected
  eco_friendly_materials JSONB DEFAULT '[]',
  -- Format: [{"material": "bamboo flooring", "percentage": 20, "impact": "low"}, ...]
  
  -- Recommendations
  green_alternatives JSONB DEFAULT '[]',
  potential_carbon_savings_kg NUMERIC(10,2),
  potential_cost_savings NUMERIC(10,2),
  
  -- Certifications
  eligible_certifications TEXT[],
  -- e.g., ["LEED Silver", "IGBC Gold"]
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_sustainability_project ON sustainability_assessments(project_id);
CREATE INDEX idx_sustainability_room ON sustainability_assessments(room_id);

-- Eco-friendly materials database
CREATE TABLE IF NOT EXISTS eco_materials_database (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  material_name TEXT NOT NULL,
  category TEXT NOT NULL,
  
  -- Sustainability metrics
  carbon_footprint_per_unit NUMERIC(10,4),
  recycled_content_percent NUMERIC(5,2),
  renewable BOOLEAN DEFAULT false,
  biodegradable BOOLEAN DEFAULT false,
  
  -- Certifications
  certifications TEXT[],
  
  -- Availability
  available_in_cities TEXT[],
  average_cost_multiplier NUMERIC(5,2) DEFAULT 1.0,
  
  -- Alternatives
  conventional_alternative TEXT,
  cost_comparison TEXT,
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_eco_materials_category ON eco_materials_database(category);

-- ============================================================================
-- 9. LEGAL & COMPLIANCE
-- ============================================================================

-- Vastu compliance assessments
CREATE TABLE IF NOT EXISTS vastu_assessments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id UUID NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
  render_version_id UUID REFERENCES render_versions(id),
  
  -- Overall compliance
  overall_vastu_score NUMERIC(5,2),
  compliance_level TEXT CHECK (compliance_level IN ('excellent', 'good', 'fair', 'poor')),
  
  -- Detailed checks
  entrance_direction_compliant BOOLEAN,
  furniture_placement_compliant BOOLEAN,
  color_scheme_compliant BOOLEAN,
  element_balance_compliant BOOLEAN,
  
  -- Violations
  vastu_violations JSONB DEFAULT '[]',
  -- Format: [{"rule": "...", "severity": "high/medium/low", "suggestion": "..."}, ...]
  
  -- Recommendations
  vastu_recommendations TEXT[],
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_vastu_assessments_room ON vastu_assessments(room_id);

-- Building code compliance
CREATE TABLE IF NOT EXISTS building_code_compliance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  room_id UUID REFERENCES rooms(id),
  
  -- Location
  city TEXT NOT NULL,
  applicable_codes TEXT[],
  
  -- Compliance checks
  electrical_safety_compliant BOOLEAN,
  fire_safety_compliant BOOLEAN,
  structural_safety_compliant BOOLEAN,
  ventilation_compliant BOOLEAN,
  accessibility_compliant BOOLEAN,
  
  -- Issues
  code_violations JSONB DEFAULT '[]',
  -- Format: [{"code": "NBC Section 4.2", "violation": "...", "severity": "..."}, ...]
  
  -- Overall status
  overall_compliant BOOLEAN DEFAULT false,
  compliance_percentage NUMERIC(5,2),
  
  -- Documentation
  permit_requirements TEXT[],
  required_documents TEXT[],
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_building_code_project ON building_code_compliance(project_id);
CREATE INDEX idx_building_code_city ON building_code_compliance(city);

-- Safety guidelines tracking
CREATE TABLE IF NOT EXISTS safety_guidelines (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  guideline_type TEXT NOT NULL,
  category TEXT NOT NULL,
  
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  
  -- Applicability
  applicable_room_types TEXT[],
  applicable_cities TEXT[],
  
  -- Requirements
  mandatory BOOLEAN DEFAULT false,
  code_reference TEXT,
  
  severity TEXT CHECK (severity IN ('critical', 'high', 'medium', 'low')),
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX idx_safety_guidelines_type ON safety_guidelines(guideline_type);

-- ============================================================================
-- FUNCTIONS & TRIGGERS
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers to relevant tables
CREATE TRIGGER update_style_recommendations_updated_at BEFORE UPDATE ON style_recommendations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_style_trends_updated_at BEFORE UPDATE ON style_trends
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_preference_profiles_updated_at BEFORE UPDATE ON user_preference_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_client_profiles_updated_at BEFORE UPDATE ON client_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_predictive_analytics_updated_at BEFORE UPDATE ON predictive_analytics
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_sustainability_assessments_updated_at BEFORE UPDATE ON sustainability_assessments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_building_code_compliance_updated_at BEFORE UPDATE ON building_code_compliance
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all new tables
ALTER TABLE render_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE style_recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE style_trends ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_preference_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE client_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE quality_validations ENABLE ROW LEVEL SECURITY;
ALTER TABLE quality_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE quality_trends ENABLE ROW LEVEL SECURITY;
ALTER TABLE budget_predictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE cost_optimizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE market_prices ENABLE ROW LEVEL SECURITY;
ALTER TABLE revenue_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE performance_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_behavior_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE predictive_analytics ENABLE ROW LEVEL SECURITY;
ALTER TABLE render_ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE ab_test_experiments ENABLE ROW LEVEL SECURITY;
ALTER TABLE ab_test_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE quality_benchmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE sustainability_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE eco_materials_database ENABLE ROW LEVEL SECURITY;
ALTER TABLE vastu_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE building_code_compliance ENABLE ROW LEVEL SECURITY;
ALTER TABLE safety_guidelines ENABLE ROW LEVEL SECURITY;

-- RLS Policies for render_versions
CREATE POLICY "Users can view render versions of their rooms"
  ON render_versions FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM rooms r
      JOIN projects p ON r.project_id = p.id
      WHERE r.id = render_versions.room_id
        AND (p.created_by = auth.uid() OR p.assigned_to = auth.uid())
    )
  );

CREATE POLICY "Users can create render versions for their rooms"
  ON render_versions FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM rooms r
      JOIN projects p ON r.project_id = p.id
      WHERE r.id = render_versions.room_id
        AND (p.created_by = auth.uid() OR p.assigned_to = auth.uid())
    )
  );

-- RLS Policies for user_preference_profiles
CREATE POLICY "Users can view their own preferences"
  ON user_preference_profiles FOR SELECT
  USING (user_id = auth.uid());

CREATE POLICY "Users can update their own preferences"
  ON user_preference_profiles FOR ALL
  USING (user_id = auth.uid());

-- RLS Policies for client_profiles
CREATE POLICY "Users can manage their client profiles"
  ON client_profiles FOR ALL
  USING (user_id = auth.uid());

-- Admin access to analytics tables
CREATE POLICY "Admins can view all analytics"
  ON revenue_analytics FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Admins can view performance metrics"
  ON performance_metrics FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

-- Public read access for reference data
CREATE POLICY "Anyone can view eco materials database"
  ON eco_materials_database FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view safety guidelines"
  ON safety_guidelines FOR SELECT
  USING (true);

-- ============================================================================
-- GRANT PERMISSIONS
-- ============================================================================

-- Grant necessary permissions to authenticated users
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- ============================================================================
-- MIGRATION COMPLETE
-- ============================================================================

-- Log migration
DO $$
BEGIN
  RAISE NOTICE 'Comprehensive features enhancement migration completed successfully';
  RAISE NOTICE 'Created 25 new tables for enhanced features';
  RAISE NOTICE 'Applied RLS policies and indexes';
END $$;
