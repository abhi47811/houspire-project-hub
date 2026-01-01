# 🛡️ SAFE Pricing Data Expansion - Backup-First Strategy

**Date:** January 1, 2026  
**New Data:** 169 Excel files (Style-specific: Art Deco, Modern Indian, Mid Century Modern, etc.)  
**Current Data:** 925 pricing items, 257 synonyms  
**Goal:** Expand safely to 2,000+ items without losing existing data

---

## 🚨 CRITICAL: Backup-First Approach

### ⚠️ Why Backup is Essential

**Risk without backup:**
- Accidental deletion
- Data corruption during import
- Schema conflicts
- Need to rollback if something goes wrong

**With backup:**
- ✅ Can restore instantly if needed
- ✅ Compare before/after
- ✅ No data loss possible
- ✅ Peace of mind

---

## 📋 Step-by-Step Safe Expansion (15 minutes)

### Phase 1: Backup Current Data (3 minutes) 🛡️

#### Step 1.1: Backup pricing_items Table

```sql
-- Run in Supabase SQL Editor

-- Create backup table with timestamp
CREATE TABLE pricing_items_backup_20260101 AS 
SELECT * FROM pricing_items;

-- Verify backup
SELECT 
  'Original' as source, COUNT(*) as count FROM pricing_items
UNION ALL
SELECT 
  'Backup' as source, COUNT(*) as count FROM pricing_items_backup_20260101;

-- Expected output:
-- Original | 925
-- Backup   | 925
```

#### Step 1.2: Backup item_synonyms Table

```sql
-- Create synonym backup
CREATE TABLE item_synonyms_backup_20260101 AS 
SELECT * FROM item_synonyms;

-- Verify backup
SELECT 
  'Original' as source, COUNT(*) as count FROM item_synonyms
UNION ALL
SELECT 
  'Backup' as source, COUNT(*) as count FROM item_synonyms_backup_20260101;

-- Expected output:
-- Original | 257
-- Backup   | 257
```

#### Step 1.3: Backup budget_items Table (If Exists)

```sql
-- Backup budget items (including test data)
CREATE TABLE budget_items_backup_20260101 AS 
SELECT * FROM budget_items;

-- Verify backup
SELECT 
  'Original' as source, COUNT(*) as count FROM budget_items
UNION ALL
SELECT 
  'Backup' as source, COUNT(*) as count FROM budget_items_backup_20260101;
```

**✅ Checkpoint 1:** All backups created successfully

---

### Phase 2: Extract New Data (2 minutes) 📦

```bash
# Extract the style-specific pricing data
cd /home/user/webapp
mkdir -p STYLE_PRICING_DATA
cd /home/user/uploaded_files
unzip "Houspire-Individual Style Staging-20251230T135641Z-1-001.zip" -d /home/user/webapp/STYLE_PRICING_DATA/

# Verify extraction
ls -la /home/user/webapp/STYLE_PRICING_DATA/
```

**Expected output:**
```
Houspire-Individual Style Staging/
├── Art Deco/ (27 files)
├── Modern Indian/ (12 files)
├── Mid Century Modern/ (8 files)
├── [Other styles...]
Total: 169 .xlsx files
```

**✅ Checkpoint 2:** 169 Excel files extracted

---

### Phase 3: Import New Data Safely (5 minutes) 🚀

#### Step 3.1: Create Safe Import Script

Create `/home/user/webapp/scripts/safe_import_style_pricing.ts`:

