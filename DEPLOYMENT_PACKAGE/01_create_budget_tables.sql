-- ============================================================================
-- HOUSPIRE BUDGET SYSTEM - COMPLETE DATABASE MIGRATION
-- Version: 1.0
-- Date: 2026-01-01
-- Description: Creates all tables for automated budget generation system
-- ============================================================================

-- ============================================================================
-- TABLE 1: PRICING ITEMS (Core Pricing Database)
-- ============================================================================
CREATE TABLE IF NOT EXISTS pricing_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Categorization
  room_category TEXT NOT NULL,           -- 'living_room', 'bedroom', 'kitchen', etc.
  item_name TEXT NOT NULL,               -- '3-Seater Sofa'
  item_type TEXT NOT NULL,               -- 'furniture', 'finish', 'hardware', 'fixture', 'decor'
  specification TEXT,                    -- 'Standard 3-seater / Fabric / 78"Wx35"D'
  unit TEXT NOT NULL,                    -- 'piece', 'sq ft', 'running ft', 'set', 'pair'
  
  -- Direct City Prices (₹) - Actual prices, not multipliers
  hyderabad_price NUMERIC NOT NULL,
  delhi_price NUMERIC NOT NULL,
  bangalore_price NUMERIC NOT NULL,
  pune_price NUMERIC NOT NULL,
  mumbai_price NUMERIC NOT NULL,
  chennai_price NUMERIC,                 -- For future expansion
  
  -- Budget Tier
  budget_tier TEXT NOT NULL,             -- 'budget', 'mid-premium', 'premium'
  
  -- GST
  gst_rate NUMERIC NOT NULL DEFAULT 18,  -- 5, 12, 18, or 28
  
  -- Additional Information
  recommended_brands TEXT[],             -- Array of brand names
  material_description TEXT,             -- Material details
  warranty TEXT,                         -- Warranty information
  notes TEXT,                            -- Additional notes
  
  -- Matching Support
  synonyms TEXT[],                       -- Alternative names for matching algorithm
  search_tags TEXT[],                    -- Additional search keywords
  
  -- Metadata
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  -- Constraints
  CONSTRAINT valid_tier CHECK (budget_tier IN ('budget', 'mid-premium', 'premium')),
  CONSTRAINT valid_unit CHECK (unit IN ('piece', 'sq ft', 'running ft', 'set', 'pair', 'kg', 'litre', 'meter')),
  CONSTRAINT valid_item_type CHECK (item_type IN ('furniture', 'finish', 'hardware', 'fixture', 'decor', 'material', 'appliance')),
  CONSTRAINT positive_prices CHECK (
    hyderabad_price > 0 AND 
    delhi_price > 0 AND 
    bangalore_price > 0 AND 
    pune_price > 0 AND 
    mumbai_price > 0
  )
);

-- Indexes for pricing_items
CREATE INDEX idx_pricing_category_tier ON pricing_items(room_category, budget_tier);
CREATE INDEX idx_pricing_type ON pricing_items(item_type);
CREATE INDEX idx_pricing_active ON pricing_items(is_active) WHERE is_active = TRUE;
CREATE INDEX idx_pricing_search ON pricing_items USING gin(to_tsvector('english', item_name || ' ' || COALESCE(specification, '')));
CREATE INDEX idx_pricing_synonyms ON pricing_items USING gin(synonyms);
CREATE INDEX idx_pricing_search_tags ON pricing_items USING gin(search_tags);

-- Full-text search index
CREATE INDEX idx_pricing_fulltext ON pricing_items USING gin(
  to_tsvector('english', 
    item_name || ' ' || 
    COALESCE(specification, '') || ' ' || 
    COALESCE(material_description, '')
  )
);

COMMENT ON TABLE pricing_items IS 'Master pricing database with city-wise rates for all items across budget tiers';
COMMENT ON COLUMN pricing_items.room_category IS 'Room type: living_room, bedroom, kitchen, dining_room, bathroom, etc.';
COMMENT ON COLUMN pricing_items.budget_tier IS 'Price tier: budget (basic), mid-premium (standard), premium (high-end)';
COMMENT ON COLUMN pricing_items.synonyms IS 'Alternative names for matching algorithm (e.g., couch, settee for sofa)';

