-- COMPREHENSIVE CITYWISE PRICING DATA IMPORT
-- Generated: 2026-01-01T12:27:08.554Z
-- Source: 27 Excel files with city-wise rates
-- Total Rows: 3710
-- Total Sheets: 110

-- ========================================
-- PART 1: PRICING ITEMS
-- ========================================


-- ========================================
-- BATCH 14 of 14
-- Lines: 65011 to 70010
-- ========================================

    'Greenply',
    72,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'mdf_citywise_rates_2025.xlsx',
    'MDF_CityWise_Rates',
    '{"Brand":"Greenply","Product":"Fire Retardant MDF 18mm","Unit":"₹ per sq.ft","Mumbai_Rate":"80","Delhi_Rate":"72","Hyderabad_Rate":"68","Gurgaon_Rate":"72","Bangalore_Rate":"76","Pune_Rate":"78"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Fire Retardant MDF 18mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Fire Retardant MDF 18mm',
    'mdf',
    'Mumbai',
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
    'Fire Retardant MDF 18mm',
    'mdf',
    'Delhi',
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
    'Fire Retardant MDF 18mm',
    'mdf',
    'Hyderabad',
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
    'Fire Retardant MDF 18mm',
    'mdf',
    'Gurgaon',
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
    'Fire Retardant MDF 18mm',
    'mdf',
    'Bangalore',
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
    'Fire Retardant MDF 18mm',
    'mdf',
    'Pune',
    78,
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
    'HDHMR Plain 6mm',
    'mdf',
    NULL,
    NULL,
    'Action Tesa',
    47,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'mdf_citywise_rates_2025.xlsx',
    'MDF_CityWise_Rates',
    '{"Brand":"Action Tesa","Product":"HDHMR Plain 6mm","Unit":"₹ per sq.ft","Mumbai_Rate":"52","Delhi_Rate":"47","Hyderabad_Rate":"45","Gurgaon_Rate":"47","Bangalore_Rate":"50","Pune_Rate":"51"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: HDHMR Plain 6mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'HDHMR Plain 6mm',
    'mdf',
    'Mumbai',
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
    'HDHMR Plain 6mm',
    'mdf',
    'Delhi',
    47,
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
    'HDHMR Plain 6mm',
    'mdf',
    'Hyderabad',
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
    'HDHMR Plain 6mm',
    'mdf',
    'Gurgaon',
    47,
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
    'HDHMR Plain 6mm',
    'mdf',
    'Bangalore',
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
    'HDHMR Plain 6mm',
    'mdf',
    'Pune',
    51,
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
    'HDHMR Plain 12mm',
    'mdf',
    NULL,
    NULL,
    'Action Tesa',
    70,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'mdf_citywise_rates_2025.xlsx',
    'MDF_CityWise_Rates',
    '{"Brand":"Action Tesa","Product":"HDHMR Plain 12mm","Unit":"₹ per sq.ft","Mumbai_Rate":"78","Delhi_Rate":"70","Hyderabad_Rate":"67","Gurgaon_Rate":"70","Bangalore_Rate":"74","Pune_Rate":"76"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: HDHMR Plain 12mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'HDHMR Plain 12mm',
    'mdf',
    'Mumbai',
    78,
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
    'HDHMR Plain 12mm',
    'mdf',
    'Delhi',
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
    'HDHMR Plain 12mm',
    'mdf',
    'Hyderabad',
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
    'HDHMR Plain 12mm',
    'mdf',
    'Gurgaon',
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
    'HDHMR Plain 12mm',
    'mdf',
    'Bangalore',
    74,
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
    'HDHMR Plain 12mm',
    'mdf',
    'Pune',
    76,
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
    'HDHMR Plain 18mm',
    'mdf',
    NULL,
    NULL,
    'Action Tesa',
    100,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'mdf_citywise_rates_2025.xlsx',
    'MDF_CityWise_Rates',
    '{"Brand":"Action Tesa","Product":"HDHMR Plain 18mm","Unit":"₹ per sq.ft","Mumbai_Rate":"110","Delhi_Rate":"100","Hyderabad_Rate":"95","Gurgaon_Rate":"100","Bangalore_Rate":"106","Pune_Rate":"108"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: HDHMR Plain 18mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'HDHMR Plain 18mm',
    'mdf',
    'Mumbai',
    110,
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
    'HDHMR Plain 18mm',
    'mdf',
    'Delhi',
    100,
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
    'HDHMR Plain 18mm',
    'mdf',
    'Hyderabad',
    95,
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
    'HDHMR Plain 18mm',
    'mdf',
    'Gurgaon',
    100,
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
    'HDHMR Plain 18mm',
    'mdf',
    'Bangalore',
    106,
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
    'HDHMR Plain 18mm',
    'mdf',
    'Pune',
    108,
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
    'HDHMR Plain 25mm',
    'mdf',
    NULL,
    NULL,
    'Action Tesa',
    130,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'mdf_citywise_rates_2025.xlsx',
    'MDF_CityWise_Rates',
    '{"Brand":"Action Tesa","Product":"HDHMR Plain 25mm","Unit":"₹ per sq.ft","Mumbai_Rate":"145","Delhi_Rate":"130","Hyderabad_Rate":"124","Gurgaon_Rate":"130","Bangalore_Rate":"138","Pune_Rate":"141"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: HDHMR Plain 25mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'HDHMR Plain 25mm',
    'mdf',
    'Mumbai',
    145,
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
    'HDHMR Plain 25mm',
    'mdf',
    'Delhi',
    130,
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
    'HDHMR Plain 25mm',
    'mdf',
    'Hyderabad',
    124,
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
    'HDHMR Plain 25mm',
    'mdf',
    'Gurgaon',
    130,
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
    'HDHMR Plain 25mm',
    'mdf',
    'Bangalore',
    138,
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
    'HDHMR Plain 25mm',
    'mdf',
    'Pune',
    141,
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
    'HDHMR Pre-Laminated 18mm',
    'mdf',
    NULL,
    NULL,
    'Action Tesa',
    115,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'mdf_citywise_rates_2025.xlsx',
    'MDF_CityWise_Rates',
    '{"Brand":"Action Tesa","Product":"HDHMR Pre-Laminated 18mm","Unit":"₹ per sq.ft","Mumbai_Rate":"125","Delhi_Rate":"115","Hyderabad_Rate":"110","Gurgaon_Rate":"115","Bangalore_Rate":"122","Pune_Rate":"124"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: HDHMR Pre-Laminated 18mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'HDHMR Pre-Laminated 18mm',
    'mdf',
    'Mumbai',
    125,
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
    'HDHMR Pre-Laminated 18mm',
    'mdf',
    'Delhi',
    115,
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
    'HDHMR Pre-Laminated 18mm',
    'mdf',
    'Hyderabad',
    110,
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
    'HDHMR Pre-Laminated 18mm',
    'mdf',
    'Gurgaon',
    115,
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
    'HDHMR Pre-Laminated 18mm',
    'mdf',
    'Bangalore',
    122,
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
    'HDHMR Pre-Laminated 18mm',
    'mdf',
    'Pune',
    124,
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
    'HDHMR Pre-Laminated 25mm',
    'mdf',
    NULL,
    NULL,
    'Action Tesa',
    150,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'mdf_citywise_rates_2025.xlsx',
    'MDF_CityWise_Rates',
    '{"Brand":"Action Tesa","Product":"HDHMR Pre-Laminated 25mm","Unit":"₹ per sq.ft","Mumbai_Rate":"165","Delhi_Rate":"150","Hyderabad_Rate":"143","Gurgaon_Rate":"150","Bangalore_Rate":"159","Pune_Rate":"162"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: HDHMR Pre-Laminated 25mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'HDHMR Pre-Laminated 25mm',
    'mdf',
    'Mumbai',
    165,
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
    'HDHMR Pre-Laminated 25mm',
    'mdf',
    'Delhi',
    150,
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
    'HDHMR Pre-Laminated 25mm',
    'mdf',
    'Hyderabad',
    143,
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
    'HDHMR Pre-Laminated 25mm',
    'mdf',
    'Gurgaon',
    150,
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
    'HDHMR Pre-Laminated 25mm',
    'mdf',
    'Bangalore',
    159,
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
    'HDHMR Pre-Laminated 25mm',
    'mdf',
    'Pune',
    162,
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
    'Premium Plus HDHMR 6mm',
    'mdf',
    NULL,
    NULL,
    'Century Ply',
    45,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'mdf_citywise_rates_2025.xlsx',
    'MDF_CityWise_Rates',
    '{"Brand":"Century Ply","Product":"Premium Plus HDHMR 6mm","Unit":"₹ per sq.ft","Mumbai_Rate":"50","Delhi_Rate":"45","Hyderabad_Rate":"43","Gurgaon_Rate":"45","Bangalore_Rate":"48","Pune_Rate":"49"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Premium Plus HDHMR 6mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Premium Plus HDHMR 6mm',
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
    'Premium Plus HDHMR 6mm',
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
    'Premium Plus HDHMR 6mm',
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
    'Premium Plus HDHMR 6mm',
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
    'Premium Plus HDHMR 6mm',
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
    'Premium Plus HDHMR 6mm',
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
    'Premium Plus HDHMR 12mm',
    'mdf',
    NULL,
    NULL,
    'Century Ply',
    68,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'mdf_citywise_rates_2025.xlsx',
    'MDF_CityWise_Rates',
    '{"Brand":"Century Ply","Product":"Premium Plus HDHMR 12mm","Unit":"₹ per sq.ft","Mumbai_Rate":"75","Delhi_Rate":"68","Hyderabad_Rate":"65","Gurgaon_Rate":"68","Bangalore_Rate":"72","Pune_Rate":"74"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Premium Plus HDHMR 12mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Premium Plus HDHMR 12mm',
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
    'Premium Plus HDHMR 12mm',
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
    'Premium Plus HDHMR 12mm',
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
    'Premium Plus HDHMR 12mm',
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
    'Premium Plus HDHMR 12mm',
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
    'Premium Plus HDHMR 12mm',
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
    'Premium Plus HDHMR 18mm',
    'mdf',
    NULL,
    NULL,
    'Century Ply',
    95,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'mdf_citywise_rates_2025.xlsx',
    'MDF_CityWise_Rates',
    '{"Brand":"Century Ply","Product":"Premium Plus HDHMR 18mm","Unit":"₹ per sq.ft","Mumbai_Rate":"105","Delhi_Rate":"95","Hyderabad_Rate":"90","Gurgaon_Rate":"95","Bangalore_Rate":"101","Pune_Rate":"103"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Premium Plus HDHMR 18mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Premium Plus HDHMR 18mm',
    'mdf',
    'Mumbai',
    105,
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
    'Premium Plus HDHMR 18mm',
    'mdf',
    'Delhi',
    95,
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
    'Premium Plus HDHMR 18mm',
    'mdf',
    'Hyderabad',
    90,
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
    'Premium Plus HDHMR 18mm',
    'mdf',
    'Gurgaon',
    95,
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
    'Premium Plus HDHMR 18mm',
    'mdf',
    'Bangalore',
    101,
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
    'Premium Plus HDHMR 18mm',
    'mdf',
    'Pune',
    103,
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
    'Premium Plus HDHMR 25mm',
    'mdf',
    NULL,
    NULL,
    'Century Ply',
    125,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'mdf_citywise_rates_2025.xlsx',
    'MDF_CityWise_Rates',
    '{"Brand":"Century Ply","Product":"Premium Plus HDHMR 25mm","Unit":"₹ per sq.ft","Mumbai_Rate":"140","Delhi_Rate":"125","Hyderabad_Rate":"119","Gurgaon_Rate":"125","Bangalore_Rate":"133","Pune_Rate":"135"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Premium Plus HDHMR 25mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Premium Plus HDHMR 25mm',
    'mdf',
    'Mumbai',
    140,
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
    'Premium Plus HDHMR 25mm',
    'mdf',
    'Delhi',
    125,
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
    'Premium Plus HDHMR 25mm',
    'mdf',
    'Hyderabad',
    119,
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
    'Premium Plus HDHMR 25mm',
    'mdf',
    'Gurgaon',
    125,
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
    'Premium Plus HDHMR 25mm',
    'mdf',
    'Bangalore',
    133,
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
    'Premium Plus HDHMR 25mm',
    'mdf',
    'Pune',
    135,
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
    'HDHMR Pre-Laminated 18mm',
    'mdf',
    NULL,
    NULL,
    'Century Ply',
    110,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'mdf_citywise_rates_2025.xlsx',
    'MDF_CityWise_Rates',
    '{"Brand":"Century Ply","Product":"HDHMR Pre-Laminated 18mm","Unit":"₹ per sq.ft","Mumbai_Rate":"120","Delhi_Rate":"110","Hyderabad_Rate":"105","Gurgaon_Rate":"110","Bangalore_Rate":"117","Pune_Rate":"119"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: HDHMR Pre-Laminated 18mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'HDHMR Pre-Laminated 18mm',
    'mdf',
    'Mumbai',
    120,
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
    'HDHMR Pre-Laminated 18mm',
    'mdf',
    'Delhi',
    110,
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
    'HDHMR Pre-Laminated 18mm',
    'mdf',
    'Hyderabad',
    105,
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
    'HDHMR Pre-Laminated 18mm',
    'mdf',
    'Gurgaon',
    110,
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
    'HDHMR Pre-Laminated 18mm',
    'mdf',
    'Bangalore',
    117,
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
    'HDHMR Pre-Laminated 18mm',
    'mdf',
    'Pune',
    119,
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
    'HDHMR Pre-Laminated 25mm',
    'mdf',
    NULL,
    NULL,
    'Century Ply',
    145,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'mdf_citywise_rates_2025.xlsx',
    'MDF_CityWise_Rates',
    '{"Brand":"Century Ply","Product":"HDHMR Pre-Laminated 25mm","Unit":"₹ per sq.ft","Mumbai_Rate":"160","Delhi_Rate":"145","Hyderabad_Rate":"138","Gurgaon_Rate":"145","Bangalore_Rate":"154","Pune_Rate":"157"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: HDHMR Pre-Laminated 25mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'HDHMR Pre-Laminated 25mm',
    'mdf',
    'Mumbai',
    160,
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
    'HDHMR Pre-Laminated 25mm',
    'mdf',
    'Delhi',
    145,
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
    'HDHMR Pre-Laminated 25mm',
    'mdf',
    'Hyderabad',
    138,
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
    'HDHMR Pre-Laminated 25mm',
    'mdf',
    'Gurgaon',
    145,
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
    'HDHMR Pre-Laminated 25mm',
    'mdf',
    'Bangalore',
    154,
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
    'HDHMR Pre-Laminated 25mm',
    'mdf',
    'Pune',
    157,
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
    'Greenpanel HDHMR 6mm',
    'mdf',
    NULL,
    NULL,
    'Greenply',
    43,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'mdf_citywise_rates_2025.xlsx',
    'MDF_CityWise_Rates',
    '{"Brand":"Greenply","Product":"Greenpanel HDHMR 6mm","Unit":"₹ per sq.ft","Mumbai_Rate":"48","Delhi_Rate":"43","Hyderabad_Rate":"41","Gurgaon_Rate":"43","Bangalore_Rate":"46","Pune_Rate":"47"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Greenpanel HDHMR 6mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Greenpanel HDHMR 6mm',
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
    'Greenpanel HDHMR 6mm',
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
    'Greenpanel HDHMR 6mm',
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
    'Greenpanel HDHMR 6mm',
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
    'Greenpanel HDHMR 6mm',
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
    'Greenpanel HDHMR 6mm',
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
    'Greenpanel HDHMR 12mm',
    'mdf',
    NULL,
    NULL,
    'Greenply',
    65,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'mdf_citywise_rates_2025.xlsx',
    'MDF_CityWise_Rates',
    '{"Brand":"Greenply","Product":"Greenpanel HDHMR 12mm","Unit":"₹ per sq.ft","Mumbai_Rate":"72","Delhi_Rate":"65","Hyderabad_Rate":"62","Gurgaon_Rate":"65","Bangalore_Rate":"69","Pune_Rate":"70"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Greenpanel HDHMR 12mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Greenpanel HDHMR 12mm',
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
    'Greenpanel HDHMR 12mm',
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
    'Greenpanel HDHMR 12mm',
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
    'Greenpanel HDHMR 12mm',
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
    'Greenpanel HDHMR 12mm',
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
    'Greenpanel HDHMR 12mm',
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
    'Greenpanel HDHMR 18mm',
    'mdf',
    NULL,
    NULL,
    'Greenply',
    90,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'mdf_citywise_rates_2025.xlsx',
    'MDF_CityWise_Rates',
    '{"Brand":"Greenply","Product":"Greenpanel HDHMR 18mm","Unit":"₹ per sq.ft","Mumbai_Rate":"100","Delhi_Rate":"90","Hyderabad_Rate":"86","Gurgaon_Rate":"90","Bangalore_Rate":"95","Pune_Rate":"98"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Greenpanel HDHMR 18mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Greenpanel HDHMR 18mm',
    'mdf',
    'Mumbai',
    100,
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
    'Greenpanel HDHMR 18mm',
    'mdf',
    'Delhi',
    90,
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
    'Greenpanel HDHMR 18mm',
    'mdf',
    'Hyderabad',
    86,
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
    'Greenpanel HDHMR 18mm',
    'mdf',
    'Gurgaon',
    90,
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
    'Greenpanel HDHMR 18mm',
    'mdf',
    'Bangalore',
    95,
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
    'Greenpanel HDHMR 18mm',
    'mdf',
    'Pune',
    98,
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
    'Greenpanel HDHMR 25mm',
    'mdf',
    NULL,
    NULL,
    'Greenply',
    120,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'mdf_citywise_rates_2025.xlsx',
    'MDF_CityWise_Rates',
    '{"Brand":"Greenply","Product":"Greenpanel HDHMR 25mm","Unit":"₹ per sq.ft","Mumbai_Rate":"135","Delhi_Rate":"120","Hyderabad_Rate":"114","Gurgaon_Rate":"120","Bangalore_Rate":"127","Pune_Rate":"130"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Greenpanel HDHMR 25mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Greenpanel HDHMR 25mm',
    'mdf',
    'Mumbai',
    135,
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
    'Greenpanel HDHMR 25mm',
    'mdf',
    'Delhi',
    120,
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
    'Greenpanel HDHMR 25mm',
    'mdf',
    'Hyderabad',
    114,
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
    'Greenpanel HDHMR 25mm',
    'mdf',
    'Gurgaon',
    120,
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
    'Greenpanel HDHMR 25mm',
    'mdf',
    'Bangalore',
    127,
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
    'Greenpanel HDHMR 25mm',
    'mdf',
    'Pune',
    130,
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
    'HDHMR Pre-Laminated 18mm',
    'mdf',
    NULL,
    NULL,
    'Greenply',
    105,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'mdf_citywise_rates_2025.xlsx',
    'MDF_CityWise_Rates',
    '{"Brand":"Greenply","Product":"HDHMR Pre-Laminated 18mm","Unit":"₹ per sq.ft","Mumbai_Rate":"115","Delhi_Rate":"105","Hyderabad_Rate":"100","Gurgaon_Rate":"105","Bangalore_Rate":"111","Pune_Rate":"113"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: HDHMR Pre-Laminated 18mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'HDHMR Pre-Laminated 18mm',
    'mdf',
    'Mumbai',
    115,
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
    'HDHMR Pre-Laminated 18mm',
    'mdf',
    'Delhi',
    105,
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
    'HDHMR Pre-Laminated 18mm',
    'mdf',
    'Hyderabad',
    100,
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
    'HDHMR Pre-Laminated 18mm',
    'mdf',
    'Gurgaon',
    105,
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
    'HDHMR Pre-Laminated 18mm',
    'mdf',
    'Bangalore',
    111,
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
    'HDHMR Pre-Laminated 18mm',
    'mdf',
    'Pune',
    113,
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
    'HDHMR Pre-Laminated 25mm',
    'mdf',
    NULL,
    NULL,
    'Greenply',
    140,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'mdf_citywise_rates_2025.xlsx',
    'MDF_CityWise_Rates',
    '{"Brand":"Greenply","Product":"HDHMR Pre-Laminated 25mm","Unit":"₹ per sq.ft","Mumbai_Rate":"155","Delhi_Rate":"140","Hyderabad_Rate":"133","Gurgaon_Rate":"140","Bangalore_Rate":"148","Pune_Rate":"151"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: HDHMR Pre-Laminated 25mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'HDHMR Pre-Laminated 25mm',
    'mdf',
    'Mumbai',
    155,
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
    'HDHMR Pre-Laminated 25mm',
    'mdf',
    'Delhi',
    140,
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
    'HDHMR Pre-Laminated 25mm',
    'mdf',
    'Hyderabad',
    133,
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
    'HDHMR Pre-Laminated 25mm',
    'mdf',
    'Gurgaon',
    140,
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
    'HDHMR Pre-Laminated 25mm',
    'mdf',
    'Bangalore',
    148,
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
    'HDHMR Pre-Laminated 25mm',
    'mdf',
    'Pune',
    151,
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
    'Rushil',
    32,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'mdf_citywise_rates_2025.xlsx',
    'MDF_CityWise_Rates',
    '{"Brand":"Rushil","Product":"Standard MDF 12mm","Unit":"₹ per sq.ft","Mumbai_Rate":"35","Delhi_Rate":"32","Hyderabad_Rate":"30","Gurgaon_Rate":"32","Bangalore_Rate":"34","Pune_Rate":"35"}'::jsonb
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
    35,
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
    'Standard MDF 12mm',
    'mdf',
    'Hyderabad',
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
    'Standard MDF 12mm',
    'mdf',
    'Gurgaon',
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
    'Standard MDF 12mm',
    'mdf',
    'Bangalore',
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
    'Pune',
    35,
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
    'Rushil',
    40,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'mdf_citywise_rates_2025.xlsx',
    'MDF_CityWise_Rates',
    '{"Brand":"Rushil","Product":"Standard MDF 18mm","Unit":"₹ per sq.ft","Mumbai_Rate":"45","Delhi_Rate":"40","Hyderabad_Rate":"38","Gurgaon_Rate":"40","Bangalore_Rate":"43","Pune_Rate":"44"}'::jsonb
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
    'Delhi',
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
    'Standard MDF 18mm',
    'mdf',
    'Hyderabad',
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
    'Standard MDF 18mm',
    'mdf',
    'Gurgaon',
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
    'Standard MDF 18mm',
    'mdf',
    'Bangalore',
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
    'Pune',
    44,
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
    'Rushil',
    62,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'mdf_citywise_rates_2025.xlsx',
    'MDF_CityWise_Rates',
    '{"Brand":"Rushil","Product":"Standard MDF 25mm","Unit":"₹ per sq.ft","Mumbai_Rate":"68","Delhi_Rate":"62","Hyderabad_Rate":"59","Gurgaon_Rate":"62","Bangalore_Rate":"66","Pune_Rate":"67"}'::jsonb
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
    'Delhi',
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
    'Standard MDF 25mm',
    'mdf',
    'Hyderabad',
    59,
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
    'Standard MDF 25mm',
    'mdf',
    'Bangalore',
    66,
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
    67,
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
    'Rushil',
    56,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'mdf_citywise_rates_2025.xlsx',
    'MDF_CityWise_Rates',
    '{"Brand":"Rushil","Product":"Pre-Laminated MDF 18mm","Unit":"₹ per sq.ft","Mumbai_Rate":"62","Delhi_Rate":"56","Hyderabad_Rate":"53","Gurgaon_Rate":"56","Bangalore_Rate":"59","Pune_Rate":"61"}'::jsonb
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
    'Pre-Laminated MDF 18mm',
    'mdf',
    'Delhi',
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
    'Pre-Laminated MDF 18mm',
    'mdf',
    'Hyderabad',
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
    'Pre-Laminated MDF 18mm',
    'mdf',
    'Gurgaon',
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
    'Pre-Laminated MDF 18mm',
    'mdf',
    'Bangalore',
    59,
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
    61,
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
    'Local',
    25,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'mdf_citywise_rates_2025.xlsx',
    'MDF_CityWise_Rates',
    '{"Brand":"Local","Product":"Standard MDF 12mm","Unit":"₹ per sq.ft","Mumbai_Rate":"28","Delhi_Rate":"25","Hyderabad_Rate":"24","Gurgaon_Rate":"25","Bangalore_Rate":"27","Pune_Rate":"28"}'::jsonb
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
    'Standard MDF 12mm',
    'mdf',
    'Delhi',
    25,
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
    24,
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
    25,
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
    'Standard MDF 12mm',
    'mdf',
    'Pune',
    28,
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
    'Local',
    32,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'mdf_citywise_rates_2025.xlsx',
    'MDF_CityWise_Rates',
    '{"Brand":"Local","Product":"Standard MDF 18mm","Unit":"₹ per sq.ft","Mumbai_Rate":"36","Delhi_Rate":"32","Hyderabad_Rate":"30","Gurgaon_Rate":"32","Bangalore_Rate":"34","Pune_Rate":"35"}'::jsonb
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
    'Standard MDF 18mm',
    'mdf',
    'Delhi',
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
    'Standard MDF 18mm',
    'mdf',
    'Hyderabad',
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
    'Standard MDF 18mm',
    'mdf',
    'Gurgaon',
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
    'Standard MDF 18mm',
    'mdf',
    'Bangalore',
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
    'Standard MDF 18mm',
    'mdf',
    'Pune',
    35,
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
    'Local',
    50,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'mdf_citywise_rates_2025.xlsx',
    'MDF_CityWise_Rates',
    '{"Brand":"Local","Product":"Standard MDF 25mm","Unit":"₹ per sq.ft","Mumbai_Rate":"55","Delhi_Rate":"50","Hyderabad_Rate":"48","Gurgaon_Rate":"50","Bangalore_Rate":"53","Pune_Rate":"54"}'::jsonb
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
    'Standard MDF 25mm',
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
    'Standard MDF 25mm',
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
    'Standard MDF 25mm',
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
    'Standard MDF 25mm',
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
    'Standard MDF 25mm',
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
    'Local',
    45,
    '₹ per sq.ft',
    'citywise_excel_2025',
    'mdf_citywise_rates_2025.xlsx',
    'MDF_CityWise_Rates',
    '{"Brand":"Local","Product":"Pre-Laminated MDF 18mm","Unit":"₹ per sq.ft","Mumbai_Rate":"50","Delhi_Rate":"45","Hyderabad_Rate":"43","Gurgaon_Rate":"45","Bangalore_Rate":"48","Pune_Rate":"49"}'::jsonb
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
    'Pre-Laminated MDF 18mm',
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
    'Pre-Laminated MDF 18mm',
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
    'Pre-Laminated MDF 18mm',
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
    'Pre-Laminated MDF 18mm',
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
    'Pre-Laminated MDF 18mm',
    'mdf',
    'Pune',
    49,
    'mdf_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();


