# 🔧 TROUBLESHOOTING GUIDE

**Budget Module Deployment Issues**

---

## 🗄️ DATABASE ISSUES

### Issue: "relation already exists"

**Error message:**
```
ERROR: relation "pricing_items" already exists
```

**Cause:** Tables were created in a previous deployment attempt.

**Solution:**
```sql
-- Check if data exists
SELECT COUNT(*) FROM pricing_items;
SELECT COUNT(*) FROM item_synonyms;
SELECT COUNT(*) FROM budget_items;

-- If tables exist with data, skip migration
-- If tables exist but empty, you can:

-- Option 1: Drop and recreate (CAUTION: deletes all data)
DROP TABLE IF EXISTS budget_items CASCADE;
DROP TABLE IF EXISTS item_synonyms CASCADE;
DROP TABLE IF EXISTS pricing_items CASCADE;
-- Then rerun 01_create_budget_tables.sql

-- Option 2: Keep existing and proceed to import
-- Just skip the migration and run import script
```

---

### Issue: "permission denied for table"

**Error message:**
```
ERROR: permission denied for table pricing_items
```

**Cause:** Using anon key instead of service_role key for data import.

**Solution:**
```bash
# In .env file, use service_role key instead:
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbG...your_service_role_key

# Get service_role key from:
# Lovable → Settings → Environment Variables
# OR Supabase Dashboard → Settings → API → service_role key
```

---

### Issue: Slow query performance

**Symptom:** Budget generation takes >2 minutes

**Cause:** Missing indexes on pricing_items table.

**Solution:**
```sql
-- Check if indexes exist
SELECT indexname 
FROM pg_indexes 
WHERE tablename = 'pricing_items';

-- If missing, create indexes:
CREATE INDEX IF NOT EXISTS idx_pricing_category 
ON pricing_items(category);

CREATE INDEX IF NOT EXISTS idx_pricing_active 
ON pricing_items(is_active) 
WHERE is_active = true;

CREATE INDEX IF NOT EXISTS idx_pricing_item_name 
ON pricing_items USING gin(to_tsvector('english', item_name));

-- Analyze table
ANALYZE pricing_items;
```

---

## 📊 DATA IMPORT ISSUES

### Issue: "Cannot find module 'xlsx'"

**Error message:**
```
Error: Cannot find module 'xlsx'
```

**Cause:** Missing Node.js dependencies.

**Solution:**
```bash
# Install required dependencies
npm install xlsx @supabase/supabase-js

# Or use the package.json if provided:
npm install

# Verify installation
npx ts-node --version
```

---

### Issue: "ModuleNotFoundError: No module named 'pandas'"

**Error message:**
```
ModuleNotFoundError: No module named 'pandas'
```

**Cause:** Missing Python dependencies.

**Solution:**
```bash
# Install required dependencies
pip3 install pandas openpyxl supabase python-dotenv

# Or use requirements.txt if provided:
pip3 install -r requirements.txt

# Verify installation
python3 -c "import pandas; print(pandas.__version__)"
```

---

### Issue: "No Excel files found"

**Error message:**
```
❌ Error: No Excel files found in directory
```

**Cause:** Zip file not extracted or wrong directory path.

**Solution:**
```bash
# Extract the zip file first
unzip Budgets-6_cities.zip

# Verify files extracted
ls -la "Budgets-6 cities/"

# Should show 26 .xlsx files

# Then run import with correct path:
bash 05_run_import.sh ./Budgets-6\ cities/
```

---

### Issue: Import script timeout

**Symptom:** Script hangs or takes >10 minutes

**Cause:** Network issues or very large dataset.

**Solution:**
```bash
# Check network connection
ping supabase.co

# Try importing smaller batches
# Edit the import script and change batch size:
# From: const batchSize = 500;
# To:   const batchSize = 100;

# Or import files one by one:
npx ts-node 03_import_pricing_data.ts ./Budgets-6\ cities/loose_furniture*.xlsx
```

---

### Issue: Duplicate key violations

**Error message:**
```
ERROR: duplicate key value violates unique constraint
```

**Cause:** Attempting to import data twice.

**Solution:**
```sql
-- Check existing data
SELECT category, COUNT(*) 
FROM pricing_items 
GROUP BY category;

-- If data already exists, delete before reimporting:
TRUNCATE pricing_items CASCADE;
TRUNCATE item_synonyms CASCADE;

-- Or use UPSERT in import script (already configured)
```

---

## 🎨 BUDGET GENERATION ISSUES

### Issue: "No items extracted from render"

**Symptom:** Budget generation completes but shows 0 items.

**Cause 1:** Gemini API key not set