-- ============================================================================
-- TABLE 2: ITEM SYNONYMS (For Matching Algorithm)
-- ============================================================================
CREATE TABLE IF NOT EXISTS item_synonyms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Synonym Mapping
  canonical_name TEXT NOT NULL,          -- Standard name (e.g., '3-seater sofa')
  synonym TEXT NOT NULL,                 -- Alternative name (e.g., 'couch')
  
  -- Matching Support
  confidence NUMERIC DEFAULT 1.0,        -- How confident we are (0-1)
  category_hint TEXT,                    -- Optional category guidance
  
  -- Learning Metrics
  source TEXT DEFAULT 'manual',          -- 'manual', 'ai_learned', 'user_correction'
  usage_count INTEGER DEFAULT 0,         -- Track how often this synonym is matched
  success_count INTEGER DEFAULT 0,       -- Track successful matches (user approved)
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_used_at TIMESTAMPTZ,
  
  CONSTRAINT unique_synonym UNIQUE(canonical_name, synonym),
  CONSTRAINT valid_confidence CHECK (confidence >= 0 AND confidence <= 1),
  CONSTRAINT valid_source CHECK (source IN ('manual', 'ai_learned', 'user_correction'))
);

CREATE INDEX idx_synonyms_lookup ON item_synonyms(synonym);
CREATE INDEX idx_synonyms_canonical ON item_synonyms(canonical_name);
CREATE INDEX idx_synonyms_usage ON item_synonyms(usage_count DESC);

COMMENT ON TABLE item_synonyms IS 'Synonym dictionary for AI item matching algorithm';
COMMENT ON COLUMN item_synonyms.confidence IS 'Match confidence score (1.0 = exact equivalent, <1.0 = approximate match)';
COMMENT ON COLUMN item_synonyms.usage_count IS 'Incremented each time this synonym successfully matches an item';

-- ============================================================================
-- TABLE 3: BUDGET ITEMS (Extracted from Renders)
-- ============================================================================
CREATE TABLE IF NOT EXISTS budget_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Relationships
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  room_id UUID NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
  render_id UUID REFERENCES renders(id) ON DELETE SET NULL,
  
  -- AI Extraction Data
  ai_item_name TEXT NOT NULL,            -- Raw AI output (e.g., 'grey fabric sofa')
  ai_category TEXT,                      -- AI's category guess
  ai_confidence NUMERIC,                 -- AI's confidence in extraction (0-1)
  quantity NUMERIC NOT NULL DEFAULT 1,
  ai_specifications TEXT[],              -- AI-detected specs (color, material, etc.)
  
  -- Matching Results
  pricing_item_id UUID REFERENCES pricing_items(id),
  match_strategy TEXT,                   -- 'exact', 'synonym', 'contains', 'token', 'keyword'
  match_confidence NUMERIC,              -- Matching algorithm confidence (0-1)
  alternative_matches JSONB,             -- Top 3 alternative matches for user review
  
  -- Pricing Calculation
  selected_city TEXT NOT NULL,           -- 'hyderabad', 'delhi', 'bangalore', 'pune', 'mumbai'
  city_price NUMERIC,                    -- Price for selected city
  subtotal NUMERIC,                      -- Quantity × City Price
  gst_rate NUMERIC,                      -- GST rate applied
  gst_amount NUMERIC,                    -- Calculated GST amount
  total NUMERIC,                         -- Subtotal + GST
  
  -- User Overrides
  user_edited BOOLEAN DEFAULT FALSE,
  user_selected_item_id UUID REFERENCES pricing_items(id),  -- If user changes match
  custom_price NUMERIC,                  -- If user manually edits price
  custom_quantity NUMERIC,               -- If user edits quantity
  user_notes TEXT,                       -- User comments/notes
  
  -- Workflow Status
  status TEXT DEFAULT 'pending_review',  -- Workflow state
  approved_at TIMESTAMPTZ,
  approved_by UUID REFERENCES profiles(id),
  rejected_reason TEXT,
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  CONSTRAINT valid_status CHECK (status IN ('pending_review', 'approved', 'rejected', 'exported')),
  CONSTRAINT valid_city CHECK (selected_city IN ('hyderabad', 'delhi', 'bangalore', 'pune', 'mumbai', 'chennai')),
  CONSTRAINT positive_quantity CHECK (quantity > 0),
  CONSTRAINT valid_ai_confidence CHECK (ai_confidence IS NULL OR (ai_confidence >= 0 AND ai_confidence <= 1)),
  CONSTRAINT valid_match_confidence CHECK (match_confidence IS NULL OR (match_confidence >= 0 AND match_confidence <= 1))
);