-- ========================================
-- PART 2: CITY MULTIPLIERS
-- ========================================

-- Category: acrylic_shutters
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Mumbai',
    'acrylic_shutters',
    1.1,
    'Premium market - 10% higher'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Delhi',
    'acrylic_shutters',
    1,
    'Base pricing reference'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Hyderabad',
    'acrylic_shutters',
    0.97,
    'Most affordable - 3% lower'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Gurgaon',
    'acrylic_shutters',
    1,
    'NCR region - Same as Delhi'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Bangalore',
    'acrylic_shutters',
    1.05,
    'Tech hub - 5% premium'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Pune',
    'acrylic_shutters',
    1.08,
    'Growing market - 8% premium'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();

-- Category: aluminium_profiles
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Mumbai',
    'aluminium_profiles',
    1.1,
    'Premium market - 10% higher'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Delhi',
    'aluminium_profiles',
    1,
    'Base pricing reference'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Hyderabad',
    'aluminium_profiles',
    0.97,
    'Most affordable - 3% lower'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Gurgaon',
    'aluminium_profiles',
    1,
    'NCR region - Same as Delhi'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Bangalore',
    'aluminium_profiles',
    1.05,
    'Tech hub - 5% premium'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Pune',
    'aluminium_profiles',
    1.08,
    'Growing market - 8% premium'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();

