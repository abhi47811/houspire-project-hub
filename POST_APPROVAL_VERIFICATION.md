# 🧪 Post-Approval Verification Guide

**Date:** January 1, 2026  
**Render ID:** `8800edf0-4131-4f17-a987-caacf773a923`  
**Room Type:** Living Room  
**Project ID:** `a12c61d6-185c-4149-bfef-bcea37202933`

---

## ✅ Pre-Approval Test Results

| Test | Status | Result |
|------|--------|--------|
| Gemini API | ✅ PASSED | "Hello from Houspire!" response |
| API Key | ✅ CONFIGURED | 39 characters, working |
| Pending Render | ✅ FOUND | Living room render ready |

---

## 📋 Verification Checklist (After Approval)

### Step 1: Check Edge Function Execution (2 minutes)

```sql
-- Check if extract-budget-items was called
SELECT 
  id,
  created_at,
  level,
  message,
  metadata
FROM edge_logs
WHERE created_at > NOW() - INTERVAL '10 minutes'
AND (
  message ILIKE '%extract-budget-items%'
  OR message ILIKE '%budget%'
  OR message ILIKE '%gemini%'
)
ORDER BY created_at DESC
LIMIT 20;
```

**Expected Results:**
- ✅ Log entries with `extract-budget-items` function name
- ✅ Messages like "Starting budget extraction for render..."
- ✅ "Detected style: [style_name] with [confidence]% confidence"
- ✅ "Extracted [N] items from render"
- ✅ "Matched [N]/[N] items successfully"
- ✅ "Created [N] budget items"

**Red Flags:**
- ❌ No log entries (function not called)
- ❌ Error messages about API keys
- ❌ "Failed to fetch image" errors
- ❌ "No items extracted" messages

---

### Step 2: Verify Budget Items Created (2 minutes)

```sql
-- Check for AI-extracted items
SELECT 
  id,
  item_name,
  ai_item_name,
  ai_category,
  ai_confidence,
  category,
  quantity,
  rate,
  amount,
  total,
  pricing_item_id,
  match_strategy,
  match_confidence,
  status,
  created_at
FROM budget_items
WHERE render_id = '8800edf0-4131-4f17-a987-caacf773a923'
ORDER BY category, item_name;
```

**Expected Results:**
- ✅ 10-20 rows returned
- ✅ All have `ai_item_name` populated (e.g., "Brown leather sofa")
- ✅ All have `ai_category` (furniture, flooring, lighting, etc.)
- ✅ All have `ai_confidence` between 0.70-0.95
- ✅ All have `pricing_item_id` (matched to pricing database)
- ✅ All have `match_strategy` (exact/synonym/fuzzy/token/keyword)
- ✅ `rate`, `amount`, `total` are reasonable numbers (not 0)
- ✅ `status` = 'pending' or 'approved'

**Red Flags:**
- ❌ 0 rows returned (extraction failed)
- ❌ `ai_item_name` is NULL (using mock data)
- ❌ `pricing_item_id` is NULL (matching failed)
- ❌ All items have same confidence (0.85, 0.90, 0.75 = mock data pattern)
- ❌ Items are generic (sofa, coffee table, rug only = mock data)

---

### Step 3: Verify Match Quality (2 minutes)

```sql
-- Check match strategy distribution
SELECT 
  match_strategy,
  COUNT(*) as item_count,
  ROUND(AVG(match_confidence)::numeric, 2) as avg_confidence,
  ROUND(AVG(ai_confidence)::numeric, 2) as avg_ai_confidence
FROM budget_items
WHERE render_id = '8800edf0-4131-4f17-a987-caacf773a923'
GROUP BY match_strategy
ORDER BY item_count DESC;
```

**Expected Results:**
- ✅ Multiple strategies used (exact, synonym, fuzzy, token)
- ✅ Exact matches have highest confidence (0.95-1.0)
- ✅ Synonym matches ~0.85-0.90
- ✅ Fuzzy/token matches ~0.70-0.85
- ✅ Total items across all strategies = 10-20

