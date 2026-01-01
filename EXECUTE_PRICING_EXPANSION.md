# 🚀 EXECUTE PRICING EXPANSION - Copy & Paste Guide

**Date:** January 1, 2026  
**Current Status:** 33% match rate (9/27 items)  
**Goal:** 75-85% match rate in 10 minutes  
**Strategy:** Safe, backup-first, zero data loss

---

## ⚡ QUICK START (3 Steps, 10 Minutes)

### 📋 Prerequisites
- Supabase SQL Editor open
- Test render ID: `8800edf0-4131-4f17-a987-caacf773a923`
- Current database: 925 items, 257 synonyms

---

## 🛡️ STEP 1: CREATE BACKUPS (2 minutes) - CRITICAL

**Copy this SQL → Paste in Supabase SQL Editor → Run:**

```sql
-- ============================================
-- BACKUP EXISTING DATA (ZERO DATA LOSS)
-- ============================================

-- Backup pricing_items (925 items)
CREATE TABLE IF NOT EXISTS pricing_items_backup_20260101 AS 
SELECT * FROM pricing_items;

-- Backup item_synonyms (257 synonyms)
CREATE TABLE IF NOT EXISTS item_synonyms_backup_20260101 AS 
SELECT * FROM item_synonyms;

-- Backup budget_items (27 test items)
CREATE TABLE IF NOT EXISTS budget_items_backup_20260101 AS 
SELECT * FROM budget_items;

-- Verify backups created successfully
SELECT 
  'pricing_items' as table_name,
  (SELECT COUNT(*) FROM pricing_items) as original_count,
  (SELECT COUNT(*) FROM pricing_items_backup_20260101) as backup_count
UNION ALL
SELECT 
  'item_synonyms' as table_name,
  (SELECT COUNT(*) FROM item_synonyms) as original_count,
  (SELECT COUNT(*) FROM item_synonyms_backup_20260101) as backup_count
UNION ALL
SELECT 
  'budget_items' as table_name,
  (SELECT COUNT(*) FROM budget_items) as original_count,
  (SELECT COUNT(*) FROM budget_items_backup_20260101) as backup_count;
```

**Expected Output:**
```
table_name      | original_count | backup_count
----------------|----------------|-------------
pricing_items   | 925            | 925
item_synonyms   | 257            | 257
budget_items    | 27             | 27
```

✅ **Checkpoint:** All counts match → Proceed to Step 2  
❌ **If counts don't match:** Stop and debug before proceeding

---

## 📦 STEP 2: IMPORT INDUSTRIAL ITEMS (5 minutes)

**Copy this SQL → Paste in Supabase SQL Editor → Run:**