-- Indexes for budget_items
CREATE INDEX idx_budget_project ON budget_items(project_id);
CREATE INDEX idx_budget_room ON budget_items(room_id);
CREATE INDEX idx_budget_render ON budget_items(render_id);
CREATE INDEX idx_budget_status ON budget_items(status);
CREATE INDEX idx_budget_project_status ON budget_items(project_id, status);
CREATE INDEX idx_budget_pricing_item ON budget_items(pricing_item_id);

COMMENT ON TABLE budget_items IS 'AI-extracted items from renders with matched pricing and user approvals';
COMMENT ON COLUMN budget_items.match_strategy IS 'Algorithm used: exact > synonym > contains > token > keyword';
COMMENT ON COLUMN budget_items.alternative_matches IS 'JSON array of {item_id, item_name, confidence, price} for user selection';

-- ============================================================================
-- TABLE 4: KITCHEN MODULES (Kitchen Calculator)
-- ============================================================================
CREATE TABLE IF NOT EXISTS kitchen_modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Relationships
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  room_id UUID NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
  
  -- Module Configuration (10' modules)
  base_10ft_qty INTEGER DEFAULT 1,
  upper_10ft_qty INTEGER DEFAULT 0,
  tall_unit_2ft_qty INTEGER DEFAULT 0,
  tall_unit_3ft_qty INTEGER DEFAULT 0,
  
  -- Calculated Components (Auto-calculated based on modules)
  total_shutters INTEGER,
  total_tandems INTEGER,
  total_hinges INTEGER,
  total_handles INTEGER,
  total_channels INTEGER,
  
  -- Surface Areas (sq ft)
  countertop_sqft NUMERIC,
  backsplash_sqft NUMERIC,
  
  -- Category Subtotals (₹)
  carcass_total NUMERIC,
  hardware_total NUMERIC,
  countertop_total NUMERIC,
  backsplash_total NUMERIC,
  appliances_total NUMERIC,
  accessories_total NUMERIC,
  
  -- Grand Totals (₹)
  subtotal NUMERIC,
  gst_amount NUMERIC,
  grand_total NUMERIC,
  
  -- Configuration Details
  selected_city TEXT NOT NULL,
  budget_tier TEXT NOT NULL,
  countertop_material TEXT,              -- 'granite', 'quartz', 'marble'
  backsplash_type TEXT,                  -- 'tiles', 'glass', 'granite'
  
  -- Appliances Selected (JSONB for flexibility)
  appliances JSONB,                      -- {chimney: {brand, price}, hob: {brand, price}, etc.}
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  CONSTRAINT valid_city CHECK (selected_city IN ('hyderabad', 'delhi', 'bangalore', 'pune', 'mumbai', 'chennai')),
  CONSTRAINT valid_tier CHECK (budget_tier IN ('budget', 'mid-premium', 'premium'))
);

CREATE INDEX idx_kitchen_project ON kitchen_modules(project_id);
CREATE INDEX idx_kitchen_room ON kitchen_modules(room_id);