-- Category: baskets
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Mumbai',
    'baskets',
    1.1,
    'Premium market - 10% higher'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Delhi',
    'baskets',
    1,
    'Base pricing reference'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Hyderabad',
    'baskets',
    0.97,
    'Most affordable - 3% lower'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Gurgaon',
    'baskets',
    1,
    'NCR region - Same as Delhi'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Bangalore',
    'baskets',
    1.05,
    'Tech hub - 5% premium'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Pune',
    'baskets',
    1.08,
    'Growing market - 8% premium'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();

-- Category: edgebanding
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Mumbai',
    'edgebanding',
    1.1,
    'Premium market - 10% higher'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Delhi',
    'edgebanding',
    1,
    'Base pricing reference'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Hyderabad',
    'edgebanding',
    0.97,
    'Most affordable - 3% lower'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Gurgaon',
    'edgebanding',
    1,
    'NCR region - Same as Delhi'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Bangalore',
    'edgebanding',
    1.05,
    'Tech hub - 5% premium'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Pune',
    'edgebanding',
    1.08,
    'Growing market - 8% premium'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();

-- Category: electrical_lighting

-- Category: glass_shutters_panels
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Mumbai',
    'glass_shutters_panels',
    1.1,
    'Premium market - 10% higher'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Delhi',
    'glass_shutters_panels',
    1,
    'Base pricing reference'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Hyderabad',
    'glass_shutters_panels',
    0.97,
    'Most affordable - 3% lower'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Gurgaon',
    'glass_shutters_panels',
    1,
    'NCR region - Same as Delhi'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Bangalore',
    'glass_shutters_panels',
    1.05,
    'Tech hub - 5% premium'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Pune',
    'glass_shutters_panels',
    1.08,
    'Growing market - 8% premium'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();