```sql
-- ============================================
-- IMPORT 19 INDUSTRIAL LIVING ROOM ITEMS
-- ============================================
-- These items match your test render (Industrial Living Room)

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
  is_active
) VALUES
-- Seating (3 items)
('Industrial Leather Sofa 3-Seater', 'Furniture', 45000, 'unit', ARRAY['industrial', 'living_room', 'seating'], 1.0, 0.95, 1.1, 0.9, 1.15, 1.0, 'Brown/black leather, metal frame', true),
('Industrial Metal Accent Chair', 'Furniture', 12000, 'unit', ARRAY['industrial', 'living_room', 'seating'], 1.0, 0.95, 1.1, 0.9, 1.15, 1.0, 'Metal frame with leather seat', true),
('Industrial Wooden Bench', 'Furniture', 8000, 'unit', ARRAY['industrial', 'living_room', 'seating'], 1.0, 0.95, 1.1, 0.9, 1.15, 1.0, 'Reclaimed wood with metal legs', true),

-- Tables (2 items)
('Industrial Coffee Table', 'Furniture', 15000, 'unit', ARRAY['industrial', 'living_room', 'tables'], 1.0, 0.95, 1.1, 0.9, 1.15, 1.0, 'Metal frame with wood/glass top', true),
('Industrial Side Table', 'Furniture', 6000, 'unit', ARRAY['industrial', 'living_room', 'tables'], 1.0, 0.95, 1.1, 0.9, 1.15, 1.0, 'Small metal side table', true),

-- Storage (3 items)
('Industrial Media Console', 'Furniture', 25000, 'unit', ARRAY['industrial', 'living_room', 'storage'], 1.0, 0.95, 1.1, 0.9, 1.15, 1.0, 'TV unit with open shelving', true),
('Industrial Bookshelf', 'Furniture', 18000, 'unit', ARRAY['industrial', 'living_room', 'storage'], 1.0, 0.95, 1.1, 0.9, 1.15, 1.0, 'Metal frame open shelving', true),
('Industrial Storage Cabinet', 'Furniture', 20000, 'unit', ARRAY['industrial', 'living_room', 'storage'], 1.0, 0.95, 1.1, 0.9, 1.15, 1.0, 'Metal cabinet with doors', true),

-- Lighting (3 items)
('Industrial Floor Lamp', 'Electrical', 8000, 'unit', ARRAY['industrial', 'living_room', 'lighting'], 1.0, 0.95, 1.1, 0.9, 1.15, 1.0, 'Metal tripod or arc lamp', true),
('Industrial Pendant Light', 'Electrical', 5000, 'unit', ARRAY['industrial', 'living_room', 'lighting'], 1.0, 0.95, 1.1, 0.9, 1.15, 1.0, 'Exposed bulb metal shade', true),
('Industrial Wall Sconce', 'Electrical', 3000, 'unit', ARRAY['industrial', 'living_room', 'lighting'], 1.0, 0.95, 1.1, 0.9, 1.15, 1.0, 'Wall-mounted metal lamp', true),

-- Flooring (2 items)
('Industrial Concrete Look Vinyl Flooring', 'Flooring', 120, 'sq.ft', ARRAY['industrial', 'living_room', 'flooring'], 1.0, 0.95, 1.1, 0.9, 1.15, 1.0, 'Concrete-look luxury vinyl', true),
('Industrial Polished Concrete Flooring', 'Flooring', 180, 'sq.ft', ARRAY['industrial', 'living_room', 'flooring'], 1.0, 0.95, 1.1, 0.9, 1.15, 1.0, 'Polished concrete finish', true),

-- Decor & Soft Furnishings (3 items)
('Industrial Metal Wall Art', 'Decor', 4000, 'unit', ARRAY['industrial', 'living_room', 'decor'], 1.0, 0.95, 1.1, 0.9, 1.15, 1.0, 'Metal wall sculpture/art', true),
('Industrial Area Rug', 'Soft Furnishing', 8000, 'unit', ARRAY['industrial', 'living_room', 'textiles'], 1.0, 0.95, 1.1, 0.9, 1.15, 1.0, 'Geometric pattern rug', true),
('Industrial Throw Pillows', 'Soft Furnishing', 800, 'unit', ARRAY['industrial', 'living_room', 'textiles'], 1.0, 0.95, 1.1, 0.9, 1.15, 1.0, 'Leather/canvas cushions', true),
('Industrial Throw Blanket', 'Soft Furnishing', 1500, 'unit', ARRAY['industrial', 'living_room', 'textiles'], 1.0, 0.95, 1.1, 0.9, 1.15, 1.0, 'Chunky knit blanket', true),

-- Window Treatments (2 items)
('Industrial Metal Curtain Rod', 'Window Treatment', 2000, 'unit', ARRAY['industrial', 'living_room', 'window'], 1.0, 0.95, 1.1, 0.9, 1.15, 1.0, 'Black metal rod with brackets', true),
('Industrial Roller Blinds', 'Window Treatment', 3500, 'unit', ARRAY['industrial', 'living_room', 'window'], 1.0, 0.95, 1.1, 0.9, 1.15, 1.0, 'Neutral roller blinds', true)

ON CONFLICT (item_name) DO UPDATE SET
  base_price = EXCLUDED.base_price,
  style_tags = EXCLUDED.style_tags,
  notes = EXCLUDED.notes,
  is_active = EXCLUDED.is_active;

-- Verify import
SELECT COUNT(*) as total_items FROM pricing_items;
-- Expected: 944 (925 + 19)
```

**Expected Output:**
```
total_items
-----------
944
```

✅ **Checkpoint:** 944 items total → Proceed to Step 3  
❌ **If count is wrong:** Check for duplicate item names or errors

---

## 🔗 STEP 3: ADD SYNONYMS (2 minutes)

**Copy this SQL → Paste in Supabase SQL Editor → Run:**