COMMENT ON TABLE kitchen_modules IS 'Detailed kitchen calculator with modular breakdown and component costing';
COMMENT ON COLUMN kitchen_modules.base_10ft_qty IS 'Number of 10-foot base cabinet modules';
COMMENT ON COLUMN kitchen_modules.appliances IS 'JSON object with selected appliances: {chimney:{}, hob:{}, sink:{}, etc.}';

-- ============================================================================
-- TABLE 5: WARDROBE MODULES (Wardrobe Calculator)
-- ============================================================================
CREATE TABLE IF NOT EXISTS wardrobe_modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Relationships
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  room_id UUID NOT NULL REFERENCES rooms(id) ON DELETE CASCADE,
  
  -- Module Configuration
  swing_3ft_qty INTEGER DEFAULT 0,
  swing_2ft_qty INTEGER DEFAULT 0,
  swing_1_5ft_qty INTEGER DEFAULT 0,
  sliding_8ft_qty INTEGER DEFAULT 0,
  sliding_6ft_qty INTEGER DEFAULT 0,
  
  -- Additional Options
  loft_included BOOLEAN DEFAULT FALSE,
  height_option TEXT DEFAULT 'standard',  -- 'standard' (7ft), 'tall' (8ft), 'loft' (9ft)
  
  -- Internal Fittings
  long_hang_sections INTEGER DEFAULT 0,  -- 4ft sections
  short_hang_sections INTEGER DEFAULT 0, -- 3ft sections
  top_drawers INTEGER DEFAULT 0,         -- 5" height
  storage_drawers INTEGER DEFAULT 0,     -- 9" height
  shelves INTEGER DEFAULT 0,
  
  -- Accessories
  soft_close_hinges BOOLEAN DEFAULT FALSE,
  mirror_included BOOLEAN DEFAULT FALSE,
  led_lighting BOOLEAN DEFAULT FALSE,
  pull_out_trays INTEGER DEFAULT 0,
  tie_rack BOOLEAN DEFAULT FALSE,
  belt_rack BOOLEAN DEFAULT FALSE,
  
  -- Category Subtotals (₹)
  carcass_total NUMERIC,
  shutters_total NUMERIC,
  hardware_total NUMERIC,
  fittings_total NUMERIC,
  accessories_total NUMERIC,
  
  -- Grand Totals (₹)
  subtotal NUMERIC,
  gst_amount NUMERIC,
  grand_total NUMERIC,
  
  -- Configuration Details
  selected_city TEXT NOT NULL,
  budget_tier TEXT NOT NULL,
  finish_type TEXT,                      -- 'laminate', 'veneer', 'membrane', 'lacquered'
  shutter_material TEXT,                 -- 'plywood', 'mdf', 'particle_board'
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  
  CONSTRAINT valid_city CHECK (selected_city IN ('hyderabad', 'delhi', 'bangalore', 'pune', 'mumbai', 'chennai')),
  CONSTRAINT valid_tier CHECK (budget_tier IN ('budget', 'mid-premium', 'premium')),
  CONSTRAINT valid_height CHECK (height_option IN ('standard', 'tall', 'loft'))
);

CREATE INDEX idx_wardrobe_project ON wardrobe_modules(project_id);
CREATE INDEX idx_wardrobe_room ON wardrobe_modules(room_id);

COMMENT ON TABLE wardrobe_modules IS 'Detailed wardrobe calculator with modular breakdown and fittings';
COMMENT ON COLUMN wardrobe_modules.height_option IS 'Wardrobe height: standard (7ft/2130mm), tall (8ft/2440mm), loft (9ft/2740mm)';

-- ============================================================================
-- TABLE 6: BUDGET EXPORT HISTORY (Export Tracking)
-- ============================================================================
CREATE TABLE IF NOT EXISTS budget_exports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Relationships
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  exported_by UUID NOT NULL REFERENCES profiles(id),
  
  -- Export Details
  export_type TEXT NOT NULL,             -- 'excel', 'pdf', 'csv'
  file_url TEXT,                         -- Storage URL of generated file
  file_size_bytes INTEGER,
  
  -- Export Metadata
  total_items INTEGER,
  total_rooms INTEGER,
  total_amount NUMERIC,
  city TEXT,
  budget_tier TEXT,
  
  -- Audit Trail
  export_params JSONB,                   -- Parameters used for export
  created_at TIMESTAMPTZ DEFAULT NOW(),
  
  CONSTRAINT valid_export_type CHECK (export_type IN ('excel', 'pdf', 'csv', 'json'))
);

