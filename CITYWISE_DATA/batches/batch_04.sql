-- COMPREHENSIVE CITYWISE PRICING DATA IMPORT
-- Generated: 2026-01-01T12:27:08.554Z
-- Source: 27 Excel files with city-wise rates
-- Total Rows: 3710
-- Total Sheets: 110

-- ========================================
-- PART 1: PRICING ITEMS
-- ========================================


-- ========================================
-- BATCH 4 of 14
-- Lines: 15011 to 20010
-- ========================================

    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matt Finish 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Delhi',
    8,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matt Finish 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Hyderabad',
    7.76,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matt Finish 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Gurgaon',
    8,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matt Finish 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Bangalore',
    8.4,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matt Finish 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Pune',
    8.6,
    'edgebanding_citywise_rates_2025.xlsx'
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
    'Matt Finish 30mm × 0.80mm (50m roll)',
    'edgebanding',
    NULL,
    NULL,
    'Greenlam',
    9.5,
    '₹ per meter',
    'citywise_excel_2025',
    'edgebanding_citywise_rates_2025.xlsx',
    'EdgeBanding_CityWise_Rates',
    '{"Brand":"Greenlam","Product":"Matt Finish 30mm × 0.80mm (50m roll)","Unit":"₹ per meter","Mumbai_Rate":"10.5","Delhi_Rate":"9.5","Hyderabad_Rate":"9.22","Gurgaon_Rate":"9.5","Bangalore_Rate":"10","Pune_Rate":"10.3"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Matt Finish 30mm × 0.80mm (50m roll)
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matt Finish 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Mumbai',
    10.5,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matt Finish 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Delhi',
    9.5,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matt Finish 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Hyderabad',
    9.22,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matt Finish 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Gurgaon',
    9.5,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matt Finish 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Bangalore',
    10,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matt Finish 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Pune',
    10.3,
    'edgebanding_citywise_rates_2025.xlsx'
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
    'High Gloss 22mm × 0.80mm (50m roll)',
    'edgebanding',
    NULL,
    NULL,
    'Greenlam',
    9,
    '₹ per meter',
    'citywise_excel_2025',
    'edgebanding_citywise_rates_2025.xlsx',
    'EdgeBanding_CityWise_Rates',
    '{"Brand":"Greenlam","Product":"High Gloss 22mm × 0.80mm (50m roll)","Unit":"₹ per meter","Mumbai_Rate":"9.9","Delhi_Rate":"9","Hyderabad_Rate":"8.73","Gurgaon_Rate":"9","Bangalore_Rate":"9.5","Pune_Rate":"9.7"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: High Gloss 22mm × 0.80mm (50m roll)
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'High Gloss 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Mumbai',
    9.9,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'High Gloss 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Delhi',
    9,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'High Gloss 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Hyderabad',
    8.73,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'High Gloss 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Gurgaon',
    9,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'High Gloss 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Bangalore',
    9.5,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'High Gloss 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Pune',
    9.7,
    'edgebanding_citywise_rates_2025.xlsx'
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
    'High Gloss 30mm × 0.80mm (50m roll)',
    'edgebanding',
    NULL,
    NULL,
    'Greenlam',
    10.5,
    '₹ per meter',
    'citywise_excel_2025',
    'edgebanding_citywise_rates_2025.xlsx',
    'EdgeBanding_CityWise_Rates',
    '{"Brand":"Greenlam","Product":"High Gloss 30mm × 0.80mm (50m roll)","Unit":"₹ per meter","Mumbai_Rate":"11.6","Delhi_Rate":"10.5","Hyderabad_Rate":"10.19","Gurgaon_Rate":"10.5","Bangalore_Rate":"11","Pune_Rate":"11.3"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: High Gloss 30mm × 0.80mm (50m roll)
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'High Gloss 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Mumbai',
    11.6,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'High Gloss 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Delhi',
    10.5,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'High Gloss 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Hyderabad',
    10.19,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'High Gloss 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Gurgaon',
    10.5,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'High Gloss 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Bangalore',
    11,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'High Gloss 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Pune',
    11.3,
    'edgebanding_citywise_rates_2025.xlsx'
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
    'Wood Grain 22mm × 0.80mm (50m roll)',
    'edgebanding',
    NULL,
    NULL,
    'Greenlam',
    8,
    '₹ per meter',
    'citywise_excel_2025',
    'edgebanding_citywise_rates_2025.xlsx',
    'EdgeBanding_CityWise_Rates',
    '{"Brand":"Greenlam","Product":"Wood Grain 22mm × 0.80mm (50m roll)","Unit":"₹ per meter","Mumbai_Rate":"8.8","Delhi_Rate":"8","Hyderabad_Rate":"7.76","Gurgaon_Rate":"8","Bangalore_Rate":"8.4","Pune_Rate":"8.6"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Wood Grain 22mm × 0.80mm (50m roll)
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wood Grain 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Mumbai',
    8.8,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wood Grain 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Delhi',
    8,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wood Grain 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Hyderabad',
    7.76,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wood Grain 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Gurgaon',
    8,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wood Grain 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Bangalore',
    8.4,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wood Grain 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Pune',
    8.6,
    'edgebanding_citywise_rates_2025.xlsx'
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
    'Wood Grain 30mm × 0.80mm (50m roll)',
    'edgebanding',
    NULL,
    NULL,
    'Greenlam',
    9.5,
    '₹ per meter',
    'citywise_excel_2025',
    'edgebanding_citywise_rates_2025.xlsx',
    'EdgeBanding_CityWise_Rates',
    '{"Brand":"Greenlam","Product":"Wood Grain 30mm × 0.80mm (50m roll)","Unit":"₹ per meter","Mumbai_Rate":"10.5","Delhi_Rate":"9.5","Hyderabad_Rate":"9.22","Gurgaon_Rate":"9.5","Bangalore_Rate":"10","Pune_Rate":"10.3"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Wood Grain 30mm × 0.80mm (50m roll)
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wood Grain 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Mumbai',
    10.5,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wood Grain 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Delhi',
    9.5,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wood Grain 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Hyderabad',
    9.22,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wood Grain 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Gurgaon',
    9.5,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wood Grain 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Bangalore',
    10,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wood Grain 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Pune',
    10.3,
    'edgebanding_citywise_rates_2025.xlsx'
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
    'Solid Color 22mm × 0.80mm (50m roll)',
    'edgebanding',
    NULL,
    NULL,
    'Greenlam',
    7,
    '₹ per meter',
    'citywise_excel_2025',
    'edgebanding_citywise_rates_2025.xlsx',
    'EdgeBanding_CityWise_Rates',
    '{"Brand":"Greenlam","Product":"Solid Color 22mm × 0.80mm (50m roll)","Unit":"₹ per meter","Mumbai_Rate":"7.7","Delhi_Rate":"7","Hyderabad_Rate":"6.79","Gurgaon_Rate":"7","Bangalore_Rate":"7.4","Pune_Rate":"7.6"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Solid Color 22mm × 0.80mm (50m roll)
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Color 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Mumbai',
    7.7,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Color 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Delhi',
    7,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Color 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Hyderabad',
    6.79,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Color 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Gurgaon',
    7,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Color 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Bangalore',
    7.4,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Color 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Pune',
    7.6,
    'edgebanding_citywise_rates_2025.xlsx'
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
    'Solid Color 30mm × 0.80mm (50m roll)',
    'edgebanding',
    NULL,
    NULL,
    'Greenlam',
    8.5,
    '₹ per meter',
    'citywise_excel_2025',
    'edgebanding_citywise_rates_2025.xlsx',
    'EdgeBanding_CityWise_Rates',
    '{"Brand":"Greenlam","Product":"Solid Color 30mm × 0.80mm (50m roll)","Unit":"₹ per meter","Mumbai_Rate":"9.4","Delhi_Rate":"8.5","Hyderabad_Rate":"8.25","Gurgaon_Rate":"8.5","Bangalore_Rate":"8.9","Pune_Rate":"9.2"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Solid Color 30mm × 0.80mm (50m roll)
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Color 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Mumbai',
    9.4,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Color 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Delhi',
    8.5,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Color 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Hyderabad',
    8.25,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Color 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Gurgaon',
    8.5,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Color 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Bangalore',
    8.9,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Color 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Pune',
    9.2,
    'edgebanding_citywise_rates_2025.xlsx'
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
    'PVC Edge Band 22mm × 0.80mm (50m roll)',
    'edgebanding',
    NULL,
    NULL,
    'Merino',
    7.5,
    '₹ per meter',
    'citywise_excel_2025',
    'edgebanding_citywise_rates_2025.xlsx',
    'EdgeBanding_CityWise_Rates',
    '{"Brand":"Merino","Product":"PVC Edge Band 22mm × 0.80mm (50m roll)","Unit":"₹ per meter","Mumbai_Rate":"8.3","Delhi_Rate":"7.5","Hyderabad_Rate":"7.28","Gurgaon_Rate":"7.5","Bangalore_Rate":"7.9","Pune_Rate":"8.1"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: PVC Edge Band 22mm × 0.80mm (50m roll)
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PVC Edge Band 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Mumbai',
    8.3,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PVC Edge Band 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Delhi',
    7.5,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PVC Edge Band 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Hyderabad',
    7.28,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PVC Edge Band 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Gurgaon',
    7.5,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PVC Edge Band 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Bangalore',
    7.9,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PVC Edge Band 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Pune',
    8.1,
    'edgebanding_citywise_rates_2025.xlsx'
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
    'PVC Edge Band 25mm × 0.80mm (50m roll)',
    'edgebanding',
    NULL,
    NULL,
    'Merino',
    8.5,
    '₹ per meter',
    'citywise_excel_2025',
    'edgebanding_citywise_rates_2025.xlsx',
    'EdgeBanding_CityWise_Rates',
    '{"Brand":"Merino","Product":"PVC Edge Band 25mm × 0.80mm (50m roll)","Unit":"₹ per meter","Mumbai_Rate":"9.4","Delhi_Rate":"8.5","Hyderabad_Rate":"8.25","Gurgaon_Rate":"8.5","Bangalore_Rate":"8.9","Pune_Rate":"9.2"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: PVC Edge Band 25mm × 0.80mm (50m roll)
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PVC Edge Band 25mm × 0.80mm (50m roll)',
    'edgebanding',
    'Mumbai',
    9.4,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PVC Edge Band 25mm × 0.80mm (50m roll)',
    'edgebanding',
    'Delhi',
    8.5,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PVC Edge Band 25mm × 0.80mm (50m roll)',
    'edgebanding',
    'Hyderabad',
    8.25,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PVC Edge Band 25mm × 0.80mm (50m roll)',
    'edgebanding',
    'Gurgaon',
    8.5,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PVC Edge Band 25mm × 0.80mm (50m roll)',
    'edgebanding',
    'Bangalore',
    8.9,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PVC Edge Band 25mm × 0.80mm (50m roll)',
    'edgebanding',
    'Pune',
    9.2,
    'edgebanding_citywise_rates_2025.xlsx'
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
    'PVC Edge Band 30mm × 0.80mm (50m roll)',
    'edgebanding',
    NULL,
    NULL,
    'Merino',
    9.5,
    '₹ per meter',
    'citywise_excel_2025',
    'edgebanding_citywise_rates_2025.xlsx',
    'EdgeBanding_CityWise_Rates',
    '{"Brand":"Merino","Product":"PVC Edge Band 30mm × 0.80mm (50m roll)","Unit":"₹ per meter","Mumbai_Rate":"10.5","Delhi_Rate":"9.5","Hyderabad_Rate":"9.22","Gurgaon_Rate":"9.5","Bangalore_Rate":"10","Pune_Rate":"10.3"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: PVC Edge Band 30mm × 0.80mm (50m roll)
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PVC Edge Band 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Mumbai',
    10.5,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PVC Edge Band 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Delhi',
    9.5,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PVC Edge Band 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Hyderabad',
    9.22,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PVC Edge Band 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Gurgaon',
    9.5,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PVC Edge Band 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Bangalore',
    10,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PVC Edge Band 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Pune',
    10.3,
    'edgebanding_citywise_rates_2025.xlsx'
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
    'PVC Edge Band 45mm × 0.80mm (50m roll)',
    'edgebanding',
    NULL,
    NULL,
    'Merino',
    11.5,
    '₹ per meter',
    'citywise_excel_2025',
    'edgebanding_citywise_rates_2025.xlsx',
    'EdgeBanding_CityWise_Rates',
    '{"Brand":"Merino","Product":"PVC Edge Band 45mm × 0.80mm (50m roll)","Unit":"₹ per meter","Mumbai_Rate":"12.7","Delhi_Rate":"11.5","Hyderabad_Rate":"11.16","Gurgaon_Rate":"11.5","Bangalore_Rate":"12.1","Pune_Rate":"12.4"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: PVC Edge Band 45mm × 0.80mm (50m roll)
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PVC Edge Band 45mm × 0.80mm (50m roll)',
    'edgebanding',
    'Mumbai',
    12.7,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PVC Edge Band 45mm × 0.80mm (50m roll)',
    'edgebanding',
    'Delhi',
    11.5,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PVC Edge Band 45mm × 0.80mm (50m roll)',
    'edgebanding',
    'Hyderabad',
    11.16,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PVC Edge Band 45mm × 0.80mm (50m roll)',
    'edgebanding',
    'Gurgaon',
    11.5,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PVC Edge Band 45mm × 0.80mm (50m roll)',
    'edgebanding',
    'Bangalore',
    12.1,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PVC Edge Band 45mm × 0.80mm (50m roll)',
    'edgebanding',
    'Pune',
    12.4,
    'edgebanding_citywise_rates_2025.xlsx'
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
    'Matt Finish 22mm × 0.80mm (50m roll)',
    'edgebanding',
    NULL,
    NULL,
    'Merino',
    8.5,
    '₹ per meter',
    'citywise_excel_2025',
    'edgebanding_citywise_rates_2025.xlsx',
    'EdgeBanding_CityWise_Rates',
    '{"Brand":"Merino","Product":"Matt Finish 22mm × 0.80mm (50m roll)","Unit":"₹ per meter","Mumbai_Rate":"9.4","Delhi_Rate":"8.5","Hyderabad_Rate":"8.25","Gurgaon_Rate":"8.5","Bangalore_Rate":"8.9","Pune_Rate":"9.2"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Matt Finish 22mm × 0.80mm (50m roll)
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matt Finish 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Mumbai',
    9.4,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matt Finish 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Delhi',
    8.5,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matt Finish 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Hyderabad',
    8.25,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matt Finish 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Gurgaon',
    8.5,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matt Finish 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Bangalore',
    8.9,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matt Finish 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Pune',
    9.2,
    'edgebanding_citywise_rates_2025.xlsx'
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
    'Matt Finish 30mm × 0.80mm (50m roll)',
    'edgebanding',
    NULL,
    NULL,
    'Merino',
    10,
    '₹ per meter',
    'citywise_excel_2025',
    'edgebanding_citywise_rates_2025.xlsx',
    'EdgeBanding_CityWise_Rates',
    '{"Brand":"Merino","Product":"Matt Finish 30mm × 0.80mm (50m roll)","Unit":"₹ per meter","Mumbai_Rate":"11","Delhi_Rate":"10","Hyderabad_Rate":"9.7","Gurgaon_Rate":"10","Bangalore_Rate":"10.5","Pune_Rate":"10.8"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Matt Finish 30mm × 0.80mm (50m roll)
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matt Finish 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Mumbai',
    11,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matt Finish 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Delhi',
    10,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matt Finish 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Hyderabad',
    9.7,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matt Finish 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Gurgaon',
    10,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matt Finish 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Bangalore',
    10.5,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matt Finish 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Pune',
    10.8,
    'edgebanding_citywise_rates_2025.xlsx'
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
    'High Gloss 22mm × 0.80mm (50m roll)',
    'edgebanding',
    NULL,
    NULL,
    'Merino',
    9.5,
    '₹ per meter',
    'citywise_excel_2025',
    'edgebanding_citywise_rates_2025.xlsx',
    'EdgeBanding_CityWise_Rates',
    '{"Brand":"Merino","Product":"High Gloss 22mm × 0.80mm (50m roll)","Unit":"₹ per meter","Mumbai_Rate":"10.5","Delhi_Rate":"9.5","Hyderabad_Rate":"9.22","Gurgaon_Rate":"9.5","Bangalore_Rate":"10","Pune_Rate":"10.3"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: High Gloss 22mm × 0.80mm (50m roll)
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'High Gloss 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Mumbai',
    10.5,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'High Gloss 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Delhi',
    9.5,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'High Gloss 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Hyderabad',
    9.22,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'High Gloss 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Gurgaon',
    9.5,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'High Gloss 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Bangalore',
    10,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'High Gloss 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Pune',
    10.3,
    'edgebanding_citywise_rates_2025.xlsx'
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
    'High Gloss 30mm × 0.80mm (50m roll)',
    'edgebanding',
    NULL,
    NULL,
    'Merino',
    11,
    '₹ per meter',
    'citywise_excel_2025',
    'edgebanding_citywise_rates_2025.xlsx',
    'EdgeBanding_CityWise_Rates',
    '{"Brand":"Merino","Product":"High Gloss 30mm × 0.80mm (50m roll)","Unit":"₹ per meter","Mumbai_Rate":"12.1","Delhi_Rate":"11","Hyderabad_Rate":"10.67","Gurgaon_Rate":"11","Bangalore_Rate":"11.6","Pune_Rate":"11.9"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: High Gloss 30mm × 0.80mm (50m roll)
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'High Gloss 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Mumbai',
    12.1,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'High Gloss 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Delhi',
    11,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'High Gloss 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Hyderabad',
    10.67,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'High Gloss 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Gurgaon',
    11,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'High Gloss 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Bangalore',
    11.6,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'High Gloss 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Pune',
    11.9,
    'edgebanding_citywise_rates_2025.xlsx'
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
    'Wood Grain 22mm × 0.80mm (50m roll)',
    'edgebanding',
    NULL,
    NULL,
    'Merino',
    8.5,
    '₹ per meter',
    'citywise_excel_2025',
    'edgebanding_citywise_rates_2025.xlsx',
    'EdgeBanding_CityWise_Rates',
    '{"Brand":"Merino","Product":"Wood Grain 22mm × 0.80mm (50m roll)","Unit":"₹ per meter","Mumbai_Rate":"9.4","Delhi_Rate":"8.5","Hyderabad_Rate":"8.25","Gurgaon_Rate":"8.5","Bangalore_Rate":"8.9","Pune_Rate":"9.2"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Wood Grain 22mm × 0.80mm (50m roll)
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wood Grain 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Mumbai',
    9.4,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wood Grain 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Delhi',
    8.5,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wood Grain 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Hyderabad',
    8.25,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wood Grain 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Gurgaon',
    8.5,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wood Grain 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Bangalore',
    8.9,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wood Grain 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Pune',
    9.2,
    'edgebanding_citywise_rates_2025.xlsx'
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
    'Wood Grain 30mm × 0.80mm (50m roll)',
    'edgebanding',
    NULL,
    NULL,
    'Merino',
    10,
    '₹ per meter',
    'citywise_excel_2025',
    'edgebanding_citywise_rates_2025.xlsx',
    'EdgeBanding_CityWise_Rates',
    '{"Brand":"Merino","Product":"Wood Grain 30mm × 0.80mm (50m roll)","Unit":"₹ per meter","Mumbai_Rate":"11","Delhi_Rate":"10","Hyderabad_Rate":"9.7","Gurgaon_Rate":"10","Bangalore_Rate":"10.5","Pune_Rate":"10.8"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Wood Grain 30mm × 0.80mm (50m roll)
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wood Grain 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Mumbai',
    11,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wood Grain 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Delhi',
    10,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wood Grain 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Hyderabad',
    9.7,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wood Grain 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Gurgaon',
    10,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wood Grain 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Bangalore',
    10.5,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wood Grain 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Pune',
    10.8,
    'edgebanding_citywise_rates_2025.xlsx'
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
    'Solid Color 22mm × 0.80mm (50m roll)',
    'edgebanding',
    NULL,
    NULL,
    'Merino',
    7.5,
    '₹ per meter',
    'citywise_excel_2025',
    'edgebanding_citywise_rates_2025.xlsx',
    'EdgeBanding_CityWise_Rates',
    '{"Brand":"Merino","Product":"Solid Color 22mm × 0.80mm (50m roll)","Unit":"₹ per meter","Mumbai_Rate":"8.3","Delhi_Rate":"7.5","Hyderabad_Rate":"7.28","Gurgaon_Rate":"7.5","Bangalore_Rate":"7.9","Pune_Rate":"8.1"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Solid Color 22mm × 0.80mm (50m roll)
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Color 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Mumbai',
    8.3,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Color 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Delhi',
    7.5,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Color 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Hyderabad',
    7.28,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Color 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Gurgaon',
    7.5,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Color 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Bangalore',
    7.9,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Color 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Pune',
    8.1,
    'edgebanding_citywise_rates_2025.xlsx'
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
    'Solid Color 30mm × 0.80mm (50m roll)',
    'edgebanding',
    NULL,
    NULL,
    'Merino',
    9,
    '₹ per meter',
    'citywise_excel_2025',
    'edgebanding_citywise_rates_2025.xlsx',
    'EdgeBanding_CityWise_Rates',
    '{"Brand":"Merino","Product":"Solid Color 30mm × 0.80mm (50m roll)","Unit":"₹ per meter","Mumbai_Rate":"9.9","Delhi_Rate":"9","Hyderabad_Rate":"8.73","Gurgaon_Rate":"9","Bangalore_Rate":"9.5","Pune_Rate":"9.7"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Solid Color 30mm × 0.80mm (50m roll)
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Color 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Mumbai',
    9.9,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Color 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Delhi',
    9,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Color 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Hyderabad',
    8.73,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Color 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Gurgaon',
    9,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Color 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Bangalore',
    9.5,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Color 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Pune',
    9.7,
    'edgebanding_citywise_rates_2025.xlsx'
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
    'PVC Edge Band 22mm × 0.80mm (50m roll)',
    'edgebanding',
    NULL,
    NULL,
    'Action Tesa',
    6.5,
    '₹ per meter',
    'citywise_excel_2025',
    'edgebanding_citywise_rates_2025.xlsx',
    'EdgeBanding_CityWise_Rates',
    '{"Brand":"Action Tesa","Product":"PVC Edge Band 22mm × 0.80mm (50m roll)","Unit":"₹ per meter","Mumbai_Rate":"7.2","Delhi_Rate":"6.5","Hyderabad_Rate":"6.31","Gurgaon_Rate":"6.5","Bangalore_Rate":"6.8","Pune_Rate":"7"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: PVC Edge Band 22mm × 0.80mm (50m roll)
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PVC Edge Band 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Mumbai',
    7.2,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PVC Edge Band 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Delhi',
    6.5,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PVC Edge Band 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Hyderabad',
    6.31,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PVC Edge Band 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Gurgaon',
    6.5,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PVC Edge Band 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Bangalore',
    6.8,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PVC Edge Band 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Pune',
    7,
    'edgebanding_citywise_rates_2025.xlsx'
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
    'PVC Edge Band 25mm × 0.80mm (50m roll)',
    'edgebanding',
    NULL,
    NULL,
    'Action Tesa',
    7.5,
    '₹ per meter',
    'citywise_excel_2025',
    'edgebanding_citywise_rates_2025.xlsx',
    'EdgeBanding_CityWise_Rates',
    '{"Brand":"Action Tesa","Product":"PVC Edge Band 25mm × 0.80mm (50m roll)","Unit":"₹ per meter","Mumbai_Rate":"8.3","Delhi_Rate":"7.5","Hyderabad_Rate":"7.28","Gurgaon_Rate":"7.5","Bangalore_Rate":"7.9","Pune_Rate":"8.1"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: PVC Edge Band 25mm × 0.80mm (50m roll)
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PVC Edge Band 25mm × 0.80mm (50m roll)',
    'edgebanding',
    'Mumbai',
    8.3,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PVC Edge Band 25mm × 0.80mm (50m roll)',
    'edgebanding',
    'Delhi',
    7.5,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PVC Edge Band 25mm × 0.80mm (50m roll)',
    'edgebanding',
    'Hyderabad',
    7.28,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PVC Edge Band 25mm × 0.80mm (50m roll)',
    'edgebanding',
    'Gurgaon',
    7.5,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PVC Edge Band 25mm × 0.80mm (50m roll)',
    'edgebanding',
    'Bangalore',
    7.9,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PVC Edge Band 25mm × 0.80mm (50m roll)',
    'edgebanding',
    'Pune',
    8.1,
    'edgebanding_citywise_rates_2025.xlsx'
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
    'PVC Edge Band 30mm × 0.80mm (50m roll)',
    'edgebanding',
    NULL,
    NULL,
    'Action Tesa',
    8.5,
    '₹ per meter',
    'citywise_excel_2025',
    'edgebanding_citywise_rates_2025.xlsx',
    'EdgeBanding_CityWise_Rates',
    '{"Brand":"Action Tesa","Product":"PVC Edge Band 30mm × 0.80mm (50m roll)","Unit":"₹ per meter","Mumbai_Rate":"9.4","Delhi_Rate":"8.5","Hyderabad_Rate":"8.25","Gurgaon_Rate":"8.5","Bangalore_Rate":"8.9","Pune_Rate":"9.2"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: PVC Edge Band 30mm × 0.80mm (50m roll)
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PVC Edge Band 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Mumbai',
    9.4,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PVC Edge Band 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Delhi',
    8.5,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PVC Edge Band 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Hyderabad',
    8.25,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PVC Edge Band 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Gurgaon',
    8.5,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PVC Edge Band 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Bangalore',
    8.9,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PVC Edge Band 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Pune',
    9.2,
    'edgebanding_citywise_rates_2025.xlsx'
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
    'PVC Edge Band 45mm × 0.80mm (50m roll)',
    'edgebanding',
    NULL,
    NULL,
    'Action Tesa',
    10.5,
    '₹ per meter',
    'citywise_excel_2025',
    'edgebanding_citywise_rates_2025.xlsx',
    'EdgeBanding_CityWise_Rates',
    '{"Brand":"Action Tesa","Product":"PVC Edge Band 45mm × 0.80mm (50m roll)","Unit":"₹ per meter","Mumbai_Rate":"11.6","Delhi_Rate":"10.5","Hyderabad_Rate":"10.19","Gurgaon_Rate":"10.5","Bangalore_Rate":"11","Pune_Rate":"11.3"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: PVC Edge Band 45mm × 0.80mm (50m roll)
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PVC Edge Band 45mm × 0.80mm (50m roll)',
    'edgebanding',
    'Mumbai',
    11.6,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PVC Edge Band 45mm × 0.80mm (50m roll)',
    'edgebanding',
    'Delhi',
    10.5,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PVC Edge Band 45mm × 0.80mm (50m roll)',
    'edgebanding',
    'Hyderabad',
    10.19,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PVC Edge Band 45mm × 0.80mm (50m roll)',
    'edgebanding',
    'Gurgaon',
    10.5,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PVC Edge Band 45mm × 0.80mm (50m roll)',
    'edgebanding',
    'Bangalore',
    11,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PVC Edge Band 45mm × 0.80mm (50m roll)',
    'edgebanding',
    'Pune',
    11.3,
    'edgebanding_citywise_rates_2025.xlsx'
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
    'Matt Finish 22mm × 0.80mm (50m roll)',
    'edgebanding',
    NULL,
    NULL,
    'Action Tesa',
    7.5,
    '₹ per meter',
    'citywise_excel_2025',
    'edgebanding_citywise_rates_2025.xlsx',
    'EdgeBanding_CityWise_Rates',
    '{"Brand":"Action Tesa","Product":"Matt Finish 22mm × 0.80mm (50m roll)","Unit":"₹ per meter","Mumbai_Rate":"8.3","Delhi_Rate":"7.5","Hyderabad_Rate":"7.28","Gurgaon_Rate":"7.5","Bangalore_Rate":"7.9","Pune_Rate":"8.1"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Matt Finish 22mm × 0.80mm (50m roll)
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matt Finish 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Mumbai',
    8.3,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matt Finish 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Delhi',
    7.5,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matt Finish 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Hyderabad',
    7.28,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matt Finish 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Gurgaon',
    7.5,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matt Finish 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Bangalore',
    7.9,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matt Finish 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Pune',
    8.1,
    'edgebanding_citywise_rates_2025.xlsx'
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
    'Matt Finish 30mm × 0.80mm (50m roll)',
    'edgebanding',
    NULL,
    NULL,
    'Action Tesa',
    9,
    '₹ per meter',
    'citywise_excel_2025',
    'edgebanding_citywise_rates_2025.xlsx',
    'EdgeBanding_CityWise_Rates',
    '{"Brand":"Action Tesa","Product":"Matt Finish 30mm × 0.80mm (50m roll)","Unit":"₹ per meter","Mumbai_Rate":"9.9","Delhi_Rate":"9","Hyderabad_Rate":"8.73","Gurgaon_Rate":"9","Bangalore_Rate":"9.5","Pune_Rate":"9.7"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Matt Finish 30mm × 0.80mm (50m roll)
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matt Finish 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Mumbai',
    9.9,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matt Finish 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Delhi',
    9,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matt Finish 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Hyderabad',
    8.73,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matt Finish 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Gurgaon',
    9,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matt Finish 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Bangalore',
    9.5,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matt Finish 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Pune',
    9.7,
    'edgebanding_citywise_rates_2025.xlsx'
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
    'High Gloss 22mm × 0.80mm (50m roll)',
    'edgebanding',
    NULL,
    NULL,
    'Action Tesa',
    8.5,
    '₹ per meter',
    'citywise_excel_2025',
    'edgebanding_citywise_rates_2025.xlsx',
    'EdgeBanding_CityWise_Rates',
    '{"Brand":"Action Tesa","Product":"High Gloss 22mm × 0.80mm (50m roll)","Unit":"₹ per meter","Mumbai_Rate":"9.4","Delhi_Rate":"8.5","Hyderabad_Rate":"8.25","Gurgaon_Rate":"8.5","Bangalore_Rate":"8.9","Pune_Rate":"9.2"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: High Gloss 22mm × 0.80mm (50m roll)
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'High Gloss 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Mumbai',
    9.4,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'High Gloss 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Delhi',
    8.5,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'High Gloss 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Hyderabad',
    8.25,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'High Gloss 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Gurgaon',
    8.5,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'High Gloss 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Bangalore',
    8.9,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'High Gloss 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Pune',
    9.2,
    'edgebanding_citywise_rates_2025.xlsx'
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
    'High Gloss 30mm × 0.80mm (50m roll)',
    'edgebanding',
    NULL,
    NULL,
    'Action Tesa',
    10,
    '₹ per meter',
    'citywise_excel_2025',
    'edgebanding_citywise_rates_2025.xlsx',
    'EdgeBanding_CityWise_Rates',
    '{"Brand":"Action Tesa","Product":"High Gloss 30mm × 0.80mm (50m roll)","Unit":"₹ per meter","Mumbai_Rate":"11","Delhi_Rate":"10","Hyderabad_Rate":"9.7","Gurgaon_Rate":"10","Bangalore_Rate":"10.5","Pune_Rate":"10.8"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: High Gloss 30mm × 0.80mm (50m roll)
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'High Gloss 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Mumbai',
    11,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'High Gloss 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Delhi',
    10,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'High Gloss 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Hyderabad',
    9.7,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'High Gloss 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Gurgaon',
    10,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'High Gloss 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Bangalore',
    10.5,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'High Gloss 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Pune',
    10.8,
    'edgebanding_citywise_rates_2025.xlsx'
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
    'Wood Grain 22mm × 0.80mm (50m roll)',
    'edgebanding',
    NULL,
    NULL,
    'Action Tesa',
    7.5,
    '₹ per meter',
    'citywise_excel_2025',
    'edgebanding_citywise_rates_2025.xlsx',
    'EdgeBanding_CityWise_Rates',
    '{"Brand":"Action Tesa","Product":"Wood Grain 22mm × 0.80mm (50m roll)","Unit":"₹ per meter","Mumbai_Rate":"8.3","Delhi_Rate":"7.5","Hyderabad_Rate":"7.28","Gurgaon_Rate":"7.5","Bangalore_Rate":"7.9","Pune_Rate":"8.1"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Wood Grain 22mm × 0.80mm (50m roll)
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wood Grain 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Mumbai',
    8.3,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wood Grain 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Delhi',
    7.5,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wood Grain 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Hyderabad',
    7.28,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wood Grain 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Gurgaon',
    7.5,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wood Grain 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Bangalore',
    7.9,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wood Grain 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Pune',
    8.1,
    'edgebanding_citywise_rates_2025.xlsx'
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
    'Wood Grain 30mm × 0.80mm (50m roll)',
    'edgebanding',
    NULL,
    NULL,
    'Action Tesa',
    9,
    '₹ per meter',
    'citywise_excel_2025',
    'edgebanding_citywise_rates_2025.xlsx',
    'EdgeBanding_CityWise_Rates',
    '{"Brand":"Action Tesa","Product":"Wood Grain 30mm × 0.80mm (50m roll)","Unit":"₹ per meter","Mumbai_Rate":"9.9","Delhi_Rate":"9","Hyderabad_Rate":"8.73","Gurgaon_Rate":"9","Bangalore_Rate":"9.5","Pune_Rate":"9.7"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Wood Grain 30mm × 0.80mm (50m roll)
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wood Grain 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Mumbai',
    9.9,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wood Grain 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Delhi',
    9,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wood Grain 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Hyderabad',
    8.73,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wood Grain 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Gurgaon',
    9,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wood Grain 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Bangalore',
    9.5,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wood Grain 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Pune',
    9.7,
    'edgebanding_citywise_rates_2025.xlsx'
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
    'Solid Color 22mm × 0.80mm (50m roll)',
    'edgebanding',
    NULL,
    NULL,
    'Action Tesa',
    6.5,
    '₹ per meter',
    'citywise_excel_2025',
    'edgebanding_citywise_rates_2025.xlsx',
    'EdgeBanding_CityWise_Rates',
    '{"Brand":"Action Tesa","Product":"Solid Color 22mm × 0.80mm (50m roll)","Unit":"₹ per meter","Mumbai_Rate":"7.2","Delhi_Rate":"6.5","Hyderabad_Rate":"6.31","Gurgaon_Rate":"6.5","Bangalore_Rate":"6.8","Pune_Rate":"7"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Solid Color 22mm × 0.80mm (50m roll)
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Color 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Mumbai',
    7.2,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Color 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Delhi',
    6.5,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Color 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Hyderabad',
    6.31,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Color 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Gurgaon',
    6.5,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Color 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Bangalore',
    6.8,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Color 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Pune',
    7,
    'edgebanding_citywise_rates_2025.xlsx'
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
    'Solid Color 30mm × 0.80mm (50m roll)',
    'edgebanding',
    NULL,
    NULL,
    'Action Tesa',
    8,
    '₹ per meter',
    'citywise_excel_2025',
    'edgebanding_citywise_rates_2025.xlsx',
    'EdgeBanding_CityWise_Rates',
    '{"Brand":"Action Tesa","Product":"Solid Color 30mm × 0.80mm (50m roll)","Unit":"₹ per meter","Mumbai_Rate":"8.8","Delhi_Rate":"8","Hyderabad_Rate":"7.76","Gurgaon_Rate":"8","Bangalore_Rate":"8.4","Pune_Rate":"8.6"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Solid Color 30mm × 0.80mm (50m roll)
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Color 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Mumbai',
    8.8,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Color 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Delhi',
    8,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Color 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Hyderabad',
    7.76,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Color 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Gurgaon',
    8,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Color 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Bangalore',
    8.4,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Color 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Pune',
    8.6,
    'edgebanding_citywise_rates_2025.xlsx'
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
    'PVC Edge Band 22mm × 0.80mm (50m roll)',
    'edgebanding',
    NULL,
    NULL,
    'E3 Panels',
    5.5,
    '₹ per meter',
    'citywise_excel_2025',
    'edgebanding_citywise_rates_2025.xlsx',
    'EdgeBanding_CityWise_Rates',
    '{"Brand":"E3 Panels","Product":"PVC Edge Band 22mm × 0.80mm (50m roll)","Unit":"₹ per meter","Mumbai_Rate":"6.1","Delhi_Rate":"5.5","Hyderabad_Rate":"5.34","Gurgaon_Rate":"5.5","Bangalore_Rate":"5.8","Pune_Rate":"5.9"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: PVC Edge Band 22mm × 0.80mm (50m roll)
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PVC Edge Band 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Mumbai',
    6.1,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PVC Edge Band 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Delhi',
    5.5,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PVC Edge Band 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Hyderabad',
    5.34,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PVC Edge Band 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Gurgaon',
    5.5,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PVC Edge Band 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Bangalore',
    5.8,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PVC Edge Band 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Pune',
    5.9,
    'edgebanding_citywise_rates_2025.xlsx'
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
    'PVC Edge Band 25mm × 0.80mm (50m roll)',
    'edgebanding',
    NULL,
    NULL,
    'E3 Panels',
    6.5,
    '₹ per meter',
    'citywise_excel_2025',
    'edgebanding_citywise_rates_2025.xlsx',
    'EdgeBanding_CityWise_Rates',
    '{"Brand":"E3 Panels","Product":"PVC Edge Band 25mm × 0.80mm (50m roll)","Unit":"₹ per meter","Mumbai_Rate":"7.2","Delhi_Rate":"6.5","Hyderabad_Rate":"6.31","Gurgaon_Rate":"6.5","Bangalore_Rate":"6.8","Pune_Rate":"7"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: PVC Edge Band 25mm × 0.80mm (50m roll)
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PVC Edge Band 25mm × 0.80mm (50m roll)',
    'edgebanding',
    'Mumbai',
    7.2,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PVC Edge Band 25mm × 0.80mm (50m roll)',
    'edgebanding',
    'Delhi',
    6.5,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PVC Edge Band 25mm × 0.80mm (50m roll)',
    'edgebanding',
    'Hyderabad',
    6.31,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PVC Edge Band 25mm × 0.80mm (50m roll)',
    'edgebanding',
    'Gurgaon',
    6.5,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PVC Edge Band 25mm × 0.80mm (50m roll)',
    'edgebanding',
    'Bangalore',
    6.8,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PVC Edge Band 25mm × 0.80mm (50m roll)',
    'edgebanding',
    'Pune',
    7,
    'edgebanding_citywise_rates_2025.xlsx'
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
    'PVC Edge Band 30mm × 0.80mm (50m roll)',
    'edgebanding',
    NULL,
    NULL,
    'E3 Panels',
    7.5,
    '₹ per meter',
    'citywise_excel_2025',
    'edgebanding_citywise_rates_2025.xlsx',
    'EdgeBanding_CityWise_Rates',
    '{"Brand":"E3 Panels","Product":"PVC Edge Band 30mm × 0.80mm (50m roll)","Unit":"₹ per meter","Mumbai_Rate":"8.3","Delhi_Rate":"7.5","Hyderabad_Rate":"7.28","Gurgaon_Rate":"7.5","Bangalore_Rate":"7.9","Pune_Rate":"8.1"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: PVC Edge Band 30mm × 0.80mm (50m roll)
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PVC Edge Band 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Mumbai',
    8.3,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PVC Edge Band 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Delhi',
    7.5,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PVC Edge Band 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Hyderabad',
    7.28,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PVC Edge Band 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Gurgaon',
    7.5,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PVC Edge Band 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Bangalore',
    7.9,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PVC Edge Band 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Pune',
    8.1,
    'edgebanding_citywise_rates_2025.xlsx'
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
    'PVC Edge Band 45mm × 0.80mm (50m roll)',
    'edgebanding',
    NULL,
    NULL,
    'E3 Panels',
    9.5,
    '₹ per meter',
    'citywise_excel_2025',
    'edgebanding_citywise_rates_2025.xlsx',
    'EdgeBanding_CityWise_Rates',
    '{"Brand":"E3 Panels","Product":"PVC Edge Band 45mm × 0.80mm (50m roll)","Unit":"₹ per meter","Mumbai_Rate":"10.5","Delhi_Rate":"9.5","Hyderabad_Rate":"9.22","Gurgaon_Rate":"9.5","Bangalore_Rate":"10","Pune_Rate":"10.3"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: PVC Edge Band 45mm × 0.80mm (50m roll)
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PVC Edge Band 45mm × 0.80mm (50m roll)',
    'edgebanding',
    'Mumbai',
    10.5,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PVC Edge Band 45mm × 0.80mm (50m roll)',
    'edgebanding',
    'Delhi',
    9.5,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PVC Edge Band 45mm × 0.80mm (50m roll)',
    'edgebanding',
    'Hyderabad',
    9.22,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PVC Edge Band 45mm × 0.80mm (50m roll)',
    'edgebanding',
    'Gurgaon',
    9.5,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PVC Edge Band 45mm × 0.80mm (50m roll)',
    'edgebanding',
    'Bangalore',
    10,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PVC Edge Band 45mm × 0.80mm (50m roll)',
    'edgebanding',
    'Pune',
    10.3,
    'edgebanding_citywise_rates_2025.xlsx'
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
    'Matt Finish 22mm × 0.80mm (50m roll)',
    'edgebanding',
    NULL,
    NULL,
    'E3 Panels',
    6.5,
    '₹ per meter',
    'citywise_excel_2025',
    'edgebanding_citywise_rates_2025.xlsx',
    'EdgeBanding_CityWise_Rates',
    '{"Brand":"E3 Panels","Product":"Matt Finish 22mm × 0.80mm (50m roll)","Unit":"₹ per meter","Mumbai_Rate":"7.2","Delhi_Rate":"6.5","Hyderabad_Rate":"6.31","Gurgaon_Rate":"6.5","Bangalore_Rate":"6.8","Pune_Rate":"7"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Matt Finish 22mm × 0.80mm (50m roll)
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matt Finish 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Mumbai',
    7.2,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matt Finish 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Delhi',
    6.5,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matt Finish 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Hyderabad',
    6.31,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matt Finish 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Gurgaon',
    6.5,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matt Finish 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Bangalore',
    6.8,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matt Finish 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Pune',
    7,
    'edgebanding_citywise_rates_2025.xlsx'
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
    'Matt Finish 30mm × 0.80mm (50m roll)',
    'edgebanding',
    NULL,
    NULL,
    'E3 Panels',
    8,
    '₹ per meter',
    'citywise_excel_2025',
    'edgebanding_citywise_rates_2025.xlsx',
    'EdgeBanding_CityWise_Rates',
    '{"Brand":"E3 Panels","Product":"Matt Finish 30mm × 0.80mm (50m roll)","Unit":"₹ per meter","Mumbai_Rate":"8.8","Delhi_Rate":"8","Hyderabad_Rate":"7.76","Gurgaon_Rate":"8","Bangalore_Rate":"8.4","Pune_Rate":"8.6"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Matt Finish 30mm × 0.80mm (50m roll)
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matt Finish 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Mumbai',
    8.8,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matt Finish 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Delhi',
    8,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matt Finish 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Hyderabad',
    7.76,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matt Finish 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Gurgaon',
    8,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matt Finish 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Bangalore',
    8.4,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matt Finish 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Pune',
    8.6,
    'edgebanding_citywise_rates_2025.xlsx'
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
    'High Gloss 22mm × 0.80mm (50m roll)',
    'edgebanding',
    NULL,
    NULL,
    'E3 Panels',
    7.5,
    '₹ per meter',
    'citywise_excel_2025',
    'edgebanding_citywise_rates_2025.xlsx',
    'EdgeBanding_CityWise_Rates',
    '{"Brand":"E3 Panels","Product":"High Gloss 22mm × 0.80mm (50m roll)","Unit":"₹ per meter","Mumbai_Rate":"8.3","Delhi_Rate":"7.5","Hyderabad_Rate":"7.28","Gurgaon_Rate":"7.5","Bangalore_Rate":"7.9","Pune_Rate":"8.1"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: High Gloss 22mm × 0.80mm (50m roll)
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'High Gloss 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Mumbai',
    8.3,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'High Gloss 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Delhi',
    7.5,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