**Ideal Distribution:**
```
match_strategy | item_count | avg_confidence | avg_ai_confidence
---------------|------------|----------------|------------------
exact          | 8          | 0.98           | 0.92
synonym        | 6          | 0.87           | 0.89
fuzzy          | 4          | 0.75           | 0.85
token          | 2          | 0.68           | 0.82
```

**Red Flags:**
- ❌ All items use same strategy (keyword fallback)
- ❌ No exact or synonym matches
- ❌ All confidence scores identical
- ❌ Average confidence <0.60

---

### Step 4: Check Style Detection (1 minute)

```sql
-- Check for style detection logs
SELECT 
  created_at,
  message,
  metadata->'detected_style' as style,
  metadata->'style_confidence' as confidence,
  metadata->'style_features' as features
FROM edge_logs
WHERE created_at > NOW() - INTERVAL '10 minutes'
AND message ILIKE '%style%'
ORDER BY created_at DESC
LIMIT 5;
```

**Expected Results:**
- ✅ Log entry: "Detected style: [modern/industrial/traditional/etc.]"
- ✅ Confidence score 0.75-0.95
- ✅ Key features listed (e.g., "exposed brick, metal fixtures, neutral tones")

**Styles that may be detected:**
- Modern
- Industrial
- Traditional
- Minimalist
- Contemporary
- Scandinavian
- Bohemian
- Mid-century
- Rustic

**Red Flags:**
- ❌ No style detection logs
- ❌ Style always "contemporary" (default fallback)
- ❌ Confidence exactly 0.50 (fallback value)

---

### Step 5: Verify Pricing Accuracy (2 minutes)

```sql
-- Check pricing calculations
SELECT 
  bi.item_name,
  bi.ai_item_name,
  bi.quantity,
  bi.rate,
  bi.amount,
  bi.gst_percent,
  bi.gst_amount,
  bi.total,
  pi.item_name as pricing_item_name,
  pi.mid_range_price as expected_base_price,
  pi.hyderabad_multiplier as city_multiplier
FROM budget_items bi
LEFT JOIN pricing_items pi ON bi.pricing_item_id = pi.id
WHERE bi.render_id = '8800edf0-4131-4f17-a987-caacf773a923'
ORDER BY bi.total DESC
LIMIT 10;
```

**Expected Results:**
- ✅ `rate` = base_price × city_multiplier × budget_tier
- ✅ `amount` = rate × quantity
- ✅ `gst_amount` = amount × (gst_percent / 100)
- ✅ `total` = amount + gst_amount
- ✅ GST percent = 12%, 18%, or 5% (category-dependent)
- ✅ City multiplier ~1.1 for Hyderabad

**Example calculation verification:**
```
Sofa (furniture):
- base_price: ₹40,000
- city_multiplier: 1.1 (Hyderabad)
- tier_multiplier: 1.0 (mid_range)
- rate: 40,000 × 1.1 × 1.0 = ₹44,000
- quantity: 1
- amount: 44,000 × 1 = ₹44,000
- gst (18%): 44,000 × 0.18 = ₹7,920
- total: 44,000 + 7,920 = ₹51,920
```

**Red Flags:**
- ❌ All amounts = 0
- ❌ No GST calculated
- ❌ Rates don't match pricing_items
- ❌ pricing_item_id is NULL

---

### Step 6: Check Total Budget (1 minute)

```sql
-- Calculate total budget
SELECT 
  COUNT(*) as total_items,
  COUNT(DISTINCT category) as categories_covered,
  SUM(amount) as subtotal,
  SUM(gst_amount) as total_gst,
  SUM(total) as grand_total,
  ROUND(AVG(ai_confidence)::numeric, 2) as avg_confidence
FROM budget_items
WHERE render_id = '8800edf0-4131-4f17-a987-caacf773a923';
```

**Expected Results:**
- ✅ `total_items`: 10-20
- ✅ `categories_covered`: 4-7
- ✅ `subtotal`: ₹2,00,000 - ₹8,00,000 (living room, mid-range)
- ✅ `total_gst`: ~15-18% of subtotal
- ✅ `grand_total`: subtotal + total_gst
- ✅ `avg_confidence`: 0.80-0.90

