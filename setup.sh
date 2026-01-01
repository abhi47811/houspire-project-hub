#!/bin/bash

# Houspire Budget Module - Quick Setup Script
# This script automates the entire deployment process

set -e  # Exit on error

echo "============================================================"
echo "🚀 HOUSPIRE BUDGET MODULE - QUICK SETUP"
echo "============================================================"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if running in Houspire project root
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: package.json not found. Please run this script from project root.${NC}"
    exit 1
fi

echo -e "${YELLOW}📋 Prerequisites Check...${NC}"

# Check Python
if ! command -v python3 &> /dev/null; then
    echo -e "${RED}❌ Python 3 not found. Please install Python 3.${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Python 3 found${NC}"

# Check pip
if ! command -v pip3 &> /dev/null; then
    echo -e "${RED}❌ pip3 not found. Please install pip.${NC}"
    exit 1
fi
echo -e "${GREEN}✅ pip3 found${NC}"

# Check Node
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js not found. Please install Node.js.${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Node.js found${NC}"

# Check Supabase CLI (optional)
if command -v supabase &> /dev/null; then
    echo -e "${GREEN}✅ Supabase CLI found${NC}"
    HAS_SUPABASE_CLI=true
else
    echo -e "${YELLOW}⚠️  Supabase CLI not found. Edge function deployment will be manual.${NC}"
    HAS_SUPABASE_CLI=false
fi

echo ""
echo -e "${YELLOW}📦 Installing Python dependencies...${NC}"
pip3 install -q pandas openpyxl supabase python-dotenv

echo ""
echo -e "${YELLOW}📁 Creating directory structure...${NC}"
mkdir -p src/components/budget
mkdir -p src/hooks
mkdir -p supabase/functions/extract-budget-items
mkdir -p scripts

echo ""
echo -e "${YELLOW}📄 Copying files...${NC}"

# Copy migration SQL
if [ -f "/home/user/migrations/20260101_create_budget_system_tables.sql" ]; then
    mkdir -p supabase/migrations
    cp /home/user/migrations/20260101_create_budget_system_tables.sql supabase/migrations/
    echo -e "${GREEN}✅ Migration SQL copied${NC}"
else
    echo -e "${RED}❌ Migration SQL not found at /home/user/migrations/${NC}"
fi

# Copy Edge Function
if [ -f "/home/user/supabase-functions/extract-budget-items/index.ts" ]; then
    cp /home/user/supabase-functions/extract-budget-items/index.ts supabase/functions/extract-budget-items/
    echo -e "${GREEN}✅ Edge Function copied${NC}"
else
    echo -e "${RED}❌ Edge Function not found${NC}"
fi

# Copy React components
if [ -f "/home/user/components/BudgetReviewPanel.tsx" ]; then
    cp /home/user/components/BudgetReviewPanel.tsx src/components/budget/
    echo -e "${GREEN}✅ BudgetReviewPanel.tsx copied${NC}"
else
    echo -e "${RED}❌ BudgetReviewPanel.tsx not found${NC}"
fi

# Copy hooks
if [ -f "/home/user/hooks/useRenderApproval.ts" ]; then
    cp /home/user/hooks/useRenderApproval.ts src/hooks/
    echo -e "${GREEN}✅ useRenderApproval.ts copied${NC}"
else
    echo -e "${RED}❌ useRenderApproval.ts not found${NC}"
fi

# Copy import script
if [ -f "/home/user/scripts/import_pricing_data.py" ]; then
    cp /home/user/scripts/import_pricing_data.py scripts/
    echo -e "${GREEN}✅ import_pricing_data.py copied${NC}"
else
    echo -e "${RED}❌ import_pricing_data.py not found${NC}"
fi

echo ""
echo -e "${YELLOW}🔐 Checking environment variables...${NC}"

if [ ! -f ".env" ]; then
    echo -e "${RED}❌ .env file not found. Creating template...${NC}"
    cat > .env << 'EOF'
VITE_SUPABASE_URL=https://nvnxptkgksuhfcpmungq.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
GEMINI_API_KEY=your_gemini_api_key_here
EOF
    echo -e "${YELLOW}⚠️  Please update .env with your actual keys${NC}"
else
    echo -e "${GREEN}✅ .env file exists${NC}"
fi

echo ""
echo "============================================================"
echo -e "${GREEN}✅ FILE SETUP COMPLETE!${NC}"
echo "============================================================"
echo ""
echo "📋 NEXT STEPS:"
echo ""
echo "1. 🗄️  APPLY DATABASE MIGRATION"
echo "   - Open Lovable Dashboard → Database → SQL Editor"
echo "   - Copy contents of: supabase/migrations/20260101_create_budget_system_tables.sql"
echo "   - Paste and click 'Run'"
echo ""
echo "2. ⚡ DEPLOY EDGE FUNCTION"
if [ "$HAS_SUPABASE_CLI" = true ]; then
    echo "   Run: supabase functions deploy extract-budget-items"
else
    echo "   - Open Lovable Dashboard → Functions → New Function"
    echo "   - Name: extract-budget-items"
    echo "   - Copy contents of: supabase/functions/extract-budget-items/index.ts"
    echo "   - Add env var: GEMINI_API_KEY"
fi
echo ""
echo "3. 💾 IMPORT PRICING DATA"
echo "   - Ensure pricing Excel files are in /home/user/budget_data/Budgets-6 cities/"
echo "   - Update .env with Supabase credentials"
echo "   - Run: python3 scripts/import_pricing_data.py"
echo ""
echo "4. 🚀 DEPLOY TO LOVABLE"
echo "   - git add ."
echo "   - git commit -m 'Add budget module'"
echo "   - git push origin main"
echo ""
echo "5. ✅ TEST THE SYSTEM"
echo "   - Create project → Upload room → Approve render"
echo "   - Wait for notification"
echo "   - Check Budget page"
echo ""
echo "============================================================"
echo "📖 Full deployment guide: /home/user/DEPLOYMENT_GUIDE.md"
echo "============================================================"
