# DEPLOYMENT CHECKLIST - BUDGET EXTRACTION FIX

**Date**: 2026-01-01  
**Status**: 🔴 CODE READY BUT NOT DEPLOYED  
**User Issue**: Quantities still wrong because fixes not live  

---

## 🚨 CURRENT STATE

### What User Sees (Screenshot):
```
❌ concrete floor:    1 sqft  (WRONG)
❌ brick wall:        1 sqft  (WRONG)
❌ concrete ceiling:  1 sqft  (WRONG)
❌ ceiling pipes:     6 rft   (WRONG)
❌ metal ducting:     2 rft   (WRONG)
```

### Why:
**NONE OF THE FIXES ARE DEPLOYED YET**

---

## ✅ DEPLOYMENT STEPS (DO IN ORDER)

### STEP 1: Import Synonyms (5 minutes)
**Who**: Database Admin  
**What**: Import EMERGENCY_SYNONYMS.sql  
**How**:
```sql
-- 1. Open Supabase Dashboard → SQL Editor
-- 2. Copy contents from:
--    https://github.com/abhi47811/houspire-project-hub/blob/main/EMERGENCY_SYNONYMS.sql
-- 3. Run the SQL script
-- 4. Wait for success message
```

**Verify**:
```sql
SELECT COUNT(*) FROM item_synonyms;
-- Expected: 686+ (was 573)

-- Test sample synonyms:
SELECT synonym, canonical_name 
FROM item_synonyms
WHERE synonym IN ('coffee table', 'leather sofa', 'floor lamp', 'concrete floor')
ORDER BY synonym;
-- Expected: 4 rows returned
```

---

### STEP 2: Deploy vision-ai Function (5 minutes)
**Who**: Backend Developer  
**What**: Deploy updated vision-ai with architectural measurements  
**How**:
```bash
cd /home/user/webapp
git pull origin main
supabase functions deploy vision-ai
```

**Verify**:
```bash
# Test the function
curl -X POST https://your-supabase-url.supabase.co/functions/v1/vision-ai \
  -H "Authorization: Bearer YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "action": "itemizeBudget",
    "imageUrls": ["https://test-image-url.jpg"]
  }'

# Check response includes realistic quantities:
# Floor: 150-500 sqft (NOT 1 sqft)
# Walls: 100-300 sqft (NOT 1 sqft)
```

---

### STEP 3: Deploy generate-budget-vision Function (5 minutes)
**Who**: Backend Developer  
**What**: Deploy new function that uses vision AI (not mock data)  
**How**:
```bash
cd /home/user/webapp
supabase functions deploy generate-budget-vision
```

**Verify**:
```bash
# Test the function
curl -X POST https://your-supabase-url.supabase.co/functions/v1/generate-budget-vision \
  -H "Authorization: Bearer YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "renderId": "test-render-id",
    "renderUrl": "https://test-image-url.jpg",
    "city": "Hyderabad"
  }'

# Check response shows:
# {
#   "success": true,
#   "stats": {
#     "total": 20-30,
#     "matched": 18-26,
#     "matchRate": 85-95
#   }
# }
```

---

### STEP 4: Update Frontend API Call (5 minutes)
**Who**: Frontend Developer  
**What**: Change budget generation to use new function  
**How**:

**Find this code** (in your budget generation component):
```javascript
// OLD - using mock data function:
const response = await fetch('/functions/v1/generate-budget', {
  method: 'POST',
  body: JSON.stringify({
    projectId: project.id,
    city: selectedCity
  })
});
```

**Replace with**:
```javascript
// NEW - using vision-based function:
const response = await fetch('/functions/v1/generate-budget-vision', {
  method: 'POST',
  body: JSON.stringify({
    renderId: render.id,
    renderUrl: render.image_url,
    city: selectedCity
  })
});
```

**Deploy Frontend**:
```bash
# Deploy updated frontend to production
npm run build
# (or your deployment command)
```

---

### STEP 5: Test with User's Render (5 minutes)
**Who**: QA / Product Team  
**What**: Regenerate budget for render 8800edf0-4131-4f17-a987-caacf773a923  

**Test Flow**:
1. Open the render in UI
2. Click "Generate Budget" (or re-generate)
3. Wait for completion
4. Check quantities in budget

**Expected Results**:
```
✅ concrete floor:    250-450 sqft  (NOT 1 sqft)
✅ brick accent wall: 150-200 sqft  (NOT 1 sqft)
✅ concrete walls:    500-800 sqft  (NOT 1 sqft each)
✅ concrete ceiling:  250-450 sqft  (NOT 1 sqft)
✅ ceiling pipes:     30-50 rft     (NOT 6 rft)
✅ metal ducting:     20-30 rft     (NOT 2 rft)
✅ sofa:              1 nos         (NOT 3)
✅ armchairs:         2 nos
✅ cushions:          4 nos
✅ area rug:          1 nos         (NOT sqft)
```

