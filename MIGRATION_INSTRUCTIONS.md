# 🚀 Database Migration Instructions

## ⚠️ CRITICAL: Apply These Migrations NOW

The app shows "No presets available" because database migrations haven't been applied to production.

---

## 📋 What Will Be Applied

### Migration 1: AI Recommendations System (20251230135838)
- Creates `ai_recommendations` table (18+ fields)
- Creates `recommendation_feedback` table (12+ fields)
- Creates `style_library` table (11+ fields)
- Adds indexes for performance
- Sets up RLS policies for security

### Migration 2: Seed Data (20251230113257)
- Inserts **169 Smart Defaults** (13 styles × 14 room types)
- Inserts **168 Style Templates** for AI recommendations
- Data includes: specifications, checklist items, finishes, variations

---

## 🎯 How to Apply (3 Options)

### Option 1: Supabase Dashboard (EASIEST - 2 minutes)

1. **Open Supabase Dashboard**
   - Go to your Lovable project's Supabase instance
   - Navigate to: **SQL Editor** → **New Query**

2. **Copy & Paste**
   - Open: `APPLY_ALL_MIGRATIONS.sql`
   - Select ALL content (Ctrl+A)
   - Copy (Ctrl+C)
   - Paste into SQL Editor (Ctrl+V)

3. **Run Query**
   - Click **Run** or press `Ctrl+Enter`
   - Wait for "Success" message (~30 seconds)

4. **Verify**
   ```sql
   -- Check smart_defaults count (should be 169)
   SELECT COUNT(*) FROM public.smart_defaults;
   
   -- Check style_library count (should be 168)
   SELECT COUNT(*) FROM public.style_library;
   
   -- Check ai_recommendations table exists
   SELECT * FROM public.ai_recommendations LIMIT 1;
   ```

---

### Option 2: Supabase CLI (if you have CLI installed)

```bash
cd /home/user/webapp
supabase db push
```

---

### Option 3: Manual Migration (if above fail)

**Step 1: Apply AI Recommendations System**
```bash
# Copy migration 1 content
cat supabase/migrations/20251230135838_create_ai_recommendations_system.sql
# Run in Supabase SQL Editor
```

**Step 2: Apply Seed Data**
```bash
# Copy migration 2 content
cat supabase/migrations/20251230113257_seed_smart_defaults_and_style_library.sql
# Run in Supabase SQL Editor
```

---

## ✅ Expected Results

### Before Migration:
- ❌ "No presets available for Dining Room"
- ❌ Empty smart_defaults table
- ❌ Empty style_library table
- ❌ ai_recommendations table doesn't exist

### After Migration:
- ✅ 169 smart defaults loaded
- ✅ 168 style templates available
- ✅ AI Recommendations system operational
- ✅ Style selector shows 13 options:
  - Contemporary
  - Traditional
  - Modern Indian
  - Minimalist
  - Scandinavian
  - Mid-Century Modern
  - Industrial
  - Coastal Indian
  - Traditional Indian
  - Transitional
  - Eclectic
  - Art Deco
  - Bohemian
  - Japandi

---

## 🔍 Verification Queries

Run these in Supabase SQL Editor to verify success:

```sql
-- 1. Check Smart Defaults
SELECT 
  style,
  room_type,
  COUNT(*) 
FROM public.smart_defaults 
GROUP BY style, room_type 
ORDER BY style, room_type;

-- 2. Check Style Library
SELECT 
  style_name,
  COUNT(*) as template_count
FROM public.style_library
GROUP BY style_name
ORDER BY style_name;

-- 3. Test Smart Defaults Function
SELECT * FROM public.get_smart_default('Contemporary', 'Living Room');

-- 4. Test Available Styles Function
SELECT * FROM public.get_available_styles();

-- 5. Check RLS Policies
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd
FROM pg_policies
WHERE schemaname = 'public'
  AND tablename IN ('smart_defaults', 'style_library', 'ai_recommendations', 'recommendation_feedback')
ORDER BY tablename, policyname;
```

---

## 🆘 Troubleshooting

### Error: "relation does not exist"
- **Cause**: Migration 1 not applied
- **Fix**: Run Migration 1 first (create tables)

### Error: "duplicate key value violates unique constraint"
- **Cause**: Seed data already exists
- **Fix**: Skip Migration 2 or delete existing data first:
  ```sql
  TRUNCATE TABLE public.smart_defaults CASCADE;
  TRUNCATE TABLE public.style_library CASCADE;
  ```

### Error: "permission denied"
- **Cause**: Insufficient permissions
- **Fix**: Ensure you're logged in as database owner/admin

---

## 📞 Support

If you encounter issues:
1. Check Supabase logs in Dashboard → Logs
2. Verify your database connection
3. Ensure you have admin/owner permissions
4. Try running migrations one at a time

---

## 🎉 What's Next After Migration?

Once migrations are applied:
1. Refresh your app
2. Navigate to Phase 4: Customize
3. Select a style (e.g., "Contemporary")
4. You should see smart defaults appear!
5. The "No presets available" error should be gone

---

**Last Updated**: December 30, 2025  
**Migration Files**: 
- `20251230135838_create_ai_recommendations_system.sql`
- `20251230113257_seed_smart_defaults_and_style_library.sql`
- `APPLY_ALL_MIGRATIONS.sql` (combined)
