-- ============================================
-- 🛡️ SAFE BACKUP & IMPORT SCRIPT
-- ============================================
-- Date: 2026-01-01
-- Purpose: Backup existing data before importing 169 Excel files
-- Expected: 925 → 3,700+ items (zero data loss)
-- ============================================

-- ============================================
-- PHASE 1: BACKUP EXISTING DATA (CRITICAL)
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

-- Verify backups created
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

-- Expected output:
-- pricing_items  | 925  | 925
-- item_synonyms  | 257  | 257
-- budget_items   | 27   | 27

-- ============================================
-- PHASE 2: SAMPLE INDUSTRIAL STYLE ITEMS
-- ============================================
-- Start with 19 critical items that match your test render
-- (Living Room - Industrial style)

-- Industrial Living Room Items
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
-- Seating
('Industrial Leather Sofa 3-Seater', 'Furniture', 45000, 'unit', ARRAY['industrial', 'living_room', 'seating'], 1.0, 0.95, 1.1, 0.9, 1.15, 1.0, 'Brown/black leather, metal frame', true),
('Industrial Metal Accent Chair', 'Furniture', 12000, 'unit', ARRAY['industrial', 'living_room', 'seating'], 1.0, 0.95, 1.1, 0.9, 1.15, 1.0, 'Metal frame with leather seat', true),
('Industrial Wooden Bench', 'Furniture', 8000, 'unit', ARRAY['industrial', 'living_room', 'seating'], 1.0, 0.95, 1.1, 0.9, 1.15, 1.0, 'Reclaimed wood with metal legs', true),

-- Tables
('Industrial Coffee Table', 'Furniture', 15000, 'unit', ARRAY['industrial', 'living_room', 'tables'], 1.0, 0.95, 1.1, 0.9, 1.15, 1.0, 'Metal frame with wood/glass top', true),
('Industrial Side Table', 'Furniture', 6000, 'unit', ARRAY['industrial', 'living_room', 'tables'], 1.0, 0.95, 1.1, 0.9, 1.15, 1.0, 'Small metal side table', true),

-- Storage
('Industrial Media Console', 'Furniture', 25000, 'unit', ARRAY['industrial', 'living_room', 'storage'], 1.0, 0.95, 1.1, 0.9, 1.15, 1.0, 'TV unit with open shelving', true),
('Industrial Bookshelf', 'Furniture', 18000, 'unit', ARRAY['industrial', 'living_room', 'storage'], 1.0, 0.95, 1.1, 0.9, 1.15, 1.0, 'Metal frame open shelving', true),
('Industrial Storage Cabinet', 'Furniture', 20000, 'unit', ARRAY['industrial', 'living_room', 'storage'], 1.0, 0.95, 1.1, 0.9, 1.15, 1.0, 'Metal cabinet with doors', true),

-- Lighting
('Industrial Floor Lamp', 'Electrical', 8000, 'unit', ARRAY['industrial', 'living_room', 'lighting'], 1.0, 0.95, 1.1, 0.9, 1.15, 1.0, 'Metal tripod or arc lamp', true),
('Industrial Pendant Light', 'Electrical', 5000, 'unit', ARRAY['industrial', 'living_room', 'lighting'], 1.0, 0.95, 1.1, 0.9, 1.15, 1.0, 'Exposed bulb metal shade', true),
('Industrial Wall Sconce', 'Electrical', 3000, 'unit', ARRAY['industrial', 'living_room', 'lighting'], 1.0, 0.95, 1.1, 0.9, 1.15, 1.0, 'Wall-mounted metal lamp', true),

-- Flooring
('Industrial Concrete Look Vinyl Flooring', 'Flooring', 120, 'sq.ft', ARRAY['industrial', 'living_room', 'flooring'], 1.0, 0.95, 1.1, 0.9, 1.15, 1.0, 'Concrete-look luxury vinyl', true),
('Industrial Polished Concrete Flooring', 'Flooring', 180, 'sq.ft', ARRAY['industrial', 'living_room', 'flooring'], 1.0, 0.95, 1.1, 0.9, 1.15, 1.0, 'Polished concrete finish', true),

-- Decor & Soft Furnishings
('Industrial Metal Wall Art', 'Decor', 4000, 'unit', ARRAY['industrial', 'living_room', 'decor'], 1.0, 0.95, 1.1, 0.9, 1.15, 1.0, 'Metal wall sculpture/art', true),
('Industrial Area Rug', 'Soft Furnishing', 8000, 'unit', ARRAY['industrial', 'living_room', 'textiles'], 1.0, 0.95, 1.1, 0.9, 1.15, 1.0, 'Geometric pattern rug', true),
('Industrial Throw Pillows', 'Soft Furnishing', 800, 'unit', ARRAY['industrial', 'living_room', 'textiles'], 1.0, 0.95, 1.1, 0.9, 1.15, 1.0, 'Leather/canvas cushions', true),
('Industrial Throw Blanket', 'Soft Furnishing', 1500, 'unit', ARRAY['industrial', 'living_room', 'textiles'], 1.0, 0.95, 1.1, 0.9, 1.15, 1.0, 'Chunky knit blanket', true),

-- Window Treatments
('Industrial Metal Curtain Rod', 'Window Treatment', 2000, 'unit', ARRAY['industrial', 'living_room', 'window'], 1.0, 0.95, 1.1, 0.9, 1.15, 1.0, 'Black metal rod with brackets', true),
('Industrial Roller Blinds', 'Window Treatment', 3500, 'unit', ARRAY['industrial', 'living_room', 'window'], 1.0, 0.95, 1.1, 0.9, 1.15, 1.0, 'Neutral roller blinds', true)

