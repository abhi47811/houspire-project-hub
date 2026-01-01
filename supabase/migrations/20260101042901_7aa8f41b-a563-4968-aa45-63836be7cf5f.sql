-- ============================================================================
-- BUDGET SYSTEM TABLES - Complete Implementation
-- ============================================================================

-- 1. PRICING_ITEMS - Master pricing database with city-wise rates
-- ============================================================================
CREATE TABLE public.pricing_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Item identification
  item_name TEXT NOT NULL,
  category TEXT NOT NULL,
  sub_category TEXT,
  specification TEXT,
  brand TEXT,
  
  -- Unit information
  unit TEXT NOT NULL DEFAULT 'nos',
  
  -- Budget tier prices (base prices before city multiplier)
  budget_price NUMERIC NOT NULL DEFAULT 0,
  mid_premium_price NUMERIC NOT NULL DEFAULT 0,
  premium_price NUMERIC NOT NULL DEFAULT 0,
  
  -- City-specific multipliers (stored as percentages, e.g., 1.2 = 20% higher)
  hyderabad_multiplier NUMERIC DEFAULT 1.0,
  delhi_multiplier NUMERIC DEFAULT 1.15,
  bangalore_multiplier NUMERIC DEFAULT 1.1,
  pune_multiplier NUMERIC DEFAULT 1.05,
  mumbai_multiplier NUMERIC DEFAULT 1.2,
  chennai_multiplier NUMERIC DEFAULT 1.05,
  kolkata_multiplier NUMERIC DEFAULT 0.95,
  ahmedabad_multiplier NUMERIC DEFAULT 0.9,
  jaipur_multiplier NUMERIC DEFAULT 0.85,
  lucknow_multiplier NUMERIC DEFAULT 0.8,
  surat_multiplier NUMERIC DEFAULT 0.85,
  
  -- GST
  gst_percent NUMERIC NOT NULL DEFAULT 18,
  hsn_code TEXT,
  
  -- Matching helpers
  synonyms TEXT[] DEFAULT '{}',
  keywords TEXT[] DEFAULT '{}',
  
  -- Metadata
  is_active BOOLEAN DEFAULT true,
  source TEXT DEFAULT 'manual',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create indexes for fast matching
CREATE INDEX idx_pricing_items_name ON public.pricing_items USING gin(to_tsvector('english', item_name));
CREATE INDEX idx_pricing_items_category ON public.pricing_items(category);
CREATE INDEX idx_pricing_items_sub_category ON public.pricing_items(sub_category);
CREATE INDEX idx_pricing_items_active ON public.pricing_items(is_active) WHERE is_active = true;

-- Full-text search index
CREATE INDEX idx_pricing_items_search ON public.pricing_items 
USING gin(to_tsvector('english', item_name || ' ' || COALESCE(specification, '') || ' ' || COALESCE(brand, '')));

-- 2. ITEM_SYNONYMS - For matching algorithm
-- ============================================================================
CREATE TABLE public.item_synonyms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Synonym mapping
  synonym TEXT NOT NULL,
  canonical_name TEXT NOT NULL,
  category TEXT,
  
  -- Matching quality
  confidence_score NUMERIC DEFAULT 0.9,
  times_used INTEGER DEFAULT 0,
  times_confirmed INTEGER DEFAULT 0,
  
  -- Metadata
  source TEXT DEFAULT 'manual',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  
  UNIQUE(synonym, category)
);

CREATE INDEX idx_synonyms_synonym ON public.item_synonyms(lower(synonym));
CREATE INDEX idx_synonyms_canonical ON public.item_synonyms(lower(canonical_name));

