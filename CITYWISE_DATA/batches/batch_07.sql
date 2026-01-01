-- COMPREHENSIVE CITYWISE PRICING DATA IMPORT
-- Generated: 2026-01-01T12:27:08.554Z
-- Source: 27 Excel files with city-wise rates
-- Total Rows: 3710
-- Total Sheets: 110

-- ========================================
-- PART 1: PRICING ITEMS
-- ========================================


-- ========================================
-- BATCH 7 of 14
-- Lines: 30011 to 35010
-- ========================================

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
    'Zinc Bar Handle 160mm (6")',
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
    'Zinc Bar Handle 160mm (6")',
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
    'Zinc Bar Handle 192mm (7.5")',
    'handles',
    NULL,
    NULL,
    'IPSA',
    200,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"IPSA","Product":"Zinc Bar Handle 192mm (7.5\")","Unit":"₹ per piece","Mumbai_Rate":"220","Delhi_Rate":"200","Hyderabad_Rate":"194","Gurgaon_Rate":"200","Bangalore_Rate":"210","Pune_Rate":"216"}'::jsonb
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
    'Zinc Bar Handle 192mm (7.5")',
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
    'Zinc Bar Handle 192mm (7.5")',
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
    'Zinc Bar Handle 192mm (7.5")',
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
    'Zinc Bar Handle 192mm (7.5")',
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
    'Zinc Bar Handle 192mm (7.5")',
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
    'Cup Pull Handle 64mm (2.5")',
    'handles',
    NULL,
    NULL,
    'IPSA',
    110,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"IPSA","Product":"Cup Pull Handle 64mm (2.5\")","Unit":"₹ per piece","Mumbai_Rate":"121","Delhi_Rate":"110","Hyderabad_Rate":"107","Gurgaon_Rate":"110","Bangalore_Rate":"116","Pune_Rate":"119"}'::jsonb
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
    121,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
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
    'Cup Pull Handle 64mm (2.5")',
    'handles',
    'Hyderabad',
    107,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
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
    'Cup Pull Handle 64mm (2.5")',
    'handles',
    'Bangalore',
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
    'Pune',
    119,
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
    'IPSA',
    130,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"IPSA","Product":"Cup Pull Handle 96mm (4\")","Unit":"₹ per piece","Mumbai_Rate":"143","Delhi_Rate":"130","Hyderabad_Rate":"126","Gurgaon_Rate":"130","Bangalore_Rate":"137","Pune_Rate":"140"}'::jsonb
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
    'Cup Pull Handle 96mm (4")',
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
    'Cup Pull Handle 96mm (4")',
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
    'Cup Pull Handle 96mm (4")',
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
    'Cup Pull Handle 96mm (4")',
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
    'Cup Pull Handle 96mm (4")',
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
    'Edge Pull Handle 96mm',
    'handles',
    NULL,
    NULL,
    'IPSA',
    120,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"IPSA","Product":"Edge Pull Handle 96mm","Unit":"₹ per piece","Mumbai_Rate":"132","Delhi_Rate":"120","Hyderabad_Rate":"116","Gurgaon_Rate":"120","Bangalore_Rate":"126","Pune_Rate":"130"}'::jsonb
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
    'Edge Pull Handle 96mm',
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
    'Edge Pull Handle 96mm',
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
    'Edge Pull Handle 96mm',
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
    'Edge Pull Handle 96mm',
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
    'Edge Pull Handle 96mm',
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
    'Edge Pull Handle 128mm',
    'handles',
    NULL,
    NULL,
    'IPSA',
    140,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"IPSA","Product":"Edge Pull Handle 128mm","Unit":"₹ per piece","Mumbai_Rate":"154","Delhi_Rate":"140","Hyderabad_Rate":"136","Gurgaon_Rate":"140","Bangalore_Rate":"147","Pune_Rate":"151"}'::jsonb
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
    'Edge Pull Handle 128mm',
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
    'Edge Pull Handle 128mm',
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
    'Edge Pull Handle 128mm',
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
    'Edge Pull Handle 128mm',
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
    'Edge Pull Handle 128mm',
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
    'Round Knob 25mm Zinc',
    'handles',
    NULL,
    NULL,
    'IPSA',
    60,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"IPSA","Product":"Round Knob 25mm Zinc","Unit":"₹ per piece","Mumbai_Rate":"66","Delhi_Rate":"60","Hyderabad_Rate":"58","Gurgaon_Rate":"60","Bangalore_Rate":"63","Pune_Rate":"65"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Round Knob 25mm Zinc
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Round Knob 25mm Zinc',
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
    'Round Knob 25mm Zinc',
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
    'Round Knob 25mm Zinc',
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
    'Round Knob 25mm Zinc',
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
    'Round Knob 25mm Zinc',
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
    'Round Knob 25mm Zinc',
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
    'Round Knob 32mm Zinc',
    'handles',
    NULL,
    NULL,
    'IPSA',
    70,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"IPSA","Product":"Round Knob 32mm Zinc","Unit":"₹ per piece","Mumbai_Rate":"77","Delhi_Rate":"70","Hyderabad_Rate":"68","Gurgaon_Rate":"70","Bangalore_Rate":"74","Pune_Rate":"76"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Round Knob 32mm Zinc
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Round Knob 32mm Zinc',
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
    'Round Knob 32mm Zinc',
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
    'Round Knob 32mm Zinc',
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
    'Round Knob 32mm Zinc',
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
    'Round Knob 32mm Zinc',
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
    'Round Knob 32mm Zinc',
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
    'Swirl Design Handle 128mm',
    'handles',
    NULL,
    NULL,
    'IPSA',
    150,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"IPSA","Product":"Swirl Design Handle 128mm","Unit":"₹ per piece","Mumbai_Rate":"165","Delhi_Rate":"150","Hyderabad_Rate":"146","Gurgaon_Rate":"150","Bangalore_Rate":"158","Pune_Rate":"162"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Swirl Design Handle 128mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Swirl Design Handle 128mm',
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
    'Swirl Design Handle 128mm',
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
    'Swirl Design Handle 128mm',
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
    'Swirl Design Handle 128mm',
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
    'Swirl Design Handle 128mm',
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
    'Swirl Design Handle 128mm',
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
    'Modern Handle 160mm',
    'handles',
    NULL,
    NULL,
    'IPSA',
    170,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"IPSA","Product":"Modern Handle 160mm","Unit":"₹ per piece","Mumbai_Rate":"187","Delhi_Rate":"170","Hyderabad_Rate":"165","Gurgaon_Rate":"170","Bangalore_Rate":"179","Pune_Rate":"184"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Modern Handle 160mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Modern Handle 160mm',
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
    'Modern Handle 160mm',
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
    'Modern Handle 160mm',
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
    'Modern Handle 160mm',
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
    'Modern Handle 160mm',
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
    'Modern Handle 160mm',
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
    'Bar Handle 96mm (4")',
    'handles',
    NULL,
    NULL,
    'Ozone',
    90,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"Ozone","Product":"Bar Handle 96mm (4\")","Unit":"₹ per piece","Mumbai_Rate":"99","Delhi_Rate":"90","Hyderabad_Rate":"87","Gurgaon_Rate":"90","Bangalore_Rate":"95","Pune_Rate":"97"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Bar Handle 96mm (4")
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Bar Handle 96mm (4")',
    'handles',
    'Mumbai',
    99,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Bar Handle 96mm (4")',
    'handles',
    'Delhi',
    90,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Bar Handle 96mm (4")',
    'handles',
    'Hyderabad',
    87,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Bar Handle 96mm (4")',
    'handles',
    'Gurgaon',
    90,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Bar Handle 96mm (4")',
    'handles',
    'Bangalore',
    95,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Bar Handle 96mm (4")',
    'handles',
    'Pune',
    97,
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
    'Bar Handle 128mm (5")',
    'handles',
    NULL,
    NULL,
    'Ozone',
    100,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"Ozone","Product":"Bar Handle 128mm (5\")","Unit":"₹ per piece","Mumbai_Rate":"110","Delhi_Rate":"100","Hyderabad_Rate":"97","Gurgaon_Rate":"100","Bangalore_Rate":"105","Pune_Rate":"108"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Bar Handle 128mm (5")
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Bar Handle 128mm (5")',
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
    'Bar Handle 128mm (5")',
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
    'Bar Handle 128mm (5")',
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
    'Bar Handle 128mm (5")',
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
    'Bar Handle 128mm (5")',
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
    'Bar Handle 128mm (5")',
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
    'Bar Handle 160mm (6")',
    'handles',
    NULL,
    NULL,
    'Ozone',
    110,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"Ozone","Product":"Bar Handle 160mm (6\")","Unit":"₹ per piece","Mumbai_Rate":"121","Delhi_Rate":"110","Hyderabad_Rate":"107","Gurgaon_Rate":"110","Bangalore_Rate":"116","Pune_Rate":"119"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Bar Handle 160mm (6")
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Bar Handle 160mm (6")',
    'handles',
    'Mumbai',
    121,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Bar Handle 160mm (6")',
    'handles',
    'Delhi',
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
    'Bar Handle 160mm (6")',
    'handles',
    'Hyderabad',
    107,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Bar Handle 160mm (6")',
    'handles',
    'Gurgaon',
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
    'Bar Handle 160mm (6")',
    'handles',
    'Bangalore',
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
    'Bar Handle 160mm (6")',
    'handles',
    'Pune',
    119,
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
    'Bar Handle 192mm (7.5")',
    'handles',
    NULL,
    NULL,
    'Ozone',
    120,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"Ozone","Product":"Bar Handle 192mm (7.5\")","Unit":"₹ per piece","Mumbai_Rate":"132","Delhi_Rate":"120","Hyderabad_Rate":"116","Gurgaon_Rate":"120","Bangalore_Rate":"126","Pune_Rate":"130"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Bar Handle 192mm (7.5")
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Bar Handle 192mm (7.5")',
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
    'Bar Handle 192mm (7.5")',
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
    'Bar Handle 192mm (7.5")',
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
    'Bar Handle 192mm (7.5")',
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
    'Bar Handle 192mm (7.5")',
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
    'Bar Handle 192mm (7.5")',
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
    'Cup Pull Handle 64mm (2.5")',
    'handles',
    NULL,
    NULL,
    'Ozone',
    70,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"Ozone","Product":"Cup Pull Handle 64mm (2.5\")","Unit":"₹ per piece","Mumbai_Rate":"77","Delhi_Rate":"70","Hyderabad_Rate":"68","Gurgaon_Rate":"70","Bangalore_Rate":"74","Pune_Rate":"76"}'::jsonb
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
    'Cup Pull Handle 64mm (2.5")',
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
    'Cup Pull Handle 64mm (2.5")',
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
    'Cup Pull Handle 64mm (2.5")',
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
    'Cup Pull Handle 64mm (2.5")',
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
    'Cup Pull Handle 64mm (2.5")',
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
    'Cup Pull Handle 96mm (4")',
    'handles',
    NULL,
    NULL,
    'Ozone',
    80,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"Ozone","Product":"Cup Pull Handle 96mm (4\")","Unit":"₹ per piece","Mumbai_Rate":"88","Delhi_Rate":"80","Hyderabad_Rate":"78","Gurgaon_Rate":"80","Bangalore_Rate":"84","Pune_Rate":"86"}'::jsonb
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
    'Cup Pull Handle 96mm (4")',
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
    'Cup Pull Handle 96mm (4")',
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
    'Cup Pull Handle 96mm (4")',
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
    'Cup Pull Handle 96mm (4")',
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
    'Cup Pull Handle 96mm (4")',
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
    'Edge Pull Handle 96mm',
    'handles',
    NULL,
    NULL,
    'Ozone',
    80,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"Ozone","Product":"Edge Pull Handle 96mm","Unit":"₹ per piece","Mumbai_Rate":"88","Delhi_Rate":"80","Hyderabad_Rate":"78","Gurgaon_Rate":"80","Bangalore_Rate":"84","Pune_Rate":"86"}'::jsonb
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
    'Edge Pull Handle 96mm',
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
    'Edge Pull Handle 96mm',
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
    'Edge Pull Handle 96mm',
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
    'Edge Pull Handle 96mm',
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
    'Edge Pull Handle 96mm',
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
    'Edge Pull Handle 128mm',
    'handles',
    NULL,
    NULL,
    'Ozone',
    90,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"Ozone","Product":"Edge Pull Handle 128mm","Unit":"₹ per piece","Mumbai_Rate":"99","Delhi_Rate":"90","Hyderabad_Rate":"87","Gurgaon_Rate":"90","Bangalore_Rate":"95","Pune_Rate":"97"}'::jsonb
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
    99,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
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
    90,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
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
    87,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
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
    90,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
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
    95,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
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
    97,
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
    'Ozone',
    40,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"Ozone","Product":"Round Knob 25mm","Unit":"₹ per piece","Mumbai_Rate":"44","Delhi_Rate":"40","Hyderabad_Rate":"39","Gurgaon_Rate":"40","Bangalore_Rate":"42","Pune_Rate":"43"}'::jsonb
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
    44,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
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
    40,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
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
    39,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
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
    40,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
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
    42,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
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
    43,
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
    'Ozone',
    50,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"Ozone","Product":"Round Knob 32mm","Unit":"₹ per piece","Mumbai_Rate":"55","Delhi_Rate":"50","Hyderabad_Rate":"49","Gurgaon_Rate":"50","Bangalore_Rate":"53","Pune_Rate":"54"}'::jsonb
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
    55,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
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
    50,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
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
    49,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
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
    50,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
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
    53,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
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
    54,
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
    'Simple Bar Handle 128mm',
    'handles',
    NULL,
    NULL,
    'Ozone',
    90,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"Ozone","Product":"Simple Bar Handle 128mm","Unit":"₹ per piece","Mumbai_Rate":"99","Delhi_Rate":"90","Hyderabad_Rate":"87","Gurgaon_Rate":"90","Bangalore_Rate":"95","Pune_Rate":"97"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Simple Bar Handle 128mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Simple Bar Handle 128mm',
    'handles',
    'Mumbai',
    99,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Simple Bar Handle 128mm',
    'handles',
    'Delhi',
    90,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Simple Bar Handle 128mm',
    'handles',
    'Hyderabad',
    87,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Simple Bar Handle 128mm',
    'handles',
    'Gurgaon',
    90,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Simple Bar Handle 128mm',
    'handles',
    'Bangalore',
    95,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Simple Bar Handle 128mm',
    'handles',
    'Pune',
    97,
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
    'Basic Handle 128mm',
    'handles',
    NULL,
    NULL,
    'Ozone',
    100,
    '₹ per piece',
    'citywise_excel_2025',
    'handles_citywise_rates_2025.xlsx',
    'Handles_CityWise_Rates',
    '{"Brand":"Ozone","Product":"Basic Handle 128mm","Unit":"₹ per piece","Mumbai_Rate":"110","Delhi_Rate":"100","Hyderabad_Rate":"97","Gurgaon_Rate":"100","Bangalore_Rate":"105","Pune_Rate":"108"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Basic Handle 128mm
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Basic Handle 128mm',
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
    'Basic Handle 128mm',
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
    'Basic Handle 128mm',
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
    'Basic Handle 128mm',
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
    'Basic Handle 128mm',
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
    'Basic Handle 128mm',
    'handles',
    'Pune',
    108,
    'handles_citywise_rates_2025.xlsx'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();

-- ========================================
-- Category: hardware_hinges_channels
-- Sheet: Hardware_CityWise_Rates
-- Rows: 64
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
    'Sensys Soft-Close 110° Hinge',
    'hardware_hinges_channels',
    NULL,
    NULL,
    'Hettich',
    280,
    '₹ per piece',
    'citywise_excel_2025',
    'hardware_hinges_channels_citywise_rates_2025.xlsx',
    'Hardware_CityWise_Rates',
    '{"Brand":"Hettich","Product":"Sensys Soft-Close 110° Hinge","Unit":"₹ per piece","Mumbai_Rate":"308","Delhi_Rate":"280","Hyderabad_Rate":"270","Gurgaon_Rate":"280","Bangalore_Rate":"294","Pune_Rate":"302"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Sensys Soft-Close 110° Hinge
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Sensys Soft-Close 110° Hinge',
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
    'Sensys Soft-Close 110° Hinge',
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
    'Sensys Soft-Close 110° Hinge',
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
    'Sensys Soft-Close 110° Hinge',
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
    'Sensys Soft-Close 110° Hinge',
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
    'Sensys Soft-Close 110° Hinge',
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
    'Sensys Regular 110° Hinge',
    'hardware_hinges_channels',
    NULL,
    NULL,
    'Hettich',
    160,
    '₹ per piece',
    'citywise_excel_2025',
    'hardware_hinges_channels_citywise_rates_2025.xlsx',
    'Hardware_CityWise_Rates',
    '{"Brand":"Hettich","Product":"Sensys Regular 110° Hinge","Unit":"₹ per piece","Mumbai_Rate":"176","Delhi_Rate":"160","Hyderabad_Rate":"154","Gurgaon_Rate":"160","Bangalore_Rate":"168","Pune_Rate":"173"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Sensys Regular 110° Hinge
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Sensys Regular 110° Hinge',
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
    'Sensys Regular 110° Hinge',
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
    'Sensys Regular 110° Hinge',
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
    'Sensys Regular 110° Hinge',
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
    'Sensys Regular 110° Hinge',
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
    'Sensys Regular 110° Hinge',
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
    'SlideOn Soft-Close 110° Hinge',
    'hardware_hinges_channels',
    NULL,
    NULL,
    'Hettich',
    260,
    '₹ per piece',
    'citywise_excel_2025',
    'hardware_hinges_channels_citywise_rates_2025.xlsx',
    'Hardware_CityWise_Rates',
    '{"Brand":"Hettich","Product":"SlideOn Soft-Close 110° Hinge","Unit":"₹ per piece","Mumbai_Rate":"286","Delhi_Rate":"260","Hyderabad_Rate":"250","Gurgaon_Rate":"260","Bangalore_Rate":"273","Pune_Rate":"281"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: SlideOn Soft-Close 110° Hinge
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'SlideOn Soft-Close 110° Hinge',
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
    'SlideOn Soft-Close 110° Hinge',
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
    'SlideOn Soft-Close 110° Hinge',
    'hardware_hinges_channels',
    'Hyderabad',
    250,
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
    'SlideOn Soft-Close 110° Hinge',
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
    'SlideOn Soft-Close 110° Hinge',
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
    'SlideOn Soft-Close 110° Hinge',
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
    'SlideOn Regular 110° Hinge',
    'hardware_hinges_channels',
    NULL,
    NULL,
    'Hettich',
    140,
    '₹ per piece',
    'citywise_excel_2025',
    'hardware_hinges_channels_citywise_rates_2025.xlsx',
    'Hardware_CityWise_Rates',
    '{"Brand":"Hettich","Product":"SlideOn Regular 110° Hinge","Unit":"₹ per piece","Mumbai_Rate":"154","Delhi_Rate":"140","Hyderabad_Rate":"135","Gurgaon_Rate":"140","Bangalore_Rate":"147","Pune_Rate":"151"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: SlideOn Regular 110° Hinge
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'SlideOn Regular 110° Hinge',
    'hardware_hinges_channels',
    'Mumbai',
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
    'SlideOn Regular 110° Hinge',
    'hardware_hinges_channels',
    'Delhi',
    140,
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
    'SlideOn Regular 110° Hinge',
    'hardware_hinges_channels',
    'Hyderabad',
    135,
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
    'SlideOn Regular 110° Hinge',
    'hardware_hinges_channels',
    'Gurgaon',
    140,
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
    'SlideOn Regular 110° Hinge',
    'hardware_hinges_channels',
    'Bangalore',
    147,
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
    'SlideOn Regular 110° Hinge',
    'hardware_hinges_channels',
    'Pune',
    151,
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
    'Intermat Soft-Close 110° Hinge',
    'hardware_hinges_channels',
    NULL,
    NULL,
    'Hettich',
    240,
    '₹ per piece',
    'citywise_excel_2025',
    'hardware_hinges_channels_citywise_rates_2025.xlsx',
    'Hardware_CityWise_Rates',
    '{"Brand":"Hettich","Product":"Intermat Soft-Close 110° Hinge","Unit":"₹ per piece","Mumbai_Rate":"264","Delhi_Rate":"240","Hyderabad_Rate":"232","Gurgaon_Rate":"240","Bangalore_Rate":"252","Pune_Rate":"259"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Intermat Soft-Close 110° Hinge
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Intermat Soft-Close 110° Hinge',
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
    'Intermat Soft-Close 110° Hinge',
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
    'Intermat Soft-Close 110° Hinge',
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
    'Intermat Soft-Close 110° Hinge',
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
    'Intermat Soft-Close 110° Hinge',
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
    'Intermat Soft-Close 110° Hinge',
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
    'Intermat Regular 110° Hinge',
    'hardware_hinges_channels',
    NULL,
    NULL,
    'Hettich',
    130,
    '₹ per piece',
    'citywise_excel_2025',
    'hardware_hinges_channels_citywise_rates_2025.xlsx',
    'Hardware_CityWise_Rates',
    '{"Brand":"Hettich","Product":"Intermat Regular 110° Hinge","Unit":"₹ per piece","Mumbai_Rate":"143","Delhi_Rate":"130","Hyderabad_Rate":"125","Gurgaon_Rate":"130","Bangalore_Rate":"137","Pune_Rate":"140"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Intermat Regular 110° Hinge
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Intermat Regular 110° Hinge',
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
    'Intermat Regular 110° Hinge',
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
    'Intermat Regular 110° Hinge',
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
    'Intermat Regular 110° Hinge',
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
    'Intermat Regular 110° Hinge',
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
    'Intermat Regular 110° Hinge',
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
    'Wide Angle 165° Soft-Close',
    'hardware_hinges_channels',
    NULL,
    NULL,
    'Hettich',
    300,
    '₹ per piece',
    'citywise_excel_2025',
    'hardware_hinges_channels_citywise_rates_2025.xlsx',
    'Hardware_CityWise_Rates',
    '{"Brand":"Hettich","Product":"Wide Angle 165° Soft-Close","Unit":"₹ per piece","Mumbai_Rate":"330","Delhi_Rate":"300","Hyderabad_Rate":"290","Gurgaon_Rate":"300","Bangalore_Rate":"315","Pune_Rate":"324"}'::jsonb
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
    'Wide Angle 165° Soft-Close',
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
    'Wide Angle 165° Soft-Close',
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
    'Wide Angle 165° Soft-Close',
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
    'Wide Angle 165° Soft-Close',
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
    'Wide Angle 165° Soft-Close',
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
    'Wide Angle 165° Regular',
    'hardware_hinges_channels',
    NULL,
    NULL,
    'Hettich',
    180,
    '₹ per piece',
    'citywise_excel_2025',
    'hardware_hinges_channels_citywise_rates_2025.xlsx',
    'Hardware_CityWise_Rates',
    '{"Brand":"Hettich","Product":"Wide Angle 165° Regular","Unit":"₹ per piece","Mumbai_Rate":"198","Delhi_Rate":"180","Hyderabad_Rate":"173","Gurgaon_Rate":"180","Bangalore_Rate":"189","Pune_Rate":"194"}'::jsonb
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
    'Wide Angle 165° Regular',
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
    'Wide Angle 165° Regular',
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
    'Wide Angle 165° Regular',
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
    'Wide Angle 165° Regular',
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
    'Wide Angle 165° Regular',
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
    'Sensys Soft-Close 110° Hinge',
    'hardware_hinges_channels',
    NULL,
    NULL,
    'Häfele',
    270,
    '₹ per piece',
    'citywise_excel_2025',
    'hardware_hinges_channels_citywise_rates_2025.xlsx',
    'Hardware_CityWise_Rates',
    '{"Brand":"Häfele","Product":"Sensys Soft-Close 110° Hinge","Unit":"₹ per piece","Mumbai_Rate":"297","Delhi_Rate":"270","Hyderabad_Rate":"260","Gurgaon_Rate":"270","Bangalore_Rate":"284","Pune_Rate":"292"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Sensys Soft-Close 110° Hinge
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Sensys Soft-Close 110° Hinge',
    'hardware_hinges_channels',
    'Mumbai',
    297,
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
    'Sensys Soft-Close 110° Hinge',
    'hardware_hinges_channels',
    'Delhi',
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
    'Sensys Soft-Close 110° Hinge',
    'hardware_hinges_channels',
    'Hyderabad',
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
    'Sensys Soft-Close 110° Hinge',
    'hardware_hinges_channels',
    'Gurgaon',
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
    'Sensys Soft-Close 110° Hinge',
    'hardware_hinges_channels',
    'Bangalore',
    284,
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
    'Sensys Soft-Close 110° Hinge',
    'hardware_hinges_channels',
    'Pune',
    292,
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
    'Sensys Regular 110° Hinge',
    'hardware_hinges_channels',
    NULL,
    NULL,
    'Häfele',
    150,
    '₹ per piece',
    'citywise_excel_2025',
    'hardware_hinges_channels_citywise_rates_2025.xlsx',
    'Hardware_CityWise_Rates',
    '{"Brand":"Häfele","Product":"Sensys Regular 110° Hinge","Unit":"₹ per piece","Mumbai_Rate":"165","Delhi_Rate":"150","Hyderabad_Rate":"144","Gurgaon_Rate":"150","Bangalore_Rate":"157","Pune_Rate":"162"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Sensys Regular 110° Hinge
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Sensys Regular 110° Hinge',
    'hardware_hinges_channels',
    'Mumbai',
    165,
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
    'Sensys Regular 110° Hinge',
    'hardware_hinges_channels',
    'Delhi',
    150,
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
    'Sensys Regular 110° Hinge',
    'hardware_hinges_channels',
    'Hyderabad',
    144,
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
    'Sensys Regular 110° Hinge',
    'hardware_hinges_channels',
    'Gurgaon',
    150,
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
    'Sensys Regular 110° Hinge',
    'hardware_hinges_channels',
    'Bangalore',
    157,
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
    'Sensys Regular 110° Hinge',
    'hardware_hinges_channels',
    'Pune',
    162,
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
    'Metalla Soft-Close 110° Hinge',
    'hardware_hinges_channels',
    NULL,
    NULL,
    'Häfele',
    250,
    '₹ per piece',
    'citywise_excel_2025',
    'hardware_hinges_channels_citywise_rates_2025.xlsx',
    'Hardware_CityWise_Rates',
    '{"Brand":"Häfele","Product":"Metalla Soft-Close 110° Hinge","Unit":"₹ per piece","Mumbai_Rate":"275","Delhi_Rate":"250","Hyderabad_Rate":"241","Gurgaon_Rate":"250","Bangalore_Rate":"262","Pune_Rate":"270"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Metalla Soft-Close 110° Hinge
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Metalla Soft-Close 110° Hinge',
    'hardware_hinges_channels',
    'Mumbai',
    275,
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
    'Metalla Soft-Close 110° Hinge',
    'hardware_hinges_channels',
    'Delhi',
    250,
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
    'Metalla Soft-Close 110° Hinge',
    'hardware_hinges_channels',
    'Hyderabad',
    241,
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
    'Metalla Soft-Close 110° Hinge',
    'hardware_hinges_channels',
    'Gurgaon',
    250,
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
    'Metalla Soft-Close 110° Hinge',
    'hardware_hinges_channels',
    'Bangalore',
    262,
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
    'Metalla Soft-Close 110° Hinge',
    'hardware_hinges_channels',
    'Pune',
    270,
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
    'Metalla Regular 110° Hinge',
    'hardware_hinges_channels',
    NULL,
    NULL,
    'Häfele',
    130,
    '₹ per piece',
    'citywise_excel_2025',
    'hardware_hinges_channels_citywise_rates_2025.xlsx',
    'Hardware_CityWise_Rates',
    '{"Brand":"Häfele","Product":"Metalla Regular 110° Hinge","Unit":"₹ per piece","Mumbai_Rate":"143","Delhi_Rate":"130","Hyderabad_Rate":"125","Gurgaon_Rate":"130","Bangalore_Rate":"137","Pune_Rate":"140"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Metalla Regular 110° Hinge
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Metalla Regular 110° Hinge',
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
    'Metalla Regular 110° Hinge',
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
    'Metalla Regular 110° Hinge',
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
    'Metalla Regular 110° Hinge',
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
    'Metalla Regular 110° Hinge',
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
    'Metalla Regular 110° Hinge',
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
    'Duomatic Soft-Close 110° Hinge',
    'hardware_hinges_channels',
    NULL,
    NULL,
    'Häfele',
    230,
    '₹ per piece',
    'citywise_excel_2025',
    'hardware_hinges_channels_citywise_rates_2025.xlsx',
    'Hardware_CityWise_Rates',
    '{"Brand":"Häfele","Product":"Duomatic Soft-Close 110° Hinge","Unit":"₹ per piece","Mumbai_Rate":"253","Delhi_Rate":"230","Hyderabad_Rate":"222","Gurgaon_Rate":"230","Bangalore_Rate":"241","Pune_Rate":"248"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Duomatic Soft-Close 110° Hinge
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Duomatic Soft-Close 110° Hinge',
    'hardware_hinges_channels',
    'Mumbai',
    253,
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
    'Duomatic Soft-Close 110° Hinge',
    'hardware_hinges_channels',
    'Delhi',
    230,
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
    'Duomatic Soft-Close 110° Hinge',
    'hardware_hinges_channels',
    'Hyderabad',
    222,
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
    'Duomatic Soft-Close 110° Hinge',
    'hardware_hinges_channels',
    'Gurgaon',
    230,
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
    'Duomatic Soft-Close 110° Hinge',
    'hardware_hinges_channels',
    'Bangalore',
    241,
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
    'Duomatic Soft-Close 110° Hinge',
    'hardware_hinges_channels',
    'Pune',
    248,
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
    'Duomatic Regular 110° Hinge',
    'hardware_hinges_channels',
    NULL,
    NULL,
    'Häfele',
    120,
    '₹ per piece',
    'citywise_excel_2025',
    'hardware_hinges_channels_citywise_rates_2025.xlsx',
    'Hardware_CityWise_Rates',
    '{"Brand":"Häfele","Product":"Duomatic Regular 110° Hinge","Unit":"₹ per piece","Mumbai_Rate":"132","Delhi_Rate":"120","Hyderabad_Rate":"116","Gurgaon_Rate":"120","Bangalore_Rate":"126","Pune_Rate":"130"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Duomatic Regular 110° Hinge
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Duomatic Regular 110° Hinge',
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
    'Duomatic Regular 110° Hinge',
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
    'Duomatic Regular 110° Hinge',
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
    'Duomatic Regular 110° Hinge',
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
    'Duomatic Regular 110° Hinge',
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
    'Duomatic Regular 110° Hinge',
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
    'Wide Angle 165° Soft-Close',
    'hardware_hinges_channels',
    NULL,
    NULL,
    'Häfele',
    320,
    '₹ per piece',
    'citywise_excel_2025',
    'hardware_hinges_channels_citywise_rates_2025.xlsx',
    'Hardware_CityWise_Rates',
    '{"Brand":"Häfele","Product":"Wide Angle 165° Soft-Close","Unit":"₹ per piece","Mumbai_Rate":"352","Delhi_Rate":"320","Hyderabad_Rate":"309","Gurgaon_Rate":"320","Bangalore_Rate":"336","Pune_Rate":"346"}'::jsonb
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
    'Wide Angle 165° Soft-Close',
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
    'Wide Angle 165° Soft-Close',
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
    'Wide Angle 165° Soft-Close',
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
    'Wide Angle 165° Soft-Close',
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
    'Wide Angle 165° Soft-Close',
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
    'Wide Angle 165° Regular',
    'hardware_hinges_channels',
    NULL,
    NULL,
    'Häfele',
    190,
    '₹ per piece',
    'citywise_excel_2025',
    'hardware_hinges_channels_citywise_rates_2025.xlsx',
    'Hardware_CityWise_Rates',
    '{"Brand":"Häfele","Product":"Wide Angle 165° Regular","Unit":"₹ per piece","Mumbai_Rate":"209","Delhi_Rate":"190","Hyderabad_Rate":"183","Gurgaon_Rate":"190","Bangalore_Rate":"200","Pune_Rate":"205"}'::jsonb
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
    209,
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
    190,
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
    183,
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
    190,
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
    'Wide Angle 165° Regular',
    'hardware_hinges_channels',
    'Pune',
    205,
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
    'Blumotion Soft-Close 110° Hinge',
    'hardware_hinges_channels',
    NULL,
    NULL,
    'Blum',
    320,
    '₹ per piece',
    'citywise_excel_2025',
    'hardware_hinges_channels_citywise_rates_2025.xlsx',
    'Hardware_CityWise_Rates',
    '{"Brand":"Blum","Product":"Blumotion Soft-Close 110° Hinge","Unit":"₹ per piece","Mumbai_Rate":"352","Delhi_Rate":"320","Hyderabad_Rate":"309","Gurgaon_Rate":"320","Bangalore_Rate":"336","Pune_Rate":"346"}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();

-- City-specific rates for: Blumotion Soft-Close 110° Hinge
INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    'Blumotion Soft-Close 110° Hinge',
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
    'Blumotion Soft-Close 110° Hinge',
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
    'Blumotion Soft-Close 110° Hinge',
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
    'Blumotion Soft-Close 110° Hinge',
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
    'Blumotion Soft-Close 110° Hinge',
