# 🚀 CITYWISE DATA IMPORT - QUICK GUIDE

**Status:** Schema ✅ Created | Data: 498/3,742 entries imported  
**Repository:** https://github.com/abhi47811/houspire-project-hub  
**Date:** 2026-01-01  

---

## ✅ COMPLETED

### 1. Schema Created
- ✅ `city_pricing` table
- ✅ `city_multipliers` table
- ✅ `material_reference` table
- ✅ `brand_reference` table
- ✅ `size_guide_reference` table
- ✅ `get_city_price()` helper function
- ✅ RLS policies for all tables

### 2. Initial Data Imported
- ✅ 498 city-specific prices
- ✅ 84 category multipliers
- ✅ 56 citywise synonyms
- ✅ 1,774 total pricing items
- ✅ 573 total synonyms

---

## 📦 REMAINING IMPORT

### Total Data Available
- **Total SQL Lines:** 69,904 lines
- **Total Inserts:** 3,742 statements
- **Already Imported:** ~498 entries (13%)
- **Remaining:** ~3,244 entries (87%)

### Batch Files Ready
**Location:** `/home/user/webapp/CITYWISE_DATA/batches/`

| Batch | File | Size | Approx Inserts |
|-------|------|------|----------------|
| 1 | batch_01.sql | 114 KB | ~270 |
| 2 | batch_02.sql | 114 KB | ~270 |
| 3 | batch_03.sql | 117 KB | ~280 |
| 4 | batch_04.sql | 119 KB | ~285 |
| 5 | batch_05.sql | 115 KB | ~275 |
| 6 | batch_06.sql | 112 KB | ~270 |
| 7 | batch_07.sql | 116 KB | ~275 |
| 8 | batch_08.sql | 122 KB | ~290 |
| 9 | batch_09.sql | 114 KB | ~270 |
| 10 | batch_10.sql | 112 KB | ~270 |
| 11 | batch_11.sql | 110 KB | ~265 |
| 12 | batch_12.sql | 112 KB | ~270 |
| 13 | batch_13.sql | 110 KB | ~265 |
| 14 | batch_14.sql | 105 KB | ~250 |
| **TOTAL** | **14 batches** | **~1.58 MB** | **~3,744** |

---

## 🔧 IMPORT INSTRUCTIONS

### Option 1: Manual Import (Supabase SQL Editor)

**Recommended approach for maximum control:**

1. Open Supabase SQL Editor
2. Copy contents of `batch_01.sql` and paste
3. Click "Run" and wait for completion
4. Repeat for batches 02 through 14

**Estimated Time:** 2-3 minutes per batch = ~30-45 minutes total

---

### Option 2: Automated Import (If you have psql access)

```bash
# If you have direct database access
cd /home/user/webapp/CITYWISE_DATA/batches

# Import all batches sequentially
for i in {01..14}; do
  echo "Importing batch_$i.sql..."
  psql -h YOUR_HOST -U postgres -d postgres -f "batch_$i.sql"
  echo "✅ Batch $i complete"
done
```

---

### Option 3: Using Supabase CLI (If installed)

```bash
cd /home/user/webapp/CITYWISE_DATA/batches

# Import each batch
for file in batch_*.sql; do
  echo "Importing $file..."
  supabase db execute < "$file"
  echo "✅ $file imported"
done
```

---

## 📊 VERIFICATION QUERIES

### Check Progress During Import

```sql
-- Count city pricing entries
SELECT COUNT(*) FROM city_pricing;
-- Target: 3,132

-- Count by city
SELECT city, COUNT(*) as items 
FROM city_pricing 
GROUP BY city 
ORDER BY items DESC;

-- Count pricing items by source
SELECT source, COUNT(*) as count
FROM pricing_items
WHERE source = 'citywise_excel_2025'
GROUP BY source;
-- Target: 522

-- Total pricing items
SELECT COUNT(*) FROM pricing_items;
-- Target: 3,245 (1,774 current + 522 citywise + existing)
```

### Test City Pricing Function

```sql
-- Test for specific items
SELECT get_city_price('Hettich Push to Open', 'handles', 'Mumbai');     -- Should return ₹890
SELECT get_city_price('Hettich Push to Open', 'handles', 'Hyderabad');  -- Should return ₹785

-- Test fallback logic
SELECT 
  item_name,
  get_city_price(item_name, category, 'Mumbai') as mumbai_price,
  get_city_price(item_name, category, 'Delhi') as delhi_price,
  get_city_price(item_name, category, 'Hyderabad') as hyderabad_price
FROM pricing_items
WHERE category = 'handles'
LIMIT 10;
```

### Check Data Quality

```sql
-- Check for missing city rates
SELECT 
  pi.item_name,
  pi.category,
  COUNT(DISTINCT cp.city) as cities_covered
FROM pricing_items pi
LEFT JOIN city_pricing cp ON pi.item_name = cp.item_name AND pi.category = cp.item_category
WHERE pi.source = 'citywise_excel_2025'
GROUP BY pi.item_name, pi.category
HAVING COUNT(DISTINCT cp.city) < 6;

-- Check multiplier coverage
SELECT category, COUNT(*) as cities
FROM city_multipliers
GROUP BY category
ORDER BY cities DESC;
```

