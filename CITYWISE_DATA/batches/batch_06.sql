-- COMPREHENSIVE CITYWISE PRICING DATA IMPORT
-- Generated: 2026-01-01T12:27:08.554Z
-- Source: 27 Excel files with city-wise rates
-- Total Rows: 3710
-- Total Sheets: 110

-- ========================================
-- PART 1: PRICING ITEMS
-- ========================================


-- ========================================
-- BATCH 6 of 14
-- Lines: 25011 to 30010
-- ========================================

    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Cup Pull Handle 64mm (2.5")',
    'handles',
    'Hyderabad',
    165,
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
    170,
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
    179,
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
    184,
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
    'Hettich',
    210,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"Hettich","Product":"Cup Pull Handle 96mm (4\")","Unit":"₹ per piece","Mumbai_Rate":"231","Delhi_Rate":"210","Hyderabad_Rate":"204","Gurgaon_Rate":"210","Bangalore_Rate":"221","Pune_Rate":"227"}'::jsonb
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
    'Cup Pull Handle 96mm (4")',
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
    'Cup Pull Handle 96mm (4")',
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
    'Cup Pull Handle 96mm (4")',
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
    'Cup Pull Handle 96mm (4")',
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
    'Edge Pull Handle 96mm',
    'handles',
    NULL,
    NULL,
    'Hettich',
    190,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"Hettich","Product":"Edge Pull Handle 96mm","Unit":"₹ per piece","Mumbai_Rate":"209","Delhi_Rate":"190","Hyderabad_Rate":"184","Gurgaon_Rate":"190","Bangalore_Rate":"200","Pune_Rate":"205"}'::jsonb
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
    209,
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
    190,
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
    184,
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
    190,
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
    'Pune',
    205,
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
    'Hettich',
    220,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"Hettich","Product":"Edge Pull Handle 128mm","Unit":"₹ per piece","Mumbai_Rate":"242","Delhi_Rate":"220","Hyderabad_Rate":"213","Gurgaon_Rate":"220","Bangalore_Rate":"231","Pune_Rate":"238"}'::jsonb
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
    'Edge Pull Handle 128mm',
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
    'Edge Pull Handle 128mm',
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
    'Edge Pull Handle 128mm',
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
    'Edge Pull Handle 128mm',
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
    'Round Knob 25mm SS',
    'handles',
    NULL,
    NULL,
    'Hettich',
    80,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"Hettich","Product":"Round Knob 25mm SS","Unit":"₹ per piece","Mumbai_Rate":"88","Delhi_Rate":"80","Hyderabad_Rate":"78","Gurgaon_Rate":"80","Bangalore_Rate":"84","Pune_Rate":"86"}'::jsonb
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
    'Hettich',
    100,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"Hettich","Product":"Round Knob 32mm SS","Unit":"₹ per piece","Mumbai_Rate":"110","Delhi_Rate":"100","Hyderabad_Rate":"97","Gurgaon_Rate":"100","Bangalore_Rate":"105","Pune_Rate":"108"}'::jsonb
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
    'T-Bar Handle 128mm',
    'handles',
    NULL,
    NULL,
    'Hettich',
    230,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"Hettich","Product":"T-Bar Handle 128mm","Unit":"₹ per piece","Mumbai_Rate":"253","Delhi_Rate":"230","Hyderabad_Rate":"223","Gurgaon_Rate":"230","Bangalore_Rate":"242","Pune_Rate":"248"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: T-Bar Handle 128mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'T-Bar Handle 128mm',
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
    'T-Bar Handle 128mm',
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
    'T-Bar Handle 128mm',
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
    'T-Bar Handle 128mm',
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
    'T-Bar Handle 128mm',
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
    'T-Bar Handle 128mm',
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
    'Profile Handle 160mm',
    'handles',
    NULL,
    NULL,
    'Hettich',
    250,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"Hettich","Product":"Profile Handle 160mm","Unit":"₹ per piece","Mumbai_Rate":"275","Delhi_Rate":"250","Hyderabad_Rate":"242","Gurgaon_Rate":"250","Bangalore_Rate":"262","Pune_Rate":"270"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Profile Handle 160mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Profile Handle 160mm',
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
    'Profile Handle 160mm',
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
    'Profile Handle 160mm',
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
    'Profile Handle 160mm',
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
    'Profile Handle 160mm',
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
    'Profile Handle 160mm',
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
    'Premium Bar Handle 96mm SS',
    'handles',
    NULL,
    NULL,
    'Blum',
    280,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"Blum","Product":"Premium Bar Handle 96mm SS","Unit":"₹ per piece","Mumbai_Rate":"308","Delhi_Rate":"280","Hyderabad_Rate":"272","Gurgaon_Rate":"280","Bangalore_Rate":"294","Pune_Rate":"302"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Premium Bar Handle 96mm SS
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Premium Bar Handle 96mm SS',
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
    'Premium Bar Handle 96mm SS',
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
    'Premium Bar Handle 96mm SS',
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
    'Premium Bar Handle 96mm SS',
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
    'Premium Bar Handle 96mm SS',
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
    'Premium Bar Handle 96mm SS',
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
    'Premium Bar Handle 128mm SS',
    'handles',
    NULL,
    NULL,
    'Blum',
    320,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"Blum","Product":"Premium Bar Handle 128mm SS","Unit":"₹ per piece","Mumbai_Rate":"352","Delhi_Rate":"320","Hyderabad_Rate":"310","Gurgaon_Rate":"320","Bangalore_Rate":"336","Pune_Rate":"346"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Premium Bar Handle 128mm SS
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Premium Bar Handle 128mm SS',
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
    'Premium Bar Handle 128mm SS',
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
    'Premium Bar Handle 128mm SS',
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
    'Premium Bar Handle 128mm SS',
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
    'Premium Bar Handle 128mm SS',
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
    'Premium Bar Handle 128mm SS',
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
    'Premium Bar Handle 160mm SS',
    'handles',
    NULL,
    NULL,
    'Blum',
    360,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"Blum","Product":"Premium Bar Handle 160mm SS","Unit":"₹ per piece","Mumbai_Rate":"396","Delhi_Rate":"360","Hyderabad_Rate":"349","Gurgaon_Rate":"360","Bangalore_Rate":"378","Pune_Rate":"389"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Premium Bar Handle 160mm SS
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Premium Bar Handle 160mm SS',
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
    'Premium Bar Handle 160mm SS',
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
    'Premium Bar Handle 160mm SS',
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
    'Premium Bar Handle 160mm SS',
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
    'Premium Bar Handle 160mm SS',
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
    'Premium Bar Handle 160mm SS',
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
    'Premium Bar Handle 192mm SS',
    'handles',
    NULL,
    NULL,
    'Blum',
    410,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"Blum","Product":"Premium Bar Handle 192mm SS","Unit":"₹ per piece","Mumbai_Rate":"451","Delhi_Rate":"410","Hyderabad_Rate":"398","Gurgaon_Rate":"410","Bangalore_Rate":"431","Pune_Rate":"443"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Premium Bar Handle 192mm SS
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Premium Bar Handle 192mm SS',
    'handles',
    'Mumbai',
    451,
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
    'Premium Bar Handle 192mm SS',
    'handles',
    'Delhi',
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
    'Premium Bar Handle 192mm SS',
    'handles',
    'Hyderabad',
    398,
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
    'Premium Bar Handle 192mm SS',
    'handles',
    'Gurgaon',
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
    'Premium Bar Handle 192mm SS',
    'handles',
    'Bangalore',
    431,
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
    'Premium Bar Handle 192mm SS',
    'handles',
    'Pune',
    443,
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
    'Cup Pull Handle 96mm Premium',
    'handles',
    NULL,
    NULL,
    'Blum',
    260,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"Blum","Product":"Cup Pull Handle 96mm Premium","Unit":"₹ per piece","Mumbai_Rate":"286","Delhi_Rate":"260","Hyderabad_Rate":"252","Gurgaon_Rate":"260","Bangalore_Rate":"273","Pune_Rate":"281"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Cup Pull Handle 96mm Premium
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Cup Pull Handle 96mm Premium',
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
    'Cup Pull Handle 96mm Premium',
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
    'Cup Pull Handle 96mm Premium',
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
    'Cup Pull Handle 96mm Premium',
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
    'Cup Pull Handle 96mm Premium',
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
    'Cup Pull Handle 96mm Premium',
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
    'Cup Pull Handle 128mm Premium',
    'handles',
    NULL,
    NULL,
    'Blum',
    300,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"Blum","Product":"Cup Pull Handle 128mm Premium","Unit":"₹ per piece","Mumbai_Rate":"330","Delhi_Rate":"300","Hyderabad_Rate":"291","Gurgaon_Rate":"300","Bangalore_Rate":"315","Pune_Rate":"324"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Cup Pull Handle 128mm Premium
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Cup Pull Handle 128mm Premium',
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
    'Cup Pull Handle 128mm Premium',
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
    'Cup Pull Handle 128mm Premium',
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
    'Cup Pull Handle 128mm Premium',
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
    'Cup Pull Handle 128mm Premium',
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
    'Cup Pull Handle 128mm Premium',
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
    'Edge Pull Handle 96mm Premium',
    'handles',
    NULL,
    NULL,
    'Blum',
    240,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"Blum","Product":"Edge Pull Handle 96mm Premium","Unit":"₹ per piece","Mumbai_Rate":"264","Delhi_Rate":"240","Hyderabad_Rate":"233","Gurgaon_Rate":"240","Bangalore_Rate":"252","Pune_Rate":"259"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Edge Pull Handle 96mm Premium
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Edge Pull Handle 96mm Premium',
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
    'Edge Pull Handle 96mm Premium',
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
    'Edge Pull Handle 96mm Premium',
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
    'Edge Pull Handle 96mm Premium',
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
    'Edge Pull Handle 96mm Premium',
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
    'Edge Pull Handle 96mm Premium',
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
    'Edge Pull Handle 128mm Premium',
    'handles',
    NULL,
    NULL,
    'Blum',
    280,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"Blum","Product":"Edge Pull Handle 128mm Premium","Unit":"₹ per piece","Mumbai_Rate":"308","Delhi_Rate":"280","Hyderabad_Rate":"272","Gurgaon_Rate":"280","Bangalore_Rate":"294","Pune_Rate":"302"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Edge Pull Handle 128mm Premium
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Edge Pull Handle 128mm Premium',
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
    'Edge Pull Handle 128mm Premium',
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
    'Edge Pull Handle 128mm Premium',
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
    'Edge Pull Handle 128mm Premium',
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
    'Edge Pull Handle 128mm Premium',
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
    'Edge Pull Handle 128mm Premium',
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
    'Round Knob 32mm Premium',
    'handles',
    NULL,
    NULL,
    'Blum',
    120,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"Blum","Product":"Round Knob 32mm Premium","Unit":"₹ per piece","Mumbai_Rate":"132","Delhi_Rate":"120","Hyderabad_Rate":"116","Gurgaon_Rate":"120","Bangalore_Rate":"126","Pune_Rate":"130"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Round Knob 32mm Premium
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Round Knob 32mm Premium',
    'handles',
    'Mumbai',
    132,
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
    'Round Knob 32mm Premium',
    'handles',
    'Delhi',
    120,
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
    'Round Knob 32mm Premium',
    'handles',
    'Hyderabad',
    116,
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
    'Round Knob 32mm Premium',
    'handles',
    'Gurgaon',
    120,
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
    'Round Knob 32mm Premium',
    'handles',
    'Bangalore',
    126,
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
    'Round Knob 32mm Premium',
    'handles',
    'Pune',
    130,
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
    'Square Knob 32mm Premium',
    'handles',
    NULL,
    NULL,
    'Blum',
    130,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"Blum","Product":"Square Knob 32mm Premium","Unit":"₹ per piece","Mumbai_Rate":"143","Delhi_Rate":"130","Hyderabad_Rate":"126","Gurgaon_Rate":"130","Bangalore_Rate":"137","Pune_Rate":"140"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Square Knob 32mm Premium
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Square Knob 32mm Premium',
    'handles',
    'Mumbai',
    143,
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
    'Square Knob 32mm Premium',
    'handles',
    'Delhi',
    130,
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
    'Square Knob 32mm Premium',
    'handles',
    'Hyderabad',
    126,
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
    'Square Knob 32mm Premium',
    'handles',
    'Gurgaon',
    130,
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
    'Square Knob 32mm Premium',
    'handles',
    'Bangalore',
    137,
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
    'Square Knob 32mm Premium',
    'handles',
    'Pune',
    140,
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
    'T-Bar Handle 128mm Premium',
    'handles',
    NULL,
    NULL,
    'Blum',
    290,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"Blum","Product":"T-Bar Handle 128mm Premium","Unit":"₹ per piece","Mumbai_Rate":"319","Delhi_Rate":"290","Hyderabad_Rate":"281","Gurgaon_Rate":"290","Bangalore_Rate":"305","Pune_Rate":"313"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: T-Bar Handle 128mm Premium
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'T-Bar Handle 128mm Premium',
    'handles',
    'Mumbai',
    319,
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
    'T-Bar Handle 128mm Premium',
    'handles',
    'Delhi',
    290,
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
    'T-Bar Handle 128mm Premium',
    'handles',
    'Hyderabad',
    281,
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
    'T-Bar Handle 128mm Premium',
    'handles',
    'Gurgaon',
    290,
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
    'T-Bar Handle 128mm Premium',
    'handles',
    'Bangalore',
    305,
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
    'T-Bar Handle 128mm Premium',
    'handles',
    'Pune',
    313,
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
    'Profile Handle 160mm Premium',
    'handles',
    NULL,
    NULL,
    'Blum',
    330,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"Blum","Product":"Profile Handle 160mm Premium","Unit":"₹ per piece","Mumbai_Rate":"363","Delhi_Rate":"330","Hyderabad_Rate":"320","Gurgaon_Rate":"330","Bangalore_Rate":"347","Pune_Rate":"356"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Profile Handle 160mm Premium
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Profile Handle 160mm Premium',
    'handles',
    'Mumbai',
    363,
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
    'Profile Handle 160mm Premium',
    'handles',
    'Delhi',
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
    'Profile Handle 160mm Premium',
    'handles',
    'Hyderabad',
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
    'Profile Handle 160mm Premium',
    'handles',
    'Gurgaon',
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
    'Profile Handle 160mm Premium',
    'handles',
    'Bangalore',
    347,
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
    'Profile Handle 160mm Premium',
    'handles',
    'Pune',
    356,
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
    'Ebco',
    150,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"Ebco","Product":"SS Bar Handle 96mm (4\")","Unit":"₹ per piece","Mumbai_Rate":"165","Delhi_Rate":"150","Hyderabad_Rate":"146","Gurgaon_Rate":"150","Bangalore_Rate":"158","Pune_Rate":"162"}'::jsonb
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
    165,
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
    150,
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
    146,
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
    150,
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
    158,
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
    162,
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
    'Ebco',
    170,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"Ebco","Product":"SS Bar Handle 128mm (5\")","Unit":"₹ per piece","Mumbai_Rate":"187","Delhi_Rate":"170","Hyderabad_Rate":"165","Gurgaon_Rate":"170","Bangalore_Rate":"179","Pune_Rate":"184"}'::jsonb
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
    'SS Bar Handle 128mm (5")',
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
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'SS Bar Handle 128mm (5")',
    'handles',
    'Hyderabad',
    165,
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
    170,
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
    179,
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
    184,
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
    'Ebco',
    190,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"Ebco","Product":"SS Bar Handle 160mm (6\")","Unit":"₹ per piece","Mumbai_Rate":"209","Delhi_Rate":"190","Hyderabad_Rate":"184","Gurgaon_Rate":"190","Bangalore_Rate":"200","Pune_Rate":"205"}'::jsonb
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
    209,
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
    190,
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
    184,
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
    190,
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
    'SS Bar Handle 160mm (6")',
    'handles',
    'Pune',
    205,
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
    'Ebco',
    220,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"Ebco","Product":"SS Bar Handle 192mm (7.5\")","Unit":"₹ per piece","Mumbai_Rate":"242","Delhi_Rate":"220","Hyderabad_Rate":"213","Gurgaon_Rate":"220","Bangalore_Rate":"231","Pune_Rate":"238"}'::jsonb
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
    'SS Bar Handle 192mm (7.5")',
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
    'SS Bar Handle 192mm (7.5")',
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
    'SS Bar Handle 192mm (7.5")',
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
    'SS Bar Handle 192mm (7.5")',
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
    'SS Bar Handle 192mm (7.5")',
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
    'Zinc Bar Handle 96mm (4")',
    'handles',
    NULL,
    NULL,
    'Ebco',
    130,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"Ebco","Product":"Zinc Bar Handle 96mm (4\")","Unit":"₹ per piece","Mumbai_Rate":"143","Delhi_Rate":"130","Hyderabad_Rate":"126","Gurgaon_Rate":"130","Bangalore_Rate":"137","Pune_Rate":"140"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Zinc Bar Handle 96mm (4")
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Zinc Bar Handle 96mm (4")',
    'handles',
    'Mumbai',
    143,
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
    'Zinc Bar Handle 96mm (4")',
    'handles',
    'Delhi',
    130,
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
    'Zinc Bar Handle 96mm (4")',
    'handles',
    'Hyderabad',
    126,
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
    'Zinc Bar Handle 96mm (4")',
    'handles',
    'Gurgaon',
    130,
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
    'Zinc Bar Handle 96mm (4")',
    'handles',
    'Bangalore',
    137,
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
    'Zinc Bar Handle 96mm (4")',
    'handles',
    'Pune',
    140,
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
    'Zinc Bar Handle 128mm (5")',
    'handles',
    NULL,
    NULL,
    'Ebco',
    150,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"Ebco","Product":"Zinc Bar Handle 128mm (5\")","Unit":"₹ per piece","Mumbai_Rate":"165","Delhi_Rate":"150","Hyderabad_Rate":"146","Gurgaon_Rate":"150","Bangalore_Rate":"158","Pune_Rate":"162"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Zinc Bar Handle 128mm (5")
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Zinc Bar Handle 128mm (5")',
    'handles',
    'Mumbai',
    165,
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
    'Zinc Bar Handle 128mm (5")',
    'handles',
    'Delhi',
    150,
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
    'Zinc Bar Handle 128mm (5")',
    'handles',
    'Hyderabad',
    146,
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
    'Zinc Bar Handle 128mm (5")',
    'handles',
    'Gurgaon',
    150,
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
    'Zinc Bar Handle 128mm (5")',
    'handles',
    'Bangalore',
    158,
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
    'Zinc Bar Handle 128mm (5")',
    'handles',
    'Pune',
    162,
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
    'Zinc Bar Handle 160mm (6")',
    'handles',
    NULL,
    NULL,
    'Ebco',
    170,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"Ebco","Product":"Zinc Bar Handle 160mm (6\")","Unit":"₹ per piece","Mumbai_Rate":"187","Delhi_Rate":"170","Hyderabad_Rate":"165","Gurgaon_Rate":"170","Bangalore_Rate":"179","Pune_Rate":"184"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Zinc Bar Handle 160mm (6")
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Zinc Bar Handle 160mm (6")',
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
    'Zinc Bar Handle 160mm (6")',
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
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Zinc Bar Handle 160mm (6")',
    'handles',
    'Hyderabad',
    165,
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
    'Zinc Bar Handle 160mm (6")',
    'handles',
    'Gurgaon',
    170,
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
    'Zinc Bar Handle 160mm (6")',
    'handles',
    'Bangalore',
    179,
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
    'Zinc Bar Handle 160mm (6")',
    'handles',
    'Pune',
    184,
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
    'Zinc Bar Handle 192mm (7.5")',
    'handles',
    NULL,
    NULL,
    'Ebco',
    190,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"Ebco","Product":"Zinc Bar Handle 192mm (7.5\")","Unit":"₹ per piece","Mumbai_Rate":"209","Delhi_Rate":"190","Hyderabad_Rate":"184","Gurgaon_Rate":"190","Bangalore_Rate":"200","Pune_Rate":"205"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Zinc Bar Handle 192mm (7.5")
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Zinc Bar Handle 192mm (7.5")',
    'handles',
    'Mumbai',
    209,
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
    'Zinc Bar Handle 192mm (7.5")',
    'handles',
    'Delhi',
    190,
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
    'Zinc Bar Handle 192mm (7.5")',
    'handles',
    'Hyderabad',
    184,
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
    'Zinc Bar Handle 192mm (7.5")',
    'handles',
    'Gurgaon',
    190,
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
    'Zinc Bar Handle 192mm (7.5")',
    'handles',
    'Bangalore',
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
    'Zinc Bar Handle 192mm (7.5")',
    'handles',
    'Pune',
    205,
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
    'Ebco',
    120,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"Ebco","Product":"Cup Pull Handle 64mm (2.5\")","Unit":"₹ per piece","Mumbai_Rate":"132","Delhi_Rate":"120","Hyderabad_Rate":"116","Gurgaon_Rate":"120","Bangalore_Rate":"126","Pune_Rate":"130"}'::jsonb
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
    132,
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
    120,
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
    116,
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
    120,
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
    126,
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
    130,
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
    'Ebco',
    140,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"Ebco","Product":"Cup Pull Handle 96mm (4\")","Unit":"₹ per piece","Mumbai_Rate":"154","Delhi_Rate":"140","Hyderabad_Rate":"136","Gurgaon_Rate":"140","Bangalore_Rate":"147","Pune_Rate":"151"}'::jsonb
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
    154,
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
    140,
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
    136,
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
    140,
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
    147,
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
    151,
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
    'Ebco',
    130,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"Ebco","Product":"Edge Pull Handle 96mm","Unit":"₹ per piece","Mumbai_Rate":"143","Delhi_Rate":"130","Hyderabad_Rate":"126","Gurgaon_Rate":"130","Bangalore_Rate":"137","Pune_Rate":"140"}'::jsonb
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
    143,
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
    130,
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
    126,
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
    130,
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
    137,
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
    140,
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
    'Ebco',
    150,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"Ebco","Product":"Edge Pull Handle 128mm","Unit":"₹ per piece","Mumbai_Rate":"165","Delhi_Rate":"150","Hyderabad_Rate":"146","Gurgaon_Rate":"150","Bangalore_Rate":"158","Pune_Rate":"162"}'::jsonb
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
    165,
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
    150,
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
    146,
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
    150,
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
    158,
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
    162,
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
    'Round Knob 25mm',
    'handles',
    NULL,
    NULL,
    'Ebco',
    60,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"Ebco","Product":"Round Knob 25mm","Unit":"₹ per piece","Mumbai_Rate":"66","Delhi_Rate":"60","Hyderabad_Rate":"58","Gurgaon_Rate":"60","Bangalore_Rate":"63","Pune_Rate":"65"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Round Knob 25mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Round Knob 25mm',
    'handles',
    'Mumbai',
    66,
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
    'Round Knob 25mm',
    'handles',
    'Delhi',
    60,
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
    'Round Knob 25mm',
    'handles',
    'Hyderabad',
    58,
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
    'Round Knob 25mm',
    'handles',
    'Gurgaon',
    60,
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
    'Round Knob 25mm',
    'handles',
    'Bangalore',
    63,
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
    'Round Knob 25mm',
    'handles',
    'Pune',
    65,
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
    'Round Knob 32mm',
    'handles',
    NULL,
    NULL,
    'Ebco',
    70,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"Ebco","Product":"Round Knob 32mm","Unit":"₹ per piece","Mumbai_Rate":"77","Delhi_Rate":"70","Hyderabad_Rate":"68","Gurgaon_Rate":"70","Bangalore_Rate":"74","Pune_Rate":"76"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Round Knob 32mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Round Knob 32mm',
    'handles',
    'Mumbai',
    77,
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
    'Round Knob 32mm',
    'handles',
    'Delhi',
    70,
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
    'Round Knob 32mm',
    'handles',
    'Hyderabad',
    68,
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
    'Round Knob 32mm',
    'handles',
    'Gurgaon',
    70,
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
    'Round Knob 32mm',
    'handles',
    'Bangalore',
    74,
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
    'Round Knob 32mm',
    'handles',
    'Pune',
    76,
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
    'Bow Handle 128mm',
    'handles',
    NULL,
    NULL,
    'Ebco',
    160,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"Ebco","Product":"Bow Handle 128mm","Unit":"₹ per piece","Mumbai_Rate":"176","Delhi_Rate":"160","Hyderabad_Rate":"155","Gurgaon_Rate":"160","Bangalore_Rate":"168","Pune_Rate":"173"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Bow Handle 128mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Bow Handle 128mm',
    'handles',
    'Mumbai',
    176,
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
    'Bow Handle 128mm',
    'handles',
    'Delhi',
    160,
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
    'Bow Handle 128mm',
    'handles',
    'Hyderabad',
    155,
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
    'Bow Handle 128mm',
    'handles',
    'Gurgaon',
    160,
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
    'Bow Handle 128mm',
    'handles',
    'Bangalore',
    168,
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
    'Bow Handle 128mm',
    'handles',
    'Pune',
    173,
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
    'Ebco',
    180,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"Ebco","Product":"Profile Handle 128mm","Unit":"₹ per piece","Mumbai_Rate":"198","Delhi_Rate":"180","Hyderabad_Rate":"175","Gurgaon_Rate":"180","Bangalore_Rate":"189","Pune_Rate":"194"}'::jsonb
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
    'Profile Handle 128mm',
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
    'Profile Handle 128mm',
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
    'Profile Handle 128mm',
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
    'Profile Handle 128mm',
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
    'Profile Handle 128mm',
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
    'Zinc Bar Handle 96mm (4")',
    'handles',
    NULL,
    NULL,
    'IPSA',
    140,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"IPSA","Product":"Zinc Bar Handle 96mm (4\")","Unit":"₹ per piece","Mumbai_Rate":"154","Delhi_Rate":"140","Hyderabad_Rate":"136","Gurgaon_Rate":"140","Bangalore_Rate":"147","Pune_Rate":"151"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Zinc Bar Handle 96mm (4")
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Zinc Bar Handle 96mm (4")',
    'handles',
    'Mumbai',
    154,
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
    'Zinc Bar Handle 96mm (4")',
    'handles',
    'Delhi',
    140,
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
    'Zinc Bar Handle 96mm (4")',
    'handles',
    'Hyderabad',
    136,
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
    'Zinc Bar Handle 96mm (4")',
    'handles',
    'Gurgaon',
    140,
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
    'Zinc Bar Handle 96mm (4")',
    'handles',
    'Bangalore',
    147,
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
    'Zinc Bar Handle 96mm (4")',
    'handles',
    'Pune',
    151,
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
    'Zinc Bar Handle 128mm (5")',
    'handles',
    NULL,
    NULL,
    'IPSA',
    160,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"IPSA","Product":"Zinc Bar Handle 128mm (5\")","Unit":"₹ per piece","Mumbai_Rate":"176","Delhi_Rate":"160","Hyderabad_Rate":"155","Gurgaon_Rate":"160","Bangalore_Rate":"168","Pune_Rate":"173"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Zinc Bar Handle 128mm (5")
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Zinc Bar Handle 128mm (5")',
    'handles',
    'Mumbai',
    176,
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
    'Zinc Bar Handle 128mm (5")',
    'handles',
    'Delhi',
    160,
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
    'Zinc Bar Handle 128mm (5")',
    'handles',
    'Hyderabad',
    155,
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
    'Zinc Bar Handle 128mm (5")',
    'handles',
    'Gurgaon',
    160,
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
    'Zinc Bar Handle 128mm (5")',
    'handles',
    'Bangalore',
    168,
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
    'Zinc Bar Handle 128mm (5")',
    'handles',
    'Pune',
    173,
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
    'Zinc Bar Handle 160mm (6")',
    'handles',
    NULL,
    NULL,
    'IPSA',
    180,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"IPSA","Product":"Zinc Bar Handle 160mm (6\")","Unit":"₹ per piece","Mumbai_Rate":"198","Delhi_Rate":"180","Hyderabad_Rate":"175","Gurgaon_Rate":"180","Bangalore_Rate":"189","Pune_Rate":"194"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Zinc Bar Handle 160mm (6")
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Zinc Bar Handle 160mm (6")',
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
    'Zinc Bar Handle 160mm (6")',
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
    'Zinc Bar Handle 160mm (6")',
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
    'Zinc Bar Handle 160mm (6")',
