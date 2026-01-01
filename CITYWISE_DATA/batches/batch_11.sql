-- COMPREHENSIVE CITYWISE PRICING DATA IMPORT
-- Generated: 2026-01-01T12:27:08.554Z
-- Source: 27 Excel files with city-wise rates
-- Total Rows: 3710
-- Total Sheets: 110

-- ========================================
-- PART 1: PRICING ITEMS
-- ========================================


-- ========================================
-- BATCH 11 of 14
-- Lines: 50011 to 55010
-- ========================================


INSERT INTO pricing_items (
    item_name,
    item_category,
    item_subcategory,
    material,
    brand,
    base_price,
    unit,
    source,
    source_file,
    source_sheet,
    metadata
) VALUES (
    'Club Prime BWP 12mm',
    'plywood',
    NULL,
    NULL,
    'Century Ply',
    130,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'plywood_citywise_rates_2025.xlsx',
    'Plywood_CityWise_Rates',
    '{"Brand":"Century Ply","Product":"Club Prime BWP 12mm","Unit":"₹ per sq.ft","Mumbai_Rate":"145","Delhi_Rate":"130","Hyderabad_Rate":"125","Gurgaon_Rate":"130","Bangalore_Rate":"135","Pune_Rate":"137"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Club Prime BWP 12mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Club Prime BWP 12mm',
    'plywood',
    'Mumbai',
    145,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Club Prime BWP 12mm',
    'plywood',
    'Delhi',
    130,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Club Prime BWP 12mm',
    'plywood',
    'Hyderabad',
    125,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Club Prime BWP 12mm',
    'plywood',
    'Gurgaon',
    130,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Club Prime BWP 12mm',
    'plywood',
    'Bangalore',
    135,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Club Prime BWP 12mm',
    'plywood',
    'Pune',
    137,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

INSERT INTO pricing_items (
    item_name,
    item_category,
    item_subcategory,
    material,
    brand,
    base_price,
    unit,
    source,
    source_file,
    source_sheet,
    metadata
) VALUES (
    'Club Prime BWP 18mm',
    'plywood',
    NULL,
    NULL,
    'Century Ply',
    140,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'plywood_citywise_rates_2025.xlsx',
    'Plywood_CityWise_Rates',
    '{"Brand":"Century Ply","Product":"Club Prime BWP 18mm","Unit":"₹ per sq.ft","Mumbai_Rate":"155","Delhi_Rate":"140","Hyderabad_Rate":"135","Gurgaon_Rate":"140","Bangalore_Rate":"145","Pune_Rate":"147"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Club Prime BWP 18mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Club Prime BWP 18mm',
    'plywood',
    'Mumbai',
    155,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Club Prime BWP 18mm',
    'plywood',
    'Delhi',
    140,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Club Prime BWP 18mm',
    'plywood',
    'Hyderabad',
    135,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Club Prime BWP 18mm',
    'plywood',
    'Gurgaon',
    140,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Club Prime BWP 18mm',
    'plywood',
    'Bangalore',
    145,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Club Prime BWP 18mm',
    'plywood',
    'Pune',
    147,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

INSERT INTO pricing_items (
    item_name,
    item_category,
    item_subcategory,
    material,
    brand,
    base_price,
    unit,
    source,
    source_file,
    source_sheet,
    metadata
) VALUES (
    'Club Prime BWP 19mm',
    'plywood',
    NULL,
    NULL,
    'Century Ply',
    145,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'plywood_citywise_rates_2025.xlsx',
    'Plywood_CityWise_Rates',
    '{"Brand":"Century Ply","Product":"Club Prime BWP 19mm","Unit":"₹ per sq.ft","Mumbai_Rate":"160","Delhi_Rate":"145","Hyderabad_Rate":"140","Gurgaon_Rate":"145","Bangalore_Rate":"150","Pune_Rate":"152"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Club Prime BWP 19mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Club Prime BWP 19mm',
    'plywood',
    'Mumbai',
    160,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Club Prime BWP 19mm',
    'plywood',
    'Delhi',
    145,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Club Prime BWP 19mm',
    'plywood',
    'Hyderabad',
    140,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Club Prime BWP 19mm',
    'plywood',
    'Gurgaon',
    145,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Club Prime BWP 19mm',
    'plywood',
    'Bangalore',
    150,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Club Prime BWP 19mm',
    'plywood',
    'Pune',
    152,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

INSERT INTO pricing_items (
    item_name,
    item_category,
    item_subcategory,
    material,
    brand,
    base_price,
    unit,
    source,
    source_file,
    source_sheet,
    metadata
) VALUES (
    'Sainik 710 BWP 6mm',
    'plywood',
    NULL,
    NULL,
    'Century Ply',
    105,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'plywood_citywise_rates_2025.xlsx',
    'Plywood_CityWise_Rates',
    '{"Brand":"Century Ply","Product":"Sainik 710 BWP 6mm","Unit":"₹ per sq.ft","Mumbai_Rate":"115","Delhi_Rate":"105","Hyderabad_Rate":"100","Gurgaon_Rate":"105","Bangalore_Rate":"110","Pune_Rate":"112"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Sainik 710 BWP 6mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Sainik 710 BWP 6mm',
    'plywood',
    'Mumbai',
    115,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Sainik 710 BWP 6mm',
    'plywood',
    'Delhi',
    105,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Sainik 710 BWP 6mm',
    'plywood',
    'Hyderabad',
    100,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Sainik 710 BWP 6mm',
    'plywood',
    'Gurgaon',
    105,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Sainik 710 BWP 6mm',
    'plywood',
    'Bangalore',
    110,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Sainik 710 BWP 6mm',
    'plywood',
    'Pune',
    112,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

INSERT INTO pricing_items (
    item_name,
    item_category,
    item_subcategory,
    material,
    brand,
    base_price,
    unit,
    source,
    source_file,
    source_sheet,
    metadata
) VALUES (
    'Sainik 710 BWP 12mm',
    'plywood',
    NULL,
    NULL,
    'Century Ply',
    110,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'plywood_citywise_rates_2025.xlsx',
    'Plywood_CityWise_Rates',
    '{"Brand":"Century Ply","Product":"Sainik 710 BWP 12mm","Unit":"₹ per sq.ft","Mumbai_Rate":"120","Delhi_Rate":"110","Hyderabad_Rate":"105","Gurgaon_Rate":"110","Bangalore_Rate":"115","Pune_Rate":"117"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Sainik 710 BWP 12mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Sainik 710 BWP 12mm',
    'plywood',
    'Mumbai',
    120,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Sainik 710 BWP 12mm',
    'plywood',
    'Delhi',
    110,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Sainik 710 BWP 12mm',
    'plywood',
    'Hyderabad',
    105,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Sainik 710 BWP 12mm',
    'plywood',
    'Gurgaon',
    110,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Sainik 710 BWP 12mm',
    'plywood',
    'Bangalore',
    115,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Sainik 710 BWP 12mm',
    'plywood',
    'Pune',
    117,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

INSERT INTO pricing_items (
    item_name,
    item_category,
    item_subcategory,
    material,
    brand,
    base_price,
    unit,
    source,
    source_file,
    source_sheet,
    metadata
) VALUES (
    'Sainik 710 BWP 18mm',
    'plywood',
    NULL,
    NULL,
    'Century Ply',
    125,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'plywood_citywise_rates_2025.xlsx',
    'Plywood_CityWise_Rates',
    '{"Brand":"Century Ply","Product":"Sainik 710 BWP 18mm","Unit":"₹ per sq.ft","Mumbai_Rate":"135","Delhi_Rate":"125","Hyderabad_Rate":"120","Gurgaon_Rate":"125","Bangalore_Rate":"130","Pune_Rate":"132"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Sainik 710 BWP 18mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Sainik 710 BWP 18mm',
    'plywood',
    'Mumbai',
    135,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Sainik 710 BWP 18mm',
    'plywood',
    'Delhi',
    125,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Sainik 710 BWP 18mm',
    'plywood',
    'Hyderabad',
    120,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Sainik 710 BWP 18mm',
    'plywood',
    'Gurgaon',
    125,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Sainik 710 BWP 18mm',
    'plywood',
    'Bangalore',
    130,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Sainik 710 BWP 18mm',
    'plywood',
    'Pune',
    132,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

INSERT INTO pricing_items (
    item_name,
    item_category,
    item_subcategory,
    material,
    brand,
    base_price,
    unit,
    source,
    source_file,
    source_sheet,
    metadata
) VALUES (
    'Sainik 710 BWP 19mm',
    'plywood',
    NULL,
    NULL,
    'Century Ply',
    130,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'plywood_citywise_rates_2025.xlsx',
    'Plywood_CityWise_Rates',
    '{"Brand":"Century Ply","Product":"Sainik 710 BWP 19mm","Unit":"₹ per sq.ft","Mumbai_Rate":"140","Delhi_Rate":"130","Hyderabad_Rate":"125","Gurgaon_Rate":"130","Bangalore_Rate":"135","Pune_Rate":"137"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Sainik 710 BWP 19mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Sainik 710 BWP 19mm',
    'plywood',
    'Mumbai',
    140,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Sainik 710 BWP 19mm',
    'plywood',
    'Delhi',
    130,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Sainik 710 BWP 19mm',
    'plywood',
    'Hyderabad',
    125,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Sainik 710 BWP 19mm',
    'plywood',
    'Gurgaon',
    130,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Sainik 710 BWP 19mm',
    'plywood',
    'Bangalore',
    135,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Sainik 710 BWP 19mm',
    'plywood',
    'Pune',
    137,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

INSERT INTO pricing_items (
    item_name,
    item_category,
    item_subcategory,
    material,
    brand,
    base_price,
    unit,
    source,
    source_file,
    source_sheet,
    metadata
) VALUES (
    'Sovereign 710 BWR 6mm',
    'plywood',
    NULL,
    NULL,
    'Century Ply',
    95,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'plywood_citywise_rates_2025.xlsx',
    'Plywood_CityWise_Rates',
    '{"Brand":"Century Ply","Product":"Sovereign 710 BWR 6mm","Unit":"₹ per sq.ft","Mumbai_Rate":"105","Delhi_Rate":"95","Hyderabad_Rate":"90","Gurgaon_Rate":"95","Bangalore_Rate":"100","Pune_Rate":"102"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Sovereign 710 BWR 6mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Sovereign 710 BWR 6mm',
    'plywood',
    'Mumbai',
    105,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Sovereign 710 BWR 6mm',
    'plywood',
    'Delhi',
    95,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Sovereign 710 BWR 6mm',
    'plywood',
    'Hyderabad',
    90,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Sovereign 710 BWR 6mm',
    'plywood',
    'Gurgaon',
    95,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Sovereign 710 BWR 6mm',
    'plywood',
    'Bangalore',
    100,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Sovereign 710 BWR 6mm',
    'plywood',
    'Pune',
    102,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

INSERT INTO pricing_items (
    item_name,
    item_category,
    item_subcategory,
    material,
    brand,
    base_price,
    unit,
    source,
    source_file,
    source_sheet,
    metadata
) VALUES (
    'Sovereign 710 BWR 12mm',
    'plywood',
    NULL,
    NULL,
    'Century Ply',
    100,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'plywood_citywise_rates_2025.xlsx',
    'Plywood_CityWise_Rates',
    '{"Brand":"Century Ply","Product":"Sovereign 710 BWR 12mm","Unit":"₹ per sq.ft","Mumbai_Rate":"110","Delhi_Rate":"100","Hyderabad_Rate":"95","Gurgaon_Rate":"100","Bangalore_Rate":"105","Pune_Rate":"107"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Sovereign 710 BWR 12mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Sovereign 710 BWR 12mm',
    'plywood',
    'Mumbai',
    110,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Sovereign 710 BWR 12mm',
    'plywood',
    'Delhi',
    100,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Sovereign 710 BWR 12mm',
    'plywood',
    'Hyderabad',
    95,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Sovereign 710 BWR 12mm',
    'plywood',
    'Gurgaon',
    100,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Sovereign 710 BWR 12mm',
    'plywood',
    'Bangalore',
    105,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Sovereign 710 BWR 12mm',
    'plywood',
    'Pune',
    107,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

INSERT INTO pricing_items (
    item_name,
    item_category,
    item_subcategory,
    material,
    brand,
    base_price,
    unit,
    source,
    source_file,
    source_sheet,
    metadata
) VALUES (
    'Sovereign 710 BWR 18mm',
    'plywood',
    NULL,
    NULL,
    'Century Ply',
    115,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'plywood_citywise_rates_2025.xlsx',
    'Plywood_CityWise_Rates',
    '{"Brand":"Century Ply","Product":"Sovereign 710 BWR 18mm","Unit":"₹ per sq.ft","Mumbai_Rate":"125","Delhi_Rate":"115","Hyderabad_Rate":"110","Gurgaon_Rate":"115","Bangalore_Rate":"120","Pune_Rate":"122"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Sovereign 710 BWR 18mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Sovereign 710 BWR 18mm',
    'plywood',
    'Mumbai',
    125,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Sovereign 710 BWR 18mm',
    'plywood',
    'Delhi',
    115,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Sovereign 710 BWR 18mm',
    'plywood',
    'Hyderabad',
    110,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Sovereign 710 BWR 18mm',
    'plywood',
    'Gurgaon',
    115,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Sovereign 710 BWR 18mm',
    'plywood',
    'Bangalore',
    120,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Sovereign 710 BWR 18mm',
    'plywood',
    'Pune',
    122,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

INSERT INTO pricing_items (
    item_name,
    item_category,
    item_subcategory,
    material,
    brand,
    base_price,
    unit,
    source,
    source_file,
    source_sheet,
    metadata
) VALUES (
    'Sovereign 710 BWR 19mm',
    'plywood',
    NULL,
    NULL,
    'Century Ply',
    120,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'plywood_citywise_rates_2025.xlsx',
    'Plywood_CityWise_Rates',
    '{"Brand":"Century Ply","Product":"Sovereign 710 BWR 19mm","Unit":"₹ per sq.ft","Mumbai_Rate":"130","Delhi_Rate":"120","Hyderabad_Rate":"115","Gurgaon_Rate":"120","Bangalore_Rate":"125","Pune_Rate":"127"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Sovereign 710 BWR 19mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Sovereign 710 BWR 19mm',
    'plywood',
    'Mumbai',
    130,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Sovereign 710 BWR 19mm',
    'plywood',
    'Delhi',
    120,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Sovereign 710 BWR 19mm',
    'plywood',
    'Hyderabad',
    115,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Sovereign 710 BWR 19mm',
    'plywood',
    'Gurgaon',
    120,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Sovereign 710 BWR 19mm',
    'plywood',
    'Bangalore',
    125,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Sovereign 710 BWR 19mm',
    'plywood',
    'Pune',
    127,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

INSERT INTO pricing_items (
    item_name,
    item_category,
    item_subcategory,
    material,
    brand,
    base_price,
    unit,
    source,
    source_file,
    source_sheet,
    metadata
) VALUES (
    'Sainik MR 6mm',
    'plywood',
    NULL,
    NULL,
    'Century Ply',
    75,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'plywood_citywise_rates_2025.xlsx',
    'Plywood_CityWise_Rates',
    '{"Brand":"Century Ply","Product":"Sainik MR 6mm","Unit":"₹ per sq.ft","Mumbai_Rate":"85","Delhi_Rate":"75","Hyderabad_Rate":"70","Gurgaon_Rate":"75","Bangalore_Rate":"80","Pune_Rate":"82"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Sainik MR 6mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Sainik MR 6mm',
    'plywood',
    'Mumbai',
    85,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Sainik MR 6mm',
    'plywood',
    'Delhi',
    75,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Sainik MR 6mm',
    'plywood',
    'Hyderabad',
    70,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Sainik MR 6mm',
    'plywood',
    'Gurgaon',
    75,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Sainik MR 6mm',
    'plywood',
    'Bangalore',
    80,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Sainik MR 6mm',
    'plywood',
    'Pune',
    82,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

INSERT INTO pricing_items (
    item_name,
    item_category,
    item_subcategory,
    material,
    brand,
    base_price,
    unit,
    source,
    source_file,
    source_sheet,
    metadata
) VALUES (
    'Sainik MR 12mm',
    'plywood',
    NULL,
    NULL,
    'Century Ply',
    80,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'plywood_citywise_rates_2025.xlsx',
    'Plywood_CityWise_Rates',
    '{"Brand":"Century Ply","Product":"Sainik MR 12mm","Unit":"₹ per sq.ft","Mumbai_Rate":"90","Delhi_Rate":"80","Hyderabad_Rate":"75","Gurgaon_Rate":"80","Bangalore_Rate":"85","Pune_Rate":"87"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Sainik MR 12mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Sainik MR 12mm',
    'plywood',
    'Mumbai',
    90,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Sainik MR 12mm',
    'plywood',
    'Delhi',
    80,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Sainik MR 12mm',
    'plywood',
    'Hyderabad',
    75,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Sainik MR 12mm',
    'plywood',
    'Gurgaon',
    80,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Sainik MR 12mm',
    'plywood',
    'Bangalore',
    85,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Sainik MR 12mm',
    'plywood',
    'Pune',
    87,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

INSERT INTO pricing_items (
    item_name,
    item_category,
    item_subcategory,
    material,
    brand,
    base_price,
    unit,
    source,
    source_file,
    source_sheet,
    metadata
) VALUES (
    'Sainik MR 18mm',
    'plywood',
    NULL,
    NULL,
    'Century Ply',
    90,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'plywood_citywise_rates_2025.xlsx',
    'Plywood_CityWise_Rates',
    '{"Brand":"Century Ply","Product":"Sainik MR 18mm","Unit":"₹ per sq.ft","Mumbai_Rate":"100","Delhi_Rate":"90","Hyderabad_Rate":"85","Gurgaon_Rate":"90","Bangalore_Rate":"95","Pune_Rate":"97"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Sainik MR 18mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Sainik MR 18mm',
    'plywood',
    'Mumbai',
    100,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Sainik MR 18mm',
    'plywood',
    'Delhi',
    90,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Sainik MR 18mm',
    'plywood',
    'Hyderabad',
    85,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Sainik MR 18mm',
    'plywood',
    'Gurgaon',
    90,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Sainik MR 18mm',
    'plywood',
    'Bangalore',
    95,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Sainik MR 18mm',
    'plywood',
    'Pune',
    97,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

INSERT INTO pricing_items (
    item_name,
    item_category,
    item_subcategory,
    material,
    brand,
    base_price,
    unit,
    source,
    source_file,
    source_sheet,
    metadata
) VALUES (
    'WIN MR 18mm',
    'plywood',
    NULL,
    NULL,
    'Century Ply',
    95,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'plywood_citywise_rates_2025.xlsx',
    'Plywood_CityWise_Rates',
    '{"Brand":"Century Ply","Product":"WIN MR 18mm","Unit":"₹ per sq.ft","Mumbai_Rate":"105","Delhi_Rate":"95","Hyderabad_Rate":"90","Gurgaon_Rate":"95","Bangalore_Rate":"100","Pune_Rate":"102"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: WIN MR 18mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'WIN MR 18mm',
    'plywood',
    'Mumbai',
    105,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'WIN MR 18mm',
    'plywood',
    'Delhi',
    95,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'WIN MR 18mm',
    'plywood',
    'Hyderabad',
    90,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'WIN MR 18mm',
    'plywood',
    'Gurgaon',
    95,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'WIN MR 18mm',
    'plywood',
    'Bangalore',
    100,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'WIN MR 18mm',
    'plywood',
    'Pune',
    102,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

INSERT INTO pricing_items (
    item_name,
    item_category,
    item_subcategory,
    material,
    brand,
    base_price,
    unit,
    source,
    source_file,
    source_sheet,
    metadata
) VALUES (
    'Gold 710 BWP 6mm',
    'plywood',
    NULL,
    NULL,
    'Greenply',
    120,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'plywood_citywise_rates_2025.xlsx',
    'Plywood_CityWise_Rates',
    '{"Brand":"Greenply","Product":"Gold 710 BWP 6mm","Unit":"₹ per sq.ft","Mumbai_Rate":"135","Delhi_Rate":"120","Hyderabad_Rate":"115","Gurgaon_Rate":"120","Bangalore_Rate":"125","Pune_Rate":"127"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Gold 710 BWP 6mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Gold 710 BWP 6mm',
    'plywood',
    'Mumbai',
    135,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Gold 710 BWP 6mm',
    'plywood',
    'Delhi',
    120,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Gold 710 BWP 6mm',
    'plywood',
    'Hyderabad',
    115,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Gold 710 BWP 6mm',
    'plywood',
    'Gurgaon',
    120,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Gold 710 BWP 6mm',
    'plywood',
    'Bangalore',
    125,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Gold 710 BWP 6mm',
    'plywood',
    'Pune',
    127,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

INSERT INTO pricing_items (
    item_name,
    item_category,
    item_subcategory,
    material,
    brand,
    base_price,
    unit,
    source,
    source_file,
    source_sheet,
    metadata
) VALUES (
    'Gold 710 BWP 12mm',
    'plywood',
    NULL,
    NULL,
    'Greenply',
    125,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'plywood_citywise_rates_2025.xlsx',
    'Plywood_CityWise_Rates',
    '{"Brand":"Greenply","Product":"Gold 710 BWP 12mm","Unit":"₹ per sq.ft","Mumbai_Rate":"140","Delhi_Rate":"125","Hyderabad_Rate":"120","Gurgaon_Rate":"125","Bangalore_Rate":"130","Pune_Rate":"132"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Gold 710 BWP 12mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Gold 710 BWP 12mm',
    'plywood',
    'Mumbai',
    140,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Gold 710 BWP 12mm',
    'plywood',
    'Delhi',
    125,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Gold 710 BWP 12mm',
    'plywood',
    'Hyderabad',
    120,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Gold 710 BWP 12mm',
    'plywood',
    'Gurgaon',
    125,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Gold 710 BWP 12mm',
    'plywood',
    'Bangalore',
    130,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Gold 710 BWP 12mm',
    'plywood',
    'Pune',
    132,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

INSERT INTO pricing_items (
    item_name,
    item_category,
    item_subcategory,
    material,
    brand,
    base_price,
    unit,
    source,
    source_file,
    source_sheet,
    metadata
) VALUES (
    'Gold 710 BWP 18mm',
    'plywood',
    NULL,
    NULL,
    'Greenply',
    135,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'plywood_citywise_rates_2025.xlsx',
    'Plywood_CityWise_Rates',
    '{"Brand":"Greenply","Product":"Gold 710 BWP 18mm","Unit":"₹ per sq.ft","Mumbai_Rate":"150","Delhi_Rate":"135","Hyderabad_Rate":"130","Gurgaon_Rate":"135","Bangalore_Rate":"140","Pune_Rate":"142"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Gold 710 BWP 18mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Gold 710 BWP 18mm',
    'plywood',
    'Mumbai',
    150,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Gold 710 BWP 18mm',
    'plywood',
    'Delhi',
    135,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Gold 710 BWP 18mm',
    'plywood',
    'Hyderabad',
    130,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Gold 710 BWP 18mm',
    'plywood',
    'Gurgaon',
    135,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Gold 710 BWP 18mm',
    'plywood',
    'Bangalore',
    140,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Gold 710 BWP 18mm',
    'plywood',
    'Pune',
    142,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

INSERT INTO pricing_items (
    item_name,
    item_category,
    item_subcategory,
    material,
    brand,
    base_price,
    unit,
    source,
    source_file,
    source_sheet,
    metadata
) VALUES (
    'Gold 710 BWP 19mm',
    'plywood',
    NULL,
    NULL,
    'Greenply',
    140,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'plywood_citywise_rates_2025.xlsx',
    'Plywood_CityWise_Rates',
    '{"Brand":"Greenply","Product":"Gold 710 BWP 19mm","Unit":"₹ per sq.ft","Mumbai_Rate":"155","Delhi_Rate":"140","Hyderabad_Rate":"135","Gurgaon_Rate":"140","Bangalore_Rate":"145","Pune_Rate":"147"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Gold 710 BWP 19mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Gold 710 BWP 19mm',
    'plywood',
    'Mumbai',
    155,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Gold 710 BWP 19mm',
    'plywood',
    'Delhi',
    140,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Gold 710 BWP 19mm',
    'plywood',
    'Hyderabad',
    135,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Gold 710 BWP 19mm',
    'plywood',
    'Gurgaon',
    140,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Gold 710 BWP 19mm',
    'plywood',
    'Bangalore',
    145,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Gold 710 BWP 19mm',
    'plywood',
    'Pune',
    147,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

INSERT INTO pricing_items (
    item_name,
    item_category,
    item_subcategory,
    material,
    brand,
    base_price,
    unit,
    source,
    source_file,
    source_sheet,
    metadata
) VALUES (
    'Ecotec 710 BWP 6mm',
    'plywood',
    NULL,
    NULL,
    'Greenply',
    115,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'plywood_citywise_rates_2025.xlsx',
    'Plywood_CityWise_Rates',
    '{"Brand":"Greenply","Product":"Ecotec 710 BWP 6mm","Unit":"₹ per sq.ft","Mumbai_Rate":"125","Delhi_Rate":"115","Hyderabad_Rate":"110","Gurgaon_Rate":"115","Bangalore_Rate":"120","Pune_Rate":"122"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Ecotec 710 BWP 6mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Ecotec 710 BWP 6mm',
    'plywood',
    'Mumbai',
    125,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Ecotec 710 BWP 6mm',
    'plywood',
    'Delhi',
    115,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Ecotec 710 BWP 6mm',
    'plywood',
    'Hyderabad',
    110,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Ecotec 710 BWP 6mm',
    'plywood',
    'Gurgaon',
    115,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Ecotec 710 BWP 6mm',
    'plywood',
    'Bangalore',
    120,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Ecotec 710 BWP 6mm',
    'plywood',
    'Pune',
    122,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

INSERT INTO pricing_items (
    item_name,
    item_category,
    item_subcategory,
    material,
    brand,
    base_price,
    unit,
    source,
    source_file,
    source_sheet,
    metadata
) VALUES (
    'Ecotec 710 BWP 12mm',
    'plywood',
    NULL,
    NULL,
    'Greenply',
    120,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'plywood_citywise_rates_2025.xlsx',
    'Plywood_CityWise_Rates',
    '{"Brand":"Greenply","Product":"Ecotec 710 BWP 12mm","Unit":"₹ per sq.ft","Mumbai_Rate":"130","Delhi_Rate":"120","Hyderabad_Rate":"115","Gurgaon_Rate":"120","Bangalore_Rate":"125","Pune_Rate":"127"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Ecotec 710 BWP 12mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Ecotec 710 BWP 12mm',
    'plywood',
    'Mumbai',
    130,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Ecotec 710 BWP 12mm',
    'plywood',
    'Delhi',
    120,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Ecotec 710 BWP 12mm',
    'plywood',
    'Hyderabad',
    115,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Ecotec 710 BWP 12mm',
    'plywood',
    'Gurgaon',
    120,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Ecotec 710 BWP 12mm',
    'plywood',
    'Bangalore',
    125,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Ecotec 710 BWP 12mm',
    'plywood',
    'Pune',
    127,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

INSERT INTO pricing_items (
    item_name,
    item_category,
    item_subcategory,
    material,
    brand,
    base_price,
    unit,
    source,
    source_file,
    source_sheet,
    metadata
) VALUES (
    'Ecotec 710 BWP 18mm',
    'plywood',
    NULL,
    NULL,
    'Greenply',
    130,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'plywood_citywise_rates_2025.xlsx',
    'Plywood_CityWise_Rates',
    '{"Brand":"Greenply","Product":"Ecotec 710 BWP 18mm","Unit":"₹ per sq.ft","Mumbai_Rate":"145","Delhi_Rate":"130","Hyderabad_Rate":"125","Gurgaon_Rate":"130","Bangalore_Rate":"135","Pune_Rate":"137"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Ecotec 710 BWP 18mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Ecotec 710 BWP 18mm',
    'plywood',
    'Mumbai',
    145,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Ecotec 710 BWP 18mm',
    'plywood',
    'Delhi',
    130,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Ecotec 710 BWP 18mm',
    'plywood',
    'Hyderabad',
    125,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Ecotec 710 BWP 18mm',
    'plywood',
    'Gurgaon',
    130,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Ecotec 710 BWP 18mm',
    'plywood',
    'Bangalore',
    135,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Ecotec 710 BWP 18mm',
    'plywood',
    'Pune',
    137,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

INSERT INTO pricing_items (
    item_name,
    item_category,
    item_subcategory,
    material,
    brand,
    base_price,
    unit,
    source,
    source_file,
    source_sheet,
    metadata
) VALUES (
    'Ecotec 710 BWP 19mm',
    'plywood',
    NULL,
    NULL,
    'Greenply',
    135,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'plywood_citywise_rates_2025.xlsx',
    'Plywood_CityWise_Rates',
    '{"Brand":"Greenply","Product":"Ecotec 710 BWP 19mm","Unit":"₹ per sq.ft","Mumbai_Rate":"150","Delhi_Rate":"135","Hyderabad_Rate":"130","Gurgaon_Rate":"135","Bangalore_Rate":"140","Pune_Rate":"142"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Ecotec 710 BWP 19mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Ecotec 710 BWP 19mm',
    'plywood',
    'Mumbai',
    150,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Ecotec 710 BWP 19mm',
    'plywood',
    'Delhi',
    135,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Ecotec 710 BWP 19mm',
    'plywood',
    'Hyderabad',
    130,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Ecotec 710 BWP 19mm',
    'plywood',
    'Gurgaon',
    135,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Ecotec 710 BWP 19mm',
    'plywood',
    'Bangalore',
    140,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Ecotec 710 BWP 19mm',
    'plywood',
    'Pune',
    142,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

INSERT INTO pricing_items (
    item_name,
    item_category,
    item_subcategory,
    material,
    brand,
    base_price,
    unit,
    source,
    source_file,
    source_sheet,
    metadata
) VALUES (
    'Ecotec BWR 6mm',
    'plywood',
    NULL,
    NULL,
    'Greenply',
    90,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'plywood_citywise_rates_2025.xlsx',
    'Plywood_CityWise_Rates',
    '{"Brand":"Greenply","Product":"Ecotec BWR 6mm","Unit":"₹ per sq.ft","Mumbai_Rate":"100","Delhi_Rate":"90","Hyderabad_Rate":"85","Gurgaon_Rate":"90","Bangalore_Rate":"95","Pune_Rate":"97"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Ecotec BWR 6mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Ecotec BWR 6mm',
    'plywood',
    'Mumbai',
    100,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Ecotec BWR 6mm',
    'plywood',
    'Delhi',
    90,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Ecotec BWR 6mm',
    'plywood',
    'Hyderabad',
    85,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Ecotec BWR 6mm',
    'plywood',
    'Gurgaon',
    90,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Ecotec BWR 6mm',
    'plywood',
    'Bangalore',
    95,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Ecotec BWR 6mm',
    'plywood',
    'Pune',
    97,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

INSERT INTO pricing_items (
    item_name,
    item_category,
    item_subcategory,
    material,
    brand,
    base_price,
    unit,
    source,
    source_file,
    source_sheet,
    metadata
) VALUES (
    'Ecotec BWR 12mm',
    'plywood',
    NULL,
    NULL,
    'Greenply',
    95,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'plywood_citywise_rates_2025.xlsx',
    'Plywood_CityWise_Rates',
    '{"Brand":"Greenply","Product":"Ecotec BWR 12mm","Unit":"₹ per sq.ft","Mumbai_Rate":"105","Delhi_Rate":"95","Hyderabad_Rate":"90","Gurgaon_Rate":"95","Bangalore_Rate":"100","Pune_Rate":"102"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Ecotec BWR 12mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Ecotec BWR 12mm',
    'plywood',
    'Mumbai',
    105,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Ecotec BWR 12mm',
    'plywood',
    'Delhi',
    95,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Ecotec BWR 12mm',
    'plywood',
    'Hyderabad',
    90,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Ecotec BWR 12mm',
    'plywood',
    'Gurgaon',
    95,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Ecotec BWR 12mm',
    'plywood',
    'Bangalore',
    100,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Ecotec BWR 12mm',
    'plywood',
    'Pune',
    102,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

INSERT INTO pricing_items (
    item_name,
    item_category,
    item_subcategory,
    material,
    brand,
    base_price,
    unit,
    source,
    source_file,
    source_sheet,
    metadata
) VALUES (
    'Ecotec BWR 18mm',
    'plywood',
    NULL,
    NULL,
    'Greenply',
    110,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'plywood_citywise_rates_2025.xlsx',
    'Plywood_CityWise_Rates',
    '{"Brand":"Greenply","Product":"Ecotec BWR 18mm","Unit":"₹ per sq.ft","Mumbai_Rate":"120","Delhi_Rate":"110","Hyderabad_Rate":"105","Gurgaon_Rate":"110","Bangalore_Rate":"115","Pune_Rate":"117"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Ecotec BWR 18mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Ecotec BWR 18mm',
    'plywood',
    'Mumbai',
    120,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Ecotec BWR 18mm',
    'plywood',
    'Delhi',
    110,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Ecotec BWR 18mm',
    'plywood',
    'Hyderabad',
    105,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Ecotec BWR 18mm',
    'plywood',
    'Gurgaon',
    110,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Ecotec BWR 18mm',
    'plywood',
    'Bangalore',
    115,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Ecotec BWR 18mm',
    'plywood',
    'Pune',
    117,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

INSERT INTO pricing_items (
    item_name,
    item_category,
    item_subcategory,
    material,
    brand,
    base_price,
    unit,
    source,
    source_file,
    source_sheet,
    metadata
) VALUES (
    'Ecotec BWR 19mm',
    'plywood',
    NULL,
    NULL,
    'Greenply',
    115,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'plywood_citywise_rates_2025.xlsx',
    'Plywood_CityWise_Rates',
    '{"Brand":"Greenply","Product":"Ecotec BWR 19mm","Unit":"₹ per sq.ft","Mumbai_Rate":"125","Delhi_Rate":"115","Hyderabad_Rate":"110","Gurgaon_Rate":"115","Bangalore_Rate":"120","Pune_Rate":"122"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Ecotec BWR 19mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Ecotec BWR 19mm',
    'plywood',
    'Mumbai',
    125,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Ecotec BWR 19mm',
    'plywood',
    'Delhi',
    115,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Ecotec BWR 19mm',
    'plywood',
    'Hyderabad',
    110,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Ecotec BWR 19mm',
    'plywood',
    'Gurgaon',
    115,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Ecotec BWR 19mm',
    'plywood',
    'Bangalore',
    120,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Ecotec BWR 19mm',
    'plywood',
    'Pune',
    122,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

INSERT INTO pricing_items (
    item_name,
    item_category,
    item_subcategory,
    material,
    brand,
    base_price,
    unit,
    source,
    source_file,
    source_sheet,
    metadata
) VALUES (
    'Ecotec MR 6mm',
    'plywood',
    NULL,
    NULL,
    'Greenply',
    70,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'plywood_citywise_rates_2025.xlsx',
    'Plywood_CityWise_Rates',
    '{"Brand":"Greenply","Product":"Ecotec MR 6mm","Unit":"₹ per sq.ft","Mumbai_Rate":"80","Delhi_Rate":"70","Hyderabad_Rate":"65","Gurgaon_Rate":"70","Bangalore_Rate":"75","Pune_Rate":"77"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Ecotec MR 6mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Ecotec MR 6mm',
    'plywood',
    'Mumbai',
    80,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Ecotec MR 6mm',
    'plywood',
    'Delhi',
    70,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Ecotec MR 6mm',
    'plywood',
    'Hyderabad',
    65,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Ecotec MR 6mm',
    'plywood',
    'Gurgaon',
    70,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Ecotec MR 6mm',
    'plywood',
    'Bangalore',
    75,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Ecotec MR 6mm',
    'plywood',
    'Pune',
    77,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

INSERT INTO pricing_items (
    item_name,
    item_category,
    item_subcategory,
    material,
    brand,
    base_price,
    unit,
    source,
    source_file,
    source_sheet,
    metadata
) VALUES (
    'Ecotec MR 12mm',
    'plywood',
    NULL,
    NULL,
    'Greenply',
    75,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'plywood_citywise_rates_2025.xlsx',
    'Plywood_CityWise_Rates',
    '{"Brand":"Greenply","Product":"Ecotec MR 12mm","Unit":"₹ per sq.ft","Mumbai_Rate":"85","Delhi_Rate":"75","Hyderabad_Rate":"70","Gurgaon_Rate":"75","Bangalore_Rate":"80","Pune_Rate":"82"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Ecotec MR 12mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Ecotec MR 12mm',
    'plywood',
    'Mumbai',
    85,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Ecotec MR 12mm',
    'plywood',
    'Delhi',
    75,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Ecotec MR 12mm',
    'plywood',
    'Hyderabad',
    70,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Ecotec MR 12mm',
    'plywood',
    'Gurgaon',
    75,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Ecotec MR 12mm',
    'plywood',
    'Bangalore',
    80,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Ecotec MR 12mm',
    'plywood',
    'Pune',
    82,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

INSERT INTO pricing_items (
    item_name,
    item_category,
    item_subcategory,
    material,
    brand,
    base_price,
    unit,
    source,
    source_file,
    source_sheet,
    metadata
) VALUES (
    'Ecotec MR 18mm',
    'plywood',
    NULL,
    NULL,
    'Greenply',
    85,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'plywood_citywise_rates_2025.xlsx',
    'Plywood_CityWise_Rates',
    '{"Brand":"Greenply","Product":"Ecotec MR 18mm","Unit":"₹ per sq.ft","Mumbai_Rate":"95","Delhi_Rate":"85","Hyderabad_Rate":"80","Gurgaon_Rate":"85","Bangalore_Rate":"90","Pune_Rate":"92"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Ecotec MR 18mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Ecotec MR 18mm',
    'plywood',
    'Mumbai',
    95,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Ecotec MR 18mm',
    'plywood',
    'Delhi',
    85,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Ecotec MR 18mm',
    'plywood',
    'Hyderabad',
    80,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Ecotec MR 18mm',
    'plywood',
    'Gurgaon',
    85,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Ecotec MR 18mm',
    'plywood',
    'Bangalore',
    90,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Ecotec MR 18mm',
    'plywood',
    'Pune',
    92,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

INSERT INTO pricing_items (
    item_name,
    item_category,
    item_subcategory,
    material,
    brand,
    base_price,
    unit,
    source,
    source_file,
    source_sheet,
    metadata
) VALUES (
    'Club MR 18mm',
    'plywood',
    NULL,
    NULL,
    'Greenply',
    90,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'plywood_citywise_rates_2025.xlsx',
    'Plywood_CityWise_Rates',
    '{"Brand":"Greenply","Product":"Club MR 18mm","Unit":"₹ per sq.ft","Mumbai_Rate":"100","Delhi_Rate":"90","Hyderabad_Rate":"85","Gurgaon_Rate":"90","Bangalore_Rate":"95","Pune_Rate":"97"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Club MR 18mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Club MR 18mm',
    'plywood',
    'Mumbai',
    100,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Club MR 18mm',
    'plywood',
    'Delhi',
    90,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Club MR 18mm',
    'plywood',
    'Hyderabad',
    85,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Club MR 18mm',
    'plywood',
    'Gurgaon',
    90,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Club MR 18mm',
    'plywood',
    'Bangalore',
    95,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Club MR 18mm',
    'plywood',
    'Pune',
    97,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

INSERT INTO pricing_items (
    item_name,
    item_category,
    item_subcategory,
    material,
    brand,
    base_price,
    unit,
    source,
    source_file,
    source_sheet,
    metadata
) VALUES (
    'BWR Grade 6mm',
    'plywood',
    NULL,
    NULL,
    'Kitply',
    80,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'plywood_citywise_rates_2025.xlsx',
    'Plywood_CityWise_Rates',
    '{"Brand":"Kitply","Product":"BWR Grade 6mm","Unit":"₹ per sq.ft","Mumbai_Rate":"90","Delhi_Rate":"80","Hyderabad_Rate":"75","Gurgaon_Rate":"80","Bangalore_Rate":"85","Pune_Rate":"87"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: BWR Grade 6mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'BWR Grade 6mm',
    'plywood',
    'Mumbai',
    90,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'BWR Grade 6mm',
    'plywood',
    'Delhi',
    80,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'BWR Grade 6mm',
    'plywood',
    'Hyderabad',
    75,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'BWR Grade 6mm',
    'plywood',
    'Gurgaon',
    80,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'BWR Grade 6mm',
    'plywood',
    'Bangalore',
    85,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'BWR Grade 6mm',
    'plywood',
    'Pune',
    87,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

INSERT INTO pricing_items (
    item_name,
    item_category,
    item_subcategory,
    material,
    brand,
    base_price,
    unit,
    source,
    source_file,
    source_sheet,
    metadata
) VALUES (
    'BWR Grade 12mm',
    'plywood',
    NULL,
    NULL,
    'Kitply',
    85,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'plywood_citywise_rates_2025.xlsx',
    'Plywood_CityWise_Rates',
    '{"Brand":"Kitply","Product":"BWR Grade 12mm","Unit":"₹ per sq.ft","Mumbai_Rate":"95","Delhi_Rate":"85","Hyderabad_Rate":"80","Gurgaon_Rate":"85","Bangalore_Rate":"90","Pune_Rate":"92"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: BWR Grade 12mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'BWR Grade 12mm',
    'plywood',
    'Mumbai',
    95,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'BWR Grade 12mm',
    'plywood',
    'Delhi',
    85,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'BWR Grade 12mm',
    'plywood',
    'Hyderabad',
    80,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'BWR Grade 12mm',
    'plywood',
    'Gurgaon',
    85,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'BWR Grade 12mm',
    'plywood',
    'Bangalore',
    90,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'BWR Grade 12mm',
    'plywood',
    'Pune',
    92,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

INSERT INTO pricing_items (
    item_name,
    item_category,
    item_subcategory,
    material,
    brand,
    base_price,
    unit,
    source,
    source_file,
    source_sheet,
    metadata
) VALUES (
    'BWR Grade 18mm',
    'plywood',
    NULL,
    NULL,
    'Kitply',
    100,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'plywood_citywise_rates_2025.xlsx',
    'Plywood_CityWise_Rates',
    '{"Brand":"Kitply","Product":"BWR Grade 18mm","Unit":"₹ per sq.ft","Mumbai_Rate":"110","Delhi_Rate":"100","Hyderabad_Rate":"95","Gurgaon_Rate":"100","Bangalore_Rate":"105","Pune_Rate":"107"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: BWR Grade 18mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'BWR Grade 18mm',
    'plywood',
    'Mumbai',
    110,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'BWR Grade 18mm',
    'plywood',
    'Delhi',
    100,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'BWR Grade 18mm',
    'plywood',
    'Hyderabad',
    95,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'BWR Grade 18mm',
    'plywood',
    'Gurgaon',
    100,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'BWR Grade 18mm',
    'plywood',
    'Bangalore',
    105,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'BWR Grade 18mm',
    'plywood',
    'Pune',
    107,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

INSERT INTO pricing_items (
    item_name,
    item_category,
    item_subcategory,
    material,
    brand,
    base_price,
    unit,
    source,
    source_file,
    source_sheet,
    metadata
) VALUES (
    'BWR Grade 19mm',
    'plywood',
    NULL,
    NULL,
    'Kitply',
    105,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'plywood_citywise_rates_2025.xlsx',
    'Plywood_CityWise_Rates',
    '{"Brand":"Kitply","Product":"BWR Grade 19mm","Unit":"₹ per sq.ft","Mumbai_Rate":"115","Delhi_Rate":"105","Hyderabad_Rate":"100","Gurgaon_Rate":"105","Bangalore_Rate":"110","Pune_Rate":"112"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: BWR Grade 19mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'BWR Grade 19mm',
    'plywood',
    'Mumbai',
    115,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'BWR Grade 19mm',
    'plywood',
    'Delhi',
    105,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'BWR Grade 19mm',
    'plywood',
    'Hyderabad',
    100,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'BWR Grade 19mm',
    'plywood',
    'Gurgaon',
    105,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'BWR Grade 19mm',
    'plywood',
    'Bangalore',
    110,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'BWR Grade 19mm',
    'plywood',
    'Pune',
    112,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

INSERT INTO pricing_items (
    item_name,
    item_category,
    item_subcategory,
    material,
    brand,
    base_price,
    unit,
    source,
    source_file,
    source_sheet,
    metadata
) VALUES (
    'MR Grade 6mm',
    'plywood',
    NULL,
    NULL,
    'Kitply',
    65,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'plywood_citywise_rates_2025.xlsx',
    'Plywood_CityWise_Rates',
    '{"Brand":"Kitply","Product":"MR Grade 6mm","Unit":"₹ per sq.ft","Mumbai_Rate":"75","Delhi_Rate":"65","Hyderabad_Rate":"60","Gurgaon_Rate":"65","Bangalore_Rate":"70","Pune_Rate":"72"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: MR Grade 6mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'MR Grade 6mm',
    'plywood',
    'Mumbai',
    75,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'MR Grade 6mm',
    'plywood',
    'Delhi',
    65,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'MR Grade 6mm',
    'plywood',
    'Hyderabad',
    60,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'MR Grade 6mm',
    'plywood',
    'Gurgaon',
    65,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'MR Grade 6mm',
    'plywood',
    'Bangalore',
    70,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'MR Grade 6mm',
    'plywood',
    'Pune',
    72,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

INSERT INTO pricing_items (
    item_name,
    item_category,
    item_subcategory,
    material,
    brand,
    base_price,
    unit,
    source,
    source_file,
    source_sheet,
    metadata
) VALUES (
    'MR Grade 12mm',
    'plywood',
    NULL,
    NULL,
    'Kitply',
    70,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'plywood_citywise_rates_2025.xlsx',
    'Plywood_CityWise_Rates',
    '{"Brand":"Kitply","Product":"MR Grade 12mm","Unit":"₹ per sq.ft","Mumbai_Rate":"80","Delhi_Rate":"70","Hyderabad_Rate":"65","Gurgaon_Rate":"70","Bangalore_Rate":"75","Pune_Rate":"77"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: MR Grade 12mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'MR Grade 12mm',
    'plywood',
    'Mumbai',
    80,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'MR Grade 12mm',
    'plywood',
    'Delhi',
    70,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'MR Grade 12mm',
    'plywood',
    'Hyderabad',
    65,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'MR Grade 12mm',
    'plywood',
    'Gurgaon',
    70,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'MR Grade 12mm',
    'plywood',
    'Bangalore',
    75,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'MR Grade 12mm',
    'plywood',
    'Pune',
    77,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

INSERT INTO pricing_items (
    item_name,
    item_category,
    item_subcategory,
    material,
    brand,
    base_price,
    unit,
    source,
    source_file,
    source_sheet,
    metadata
) VALUES (
    'MR Grade 18mm',
    'plywood',
    NULL,
    NULL,
    'Kitply',
    80,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'plywood_citywise_rates_2025.xlsx',
    'Plywood_CityWise_Rates',
    '{"Brand":"Kitply","Product":"MR Grade 18mm","Unit":"₹ per sq.ft","Mumbai_Rate":"90","Delhi_Rate":"80","Hyderabad_Rate":"75","Gurgaon_Rate":"80","Bangalore_Rate":"85","Pune_Rate":"87"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: MR Grade 18mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'MR Grade 18mm',
    'plywood',
    'Mumbai',
    90,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'MR Grade 18mm',
    'plywood',
    'Delhi',
    80,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'MR Grade 18mm',
    'plywood',
    'Hyderabad',
    75,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'MR Grade 18mm',
    'plywood',
    'Gurgaon',
    80,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'MR Grade 18mm',
    'plywood',
    'Bangalore',
    85,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'MR Grade 18mm',
    'plywood',
    'Pune',
    87,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

INSERT INTO pricing_items (
    item_name,
    item_category,
    item_subcategory,
    material,
    brand,
    base_price,
    unit,
    source,
    source_file,
    source_sheet,
    metadata
) VALUES (
    'MR Grade 19mm',
    'plywood',
    NULL,
    NULL,
    'Kitply',
    85,
    '₹ per sq.ft',
    'citywise_excel_2025',
