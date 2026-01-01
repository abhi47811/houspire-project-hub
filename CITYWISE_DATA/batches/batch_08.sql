-- COMPREHENSIVE CITYWISE PRICING DATA IMPORT
-- Generated: 2026-01-01T12:27:08.554Z
-- Source: 27 Excel files with city-wise rates
-- Total Rows: 3710
-- Total Sheets: 110

-- ========================================
-- PART 1: PRICING ITEMS
-- ========================================


-- ========================================
-- BATCH 8 of 14
-- Lines: 35011 to 40010
-- ========================================

    'hardware_hinges_channels',
    'Bangalore',
    336,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Blumotion Soft-Close 110° Hinge',
    'hardware_hinges_channels',
    'Pune',
    346,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
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
    'Clip Top Regular 110° Hinge',
    'hardware_hinges_channels',
    NULL,
    NULL,
    'Blum',
    180,
    '₹ per piece',
    'citywise_excel_2025',
    'hardware_hinges_channels_citywise_rates_2025.xlsx',
    'Hardware_CityWise_Rates',
    '{"Brand":"Blum","Product":"Clip Top Regular 110° Hinge","Unit":"₹ per piece","Mumbai_Rate":"198","Delhi_Rate":"180","Hyderabad_Rate":"173","Gurgaon_Rate":"180","Bangalore_Rate":"189","Pune_Rate":"194"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Clip Top Regular 110° Hinge
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Clip Top Regular 110° Hinge',
    'hardware_hinges_channels',
    'Mumbai',
    198,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Clip Top Regular 110° Hinge',
    'hardware_hinges_channels',
    'Delhi',
    180,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Clip Top Regular 110° Hinge',
    'hardware_hinges_channels',
    'Hyderabad',
    173,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Clip Top Regular 110° Hinge',
    'hardware_hinges_channels',
    'Gurgaon',
    180,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Clip Top Regular 110° Hinge',
    'hardware_hinges_channels',
    'Bangalore',
    189,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Clip Top Regular 110° Hinge',
    'hardware_hinges_channels',
    'Pune',
    194,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
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
    'Blumotion Soft-Close 95° Hinge',
    'hardware_hinges_channels',
    NULL,
    NULL,
    'Blum',
    300,
    '₹ per piece',
    'citywise_excel_2025',
    'hardware_hinges_channels_citywise_rates_2025.xlsx',
    'Hardware_CityWise_Rates',
    '{"Brand":"Blum","Product":"Blumotion Soft-Close 95° Hinge","Unit":"₹ per piece","Mumbai_Rate":"330","Delhi_Rate":"300","Hyderabad_Rate":"290","Gurgaon_Rate":"300","Bangalore_Rate":"315","Pune_Rate":"324"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Blumotion Soft-Close 95° Hinge
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Blumotion Soft-Close 95° Hinge',
    'hardware_hinges_channels',
    'Mumbai',
    330,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Blumotion Soft-Close 95° Hinge',
    'hardware_hinges_channels',
    'Delhi',
    300,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Blumotion Soft-Close 95° Hinge',
    'hardware_hinges_channels',
    'Hyderabad',
    290,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Blumotion Soft-Close 95° Hinge',
    'hardware_hinges_channels',
    'Gurgaon',
    300,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Blumotion Soft-Close 95° Hinge',
    'hardware_hinges_channels',
    'Bangalore',
    315,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Blumotion Soft-Close 95° Hinge',
    'hardware_hinges_channels',
    'Pune',
    324,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
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
    'Clip Top Regular 95° Hinge',
    'hardware_hinges_channels',
    NULL,
    NULL,
    'Blum',
    160,
    '₹ per piece',
    'citywise_excel_2025',
    'hardware_hinges_channels_citywise_rates_2025.xlsx',
    'Hardware_CityWise_Rates',
    '{"Brand":"Blum","Product":"Clip Top Regular 95° Hinge","Unit":"₹ per piece","Mumbai_Rate":"176","Delhi_Rate":"160","Hyderabad_Rate":"154","Gurgaon_Rate":"160","Bangalore_Rate":"168","Pune_Rate":"173"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Clip Top Regular 95° Hinge
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Clip Top Regular 95° Hinge',
    'hardware_hinges_channels',
    'Mumbai',
    176,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Clip Top Regular 95° Hinge',
    'hardware_hinges_channels',
    'Delhi',
    160,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Clip Top Regular 95° Hinge',
    'hardware_hinges_channels',
    'Hyderabad',
    154,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Clip Top Regular 95° Hinge',
    'hardware_hinges_channels',
    'Gurgaon',
    160,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Clip Top Regular 95° Hinge',
    'hardware_hinges_channels',
    'Bangalore',
    168,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Clip Top Regular 95° Hinge',
    'hardware_hinges_channels',
    'Pune',
    173,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
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
    'Wide Angle 170° Soft-Close',
    'hardware_hinges_channels',
    NULL,
    NULL,
    'Blum',
    350,
    '₹ per piece',
    'citywise_excel_2025',
    'hardware_hinges_channels_citywise_rates_2025.xlsx',
    'Hardware_CityWise_Rates',
    '{"Brand":"Blum","Product":"Wide Angle 170° Soft-Close","Unit":"₹ per piece","Mumbai_Rate":"385","Delhi_Rate":"350","Hyderabad_Rate":"338","Gurgaon_Rate":"350","Bangalore_Rate":"368","Pune_Rate":"378"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Wide Angle 170° Soft-Close
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wide Angle 170° Soft-Close',
    'hardware_hinges_channels',
    'Mumbai',
    385,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wide Angle 170° Soft-Close',
    'hardware_hinges_channels',
    'Delhi',
    350,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wide Angle 170° Soft-Close',
    'hardware_hinges_channels',
    'Hyderabad',
    338,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wide Angle 170° Soft-Close',
    'hardware_hinges_channels',
    'Gurgaon',
    350,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wide Angle 170° Soft-Close',
    'hardware_hinges_channels',
    'Bangalore',
    368,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wide Angle 170° Soft-Close',
    'hardware_hinges_channels',
    'Pune',
    378,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
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
    'Wide Angle 170° Regular',
    'hardware_hinges_channels',
    NULL,
    NULL,
    'Blum',
    200,
    '₹ per piece',
    'citywise_excel_2025',
    'hardware_hinges_channels_citywise_rates_2025.xlsx',
    'Hardware_CityWise_Rates',
    '{"Brand":"Blum","Product":"Wide Angle 170° Regular","Unit":"₹ per piece","Mumbai_Rate":"220","Delhi_Rate":"200","Hyderabad_Rate":"193","Gurgaon_Rate":"200","Bangalore_Rate":"210","Pune_Rate":"216"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Wide Angle 170° Regular
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wide Angle 170° Regular',
    'hardware_hinges_channels',
    'Mumbai',
    220,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wide Angle 170° Regular',
    'hardware_hinges_channels',
    'Delhi',
    200,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wide Angle 170° Regular',
    'hardware_hinges_channels',
    'Hyderabad',
    193,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wide Angle 170° Regular',
    'hardware_hinges_channels',
    'Gurgaon',
    200,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wide Angle 170° Regular',
    'hardware_hinges_channels',
    'Bangalore',
    210,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wide Angle 170° Regular',
    'hardware_hinges_channels',
    'Pune',
    216,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
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
    'Soft-Close 110° Hinge',
    'hardware_hinges_channels',
    NULL,
    NULL,
    'Ebco',
    180,
    '₹ per piece',
    'citywise_excel_2025',
    'hardware_hinges_channels_citywise_rates_2025.xlsx',
    'Hardware_CityWise_Rates',
    '{"Brand":"Ebco","Product":"Soft-Close 110° Hinge","Unit":"₹ per piece","Mumbai_Rate":"198","Delhi_Rate":"180","Hyderabad_Rate":"173","Gurgaon_Rate":"180","Bangalore_Rate":"189","Pune_Rate":"194"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Soft-Close 110° Hinge
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Soft-Close 110° Hinge',
    'hardware_hinges_channels',
    'Mumbai',
    198,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Soft-Close 110° Hinge',
    'hardware_hinges_channels',
    'Delhi',
    180,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Soft-Close 110° Hinge',
    'hardware_hinges_channels',
    'Hyderabad',
    173,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Soft-Close 110° Hinge',
    'hardware_hinges_channels',
    'Gurgaon',
    180,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Soft-Close 110° Hinge',
    'hardware_hinges_channels',
    'Bangalore',
    189,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Soft-Close 110° Hinge',
    'hardware_hinges_channels',
    'Pune',
    194,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
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
    'Regular 110° Hinge',
    'hardware_hinges_channels',
    NULL,
    NULL,
    'Ebco',
    100,
    '₹ per piece',
    'citywise_excel_2025',
    'hardware_hinges_channels_citywise_rates_2025.xlsx',
    'Hardware_CityWise_Rates',
    '{"Brand":"Ebco","Product":"Regular 110° Hinge","Unit":"₹ per piece","Mumbai_Rate":"110","Delhi_Rate":"100","Hyderabad_Rate":"96","Gurgaon_Rate":"100","Bangalore_Rate":"105","Pune_Rate":"108"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Regular 110° Hinge
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Regular 110° Hinge',
    'hardware_hinges_channels',
    'Mumbai',
    110,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Regular 110° Hinge',
    'hardware_hinges_channels',
    'Delhi',
    100,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Regular 110° Hinge',
    'hardware_hinges_channels',
    'Hyderabad',
    96,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Regular 110° Hinge',
    'hardware_hinges_channels',
    'Gurgaon',
    100,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Regular 110° Hinge',
    'hardware_hinges_channels',
    'Bangalore',
    105,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Regular 110° Hinge',
    'hardware_hinges_channels',
    'Pune',
    108,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
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
    'Soft-Close 95° Hinge',
    'hardware_hinges_channels',
    NULL,
    NULL,
    'Ebco',
    160,
    '₹ per piece',
    'citywise_excel_2025',
    'hardware_hinges_channels_citywise_rates_2025.xlsx',
    'Hardware_CityWise_Rates',
    '{"Brand":"Ebco","Product":"Soft-Close 95° Hinge","Unit":"₹ per piece","Mumbai_Rate":"176","Delhi_Rate":"160","Hyderabad_Rate":"154","Gurgaon_Rate":"160","Bangalore_Rate":"168","Pune_Rate":"173"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Soft-Close 95° Hinge
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Soft-Close 95° Hinge',
    'hardware_hinges_channels',
    'Mumbai',
    176,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Soft-Close 95° Hinge',
    'hardware_hinges_channels',
    'Delhi',
    160,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Soft-Close 95° Hinge',
    'hardware_hinges_channels',
    'Hyderabad',
    154,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Soft-Close 95° Hinge',
    'hardware_hinges_channels',
    'Gurgaon',
    160,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Soft-Close 95° Hinge',
    'hardware_hinges_channels',
    'Bangalore',
    168,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Soft-Close 95° Hinge',
    'hardware_hinges_channels',
    'Pune',
    173,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
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
    'Regular 95° Hinge',
    'hardware_hinges_channels',
    NULL,
    NULL,
    'Ebco',
    90,
    '₹ per piece',
    'citywise_excel_2025',
    'hardware_hinges_channels_citywise_rates_2025.xlsx',
    'Hardware_CityWise_Rates',
    '{"Brand":"Ebco","Product":"Regular 95° Hinge","Unit":"₹ per piece","Mumbai_Rate":"99","Delhi_Rate":"90","Hyderabad_Rate":"87","Gurgaon_Rate":"90","Bangalore_Rate":"95","Pune_Rate":"97"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Regular 95° Hinge
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Regular 95° Hinge',
    'hardware_hinges_channels',
    'Mumbai',
    99,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Regular 95° Hinge',
    'hardware_hinges_channels',
    'Delhi',
    90,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Regular 95° Hinge',
    'hardware_hinges_channels',
    'Hyderabad',
    87,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Regular 95° Hinge',
    'hardware_hinges_channels',
    'Gurgaon',
    90,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Regular 95° Hinge',
    'hardware_hinges_channels',
    'Bangalore',
    95,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Regular 95° Hinge',
    'hardware_hinges_channels',
    'Pune',
    97,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
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
    'Wide Angle 165° Soft-Close',
    'hardware_hinges_channels',
    NULL,
    NULL,
    'Ebco',
    200,
    '₹ per piece',
    'citywise_excel_2025',
    'hardware_hinges_channels_citywise_rates_2025.xlsx',
    'Hardware_CityWise_Rates',
    '{"Brand":"Ebco","Product":"Wide Angle 165° Soft-Close","Unit":"₹ per piece","Mumbai_Rate":"220","Delhi_Rate":"200","Hyderabad_Rate":"193","Gurgaon_Rate":"200","Bangalore_Rate":"210","Pune_Rate":"216"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Wide Angle 165° Soft-Close
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wide Angle 165° Soft-Close',
    'hardware_hinges_channels',
    'Mumbai',
    220,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wide Angle 165° Soft-Close',
    'hardware_hinges_channels',
    'Delhi',
    200,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wide Angle 165° Soft-Close',
    'hardware_hinges_channels',
    'Hyderabad',
    193,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wide Angle 165° Soft-Close',
    'hardware_hinges_channels',
    'Gurgaon',
    200,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wide Angle 165° Soft-Close',
    'hardware_hinges_channels',
    'Bangalore',
    210,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wide Angle 165° Soft-Close',
    'hardware_hinges_channels',
    'Pune',
    216,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
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
    'Wide Angle 165° Regular',
    'hardware_hinges_channels',
    NULL,
    NULL,
    'Ebco',
    110,
    '₹ per piece',
    'citywise_excel_2025',
    'hardware_hinges_channels_citywise_rates_2025.xlsx',
    'Hardware_CityWise_Rates',
    '{"Brand":"Ebco","Product":"Wide Angle 165° Regular","Unit":"₹ per piece","Mumbai_Rate":"121","Delhi_Rate":"110","Hyderabad_Rate":"106","Gurgaon_Rate":"110","Bangalore_Rate":"116","Pune_Rate":"119"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Wide Angle 165° Regular
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wide Angle 165° Regular',
    'hardware_hinges_channels',
    'Mumbai',
    121,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wide Angle 165° Regular',
    'hardware_hinges_channels',
    'Delhi',
    110,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wide Angle 165° Regular',
    'hardware_hinges_channels',
    'Hyderabad',
    106,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wide Angle 165° Regular',
    'hardware_hinges_channels',
    'Gurgaon',
    110,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wide Angle 165° Regular',
    'hardware_hinges_channels',
    'Bangalore',
    116,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wide Angle 165° Regular',
    'hardware_hinges_channels',
    'Pune',
    119,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
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
    'Soft-Close 110° Hinge',
    'hardware_hinges_channels',
    NULL,
    NULL,
    'Ozone',
    130,
    '₹ per piece',
    'citywise_excel_2025',
    'hardware_hinges_channels_citywise_rates_2025.xlsx',
    'Hardware_CityWise_Rates',
    '{"Brand":"Ozone","Product":"Soft-Close 110° Hinge","Unit":"₹ per piece","Mumbai_Rate":"143","Delhi_Rate":"130","Hyderabad_Rate":"125","Gurgaon_Rate":"130","Bangalore_Rate":"137","Pune_Rate":"140"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Soft-Close 110° Hinge
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Soft-Close 110° Hinge',
    'hardware_hinges_channels',
    'Mumbai',
    143,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Soft-Close 110° Hinge',
    'hardware_hinges_channels',
    'Delhi',
    130,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Soft-Close 110° Hinge',
    'hardware_hinges_channels',
    'Hyderabad',
    125,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Soft-Close 110° Hinge',
    'hardware_hinges_channels',
    'Gurgaon',
    130,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Soft-Close 110° Hinge',
    'hardware_hinges_channels',
    'Bangalore',
    137,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Soft-Close 110° Hinge',
    'hardware_hinges_channels',
    'Pune',
    140,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
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
    'Regular 110° Hinge',
    'hardware_hinges_channels',
    NULL,
    NULL,
    'Ozone',
    70,
    '₹ per piece',
    'citywise_excel_2025',
    'hardware_hinges_channels_citywise_rates_2025.xlsx',
    'Hardware_CityWise_Rates',
    '{"Brand":"Ozone","Product":"Regular 110° Hinge","Unit":"₹ per piece","Mumbai_Rate":"77","Delhi_Rate":"70","Hyderabad_Rate":"67","Gurgaon_Rate":"70","Bangalore_Rate":"74","Pune_Rate":"76"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Regular 110° Hinge
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Regular 110° Hinge',
    'hardware_hinges_channels',
    'Mumbai',
    77,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Regular 110° Hinge',
    'hardware_hinges_channels',
    'Delhi',
    70,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Regular 110° Hinge',
    'hardware_hinges_channels',
    'Hyderabad',
    67,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Regular 110° Hinge',
    'hardware_hinges_channels',
    'Gurgaon',
    70,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Regular 110° Hinge',
    'hardware_hinges_channels',
    'Bangalore',
    74,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Regular 110° Hinge',
    'hardware_hinges_channels',
    'Pune',
    76,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
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
    'Soft-Close 95° Hinge',
    'hardware_hinges_channels',
    NULL,
    NULL,
    'Ozone',
    120,
    '₹ per piece',
    'citywise_excel_2025',
    'hardware_hinges_channels_citywise_rates_2025.xlsx',
    'Hardware_CityWise_Rates',
    '{"Brand":"Ozone","Product":"Soft-Close 95° Hinge","Unit":"₹ per piece","Mumbai_Rate":"132","Delhi_Rate":"120","Hyderabad_Rate":"116","Gurgaon_Rate":"120","Bangalore_Rate":"126","Pune_Rate":"130"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Soft-Close 95° Hinge
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Soft-Close 95° Hinge',
    'hardware_hinges_channels',
    'Mumbai',
    132,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Soft-Close 95° Hinge',
    'hardware_hinges_channels',
    'Delhi',
    120,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Soft-Close 95° Hinge',
    'hardware_hinges_channels',
    'Hyderabad',
    116,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Soft-Close 95° Hinge',
    'hardware_hinges_channels',
    'Gurgaon',
    120,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Soft-Close 95° Hinge',
    'hardware_hinges_channels',
    'Bangalore',
    126,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Soft-Close 95° Hinge',
    'hardware_hinges_channels',
    'Pune',
    130,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
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
    'Regular 95° Hinge',
    'hardware_hinges_channels',
    NULL,
    NULL,
    'Ozone',
    60,
    '₹ per piece',
    'citywise_excel_2025',
    'hardware_hinges_channels_citywise_rates_2025.xlsx',
    'Hardware_CityWise_Rates',
    '{"Brand":"Ozone","Product":"Regular 95° Hinge","Unit":"₹ per piece","Mumbai_Rate":"66","Delhi_Rate":"60","Hyderabad_Rate":"58","Gurgaon_Rate":"60","Bangalore_Rate":"63","Pune_Rate":"65"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Regular 95° Hinge
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Regular 95° Hinge',
    'hardware_hinges_channels',
    'Mumbai',
    66,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Regular 95° Hinge',
    'hardware_hinges_channels',
    'Delhi',
    60,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Regular 95° Hinge',
    'hardware_hinges_channels',
    'Hyderabad',
    58,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Regular 95° Hinge',
    'hardware_hinges_channels',
    'Gurgaon',
    60,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Regular 95° Hinge',
    'hardware_hinges_channels',
    'Bangalore',
    63,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Regular 95° Hinge',
    'hardware_hinges_channels',
    'Pune',
    65,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
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
    'InnoTech Full Ext Soft-Close 300mm',
    'hardware_hinges_channels',
    NULL,
    NULL,
    'Hettich',
    500,
    '₹ per piece',
    'citywise_excel_2025',
    'hardware_hinges_channels_citywise_rates_2025.xlsx',
    'Hardware_CityWise_Rates',
    '{"Brand":"Hettich","Product":"InnoTech Full Ext Soft-Close 300mm","Unit":"₹ per piece","Mumbai_Rate":"550","Delhi_Rate":"500","Hyderabad_Rate":"483","Gurgaon_Rate":"500","Bangalore_Rate":"525","Pune_Rate":"540"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: InnoTech Full Ext Soft-Close 300mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'InnoTech Full Ext Soft-Close 300mm',
    'hardware_hinges_channels',
    'Mumbai',
    550,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'InnoTech Full Ext Soft-Close 300mm',
    'hardware_hinges_channels',
    'Delhi',
    500,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'InnoTech Full Ext Soft-Close 300mm',
    'hardware_hinges_channels',
    'Hyderabad',
    483,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'InnoTech Full Ext Soft-Close 300mm',
    'hardware_hinges_channels',
    'Gurgaon',
    500,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'InnoTech Full Ext Soft-Close 300mm',
    'hardware_hinges_channels',
    'Bangalore',
    525,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'InnoTech Full Ext Soft-Close 300mm',
    'hardware_hinges_channels',
    'Pune',
    540,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
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
    'InnoTech Full Ext Soft-Close 450mm',
    'hardware_hinges_channels',
    NULL,
    NULL,
    'Hettich',
    700,
    '₹ per piece',
    'citywise_excel_2025',
    'hardware_hinges_channels_citywise_rates_2025.xlsx',
    'Hardware_CityWise_Rates',
    '{"Brand":"Hettich","Product":"InnoTech Full Ext Soft-Close 450mm","Unit":"₹ per piece","Mumbai_Rate":"770","Delhi_Rate":"700","Hyderabad_Rate":"676","Gurgaon_Rate":"700","Bangalore_Rate":"735","Pune_Rate":"756"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: InnoTech Full Ext Soft-Close 450mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'InnoTech Full Ext Soft-Close 450mm',
    'hardware_hinges_channels',
    'Mumbai',
    770,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'InnoTech Full Ext Soft-Close 450mm',
    'hardware_hinges_channels',
    'Delhi',
    700,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'InnoTech Full Ext Soft-Close 450mm',
    'hardware_hinges_channels',
    'Hyderabad',
    676,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'InnoTech Full Ext Soft-Close 450mm',
    'hardware_hinges_channels',
    'Gurgaon',
    700,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'InnoTech Full Ext Soft-Close 450mm',
    'hardware_hinges_channels',
    'Bangalore',
    735,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'InnoTech Full Ext Soft-Close 450mm',
    'hardware_hinges_channels',
    'Pune',
    756,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
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
    'InnoTech Full Ext Soft-Close 550mm',
    'hardware_hinges_channels',
    NULL,
    NULL,
    'Hettich',
    900,
    '₹ per piece',
    'citywise_excel_2025',
    'hardware_hinges_channels_citywise_rates_2025.xlsx',
    'Hardware_CityWise_Rates',
    '{"Brand":"Hettich","Product":"InnoTech Full Ext Soft-Close 550mm","Unit":"₹ per piece","Mumbai_Rate":"990","Delhi_Rate":"900","Hyderabad_Rate":"870","Gurgaon_Rate":"900","Bangalore_Rate":"945","Pune_Rate":"972"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: InnoTech Full Ext Soft-Close 550mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'InnoTech Full Ext Soft-Close 550mm',
    'hardware_hinges_channels',
    'Mumbai',
    990,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'InnoTech Full Ext Soft-Close 550mm',
    'hardware_hinges_channels',
    'Delhi',
    900,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'InnoTech Full Ext Soft-Close 550mm',
    'hardware_hinges_channels',
    'Hyderabad',
    870,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'InnoTech Full Ext Soft-Close 550mm',
    'hardware_hinges_channels',
    'Gurgaon',
    900,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'InnoTech Full Ext Soft-Close 550mm',
    'hardware_hinges_channels',
    'Bangalore',
    945,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'InnoTech Full Ext Soft-Close 550mm',
    'hardware_hinges_channels',
    'Pune',
    972,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
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
    'ArciTech Soft-Close 300mm',
    'hardware_hinges_channels',
    NULL,
    NULL,
    'Hettich',
    600,
    '₹ per piece',
    'citywise_excel_2025',
    'hardware_hinges_channels_citywise_rates_2025.xlsx',
    'Hardware_CityWise_Rates',
    '{"Brand":"Hettich","Product":"ArciTech Soft-Close 300mm","Unit":"₹ per piece","Mumbai_Rate":"660","Delhi_Rate":"600","Hyderabad_Rate":"580","Gurgaon_Rate":"600","Bangalore_Rate":"630","Pune_Rate":"648"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: ArciTech Soft-Close 300mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'ArciTech Soft-Close 300mm',
    'hardware_hinges_channels',
    'Mumbai',
    660,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'ArciTech Soft-Close 300mm',
    'hardware_hinges_channels',
    'Delhi',
    600,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'ArciTech Soft-Close 300mm',
    'hardware_hinges_channels',
    'Hyderabad',
    580,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'ArciTech Soft-Close 300mm',
    'hardware_hinges_channels',
    'Gurgaon',
    600,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'ArciTech Soft-Close 300mm',
    'hardware_hinges_channels',
    'Bangalore',
    630,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'ArciTech Soft-Close 300mm',
    'hardware_hinges_channels',
    'Pune',
    648,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
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
    'ArciTech Soft-Close 450mm',
    'hardware_hinges_channels',
    NULL,
    NULL,
    'Hettich',
    800,
    '₹ per piece',
    'citywise_excel_2025',
    'hardware_hinges_channels_citywise_rates_2025.xlsx',
    'Hardware_CityWise_Rates',
    '{"Brand":"Hettich","Product":"ArciTech Soft-Close 450mm","Unit":"₹ per piece","Mumbai_Rate":"880","Delhi_Rate":"800","Hyderabad_Rate":"773","Gurgaon_Rate":"800","Bangalore_Rate":"840","Pune_Rate":"864"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: ArciTech Soft-Close 450mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'ArciTech Soft-Close 450mm',
    'hardware_hinges_channels',
    'Mumbai',
    880,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'ArciTech Soft-Close 450mm',
    'hardware_hinges_channels',
    'Delhi',
    800,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'ArciTech Soft-Close 450mm',
    'hardware_hinges_channels',
    'Hyderabad',
    773,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'ArciTech Soft-Close 450mm',
    'hardware_hinges_channels',
    'Gurgaon',
    800,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'ArciTech Soft-Close 450mm',
    'hardware_hinges_channels',
    'Bangalore',
    840,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'ArciTech Soft-Close 450mm',
    'hardware_hinges_channels',
    'Pune',
    864,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
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
    'ArciTech Soft-Close 550mm',
    'hardware_hinges_channels',
    NULL,
    NULL,
    'Hettich',
    1000,
    '₹ per piece',
    'citywise_excel_2025',
    'hardware_hinges_channels_citywise_rates_2025.xlsx',
    'Hardware_CityWise_Rates',
    '{"Brand":"Hettich","Product":"ArciTech Soft-Close 550mm","Unit":"₹ per piece","Mumbai_Rate":"1100","Delhi_Rate":"1000","Hyderabad_Rate":"967","Gurgaon_Rate":"1000","Bangalore_Rate":"1050","Pune_Rate":"1080"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: ArciTech Soft-Close 550mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'ArciTech Soft-Close 550mm',
    'hardware_hinges_channels',
    'Mumbai',
    1100,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'ArciTech Soft-Close 550mm',
    'hardware_hinges_channels',
    'Delhi',
    1000,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'ArciTech Soft-Close 550mm',
    'hardware_hinges_channels',
    'Hyderabad',
    967,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'ArciTech Soft-Close 550mm',
    'hardware_hinges_channels',
    'Gurgaon',
    1000,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'ArciTech Soft-Close 550mm',
    'hardware_hinges_channels',
    'Bangalore',
    1050,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'ArciTech Soft-Close 550mm',
    'hardware_hinges_channels',
    'Pune',
    1080,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
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
    'Standard Full Extension 450mm',
    'hardware_hinges_channels',
    NULL,
    NULL,
    'Hettich',
    400,
    '₹ per piece',
    'citywise_excel_2025',
    'hardware_hinges_channels_citywise_rates_2025.xlsx',
    'Hardware_CityWise_Rates',
    '{"Brand":"Hettich","Product":"Standard Full Extension 450mm","Unit":"₹ per piece","Mumbai_Rate":"440","Delhi_Rate":"400","Hyderabad_Rate":"387","Gurgaon_Rate":"400","Bangalore_Rate":"420","Pune_Rate":"432"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Standard Full Extension 450mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Standard Full Extension 450mm',
    'hardware_hinges_channels',
    'Mumbai',
    440,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Standard Full Extension 450mm',
    'hardware_hinges_channels',
    'Delhi',
    400,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Standard Full Extension 450mm',
    'hardware_hinges_channels',
    'Hyderabad',
    387,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Standard Full Extension 450mm',
    'hardware_hinges_channels',
    'Gurgaon',
    400,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Standard Full Extension 450mm',
    'hardware_hinges_channels',
    'Bangalore',
    420,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Standard Full Extension 450mm',
    'hardware_hinges_channels',
    'Pune',
    432,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
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
    'Standard Full Extension 550mm',
    'hardware_hinges_channels',
    NULL,
    NULL,
    'Hettich',
    500,
    '₹ per piece',
    'citywise_excel_2025',
    'hardware_hinges_channels_citywise_rates_2025.xlsx',
    'Hardware_CityWise_Rates',
    '{"Brand":"Hettich","Product":"Standard Full Extension 550mm","Unit":"₹ per piece","Mumbai_Rate":"550","Delhi_Rate":"500","Hyderabad_Rate":"483","Gurgaon_Rate":"500","Bangalore_Rate":"525","Pune_Rate":"540"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Standard Full Extension 550mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Standard Full Extension 550mm',
    'hardware_hinges_channels',
    'Mumbai',
    550,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Standard Full Extension 550mm',
    'hardware_hinges_channels',
    'Delhi',
    500,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Standard Full Extension 550mm',
    'hardware_hinges_channels',
    'Hyderabad',
    483,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Standard Full Extension 550mm',
    'hardware_hinges_channels',
    'Gurgaon',
    500,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Standard Full Extension 550mm',
    'hardware_hinges_channels',
    'Bangalore',
    525,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Standard Full Extension 550mm',
    'hardware_hinges_channels',
    'Pune',
    540,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
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
    'Full Extension Soft-Close 300mm',
    'hardware_hinges_channels',
    NULL,
    NULL,
    'Häfele',
    480,
    '₹ per piece',
    'citywise_excel_2025',
    'hardware_hinges_channels_citywise_rates_2025.xlsx',
    'Hardware_CityWise_Rates',
    '{"Brand":"Häfele","Product":"Full Extension Soft-Close 300mm","Unit":"₹ per piece","Mumbai_Rate":"528","Delhi_Rate":"480","Hyderabad_Rate":"463","Gurgaon_Rate":"480","Bangalore_Rate":"504","Pune_Rate":"518"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Full Extension Soft-Close 300mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Full Extension Soft-Close 300mm',
    'hardware_hinges_channels',
    'Mumbai',
    528,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Full Extension Soft-Close 300mm',
    'hardware_hinges_channels',
    'Delhi',
    480,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Full Extension Soft-Close 300mm',
    'hardware_hinges_channels',
    'Hyderabad',
    463,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Full Extension Soft-Close 300mm',
    'hardware_hinges_channels',
    'Gurgaon',
    480,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Full Extension Soft-Close 300mm',
    'hardware_hinges_channels',
    'Bangalore',
    504,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Full Extension Soft-Close 300mm',
    'hardware_hinges_channels',
    'Pune',
    518,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
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
    'Full Extension Soft-Close 450mm',
    'hardware_hinges_channels',
    NULL,
    NULL,
    'Häfele',
    680,
    '₹ per piece',
    'citywise_excel_2025',
    'hardware_hinges_channels_citywise_rates_2025.xlsx',
    'Hardware_CityWise_Rates',
    '{"Brand":"Häfele","Product":"Full Extension Soft-Close 450mm","Unit":"₹ per piece","Mumbai_Rate":"748","Delhi_Rate":"680","Hyderabad_Rate":"657","Gurgaon_Rate":"680","Bangalore_Rate":"714","Pune_Rate":"734"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Full Extension Soft-Close 450mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Full Extension Soft-Close 450mm',
    'hardware_hinges_channels',
    'Mumbai',
    748,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Full Extension Soft-Close 450mm',
    'hardware_hinges_channels',
    'Delhi',
    680,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Full Extension Soft-Close 450mm',
    'hardware_hinges_channels',
    'Hyderabad',
    657,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Full Extension Soft-Close 450mm',
    'hardware_hinges_channels',
    'Gurgaon',
    680,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Full Extension Soft-Close 450mm',
    'hardware_hinges_channels',
    'Bangalore',
    714,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Full Extension Soft-Close 450mm',
    'hardware_hinges_channels',
    'Pune',
    734,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
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
    'Full Extension Soft-Close 550mm',
    'hardware_hinges_channels',
    NULL,
    NULL,
    'Häfele',
    880,
    '₹ per piece',
    'citywise_excel_2025',
    'hardware_hinges_channels_citywise_rates_2025.xlsx',
    'Hardware_CityWise_Rates',
    '{"Brand":"Häfele","Product":"Full Extension Soft-Close 550mm","Unit":"₹ per piece","Mumbai_Rate":"968","Delhi_Rate":"880","Hyderabad_Rate":"850","Gurgaon_Rate":"880","Bangalore_Rate":"924","Pune_Rate":"950"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Full Extension Soft-Close 550mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Full Extension Soft-Close 550mm',
    'hardware_hinges_channels',
    'Mumbai',
    968,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Full Extension Soft-Close 550mm',
    'hardware_hinges_channels',
    'Delhi',
    880,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Full Extension Soft-Close 550mm',
    'hardware_hinges_channels',
    'Hyderabad',
    850,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Full Extension Soft-Close 550mm',
    'hardware_hinges_channels',
    'Gurgaon',
    880,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Full Extension Soft-Close 550mm',
    'hardware_hinges_channels',
    'Bangalore',
    924,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Full Extension Soft-Close 550mm',
    'hardware_hinges_channels',
    'Pune',
    950,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
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
    'Quadro Soft-Close 300mm',
    'hardware_hinges_channels',
    NULL,
    NULL,
    'Häfele',
    580,
    '₹ per piece',
    'citywise_excel_2025',
    'hardware_hinges_channels_citywise_rates_2025.xlsx',
    'Hardware_CityWise_Rates',
    '{"Brand":"Häfele","Product":"Quadro Soft-Close 300mm","Unit":"₹ per piece","Mumbai_Rate":"638","Delhi_Rate":"580","Hyderabad_Rate":"560","Gurgaon_Rate":"580","Bangalore_Rate":"609","Pune_Rate":"626"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Quadro Soft-Close 300mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Quadro Soft-Close 300mm',
    'hardware_hinges_channels',
    'Mumbai',
    638,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Quadro Soft-Close 300mm',
    'hardware_hinges_channels',
    'Delhi',
    580,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Quadro Soft-Close 300mm',
    'hardware_hinges_channels',
    'Hyderabad',
    560,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Quadro Soft-Close 300mm',
    'hardware_hinges_channels',
    'Gurgaon',
    580,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Quadro Soft-Close 300mm',
    'hardware_hinges_channels',
    'Bangalore',
    609,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Quadro Soft-Close 300mm',
    'hardware_hinges_channels',
    'Pune',
    626,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
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
    'Quadro Soft-Close 450mm',
    'hardware_hinges_channels',
    NULL,
    NULL,
    'Häfele',
    780,
    '₹ per piece',
    'citywise_excel_2025',
    'hardware_hinges_channels_citywise_rates_2025.xlsx',
    'Hardware_CityWise_Rates',
    '{"Brand":"Häfele","Product":"Quadro Soft-Close 450mm","Unit":"₹ per piece","Mumbai_Rate":"858","Delhi_Rate":"780","Hyderabad_Rate":"754","Gurgaon_Rate":"780","Bangalore_Rate":"819","Pune_Rate":"842"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Quadro Soft-Close 450mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Quadro Soft-Close 450mm',
    'hardware_hinges_channels',
    'Mumbai',
    858,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Quadro Soft-Close 450mm',
    'hardware_hinges_channels',
    'Delhi',
    780,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Quadro Soft-Close 450mm',
    'hardware_hinges_channels',
    'Hyderabad',
    754,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Quadro Soft-Close 450mm',
    'hardware_hinges_channels',
    'Gurgaon',
    780,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Quadro Soft-Close 450mm',
    'hardware_hinges_channels',
    'Bangalore',
    819,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Quadro Soft-Close 450mm',
    'hardware_hinges_channels',
    'Pune',
    842,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
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
    'Quadro Soft-Close 550mm',
    'hardware_hinges_channels',
    NULL,
    NULL,
    'Häfele',
    980,
    '₹ per piece',
    'citywise_excel_2025',
    'hardware_hinges_channels_citywise_rates_2025.xlsx',
    'Hardware_CityWise_Rates',
    '{"Brand":"Häfele","Product":"Quadro Soft-Close 550mm","Unit":"₹ per piece","Mumbai_Rate":"1078","Delhi_Rate":"980","Hyderabad_Rate":"947","Gurgaon_Rate":"980","Bangalore_Rate":"1029","Pune_Rate":"1058"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Quadro Soft-Close 550mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Quadro Soft-Close 550mm',
    'hardware_hinges_channels',
    'Mumbai',
    1078,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Quadro Soft-Close 550mm',
    'hardware_hinges_channels',
    'Delhi',
    980,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Quadro Soft-Close 550mm',
    'hardware_hinges_channels',
    'Hyderabad',
    947,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Quadro Soft-Close 550mm',
    'hardware_hinges_channels',
    'Gurgaon',
    980,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Quadro Soft-Close 550mm',
    'hardware_hinges_channels',
    'Bangalore',
    1029,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Quadro Soft-Close 550mm',
    'hardware_hinges_channels',
    'Pune',
    1058,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
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
    'Standard Full Extension 450mm',
    'hardware_hinges_channels',
    NULL,
    NULL,
    'Häfele',
    380,
    '₹ per piece',
    'citywise_excel_2025',
    'hardware_hinges_channels_citywise_rates_2025.xlsx',
    'Hardware_CityWise_Rates',
    '{"Brand":"Häfele","Product":"Standard Full Extension 450mm","Unit":"₹ per piece","Mumbai_Rate":"418","Delhi_Rate":"380","Hyderabad_Rate":"367","Gurgaon_Rate":"380","Bangalore_Rate":"399","Pune_Rate":"410"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Standard Full Extension 450mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Standard Full Extension 450mm',
    'hardware_hinges_channels',
    'Mumbai',
    418,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Standard Full Extension 450mm',
    'hardware_hinges_channels',
    'Delhi',
    380,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Standard Full Extension 450mm',
    'hardware_hinges_channels',
    'Hyderabad',
    367,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Standard Full Extension 450mm',
    'hardware_hinges_channels',
    'Gurgaon',
    380,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Standard Full Extension 450mm',
    'hardware_hinges_channels',
    'Bangalore',
    399,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Standard Full Extension 450mm',
    'hardware_hinges_channels',
    'Pune',
    410,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
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
    'Standard Full Extension 550mm',
    'hardware_hinges_channels',
    NULL,
    NULL,
    'Häfele',
    480,
    '₹ per piece',
    'citywise_excel_2025',
    'hardware_hinges_channels_citywise_rates_2025.xlsx',
    'Hardware_CityWise_Rates',
    '{"Brand":"Häfele","Product":"Standard Full Extension 550mm","Unit":"₹ per piece","Mumbai_Rate":"528","Delhi_Rate":"480","Hyderabad_Rate":"463","Gurgaon_Rate":"480","Bangalore_Rate":"504","Pune_Rate":"518"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Standard Full Extension 550mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Standard Full Extension 550mm',
    'hardware_hinges_channels',
    'Mumbai',
    528,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Standard Full Extension 550mm',
    'hardware_hinges_channels',
    'Delhi',
    480,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Standard Full Extension 550mm',
    'hardware_hinges_channels',
    'Hyderabad',
    463,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Standard Full Extension 550mm',
    'hardware_hinges_channels',
    'Gurgaon',
    480,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Standard Full Extension 550mm',
    'hardware_hinges_channels',
    'Bangalore',
    504,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Standard Full Extension 550mm',
    'hardware_hinges_channels',
    'Pune',
    518,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
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
    'Tandem Blumotion 300mm',
    'hardware_hinges_channels',
    NULL,
    NULL,
    'Blum',
    700,
    '₹ per piece',
    'citywise_excel_2025',
    'hardware_hinges_channels_citywise_rates_2025.xlsx',
    'Hardware_CityWise_Rates',
    '{"Brand":"Blum","Product":"Tandem Blumotion 300mm","Unit":"₹ per piece","Mumbai_Rate":"770","Delhi_Rate":"700","Hyderabad_Rate":"676","Gurgaon_Rate":"700","Bangalore_Rate":"735","Pune_Rate":"756"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Tandem Blumotion 300mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Tandem Blumotion 300mm',
    'hardware_hinges_channels',
    'Mumbai',
    770,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Tandem Blumotion 300mm',
    'hardware_hinges_channels',
    'Delhi',
    700,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Tandem Blumotion 300mm',
    'hardware_hinges_channels',
    'Hyderabad',
    676,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Tandem Blumotion 300mm',
    'hardware_hinges_channels',
    'Gurgaon',
    700,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Tandem Blumotion 300mm',
    'hardware_hinges_channels',
    'Bangalore',
    735,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Tandem Blumotion 300mm',
    'hardware_hinges_channels',
    'Pune',
    756,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
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
    'Tandem Blumotion 450mm',
    'hardware_hinges_channels',
    NULL,
    NULL,
    'Blum',
    1000,
    '₹ per piece',
    'citywise_excel_2025',
    'hardware_hinges_channels_citywise_rates_2025.xlsx',
    'Hardware_CityWise_Rates',
    '{"Brand":"Blum","Product":"Tandem Blumotion 450mm","Unit":"₹ per piece","Mumbai_Rate":"1100","Delhi_Rate":"1000","Hyderabad_Rate":"967","Gurgaon_Rate":"1000","Bangalore_Rate":"1050","Pune_Rate":"1080"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Tandem Blumotion 450mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Tandem Blumotion 450mm',
    'hardware_hinges_channels',
    'Mumbai',
    1100,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Tandem Blumotion 450mm',
    'hardware_hinges_channels',
    'Delhi',
    1000,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Tandem Blumotion 450mm',
    'hardware_hinges_channels',
    'Hyderabad',
    967,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Tandem Blumotion 450mm',
    'hardware_hinges_channels',
    'Gurgaon',
    1000,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Tandem Blumotion 450mm',
    'hardware_hinges_channels',
    'Bangalore',
    1050,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Tandem Blumotion 450mm',
    'hardware_hinges_channels',
    'Pune',
    1080,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
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
    'Tandem Blumotion 550mm',
    'hardware_hinges_channels',
    NULL,
    NULL,
    'Blum',
    1300,
    '₹ per piece',
    'citywise_excel_2025',
    'hardware_hinges_channels_citywise_rates_2025.xlsx',
    'Hardware_CityWise_Rates',
    '{"Brand":"Blum","Product":"Tandem Blumotion 550mm","Unit":"₹ per piece","Mumbai_Rate":"1430","Delhi_Rate":"1300","Hyderabad_Rate":"1257","Gurgaon_Rate":"1300","Bangalore_Rate":"1365","Pune_Rate":"1404"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Tandem Blumotion 550mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Tandem Blumotion 550mm',
    'hardware_hinges_channels',
    'Mumbai',
    1430,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Tandem Blumotion 550mm',
    'hardware_hinges_channels',
    'Delhi',
    1300,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Tandem Blumotion 550mm',
    'hardware_hinges_channels',
    'Hyderabad',
    1257,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Tandem Blumotion 550mm',
    'hardware_hinges_channels',
    'Gurgaon',
    1300,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Tandem Blumotion 550mm',
    'hardware_hinges_channels',
    'Bangalore',
    1365,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Tandem Blumotion 550mm',
    'hardware_hinges_channels',
    'Pune',
    1404,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
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
    'Movento Soft-Close 300mm',
    'hardware_hinges_channels',
    NULL,
    NULL,
    'Blum',
    800,
    '₹ per piece',
    'citywise_excel_2025',
    'hardware_hinges_channels_citywise_rates_2025.xlsx',
    'Hardware_CityWise_Rates',
    '{"Brand":"Blum","Product":"Movento Soft-Close 300mm","Unit":"₹ per piece","Mumbai_Rate":"880","Delhi_Rate":"800","Hyderabad_Rate":"773","Gurgaon_Rate":"800","Bangalore_Rate":"840","Pune_Rate":"864"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Movento Soft-Close 300mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Movento Soft-Close 300mm',
    'hardware_hinges_channels',
    'Mumbai',
    880,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Movento Soft-Close 300mm',
    'hardware_hinges_channels',
    'Delhi',
    800,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Movento Soft-Close 300mm',
    'hardware_hinges_channels',
    'Hyderabad',
    773,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Movento Soft-Close 300mm',
    'hardware_hinges_channels',
    'Gurgaon',
    800,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Movento Soft-Close 300mm',
    'hardware_hinges_channels',
    'Bangalore',
    840,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Movento Soft-Close 300mm',
    'hardware_hinges_channels',
    'Pune',
    864,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
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
    'Movento Soft-Close 450mm',
    'hardware_hinges_channels',
    NULL,
    NULL,
    'Blum',
    1100,
    '₹ per piece',
    'citywise_excel_2025',
    'hardware_hinges_channels_citywise_rates_2025.xlsx',
    'Hardware_CityWise_Rates',
    '{"Brand":"Blum","Product":"Movento Soft-Close 450mm","Unit":"₹ per piece","Mumbai_Rate":"1210","Delhi_Rate":"1100","Hyderabad_Rate":"1063","Gurgaon_Rate":"1100","Bangalore_Rate":"1155","Pune_Rate":"1188"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Movento Soft-Close 450mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Movento Soft-Close 450mm',
    'hardware_hinges_channels',
    'Mumbai',
    1210,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Movento Soft-Close 450mm',
    'hardware_hinges_channels',
    'Delhi',
    1100,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Movento Soft-Close 450mm',
    'hardware_hinges_channels',
    'Hyderabad',
    1063,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Movento Soft-Close 450mm',
    'hardware_hinges_channels',
    'Gurgaon',
    1100,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Movento Soft-Close 450mm',
    'hardware_hinges_channels',
    'Bangalore',
    1155,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Movento Soft-Close 450mm',
    'hardware_hinges_channels',
    'Pune',
    1188,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
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
    'Movento Soft-Close 550mm',
    'hardware_hinges_channels',
    NULL,
    NULL,
    'Blum',
    1400,
    '₹ per piece',
    'citywise_excel_2025',
    'hardware_hinges_channels_citywise_rates_2025.xlsx',
    'Hardware_CityWise_Rates',
    '{"Brand":"Blum","Product":"Movento Soft-Close 550mm","Unit":"₹ per piece","Mumbai_Rate":"1540","Delhi_Rate":"1400","Hyderabad_Rate":"1353","Gurgaon_Rate":"1400","Bangalore_Rate":"1470","Pune_Rate":"1512"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Movento Soft-Close 550mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Movento Soft-Close 550mm',
    'hardware_hinges_channels',
    'Mumbai',
    1540,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Movento Soft-Close 550mm',
    'hardware_hinges_channels',
    'Delhi',
    1400,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Movento Soft-Close 550mm',
    'hardware_hinges_channels',
    'Hyderabad',
    1353,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Movento Soft-Close 550mm',
    'hardware_hinges_channels',
    'Gurgaon',
    1400,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Movento Soft-Close 550mm',
    'hardware_hinges_channels',
    'Bangalore',
    1470,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Movento Soft-Close 550mm',
    'hardware_hinges_channels',
    'Pune',
    1512,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
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
    'Soft-Close Full Extension 300mm',
    'hardware_hinges_channels',
    NULL,
    NULL,
    'Ebco',
    320,
    '₹ per piece',
    'citywise_excel_2025',
    'hardware_hinges_channels_citywise_rates_2025.xlsx',
    'Hardware_CityWise_Rates',
    '{"Brand":"Ebco","Product":"Soft-Close Full Extension 300mm","Unit":"₹ per piece","Mumbai_Rate":"352","Delhi_Rate":"320","Hyderabad_Rate":"309","Gurgaon_Rate":"320","Bangalore_Rate":"336","Pune_Rate":"346"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Soft-Close Full Extension 300mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Soft-Close Full Extension 300mm',
    'hardware_hinges_channels',
    'Mumbai',
    352,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Soft-Close Full Extension 300mm',
    'hardware_hinges_channels',
    'Delhi',
    320,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Soft-Close Full Extension 300mm',
    'hardware_hinges_channels',
    'Hyderabad',
    309,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Soft-Close Full Extension 300mm',
    'hardware_hinges_channels',
    'Gurgaon',
    320,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Soft-Close Full Extension 300mm',
    'hardware_hinges_channels',
    'Bangalore',
    336,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Soft-Close Full Extension 300mm',
    'hardware_hinges_channels',
    'Pune',
    346,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