-- 3. ENHANCED BUDGET_ITEMS - Add AI extraction fields
-- ============================================================================
-- First, add new columns to existing budget_items table
ALTER TABLE public.budget_items 
ADD COLUMN IF NOT EXISTS pricing_item_id UUID REFERENCES public.pricing_items(id),
ADD COLUMN IF NOT EXISTS render_id UUID REFERENCES public.renders(id),
ADD COLUMN IF NOT EXISTS ai_item_name TEXT,
ADD COLUMN IF NOT EXISTS ai_category TEXT,
ADD COLUMN IF NOT EXISTS ai_confidence NUMERIC,
ADD COLUMN IF NOT EXISTS ai_specifications JSONB DEFAULT '{}',
ADD COLUMN IF NOT EXISTS match_strategy TEXT,
ADD COLUMN IF NOT EXISTS match_confidence NUMERIC,
ADD COLUMN IF NOT EXISTS alternative_matches JSONB DEFAULT '[]',
ADD COLUMN IF NOT EXISTS user_selected_item_id UUID REFERENCES public.pricing_items(id),
ADD COLUMN IF NOT EXISTS custom_price NUMERIC,
ADD COLUMN IF NOT EXISTS custom_quantity NUMERIC,
ADD COLUMN IF NOT EXISTS user_edited BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS extraction_batch_id UUID,
ADD COLUMN IF NOT EXISTS budget_tier TEXT DEFAULT 'mid_premium';

-- Add index for render_id
CREATE INDEX IF NOT EXISTS idx_budget_items_render ON public.budget_items(render_id);
CREATE INDEX IF NOT EXISTS idx_budget_items_pricing ON public.budget_items(pricing_item_id);
CREATE INDEX IF NOT EXISTS idx_budget_items_extraction ON public.budget_items(extraction_batch_id);

-- 4. KITCHEN_MODULES - Modular kitchen calculator
-- ============================================================================
CREATE TABLE public.kitchen_modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  budget_item_id UUID REFERENCES public.budget_items(id) ON DELETE CASCADE,
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  room_id UUID REFERENCES public.rooms(id) ON DELETE SET NULL,
  
  -- Kitchen dimensions
  total_length_feet NUMERIC,
  layout_type TEXT, -- L-shape, U-shape, Parallel, Straight
  
  -- Unit quantities (in running feet or nos)
  base_units_rft NUMERIC DEFAULT 0,
  upper_units_rft NUMERIC DEFAULT 0,
  tall_units_nos INTEGER DEFAULT 0,
  
  -- Countertop
  countertop_sqft NUMERIC DEFAULT 0,
  countertop_material TEXT,
  countertop_edge_profile TEXT,
  
  -- Backsplash
  backsplash_sqft NUMERIC DEFAULT 0,
  backsplash_material TEXT,
  
  -- Carcass details
  carcass_material TEXT DEFAULT 'HDHMR',
  carcass_thickness_mm INTEGER DEFAULT 18,
  
  -- Hardware
  hardware_brand TEXT,
  soft_close_hinges INTEGER DEFAULT 0,
  tandem_drawers INTEGER DEFAULT 0,
  corner_solutions TEXT,
  
  -- Appliances (included/excluded)
  chimney_included BOOLEAN DEFAULT false,
  hob_included BOOLEAN DEFAULT false,
  sink_included BOOLEAN DEFAULT false,
  
  -- Calculated subtotals
  carcass_total NUMERIC DEFAULT 0,
  shutter_total NUMERIC DEFAULT 0,
  hardware_total NUMERIC DEFAULT 0,
  countertop_total NUMERIC DEFAULT 0,
  accessories_total NUMERIC DEFAULT 0,
  grand_total NUMERIC DEFAULT 0,
  
  -- Metadata
  budget_tier TEXT DEFAULT 'mid_premium',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_kitchen_modules_project ON public.kitchen_modules(project_id);
CREATE INDEX idx_kitchen_modules_room ON public.kitchen_modules(room_id);

