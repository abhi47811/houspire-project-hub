-- ============================================
-- CITYWISE PRICING COMPLETE SCHEMA
-- 5 Tables + Helper Function + Indexes + RLS
-- ============================================

-- 1. City Pricing Table (stores 3,132 city-specific rates)
CREATE TABLE IF NOT EXISTS public.city_pricing (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  item_name TEXT NOT NULL,
  item_category TEXT NOT NULL,
  city TEXT NOT NULL,
  city_rate NUMERIC NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(item_name, item_category, city)
);

-- 2. City Multipliers Table (stores 84 category multipliers)
CREATE TABLE IF NOT EXISTS public.city_multipliers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  city TEXT NOT NULL,
  category TEXT NOT NULL,
  multiplier NUMERIC NOT NULL DEFAULT 1.0,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(city, category)
);

-- 3. Material Reference Table (JSONB for flexible material specs)
CREATE TABLE IF NOT EXISTS public.material_reference (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL UNIQUE,
  data JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Brand Reference Table (brand positioning and pricing)
CREATE TABLE IF NOT EXISTS public.brand_reference (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL,
  brand TEXT NOT NULL,
  origin TEXT,
  market_position TEXT,
  quality_rating TEXT,
  warranty TEXT,
  price_range_delhi TEXT,
  data JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(category, brand)
);

-- 5. Size Guide Reference Table (dimensional specifications)
CREATE TABLE IF NOT EXISTS public.size_guide_reference (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL,
  size_type TEXT NOT NULL,
  specifications JSONB NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(category, size_type)
);

-- ============================================
-- INDEXES FOR FAST LOOKUPS
-- ============================================

CREATE INDEX IF NOT EXISTS idx_city_pricing_item ON public.city_pricing(item_name);
CREATE INDEX IF NOT EXISTS idx_city_pricing_category ON public.city_pricing(item_category);
CREATE INDEX IF NOT EXISTS idx_city_pricing_city ON public.city_pricing(city);
CREATE INDEX IF NOT EXISTS idx_city_pricing_lookup ON public.city_pricing(item_name, item_category, city);
CREATE INDEX IF NOT EXISTS idx_city_multipliers_lookup ON public.city_multipliers(city, category);
CREATE INDEX IF NOT EXISTS idx_brand_reference_category ON public.brand_reference(category);

-- ============================================
-- HELPER FUNCTION: get_city_price
-- Returns city-specific price with fallback logic
-- ============================================

CREATE OR REPLACE FUNCTION public.get_city_price(
  p_item_name TEXT,
  p_category TEXT,
  p_city TEXT
)
RETURNS NUMERIC
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_city_rate NUMERIC;
  v_base_price NUMERIC;
  v_multiplier NUMERIC;
BEGIN
  -- First try: Get direct city rate from city_pricing
  SELECT city_rate INTO v_city_rate
  FROM city_pricing
  WHERE item_name = p_item_name
    AND item_category = p_category
    AND city = p_city;
  
  IF v_city_rate IS NOT NULL AND v_city_rate > 0 THEN
    RETURN v_city_rate;
  END IF;
  
  -- Second try: Get base price from pricing_items and apply city multiplier
  SELECT mid_premium_price INTO v_base_price
  FROM pricing_items
  WHERE item_name = p_item_name
    AND category = p_category
    AND is_active = true
  LIMIT 1;
  
  IF v_base_price IS NOT NULL THEN
    -- Get city multiplier for category
    SELECT multiplier INTO v_multiplier
    FROM city_multipliers
    WHERE city = p_city
      AND category = p_category;
    
    IF v_multiplier IS NOT NULL THEN
      RETURN ROUND(v_base_price * v_multiplier, 2);
    ELSE
      -- Use default city multiplier from pricing_items columns
      SELECT CASE lower(p_city)
        WHEN 'mumbai' THEN COALESCE(mumbai_multiplier, 1.2)
        WHEN 'delhi' THEN COALESCE(delhi_multiplier, 1.15)
        WHEN 'bangalore' THEN COALESCE(bangalore_multiplier, 1.1)
        WHEN 'pune' THEN COALESCE(pune_multiplier, 1.05)
        WHEN 'chennai' THEN COALESCE(chennai_multiplier, 1.05)
        WHEN 'hyderabad' THEN COALESCE(hyderabad_multiplier, 1.0)
        WHEN 'kolkata' THEN COALESCE(kolkata_multiplier, 0.95)
        WHEN 'ahmedabad' THEN COALESCE(ahmedabad_multiplier, 0.9)
        WHEN 'jaipur' THEN COALESCE(jaipur_multiplier, 0.85)
        WHEN 'lucknow' THEN COALESCE(lucknow_multiplier, 0.8)
        WHEN 'surat' THEN COALESCE(surat_multiplier, 0.85)
        ELSE 1.0
      END INTO v_multiplier
      FROM pricing_items
      WHERE item_name = p_item_name
        AND category = p_category
        AND is_active = true
      LIMIT 1;
      
      RETURN ROUND(v_base_price * COALESCE(v_multiplier, 1.0), 2);
    END IF;
  END IF;
  
  -- Final fallback: return NULL if no pricing found
  RETURN NULL;
END;
$$;

-- ============================================
-- RLS POLICIES
-- ============================================

ALTER TABLE public.city_pricing ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.city_multipliers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.material_reference ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brand_reference ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.size_guide_reference ENABLE ROW LEVEL SECURITY;

-- city_pricing policies
CREATE POLICY "Authenticated users can view city pricing"
  ON public.city_pricing FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage city pricing"
  ON public.city_pricing FOR ALL
  USING (get_user_role(auth.uid()) = 'admin');

-- city_multipliers policies
CREATE POLICY "Authenticated users can view city multipliers"
  ON public.city_multipliers FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage city multipliers"
  ON public.city_multipliers FOR ALL
  USING (get_user_role(auth.uid()) = 'admin');

-- material_reference policies
CREATE POLICY "Authenticated users can view material reference"
  ON public.material_reference FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage material reference"
  ON public.material_reference FOR ALL
  USING (get_user_role(auth.uid()) = 'admin');

-- brand_reference policies
CREATE POLICY "Authenticated users can view brand reference"
  ON public.brand_reference FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage brand reference"
  ON public.brand_reference FOR ALL
  USING (get_user_role(auth.uid()) = 'admin');

-- size_guide_reference policies
CREATE POLICY "Authenticated users can view size guide reference"
  ON public.size_guide_reference FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage size guide reference"
  ON public.size_guide_reference FOR ALL
  USING (get_user_role(auth.uid()) = 'admin');