---

### STEP 6: Verify in Database (2 minutes)
**Who**: Database Admin / QA  
**What**: Check budget_items table  

**Run Queries**:
```sql
-- 1. Check synonym count
SELECT COUNT(*) FROM item_synonyms;
-- Expected: 686+

-- 2. Check budget items for test render
SELECT 
  ai_item_name,
  quantity,
  unit,
  total_cost,
  CASE 
    WHEN matched_item_id IS NOT NULL THEN '✅ Matched'
    ELSE '❌ Unmatched'
  END as status
FROM budget_items
WHERE render_id = '8800edf0-4131-4f17-a987-caacf773a923'
ORDER BY ai_category, ai_item_name;

-- Expected:
-- - Floor: 250-450 sqft (NOT 1)
-- - Walls: 150-800 sqft total (NOT 1 each)
-- - Ceiling: 250-450 sqft (NOT 1)
-- - Match rate: 85%+ (20-25 out of 25-30 items)

-- 3. Check match rate
SELECT 
  COUNT(*) as total_items,
  COUNT(CASE WHEN matched_item_id IS NOT NULL THEN 1 END) as matched,
  ROUND(100.0 * COUNT(CASE WHEN matched_item_id IS NOT NULL THEN 1 END) / COUNT(*), 1) as match_rate
FROM budget_items
WHERE render_id = '8800edf0-4131-4f17-a987-caacf773a923';

-- Expected: match_rate >= 85.0
```

---

## 🎯 SUCCESS CRITERIA

### All Must Pass:

- [ ] **Synonyms imported**: 686+ in database
- [ ] **vision-ai deployed**: Returns realistic room measurements
- [ ] **generate-budget-vision deployed**: Calls vision-ai successfully
- [ ] **Frontend updated**: Calls new function, not old mock one
- [ ] **Test render regenerated**: New budget items created
- [ ] **Quantities correct**: Floor 250-450 sqft, walls 150-800 sqft, etc.
- [ ] **Match rate high**: 85%+ items matched to pricing
- [ ] **User satisfied**: No more "quantities wrong" reports

---

## ⏱️ TOTAL TIME: 27 MINUTES

| Step | Time | Owner |
|------|------|-------|
| 1. Import synonyms | 5 min | DB Admin |
| 2. Deploy vision-ai | 5 min | Backend Dev |
| 3. Deploy generate-budget-vision | 5 min | Backend Dev |
| 4. Update frontend | 5 min | Frontend Dev |
| 5. Test render | 5 min | QA |
| 6. Verify database | 2 min | QA |
| **TOTAL** | **27 min** | |

---

## 🚨 IF SOMETHING FAILS

### Problem: Synonyms don't import
**Solution**: Check for SQL syntax errors, run line by line

### Problem: Functions fail to deploy
**Solution**: Check Supabase logs, verify API keys configured

### Problem: Quantities still wrong
**Solution**: 
1. Verify vision-ai deployed (check logs)
2. Verify frontend calling new function (check network tab)
3. Check if render image URL accessible

### Problem: Match rate still low
**Solution**:
1. Verify synonyms imported (686+)
2. Check pricing_items table has items
3. Run synonym match queries manually

---

## 📞 COMMUNICATION

### After Each Step:
Post status in team channel:
```
✅ Step 1 complete: Synonyms imported (686 total)
✅ Step 2 complete: vision-ai deployed
✅ Step 3 complete: generate-budget-vision deployed
✅ Step 4 complete: Frontend updated
✅ Step 5 complete: Test render regenerated
✅ Step 6 complete: Database verified

Final result: Match rate 87%, quantities correct ✅
```

### Notify User:
```
Budget extraction fix deployed!

Changes:
- Vision AI now measures room dimensions (not counting as 1)
- 113 new synonyms added (furniture, lighting, decor)
- Budget now extracts from your actual image (not mock data)

Please test:
1. Regenerate your living room budget
2. Check quantities are realistic (floor 250-450 sqft, not 1 sqft)
3. Check match rate is 85%+ (20-25 out of ~25 items matched)

Expected result:
✅ Realistic quantities
✅ High match rate
✅ Complete budget with city pricing
```

---

## 🏁 COMPLETION CHECKLIST

- [ ] All 6 steps completed
- [ ] All success criteria met
- [ ] User notified
- [ ] User confirmed it works
- [ ] Close ticket

**DO NOT mark as "fixed" until USER CONFIRMS quantities are correct.**

---

**Repository**: https://github.com/abhi47811/houspire-project-hub  
**Latest Commit**: 97bae0e  
**This Checklist**: DEPLOYMENT_CHECKLIST.md  

**Status**: 🔴 WAITING FOR TEAM TO DEPLOY (Code ready in GitHub)