CREATE INDEX idx_exports_project ON budget_exports(project_id);
CREATE INDEX idx_exports_user ON budget_exports(exported_by);
CREATE INDEX idx_exports_type ON budget_exports(export_type);
CREATE INDEX idx_exports_date ON budget_exports(created_at DESC);

COMMENT ON TABLE budget_exports IS 'History of all budget exports (BOQ, quotes, etc.) for audit trail';

-- ============================================================================
-- TABLE 7: BUDGET TEMPLATES (Optional: For future use)
-- ============================================================================
CREATE TABLE IF NOT EXISTS budget_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Template Info
  template_name TEXT NOT NULL,
  template_type TEXT NOT NULL,           -- 'room', 'property_type', 'custom'
  description TEXT,
  
  -- Template Data
  room_category TEXT,                    -- For room templates
  property_type TEXT,                    -- '2BHK', '3BHK', 'Villa', etc.
  budget_tier TEXT,
  
  -- Pre-configured Items (JSONB)
  template_items JSONB NOT NULL,         -- Array of {item_id, default_quantity, notes}
  
  -- Usage Metrics
  usage_count INTEGER DEFAULT 0,
  is_public BOOLEAN DEFAULT FALSE,
  created_by UUID REFERENCES profiles(id),
  
  -- Metadata
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_templates_type ON budget_templates(template_type);
CREATE INDEX idx_templates_category ON budget_templates(room_category);
CREATE INDEX idx_templates_public ON budget_templates(is_public) WHERE is_public = TRUE;

COMMENT ON TABLE budget_templates IS 'Pre-configured budget templates for quick project setup (future feature)';

-- ============================================================================
-- TRIGGERS: Auto-update timestamps
-- ============================================================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to all tables with updated_at
CREATE TRIGGER update_pricing_items_timestamp
  BEFORE UPDATE ON pricing_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_budget_items_timestamp
  BEFORE UPDATE ON budget_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_kitchen_modules_timestamp
  BEFORE UPDATE ON kitchen_modules
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_wardrobe_modules_timestamp
  BEFORE UPDATE ON wardrobe_modules
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_budget_templates_timestamp
  BEFORE UPDATE ON budget_templates
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

-- Enable RLS on all tables
ALTER TABLE pricing_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE item_synonyms ENABLE ROW LEVEL SECURITY;
ALTER TABLE budget_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE kitchen_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE wardrobe_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE budget_exports ENABLE ROW LEVEL SECURITY;
ALTER TABLE budget_templates ENABLE ROW LEVEL SECURITY;

-- Pricing Items: Read-only for authenticated users
CREATE POLICY "pricing_items_read" ON pricing_items
  FOR SELECT TO authenticated
  USING (is_active = TRUE);

-- Item Synonyms: Read-only for authenticated users
CREATE POLICY "item_synonyms_read" ON item_synonyms
  FOR SELECT TO authenticated
  USING (true);

-- Budget Items: Users can only access their own project's items
CREATE POLICY "budget_items_select" ON budget_items
  FOR SELECT TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = budget_items.project_id
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "budget_items_insert" ON budget_items
  FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = budget_items.project_id
      AND projects.user_id = auth.uid()
    )
  );

CREATE POLICY "budget_items_update" ON budget_items
  FOR UPDATE TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = budget_items.project_id
      AND projects.user_id = auth.uid()
    )
  );

-- Kitchen Modules: Users can only access their own
CREATE POLICY "kitchen_modules_policy" ON kitchen_modules
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = kitchen_modules.project_id
      AND projects.user_id = auth.uid()
    )
  );