**Solution:**
```bash
# In Lovable Functions dashboard:
# 1. Go to Functions → extract-budget-items
# 2. Click "Environment Variables"
# 3. Add: GOOGLE_AI_API_KEY = your_key_here
# 4. Save and redeploy

# Verify in function logs:
# Should see: ✅ API Key exists: true
```

**Cause 2:** Invalid or inaccessible image URL

**Solution:**
```sql
-- Check render image URLs
SELECT id, image_url 
FROM renders 
WHERE image_url IS NULL OR image_url = '';

-- Image URLs should start with:
-- https://YOUR_PROJECT.supabase.co/storage/v1/object/public/...

-- If missing, reupload render image
```

---

### Issue: All items show as "unmatched"

**Symptom:** Budget generated but all items have status='unmatched'

**Cause:** Pricing data not imported or synonyms not seeded.

**Solution:**
```sql
-- Verify pricing data exists
SELECT COUNT(*) FROM pricing_items;
-- Expected: 1,200+

-- Verify synonyms exist
SELECT COUNT(*) FROM item_synonyms;
-- Expected: 200+

-- Check sample data
SELECT * FROM pricing_items LIMIT 5;

-- If counts are 0, rerun import scripts
```

---

### Issue: Wrong materials detected

**Symptom:** Budget shows marble/chandeliers for industrial loft

**Cause:** Function doesn't have latest code with style-aware extraction.

**Solution:**
```bash
# 1. Verify function code has style detection:
# Check for: "PHASE 1: STYLE DETECTION FIRST"
# Check for: "getStyleSpecificInstructions"

# 2. If missing, pull latest code:
git pull origin main

# 3. Redeploy function in Lovable:
# Functions → extract-budget-items → Deploy

# 4. Test with Industrial Loft render again
```

---

### Issue: Extraction takes too long (>5 minutes)

**Symptom:** Budget generation stuck in "Generating..." state

**Cause:** Gemini API timeout or function timeout.

**Solution:**
```bash
# Check function timeout setting:
# Lovable → Functions → extract-budget-items → Settings
# Increase timeout to 300s (5 minutes)

# Check Gemini API rate limits:
# https://console.cloud.google.com/apis/api/generativelanguage.googleapis.com/quotas

# Monitor function logs for specific errors:
# Look for: "Gemini API error:" or "timeout"
```

---

## 🔍 MATCHING ISSUES

### Issue: Low match confidence (<50%)

**Symptom:** Many items matched with low confidence scores.

**Cause:** Item names not in synonym dictionary.

**Solution:**
```sql
-- Check which items are poorly matched
SELECT ai_item_name, match_confidence, match_strategy
FROM budget_items
WHERE match_confidence < 0.5
ORDER BY match_confidence ASC
LIMIT 20;

-- Add new synonyms for poorly matched items:
INSERT INTO item_synonyms (canonical_name, synonym, confidence, category_hint, source)
VALUES ('3-seater sofa', 'leather couch', 0.90, 'furniture', 'manual');

-- Then regenerate budget
```

---

### Issue: Wrong category assigned

**Symptom:** Lighting items showing as furniture, etc.

**Cause:** Category mapping in extraction needs adjustment.

**Solution:**
```sql
-- Check category distribution
SELECT category, COUNT(*) 
FROM budget_items 
GROUP BY category;

-- Manually correct category if needed:
UPDATE budget_items
SET category = 'lighting'
WHERE item_name ILIKE '%light%' 
  OR item_name ILIKE '%lamp%'
  OR item_name ILIKE '%chandelier%';

-- Or improve extraction prompt to be more specific
```

---

## 💰 PRICING ISSUES

### Issue: Prices are $0 or NULL

**Symptom:** Budget items have rate=0 or null.

**Cause:** Missing price data in pricing_items table.

**Solution:**
```sql
-- Find items with missing prices
SELECT item_name, category, 
       budget_price, mid_premium_price, premium_price
FROM pricing_items
WHERE budget_price IS NULL 
   OR budget_price = 0
LIMIT 20;

-- Update missing prices manually or reimport data
-- Make sure Excel files have price columns filled
```

---

### Issue: Prices don't match city multipliers

**Symptom:** Mumbai prices same as Hyderabad (should be 1.25x higher)

**Cause:** City multiplier not applied in pricing calculation.

**Solution:**
```sql
-- Check city multipliers exist
SELECT * FROM cities;

-- Verify pricing_items has multiplier columns
SELECT hyderabad_multiplier, mumbai_multiplier, delhi_multiplier
FROM pricing_items
LIMIT 5;

-- If multipliers are all 1.0, reimport data
-- Check Excel files have city-specific rates
```

---

