-- COMPREHENSIVE CITYWISE PRICING DATA IMPORT
-- Generated: 2026-01-01T12:27:08.554Z
-- Source: 27 Excel files with city-wise rates
-- Total Rows: 3710
-- Total Sheets: 110

-- ========================================
-- PART 1: PRICING ITEMS
-- ========================================


-- ========================================
-- BATCH 10 of 14
-- Lines: 45011 to 50010
-- ========================================

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
    'High Gloss 1.0mm',
    'laminates',
    NULL,
    NULL,
    'Greenlam',
    2000,
    '₹ per sheet (8x4 ft)',
    'citywise_excel_2025',
    'laminates_citywise_rates_2025.xlsx',
    'Laminates_CityWise_Rates',
    '{"Brand":"Greenlam","Product":"High Gloss 1.0mm","Unit":"₹ per sheet (8x4 ft)","Mumbai_Rate":"2200","Delhi_Rate":"2000","Hyderabad_Rate":"1950","Gurgaon_Rate":"2000","Bangalore_Rate":"2100","Pune_Rate":"2160"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: High Gloss 1.0mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'High Gloss 1.0mm',
    'laminates',
    'Mumbai',
    2200,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'High Gloss 1.0mm',
    'laminates',
    'Delhi',
    2000,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'High Gloss 1.0mm',
    'laminates',
    'Hyderabad',
    1950,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'High Gloss 1.0mm',
    'laminates',
    'Gurgaon',
    2000,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'High Gloss 1.0mm',
    'laminates',
    'Bangalore',
    2100,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'High Gloss 1.0mm',
    'laminates',
    'Pune',
    2160,
    'laminates_citywise_rates_2025.xlsx'
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
    'Suede 0.8mm',
    'laminates',
    NULL,
    NULL,
    'Greenlam',
    1600,
    '₹ per sheet (8x4 ft)',
    'citywise_excel_2025',
    'laminates_citywise_rates_2025.xlsx',
    'Laminates_CityWise_Rates',
    '{"Brand":"Greenlam","Product":"Suede 0.8mm","Unit":"₹ per sheet (8x4 ft)","Mumbai_Rate":"1760","Delhi_Rate":"1600","Hyderabad_Rate":"1550","Gurgaon_Rate":"1600","Bangalore_Rate":"1680","Pune_Rate":"1728"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Suede 0.8mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Suede 0.8mm',
    'laminates',
    'Mumbai',
    1760,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Suede 0.8mm',
    'laminates',
    'Delhi',
    1600,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Suede 0.8mm',
    'laminates',
    'Hyderabad',
    1550,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Suede 0.8mm',
    'laminates',
    'Gurgaon',
    1600,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Suede 0.8mm',
    'laminates',
    'Bangalore',
    1680,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Suede 0.8mm',
    'laminates',
    'Pune',
    1728,
    'laminates_citywise_rates_2025.xlsx'
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
    'Suede 1.0mm',
    'laminates',
    NULL,
    NULL,
    'Greenlam',
    1700,
    '₹ per sheet (8x4 ft)',
    'citywise_excel_2025',
    'laminates_citywise_rates_2025.xlsx',
    'Laminates_CityWise_Rates',
    '{"Brand":"Greenlam","Product":"Suede 1.0mm","Unit":"₹ per sheet (8x4 ft)","Mumbai_Rate":"1870","Delhi_Rate":"1700","Hyderabad_Rate":"1650","Gurgaon_Rate":"1700","Bangalore_Rate":"1785","Pune_Rate":"1836"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Suede 1.0mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Suede 1.0mm',
    'laminates',
    'Mumbai',
    1870,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Suede 1.0mm',
    'laminates',
    'Delhi',
    1700,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Suede 1.0mm',
    'laminates',
    'Hyderabad',
    1650,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Suede 1.0mm',
    'laminates',
    'Gurgaon',
    1700,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Suede 1.0mm',
    'laminates',
    'Bangalore',
    1785,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Suede 1.0mm',
    'laminates',
    'Pune',
    1836,
    'laminates_citywise_rates_2025.xlsx'
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
    'Metallic 1.0mm',
    'laminates',
    NULL,
    NULL,
    'Greenlam',
    2100,
    '₹ per sheet (8x4 ft)',
    'citywise_excel_2025',
    'laminates_citywise_rates_2025.xlsx',
    'Laminates_CityWise_Rates',
    '{"Brand":"Greenlam","Product":"Metallic 1.0mm","Unit":"₹ per sheet (8x4 ft)","Mumbai_Rate":"2310","Delhi_Rate":"2100","Hyderabad_Rate":"2050","Gurgaon_Rate":"2100","Bangalore_Rate":"2205","Pune_Rate":"2268"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Metallic 1.0mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Metallic 1.0mm',
    'laminates',
    'Mumbai',
    2310,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Metallic 1.0mm',
    'laminates',
    'Delhi',
    2100,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Metallic 1.0mm',
    'laminates',
    'Hyderabad',
    2050,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Metallic 1.0mm',
    'laminates',
    'Gurgaon',
    2100,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Metallic 1.0mm',
    'laminates',
    'Bangalore',
    2205,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Metallic 1.0mm',
    'laminates',
    'Pune',
    2268,
    'laminates_citywise_rates_2025.xlsx'
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
    'Wood Grain 1.0mm',
    'laminates',
    NULL,
    NULL,
    'Greenlam',
    2000,
    '₹ per sheet (8x4 ft)',
    'citywise_excel_2025',
    'laminates_citywise_rates_2025.xlsx',
    'Laminates_CityWise_Rates',
    '{"Brand":"Greenlam","Product":"Wood Grain 1.0mm","Unit":"₹ per sheet (8x4 ft)","Mumbai_Rate":"2200","Delhi_Rate":"2000","Hyderabad_Rate":"1950","Gurgaon_Rate":"2000","Bangalore_Rate":"2100","Pune_Rate":"2160"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Wood Grain 1.0mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wood Grain 1.0mm',
    'laminates',
    'Mumbai',
    2200,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wood Grain 1.0mm',
    'laminates',
    'Delhi',
    2000,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wood Grain 1.0mm',
    'laminates',
    'Hyderabad',
    1950,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wood Grain 1.0mm',
    'laminates',
    'Gurgaon',
    2000,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wood Grain 1.0mm',
    'laminates',
    'Bangalore',
    2100,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wood Grain 1.0mm',
    'laminates',
    'Pune',
    2160,
    'laminates_citywise_rates_2025.xlsx'
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
    'Solid Colors 0.8mm',
    'laminates',
    NULL,
    NULL,
    'Greenlam',
    1500,
    '₹ per sheet (8x4 ft)',
    'citywise_excel_2025',
    'laminates_citywise_rates_2025.xlsx',
    'Laminates_CityWise_Rates',
    '{"Brand":"Greenlam","Product":"Solid Colors 0.8mm","Unit":"₹ per sheet (8x4 ft)","Mumbai_Rate":"1650","Delhi_Rate":"1500","Hyderabad_Rate":"1450","Gurgaon_Rate":"1500","Bangalore_Rate":"1575","Pune_Rate":"1620"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Solid Colors 0.8mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Colors 0.8mm',
    'laminates',
    'Mumbai',
    1650,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Colors 0.8mm',
    'laminates',
    'Delhi',
    1500,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Colors 0.8mm',
    'laminates',
    'Hyderabad',
    1450,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Colors 0.8mm',
    'laminates',
    'Gurgaon',
    1500,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Colors 0.8mm',
    'laminates',
    'Bangalore',
    1575,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Colors 0.8mm',
    'laminates',
    'Pune',
    1620,
    'laminates_citywise_rates_2025.xlsx'
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
    'Solid Colors 1.0mm',
    'laminates',
    NULL,
    NULL,
    'Greenlam',
    1600,
    '₹ per sheet (8x4 ft)',
    'citywise_excel_2025',
    'laminates_citywise_rates_2025.xlsx',
    'Laminates_CityWise_Rates',
    '{"Brand":"Greenlam","Product":"Solid Colors 1.0mm","Unit":"₹ per sheet (8x4 ft)","Mumbai_Rate":"1760","Delhi_Rate":"1600","Hyderabad_Rate":"1550","Gurgaon_Rate":"1600","Bangalore_Rate":"1680","Pune_Rate":"1728"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Solid Colors 1.0mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Colors 1.0mm',
    'laminates',
    'Mumbai',
    1760,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Colors 1.0mm',
    'laminates',
    'Delhi',
    1600,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Colors 1.0mm',
    'laminates',
    'Hyderabad',
    1550,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Colors 1.0mm',
    'laminates',
    'Gurgaon',
    1600,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Colors 1.0mm',
    'laminates',
    'Bangalore',
    1680,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Colors 1.0mm',
    'laminates',
    'Pune',
    1728,
    'laminates_citywise_rates_2025.xlsx'
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
    'Matte 0.8mm',
    'laminates',
    NULL,
    NULL,
    'Century Laminates',
    1400,
    '₹ per sheet (8x4 ft)',
    'citywise_excel_2025',
    'laminates_citywise_rates_2025.xlsx',
    'Laminates_CityWise_Rates',
    '{"Brand":"Century Laminates","Product":"Matte 0.8mm","Unit":"₹ per sheet (8x4 ft)","Mumbai_Rate":"1540","Delhi_Rate":"1400","Hyderabad_Rate":"1350","Gurgaon_Rate":"1400","Bangalore_Rate":"1470","Pune_Rate":"1512"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Matte 0.8mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matte 0.8mm',
    'laminates',
    'Mumbai',
    1540,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matte 0.8mm',
    'laminates',
    'Delhi',
    1400,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matte 0.8mm',
    'laminates',
    'Hyderabad',
    1350,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matte 0.8mm',
    'laminates',
    'Gurgaon',
    1400,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matte 0.8mm',
    'laminates',
    'Bangalore',
    1470,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matte 0.8mm',
    'laminates',
    'Pune',
    1512,
    'laminates_citywise_rates_2025.xlsx'
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
    'Matte 1.0mm',
    'laminates',
    NULL,
    NULL,
    'Century Laminates',
    1500,
    '₹ per sheet (8x4 ft)',
    'citywise_excel_2025',
    'laminates_citywise_rates_2025.xlsx',
    'Laminates_CityWise_Rates',
    '{"Brand":"Century Laminates","Product":"Matte 1.0mm","Unit":"₹ per sheet (8x4 ft)","Mumbai_Rate":"1650","Delhi_Rate":"1500","Hyderabad_Rate":"1450","Gurgaon_Rate":"1500","Bangalore_Rate":"1575","Pune_Rate":"1620"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Matte 1.0mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matte 1.0mm',
    'laminates',
    'Mumbai',
    1650,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matte 1.0mm',
    'laminates',
    'Delhi',
    1500,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matte 1.0mm',
    'laminates',
    'Hyderabad',
    1450,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matte 1.0mm',
    'laminates',
    'Gurgaon',
    1500,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matte 1.0mm',
    'laminates',
    'Bangalore',
    1575,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matte 1.0mm',
    'laminates',
    'Pune',
    1620,
    'laminates_citywise_rates_2025.xlsx'
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
    'Gloss 0.8mm',
    'laminates',
    NULL,
    NULL,
    'Century Laminates',
    1600,
    '₹ per sheet (8x4 ft)',
    'citywise_excel_2025',
    'laminates_citywise_rates_2025.xlsx',
    'Laminates_CityWise_Rates',
    '{"Brand":"Century Laminates","Product":"Gloss 0.8mm","Unit":"₹ per sheet (8x4 ft)","Mumbai_Rate":"1760","Delhi_Rate":"1600","Hyderabad_Rate":"1550","Gurgaon_Rate":"1600","Bangalore_Rate":"1680","Pune_Rate":"1728"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Gloss 0.8mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Gloss 0.8mm',
    'laminates',
    'Mumbai',
    1760,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Gloss 0.8mm',
    'laminates',
    'Delhi',
    1600,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Gloss 0.8mm',
    'laminates',
    'Hyderabad',
    1550,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Gloss 0.8mm',
    'laminates',
    'Gurgaon',
    1600,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Gloss 0.8mm',
    'laminates',
    'Bangalore',
    1680,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Gloss 0.8mm',
    'laminates',
    'Pune',
    1728,
    'laminates_citywise_rates_2025.xlsx'
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
    'Gloss 1.0mm',
    'laminates',
    NULL,
    NULL,
    'Century Laminates',
    1700,
    '₹ per sheet (8x4 ft)',
    'citywise_excel_2025',
    'laminates_citywise_rates_2025.xlsx',
    'Laminates_CityWise_Rates',
    '{"Brand":"Century Laminates","Product":"Gloss 1.0mm","Unit":"₹ per sheet (8x4 ft)","Mumbai_Rate":"1870","Delhi_Rate":"1700","Hyderabad_Rate":"1650","Gurgaon_Rate":"1700","Bangalore_Rate":"1785","Pune_Rate":"1836"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Gloss 1.0mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Gloss 1.0mm',
    'laminates',
    'Mumbai',
    1870,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Gloss 1.0mm',
    'laminates',
    'Delhi',
    1700,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Gloss 1.0mm',
    'laminates',
    'Hyderabad',
    1650,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Gloss 1.0mm',
    'laminates',
    'Gurgaon',
    1700,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Gloss 1.0mm',
    'laminates',
    'Bangalore',
    1785,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Gloss 1.0mm',
    'laminates',
    'Pune',
    1836,
    'laminates_citywise_rates_2025.xlsx'
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
    'High Gloss 0.8mm',
    'laminates',
    NULL,
    NULL,
    'Century Laminates',
    1800,
    '₹ per sheet (8x4 ft)',
    'citywise_excel_2025',
    'laminates_citywise_rates_2025.xlsx',
    'Laminates_CityWise_Rates',
    '{"Brand":"Century Laminates","Product":"High Gloss 0.8mm","Unit":"₹ per sheet (8x4 ft)","Mumbai_Rate":"1980","Delhi_Rate":"1800","Hyderabad_Rate":"1750","Gurgaon_Rate":"1800","Bangalore_Rate":"1890","Pune_Rate":"1944"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: High Gloss 0.8mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'High Gloss 0.8mm',
    'laminates',
    'Mumbai',
    1980,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'High Gloss 0.8mm',
    'laminates',
    'Delhi',
    1800,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'High Gloss 0.8mm',
    'laminates',
    'Hyderabad',
    1750,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'High Gloss 0.8mm',
    'laminates',
    'Gurgaon',
    1800,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'High Gloss 0.8mm',
    'laminates',
    'Bangalore',
    1890,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'High Gloss 0.8mm',
    'laminates',
    'Pune',
    1944,
    'laminates_citywise_rates_2025.xlsx'
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
    'High Gloss 1.0mm',
    'laminates',
    NULL,
    NULL,
    'Century Laminates',
    1900,
    '₹ per sheet (8x4 ft)',
    'citywise_excel_2025',
    'laminates_citywise_rates_2025.xlsx',
    'Laminates_CityWise_Rates',
    '{"Brand":"Century Laminates","Product":"High Gloss 1.0mm","Unit":"₹ per sheet (8x4 ft)","Mumbai_Rate":"2090","Delhi_Rate":"1900","Hyderabad_Rate":"1850","Gurgaon_Rate":"1900","Bangalore_Rate":"1995","Pune_Rate":"2052"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: High Gloss 1.0mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'High Gloss 1.0mm',
    'laminates',
    'Mumbai',
    2090,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'High Gloss 1.0mm',
    'laminates',
    'Delhi',
    1900,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'High Gloss 1.0mm',
    'laminates',
    'Hyderabad',
    1850,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'High Gloss 1.0mm',
    'laminates',
    'Gurgaon',
    1900,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'High Gloss 1.0mm',
    'laminates',
    'Bangalore',
    1995,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'High Gloss 1.0mm',
    'laminates',
    'Pune',
    2052,
    'laminates_citywise_rates_2025.xlsx'
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
    'Suede 0.8mm',
    'laminates',
    NULL,
    NULL,
    'Century Laminates',
    1500,
    '₹ per sheet (8x4 ft)',
    'citywise_excel_2025',
    'laminates_citywise_rates_2025.xlsx',
    'Laminates_CityWise_Rates',
    '{"Brand":"Century Laminates","Product":"Suede 0.8mm","Unit":"₹ per sheet (8x4 ft)","Mumbai_Rate":"1650","Delhi_Rate":"1500","Hyderabad_Rate":"1450","Gurgaon_Rate":"1500","Bangalore_Rate":"1575","Pune_Rate":"1620"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Suede 0.8mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Suede 0.8mm',
    'laminates',
    'Mumbai',
    1650,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Suede 0.8mm',
    'laminates',
    'Delhi',
    1500,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Suede 0.8mm',
    'laminates',
    'Hyderabad',
    1450,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Suede 0.8mm',
    'laminates',
    'Gurgaon',
    1500,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Suede 0.8mm',
    'laminates',
    'Bangalore',
    1575,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Suede 0.8mm',
    'laminates',
    'Pune',
    1620,
    'laminates_citywise_rates_2025.xlsx'
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
    'Suede 1.0mm',
    'laminates',
    NULL,
    NULL,
    'Century Laminates',
    1600,
    '₹ per sheet (8x4 ft)',
    'citywise_excel_2025',
    'laminates_citywise_rates_2025.xlsx',
    'Laminates_CityWise_Rates',
    '{"Brand":"Century Laminates","Product":"Suede 1.0mm","Unit":"₹ per sheet (8x4 ft)","Mumbai_Rate":"1760","Delhi_Rate":"1600","Hyderabad_Rate":"1550","Gurgaon_Rate":"1600","Bangalore_Rate":"1680","Pune_Rate":"1728"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Suede 1.0mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Suede 1.0mm',
    'laminates',
    'Mumbai',
    1760,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Suede 1.0mm',
    'laminates',
    'Delhi',
    1600,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Suede 1.0mm',
    'laminates',
    'Hyderabad',
    1550,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Suede 1.0mm',
    'laminates',
    'Gurgaon',
    1600,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Suede 1.0mm',
    'laminates',
    'Bangalore',
    1680,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Suede 1.0mm',
    'laminates',
    'Pune',
    1728,
    'laminates_citywise_rates_2025.xlsx'
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
    'Metallic 1.0mm',
    'laminates',
    NULL,
    NULL,
    'Century Laminates',
    2000,
    '₹ per sheet (8x4 ft)',
    'citywise_excel_2025',
    'laminates_citywise_rates_2025.xlsx',
    'Laminates_CityWise_Rates',
    '{"Brand":"Century Laminates","Product":"Metallic 1.0mm","Unit":"₹ per sheet (8x4 ft)","Mumbai_Rate":"2200","Delhi_Rate":"2000","Hyderabad_Rate":"1950","Gurgaon_Rate":"2000","Bangalore_Rate":"2100","Pune_Rate":"2160"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Metallic 1.0mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Metallic 1.0mm',
    'laminates',
    'Mumbai',
    2200,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Metallic 1.0mm',
    'laminates',
    'Delhi',
    2000,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Metallic 1.0mm',
    'laminates',
    'Hyderabad',
    1950,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Metallic 1.0mm',
    'laminates',
    'Gurgaon',
    2000,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Metallic 1.0mm',
    'laminates',
    'Bangalore',
    2100,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Metallic 1.0mm',
    'laminates',
    'Pune',
    2160,
    'laminates_citywise_rates_2025.xlsx'
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
    'Wood Grain 1.0mm',
    'laminates',
    NULL,
    NULL,
    'Century Laminates',
    1900,
    '₹ per sheet (8x4 ft)',
    'citywise_excel_2025',
    'laminates_citywise_rates_2025.xlsx',
    'Laminates_CityWise_Rates',
    '{"Brand":"Century Laminates","Product":"Wood Grain 1.0mm","Unit":"₹ per sheet (8x4 ft)","Mumbai_Rate":"2090","Delhi_Rate":"1900","Hyderabad_Rate":"1850","Gurgaon_Rate":"1900","Bangalore_Rate":"1995","Pune_Rate":"2052"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Wood Grain 1.0mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wood Grain 1.0mm',
    'laminates',
    'Mumbai',
    2090,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wood Grain 1.0mm',
    'laminates',
    'Delhi',
    1900,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wood Grain 1.0mm',
    'laminates',
    'Hyderabad',
    1850,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wood Grain 1.0mm',
    'laminates',
    'Gurgaon',
    1900,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wood Grain 1.0mm',
    'laminates',
    'Bangalore',
    1995,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wood Grain 1.0mm',
    'laminates',
    'Pune',
    2052,
    'laminates_citywise_rates_2025.xlsx'
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
    'Solid Colors 0.8mm',
    'laminates',
    NULL,
    NULL,
    'Century Laminates',
    1400,
    '₹ per sheet (8x4 ft)',
    'citywise_excel_2025',
    'laminates_citywise_rates_2025.xlsx',
    'Laminates_CityWise_Rates',
    '{"Brand":"Century Laminates","Product":"Solid Colors 0.8mm","Unit":"₹ per sheet (8x4 ft)","Mumbai_Rate":"1540","Delhi_Rate":"1400","Hyderabad_Rate":"1350","Gurgaon_Rate":"1400","Bangalore_Rate":"1470","Pune_Rate":"1512"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Solid Colors 0.8mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Colors 0.8mm',
    'laminates',
    'Mumbai',
    1540,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Colors 0.8mm',
    'laminates',
    'Delhi',
    1400,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Colors 0.8mm',
    'laminates',
    'Hyderabad',
    1350,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Colors 0.8mm',
    'laminates',
    'Gurgaon',
    1400,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Colors 0.8mm',
    'laminates',
    'Bangalore',
    1470,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Colors 0.8mm',
    'laminates',
    'Pune',
    1512,
    'laminates_citywise_rates_2025.xlsx'
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
    'Solid Colors 1.0mm',
    'laminates',
    NULL,
    NULL,
    'Century Laminates',
    1500,
    '₹ per sheet (8x4 ft)',
    'citywise_excel_2025',
    'laminates_citywise_rates_2025.xlsx',
    'Laminates_CityWise_Rates',
    '{"Brand":"Century Laminates","Product":"Solid Colors 1.0mm","Unit":"₹ per sheet (8x4 ft)","Mumbai_Rate":"1650","Delhi_Rate":"1500","Hyderabad_Rate":"1450","Gurgaon_Rate":"1500","Bangalore_Rate":"1575","Pune_Rate":"1620"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Solid Colors 1.0mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Colors 1.0mm',
    'laminates',
    'Mumbai',
    1650,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Colors 1.0mm',
    'laminates',
    'Delhi',
    1500,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Colors 1.0mm',
    'laminates',
    'Hyderabad',
    1450,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Colors 1.0mm',
    'laminates',
    'Gurgaon',
    1500,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Colors 1.0mm',
    'laminates',
    'Bangalore',
    1575,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Colors 1.0mm',
    'laminates',
    'Pune',
    1620,
    'laminates_citywise_rates_2025.xlsx'
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
    'Matte 0.8mm',
    'laminates',
    NULL,
    NULL,
    'Greenply',
    1300,
    '₹ per sheet (8x4 ft)',
    'citywise_excel_2025',
    'laminates_citywise_rates_2025.xlsx',
    'Laminates_CityWise_Rates',
    '{"Brand":"Greenply","Product":"Matte 0.8mm","Unit":"₹ per sheet (8x4 ft)","Mumbai_Rate":"1430","Delhi_Rate":"1300","Hyderabad_Rate":"1250","Gurgaon_Rate":"1300","Bangalore_Rate":"1365","Pune_Rate":"1404"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Matte 0.8mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matte 0.8mm',
    'laminates',
    'Mumbai',
    1430,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matte 0.8mm',
    'laminates',
    'Delhi',
    1300,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matte 0.8mm',
    'laminates',
    'Hyderabad',
    1250,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matte 0.8mm',
    'laminates',
    'Gurgaon',
    1300,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matte 0.8mm',
    'laminates',
    'Bangalore',
    1365,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matte 0.8mm',
    'laminates',
    'Pune',
    1404,
    'laminates_citywise_rates_2025.xlsx'
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
    'Matte 1.0mm',
    'laminates',
    NULL,
    NULL,
    'Greenply',
    1400,
    '₹ per sheet (8x4 ft)',
    'citywise_excel_2025',
    'laminates_citywise_rates_2025.xlsx',
    'Laminates_CityWise_Rates',
    '{"Brand":"Greenply","Product":"Matte 1.0mm","Unit":"₹ per sheet (8x4 ft)","Mumbai_Rate":"1540","Delhi_Rate":"1400","Hyderabad_Rate":"1350","Gurgaon_Rate":"1400","Bangalore_Rate":"1470","Pune_Rate":"1512"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Matte 1.0mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matte 1.0mm',
    'laminates',
    'Mumbai',
    1540,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matte 1.0mm',
    'laminates',
    'Delhi',
    1400,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matte 1.0mm',
    'laminates',
    'Hyderabad',
    1350,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matte 1.0mm',
    'laminates',
    'Gurgaon',
    1400,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matte 1.0mm',
    'laminates',
    'Bangalore',
    1470,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matte 1.0mm',
    'laminates',
    'Pune',
    1512,
    'laminates_citywise_rates_2025.xlsx'
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
    'Gloss 0.8mm',
    'laminates',
    NULL,
    NULL,
    'Greenply',
    1500,
    '₹ per sheet (8x4 ft)',
    'citywise_excel_2025',
    'laminates_citywise_rates_2025.xlsx',
    'Laminates_CityWise_Rates',
    '{"Brand":"Greenply","Product":"Gloss 0.8mm","Unit":"₹ per sheet (8x4 ft)","Mumbai_Rate":"1650","Delhi_Rate":"1500","Hyderabad_Rate":"1450","Gurgaon_Rate":"1500","Bangalore_Rate":"1575","Pune_Rate":"1620"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Gloss 0.8mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Gloss 0.8mm',
    'laminates',
    'Mumbai',
    1650,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Gloss 0.8mm',
    'laminates',
    'Delhi',
    1500,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Gloss 0.8mm',
    'laminates',
    'Hyderabad',
    1450,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Gloss 0.8mm',
    'laminates',
    'Gurgaon',
    1500,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Gloss 0.8mm',
    'laminates',
    'Bangalore',
    1575,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Gloss 0.8mm',
    'laminates',
    'Pune',
    1620,
    'laminates_citywise_rates_2025.xlsx'
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
    'Gloss 1.0mm',
    'laminates',
    NULL,
    NULL,
    'Greenply',
    1600,
    '₹ per sheet (8x4 ft)',
    'citywise_excel_2025',
    'laminates_citywise_rates_2025.xlsx',
    'Laminates_CityWise_Rates',
    '{"Brand":"Greenply","Product":"Gloss 1.0mm","Unit":"₹ per sheet (8x4 ft)","Mumbai_Rate":"1760","Delhi_Rate":"1600","Hyderabad_Rate":"1550","Gurgaon_Rate":"1600","Bangalore_Rate":"1680","Pune_Rate":"1728"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Gloss 1.0mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Gloss 1.0mm',
    'laminates',
    'Mumbai',
    1760,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Gloss 1.0mm',
    'laminates',
    'Delhi',
    1600,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Gloss 1.0mm',
    'laminates',
    'Hyderabad',
    1550,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Gloss 1.0mm',
    'laminates',
    'Gurgaon',
    1600,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Gloss 1.0mm',
    'laminates',
    'Bangalore',
    1680,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Gloss 1.0mm',
    'laminates',
    'Pune',
    1728,
    'laminates_citywise_rates_2025.xlsx'
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
    'High Gloss 0.8mm',
    'laminates',
    NULL,
    NULL,
    'Greenply',
    1700,
    '₹ per sheet (8x4 ft)',
    'citywise_excel_2025',
    'laminates_citywise_rates_2025.xlsx',
    'Laminates_CityWise_Rates',
    '{"Brand":"Greenply","Product":"High Gloss 0.8mm","Unit":"₹ per sheet (8x4 ft)","Mumbai_Rate":"1870","Delhi_Rate":"1700","Hyderabad_Rate":"1650","Gurgaon_Rate":"1700","Bangalore_Rate":"1785","Pune_Rate":"1836"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: High Gloss 0.8mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'High Gloss 0.8mm',
    'laminates',
    'Mumbai',
    1870,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'High Gloss 0.8mm',
    'laminates',
    'Delhi',
    1700,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'High Gloss 0.8mm',
    'laminates',
    'Hyderabad',
    1650,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'High Gloss 0.8mm',
    'laminates',
    'Gurgaon',
    1700,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'High Gloss 0.8mm',
    'laminates',
    'Bangalore',
    1785,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'High Gloss 0.8mm',
    'laminates',
    'Pune',
    1836,
    'laminates_citywise_rates_2025.xlsx'
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
    'High Gloss 1.0mm',
    'laminates',
    NULL,
    NULL,
    'Greenply',
    1800,
    '₹ per sheet (8x4 ft)',
    'citywise_excel_2025',
    'laminates_citywise_rates_2025.xlsx',
    'Laminates_CityWise_Rates',
    '{"Brand":"Greenply","Product":"High Gloss 1.0mm","Unit":"₹ per sheet (8x4 ft)","Mumbai_Rate":"1980","Delhi_Rate":"1800","Hyderabad_Rate":"1750","Gurgaon_Rate":"1800","Bangalore_Rate":"1890","Pune_Rate":"1944"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: High Gloss 1.0mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'High Gloss 1.0mm',
    'laminates',
    'Mumbai',
    1980,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'High Gloss 1.0mm',
    'laminates',
    'Delhi',
    1800,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'High Gloss 1.0mm',
    'laminates',
    'Hyderabad',
    1750,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'High Gloss 1.0mm',
    'laminates',
    'Gurgaon',
    1800,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'High Gloss 1.0mm',
    'laminates',
    'Bangalore',
    1890,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'High Gloss 1.0mm',
    'laminates',
    'Pune',
    1944,
    'laminates_citywise_rates_2025.xlsx'
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
    'Suede 0.8mm',
    'laminates',
    NULL,
    NULL,
    'Greenply',
    1400,
    '₹ per sheet (8x4 ft)',
    'citywise_excel_2025',
    'laminates_citywise_rates_2025.xlsx',
    'Laminates_CityWise_Rates',
    '{"Brand":"Greenply","Product":"Suede 0.8mm","Unit":"₹ per sheet (8x4 ft)","Mumbai_Rate":"1540","Delhi_Rate":"1400","Hyderabad_Rate":"1350","Gurgaon_Rate":"1400","Bangalore_Rate":"1470","Pune_Rate":"1512"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Suede 0.8mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Suede 0.8mm',
    'laminates',
    'Mumbai',
    1540,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Suede 0.8mm',
    'laminates',
    'Delhi',
    1400,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Suede 0.8mm',
    'laminates',
    'Hyderabad',
    1350,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Suede 0.8mm',
    'laminates',
    'Gurgaon',
    1400,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Suede 0.8mm',
    'laminates',
    'Bangalore',
    1470,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Suede 0.8mm',
    'laminates',
    'Pune',
    1512,
    'laminates_citywise_rates_2025.xlsx'
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
    'Suede 1.0mm',
    'laminates',
    NULL,
    NULL,
    'Greenply',
    1500,
    '₹ per sheet (8x4 ft)',
    'citywise_excel_2025',
    'laminates_citywise_rates_2025.xlsx',
    'Laminates_CityWise_Rates',
    '{"Brand":"Greenply","Product":"Suede 1.0mm","Unit":"₹ per sheet (8x4 ft)","Mumbai_Rate":"1650","Delhi_Rate":"1500","Hyderabad_Rate":"1450","Gurgaon_Rate":"1500","Bangalore_Rate":"1575","Pune_Rate":"1620"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Suede 1.0mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Suede 1.0mm',
    'laminates',
    'Mumbai',
    1650,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Suede 1.0mm',
    'laminates',
    'Delhi',
    1500,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Suede 1.0mm',
    'laminates',
    'Hyderabad',
    1450,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Suede 1.0mm',
    'laminates',
    'Gurgaon',
    1500,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Suede 1.0mm',
    'laminates',
    'Bangalore',
    1575,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Suede 1.0mm',
    'laminates',
    'Pune',
    1620,
    'laminates_citywise_rates_2025.xlsx'
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
    'Metallic 1.0mm',
    'laminates',
    NULL,
    NULL,
    'Greenply',
    1900,
    '₹ per sheet (8x4 ft)',
    'citywise_excel_2025',
    'laminates_citywise_rates_2025.xlsx',
    'Laminates_CityWise_Rates',
    '{"Brand":"Greenply","Product":"Metallic 1.0mm","Unit":"₹ per sheet (8x4 ft)","Mumbai_Rate":"2090","Delhi_Rate":"1900","Hyderabad_Rate":"1850","Gurgaon_Rate":"1900","Bangalore_Rate":"1995","Pune_Rate":"2052"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Metallic 1.0mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Metallic 1.0mm',
    'laminates',
    'Mumbai',
    2090,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Metallic 1.0mm',
    'laminates',
    'Delhi',
    1900,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Metallic 1.0mm',
    'laminates',
    'Hyderabad',
    1850,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Metallic 1.0mm',
    'laminates',
    'Gurgaon',
    1900,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Metallic 1.0mm',
    'laminates',
    'Bangalore',
    1995,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Metallic 1.0mm',
    'laminates',
    'Pune',
    2052,
    'laminates_citywise_rates_2025.xlsx'
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
    'Wood Grain 1.0mm',
    'laminates',
    NULL,
    NULL,
    'Greenply',
    1800,
    '₹ per sheet (8x4 ft)',
    'citywise_excel_2025',
    'laminates_citywise_rates_2025.xlsx',
    'Laminates_CityWise_Rates',
    '{"Brand":"Greenply","Product":"Wood Grain 1.0mm","Unit":"₹ per sheet (8x4 ft)","Mumbai_Rate":"1980","Delhi_Rate":"1800","Hyderabad_Rate":"1750","Gurgaon_Rate":"1800","Bangalore_Rate":"1890","Pune_Rate":"1944"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Wood Grain 1.0mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wood Grain 1.0mm',
    'laminates',
    'Mumbai',
    1980,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wood Grain 1.0mm',
    'laminates',
    'Delhi',
    1800,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wood Grain 1.0mm',
    'laminates',
    'Hyderabad',
    1750,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wood Grain 1.0mm',
    'laminates',
    'Gurgaon',
    1800,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wood Grain 1.0mm',
    'laminates',
    'Bangalore',
    1890,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wood Grain 1.0mm',
    'laminates',
    'Pune',
    1944,
    'laminates_citywise_rates_2025.xlsx'
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
    'Solid Colors 0.8mm',
    'laminates',
    NULL,
    NULL,
    'Greenply',
    1300,
    '₹ per sheet (8x4 ft)',
    'citywise_excel_2025',
    'laminates_citywise_rates_2025.xlsx',
    'Laminates_CityWise_Rates',
    '{"Brand":"Greenply","Product":"Solid Colors 0.8mm","Unit":"₹ per sheet (8x4 ft)","Mumbai_Rate":"1430","Delhi_Rate":"1300","Hyderabad_Rate":"1250","Gurgaon_Rate":"1300","Bangalore_Rate":"1365","Pune_Rate":"1404"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Solid Colors 0.8mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Colors 0.8mm',
    'laminates',
    'Mumbai',
    1430,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Colors 0.8mm',
    'laminates',
    'Delhi',
    1300,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Colors 0.8mm',
    'laminates',
    'Hyderabad',
    1250,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Colors 0.8mm',
    'laminates',
    'Gurgaon',
    1300,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Colors 0.8mm',
    'laminates',
    'Bangalore',
    1365,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Colors 0.8mm',
    'laminates',
    'Pune',
    1404,
    'laminates_citywise_rates_2025.xlsx'
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
    'Solid Colors 1.0mm',
    'laminates',
    NULL,
    NULL,
    'Greenply',
    1400,
    '₹ per sheet (8x4 ft)',
    'citywise_excel_2025',
    'laminates_citywise_rates_2025.xlsx',
    'Laminates_CityWise_Rates',
    '{"Brand":"Greenply","Product":"Solid Colors 1.0mm","Unit":"₹ per sheet (8x4 ft)","Mumbai_Rate":"1540","Delhi_Rate":"1400","Hyderabad_Rate":"1350","Gurgaon_Rate":"1400","Bangalore_Rate":"1470","Pune_Rate":"1512"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Solid Colors 1.0mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Colors 1.0mm',
    'laminates',
    'Mumbai',
    1540,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Colors 1.0mm',
    'laminates',
    'Delhi',
    1400,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Colors 1.0mm',
    'laminates',
    'Hyderabad',
    1350,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Colors 1.0mm',
    'laminates',
    'Gurgaon',
    1400,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Colors 1.0mm',
    'laminates',
    'Bangalore',
    1470,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Colors 1.0mm',
    'laminates',
    'Pune',
    1512,
    'laminates_citywise_rates_2025.xlsx'
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
    'Matte 0.8mm',
    'laminates',
    NULL,
    NULL,
    'Local',
    1000,
    '₹ per sheet (8x4 ft)',
    'citywise_excel_2025',
    'laminates_citywise_rates_2025.xlsx',
    'Laminates_CityWise_Rates',
    '{"Brand":"Local","Product":"Matte 0.8mm","Unit":"₹ per sheet (8x4 ft)","Mumbai_Rate":"1100","Delhi_Rate":"1000","Hyderabad_Rate":"950","Gurgaon_Rate":"1000","Bangalore_Rate":"1050","Pune_Rate":"1080"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Matte 0.8mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matte 0.8mm',
    'laminates',
    'Mumbai',
    1100,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matte 0.8mm',
    'laminates',
    'Delhi',
    1000,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matte 0.8mm',
    'laminates',
    'Hyderabad',
    950,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matte 0.8mm',
    'laminates',
    'Gurgaon',
    1000,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matte 0.8mm',
    'laminates',
    'Bangalore',
    1050,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matte 0.8mm',
    'laminates',
    'Pune',
    1080,
    'laminates_citywise_rates_2025.xlsx'
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
    'Matte 1.0mm',
    'laminates',
    NULL,
    NULL,
    'Local',
    1100,
    '₹ per sheet (8x4 ft)',
    'citywise_excel_2025',
    'laminates_citywise_rates_2025.xlsx',
    'Laminates_CityWise_Rates',
    '{"Brand":"Local","Product":"Matte 1.0mm","Unit":"₹ per sheet (8x4 ft)","Mumbai_Rate":"1210","Delhi_Rate":"1100","Hyderabad_Rate":"1050","Gurgaon_Rate":"1100","Bangalore_Rate":"1155","Pune_Rate":"1188"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Matte 1.0mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matte 1.0mm',
    'laminates',
    'Mumbai',
    1210,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matte 1.0mm',
    'laminates',
    'Delhi',
    1100,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matte 1.0mm',
    'laminates',
    'Hyderabad',
    1050,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matte 1.0mm',
    'laminates',
    'Gurgaon',
    1100,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matte 1.0mm',
    'laminates',
    'Bangalore',
    1155,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matte 1.0mm',
    'laminates',
    'Pune',
    1188,
    'laminates_citywise_rates_2025.xlsx'
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
    'Gloss 0.8mm',
    'laminates',
    NULL,
    NULL,
    'Local',
    1200,
    '₹ per sheet (8x4 ft)',
    'citywise_excel_2025',
    'laminates_citywise_rates_2025.xlsx',
    'Laminates_CityWise_Rates',
    '{"Brand":"Local","Product":"Gloss 0.8mm","Unit":"₹ per sheet (8x4 ft)","Mumbai_Rate":"1320","Delhi_Rate":"1200","Hyderabad_Rate":"1150","Gurgaon_Rate":"1200","Bangalore_Rate":"1260","Pune_Rate":"1296"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Gloss 0.8mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Gloss 0.8mm',
    'laminates',
    'Mumbai',
    1320,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Gloss 0.8mm',
    'laminates',
    'Delhi',
    1200,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Gloss 0.8mm',
    'laminates',
    'Hyderabad',
    1150,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Gloss 0.8mm',
    'laminates',
    'Gurgaon',
    1200,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Gloss 0.8mm',
    'laminates',
    'Bangalore',
    1260,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Gloss 0.8mm',
    'laminates',
    'Pune',
    1296,
    'laminates_citywise_rates_2025.xlsx'
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
    'Gloss 1.0mm',
    'laminates',
    NULL,
    NULL,
    'Local',
    1300,
    '₹ per sheet (8x4 ft)',
    'citywise_excel_2025',
    'laminates_citywise_rates_2025.xlsx',
    'Laminates_CityWise_Rates',
    '{"Brand":"Local","Product":"Gloss 1.0mm","Unit":"₹ per sheet (8x4 ft)","Mumbai_Rate":"1430","Delhi_Rate":"1300","Hyderabad_Rate":"1250","Gurgaon_Rate":"1300","Bangalore_Rate":"1365","Pune_Rate":"1404"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Gloss 1.0mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Gloss 1.0mm',
    'laminates',
    'Mumbai',
    1430,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Gloss 1.0mm',
    'laminates',
    'Delhi',
    1300,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Gloss 1.0mm',
    'laminates',
    'Hyderabad',
    1250,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Gloss 1.0mm',
    'laminates',
    'Gurgaon',
    1300,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Gloss 1.0mm',
    'laminates',
    'Bangalore',
    1365,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Gloss 1.0mm',
    'laminates',
    'Pune',
    1404,
    'laminates_citywise_rates_2025.xlsx'
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
    'Solid Colors 0.8mm',
    'laminates',
    NULL,
    NULL,
    'Local',
    1000,
    '₹ per sheet (8x4 ft)',
    'citywise_excel_2025',
    'laminates_citywise_rates_2025.xlsx',
    'Laminates_CityWise_Rates',
    '{"Brand":"Local","Product":"Solid Colors 0.8mm","Unit":"₹ per sheet (8x4 ft)","Mumbai_Rate":"1100","Delhi_Rate":"1000","Hyderabad_Rate":"950","Gurgaon_Rate":"1000","Bangalore_Rate":"1050","Pune_Rate":"1080"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Solid Colors 0.8mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Colors 0.8mm',
    'laminates',
    'Mumbai',
    1100,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Colors 0.8mm',
    'laminates',
    'Delhi',
    1000,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Colors 0.8mm',
    'laminates',
    'Hyderabad',
    950,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Colors 0.8mm',
    'laminates',
    'Gurgaon',
    1000,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Colors 0.8mm',
    'laminates',
    'Bangalore',
    1050,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Colors 0.8mm',
    'laminates',
    'Pune',
    1080,
    'laminates_citywise_rates_2025.xlsx'
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
    'Solid Colors 1.0mm',
    'laminates',
    NULL,
    NULL,
    'Local',
    1100,
    '₹ per sheet (8x4 ft)',
    'citywise_excel_2025',
    'laminates_citywise_rates_2025.xlsx',
    'Laminates_CityWise_Rates',
    '{"Brand":"Local","Product":"Solid Colors 1.0mm","Unit":"₹ per sheet (8x4 ft)","Mumbai_Rate":"1210","Delhi_Rate":"1100","Hyderabad_Rate":"1050","Gurgaon_Rate":"1100","Bangalore_Rate":"1155","Pune_Rate":"1188"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Solid Colors 1.0mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Colors 1.0mm',
    'laminates',
    'Mumbai',
    1210,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Colors 1.0mm',
    'laminates',
    'Delhi',
    1100,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Colors 1.0mm',
    'laminates',
    'Hyderabad',
    1050,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Colors 1.0mm',
    'laminates',
    'Gurgaon',
    1100,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Colors 1.0mm',
    'laminates',
    'Bangalore',
    1155,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Colors 1.0mm',
    'laminates',
    'Pune',
    1188,
    'laminates_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

