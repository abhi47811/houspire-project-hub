/**
 * COMPREHENSIVE PRICING DATA IMPORT SCRIPT
 * Import all 26 Excel files from uploaded Budgets-6 cities data
 * 
 * Files to import:
 * 1. acrylic_shutters_citywise_rates_2025.xlsx
 * 2. aluminium_profiles_citywise_rates_2025.xlsx
 * 3. baskets_citywise_rates_2025.xlsx
 * 4. edgebanding_citywise_rates_2025.xlsx
 * 5. electrical_lighting_citywise_rates_2025.xlsx
 * 6. false_ceiling_complete_citywise_rates_2025.xlsx
 * 7. floor_tiles_complete_citywise_rates_2025.xlsx
 * 8. glass_shutters_panels_citywise_rates_2025.xlsx
 * 9. handles_citywise_rates_2025.xlsx
 * 10. hardware_hinges_channels_citywise_rates_2025.xlsx
 * 11. home_decor_complete_citywise_rates_2025.xlsx
 * 12. interior_paint_finishes_citywise_rates_2025.xlsx
 * 13. kitchen_dado_tiles_citywise_rates_2025.xlsx
 * 14. kitchen_sinks_citywise_rates_2025.xlsx
 * 15. laminates_citywise_rates_2025.xlsx
 * 16. loose_furniture_citywise_rates_2025_COMPLETE.xlsx
 * 17. mdf_complete_citywise_rates_2025.xlsx
 * ... and more
 */

import * as XLSX from 'xlsx';
import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

// Supabase configuration
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || '';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_PUBLISHABLE_KEY || '';

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('❌ Missing Supabase credentials');
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// City multipliers (from Module 07)
const CITY_MULTIPLIERS: Record<string, number> = {
  'Hyderabad': 1.10,
  'Delhi': 1.20,
  'Bangalore': 1.15,
  'Pune': 1.05,
  'Mumbai': 1.25,
  'Chennai': 1.10,
  'Kolkata': 0.95,
  'Ahmedabad': 0.93,
  'Jaipur': 0.90,
  'Lucknow': 0.88,
  'Surat': 0.85,
};

// GST rates by category (from Module 07)
const GST_RATES: Record<string, number> = {
  'furniture': 18,
  'loose_furniture': 18,
  'modular_furniture': 18,
  'kitchen': 18,
  'wardrobe': 18,
  'flooring': 18,
  'floor_tiles': 18,
  'lighting': 18,
  'electrical': 18,
  'false_ceiling': 18,
  'plywood': 18,
  'mdf': 18,
  'laminates': 18,
  'acrylic': 18,
  'glass': 18,
  'hardware': 18,
  'hinges': 12,
  'channels': 12,
  'handles': 18,
  'baskets': 18,
  'stone': 28,
  'granite': 28,
  'quartz': 28,
  'countertop': 28,
  'paint': 18,
  'dado_tiles': 18,
  'sink': 18,
  'decor': 18,
  'edgebanding': 18,
  'aluminium': 18,
  'default': 18,
};

interface PricingItem {
  room_category: string;
  item_name: string;
  item_type: string;
  specification?: string;
  unit: string;
  
  // Tier prices
  budget_price: number;
  mid_premium_price: number;
  premium_price: number;
  
  // City multipliers
  hyderabad_multiplier: number;
  delhi_multiplier: number;
  bangalore_multiplier: number;
  pune_multiplier: number;
  mumbai_multiplier: number;
  chennai_multiplier: number;
  kolkata_multiplier?: number;
  ahmedabad_multiplier?: number;
  jaipur_multiplier?: number;
  lucknow_multiplier?: number;
  surat_multiplier?: number;
  
  gst_percent: number;
  keywords?: string[];
  is_active: boolean;
}

/**
 * Parse Excel file and extract pricing data
 */
function parseExcelFile(filePath: string): PricingItem[] {
  console.log(`📄 Parsing: ${path.basename(filePath)}`);
  
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const data: any[] = XLSX.utils.sheet_to_json(sheet);
  
  if (data.length === 0) {
    console.log(`⚠️  No data found in ${filePath}`);
    return [];
  }
  
  console.log(`  → Found ${data.length} rows`);
  
  // Determine category from filename
  const filename = path.basename(filePath, '.xlsx');
  const category = mapFilenameToCategory(filename);
  
  const items: PricingItem[] = [];
  
  for (const row of data) {
    // Skip header rows or empty rows
    if (!row['Item Name'] && !row['ITEM NAME'] && !row['Item']) continue;
    
    const itemName = row['Item Name'] || row['ITEM NAME'] || row['Item'] || 'Unknown';
    const spec = row['Specification'] || row['SPECIFICATION'] || row['Spec'] || '';
    const unit = row['Unit'] || row['UNIT'] || row['UOM'] || 'nos';
    
    // Extract prices (Budget, Mid-Premium, Premium)
    const budgetPrice = parsePrice(row['Budget Price'] || row['BUDGET PRICE'] || row['Budget'] || 0);
    const midPrice = parsePrice(row['Mid-Premium Price'] || row['MID-PREMIUM PRICE'] || row['Mid'] || budgetPrice * 1.5);
    const premiumPrice = parsePrice(row['Premium Price'] || row['PREMIUM PRICE'] || row['Premium'] || budgetPrice * 2.5);
    
    items.push({
      room_category: category,
      item_name: itemName,
      item_type: category,
      specification: spec,
      unit,
      budget_price: budgetPrice,
      mid_premium_price: midPrice,
      premium_price: premiumPrice,
      hyderabad_multiplier: CITY_MULTIPLIERS['Hyderabad'],
      delhi_multiplier: CITY_MULTIPLIERS['Delhi'],
      bangalore_multiplier: CITY_MULTIPLIERS['Bangalore'],
      pune_multiplier: CITY_MULTIPLIERS['Pune'],
      mumbai_multiplier: CITY_MULTIPLIERS['Mumbai'],
      chennai_multiplier: CITY_MULTIPLIERS['Chennai'],
      kolkata_multiplier: CITY_MULTIPLIERS['Kolkata'],
      ahmedabad_multiplier: CITY_MULTIPLIERS['Ahmedabad'],
      jaipur_multiplier: CITY_MULTIPLIERS['Jaipur'],
      lucknow_multiplier: CITY_MULTIPLIERS['Lucknow'],
      surat_multiplier: CITY_MULTIPLIERS['Surat'],
      gst_percent: GST_RATES[category] || GST_RATES['default'],
      keywords: generateKeywords(itemName),
      is_active: true,
    });
  }
  
  return items;
}

