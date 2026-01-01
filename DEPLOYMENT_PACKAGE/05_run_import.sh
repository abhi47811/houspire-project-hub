#!/bin/bash

# =====================================================
# BUDGET MODULE - PRICING DATA IMPORT SCRIPT
# =====================================================
# This script imports all pricing data from Excel files
# into the Supabase pricing_items table
# =====================================================

set -e  # Exit on error

echo "🚀 Houspire Budget Module - Pricing Data Import"
echo "================================================"
echo ""

# Check if data directory provided
if [ -z "$1" ]; then
    echo "❌ Error: Please provide the path to Budgets-6 cities directory"
    echo ""
    echo "Usage:"
    echo "  bash 05_run_import.sh /path/to/Budgets-6\\ cities/"
    echo ""
    echo "Example:"
    echo "  bash 05_run_import.sh ./Budgets-6\\ cities/"
    echo ""
    exit 1
fi

DATA_DIR="$1"

# Check if directory exists
if [ ! -d "$DATA_DIR" ]; then
    echo "❌ Error: Directory not found: $DATA_DIR"
    echo ""
    echo "Did you extract the zip file first?"
    echo "  unzip Budgets-6_cities.zip"
    echo ""
    exit 1
fi

# Check if Excel files exist
EXCEL_COUNT=$(find "$DATA_DIR" -name "*.xlsx" -o -name "*.xls" | wc -l)
if [ "$EXCEL_COUNT" -eq 0 ]; then
    echo "❌ Error: No Excel files found in $DATA_DIR"
    echo ""
    echo "Expected 26 Excel files with pricing data."
    echo "Please check the directory contents."
    echo ""
    exit 1
fi

echo "📁 Data directory: $DATA_DIR"
echo "📊 Found $EXCEL_COUNT Excel files"
echo ""

# Check if TypeScript is available
if command -v npx &> /dev/null; then
    echo "🔧 Using TypeScript importer (npx ts-node)..."
    echo ""
    
    # Check if dependencies are installed
    if [ ! -d "node_modules/xlsx" ] || [ ! -d "node_modules/@supabase/supabase-js" ]; then
        echo "📦 Installing dependencies..."
        npm install xlsx @supabase/supabase-js --silent
        echo ""
    fi
    
    # Run TypeScript importer
    npx ts-node 03_import_pricing_data.ts "$DATA_DIR"
    
elif command -v python3 &> /dev/null; then
    echo "🔧 Using Python importer (python3)..."
    echo ""
    
    # Check if dependencies are installed
    echo "📦 Checking Python dependencies..."
    python3 -c "import pandas, openpyxl, supabase, dotenv" 2>/dev/null || {
        echo "Installing Python dependencies..."
        pip3 install pandas openpyxl supabase python-dotenv --quiet
        echo ""
    }
    
    # Run Python importer
    python3 04_import_pricing_data.py "$DATA_DIR"
    
else
    echo "❌ Error: Neither Node.js (npx) nor Python 3 found"
    echo ""
    echo "Please install one of:"
    echo "  - Node.js (for TypeScript importer): https://nodejs.org"
    echo "  - Python 3 (for Python importer): https://python.org"
    echo ""
    exit 1
fi

echo ""
echo "✅ Import complete!"
echo ""
echo "📊 Next steps:"
echo "  1. Verify data imported:"
echo "     SELECT COUNT(*) FROM pricing_items;"
echo ""
echo "  2. Check categories:"
echo "     SELECT DISTINCT category FROM pricing_items;"
echo ""
echo "  3. Test budget generation in the app"
echo ""
