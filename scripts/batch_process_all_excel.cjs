// Comprehensive Excel Batch Processor
// Processes all 169 Excel files and extracts Sheet 2 (Item Checklist)

const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');

const BASE_DIR = './STYLE_PRICING_DATA/Houspire-Individual Style Staging';

// Category pricing (same as edge function)
const CATEGORY_PRICING = {
  'SOFA / PRIMARY SEATING': { budget: 35000, mid: 65000, premium: 150000, unit: 'piece' },
  'ACCENT CHAIRS': { budget: 8000, mid: 18000, premium: 45000, unit: 'piece' },
  'COFFEE TABLE': { budget: 6000, mid: 15000, premium: 40000, unit: 'piece' },
  'SIDE TABLES': { budget: 3000, mid: 8000, premium: 20000, unit: 'piece' },
  'CONSOLE TABLE': { budget: 8000, mid: 18000, premium: 45000, unit: 'piece' },
  'TV UNIT': { budget: 12000, mid: 28000, premium: 70000, unit: 'piece' },
  'MEDIA CONSOLE': { budget: 12000, mid: 28000, premium: 70000, unit: 'piece' },
  'BOOKSHELF': { budget: 10000, mid: 25000, premium: 60000, unit: 'piece' },
  'STORAGE': { budget: 8000, mid: 20000, premium: 50000, unit: 'piece' },
  'OTTOMAN': { budget: 4000, mid: 10000, premium: 25000, unit: 'piece' },
  'CEILING LIGHT': { budget: 3000, mid: 8000, premium: 25000, unit: 'piece' },
  'FLOOR LAMPS': { budget: 2500, mid: 6000, premium: 18000, unit: 'piece' },
  'TABLE LAMPS': { budget: 1500, mid: 4000, premium: 12000, unit: 'piece' },
  'WALL SCONCES': { budget: 1500, mid: 4000, premium: 12000, unit: 'piece' },
  'PENDANT LIGHT': { budget: 2500, mid: 6000, premium: 18000, unit: 'piece' },
  'CHANDELIER': { budget: 15000, mid: 35000, premium: 100000, unit: 'piece' },
  'WINDOW TREATMENT': { budget: 3000, mid: 8000, premium: 20000, unit: 'set' },
  'FLOORING': { budget: 60, mid: 120, premium: 300, unit: 'sq.ft' },
  'AREA RUG': { budget: 5000, mid: 15000, premium: 50000, unit: 'piece' },
  'WALL TREATMENT': { budget: 2000, mid: 5000, premium: 15000, unit: 'sq.ft' },
  'CEILING': { budget: 80, mid: 150, premium: 350, unit: 'sq.ft' },
  'MIRROR': { budget: 4000, mid: 10000, premium: 30000, unit: 'piece' },
  'ARTWORK': { budget: 2000, mid: 6000, premium: 25000, unit: 'piece' },
  'WALL DECOR': { budget: 2000, mid: 6000, premium: 25000, unit: 'piece' },
  'ACCESSORIES': { budget: 500, mid: 1500, premium: 5000, unit: 'piece' },
  'DECORATIVE': { budget: 1000, mid: 3000, premium: 10000, unit: 'piece' },
  'PLANTS': { budget: 800, mid: 2000, premium: 6000, unit: 'piece' },
  'CLOCK': { budget: 2000, mid: 5000, premium: 15000, unit: 'piece' },
  'BED': { budget: 25000, mid: 55000, premium: 150000, unit: 'piece' },
  'BEDSIDE TABLES': { budget: 4000, mid: 10000, premium: 28000, unit: 'piece' },
  'NIGHT STAND': { budget: 4000, mid: 10000, premium: 28000, unit: 'piece' },
  'DRESSER': { budget: 15000, mid: 35000, premium: 80000, unit: 'piece' },
  'WARDROBE': { budget: 35000, mid: 80000, premium: 200000, unit: 'piece' },
  'CABINETS': { budget: 1200, mid: 2500, premium: 5000, unit: 'rft' },
  'COUNTERTOP': { budget: 250, mid: 600, premium: 1500, unit: 'sq.ft' },
  'BACKSPLASH': { budget: 80, mid: 180, premium: 400, unit: 'sq.ft' },
  'SINK': { budget: 5000, mid: 12000, premium: 35000, unit: 'piece' },
  'FAUCET': { budget: 3000, mid: 8000, premium: 25000, unit: 'piece' },
  'VANITY': { budget: 12000, mid: 28000, premium: 70000, unit: 'piece' },
  'TOILET': { budget: 8000, mid: 18000, premium: 50000, unit: 'piece' },
  'SHOWER': { budget: 15000, mid: 35000, premium: 100000, unit: 'set' },
  'BATHTUB': { budget: 20000, mid: 50000, premium: 150000, unit: 'piece' },
  'TILES': { budget: 50, mid: 100, premium: 250, unit: 'sq.ft' },
  'DINING TABLE': { budget: 20000, mid: 45000, premium: 120000, unit: 'piece' },
  'DINING CHAIRS': { budget: 4000, mid: 9000, premium: 25000, unit: 'piece' },
  'SEATING': { budget: 8000, mid: 18000, premium: 45000, unit: 'piece' },
  'BENCH': { budget: 6000, mid: 15000, premium: 40000, unit: 'piece' },
  'DEFAULT': { budget: 2000, mid: 5000, premium: 15000, unit: 'piece' },
};