**Living Room Budget Ranges (Mid-Range, Hyderabad):**
- Small (200 sq ft): ₹2,50,000 - ₹4,00,000
- Medium (350 sq ft): ₹4,50,000 - ₹6,50,000
- Large (500 sq ft): ₹6,50,000 - ₹9,00,000

**Red Flags:**
- ❌ Total = 0 or unrealistically low
- ❌ Total > ₹15,00,000 (too high for living room)
- ❌ Only 1-2 categories covered
- ❌ Average confidence <0.70

---

### Step 7: UI Verification (1 minute)

**In the Budget Page:**
- ✅ New items appear in the budget table
- ✅ Items grouped by category
- ✅ Each item shows:
  - Name (from `ai_item_name` or `item_name`)
  - Quantity
  - Rate (formatted as ₹XX,XXX)
  - Amount (formatted)
  - Total (formatted)
- ✅ Subtotal, GST, Grand Total displayed
- ✅ "Extract Budget" button works (or shows "Already extracted")
- ✅ No error messages or loading states stuck

**Red Flags:**
- ❌ Budget table empty
- ❌ Items show as ₹0
- ❌ Error toast: "Failed to extract budget"
- ❌ Loading spinner forever
- ❌ Old template items still showing (not AI-extracted)

---

## 🎯 Success Criteria Summary

### Minimum Success (Phase 2 Complete)
- [x] Gemini API working
- [ ] Render approved
- [ ] extract-budget-items executed
- [ ] 5+ budget items created
- [ ] 60%+ items matched to pricing_items
- [ ] AI fields populated (ai_item_name, ai_category)
- [ ] UI shows new items

### Ideal Success (Production Ready)
- [x] Gemini API working
- [ ] Render approved
- [ ] extract-budget-items executed
- [ ] 10-20 budget items created
- [ ] 100% items matched (all have pricing_item_id)
- [ ] Style detection working (confidence >0.80)
- [ ] 4+ match strategies used
- [ ] Pricing calculations correct
- [ ] Budget total reasonable (₹2L-₹8L for living room)
- [ ] UI displays perfectly

---

## 🚨 Troubleshooting Common Issues

### Issue 1: No Items Extracted

**Symptoms:**
- Edge logs show function executed
- But 0 rows in budget_items table

**Possible Causes:**
1. Idempotency check triggered (items already exist)
2. Image fetch failed (render.image_url not accessible)
3. Gemini API quota exceeded
4. Database insert failed

**Debug Steps:**
```sql
-- Check if items already exist
SELECT COUNT(*) FROM budget_items 
WHERE render_id = '8800edf0-4131-4f17-a987-caacf773a923';

-- If >0, delete and re-trigger
DELETE FROM budget_items 
WHERE render_id = '8800edf0-4131-4f17-a987-caacf773a923';

-- Check render image URL
SELECT image_url FROM renders 
WHERE id = '8800edf0-4131-4f17-a987-caacf773a923';

-- Test image accessibility
-- Copy URL and try in browser or curl
```

---

### Issue 2: Mock Data Used Instead of Gemini

**Symptoms:**
- Items are generic (sofa, coffee table, rug)
- Confidence scores exactly 0.85, 0.90, 0.75
- Always 3-5 items regardless of room
- No style detection logs

**Possible Causes:**
1. GOOGLE_AI_API_KEY not set in edge function secrets
2. Gemini API returned error (fallback to mock)
3. Image format not supported

**Debug Steps:**
```sql
-- Check for API key errors in logs
SELECT * FROM edge_logs
WHERE message ILIKE '%api%key%'
OR message ILIKE '%mock%'
OR message ILIKE '%fallback%'
ORDER BY created_at DESC
LIMIT 10;
```

**Solution:**
- Verify GOOGLE_AI_API_KEY in Supabase Dashboard > Edge Functions > Secrets
- Redeploy functions: `supabase functions deploy extract-budget-items`

---

