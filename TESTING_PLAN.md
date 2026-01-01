# 🧪 Budget Module Testing & Debugging Plan

**Date:** January 1, 2026  
**Repository:** https://github.com/abhi47811/houspire-project-hub  
**Current Status:** Database ready, extraction pipeline deployed, needs testing

---

## 📊 Current State Summary

### ✅ What's Already Working

| Component | Status | Details |
|-----------|--------|---------|
| Database Schema | ✅ Live | pricing_items, item_synonyms, budget_items tables exist |
| Pricing Data | ✅ 925 items | 11 city multipliers, 3 budget tiers per item |
| Synonyms | ✅ 257 entries | Ready for 4-strategy matching |
| Edge Functions | ✅ Deployed | extract-budget-items, test-gemini |
| Budget UI | ✅ Working | Shows items, extract button functional |

### ⚠️ Issues Found

| Issue | Evidence | Impact |
|-------|----------|--------|
| **No AI extraction happening** | 0 items with `ai_item_name` | Using template data, not Gemini |
| **Renders not approved** | 1 render with `approval_status: pending` | Extraction never triggered |
| **Gemini API untested** | No logs from extract-budget-items | Unknown if API key works |
| **Mock data suspected** | 23 budget items without AI fields | Fallback to mock data |

---

## 🎯 Test Plan (3 Phases)

### Phase 1: API & Environment Testing ⚡ (5 minutes)

**Goal:** Verify Gemini API connectivity and environment variables

#### Test 1.1: Verify Gemini API Key
```bash
# Call test-gemini edge function
curl -X POST \
  https://your-project.supabase.co/functions/v1/test-gemini \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json"

# Expected response:
{
  "success": true,
  "google_api_key_status": "available",
  "key_length": 39,
  "test_result": "Gemini API working correctly"
}

# If fails, check Supabase Edge Function secrets
```

#### Test 1.2: Check Environment Variables
```sql
-- In Supabase SQL Editor, verify functions have access to secrets
-- (This is indirect - we rely on test-gemini results)

-- Check if any extraction logs exist
SELECT 
  id,
  created_at,
  level,
  message,
  metadata
FROM edge_logs
WHERE message LIKE '%extract-budget-items%'
ORDER BY created_at DESC
LIMIT 10;
```

**Expected Outcome:**
- ✅ test-gemini returns success
- ✅ google_api_key_status: "available"
- ✅ key_length: 39 characters

**If Failed:**
- ❌ Check Supabase Dashboard > Edge Functions > Secrets
- ❌ Ensure `GOOGLE_AI_API_KEY` is set
- ❌ Redeploy edge functions if needed

---

### Phase 2: Render Approval Flow Testing 🎨 (10 minutes)

**Goal:** Test complete render → approval → budget extraction flow

#### Test 2.1: Find Test Render
```sql
-- Get the pending render
SELECT 
  r.id as render_id,
  r.room_id,
  r.image_url,
  r.approval_status,
  r.created_at,
  ro.room_type,
  p.id as project_id,
  p.city,
  p.budget_tier
FROM renders r
JOIN rooms ro ON r.room_id = ro.id
JOIN projects p ON ro.project_id = p.id
WHERE r.approval_status = 'pending'
ORDER BY r.created_at DESC
LIMIT 1;
```

**Record these values for testing:**
- render_id: `________________`
- room_id: `________________`
- project_id: `________________`
- image_url: `________________`

#### Test 2.2: Clear Old Budget Items (Optional)
```sql
-- Remove template-generated items to test fresh extraction
DELETE FROM budget_items 
WHERE project_id = 'YOUR_PROJECT_ID'
AND ai_item_name IS NULL;

-- Verify deletion
SELECT COUNT(*) FROM budget_items WHERE project_id = 'YOUR_PROJECT_ID';
-- Should return 0
```

#### Test 2.3: Approve Render (Trigger Extraction)
```sql
-- Approve the render
UPDATE renders
SET 
  approval_status = 'approved',
  approved_at = NOW(),
  approved_by = 'YOUR_USER_ID'
WHERE id = 'YOUR_RENDER_ID';

-- Verify approval
SELECT 
  id,
  approval_status,
  approved_at
FROM renders
WHERE id = 'YOUR_RENDER_ID';
```

**⚠️ CRITICAL:** Check if there's a database trigger or app logic that calls `extract-budget-items` on approval.

#### Test 2.4: Manually Trigger Extraction (If No Auto-Trigger)
```bash
# Call extract-budget-items directly
curl -X POST \
  https://your-project.supabase.co/functions/v1/extract-budget-items \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "render_id": "YOUR_RENDER_ID",
    "project_id": "YOUR_PROJECT_ID",
    "room_id": "YOUR_ROOM_ID"
  }'

# Expected response (if successful):
{
  "success": true,
  "items_extracted": 12,
  "items_matched": 12,
  "items_unmatched": 0,
  "total_amount": 650000,
  "budget_tier": "mid_range",
  "city": "Hyderabad",
  "debug": {
    "google_api_key_exists": true,
    "render_image_url": "https://...",
    "detected_style": "industrial",
    "style_confidence": 0.92
  }
}
```