### Issue: GST calculation incorrect

**Symptom:** GST amount doesn't match expected percentage.

**Cause:** GST rate not set correctly in pricing_items.

**Solution:**
```sql
-- Check GST rates
SELECT DISTINCT category, gst_percent
FROM pricing_items
ORDER BY category;

-- Expected GST rates:
-- furniture: 18%
-- hinges/channels: 12%
-- stone/granite/quartz: 28%
-- raw materials: 5%

-- Update incorrect GST rates:
UPDATE pricing_items
SET gst_percent = 18
WHERE category = 'furniture' AND gst_percent != 18;
```

---

## 🔐 AUTHENTICATION ISSUES

### Issue: "Authentication failed" during import

**Error message:**
```
Error: Authentication failed for Supabase
```

**Cause:** Invalid or expired API keys.

**Solution:**
```bash
# 1. Get fresh keys from Lovable:
# Settings → Environment Variables
# Copy: VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY

# 2. Update .env file:
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbG...fresh_key

# 3. For data import, use service_role key:
SUPABASE_SERVICE_ROLE_KEY=eyJhbG...service_role_key

# 4. Verify connection:
curl https://YOUR_PROJECT.supabase.co/rest/v1/pricing_items?select=count \
  -H "apikey: YOUR_ANON_KEY"
```

---

## 📱 UI ISSUES

### Issue: Budget button doesn't appear

**Symptom:** No "Generate Budget" button visible.

**Cause:** UI component not rendered or permissions issue.

**Solution:**
```javascript
// Check React component rendering:
// 1. Open browser console (F12)
// 2. Look for errors related to Budget component
// 3. Check if user has permission to generate budgets

// Verify button is in code:
// src/pages/RoomDetail.tsx or Budget.tsx
// Look for: <Button onClick={generateBudget}>

// Check render status:
SELECT id, status, approved_at 
FROM renders 
WHERE room_id = 'YOUR_ROOM_ID';

// Budget generation only works for approved renders
```

---

### Issue: Budget items not displaying

**Symptom:** Budget generated but table is empty.

**Cause:** Frontend query error or RLS (Row Level Security) blocking access.

**Solution:**
```sql
-- Check if data exists in database
SELECT COUNT(*) FROM budget_items WHERE project_id = 'YOUR_PROJECT_ID';

-- If count > 0 but UI shows nothing:
-- Check RLS policies:
SELECT * FROM pg_policies WHERE tablename = 'budget_items';

-- Ensure user has access:
-- RLS policy should allow SELECT for authenticated users
```

---

## 🚀 PERFORMANCE OPTIMIZATION

### Slow budget generation (>2 minutes)

**Fixes:**

1. **Add database indexes:**
```sql
CREATE INDEX idx_budget_project_room ON budget_items(project_id, room_id);
CREATE INDEX idx_pricing_category_active ON pricing_items(category, is_active);
```

2. **Increase function timeout:**
```
Lovable → Functions → extract-budget-items → Settings
Set timeout to 300s (5 minutes)
```

3. **Optimize Gemini API calls:**
```typescript
// Reduce image quality for faster processing:
const imageData = await fetchImageAsBase64(imageUrl, { quality: 0.8 });
```

---

## 📞 STILL STUCK?

**Last resort checks:**

1. **Environment Variables:**
   ```bash
   # Verify all required vars set:
   echo $VITE_SUPABASE_URL
   echo $VITE_SUPABASE_PUBLISHABLE_KEY
   echo $GOOGLE_AI_API_KEY
   ```

2. **Function Logs:**
   ```
   Check: Lovable → Functions → extract-budget-items → Logs
   Look for specific error messages
   ```

3. **Database Logs:**
   ```
   Check: Supabase Dashboard → Logs → Postgres Logs
   Look for query errors or slow queries
   ```

4. **Network Issues:**
   ```bash
   # Test connectivity:
   curl -I https://YOUR_PROJECT.supabase.co
   curl -I https://generativelanguage.googleapis.com
   ```

5. **Start Fresh:**
   ```sql
   -- Nuclear option: Drop all tables and restart
   DROP TABLE IF EXISTS budget_items CASCADE;
   DROP TABLE IF EXISTS item_synonyms CASCADE;
   DROP TABLE IF EXISTS pricing_items CASCADE;
   
   -- Then rerun all migrations and imports from scratch
   ```

---

**Need more help?** Check the full documentation:
- `06_DEPLOYMENT_GUIDE.md` - Complete deployment steps
- `07_LOVABLE_INSTRUCTIONS.md` - Lovable-specific instructions
- `BUDGET_MODULE_IMPLEMENTATION_COMPLETE.md` - Technical details