-- 5. WARDROBE_MODULES - Modular wardrobe calculator
-- ============================================================================
CREATE TABLE public.wardrobe_modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  budget_item_id UUID REFERENCES public.budget_items(id) ON DELETE CASCADE,
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  room_id UUID REFERENCES public.rooms(id) ON DELETE SET NULL,
  
  -- Wardrobe dimensions
  width_feet NUMERIC,
  height_feet NUMERIC DEFAULT 8,
  depth_inches NUMERIC DEFAULT 22,
  
  -- Type
  wardrobe_type TEXT DEFAULT 'swing', -- swing, sliding
  
  -- Configuration
  hang_sections INTEGER DEFAULT 2,
  drawer_units INTEGER DEFAULT 4,
  shelf_sections INTEGER DEFAULT 3,
  
  -- Materials
  carcass_material TEXT DEFAULT 'HDHMR',
  shutter_material TEXT DEFAULT 'Laminate',
  shutter_finish TEXT,
  
  -- Accessories
  soft_close_hinges INTEGER DEFAULT 0,
  drawer_channels_pairs INTEGER DEFAULT 0,
  led_profile_feet NUMERIC DEFAULT 0,
  mirror_sqft NUMERIC DEFAULT 0,
  
  -- Calculated subtotals
  carcass_total NUMERIC DEFAULT 0,
  shutter_total NUMERIC DEFAULT 0,
  hardware_total NUMERIC DEFAULT 0,
  accessories_total NUMERIC DEFAULT 0,
  grand_total NUMERIC DEFAULT 0,
  
  -- Metadata
  budget_tier TEXT DEFAULT 'mid_premium',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_wardrobe_modules_project ON public.wardrobe_modules(project_id);
CREATE INDEX idx_wardrobe_modules_room ON public.wardrobe_modules(room_id);

-- 6. BUDGET_EXPORTS - Export history tracking
-- ============================================================================
CREATE TABLE public.budget_exports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
  
  -- Export details
  export_format TEXT NOT NULL, -- pdf, excel, csv
  export_type TEXT DEFAULT 'full', -- full, summary, room_wise
  
  -- File storage
  file_url TEXT,
  storage_path TEXT,
  file_size_bytes INTEGER,
  
  -- Snapshot of data at export time
  items_count INTEGER,
  total_amount NUMERIC,
  budget_tier TEXT,
  
  -- User info
  exported_by UUID REFERENCES public.profiles(id),
  client_name TEXT,
  client_email TEXT,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_budget_exports_project ON public.budget_exports(project_id);
CREATE INDEX idx_budget_exports_user ON public.budget_exports(exported_by);

-- 7. BUDGET_TEMPLATES - For future templates feature
-- ============================================================================
CREATE TABLE public.budget_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Template info
  name TEXT NOT NULL,
  description TEXT,
  room_type TEXT,
  design_style TEXT,
  
  -- Template data
  items JSONB NOT NULL DEFAULT '[]',
  
  -- Usage stats
  times_used INTEGER DEFAULT 0,
  
  -- Ownership
  is_public BOOLEAN DEFAULT false,
  created_by UUID REFERENCES public.profiles(id),
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_budget_templates_room_style ON public.budget_templates(room_type, design_style);
CREATE INDEX idx_budget_templates_public ON public.budget_templates(is_public) WHERE is_public = true;

-- ============================================================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================================================

-- Enable RLS on all new tables
ALTER TABLE public.pricing_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.item_synonyms ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.kitchen_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wardrobe_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.budget_exports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.budget_templates ENABLE ROW LEVEL SECURITY;

-- PRICING_ITEMS: Read-only for authenticated, full access for admin
CREATE POLICY "Authenticated users can view pricing items"
ON public.pricing_items FOR SELECT
TO authenticated
USING (is_active = true);

CREATE POLICY "Admins can manage pricing items"
ON public.pricing_items FOR ALL
USING (get_user_role(auth.uid()) = 'admin');

-- ITEM_SYNONYMS: Read-only for authenticated, full access for admin
CREATE POLICY "Authenticated users can view synonyms"
ON public.item_synonyms FOR SELECT
TO authenticated
USING (is_active = true);

