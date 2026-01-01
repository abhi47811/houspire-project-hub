# ⚠️ CRITICAL ISSUE DISCOVERED - Excel Files Have Multiple Sheets

**Date:** January 1, 2026  
**Issue:** Excel files contain 3 sheets each, not just pricing data  
**Impact:** Lovable may not have all pricing data if only Sheet 1 was parsed

---

## 🔍 DISCOVERY

### Excel File Structure (169 files × 3 sheets = 507 sheets total)

Each Excel file contains **3 sheets**:

#### Sheet 1: Main Specification (e.g., "Living Room - Industrial")
- **200+ rows** of detailed specifications
- Format: CATEGORY | SUB-CATEGORY | SPECIFICATION | OPTIONS | NOTES | PRIORITY | QTY | INDIAN CONSIDERATIONS
- Contains style notes, design principles, detailed item specifications
- Example rows:
  ```
  CATEGORY: STYLE NOTES
  SUB-CATEGORY: Overall Mood
  SPECIFICATION: Raw, rugged, and urban aesthetic
  OPTIONS: Exposed materials, metal accents, reclaimed wood...
  ```

#### Sheet 2: Item Checklist (e.g., "Industrial Living Room - 3D Render Item Checklist")
- **40-60 rows** of items for render extraction
- Format: CATEGORY | ITEM | INCLUDE? | PRIORITY | NOTES
- Example rows:
  ```
  CATEGORY: SOFA / PRIMARY SEATING
  ITEM: Track arm leather sofa
  INCLUDE?: YES
  PRIORITY: SIGNATURE
  NOTES: Cognac or charcoal leather, metal legs
  ```
- **This is the key sheet for pricing items!**

#### Sheet 3: Shutter Finish Summary (e.g., "Industrial Living Room - 40 Shutter/Finish Combinations")
- **40-50 rows** of finish options
- Format: # | FINISH COMBINATION | TV UNIT | BOOKSHELF | PRICE | RATING | STYLE DESCRIPTION
- Example rows:
  ```
  #: 1
  FINISH: Reclaimed Oak Natural
  TV UNIT: Weathered oak top, black pipe base, metal mesh doors
  BOOKSHELF: Black pipe frame, natural oak shelves
  PRICE: Mid
  RATING: ★★★★★
  ```

---

## 📊 CURRENT STATUS CHECK

### What Was Previously Sent to Lovable?

**From earlier import (925 items in pricing_items):**
- Source: `Budgets-6_cities.zip` (26 Excel files)
- Format: Unknown (need to verify)
- Status: Imported successfully

**From recent upload (169 style-specific Excel files):**
- ❓ **UNKNOWN**: Were these actually imported?
- ❓ **UNKNOWN**: Which sheet was parsed (Main spec, Checklist, or Finishes)?
- ❓ **UNKNOWN**: Are all 169 files × 3 sheets = 507 sheets processed?

---

## 🚨 QUESTIONS TO VERIFY

### Question 1: Did we import the 169 style-specific Excel files?
**Check:** Query pricing_items table for Industrial/Modern Indian/Art Deco style tags

```sql
-- Check if style-specific items exist
SELECT 
  COUNT(*) as total_items,
  COUNT(CASE WHEN style_tags && ARRAY['industrial'] THEN 1 END) as industrial_items,
  COUNT(CASE WHEN style_tags && ARRAY['modern_indian'] THEN 1 END) as modern_indian_items,
  COUNT(CASE WHEN style_tags && ARRAY['art_deco'] THEN 1 END) as art_deco_items
FROM pricing_items;

-- Expected if NOT imported:
-- total_items: 925 (from previous import)
-- industrial_items: ~19 (from manual SQL insert)
-- modern_indian_items: 0
-- art_deco_items: 0

-- Expected if IMPORTED:
-- total_items: 3,700+ (925 + 2,775 new items)
-- industrial_items: 200+
-- modern_indian_items: 200+
-- art_deco_items: 200+
```

### Question 2: Which sheet was parsed?
**If Sheet 1 (Main Specification):**
- ❌ BAD: This is NOT pricing data, it's design guidelines
- Would have imported rows like "Style Notes", "Key Principles", etc.
- **NOT USABLE** for pricing calculations

**If Sheet 2 (Item Checklist):**
- ✅ GOOD: This has actual items with priorities
- But needs further processing to extract pricing
- Format: Item names without prices (e.g., "Track arm leather sofa")

**If Sheet 3 (Shutter Finish Summary):**
- ⚠️ PARTIAL: Has finish combinations with "Budget/Mid/Premium" tiers
- Good for finish pricing, but not individual items

### Question 3: Do we have pricing data or just item names?
**Item Checklist (Sheet 2) has NO PRICES:**
```
Track arm leather sofa | YES | SIGNATURE | Cognac or charcoal leather
Industrial coffee table | YES | SIGNATURE | Factory cart, reclaimed wood + metal
Leather club chair | YES | Essential | Distressed leather, aged look
```