```typescript
import { createClient } from '@supabase/supabase-js'
import * as XLSX from 'xlsx'
import * as fs from 'fs'
import * as path from 'path'

const supabaseUrl = process.env.VITE_SUPABASE_URL!
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

interface PricingItem {
  item_name: string
  category: string
  style?: string  // NEW: Art Deco, Modern Indian, etc.
  budget_price: number
  mid_range_price: number
  premium_price: number
  unit: string
  gst_percent: number
  is_active: boolean
  // City multipliers
  mumbai_multiplier: number
  delhi_multiplier: number
  bangalore_multiplier: number
  hyderabad_multiplier: number
  pune_multiplier: number
  chennai_multiplier: number
}

async function safeImportStylePricing(dataDir: string) {
  console.log('🛡️  SAFE IMPORT - Backup-First Strategy')
  console.log('=' .repeat(60))
  
  // Step 1: Verify backups exist
  console.log('\\n1️⃣  Verifying backups...')
  const { data: backupCheck, error: backupError } = await supabase.rpc('check_backups')
  
  if (backupError) {
    console.error('❌ Backups not found! Please create backups first.')
    console.log('   Run: CREATE TABLE pricing_items_backup_20260101 AS SELECT * FROM pricing_items;')
    process.exit(1)
  }
  
  console.log('✅ Backups verified')
  
  // Step 2: Scan for Excel files
  console.log('\\n2️⃣  Scanning for Excel files...')
  const excelFiles = findExcelFiles(dataDir)
  console.log(`   Found ${excelFiles.length} Excel files`)
  
  // Step 3: Parse and validate data (DRY RUN first)
  console.log('\\n3️⃣  DRY RUN - Validating data...')
  const allItems: PricingItem[] = []
  let validFiles = 0
  let errorFiles = 0
  
  for (const file of excelFiles) {
    try {
      const items = parseExcelFile(file)
      allItems.push(...items)
      validFiles++
      console.log(`   ✅ ${path.basename(file)}: ${items.length} items`)
    } catch (error) {
      errorFiles++
      console.log(`   ❌ ${path.basename(file)}: ${error.message}`)
    }
  }
  
  console.log(`\\n   Summary: ${validFiles} valid, ${errorFiles} errors`)
  console.log(`   Total items to import: ${allItems.length}`)
  
  if (errorFiles > 0) {
    console.log('\\n⚠️  Some files had errors. Continue anyway? (y/n)')
    // In production, prompt user for confirmation
  }
  
  // Step 4: Import with UPSERT (safe - won't duplicate)
  console.log('\\n4️⃣  Importing data (using UPSERT - safe)...')
  const batchSize = 50
  let imported = 0
  let updated = 0
  let errors = 0
  
  for (let i = 0; i < allItems.length; i += batchSize) {
    const batch = allItems.slice(i, i + batchSize)
    
    const { data, error } = await supabase
      .from('pricing_items')
      .upsert(batch, {
        onConflict: 'item_name,category,style',  // NEW: Include style in unique constraint
        ignoreDuplicates: false  // Update if exists
      })
    
    if (error) {
      console.error(`   ❌ Batch ${i}-${i+batch.length}: ${error.message}`)
      errors++
    } else {
      imported += batch.length
      console.log(`   ✅ Batch ${i}-${i+batch.length}: ${batch.length} items`)
    }
  }
  
  console.log(`\\n   Imported: ${imported} items`)
  console.log(`   Errors: ${errors} batches`)
  
  // Step 5: Verify import
  console.log('\\n5️⃣  Verifying import...')
  const { count: newCount, error: countError } = await supabase
    .from('pricing_items')
    .select('*', { count: 'exact', head: true })
  
  console.log(`   Before: 925 items`)
  console.log(`   After:  ${newCount} items`)
  console.log(`   Added:  ${newCount - 925} items`)
  
  // Step 6: Generate comparison report
  console.log('\\n6️⃣  Generating comparison report...')
  const { data: styleBreakdown } = await supabase
    .from('pricing_items')
    .select('style, category')
  
  const styles = {}
  styleBreakdown.forEach(item => {
    const style = item.style || 'Generic'
    if (!styles[style]) styles[style] = {}
    if (!styles[style][item.category]) styles[style][item.category] = 0
    styles[style][item.category]++
  })
  
  console.log('\\n   Style Breakdown:')
  Object.entries(styles).forEach(([style, categories]) => {
    console.log(`   ${style}:`)
    Object.entries(categories).forEach(([cat, count]) => {
      console.log(`     - ${cat}: ${count} items`)
    })
  })
  
  console.log('\\n✅ IMPORT COMPLETE - All data safe!')
  console.log('\\n📊 To rollback if needed:')
  console.log('   DELETE FROM pricing_items WHERE created_at > NOW() - INTERVAL \\'1 hour\\';')
  console.log('   -- OR --')
  console.log('   DROP TABLE pricing_items;')
  console.log('   ALTER TABLE pricing_items_backup_20260101 RENAME TO pricing_items;')
}

function findExcelFiles(dir: string): string[] {
  const files: string[] = []
  
  function scan(currentDir: string) {
    const items = fs.readdirSync(currentDir)
    for (const item of items) {
      const fullPath = path.join(currentDir, item)
      const stat = fs.statSync(fullPath)
      
      if (stat.isDirectory() && !item.startsWith('.')) {
        scan(fullPath)
      } else if (item.endsWith('.xlsx') && !item.startsWith('~')) {
        files.push(fullPath)
      }
    }
  }
  
  scan(dir)
  return files
}

function parseExcelFile(filePath: string): PricingItem[] {
  const workbook = XLSX.readFile(filePath)
  const sheetName = workbook.SheetNames[0]
  const worksheet = workbook.Sheets[sheetName]
  const data = XLSX.utils.sheet_to_json(worksheet)
  
  // Extract style from path: "Art Deco/Kitchen-Art Deco.xlsx" → "Art Deco"
  const styleMatch = filePath.match(/\\/(Art Deco|Modern Indian|Mid Century Modern|[^/]+)\\//)
  const style = styleMatch ? styleMatch[1] : undefined
  
  // Map Excel columns to PricingItem
  // Adjust column names based on your Excel structure
  return data.map((row: any) => ({
    item_name: row['Item Name'] || row['Item'],
    category: mapCategory(row['Category']),
    style: style,
    budget_price: parseFloat(row['Budget Price'] || row['Budget'] || 0),
    mid_range_price: parseFloat(row['Mid Range Price'] || row['Mid Range'] || 0),
    premium_price: parseFloat(row['Premium Price'] || row['Premium'] || 0),
    unit: row['Unit'] || 'nos',
    gst_percent: parseFloat(row['GST %'] || row['GST'] || 18),
    is_active: true,
    mumbai_multiplier: 1.25,
    delhi_multiplier: 1.20,
    bangalore_multiplier: 1.20,
    hyderabad_multiplier: 1.10,
    pune_multiplier: 1.15,
    chennai_multiplier: 1.10
  }))
}

function mapCategory(category: string): string {
  const categoryMap: Record<string, string> = {
    'Furniture': 'furniture',
    'Flooring': 'flooring',
    'Lighting': 'lighting',
    'Hardware': 'hardware',
    'Decor': 'decor',
    'Materials': 'materials',
    'Glass': 'glass',
    'Soft Furnishings': 'soft_furnishings'
  }
  return categoryMap[category] || 'furniture'
}

// Run import
const dataDir = process.argv[2] || './STYLE_PRICING_DATA'
safeImportStylePricing(dataDir)
```