// Style multipliers
const STYLE_MULTIPLIERS = {
  'art_deco': 1.25,
  'industrial': 1.10,
  'contemporary': 1.05,
  'mid_century_modern': 1.15,
  'scandinavian': 0.95,
  'minimalist': 0.90,
  'japandi': 1.10,
  'bohemian': 0.95,
  'farmhouse': 0.90,
  'traditional_indian': 1.00,
  'modern_indian': 1.05,
  'indian_coastal': 1.00,
  'transitional': 1.00,
};

function normalizeStyleName(name) {
  return name.toLowerCase()
    .replace(/\s+/g, '_')
    .replace(/-/g, '_');
}

function normalizeRoomName(name) {
  return name.toLowerCase()
    .replace(/\s+/g, '_')
    .replace(/-/g, '_');
}

function detectCategory(itemName, categoryHint) {
  const lower = itemName.toLowerCase();
  const categoryLower = (categoryHint || '').toLowerCase();
  
  // Match category hint first
  for (const key of Object.keys(CATEGORY_PRICING)) {
    if (categoryLower.includes(key.toLowerCase())) {
      return key;
    }
  }
  
  // Match item name
  if (lower.includes('sofa') || lower.includes('couch')) return 'SOFA / PRIMARY SEATING';
  if (lower.includes('chair') && !lower.includes('dining')) return 'ACCENT CHAIRS';
  if (lower.includes('coffee table')) return 'COFFEE TABLE';
  if (lower.includes('side table')) return 'SIDE TABLES';
  if (lower.includes('console')) return 'CONSOLE TABLE';
  if (lower.includes('tv unit') || lower.includes('media console')) return 'TV UNIT';
  if (lower.includes('bookshelf') || lower.includes('bookcase')) return 'BOOKSHELF';
  if (lower.includes('ottoman') || lower.includes('pouf')) return 'OTTOMAN';
  if (lower.includes('floor lamp')) return 'FLOOR LAMPS';
  if (lower.includes('table lamp')) return 'TABLE LAMPS';
  if (lower.includes('pendant') || lower.includes('hanging light')) return 'PENDANT LIGHT';
  if (lower.includes('chandelier')) return 'CHANDELIER';
  if (lower.includes('wall sconce') || lower.includes('wall light')) return 'WALL SCONCES';
  if (lower.includes('curtain') || lower.includes('blind') || lower.includes('drape')) return 'WINDOW TREATMENT';
  if (lower.includes('rug') || lower.includes('carpet')) return 'AREA RUG';
  if (lower.includes('mirror')) return 'MIRROR';
  if (lower.includes('artwork') || lower.includes('wall art') || lower.includes('painting')) return 'ARTWORK';
  if (lower.includes('plant')) return 'PLANTS';
  if (lower.includes('clock')) return 'CLOCK';
  if (lower.includes('bed') && !lower.includes('beside')) return 'BED';
  if (lower.includes('bedside') || lower.includes('nightstand')) return 'BEDSIDE TABLES';
  if (lower.includes('dresser')) return 'DRESSER';
  if (lower.includes('wardrobe') || lower.includes('almirah')) return 'WARDROBE';
  if (lower.includes('dining table')) return 'DINING TABLE';
  if (lower.includes('dining chair')) return 'DINING CHAIRS';
  if (lower.includes('bench')) return 'BENCH';
  if (lower.includes('vanity')) return 'VANITY';
  if (lower.includes('sink')) return 'SINK';
  if (lower.includes('faucet') || lower.includes('tap')) return 'FAUCET';
  
  return 'DEFAULT';
}