CREATE POLICY "Admins can manage synonyms"
ON public.item_synonyms FOR ALL
USING (get_user_role(auth.uid()) = 'admin');

-- KITCHEN_MODULES: Project owner access
CREATE POLICY "Users can view kitchen modules for their projects"
ON public.kitchen_modules FOR SELECT
USING (EXISTS (
  SELECT 1 FROM projects p
  WHERE p.id = kitchen_modules.project_id
  AND (p.created_by = auth.uid() OR p.assigned_to = auth.uid())
));

CREATE POLICY "Users can insert kitchen modules for their projects"
ON public.kitchen_modules FOR INSERT
WITH CHECK (EXISTS (
  SELECT 1 FROM projects p
  WHERE p.id = kitchen_modules.project_id
  AND (p.created_by = auth.uid() OR p.assigned_to = auth.uid())
));

CREATE POLICY "Users can update kitchen modules for their projects"
ON public.kitchen_modules FOR UPDATE
USING (EXISTS (
  SELECT 1 FROM projects p
  WHERE p.id = kitchen_modules.project_id
  AND (p.created_by = auth.uid() OR p.assigned_to = auth.uid())
));

CREATE POLICY "Admins can manage all kitchen modules"
ON public.kitchen_modules FOR ALL
USING (get_user_role(auth.uid()) = 'admin');

-- WARDROBE_MODULES: Project owner access
CREATE POLICY "Users can view wardrobe modules for their projects"
ON public.wardrobe_modules FOR SELECT
USING (EXISTS (
  SELECT 1 FROM projects p
  WHERE p.id = wardrobe_modules.project_id
  AND (p.created_by = auth.uid() OR p.assigned_to = auth.uid())
));

CREATE POLICY "Users can insert wardrobe modules for their projects"
ON public.wardrobe_modules FOR INSERT
WITH CHECK (EXISTS (
  SELECT 1 FROM projects p
  WHERE p.id = wardrobe_modules.project_id
  AND (p.created_by = auth.uid() OR p.assigned_to = auth.uid())
));

CREATE POLICY "Users can update wardrobe modules for their projects"
ON public.wardrobe_modules FOR UPDATE
USING (EXISTS (
  SELECT 1 FROM projects p
  WHERE p.id = wardrobe_modules.project_id
  AND (p.created_by = auth.uid() OR p.assigned_to = auth.uid())
));

CREATE POLICY "Admins can manage all wardrobe modules"
ON public.wardrobe_modules FOR ALL
USING (get_user_role(auth.uid()) = 'admin');

-- BUDGET_EXPORTS: Project owner access
CREATE POLICY "Users can view exports for their projects"
ON public.budget_exports FOR SELECT
USING (EXISTS (
  SELECT 1 FROM projects p
  WHERE p.id = budget_exports.project_id
  AND (p.created_by = auth.uid() OR p.assigned_to = auth.uid())
));

CREATE POLICY "Users can create exports for their projects"
ON public.budget_exports FOR INSERT
WITH CHECK (EXISTS (
  SELECT 1 FROM projects p
  WHERE p.id = budget_exports.project_id
  AND (p.created_by = auth.uid() OR p.assigned_to = auth.uid())
));

CREATE POLICY "Admins can manage all exports"
ON public.budget_exports FOR ALL
USING (get_user_role(auth.uid()) = 'admin');

-- BUDGET_TEMPLATES: Owner + public access
CREATE POLICY "Users can view their own templates"
ON public.budget_templates FOR SELECT
USING (created_by = auth.uid());

CREATE POLICY "Users can view public templates"
ON public.budget_templates FOR SELECT
USING (is_public = true);

CREATE POLICY "Users can create their own templates"
ON public.budget_templates FOR INSERT
WITH CHECK (created_by = auth.uid());

CREATE POLICY "Users can update their own templates"
ON public.budget_templates FOR UPDATE
USING (created_by = auth.uid());