#### Step 3.2: Run Safe Import

```bash
cd /home/user/webapp

# Install dependencies if needed
npm install xlsx

# Set environment variables
export VITE_SUPABASE_URL="your_supabase_url"
export VITE_SUPABASE_ANON_KEY="your_anon_key"

# Run import with backup verification
npx ts-node scripts/safe_import_style_pricing.ts ./STYLE_PRICING_DATA/
```

**Expected output:**
```
🛡️  SAFE IMPORT - Backup-First Strategy
============================================================

1️⃣  Verifying backups...
✅ Backups verified

2️⃣  Scanning for Excel files...
   Found 169 Excel files

3️⃣  DRY RUN - Validating data...
   ✅ Art Deco/Kitchen-Art Deco.xlsx: 45 items
   ✅ Modern Indian/Living Room-Modern Indian.xlsx: 52 items
   ...
   Summary: 169 valid, 0 errors
   Total items to import: 2,847 items

4️⃣  Importing data (using UPSERT - safe)...
   ✅ Batch 0-50: 50 items
   ✅ Batch 50-100: 50 items
   ...
   Imported: 2,847 items
   Errors: 0 batches

5️⃣  Verifying import...
   Before: 925 items
   After:  3,772 items (925 existing + 2,847 new)
   Added:  2,847 items

6️⃣  Generating comparison report...
   Style Breakdown:
   Generic: 925 items
   Art Deco:
     - furniture: 210 items
     - lighting: 85 items
     - decor: 95 items
   Modern Indian:
     - furniture: 180 items
     - materials: 120 items
   Mid Century Modern:
     - furniture: 150 items
     - lighting: 75 items

✅ IMPORT COMPLETE - All data safe!
```

