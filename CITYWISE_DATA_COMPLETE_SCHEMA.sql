-- ========================================
-- CITYWISE DATA COMPLETE SCHEMA
-- ========================================
-- Purpose: Store comprehensive citywise pricing data
-- Source: 27 Excel files with 110 sheets, 3,710 rows
-- Generated: 2026-01-01
-- ========================================

-- ========================================
-- TABLE 1: CITY_PRICING
-- ========================================
-- Stores city-specific pricing for each item
CREATE TABLE IF NOT EXISTS city_pricing (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    item_name TEXT NOT NULL,
    item_category TEXT NOT NULL,
    city TEXT NOT NULL,
    city_rate DECIMAL(10,2) NOT NULL,
    source_file TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Ensure unique combinations
    UNIQUE(item_name, item_category, city)
);

-- Indexes for fast lookups
CREATE INDEX IF NOT EXISTS idx_city_pricing_item ON city_pricing(item_name, item_category);
CREATE INDEX IF NOT EXISTS idx_city_pricing_city ON city_pricing(city);
CREATE INDEX IF NOT EXISTS idx_city_pricing_category ON city_pricing(item_category);

-- Comments
COMMENT ON TABLE city_pricing IS 'City-specific pricing for items across India';
COMMENT ON COLUMN city_pricing.item_name IS 'Name of the item (matches pricing_items)';
COMMENT ON COLUMN city_pricing.item_category IS 'Category (handles, baskets, etc)';
COMMENT ON COLUMN city_pricing.city IS 'City name (Mumbai, Delhi, Hyderabad, etc)';
COMMENT ON COLUMN city_pricing.city_rate IS 'Price in INR for this city';

-- ========================================
-- TABLE 2: CITY_MULTIPLIERS
-- ========================================
-- Stores city multipliers for each category
CREATE TABLE IF NOT EXISTS city_multipliers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    city TEXT NOT NULL,
    category TEXT NOT NULL,
    multiplier DECIMAL(5,3) NOT NULL DEFAULT 1.000,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Ensure unique combinations
    UNIQUE(city, category)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_city_multipliers_city ON city_multipliers(city);
CREATE INDEX IF NOT EXISTS idx_city_multipliers_category ON city_multipliers(category);

-- Comments
COMMENT ON TABLE city_multipliers IS 'City-wise pricing multipliers by category';
COMMENT ON COLUMN city_multipliers.city IS 'City name';
COMMENT ON COLUMN city_multipliers.category IS 'Product category';
COMMENT ON COLUMN city_multipliers.multiplier IS 'Pricing multiplier (e.g., 1.10 = 10% premium)';
COMMENT ON COLUMN city_multipliers.notes IS 'Explanation for multiplier';

