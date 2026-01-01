-- COMPREHENSIVE CITYWISE PRICING DATA IMPORT
-- Generated: 2026-01-01T12:27:08.554Z
-- Source: 27 Excel files with city-wise rates
-- Total Rows: 3710
-- Total Sheets: 110

-- ========================================
-- PART 1: PRICING ITEMS
-- ========================================


-- ========================================
-- BATCH 9 of 14
-- Lines: 40011 to 45010
-- ========================================

    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

INSERT INTO pricing_items (
    item_name,
    item_category,
    item_subcategory,
    material,
    brand,
    base_price,
    unit,
    source,
    source_file,
    source_sheet,
    metadata
) VALUES (
    'Soft-Close Full Extension 450mm',
    'hardware_hinges_channels',
    NULL,
    NULL,
    'Ebco',
    450,
    '₹ per piece',
    'citywise_excel_2025',
    'hardware_hinges_channels_citywise_rates_2025.xlsx',
    'Hardware_CityWise_Rates',
    '{"Brand":"Ebco","Product":"Soft-Close Full Extension 450mm","Unit":"₹ per piece","Mumbai_Rate":"495","Delhi_Rate":"450","Hyderabad_Rate":"435","Gurgaon_Rate":"450","Bangalore_Rate":"473","Pune_Rate":"486"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Soft-Close Full Extension 450mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Soft-Close Full Extension 450mm',
    'hardware_hinges_channels',
    'Mumbai',
    495,
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
    'Soft-Close Full Extension 450mm',
    'hardware_hinges_channels',
    'Delhi',
    450,
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
    'Soft-Close Full Extension 450mm',
    'hardware_hinges_channels',
    'Hyderabad',
    435,
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
    'Soft-Close Full Extension 450mm',
    'hardware_hinges_channels',
    'Gurgaon',
    450,
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
    'Soft-Close Full Extension 450mm',
    'hardware_hinges_channels',
    'Bangalore',
    473,
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
    'Soft-Close Full Extension 450mm',
    'hardware_hinges_channels',
    'Pune',
    486,
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
    'Soft-Close Full Extension 550mm',
    'hardware_hinges_channels',
    NULL,
    NULL,
    'Ebco',
    580,
    '₹ per piece',
    'citywise_excel_2025',
    'hardware_hinges_channels_citywise_rates_2025.xlsx',
    'Hardware_CityWise_Rates',
    '{"Brand":"Ebco","Product":"Soft-Close Full Extension 550mm","Unit":"₹ per piece","Mumbai_Rate":"638","Delhi_Rate":"580","Hyderabad_Rate":"560","Gurgaon_Rate":"580","Bangalore_Rate":"609","Pune_Rate":"626"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Soft-Close Full Extension 550mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Soft-Close Full Extension 550mm',
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
    'Soft-Close Full Extension 550mm',
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
    'Soft-Close Full Extension 550mm',
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
    'Soft-Close Full Extension 550mm',
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
    'Soft-Close Full Extension 550mm',
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
    'Soft-Close Full Extension 550mm',
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
    'Standard Full Extension 300mm',
    'hardware_hinges_channels',
    NULL,
    NULL,
    'Ebco',
    260,
    '₹ per piece',
    'citywise_excel_2025',
    'hardware_hinges_channels_citywise_rates_2025.xlsx',
    'Hardware_CityWise_Rates',
    '{"Brand":"Ebco","Product":"Standard Full Extension 300mm","Unit":"₹ per piece","Mumbai_Rate":"286","Delhi_Rate":"260","Hyderabad_Rate":"251","Gurgaon_Rate":"260","Bangalore_Rate":"273","Pune_Rate":"281"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Standard Full Extension 300mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Standard Full Extension 300mm',
    'hardware_hinges_channels',
    'Mumbai',
    286,
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
    'Standard Full Extension 300mm',
    'hardware_hinges_channels',
    'Delhi',
    260,
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
    'Standard Full Extension 300mm',
    'hardware_hinges_channels',
    'Hyderabad',
    251,
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
    'Standard Full Extension 300mm',
    'hardware_hinges_channels',
    'Gurgaon',
    260,
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
    'Standard Full Extension 300mm',
    'hardware_hinges_channels',
    'Bangalore',
    273,
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
    'Standard Full Extension 300mm',
    'hardware_hinges_channels',
    'Pune',
    281,
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
    'Ebco',
    380,
    '₹ per piece',
    'citywise_excel_2025',
    'hardware_hinges_channels_citywise_rates_2025.xlsx',
    'Hardware_CityWise_Rates',
    '{"Brand":"Ebco","Product":"Standard Full Extension 450mm","Unit":"₹ per piece","Mumbai_Rate":"418","Delhi_Rate":"380","Hyderabad_Rate":"367","Gurgaon_Rate":"380","Bangalore_Rate":"399","Pune_Rate":"410"}'::jsonb
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
    'Ebco',
    500,
    '₹ per piece',
    'citywise_excel_2025',
    'hardware_hinges_channels_citywise_rates_2025.xlsx',
    'Hardware_CityWise_Rates',
    '{"Brand":"Ebco","Product":"Standard Full Extension 550mm","Unit":"₹ per piece","Mumbai_Rate":"550","Delhi_Rate":"500","Hyderabad_Rate":"483","Gurgaon_Rate":"500","Bangalore_Rate":"525","Pune_Rate":"540"}'::jsonb
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
    'Soft-Close Full Extension 300mm',
    'hardware_hinges_channels',
    NULL,
    NULL,
    'Ozone',
    240,
    '₹ per piece',
    'citywise_excel_2025',
    'hardware_hinges_channels_citywise_rates_2025.xlsx',
    'Hardware_CityWise_Rates',
    '{"Brand":"Ozone","Product":"Soft-Close Full Extension 300mm","Unit":"₹ per piece","Mumbai_Rate":"264","Delhi_Rate":"240","Hyderabad_Rate":"232","Gurgaon_Rate":"240","Bangalore_Rate":"252","Pune_Rate":"259"}'::jsonb
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
    264,
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
    240,
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
    232,
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
    240,
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
    252,
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
    259,
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
    'Soft-Close Full Extension 450mm',
    'hardware_hinges_channels',
    NULL,
    NULL,
    'Ozone',
    350,
    '₹ per piece',
    'citywise_excel_2025',
    'hardware_hinges_channels_citywise_rates_2025.xlsx',
    'Hardware_CityWise_Rates',
    '{"Brand":"Ozone","Product":"Soft-Close Full Extension 450mm","Unit":"₹ per piece","Mumbai_Rate":"385","Delhi_Rate":"350","Hyderabad_Rate":"338","Gurgaon_Rate":"350","Bangalore_Rate":"368","Pune_Rate":"378"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Soft-Close Full Extension 450mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Soft-Close Full Extension 450mm',
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
    'Soft-Close Full Extension 450mm',
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
    'Soft-Close Full Extension 450mm',
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
    'Soft-Close Full Extension 450mm',
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
    'Soft-Close Full Extension 450mm',
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
    'Soft-Close Full Extension 450mm',
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
    'Standard Full Extension 450mm',
    'hardware_hinges_channels',
    NULL,
    NULL,
    'Ozone',
    280,
    '₹ per piece',
    'citywise_excel_2025',
    'hardware_hinges_channels_citywise_rates_2025.xlsx',
    'Hardware_CityWise_Rates',
    '{"Brand":"Ozone","Product":"Standard Full Extension 450mm","Unit":"₹ per piece","Mumbai_Rate":"308","Delhi_Rate":"280","Hyderabad_Rate":"270","Gurgaon_Rate":"280","Bangalore_Rate":"294","Pune_Rate":"302"}'::jsonb
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
    308,
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
    280,
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
    270,
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
    280,
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
    294,
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
    302,
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
    'Ozone',
    380,
    '₹ per piece',
    'citywise_excel_2025',
    'hardware_hinges_channels_citywise_rates_2025.xlsx',
    'Hardware_CityWise_Rates',
    '{"Brand":"Ozone","Product":"Standard Full Extension 550mm","Unit":"₹ per piece","Mumbai_Rate":"418","Delhi_Rate":"380","Hyderabad_Rate":"367","Gurgaon_Rate":"380","Bangalore_Rate":"399","Pune_Rate":"410"}'::jsonb
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
    'Standard Full Extension 550mm',
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
    'Standard Full Extension 550mm',
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
    'Standard Full Extension 550mm',
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
    'Standard Full Extension 550mm',
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
    'Standard Full Extension 550mm',
    'hardware_hinges_channels',
    'Pune',
    410,
    'hardware_hinges_channels_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

-- ========================================
-- Category: home_decor_complete
-- Sheet: Decor Complete
-- Rows: 358
-- ========================================

-- ========================================
-- Category: interior_paint_finishes
-- Sheet: Interior Paint Finishes Rates
-- Rows: 35
-- ========================================

-- ========================================
-- Category: kitchen_dado_tiles
-- Sheet: Kitchen Dado Tiles
-- Rows: 37
-- ========================================

-- ========================================
-- Category: laminates
-- Sheet: Laminates_CityWise_Rates
-- Rows: 66
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
    'Matte 0.8mm',
    'laminates',
    NULL,
    NULL,
    'Action Tesa',
    1400,
    '₹ per sheet (8x4 ft)',
    'citywise_excel_2025',
    'laminates_citywise_rates_2025.xlsx',
    'Laminates_CityWise_Rates',
    '{"Brand":"Action Tesa","Product":"Matte 0.8mm","Unit":"₹ per sheet (8x4 ft)","Mumbai_Rate":"1540","Delhi_Rate":"1400","Hyderabad_Rate":"1350","Gurgaon_Rate":"1400","Bangalore_Rate":"1470","Pune_Rate":"1512"}'::jsonb
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
    'Action Tesa',
    1500,
    '₹ per sheet (8x4 ft)',
    'citywise_excel_2025',
    'laminates_citywise_rates_2025.xlsx',
    'Laminates_CityWise_Rates',
    '{"Brand":"Action Tesa","Product":"Matte 1.0mm","Unit":"₹ per sheet (8x4 ft)","Mumbai_Rate":"1650","Delhi_Rate":"1500","Hyderabad_Rate":"1450","Gurgaon_Rate":"1500","Bangalore_Rate":"1575","Pune_Rate":"1620"}'::jsonb
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
    'Action Tesa',
    1600,
    '₹ per sheet (8x4 ft)',
    'citywise_excel_2025',
    'laminates_citywise_rates_2025.xlsx',
    'Laminates_CityWise_Rates',
    '{"Brand":"Action Tesa","Product":"Gloss 0.8mm","Unit":"₹ per sheet (8x4 ft)","Mumbai_Rate":"1760","Delhi_Rate":"1600","Hyderabad_Rate":"1550","Gurgaon_Rate":"1600","Bangalore_Rate":"1680","Pune_Rate":"1728"}'::jsonb
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
    'Action Tesa',
    1700,
    '₹ per sheet (8x4 ft)',
    'citywise_excel_2025',
    'laminates_citywise_rates_2025.xlsx',
    'Laminates_CityWise_Rates',
    '{"Brand":"Action Tesa","Product":"Gloss 1.0mm","Unit":"₹ per sheet (8x4 ft)","Mumbai_Rate":"1870","Delhi_Rate":"1700","Hyderabad_Rate":"1650","Gurgaon_Rate":"1700","Bangalore_Rate":"1785","Pune_Rate":"1836"}'::jsonb
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
    'Action Tesa',
    1800,
    '₹ per sheet (8x4 ft)',
    'citywise_excel_2025',
    'laminates_citywise_rates_2025.xlsx',
    'Laminates_CityWise_Rates',
    '{"Brand":"Action Tesa","Product":"High Gloss 0.8mm","Unit":"₹ per sheet (8x4 ft)","Mumbai_Rate":"1980","Delhi_Rate":"1800","Hyderabad_Rate":"1750","Gurgaon_Rate":"1800","Bangalore_Rate":"1890","Pune_Rate":"1944"}'::jsonb
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
    'Action Tesa',
    1900,
    '₹ per sheet (8x4 ft)',
    'citywise_excel_2025',
    'laminates_citywise_rates_2025.xlsx',
    'Laminates_CityWise_Rates',
    '{"Brand":"Action Tesa","Product":"High Gloss 1.0mm","Unit":"₹ per sheet (8x4 ft)","Mumbai_Rate":"2090","Delhi_Rate":"1900","Hyderabad_Rate":"1850","Gurgaon_Rate":"1900","Bangalore_Rate":"1995","Pune_Rate":"2052"}'::jsonb
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
    'Action Tesa',
    1500,
    '₹ per sheet (8x4 ft)',
    'citywise_excel_2025',
    'laminates_citywise_rates_2025.xlsx',
    'Laminates_CityWise_Rates',
    '{"Brand":"Action Tesa","Product":"Suede 0.8mm","Unit":"₹ per sheet (8x4 ft)","Mumbai_Rate":"1650","Delhi_Rate":"1500","Hyderabad_Rate":"1450","Gurgaon_Rate":"1500","Bangalore_Rate":"1575","Pune_Rate":"1620"}'::jsonb
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
    'Action Tesa',
    1600,
    '₹ per sheet (8x4 ft)',
    'citywise_excel_2025',
    'laminates_citywise_rates_2025.xlsx',
    'Laminates_CityWise_Rates',
    '{"Brand":"Action Tesa","Product":"Suede 1.0mm","Unit":"₹ per sheet (8x4 ft)","Mumbai_Rate":"1760","Delhi_Rate":"1600","Hyderabad_Rate":"1550","Gurgaon_Rate":"1600","Bangalore_Rate":"1680","Pune_Rate":"1728"}'::jsonb
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
    'Action Tesa',
    2000,
    '₹ per sheet (8x4 ft)',
    'citywise_excel_2025',
    'laminates_citywise_rates_2025.xlsx',
    'Laminates_CityWise_Rates',
    '{"Brand":"Action Tesa","Product":"Metallic 1.0mm","Unit":"₹ per sheet (8x4 ft)","Mumbai_Rate":"2200","Delhi_Rate":"2000","Hyderabad_Rate":"1950","Gurgaon_Rate":"2000","Bangalore_Rate":"2100","Pune_Rate":"2160"}'::jsonb
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
    'Action Tesa',
    1900,
    '₹ per sheet (8x4 ft)',
    'citywise_excel_2025',
    'laminates_citywise_rates_2025.xlsx',
    'Laminates_CityWise_Rates',
    '{"Brand":"Action Tesa","Product":"Wood Grain 1.0mm","Unit":"₹ per sheet (8x4 ft)","Mumbai_Rate":"2090","Delhi_Rate":"1900","Hyderabad_Rate":"1850","Gurgaon_Rate":"1900","Bangalore_Rate":"1995","Pune_Rate":"2052"}'::jsonb
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
    'Action Tesa',
    1400,
    '₹ per sheet (8x4 ft)',
    'citywise_excel_2025',
    'laminates_citywise_rates_2025.xlsx',
    'Laminates_CityWise_Rates',
    '{"Brand":"Action Tesa","Product":"Solid Colors 0.8mm","Unit":"₹ per sheet (8x4 ft)","Mumbai_Rate":"1540","Delhi_Rate":"1400","Hyderabad_Rate":"1350","Gurgaon_Rate":"1400","Bangalore_Rate":"1470","Pune_Rate":"1512"}'::jsonb
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
    'Action Tesa',
    1500,
    '₹ per sheet (8x4 ft)',
    'citywise_excel_2025',
    'laminates_citywise_rates_2025.xlsx',
    'Laminates_CityWise_Rates',
    '{"Brand":"Action Tesa","Product":"Solid Colors 1.0mm","Unit":"₹ per sheet (8x4 ft)","Mumbai_Rate":"1650","Delhi_Rate":"1500","Hyderabad_Rate":"1450","Gurgaon_Rate":"1500","Bangalore_Rate":"1575","Pune_Rate":"1620"}'::jsonb
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
    'Merino',
    1600,
    '₹ per sheet (8x4 ft)',
    'citywise_excel_2025',
    'laminates_citywise_rates_2025.xlsx',
    'Laminates_CityWise_Rates',
    '{"Brand":"Merino","Product":"Matte 0.8mm","Unit":"₹ per sheet (8x4 ft)","Mumbai_Rate":"1760","Delhi_Rate":"1600","Hyderabad_Rate":"1550","Gurgaon_Rate":"1600","Bangalore_Rate":"1680","Pune_Rate":"1728"}'::jsonb
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
    'Matte 0.8mm',
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
    'Matte 0.8mm',
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
    'Matte 0.8mm',
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
    'Matte 0.8mm',
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
    'Matte 0.8mm',
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
    'Matte 1.0mm',
    'laminates',
    NULL,
    NULL,
    'Merino',
    1700,
    '₹ per sheet (8x4 ft)',
    'citywise_excel_2025',
    'laminates_citywise_rates_2025.xlsx',
    'Laminates_CityWise_Rates',
    '{"Brand":"Merino","Product":"Matte 1.0mm","Unit":"₹ per sheet (8x4 ft)","Mumbai_Rate":"1870","Delhi_Rate":"1700","Hyderabad_Rate":"1650","Gurgaon_Rate":"1700","Bangalore_Rate":"1785","Pune_Rate":"1836"}'::jsonb
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
    'Matte 1.0mm',
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
    'Matte 1.0mm',
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
    'Matte 1.0mm',
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
    'Matte 1.0mm',
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
    'Matte 1.0mm',
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
    'Gloss 0.8mm',
    'laminates',
    NULL,
    NULL,
    'Merino',
    1800,
    '₹ per sheet (8x4 ft)',
    'citywise_excel_2025',
    'laminates_citywise_rates_2025.xlsx',
    'Laminates_CityWise_Rates',
    '{"Brand":"Merino","Product":"Gloss 0.8mm","Unit":"₹ per sheet (8x4 ft)","Mumbai_Rate":"1980","Delhi_Rate":"1800","Hyderabad_Rate":"1750","Gurgaon_Rate":"1800","Bangalore_Rate":"1890","Pune_Rate":"1944"}'::jsonb
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
    'Gloss 0.8mm',
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
    'Gloss 0.8mm',
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
    'Gloss 0.8mm',
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
    'Gloss 0.8mm',
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
    'Gloss 0.8mm',
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
    'Gloss 1.0mm',
    'laminates',
    NULL,
    NULL,
    'Merino',
    1900,
    '₹ per sheet (8x4 ft)',
    'citywise_excel_2025',
    'laminates_citywise_rates_2025.xlsx',
    'Laminates_CityWise_Rates',
    '{"Brand":"Merino","Product":"Gloss 1.0mm","Unit":"₹ per sheet (8x4 ft)","Mumbai_Rate":"2090","Delhi_Rate":"1900","Hyderabad_Rate":"1850","Gurgaon_Rate":"1900","Bangalore_Rate":"1995","Pune_Rate":"2052"}'::jsonb
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
    'Gloss 1.0mm',
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
    'Gloss 1.0mm',
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
    'Gloss 1.0mm',
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
    'Gloss 1.0mm',
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
    'Gloss 1.0mm',
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
    'High Gloss 0.8mm',
    'laminates',
    NULL,
    NULL,
    'Merino',
    2000,
    '₹ per sheet (8x4 ft)',
    'citywise_excel_2025',
    'laminates_citywise_rates_2025.xlsx',
    'Laminates_CityWise_Rates',
    '{"Brand":"Merino","Product":"High Gloss 0.8mm","Unit":"₹ per sheet (8x4 ft)","Mumbai_Rate":"2200","Delhi_Rate":"2000","Hyderabad_Rate":"1950","Gurgaon_Rate":"2000","Bangalore_Rate":"2100","Pune_Rate":"2160"}'::jsonb
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
    'High Gloss 0.8mm',
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
    'High Gloss 0.8mm',
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
    'High Gloss 0.8mm',
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
    'High Gloss 0.8mm',
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
    'High Gloss 0.8mm',
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
    'High Gloss 1.0mm',
    'laminates',
    NULL,
    NULL,
    'Merino',
    2100,
    '₹ per sheet (8x4 ft)',
    'citywise_excel_2025',
    'laminates_citywise_rates_2025.xlsx',
    'Laminates_CityWise_Rates',
    '{"Brand":"Merino","Product":"High Gloss 1.0mm","Unit":"₹ per sheet (8x4 ft)","Mumbai_Rate":"2310","Delhi_Rate":"2100","Hyderabad_Rate":"2050","Gurgaon_Rate":"2100","Bangalore_Rate":"2205","Pune_Rate":"2268"}'::jsonb
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
    'High Gloss 1.0mm',
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
    'High Gloss 1.0mm',
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
    'High Gloss 1.0mm',
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
    'High Gloss 1.0mm',
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
    'High Gloss 1.0mm',
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
    'Suede 0.8mm',
    'laminates',
    NULL,
    NULL,
    'Merino',
    1700,
    '₹ per sheet (8x4 ft)',
    'citywise_excel_2025',
    'laminates_citywise_rates_2025.xlsx',
    'Laminates_CityWise_Rates',
    '{"Brand":"Merino","Product":"Suede 0.8mm","Unit":"₹ per sheet (8x4 ft)","Mumbai_Rate":"1870","Delhi_Rate":"1700","Hyderabad_Rate":"1650","Gurgaon_Rate":"1700","Bangalore_Rate":"1785","Pune_Rate":"1836"}'::jsonb
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
    'Suede 0.8mm',
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
    'Suede 0.8mm',
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
    'Suede 0.8mm',
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
    'Suede 0.8mm',
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
    'Suede 0.8mm',
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
    'Suede 1.0mm',
    'laminates',
    NULL,
    NULL,
    'Merino',
    1800,
    '₹ per sheet (8x4 ft)',
    'citywise_excel_2025',
    'laminates_citywise_rates_2025.xlsx',
    'Laminates_CityWise_Rates',
    '{"Brand":"Merino","Product":"Suede 1.0mm","Unit":"₹ per sheet (8x4 ft)","Mumbai_Rate":"1980","Delhi_Rate":"1800","Hyderabad_Rate":"1750","Gurgaon_Rate":"1800","Bangalore_Rate":"1890","Pune_Rate":"1944"}'::jsonb
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
    'Suede 1.0mm',
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
    'Suede 1.0mm',
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
    'Suede 1.0mm',
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
    'Suede 1.0mm',
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
    'Suede 1.0mm',
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
    'Metallic 1.0mm',
    'laminates',
    NULL,
    NULL,
    'Merino',
    2200,
    '₹ per sheet (8x4 ft)',
    'citywise_excel_2025',
    'laminates_citywise_rates_2025.xlsx',
    'Laminates_CityWise_Rates',
    '{"Brand":"Merino","Product":"Metallic 1.0mm","Unit":"₹ per sheet (8x4 ft)","Mumbai_Rate":"2420","Delhi_Rate":"2200","Hyderabad_Rate":"2150","Gurgaon_Rate":"2200","Bangalore_Rate":"2310","Pune_Rate":"2376"}'::jsonb
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
    2420,
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
    'Hyderabad',
    2150,
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
    'Bangalore',
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
    'Pune',
    2376,
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
    'Merino',
    2100,
    '₹ per sheet (8x4 ft)',
    'citywise_excel_2025',
    'laminates_citywise_rates_2025.xlsx',
    'Laminates_CityWise_Rates',
    '{"Brand":"Merino","Product":"Wood Grain 1.0mm","Unit":"₹ per sheet (8x4 ft)","Mumbai_Rate":"2310","Delhi_Rate":"2100","Hyderabad_Rate":"2050","Gurgaon_Rate":"2100","Bangalore_Rate":"2205","Pune_Rate":"2268"}'::jsonb
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
    'Wood Grain 1.0mm',
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
    'Wood Grain 1.0mm',
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
    'Wood Grain 1.0mm',
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
    'Wood Grain 1.0mm',
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
    'Wood Grain 1.0mm',
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
    'Solid Colors 0.8mm',
    'laminates',
    NULL,
    NULL,
    'Merino',
    1600,
    '₹ per sheet (8x4 ft)',
    'citywise_excel_2025',
    'laminates_citywise_rates_2025.xlsx',
    'Laminates_CityWise_Rates',
    '{"Brand":"Merino","Product":"Solid Colors 0.8mm","Unit":"₹ per sheet (8x4 ft)","Mumbai_Rate":"1760","Delhi_Rate":"1600","Hyderabad_Rate":"1550","Gurgaon_Rate":"1600","Bangalore_Rate":"1680","Pune_Rate":"1728"}'::jsonb
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
    'Solid Colors 0.8mm',
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
    'Solid Colors 0.8mm',
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
    'Solid Colors 0.8mm',
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
    'Solid Colors 0.8mm',
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
    'Solid Colors 0.8mm',
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
    'Solid Colors 1.0mm',
    'laminates',
    NULL,
    NULL,
    'Merino',
    1700,
    '₹ per sheet (8x4 ft)',
    'citywise_excel_2025',
    'laminates_citywise_rates_2025.xlsx',
    'Laminates_CityWise_Rates',
    '{"Brand":"Merino","Product":"Solid Colors 1.0mm","Unit":"₹ per sheet (8x4 ft)","Mumbai_Rate":"1870","Delhi_Rate":"1700","Hyderabad_Rate":"1650","Gurgaon_Rate":"1700","Bangalore_Rate":"1785","Pune_Rate":"1836"}'::jsonb
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
    'Solid Colors 1.0mm',
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
    'Solid Colors 1.0mm',
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
    'Solid Colors 1.0mm',
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
    'Solid Colors 1.0mm',
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
    'Solid Colors 1.0mm',
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
    'Matte 0.8mm',
    'laminates',
    NULL,
    NULL,
    'Greenlam',
    1500,
    '₹ per sheet (8x4 ft)',
    'citywise_excel_2025',
    'laminates_citywise_rates_2025.xlsx',
    'Laminates_CityWise_Rates',
    '{"Brand":"Greenlam","Product":"Matte 0.8mm","Unit":"₹ per sheet (8x4 ft)","Mumbai_Rate":"1650","Delhi_Rate":"1500","Hyderabad_Rate":"1450","Gurgaon_Rate":"1500","Bangalore_Rate":"1575","Pune_Rate":"1620"}'::jsonb
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
    'Matte 0.8mm',
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
    'Matte 0.8mm',
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
    'Matte 0.8mm',
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
    'Matte 0.8mm',
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
    'Matte 0.8mm',
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
    'Matte 1.0mm',
    'laminates',
    NULL,
    NULL,
    'Greenlam',
    1600,
    '₹ per sheet (8x4 ft)',
    'citywise_excel_2025',
    'laminates_citywise_rates_2025.xlsx',
    'Laminates_CityWise_Rates',
    '{"Brand":"Greenlam","Product":"Matte 1.0mm","Unit":"₹ per sheet (8x4 ft)","Mumbai_Rate":"1760","Delhi_Rate":"1600","Hyderabad_Rate":"1550","Gurgaon_Rate":"1600","Bangalore_Rate":"1680","Pune_Rate":"1728"}'::jsonb
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
    'Matte 1.0mm',
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
    'Matte 1.0mm',
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
    'Matte 1.0mm',
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
    'Matte 1.0mm',
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
    'Matte 1.0mm',
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
    'Gloss 0.8mm',
    'laminates',
    NULL,
    NULL,
    'Greenlam',
    1700,
    '₹ per sheet (8x4 ft)',
    'citywise_excel_2025',
    'laminates_citywise_rates_2025.xlsx',
    'Laminates_CityWise_Rates',
    '{"Brand":"Greenlam","Product":"Gloss 0.8mm","Unit":"₹ per sheet (8x4 ft)","Mumbai_Rate":"1870","Delhi_Rate":"1700","Hyderabad_Rate":"1650","Gurgaon_Rate":"1700","Bangalore_Rate":"1785","Pune_Rate":"1836"}'::jsonb
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
    'Gloss 0.8mm',
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
    'Gloss 0.8mm',
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
    'Gloss 0.8mm',
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
    'Gloss 0.8mm',
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
    'Gloss 0.8mm',
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
    'Gloss 1.0mm',
    'laminates',
    NULL,
    NULL,
    'Greenlam',
    1800,
    '₹ per sheet (8x4 ft)',
    'citywise_excel_2025',
    'laminates_citywise_rates_2025.xlsx',
    'Laminates_CityWise_Rates',
    '{"Brand":"Greenlam","Product":"Gloss 1.0mm","Unit":"₹ per sheet (8x4 ft)","Mumbai_Rate":"1980","Delhi_Rate":"1800","Hyderabad_Rate":"1750","Gurgaon_Rate":"1800","Bangalore_Rate":"1890","Pune_Rate":"1944"}'::jsonb
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
    'Gloss 1.0mm',
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
    'Gloss 1.0mm',
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
    'Gloss 1.0mm',
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
    'Gloss 1.0mm',
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
    'Gloss 1.0mm',
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
    'High Gloss 0.8mm',
    'laminates',
    NULL,
    NULL,
    'Greenlam',
    1900,
    '₹ per sheet (8x4 ft)',
    'citywise_excel_2025',
    'laminates_citywise_rates_2025.xlsx',
    'Laminates_CityWise_Rates',
    '{"Brand":"Greenlam","Product":"High Gloss 0.8mm","Unit":"₹ per sheet (8x4 ft)","Mumbai_Rate":"2090","Delhi_Rate":"1900","Hyderabad_Rate":"1850","Gurgaon_Rate":"1900","Bangalore_Rate":"1995","Pune_Rate":"2052"}'::jsonb
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
    'High Gloss 0.8mm',
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
    'High Gloss 0.8mm',
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
    'High Gloss 0.8mm',
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
    'High Gloss 0.8mm',
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
    'High Gloss 0.8mm',
    'laminates',
    'Pune',
    2052,
    'laminates_citywise_rates_2025.xlsx'