ON CONFLICT (item_name) DO UPDATE SET
  base_price = EXCLUDED.base_price,
  style_tags = EXCLUDED.style_tags,
  notes = EXCLUDED.notes,
  is_active = EXCLUDED.is_active;

-- Verify new items
SELECT COUNT(*) as total_items FROM pricing_items;
-- Expected: 925 + 19 = 944 items

-- ============================================
-- PHASE 3: ADD STYLE-SPECIFIC SYNONYMS
-- ============================================
-- These synonyms bridge AI extraction to database items

INSERT INTO item_synonyms (item_name, synonym, category, confidence_score) VALUES
-- Industrial Living Room Synonyms
('Industrial Leather Sofa 3-Seater', 'brown leather sofa', 'Furniture', 0.95),
('Industrial Leather Sofa 3-Seater', 'leather couch', 'Furniture', 0.90),
('Industrial Leather Sofa 3-Seater', '3 seater sofa', 'Furniture', 0.85),
('Industrial Coffee Table', 'wooden coffee table', 'Furniture', 0.90),
('Industrial Coffee Table', 'metal coffee table', 'Furniture', 0.90),
('Industrial Coffee Table', 'center table', 'Furniture', 0.85),
('Industrial Media Console', 'tv unit', 'Furniture', 0.95),
('Industrial Media Console', 'tv stand', 'Furniture', 0.90),
('Industrial Media Console', 'entertainment unit', 'Furniture', 0.85),
('Industrial Floor Lamp', 'floor lamp', 'Electrical', 0.95),
('Industrial Floor Lamp', 'standing lamp', 'Electrical', 0.90),
('Industrial Pendant Light', 'pendant light', 'Electrical', 0.95),
('Industrial Pendant Light', 'hanging light', 'Electrical', 0.90),
('Industrial Concrete Look Vinyl Flooring', 'vinyl flooring', 'Flooring', 0.90),
('Industrial Concrete Look Vinyl Flooring', 'concrete flooring', 'Flooring', 0.85),
('Industrial Throw Blanket', 'throw blanket', 'Soft Furnishing', 0.95),
('Industrial Throw Blanket', 'blanket', 'Soft Furnishing', 0.85),
('Industrial Area Rug', 'area rug', 'Soft Furnishing', 0.95),
('Industrial Area Rug', 'rug', 'Soft Furnishing', 0.90),
('Industrial Roller Blinds', 'roller blinds', 'Window Treatment', 0.95),
('Industrial Roller Blinds', 'window blinds', 'Window Treatment', 0.90),
('Industrial Metal Curtain Rod', 'curtain rod', 'Window Treatment', 0.95)

ON CONFLICT (item_name, synonym) DO UPDATE SET
  confidence_score = EXCLUDED.confidence_score;

-- Verify synonyms
SELECT COUNT(*) as total_synonyms FROM item_synonyms;
-- Expected: 257 + 22 = 279 synonyms

-- ============================================
-- PHASE 4: VERIFICATION CHECKPOINTS
-- ============================================

-- Checkpoint 1: Item counts
SELECT 
  'Before Import' as status,
  925 as expected_items,
  (SELECT COUNT(*) FROM pricing_items_backup_20260101) as actual_items
UNION ALL
SELECT 
  'After Import' as status,
  944 as expected_items,
  (SELECT COUNT(*) FROM pricing_items) as actual_items;

-- Checkpoint 2: Synonym counts
SELECT 
  'Before Import' as status,
  257 as expected_synonyms,
  (SELECT COUNT(*) FROM item_synonyms_backup_20260101) as actual_synonyms
UNION ALL
SELECT 
  'After Import' as status,
  279 as expected_synonyms,
  (SELECT COUNT(*) FROM item_synonyms) as actual_synonyms;

-- Checkpoint 3: Industrial items added
SELECT 
  item_name, 
  base_price, 
  style_tags 
FROM pricing_items 
WHERE style_tags && ARRAY['industrial']
ORDER BY item_category, base_price DESC;

-- Expected: 19 new industrial items

-- Checkpoint 4: New synonyms added
SELECT 
  item_name, 
  synonym, 
  confidence_score 
FROM item_synonyms 
WHERE item_name LIKE 'Industrial%'
ORDER BY item_name, confidence_score DESC;

-- Expected: 22 new synonyms

-- ============================================
-- ROLLBACK PLAN (If Needed)
-- ============================================

-- ONLY RUN IF IMPORT FAILED AND YOU NEED TO RESTORE

-- Step 1: Drop current tables
-- DROP TABLE pricing_items;
-- DROP TABLE item_synonyms;
-- DROP TABLE budget_items;

-- Step 2: Rename backup tables to restore
-- ALTER TABLE pricing_items_backup_20260101 RENAME TO pricing_items;
-- ALTER TABLE item_synonyms_backup_20260101 RENAME TO item_synonyms;
-- ALTER TABLE budget_items_backup_20260101 RENAME TO budget_items;

-- Step 3: Verify restoration
-- SELECT COUNT(*) FROM pricing_items;  -- Should be 925
-- SELECT COUNT(*) FROM item_synonyms;  -- Should be 257

-- ============================================
-- SUCCESS CRITERIA
-- ============================================
-- ✅ Backups created (925 items, 257 synonyms preserved)
-- ✅ 19 new Industrial items added (944 total)
-- ✅ 22 new synonyms added (279 total)
-- ✅ No data lost
-- ✅ Ready for re-test (expect 75-85% match rate)
-- ============================================
