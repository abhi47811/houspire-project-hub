#!/bin/bash
# Houspire Data Import Script
# Run this from the project root directory

echo "=========================================="
echo "🏗️  HOUSPIRE - DATA IMPORT SETUP"
echo "=========================================="

# Check Python
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 not found. Please install Python 3."
    exit 1
fi
echo "✅ Python 3 found"

# Install dependencies
echo ""
echo "📥 Installing Python dependencies..."
pip3 install --quiet pandas openpyxl supabase python-dotenv
echo "✅ Dependencies installed"

# Create .env if not exists
if [ ! -f ".env" ]; then
    echo ""
    echo "📝 Creating .env file..."
    cat > .env << 'EOF'
VITE_SUPABASE_URL=https://nvnxptkgksuhfcpmungq.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im52bnhwdGtna3N1aGZjcG11bmdxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY4MDE3OTMsImV4cCI6MjA4MjM3Nzc5M30.rxcOYBa0rJwEFCqkD52H_8vkN-9j92zIQOT3aO_VqZM
EOF
    echo "✅ .env created"
fi

# Check for ZIP file
ZIP_FILE=""
if [ -f "budget_data/Budgets-6_cities.zip" ]; then
    ZIP_FILE="budget_data/Budgets-6_cities.zip"
elif [ -f "budget_data/Budgets-6_cities-20260101T034741Z-1-001-2.zip" ]; then
    ZIP_FILE="budget_data/Budgets-6_cities-20260101T034741Z-1-001-2.zip"
else
    # Find any zip file
    ZIP_FILE=$(find . -name "*Budget*.zip" -o -name "*cities*.zip" 2>/dev/null | head -1)
fi

if [ -z "$ZIP_FILE" ]; then
    echo ""
    echo "❌ No ZIP file found!"
    echo "   Please place your Budgets ZIP file in the budget_data/ folder"
    exit 1
fi
echo "✅ Found ZIP file: $ZIP_FILE"

# Run the import
echo ""
echo "🚀 Starting data import..."
echo "   This may take 5-15 minutes depending on file size..."
echo ""
python3 scripts/import_pricing_data.py "$ZIP_FILE"

echo ""
echo "=========================================="
echo "✅ SCRIPT COMPLETE"
echo "=========================================="