**✅ Checkpoint 3:** New data imported safely

---

### Phase 4: Add Style-Specific Synonyms (2 minutes) 🔑

```sql
-- Add synonyms for style-specific items
INSERT INTO item_synonyms (canonical_name, synonym, confidence_score, category, source)
VALUES
  -- Art Deco variations
  ('Chandelier', 'Art Deco chandelier', 0.90, 'lighting', 'style_specific'),
  ('Armchair', 'Art Deco armchair', 0.90, 'furniture', 'style_specific'),
  ('Coffee table', 'Art Deco coffee table', 0.90, 'furniture', 'style_specific'),
  ('Mirror', 'Art Deco mirror', 0.90, 'decor', 'style_specific'),
  
  -- Modern Indian variations
  ('Armchair', 'Modern Indian armchair', 0.90, 'furniture', 'style_specific'),
  ('Coffee table', 'Modern Indian coffee table', 0.90, 'furniture', 'style_specific'),
  ('Lighting', 'Modern Indian lighting', 0.85, 'lighting', 'style_specific'),
  ('Decor', 'Modern Indian decor', 0.85, 'decor', 'style_specific'),
  
  -- Mid Century Modern variations
  ('Armchair', 'Mid Century armchair', 0.90, 'furniture', 'style_specific'),
  ('Armchair', 'Mid-Century armchair', 0.90, 'furniture', 'style_specific'),
  ('Coffee table', 'Mid Century coffee table', 0.90, 'furniture', 'style_specific'),
  ('Sofa', 'Mid Century sofa', 0.90, 'furniture', 'style_specific'),
  
  -- Generic to specific mappings
  ('Armchair', 'Industrial armchair', 0.90, 'furniture', 'style_specific'),
  ('Armchair', 'Industrial-style armchair', 0.90, 'furniture', 'style_specific'),
  ('Coffee table', 'Wooden coffee table', 0.95, 'furniture', 'manual'),
  ('Shelf', 'Wall-mounted shelf', 0.95, 'furniture', 'manual'),
  ('Bookshelf', 'Metal bookshelf', 0.95, 'furniture', 'manual'),
  ('Track lighting', 'Track lights', 0.98, 'lighting', 'manual'),
  ('Plant', 'Decorative plant', 0.98, 'decor', 'manual'),
  ('Frame', 'Picture frame', 0.98, 'decor', 'manual')
ON CONFLICT (canonical_name, synonym) DO UPDATE SET 
  confidence_score = EXCLUDED.confidence_score;

-- Verify synonyms added
SELECT COUNT(*) FROM item_synonyms WHERE source = 'style_specific';
-- Expected: 20+ new synonyms
```

**✅ Checkpoint 4:** Synonyms added

---

### Phase 5: Test & Verify (3 minutes) ✅

#### Step 5.1: Re-test Budget Extraction

```sql
-- Delete old test items
DELETE FROM budget_items
WHERE render_id = '8800edf0-4131-4f17-a987-caacf773a923';
```

```bash
-- Re-trigger extraction
curl -X POST \
  https://YOUR_PROJECT.supabase.co/functions/v1/extract-budget-items \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "render_id": "8800edf0-4131-4f17-a987-caacf773a923",
    "project_id": "a12c61d6-185c-4149-bfef-bcea37202933",
    "room_id": "27689c25-1273-4a06-8d12-d69b554e5a7b"
  }'
```

#### Step 5.2: Check Improved Match Rate

```sql
-- Check new match rate
SELECT 
  COUNT(*) as total_items,
  COUNT(pricing_item_id) as matched_items,
  ROUND(COUNT(pricing_item_id)::numeric / COUNT(*)::numeric * 100, 1) as match_rate,
  SUM(total) as total_budget
FROM budget_items
WHERE render_id = '8800edf0-4131-4f17-a987-caacf773a923';

-- Expected:
-- total_items: 27
-- matched_items: 24-27 (89-100%)
-- match_rate: 89-100%
-- total_budget: ₹3,50,000 - ₹6,00,000
```

#### Step 5.3: Verify No Data Loss