### Issue 3: Items Not Matching (pricing_item_id NULL)

**Symptoms:**
- Items extracted but `pricing_item_id` is NULL
- `match_strategy` is NULL or empty
- Rates and amounts = 0

**Possible Causes:**
1. pricing_items table empty
2. Category mismatch (AI detects "furniture" but pricing has "Furniture")
3. Item names too specific (no synonyms)

**Debug Steps:**
```sql
-- Verify pricing_items exist
SELECT COUNT(*) FROM pricing_items WHERE is_active = true;

-- Check specific item manually
SELECT * FROM pricing_items 
WHERE LOWER(item_name) ILIKE '%sofa%'
AND is_active = true
LIMIT 5;

-- Test synonym match
SELECT * FROM item_synonyms
WHERE LOWER(synonym) = 'couch'
OR LOWER(canonical_name) = 'sofa';
```

**Solution:**
- Add more synonyms for common items
- Run pricing data import to add missing items
- Check category names match exactly

---

### Issue 4: Function Never Called

**Symptoms:**
- Render approved
- But no edge_logs entries for extract-budget-items
- No budget items created

**Possible Causes:**
1. No database trigger on renders.approval_status
2. No app code calling the function
3. Function deployment failed

**Debug Steps:**
```sql
-- Check for database triggers
SELECT * FROM pg_trigger 
WHERE tgname ILIKE '%render%' 
OR tgname ILIKE '%budget%';

-- Check app code logs
-- (This would be in app logs, not database)
```

**Solution:**
- Use manual trigger button in UI
- Call function via curl (see TESTING_PLAN.md)
- Check app code for render approval handler

---

## 📊 Test Results Template

**Tester:** _______________  
**Test Date:** _______________ (2026-01-01)  
**Render ID:** `8800edf0-4131-4f17-a987-caacf773a923`

### Pre-Approval Tests
- [x] Step 1: Gemini API test → ✅ PASSED
- [x] Step 2: Pending render found → ✅ FOUND

### Post-Approval Tests
- [ ] Step 1: Edge function logs → ⬜ PASS / ⬜ FAIL
- [ ] Step 2: Budget items created → ⬜ PASS / ⬜ FAIL  
  - Items count: _______
  - AI fields populated: ⬜ YES / ⬜ NO
- [ ] Step 3: Match quality → ⬜ PASS / ⬜ FAIL  
  - Match rate: _______% 
  - Strategies used: _______
- [ ] Step 4: Style detection → ⬜ PASS / ⬜ FAIL  
  - Style: _______
  - Confidence: _______
- [ ] Step 5: Pricing accuracy → ⬜ PASS / ⬜ FAIL  
  - Calculations correct: ⬜ YES / ⬜ NO
- [ ] Step 6: Total budget → ⬜ PASS / ⬜ FAIL  
  - Total: ₹_______
  - Reasonable: ⬜ YES / ⬜ NO
- [ ] Step 7: UI verification → ⬜ PASS / ⬜ FAIL

### Overall Result
- [ ] ✅ ALL TESTS PASSED - Production Ready
- [ ] ⚠️ PARTIAL PASS - Needs fixes
- [ ] ❌ FAILED - Debug required

### Issues Found
1. _______________
2. _______________
3. _______________

### Next Actions
1. _______________
2. _______________
3. _______________

---

## 📞 What to Report Back

**If Tests Pass:**
```
✅ Budget extraction working!

Results:
- Extracted: [N] items
- Matched: [N]/[N] (100%)
- Style detected: [style_name] ([confidence]%)
- Total budget: ₹[amount]
- Average confidence: [score]

Next: Test with 3-5 more renders to verify consistency.
```

**If Tests Fail:**
```
❌ Budget extraction failed

Issue: [brief description]
Evidence: [SQL query result or log message]
Attempted fixes: [what you tried]

Need help with: [specific question]
```

---

**Repository:** https://github.com/abhi47811/houspire-project-hub  
**Latest Commit:** 3f60bfc  
**Status:** AWAITING POST-APPROVAL VERIFICATION 🧪
