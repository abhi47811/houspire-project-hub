const fs = require('fs');
const path = require('path');

/**
 * COMPREHENSIVE PRICING SQL GENERATOR
 * 
 * Input: citywise_complete_data.json
 * Output: Complete SQL for importing ALL citywise pricing data into Supabase
 */

const DATA_FILE = '/home/user/webapp/CITYWISE_DATA/citywise_complete_data.json';
const OUTPUT_SQL = '/home/user/webapp/CITYWISE_DATA/comprehensive_pricing_import.sql';

// Read the extracted data
console.log('📖 Reading extracted data...');
const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));

// SQL builder
const sqlStatements = [];

// Header
sqlStatements.push('-- COMPREHENSIVE CITYWISE PRICING DATA IMPORT');
sqlStatements.push('-- Generated: ' + new Date().toISOString());
sqlStatements.push('-- Source: 27 Excel files with city-wise rates');
sqlStatements.push('-- Total Rows: ' + data.summary.totalRows);
sqlStatements.push('-- Total Sheets: ' + data.summary.totalSheets);
sqlStatements.push('');
sqlStatements.push('-- ========================================');
sqlStatements.push('-- PART 1: PRICING ITEMS');
sqlStatements.push('-- ========================================');
sqlStatements.push('');

// Helper to escape SQL strings
function escapeSql(str) {
    if (!str) return null;
    return String(str).replace(/'/g, "''");
}

// Helper to extract price from various formats
function extractPrice(value) {
    if (!value) return null;
    if (typeof value === 'number') return value;
    
    // Remove currency symbols and commas
    const cleaned = String(value).replace(/[₹,\s]/g, '');
    const num = parseFloat(cleaned);
    
    if (isNaN(num) || num === 0) return null;
    return num;
}

// Helper to get city rate
function getCityRate(row, city) {
    const cityKey = `${city}_Rate`;
    return extractPrice(row[cityKey]);
}

// Process pricing tables - these contain actual items with prices
let insertCount = 0;
let cityRateInserts = 0;

console.log('\n📊 Processing pricing tables...');

for (const sheet of data.pricingTables) {
    console.log(`  Processing: ${sheet.category} / ${sheet.sheetName} (${sheet.rowCount} rows)`);
    
    sqlStatements.push(`-- ========================================`);
    sqlStatements.push(`-- Category: ${sheet.category}`);
    sqlStatements.push(`-- Sheet: ${sheet.sheetName}`);
    sqlStatements.push(`-- Rows: ${sheet.rowCount}`);
    sqlStatements.push(`-- ========================================`);
    sqlStatements.push('');
    
    for (const row of sheet.data) {
        // Try multiple column names for item identification
        const itemName = row['Item Name'] || row['Item'] || row['Product Name'] || 
                        row['Product'] || row['Description'] || row['NAME'] || 
                        row['Material/Item Description'] || row['Product Type'];
        
        if (!itemName || String(itemName).length === 0) continue;
        
        // Skip header rows and separators
        const itemStr = String(itemName).toLowerCase();
        if (itemStr.includes('category') || 
            itemStr.includes('====') ||
            itemStr.includes('---') ||
            itemStr.length < 3) continue;
        
        // Extract brand
        const brand = row['Brand'] || row['Brand/Type'] || row['Manufacturer'];
        
        // Extract material
        const material = row['Material'] || row['Material Type'] || row['Type'];
        
        // Extract unit
        const unit = row['Unit'] || row['UOM'] || 'piece';
        
        // Try to get base price (could be in multiple columns)
        let basePrice = extractPrice(row['Base Price'] || row['Price'] || row['Rate'] || 
                                    row['Delhi_Rate'] || row['Gurgaon_Rate']);
        
        // Try city rates if no base price
        const cities = ['Mumbai', 'Delhi', 'Hyderabad', 'Gurgaon', 'Bangalore', 'Pune'];
        const cityRates = {};
        let hasCityRates = false;
        
        for (const city of cities) {
            const rate = getCityRate(row, city);
            if (rate) {
                cityRates[city] = rate;
                hasCityRates = true;
                if (!basePrice) basePrice = rate; // Use first available as base
            }
        }
        
        if (!basePrice) continue; // Skip if no pricing found
        
        // Extract subcategory
        const subCategory = row['Sub Category'] || row['Category'] || row['Type'] || 
                           row['Product Category'] || row['Item Type'];
        
        // Generate item INSERT
        const itemInsert = `INSERT INTO pricing_items (
    item_name,
    item_category,
    item_subcategory,
    material,
    brand,
    base_price,
    unit,
    source,
    source_file,
    source_sheet,
    metadata
) VALUES (
    '${escapeSql(itemName)}',
    '${escapeSql(sheet.category)}',
    ${subCategory ? `'${escapeSql(subCategory)}'` : 'NULL'},
    ${material ? `'${escapeSql(material)}'` : 'NULL'},
    ${brand ? `'${escapeSql(brand)}'` : 'NULL'},
    ${basePrice},
    '${escapeSql(unit)}',
    'citywise_excel_2025',
    '${escapeSql(sheet.filename)}',
    '${escapeSql(sheet.sheetName)}',
    '${escapeSql(JSON.stringify(row))}'::jsonb
) ON CONFLICT (item_name, item_category) 
DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    unit = EXCLUDED.unit,
    metadata = EXCLUDED.metadata,
    updated_at = NOW();`;
        
        sqlStatements.push(itemInsert);
        sqlStatements.push('');
        insertCount++;
        
        // If we have city-specific rates, store them separately
        if (hasCityRates && Object.keys(cityRates).length > 0) {
            sqlStatements.push(`-- City-specific rates for: ${itemName}`);
            
            for (const [city, rate] of Object.entries(cityRates)) {
                const cityInsert = `INSERT INTO city_pricing (
    item_name,
    item_category,
    city,
    city_rate,
    source_file
) VALUES (
    '${escapeSql(itemName)}',
    '${escapeSql(sheet.category)}',
    '${city}',
    ${rate},
    '${escapeSql(sheet.filename)}'
) ON CONFLICT (item_name, item_category, city) 
DO UPDATE SET
    city_rate = EXCLUDED.city_rate,
    updated_at = NOW();`;
                
                sqlStatements.push(cityInsert);
                cityRateInserts++;
            }
            sqlStatements.push('');
        }
    }
}

console.log(`\n✅ Processed ${insertCount} pricing items`);
console.log(`✅ Generated ${cityRateInserts} city-specific rates`);

// Add city multipliers table
sqlStatements.push('');
sqlStatements.push('-- ========================================');
sqlStatements.push('-- PART 2: CITY MULTIPLIERS');
sqlStatements.push('-- ========================================');
sqlStatements.push('');

let multiplierCount = 0;
for (const [category, multiplierData] of Object.entries(data.cityMultipliers)) {
    sqlStatements.push(`-- Category: ${category}`);
    
    for (const row of multiplierData.data) {
        if (!row.City || !row.Price_Multiplier) continue;
        
        const city = row.City;
        const multiplierStr = row.Price_Multiplier;
        
        // Parse multiplier (e.g., "1.10x" -> 1.10, "0.97x" -> 0.97)
        let multiplier = 1.0;
        const match = multiplierStr.match(/([0-9.]+)/);
        if (match) {
            multiplier = parseFloat(match[1]);
        }
        
        const notes = row.Market_Notes || '';
        
        const multiplierInsert = `INSERT INTO city_multipliers (
    city,
    category,
    multiplier,
    notes
) VALUES (
    '${escapeSql(city)}',
    '${escapeSql(category)}',
    ${multiplier},
    '${escapeSql(notes)}'
) ON CONFLICT (city, category) 
DO UPDATE SET
    multiplier = EXCLUDED.multiplier,
    notes = EXCLUDED.notes,
    updated_at = NOW();`;
        
        sqlStatements.push(multiplierInsert);
        multiplierCount++;
    }
    sqlStatements.push('');
}

console.log(`✅ Generated ${multiplierCount} city multiplier entries`);

// Add material comparisons
sqlStatements.push('-- ========================================');
sqlStatements.push('-- PART 3: MATERIAL COMPARISONS');
sqlStatements.push('-- ========================================');
sqlStatements.push('');

let materialCount = 0;
for (const [category, materialData] of Object.entries(data.materialComparisons)) {
    sqlStatements.push(`-- Category: ${category}`);
    
    for (const row of materialData.data) {
        const materialInsert = `INSERT INTO material_reference (
    category,
    data,
    source_file
) VALUES (
    '${escapeSql(category)}',
    '${escapeSql(JSON.stringify(row))}'::jsonb,
    '${escapeSql(materialData.filename)}'
) ON CONFLICT (category) 
DO UPDATE SET
    data = EXCLUDED.data,
    updated_at = NOW();`;
        
        sqlStatements.push(materialInsert);
        materialCount++;
        break; // Only insert once per category (full comparison table)
    }
}

console.log(`✅ Generated ${materialCount} material comparison entries`);

// Add summary
sqlStatements.push('');
sqlStatements.push('-- ========================================');
sqlStatements.push('-- IMPORT SUMMARY');
sqlStatements.push('-- ========================================');
sqlStatements.push(`-- Total pricing items: ${insertCount}`);
sqlStatements.push(`-- City-specific rates: ${cityRateInserts}`);
sqlStatements.push(`-- City multipliers: ${multiplierCount}`);
sqlStatements.push(`-- Material comparisons: ${materialCount}`);
sqlStatements.push('');
sqlStatements.push('-- Verification queries:');
sqlStatements.push("-- SELECT COUNT(*) FROM pricing_items WHERE source = 'citywise_excel_2025';");
sqlStatements.push('-- SELECT COUNT(*) FROM city_pricing;');
sqlStatements.push('-- SELECT COUNT(*) FROM city_multipliers;');
sqlStatements.push('-- SELECT COUNT(*) FROM material_reference;');

// Write SQL file
fs.writeFileSync(OUTPUT_SQL, sqlStatements.join('\n'));

console.log(`\n✅ SQL script saved: ${OUTPUT_SQL}`);
console.log(`📦 Size: ${(fs.statSync(OUTPUT_SQL).size / 1024).toFixed(2)} KB`);
console.log(`📝 Lines: ${sqlStatements.length.toLocaleString()}`);

console.log('\n🎯 SUMMARY:');
console.log('================');
console.log(`Pricing Items: ${insertCount}`);
console.log(`City Rates: ${cityRateInserts}`);
console.log(`City Multipliers: ${multiplierCount}`);
console.log(`Material Comparisons: ${materialCount}`);
console.log('================');
console.log('\n✅ DONE! Ready to import into Supabase.');
