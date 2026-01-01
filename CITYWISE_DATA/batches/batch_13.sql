-- COMPREHENSIVE CITYWISE PRICING DATA IMPORT
-- Generated: 2026-01-01T12:27:08.554Z
-- Source: 27 Excel files with city-wise rates
-- Total Rows: 3710
-- Total Sheets: 110

-- ========================================
-- PART 1: PRICING ITEMS
-- ========================================


-- ========================================
-- BATCH 13 of 14
-- Lines: 60011 to 65010
-- ========================================

    city,
    city_rate,
    source_file
) VALUES (
    'Walnut Engineered 0.6mm',
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
    'Walnut Engineered 0.6mm',
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
    'Walnut Engineered 0.6mm',
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
    'Walnut Engineered 0.6mm',
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
    'Walnut Engineered 0.6mm',
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
    'Walnut Engineered 0.6mm',
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
    'Wenge Natural 0.6mm',
    'veneers',
    NULL,
    NULL,
    'Greenply Veneers',
    245,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'veneers_citywise_rates_2025.xlsx',
    'Veneers_CityWise_Rates',
    '{"Brand":"Greenply Veneers","Product":"Wenge Natural 0.6mm","Unit":"₹ per sq.ft","Mumbai_Rate":"270","Delhi_Rate":"245","Hyderabad_Rate":"235","Gurgaon_Rate":"245","Bangalore_Rate":"257","Pune_Rate":"265"}'::jsonb
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
    'Wenge Natural 0.6mm',
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
    'Wenge Natural 0.6mm',
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
    'Wenge Natural 0.6mm',
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
    'Wenge Natural 0.6mm',
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
    'Wenge Natural 0.6mm',
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
    'Wenge Engineered 0.6mm',
    'veneers',
    NULL,
    NULL,
    'Greenply Veneers',
    190,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'veneers_citywise_rates_2025.xlsx',
    'Veneers_CityWise_Rates',
    '{"Brand":"Greenply Veneers","Product":"Wenge Engineered 0.6mm","Unit":"₹ per sq.ft","Mumbai_Rate":"210","Delhi_Rate":"190","Hyderabad_Rate":"182","Gurgaon_Rate":"190","Bangalore_Rate":"200","Pune_Rate":"205"}'::jsonb
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
    'Wenge Engineered 0.6mm',
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
    'Wenge Engineered 0.6mm',
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
    'Wenge Engineered 0.6mm',
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
    'Wenge Engineered 0.6mm',
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
    'Maple Natural 0.6mm',
    'veneers',
    NULL,
    NULL,
    'Greenply Veneers',
    170,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'veneers_citywise_rates_2025.xlsx',
    'Veneers_CityWise_Rates',
    '{"Brand":"Greenply Veneers","Product":"Maple Natural 0.6mm","Unit":"₹ per sq.ft","Mumbai_Rate":"190","Delhi_Rate":"170","Hyderabad_Rate":"163","Gurgaon_Rate":"170","Bangalore_Rate":"179","Pune_Rate":"184"}'::jsonb
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
    'Maple Natural 0.6mm',
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
    'Maple Natural 0.6mm',
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
    'Maple Natural 0.6mm',
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
    'Maple Natural 0.6mm',
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
    'Maple Natural 0.6mm',
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
    'Maple Engineered 0.6mm',
    'veneers',
    NULL,
    NULL,
    'Greenply Veneers',
    135,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'veneers_citywise_rates_2025.xlsx',
    'Veneers_CityWise_Rates',
    '{"Brand":"Greenply Veneers","Product":"Maple Engineered 0.6mm","Unit":"₹ per sq.ft","Mumbai_Rate":"150","Delhi_Rate":"135","Hyderabad_Rate":"130","Gurgaon_Rate":"135","Bangalore_Rate":"142","Pune_Rate":"146"}'::jsonb
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
    150,
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
    135,
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
    130,
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
    135,
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
    142,
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
    146,
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
    'Greenply Veneers',
    200,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'veneers_citywise_rates_2025.xlsx',
    'Veneers_CityWise_Rates',
    '{"Brand":"Greenply Veneers","Product":"Cherry Natural 0.6mm","Unit":"₹ per sq.ft","Mumbai_Rate":"220","Delhi_Rate":"200","Hyderabad_Rate":"192","Gurgaon_Rate":"200","Bangalore_Rate":"210","Pune_Rate":"216"}'::jsonb
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
    'Cherry Natural 0.6mm',
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
    'Cherry Natural 0.6mm',
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
    'Cherry Natural 0.6mm',
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
    'Cherry Natural 0.6mm',
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
    'Cherry Engineered 0.6mm',
    'veneers',
    NULL,
    NULL,
    'Greenply Veneers',
    155,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'veneers_citywise_rates_2025.xlsx',
    'Veneers_CityWise_Rates',
    '{"Brand":"Greenply Veneers","Product":"Cherry Engineered 0.6mm","Unit":"₹ per sq.ft","Mumbai_Rate":"170","Delhi_Rate":"155","Hyderabad_Rate":"149","Gurgaon_Rate":"155","Bangalore_Rate":"163","Pune_Rate":"167"}'::jsonb
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
    'Cherry Engineered 0.6mm',
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
    'Cherry Engineered 0.6mm',
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
    'Cherry Engineered 0.6mm',
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
    'Cherry Engineered 0.6mm',
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
    'Cherry Engineered 0.6mm',
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
    'Teak Natural 0.6mm',
    'veneers',
    NULL,
    NULL,
    'Airolam',
    190,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'veneers_citywise_rates_2025.xlsx',
    'Veneers_CityWise_Rates',
    '{"Brand":"Airolam","Product":"Teak Natural 0.6mm","Unit":"₹ per sq.ft","Mumbai_Rate":"210","Delhi_Rate":"190","Hyderabad_Rate":"182","Gurgaon_Rate":"190","Bangalore_Rate":"200","Pune_Rate":"205"}'::jsonb
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
    'Teak Natural 0.6mm',
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
    'Teak Natural 0.6mm',
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
    'Teak Natural 0.6mm',
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
    'Teak Natural 0.6mm',
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
    'Teak Natural 0.6mm',
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
    'Teak Engineered 0.6mm',
    'veneers',
    NULL,
    NULL,
    'Airolam',
    150,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'veneers_citywise_rates_2025.xlsx',
    'Veneers_CityWise_Rates',
    '{"Brand":"Airolam","Product":"Teak Engineered 0.6mm","Unit":"₹ per sq.ft","Mumbai_Rate":"165","Delhi_Rate":"150","Hyderabad_Rate":"144","Gurgaon_Rate":"150","Bangalore_Rate":"157","Pune_Rate":"162"}'::jsonb
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
    'Teak Engineered 0.6mm',
    'veneers',
    'Delhi',
    150,
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
    144,
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
    150,
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
    157,
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
    162,
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
    'Airolam',
    170,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'veneers_citywise_rates_2025.xlsx',
    'Veneers_CityWise_Rates',
    '{"Brand":"Airolam","Product":"Oak Natural 0.6mm","Unit":"₹ per sq.ft","Mumbai_Rate":"190","Delhi_Rate":"170","Hyderabad_Rate":"163","Gurgaon_Rate":"170","Bangalore_Rate":"179","Pune_Rate":"184"}'::jsonb
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
    'Oak Natural 0.6mm',
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
    'Oak Natural 0.6mm',
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
    'Oak Natural 0.6mm',
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
    'Oak Natural 0.6mm',
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
    'Oak Engineered 0.6mm',
    'veneers',
    NULL,
    NULL,
    'Airolam',
    130,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'veneers_citywise_rates_2025.xlsx',
    'Veneers_CityWise_Rates',
    '{"Brand":"Airolam","Product":"Oak Engineered 0.6mm","Unit":"₹ per sq.ft","Mumbai_Rate":"145","Delhi_Rate":"130","Hyderabad_Rate":"125","Gurgaon_Rate":"130","Bangalore_Rate":"137","Pune_Rate":"140"}'::jsonb
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
    'Delhi',
    130,
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
    125,
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
    130,
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
    137,
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
    140,
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
    'Airolam',
    210,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'veneers_citywise_rates_2025.xlsx',
    'Veneers_CityWise_Rates',
    '{"Brand":"Airolam","Product":"Walnut Natural 0.6mm","Unit":"₹ per sq.ft","Mumbai_Rate":"230","Delhi_Rate":"210","Hyderabad_Rate":"202","Gurgaon_Rate":"210","Bangalore_Rate":"220","Pune_Rate":"227"}'::jsonb
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
    'Walnut Natural 0.6mm',
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
    'Walnut Natural 0.6mm',
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
    'Walnut Natural 0.6mm',
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
    'Walnut Natural 0.6mm',
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
    'Walnut Natural 0.6mm',
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
    'Walnut Engineered 0.6mm',
    'veneers',
    NULL,
    NULL,
    'Airolam',
    165,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'veneers_citywise_rates_2025.xlsx',
    'Veneers_CityWise_Rates',
    '{"Brand":"Airolam","Product":"Walnut Engineered 0.6mm","Unit":"₹ per sq.ft","Mumbai_Rate":"180","Delhi_Rate":"165","Hyderabad_Rate":"158","Gurgaon_Rate":"165","Bangalore_Rate":"173","Pune_Rate":"178"}'::jsonb
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
    'Walnut Engineered 0.6mm',
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
    'Walnut Engineered 0.6mm',
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
    'Walnut Engineered 0.6mm',
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
    'Walnut Engineered 0.6mm',
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
    'Walnut Engineered 0.6mm',
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
    'Maple Natural 0.6mm',
    'veneers',
    NULL,
    NULL,
    'Airolam',
    155,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'veneers_citywise_rates_2025.xlsx',
    'Veneers_CityWise_Rates',
    '{"Brand":"Airolam","Product":"Maple Natural 0.6mm","Unit":"₹ per sq.ft","Mumbai_Rate":"170","Delhi_Rate":"155","Hyderabad_Rate":"149","Gurgaon_Rate":"155","Bangalore_Rate":"163","Pune_Rate":"167"}'::jsonb
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
    'Maple Natural 0.6mm',
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
    'Maple Natural 0.6mm',
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
    'Maple Natural 0.6mm',
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
    'Maple Natural 0.6mm',
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
    'Maple Natural 0.6mm',
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
    'Maple Engineered 0.6mm',
    'veneers',
    NULL,
    NULL,
    'Airolam',
    120,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'veneers_citywise_rates_2025.xlsx',
    'Veneers_CityWise_Rates',
    '{"Brand":"Airolam","Product":"Maple Engineered 0.6mm","Unit":"₹ per sq.ft","Mumbai_Rate":"135","Delhi_Rate":"120","Hyderabad_Rate":"115","Gurgaon_Rate":"120","Bangalore_Rate":"126","Pune_Rate":"130"}'::jsonb
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
    135,
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
    120,
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
    115,
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
    120,
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
    126,
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
    130,
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
    'Local',
    150,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'veneers_citywise_rates_2025.xlsx',
    'Veneers_CityWise_Rates',
    '{"Brand":"Local","Product":"Teak Natural 0.6mm","Unit":"₹ per sq.ft","Mumbai_Rate":"165","Delhi_Rate":"150","Hyderabad_Rate":"144","Gurgaon_Rate":"150","Bangalore_Rate":"157","Pune_Rate":"162"}'::jsonb
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
    'Teak Natural 0.6mm',
    'veneers',
    'Delhi',
    150,
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
    144,
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
    150,
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
    157,
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
    162,
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
    'Local',
    120,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'veneers_citywise_rates_2025.xlsx',
    'Veneers_CityWise_Rates',
    '{"Brand":"Local","Product":"Teak Engineered 0.6mm","Unit":"₹ per sq.ft","Mumbai_Rate":"130","Delhi_Rate":"120","Hyderabad_Rate":"115","Gurgaon_Rate":"120","Bangalore_Rate":"126","Pune_Rate":"130"}'::jsonb
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
    130,
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
    120,
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
    115,
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
    120,
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
    126,
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
    130,
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
    'Local',
    130,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'veneers_citywise_rates_2025.xlsx',
    'Veneers_CityWise_Rates',
    '{"Brand":"Local","Product":"Oak Natural 0.6mm","Unit":"₹ per sq.ft","Mumbai_Rate":"145","Delhi_Rate":"130","Hyderabad_Rate":"125","Gurgaon_Rate":"130","Bangalore_Rate":"137","Pune_Rate":"140"}'::jsonb
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
    'Oak Natural 0.6mm',
    'veneers',
    'Delhi',
    130,
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
    125,
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
    130,
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
    137,
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
    140,
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
    'Local',
    100,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'veneers_citywise_rates_2025.xlsx',
    'Veneers_CityWise_Rates',
    '{"Brand":"Local","Product":"Oak Engineered 0.6mm","Unit":"₹ per sq.ft","Mumbai_Rate":"110","Delhi_Rate":"100","Hyderabad_Rate":"96","Gurgaon_Rate":"100","Bangalore_Rate":"105","Pune_Rate":"108"}'::jsonb
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
    110,
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
    100,
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
    96,
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
    100,
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
    105,
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
    108,
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
    'Local',
    170,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'veneers_citywise_rates_2025.xlsx',
    'Veneers_CityWise_Rates',
    '{"Brand":"Local","Product":"Walnut Natural 0.6mm","Unit":"₹ per sq.ft","Mumbai_Rate":"185","Delhi_Rate":"170","Hyderabad_Rate":"163","Gurgaon_Rate":"170","Bangalore_Rate":"179","Pune_Rate":"184"}'::jsonb
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
    'Walnut Natural 0.6mm',
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
    'Walnut Natural 0.6mm',
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
    'Walnut Natural 0.6mm',
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
    'Walnut Natural 0.6mm',
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
    'Walnut Natural 0.6mm',
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
    'Walnut Engineered 0.6mm',
    'veneers',
    NULL,
    NULL,
    'Local',
    130,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'veneers_citywise_rates_2025.xlsx',
    'Veneers_CityWise_Rates',
    '{"Brand":"Local","Product":"Walnut Engineered 0.6mm","Unit":"₹ per sq.ft","Mumbai_Rate":"145","Delhi_Rate":"130","Hyderabad_Rate":"125","Gurgaon_Rate":"130","Bangalore_Rate":"137","Pune_Rate":"140"}'::jsonb
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
    'Walnut Engineered 0.6mm',
    'veneers',
    'Delhi',
    130,
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
    125,
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
    130,
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
    137,
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
    140,
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
    'Local',
    120,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'veneers_citywise_rates_2025.xlsx',
    'Veneers_CityWise_Rates',
    '{"Brand":"Local","Product":"Maple Natural 0.6mm","Unit":"₹ per sq.ft","Mumbai_Rate":"130","Delhi_Rate":"120","Hyderabad_Rate":"115","Gurgaon_Rate":"120","Bangalore_Rate":"126","Pune_Rate":"130"}'::jsonb
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
    130,
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
    120,
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
    115,
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
    120,
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
    126,
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
    130,
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
    'Local',
    90,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'veneers_citywise_rates_2025.xlsx',
    'Veneers_CityWise_Rates',
    '{"Brand":"Local","Product":"Maple Engineered 0.6mm","Unit":"₹ per sq.ft","Mumbai_Rate":"100","Delhi_Rate":"90","Hyderabad_Rate":"86","Gurgaon_Rate":"90","Bangalore_Rate":"95","Pune_Rate":"97"}'::jsonb
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
    100,
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
    90,
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
    86,
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
    90,
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
    95,
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
    97,
    'veneers_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

-- ========================================
-- Category: wallpaper
-- Sheet: Wallpaper Rates
-- Rows: 164
-- ========================================

-- ========================================
-- Category: window_furnishings
-- Sheet: Window Furnishings
-- Rows: 87
-- ========================================

-- ========================================
-- Category: wardrobe_organisers
-- Sheet: Organizer_Types
-- Rows: 8
-- ========================================

-- ========================================
-- Category: wooden_panels
-- Sheet: Wooden Panels Rates
-- Rows: 216
-- ========================================

-- ========================================
-- Category: wood_polish
-- Sheet: Wood Polish City Rates
-- Rows: 21
-- ========================================

-- ========================================
-- Category: stone_cladding
-- Sheet: Stone Cladding Rates
-- Rows: 154
-- ========================================

-- ========================================
-- Category: mdf
-- Sheet: MDF_CityWise_Rates
-- Rows: 42
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
    'Standard MDF 6mm',
    'mdf',
    NULL,
    NULL,
    'Century Ply',
    28,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'mdf_citywise_rates_2025.xlsx',
    'MDF_CityWise_Rates',
    '{"Brand":"Century Ply","Product":"Standard MDF 6mm","Unit":"₹ per sq.ft","Mumbai_Rate":"32","Delhi_Rate":"28","Hyderabad_Rate":"27","Gurgaon_Rate":"28","Bangalore_Rate":"30","Pune_Rate":"31"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Standard MDF 6mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Standard MDF 6mm',
    'mdf',
    'Mumbai',
    32,
    'mdf_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Standard MDF 6mm',
    'mdf',
    'Delhi',
    28,
    'mdf_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Standard MDF 6mm',
    'mdf',
    'Hyderabad',
    27,
    'mdf_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Standard MDF 6mm',
    'mdf',
    'Gurgaon',
    28,
    'mdf_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Standard MDF 6mm',
    'mdf',
    'Bangalore',
    30,
    'mdf_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Standard MDF 6mm',
    'mdf',
    'Pune',
    31,
    'mdf_citywise_rates_2025.xlsx'
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
    'Standard MDF 12mm',
    'mdf',
    NULL,
    NULL,
    'Century Ply',
    36,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'mdf_citywise_rates_2025.xlsx',
    'MDF_CityWise_Rates',
    '{"Brand":"Century Ply","Product":"Standard MDF 12mm","Unit":"₹ per sq.ft","Mumbai_Rate":"40","Delhi_Rate":"36","Hyderabad_Rate":"34","Gurgaon_Rate":"36","Bangalore_Rate":"38","Pune_Rate":"39"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Standard MDF 12mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Standard MDF 12mm',
    'mdf',
    'Mumbai',
    40,
    'mdf_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Standard MDF 12mm',
    'mdf',
    'Delhi',
    36,
    'mdf_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Standard MDF 12mm',
    'mdf',
    'Hyderabad',
    34,
    'mdf_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Standard MDF 12mm',
    'mdf',
    'Gurgaon',
    36,
    'mdf_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Standard MDF 12mm',
    'mdf',
    'Bangalore',
    38,
    'mdf_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Standard MDF 12mm',
    'mdf',
    'Pune',
    39,
    'mdf_citywise_rates_2025.xlsx'
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
    'Standard MDF 18mm',
    'mdf',
    NULL,
    NULL,
    'Century Ply',
    45,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'mdf_citywise_rates_2025.xlsx',
    'MDF_CityWise_Rates',
    '{"Brand":"Century Ply","Product":"Standard MDF 18mm","Unit":"₹ per sq.ft","Mumbai_Rate":"50","Delhi_Rate":"45","Hyderabad_Rate":"43","Gurgaon_Rate":"45","Bangalore_Rate":"48","Pune_Rate":"49"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Standard MDF 18mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Standard MDF 18mm',
    'mdf',
    'Mumbai',
    50,
    'mdf_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Standard MDF 18mm',
    'mdf',
    'Delhi',
    45,
    'mdf_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Standard MDF 18mm',
    'mdf',
    'Hyderabad',
    43,
    'mdf_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Standard MDF 18mm',
    'mdf',
    'Gurgaon',
    45,
    'mdf_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Standard MDF 18mm',
    'mdf',
    'Bangalore',
    48,
    'mdf_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Standard MDF 18mm',
    'mdf',
    'Pune',
    49,
    'mdf_citywise_rates_2025.xlsx'
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
    'Standard MDF 25mm',
    'mdf',
    NULL,
    NULL,
    'Century Ply',
    68,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'mdf_citywise_rates_2025.xlsx',
    'MDF_CityWise_Rates',
    '{"Brand":"Century Ply","Product":"Standard MDF 25mm","Unit":"₹ per sq.ft","Mumbai_Rate":"75","Delhi_Rate":"68","Hyderabad_Rate":"65","Gurgaon_Rate":"68","Bangalore_Rate":"72","Pune_Rate":"74"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Standard MDF 25mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Standard MDF 25mm',
    'mdf',
    'Mumbai',
    75,
    'mdf_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Standard MDF 25mm',
    'mdf',
    'Delhi',
    68,
    'mdf_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Standard MDF 25mm',
    'mdf',
    'Hyderabad',
    65,
    'mdf_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Standard MDF 25mm',
    'mdf',
    'Gurgaon',
    68,
    'mdf_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Standard MDF 25mm',
    'mdf',
    'Bangalore',
    72,
    'mdf_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Standard MDF 25mm',
    'mdf',
    'Pune',
    74,
    'mdf_citywise_rates_2025.xlsx'
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
    'Premium Plus MDF 12mm',
    'mdf',
    NULL,
    NULL,
    'Century Ply',
    43,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'mdf_citywise_rates_2025.xlsx',
    'MDF_CityWise_Rates',
    '{"Brand":"Century Ply","Product":"Premium Plus MDF 12mm","Unit":"₹ per sq.ft","Mumbai_Rate":"48","Delhi_Rate":"43","Hyderabad_Rate":"41","Gurgaon_Rate":"43","Bangalore_Rate":"46","Pune_Rate":"47"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Premium Plus MDF 12mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Premium Plus MDF 12mm',
    'mdf',
    'Mumbai',
    48,
    'mdf_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Premium Plus MDF 12mm',
    'mdf',
    'Delhi',
    43,
    'mdf_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Premium Plus MDF 12mm',
    'mdf',
    'Hyderabad',
    41,
    'mdf_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Premium Plus MDF 12mm',
    'mdf',
    'Gurgaon',
    43,
    'mdf_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Premium Plus MDF 12mm',
    'mdf',
    'Bangalore',
    46,
    'mdf_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Premium Plus MDF 12mm',
    'mdf',
    'Pune',
    47,
    'mdf_citywise_rates_2025.xlsx'
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
    'Premium Plus MDF 18mm',
    'mdf',
    NULL,
    NULL,
    'Century Ply',
    52,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'mdf_citywise_rates_2025.xlsx',
    'MDF_CityWise_Rates',
    '{"Brand":"Century Ply","Product":"Premium Plus MDF 18mm","Unit":"₹ per sq.ft","Mumbai_Rate":"58","Delhi_Rate":"52","Hyderabad_Rate":"50","Gurgaon_Rate":"52","Bangalore_Rate":"55","Pune_Rate":"57"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Premium Plus MDF 18mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Premium Plus MDF 18mm',
    'mdf',
    'Mumbai',
    58,
    'mdf_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Premium Plus MDF 18mm',
    'mdf',
    'Delhi',
    52,
    'mdf_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Premium Plus MDF 18mm',
    'mdf',
    'Hyderabad',
    50,
    'mdf_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Premium Plus MDF 18mm',
    'mdf',
    'Gurgaon',
    52,
    'mdf_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Premium Plus MDF 18mm',
    'mdf',
    'Bangalore',
    55,
    'mdf_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Premium Plus MDF 18mm',
    'mdf',
    'Pune',
    57,
    'mdf_citywise_rates_2025.xlsx'
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
    'Premium Plus MDF 25mm',
    'mdf',
    NULL,
    NULL,
    'Century Ply',
    80,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'mdf_citywise_rates_2025.xlsx',
    'MDF_CityWise_Rates',
    '{"Brand":"Century Ply","Product":"Premium Plus MDF 25mm","Unit":"₹ per sq.ft","Mumbai_Rate":"88","Delhi_Rate":"80","Hyderabad_Rate":"76","Gurgaon_Rate":"80","Bangalore_Rate":"85","Pune_Rate":"87"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Premium Plus MDF 25mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Premium Plus MDF 25mm',
    'mdf',
    'Mumbai',
    88,
    'mdf_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Premium Plus MDF 25mm',
    'mdf',
    'Delhi',
    80,
    'mdf_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Premium Plus MDF 25mm',
    'mdf',
    'Hyderabad',
    76,
    'mdf_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Premium Plus MDF 25mm',
    'mdf',
    'Gurgaon',
    80,
    'mdf_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Premium Plus MDF 25mm',
    'mdf',
    'Bangalore',
    85,
    'mdf_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Premium Plus MDF 25mm',
    'mdf',
    'Pune',
    87,
    'mdf_citywise_rates_2025.xlsx'
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
    'Pre-Laminated MDF 18mm',
    'mdf',
    NULL,
    NULL,
    'Century Ply',
    63,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'mdf_citywise_rates_2025.xlsx',
    'MDF_CityWise_Rates',
    '{"Brand":"Century Ply","Product":"Pre-Laminated MDF 18mm","Unit":"₹ per sq.ft","Mumbai_Rate":"70","Delhi_Rate":"63","Hyderabad_Rate":"60","Gurgaon_Rate":"63","Bangalore_Rate":"67","Pune_Rate":"68"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Pre-Laminated MDF 18mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Pre-Laminated MDF 18mm',
    'mdf',
    'Mumbai',
    70,
    'mdf_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Pre-Laminated MDF 18mm',
    'mdf',
    'Delhi',
    63,
    'mdf_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Pre-Laminated MDF 18mm',
    'mdf',
    'Hyderabad',
    60,
    'mdf_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Pre-Laminated MDF 18mm',
    'mdf',
    'Gurgaon',
    63,
    'mdf_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Pre-Laminated MDF 18mm',
    'mdf',
    'Bangalore',
    67,
    'mdf_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Pre-Laminated MDF 18mm',
    'mdf',
    'Pune',
    68,
    'mdf_citywise_rates_2025.xlsx'
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
    'MDF 710 Standard 6mm',
    'mdf',
    NULL,
    NULL,
    'Greenply',
    27,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'mdf_citywise_rates_2025.xlsx',
    'MDF_CityWise_Rates',
    '{"Brand":"Greenply","Product":"MDF 710 Standard 6mm","Unit":"₹ per sq.ft","Mumbai_Rate":"30","Delhi_Rate":"27","Hyderabad_Rate":"26","Gurgaon_Rate":"27","Bangalore_Rate":"29","Pune_Rate":"29"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: MDF 710 Standard 6mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'MDF 710 Standard 6mm',
    'mdf',
    'Mumbai',
    30,
    'mdf_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'MDF 710 Standard 6mm',
    'mdf',
    'Delhi',
    27,
    'mdf_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'MDF 710 Standard 6mm',
    'mdf',
    'Hyderabad',
    26,
    'mdf_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'MDF 710 Standard 6mm',
    'mdf',
    'Gurgaon',
    27,
    'mdf_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'MDF 710 Standard 6mm',
    'mdf',
    'Bangalore',
    29,
    'mdf_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'MDF 710 Standard 6mm',
    'mdf',
    'Pune',
    29,
    'mdf_citywise_rates_2025.xlsx'
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
    'MDF 710 Standard 12mm',
    'mdf',
    NULL,
    NULL,
    'Greenply',
    34,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'mdf_citywise_rates_2025.xlsx',
    'MDF_CityWise_Rates',
    '{"Brand":"Greenply","Product":"MDF 710 Standard 12mm","Unit":"₹ per sq.ft","Mumbai_Rate":"38","Delhi_Rate":"34","Hyderabad_Rate":"33","Gurgaon_Rate":"34","Bangalore_Rate":"36","Pune_Rate":"37"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: MDF 710 Standard 12mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'MDF 710 Standard 12mm',
    'mdf',
    'Mumbai',
    38,
    'mdf_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'MDF 710 Standard 12mm',
    'mdf',
    'Delhi',
    34,
    'mdf_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'MDF 710 Standard 12mm',
    'mdf',
    'Hyderabad',
    33,
    'mdf_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'MDF 710 Standard 12mm',
    'mdf',
    'Gurgaon',
    34,
    'mdf_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'MDF 710 Standard 12mm',
    'mdf',
    'Bangalore',
    36,
    'mdf_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'MDF 710 Standard 12mm',
    'mdf',
    'Pune',
    37,
    'mdf_citywise_rates_2025.xlsx'
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
    'MDF 710 Standard 18mm',
    'mdf',
    NULL,
    NULL,
    'Greenply',
    43,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'mdf_citywise_rates_2025.xlsx',
    'MDF_CityWise_Rates',
    '{"Brand":"Greenply","Product":"MDF 710 Standard 18mm","Unit":"₹ per sq.ft","Mumbai_Rate":"48","Delhi_Rate":"43","Hyderabad_Rate":"41","Gurgaon_Rate":"43","Bangalore_Rate":"46","Pune_Rate":"47"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: MDF 710 Standard 18mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'MDF 710 Standard 18mm',
    'mdf',
    'Mumbai',
    48,
    'mdf_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'MDF 710 Standard 18mm',
    'mdf',
    'Delhi',
    43,
    'mdf_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'MDF 710 Standard 18mm',
    'mdf',
    'Hyderabad',
    41,
    'mdf_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'MDF 710 Standard 18mm',
    'mdf',
    'Gurgaon',
    43,
    'mdf_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'MDF 710 Standard 18mm',
    'mdf',
    'Bangalore',
    46,
    'mdf_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'MDF 710 Standard 18mm',
    'mdf',
    'Pune',
    47,
    'mdf_citywise_rates_2025.xlsx'
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
    'MDF 710 Standard 25mm',
    'mdf',
    NULL,
    NULL,
    'Greenply',
    65,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'mdf_citywise_rates_2025.xlsx',
    'MDF_CityWise_Rates',
    '{"Brand":"Greenply","Product":"MDF 710 Standard 25mm","Unit":"₹ per sq.ft","Mumbai_Rate":"72","Delhi_Rate":"65","Hyderabad_Rate":"62","Gurgaon_Rate":"65","Bangalore_Rate":"69","Pune_Rate":"70"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: MDF 710 Standard 25mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'MDF 710 Standard 25mm',
    'mdf',
    'Mumbai',
    72,
    'mdf_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'MDF 710 Standard 25mm',
    'mdf',
    'Delhi',
    65,
    'mdf_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'MDF 710 Standard 25mm',
    'mdf',
    'Hyderabad',
    62,
    'mdf_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'MDF 710 Standard 25mm',
    'mdf',
    'Gurgaon',
    65,
    'mdf_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'MDF 710 Standard 25mm',
    'mdf',
    'Bangalore',
    69,
    'mdf_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'MDF 710 Standard 25mm',
    'mdf',
    'Pune',
    70,
    'mdf_citywise_rates_2025.xlsx'
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
    'Green MDF Exterior 12mm',
    'mdf',
    NULL,
    NULL,
    'Greenply',
    41,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'mdf_citywise_rates_2025.xlsx',
    'MDF_CityWise_Rates',
    '{"Brand":"Greenply","Product":"Green MDF Exterior 12mm","Unit":"₹ per sq.ft","Mumbai_Rate":"46","Delhi_Rate":"41","Hyderabad_Rate":"39","Gurgaon_Rate":"41","Bangalore_Rate":"44","Pune_Rate":"45"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Green MDF Exterior 12mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Green MDF Exterior 12mm',
    'mdf',
    'Mumbai',
    46,
    'mdf_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Green MDF Exterior 12mm',
    'mdf',
    'Delhi',
    41,
    'mdf_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Green MDF Exterior 12mm',
    'mdf',
    'Hyderabad',
    39,
    'mdf_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Green MDF Exterior 12mm',
    'mdf',
    'Gurgaon',
    41,
    'mdf_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Green MDF Exterior 12mm',
    'mdf',
    'Bangalore',
    44,
    'mdf_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Green MDF Exterior 12mm',
    'mdf',
    'Pune',
    45,
    'mdf_citywise_rates_2025.xlsx'
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
    'Green MDF Exterior 18mm',
    'mdf',
    NULL,
    NULL,
    'Greenply',
    50,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'mdf_citywise_rates_2025.xlsx',
    'MDF_CityWise_Rates',
    '{"Brand":"Greenply","Product":"Green MDF Exterior 18mm","Unit":"₹ per sq.ft","Mumbai_Rate":"56","Delhi_Rate":"50","Hyderabad_Rate":"48","Gurgaon_Rate":"50","Bangalore_Rate":"53","Pune_Rate":"54"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Green MDF Exterior 18mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Green MDF Exterior 18mm',
    'mdf',
    'Mumbai',
    56,
    'mdf_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Green MDF Exterior 18mm',
    'mdf',
    'Delhi',
    50,
    'mdf_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Green MDF Exterior 18mm',
    'mdf',
    'Hyderabad',
    48,
    'mdf_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Green MDF Exterior 18mm',
    'mdf',
    'Gurgaon',
    50,
    'mdf_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Green MDF Exterior 18mm',
    'mdf',
    'Bangalore',
    53,
    'mdf_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Green MDF Exterior 18mm',
    'mdf',
    'Pune',
    54,
    'mdf_citywise_rates_2025.xlsx'
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
    'Pre-Laminated MDF 18mm',
    'mdf',
    NULL,
    NULL,
    'Greenply',
    61,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'mdf_citywise_rates_2025.xlsx',
    'MDF_CityWise_Rates',
    '{"Brand":"Greenply","Product":"Pre-Laminated MDF 18mm","Unit":"₹ per sq.ft","Mumbai_Rate":"68","Delhi_Rate":"61","Hyderabad_Rate":"58","Gurgaon_Rate":"61","Bangalore_Rate":"65","Pune_Rate":"66"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Pre-Laminated MDF 18mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Pre-Laminated MDF 18mm',
    'mdf',
    'Mumbai',
    68,
    'mdf_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Pre-Laminated MDF 18mm',
    'mdf',
    'Delhi',
    61,
    'mdf_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Pre-Laminated MDF 18mm',
    'mdf',
    'Hyderabad',
    58,
    'mdf_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Pre-Laminated MDF 18mm',
    'mdf',
    'Gurgaon',
    61,
    'mdf_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Pre-Laminated MDF 18mm',
    'mdf',
    'Bangalore',
    65,
    'mdf_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Pre-Laminated MDF 18mm',
    'mdf',
    'Pune',
    66,
    'mdf_citywise_rates_2025.xlsx'
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
    'Fire Retardant MDF 18mm',
    'mdf',
    NULL,
    NULL,
