-- COMPREHENSIVE CITYWISE PRICING DATA IMPORT
-- Generated: 2026-01-01T12:27:08.554Z
-- Source: 27 Excel files with city-wise rates
-- Total Rows: 3710
-- Total Sheets: 110

-- ========================================
-- PART 1: PRICING ITEMS
-- ========================================


-- ========================================
-- BATCH 2 of 14
-- Lines: 5011 to 10010
-- ========================================

    source_sheet,
    metadata
) VALUES (
    'Corner Unit Basket Premium',
    'baskets',
    NULL,
    NULL,
    'Blum',
    25000,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Blum","Product":"Corner Unit Basket Premium","Unit":"₹ per set","Mumbai_Rate":"27500","Delhi_Rate":"25000","Hyderabad_Rate":"24250","Gurgaon_Rate":"25000","Bangalore_Rate":"26250","Pune_Rate":"27000"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Corner Unit Basket Premium
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Corner Unit Basket Premium',
    'baskets',
    'Mumbai',
    27500,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Corner Unit Basket Premium',
    'baskets',
    'Delhi',
    25000,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Corner Unit Basket Premium',
    'baskets',
    'Hyderabad',
    24250,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Corner Unit Basket Premium',
    'baskets',
    'Gurgaon',
    25000,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Corner Unit Basket Premium',
    'baskets',
    'Bangalore',
    26250,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Corner Unit Basket Premium',
    'baskets',
    'Pune',
    27000,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

INSERT INTO pricing_items (
    item_name,
    item_category,
    item_subcategory,
    material,
    brand,
    base_price,
    unit,
    source,
    source_file,
    source_sheet,
    metadata
) VALUES (
    'Magic Corner Premium (Swing-Out)',
    'baskets',
    NULL,
    NULL,
    'Blum',
    30000,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Blum","Product":"Magic Corner Premium (Swing-Out)","Unit":"₹ per set","Mumbai_Rate":"33000","Delhi_Rate":"30000","Hyderabad_Rate":"29100","Gurgaon_Rate":"30000","Bangalore_Rate":"31500","Pune_Rate":"32400"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Magic Corner Premium (Swing-Out)
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Magic Corner Premium (Swing-Out)',
    'baskets',
    'Mumbai',
    33000,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Magic Corner Premium (Swing-Out)',
    'baskets',
    'Delhi',
    30000,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Magic Corner Premium (Swing-Out)',
    'baskets',
    'Hyderabad',
    29100,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Magic Corner Premium (Swing-Out)',
    'baskets',
    'Gurgaon',
    30000,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Magic Corner Premium (Swing-Out)',
    'baskets',
    'Bangalore',
    31500,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Magic Corner Premium (Swing-Out)',
    'baskets',
    'Pune',
    32400,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

INSERT INTO pricing_items (
    item_name,
    item_category,
    item_subcategory,
    material,
    brand,
    base_price,
    unit,
    source,
    source_file,
    source_sheet,
    metadata
) VALUES (
    'Cutlery Organizer Premium 450mm',
    'baskets',
    NULL,
    NULL,
    'Blum',
    6000,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Blum","Product":"Cutlery Organizer Premium 450mm","Unit":"₹ per set","Mumbai_Rate":"6600","Delhi_Rate":"6000","Hyderabad_Rate":"5820","Gurgaon_Rate":"6000","Bangalore_Rate":"6300","Pune_Rate":"6480"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Cutlery Organizer Premium 450mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Cutlery Organizer Premium 450mm',
    'baskets',
    'Mumbai',
    6600,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Cutlery Organizer Premium 450mm',
    'baskets',
    'Delhi',
    6000,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Cutlery Organizer Premium 450mm',
    'baskets',
    'Hyderabad',
    5820,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Cutlery Organizer Premium 450mm',
    'baskets',
    'Gurgaon',
    6000,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Cutlery Organizer Premium 450mm',
    'baskets',
    'Bangalore',
    6300,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Cutlery Organizer Premium 450mm',
    'baskets',
    'Pune',
    6480,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

INSERT INTO pricing_items (
    item_name,
    item_category,
    item_subcategory,
    material,
    brand,
    base_price,
    unit,
    source,
    source_file,
    source_sheet,
    metadata
) VALUES (
    'Cutlery Organizer Premium 600mm',
    'baskets',
    NULL,
    NULL,
    'Blum',
    7000,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Blum","Product":"Cutlery Organizer Premium 600mm","Unit":"₹ per set","Mumbai_Rate":"7700","Delhi_Rate":"7000","Hyderabad_Rate":"6790","Gurgaon_Rate":"7000","Bangalore_Rate":"7350","Pune_Rate":"7560"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Cutlery Organizer Premium 600mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Cutlery Organizer Premium 600mm',
    'baskets',
    'Mumbai',
    7700,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Cutlery Organizer Premium 600mm',
    'baskets',
    'Delhi',
    7000,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Cutlery Organizer Premium 600mm',
    'baskets',
    'Hyderabad',
    6790,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Cutlery Organizer Premium 600mm',
    'baskets',
    'Gurgaon',
    7000,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Cutlery Organizer Premium 600mm',
    'baskets',
    'Bangalore',
    7350,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Cutlery Organizer Premium 600mm',
    'baskets',
    'Pune',
    7560,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

INSERT INTO pricing_items (
    item_name,
    item_category,
    item_subcategory,
    material,
    brand,
    base_price,
    unit,
    source,
    source_file,
    source_sheet,
    metadata
) VALUES (
    'Tall Unit Premium 450mm',
    'baskets',
    NULL,
    NULL,
    'Blum',
    14000,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Blum","Product":"Tall Unit Premium 450mm","Unit":"₹ per set","Mumbai_Rate":"15400","Delhi_Rate":"14000","Hyderabad_Rate":"13580","Gurgaon_Rate":"14000","Bangalore_Rate":"14700","Pune_Rate":"15120"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Tall Unit Premium 450mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Tall Unit Premium 450mm',
    'baskets',
    'Mumbai',
    15400,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Tall Unit Premium 450mm',
    'baskets',
    'Delhi',
    14000,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Tall Unit Premium 450mm',
    'baskets',
    'Hyderabad',
    13580,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Tall Unit Premium 450mm',
    'baskets',
    'Gurgaon',
    14000,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Tall Unit Premium 450mm',
    'baskets',
    'Bangalore',
    14700,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Tall Unit Premium 450mm',
    'baskets',
    'Pune',
    15120,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

INSERT INTO pricing_items (
    item_name,
    item_category,
    item_subcategory,
    material,
    brand,
    base_price,
    unit,
    source,
    source_file,
    source_sheet,
    metadata
) VALUES (
    'Tall Unit Premium 600mm',
    'baskets',
    NULL,
    NULL,
    'Blum',
    16000,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Blum","Product":"Tall Unit Premium 600mm","Unit":"₹ per set","Mumbai_Rate":"17600","Delhi_Rate":"16000","Hyderabad_Rate":"15520","Gurgaon_Rate":"16000","Bangalore_Rate":"16800","Pune_Rate":"17280"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Tall Unit Premium 600mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Tall Unit Premium 600mm',
    'baskets',
    'Mumbai',
    17600,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Tall Unit Premium 600mm',
    'baskets',
    'Delhi',
    16000,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Tall Unit Premium 600mm',
    'baskets',
    'Hyderabad',
    15520,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Tall Unit Premium 600mm',
    'baskets',
    'Gurgaon',
    16000,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Tall Unit Premium 600mm',
    'baskets',
    'Bangalore',
    16800,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Tall Unit Premium 600mm',
    'baskets',
    'Pune',
    17280,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

INSERT INTO pricing_items (
    item_name,
    item_category,
    item_subcategory,
    material,
    brand,
    base_price,
    unit,
    source,
    source_file,
    source_sheet,
    metadata
) VALUES (
    'Under Sink Premium Basket',
    'baskets',
    NULL,
    NULL,
    'Blum',
    7000,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Blum","Product":"Under Sink Premium Basket","Unit":"₹ per set","Mumbai_Rate":"7700","Delhi_Rate":"7000","Hyderabad_Rate":"6790","Gurgaon_Rate":"7000","Bangalore_Rate":"7350","Pune_Rate":"7560"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Under Sink Premium Basket
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Under Sink Premium Basket',
    'baskets',
    'Mumbai',
    7700,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Under Sink Premium Basket',
    'baskets',
    'Delhi',
    7000,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Under Sink Premium Basket',
    'baskets',
    'Hyderabad',
    6790,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Under Sink Premium Basket',
    'baskets',
    'Gurgaon',
    7000,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Under Sink Premium Basket',
    'baskets',
    'Bangalore',
    7350,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Under Sink Premium Basket',
    'baskets',
    'Pune',
    7560,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

INSERT INTO pricing_items (
    item_name,
    item_category,
    item_subcategory,
    material,
    brand,
    base_price,
    unit,
    source,
    source_file,
    source_sheet,
    metadata
) VALUES (
    'Bottle Pull-Out Premium 150mm',
    'baskets',
    NULL,
    NULL,
    'Blum',
    5000,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Blum","Product":"Bottle Pull-Out Premium 150mm","Unit":"₹ per set","Mumbai_Rate":"5500","Delhi_Rate":"5000","Hyderabad_Rate":"4850","Gurgaon_Rate":"5000","Bangalore_Rate":"5250","Pune_Rate":"5400"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Bottle Pull-Out Premium 150mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Bottle Pull-Out Premium 150mm',
    'baskets',
    'Mumbai',
    5500,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Bottle Pull-Out Premium 150mm',
    'baskets',
    'Delhi',
    5000,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Bottle Pull-Out Premium 150mm',
    'baskets',
    'Hyderabad',
    4850,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Bottle Pull-Out Premium 150mm',
    'baskets',
    'Gurgaon',
    5000,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Bottle Pull-Out Premium 150mm',
    'baskets',
    'Bangalore',
    5250,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Bottle Pull-Out Premium 150mm',
    'baskets',
    'Pune',
    5400,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

INSERT INTO pricing_items (
    item_name,
    item_category,
    item_subcategory,
    material,
    brand,
    base_price,
    unit,
    source,
    source_file,
    source_sheet,
    metadata
) VALUES (
    'Legrabox Drawer Basket 450mm',
    'baskets',
    NULL,
    NULL,
    'Blum',
    12000,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Blum","Product":"Legrabox Drawer Basket 450mm","Unit":"₹ per set","Mumbai_Rate":"13200","Delhi_Rate":"12000","Hyderabad_Rate":"11640","Gurgaon_Rate":"12000","Bangalore_Rate":"12600","Pune_Rate":"12960"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Legrabox Drawer Basket 450mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Legrabox Drawer Basket 450mm',
    'baskets',
    'Mumbai',
    13200,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Legrabox Drawer Basket 450mm',
    'baskets',
    'Delhi',
    12000,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Legrabox Drawer Basket 450mm',
    'baskets',
    'Hyderabad',
    11640,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Legrabox Drawer Basket 450mm',
    'baskets',
    'Gurgaon',
    12000,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Legrabox Drawer Basket 450mm',
    'baskets',
    'Bangalore',
    12600,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Legrabox Drawer Basket 450mm',
    'baskets',
    'Pune',
    12960,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

INSERT INTO pricing_items (
    item_name,
    item_category,
    item_subcategory,
    material,
    brand,
    base_price,
    unit,
    source,
    source_file,
    source_sheet,
    metadata
) VALUES (
    'Legrabox Drawer Basket 600mm',
    'baskets',
    NULL,
    NULL,
    'Blum',
    13000,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Blum","Product":"Legrabox Drawer Basket 600mm","Unit":"₹ per set","Mumbai_Rate":"14300","Delhi_Rate":"13000","Hyderabad_Rate":"12610","Gurgaon_Rate":"13000","Bangalore_Rate":"13650","Pune_Rate":"14040"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Legrabox Drawer Basket 600mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Legrabox Drawer Basket 600mm',
    'baskets',
    'Mumbai',
    14300,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Legrabox Drawer Basket 600mm',
    'baskets',
    'Delhi',
    13000,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Legrabox Drawer Basket 600mm',
    'baskets',
    'Hyderabad',
    12610,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Legrabox Drawer Basket 600mm',
    'baskets',
    'Gurgaon',
    13000,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Legrabox Drawer Basket 600mm',
    'baskets',
    'Bangalore',
    13650,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Legrabox Drawer Basket 600mm',
    'baskets',
    'Pune',
    14040,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

INSERT INTO pricing_items (
    item_name,
    item_category,
    item_subcategory,
    material,
    brand,
    base_price,
    unit,
    source,
    source_file,
    source_sheet,
    metadata
) VALUES (
    'Pull-Out Wire Basket 450mm (18")',
    'baskets',
    NULL,
    NULL,
    'Ebco',
    4500,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Ebco","Product":"Pull-Out Wire Basket 450mm (18\")","Unit":"₹ per set","Mumbai_Rate":"4950","Delhi_Rate":"4500","Hyderabad_Rate":"4365","Gurgaon_Rate":"4500","Bangalore_Rate":"4725","Pune_Rate":"4860"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Pull-Out Wire Basket 450mm (18")
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Pull-Out Wire Basket 450mm (18")',
    'baskets',
    'Mumbai',
    4950,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Pull-Out Wire Basket 450mm (18")',
    'baskets',
    'Delhi',
    4500,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Pull-Out Wire Basket 450mm (18")',
    'baskets',
    'Hyderabad',
    4365,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Pull-Out Wire Basket 450mm (18")',
    'baskets',
    'Gurgaon',
    4500,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Pull-Out Wire Basket 450mm (18")',
    'baskets',
    'Bangalore',
    4725,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Pull-Out Wire Basket 450mm (18")',
    'baskets',
    'Pune',
    4860,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

INSERT INTO pricing_items (
    item_name,
    item_category,
    item_subcategory,
    material,
    brand,
    base_price,
    unit,
    source,
    source_file,
    source_sheet,
    metadata
) VALUES (
    'Pull-Out Wire Basket 600mm (24")',
    'baskets',
    NULL,
    NULL,
    'Ebco',
    5500,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Ebco","Product":"Pull-Out Wire Basket 600mm (24\")","Unit":"₹ per set","Mumbai_Rate":"6050","Delhi_Rate":"5500","Hyderabad_Rate":"5335","Gurgaon_Rate":"5500","Bangalore_Rate":"5775","Pune_Rate":"5940"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Pull-Out Wire Basket 600mm (24")
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Pull-Out Wire Basket 600mm (24")',
    'baskets',
    'Mumbai',
    6050,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Pull-Out Wire Basket 600mm (24")',
    'baskets',
    'Delhi',
    5500,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Pull-Out Wire Basket 600mm (24")',
    'baskets',
    'Hyderabad',
    5335,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Pull-Out Wire Basket 600mm (24")',
    'baskets',
    'Gurgaon',
    5500,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Pull-Out Wire Basket 600mm (24")',
    'baskets',
    'Bangalore',
    5775,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Pull-Out Wire Basket 600mm (24")',
    'baskets',
    'Pune',
    5940,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

INSERT INTO pricing_items (
    item_name,
    item_category,
    item_subcategory,
    material,
    brand,
    base_price,
    unit,
    source,
    source_file,
    source_sheet,
    metadata
) VALUES (
    'Corner Basket Unit (L-Shape)',
    'baskets',
    NULL,
    NULL,
    'Ebco',
    14000,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Ebco","Product":"Corner Basket Unit (L-Shape)","Unit":"₹ per set","Mumbai_Rate":"15400","Delhi_Rate":"14000","Hyderabad_Rate":"13580","Gurgaon_Rate":"14000","Bangalore_Rate":"14700","Pune_Rate":"15120"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Corner Basket Unit (L-Shape)
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Corner Basket Unit (L-Shape)',
    'baskets',
    'Mumbai',
    15400,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Corner Basket Unit (L-Shape)',
    'baskets',
    'Delhi',
    14000,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Corner Basket Unit (L-Shape)',
    'baskets',
    'Hyderabad',
    13580,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Corner Basket Unit (L-Shape)',
    'baskets',
    'Gurgaon',
    14000,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Corner Basket Unit (L-Shape)',
    'baskets',
    'Bangalore',
    14700,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Corner Basket Unit (L-Shape)',
    'baskets',
    'Pune',
    15120,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

INSERT INTO pricing_items (
    item_name,
    item_category,
    item_subcategory,
    material,
    brand,
    base_price,
    unit,
    source,
    source_file,
    source_sheet,
    metadata
) VALUES (
    'Magic Corner Basket',
    'baskets',
    NULL,
    NULL,
    'Ebco',
    17000,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Ebco","Product":"Magic Corner Basket","Unit":"₹ per set","Mumbai_Rate":"18700","Delhi_Rate":"17000","Hyderabad_Rate":"16490","Gurgaon_Rate":"17000","Bangalore_Rate":"17850","Pune_Rate":"18360"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Magic Corner Basket
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Magic Corner Basket',
    'baskets',
    'Mumbai',
    18700,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Magic Corner Basket',
    'baskets',
    'Delhi',
    17000,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Magic Corner Basket',
    'baskets',
    'Hyderabad',
    16490,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Magic Corner Basket',
    'baskets',
    'Gurgaon',
    17000,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Magic Corner Basket',
    'baskets',
    'Bangalore',
    17850,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Magic Corner Basket',
    'baskets',
    'Pune',
    18360,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

INSERT INTO pricing_items (
    item_name,
    item_category,
    item_subcategory,
    material,
    brand,
    base_price,
    unit,
    source,
    source_file,
    source_sheet,
    metadata
) VALUES (
    'Cutlery Basket Organizer 450mm',
    'baskets',
    NULL,
    NULL,
    'Ebco',
    3500,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Ebco","Product":"Cutlery Basket Organizer 450mm","Unit":"₹ per set","Mumbai_Rate":"3850","Delhi_Rate":"3500","Hyderabad_Rate":"3395","Gurgaon_Rate":"3500","Bangalore_Rate":"3675","Pune_Rate":"3780"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Cutlery Basket Organizer 450mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Cutlery Basket Organizer 450mm',
    'baskets',
    'Mumbai',
    3850,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Cutlery Basket Organizer 450mm',
    'baskets',
    'Delhi',
    3500,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Cutlery Basket Organizer 450mm',
    'baskets',
    'Hyderabad',
    3395,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Cutlery Basket Organizer 450mm',
    'baskets',
    'Gurgaon',
    3500,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Cutlery Basket Organizer 450mm',
    'baskets',
    'Bangalore',
    3675,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Cutlery Basket Organizer 450mm',
    'baskets',
    'Pune',
    3780,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

INSERT INTO pricing_items (
    item_name,
    item_category,
    item_subcategory,
    material,
    brand,
    base_price,
    unit,
    source,
    source_file,
    source_sheet,
    metadata
) VALUES (
    'Cutlery Basket Organizer 600mm',
    'baskets',
    NULL,
    NULL,
    'Ebco',
    4200,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Ebco","Product":"Cutlery Basket Organizer 600mm","Unit":"₹ per set","Mumbai_Rate":"4620","Delhi_Rate":"4200","Hyderabad_Rate":"4074","Gurgaon_Rate":"4200","Bangalore_Rate":"4410","Pune_Rate":"4536"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Cutlery Basket Organizer 600mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Cutlery Basket Organizer 600mm',
    'baskets',
    'Mumbai',
    4620,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Cutlery Basket Organizer 600mm',
    'baskets',
    'Delhi',
    4200,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Cutlery Basket Organizer 600mm',
    'baskets',
    'Hyderabad',
    4074,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Cutlery Basket Organizer 600mm',
    'baskets',
    'Gurgaon',
    4200,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Cutlery Basket Organizer 600mm',
    'baskets',
    'Bangalore',
    4410,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Cutlery Basket Organizer 600mm',
    'baskets',
    'Pune',
    4536,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

INSERT INTO pricing_items (
    item_name,
    item_category,
    item_subcategory,
    material,
    brand,
    base_price,
    unit,
    source,
    source_file,
    source_sheet,
    metadata
) VALUES (
    'Tall Unit Pull-Out 450mm',
    'baskets',
    NULL,
    NULL,
    'Ebco',
    8500,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Ebco","Product":"Tall Unit Pull-Out 450mm","Unit":"₹ per set","Mumbai_Rate":"9350","Delhi_Rate":"8500","Hyderabad_Rate":"8245","Gurgaon_Rate":"8500","Bangalore_Rate":"8925","Pune_Rate":"9180"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Tall Unit Pull-Out 450mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Tall Unit Pull-Out 450mm',
    'baskets',
    'Mumbai',
    9350,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Tall Unit Pull-Out 450mm',
    'baskets',
    'Delhi',
    8500,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Tall Unit Pull-Out 450mm',
    'baskets',
    'Hyderabad',
    8245,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Tall Unit Pull-Out 450mm',
    'baskets',
    'Gurgaon',
    8500,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Tall Unit Pull-Out 450mm',
    'baskets',
    'Bangalore',
    8925,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Tall Unit Pull-Out 450mm',
    'baskets',
    'Pune',
    9180,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

INSERT INTO pricing_items (
    item_name,
    item_category,
    item_subcategory,
    material,
    brand,
    base_price,
    unit,
    source,
    source_file,
    source_sheet,
    metadata
) VALUES (
    'Tall Unit Pull-Out 600mm',
    'baskets',
    NULL,
    NULL,
    'Ebco',
    10000,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Ebco","Product":"Tall Unit Pull-Out 600mm","Unit":"₹ per set","Mumbai_Rate":"11000","Delhi_Rate":"10000","Hyderabad_Rate":"9700","Gurgaon_Rate":"10000","Bangalore_Rate":"10500","Pune_Rate":"10800"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Tall Unit Pull-Out 600mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Tall Unit Pull-Out 600mm',
    'baskets',
    'Mumbai',
    11000,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Tall Unit Pull-Out 600mm',
    'baskets',
    'Delhi',
    10000,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Tall Unit Pull-Out 600mm',
    'baskets',
    'Hyderabad',
    9700,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Tall Unit Pull-Out 600mm',
    'baskets',
    'Gurgaon',
    10000,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Tall Unit Pull-Out 600mm',
    'baskets',
    'Bangalore',
    10500,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Tall Unit Pull-Out 600mm',
    'baskets',
    'Pune',
    10800,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

INSERT INTO pricing_items (
    item_name,
    item_category,
    item_subcategory,
    material,
    brand,
    base_price,
    unit,
    source,
    source_file,
    source_sheet,
    metadata
) VALUES (
    'Under Sink Pull-Out Basket',
    'baskets',
    NULL,
    NULL,
    'Ebco',
    4200,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Ebco","Product":"Under Sink Pull-Out Basket","Unit":"₹ per set","Mumbai_Rate":"4620","Delhi_Rate":"4200","Hyderabad_Rate":"4074","Gurgaon_Rate":"4200","Bangalore_Rate":"4410","Pune_Rate":"4536"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Under Sink Pull-Out Basket
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Under Sink Pull-Out Basket',
    'baskets',
    'Mumbai',
    4620,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Under Sink Pull-Out Basket',
    'baskets',
    'Delhi',
    4200,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Under Sink Pull-Out Basket',
    'baskets',
    'Hyderabad',
    4074,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Under Sink Pull-Out Basket',
    'baskets',
    'Gurgaon',
    4200,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Under Sink Pull-Out Basket',
    'baskets',
    'Bangalore',
    4410,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Under Sink Pull-Out Basket',
    'baskets',
    'Pune',
    4536,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

INSERT INTO pricing_items (
    item_name,
    item_category,
    item_subcategory,
    material,
    brand,
    base_price,
    unit,
    source,
    source_file,
    source_sheet,
    metadata
) VALUES (
    'Bottle Pull-Out Basket 150mm',
    'baskets',
    NULL,
    NULL,
    'Ebco',
    2800,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Ebco","Product":"Bottle Pull-Out Basket 150mm","Unit":"₹ per set","Mumbai_Rate":"3080","Delhi_Rate":"2800","Hyderabad_Rate":"2716","Gurgaon_Rate":"2800","Bangalore_Rate":"2940","Pune_Rate":"3024"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Bottle Pull-Out Basket 150mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Bottle Pull-Out Basket 150mm',
    'baskets',
    'Mumbai',
    3080,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Bottle Pull-Out Basket 150mm',
    'baskets',
    'Delhi',
    2800,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Bottle Pull-Out Basket 150mm',
    'baskets',
    'Hyderabad',
    2716,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Bottle Pull-Out Basket 150mm',
    'baskets',
    'Gurgaon',
    2800,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Bottle Pull-Out Basket 150mm',
    'baskets',
    'Bangalore',
    2940,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Bottle Pull-Out Basket 150mm',
    'baskets',
    'Pune',
    3024,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

INSERT INTO pricing_items (
    item_name,
    item_category,
    item_subcategory,
    material,
    brand,
    base_price,
    unit,
    source,
    source_file,
    source_sheet,
    metadata
) VALUES (
    'Modular Drawer Basket 450mm',
    'baskets',
    NULL,
    NULL,
    'Ebco',
    6300,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Ebco","Product":"Modular Drawer Basket 450mm","Unit":"₹ per set","Mumbai_Rate":"6930","Delhi_Rate":"6300","Hyderabad_Rate":"6111","Gurgaon_Rate":"6300","Bangalore_Rate":"6615","Pune_Rate":"6804"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Modular Drawer Basket 450mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Modular Drawer Basket 450mm',
    'baskets',
    'Mumbai',
    6930,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Modular Drawer Basket 450mm',
    'baskets',
    'Delhi',
    6300,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Modular Drawer Basket 450mm',
    'baskets',
    'Hyderabad',
    6111,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Modular Drawer Basket 450mm',
    'baskets',
    'Gurgaon',
    6300,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Modular Drawer Basket 450mm',
    'baskets',
    'Bangalore',
    6615,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Modular Drawer Basket 450mm',
    'baskets',
    'Pune',
    6804,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

INSERT INTO pricing_items (
    item_name,
    item_category,
    item_subcategory,
    material,
    brand,
    base_price,
    unit,
    source,
    source_file,
    source_sheet,
    metadata
) VALUES (
    'Modular Drawer Basket 600mm',
    'baskets',
    NULL,
    NULL,
    'Ebco',
    7200,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Ebco","Product":"Modular Drawer Basket 600mm","Unit":"₹ per set","Mumbai_Rate":"7920","Delhi_Rate":"7200","Hyderabad_Rate":"6984","Gurgaon_Rate":"7200","Bangalore_Rate":"7560","Pune_Rate":"7776"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Modular Drawer Basket 600mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Modular Drawer Basket 600mm',
    'baskets',
    'Mumbai',
    7920,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Modular Drawer Basket 600mm',
    'baskets',
    'Delhi',
    7200,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Modular Drawer Basket 600mm',
    'baskets',
    'Hyderabad',
    6984,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Modular Drawer Basket 600mm',
    'baskets',
    'Gurgaon',
    7200,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Modular Drawer Basket 600mm',
    'baskets',
    'Bangalore',
    7560,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Modular Drawer Basket 600mm',
    'baskets',
    'Pune',
    7776,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

INSERT INTO pricing_items (
    item_name,
    item_category,
    item_subcategory,
    material,
    brand,
    base_price,
    unit,
    source,
    source_file,
    source_sheet,
    metadata
) VALUES (
    'Wicker Style Basket 450mm',
    'baskets',
    NULL,
    NULL,
    'Ebco',
    7000,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Ebco","Product":"Wicker Style Basket 450mm","Unit":"₹ per set","Mumbai_Rate":"7700","Delhi_Rate":"7000","Hyderabad_Rate":"6790","Gurgaon_Rate":"7000","Bangalore_Rate":"7350","Pune_Rate":"7560"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Wicker Style Basket 450mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wicker Style Basket 450mm',
    'baskets',
    'Mumbai',
    7700,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wicker Style Basket 450mm',
    'baskets',
    'Delhi',
    7000,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wicker Style Basket 450mm',
    'baskets',
    'Hyderabad',
    6790,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wicker Style Basket 450mm',
    'baskets',
    'Gurgaon',
    7000,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wicker Style Basket 450mm',
    'baskets',
    'Bangalore',
    7350,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wicker Style Basket 450mm',
    'baskets',
    'Pune',
    7560,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

INSERT INTO pricing_items (
    item_name,
    item_category,
    item_subcategory,
    material,
    brand,
    base_price,
    unit,
    source,
    source_file,
    source_sheet,
    metadata
) VALUES (
    'Wicker Style Basket 600mm',
    'baskets',
    NULL,
    NULL,
    'Ebco',
    8500,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Ebco","Product":"Wicker Style Basket 600mm","Unit":"₹ per set","Mumbai_Rate":"9350","Delhi_Rate":"8500","Hyderabad_Rate":"8245","Gurgaon_Rate":"8500","Bangalore_Rate":"8925","Pune_Rate":"9180"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Wicker Style Basket 600mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wicker Style Basket 600mm',
    'baskets',
    'Mumbai',
    9350,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wicker Style Basket 600mm',
    'baskets',
    'Delhi',
    8500,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wicker Style Basket 600mm',
    'baskets',
    'Hyderabad',
    8245,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wicker Style Basket 600mm',
    'baskets',
    'Gurgaon',
    8500,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wicker Style Basket 600mm',
    'baskets',
    'Bangalore',
    8925,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wicker Style Basket 600mm',
    'baskets',
    'Pune',
    9180,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

INSERT INTO pricing_items (
    item_name,
    item_category,
    item_subcategory,
    material,
    brand,
    base_price,
    unit,
    source,
    source_file,
    source_sheet,
    metadata
) VALUES (
    'SS Partition Basket 450mm',
    'baskets',
    NULL,
    NULL,
    'Ebco',
    4800,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Ebco","Product":"SS Partition Basket 450mm","Unit":"₹ per set","Mumbai_Rate":"5280","Delhi_Rate":"4800","Hyderabad_Rate":"4656","Gurgaon_Rate":"4800","Bangalore_Rate":"5040","Pune_Rate":"5184"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: SS Partition Basket 450mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'SS Partition Basket 450mm',
    'baskets',
    'Mumbai',
    5280,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'SS Partition Basket 450mm',
    'baskets',
    'Delhi',
    4800,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'SS Partition Basket 450mm',
    'baskets',
    'Hyderabad',
    4656,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'SS Partition Basket 450mm',
    'baskets',
    'Gurgaon',
    4800,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'SS Partition Basket 450mm',
    'baskets',
    'Bangalore',
    5040,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'SS Partition Basket 450mm',
    'baskets',
    'Pune',
    5184,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

INSERT INTO pricing_items (
    item_name,
    item_category,
    item_subcategory,
    material,
    brand,
    base_price,
    unit,
    source,
    source_file,
    source_sheet,
    metadata
) VALUES (
    'SS Partition Basket 600mm',
    'baskets',
    NULL,
    NULL,
    'Ebco',
    5800,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Ebco","Product":"SS Partition Basket 600mm","Unit":"₹ per set","Mumbai_Rate":"6380","Delhi_Rate":"5800","Hyderabad_Rate":"5626","Gurgaon_Rate":"5800","Bangalore_Rate":"6090","Pune_Rate":"6264"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: SS Partition Basket 600mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'SS Partition Basket 600mm',
    'baskets',
    'Mumbai',
    6380,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'SS Partition Basket 600mm',
    'baskets',
    'Delhi',
    5800,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'SS Partition Basket 600mm',
    'baskets',
    'Hyderabad',
    5626,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'SS Partition Basket 600mm',
    'baskets',
    'Gurgaon',
    5800,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'SS Partition Basket 600mm',
    'baskets',
    'Bangalore',
    6090,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'SS Partition Basket 600mm',
    'baskets',
    'Pune',
    6264,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

INSERT INTO pricing_items (
    item_name,
    item_category,
    item_subcategory,
    material,
    brand,
    base_price,
    unit,
    source,
    source_file,
    source_sheet,
    metadata
) VALUES (
    'Thali/Plate Basket 600mm',
    'baskets',
    NULL,
    NULL,
    'Ebco',
    5500,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Ebco","Product":"Thali/Plate Basket 600mm","Unit":"₹ per set","Mumbai_Rate":"6050","Delhi_Rate":"5500","Hyderabad_Rate":"5335","Gurgaon_Rate":"5500","Bangalore_Rate":"5775","Pune_Rate":"5940"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Thali/Plate Basket 600mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Thali/Plate Basket 600mm',
    'baskets',
    'Mumbai',
    6050,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Thali/Plate Basket 600mm',
    'baskets',
    'Delhi',
    5500,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Thali/Plate Basket 600mm',
    'baskets',
    'Hyderabad',
    5335,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Thali/Plate Basket 600mm',
    'baskets',
    'Gurgaon',
    5500,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Thali/Plate Basket 600mm',
    'baskets',
    'Bangalore',
    5775,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Thali/Plate Basket 600mm',
    'baskets',
    'Pune',
    5940,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

INSERT INTO pricing_items (
    item_name,
    item_category,
    item_subcategory,
    material,
    brand,
    base_price,
    unit,
    source,
    source_file,
    source_sheet,
    metadata
) VALUES (
    'Spice Pull-Out Basket 150mm',
    'baskets',
    NULL,
    NULL,
    'Ebco',
    2500,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Ebco","Product":"Spice Pull-Out Basket 150mm","Unit":"₹ per set","Mumbai_Rate":"2750","Delhi_Rate":"2500","Hyderabad_Rate":"2425","Gurgaon_Rate":"2500","Bangalore_Rate":"2625","Pune_Rate":"2700"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Spice Pull-Out Basket 150mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Spice Pull-Out Basket 150mm',
    'baskets',
    'Mumbai',
    2750,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Spice Pull-Out Basket 150mm',
    'baskets',
    'Delhi',
    2500,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Spice Pull-Out Basket 150mm',
    'baskets',
    'Hyderabad',
    2425,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Spice Pull-Out Basket 150mm',
    'baskets',
    'Gurgaon',
    2500,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Spice Pull-Out Basket 150mm',
    'baskets',
    'Bangalore',
    2625,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Spice Pull-Out Basket 150mm',
    'baskets',
    'Pune',
    2700,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

INSERT INTO pricing_items (
    item_name,
    item_category,
    item_subcategory,
    material,
    brand,
    base_price,
    unit,
    source,
    source_file,
    source_sheet,
    metadata
) VALUES (
    'Pull-Out Wire Basket 450mm',
    'baskets',
    NULL,
    NULL,
    'Godrej',
    4800,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Godrej","Product":"Pull-Out Wire Basket 450mm","Unit":"₹ per set","Mumbai_Rate":"5280","Delhi_Rate":"4800","Hyderabad_Rate":"4656","Gurgaon_Rate":"4800","Bangalore_Rate":"5040","Pune_Rate":"5184"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Pull-Out Wire Basket 450mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Pull-Out Wire Basket 450mm',
    'baskets',
    'Mumbai',
    5280,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Pull-Out Wire Basket 450mm',
    'baskets',
    'Delhi',
    4800,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Pull-Out Wire Basket 450mm',
    'baskets',
    'Hyderabad',
    4656,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Pull-Out Wire Basket 450mm',
    'baskets',
    'Gurgaon',
    4800,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Pull-Out Wire Basket 450mm',
    'baskets',
    'Bangalore',
    5040,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Pull-Out Wire Basket 450mm',
    'baskets',
    'Pune',
    5184,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

INSERT INTO pricing_items (
    item_name,
    item_category,
    item_subcategory,
    material,
    brand,
    base_price,
    unit,
    source,
    source_file,
    source_sheet,
    metadata
) VALUES (
    'Pull-Out Wire Basket 600mm',
    'baskets',
    NULL,
    NULL,
    'Godrej',
    6000,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Godrej","Product":"Pull-Out Wire Basket 600mm","Unit":"₹ per set","Mumbai_Rate":"6600","Delhi_Rate":"6000","Hyderabad_Rate":"5820","Gurgaon_Rate":"6000","Bangalore_Rate":"6300","Pune_Rate":"6480"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Pull-Out Wire Basket 600mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Pull-Out Wire Basket 600mm',
    'baskets',
    'Mumbai',
    6600,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Pull-Out Wire Basket 600mm',
    'baskets',
    'Delhi',
    6000,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Pull-Out Wire Basket 600mm',
    'baskets',
    'Hyderabad',
    5820,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Pull-Out Wire Basket 600mm',
    'baskets',
    'Gurgaon',
    6000,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Pull-Out Wire Basket 600mm',
    'baskets',
    'Bangalore',
    6300,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Pull-Out Wire Basket 600mm',
    'baskets',
    'Pune',
    6480,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

INSERT INTO pricing_items (
    item_name,
    item_category,
    item_subcategory,
    material,
    brand,
    base_price,
    unit,
    source,
    source_file,
    source_sheet,
    metadata
) VALUES (
    'Corner Basket Unit',
    'baskets',
    NULL,
    NULL,
    'Godrej',
    15000,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Godrej","Product":"Corner Basket Unit","Unit":"₹ per set","Mumbai_Rate":"16500","Delhi_Rate":"15000","Hyderabad_Rate":"14550","Gurgaon_Rate":"15000","Bangalore_Rate":"15750","Pune_Rate":"16200"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Corner Basket Unit
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Corner Basket Unit',
    'baskets',
    'Mumbai',
    16500,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Corner Basket Unit',
    'baskets',
    'Delhi',
    15000,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Corner Basket Unit',
    'baskets',
    'Hyderabad',
    14550,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Corner Basket Unit',
    'baskets',
    'Gurgaon',
    15000,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Corner Basket Unit',
    'baskets',
    'Bangalore',
    15750,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Corner Basket Unit',
    'baskets',
    'Pune',
    16200,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

INSERT INTO pricing_items (
    item_name,
    item_category,
    item_subcategory,
    material,
    brand,
    base_price,
    unit,
    source,
    source_file,
    source_sheet,
    metadata
) VALUES (
    'Cutlery Basket Organizer 450mm',
    'baskets',
    NULL,
    NULL,
    'Godrej',
    3800,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Godrej","Product":"Cutlery Basket Organizer 450mm","Unit":"₹ per set","Mumbai_Rate":"4180","Delhi_Rate":"3800","Hyderabad_Rate":"3686","Gurgaon_Rate":"3800","Bangalore_Rate":"3990","Pune_Rate":"4104"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Cutlery Basket Organizer 450mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Cutlery Basket Organizer 450mm',
    'baskets',
    'Mumbai',
    4180,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Cutlery Basket Organizer 450mm',
    'baskets',
    'Delhi',
    3800,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Cutlery Basket Organizer 450mm',
    'baskets',
    'Hyderabad',
    3686,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Cutlery Basket Organizer 450mm',
    'baskets',
    'Gurgaon',
    3800,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Cutlery Basket Organizer 450mm',
    'baskets',
    'Bangalore',
    3990,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Cutlery Basket Organizer 450mm',
    'baskets',
    'Pune',
    4104,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

INSERT INTO pricing_items (
    item_name,
    item_category,
    item_subcategory,
    material,
    brand,
    base_price,
    unit,
    source,
    source_file,
    source_sheet,
    metadata
) VALUES (
    'Cutlery Basket Organizer 600mm',
    'baskets',
    NULL,
    NULL,
    'Godrej',
    4600,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Godrej","Product":"Cutlery Basket Organizer 600mm","Unit":"₹ per set","Mumbai_Rate":"5060","Delhi_Rate":"4600","Hyderabad_Rate":"4462","Gurgaon_Rate":"4600","Bangalore_Rate":"4830","Pune_Rate":"4968"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Cutlery Basket Organizer 600mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Cutlery Basket Organizer 600mm',
    'baskets',
    'Mumbai',
    5060,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Cutlery Basket Organizer 600mm',
    'baskets',
    'Delhi',
    4600,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Cutlery Basket Organizer 600mm',
    'baskets',
    'Hyderabad',
    4462,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Cutlery Basket Organizer 600mm',
    'baskets',
    'Gurgaon',
    4600,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Cutlery Basket Organizer 600mm',
    'baskets',
    'Bangalore',
    4830,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Cutlery Basket Organizer 600mm',
    'baskets',
    'Pune',
    4968,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

INSERT INTO pricing_items (
    item_name,
    item_category,
    item_subcategory,
    material,
    brand,
    base_price,
    unit,
    source,
    source_file,
    source_sheet,
    metadata
) VALUES (
    'Tall Unit Pull-Out 450mm',
    'baskets',
    NULL,
    NULL,
    'Godrej',
    9200,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Godrej","Product":"Tall Unit Pull-Out 450mm","Unit":"₹ per set","Mumbai_Rate":"10120","Delhi_Rate":"9200","Hyderabad_Rate":"8924","Gurgaon_Rate":"9200","Bangalore_Rate":"9660","Pune_Rate":"9936"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Tall Unit Pull-Out 450mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Tall Unit Pull-Out 450mm',
    'baskets',
    'Mumbai',
    10120,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Tall Unit Pull-Out 450mm',
    'baskets',
    'Delhi',
    9200,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Tall Unit Pull-Out 450mm',
    'baskets',
    'Hyderabad',
    8924,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Tall Unit Pull-Out 450mm',
    'baskets',
    'Gurgaon',
    9200,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Tall Unit Pull-Out 450mm',
    'baskets',
    'Bangalore',
    9660,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Tall Unit Pull-Out 450mm',
    'baskets',
    'Pune',
    9936,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

INSERT INTO pricing_items (
    item_name,
    item_category,
    item_subcategory,
    material,
    brand,
    base_price,
    unit,
    source,
    source_file,
    source_sheet,
    metadata
) VALUES (
    'Tall Unit Pull-Out 600mm',
    'baskets',
    NULL,
    NULL,
    'Godrej',
    10800,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Godrej","Product":"Tall Unit Pull-Out 600mm","Unit":"₹ per set","Mumbai_Rate":"11880","Delhi_Rate":"10800","Hyderabad_Rate":"10476","Gurgaon_Rate":"10800","Bangalore_Rate":"11340","Pune_Rate":"11664"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Tall Unit Pull-Out 600mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Tall Unit Pull-Out 600mm',
    'baskets',
    'Mumbai',
    11880,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Tall Unit Pull-Out 600mm',
    'baskets',
    'Delhi',
    10800,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Tall Unit Pull-Out 600mm',
    'baskets',
    'Hyderabad',
    10476,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Tall Unit Pull-Out 600mm',
    'baskets',
    'Gurgaon',
    10800,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Tall Unit Pull-Out 600mm',
    'baskets',
    'Bangalore',
    11340,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Tall Unit Pull-Out 600mm',
    'baskets',
    'Pune',
    11664,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

INSERT INTO pricing_items (
    item_name,
    item_category,
    item_subcategory,
    material,
    brand,
    base_price,
    unit,
    source,
    source_file,
    source_sheet,
    metadata
) VALUES (
    'Under Sink Basket',
    'baskets',
    NULL,
    NULL,
    'Godrej',
    4600,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Godrej","Product":"Under Sink Basket","Unit":"₹ per set","Mumbai_Rate":"5060","Delhi_Rate":"4600","Hyderabad_Rate":"4462","Gurgaon_Rate":"4600","Bangalore_Rate":"4830","Pune_Rate":"4968"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Under Sink Basket
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Under Sink Basket',
    'baskets',
    'Mumbai',
    5060,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Under Sink Basket',
    'baskets',
    'Delhi',
    4600,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Under Sink Basket',
    'baskets',
    'Hyderabad',
    4462,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Under Sink Basket',
    'baskets',
    'Gurgaon',
    4600,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Under Sink Basket',
    'baskets',
    'Bangalore',
    4830,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Under Sink Basket',
    'baskets',
    'Pune',
    4968,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

INSERT INTO pricing_items (
    item_name,
    item_category,
    item_subcategory,
    material,
    brand,
    base_price,
    unit,
    source,
    source_file,
    source_sheet,
    metadata
) VALUES (
    'Bottle Pull-Out 150mm',
    'baskets',
    NULL,
    NULL,
    'Godrej',
    3200,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Godrej","Product":"Bottle Pull-Out 150mm","Unit":"₹ per set","Mumbai_Rate":"3520","Delhi_Rate":"3200","Hyderabad_Rate":"3104","Gurgaon_Rate":"3200","Bangalore_Rate":"3360","Pune_Rate":"3456"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Bottle Pull-Out 150mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Bottle Pull-Out 150mm',
    'baskets',
    'Mumbai',
    3520,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Bottle Pull-Out 150mm',
    'baskets',
    'Delhi',
    3200,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Bottle Pull-Out 150mm',
    'baskets',
    'Hyderabad',
    3104,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Bottle Pull-Out 150mm',
    'baskets',
    'Gurgaon',
    3200,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Bottle Pull-Out 150mm',
    'baskets',
    'Bangalore',
    3360,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Bottle Pull-Out 150mm',
    'baskets',
    'Pune',
    3456,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

INSERT INTO pricing_items (
    item_name,
    item_category,
    item_subcategory,
    material,
    brand,
    base_price,
    unit,
    source,
    source_file,
    source_sheet,
    metadata
) VALUES (
    'Modular Basket 450mm',
    'baskets',
    NULL,
    NULL,
    'Godrej',
    6800,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Godrej","Product":"Modular Basket 450mm","Unit":"₹ per set","Mumbai_Rate":"7480","Delhi_Rate":"6800","Hyderabad_Rate":"6596","Gurgaon_Rate":"6800","Bangalore_Rate":"7140","Pune_Rate":"7344"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Modular Basket 450mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Modular Basket 450mm',
    'baskets',
    'Mumbai',
    7480,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Modular Basket 450mm',
    'baskets',
    'Delhi',
    6800,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Modular Basket 450mm',
    'baskets',
    'Hyderabad',
    6596,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Modular Basket 450mm',
    'baskets',
    'Gurgaon',
    6800,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Modular Basket 450mm',
    'baskets',
    'Bangalore',
    7140,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Modular Basket 450mm',
    'baskets',
    'Pune',
    7344,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

INSERT INTO pricing_items (
    item_name,
    item_category,
    item_subcategory,
    material,
    brand,
    base_price,
    unit,
    source,
    source_file,
    source_sheet,
    metadata
) VALUES (
    'SS Partition Basket 450mm',
    'baskets',
    NULL,
    NULL,
    'Godrej',
    5200,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Godrej","Product":"SS Partition Basket 450mm","Unit":"₹ per set","Mumbai_Rate":"5720","Delhi_Rate":"5200","Hyderabad_Rate":"5044","Gurgaon_Rate":"5200","Bangalore_Rate":"5460","Pune_Rate":"5616"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();
