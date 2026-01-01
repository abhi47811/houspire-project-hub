-- Check unmatched items from living room render
SELECT 
  ai_item_name,
  ai_category,
  ai_description,
  COUNT(*) as occurrences
FROM budget_items
WHERE render_id = '8800edf0-4131-4f17-a987-caacf773a923'
  AND status = 'pending'
GROUP BY ai_item_name, ai_category, ai_description
ORDER BY occurrences DESC
LIMIT 20;