-- Category: handles
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Mumbai',
    'handles',
    1.1,
    'Premium market - 10% higher'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Delhi',
    'handles',
    1,
    'Base pricing reference'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Hyderabad',
    'handles',
    0.97,
    'Most affordable - 3% lower'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Gurgaon',
    'handles',
    1,
    'NCR region - Same as Delhi'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Bangalore',
    'handles',
    1.05,
    'Tech hub - 5% premium'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Pune',
    'handles',
    1.08,
    'Growing market - 8% premium'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();

-- Category: hardware_hinges_channels
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Mumbai',
    'hardware_hinges_channels',
    1.1,
    'Premium market - 10% higher'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Delhi',
    'hardware_hinges_channels',
    1,
    'Base pricing reference'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Hyderabad',
    'hardware_hinges_channels',
    0.97,
    'Most affordable - 3% lower'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Gurgaon',
    'hardware_hinges_channels',
    1,
    'NCR region - Same as Delhi'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Bangalore',
    'hardware_hinges_channels',
    1.05,
    'Tech hub - 5% premium'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Pune',
    'hardware_hinges_channels',
    1.08,
    'Growing market - 8% premium'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();

-- Category: interior_paint_finishes

-- Category: kitchen_sinks
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Mumbai',
    'kitchen_sinks',
    1.1,
    'Premium market - 10% higher'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Delhi',
    'kitchen_sinks',
    1,
    'Base pricing reference'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Hyderabad',
    'kitchen_sinks',
    0.97,
    'Most affordable - 3% lower'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Gurgaon',
    'kitchen_sinks',
    1,
    'NCR region - Same as Delhi'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Bangalore',
    'kitchen_sinks',
    1.05,
    'Tech hub - 5% premium'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Pune',
    'kitchen_sinks',
    1.08,
    'Growing market - 8% premium'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();