#### Test 2.5: Verify Budget Items Created
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
  status
FROM budget_items
WHERE render_id = 'YOUR_RENDER_ID'
ORDER BY category, item_name;

-- Verify counts
SELECT 
  COUNT(*) as total_items,
  COUNT(ai_item_name) as ai_extracted,
  COUNT(pricing_item_id) as matched,
  SUM(total) as total_cost
FROM budget_items
WHERE render_id = 'YOUR_RENDER_ID';
```

**Expected Outcome:**
- ✅ 10-20 budget items created
- ✅ All have `ai_item_name`, `ai_category`, `ai_confidence`
- ✅ All have `pricing_item_id` (100% match rate)
- ✅ All have `match_strategy` (exact/synonym/fuzzy/token/keyword)
- ✅ Reasonable `total_cost` based on room size

**If Failed:**
- ❌ Check edge function logs (see Phase 3)
- ❌ Verify image_url is accessible (public URL)
- ❌ Check if Gemini API quota exceeded
- ❌ Look for error logs in Supabase Dashboard

---

### Phase 3: Debugging & Logs 🔍 (15 minutes)

**Goal:** Investigate failures and find root causes

#### Test 3.1: Check Edge Function Logs
```sql
-- Get extraction logs
SELECT 
  id,
  created_at,
  level,
  message,
  metadata->'render_id' as render_id,
  metadata->'items_extracted' as items_extracted,
  metadata->'error' as error
FROM edge_logs
WHERE message LIKE '%extract-budget-items%'
OR message LIKE '%Gemini%'
ORDER BY created_at DESC
LIMIT 20;
```

#### Test 3.2: Check for Errors
```sql
-- Find error logs
SELECT 
  created_at,
  level,
  message,
  metadata
FROM edge_logs
WHERE level IN ('error', 'warning')
AND created_at > NOW() - INTERVAL '1 hour'
ORDER BY created_at DESC;
```

#### Test 3.3: Test Style Detection Separately
```bash
# Test Gemini Vision API directly
curl -X POST \
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "contents": [{
      "parts": [
        {
          "text": "Analyze this interior design image. What style is it? (modern, traditional, industrial, minimalist, contemporary, scandinavian, bohemian, mid-century, rustic)"
        },
        {
          "inline_data": {
            "mime_type": "image/jpeg",
            "data": "BASE64_IMAGE_DATA_HERE"
          }
        }
      ]
    }]
  }'
```

#### Test 3.4: Test Item Matching Manually
```sql
-- Test exact match
SELECT 
  id,
  item_name,
  category,
  budget_price,
  mid_range_price,
  premium_price
FROM pricing_items
WHERE LOWER(item_name) ILIKE '%leather sofa%'
AND category = 'furniture'
AND is_active = true
LIMIT 5;

-- Test synonym match
SELECT 
  canonical_name,
  synonym,
  category,
  confidence_score
FROM item_synonyms
WHERE LOWER(synonym) = 'couch'
OR LOWER(canonical_name) = 'sofa';

-- Test fuzzy match
SELECT 
  id,
  item_name,
  category,
  SIMILARITY(item_name, 'Brown Leather Sofa') as match_score
