const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

/**
 * COMPREHENSIVE CITYWISE DATA EXTRACTOR
 * 
 * Purpose: Extract ALL data from all 27 citywise Excel files
 * - Handles_CityWise_Rates
 * - City_Multipliers  
 * - Material_Comparison
 * - Brand_Comparison
 * - Size_Guide
 * - Pricing tables
 * - Reference data
 * 
 * Output: Complete database-ready JSON and SQL
 */

const UPLOADED_FILES_DIR = '/home/user/uploaded_files';
const OUTPUT_DIR = '/home/user/webapp/CITYWISE_DATA';

// Create output directory
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Categories and their file names
const CITYWISE_FILES = [
    'acrylic_shutters_citywise_rates_2025.xlsx',
    'aluminium_profiles_citywise_rates_2025.xlsx',
    'baskets_citywise_rates_2025.xlsx',
    'edgebanding_citywise_rates_2025.xlsx',
    'false_ceiling_citywise_rates_2025.xlsx',
    'floor_tiles_complete_citywise_rates_2025.xlsx',
    'electrical_lighting_citywise_rates_2025.xlsx',
    'glass_shutters_panels_citywise_rates_2025.xlsx',
    'handles_citywise_rates_2025.xlsx',
    'hardware_hinges_channels_citywise_rates_2025.xlsx',
    'home_decor_complete_citywise_rates_2025.xlsx',
    'interior_paint_finishes_citywise_rates_2025.xlsx',
    'kitchen_dado_tiles_citywise_rates_2025.xlsx',
    'kitchen_sinks_citywise_rates_2025.xlsx',
    'laminates_citywise_rates_2025.xlsx',
    'loose_furniture_citywise_rates_2025_COMPLETE.xlsx',
    'mirror_panels_citywise_rates_2025.xlsx',
    'plywood_citywise_rates_2025.xlsx',
    'quartz_granite_citywise_rates_2025.xlsx',
    'veneers_citywise_rates_2025.xlsx',
    'wallpaper_citywise_rates_2025.xlsx',
    'window_furnishings_citywise_rates_2025.xlsx',
    'wardrobe_organisers_citywise_rates_2025.xlsx',
    'wooden_panels_citywise_rates_2025.xlsx',
    'wood_polish_citywise_rates_2025.xlsx',
    'stone_cladding_citywise_rates_2025.xlsx',
    'mdf_citywise_rates_2025.xlsx'
];

// Data structure to hold all extracted data
const extractedData = {
    summary: {
        totalFiles: 0,
        totalSheets: 0,
        totalRows: 0,
        categories: {},
        processingDate: new Date().toISOString()
    },
    cityMultipliers: {},
    materialComparisons: {},
    brandComparisons: {},
    sizeGuides: {},
    pricingTables: [],
    referenceData: [],
    allSheets: {}
};

// Function to extract category from filename
function getCategoryFromFilename(filename) {
    return filename.replace('_citywise_rates_2025.xlsx', '')
        .replace('_COMPLETE.xlsx', '')
        .replace(/_/g, '_')
        .toLowerCase();
}

// Function to detect sheet type based on name and content
function detectSheetType(sheetName, headers) {
    const name = sheetName.toLowerCase();
    const headerStr = headers.join('|').toLowerCase();
    
    if (name.includes('city') && name.includes('multiplier')) return 'city_multipliers';
    if (name.includes('city') && name.includes('rate')) return 'citywise_pricing';
    if (name.includes('material') && name.includes('comparison')) return 'material_comparison';
    if (name.includes('brand') && name.includes('comparison')) return 'brand_comparison';
    if (name.includes('size') && name.includes('guide')) return 'size_guide';
    if (name.includes('price') || name.includes('rate')) return 'pricing_table';
    if (name.includes('spec') || name.includes('specification')) return 'specifications';
    if (name.includes('guide') || name.includes('reference')) return 'reference';
    
    // Detect by headers
    if (headerStr.includes('city') && (headerStr.includes('rate') || headerStr.includes('price'))) {
        return 'citywise_pricing';
    }
    if (headerStr.includes('material') && headerStr.includes('comparison')) {
        return 'material_comparison';
    }
    if (headerStr.includes('brand')) return 'brand_comparison';
    if (headerStr.includes('size')) return 'size_guide';
    
    return 'general_data';
}

// Function to safely get cell value
function getCellValue(row, key) {
    if (!row || !key) return null;
    const value = row[key];
    if (value === null || value === undefined || value === '') return null;
    if (typeof value === 'string') return value.trim();
    return value;
}

