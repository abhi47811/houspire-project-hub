#!/bin/bash

# Quick Migration Application Script
# This script helps apply the missing database migrations

echo "🚀 HOUSPIRE - Database Migration Application Script"
echo "=================================================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Not in project root directory"
    echo "Please run this script from /home/user/webapp"
    exit 1
fi

echo "✅ Project directory verified"
echo ""

# List migrations that need to be applied
echo "📋 Migrations to apply:"
echo ""
echo "1. 20251230135838_create_ai_recommendations_system.sql"
echo "   - Creates AI Recommendations tables"
echo "   - Creates indexes and RLS policies"
echo "   - Enables realtime"
echo ""
echo "2. 20251230113257_seed_smart_defaults_and_style_library.sql"
echo "   - Seeds 169 smart defaults"
echo "   - Seeds 168 style library templates"
echo ""

# Ask user to confirm
read -p "Do you want to see the Supabase Dashboard instructions? (y/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo ""
    echo "📖 HOW TO APPLY MIGRATIONS VIA SUPABASE DASHBOARD:"
    echo "=================================================="
    echo ""
    echo "Step 1: Open Supabase Dashboard"
    echo "  → Go to: https://supabase.com/dashboard"
    echo "  → Select your project: houspire-project-hub"
    echo ""
    echo "Step 2: Open SQL Editor"
    echo "  → Click 'SQL Editor' in left sidebar"
    echo "  → Click '+ New Query' button"
    echo ""
    echo "Step 3: Apply Migration 1"
    echo "  → Copy contents of:"
    echo "    supabase/migrations/20251230135838_create_ai_recommendations_system.sql"
    echo "  → Paste into SQL Editor"
    echo "  → Click 'Run' or press Ctrl+Enter"
    echo "  → Wait for success message"
    echo ""
    echo "Step 4: Apply Migration 2"
    echo "  → Create another new query"
    echo "  → Copy contents of:"
    echo "    supabase/migrations/20251230113257_seed_smart_defaults_and_style_library.sql"
    echo "  → Paste into SQL Editor"
    echo "  → Click 'Run' or press Ctrl+Enter"
    echo "  → Wait for success message (will take longer due to data)"
    echo ""
    echo "Step 5: Verify"
    echo "  → Go to 'Table Editor'"
    echo "  → Check tables exist: smart_defaults, style_library, ai_recommendations"
    echo "  → Check smart_defaults has ~169 rows"
    echo "  → Check style_library has ~168 rows"
    echo ""
    echo "Step 6: Test Application"
    echo "  → Open your app"
    echo "  → Hard refresh (Ctrl+Shift+R)"
    echo "  → Go to PhaseCustomize"
    echo "  → Verify: No more 'No presets available' message"
    echo "  → Verify: See 13 design styles"
    echo ""
fi

echo ""
read -p "Do you want to copy migration 1 SQL to clipboard? (y/n) " -n 1 -r
echo ""

if [[ $REPLY =~ ^[Yy]$ ]]; then
    if command -v xclip &> /dev/null; then
        cat supabase/migrations/20251230135838_create_ai_recommendations_system.sql | xclip -selection clipboard
        echo "✅ Migration 1 SQL copied to clipboard!"
    elif command -v pbcopy &> /dev/null; then
        cat supabase/migrations/20251230135838_create_ai_recommendations_system.sql | pbcopy
        echo "✅ Migration 1 SQL copied to clipboard!"
    else
        echo "⚠️  Clipboard tool not found. Please manually copy the file:"
        echo "   supabase/migrations/20251230135838_create_ai_recommendations_system.sql"
    fi
fi

echo ""
echo "📊 Migration File Sizes:"
echo "  Migration 1: $(wc -c < supabase/migrations/20251230135838_create_ai_recommendations_system.sql) bytes"
echo "  Migration 2: $(wc -c < supabase/migrations/20251230113257_seed_smart_defaults_and_style_library.sql) bytes"
echo ""

echo "🎯 QUICK VERIFICATION SQL:"
echo "========================="
echo ""
echo "-- After applying migrations, run this in SQL Editor:"
echo ""
echo "-- Check tables exist"
echo "SELECT table_name FROM information_schema.tables"
echo "WHERE table_schema = 'public'"
echo "AND table_name IN ('smart_defaults', 'style_library', 'ai_recommendations');"
echo ""
echo "-- Check data counts"
echo "SELECT 'smart_defaults' as table_name, COUNT(*) as rows FROM smart_defaults"
echo "UNION ALL"
echo "SELECT 'style_library', COUNT(*) FROM style_library"
echo "UNION ALL"
echo "SELECT 'ai_recommendations', COUNT(*) FROM ai_recommendations;"
echo ""
echo "-- Test smart defaults function"
echo "SELECT * FROM get_smart_default('Contemporary', 'Dining Room');"
echo ""

echo "✅ Script complete!"
echo ""
echo "🚀 Next Steps:"
echo "1. Apply migrations via Supabase Dashboard (see instructions above)"
echo "2. Run verification SQL"
echo "3. Hard refresh your app (Ctrl+Shift+R)"
echo "4. Test PhaseCustomize page"
echo "5. Verify 'No presets available' is gone!"
echo ""