function processAllExcelFiles() {
  const allItems = [];
  const styles = fs.readdirSync(BASE_DIR).filter(f => {
    const stat = fs.statSync(path.join(BASE_DIR, f));
    return stat.isDirectory() && f !== '.DS_Store';
  });
  
  console.log(`Found ${styles.length} style directories`);
  
  for (const styleName of styles) {
    const styleDir = path.join(BASE_DIR, styleName);
    const files = fs.readdirSync(styleDir).filter(f => f.endsWith('.xlsx'));
    
    console.log(`\nProcessing ${styleName}: ${files.length} files`);
    
    for (const file of files) {
      const filePath = path.join(styleDir, file);
      
      try {
        // Read Excel file
        const workbook = XLSX.readFile(filePath);
        
        if (workbook.SheetNames.length < 2) {
          console.log(`  ⚠️ ${file}: Only ${workbook.SheetNames.length} sheet(s), skipping`);
          continue;
        }
        
        // Get Sheet 2 (Item Checklist)
        const checklistSheet = workbook.Sheets[workbook.SheetNames[1]];
        const data = XLSX.utils.sheet_to_json(checklistSheet, { header: 1, defval: '' });
        
        // Parse filename for room type
        const roomMatch = file.match(/^(.+?)-/i) || file.match(/^(.+?)\.xlsx$/i);
        const roomType = roomMatch ? normalizeRoomName(roomMatch[1]) : 'unknown';
        const style = normalizeStyleName(styleName);
        
        // Find header row
        let headerRow = -1;
        for (let i = 0; i < Math.min(5, data.length); i++) {
          const row = data[i];
          if (row.some(cell => typeof cell === 'string' && cell.toUpperCase().includes('ITEM'))) {
            headerRow = i;
            break;
          }
        }
        
        if (headerRow === -1) {
          console.log(`  ⚠️ ${file}: No header row found`);
          continue;
        }
        
        const headers = data[headerRow].map(h => String(h).trim().toUpperCase());
        const categoryIdx = headers.findIndex(h => h.includes('CATEGORY'));
        const itemIdx = headers.findIndex(h => h.includes('ITEM') && !h.includes('CATEGORY'));
        const includeIdx = headers.findIndex(h => h.includes('INCLUDE'));
        const priorityIdx = headers.findIndex(h => h.includes('PRIORITY'));
        const notesIdx = headers.findIndex(h => h.includes('NOTES'));
        
        if (itemIdx === -1) {
          console.log(`  ⚠️ ${file}: No ITEM column found`);
          continue;
        }
        
        // Process rows after header
        let currentCategory = '';
        let itemCount = 0;
        
        for (let i = headerRow + 1; i < data.length; i++) {
          const row = data[i];
          
          // Update category if present
          if (categoryIdx !== -1 && row[categoryIdx]) {
            const cat = String(row[categoryIdx]).trim();
            if (cat && !cat.match(/^(YES|NO|OPTIONAL)$/i)) {
              currentCategory = cat;
            }
          }
          
          // Get item
          const itemName = row[itemIdx] ? String(row[itemIdx]).trim() : '';
          if (!itemName || itemName.length < 2) continue;
          
          // Check include status
          const include = includeIdx !== -1 ? String(row[includeIdx] || '').trim() : '';
          if (include && include.match(/^NO$/i)) continue; // Skip items marked NO
          
          // Get priority and notes
          const priority = priorityIdx !== -1 ? String(row[priorityIdx] || 'Essential').trim() : 'Essential';
          const notes = notesIdx !== -1 ? String(row[notesIdx] || '').trim() : '';
          
          // Detect category for pricing
          const detectedCategory = detectCategory(itemName, currentCategory);
          const categoryPricing = CATEGORY_PRICING[detectedCategory] || CATEGORY_PRICING['DEFAULT'];
          const styleMultiplier = STYLE_MULTIPLIERS[style] || 1.0;
          
          // Calculate prices
          const budgetPrice = Math.round(categoryPricing.budget * styleMultiplier);
          const midPrice = Math.round(categoryPricing.mid * styleMultiplier);
          const premiumPrice = Math.round(categoryPricing.premium * styleMultiplier);
          
          allItems.push({
            item_name: itemName,
            category: detectedCategory,
            sub_category: currentCategory || detectedCategory,
            budget_price: budgetPrice,
            mid_premium_price: midPrice,
            premium_price: premiumPrice,
            unit: categoryPricing.unit,
            style: style,
            room_type: roomType,
            priority: priority,
            notes: notes,
            source_file: file
          });
          
          itemCount++;
        }
        
        console.log(`  ✓ ${file}: ${itemCount} items`);
        
      } catch (error) {
        console.log(`  ❌ ${file}: Error - ${error.message}`);
      }
    }
  }
  
  return allItems;
}