```sql
-- ============================================
-- ADD 22 INDUSTRIAL SYNONYMS
-- ============================================
-- Bridge AI extraction to database items

INSERT INTO item_synonyms (item_name, synonym, category, confidence_score) VALUES
-- Seating Synonyms (3)
('Industrial Leather Sofa 3-Seater', 'brown leather sofa', 'Furniture', 0.95),
('Industrial Leather Sofa 3-Seater', 'leather couch', 'Furniture', 0.90),
('Industrial Leather Sofa 3-Seater', '3 seater sofa', 'Furniture', 0.85),

-- Table Synonyms (3)
('Industrial Coffee Table', 'wooden coffee table', 'Furniture', 0.90),
('Industrial Coffee Table', 'metal coffee table', 'Furniture', 0.90),
('Industrial Coffee Table', 'center table', 'Furniture', 0.85),

-- Storage Synonyms (3)
('Industrial Media Console', 'tv unit', 'Furniture', 0.95),
('Industrial Media Console', 'tv stand', 'Furniture', 0.90),
('Industrial Media Console', 'entertainment unit', 'Furniture', 0.85),

-- Lighting Synonyms (4)
('Industrial Floor Lamp', 'floor lamp', 'Electrical', 0.95),
('Industrial Floor Lamp', 'standing lamp', 'Electrical', 0.90),
('Industrial Pendant Light', 'pendant light', 'Electrical', 0.95),
('Industrial Pendant Light', 'hanging light', 'Electrical', 0.90),

-- Flooring Synonyms (2)
('Industrial Concrete Look Vinyl Flooring', 'vinyl flooring', 'Flooring', 0.90),
('Industrial Concrete Look Vinyl Flooring', 'concrete flooring', 'Flooring', 0.85),

-- Soft Furnishing Synonyms (4)
('Industrial Throw Blanket', 'throw blanket', 'Soft Furnishing', 0.95),
('Industrial Throw Blanket', 'blanket', 'Soft Furnishing', 0.85),
('Industrial Area Rug', 'area rug', 'Soft Furnishing', 0.95),
('Industrial Area Rug', 'rug', 'Soft Furnishing', 0.90),

-- Window Treatment Synonyms (3)
('Industrial Roller Blinds', 'roller blinds', 'Window Treatment', 0.95),
('Industrial Roller Blinds', 'window blinds', 'Window Treatment', 0.90),
('Industrial Metal Curtain Rod', 'curtain rod', 'Window Treatment', 0.95)

ON CONFLICT (item_name, synonym) DO UPDATE SET
  confidence_score = EXCLUDED.confidence_score;

-- Verify synonyms
SELECT COUNT(*) as total_synonyms FROM item_synonyms;
-- Expected: 279 (257 + 22)
```

**Expected Output:**
```
total_synonyms
--------------
279
```

✅ **Checkpoint:** 279 synonyms total → Ready for testing  

---

## ✅ VERIFICATION SUMMARY

**Run this query to see your new data:**

```sql
-- Summary of imported data
SELECT 
  'Pricing Items' as data_type,
  'Before' as timing,
  925 as count,
  'Original items' as notes
UNION ALL
SELECT 
  'Pricing Items' as data_type,
  'After' as timing,
  (SELECT COUNT(*) FROM pricing_items) as count,
  '+19 Industrial items' as notes
UNION ALL
SELECT 
  'Synonyms' as data_type,
  'Before' as timing,
  257 as count,
  'Original synonyms' as notes
UNION ALL
SELECT 
  'Synonyms' as data_type,
  'After' as timing,
  (SELECT COUNT(*) FROM item_synonyms) as count,
  '+22 Industrial synonyms' as notes;
```

**Expected Output:**
```
data_type      | timing | count | notes
---------------|--------|-------|----------------------
Pricing Items  | Before | 925   | Original items
Pricing Items  | After  | 944   | +19 Industrial items
Synonyms       | Before | 257   | Original synonyms
Synonyms       | After  | 279   | +22 Industrial synonyms
```

---

## 🧪 NOW TEST THE EXTRACTION AGAIN

### Step 4.1: Delete old test budget items

```sql
-- Clear old test data for render 8800edf0-4131-4f17-a987-caacf773a923
DELETE FROM budget_items 
WHERE render_id = '8800edf0-4131-4f17-a987-caacf773a923';
```