**We need to:**
1. Extract item names from Sheet 2
2. Match to our existing pricing database (925 items)
3. Add new items with tier-based pricing (Budget/Mid/Premium)

---

## 🛠️ CORRECTED IMPORT STRATEGY

### Step 1: Parse All 3 Sheets from Each Excel File

```typescript
import XLSX from 'xlsx';

function parseStylePricingExcel(filePath: string) {
  const workbook = XLSX.readFile(filePath);
  
  // Extract room and style from filename
  // e.g., "Living Room-Industrial.xlsx" → { room: "Living Room", style: "Industrial" }
  const fileName = path.basename(filePath, '.xlsx');
  const [room, style] = fileName.split('-').map(s => s.trim());
  
  const result = {
    room_type: room,
    design_style: style,
    specifications: [], // Sheet 1 data
    item_checklist: [], // Sheet 2 data (KEY FOR PRICING)
    finish_options: []  // Sheet 3 data
  };
  
  // Parse Sheet 2: Item Checklist (MOST IMPORTANT)
  const checklistSheet = workbook.Sheets[workbook.SheetNames[1]];
  const checklistData = XLSX.utils.sheet_to_json(checklistSheet, { header: 1 });
  
  for (let i = 2; i < checklistData.length; i++) { // Skip header rows
    const row = checklistData[i];
    const [category, item, include, priority, notes] = row;
    
    if (item && include === 'YES') {
      result.item_checklist.push({
        category,
        item_name: item,
        priority,
        notes,
        style_tags: [style.toLowerCase().replace(/\s+/g, '_'), room.toLowerCase().replace(/\s+/g, '_')]
      });
    }
  }
  
  // Parse Sheet 3: Finish Options
  const finishSheet = workbook.Sheets[workbook.SheetNames[2]];
  const finishData = XLSX.utils.sheet_to_json(finishSheet, { header: 1 });
  
  for (let i = 2; i < finishData.length; i++) {
    const row = finishData[i];
    if (row[0] && typeof row[0] === 'number') { // Row number exists
      const [num, finish, tvUnit, bookshelf, price, rating, description] = row;
      result.finish_options.push({
        finish_name: finish,
        price_tier: price, // Budget, Mid, Premium
        rating,
        description
      });
    }
  }
  
  return result;
}
```

### Step 2: Match Items to Pricing Tiers

```typescript
// Base pricing by category and tier
const BASE_PRICING = {
  'Furniture': {
    'Sofa': { budget: 35000, mid: 55000, premium: 85000 },
    'Chair': { budget: 12000, mid: 18000, premium: 28000 },
    'Coffee Table': { budget: 15000, mid: 25000, premium: 45000 },
    'Side Table': { budget: 6000, mid: 10000, premium: 18000 },
    'Bookshelf': { budget: 18000, mid: 30000, premium: 50000 },
    'TV Unit': { budget: 20000, mid: 35000, premium: 60000 }
  },
  'Lighting': {
    'Floor Lamp': { budget: 5000, mid: 8000, premium: 15000 },
    'Pendant Light': { budget: 3000, mid: 5000, premium: 10000 },
    'Table Lamp': { budget: 2000, mid: 4000, premium: 8000 }
  },
  'Decor': {
    'Rug': { budget: 8000, mid: 15000, premium: 30000 },
    'Wall Art': { budget: 3000, mid: 6000, premium: 15000 },
    'Throw Pillow': { budget: 500, mid: 1000, premium: 2000 }
  }
};

function assignPricing(item: any): PricingItem {
  // Detect category from item name
  const category = detectCategory(item.item_name);
  const subCategory = detectSubCategory(item.item_name);
  
  // Get base pricing
  const basePricing = BASE_PRICING[category]?.[subCategory] || {
    budget: 5000,
    mid: 10000,
    premium: 20000
  };
  
  // Apply style multipliers (Industrial might be 1.1x, Traditional 0.9x, etc.)
  const styleMultiplier = getStyleMultiplier(item.style_tags);
  
  return {
    item_name: `${item.style_tags[0]} ${item.item_name}`,
    item_category: category,
    base_price: Math.round(basePricing.mid * styleMultiplier),
    budget_price: Math.round(basePricing.budget * styleMultiplier),
    premium_price: Math.round(basePricing.premium * styleMultiplier),
    uom: 'unit',
    style_tags: item.style_tags,
    notes: item.notes,
    priority: item.priority
  };
}
```

### Step 3: Generate SQL INSERT Statements

