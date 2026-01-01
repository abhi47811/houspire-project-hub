-- COMPREHENSIVE CITYWISE PRICING DATA IMPORT
-- Generated: 2026-01-01T12:27:08.554Z
-- Source: 27 Excel files with city-wise rates
-- Total Rows: 3710
-- Total Sheets: 110

-- ========================================
-- PART 1: PRICING ITEMS
-- ========================================


-- ========================================
-- BATCH 12 of 14
-- Lines: 55011 to 60010
-- ========================================

    'plywood_citywise_rates_2025.xlsx',
    'Plywood_CityWise_Rates',
    '{"Brand":"Kitply","Product":"MR Grade 19mm","Unit":"₹ per sq.ft","Mumbai_Rate":"95","Delhi_Rate":"85","Hyderabad_Rate":"80","Gurgaon_Rate":"85","Bangalore_Rate":"90","Pune_Rate":"92"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: MR Grade 19mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'MR Grade 19mm',
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
    'MR Grade 19mm',
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
    'MR Grade 19mm',
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
    'MR Grade 19mm',
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
    'MR Grade 19mm',
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
    'MR Grade 19mm',
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
    'MR Grade 6mm',
    'plywood',
    NULL,
    NULL,
    'Local',
    50,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'plywood_citywise_rates_2025.xlsx',
    'Plywood_CityWise_Rates',
    '{"Brand":"Local","Product":"MR Grade 6mm","Unit":"₹ per sq.ft","Mumbai_Rate":"60","Delhi_Rate":"50","Hyderabad_Rate":"48","Gurgaon_Rate":"50","Bangalore_Rate":"55","Pune_Rate":"57"}'::jsonb
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
    'Delhi',
    50,
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
    48,
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
    50,
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
    55,
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
    57,
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
    'Local',
    55,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'plywood_citywise_rates_2025.xlsx',
    'Plywood_CityWise_Rates',
    '{"Brand":"Local","Product":"MR Grade 12mm","Unit":"₹ per sq.ft","Mumbai_Rate":"65","Delhi_Rate":"55","Hyderabad_Rate":"53","Gurgaon_Rate":"55","Bangalore_Rate":"60","Pune_Rate":"62"}'::jsonb
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
    'Delhi',
    55,
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
    53,
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
    55,
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
    'MR Grade 12mm',
    'plywood',
    'Pune',
    62,
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
    'Local',
    65,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'plywood_citywise_rates_2025.xlsx',
    'Plywood_CityWise_Rates',
    '{"Brand":"Local","Product":"MR Grade 18mm","Unit":"₹ per sq.ft","Mumbai_Rate":"75","Delhi_Rate":"65","Hyderabad_Rate":"62","Gurgaon_Rate":"65","Bangalore_Rate":"70","Pune_Rate":"72"}'::jsonb
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
    'MR Grade 18mm',
    'plywood',
    'Hyderabad',
    62,
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
    'MR Grade 18mm',
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
    'MR Grade 18mm',
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
    'MR Grade 19mm',
    'plywood',
    NULL,
    NULL,
    'Local',
    70,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'plywood_citywise_rates_2025.xlsx',
    'Plywood_CityWise_Rates',
    '{"Brand":"Local","Product":"MR Grade 19mm","Unit":"₹ per sq.ft","Mumbai_Rate":"80","Delhi_Rate":"70","Hyderabad_Rate":"67","Gurgaon_Rate":"70","Bangalore_Rate":"75","Pune_Rate":"77"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: MR Grade 19mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'MR Grade 19mm',
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
    'MR Grade 19mm',
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
    'MR Grade 19mm',
    'plywood',
    'Hyderabad',
    67,
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
    'MR Grade 19mm',
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
    'MR Grade 19mm',
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
    'MR Grade 19mm',
    'plywood',
    'Pune',
    77,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