---

## 📈 EXPECTED RESULTS AFTER FULL IMPORT

| Metric | Current | After Full Import | Target |
|--------|---------|-------------------|--------|
| **Pricing Items** | 1,774 | 3,245 | ✅ |
| **City Pricing Entries** | 498 | 3,132 | ✅ |
| **City Multipliers** | 84 | 84 | ✅ |
| **Cities Covered** | 6 | 6 | ✅ |
| **Categories** | ~20 | 27 | ✅ |
| **Synonyms** | 573 | 800+ | ⏳ Need generation |

---

## 🎯 POST-IMPORT ACTIONS

### 1. Verify Data Integrity
```sql
-- Should return 3,132
SELECT COUNT(*) FROM city_pricing;

-- Should return 522
SELECT COUNT(*) FROM pricing_items WHERE source = 'citywise_excel_2025';

-- Should return 84
SELECT COUNT(*) FROM city_multipliers;

-- Should show 6 cities with ~522 items each
SELECT city, COUNT(*) 
FROM city_pricing 
GROUP BY city;
```

### 2. Generate Additional Synonyms
You mentioned you already have 573 synonyms. Consider generating more for:
- Common item variations (e.g., "couch" → "sofa")
- City-specific terms (e.g., "Mumbai handles" → "handles")
- Brand-specific terms (e.g., "Hettich basket" → "basket")

**Target:** 800-1,000 synonyms for 90%+ match rate

### 3. Test Budget Extraction
Re-run the living room render test:
```sql
-- Check current match rate
SELECT 
  COUNT(*) FILTER (WHERE status = 'matched') as matched,
  COUNT(*) FILTER (WHERE status = 'pending') as unmatched,
  COUNT(*) as total,
  ROUND(COUNT(*) FILTER (WHERE status = 'matched')::numeric / COUNT(*) * 100, 1) as match_rate
FROM budget_items
WHERE render_id = '8800edf0-4131-4f17-a987-caacf773a923';
```

**Expected Improvement:**
- Current: 33% match rate (9/27 items)
- Target: 85-95% match rate (23-26/27 items)

### 4. Update Calculators
Update wardrobe and kitchen calculators to use `get_city_price()`:

```typescript
// Example: In wardrobe calculator
const handlePrice = await supabase.rpc('get_city_price', {
  p_item_name: 'Hettich Soft Close Hinge',
  p_category: 'hardware',
  p_city: project.city || 'Hyderabad'
});
```

---

## 🔍 TROUBLESHOOTING

### Issue: Import Fails with Unique Constraint Error
**Solution:** Data might be partially imported. Check existing data:
```sql
SELECT item_name, category, city 
FROM city_pricing 
WHERE item_name = 'ITEM_NAME_FROM_ERROR'
ORDER BY created_at DESC;
```

### Issue: get_city_price() Returns NULL
**Possible Causes:**
1. Item not in `pricing_items` table
2. City multiplier not defined
3. Item name/category mismatch

**Debug:**
```sql
-- Check if item exists
SELECT * FROM pricing_items WHERE item_name = 'YOUR_ITEM';

-- Check city rate
SELECT * FROM city_pricing WHERE item_name = 'YOUR_ITEM' AND city = 'Mumbai';

-- Check multiplier
SELECT * FROM city_multipliers WHERE city = 'Mumbai' AND category = 'YOUR_CATEGORY';
```

### Issue: Batch Import Takes Too Long
**Solution:** Import during off-peak hours or reduce batch size further:
```bash
# Split batch files into smaller chunks
split -l 1000 batch_01.sql batch_01_part_
```

---

## 📞 SUPPORT

- **Repository:** https://github.com/abhi47811/houspire-project-hub
- **Documentation:** 
  - COMPLETE_SYSTEM_STATUS.md
  - CITYWISE_PRICING_COMPLETE.md
  - CITYWISE_EXTRACTION_EXECUTIVE_SUMMARY.md

---

## ✅ IMPORT CHECKLIST

- [x] Schema created (5 tables)
- [x] Helper function created
- [x] RLS policies enabled
- [x] Initial data imported (498 entries)
- [ ] **Batch 01-14 imported (3,244 entries remaining)** ⏳
- [ ] Verification queries run
- [ ] City pricing tested
- [ ] Additional synonyms generated
- [ ] Calculators updated
- [ ] Budget extraction re-tested

---

## 🎯 CURRENT STATUS

**Phase 1: Schema Setup** ✅ COMPLETE  
**Phase 2: Initial Import** ✅ COMPLETE (498/3,742 = 13%)  
**Phase 3: Batch Import** ⏳ IN PROGRESS (14 batches ready)  
**Phase 4: Verification** ⏳ PENDING  
**Phase 5: Integration** ⏳ PENDING  

---

**Next Action:** Import batch_01.sql through batch_14.sql in Supabase SQL Editor

**Estimated Time:** 30-45 minutes for all 14 batches

**Expected Outcome:** 3,132 city pricing entries + 522 new pricing items = Complete citywise pricing database!

---

*Guide Created: 2026-01-01*  
*Status: Ready for batch import*