```sql
-- Example output for Industrial Living Room items

INSERT INTO pricing_items (
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
  is_active
) VALUES
-- From Industrial Living Room Item Checklist
('Industrial Track Arm Leather Sofa', 'Furniture', 60000, 'unit', 
  ARRAY['industrial', 'living_room', 'sofa'], 
  1.0, 0.95, 1.1, 0.9, 1.15, 1.0,
  'Cognac or charcoal leather, metal legs, signature piece', 
  'SIGNATURE', true),

('Industrial Leather Club Chair', 'Furniture', 20000, 'unit',
  ARRAY['industrial', 'living_room', 'chair'],
  1.0, 0.95, 1.1, 0.9, 1.15, 1.0,
  'Distressed leather, aged look, essential piece',
  'Essential', true),

('Industrial Coffee Table', 'Furniture', 28000, 'unit',
  ARRAY['industrial', 'living_room', 'table'],
  1.0, 0.95, 1.1, 0.9, 1.15, 1.0,
  'Factory cart style, reclaimed wood + metal, signature piece',
  'SIGNATURE', true),

-- ... (40 items per room × 169 files = 6,760 items!)

ON CONFLICT (item_name) DO UPDATE SET
  base_price = EXCLUDED.base_price,
  style_tags = EXCLUDED.style_tags,
  notes = EXCLUDED.notes,
  priority = EXCLUDED.priority;
```

---

## 📊 EXPECTED FINAL DATABASE SIZE

### Current Status:
- pricing_items: **925 items**
- item_synonyms: **257-279 synonyms**

### After Full Import (169 files × avg 40 items per checklist):
- pricing_items: **~7,685 items** (925 + 6,760 new)
- item_synonyms: **~1,500 synonyms** (need to add for each style-specific item)

### Breakdown by Style:
| Style | Files | Avg Items/File | Total Items |
|-------|-------|----------------|-------------|
| Industrial | 14 | 40 | 560 |
| Modern Indian | 10 | 40 | 400 |
| Art Deco | 14 | 40 | 560 |
| Mid Century Modern | 14 | 40 | 560 |
| Scandinavian | 14 | 40 | 560 |
| Contemporary | 14 | 40 | 560 |
| Minimalist | 14 | 40 | 560 |
| Traditional Indian | 14 | 40 | 560 |
| Bohemian | 14 | 40 | 560 |
| Farmhouse | 14 | 40 | 560 |
| Indian Coastal | 14 | 40 | 560 |
| Japandi | 14 | 40 | 560 |
| Transitional | 15 | 40 | 600 |
| **TOTAL** | **169** | **40** | **~6,760** |

---

## ✅ ACTION ITEMS

### Immediate (Next 30 minutes):
1. ✅ Verify current pricing_items count in Lovable's database
2. ✅ Check if style_tags contain 'industrial', 'modern_indian', 'art_deco'
3. ✅ Determine which data was actually imported (if any)

### Short-term (Next 2 hours):
4. ⬜ Create proper Excel parser for all 3 sheets
5. ⬜ Extract Item Checklist (Sheet 2) from all 169 files
6. ⬜ Generate tier-based pricing (Budget/Mid/Premium)
7. ⬜ Create SQL INSERT with ON CONFLICT for ~6,760 items

### Medium-term (Next day):
8. ⬜ Add synonyms for each style-specific item (~1,500 synonyms)
9. ⬜ Test match rate improvement (33% → 90%+)
10. ⬜ Validate pricing accuracy (<5% variance)

---

## 🎯 CORRECTED WORKFLOW

```
1. Parse 169 Excel files
    ↓
2. Extract Sheet 2 (Item Checklist) from each
    ↓
3. For each item:
    - Detect category (Furniture, Lighting, Decor, etc.)
    - Assign tier pricing (Budget/Mid/Premium)
    - Apply style multipliers
    - Add city multipliers
    ↓
4. Generate SQL INSERT for ~6,760 items
    ↓
5. Add synonyms for AI matching
    ↓
6. Import to pricing_items table
    ↓
7. Test extraction: 33% → 90%+ match rate
```

---

## 🚨 CRITICAL QUESTION FOR LOVABLE

**Please verify in Supabase SQL Editor:**

```sql
-- Check current pricing_items count
SELECT COUNT(*) FROM pricing_items;

-- Check for style-specific items
SELECT 
  COUNT(*) as total,
  COUNT(CASE WHEN style_tags && ARRAY['industrial'] THEN 1 END) as industrial,
  COUNT(CASE WHEN style_tags && ARRAY['modern_indian'] THEN 1 END) as modern_indian,
  COUNT(CASE WHEN style_tags && ARRAY['art_deco'] THEN 1 END) as art_deco
FROM pricing_items;

-- Sample 10 items with style tags
SELECT item_name, style_tags, base_price 
FROM pricing_items 
WHERE style_tags IS NOT NULL 
LIMIT 10;
```

**Expected results:**
- If count = 925: Only previous import, need to import 169 files
- If count = 3,700+: Already imported, but need to verify which sheets
- If industrial/modern_indian/art_deco = 0: Style-specific data NOT imported

---

**Repository:** https://github.com/abhi47811/houspire-project-hub  
**Status:** ⚠️ VERIFICATION NEEDED  
**Next Step:** Confirm current database state with Lovable team