CREATE POLICY "Admins can manage all templates"
ON public.budget_templates FOR ALL
USING (get_user_role(auth.uid()) = 'admin');

-- ============================================================================
-- HELPER FUNCTIONS
-- ============================================================================

-- Function to calculate city-specific price
CREATE OR REPLACE FUNCTION public.calculate_city_price(
  p_pricing_item_id UUID,
  p_city TEXT,
  p_budget_tier TEXT DEFAULT 'mid_premium',
  p_quantity NUMERIC DEFAULT 1
)
RETURNS TABLE(
  base_price NUMERIC,
  city_multiplier NUMERIC,
  tier_price NUMERIC,
  subtotal NUMERIC,
  gst_amount NUMERIC,
  total NUMERIC
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
DECLARE
  v_item pricing_items%ROWTYPE;
  v_tier_price NUMERIC;
  v_multiplier NUMERIC;
  v_subtotal NUMERIC;
  v_gst NUMERIC;
BEGIN
  SELECT * INTO v_item FROM pricing_items WHERE id = p_pricing_item_id;
  
  IF v_item IS NULL THEN
    RETURN;
  END IF;
  
  -- Get tier price
  v_tier_price := CASE p_budget_tier
    WHEN 'budget' THEN v_item.budget_price
    WHEN 'premium' THEN v_item.premium_price
    ELSE v_item.mid_premium_price
  END;
  
  -- Get city multiplier
  v_multiplier := CASE lower(p_city)
    WHEN 'hyderabad' THEN v_item.hyderabad_multiplier
    WHEN 'delhi' THEN v_item.delhi_multiplier
    WHEN 'bangalore' THEN v_item.bangalore_multiplier
    WHEN 'pune' THEN v_item.pune_multiplier
    WHEN 'mumbai' THEN v_item.mumbai_multiplier
    WHEN 'chennai' THEN v_item.chennai_multiplier
    WHEN 'kolkata' THEN v_item.kolkata_multiplier
    WHEN 'ahmedabad' THEN v_item.ahmedabad_multiplier
    WHEN 'jaipur' THEN v_item.jaipur_multiplier
    WHEN 'lucknow' THEN v_item.lucknow_multiplier
    WHEN 'surat' THEN v_item.surat_multiplier
    ELSE 1.0
  END;
  
  v_subtotal := v_tier_price * COALESCE(v_multiplier, 1.0) * p_quantity;
  v_gst := v_subtotal * (v_item.gst_percent / 100);
  
  RETURN QUERY SELECT 
    v_tier_price,
    COALESCE(v_multiplier, 1.0),
    v_tier_price * COALESCE(v_multiplier, 1.0),
    v_subtotal,
    v_gst,
    v_subtotal + v_gst;
END;
$$;

-- Function to update timestamps
CREATE OR REPLACE FUNCTION public.update_budget_tables_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_pricing_items_updated_at
  BEFORE UPDATE ON public.pricing_items
  FOR EACH ROW
  EXECUTE FUNCTION public.update_budget_tables_updated_at();

CREATE TRIGGER update_item_synonyms_updated_at
  BEFORE UPDATE ON public.item_synonyms
  FOR EACH ROW
  EXECUTE FUNCTION public.update_budget_tables_updated_at();

CREATE TRIGGER update_kitchen_modules_updated_at
  BEFORE UPDATE ON public.kitchen_modules
  FOR EACH ROW
  EXECUTE FUNCTION public.update_budget_tables_updated_at();

CREATE TRIGGER update_wardrobe_modules_updated_at
  BEFORE UPDATE ON public.wardrobe_modules
  FOR EACH ROW
  EXECUTE FUNCTION public.update_budget_tables_updated_at();

CREATE TRIGGER update_budget_templates_updated_at
  BEFORE UPDATE ON public.budget_templates
  FOR EACH ROW
  EXECUTE FUNCTION public.update_budget_tables_updated_at();