-- ========================================
-- Category: loose_furniture_citywise_rates_2025
-- Sheet: Loose Furniture Complete
-- Rows: 149
-- ========================================

-- ========================================
-- Category: mirror_panels
-- Sheet: Mirror Panels Rates
-- Rows: 140
-- ========================================

-- ========================================
-- Category: plywood
-- Sheet: Plywood_CityWise_Rates
-- Rows: 44
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
    'Club Prime BWP 6mm',
    'plywood',
    NULL,
    NULL,
    'Century Ply',
    125,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'plywood_citywise_rates_2025.xlsx',
    'Plywood_CityWise_Rates',
    '{"Brand":"Century Ply","Product":"Club Prime BWP 6mm","Unit":"₹ per sq.ft","Mumbai_Rate":"140","Delhi_Rate":"125","Hyderabad_Rate":"120","Gurgaon_Rate":"125","Bangalore_Rate":"130","Pune_Rate":"132"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Club Prime BWP 6mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Club Prime BWP 6mm',
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
    'Club Prime BWP 6mm',
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
    'Club Prime BWP 6mm',
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
    'Club Prime BWP 6mm',
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
    'Club Prime BWP 6mm',
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
    'Club Prime BWP 6mm',
    'plywood',
    'Pune',
    132,
    'plywood_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
