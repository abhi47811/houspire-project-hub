# 📖 DEPLOYMENT GUIDE - Budget Module

**Target:** Production Deployment  
**Platform:** Lovable.dev + Supabase  
**Time Required:** 15-20 minutes

---

## 🎯 OVERVIEW

This guide will help you deploy the budget module in 3 main steps:
1. **Database Setup** - Run SQL migrations
2. **Data Import** - Import pricing data from Excel files
3. **Verification** - Test the deployment

---

## 📋 PREREQUISITES

Before starting, ensure you have:
- ✅ Access to Lovable.dev project dashboard
- ✅ Supabase project credentials (URL and keys)
- ✅ All files from `DEPLOYMENT_PACKAGE` directory
- ✅ `Budgets-6_cities.zip` extracted

---

## 🚀 STEP 1: DATABASE SETUP

### 1.1 Access Supabase SQL Editor

**Option A: Via Lovable Dashboard**
1. Open https://lovable.dev/projects/YOUR_PROJECT_ID
2. Click **"Database"** in the left sidebar
3. Click **"SQL Editor"** tab

**Option B: Direct Supabase Access**
1. Open https://supabase.com/dashboard
2. Select your project
3. Click **"SQL Editor"** in the left sidebar

### 1.2 Run Migration: Create Tables

1. Open file: `01_create_budget_tables.sql`
2. Copy **ALL** contents (Ctrl+A, Ctrl+C)
3. Paste into SQL Editor
4. Click **"RUN"** button (or press Ctrl+Enter)
5. Wait for completion (should take 2-5 seconds)

**Expected Result:**
```
Success. 5 rows returned in X ms
```

**Verify tables created:**
```sql
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('pricing_items', 'item_synonyms', 'budget_items');
```

Should return 3 rows.

### 1.3 Run Migration: Seed Synonyms

1. Open file: `02_seed_synonyms.sql`
2. Copy **ALL** contents
3. Paste into SQL Editor
4. Click **"RUN"** button
5. Wait for completion (should take 3-8 seconds)

**Expected Result:**
```
Success. Rows affected: 200+
```

**Verify synonyms seeded:**
```sql
SELECT COUNT(*) FROM item_synonyms;
```

Should return approximately **200-220** rows.

---

## 📊 STEP 2: DATA IMPORT

### 2.1 Prepare Excel Files

1. Locate `Budgets-6_cities.zip` in deployment package
2. Extract the zip file:
   ```bash
   unzip Budgets-6_cities.zip
   ```
3. Verify 26 Excel files extracted in `Budgets-6 cities/` directory

**Expected files:**
- `loose_furniture_citywise_rates_2025_COMPLETE.xlsx`
- `floor_tiles_complete_citywise_rates_2025.xlsx`
- `electrical_lighting_citywise_rates_2025.xlsx`
- `home_decor_complete_citywise_rates_2025.xlsx`
- ... (22 more files)

### 2.2 Set Environment Variables

Create a `.env` file in the deployment package directory:

```bash
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=your_anon_key_here
```

**Where to find these:**
- Lovable Dashboard → Settings → Environment Variables
- OR Supabase Dashboard → Settings → API

### 2.3 Run Import Script

**Option A: Using Bash Script (Recommended)**
```bash
bash 05_run_import.sh ./Budgets-6\ cities/
```

**Option B: Using TypeScript Directly**
```bash
# Install dependencies first
npm install xlsx @supabase/supabase-js

# Run importer
npx ts-node 03_import_pricing_data.ts ./Budgets-6\ cities/
```

**Option C: Using Python**
```bash
# Install dependencies first
pip install pandas openpyxl supabase python-dotenv

# Run importer
python3 04_import_pricing_data.py ./Budgets-6\ cities/
```

### 2.4 Monitor Import Progress

You should see output like:
```
🚀 Houspire Pricing Data Import
================================
📁 Data directory: ./Budgets-6 cities/
📊 Found 26 Excel files

📄 Parsing: loose_furniture_citywise_rates_2025_COMPLETE.xlsx
  → Found 150 rows
📄 Parsing: floor_tiles_complete_citywise_rates_2025.xlsx
  → Found 85 rows
...
📦 Total items parsed: 1,247
💾 Importing 1,247 items to database...
  ✓ Imported 500/1247 items
  ✓ Imported 1000/1247 items
  ✓ Imported 1247/1247 items
✅ Import complete! 1,247 items imported.
```

**Expected Duration:** 2-5 minutes (depending on connection speed)

---

## ✅ STEP 3: VERIFICATION

### 3.1 Verify Data Imported

Run these SQL queries in Supabase SQL Editor:

**1. Check pricing items count:**
```sql
SELECT COUNT(*) FROM pricing_items;
```
**Expected:** 1,200+ rows