FROM pricing_items
WHERE category = 'furniture'
ORDER BY match_score DESC
LIMIT 5;
```

---

## 🚨 Common Issues & Solutions

### Issue 1: Gemini API Key Not Working

**Symptoms:**
- test-gemini returns `google_api_key_status: "missing"`
- Extraction falls back to mock data
- No style detection logs

**Solutions:**
1. Check Supabase Dashboard > Settings > Edge Functions > Secrets
2. Ensure `GOOGLE_AI_API_KEY` is set (39 characters, starts with `AIza`)
3. Redeploy edge functions: `supabase functions deploy extract-budget-items`
4. Test again with test-gemini

---

### Issue 2: Extraction Not Triggered on Approval

**Symptoms:**
- Render approved but no budget items created
- No extraction logs in edge_logs table
- Manual API call works but approval doesn't

**Solutions:**
1. Check if database trigger exists:
   ```sql
   SELECT * FROM pg_trigger WHERE tgname LIKE '%render%';
   ```
2. Check app code for render approval logic
3. Look for webhook/event listeners in Supabase Dashboard
4. Implement manual trigger button in UI as fallback

---

### Issue 3: All Items Unmatched

**Symptoms:**
- Items extracted but `pricing_item_id` is NULL
- Match strategy is NULL or always "keyword"
- Low confidence scores

**Solutions:**
1. Check pricing_items count: `SELECT COUNT(*) FROM pricing_items;`
2. Verify synonyms: `SELECT COUNT(*) FROM item_synonyms;`
3. Test manual matching queries (see Test 3.4)
4. Check for typos in canonical_name vs item_name
5. Add more synonyms for common items

---

### Issue 4: Image URL Not Accessible

**Symptoms:**
- Error: "Failed to fetch image"
- 403 Forbidden or 404 Not Found
- Image URL is private/signed

**Solutions:**
1. Verify image_url is public: `curl -I "IMAGE_URL"`
2. Check Supabase Storage bucket permissions
3. Generate public URL if using signed URLs
4. Update render.image_url if needed

---

### Issue 5: Mock Data Being Used

**Symptoms:**
- Items always the same (sofa, coffee table, rug)
- No variation based on room type
- ai_confidence exactly 0.85, 0.90, 0.75

**Solutions:**
1. Verify GOOGLE_AI_API_KEY is set
2. Check for fallback logic in extractItemsFromRender
3. Look for `usedMockData: true` in logs
4. Remove mock data code if API key is working

---

## 📋 Testing Checklist

### Before Testing
- [ ] Supabase project URL and anon key ready
- [ ] Gemini API key set in Edge Function secrets
- [ ] Edge functions deployed (extract-budget-items, test-gemini)
- [ ] Database has pricing_items (925+) and item_synonyms (257+)
- [ ] At least one render with image_url exists

### Phase 1: Environment (5 min)
- [ ] Test 1.1: test-gemini returns success
- [ ] Test 1.2: Edge logs accessible
- [ ] **Result:** API key working? YES / NO

### Phase 2: Extraction Flow (10 min)
- [ ] Test 2.1: Found test render
- [ ] Test 2.2: Cleared old items (optional)
- [ ] Test 2.3: Approved render
- [ ] Test 2.4: Triggered extraction (manual or auto)
- [ ] Test 2.5: Budget items created with AI fields
- [ ] **Result:** Extraction working? YES / NO

### Phase 3: Debugging (15 min, if needed)
- [ ] Test 3.1: Reviewed edge function logs
- [ ] Test 3.2: Found error messages
- [ ] Test 3.3: Tested Gemini API directly
- [ ] Test 3.4: Tested matching queries
- [ ] **Result:** Root cause identified? YES / NO

### After Testing
- [ ] 100% match rate achieved
- [ ] Style detection working (9 styles)
- [ ] Cost variance <10%
- [ ] All AI fields populated (ai_item_name, ai_category, ai_confidence)
- [ ] No mock data being used

---

## 🎯 Success Criteria

### Minimum Requirements
- ✅ Gemini API key working
- ✅ At least 1 render successfully extracted
- ✅ 80%+ items matched to pricing_items
- ✅ AI fields populated (ai_item_name, ai_category, ai_confidence)
- ✅ Style detection logs present

### Ideal Results
- ✅ 100% match rate (all items matched)
- ✅ Style detection confidence >80%
- ✅ Cost variance <10% from expected
- ✅ 10-20 items extracted per render
- ✅ No errors in edge function logs
- ✅ Extraction completes in <30 seconds

---

## 📞 Next Steps After Testing

### If All Tests Pass ✅
1. Test with 5 more renders (different room types)
2. Verify consistency across styles (modern, industrial, traditional)
3. Import remaining pricing data (925 → 1,200 items)
4. Update documentation with test results
5. Mark module as production-ready

### If Tests Fail ❌
1. Use this plan to identify root cause
2. Check common issues section
3. Review edge function code for bugs
4. Test Gemini API quota/limits
5. Add more detailed logging if needed

### To Import More Pricing Data
1. Extract `Budgets-6_cities.zip` (26 Excel files)
2. Run `scripts/importPricingData.ts` or `scripts/import_all_pricing_data.py`
3. Verify new items: `SELECT COUNT(*) FROM pricing_items;`
4. Re-test extraction with new items

---

## 📊 Test Results Template

**Test Date:** _______________  
**Tester:** _______________  
**Supabase Project:** _______________

| Test | Status | Notes |
|------|--------|-------|
| 1.1: Gemini API | ⬜ Pass / ⬜ Fail | |
| 1.2: Edge Logs | ⬜ Pass / ⬜ Fail | |
| 2.1: Find Render | ⬜ Pass / ⬜ Fail | |
| 2.3: Approve Render | ⬜ Pass / ⬜ Fail | |
| 2.4: Trigger Extraction | ⬜ Pass / ⬜ Fail | |
| 2.5: Verify Items | ⬜ Pass / ⬜ Fail | |
| 3.1: Check Logs | ⬜ Pass / ⬜ Fail | |

**Overall Result:** ⬜ PASS / ⬜ FAIL

**Issues Found:**
1. _______________
2. _______________
3. _______________

**Next Actions:**
1. _______________
2. _______________
3. _______________

---

**Ready to start testing?** Begin with Phase 1, Test 1.1 (Gemini API verification).

*Repository: https://github.com/abhi47811/houspire-project-hub*  
*Status: READY FOR TESTING* 🧪