/**
 * Parse price string to number
 */
function parsePrice(value: any): number {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const cleaned = value.replace(/[₹,\s]/g, '');
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? 0 : parsed;
  }
  return 0;
}

/**
 * Map filename to category
 */
function mapFilenameToCategory(filename: string): string {
  const lower = filename.toLowerCase();
  
  if (lower.includes('loose_furniture')) return 'loose_furniture';
  if (lower.includes('furniture')) return 'furniture';
  if (lower.includes('kitchen')) return 'kitchen';
  if (lower.includes('wardrobe')) return 'wardrobe';
  if (lower.includes('floor_tiles') || lower.includes('flooring')) return 'flooring';
  if (lower.includes('lighting') || lower.includes('electrical')) return 'lighting';
  if (lower.includes('false_ceiling') || lower.includes('ceiling')) return 'false_ceiling';
  if (lower.includes('plywood')) return 'plywood';
  if (lower.includes('mdf')) return 'mdf';
  if (lower.includes('laminates')) return 'laminates';
  if (lower.includes('acrylic')) return 'acrylic';
  if (lower.includes('glass')) return 'glass';
  if (lower.includes('hardware') || lower.includes('hinges') || lower.includes('channels')) return 'hardware';
  if (lower.includes('handles')) return 'handles';
  if (lower.includes('baskets')) return 'baskets';
  if (lower.includes('paint')) return 'paint';
  if (lower.includes('dado_tiles') || lower.includes('tiles')) return 'tiles';
  if (lower.includes('sink')) return 'sink';
  if (lower.includes('decor')) return 'decor';
  if (lower.includes('edgebanding')) return 'edgebanding';
  if (lower.includes('aluminium')) return 'aluminium';
  
  return 'general';
}

/**
 * Generate keywords for item (for synonym matching)
 */
function generateKeywords(itemName: string): string[] {
  const keywords = itemName
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 2);
  
  return [...new Set(keywords)];  // Remove duplicates
}

/**
 * Import items to database
 */
async function importItems(items: PricingItem[]): Promise<void> {
  console.log(`💾 Importing ${items.length} items to database...`);
  
  // Batch insert (max 1000 at a time to avoid limits)
  const batchSize = 500;
  let imported = 0;
  
  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    
    const { data, error } = await supabase
      .from('pricing_items')
      .upsert(batch, {
        onConflict: 'item_name,category',
        ignoreDuplicates: false,
      });
    
    if (error) {
      console.error(`❌ Error importing batch ${i / batchSize + 1}:`, error);
    } else {
      imported += batch.length;
      console.log(`  ✓ Imported ${imported}/${items.length} items`);
    }
  }
  
  console.log(`✅ Import complete! ${imported} items imported.`);
}

/**
 * Main import function
 */
async function main() {
  const dataDir = process.argv[2] || './uploaded_files/Budgets-6 cities';
  
  console.log('🚀 Houspire Pricing Data Import');
  console.log('================================');
  console.log(`📁 Data directory: ${dataDir}`);
  console.log('');
  
  // Check if directory exists
  if (!fs.existsSync(dataDir)) {
    console.error(`❌ Directory not found: ${dataDir}`);
    process.exit(1);
  }
  
  // Find all Excel files
  const files = fs.readdirSync(dataDir)
    .filter(file => file.endsWith('.xlsx') || file.endsWith('.xls'))
    .map(file => path.join(dataDir, file));
  
  if (files.length === 0) {
    console.error('❌ No Excel files found in directory');
    process.exit(1);
  }
  
  console.log(`📊 Found ${files.length} Excel files`);
  console.log('');
  
  // Parse all files
  const allItems: PricingItem[] = [];
  
  for (const file of files) {
    try {
      const items = parseExcelFile(file);
      allItems.push(...items);
    } catch (error) {
      console.error(`❌ Error parsing ${file}:`, error);
    }
  }
  
  console.log('');
  console.log(`📦 Total items parsed: ${allItems.length}`);
  console.log('');
  
  // Import to database
  await importItems(allItems);
  
  console.log('');
  console.log('🎉 All done!');
}

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}