**2. Check categories:**
```sql
SELECT category, COUNT(*) as count
FROM pricing_items
GROUP BY category
ORDER BY count DESC;
```
**Expected:** 15-20 different categories

**3. Check sample data:**
```sql
SELECT item_name, category, budget_price, mid_premium_price, premium_price
FROM pricing_items
LIMIT 10;
```
**Expected:** 10 rows with valid prices

**4. Check synonyms:**
```sql
SELECT canonical_name, synonym, confidence
FROM item_synonyms
LIMIT 10;
```
**Expected:** 10 rows with synonym mappings

### 3.2 Test Budget Generation

1. **Create a Test Room:**
   - Open your Houspire app
   - Create a new project
   - Add a room (Living Room)
   - Upload a render image (Industrial Loft style recommended)

2. **Generate Budget:**
   - Approve the render
   - Click **"Generate Budget"** button
   - Wait 30-60 seconds for extraction

3. **Check Results:**
   - Budget items should appear
   - Check for style detection in logs
   - Verify item matching (check `match_strategy` column)
   - Verify pricing looks reasonable

### 3.3 Check Function Logs

1. **Access Logs:**
   - Lovable Dashboard → Functions → `extract-budget-items`
   - OR Supabase Dashboard → Edge Functions → Logs

2. **Look for:**
   ```
   🎨 Detected style: industrial loft (confidence: 0.92)
   ✅ Extracted 35 items from render
   🔍 Matching item: "leather sofa" (category: furniture)
   ✅ Synonym match found: 3-seater sofa (confidence: 95%)
   💾 Inserted 33 budget items
   ```

3. **Verify:**
   - Style detection working (should show detected style)
   - Items extracted (should show 20-40 items)
   - Items matched (should show match strategy for each)
   - No errors or warnings

---

## 🎯 SUCCESS CRITERIA

Your deployment is successful if:

- ✅ 3 tables created (pricing_items, item_synonyms, budget_items)
- ✅ 1,200+ pricing items imported
- ✅ 200+ synonyms seeded
- ✅ Budget generation works end-to-end
- ✅ Style detection visible in logs
- ✅ Items matched to pricing database
- ✅ Cost estimates appear reasonable (<10% variance from expected)

---

## 🐛 TROUBLESHOOTING

### Issue: SQL Migration Fails

**Error:** "relation already exists"
```
Fix: Tables may already be created. Check if data exists:
SELECT COUNT(*) FROM pricing_items;
If data exists, skip the migration.
```

**Error:** "permission denied"
```
Fix: Use service_role key instead of anon key in .env file
```

### Issue: Import Script Fails

**Error:** "Cannot find module 'xlsx'"
```bash
Fix: Install dependencies:
npm install xlsx @supabase/supabase-js
```

**Error:** "No Excel files found"
```
Fix: Extract the zip file first:
unzip Budgets-6_cities.zip
```

**Error:** "Authentication failed"
```
Fix: Check .env file has correct VITE_SUPABASE_URL and keys
```

### Issue: Budget Generation Not Working

**Problem:** No items extracted
```
Fix:
1. Check Gemini API key set in Edge Function environment
2. Check function logs for errors
3. Verify render has valid image_url
```

**Problem:** All items "unmatched"
```
Fix:
1. Verify pricing data imported (SELECT COUNT(*) FROM pricing_items)
2. Verify synonyms seeded (SELECT COUNT(*) FROM item_synonyms)
3. Check category mapping in function logs
```

**Problem:** Wrong materials detected
```
Fix:
1. Check style detection in logs (should show correct style)
2. Verify Edge Function has latest code with style-aware extraction
3. Test with different render images
```

---

## 📞 SUPPORT

**Still having issues?**

1. **Check:** `08_TROUBLESHOOTING.md` for more solutions
2. **Review:** Function logs in Lovable/Supabase dashboard
3. **Verify:** All prerequisites met (API keys, permissions, etc.)
4. **Test:** With Industrial Loft render (best test case)

---

## 📚 NEXT STEPS

After successful deployment:

1. **Test with different styles:**
   - Industrial Loft
   - Modern Luxury
   - Contemporary
   - Traditional

2. **Verify accuracy:**
   - Compare generated budgets with expected costs
   - Check item matching strategies
   - Verify city multipliers applied

3. **Monitor performance:**
   - Check extraction time (should be <60 seconds)
   - Check match rate (should be 95-100%)
   - Check cost variance (should be <10%)

4. **Optional enhancements:**
   - Add Kitchen Calculator (see specs)
   - Add Wardrobe Calculator (see specs)
   - Build Manual Review UI

---

**🎉 Congratulations! Your budget module is deployed!**

For full technical details, see: `BUDGET_MODULE_IMPLEMENTATION_COMPLETE.md`
