-- COMPREHENSIVE CITYWISE PRICING DATA IMPORT
-- Generated: 2026-01-01T12:27:08.554Z
-- Source: 27 Excel files with city-wise rates
-- Total Rows: 3710
-- Total Sheets: 110

-- ========================================
-- PART 1: PRICING ITEMS
-- ========================================


-- ========================================
-- BATCH 3 of 14
-- Lines: 10011 to 15010
-- ========================================


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
    5720,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
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
    5200,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
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
    5044,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
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
    5200,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
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
    5460,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
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
    5616,
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
    'Thali/Plate Basket',
    'baskets',
    NULL,
    NULL,
    'Godrej',
    6000,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Godrej","Product":"Thali/Plate Basket","Unit":"₹ per set","Mumbai_Rate":"6600","Delhi_Rate":"6000","Hyderabad_Rate":"5820","Gurgaon_Rate":"6000","Bangalore_Rate":"6300","Pune_Rate":"6480"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Thali/Plate Basket
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Thali/Plate Basket',
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
    'Thali/Plate Basket',
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
    'Thali/Plate Basket',
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
    'Thali/Plate Basket',
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
    'Thali/Plate Basket',
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
    'Thali/Plate Basket',
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
    'Pull-Out Wire Basket 450mm',
    'baskets',
    NULL,
    NULL,
    'Ozone',
    3500,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Ozone","Product":"Pull-Out Wire Basket 450mm","Unit":"₹ per set","Mumbai_Rate":"3850","Delhi_Rate":"3500","Hyderabad_Rate":"3395","Gurgaon_Rate":"3500","Bangalore_Rate":"3675","Pune_Rate":"3780"}'::jsonb
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
    'Pull-Out Wire Basket 450mm',
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
    'Pull-Out Wire Basket 450mm',
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
    'Pull-Out Wire Basket 450mm',
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
    'Pull-Out Wire Basket 450mm',
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
    'Pull-Out Wire Basket 450mm',
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
    'Pull-Out Wire Basket 600mm',
    'baskets',
    NULL,
    NULL,
    'Ozone',
    4300,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Ozone","Product":"Pull-Out Wire Basket 600mm","Unit":"₹ per set","Mumbai_Rate":"4730","Delhi_Rate":"4300","Hyderabad_Rate":"4171","Gurgaon_Rate":"4300","Bangalore_Rate":"4515","Pune_Rate":"4644"}'::jsonb
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
    4730,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
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
    4300,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
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
    4171,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
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
    4300,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
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
    4515,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
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
    4644,
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
    'Corner Basket Basic',
    'baskets',
    NULL,
    NULL,
    'Ozone',
    11000,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Ozone","Product":"Corner Basket Basic","Unit":"₹ per set","Mumbai_Rate":"12100","Delhi_Rate":"11000","Hyderabad_Rate":"10670","Gurgaon_Rate":"11000","Bangalore_Rate":"11550","Pune_Rate":"11880"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Corner Basket Basic
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Corner Basket Basic',
    'baskets',
    'Mumbai',
    12100,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Corner Basket Basic',
    'baskets',
    'Delhi',
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
    'Corner Basket Basic',
    'baskets',
    'Hyderabad',
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
    'Corner Basket Basic',
    'baskets',
    'Gurgaon',
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
    'Corner Basket Basic',
    'baskets',
    'Bangalore',
    11550,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Corner Basket Basic',
    'baskets',
    'Pune',
    11880,
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
    'Cutlery Basket 450mm',
    'baskets',
    NULL,
    NULL,
    'Ozone',
    2800,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Ozone","Product":"Cutlery Basket 450mm","Unit":"₹ per set","Mumbai_Rate":"3080","Delhi_Rate":"2800","Hyderabad_Rate":"2716","Gurgaon_Rate":"2800","Bangalore_Rate":"2940","Pune_Rate":"3024"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Cutlery Basket 450mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Cutlery Basket 450mm',
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
    'Cutlery Basket 450mm',
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
    'Cutlery Basket 450mm',
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
    'Cutlery Basket 450mm',
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
    'Cutlery Basket 450mm',
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
    'Cutlery Basket 450mm',
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
    'Cutlery Basket 600mm',
    'baskets',
    NULL,
    NULL,
    'Ozone',
    3400,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Ozone","Product":"Cutlery Basket 600mm","Unit":"₹ per set","Mumbai_Rate":"3740","Delhi_Rate":"3400","Hyderabad_Rate":"3298","Gurgaon_Rate":"3400","Bangalore_Rate":"3570","Pune_Rate":"3672"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Cutlery Basket 600mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Cutlery Basket 600mm',
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
    'Cutlery Basket 600mm',
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
    'Cutlery Basket 600mm',
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
    'Cutlery Basket 600mm',
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
    'Cutlery Basket 600mm',
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
    'Cutlery Basket 600mm',
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
    'Tall Unit Basket 450mm',
    'baskets',
    NULL,
    NULL,
    'Ozone',
    7000,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Ozone","Product":"Tall Unit Basket 450mm","Unit":"₹ per set","Mumbai_Rate":"7700","Delhi_Rate":"7000","Hyderabad_Rate":"6790","Gurgaon_Rate":"7000","Bangalore_Rate":"7350","Pune_Rate":"7560"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Tall Unit Basket 450mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Tall Unit Basket 450mm',
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
    'Tall Unit Basket 450mm',
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
    'Tall Unit Basket 450mm',
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
    'Tall Unit Basket 450mm',
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
    'Tall Unit Basket 450mm',
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
    'Tall Unit Basket 450mm',
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
    'Tall Unit Basket 600mm',
    'baskets',
    NULL,
    NULL,
    'Ozone',
    8200,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Ozone","Product":"Tall Unit Basket 600mm","Unit":"₹ per set","Mumbai_Rate":"9020","Delhi_Rate":"8200","Hyderabad_Rate":"7954","Gurgaon_Rate":"8200","Bangalore_Rate":"8610","Pune_Rate":"8856"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Tall Unit Basket 600mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Tall Unit Basket 600mm',
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
    'Tall Unit Basket 600mm',
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
    'Tall Unit Basket 600mm',
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
    'Tall Unit Basket 600mm',
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
    'Tall Unit Basket 600mm',
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
    'Tall Unit Basket 600mm',
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
    'Under Sink Basket',
    'baskets',
    NULL,
    NULL,
    'Ozone',
    3400,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Ozone","Product":"Under Sink Basket","Unit":"₹ per set","Mumbai_Rate":"3740","Delhi_Rate":"3400","Hyderabad_Rate":"3298","Gurgaon_Rate":"3400","Bangalore_Rate":"3570","Pune_Rate":"3672"}'::jsonb
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
    'Under Sink Basket',
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
    'Under Sink Basket',
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
    'Under Sink Basket',
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
    'Under Sink Basket',
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
    'Under Sink Basket',
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
    'Bottle Pull-Out 150mm',
    'baskets',
    NULL,
    NULL,
    'Ozone',
    2400,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Ozone","Product":"Bottle Pull-Out 150mm","Unit":"₹ per set","Mumbai_Rate":"2640","Delhi_Rate":"2400","Hyderabad_Rate":"2328","Gurgaon_Rate":"2400","Bangalore_Rate":"2520","Pune_Rate":"2592"}'::jsonb
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
    2640,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
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
    2400,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
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
    2328,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
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
    2400,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
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
    2520,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
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
    2592,
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
    'Drawer Basket 450mm',
    'baskets',
    NULL,
    NULL,
    'Ozone',
    5000,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Ozone","Product":"Drawer Basket 450mm","Unit":"₹ per set","Mumbai_Rate":"5500","Delhi_Rate":"5000","Hyderabad_Rate":"4850","Gurgaon_Rate":"5000","Bangalore_Rate":"5250","Pune_Rate":"5400"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Drawer Basket 450mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Drawer Basket 450mm',
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
    'Drawer Basket 450mm',
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
    'Drawer Basket 450mm',
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
    'Drawer Basket 450mm',
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
    'Drawer Basket 450mm',
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
    'Drawer Basket 450mm',
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
    'Partition Basket 450mm',
    'baskets',
    NULL,
    NULL,
    'Ozone',
    3800,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Ozone","Product":"Partition Basket 450mm","Unit":"₹ per set","Mumbai_Rate":"4180","Delhi_Rate":"3800","Hyderabad_Rate":"3686","Gurgaon_Rate":"3800","Bangalore_Rate":"3990","Pune_Rate":"4104"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Partition Basket 450mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Partition Basket 450mm',
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
    'Partition Basket 450mm',
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
    'Partition Basket 450mm',
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
    'Partition Basket 450mm',
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
    'Partition Basket 450mm',
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
    'Partition Basket 450mm',
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
    'Plate Basket',
    'baskets',
    NULL,
    NULL,
    'Ozone',
    4500,
    '₹ per set',
    'citywise_excel_2025',
    'baskets_citywise_rates_2025.xlsx',
    'Baskets_CityWise_Rates',
    '{"Brand":"Ozone","Product":"Plate Basket","Unit":"₹ per set","Mumbai_Rate":"4950","Delhi_Rate":"4500","Hyderabad_Rate":"4365","Gurgaon_Rate":"4500","Bangalore_Rate":"4725","Pune_Rate":"4860"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Plate Basket
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Plate Basket',
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
    'Plate Basket',
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
    'Plate Basket',
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
    'Plate Basket',
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
    'Plate Basket',
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
    'Plate Basket',
    'baskets',
    'Pune',
    4860,
    'baskets_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