-- Wardrobe Modules: Users can only access their own
CREATE POLICY "wardrobe_modules_policy" ON wardrobe_modules
  FOR ALL TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM projects
      WHERE projects.id = wardrobe_modules.project_id
      AND projects.user_id = auth.uid()
    )
  );

-- Budget Exports: Users can only access their own exports
CREATE POLICY "budget_exports_policy" ON budget_exports
  FOR ALL TO authenticated
  USING (exported_by = auth.uid());

-- Budget Templates: Public templates + own private templates
CREATE POLICY "budget_templates_read" ON budget_templates
  FOR SELECT TO authenticated
  USING (is_public = TRUE OR created_by = auth.uid());

-- ============================================================================
-- HELPER FUNCTIONS
-- ============================================================================

-- Function to get city price dynamically
CREATE OR REPLACE FUNCTION get_city_price(
  item_id UUID,
  city TEXT
)
RETURNS NUMERIC AS $$
BEGIN
  RETURN CASE city
    WHEN 'hyderabad' THEN (SELECT hyderabad_price FROM pricing_items WHERE id = item_id)
    WHEN 'delhi' THEN (SELECT delhi_price FROM pricing_items WHERE id = item_id)
    WHEN 'bangalore' THEN (SELECT bangalore_price FROM pricing_items WHERE id = item_id)
    WHEN 'pune' THEN (SELECT pune_price FROM pricing_items WHERE id = item_id)
    WHEN 'mumbai' THEN (SELECT mumbai_price FROM pricing_items WHERE id = item_id)
    WHEN 'chennai' THEN (SELECT chennai_price FROM pricing_items WHERE id = item_id)
    ELSE NULL
  END;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION get_city_price IS 'Helper function to get price for specific city from pricing_items';

-- Function to calculate budget totals
CREATE OR REPLACE FUNCTION calculate_budget_totals(
  p_project_id UUID
)
RETURNS TABLE (
  total_items BIGINT,
  subtotal NUMERIC,
  gst_amount NUMERIC,
  grand_total NUMERIC
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*)::BIGINT,
    SUM(COALESCE(subtotal, 0)),
    SUM(COALESCE(gst_amount, 0)),
    SUM(COALESCE(total, 0))
  FROM budget_items
  WHERE project_id = p_project_id
  AND status = 'approved';
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION calculate_budget_totals IS 'Calculate total budget for a project (approved items only)';

-- ============================================================================
-- INITIAL DATA: GST Rate Categories
-- ============================================================================

-- Add GST reference comment
COMMENT ON COLUMN pricing_items.gst_rate IS 'GST rates: 5% (basic necessities), 12% (standard goods), 18% (most items), 28% (luxury/appliances)';

-- ============================================================================
-- MIGRATION COMPLETE
-- ============================================================================

-- Log migration completion
DO $$
BEGIN
  RAISE NOTICE '============================================================';
  RAISE NOTICE 'HOUSPIRE BUDGET SYSTEM MIGRATION COMPLETE';
  RAISE NOTICE '============================================================';
  RAISE NOTICE 'Tables Created: 7';
  RAISE NOTICE '  - pricing_items (master pricing database)';
  RAISE NOTICE '  - item_synonyms (matching algorithm support)';
  RAISE NOTICE '  - budget_items (extracted items with pricing)';
  RAISE NOTICE '  - kitchen_modules (kitchen calculator)';
  RAISE NOTICE '  - wardrobe_modules (wardrobe calculator)';
  RAISE NOTICE '  - budget_exports (export history)';
  RAISE NOTICE '  - budget_templates (future templates)';
  RAISE NOTICE 'Indexes Created: 25+';
  RAISE NOTICE 'RLS Policies: Enabled on all tables';
  RAISE NOTICE 'Helper Functions: 2';
  RAISE NOTICE '============================================================';
  RAISE NOTICE 'Next Step: Run data import script to populate pricing_items';
  RAISE NOTICE '============================================================';
END $$;