// Function to extract headers from first row
function extractHeaders(sheet) {
    const range = XLSX.utils.decode_range(sheet['!ref']);
    const headers = [];
    
    for (let col = range.s.c; col <= range.e.c; col++) {
        const cellAddress = XLSX.utils.encode_cell({ r: range.s.r, c: col });
        const cell = sheet[cellAddress];
        if (cell && cell.v) {
            headers.push(String(cell.v).trim());
        } else {
            headers.push(`COL_${col}`);
        }
    }
    
    return headers;
}

// Function to process a single sheet
function processSheet(workbook, sheetName, category, filename) {
    console.log(`  📄 Processing sheet: ${sheetName}`);
    
    const sheet = workbook.Sheets[sheetName];
    if (!sheet['!ref']) {
        console.log(`    ⚠️  Empty sheet, skipping`);
        return null;
    }
    
    // Extract headers
    const headers = extractHeaders(sheet);
    console.log(`    📋 Headers: ${headers.slice(0, 10).join(', ')}${headers.length > 10 ? '...' : ''}`);
    
    // Convert to JSON
    const jsonData = XLSX.utils.sheet_to_json(sheet, { 
        defval: null,
        raw: false 
    });
    
    console.log(`    📊 Rows: ${jsonData.length}`);
    
    if (jsonData.length === 0) {
        console.log(`    ⚠️  No data rows, skipping`);
        return null;
    }
    
    // Detect sheet type
    const sheetType = detectSheetType(sheetName, headers);
    console.log(`    🏷️  Type: ${sheetType}`);
    
    // Store in appropriate structure
    const sheetData = {
        filename,
        category,
        sheetName,
        sheetType,
        headers,
        rowCount: jsonData.length,
        data: jsonData,
        sampleRows: jsonData.slice(0, 3)
    };
    
    extractedData.summary.totalRows += jsonData.length;
    
    // Categorize by type
    switch (sheetType) {
        case 'city_multipliers':
            extractedData.cityMultipliers[category] = sheetData;
            break;
        case 'material_comparison':
            extractedData.materialComparisons[category] = sheetData;
            break;
        case 'brand_comparison':
            extractedData.brandComparisons[category] = sheetData;
            break;
        case 'size_guide':
            extractedData.sizeGuides[category] = sheetData;
            break;
        case 'citywise_pricing':
        case 'pricing_table':
            extractedData.pricingTables.push(sheetData);
            break;
        case 'reference':
            extractedData.referenceData.push(sheetData);
            break;
        default:
            if (!extractedData.allSheets[category]) {
                extractedData.allSheets[category] = [];
            }
            extractedData.allSheets[category].push(sheetData);
    }
    
    return sheetData;
}

// Main processing function
function processAllFiles() {
    console.log('\n🚀 COMPREHENSIVE CITYWISE DATA EXTRACTION');
    console.log('==========================================\n');
    
    let filesProcessed = 0;
    let sheetsProcessed = 0;
    
    for (const filename of CITYWISE_FILES) {
        const filePath = path.join(UPLOADED_FILES_DIR, filename);
        
        if (!fs.existsSync(filePath)) {
            console.log(`❌ File not found: ${filename}`);
            continue;
        }
        
        console.log(`\n📁 Processing: ${filename}`);
        
        try {
            const workbook = XLSX.readFile(filePath);
            const category = getCategoryFromFilename(filename);
            
            console.log(`  Category: ${category}`);
            console.log(`  Sheets: ${workbook.SheetNames.length}`);
            
            if (!extractedData.summary.categories[category]) {
                extractedData.summary.categories[category] = {
                    filename,
                    sheetCount: 0,
                    rowCount: 0
                };
            }
            
            // Process each sheet
            for (const sheetName of workbook.SheetNames) {
                const sheetData = processSheet(workbook, sheetName, category, filename);
                if (sheetData) {
                    sheetsProcessed++;
                    extractedData.summary.categories[category].sheetCount++;
                    extractedData.summary.categories[category].rowCount += sheetData.rowCount;
                }
            }
            
            filesProcessed++;
            
        } catch (error) {
            console.error(`❌ Error processing ${filename}:`, error.message);
        }
    }
    
    extractedData.summary.totalFiles = filesProcessed;
    extractedData.summary.totalSheets = sheetsProcessed;
    
    return extractedData;
}

