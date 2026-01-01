-- COMPREHENSIVE CITYWISE PRICING DATA IMPORT
-- Generated: 2026-01-01T12:27:08.554Z
-- Source: 27 Excel files with city-wise rates
-- Total Rows: 3710
-- Total Sheets: 110

-- ========================================
-- PART 1: PRICING ITEMS
-- ========================================


-- ========================================
-- BATCH 1 of 14
-- Lines: 11 to 5010
-- ========================================

-- ========================================
-- Category: acrylic_shutters
-- Sheet: Substrate_Comparison
-- Rows: 4
-- ========================================

-- ========================================
-- Category: baskets
-- Sheet: Baskets_CityWise_Rates
-- Rows: 90
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
    'Pull-Out Wire Basket 450mm (18")',
    'baskets',
    NULL,
    NULL,
    'Hettich',
    6500,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Hettich","Product":"Pull-Out Wire Basket 450mm (18\")","Unit":"₹ per set","Mumbai_Rate":"7150","Delhi_Rate":"6500","Hyderabad_Rate":"6305","Gurgaon_Rate":"6500","Bangalore_Rate":"6825","Pune_Rate":"7020"}'::jsonb
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
    7150,
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
    6500,
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
    6305,
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
    6500,
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
    6825,
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
    7020,
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
    'Hettich',
    8000,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Hettich","Product":"Pull-Out Wire Basket 600mm (24\")","Unit":"₹ per set","Mumbai_Rate":"8800","Delhi_Rate":"8000","Hyderabad_Rate":"7760","Gurgaon_Rate":"8000","Bangalore_Rate":"8400","Pune_Rate":"8640"}'::jsonb
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
    8800,
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
    8000,
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
    7760,
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
    8000,
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
    8400,
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
    8640,
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
    'Hettich',
    20000,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Hettich","Product":"Corner Basket Unit (L-Shape)","Unit":"₹ per set","Mumbai_Rate":"22000","Delhi_Rate":"20000","Hyderabad_Rate":"19400","Gurgaon_Rate":"20000","Bangalore_Rate":"21000","Pune_Rate":"21600"}'::jsonb
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
    22000,
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
    20000,
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
    19400,
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
    20000,
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
    21000,
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
    21600,
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
    'Magic Corner Basket (Swing-Out)',
    'baskets',
    NULL,
    NULL,
    'Hettich',
    24000,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Hettich","Product":"Magic Corner Basket (Swing-Out)","Unit":"₹ per set","Mumbai_Rate":"26400","Delhi_Rate":"24000","Hyderabad_Rate":"23280","Gurgaon_Rate":"24000","Bangalore_Rate":"25200","Pune_Rate":"25920"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Magic Corner Basket (Swing-Out)
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Magic Corner Basket (Swing-Out)',
    'baskets',
    'Mumbai',
    26400,
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
    'Magic Corner Basket (Swing-Out)',
    'baskets',
    'Delhi',
    24000,
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
    'Magic Corner Basket (Swing-Out)',
    'baskets',
    'Hyderabad',
    23280,
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
    'Magic Corner Basket (Swing-Out)',
    'baskets',
    'Gurgaon',
    24000,
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
    'Magic Corner Basket (Swing-Out)',
    'baskets',
    'Bangalore',
    25200,
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
    'Magic Corner Basket (Swing-Out)',
    'baskets',
    'Pune',
    25920,
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
    'Hettich',
    5000,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Hettich","Product":"Cutlery Basket Organizer 450mm","Unit":"₹ per set","Mumbai_Rate":"5500","Delhi_Rate":"5000","Hyderabad_Rate":"4850","Gurgaon_Rate":"5000","Bangalore_Rate":"5250","Pune_Rate":"5400"}'::jsonb
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
    'Cutlery Basket Organizer 450mm',
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
    'Cutlery Basket Organizer 450mm',
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
    'Cutlery Basket Organizer 450mm',
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
    'Cutlery Basket Organizer 450mm',
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
    'Cutlery Basket Organizer 450mm',
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
    'Cutlery Basket Organizer 600mm',
    'baskets',
    NULL,
    NULL,
    'Hettich',
    6000,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Hettich","Product":"Cutlery Basket Organizer 600mm","Unit":"₹ per set","Mumbai_Rate":"6600","Delhi_Rate":"6000","Hyderabad_Rate":"5820","Gurgaon_Rate":"6000","Bangalore_Rate":"6300","Pune_Rate":"6480"}'::jsonb
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
    'Cutlery Basket Organizer 600mm',
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
    'Cutlery Basket Organizer 600mm',
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
    'Cutlery Basket Organizer 600mm',
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
    'Cutlery Basket Organizer 600mm',
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
    'Cutlery Basket Organizer 600mm',
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
    'Tall Unit Pull-Out 450mm',
    'baskets',
    NULL,
    NULL,
    'Hettich',
    12000,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Hettich","Product":"Tall Unit Pull-Out 450mm","Unit":"₹ per set","Mumbai_Rate":"13200","Delhi_Rate":"12000","Hyderabad_Rate":"11640","Gurgaon_Rate":"12000","Bangalore_Rate":"12600","Pune_Rate":"12960"}'::jsonb
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
    'Tall Unit Pull-Out 450mm',
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
    'Tall Unit Pull-Out 450mm',
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
    'Tall Unit Pull-Out 450mm',
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
    'Tall Unit Pull-Out 450mm',
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
    'Tall Unit Pull-Out 450mm',
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
    'Tall Unit Pull-Out 600mm',
    'baskets',
    NULL,
    NULL,
    'Hettich',
    14000,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Hettich","Product":"Tall Unit Pull-Out 600mm","Unit":"₹ per set","Mumbai_Rate":"15400","Delhi_Rate":"14000","Hyderabad_Rate":"13580","Gurgaon_Rate":"14000","Bangalore_Rate":"14700","Pune_Rate":"15120"}'::jsonb
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
    'Tall Unit Pull-Out 600mm',
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
    'Tall Unit Pull-Out 600mm',
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
    'Tall Unit Pull-Out 600mm',
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
    'Tall Unit Pull-Out 600mm',
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
    'Tall Unit Pull-Out 600mm',
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
    'Under Sink Pull-Out Basket',
    'baskets',
    NULL,
    NULL,
    'Hettich',
    6000,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Hettich","Product":"Under Sink Pull-Out Basket","Unit":"₹ per set","Mumbai_Rate":"6600","Delhi_Rate":"6000","Hyderabad_Rate":"5820","Gurgaon_Rate":"6000","Bangalore_Rate":"6300","Pune_Rate":"6480"}'::jsonb
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
    'Under Sink Pull-Out Basket',
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
    'Under Sink Pull-Out Basket',
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
    'Under Sink Pull-Out Basket',
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
    'Under Sink Pull-Out Basket',
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
    'Under Sink Pull-Out Basket',
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
    'Bottle Pull-Out Basket 150mm',
    'baskets',
    NULL,
    NULL,
    'Hettich',
    4000,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Hettich","Product":"Bottle Pull-Out Basket 150mm","Unit":"₹ per set","Mumbai_Rate":"4400","Delhi_Rate":"4000","Hyderabad_Rate":"3880","Gurgaon_Rate":"4000","Bangalore_Rate":"4200","Pune_Rate":"4320"}'::jsonb
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
    4400,
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
    4000,
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
    3880,
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
    4000,
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
    'Bottle Pull-Out Basket 150mm',
    'baskets',
    'Pune',
    4320,
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
    'Hettich',
    9000,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Hettich","Product":"Modular Drawer Basket 450mm","Unit":"₹ per set","Mumbai_Rate":"9900","Delhi_Rate":"9000","Hyderabad_Rate":"8730","Gurgaon_Rate":"9000","Bangalore_Rate":"9450","Pune_Rate":"9720"}'::jsonb
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
    9900,
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
    9000,
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
    8730,
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
    9000,
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
    9450,
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
    9720,
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
    'Hettich',
    10000,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Hettich","Product":"Modular Drawer Basket 600mm","Unit":"₹ per set","Mumbai_Rate":"11000","Delhi_Rate":"10000","Hyderabad_Rate":"9700","Gurgaon_Rate":"10000","Bangalore_Rate":"10500","Pune_Rate":"10800"}'::jsonb
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
    'Modular Drawer Basket 600mm',
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
    'Modular Drawer Basket 600mm',
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
    'Modular Drawer Basket 600mm',
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
    'Modular Drawer Basket 600mm',
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
    'Modular Drawer Basket 600mm',
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
    'Wicker Basket with Frame 450mm',
    'baskets',
    NULL,
    NULL,
    'Hettich',
    10000,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Hettich","Product":"Wicker Basket with Frame 450mm","Unit":"₹ per set","Mumbai_Rate":"11000","Delhi_Rate":"10000","Hyderabad_Rate":"9700","Gurgaon_Rate":"10000","Bangalore_Rate":"10500","Pune_Rate":"10800"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Wicker Basket with Frame 450mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wicker Basket with Frame 450mm',
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
    'Wicker Basket with Frame 450mm',
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
    'Wicker Basket with Frame 450mm',
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
    'Wicker Basket with Frame 450mm',
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
    'Wicker Basket with Frame 450mm',
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
    'Wicker Basket with Frame 450mm',
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
    'Wicker Basket with Frame 600mm',
    'baskets',
    NULL,
    NULL,
    'Hettich',
    12000,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Hettich","Product":"Wicker Basket with Frame 600mm","Unit":"₹ per set","Mumbai_Rate":"13200","Delhi_Rate":"12000","Hyderabad_Rate":"11640","Gurgaon_Rate":"12000","Bangalore_Rate":"12600","Pune_Rate":"12960"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Wicker Basket with Frame 600mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wicker Basket with Frame 600mm',
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
    'Wicker Basket with Frame 600mm',
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
    'Wicker Basket with Frame 600mm',
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
    'Wicker Basket with Frame 600mm',
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
    'Wicker Basket with Frame 600mm',
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
    'Wicker Basket with Frame 600mm',
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
    'SS Partition Basket 450mm',
    'baskets',
    NULL,
    NULL,
    'Hettich',
    7000,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Hettich","Product":"SS Partition Basket 450mm","Unit":"₹ per set","Mumbai_Rate":"7700","Delhi_Rate":"7000","Hyderabad_Rate":"6790","Gurgaon_Rate":"7000","Bangalore_Rate":"7350","Pune_Rate":"7560"}'::jsonb
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
    'SS Partition Basket 450mm',
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
    'SS Partition Basket 450mm',
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
    'SS Partition Basket 450mm',
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
    'SS Partition Basket 450mm',
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
    'SS Partition Basket 450mm',
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
    'SS Partition Basket 600mm',
    'baskets',
    NULL,
    NULL,
    'Hettich',
    8500,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Hettich","Product":"SS Partition Basket 600mm","Unit":"₹ per set","Mumbai_Rate":"9350","Delhi_Rate":"8500","Hyderabad_Rate":"8245","Gurgaon_Rate":"8500","Bangalore_Rate":"8925","Pune_Rate":"9180"}'::jsonb
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
    'SS Partition Basket 600mm',
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
    'SS Partition Basket 600mm',
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
    'SS Partition Basket 600mm',
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
    'SS Partition Basket 600mm',
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
    'SS Partition Basket 600mm',
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
    'Thali/Plate Basket 600mm',
    'baskets',
    NULL,
    NULL,
    'Hettich',
    8000,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Hettich","Product":"Thali/Plate Basket 600mm","Unit":"₹ per set","Mumbai_Rate":"8800","Delhi_Rate":"8000","Hyderabad_Rate":"7760","Gurgaon_Rate":"8000","Bangalore_Rate":"8400","Pune_Rate":"8640"}'::jsonb
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
    8800,
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
    8000,
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
    7760,
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
    8000,
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
    8400,
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
    8640,
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
    'Hettich',
    3500,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Hettich","Product":"Spice Pull-Out Basket 150mm","Unit":"₹ per set","Mumbai_Rate":"3850","Delhi_Rate":"3500","Hyderabad_Rate":"3395","Gurgaon_Rate":"3500","Bangalore_Rate":"3675","Pune_Rate":"3780"}'::jsonb
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
    'Spice Pull-Out Basket 150mm',
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
    'Spice Pull-Out Basket 150mm',
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
    'Spice Pull-Out Basket 150mm',
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
    'Spice Pull-Out Basket 150mm',
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
    'Spice Pull-Out Basket 150mm',
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
    'Pull-Out Wire Basket 450mm (18")',
    'baskets',
    NULL,
    NULL,
    'Häfele',
    6300,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Häfele","Product":"Pull-Out Wire Basket 450mm (18\")","Unit":"₹ per set","Mumbai_Rate":"6930","Delhi_Rate":"6300","Hyderabad_Rate":"6111","Gurgaon_Rate":"6300","Bangalore_Rate":"6615","Pune_Rate":"6804"}'::jsonb
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
    'Pull-Out Wire Basket 450mm (18")',
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
    'Pull-Out Wire Basket 450mm (18")',
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
    'Pull-Out Wire Basket 450mm (18")',
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
    'Pull-Out Wire Basket 450mm (18")',
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
    'Pull-Out Wire Basket 450mm (18")',
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
    'Pull-Out Wire Basket 600mm (24")',
    'baskets',
    NULL,
    NULL,
    'Häfele',
    7700,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Häfele","Product":"Pull-Out Wire Basket 600mm (24\")","Unit":"₹ per set","Mumbai_Rate":"8470","Delhi_Rate":"7700","Hyderabad_Rate":"7469","Gurgaon_Rate":"7700","Bangalore_Rate":"8085","Pune_Rate":"8316"}'::jsonb
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
    8470,
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
    'Pull-Out Wire Basket 600mm (24")',
    'baskets',
    'Hyderabad',
    7469,
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
    'Pull-Out Wire Basket 600mm (24")',
    'baskets',
    'Bangalore',
    8085,
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
    8316,
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
    'Häfele',
    19400,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Häfele","Product":"Corner Basket Unit (L-Shape)","Unit":"₹ per set","Mumbai_Rate":"21340","Delhi_Rate":"19400","Hyderabad_Rate":"18818","Gurgaon_Rate":"19400","Bangalore_Rate":"20370","Pune_Rate":"20952"}'::jsonb
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
    21340,
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
    19400,
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
    18818,
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
    19400,
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
    20370,
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
    20952,
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
    'Magic Corner Basket (Swing-Out)',
    'baskets',
    NULL,
    NULL,
    'Häfele',
    23200,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Häfele","Product":"Magic Corner Basket (Swing-Out)","Unit":"₹ per set","Mumbai_Rate":"25520","Delhi_Rate":"23200","Hyderabad_Rate":"22504","Gurgaon_Rate":"23200","Bangalore_Rate":"24360","Pune_Rate":"25056"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Magic Corner Basket (Swing-Out)
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Magic Corner Basket (Swing-Out)',
    'baskets',
    'Mumbai',
    25520,
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
    'Magic Corner Basket (Swing-Out)',
    'baskets',
    'Delhi',
    23200,
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
    'Magic Corner Basket (Swing-Out)',
    'baskets',
    'Hyderabad',
    22504,
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
    'Magic Corner Basket (Swing-Out)',
    'baskets',
    'Gurgaon',
    23200,
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
    'Magic Corner Basket (Swing-Out)',
    'baskets',
    'Bangalore',
    24360,
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
    'Magic Corner Basket (Swing-Out)',
    'baskets',
    'Pune',
    25056,
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
    'Häfele',
    4800,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Häfele","Product":"Cutlery Basket Organizer 450mm","Unit":"₹ per set","Mumbai_Rate":"5280","Delhi_Rate":"4800","Hyderabad_Rate":"4656","Gurgaon_Rate":"4800","Bangalore_Rate":"5040","Pune_Rate":"5184"}'::jsonb
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
    'Cutlery Basket Organizer 450mm',
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
    'Cutlery Basket Organizer 450mm',
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
    'Cutlery Basket Organizer 450mm',
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
    'Cutlery Basket Organizer 450mm',
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
    'Cutlery Basket Organizer 450mm',
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
    'Cutlery Basket Organizer 600mm',
    'baskets',
    NULL,
    NULL,
    'Häfele',
    5800,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Häfele","Product":"Cutlery Basket Organizer 600mm","Unit":"₹ per set","Mumbai_Rate":"6380","Delhi_Rate":"5800","Hyderabad_Rate":"5626","Gurgaon_Rate":"5800","Bangalore_Rate":"6090","Pune_Rate":"6264"}'::jsonb
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
    'Cutlery Basket Organizer 600mm',
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
    'Cutlery Basket Organizer 600mm',
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
    'Cutlery Basket Organizer 600mm',
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
    'Cutlery Basket Organizer 600mm',
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
    'Cutlery Basket Organizer 600mm',
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
    'Tall Unit Pull-Out 450mm',
    'baskets',
    NULL,
    NULL,
    'Häfele',
    11600,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Häfele","Product":"Tall Unit Pull-Out 450mm","Unit":"₹ per set","Mumbai_Rate":"12760","Delhi_Rate":"11600","Hyderabad_Rate":"11252","Gurgaon_Rate":"11600","Bangalore_Rate":"12180","Pune_Rate":"12528"}'::jsonb
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
    12760,
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
    11600,
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
    11252,
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
    11600,
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
    12180,
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
    12528,
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
    'Häfele',
    13600,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Häfele","Product":"Tall Unit Pull-Out 600mm","Unit":"₹ per set","Mumbai_Rate":"14960","Delhi_Rate":"13600","Hyderabad_Rate":"13192","Gurgaon_Rate":"13600","Bangalore_Rate":"14280","Pune_Rate":"14688"}'::jsonb
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
    14960,
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
    13600,
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
    13192,
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
    13600,
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
    14280,
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
    14688,
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
    'Häfele',
    5800,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Häfele","Product":"Under Sink Pull-Out Basket","Unit":"₹ per set","Mumbai_Rate":"6380","Delhi_Rate":"5800","Hyderabad_Rate":"5626","Gurgaon_Rate":"5800","Bangalore_Rate":"6090","Pune_Rate":"6264"}'::jsonb
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
    'Under Sink Pull-Out Basket',
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
    'Under Sink Pull-Out Basket',
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
    'Under Sink Pull-Out Basket',
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
    'Under Sink Pull-Out Basket',
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
    'Under Sink Pull-Out Basket',
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
    'Bottle Pull-Out Basket 150mm',
    'baskets',
    NULL,
    NULL,
    'Häfele',
    3800,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Häfele","Product":"Bottle Pull-Out Basket 150mm","Unit":"₹ per set","Mumbai_Rate":"4180","Delhi_Rate":"3800","Hyderabad_Rate":"3686","Gurgaon_Rate":"3800","Bangalore_Rate":"3990","Pune_Rate":"4104"}'::jsonb
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
    'Bottle Pull-Out Basket 150mm',
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
    'Bottle Pull-Out Basket 150mm',
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
    'Bottle Pull-Out Basket 150mm',
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
    'Bottle Pull-Out Basket 150mm',
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
    'Bottle Pull-Out Basket 150mm',
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
    'Matrix Box Drawer 450mm',
    'baskets',
    NULL,
    NULL,
    'Häfele',
    8700,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Häfele","Product":"Matrix Box Drawer 450mm","Unit":"₹ per set","Mumbai_Rate":"9570","Delhi_Rate":"8700","Hyderabad_Rate":"8439","Gurgaon_Rate":"8700","Bangalore_Rate":"9135","Pune_Rate":"9396"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Matrix Box Drawer 450mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matrix Box Drawer 450mm',
    'baskets',
    'Mumbai',
    9570,
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
    'Matrix Box Drawer 450mm',
    'baskets',
    'Delhi',
    8700,
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
    'Matrix Box Drawer 450mm',
    'baskets',
    'Hyderabad',
    8439,
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
    'Matrix Box Drawer 450mm',
    'baskets',
    'Gurgaon',
    8700,
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
    'Matrix Box Drawer 450mm',
    'baskets',
    'Bangalore',
    9135,
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
    'Matrix Box Drawer 450mm',
    'baskets',
    'Pune',
    9396,
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
    'Matrix Box Drawer 600mm',
    'baskets',
    NULL,
    NULL,
    'Häfele',
    9800,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Häfele","Product":"Matrix Box Drawer 600mm","Unit":"₹ per set","Mumbai_Rate":"10780","Delhi_Rate":"9800","Hyderabad_Rate":"9506","Gurgaon_Rate":"9800","Bangalore_Rate":"10290","Pune_Rate":"10584"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Matrix Box Drawer 600mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matrix Box Drawer 600mm',
    'baskets',
    'Mumbai',
    10780,
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
    'Matrix Box Drawer 600mm',
    'baskets',
    'Delhi',
    9800,
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
    'Matrix Box Drawer 600mm',
    'baskets',
    'Hyderabad',
    9506,
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
    'Matrix Box Drawer 600mm',
    'baskets',
    'Gurgaon',
    9800,
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
    'Matrix Box Drawer 600mm',
    'baskets',
    'Bangalore',
    10290,
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
    'Matrix Box Drawer 600mm',
    'baskets',
    'Pune',
    10584,
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
    'Wicker Basket with Frame 450mm',
    'baskets',
    NULL,
    NULL,
    'Häfele',
    9700,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Häfele","Product":"Wicker Basket with Frame 450mm","Unit":"₹ per set","Mumbai_Rate":"10670","Delhi_Rate":"9700","Hyderabad_Rate":"9409","Gurgaon_Rate":"9700","Bangalore_Rate":"10185","Pune_Rate":"10476"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Wicker Basket with Frame 450mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wicker Basket with Frame 450mm',
    'baskets',
    'Mumbai',
    10670,
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
    'Wicker Basket with Frame 450mm',
    'baskets',
    'Delhi',
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
    'Wicker Basket with Frame 450mm',
    'baskets',
    'Hyderabad',
    9409,
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
    'Wicker Basket with Frame 450mm',
    'baskets',
    'Gurgaon',
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
    'Wicker Basket with Frame 450mm',
    'baskets',
    'Bangalore',
    10185,
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
    'Wicker Basket with Frame 450mm',
    'baskets',
    'Pune',
    10476,
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
    'Wicker Basket with Frame 600mm',
    'baskets',
    NULL,
    NULL,
    'Häfele',
    11800,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Häfele","Product":"Wicker Basket with Frame 600mm","Unit":"₹ per set","Mumbai_Rate":"12980","Delhi_Rate":"11800","Hyderabad_Rate":"11446","Gurgaon_Rate":"11800","Bangalore_Rate":"12390","Pune_Rate":"12744"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Wicker Basket with Frame 600mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wicker Basket with Frame 600mm',
    'baskets',
    'Mumbai',
    12980,
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
    'Wicker Basket with Frame 600mm',
    'baskets',
    'Delhi',
    11800,
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
    'Wicker Basket with Frame 600mm',
    'baskets',
    'Hyderabad',
    11446,
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
    'Wicker Basket with Frame 600mm',
    'baskets',
    'Gurgaon',
    11800,
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
    'Wicker Basket with Frame 600mm',
    'baskets',
    'Bangalore',
    12390,
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
    'Wicker Basket with Frame 600mm',
    'baskets',
    'Pune',
    12744,
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
    'Häfele',
    6800,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Häfele","Product":"SS Partition Basket 450mm","Unit":"₹ per set","Mumbai_Rate":"7480","Delhi_Rate":"6800","Hyderabad_Rate":"6596","Gurgaon_Rate":"6800","Bangalore_Rate":"7140","Pune_Rate":"7344"}'::jsonb
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
    'SS Partition Basket 450mm',
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
    'SS Partition Basket 450mm',
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
    'SS Partition Basket 450mm',
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
    'SS Partition Basket 450mm',
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
    'SS Partition Basket 450mm',
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
    'SS Partition Basket 600mm',
    'baskets',
    NULL,
    NULL,
    'Häfele',
    8200,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Häfele","Product":"SS Partition Basket 600mm","Unit":"₹ per set","Mumbai_Rate":"9020","Delhi_Rate":"8200","Hyderabad_Rate":"7954","Gurgaon_Rate":"8200","Bangalore_Rate":"8610","Pune_Rate":"8856"}'::jsonb
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
    9020,
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
    8200,
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
    7954,
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
    8200,
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
    8610,
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
    8856,
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
    'Häfele',
    7700,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Häfele","Product":"Thali/Plate Basket 600mm","Unit":"₹ per set","Mumbai_Rate":"8470","Delhi_Rate":"7700","Hyderabad_Rate":"7469","Gurgaon_Rate":"7700","Bangalore_Rate":"8085","Pune_Rate":"8316"}'::jsonb
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
    8470,
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
    'Thali/Plate Basket 600mm',
    'baskets',
    'Hyderabad',
    7469,
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
    'Thali/Plate Basket 600mm',
    'baskets',
    'Bangalore',
    8085,
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
    8316,
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
    'Häfele',
    3400,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Häfele","Product":"Spice Pull-Out Basket 150mm","Unit":"₹ per set","Mumbai_Rate":"3740","Delhi_Rate":"3400","Hyderabad_Rate":"3298","Gurgaon_Rate":"3400","Bangalore_Rate":"3570","Pune_Rate":"3672"}'::jsonb
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
    3740,
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
    3400,
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
    3298,
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
    3400,
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
    3570,
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
    3672,
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
    'Tandem Pull-Out Basket 450mm',
    'baskets',
    NULL,
    NULL,
    'Blum',
    8000,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Blum","Product":"Tandem Pull-Out Basket 450mm","Unit":"₹ per set","Mumbai_Rate":"8800","Delhi_Rate":"8000","Hyderabad_Rate":"7760","Gurgaon_Rate":"8000","Bangalore_Rate":"8400","Pune_Rate":"8640"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Tandem Pull-Out Basket 450mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Tandem Pull-Out Basket 450mm',
    'baskets',
    'Mumbai',
    8800,
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
    'Tandem Pull-Out Basket 450mm',
    'baskets',
    'Delhi',
    8000,
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
    'Tandem Pull-Out Basket 450mm',
    'baskets',
    'Hyderabad',
    7760,
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
    'Tandem Pull-Out Basket 450mm',
    'baskets',
    'Gurgaon',
    8000,
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
    'Tandem Pull-Out Basket 450mm',
    'baskets',
    'Bangalore',
    8400,
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
    'Tandem Pull-Out Basket 450mm',
    'baskets',
    'Pune',
    8640,
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
    'Tandem Pull-Out Basket 600mm',
    'baskets',
    NULL,
    NULL,
    'Blum',
    10000,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Blum","Product":"Tandem Pull-Out Basket 600mm","Unit":"₹ per set","Mumbai_Rate":"11000","Delhi_Rate":"10000","Hyderabad_Rate":"9700","Gurgaon_Rate":"10000","Bangalore_Rate":"10500","Pune_Rate":"10800"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Tandem Pull-Out Basket 600mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Tandem Pull-Out Basket 600mm',
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
    'Tandem Pull-Out Basket 600mm',
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
    'Tandem Pull-Out Basket 600mm',
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
    'Tandem Pull-Out Basket 600mm',
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
    'Tandem Pull-Out Basket 600mm',
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
    'Tandem Pull-Out Basket 600mm',
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