// Process all files
console.log('='.repeat(70));
console.log('PROCESSING ALL EXCEL FILES');
console.log('='.repeat(70));

const allItems = processAllExcelFiles();

console.log('\n' + '='.repeat(70));
console.log(`TOTAL ITEMS EXTRACTED: ${allItems.length}`);
console.log('='.repeat(70));

// Save to JSON for review
fs.writeFileSync('./all_pricing_items.json', JSON.stringify(allItems, null, 2));
console.log('\n✓ Saved to all_pricing_items.json');

// Generate SQL
console.log('\nGenerating SQL...');

let sql = `-- ============================================
-- COMPREHENSIVE PRICING IMPORT
-- Generated from 169 Excel files
-- Total items: ${allItems.length}
-- ============================================

`;

// Group by style for organized output
const byStyle = {};
allItems.forEach(item => {
  if (!byStyle[item.style]) byStyle[item.style] = [];
  byStyle[item.style].push(item);
});

for (const [style, items] of Object.entries(byStyle)) {
  sql += `\n-- ${style.toUpperCase()}: ${items.length} items\n`;
  sql += `INSERT INTO pricing_items (
  item_name,
  item_category,
  base_price,
  uom,
  style_tags,
  bangalore_multiplier,
  chennai_multiplier,
  delhi_multiplier,
  hyderabad_multiplier,
  mumbai_multiplier,
  pune_multiplier,
  notes,
  priority,
  room_type,
  source,
  is_active
) VALUES\n`;
  
  const values = items.map((item, idx) => {
    const isLast = idx === items.length - 1;
    const itemName = item.item_name.replace(/'/g, "''");
    const notes = item.notes.replace(/'/g, "''");
    return `  ('${itemName}', '${item.category}', ${item.mid_premium_price}, '${item.unit}', ARRAY['${item.style}', '${item.room_type}'], 1.0, 0.95, 1.1, 0.9, 1.15, 1.0, '${notes}', '${item.priority}', '${item.room_type}', 'excel_import', true)${isLast ? ';' : ','}`;
  }).join('\n');
  
  sql += values + '\n\n';
}

sql += `\n-- ============================================
-- ON CONFLICT HANDLING
-- ============================================
-- Run this after the inserts if you want to update existing items:
/*
ON CONFLICT (item_name) DO UPDATE SET
  base_price = EXCLUDED.base_price,
  style_tags = EXCLUDED.style_tags,
  notes = EXCLUDED.notes,
  priority = EXCLUDED.priority,
  room_type = EXCLUDED.room_type;
*/\n`;

fs.writeFileSync('./all_pricing_items.sql', sql);
console.log('✓ Saved SQL to all_pricing_items.sql');

// Generate statistics
console.log('\n' + '='.repeat(70));
console.log('STATISTICS');
console.log('='.repeat(70));

console.log(`\nBy Style:`);
for (const [style, items] of Object.entries(byStyle)) {
  console.log(`  ${style}: ${items.length} items`);
}

const byRoom = {};
allItems.forEach(item => {
  if (!byRoom[item.room_type]) byRoom[item.room_type] = 0;
  byRoom[item.room_type]++;
});

console.log(`\nBy Room Type:`);
for (const [room, count] of Object.entries(byRoom)) {
  console.log(`  ${room}: ${count} items`);
}

console.log('\n' + '='.repeat(70));
console.log('DONE!');
console.log('='.repeat(70));
console.log('\nNext steps:');
console.log('1. Review all_pricing_items.json');
console.log('2. Run all_pricing_items.sql in Supabase');
console.log('3. Verify import with: SELECT COUNT(*) FROM pricing_items;');