// Generate SQL for pricing tables
function generatePricingSQL(data) {
    const sqlStatements = [];
    
    sqlStatements.push('-- CITYWISE PRICING DATA IMPORT');
    sqlStatements.push('-- Generated: ' + new Date().toISOString());
    sqlStatements.push('-- Total Categories: ' + Object.keys(data.summary.categories).length);
    sqlStatements.push('-- Total Rows: ' + data.summary.totalRows);
    sqlStatements.push('');
    
    // Create a comprehensive pricing items table
    sqlStatements.push('-- Insert pricing items from citywise data');
    sqlStatements.push('');
    
    let insertCount = 0;
    
    // Process pricing tables
    for (const sheet of data.pricingTables) {
        sqlStatements.push(`-- Category: ${sheet.category} | Sheet: ${sheet.sheetName}`);
        
        for (const row of sheet.data) {
            // Extract item name (try common column names)
            const itemName = row['Item Name'] || row['Item'] || row['Product Name'] || 
                           row['Product'] || row['Description'] || row['NAME'];
            
            if (!itemName) continue;
            
            // Extract pricing (try to find city-wise rates)
            const basePrice = row['Base Price'] || row['Price'] || row['Rate'] || 
                            row['Mumbai'] || row['Delhi'] || row['Bangalore'];
            
            if (!basePrice || isNaN(parseFloat(basePrice))) continue;
            
            // Extract other fields
            const category = sheet.category;
            const subCategory = row['Sub Category'] || row['Type'] || row['Category'];
            const material = row['Material'] || row['Material Type'];
            const brand = row['Brand'];
            const unit = row['Unit'] || row['UOM'] || 'piece';
            
            // Generate INSERT statement
            const insertSQL = `INSERT INTO pricing_items (
    item_name, 
    item_category, 
    item_subcategory,
    material,
    brand,
    base_price, 
    unit,
    source,
    source_file,
    source_sheet,
    metadata
) VALUES (
    '${String(itemName).replace(/'/g, "''")}',
    '${category}',
    ${subCategory ? `'${String(subCategory).replace(/'/g, "''")}'` : 'NULL'},
    ${material ? `'${String(material).replace(/'/g, "''")}'` : 'NULL'},
    ${brand ? `'${String(brand).replace(/'/g, "''")}'` : 'NULL'},
    ${parseFloat(basePrice)},
    '${unit}',
    'citywise_excel',
    '${sheet.filename}',
    '${sheet.sheetName}',
    '${JSON.stringify(row).replace(/'/g, "''")}'::jsonb
) ON CONFLICT (item_name, item_category) DO UPDATE SET
    base_price = EXCLUDED.base_price,
    material = EXCLUDED.material,
    brand = EXCLUDED.brand,
    updated_at = NOW();`;
            
            sqlStatements.push(insertSQL);
            sqlStatements.push('');
            insertCount++;
        }
    }
    
    sqlStatements.push(`-- Total INSERT statements: ${insertCount}`);
    
    return sqlStatements.join('\n');
}

// Main execution
try {
    console.log('Starting comprehensive extraction...\n');
    
    const data = processAllFiles();
    
    // Save complete JSON
    const jsonPath = path.join(OUTPUT_DIR, 'citywise_complete_data.json');
    fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2));
    console.log(`\n✅ Complete data saved: ${jsonPath}`);
    
    // Save summary
    const summaryPath = path.join(OUTPUT_DIR, 'extraction_summary.json');
    fs.writeFileSync(summaryPath, JSON.stringify(data.summary, null, 2));
    console.log(`✅ Summary saved: ${summaryPath}`);
    
    // Generate and save SQL
    const sqlPath = path.join(OUTPUT_DIR, 'citywise_pricing_import.sql');
    const sql = generatePricingSQL(data);
    fs.writeFileSync(sqlPath, sql);
    console.log(`✅ SQL import script saved: ${sqlPath}`);
    
    // Print summary
    console.log('\n📊 EXTRACTION COMPLETE');
    console.log('======================');
    console.log(`Files Processed: ${data.summary.totalFiles}`);
    console.log(`Sheets Processed: ${data.summary.totalSheets}`);
    console.log(`Total Rows: ${data.summary.totalRows}`);
    console.log(`\nCategories: ${Object.keys(data.summary.categories).length}`);
    console.log(`City Multipliers: ${Object.keys(data.cityMultipliers).length}`);
    console.log(`Material Comparisons: ${Object.keys(data.materialComparisons).length}`);
    console.log(`Brand Comparisons: ${Object.keys(data.brandComparisons).length}`);
    console.log(`Size Guides: ${Object.keys(data.sizeGuides).length}`);
    console.log(`Pricing Tables: ${data.pricingTables.length}`);
    console.log(`Reference Data: ${data.referenceData.length}`);
    
    console.log('\n📈 Category Breakdown:');
    for (const [cat, info] of Object.entries(data.summary.categories)) {
        console.log(`  ${cat}: ${info.sheetCount} sheets, ${info.rowCount} rows`);
    }
    
    console.log('\n🎯 Next Steps:');
    console.log('1. Review citywise_complete_data.json for all extracted data');
    console.log('2. Run citywise_pricing_import.sql in Supabase');
    console.log('3. Verify data import with queries');
    console.log('4. Update calculators with city-specific pricing');
    
} catch (error) {
    console.error('\n❌ Fatal error:', error);
    process.exit(1);
}