-- ========================================
-- Category: edgebanding
-- Sheet: EdgeBanding_CityWise_Rates
-- Rows: 76
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
    'PVC Edge Band 22mm × 0.45mm (50m roll)',
    'edgebanding',
    NULL,
    NULL,
    'REHAU',
    8,
    '₹ per meter',
    'citywise_excel_2025',
    'edgebanding_citywise_rates_2025.xlsx',
    'EdgeBanding_CityWise_Rates',
    '{"Brand":"REHAU","Product":"PVC Edge Band 22mm × 0.45mm (50m roll)","Unit":"₹ per meter","Mumbai_Rate":"8.8","Delhi_Rate":"8","Hyderabad_Rate":"7.76","Gurgaon_Rate":"8","Bangalore_Rate":"8.4","Pune_Rate":"8.6"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: PVC Edge Band 22mm × 0.45mm (50m roll)
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PVC Edge Band 22mm × 0.45mm (50m roll)',
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
    'PVC Edge Band 22mm × 0.45mm (50m roll)',
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
    'PVC Edge Band 22mm × 0.45mm (50m roll)',
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
    'PVC Edge Band 22mm × 0.45mm (50m roll)',
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
    'PVC Edge Band 22mm × 0.45mm (50m roll)',
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
    'PVC Edge Band 22mm × 0.45mm (50m roll)',
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
    'REHAU',
    10,
    '₹ per meter',
    'citywise_excel_2025',
    'edgebanding_citywise_rates_2025.xlsx',
    'EdgeBanding_CityWise_Rates',
    '{"Brand":"REHAU","Product":"PVC Edge Band 22mm × 0.80mm (50m roll)","Unit":"₹ per meter","Mumbai_Rate":"11","Delhi_Rate":"10","Hyderabad_Rate":"9.7","Gurgaon_Rate":"10","Bangalore_Rate":"10.5","Pune_Rate":"10.8"}'::jsonb
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
    'PVC Edge Band 22mm × 0.80mm (50m roll)',
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
    'PVC Edge Band 22mm × 0.80mm (50m roll)',
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
    'PVC Edge Band 22mm × 0.80mm (50m roll)',
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
    'PVC Edge Band 22mm × 0.80mm (50m roll)',
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
    'PVC Edge Band 22mm × 0.80mm (50m roll)',
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
    'PVC Edge Band 25mm × 0.80mm (50m roll)',
    'edgebanding',
    NULL,
    NULL,
    'REHAU',
    11,
    '₹ per meter',
    'citywise_excel_2025',
    'edgebanding_citywise_rates_2025.xlsx',
    'EdgeBanding_CityWise_Rates',
    '{"Brand":"REHAU","Product":"PVC Edge Band 25mm × 0.80mm (50m roll)","Unit":"₹ per meter","Mumbai_Rate":"12.1","Delhi_Rate":"11","Hyderabad_Rate":"10.67","Gurgaon_Rate":"11","Bangalore_Rate":"11.6","Pune_Rate":"11.9"}'::jsonb
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
    'PVC Edge Band 25mm × 0.80mm (50m roll)',
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
    'PVC Edge Band 25mm × 0.80mm (50m roll)',
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
    'PVC Edge Band 25mm × 0.80mm (50m roll)',
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
    'PVC Edge Band 25mm × 0.80mm (50m roll)',
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
    'PVC Edge Band 25mm × 0.80mm (50m roll)',
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
    'PVC Edge Band 30mm × 0.80mm (50m roll)',
    'edgebanding',
    NULL,
    NULL,
    'REHAU',
    12,
    '₹ per meter',
    'citywise_excel_2025',
    'edgebanding_citywise_rates_2025.xlsx',
    'EdgeBanding_CityWise_Rates',
    '{"Brand":"REHAU","Product":"PVC Edge Band 30mm × 0.80mm (50m roll)","Unit":"₹ per meter","Mumbai_Rate":"13.2","Delhi_Rate":"12","Hyderabad_Rate":"11.64","Gurgaon_Rate":"12","Bangalore_Rate":"12.6","Pune_Rate":"13"}'::jsonb
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
    13.2,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
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
    12,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
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
    11.64,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
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
    12,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
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
    12.6,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
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
    13,
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
    'REHAU',
    15,
    '₹ per meter',
    'citywise_excel_2025',
    'edgebanding_citywise_rates_2025.xlsx',
    'EdgeBanding_CityWise_Rates',
    '{"Brand":"REHAU","Product":"PVC Edge Band 45mm × 0.80mm (50m roll)","Unit":"₹ per meter","Mumbai_Rate":"16.5","Delhi_Rate":"15","Hyderabad_Rate":"14.55","Gurgaon_Rate":"15","Bangalore_Rate":"15.8","Pune_Rate":"16.2"}'::jsonb
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
    16.5,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
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
    15,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
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
    14.55,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
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
    15,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
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
    15.8,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
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
    16.2,
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
    'ABS Edge Band 22mm × 0.80mm (50m roll)',
    'edgebanding',
    NULL,
    NULL,
    'REHAU',
    12,
    '₹ per meter',
    'citywise_excel_2025',
    'edgebanding_citywise_rates_2025.xlsx',
    'EdgeBanding_CityWise_Rates',
    '{"Brand":"REHAU","Product":"ABS Edge Band 22mm × 0.80mm (50m roll)","Unit":"₹ per meter","Mumbai_Rate":"13.2","Delhi_Rate":"12","Hyderabad_Rate":"11.64","Gurgaon_Rate":"12","Bangalore_Rate":"12.6","Pune_Rate":"13"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: ABS Edge Band 22mm × 0.80mm (50m roll)
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'ABS Edge Band 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Mumbai',
    13.2,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'ABS Edge Band 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Delhi',
    12,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'ABS Edge Band 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Hyderabad',
    11.64,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'ABS Edge Band 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Gurgaon',
    12,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'ABS Edge Band 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Bangalore',
    12.6,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'ABS Edge Band 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Pune',
    13,
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
    'ABS Edge Band 25mm × 0.80mm (50m roll)',
    'edgebanding',
    NULL,
    NULL,
    'REHAU',
    13,
    '₹ per meter',
    'citywise_excel_2025',
    'edgebanding_citywise_rates_2025.xlsx',
    'EdgeBanding_CityWise_Rates',
    '{"Brand":"REHAU","Product":"ABS Edge Band 25mm × 0.80mm (50m roll)","Unit":"₹ per meter","Mumbai_Rate":"14.3","Delhi_Rate":"13","Hyderabad_Rate":"12.61","Gurgaon_Rate":"13","Bangalore_Rate":"13.7","Pune_Rate":"14"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: ABS Edge Band 25mm × 0.80mm (50m roll)
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'ABS Edge Band 25mm × 0.80mm (50m roll)',
    'edgebanding',
    'Mumbai',
    14.3,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'ABS Edge Band 25mm × 0.80mm (50m roll)',
    'edgebanding',
    'Delhi',
    13,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'ABS Edge Band 25mm × 0.80mm (50m roll)',
    'edgebanding',
    'Hyderabad',
    12.61,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'ABS Edge Band 25mm × 0.80mm (50m roll)',
    'edgebanding',
    'Gurgaon',
    13,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'ABS Edge Band 25mm × 0.80mm (50m roll)',
    'edgebanding',
    'Bangalore',
    13.7,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'ABS Edge Band 25mm × 0.80mm (50m roll)',
    'edgebanding',
    'Pune',
    14,
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
    'ABS Edge Band 30mm × 0.80mm (50m roll)',
    'edgebanding',
    NULL,
    NULL,
    'REHAU',
    14,
    '₹ per meter',
    'citywise_excel_2025',
    'edgebanding_citywise_rates_2025.xlsx',
    'EdgeBanding_CityWise_Rates',
    '{"Brand":"REHAU","Product":"ABS Edge Band 30mm × 0.80mm (50m roll)","Unit":"₹ per meter","Mumbai_Rate":"15.4","Delhi_Rate":"14","Hyderabad_Rate":"13.58","Gurgaon_Rate":"14","Bangalore_Rate":"14.7","Pune_Rate":"15.1"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: ABS Edge Band 30mm × 0.80mm (50m roll)
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'ABS Edge Band 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Mumbai',
    15.4,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'ABS Edge Band 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Delhi',
    14,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'ABS Edge Band 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Hyderabad',
    13.58,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'ABS Edge Band 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Gurgaon',
    14,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'ABS Edge Band 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Bangalore',
    14.7,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'ABS Edge Band 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Pune',
    15.1,
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
    'ABS Edge Band 45mm × 0.80mm (50m roll)',
    'edgebanding',
    NULL,
    NULL,
    'REHAU',
    17,
    '₹ per meter',
    'citywise_excel_2025',
    'edgebanding_citywise_rates_2025.xlsx',
    'EdgeBanding_CityWise_Rates',
    '{"Brand":"REHAU","Product":"ABS Edge Band 45mm × 0.80mm (50m roll)","Unit":"₹ per meter","Mumbai_Rate":"18.7","Delhi_Rate":"17","Hyderabad_Rate":"16.49","Gurgaon_Rate":"17","Bangalore_Rate":"17.9","Pune_Rate":"18.4"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: ABS Edge Band 45mm × 0.80mm (50m roll)
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'ABS Edge Band 45mm × 0.80mm (50m roll)',
    'edgebanding',
    'Mumbai',
    18.7,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'ABS Edge Band 45mm × 0.80mm (50m roll)',
    'edgebanding',
    'Delhi',
    17,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'ABS Edge Band 45mm × 0.80mm (50m roll)',
    'edgebanding',
    'Hyderabad',
    16.49,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'ABS Edge Band 45mm × 0.80mm (50m roll)',
    'edgebanding',
    'Gurgaon',
    17,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'ABS Edge Band 45mm × 0.80mm (50m roll)',
    'edgebanding',
    'Bangalore',
    17.9,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'ABS Edge Band 45mm × 0.80mm (50m roll)',
    'edgebanding',
    'Pune',
    18.4,
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
    'PMMA Edge Band 22mm × 0.80mm (50m roll)',
    'edgebanding',
    NULL,
    NULL,
    'REHAU',
    20,
    '₹ per meter',
    'citywise_excel_2025',
    'edgebanding_citywise_rates_2025.xlsx',
    'EdgeBanding_CityWise_Rates',
    '{"Brand":"REHAU","Product":"PMMA Edge Band 22mm × 0.80mm (50m roll)","Unit":"₹ per meter","Mumbai_Rate":"22","Delhi_Rate":"20","Hyderabad_Rate":"19.4","Gurgaon_Rate":"20","Bangalore_Rate":"21","Pune_Rate":"21.6"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: PMMA Edge Band 22mm × 0.80mm (50m roll)
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PMMA Edge Band 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Mumbai',
    22,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PMMA Edge Band 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Delhi',
    20,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PMMA Edge Band 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Hyderabad',
    19.4,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PMMA Edge Band 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Gurgaon',
    20,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PMMA Edge Band 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Bangalore',
    21,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PMMA Edge Band 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Pune',
    21.6,
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
    'PMMA Edge Band 25mm × 1.30mm (50m roll)',
    'edgebanding',
    NULL,
    NULL,
    'REHAU',
    25,
    '₹ per meter',
    'citywise_excel_2025',
    'edgebanding_citywise_rates_2025.xlsx',
    'EdgeBanding_CityWise_Rates',
    '{"Brand":"REHAU","Product":"PMMA Edge Band 25mm × 1.30mm (50m roll)","Unit":"₹ per meter","Mumbai_Rate":"27.5","Delhi_Rate":"25","Hyderabad_Rate":"24.25","Gurgaon_Rate":"25","Bangalore_Rate":"26.3","Pune_Rate":"27"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: PMMA Edge Band 25mm × 1.30mm (50m roll)
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PMMA Edge Band 25mm × 1.30mm (50m roll)',
    'edgebanding',
    'Mumbai',
    27.5,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PMMA Edge Band 25mm × 1.30mm (50m roll)',
    'edgebanding',
    'Delhi',
    25,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PMMA Edge Band 25mm × 1.30mm (50m roll)',
    'edgebanding',
    'Hyderabad',
    24.25,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PMMA Edge Band 25mm × 1.30mm (50m roll)',
    'edgebanding',
    'Gurgaon',
    25,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PMMA Edge Band 25mm × 1.30mm (50m roll)',
    'edgebanding',
    'Bangalore',
    26.3,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PMMA Edge Band 25mm × 1.30mm (50m roll)',
    'edgebanding',
    'Pune',
    27,
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
    'PMMA Edge Band 30mm × 1.30mm (50m roll)',
    'edgebanding',
    NULL,
    NULL,
    'REHAU',
    28,
    '₹ per meter',
    'citywise_excel_2025',
    'edgebanding_citywise_rates_2025.xlsx',
    'EdgeBanding_CityWise_Rates',
    '{"Brand":"REHAU","Product":"PMMA Edge Band 30mm × 1.30mm (50m roll)","Unit":"₹ per meter","Mumbai_Rate":"30.8","Delhi_Rate":"28","Hyderabad_Rate":"27.16","Gurgaon_Rate":"28","Bangalore_Rate":"29.4","Pune_Rate":"30.2"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: PMMA Edge Band 30mm × 1.30mm (50m roll)
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PMMA Edge Band 30mm × 1.30mm (50m roll)',
    'edgebanding',
    'Mumbai',
    30.8,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PMMA Edge Band 30mm × 1.30mm (50m roll)',
    'edgebanding',
    'Delhi',
    28,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PMMA Edge Band 30mm × 1.30mm (50m roll)',
    'edgebanding',
    'Hyderabad',
    27.16,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PMMA Edge Band 30mm × 1.30mm (50m roll)',
    'edgebanding',
    'Gurgaon',
    28,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PMMA Edge Band 30mm × 1.30mm (50m roll)',
    'edgebanding',
    'Bangalore',
    29.4,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'PMMA Edge Band 30mm × 1.30mm (50m roll)',
    'edgebanding',
    'Pune',
    30.2,
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
    'Matt Finish PVC 22mm × 0.80mm (50m roll)',
    'edgebanding',
    NULL,
    NULL,
    'REHAU',
    11,
    '₹ per meter',
    'citywise_excel_2025',
    'edgebanding_citywise_rates_2025.xlsx',
    'EdgeBanding_CityWise_Rates',
    '{"Brand":"REHAU","Product":"Matt Finish PVC 22mm × 0.80mm (50m roll)","Unit":"₹ per meter","Mumbai_Rate":"12.1","Delhi_Rate":"11","Hyderabad_Rate":"10.67","Gurgaon_Rate":"11","Bangalore_Rate":"11.6","Pune_Rate":"11.9"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Matt Finish PVC 22mm × 0.80mm (50m roll)
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matt Finish PVC 22mm × 0.80mm (50m roll)',
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
    'Matt Finish PVC 22mm × 0.80mm (50m roll)',
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
    'Matt Finish PVC 22mm × 0.80mm (50m roll)',
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
    'Matt Finish PVC 22mm × 0.80mm (50m roll)',
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
    'Matt Finish PVC 22mm × 0.80mm (50m roll)',
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
    'Matt Finish PVC 22mm × 0.80mm (50m roll)',
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
    'Matt Finish PVC 30mm × 0.80mm (50m roll)',
    'edgebanding',
    NULL,
    NULL,
    'REHAU',
    13,
    '₹ per meter',
    'citywise_excel_2025',
    'edgebanding_citywise_rates_2025.xlsx',
    'EdgeBanding_CityWise_Rates',
    '{"Brand":"REHAU","Product":"Matt Finish PVC 30mm × 0.80mm (50m roll)","Unit":"₹ per meter","Mumbai_Rate":"14.3","Delhi_Rate":"13","Hyderabad_Rate":"12.61","Gurgaon_Rate":"13","Bangalore_Rate":"13.7","Pune_Rate":"14"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Matt Finish PVC 30mm × 0.80mm (50m roll)
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matt Finish PVC 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Mumbai',
    14.3,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matt Finish PVC 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Delhi',
    13,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matt Finish PVC 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Hyderabad',
    12.61,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matt Finish PVC 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Gurgaon',
    13,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matt Finish PVC 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Bangalore',
    13.7,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Matt Finish PVC 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Pune',
    14,
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
    'High Gloss PVC 22mm × 0.80mm (50m roll)',
    'edgebanding',
    NULL,
    NULL,
    'REHAU',
    12,
    '₹ per meter',
    'citywise_excel_2025',
    'edgebanding_citywise_rates_2025.xlsx',
    'EdgeBanding_CityWise_Rates',
    '{"Brand":"REHAU","Product":"High Gloss PVC 22mm × 0.80mm (50m roll)","Unit":"₹ per meter","Mumbai_Rate":"13.2","Delhi_Rate":"12","Hyderabad_Rate":"11.64","Gurgaon_Rate":"12","Bangalore_Rate":"12.6","Pune_Rate":"13"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: High Gloss PVC 22mm × 0.80mm (50m roll)
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'High Gloss PVC 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Mumbai',
    13.2,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'High Gloss PVC 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Delhi',
    12,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'High Gloss PVC 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Hyderabad',
    11.64,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'High Gloss PVC 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Gurgaon',
    12,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'High Gloss PVC 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Bangalore',
    12.6,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'High Gloss PVC 22mm × 0.80mm (50m roll)',
    'edgebanding',
    'Pune',
    13,
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
    'High Gloss PVC 30mm × 0.80mm (50m roll)',
    'edgebanding',
    NULL,
    NULL,
    'REHAU',
    14,
    '₹ per meter',
    'citywise_excel_2025',
    'edgebanding_citywise_rates_2025.xlsx',
    'EdgeBanding_CityWise_Rates',
    '{"Brand":"REHAU","Product":"High Gloss PVC 30mm × 0.80mm (50m roll)","Unit":"₹ per meter","Mumbai_Rate":"15.4","Delhi_Rate":"14","Hyderabad_Rate":"13.58","Gurgaon_Rate":"14","Bangalore_Rate":"14.7","Pune_Rate":"15.1"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: High Gloss PVC 30mm × 0.80mm (50m roll)
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'High Gloss PVC 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Mumbai',
    15.4,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'High Gloss PVC 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Delhi',
    14,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'High Gloss PVC 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Hyderabad',
    13.58,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'High Gloss PVC 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Gurgaon',
    14,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'High Gloss PVC 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Bangalore',
    14.7,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'High Gloss PVC 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Pune',
    15.1,
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
    'Wood Grain PVC 22mm × 0.80mm (50m roll)',
    'edgebanding',
    NULL,
    NULL,
    'REHAU',
    11,
    '₹ per meter',
    'citywise_excel_2025',
    'edgebanding_citywise_rates_2025.xlsx',
    'EdgeBanding_CityWise_Rates',
    '{"Brand":"REHAU","Product":"Wood Grain PVC 22mm × 0.80mm (50m roll)","Unit":"₹ per meter","Mumbai_Rate":"12.1","Delhi_Rate":"11","Hyderabad_Rate":"10.67","Gurgaon_Rate":"11","Bangalore_Rate":"11.6","Pune_Rate":"11.9"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Wood Grain PVC 22mm × 0.80mm (50m roll)
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wood Grain PVC 22mm × 0.80mm (50m roll)',
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
    'Wood Grain PVC 22mm × 0.80mm (50m roll)',
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
    'Wood Grain PVC 22mm × 0.80mm (50m roll)',
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
    'Wood Grain PVC 22mm × 0.80mm (50m roll)',
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
    'Wood Grain PVC 22mm × 0.80mm (50m roll)',
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
    'Wood Grain PVC 22mm × 0.80mm (50m roll)',
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
    'Wood Grain PVC 30mm × 0.80mm (50m roll)',
    'edgebanding',
    NULL,
    NULL,
    'REHAU',
    13,
    '₹ per meter',
    'citywise_excel_2025',
    'edgebanding_citywise_rates_2025.xlsx',
    'EdgeBanding_CityWise_Rates',
    '{"Brand":"REHAU","Product":"Wood Grain PVC 30mm × 0.80mm (50m roll)","Unit":"₹ per meter","Mumbai_Rate":"14.3","Delhi_Rate":"13","Hyderabad_Rate":"12.61","Gurgaon_Rate":"13","Bangalore_Rate":"13.7","Pune_Rate":"14"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Wood Grain PVC 30mm × 0.80mm (50m roll)
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wood Grain PVC 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Mumbai',
    14.3,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wood Grain PVC 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Delhi',
    13,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wood Grain PVC 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Hyderabad',
    12.61,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wood Grain PVC 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Gurgaon',
    13,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wood Grain PVC 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Bangalore',
    13.7,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Wood Grain PVC 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Pune',
    14,
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
    'Solid Color PVC 22mm × 0.80mm (50m roll)',
    'edgebanding',
    NULL,
    NULL,
    'REHAU',
    10,
    '₹ per meter',
    'citywise_excel_2025',
    'edgebanding_citywise_rates_2025.xlsx',
    'EdgeBanding_CityWise_Rates',
    '{"Brand":"REHAU","Product":"Solid Color PVC 22mm × 0.80mm (50m roll)","Unit":"₹ per meter","Mumbai_Rate":"11","Delhi_Rate":"10","Hyderabad_Rate":"9.7","Gurgaon_Rate":"10","Bangalore_Rate":"10.5","Pune_Rate":"10.8"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Solid Color PVC 22mm × 0.80mm (50m roll)
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Color PVC 22mm × 0.80mm (50m roll)',
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
    'Solid Color PVC 22mm × 0.80mm (50m roll)',
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
    'Solid Color PVC 22mm × 0.80mm (50m roll)',
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
    'Solid Color PVC 22mm × 0.80mm (50m roll)',
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
    'Solid Color PVC 22mm × 0.80mm (50m roll)',
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
    'Solid Color PVC 22mm × 0.80mm (50m roll)',
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
    'Solid Color PVC 30mm × 0.80mm (50m roll)',
    'edgebanding',
    NULL,
    NULL,
    'REHAU',
    12,
    '₹ per meter',
    'citywise_excel_2025',
    'edgebanding_citywise_rates_2025.xlsx',
    'EdgeBanding_CityWise_Rates',
    '{"Brand":"REHAU","Product":"Solid Color PVC 30mm × 0.80mm (50m roll)","Unit":"₹ per meter","Mumbai_Rate":"13.2","Delhi_Rate":"12","Hyderabad_Rate":"11.64","Gurgaon_Rate":"12","Bangalore_Rate":"12.6","Pune_Rate":"13"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Solid Color PVC 30mm × 0.80mm (50m roll)
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Color PVC 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Mumbai',
    13.2,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Color PVC 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Delhi',
    12,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Color PVC 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Hyderabad',
    11.64,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Color PVC 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Gurgaon',
    12,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Color PVC 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Bangalore',
    12.6,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Solid Color PVC 30mm × 0.80mm (50m roll)',
    'edgebanding',
    'Pune',
    13,
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
    'Greenlam',
    7,
    '₹ per meter',
    'citywise_excel_2025',
    'edgebanding_citywise_rates_2025.xlsx',
    'EdgeBanding_CityWise_Rates',
    '{"Brand":"Greenlam","Product":"PVC Edge Band 22mm × 0.80mm (50m roll)","Unit":"₹ per meter","Mumbai_Rate":"7.7","Delhi_Rate":"7","Hyderabad_Rate":"6.79","Gurgaon_Rate":"7","Bangalore_Rate":"7.4","Pune_Rate":"7.6"}'::jsonb
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
    'PVC Edge Band 22mm × 0.80mm (50m roll)',
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
    'PVC Edge Band 22mm × 0.80mm (50m roll)',
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
    'PVC Edge Band 22mm × 0.80mm (50m roll)',
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
    'PVC Edge Band 22mm × 0.80mm (50m roll)',
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
    'PVC Edge Band 22mm × 0.80mm (50m roll)',
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
    'PVC Edge Band 25mm × 0.80mm (50m roll)',
    'edgebanding',
    NULL,
    NULL,
    'Greenlam',
    8,
    '₹ per meter',
    'citywise_excel_2025',
    'edgebanding_citywise_rates_2025.xlsx',
    'EdgeBanding_CityWise_Rates',
    '{"Brand":"Greenlam","Product":"PVC Edge Band 25mm × 0.80mm (50m roll)","Unit":"₹ per meter","Mumbai_Rate":"8.8","Delhi_Rate":"8","Hyderabad_Rate":"7.76","Gurgaon_Rate":"8","Bangalore_Rate":"8.4","Pune_Rate":"8.6"}'::jsonb
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
    'PVC Edge Band 25mm × 0.80mm (50m roll)',
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
    'PVC Edge Band 25mm × 0.80mm (50m roll)',
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
    'PVC Edge Band 25mm × 0.80mm (50m roll)',
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
    'PVC Edge Band 25mm × 0.80mm (50m roll)',
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
    'PVC Edge Band 25mm × 0.80mm (50m roll)',
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
    'PVC Edge Band 30mm × 0.80mm (50m roll)',
    'edgebanding',
    NULL,
    NULL,
    'Greenlam',
    9,
    '₹ per meter',
    'citywise_excel_2025',
    'edgebanding_citywise_rates_2025.xlsx',
    'EdgeBanding_CityWise_Rates',
    '{"Brand":"Greenlam","Product":"PVC Edge Band 30mm × 0.80mm (50m roll)","Unit":"₹ per meter","Mumbai_Rate":"9.9","Delhi_Rate":"9","Hyderabad_Rate":"8.73","Gurgaon_Rate":"9","Bangalore_Rate":"9.5","Pune_Rate":"9.7"}'::jsonb
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
    'PVC Edge Band 30mm × 0.80mm (50m roll)',
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
    'PVC Edge Band 30mm × 0.80mm (50m roll)',
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
    'PVC Edge Band 30mm × 0.80mm (50m roll)',
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
    'PVC Edge Band 30mm × 0.80mm (50m roll)',
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
    'PVC Edge Band 30mm × 0.80mm (50m roll)',
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
    'PVC Edge Band 45mm × 0.80mm (50m roll)',
    'edgebanding',
    NULL,
    NULL,
    'Greenlam',
    11,
    '₹ per meter',
    'citywise_excel_2025',
    'edgebanding_citywise_rates_2025.xlsx',
    'EdgeBanding_CityWise_Rates',
    '{"Brand":"Greenlam","Product":"PVC Edge Band 45mm × 0.80mm (50m roll)","Unit":"₹ per meter","Mumbai_Rate":"12.1","Delhi_Rate":"11","Hyderabad_Rate":"10.67","Gurgaon_Rate":"11","Bangalore_Rate":"11.6","Pune_Rate":"11.9"}'::jsonb
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
    'PVC Edge Band 45mm × 0.80mm (50m roll)',
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
    'PVC Edge Band 45mm × 0.80mm (50m roll)',
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
    'PVC Edge Band 45mm × 0.80mm (50m roll)',
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
    'PVC Edge Band 45mm × 0.80mm (50m roll)',
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
    'Matt Finish 22mm × 0.80mm (50m roll)',
    'edgebanding',
    NULL,
    NULL,
    'Greenlam',
    8,
    '₹ per meter',
    'citywise_excel_2025',
    'edgebanding_citywise_rates_2025.xlsx',
    'EdgeBanding_CityWise_Rates',
    '{"Brand":"Greenlam","Product":"Matt Finish 22mm × 0.80mm (50m roll)","Unit":"₹ per meter","Mumbai_Rate":"8.8","Delhi_Rate":"8","Hyderabad_Rate":"7.76","Gurgaon_Rate":"8","Bangalore_Rate":"8.4","Pune_Rate":"8.6"}'::jsonb
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
    8.8,
    'edgebanding_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
