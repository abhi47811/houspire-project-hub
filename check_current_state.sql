-- CHECK CURRENT STATE OF BUDGET EXTRACTION
-- Render ID: 8800edf0-4131-4f17-a987-caacf773a923

-- 1. Check if synonyms were imported
SELECT 
  'Synonym Status' as check_type,
  COUNT(*) as current_count,
  CASE 
    WHEN COUNT(*) >= 686 THEN '✅ Synonyms imported'
    WHEN COUNT(*) >= 573 THEN '⚠️ Only old synonyms (need to import EMERGENCY_SYNONYMS.sql)'
    ELSE '❌ Missing synonyms'
  END as status
FROM item_synonyms;

-- 2. Check current budget items for this render
SELECT 
  'Budget Items' as check_type,
  COUNT(*) as total_items,
  COUNT(CASE WHEN matched_item_id IS NOT NULL THEN 1 END) as matched_items,
  COUNT(CASE WHEN matched_item_id IS NULL THEN 1 END) as unmatched_items,
  ROUND(100.0 * COUNT(CASE WHEN matched_item_id IS NOT NULL THEN 1 END) / COUNT(*), 1) as match_rate_percent
FROM budget_items
WHERE render_id = '8800edf0-4131-4f17-a987-caacf773a923';

-- 3. Show what items were extracted
SELECT 
  ai_item_name,
  ai_category,
  quantity,
  CASE WHEN matched_item_id IS NOT NULL THEN '✅ Matched' ELSE '❌ Unmatched' END as status
FROM budget_items
WHERE render_id = '8800edf0-4131-4f17-a987-caacf773a923'
ORDER BY status DESC, ai_category, ai_item_name;

-- 4. Check if emergency synonyms exist
SELECT 
  'Emergency Synonym Check' as check_type,
  COUNT(*) as count
FROM item_synonyms
WHERE synonym IN ('coffee table', 'leather sofa', 'floor lamp', 'bookshelf', 'cushion', 'armchair', 'couch');

-- 5. Show what pricing items exist for common furniture
SELECT 
  'Available Pricing Items' as check_type,
  item_name,
  category,
  base_price
FROM pricing_items
WHERE category IN ('furniture', 'lighting', 'decor', 'soft_furnishings')
  AND (
    item_name ILIKE '%sofa%' 
    OR item_name ILIKE '%chair%' 
    OR item_name ILIKE '%table%' 
    OR item_name ILIKE '%lamp%'
    OR item_name ILIKE '%shelf%'
  )
ORDER BY category, item_name
LIMIT 20;