-- Category: laminates
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Mumbai',
    'laminates',
    1.1,
    'Highest prices - Premium market'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Delhi',
    'laminates',
    1,
    'Base pricing reference'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Hyderabad',
    'laminates',
    0.96,
    'Most affordable - Good supply'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Gurgaon',
    'laminates',
    1,
    'NCR region - Same as Delhi'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Bangalore',
    'laminates',
    1.05,
    'Tech hub - Quality demand'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Pune',
    'laminates',
    1.08,
    'Growing market - Moderate premium'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();

-- Category: mirror_panels

-- Category: plywood
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Mumbai',
    'plywood',
    1.12,
    'Highest prices - Premium real estate market'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Delhi',
    'plywood',
    1,
    'Base pricing reference - Capital city'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Hyderabad',
    'plywood',
    0.96,
    'Slightly lower - Good manufacturing presence'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Gurgaon',
    'plywood',
    1,
    'NCR region - Same as Delhi pricing'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Bangalore',
    'plywood',
    1.04,
    'Tech hub premium - High quality demand'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Pune',
    'plywood',
    1.06,
    'Growing market - Moderate premium'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();

-- Category: quartz_granite
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Mumbai',
    'quartz_granite',
    1.1,
    'Premium market - 10% higher'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Delhi',
    'quartz_granite',
    1,
    'Base pricing reference'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Hyderabad',
    'quartz_granite',
    0.97,
    'Most affordable - 3% lower'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Gurgaon',
    'quartz_granite',
    1,
    'NCR region - Same as Delhi'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Bangalore',
    'quartz_granite',
    1.05,
    'Tech hub - 5% premium'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Pune',
    'quartz_granite',
    1.08,
    'Growing market - 8% premium'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();