-- ========================================
-- Category: veneers
-- Sheet: Veneers_CityWise_Rates
-- Rows: 56
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
    'Teak Natural 0.6mm',
    'veneers',
    NULL,
    NULL,
    'Mikasa Decowood',
    250,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'veneers_citywise_rates_2025.xlsx',
    'Veneers_CityWise_Rates',
    '{"Brand":"Mikasa Decowood","Product":"Teak Natural 0.6mm","Unit":"₹ per sq.ft","Mumbai_Rate":"280","Delhi_Rate":"250","Hyderabad_Rate":"240","Gurgaon_Rate":"250","Bangalore_Rate":"262","Pune_Rate":"270"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Teak Natural 0.6mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Teak Natural 0.6mm',
    'veneers',
    'Mumbai',
    280,
    'veneers_citywise_rates_2025.xlsx'
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
    'Teak Natural 0.6mm',
    'veneers',
    'Delhi',
    250,
    'veneers_citywise_rates_2025.xlsx'
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
    'Teak Natural 0.6mm',
    'veneers',
    'Hyderabad',
    240,
    'veneers_citywise_rates_2025.xlsx'
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
    'Teak Natural 0.6mm',
    'veneers',
    'Gurgaon',
    250,
    'veneers_citywise_rates_2025.xlsx'
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
    'Teak Natural 0.6mm',
    'veneers',
    'Bangalore',
    262,
    'veneers_citywise_rates_2025.xlsx'
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
    'Teak Natural 0.6mm',
    'veneers',
    'Pune',
    270,
    'veneers_citywise_rates_2025.xlsx'
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
    'Teak Engineered 0.6mm',
    'veneers',
    NULL,
    NULL,
    'Mikasa Decowood',
    200,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'veneers_citywise_rates_2025.xlsx',
    'Veneers_CityWise_Rates',
    '{"Brand":"Mikasa Decowood","Product":"Teak Engineered 0.6mm","Unit":"₹ per sq.ft","Mumbai_Rate":"220","Delhi_Rate":"200","Hyderabad_Rate":"192","Gurgaon_Rate":"200","Bangalore_Rate":"210","Pune_Rate":"216"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Teak Engineered 0.6mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Teak Engineered 0.6mm',
    'veneers',
    'Mumbai',
    220,
    'veneers_citywise_rates_2025.xlsx'
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
    'Teak Engineered 0.6mm',
    'veneers',
    'Delhi',
    200,
    'veneers_citywise_rates_2025.xlsx'
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
    'Teak Engineered 0.6mm',
    'veneers',
    'Hyderabad',
    192,
    'veneers_citywise_rates_2025.xlsx'
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
    'Teak Engineered 0.6mm',
    'veneers',
    'Gurgaon',
    200,
    'veneers_citywise_rates_2025.xlsx'
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
    'Teak Engineered 0.6mm',
    'veneers',
    'Bangalore',
    210,
    'veneers_citywise_rates_2025.xlsx'
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
    'Teak Engineered 0.6mm',
    'veneers',
    'Pune',
    216,
    'veneers_citywise_rates_2025.xlsx'
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
    'Oak Natural 0.6mm',
    'veneers',
    NULL,
    NULL,
    'Mikasa Decowood',
    235,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'veneers_citywise_rates_2025.xlsx',
    'Veneers_CityWise_Rates',
    '{"Brand":"Mikasa Decowood","Product":"Oak Natural 0.6mm","Unit":"₹ per sq.ft","Mumbai_Rate":"260","Delhi_Rate":"235","Hyderabad_Rate":"225","Gurgaon_Rate":"235","Bangalore_Rate":"246","Pune_Rate":"254"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Oak Natural 0.6mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Oak Natural 0.6mm',
    'veneers',
    'Mumbai',
    260,
    'veneers_citywise_rates_2025.xlsx'
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
    'Oak Natural 0.6mm',
    'veneers',
    'Delhi',
    235,
    'veneers_citywise_rates_2025.xlsx'
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
    'Oak Natural 0.6mm',
    'veneers',
    'Hyderabad',
    225,
    'veneers_citywise_rates_2025.xlsx'
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
    'Oak Natural 0.6mm',
    'veneers',
    'Gurgaon',
    235,
    'veneers_citywise_rates_2025.xlsx'
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
    'Oak Natural 0.6mm',
    'veneers',
    'Bangalore',
    246,
    'veneers_citywise_rates_2025.xlsx'
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
    'Oak Natural 0.6mm',
    'veneers',
    'Pune',
    254,
    'veneers_citywise_rates_2025.xlsx'
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
    'Oak Engineered 0.6mm',
    'veneers',
    NULL,
    NULL,
    'Mikasa Decowood',
    180,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'veneers_citywise_rates_2025.xlsx',
    'Veneers_CityWise_Rates',
    '{"Brand":"Mikasa Decowood","Product":"Oak Engineered 0.6mm","Unit":"₹ per sq.ft","Mumbai_Rate":"200","Delhi_Rate":"180","Hyderabad_Rate":"173","Gurgaon_Rate":"180","Bangalore_Rate":"189","Pune_Rate":"194"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Oak Engineered 0.6mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Oak Engineered 0.6mm',
    'veneers',
    'Mumbai',
    200,
    'veneers_citywise_rates_2025.xlsx'
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
    'Oak Engineered 0.6mm',
    'veneers',
    'Delhi',
    180,
    'veneers_citywise_rates_2025.xlsx'
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
    'Oak Engineered 0.6mm',
    'veneers',
    'Hyderabad',
    173,
    'veneers_citywise_rates_2025.xlsx'
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
    'Oak Engineered 0.6mm',
    'veneers',
    'Gurgaon',
    180,
    'veneers_citywise_rates_2025.xlsx'
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
    'Oak Engineered 0.6mm',
    'veneers',
    'Bangalore',
    189,
    'veneers_citywise_rates_2025.xlsx'
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
    'Oak Engineered 0.6mm',
    'veneers',
    'Pune',
    194,
    'veneers_citywise_rates_2025.xlsx'
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
    'Walnut Natural 0.6mm',
    'veneers',
    NULL,
    NULL,
    'Mikasa Decowood',
    270,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'veneers_citywise_rates_2025.xlsx',
    'Veneers_CityWise_Rates',
    '{"Brand":"Mikasa Decowood","Product":"Walnut Natural 0.6mm","Unit":"₹ per sq.ft","Mumbai_Rate":"300","Delhi_Rate":"270","Hyderabad_Rate":"260","Gurgaon_Rate":"270","Bangalore_Rate":"283","Pune_Rate":"292"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Walnut Natural 0.6mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Walnut Natural 0.6mm',
    'veneers',
    'Mumbai',
    300,
    'veneers_citywise_rates_2025.xlsx'
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
    'Walnut Natural 0.6mm',
    'veneers',
    'Delhi',
    270,
    'veneers_citywise_rates_2025.xlsx'
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
    'Walnut Natural 0.6mm',
    'veneers',
    'Hyderabad',
    260,
    'veneers_citywise_rates_2025.xlsx'
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
    'Walnut Natural 0.6mm',
    'veneers',
    'Gurgaon',
    270,
    'veneers_citywise_rates_2025.xlsx'
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
    'Walnut Natural 0.6mm',
    'veneers',
    'Bangalore',
    283,
    'veneers_citywise_rates_2025.xlsx'
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
    'Walnut Natural 0.6mm',
    'veneers',
    'Pune',
    292,
    'veneers_citywise_rates_2025.xlsx'
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
    'Walnut Engineered 0.6mm',
    'veneers',
    NULL,
    NULL,
    'Mikasa Decowood',
    215,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'veneers_citywise_rates_2025.xlsx',
    'Veneers_CityWise_Rates',
    '{"Brand":"Mikasa Decowood","Product":"Walnut Engineered 0.6mm","Unit":"₹ per sq.ft","Mumbai_Rate":"240","Delhi_Rate":"215","Hyderabad_Rate":"206","Gurgaon_Rate":"215","Bangalore_Rate":"226","Pune_Rate":"232"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Walnut Engineered 0.6mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Walnut Engineered 0.6mm',
    'veneers',
    'Mumbai',
    240,
    'veneers_citywise_rates_2025.xlsx'
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
    'Walnut Engineered 0.6mm',
    'veneers',
    'Delhi',
    215,
    'veneers_citywise_rates_2025.xlsx'
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
    'Walnut Engineered 0.6mm',
    'veneers',
    'Hyderabad',
    206,
    'veneers_citywise_rates_2025.xlsx'
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
    'Walnut Engineered 0.6mm',
    'veneers',
    'Gurgaon',
    215,
    'veneers_citywise_rates_2025.xlsx'
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
    'Walnut Engineered 0.6mm',
    'veneers',
    'Bangalore',
    226,
    'veneers_citywise_rates_2025.xlsx'
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
    'Walnut Engineered 0.6mm',
    'veneers',
    'Pune',
    232,
    'veneers_citywise_rates_2025.xlsx'
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
    'Wenge Natural 0.6mm',
    'veneers',
    NULL,
    NULL,
    'Mikasa Decowood',
    290,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'veneers_citywise_rates_2025.xlsx',
    'Veneers_CityWise_Rates',
    '{"Brand":"Mikasa Decowood","Product":"Wenge Natural 0.6mm","Unit":"₹ per sq.ft","Mumbai_Rate":"320","Delhi_Rate":"290","Hyderabad_Rate":"278","Gurgaon_Rate":"290","Bangalore_Rate":"304","Pune_Rate":"313"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Wenge Natural 0.6mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wenge Natural 0.6mm',
    'veneers',
    'Mumbai',
    320,
    'veneers_citywise_rates_2025.xlsx'
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
    'Wenge Natural 0.6mm',
    'veneers',
    'Delhi',
    290,
    'veneers_citywise_rates_2025.xlsx'
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
    'Wenge Natural 0.6mm',
    'veneers',
    'Hyderabad',
    278,
    'veneers_citywise_rates_2025.xlsx'
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
    'Wenge Natural 0.6mm',
    'veneers',
    'Gurgaon',
    290,
    'veneers_citywise_rates_2025.xlsx'
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
    'Wenge Natural 0.6mm',
    'veneers',
    'Bangalore',
    304,
    'veneers_citywise_rates_2025.xlsx'
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
    'Wenge Natural 0.6mm',
    'veneers',
    'Pune',
    313,
    'veneers_citywise_rates_2025.xlsx'
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
    'Wenge Engineered 0.6mm',
    'veneers',
    NULL,
    NULL,
    'Mikasa Decowood',
    235,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'veneers_citywise_rates_2025.xlsx',
    'Veneers_CityWise_Rates',
    '{"Brand":"Mikasa Decowood","Product":"Wenge Engineered 0.6mm","Unit":"₹ per sq.ft","Mumbai_Rate":"260","Delhi_Rate":"235","Hyderabad_Rate":"225","Gurgaon_Rate":"235","Bangalore_Rate":"246","Pune_Rate":"254"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Wenge Engineered 0.6mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wenge Engineered 0.6mm',
    'veneers',
    'Mumbai',
    260,
    'veneers_citywise_rates_2025.xlsx'
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
    'Wenge Engineered 0.6mm',
    'veneers',
    'Delhi',
    235,
    'veneers_citywise_rates_2025.xlsx'
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
    'Wenge Engineered 0.6mm',
    'veneers',
    'Hyderabad',
    225,
    'veneers_citywise_rates_2025.xlsx'
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
    'Wenge Engineered 0.6mm',
    'veneers',
    'Gurgaon',
    235,
    'veneers_citywise_rates_2025.xlsx'
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
    'Wenge Engineered 0.6mm',
    'veneers',
    'Bangalore',
    246,
    'veneers_citywise_rates_2025.xlsx'
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
    'Wenge Engineered 0.6mm',
    'veneers',
    'Pune',
    254,
    'veneers_citywise_rates_2025.xlsx'
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
    'Maple Natural 0.6mm',
    'veneers',
    NULL,
    NULL,
    'Mikasa Decowood',
    215,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'veneers_citywise_rates_2025.xlsx',
    'Veneers_CityWise_Rates',
    '{"Brand":"Mikasa Decowood","Product":"Maple Natural 0.6mm","Unit":"₹ per sq.ft","Mumbai_Rate":"240","Delhi_Rate":"215","Hyderabad_Rate":"206","Gurgaon_Rate":"215","Bangalore_Rate":"226","Pune_Rate":"232"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Maple Natural 0.6mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Maple Natural 0.6mm',
    'veneers',
    'Mumbai',
    240,
    'veneers_citywise_rates_2025.xlsx'
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
    'Maple Natural 0.6mm',
    'veneers',
    'Delhi',
    215,
    'veneers_citywise_rates_2025.xlsx'
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
    'Maple Natural 0.6mm',
    'veneers',
    'Hyderabad',
    206,
    'veneers_citywise_rates_2025.xlsx'
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
    'Maple Natural 0.6mm',
    'veneers',
    'Gurgaon',
    215,
    'veneers_citywise_rates_2025.xlsx'
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
    'Maple Natural 0.6mm',
    'veneers',
    'Bangalore',
    226,
    'veneers_citywise_rates_2025.xlsx'
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
    'Maple Natural 0.6mm',
    'veneers',
    'Pune',
    232,
    'veneers_citywise_rates_2025.xlsx'
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
    'Maple Engineered 0.6mm',
    'veneers',
    NULL,
    NULL,
    'Mikasa Decowood',
    170,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'veneers_citywise_rates_2025.xlsx',
    'Veneers_CityWise_Rates',
    '{"Brand":"Mikasa Decowood","Product":"Maple Engineered 0.6mm","Unit":"₹ per sq.ft","Mumbai_Rate":"190","Delhi_Rate":"170","Hyderabad_Rate":"163","Gurgaon_Rate":"170","Bangalore_Rate":"179","Pune_Rate":"184"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Maple Engineered 0.6mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Maple Engineered 0.6mm',
    'veneers',
    'Mumbai',
    190,
    'veneers_citywise_rates_2025.xlsx'
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
    'Maple Engineered 0.6mm',
    'veneers',
    'Delhi',
    170,
    'veneers_citywise_rates_2025.xlsx'
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
    'Maple Engineered 0.6mm',
    'veneers',
    'Hyderabad',
    163,
    'veneers_citywise_rates_2025.xlsx'
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
    'Maple Engineered 0.6mm',
    'veneers',
    'Gurgaon',
    170,
    'veneers_citywise_rates_2025.xlsx'
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
    'Maple Engineered 0.6mm',
    'veneers',
    'Bangalore',
    179,
    'veneers_citywise_rates_2025.xlsx'
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
    'Maple Engineered 0.6mm',
    'veneers',
    'Pune',
    184,
    'veneers_citywise_rates_2025.xlsx'
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
    'Cherry Natural 0.6mm',
    'veneers',
    NULL,
    NULL,
    'Mikasa Decowood',
    245,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'veneers_citywise_rates_2025.xlsx',
    'Veneers_CityWise_Rates',
    '{"Brand":"Mikasa Decowood","Product":"Cherry Natural 0.6mm","Unit":"₹ per sq.ft","Mumbai_Rate":"270","Delhi_Rate":"245","Hyderabad_Rate":"235","Gurgaon_Rate":"245","Bangalore_Rate":"257","Pune_Rate":"265"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Cherry Natural 0.6mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Cherry Natural 0.6mm',
    'veneers',
    'Mumbai',
    270,
    'veneers_citywise_rates_2025.xlsx'
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
    'Cherry Natural 0.6mm',
    'veneers',
    'Delhi',
    245,
    'veneers_citywise_rates_2025.xlsx'
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
    'Cherry Natural 0.6mm',
    'veneers',
    'Hyderabad',
    235,
    'veneers_citywise_rates_2025.xlsx'
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
    'Cherry Natural 0.6mm',
    'veneers',
    'Gurgaon',
    245,
    'veneers_citywise_rates_2025.xlsx'
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
    'Cherry Natural 0.6mm',
    'veneers',
    'Bangalore',
    257,
    'veneers_citywise_rates_2025.xlsx'
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
    'Cherry Natural 0.6mm',
    'veneers',
    'Pune',
    265,
    'veneers_citywise_rates_2025.xlsx'
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
    'Cherry Engineered 0.6mm',
    'veneers',
    NULL,
    NULL,
    'Mikasa Decowood',
    190,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'veneers_citywise_rates_2025.xlsx',
    'Veneers_CityWise_Rates',
    '{"Brand":"Mikasa Decowood","Product":"Cherry Engineered 0.6mm","Unit":"₹ per sq.ft","Mumbai_Rate":"210","Delhi_Rate":"190","Hyderabad_Rate":"182","Gurgaon_Rate":"190","Bangalore_Rate":"200","Pune_Rate":"205"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Cherry Engineered 0.6mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Cherry Engineered 0.6mm',
    'veneers',
    'Mumbai',
    210,
    'veneers_citywise_rates_2025.xlsx'
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
    'Cherry Engineered 0.6mm',
    'veneers',
    'Delhi',
    190,
    'veneers_citywise_rates_2025.xlsx'
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
    'Cherry Engineered 0.6mm',
    'veneers',
    'Hyderabad',
    182,
    'veneers_citywise_rates_2025.xlsx'
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
    'Cherry Engineered 0.6mm',
    'veneers',
    'Gurgaon',
    190,
    'veneers_citywise_rates_2025.xlsx'
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
    'Cherry Engineered 0.6mm',
    'veneers',
    'Bangalore',
    200,
    'veneers_citywise_rates_2025.xlsx'
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
    'Cherry Engineered 0.6mm',
    'veneers',
    'Pune',
    205,
    'veneers_citywise_rates_2025.xlsx'
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
    'Ash Natural 0.6mm',
    'veneers',
    NULL,
    NULL,
    'Mikasa Decowood',
    225,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'veneers_citywise_rates_2025.xlsx',
    'Veneers_CityWise_Rates',
    '{"Brand":"Mikasa Decowood","Product":"Ash Natural 0.6mm","Unit":"₹ per sq.ft","Mumbai_Rate":"250","Delhi_Rate":"225","Hyderabad_Rate":"216","Gurgaon_Rate":"225","Bangalore_Rate":"236","Pune_Rate":"243"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Ash Natural 0.6mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Ash Natural 0.6mm',
    'veneers',
    'Mumbai',
    250,
    'veneers_citywise_rates_2025.xlsx'
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
    'Ash Natural 0.6mm',
    'veneers',
    'Delhi',
    225,
    'veneers_citywise_rates_2025.xlsx'
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
    'Ash Natural 0.6mm',
    'veneers',
    'Hyderabad',
    216,
    'veneers_citywise_rates_2025.xlsx'
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
    'Ash Natural 0.6mm',
    'veneers',
    'Gurgaon',
    225,
    'veneers_citywise_rates_2025.xlsx'
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
    'Ash Natural 0.6mm',
    'veneers',
    'Bangalore',
    236,
    'veneers_citywise_rates_2025.xlsx'
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
    'Ash Natural 0.6mm',
    'veneers',
    'Pune',
    243,
    'veneers_citywise_rates_2025.xlsx'
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
    'Ash Engineered 0.6mm',
    'veneers',
    NULL,
    NULL,
    'Mikasa Decowood',
    175,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'veneers_citywise_rates_2025.xlsx',
    'Veneers_CityWise_Rates',
    '{"Brand":"Mikasa Decowood","Product":"Ash Engineered 0.6mm","Unit":"₹ per sq.ft","Mumbai_Rate":"195","Delhi_Rate":"175","Hyderabad_Rate":"168","Gurgaon_Rate":"175","Bangalore_Rate":"184","Pune_Rate":"189"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Ash Engineered 0.6mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Ash Engineered 0.6mm',
    'veneers',
    'Mumbai',
    195,
    'veneers_citywise_rates_2025.xlsx'
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
    'Ash Engineered 0.6mm',
    'veneers',
    'Delhi',
    175,
    'veneers_citywise_rates_2025.xlsx'
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
    'Ash Engineered 0.6mm',
    'veneers',
    'Hyderabad',
    168,
    'veneers_citywise_rates_2025.xlsx'
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
    'Ash Engineered 0.6mm',
    'veneers',
    'Gurgaon',
    175,
    'veneers_citywise_rates_2025.xlsx'
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
    'Ash Engineered 0.6mm',
    'veneers',
    'Bangalore',
    184,
    'veneers_citywise_rates_2025.xlsx'
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
    'Ash Engineered 0.6mm',
    'veneers',
    'Pune',
    189,
    'veneers_citywise_rates_2025.xlsx'
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
    'Rosewood Natural 0.6mm',
    'veneers',
    NULL,
    NULL,
    'Mikasa Decowood',
    280,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'veneers_citywise_rates_2025.xlsx',
    'Veneers_CityWise_Rates',
    '{"Brand":"Mikasa Decowood","Product":"Rosewood Natural 0.6mm","Unit":"₹ per sq.ft","Mumbai_Rate":"310","Delhi_Rate":"280","Hyderabad_Rate":"270","Gurgaon_Rate":"280","Bangalore_Rate":"294","Pune_Rate":"302"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Rosewood Natural 0.6mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Rosewood Natural 0.6mm',
    'veneers',
    'Mumbai',
    310,
    'veneers_citywise_rates_2025.xlsx'
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
    'Rosewood Natural 0.6mm',
    'veneers',
    'Delhi',
    280,
    'veneers_citywise_rates_2025.xlsx'
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
    'Rosewood Natural 0.6mm',
    'veneers',
    'Hyderabad',
    270,
    'veneers_citywise_rates_2025.xlsx'
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
    'Rosewood Natural 0.6mm',
    'veneers',
    'Gurgaon',
    280,
    'veneers_citywise_rates_2025.xlsx'
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
    'Rosewood Natural 0.6mm',
    'veneers',
    'Bangalore',
    294,
    'veneers_citywise_rates_2025.xlsx'
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
    'Rosewood Natural 0.6mm',
    'veneers',
    'Pune',
    302,
    'veneers_citywise_rates_2025.xlsx'
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
    'Rosewood Engineered 0.6mm',
    'veneers',
    NULL,
    NULL,
    'Mikasa Decowood',
    225,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'veneers_citywise_rates_2025.xlsx',
    'Veneers_CityWise_Rates',
    '{"Brand":"Mikasa Decowood","Product":"Rosewood Engineered 0.6mm","Unit":"₹ per sq.ft","Mumbai_Rate":"250","Delhi_Rate":"225","Hyderabad_Rate":"216","Gurgaon_Rate":"225","Bangalore_Rate":"236","Pune_Rate":"243"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Rosewood Engineered 0.6mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Rosewood Engineered 0.6mm',
    'veneers',
    'Mumbai',
    250,
    'veneers_citywise_rates_2025.xlsx'
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
    'Rosewood Engineered 0.6mm',
    'veneers',
    'Delhi',
    225,
    'veneers_citywise_rates_2025.xlsx'
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
    'Rosewood Engineered 0.6mm',
    'veneers',
    'Hyderabad',
    216,
    'veneers_citywise_rates_2025.xlsx'
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
    'Rosewood Engineered 0.6mm',
    'veneers',
    'Gurgaon',
    225,
    'veneers_citywise_rates_2025.xlsx'
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
    'Rosewood Engineered 0.6mm',
    'veneers',
    'Bangalore',
    236,
    'veneers_citywise_rates_2025.xlsx'
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
    'Rosewood Engineered 0.6mm',
    'veneers',
    'Pune',
    243,
    'veneers_citywise_rates_2025.xlsx'
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
    'Teak Natural 0.6mm',
    'veneers',
    NULL,
    NULL,
    'CenturyPly Veneers',
    215,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'veneers_citywise_rates_2025.xlsx',
    'Veneers_CityWise_Rates',
    '{"Brand":"CenturyPly Veneers","Product":"Teak Natural 0.6mm","Unit":"₹ per sq.ft","Mumbai_Rate":"240","Delhi_Rate":"215","Hyderabad_Rate":"206","Gurgaon_Rate":"215","Bangalore_Rate":"226","Pune_Rate":"232"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Teak Natural 0.6mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Teak Natural 0.6mm',
    'veneers',
    'Mumbai',
    240,
    'veneers_citywise_rates_2025.xlsx'
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
    'Teak Natural 0.6mm',
    'veneers',
    'Delhi',
    215,
    'veneers_citywise_rates_2025.xlsx'
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
    'Teak Natural 0.6mm',
    'veneers',
    'Hyderabad',
    206,
    'veneers_citywise_rates_2025.xlsx'
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
    'Teak Natural 0.6mm',
    'veneers',
    'Gurgaon',
    215,
    'veneers_citywise_rates_2025.xlsx'
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
    'Teak Natural 0.6mm',
    'veneers',
    'Bangalore',
    226,
    'veneers_citywise_rates_2025.xlsx'
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
    'Teak Natural 0.6mm',
    'veneers',
    'Pune',
    232,
    'veneers_citywise_rates_2025.xlsx'
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
    'Teak Engineered 0.6mm',
    'veneers',
    NULL,
    NULL,
    'CenturyPly Veneers',
    170,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'veneers_citywise_rates_2025.xlsx',
    'Veneers_CityWise_Rates',
    '{"Brand":"CenturyPly Veneers","Product":"Teak Engineered 0.6mm","Unit":"₹ per sq.ft","Mumbai_Rate":"190","Delhi_Rate":"170","Hyderabad_Rate":"163","Gurgaon_Rate":"170","Bangalore_Rate":"179","Pune_Rate":"184"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Teak Engineered 0.6mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Teak Engineered 0.6mm',
    'veneers',
    'Mumbai',
    190,
    'veneers_citywise_rates_2025.xlsx'
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
    'Teak Engineered 0.6mm',
    'veneers',
    'Delhi',
    170,
    'veneers_citywise_rates_2025.xlsx'
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
    'Teak Engineered 0.6mm',
    'veneers',
    'Hyderabad',
    163,
    'veneers_citywise_rates_2025.xlsx'
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
    'Teak Engineered 0.6mm',
    'veneers',
    'Gurgaon',
    170,
    'veneers_citywise_rates_2025.xlsx'
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
    'Teak Engineered 0.6mm',
    'veneers',
    'Bangalore',
    179,
    'veneers_citywise_rates_2025.xlsx'
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
    'Teak Engineered 0.6mm',
    'veneers',
    'Pune',
    184,
    'veneers_citywise_rates_2025.xlsx'
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
    'Oak Natural 0.6mm',
    'veneers',
    NULL,
    NULL,
    'CenturyPly Veneers',
    200,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'veneers_citywise_rates_2025.xlsx',
    'Veneers_CityWise_Rates',
    '{"Brand":"CenturyPly Veneers","Product":"Oak Natural 0.6mm","Unit":"₹ per sq.ft","Mumbai_Rate":"220","Delhi_Rate":"200","Hyderabad_Rate":"192","Gurgaon_Rate":"200","Bangalore_Rate":"210","Pune_Rate":"216"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Oak Natural 0.6mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Oak Natural 0.6mm',
    'veneers',
    'Mumbai',
    220,
    'veneers_citywise_rates_2025.xlsx'
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
    'Oak Natural 0.6mm',
    'veneers',
    'Delhi',
    200,
    'veneers_citywise_rates_2025.xlsx'
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
    'Oak Natural 0.6mm',
    'veneers',
    'Hyderabad',
    192,
    'veneers_citywise_rates_2025.xlsx'
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
    'Oak Natural 0.6mm',
    'veneers',
    'Gurgaon',
    200,
    'veneers_citywise_rates_2025.xlsx'
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
    'Oak Natural 0.6mm',
    'veneers',
    'Bangalore',
    210,
    'veneers_citywise_rates_2025.xlsx'
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
    'Oak Natural 0.6mm',
    'veneers',
    'Pune',
    216,
    'veneers_citywise_rates_2025.xlsx'
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
    'Oak Engineered 0.6mm',
    'veneers',
    NULL,
    NULL,
    'CenturyPly Veneers',
    155,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'veneers_citywise_rates_2025.xlsx',
    'Veneers_CityWise_Rates',
    '{"Brand":"CenturyPly Veneers","Product":"Oak Engineered 0.6mm","Unit":"₹ per sq.ft","Mumbai_Rate":"170","Delhi_Rate":"155","Hyderabad_Rate":"149","Gurgaon_Rate":"155","Bangalore_Rate":"163","Pune_Rate":"167"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Oak Engineered 0.6mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Oak Engineered 0.6mm',
    'veneers',
    'Mumbai',
    170,
    'veneers_citywise_rates_2025.xlsx'
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
    'Oak Engineered 0.6mm',
    'veneers',
    'Delhi',
    155,
    'veneers_citywise_rates_2025.xlsx'
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
    'Oak Engineered 0.6mm',
    'veneers',
    'Hyderabad',
    149,
    'veneers_citywise_rates_2025.xlsx'
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
    'Oak Engineered 0.6mm',
    'veneers',
    'Gurgaon',
    155,
    'veneers_citywise_rates_2025.xlsx'
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
    'Oak Engineered 0.6mm',
    'veneers',
    'Bangalore',
    163,
    'veneers_citywise_rates_2025.xlsx'
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
    'Oak Engineered 0.6mm',
    'veneers',
    'Pune',
    167,
    'veneers_citywise_rates_2025.xlsx'
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
    'Walnut Natural 0.6mm',
    'veneers',
    NULL,
    NULL,
    'CenturyPly Veneers',
    235,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'veneers_citywise_rates_2025.xlsx',
    'Veneers_CityWise_Rates',
    '{"Brand":"CenturyPly Veneers","Product":"Walnut Natural 0.6mm","Unit":"₹ per sq.ft","Mumbai_Rate":"260","Delhi_Rate":"235","Hyderabad_Rate":"225","Gurgaon_Rate":"235","Bangalore_Rate":"246","Pune_Rate":"254"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Walnut Natural 0.6mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Walnut Natural 0.6mm',
    'veneers',
    'Mumbai',
    260,
    'veneers_citywise_rates_2025.xlsx'
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
    'Walnut Natural 0.6mm',
    'veneers',
    'Delhi',
    235,
    'veneers_citywise_rates_2025.xlsx'
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
    'Walnut Natural 0.6mm',
    'veneers',
    'Hyderabad',
    225,
    'veneers_citywise_rates_2025.xlsx'
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
    'Walnut Natural 0.6mm',
    'veneers',
    'Gurgaon',
    235,
    'veneers_citywise_rates_2025.xlsx'
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
    'Walnut Natural 0.6mm',
    'veneers',
    'Bangalore',
    246,
    'veneers_citywise_rates_2025.xlsx'
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
    'Walnut Natural 0.6mm',
    'veneers',
    'Pune',
    254,
    'veneers_citywise_rates_2025.xlsx'
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
    'Walnut Engineered 0.6mm',
    'veneers',
    NULL,
    NULL,
    'CenturyPly Veneers',
    185,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'veneers_citywise_rates_2025.xlsx',
    'Veneers_CityWise_Rates',
    '{"Brand":"CenturyPly Veneers","Product":"Walnut Engineered 0.6mm","Unit":"₹ per sq.ft","Mumbai_Rate":"205","Delhi_Rate":"185","Hyderabad_Rate":"178","Gurgaon_Rate":"185","Bangalore_Rate":"194","Pune_Rate":"200"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Walnut Engineered 0.6mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Walnut Engineered 0.6mm',
    'veneers',
    'Mumbai',
    205,
    'veneers_citywise_rates_2025.xlsx'
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
    'Walnut Engineered 0.6mm',
    'veneers',
    'Delhi',
    185,
    'veneers_citywise_rates_2025.xlsx'
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
    'Walnut Engineered 0.6mm',
    'veneers',
    'Hyderabad',
    178,
    'veneers_citywise_rates_2025.xlsx'
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
    'Walnut Engineered 0.6mm',
    'veneers',
    'Gurgaon',
    185,
    'veneers_citywise_rates_2025.xlsx'
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
    'Walnut Engineered 0.6mm',
    'veneers',
    'Bangalore',
    194,
    'veneers_citywise_rates_2025.xlsx'
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
    'Walnut Engineered 0.6mm',
    'veneers',
    'Pune',
    200,
    'veneers_citywise_rates_2025.xlsx'
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
    'Wenge Natural 0.6mm',
    'veneers',
    NULL,
    NULL,
    'CenturyPly Veneers',
    255,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'veneers_citywise_rates_2025.xlsx',
    'Veneers_CityWise_Rates',
    '{"Brand":"CenturyPly Veneers","Product":"Wenge Natural 0.6mm","Unit":"₹ per sq.ft","Mumbai_Rate":"280","Delhi_Rate":"255","Hyderabad_Rate":"245","Gurgaon_Rate":"255","Bangalore_Rate":"268","Pune_Rate":"275"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Wenge Natural 0.6mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wenge Natural 0.6mm',
    'veneers',
    'Mumbai',
    280,
    'veneers_citywise_rates_2025.xlsx'
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
    'Wenge Natural 0.6mm',
    'veneers',
    'Delhi',
    255,
    'veneers_citywise_rates_2025.xlsx'
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
    'Wenge Natural 0.6mm',
    'veneers',
    'Hyderabad',
    245,
    'veneers_citywise_rates_2025.xlsx'
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
    'Wenge Natural 0.6mm',
    'veneers',
    'Gurgaon',
    255,
    'veneers_citywise_rates_2025.xlsx'
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
    'Wenge Natural 0.6mm',
    'veneers',
    'Bangalore',
    268,
    'veneers_citywise_rates_2025.xlsx'
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
    'Wenge Natural 0.6mm',
    'veneers',
    'Pune',
    275,
    'veneers_citywise_rates_2025.xlsx'
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
    'Wenge Engineered 0.6mm',
    'veneers',
    NULL,
    NULL,
    'CenturyPly Veneers',
    200,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'veneers_citywise_rates_2025.xlsx',
    'Veneers_CityWise_Rates',
    '{"Brand":"CenturyPly Veneers","Product":"Wenge Engineered 0.6mm","Unit":"₹ per sq.ft","Mumbai_Rate":"220","Delhi_Rate":"200","Hyderabad_Rate":"192","Gurgaon_Rate":"200","Bangalore_Rate":"210","Pune_Rate":"216"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Wenge Engineered 0.6mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wenge Engineered 0.6mm',
    'veneers',
    'Mumbai',
    220,
    'veneers_citywise_rates_2025.xlsx'
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
    'Wenge Engineered 0.6mm',
    'veneers',
    'Delhi',
    200,
    'veneers_citywise_rates_2025.xlsx'
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
    'Wenge Engineered 0.6mm',
    'veneers',
    'Hyderabad',
    192,
    'veneers_citywise_rates_2025.xlsx'
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
    'Wenge Engineered 0.6mm',
    'veneers',
    'Gurgaon',
    200,
    'veneers_citywise_rates_2025.xlsx'
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
    'Wenge Engineered 0.6mm',
    'veneers',
    'Bangalore',
    210,
    'veneers_citywise_rates_2025.xlsx'
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
    'Wenge Engineered 0.6mm',
    'veneers',
    'Pune',
    216,
    'veneers_citywise_rates_2025.xlsx'
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
    'Maple Natural 0.6mm',
    'veneers',
    NULL,
    NULL,
    'CenturyPly Veneers',
    180,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'veneers_citywise_rates_2025.xlsx',
    'Veneers_CityWise_Rates',
    '{"Brand":"CenturyPly Veneers","Product":"Maple Natural 0.6mm","Unit":"₹ per sq.ft","Mumbai_Rate":"200","Delhi_Rate":"180","Hyderabad_Rate":"173","Gurgaon_Rate":"180","Bangalore_Rate":"189","Pune_Rate":"194"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Maple Natural 0.6mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Maple Natural 0.6mm',
    'veneers',
    'Mumbai',
    200,
    'veneers_citywise_rates_2025.xlsx'
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
    'Maple Natural 0.6mm',
    'veneers',
    'Delhi',
    180,
    'veneers_citywise_rates_2025.xlsx'
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
    'Maple Natural 0.6mm',
    'veneers',
    'Hyderabad',
    173,
    'veneers_citywise_rates_2025.xlsx'
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
    'Maple Natural 0.6mm',
    'veneers',
    'Gurgaon',
    180,
    'veneers_citywise_rates_2025.xlsx'
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
    'Maple Natural 0.6mm',
    'veneers',
    'Bangalore',
    189,
    'veneers_citywise_rates_2025.xlsx'
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
    'Maple Natural 0.6mm',
    'veneers',
    'Pune',
    194,
    'veneers_citywise_rates_2025.xlsx'
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
    'Maple Engineered 0.6mm',
    'veneers',
    NULL,
    NULL,
    'CenturyPly Veneers',
    145,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'veneers_citywise_rates_2025.xlsx',
    'Veneers_CityWise_Rates',
    '{"Brand":"CenturyPly Veneers","Product":"Maple Engineered 0.6mm","Unit":"₹ per sq.ft","Mumbai_Rate":"160","Delhi_Rate":"145","Hyderabad_Rate":"139","Gurgaon_Rate":"145","Bangalore_Rate":"152","Pune_Rate":"157"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Maple Engineered 0.6mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Maple Engineered 0.6mm',
    'veneers',
    'Mumbai',
    160,
    'veneers_citywise_rates_2025.xlsx'
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
    'Maple Engineered 0.6mm',
    'veneers',
    'Delhi',
    145,
    'veneers_citywise_rates_2025.xlsx'
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
    'Maple Engineered 0.6mm',
    'veneers',
    'Hyderabad',
    139,
    'veneers_citywise_rates_2025.xlsx'
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
    'Maple Engineered 0.6mm',
    'veneers',
    'Gurgaon',
    145,
    'veneers_citywise_rates_2025.xlsx'
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
    'Maple Engineered 0.6mm',
    'veneers',
    'Bangalore',
    152,
    'veneers_citywise_rates_2025.xlsx'
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
    'Maple Engineered 0.6mm',
    'veneers',
    'Pune',
    157,
    'veneers_citywise_rates_2025.xlsx'
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
    'Cherry Natural 0.6mm',
    'veneers',
    NULL,
    NULL,
    'CenturyPly Veneers',
    210,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'veneers_citywise_rates_2025.xlsx',
    'Veneers_CityWise_Rates',
    '{"Brand":"CenturyPly Veneers","Product":"Cherry Natural 0.6mm","Unit":"₹ per sq.ft","Mumbai_Rate":"230","Delhi_Rate":"210","Hyderabad_Rate":"202","Gurgaon_Rate":"210","Bangalore_Rate":"220","Pune_Rate":"227"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Cherry Natural 0.6mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Cherry Natural 0.6mm',
    'veneers',
    'Mumbai',
    230,
    'veneers_citywise_rates_2025.xlsx'
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
    'Cherry Natural 0.6mm',
    'veneers',
    'Delhi',
    210,
    'veneers_citywise_rates_2025.xlsx'
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
    'Cherry Natural 0.6mm',
    'veneers',
    'Hyderabad',
    202,
    'veneers_citywise_rates_2025.xlsx'
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
    'Cherry Natural 0.6mm',
    'veneers',
    'Gurgaon',
    210,
    'veneers_citywise_rates_2025.xlsx'
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
    'Cherry Natural 0.6mm',
    'veneers',
    'Bangalore',
    220,
    'veneers_citywise_rates_2025.xlsx'
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
    'Cherry Natural 0.6mm',
    'veneers',
    'Pune',
    227,
    'veneers_citywise_rates_2025.xlsx'
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
    'Cherry Engineered 0.6mm',
    'veneers',
    NULL,
    NULL,
    'CenturyPly Veneers',
    165,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'veneers_citywise_rates_2025.xlsx',
    'Veneers_CityWise_Rates',
    '{"Brand":"CenturyPly Veneers","Product":"Cherry Engineered 0.6mm","Unit":"₹ per sq.ft","Mumbai_Rate":"180","Delhi_Rate":"165","Hyderabad_Rate":"158","Gurgaon_Rate":"165","Bangalore_Rate":"173","Pune_Rate":"178"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Cherry Engineered 0.6mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Cherry Engineered 0.6mm',
    'veneers',
    'Mumbai',
    180,
    'veneers_citywise_rates_2025.xlsx'
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
    'Cherry Engineered 0.6mm',
    'veneers',
    'Delhi',
    165,
    'veneers_citywise_rates_2025.xlsx'
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
    'Cherry Engineered 0.6mm',
    'veneers',
    'Hyderabad',
    158,
    'veneers_citywise_rates_2025.xlsx'
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
    'Cherry Engineered 0.6mm',
    'veneers',
    'Gurgaon',
    165,
    'veneers_citywise_rates_2025.xlsx'
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
    'Cherry Engineered 0.6mm',
    'veneers',
    'Bangalore',
    173,
    'veneers_citywise_rates_2025.xlsx'
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
    'Cherry Engineered 0.6mm',
    'veneers',
    'Pune',
    178,
    'veneers_citywise_rates_2025.xlsx'
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
    'Teak Natural 0.6mm',
    'veneers',
    NULL,
    NULL,
    'Greenply Veneers',
    205,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'veneers_citywise_rates_2025.xlsx',
    'Veneers_CityWise_Rates',
    '{"Brand":"Greenply Veneers","Product":"Teak Natural 0.6mm","Unit":"₹ per sq.ft","Mumbai_Rate":"230","Delhi_Rate":"205","Hyderabad_Rate":"197","Gurgaon_Rate":"205","Bangalore_Rate":"215","Pune_Rate":"222"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Teak Natural 0.6mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Teak Natural 0.6mm',
    'veneers',
    'Mumbai',
    230,
    'veneers_citywise_rates_2025.xlsx'
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
    'Teak Natural 0.6mm',
    'veneers',
    'Delhi',
    205,
    'veneers_citywise_rates_2025.xlsx'
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
    'Teak Natural 0.6mm',
    'veneers',
    'Hyderabad',
    197,
    'veneers_citywise_rates_2025.xlsx'
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
    'Teak Natural 0.6mm',
    'veneers',
    'Gurgaon',
    205,
    'veneers_citywise_rates_2025.xlsx'
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
    'Teak Natural 0.6mm',
    'veneers',
    'Bangalore',
    215,
    'veneers_citywise_rates_2025.xlsx'
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
    'Teak Natural 0.6mm',
    'veneers',
    'Pune',
    222,
    'veneers_citywise_rates_2025.xlsx'
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
    'Teak Engineered 0.6mm',
    'veneers',
    NULL,
    NULL,
    'Greenply Veneers',
    160,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'veneers_citywise_rates_2025.xlsx',
    'Veneers_CityWise_Rates',
    '{"Brand":"Greenply Veneers","Product":"Teak Engineered 0.6mm","Unit":"₹ per sq.ft","Mumbai_Rate":"180","Delhi_Rate":"160","Hyderabad_Rate":"154","Gurgaon_Rate":"160","Bangalore_Rate":"168","Pune_Rate":"173"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Teak Engineered 0.6mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Teak Engineered 0.6mm',
    'veneers',
    'Mumbai',
    180,
    'veneers_citywise_rates_2025.xlsx'
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
    'Teak Engineered 0.6mm',
    'veneers',
    'Delhi',
    160,
    'veneers_citywise_rates_2025.xlsx'
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
    'Teak Engineered 0.6mm',
    'veneers',
    'Hyderabad',
    154,
    'veneers_citywise_rates_2025.xlsx'
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
    'Teak Engineered 0.6mm',
    'veneers',
    'Gurgaon',
    160,
    'veneers_citywise_rates_2025.xlsx'
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
    'Teak Engineered 0.6mm',
    'veneers',
    'Bangalore',
    168,
    'veneers_citywise_rates_2025.xlsx'
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
    'Teak Engineered 0.6mm',
    'veneers',
    'Pune',
    173,
    'veneers_citywise_rates_2025.xlsx'
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
    'Oak Natural 0.6mm',
    'veneers',
    NULL,
    NULL,
    'Greenply Veneers',
    190,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'veneers_citywise_rates_2025.xlsx',
    'Veneers_CityWise_Rates',
    '{"Brand":"Greenply Veneers","Product":"Oak Natural 0.6mm","Unit":"₹ per sq.ft","Mumbai_Rate":"210","Delhi_Rate":"190","Hyderabad_Rate":"182","Gurgaon_Rate":"190","Bangalore_Rate":"200","Pune_Rate":"205"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Oak Natural 0.6mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Oak Natural 0.6mm',
    'veneers',
    'Mumbai',
    210,
    'veneers_citywise_rates_2025.xlsx'
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
    'Oak Natural 0.6mm',
    'veneers',
    'Delhi',
    190,
    'veneers_citywise_rates_2025.xlsx'
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
    'Oak Natural 0.6mm',
    'veneers',
    'Hyderabad',
    182,
    'veneers_citywise_rates_2025.xlsx'
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
    'Oak Natural 0.6mm',
    'veneers',
    'Gurgaon',
    190,
    'veneers_citywise_rates_2025.xlsx'
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
    'Oak Natural 0.6mm',
    'veneers',
    'Bangalore',
    200,
    'veneers_citywise_rates_2025.xlsx'
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
    'Oak Natural 0.6mm',
    'veneers',
    'Pune',
    205,
    'veneers_citywise_rates_2025.xlsx'
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
    'Oak Engineered 0.6mm',
    'veneers',
    NULL,
    NULL,
    'Greenply Veneers',
    145,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'veneers_citywise_rates_2025.xlsx',
    'Veneers_CityWise_Rates',
    '{"Brand":"Greenply Veneers","Product":"Oak Engineered 0.6mm","Unit":"₹ per sq.ft","Mumbai_Rate":"160","Delhi_Rate":"145","Hyderabad_Rate":"139","Gurgaon_Rate":"145","Bangalore_Rate":"152","Pune_Rate":"157"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Oak Engineered 0.6mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Oak Engineered 0.6mm',
    'veneers',
    'Mumbai',
    160,
    'veneers_citywise_rates_2025.xlsx'
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
    'Oak Engineered 0.6mm',
    'veneers',
    'Delhi',
    145,
    'veneers_citywise_rates_2025.xlsx'
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
    'Oak Engineered 0.6mm',
    'veneers',
    'Hyderabad',
    139,
    'veneers_citywise_rates_2025.xlsx'
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
    'Oak Engineered 0.6mm',
    'veneers',
    'Gurgaon',
    145,
    'veneers_citywise_rates_2025.xlsx'
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
    'Oak Engineered 0.6mm',
    'veneers',
    'Bangalore',
    152,
    'veneers_citywise_rates_2025.xlsx'
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
    'Oak Engineered 0.6mm',
    'veneers',
    'Pune',
    157,
    'veneers_citywise_rates_2025.xlsx'
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
    'Walnut Natural 0.6mm',
    'veneers',
    NULL,
    NULL,
    'Greenply Veneers',
    225,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'veneers_citywise_rates_2025.xlsx',
    'Veneers_CityWise_Rates',
    '{"Brand":"Greenply Veneers","Product":"Walnut Natural 0.6mm","Unit":"₹ per sq.ft","Mumbai_Rate":"250","Delhi_Rate":"225","Hyderabad_Rate":"216","Gurgaon_Rate":"225","Bangalore_Rate":"236","Pune_Rate":"243"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Walnut Natural 0.6mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Walnut Natural 0.6mm',
    'veneers',
    'Mumbai',
    250,
    'veneers_citywise_rates_2025.xlsx'
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
    'Walnut Natural 0.6mm',
    'veneers',
    'Delhi',
    225,
    'veneers_citywise_rates_2025.xlsx'
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
    'Walnut Natural 0.6mm',
    'veneers',
    'Hyderabad',
    216,
    'veneers_citywise_rates_2025.xlsx'
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
    'Walnut Natural 0.6mm',
    'veneers',
    'Gurgaon',
    225,
    'veneers_citywise_rates_2025.xlsx'
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
    'Walnut Natural 0.6mm',
    'veneers',
    'Bangalore',
    236,
    'veneers_citywise_rates_2025.xlsx'
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
    'Walnut Natural 0.6mm',
    'veneers',
    'Pune',
    243,
    'veneers_citywise_rates_2025.xlsx'
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
    'Walnut Engineered 0.6mm',
    'veneers',
    NULL,
    NULL,
    'Greenply Veneers',
    175,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'veneers_citywise_rates_2025.xlsx',
    'Veneers_CityWise_Rates',
    '{"Brand":"Greenply Veneers","Product":"Walnut Engineered 0.6mm","Unit":"₹ per sq.ft","Mumbai_Rate":"195","Delhi_Rate":"175","Hyderabad_Rate":"168","Gurgaon_Rate":"175","Bangalore_Rate":"184","Pune_Rate":"189"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Walnut Engineered 0.6mm
INSERT INTO city_pricing (
    item_name,
    item_category,
