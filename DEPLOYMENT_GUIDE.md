# 🚀 BUDGET MODULE DEPLOYMENT GUIDE

## Files to Deploy to Your Lovable Project

### 📂 Repository Structure

```
houspire-project-hub/
├── supabase/
│   ├── migrations/
│   │   └── 20260101_create_budget_system_tables.sql    ← RUN IN SUPABASE SQL EDITOR
│   └── functions/
│       └── extract-budget-items/
│           └── index.ts                                 ← DEPLOY AS EDGE FUNCTION
├── src/
│   ├── components/
│   │   └── budget/
│   │       └── BudgetReviewPanel.tsx                    ← ADD TO YOUR REPO
│   └── hooks/
│       └── useRenderApproval.ts                         ← ADD TO YOUR REPO
└── scripts/
    └── import_pricing_data.py                           ← RUN LOCALLY
```

---

## 🗂️ FILES THAT NEED TO BE MIGRATED TO SUPABASE

### **1. Database Migration (CRITICAL - DO FIRST)**

**File:** `/home/user/migrations/20260101_create_budget_system_tables.sql`

**Where to run:** Lovable Dashboard → Supabase → SQL Editor

**Steps:**
1. Open your Lovable project: `https://lovable.dev/projects/{YOUR_PROJECT_ID}`
2. Click **"Database"** in left sidebar
3. Click **"SQL Editor"**
4. Copy contents of `20260101_create_budget_system_tables.sql`
5. Paste into SQL Editor
6. Click **"Run"**
7. Wait for success message (should take 5-10 seconds)

**What this creates:**
- ✅ `pricing_items` table (master pricing database)
- ✅ `cities` table (6 cities pre-seeded)
- ✅ `budget_items` table (AI-matched items per render)
- ✅ `item_synonyms` table (50+ pre-seeded synonyms)
- ✅ `budget_exports` table (export tracking)
- ✅ RLS policies, triggers, indexes, foreign keys

**Verification:**
Run this query in SQL Editor:
```sql
SELECT COUNT(*) as cities_count FROM cities;
SELECT COUNT(*) as synonyms_count FROM item_synonyms;
```
Expected: `cities_count: 6`, `synonyms_count: 50+`

---

### **2. Edge Function Deployment**

**File:** `/home/user/supabase-functions/extract-budget-items/index.ts`

**Where to deploy:** Lovable Dashboard → Supabase → Edge Functions