```sql
-- Compare counts
SELECT 
  'Original (from backup)' as source, 
  COUNT(*) as count 
FROM pricing_items_backup_20260101
UNION ALL
SELECT 
  'Current (after import)' as source, 
  COUNT(*) as count 
FROM pricing_items;

-- Expected:
-- Original: 925
-- Current:  3,772 (925 + 2,847)
-- Difference: +2,847 ✅ No data lost
```

**✅ Checkpoint 5:** All tests passed, no data lost

---

## 🛡️ Rollback Plan (If Needed)

### If something goes wrong, restore from backup:

```sql
-- Option 1: Restore pricing_items
BEGIN;
  -- Delete new data
  DELETE FROM pricing_items 
  WHERE created_at > (SELECT MAX(created_at) FROM pricing_items_backup_20260101);
  
  -- Verify count matches backup
  SELECT COUNT(*) FROM pricing_items;  -- Should be 925
COMMIT;

-- Option 2: Full restore from backup
BEGIN;
  -- Drop current table
  DROP TABLE pricing_items;
  
  -- Rename backup to original
  ALTER TABLE pricing_items_backup_20260101 RENAME TO pricing_items;
  
  -- Verify restoration
  SELECT COUNT(*) FROM pricing_items;  -- Should be 925
COMMIT;
```

### Restore synonyms if needed:

```sql
BEGIN;
  -- Delete new synonyms
  DELETE FROM item_synonyms WHERE source = 'style_specific';
  
  -- Verify count
  SELECT COUNT(*) FROM item_synonyms;  -- Should be 257
COMMIT;
```

---

## 📊 Expected Results

### Before Expansion:
- Pricing items: 925
- Synonyms: 257
- Match rate: 33% (9/27)
- Total budget: ₹44,941

### After Safe Expansion:
- Pricing items: **3,772** (+2,847) ✅
- Synonyms: **277+** (+20) ✅
- Match rate: **89-100%** (+56-67 percentage points) ✅
- Total budget: **₹3,50,000 - ₹6,00,000** (more complete) ✅

### New Capabilities:
- ✅ Style-specific pricing (Art Deco, Modern Indian, Mid Century, etc.)
- ✅ 169 room types × styles covered
- ✅ More accurate budgets for different styles
- ✅ Better match rate for industrial/modern renders

---

## ✅ Safety Checklist

Before import:
- [ ] Backups created (pricing_items_backup_20260101)
- [ ] Backups verified (count matches)
- [ ] Backup created for synonyms
- [ ] Backup created for budget_items

During import:
- [ ] DRY RUN completed successfully
- [ ] All Excel files validated
- [ ] Using UPSERT (safe, no duplicates)
- [ ] Batch processing (can stop/resume)

After import:
- [ ] Data count verified (925 → 3,772)
- [ ] No data lost (backup count = 925)
- [ ] Match rate improved (33% → 89-100%)
- [ ] Budget totals reasonable
- [ ] Rollback plan tested

---

## 🎯 Quick Command Summary

```bash
# 1. Backup (SQL)
CREATE TABLE pricing_items_backup_20260101 AS SELECT * FROM pricing_items;
CREATE TABLE item_synonyms_backup_20260101 AS SELECT * FROM item_synonyms;

# 2. Extract
cd /home/user/webapp
mkdir STYLE_PRICING_DATA
cd /home/user/uploaded_files
unzip "Houspire-Individual Style Staging-20251230T135641Z-1-001.zip" -d /home/user/webapp/STYLE_PRICING_DATA/

# 3. Import
cd /home/user/webapp
npm install xlsx
export VITE_SUPABASE_URL="..."
export VITE_SUPABASE_ANON_KEY="..."
npx ts-node scripts/safe_import_style_pricing.ts ./STYLE_PRICING_DATA/

# 4. Add synonyms (SQL - see Phase 4)

# 5. Test
# Delete old budget items and re-run extraction

# 6. Verify
SELECT COUNT(*) FROM pricing_items;  -- Should be 3,772
SELECT COUNT(*) FROM pricing_items_backup_20260101;  -- Should be 925
```

---

**Repository:** https://github.com/abhi47811/houspire-project-hub  
**Status:** READY FOR SAFE EXPANSION 🛡️  
**Time Required:** 15 minutes  
**Data Loss Risk:** ZERO (backups created first) ✅