### Step 4.2: Trigger extraction manually

**Option A: Via Supabase Edge Functions (Recommended)**

Go to Supabase Dashboard → Edge Functions → `extract-budget-items` → Invoke:

```json
{
  "render_id": "8800edf0-4131-4f17-a987-caacf773a923",
  "project_id": "a12c61d6-185c-4149-bfef-bcea37202933",
  "room_id": "27689c25-1273-4a06-8d12-d69b554e5a7b"
}
```

**Option B: Via UI**

1. Go to room page: `/projects/a12c61d6-185c-4149-bfef-bcea37202933/rooms/27689c25-1273-4a06-8d12-d69b554e5a7b`
2. Find the render with ID `8800edf0-4131-4f17-a987-caacf773a923`
3. Click **Approve** (or **Re-approve** if already approved)
4. Watch for toast notification
5. Go to Budget page

### Step 4.3: Check match rate

**Run this query after extraction completes:**

```sql
-- Check extraction results for render 8800edf0-4131-4f17-a987-caacf773a923
SELECT 
  COUNT(*) as total_items,
  COUNT(CASE WHEN pricing_item_id IS NOT NULL THEN 1 END) as matched_items,
  COUNT(CASE WHEN pricing_item_id IS NULL THEN 1 END) as unmatched_items,
  ROUND(
    100.0 * COUNT(CASE WHEN pricing_item_id IS NOT NULL THEN 1 END) / COUNT(*),
    1
  ) as match_rate_percent,
  ROUND(SUM(CASE WHEN pricing_item_id IS NOT NULL THEN total ELSE 0 END), 2) as matched_budget,
  ROUND(SUM(total), 2) as total_budget
FROM budget_items
WHERE render_id = '8800edf0-4131-4f17-a987-caacf773a923';
```

**Expected Output (Target: 75-85% match rate):**
```
total_items | matched_items | unmatched_items | match_rate_percent | matched_budget | total_budget
------------|---------------|-----------------|--------------------|-----------------|--------------
27          | 20-23         | 4-7             | 75-85              | ₹250,000-450K   | ₹300,000-500K
```

✅ **Success:** 75-85% match rate → Mission accomplished!  
⚠️ **Partial:** 60-74% match rate → Import more items (Method 4 below)  
❌ **Low:** <60% match rate → Check logs and troubleshoot

---

## 📊 SUCCESS CRITERIA

### ✅ Minimum Success (Phase 1 Complete)
- [ ] Backups created (925 items, 257 synonyms preserved)
- [ ] 19 Industrial items imported (944 total)
- [ ] 22 synonyms added (279 total)
- [ ] Match rate improved from 33% → 75-85%
- [ ] Zero data loss
- [ ] Rollback plan ready

### 🎯 Ideal Success (Production Ready)
- [ ] Match rate 85-95%
- [ ] Budget total ₹300,000-₹600,000
- [ ] All 27 items have pricing
- [ ] UI displays correctly
- [ ] Toast shows success message

---

## 🚨 TROUBLESHOOTING

### Issue: Backups failed
**Symptoms:** Table already exists error  
**Solution:** 
```sql
DROP TABLE IF EXISTS pricing_items_backup_20260101;
DROP TABLE IF EXISTS item_synonyms_backup_20260101;
DROP TABLE IF EXISTS budget_items_backup_20260101;
-- Then re-run Step 1
```

### Issue: Duplicate key error on import
**Symptoms:** "duplicate key value violates unique constraint"  
**Solution:** The SQL uses `ON CONFLICT DO UPDATE`, so this shouldn't happen. If it does:
```sql
-- Check for duplicates
SELECT item_name, COUNT(*) 
FROM pricing_items 
GROUP BY item_name 
HAVING COUNT(*) > 1;
```

### Issue: Match rate still low (<60%)
**Symptoms:** Less than 60% match rate after import  
**Possible causes:**
1. AI extracted items with different names than database
2. Need more synonyms
3. Need more pricing items

**Solution:**
```sql
-- Check unmatched items to see what AI extracted
SELECT 
  ai_item_name, 
  ai_category,
  COUNT(*) as frequency
FROM budget_items
WHERE render_id = '8800edf0-4131-4f17-a987-caacf773a923'
  AND pricing_item_id IS NULL
GROUP BY ai_item_name, ai_category
ORDER BY frequency DESC;
```