-- ========================================
-- TABLE 3: MATERIAL_REFERENCE
-- ========================================
-- Stores material comparison and reference data
CREATE TABLE IF NOT EXISTS material_reference (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category TEXT NOT NULL UNIQUE,
    data JSONB NOT NULL,
    source_file TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_material_reference_category ON material_reference(category);
CREATE INDEX IF NOT EXISTS idx_material_reference_data ON material_reference USING GIN (data);

-- Comments
COMMENT ON TABLE material_reference IS 'Material comparison and reference data by category';
COMMENT ON COLUMN material_reference.category IS 'Material category';
COMMENT ON COLUMN material_reference.data IS 'Complete comparison data in JSON format';

-- ========================================
-- TABLE 4: BRAND_REFERENCE
-- ========================================
-- Stores brand comparison and reference data
CREATE TABLE IF NOT EXISTS brand_reference (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category TEXT NOT NULL,
    brand TEXT NOT NULL,
    origin TEXT,
    market_position TEXT,
    quality_rating TEXT,
    warranty TEXT,
    price_range_delhi TEXT,
    data JSONB NOT NULL,
    source_file TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Ensure unique combinations
    UNIQUE(category, brand)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_brand_reference_category ON brand_reference(category);
CREATE INDEX IF NOT EXISTS idx_brand_reference_brand ON brand_reference(brand);
CREATE INDEX IF NOT EXISTS idx_brand_reference_data ON brand_reference USING GIN (data);

-- Comments
COMMENT ON TABLE brand_reference IS 'Brand comparison and reference data by category';
COMMENT ON COLUMN brand_reference.category IS 'Product category';
COMMENT ON COLUMN brand_reference.brand IS 'Brand name';
COMMENT ON COLUMN brand_reference.data IS 'Complete brand data in JSON format';

-- ========================================
-- TABLE 5: SIZE_GUIDE_REFERENCE
-- ========================================
-- Stores size guides and specifications
CREATE TABLE IF NOT EXISTS size_guide_reference (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category TEXT NOT NULL,
    size_type TEXT NOT NULL,
    specifications JSONB NOT NULL,
    source_file TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Ensure unique combinations
    UNIQUE(category, size_type)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_size_guide_category ON size_guide_reference(category);
CREATE INDEX IF NOT EXISTS idx_size_guide_specs ON size_guide_reference USING GIN (specifications);

-- Comments
COMMENT ON TABLE size_guide_reference IS 'Size guides and specifications by category';
COMMENT ON COLUMN size_guide_reference.category IS 'Product category';
COMMENT ON COLUMN size_guide_reference.size_type IS 'Type or dimension';
COMMENT ON COLUMN size_guide_reference.specifications IS 'Complete specifications in JSON';

-- ========================================
-- HELPER FUNCTIONS
-- ========================================

-- Function to get city-specific price
CREATE OR REPLACE FUNCTION get_city_price(
    p_item_name TEXT,
    p_item_category TEXT,
    p_city TEXT
) RETURNS DECIMAL(10,2) AS $$
DECLARE
    v_city_rate DECIMAL(10,2);
    v_base_price DECIMAL(10,2);
    v_multiplier DECIMAL(5,3);
BEGIN
    -- Try to get direct city rate
    SELECT city_rate INTO v_city_rate
    FROM city_pricing
    WHERE item_name = p_item_name
      AND item_category = p_item_category
      AND city = p_city;
    
    IF v_city_rate IS NOT NULL THEN
        RETURN v_city_rate;
    END IF;
    
    -- Fallback: use base price * multiplier
    SELECT base_price INTO v_base_price
    FROM pricing_items
    WHERE item_name = p_item_name
      AND item_category = p_item_category;
    
    SELECT multiplier INTO v_multiplier
    FROM city_multipliers
    WHERE city = p_city
      AND category = p_item_category;
    
    IF v_base_price IS NOT NULL AND v_multiplier IS NOT NULL THEN
        RETURN v_base_price * v_multiplier;
    END IF;
    
    -- Final fallback: just return base price
    RETURN v_base_price;
END;
$$ LANGUAGE plpgsql;

-- Comments
COMMENT ON FUNCTION get_city_price IS 'Get city-specific price for an item (with fallbacks)';

-- ========================================
-- VERIFICATION QUERIES
-- ========================================

-- Check city pricing coverage
-- SELECT city, COUNT(*) as item_count 
-- FROM city_pricing 
-- GROUP BY city 
-- ORDER BY item_count DESC;

-- Check multipliers by city
-- SELECT city, category, multiplier, notes 
-- FROM city_multipliers 
-- WHERE city = 'Mumbai' 
-- ORDER BY category;

-- Get price for specific item in all cities
-- SELECT cp.city, cp.city_rate, cm.multiplier
-- FROM city_pricing cp
-- LEFT JOIN city_multipliers cm ON cp.city = cm.city AND cp.item_category = cm.category
-- WHERE cp.item_name = 'Hettich Push to Open'
-- ORDER BY cp.city_rate DESC;

-- ========================================
-- GRANTS (adjust as needed for your security model)
-- ========================================
-- GRANT SELECT ON city_pricing TO authenticated;
-- GRANT SELECT ON city_multipliers TO authenticated;
-- GRANT SELECT ON material_reference TO authenticated;
-- GRANT SELECT ON brand_reference TO authenticated;
-- GRANT SELECT ON size_guide_reference TO authenticated;
