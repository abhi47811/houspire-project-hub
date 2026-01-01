-- COMPREHENSIVE CITYWISE PRICING DATA IMPORT
-- Generated: 2026-01-01T12:27:08.554Z
-- Source: 27 Excel files with city-wise rates
-- Total Rows: 3710
-- Total Sheets: 110

-- ========================================
-- PART 1: PRICING ITEMS
-- ========================================


-- ========================================
-- BATCH 5 of 14
-- Lines: 20011 to 25010
-- ========================================

    city_rate,
    source_file
) VALUES (
    'High Gloss 22mm × 0.80mm (50m roll)',
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
    'High Gloss 22mm × 0.80mm (50m roll)',
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
    'High Gloss 22mm × 0.80mm (50m roll)',
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
    'High Gloss 22mm × 0.80mm (50m roll)',
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
    'High Gloss 30mm × 0.80mm (50m roll)',
    'edgebanding',
    NULL,
    NULL,
    'E3 Panels',
    9,
    '₹ per meter',
    'citywise_excel_2025',
    'edgebanding_citywise_rates_2025.xlsx',
    'EdgeBanding_CityWise_Rates',
    '{"Brand":"E3 Panels","Product":"High Gloss 30mm × 0.80mm (50m roll)","Unit":"₹ per meter","Mumbai_Rate":"9.9","Delhi_Rate":"9","Hyderabad_Rate":"8.73","Gurgaon_Rate":"9","Bangalore_Rate":"9.5","Pune_Rate":"9.7"}'::jsonb
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
    'High Gloss 30mm × 0.80mm (50m roll)',
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
    'High Gloss 30mm × 0.80mm (50m roll)',
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
    'High Gloss 30mm × 0.80mm (50m roll)',
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
    'High Gloss 30mm × 0.80mm (50m roll)',
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
    'High Gloss 30mm × 0.80mm (50m roll)',
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
    'Wood Grain 22mm × 0.80mm (50m roll)',
    'edgebanding',
    NULL,
    NULL,
    'E3 Panels',
    6.5,
    '₹ per meter',
    'citywise_excel_2025',
    'edgebanding_citywise_rates_2025.xlsx',
    'EdgeBanding_CityWise_Rates',
    '{"Brand":"E3 Panels","Product":"Wood Grain 22mm × 0.80mm (50m roll)","Unit":"₹ per meter","Mumbai_Rate":"7.2","Delhi_Rate":"6.5","Hyderabad_Rate":"6.31","Gurgaon_Rate":"6.5","Bangalore_Rate":"6.8","Pune_Rate":"7"}'::jsonb
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
    'Wood Grain 22mm × 0.80mm (50m roll)',
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
    'Wood Grain 22mm × 0.80mm (50m roll)',
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
    'Wood Grain 22mm × 0.80mm (50m roll)',
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
    'Wood Grain 22mm × 0.80mm (50m roll)',
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
    'Wood Grain 22mm × 0.80mm (50m roll)',
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
    'Wood Grain 30mm × 0.80mm (50m roll)',
    'edgebanding',
    NULL,
    NULL,
    'E3 Panels',
    8,
    '₹ per meter',
    'citywise_excel_2025',
    'edgebanding_citywise_rates_2025.xlsx',
    'EdgeBanding_CityWise_Rates',
    '{"Brand":"E3 Panels","Product":"Wood Grain 30mm × 0.80mm (50m roll)","Unit":"₹ per meter","Mumbai_Rate":"8.8","Delhi_Rate":"8","Hyderabad_Rate":"7.76","Gurgaon_Rate":"8","Bangalore_Rate":"8.4","Pune_Rate":"8.6"}'::jsonb
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
    'Wood Grain 30mm × 0.80mm (50m roll)',
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
    'Wood Grain 30mm × 0.80mm (50m roll)',
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
    'Wood Grain 30mm × 0.80mm (50m roll)',
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
    'Wood Grain 30mm × 0.80mm (50m roll)',
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
    'Wood Grain 30mm × 0.80mm (50m roll)',
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
    'Solid Color 22mm × 0.80mm (50m roll)',
    'edgebanding',
    NULL,
    NULL,
    'E3 Panels',
    5.5,
    '₹ per meter',
    'citywise_excel_2025',
    'edgebanding_citywise_rates_2025.xlsx',
    'EdgeBanding_CityWise_Rates',
    '{"Brand":"E3 Panels","Product":"Solid Color 22mm × 0.80mm (50m roll)","Unit":"₹ per meter","Mumbai_Rate":"6.1","Delhi_Rate":"5.5","Hyderabad_Rate":"5.34","Gurgaon_Rate":"5.5","Bangalore_Rate":"5.8","Pune_Rate":"5.9"}'::jsonb
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
    'Solid Color 22mm × 0.80mm (50m roll)',
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
    'Solid Color 22mm × 0.80mm (50m roll)',
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
    'Solid Color 22mm × 0.80mm (50m roll)',
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
    'Solid Color 22mm × 0.80mm (50m roll)',
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
    'Solid Color 22mm × 0.80mm (50m roll)',
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
    'Solid Color 30mm × 0.80mm (50m roll)',
    'edgebanding',
    NULL,
    NULL,
    'E3 Panels',
    7,
    '₹ per meter',
    'citywise_excel_2025',
    'edgebanding_citywise_rates_2025.xlsx',
    'EdgeBanding_CityWise_Rates',
    '{"Brand":"E3 Panels","Product":"Solid Color 30mm × 0.80mm (50m roll)","Unit":"₹ per meter","Mumbai_Rate":"7.7","Delhi_Rate":"7","Hyderabad_Rate":"6.79","Gurgaon_Rate":"7","Bangalore_Rate":"7.4","Pune_Rate":"7.6"}'::jsonb
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
    'Solid Color 30mm × 0.80mm (50m roll)',
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
    'Solid Color 30mm × 0.80mm (50m roll)',
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
    'Solid Color 30mm × 0.80mm (50m roll)',
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
    'Solid Color 30mm × 0.80mm (50m roll)',
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
    'Solid Color 30mm × 0.80mm (50m roll)',
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
    'PVC Edge Band 22mm × 0.80mm (50m roll)',
    'edgebanding',
    NULL,
    NULL,
    'Local',
    4,
    '₹ per meter',
    'citywise_excel_2025',
    'edgebanding_citywise_rates_2025.xlsx',
    'EdgeBanding_CityWise_Rates',
    '{"Brand":"Local","Product":"PVC Edge Band 22mm × 0.80mm (50m roll)","Unit":"₹ per meter","Mumbai_Rate":"4.4","Delhi_Rate":"4","Hyderabad_Rate":"3.88","Gurgaon_Rate":"4","Bangalore_Rate":"4.2","Pune_Rate":"4.3"}'::jsonb
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
    4.4,
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
    4,
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
    3.88,
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
    4,
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
    4.2,
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
    4.3,
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
    'Local',
    4.5,
    '₹ per meter',
    'citywise_excel_2025',
    'edgebanding_citywise_rates_2025.xlsx',
    'EdgeBanding_CityWise_Rates',
    '{"Brand":"Local","Product":"PVC Edge Band 25mm × 0.80mm (50m roll)","Unit":"₹ per meter","Mumbai_Rate":"5","Delhi_Rate":"4.5","Hyderabad_Rate":"4.37","Gurgaon_Rate":"4.5","Bangalore_Rate":"4.7","Pune_Rate":"4.9"}'::jsonb
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
    5,
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
    4.5,
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
    4.37,
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
    4.5,
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
    4.7,
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
    4.9,
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
    'Local',
    5,
    '₹ per meter',
    'citywise_excel_2025',
    'edgebanding_citywise_rates_2025.xlsx',
    'EdgeBanding_CityWise_Rates',
    '{"Brand":"Local","Product":"PVC Edge Band 30mm × 0.80mm (50m roll)","Unit":"₹ per meter","Mumbai_Rate":"5.5","Delhi_Rate":"5","Hyderabad_Rate":"4.85","Gurgaon_Rate":"5","Bangalore_Rate":"5.3","Pune_Rate":"5.4"}'::jsonb
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
    'PVC Edge Band 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Delhi',
    5,
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
    4.85,
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
    5,
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
    5.3,
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
    5.4,
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
    'Local',
    6,
    '₹ per meter',
    'citywise_excel_2025',
    'edgebanding_citywise_rates_2025.xlsx',
    'EdgeBanding_CityWise_Rates',
    '{"Brand":"Local","Product":"PVC Edge Band 45mm × 0.80mm (50m roll)","Unit":"₹ per meter","Mumbai_Rate":"6.6","Delhi_Rate":"6","Hyderabad_Rate":"5.82","Gurgaon_Rate":"6","Bangalore_Rate":"6.3","Pune_Rate":"6.5"}'::jsonb
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
    6.6,
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
    6,
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
    5.82,
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
    6,
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
    6.3,
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
    6.5,
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
    'Local',
    4.5,
    '₹ per meter',
    'citywise_excel_2025',
    'edgebanding_citywise_rates_2025.xlsx',
    'EdgeBanding_CityWise_Rates',
    '{"Brand":"Local","Product":"Matt Finish 22mm × 0.80mm (50m roll)","Unit":"₹ per meter","Mumbai_Rate":"5","Delhi_Rate":"4.5","Hyderabad_Rate":"4.37","Gurgaon_Rate":"4.5","Bangalore_Rate":"4.7","Pune_Rate":"4.9"}'::jsonb
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
    5,
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
    4.5,
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
    4.37,
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
    4.5,
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
    4.7,
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
    4.9,
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
    'Local',
    5.5,
    '₹ per meter',
    'citywise_excel_2025',
    'edgebanding_citywise_rates_2025.xlsx',
    'EdgeBanding_CityWise_Rates',
    '{"Brand":"Local","Product":"Matt Finish 30mm × 0.80mm (50m roll)","Unit":"₹ per meter","Mumbai_Rate":"6.1","Delhi_Rate":"5.5","Hyderabad_Rate":"5.34","Gurgaon_Rate":"5.5","Bangalore_Rate":"5.8","Pune_Rate":"5.9"}'::jsonb
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
    'Matt Finish 30mm × 0.80mm (50m roll)',
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
    'Matt Finish 30mm × 0.80mm (50m roll)',
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
    'Matt Finish 30mm × 0.80mm (50m roll)',
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
    'Matt Finish 30mm × 0.80mm (50m roll)',
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
    'Matt Finish 30mm × 0.80mm (50m roll)',
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
    'Basic Color 22mm × 0.80mm (50m roll)',
    'edgebanding',
    NULL,
    NULL,
    'Local',
    4,
    '₹ per meter',
    'citywise_excel_2025',
    'edgebanding_citywise_rates_2025.xlsx',
    'EdgeBanding_CityWise_Rates',
    '{"Brand":"Local","Product":"Basic Color 22mm × 0.80mm (50m roll)","Unit":"₹ per meter","Mumbai_Rate":"4.4","Delhi_Rate":"4","Hyderabad_Rate":"3.88","Gurgaon_Rate":"4","Bangalore_Rate":"4.2","Pune_Rate":"4.3"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Basic Color 22mm × 0.80mm (50m roll)
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Basic Color 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Mumbai',
    4.4,
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
    'Basic Color 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Delhi',
    4,
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
    'Basic Color 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Hyderabad',
    3.88,
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
    'Basic Color 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Gurgaon',
    4,
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
    'Basic Color 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Bangalore',
    4.2,
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
    'Basic Color 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Pune',
    4.3,
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
    'Basic Color 30mm × 0.80mm (50m roll)',
    'edgebanding',
    NULL,
    NULL,
    'Local',
    5,
    '₹ per meter',
    'citywise_excel_2025',
    'edgebanding_citywise_rates_2025.xlsx',
    'EdgeBanding_CityWise_Rates',
    '{"Brand":"Local","Product":"Basic Color 30mm × 0.80mm (50m roll)","Unit":"₹ per meter","Mumbai_Rate":"5.5","Delhi_Rate":"5","Hyderabad_Rate":"4.85","Gurgaon_Rate":"5","Bangalore_Rate":"5.3","Pune_Rate":"5.4"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Basic Color 30mm × 0.80mm (50m roll)
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Basic Color 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Mumbai',
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
    'Basic Color 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Delhi',
    5,
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
    'Basic Color 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Hyderabad',
    4.85,
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
    'Basic Color 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Gurgaon',
    5,
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
    'Basic Color 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Bangalore',
    5.3,
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
    'Basic Color 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Pune',
    5.4,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

-- ========================================
-- Category: false_ceiling
-- Sheet: False Ceiling City Rates
-- Rows: 31
-- ========================================

-- ========================================
-- Category: floor_tiles_complete
-- Sheet: Floor Tiles Complete
-- Rows: 82
-- ========================================

-- ========================================
-- Category: electrical_lighting
-- Sheet: Electrical Materials Rates
-- Rows: 156
-- ========================================

-- ========================================
-- Category: handles
-- Sheet: Handles_CityWise_Rates
-- Rows: 84
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
    'SS Bar Handle 96mm (4")',
    'handles',
    NULL,
    NULL,
    'Häfele',
    220,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"Häfele","Product":"SS Bar Handle 96mm (4\")","Unit":"₹ per piece","Mumbai_Rate":"242","Delhi_Rate":"220","Hyderabad_Rate":"213","Gurgaon_Rate":"220","Bangalore_Rate":"231","Pune_Rate":"238"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: SS Bar Handle 96mm (4")
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'SS Bar Handle 96mm (4")',
    'handles',
    'Mumbai',
    242,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'SS Bar Handle 96mm (4")',
    'handles',
    'Delhi',
    220,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'SS Bar Handle 96mm (4")',
    'handles',
    'Hyderabad',
    213,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'SS Bar Handle 96mm (4")',
    'handles',
    'Gurgaon',
    220,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'SS Bar Handle 96mm (4")',
    'handles',
    'Bangalore',
    231,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'SS Bar Handle 96mm (4")',
    'handles',
    'Pune',
    238,
    'handles_citywise_rates_2025.xlsx'
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
    'SS Bar Handle 128mm (5")',
    'handles',
    NULL,
    NULL,
    'Häfele',
    250,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"Häfele","Product":"SS Bar Handle 128mm (5\")","Unit":"₹ per piece","Mumbai_Rate":"275","Delhi_Rate":"250","Hyderabad_Rate":"242","Gurgaon_Rate":"250","Bangalore_Rate":"262","Pune_Rate":"270"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: SS Bar Handle 128mm (5")
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'SS Bar Handle 128mm (5")',
    'handles',
    'Mumbai',
    275,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'SS Bar Handle 128mm (5")',
    'handles',
    'Delhi',
    250,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'SS Bar Handle 128mm (5")',
    'handles',
    'Hyderabad',
    242,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'SS Bar Handle 128mm (5")',
    'handles',
    'Gurgaon',
    250,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'SS Bar Handle 128mm (5")',
    'handles',
    'Bangalore',
    262,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'SS Bar Handle 128mm (5")',
    'handles',
    'Pune',
    270,
    'handles_citywise_rates_2025.xlsx'
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
    'SS Bar Handle 160mm (6")',
    'handles',
    NULL,
    NULL,
    'Häfele',
    280,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"Häfele","Product":"SS Bar Handle 160mm (6\")","Unit":"₹ per piece","Mumbai_Rate":"308","Delhi_Rate":"280","Hyderabad_Rate":"272","Gurgaon_Rate":"280","Bangalore_Rate":"294","Pune_Rate":"302"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: SS Bar Handle 160mm (6")
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'SS Bar Handle 160mm (6")',
    'handles',
    'Mumbai',
    308,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'SS Bar Handle 160mm (6")',
    'handles',
    'Delhi',
    280,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'SS Bar Handle 160mm (6")',
    'handles',
    'Hyderabad',
    272,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'SS Bar Handle 160mm (6")',
    'handles',
    'Gurgaon',
    280,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'SS Bar Handle 160mm (6")',
    'handles',
    'Bangalore',
    294,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'SS Bar Handle 160mm (6")',
    'handles',
    'Pune',
    302,
    'handles_citywise_rates_2025.xlsx'
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
    'SS Bar Handle 192mm (7.5")',
    'handles',
    NULL,
    NULL,
    'Häfele',
    320,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"Häfele","Product":"SS Bar Handle 192mm (7.5\")","Unit":"₹ per piece","Mumbai_Rate":"352","Delhi_Rate":"320","Hyderabad_Rate":"310","Gurgaon_Rate":"320","Bangalore_Rate":"336","Pune_Rate":"346"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: SS Bar Handle 192mm (7.5")
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'SS Bar Handle 192mm (7.5")',
    'handles',
    'Mumbai',
    352,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'SS Bar Handle 192mm (7.5")',
    'handles',
    'Delhi',
    320,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'SS Bar Handle 192mm (7.5")',
    'handles',
    'Hyderabad',
    310,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'SS Bar Handle 192mm (7.5")',
    'handles',
    'Gurgaon',
    320,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'SS Bar Handle 192mm (7.5")',
    'handles',
    'Bangalore',
    336,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'SS Bar Handle 192mm (7.5")',
    'handles',
    'Pune',
    346,
    'handles_citywise_rates_2025.xlsx'
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
    'Brass Bar Handle 96mm (4")',
    'handles',
    NULL,
    NULL,
    'Häfele',
    270,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"Häfele","Product":"Brass Bar Handle 96mm (4\")","Unit":"₹ per piece","Mumbai_Rate":"297","Delhi_Rate":"270","Hyderabad_Rate":"262","Gurgaon_Rate":"270","Bangalore_Rate":"284","Pune_Rate":"292"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Brass Bar Handle 96mm (4")
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Brass Bar Handle 96mm (4")',
    'handles',
    'Mumbai',
    297,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Brass Bar Handle 96mm (4")',
    'handles',
    'Delhi',
    270,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Brass Bar Handle 96mm (4")',
    'handles',
    'Hyderabad',
    262,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Brass Bar Handle 96mm (4")',
    'handles',
    'Gurgaon',
    270,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Brass Bar Handle 96mm (4")',
    'handles',
    'Bangalore',
    284,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Brass Bar Handle 96mm (4")',
    'handles',
    'Pune',
    292,
    'handles_citywise_rates_2025.xlsx'
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
    'Brass Bar Handle 128mm (5")',
    'handles',
    NULL,
    NULL,
    'Häfele',
    300,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"Häfele","Product":"Brass Bar Handle 128mm (5\")","Unit":"₹ per piece","Mumbai_Rate":"330","Delhi_Rate":"300","Hyderabad_Rate":"291","Gurgaon_Rate":"300","Bangalore_Rate":"315","Pune_Rate":"324"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Brass Bar Handle 128mm (5")
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Brass Bar Handle 128mm (5")',
    'handles',
    'Mumbai',
    330,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Brass Bar Handle 128mm (5")',
    'handles',
    'Delhi',
    300,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Brass Bar Handle 128mm (5")',
    'handles',
    'Hyderabad',
    291,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Brass Bar Handle 128mm (5")',
    'handles',
    'Gurgaon',
    300,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Brass Bar Handle 128mm (5")',
    'handles',
    'Bangalore',
    315,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Brass Bar Handle 128mm (5")',
    'handles',
    'Pune',
    324,
    'handles_citywise_rates_2025.xlsx'
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
    'Brass Bar Handle 160mm (6")',
    'handles',
    NULL,
    NULL,
    'Häfele',
    340,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"Häfele","Product":"Brass Bar Handle 160mm (6\")","Unit":"₹ per piece","Mumbai_Rate":"374","Delhi_Rate":"340","Hyderabad_Rate":"330","Gurgaon_Rate":"340","Bangalore_Rate":"357","Pune_Rate":"367"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Brass Bar Handle 160mm (6")
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Brass Bar Handle 160mm (6")',
    'handles',
    'Mumbai',
    374,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Brass Bar Handle 160mm (6")',
    'handles',
    'Delhi',
    340,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Brass Bar Handle 160mm (6")',
    'handles',
    'Hyderabad',
    330,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Brass Bar Handle 160mm (6")',
    'handles',
    'Gurgaon',
    340,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Brass Bar Handle 160mm (6")',
    'handles',
    'Bangalore',
    357,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Brass Bar Handle 160mm (6")',
    'handles',
    'Pune',
    367,
    'handles_citywise_rates_2025.xlsx'
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
    'Brass Bar Handle 192mm (7.5")',
    'handles',
    NULL,
    NULL,
    'Häfele',
    390,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"Häfele","Product":"Brass Bar Handle 192mm (7.5\")","Unit":"₹ per piece","Mumbai_Rate":"429","Delhi_Rate":"390","Hyderabad_Rate":"378","Gurgaon_Rate":"390","Bangalore_Rate":"410","Pune_Rate":"421"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Brass Bar Handle 192mm (7.5")
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Brass Bar Handle 192mm (7.5")',
    'handles',
    'Mumbai',
    429,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Brass Bar Handle 192mm (7.5")',
    'handles',
    'Delhi',
    390,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Brass Bar Handle 192mm (7.5")',
    'handles',
    'Hyderabad',
    378,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Brass Bar Handle 192mm (7.5")',
    'handles',
    'Gurgaon',
    390,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Brass Bar Handle 192mm (7.5")',
    'handles',
    'Bangalore',
    410,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Brass Bar Handle 192mm (7.5")',
    'handles',
    'Pune',
    421,
    'handles_citywise_rates_2025.xlsx'
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
    'Cup Pull Handle 64mm (2.5")',
    'handles',
    NULL,
    NULL,
    'Häfele',
    180,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"Häfele","Product":"Cup Pull Handle 64mm (2.5\")","Unit":"₹ per piece","Mumbai_Rate":"198","Delhi_Rate":"180","Hyderabad_Rate":"175","Gurgaon_Rate":"180","Bangalore_Rate":"189","Pune_Rate":"194"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Cup Pull Handle 64mm (2.5")
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Cup Pull Handle 64mm (2.5")',
    'handles',
    'Mumbai',
    198,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Cup Pull Handle 64mm (2.5")',
    'handles',
    'Delhi',
    180,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Cup Pull Handle 64mm (2.5")',
    'handles',
    'Hyderabad',
    175,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Cup Pull Handle 64mm (2.5")',
    'handles',
    'Gurgaon',
    180,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Cup Pull Handle 64mm (2.5")',
    'handles',
    'Bangalore',
    189,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Cup Pull Handle 64mm (2.5")',
    'handles',
    'Pune',
    194,
    'handles_citywise_rates_2025.xlsx'
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
    'Cup Pull Handle 96mm (4")',
    'handles',
    NULL,
    NULL,
    'Häfele',
    220,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"Häfele","Product":"Cup Pull Handle 96mm (4\")","Unit":"₹ per piece","Mumbai_Rate":"242","Delhi_Rate":"220","Hyderabad_Rate":"213","Gurgaon_Rate":"220","Bangalore_Rate":"231","Pune_Rate":"238"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Cup Pull Handle 96mm (4")
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Cup Pull Handle 96mm (4")',
    'handles',
    'Mumbai',
    242,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Cup Pull Handle 96mm (4")',
    'handles',
    'Delhi',
    220,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Cup Pull Handle 96mm (4")',
    'handles',
    'Hyderabad',
    213,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Cup Pull Handle 96mm (4")',
    'handles',
    'Gurgaon',
    220,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Cup Pull Handle 96mm (4")',
    'handles',
    'Bangalore',
    231,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Cup Pull Handle 96mm (4")',
    'handles',
    'Pune',
    238,
    'handles_citywise_rates_2025.xlsx'
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
    'Edge Pull Handle 96mm',
    'handles',
    NULL,
    NULL,
    'Häfele',
    200,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"Häfele","Product":"Edge Pull Handle 96mm","Unit":"₹ per piece","Mumbai_Rate":"220","Delhi_Rate":"200","Hyderabad_Rate":"194","Gurgaon_Rate":"200","Bangalore_Rate":"210","Pune_Rate":"216"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Edge Pull Handle 96mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Edge Pull Handle 96mm',
    'handles',
    'Mumbai',
    220,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Edge Pull Handle 96mm',
    'handles',
    'Delhi',
    200,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Edge Pull Handle 96mm',
    'handles',
    'Hyderabad',
    194,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Edge Pull Handle 96mm',
    'handles',
    'Gurgaon',
    200,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Edge Pull Handle 96mm',
    'handles',
    'Bangalore',
    210,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Edge Pull Handle 96mm',
    'handles',
    'Pune',
    216,
    'handles_citywise_rates_2025.xlsx'
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
    'Edge Pull Handle 128mm',
    'handles',
    NULL,
    NULL,
    'Häfele',
    230,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"Häfele","Product":"Edge Pull Handle 128mm","Unit":"₹ per piece","Mumbai_Rate":"253","Delhi_Rate":"230","Hyderabad_Rate":"223","Gurgaon_Rate":"230","Bangalore_Rate":"242","Pune_Rate":"248"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Edge Pull Handle 128mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Edge Pull Handle 128mm',
    'handles',
    'Mumbai',
    253,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Edge Pull Handle 128mm',
    'handles',
    'Delhi',
    230,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Edge Pull Handle 128mm',
    'handles',
    'Hyderabad',
    223,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Edge Pull Handle 128mm',
    'handles',
    'Gurgaon',
    230,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Edge Pull Handle 128mm',
    'handles',
    'Bangalore',
    242,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Edge Pull Handle 128mm',
    'handles',
    'Pune',
    248,
    'handles_citywise_rates_2025.xlsx'
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
    'Round Knob 25mm SS',
    'handles',
    NULL,
    NULL,
    'Häfele',
    80,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"Häfele","Product":"Round Knob 25mm SS","Unit":"₹ per piece","Mumbai_Rate":"88","Delhi_Rate":"80","Hyderabad_Rate":"78","Gurgaon_Rate":"80","Bangalore_Rate":"84","Pune_Rate":"86"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Round Knob 25mm SS
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Round Knob 25mm SS',
    'handles',
    'Mumbai',
    88,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Round Knob 25mm SS',
    'handles',
    'Delhi',
    80,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Round Knob 25mm SS',
    'handles',
    'Hyderabad',
    78,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Round Knob 25mm SS',
    'handles',
    'Gurgaon',
    80,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Round Knob 25mm SS',
    'handles',
    'Bangalore',
    84,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Round Knob 25mm SS',
    'handles',
    'Pune',
    86,
    'handles_citywise_rates_2025.xlsx'
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
    'Round Knob 32mm SS',
    'handles',
    NULL,
    NULL,
    'Häfele',
    100,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"Häfele","Product":"Round Knob 32mm SS","Unit":"₹ per piece","Mumbai_Rate":"110","Delhi_Rate":"100","Hyderabad_Rate":"97","Gurgaon_Rate":"100","Bangalore_Rate":"105","Pune_Rate":"108"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Round Knob 32mm SS
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Round Knob 32mm SS',
    'handles',
    'Mumbai',
    110,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Round Knob 32mm SS',
    'handles',
    'Delhi',
    100,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Round Knob 32mm SS',
    'handles',
    'Hyderabad',
    97,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Round Knob 32mm SS',
    'handles',
    'Gurgaon',
    100,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Round Knob 32mm SS',
    'handles',
    'Bangalore',
    105,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Round Knob 32mm SS',
    'handles',
    'Pune',
    108,
    'handles_citywise_rates_2025.xlsx'
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
    'D-Shape Handle 128mm',
    'handles',
    NULL,
    NULL,
    'Häfele',
    240,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"Häfele","Product":"D-Shape Handle 128mm","Unit":"₹ per piece","Mumbai_Rate":"264","Delhi_Rate":"240","Hyderabad_Rate":"233","Gurgaon_Rate":"240","Bangalore_Rate":"252","Pune_Rate":"259"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: D-Shape Handle 128mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'D-Shape Handle 128mm',
    'handles',
    'Mumbai',
    264,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'D-Shape Handle 128mm',
    'handles',
    'Delhi',
    240,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'D-Shape Handle 128mm',
    'handles',
    'Hyderabad',
    233,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'D-Shape Handle 128mm',
    'handles',
    'Gurgaon',
    240,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'D-Shape Handle 128mm',
    'handles',
    'Bangalore',
    252,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'D-Shape Handle 128mm',
    'handles',
    'Pune',
    259,
    'handles_citywise_rates_2025.xlsx'
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
    'Profile Handle 128mm',
    'handles',
    NULL,
    NULL,
    'Häfele',
    260,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"Häfele","Product":"Profile Handle 128mm","Unit":"₹ per piece","Mumbai_Rate":"286","Delhi_Rate":"260","Hyderabad_Rate":"252","Gurgaon_Rate":"260","Bangalore_Rate":"273","Pune_Rate":"281"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Profile Handle 128mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Profile Handle 128mm',
    'handles',
    'Mumbai',
    286,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Profile Handle 128mm',
    'handles',
    'Delhi',
    260,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Profile Handle 128mm',
    'handles',
    'Hyderabad',
    252,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Profile Handle 128mm',
    'handles',
    'Gurgaon',
    260,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Profile Handle 128mm',
    'handles',
    'Bangalore',
    273,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Profile Handle 128mm',
    'handles',
    'Pune',
    281,
    'handles_citywise_rates_2025.xlsx'
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
    'SS Bar Handle 96mm (4")',
    'handles',
    NULL,
    NULL,
    'Hettich',
    210,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"Hettich","Product":"SS Bar Handle 96mm (4\")","Unit":"₹ per piece","Mumbai_Rate":"231","Delhi_Rate":"210","Hyderabad_Rate":"204","Gurgaon_Rate":"210","Bangalore_Rate":"221","Pune_Rate":"227"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: SS Bar Handle 96mm (4")
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'SS Bar Handle 96mm (4")',
    'handles',
    'Mumbai',
    231,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'SS Bar Handle 96mm (4")',
    'handles',
    'Delhi',
    210,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'SS Bar Handle 96mm (4")',
    'handles',
    'Hyderabad',
    204,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'SS Bar Handle 96mm (4")',
    'handles',
    'Gurgaon',
    210,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'SS Bar Handle 96mm (4")',
    'handles',
    'Bangalore',
    221,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'SS Bar Handle 96mm (4")',
    'handles',
    'Pune',
    227,
    'handles_citywise_rates_2025.xlsx'
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
    'SS Bar Handle 128mm (5")',
    'handles',
    NULL,
    NULL,
    'Hettich',
    240,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"Hettich","Product":"SS Bar Handle 128mm (5\")","Unit":"₹ per piece","Mumbai_Rate":"264","Delhi_Rate":"240","Hyderabad_Rate":"233","Gurgaon_Rate":"240","Bangalore_Rate":"252","Pune_Rate":"259"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: SS Bar Handle 128mm (5")
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'SS Bar Handle 128mm (5")',
    'handles',
    'Mumbai',
    264,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'SS Bar Handle 128mm (5")',
    'handles',
    'Delhi',
    240,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'SS Bar Handle 128mm (5")',
    'handles',
    'Hyderabad',
    233,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'SS Bar Handle 128mm (5")',
    'handles',
    'Gurgaon',
    240,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'SS Bar Handle 128mm (5")',
    'handles',
    'Bangalore',
    252,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'SS Bar Handle 128mm (5")',
    'handles',
    'Pune',
    259,
    'handles_citywise_rates_2025.xlsx'
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
    'SS Bar Handle 160mm (6")',
    'handles',
    NULL,
    NULL,
    'Hettich',
    270,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"Hettich","Product":"SS Bar Handle 160mm (6\")","Unit":"₹ per piece","Mumbai_Rate":"297","Delhi_Rate":"270","Hyderabad_Rate":"262","Gurgaon_Rate":"270","Bangalore_Rate":"284","Pune_Rate":"292"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: SS Bar Handle 160mm (6")
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'SS Bar Handle 160mm (6")',
    'handles',
    'Mumbai',
    297,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'SS Bar Handle 160mm (6")',
    'handles',
    'Delhi',
    270,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'SS Bar Handle 160mm (6")',
    'handles',
    'Hyderabad',
    262,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'SS Bar Handle 160mm (6")',
    'handles',
    'Gurgaon',
    270,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'SS Bar Handle 160mm (6")',
    'handles',
    'Bangalore',
    284,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'SS Bar Handle 160mm (6")',
    'handles',
    'Pune',
    292,
    'handles_citywise_rates_2025.xlsx'
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
    'SS Bar Handle 192mm (7.5")',
    'handles',
    NULL,
    NULL,
    'Hettich',
    310,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"Hettich","Product":"SS Bar Handle 192mm (7.5\")","Unit":"₹ per piece","Mumbai_Rate":"341","Delhi_Rate":"310","Hyderabad_Rate":"301","Gurgaon_Rate":"310","Bangalore_Rate":"326","Pune_Rate":"335"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: SS Bar Handle 192mm (7.5")
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'SS Bar Handle 192mm (7.5")',
    'handles',
    'Mumbai',
    341,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'SS Bar Handle 192mm (7.5")',
    'handles',
    'Delhi',
    310,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'SS Bar Handle 192mm (7.5")',
    'handles',
    'Hyderabad',
    301,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'SS Bar Handle 192mm (7.5")',
    'handles',
    'Gurgaon',
    310,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'SS Bar Handle 192mm (7.5")',
    'handles',
    'Bangalore',
    326,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'SS Bar Handle 192mm (7.5")',
    'handles',
    'Pune',
    335,
    'handles_citywise_rates_2025.xlsx'
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
    'Aluminum Bar Handle 96mm (4")',
    'handles',
    NULL,
    NULL,
    'Hettich',
    250,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"Hettich","Product":"Aluminum Bar Handle 96mm (4\")","Unit":"₹ per piece","Mumbai_Rate":"275","Delhi_Rate":"250","Hyderabad_Rate":"242","Gurgaon_Rate":"250","Bangalore_Rate":"262","Pune_Rate":"270"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Aluminum Bar Handle 96mm (4")
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Aluminum Bar Handle 96mm (4")',
    'handles',
    'Mumbai',
    275,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Aluminum Bar Handle 96mm (4")',
    'handles',
    'Delhi',
    250,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Aluminum Bar Handle 96mm (4")',
    'handles',
    'Hyderabad',
    242,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Aluminum Bar Handle 96mm (4")',
    'handles',
    'Gurgaon',
    250,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Aluminum Bar Handle 96mm (4")',
    'handles',
    'Bangalore',
    262,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Aluminum Bar Handle 96mm (4")',
    'handles',
    'Pune',
    270,
    'handles_citywise_rates_2025.xlsx'
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
    'Aluminum Bar Handle 128mm (5")',
    'handles',
    NULL,
    NULL,
    'Hettich',
    280,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"Hettich","Product":"Aluminum Bar Handle 128mm (5\")","Unit":"₹ per piece","Mumbai_Rate":"308","Delhi_Rate":"280","Hyderabad_Rate":"272","Gurgaon_Rate":"280","Bangalore_Rate":"294","Pune_Rate":"302"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Aluminum Bar Handle 128mm (5")
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Aluminum Bar Handle 128mm (5")',
    'handles',
    'Mumbai',
    308,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Aluminum Bar Handle 128mm (5")',
    'handles',
    'Delhi',
    280,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Aluminum Bar Handle 128mm (5")',
    'handles',
    'Hyderabad',
    272,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Aluminum Bar Handle 128mm (5")',
    'handles',
    'Gurgaon',
    280,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Aluminum Bar Handle 128mm (5")',
    'handles',
    'Bangalore',
    294,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Aluminum Bar Handle 128mm (5")',
    'handles',
    'Pune',
    302,
    'handles_citywise_rates_2025.xlsx'
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
    'Aluminum Bar Handle 160mm (6")',
    'handles',
    NULL,
    NULL,
    'Hettich',
    320,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"Hettich","Product":"Aluminum Bar Handle 160mm (6\")","Unit":"₹ per piece","Mumbai_Rate":"352","Delhi_Rate":"320","Hyderabad_Rate":"310","Gurgaon_Rate":"320","Bangalore_Rate":"336","Pune_Rate":"346"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Aluminum Bar Handle 160mm (6")
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Aluminum Bar Handle 160mm (6")',
    'handles',
    'Mumbai',
    352,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Aluminum Bar Handle 160mm (6")',
    'handles',
    'Delhi',
    320,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Aluminum Bar Handle 160mm (6")',
    'handles',
    'Hyderabad',
    310,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Aluminum Bar Handle 160mm (6")',
    'handles',
    'Gurgaon',
    320,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Aluminum Bar Handle 160mm (6")',
    'handles',
    'Bangalore',
    336,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Aluminum Bar Handle 160mm (6")',
    'handles',
    'Pune',
    346,
    'handles_citywise_rates_2025.xlsx'
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
    'Aluminum Bar Handle 192mm (7.5")',
    'handles',
    NULL,
    NULL,
    'Hettich',
    360,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"Hettich","Product":"Aluminum Bar Handle 192mm (7.5\")","Unit":"₹ per piece","Mumbai_Rate":"396","Delhi_Rate":"360","Hyderabad_Rate":"349","Gurgaon_Rate":"360","Bangalore_Rate":"378","Pune_Rate":"389"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Aluminum Bar Handle 192mm (7.5")
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Aluminum Bar Handle 192mm (7.5")',
    'handles',
    'Mumbai',
    396,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Aluminum Bar Handle 192mm (7.5")',
    'handles',
    'Delhi',
    360,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Aluminum Bar Handle 192mm (7.5")',
    'handles',
    'Hyderabad',
    349,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Aluminum Bar Handle 192mm (7.5")',
    'handles',
    'Gurgaon',
    360,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Aluminum Bar Handle 192mm (7.5")',
    'handles',
    'Bangalore',
    378,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Aluminum Bar Handle 192mm (7.5")',
    'handles',
    'Pune',
    389,
    'handles_citywise_rates_2025.xlsx'
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
    'Cup Pull Handle 64mm (2.5")',
    'handles',
    NULL,
    NULL,
    'Hettich',
    170,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"Hettich","Product":"Cup Pull Handle 64mm (2.5\")","Unit":"₹ per piece","Mumbai_Rate":"187","Delhi_Rate":"170","Hyderabad_Rate":"165","Gurgaon_Rate":"170","Bangalore_Rate":"179","Pune_Rate":"184"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Cup Pull Handle 64mm (2.5")
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Cup Pull Handle 64mm (2.5")',
    'handles',
    'Mumbai',
    187,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Cup Pull Handle 64mm (2.5")',
    'handles',
    'Delhi',
    170,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