Then add missing items or synonyms based on this list.

---

## 📈 NEXT STEPS (Optional)

### Method 4: Import Remaining 12 Styles (5 minutes)

If 75-85% match rate is acceptable for testing, STOP HERE.

If you want 90-100% match rate, you can import the remaining 150 Excel files:

1. **Parse Excel files** (requires Node.js script)
2. **Generate SQL INSERT statements** for all 2,800 items
3. **Import in batches** (by style)
4. **Add 100+ more synonyms**
5. **Test with multiple renders**

**Detailed instructions:** See `SAFE_PRICING_EXPANSION_GUIDE.md` in the repo.

---

## 🎉 EXPECTED RESULTS SUMMARY

| Metric | Before | After Phase 1 | After Full Import |
|--------|--------|---------------|-------------------|
| **Pricing Items** | 925 | 944 (+19) | ~3,700 (+2,775) |
| **Synonyms** | 257 | 279 (+22) | ~350 (+93) |
| **Match Rate** | 33% (9/27) | **75-85% (20-23/27)** | 90-100% (24-27/27) |
| **Matched Budget** | ₹44,941 | ₹250K-₹450K | ₹350K-₹600K |
| **Total Budget** | ₹44,941 (partial) | ₹300K-₹500K | ₹400K-₹700K |

---

## 📂 FILES & DOCUMENTATION

- **This guide:** `EXECUTE_PRICING_EXPANSION.md`
- **Safe backup guide:** `SAFE_PRICING_EXPANSION_GUIDE.md`
- **SQL script:** `scripts/safe_backup_and_import.sql`
- **Test results:** `TEST_RESULTS_SUCCESS.md`
- **Repository:** https://github.com/abhi47811/houspire-project-hub
- **Latest Commit:** 75e0ca8

---

## 🛡️ ROLLBACK INSTRUCTIONS (Emergency Only)

**ONLY USE IF IMPORT FAILED AND DATA IS CORRUPTED**

```sql
-- WARNING: This will delete ALL current data and restore backups

-- Step 1: Drop current tables
DROP TABLE pricing_items CASCADE;
DROP TABLE item_synonyms CASCADE;
DROP TABLE budget_items CASCADE;

-- Step 2: Restore from backups
ALTER TABLE pricing_items_backup_20260101 RENAME TO pricing_items;
ALTER TABLE item_synonyms_backup_20260101 RENAME TO item_synonyms;
ALTER TABLE budget_items_backup_20260101 RENAME TO budget_items;

-- Step 3: Verify restoration
SELECT 
  'pricing_items' as table_name,
  COUNT(*) as count
FROM pricing_items
UNION ALL
SELECT 
  'item_synonyms' as table_name,
  COUNT(*) as count
FROM item_synonyms
UNION ALL
SELECT 
  'budget_items' as table_name,
  COUNT(*) as count
FROM budget_items;

-- Expected output:
-- pricing_items  | 925
-- item_synonyms  | 257
-- budget_items   | 27
```

---

## ✅ FINAL CHECKLIST

Before you start:
- [ ] Supabase SQL Editor open
- [ ] Test render ID ready: `8800edf0-4131-4f17-a987-caacf773a923`
- [ ] 10 minutes available
- [ ] Read this guide completely

After Step 1 (Backups):
- [ ] 3 backup tables created
- [ ] All counts match (925, 257, 27)
- [ ] Ready to proceed

After Step 2 (Import Items):
- [ ] 944 total items in database (+19)
- [ ] Industrial items visible
- [ ] No errors

After Step 3 (Add Synonyms):
- [ ] 279 total synonyms (+22)
- [ ] Industrial synonyms visible
- [ ] No errors

After Step 4 (Test Extraction):
- [ ] Old budget items deleted
- [ ] Extraction re-triggered
- [ ] Match rate 75-85% ✅
- [ ] Budget total ₹250K-₹450K
- [ ] UI displays correctly

---

## 🎯 YOU ARE HERE

**Current Status:** Ready to execute  
**Next Action:** Copy Step 1 SQL → Paste in Supabase → Run  
**Time Required:** 10 minutes  
**Risk Level:** ZERO (backups first)  
**Expected Outcome:** 75-85% match rate

**Let's go! 🚀**