-- Category: veneers
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Mumbai',
    'veneers',
    1.12,
    'Highest prices - Premium market'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Delhi',
    'veneers',
    1,
    'Base pricing reference'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Hyderabad',
    'veneers',
    0.96,
    'Most affordable - 4% lower'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Gurgaon',
    'veneers',
    1,
    'NCR region - Same as Delhi'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Bangalore',
    'veneers',
    1.05,
    'Tech hub - 5% premium'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Pune',
    'veneers',
    1.08,
    'Growing market - 8% premium'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();

-- Category: wallpaper

-- Category: wardrobe_organisers
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Mumbai',
    'wardrobe_organisers',
    1.1,
    'Premium market - 10% higher'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Delhi',
    'wardrobe_organisers',
    1,
    'Base pricing reference'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Hyderabad',
    'wardrobe_organisers',
    0.97,
    'Most affordable - 3% lower'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Gurgaon',
    'wardrobe_organisers',
    1,
    'NCR region - Same as Delhi'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Bangalore',
    'wardrobe_organisers',
    1.05,
    'Tech hub - 5% premium'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Pune',
    'wardrobe_organisers',
    1.08,
    'Growing market - 8% premium'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();

-- Category: wooden_panels

-- Category: stone_cladding

-- Category: mdf
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Mumbai',
    'mdf',
    1.11,
    'Highest prices - Premium market'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Delhi',
    'mdf',
    1,
    'Base pricing reference'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Hyderabad',
    'mdf',
    0.96,
    'Most affordable - Lower costs'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Gurgaon',
    'mdf',
    1,
    'NCR region - Same as Delhi'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Bangalore',
    'mdf',
    1.06,
    'Tech hub premium'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();
INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    'Pune',
    'mdf',
    1.09,
    'Growing market - Moderate premium'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();

-- ========================================
-- PART 3: MATERIAL COMPARISONS
-- ========================================

-- Category: edgebanding
INSERT INTO material_reference (
    category,
    data,
    source_file
) VALUES (
    'edgebanding',
    '{"Material":"PVC (Polyvinyl Chloride)","Durability":"Good","Heat_Resistance":"Good (up to 60°C)","UV_Resistance":"ISO Rating 7","Cost_Level":"Budget-Mid","Price_Range_Delhi":"₹4-15/m","Best_For":"General furniture, cabinets"}'::jsonb,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (category) 
DO UPDATE SET
    data = EXCLUDED.data,
    updated_at = NOW();
-- Category: handles
INSERT INTO material_reference (
    category,
    data,
    source_file
) VALUES (
    'handles',
    '{"Material":"Stainless Steel (SS 304)","Durability":"Excellent","Corrosion_Resistance":"Excellent","Weight":"Heavy","Price_Premium":"Standard","Best_Use":"Kitchen, bathroom - high moisture"}'::jsonb,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (category) 
DO UPDATE SET
    data = EXCLUDED.data,
    updated_at = NOW();
-- Category: kitchen_sinks
INSERT INTO material_reference (
    category,
    data,
    source_file
) VALUES (
    'kitchen_sinks',
    '{"Material":"SS 304 Grade (18/8)","Composition":"18% Chromium, 8% Nickel","Durability":"Excellent - 15-20 years","Rust_Resistance":"Excellent","Heat_Resistance":"Very Good (up to 150°C)","Scratch_Resistance":"Good","Maintenance":"Low - Regular cleaning","Noise_Level":"Medium (add rubber pads)","Price_Range_Delhi":"₹6,000-12,500","Best_For":"Standard modern kitchens","Market_Share":"55%"}'::jsonb,
    'kitchen_sinks_citywise_rates_2025.xlsx'
) ON CONFLICT (category) 
DO UPDATE SET
    data = EXCLUDED.data,
    updated_at = NOW();
-- Category: stone_cladding
INSERT INTO material_reference (
    category,
    data,
    source_file
) VALUES (
    'stone_cladding',
    '{"STONE CLADDING - MATERIAL COMPARISON & SELECTION GUIDE":"Material Type","__EMPTY":"Pros","__EMPTY_1":"Cons","__EMPTY_2":"Durability","__EMPTY_3":"Maintenance","__EMPTY_4":"Best Applications","__EMPTY_5":"Water Resistance"}'::jsonb,
    'stone_cladding_citywise_rates_2025.xlsx'
) ON CONFLICT (category) 
DO UPDATE SET
    data = EXCLUDED.data,
    updated_at = NOW();

-- ========================================
-- IMPORT SUMMARY
-- ========================================
-- Total pricing items: 522
-- City-specific rates: 3132
-- City multipliers: 84
-- Material comparisons: 4

-- Verification queries:
-- SELECT COUNT(*) FROM pricing_items WHERE source = 'citywise_excel_2025';
-- SELECT COUNT(*) FROM city_pricing;
-- SELECT COUNT(*) FROM city_multipliers;
-- SELECT COUNT(*) FROM material_reference;