**Steps:**
1. In Lovable project, click **"Functions"** in left sidebar
2. Click **"New Function"**
3. Name: `extract-budget-items`
4. Copy contents of `index.ts` file
5. Paste into function editor
6. Add environment variable: `GEMINI_API_KEY` (get from https://aistudio.google.com/apikey)
7. Click **"Deploy"**

**Alternative (via CLI):**
```bash
cd houspire-project-hub
supabase functions deploy extract-budget-items
```

**Test the function:**
```bash
curl -X POST 'https://nvnxptkgksuhfcpmungq.supabase.co/functions/v1/extract-budget-items' \
  -H 'Authorization: Bearer YOUR_ANON_KEY' \
  -H 'Content-Type: application/json' \
  -d '{"render_id": "test-render-id", "project_id": "test-project-id", "room_id": "test-room-id"}'
```

**What this does:**
- Analyzes approved renders using Gemini 2.0 Flash Vision
- Extracts furniture, finishes, fixtures from images
- Matches items to pricing database (4-strategy algorithm)
- Calculates city-specific prices + GST
- Inserts into `budget_items` table
- Sends notification to user

---

## 📁 FILES TO ADD TO YOUR GIT REPOSITORY

### **3. Budget Review UI Component**

**File:** `/home/user/components/BudgetReviewPanel.tsx`

**Where to add:** `src/components/budget/BudgetReviewPanel.tsx`

**Steps:**
1. In your local repo: `mkdir -p src/components/budget`
2. Copy `BudgetReviewPanel.tsx` to this folder
3. Add to git: `git add src/components/budget/BudgetReviewPanel.tsx`

**Usage in your Budget page:**
```tsx
import { BudgetReviewPanel } from '@/components/budget/BudgetReviewPanel'

export default function BudgetPage() {
  const { projectId, roomId, renderId } = useParams()
  
  return (
    <div className="container mx-auto p-6">
      <BudgetReviewPanel 
        projectId={projectId}
        roomId={roomId}
        renderId={renderId}
      />
    </div>
  )
}
```

**What this provides:**
- ✅ Display all AI-extracted items
- ✅ Confidence indicators (High/Medium/Low)
- ✅ Match strategy badges (Exact/Synonym/Fuzzy/LLM)
- ✅ Edit quantity, price, notes
- ✅ Approve/Reject items
- ✅ Alternative matches dropdown
- ✅ Budget summary (Subtotal + GST = Total)
- ✅ Export to Excel

---

### **4. Render Approval Hook**

**File:** `/home/user/hooks/useRenderApproval.ts`

**Where to add:** `src/hooks/useRenderApproval.ts`

**Steps:**
1. Copy file to `src/hooks/useRenderApproval.ts`
2. Add to git: `git add src/hooks/useRenderApproval.ts`

**Usage in your Render component:**
```tsx
import { useRenderApproval } from '@/hooks/useRenderApproval'

export function RenderApprovalButton({ renderId, projectId, roomId }) {
  const { mutate: approveRender, isPending } = useRenderApproval({
    onSuccess: () => {
      // Navigate to budget page
      navigate(`/projects/${projectId}/budget`)
    }
  })

  return (
    <Button 
      onClick={() => approveRender({ renderId, projectId, roomId })}
      disabled={isPending}
    >
      {isPending ? 'Approving...' : 'Approve & Generate Budget'}
    </Button>
  )
}
```

**What this does:**
- Updates render status to "approved"
- Triggers `extract-budget-items` Edge Function
- Shows progress toasts
- Invalidates relevant queries
- Navigates to budget review page

---

## 💾 DATA IMPORT (RUN LOCALLY)

### **5. Pricing Data Import Script**

**File:** `/home/user/scripts/import_pricing_data.py`

**Where to run:** Your local machine (NOT in Lovable)

**Prerequisites:**
```bash
pip install pandas openpyxl supabase python-dotenv
```

**Environment setup:**
Create `.env` file in project root:
```env
VITE_SUPABASE_URL=https://nvnxptkgksuhfcpmungq.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

**Run the script:**
```bash
cd houspire-project-hub
python scripts/import_pricing_data.py
```

**What this does:**
- Parses all 27 Excel files
- Extracts ~1,200+ pricing items
- Cleans and normalizes data
- Assigns GST rates automatically
- Generates synonyms for each item
- Uploads to `pricing_items` table in batches

**Expected output:**
```
============================================================
🏗️  HOUSPIRE BUDGET MODULE - DATA IMPORT PIPELINE
============================================================

📦 Parsing Loose Furniture...
   ✅ Parsed 138 furniture items

🔨 Parsing plywood...
   ✅ Parsed 24 plywood items

[... continues for all 27 files ...]

============================================================
📊 TOTAL ITEMS PARSED: 1,247
============================================================

📤 Uploading 1,247 items to Supabase...
   ✅ Uploaded batch 1/13
   ✅ Uploaded batch 2/13
   [...]
   ✅ Uploaded batch 13/13

✅ DATA IMPORT COMPLETE!

📋 Summary:
   • Total items imported: 1,247
   • Categories covered: 26
   • Cities: 5 (Hyderabad, Delhi, Bangalore, Pune, Mumbai)
   • Budget tiers: 3 (Budget, Mid-Premium, Premium)
```

**Verification:**
In Supabase SQL Editor:
```sql
SELECT COUNT(*) as total_items FROM pricing_items;
SELECT category, COUNT(*) as count FROM pricing_items GROUP BY category ORDER BY count DESC;
```

---

## 🔗 INTEGRATION CHECKLIST

### ✅ Step-by-step deployment:

- [ ] **1. Apply Database Migration** (Supabase SQL Editor)
  - Run `20260101_create_budget_system_tables.sql`
  - Verify tables created: `SELECT * FROM cities;`

- [ ] **2. Deploy Edge Function** (Lovable Functions)
  - Deploy `extract-budget-items/index.ts`
  - Add `GEMINI_API_KEY` env variable
  - Test with curl command

- [ ] **3. Import Pricing Data** (Local Python script)
  - Install dependencies: `pip install pandas openpyxl supabase python-dotenv`
  - Create `.env` with Supabase credentials
  - Run `python scripts/import_pricing_data.py`
  - Verify in Supabase: `SELECT COUNT(*) FROM pricing_items;`

- [ ] **4. Add UI Components to Repo**
  - Copy `BudgetReviewPanel.tsx` → `src/components/budget/`
  - Copy `useRenderApproval.ts` → `src/hooks/`
  - Git commit and push

- [ ] **5. Update Render Approval Flow**
  - Import `useRenderApproval` hook in your render component
  - Replace existing approval button with new hook
  - Test: Approve render → Wait 30-60s → Check budget_items table

- [ ] **6. Add Budget Route** (if not exists)
  - Route: `/projects/:projectId/budget`
  - Component: Import `BudgetReviewPanel`
  - Protected route with authentication

- [ ] **7. Test End-to-End**
  - Create project → Add room → Upload image
  - Complete Phase 1-5 (Upload → Analyze → Clean → Customize → Generate)
  - Approve render
  - Wait for notification "Budget extraction complete"
  - Navigate to Budget page
  - Review items, edit quantities/prices
  - Approve items
  - Export to Excel

---

## 🔧 TROUBLESHOOTING

### Issue: "pricing_items table not found"
**Solution:** Run the migration script first (Step 1)

### Issue: "extract-budget-items function not found"
**Solution:** Deploy Edge Function (Step 2) and verify in Supabase dashboard

### Issue: "GEMINI_API_KEY not set"
**Solution:** Add environment variable in Lovable Functions → Settings → Environment Variables

### Issue: "No items extracted"
**Solution:** Check Edge Function logs in Supabase dashboard → Functions → extract-budget-items → Logs

### Issue: "Import script fails with connection error"
**Solution:** Verify `.env` file has correct Supabase URL and anon key (NOT service role key for local testing)

### Issue: "Budget items show 'unmatched' status"
**Solution:** 
1. Verify pricing data imported successfully: `SELECT COUNT(*) FROM pricing_items;`
2. Check item_synonyms table: `SELECT COUNT(*) FROM item_synonyms;`
3. Review Edge Function logs for matching errors

---

## 📊 DATABASE SCHEMA REFERENCE

### Key Tables:

**pricing_items** (Master pricing database)
- `id` - UUID primary key
- `category` - loose_furniture, plywood, laminates, etc.
- `room_category` - living_room, bedroom, kitchen, universal
- `item_name` - "3-Seater Sofa", "Plywood 18mm", etc.
- `hyderabad_price`, `delhi_price`, `bangalore_price`, `pune_price`, `mumbai_price`, `chennai_price`
- `budget_tier` - budget, mid_premium, premium
- `gst_rate` - 12 or 18
- `recommended_brands` - JSON array
- `synonyms` - TEXT array for matching

**budget_items** (Per-render extracted items)
- `id` - UUID primary key
- `project_id`, `room_id`, `render_id` - Foreign keys
- `ai_item_name` - Extracted by AI
- `ai_confidence` - 0.0-1.0
- `pricing_item_id` - Matched pricing item (nullable)
- `match_strategy` - exact, synonym, fuzzy, llm
- `quantity` - User-editable
- `city_price` - Calculated based on project city
- `subtotal`, `gst_amount`, `total` - Auto-calculated
- `status` - pending, approved, rejected, unmatched
- `user_edited` - Boolean flag

**cities** (City pricing multipliers)
- Pre-seeded with 6 cities: Hyderabad, Delhi/Gurgaon, Bangalore, Pune, Mumbai, Chennai

---

## 🎯 NEXT STEPS AFTER DEPLOYMENT

1. **Test with real renders** - Upload actual room photos and approve
2. **Refine AI prompts** - Update Gemini prompt in Edge Function if extraction quality is low
3. **Add Kitchen/Wardrobe calculators** - Integrate specialized BOQ calculators
4. **Implement PDF export** - Add jsPDF functionality for professional quotes
5. **Vendor integration** - Connect budget items to verified vendor network
6. **Budget templates** - Create pre-configured budget templates by room type

---

## 📞 SUPPORT

If you encounter issues:
1. Check Supabase logs: Dashboard → Functions → extract-budget-items → Logs
2. Verify database tables: SQL Editor → `\dt` (list tables)
3. Test Edge Function: Use curl command from this guide
4. Review console errors in browser DevTools

---

**🚀 You're all set! Let me know when you've deployed and I'll help with testing.**
