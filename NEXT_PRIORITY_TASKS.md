# 🎯 NEXT PRIORITY TASKS - ACTION PLAN

**Date:** 2026-01-01  
**Current Progress:** 75% Complete  
**Repository:** https://github.com/abhi47811/houspire-project-hub  

---

## 🔥 **IMMEDIATE PRIORITIES** (Next 1-2 Hours)

### **Option 1: Generate Additional Synonyms** ⭐ **RECOMMENDED**
**Impact:** HIGH | **Effort:** LOW | **Time:** 30-60 minutes

**Why This First:**
- Will immediately improve match rate from 33% to 60-70%
- No frontend changes required
- Can be tested right away with existing renders
- Low risk, high reward

**Action Steps:**
1. Analyze unmatched items from living room render test
2. Generate 200-300 targeted synonyms for common variations
3. Import using `bulk-import-pricing` function
4. Re-test budget extraction
5. Measure improvement

**Expected Outcome:**
- Synonyms: 573 → 800+ (+40%)
- Match Rate: 33% → 60-70% (+27-37 points)
- Budget Coverage: ₹44,942 → ₹180K-280K (4-6x)

---

### **Option 2: Create Kitchen Calculator** 
**Impact:** HIGH | **Effort:** MEDIUM | **Time:** 2-3 hours

**Why This:**
- Similar to wardrobe calculator (already done)
- High user demand for kitchen budgets
- Can leverage existing citywise pricing

**Action Steps:**
1. Review KITCHEN_CALCULATOR_COMPLETE_SPEC.md
2. Create `/supabase/functions/calculate-kitchen/index.ts`
3. Integrate citywise pricing for hardware, sinks, countertops
4. Test with sample inputs
5. Document

**Expected Outcome:**
- Kitchen calculator with city-specific pricing
- BOQ generation for 10' base kitchen
- Hardware/baskets/countertops priced by city

---

### **Option 3: Frontend City Selector Integration**
**Impact:** HIGH | **Effort:** MEDIUM | **Time:** 1-2 hours

**Why This:**
- Enables users to see city-specific pricing
- Required for full system utilization
- Unlocks calculator value

**Action Steps:**
1. Find project/room settings component
2. Add city dropdown
3. Update budget display to show city
4. Test with wardrobe calculator
5. Verify pricing updates

**Expected Outcome:**
- Users can select their city
- Calculators use selected city
- Budget reflects city-specific prices

---

## 💡 **MY RECOMMENDATION: START WITH SYNONYMS**

**Reasoning:**
1. **Fastest win** - Can generate and test in 30-60 minutes
2. **Immediate impact** - Match rate jumps from 33% to 60-70%
3. **No dependencies** - Works with existing infrastructure
4. **Low risk** - Just adding data, not changing code
5. **Measurable** - Can verify improvement right away

**Process:**
```
1. Query unmatched items (5 min)
2. Generate synonym list (20 min)
3. Import via bulk-import (5 min)
4. Re-test extraction (10 min)
5. Document results (10 min)
---
Total: ~50 minutes
```

---

## 📋 **SYNONYM GENERATION PLAN**

### **Step 1: Identify Unmatched Items** (5 min)

I'll query the living room render test to see what's not matching:

```sql
SELECT 
  ai_item_name,
  ai_category,
  COUNT(*) as occurrences
FROM budget_items
WHERE render_id = '8800edf0-4131-4f17-a987-caacf773a923'
  AND status = 'pending'
GROUP BY ai_item_name, ai_category
ORDER BY occurrences DESC;
```

### **Step 2: Generate Targeted Synonyms** (20 min)

Based on common unmatched items, I'll create synonyms for:
- Furniture variations (couch → sofa, nightstand → bedside table)
- Material variations (wooden → wood, glass → glazed)
- Style-specific terms (modern sofa, industrial chair)
- Room-specific terms (living room table, bedroom lamp)

### **Step 3: Import Synonyms** (5 min)

Use the `bulk-import-pricing` edge function with `generateSynonyms: true`

### **Step 4: Re-test** (10 min)

Run the same render through extraction again and measure:
- Match rate improvement
- Budget coverage improvement
- Remaining unmatched items

### **Step 5: Document** (10 min)

Update status report with results

---

## 🎯 **DECISION TIME**

**Which task should I proceed with?**

**Option A:** Generate synonyms (30-60 min, immediate impact) ⭐ **RECOMMENDED**  
**Option B:** Create kitchen calculator (2-3 hours, new feature)  
**Option C:** Frontend city selector (1-2 hours, user-facing)  
**Option D:** Something else you have in mind  

**What would you like me to do next?**

---

*Waiting for your direction...*
