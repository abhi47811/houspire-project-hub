-- Analyze Budget Extraction Failure for render_id 8800edf0-4131-4f17-a987-caacf773a923

-- 1. Check what was extracted
SELECT 
  ai_item_name,
  ai_category,
  ai_description,
  quantity,
  status,
  matched_item_id,
  total_cost
FROM budget_items
WHERE render_id = '8800edf0-4131-4f17-a987-caacf773a923'
ORDER BY ai_category, ai_item_name;

-- 2. Check unmatched items (these are the failures)
SELECT 
  ai_item_name,
  ai_category,
  ai_description,
  COUNT(*) as occurrences
FROM budget_items
WHERE render_id = '8800edf0-4131-4f17-a987-caacf773a923'
  AND status = 'pending'
  AND matched_item_id IS NULL
GROUP BY ai_item_name, ai_category, ai_description
ORDER BY occurrences DESC, ai_category;

-- 3. Check matched items (these worked)
SELECT 
  b.ai_item_name,
  b.ai_category,
  p.item_name as matched_to,
  p.category as pricing_category,
  b.total_cost
FROM budget_items b
JOIN pricing_items p ON b.matched_item_id = p.id
WHERE b.render_id = '8800edf0-4131-4f17-a987-caacf773a923'
  AND b.status = 'approved';

-- 4. Check available synonyms for common furniture items
SELECT 
  synonym,
  canonical_name,
  confidence_score,
  context_type
FROM item_synonyms
WHERE canonical_name ILIKE '%sofa%' 
   OR canonical_name ILIKE '%chair%'
   OR canonical_name ILIKE '%table%'
   OR canonical_name ILIKE '%lamp%'
   OR canonical_name ILIKE '%shelf%'
ORDER BY canonical_name, confidence_score DESC;
