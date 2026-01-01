#!/usr/bin/env python3
"""
HOUSPIRE BUDGET MODULE - COMPREHENSIVE PRICING DATA IMPORT
Import all 26 Excel files from "Budgets-6 cities" into pricing_items table

Version: 1.0
Date: January 2026
"""

import os
import sys
import re
import pandas as pd
from pathlib import Path
from typing import Dict, List, Any, Optional
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

try:
    from supabase import create_client, Client
except ImportError:
    print("❌ Missing supabase-py. Install with: pip3 install supabase")
    sys.exit(1)

# ============================================================================
# CONFIGURATION
# ============================================================================

SUPABASE_URL = os.getenv('VITE_SUPABASE_URL') or os.getenv('SUPABASE_URL')
SUPABASE_KEY = os.getenv('VITE_SUPABASE_SERVICE_ROLE_KEY') or os.getenv('VITE_SUPABASE_ANON_KEY')

if not SUPABASE_URL or not SUPABASE_KEY:
    print("❌ Missing Supabase credentials!")
    print("   Set VITE_SUPABASE_URL and VITE_SUPABASE_SERVICE_ROLE_KEY in .env")
    sys.exit(1)

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# City multipliers from Module 07
CITY_MULTIPLIERS = {
    'hyderabad': 1.10,
    'delhi': 1.20,
    'bangalore': 1.15,
    'pune': 1.05,
    'mumbai': 1.25,
    'chennai': 1.10,
}

# GST rates by category (from Module 07)
GST_RATES = {
    'furniture': 18,
    'flooring': 18,
    'lighting': 18,
    'hardware': 18,
    'decor': 18,
    'materials': 18,
    'glass': 18,
    'soft_furnishings': 12,
    'paint': 18,
    'tiles': 18,
    'ceiling': 18,
    'kitchen': 18,
    'bathroom': 18,
    'default': 18
}

# Excel file mappings with metadata
EXCEL_FILES = [
    {
        'file': 'loose_furniture_citywise_rates_2025_COMPLETE.xlsx',
        'item_type': 'furniture',
        'category': 'furniture',
        'room_category': 'living_room',
        'gst_rate': 18
    },
    {
        'file': 'floor_tiles_complete_citywise_rates_2025.xlsx',
        'item_type': 'finish',
        'category': 'flooring',
        'room_category': 'all',
        'gst_rate': 18
    },
    {
        'file': 'home_decor_complete_citywise_rates_2025.xlsx',
        'item_type': 'decor',
        'category': 'decor',
        'room_category': 'all',
        'gst_rate': 18
    },
    {
        'file': 'electrical_lighting_citywise_rates_2025.xlsx',
        'item_type': 'fixture',
        'category': 'lighting',
        'room_category': 'all',
        'gst_rate': 18
    },
    {
        'file': 'false_ceiling_citywise_rates_2025.xlsx',
        'item_type': 'finish',
        'category': 'ceiling',
        'room_category': 'all',
        'gst_rate': 18
    },
    {
        'file': 'interior_paint_finishes_citywise_rates_2025.xlsx',
        'item_type': 'material',
        'category': 'paint',
        'room_category': 'all',
        'gst_rate': 18
    },
    {
        'file': 'laminates_citywise_rates_2025.xlsx',
        'item_type': 'material',
        'category': 'materials',
        'room_category': 'all',
        'gst_rate': 18
    },
    {
        'file': 'kitchen_sinks_citywise_rates_2025.xlsx',
        'item_type': 'fixture',
        'category': 'hardware',
        'room_category': 'kitchen',
        'gst_rate': 18
    },
    {
        'file': 'kitchen_dado_tiles_citywise_rates_2025.xlsx',
        'item_type': 'finish',
        'category': 'tiles',
        'room_category': 'kitchen',
        'gst_rate': 18
    },
    {
        'file': 'hardware_hinges_channels_citywise_rates_2025.xlsx',
        'item_type': 'hardware',
        'category': 'hardware',
        'room_category': 'all',
        'gst_rate': 18
    },
    {
        'file': 'handles_citywise_rates_2025.xlsx',
        'item_type': 'hardware',
        'category': 'hardware',
        'room_category': 'all',
        'gst_rate': 18
    },
    {
        'file': 'glass_shutters_panels_citywise_rates_2025.xlsx',
        'item_type': 'material',
        'category': 'glass',
        'room_category': 'all',
        'gst_rate': 18
    },
    {
        'file': 'aluminium_profiles_citywise_rates_2025.xlsx',
        'item_type': 'material',
        'category': 'materials',
        'room_category': 'all',
        'gst_rate': 18
    },
    {
        'file': 'baskets_citywise_rates_2025.xlsx',
        'item_type': 'hardware',
        'category': 'hardware',
        'room_category': 'bedroom',
        'gst_rate': 18
    },
    {
        'file': 'edgebanding_citywise_rates_2025.xlsx',
        'item_type': 'material',
        'category': 'materials',
        'room_category': 'all',
        'gst_rate': 18
    },
    {
        'file': 'acrylic_shutters_citywise_rates_2025.xlsx',
        'item_type': 'material',
        'category': 'materials',
        'room_category': 'kitchen',
        'gst_rate': 18
    },
    {
        'file': 'mdf_citywise_rates_2025.xlsx',
        'item_type': 'material',
        'category': 'materials',
        'room_category': 'all',
        'gst_rate': 18
    },
]

# ============================================================================
# HELPER FUNCTIONS
# ============================================================================

def clean_price(value: Any) -> float:
    """Clean and convert price value to float."""
    if value is None or pd.isna(value):
        return 0.0
    if isinstance(value, (int, float)):
        return float(value)
    if isinstance(value, str):
        # Remove currency symbols, commas, spaces
        cleaned = re.sub(r'[₹$,\s]', '', value)
        # Extract first number
        match = re.search(r'[\d.]+', cleaned)
        if match:
            try:
                return float(match.group())
            except ValueError:
                return 0.0
    return 0.0

def clean_text(value: Any) -> str:
    """Clean text fields."""
    if value is None or pd.isna(value):
        return ''
    return str(value).strip()

def infer_budget_tier_from_price(hyderabad_price: float, item_name: str) -> str:
    """
    Infer budget tier from Hyderabad base price.
    Uses heuristics based on item type and price range.
    """
    item_lower = item_name.lower()
    
    # Special keywords for tier detection
    if any(word in item_lower for word in ['premium', 'luxury', 'imported', 'italian', 'german']):
        return 'premium'
    
    if any(word in item_lower for word in ['basic', 'standard', 'economy', 'budget']):
        return 'budget'
    
    # Price-based heuristics (varies by category)
    if 'furniture' in item_lower or 'sofa' in item_lower or 'bed' in item_lower:
        if hyderabad_price < 15000:
            return 'budget'
        elif hyderabad_price < 50000:
            return 'mid-premium'
        else:
            return 'premium'
    
    elif 'tile' in item_lower or 'flooring' in item_lower:
        if hyderabad_price < 80:
            return 'budget'
        elif hyderabad_price < 200:
            return 'mid-premium'
        else:
            return 'premium'
    
    elif 'light' in item_lower or 'lamp' in item_lower or 'chandelier' in item_lower:
        if hyderabad_price < 3000:
            return 'budget'
        elif hyderabad_price < 10000:
            return 'mid-premium'
        else:
            return 'premium'
    
    else:
        # General heuristic
        if hyderabad_price < 5000:
            return 'budget'
        elif hyderabad_price < 20000:
            return 'mid-premium'
        else:
            return 'premium'

def extract_unit(specification: str, item_name: str) -> str:
    """Extract unit from specification or infer from item name."""
    spec_lower = specification.lower()
    name_lower = item_name.lower()
    
    # Check specification first
    if 'sq ft' in spec_lower or 'sqft' in spec_lower or 'sq.ft' in spec_lower:
        return 'sq ft'
    if 'running ft' in spec_lower or 'rft' in spec_lower or 'r.ft' in spec_lower:
        return 'running ft'
    if 'piece' in spec_lower or 'pc' in spec_lower or 'pcs' in spec_lower:
        return 'piece'
    if 'set' in spec_lower:
        return 'set'
    if 'pair' in spec_lower:
        return 'pair'
    if 'kg' in spec_lower:
        return 'kg'
    if 'ltr' in spec_lower or 'litre' in spec_lower or 'liter' in spec_lower:
        return 'litre'
    if 'meter' in spec_lower or 'mtr' in spec_lower:
        return 'meter'
    
    # Infer from item type
    if any(word in name_lower for word in ['tile', 'flooring', 'marble', 'granite', 'paint', 'wallpaper']):
        return 'sq ft'
    if any(word in name_lower for word in ['rod', 'rail', 'profile', 'channel', 'edgeband']):
        return 'running ft'
    if any(word in name_lower for word in ['door', 'shutter', 'panel']):
        return 'sq ft'
    
    # Default
    return 'piece'

def generate_synonyms(item_name: str) -> List[str]:
    """Generate potential synonyms for an item."""
    synonyms = []
    name_lower = item_name.lower()
    
    # Add variations
    if '3-seater' in name_lower or '3 seater' in name_lower:
        synonyms.extend(['couch', 'settee', 'three seater sofa'])
    if '2-seater' in name_lower or '2 seater' in name_lower:
        synonyms.extend(['loveseat', 'two seater sofa'])
    if 'coffee table' in name_lower:
        synonyms.extend(['center table', 'centre table', 'tea table'])
    if 'bedside' in name_lower:
        synonyms.extend(['nightstand', 'night table', 'night stand'])
    if 'wardrobe' in name_lower:
        synonyms.extend(['closet', 'almirah', 'cupboard'])
    if 'false ceiling' in name_lower or 'gypsum' in name_lower:
        synonyms.extend(['drop ceiling', 'suspended ceiling', 'POP ceiling'])
    if 'chandelier' in name_lower:
        synonyms.extend(['hanging chandelier', 'crystal chandelier'])
    if 'downlight' in name_lower:
        synonyms.extend(['recessed light', 'pot light', 'ceiling spotlight'])
    
    return synonyms

def generate_search_tags(item_name: str, category: str, specification: str) -> List[str]:
    """Generate search tags for better matching."""
    tags = []
    
    # Add words from item name
    name_words = [w.lower() for w in re.findall(r'\w+', item_name) if len(w) > 3]
    tags.extend(name_words)
    
    # Add words from specification
    spec_words = [w.lower() for w in re.findall(r'\w+', specification) if len(w) > 3]
    tags.extend(spec_words)
    
    # Add category
    tags.append(category.lower())
    
    # Remove duplicates
    return list(set(tags))

# ============================================================================
# IMPORT FUNCTIONS
# ============================================================================

def import_excel_file(file_config: Dict, base_path: str) -> int:
    """Import a single Excel file into pricing_items table."""
    filepath = os.path.join(base_path, file_config['file'])
    
    if not os.path.exists(filepath):
        print(f"  ⚠️  File not found: {filepath}")
        return 0
    
    print(f"\n📂 Processing: {file_config['file']}")
    
    try:
        # Read Excel file
        df = pd.read_excel(filepath)
        print(f"   Found {len(df)} rows")
        
        # Expected columns (flexible):
        # - Item Name, Item, Name, Description (for item name)
        # - Specification, Spec, Details (for specification)
        # - Unit (for unit)
        # - Hyderabad, Delhi, Bangalore, Pune, Mumbai, Chennai (for prices)
        # - GST, GST%, GST Rate (for GST)
        
        # Identify columns
        name_col = None
        for col in ['Item Name', 'Item', 'Name', 'Description']:
            if col in df.columns:
                name_col = col
                break
        
        if not name_col:
            print("   ❌ Could not find item name column")
            return 0
        
        spec_col = next((col for col in ['Specification', 'Spec', 'Details', 'Description'] if col in df.columns), None)
        unit_col = next((col for col in ['Unit', 'UOM'] if col in df.columns), None)
        gst_col = next((col for col in ['GST', 'GST%', 'GST Rate'] if col in df.columns), None)
        
        # City columns
        city_cols = {}
        for city in ['Hyderabad', 'Delhi', 'Bangalore', 'Pune', 'Mumbai', 'Chennai']:
            if city in df.columns:
                city_cols[city.lower()] = city
        
        if not city_cols:
            print("   ❌ Could not find any city price columns")
            return 0
        
        print(f"   Found cities: {list(city_cols.keys())}")
        
        imported_count = 0
        
        for idx, row in df.iterrows():
            try:
                item_name = clean_text(row[name_col])
                if not item_name or item_name == '':
                    continue
                
                # Get prices
                prices = {}
                for city_key, city_col in city_cols.items():
                    price = clean_price(row[city_col])
                    if price > 0:
                        prices[f'{city_key}_price'] = price
                
                # Need at least Hyderabad price
                if 'hyderabad_price' not in prices or prices['hyderabad_price'] == 0:
                    continue
                
                # Get other fields
                specification = clean_text(row[spec_col]) if spec_col else ''
                unit = clean_text(row[unit_col]) if unit_col else extract_unit(specification, item_name)
                gst_rate = clean_price(row[gst_col]) if gst_col else file_config['gst_rate']
                
                # Infer budget tier
                budget_tier = infer_budget_tier_from_price(prices['hyderabad_price'], item_name)
                
                # Generate synonyms and tags
                synonyms = generate_synonyms(item_name)
                search_tags = generate_search_tags(item_name, file_config['category'], specification)
                
                # Prepare item data
                item_data = {
                    'item_name': item_name,
                    'specification': specification,
                    'unit': unit,
                    'item_type': file_config['item_type'],
                    'room_category': file_config['room_category'],
                    'gst_rate': gst_rate,
                    'budget_tier': budget_tier,
                    'is_active': True,
                    'synonyms': synonyms if synonyms else None,
                    'search_tags': search_tags if search_tags else None,
                    **prices  # Add all city prices
                }
                
                # Insert into database
                result = supabase.table('pricing_items').insert(item_data).execute()
                
                imported_count += 1
                if imported_count % 50 == 0:
                    print(f"   ✓ Imported {imported_count} items...")
                    
            except Exception as e:
                print(f"   ⚠️  Error on row {idx}: {str(e)}")
                continue
        
        print(f"   ✅ Successfully imported {imported_count} items")
        return imported_count
        
    except Exception as e:
        print(f"   ❌ Error processing file: {str(e)}")
        return 0

# ============================================================================
# MAIN EXECUTION
# ============================================================================

def main():
    print("=" * 80)
    print("HOUSPIRE BUDGET MODULE - COMPREHENSIVE PRICING DATA IMPORT")
    print("=" * 80)
    print()
    
    # Determine base path
    if len(sys.argv) > 1:
        base_path = sys.argv[1]
    else:
        # Try common locations
        possible_paths = [
            '/home/user/uploaded_files/Budgets-6 cities',
            './Budgets-6 cities',
            '../Budgets-6 cities',
            './budget_data/Budgets-6 cities',
        ]
        
        base_path = None
        for path in possible_paths:
            if os.path.exists(path):
                base_path = path
                break
        
        if not base_path:
            print("❌ Could not find 'Budgets-6 cities' directory")
            print("Usage: python3 import_all_pricing_data.py [path_to_budgets_folder]")
            sys.exit(1)
    
    print(f"📁 Base path: {base_path}")
    print(f"🎯 Target: pricing_items table in Supabase")
    print(f"📊 Files to process: {len(EXCEL_FILES)}")
    print()
    
    # Confirm before proceeding
    response = input("Proceed with import? (yes/no): ")
    if response.lower() not in ['yes', 'y']:
        print("Import cancelled")
        sys.exit(0)
    
    print("\n🚀 Starting import...\n")
    
    total_imported = 0
    successful_files = 0
    failed_files = []
    
    for file_config in EXCEL_FILES:
        try:
            count = import_excel_file(file_config, base_path)
            total_imported += count
            if count > 0:
                successful_files += 1
            else:
                failed_files.append(file_config['file'])
        except Exception as e:
            print(f"   ❌ Fatal error: {str(e)}")
            failed_files.append(file_config['file'])
    
    # Summary
    print("\n" + "=" * 80)
    print("IMPORT SUMMARY")
    print("=" * 80)
    print(f"✅ Total items imported: {total_imported}")
    print(f"✅ Successful files: {successful_files}/{len(EXCEL_FILES)}")
    
    if failed_files:
        print(f"❌ Failed files ({len(failed_files)}):")
        for f in failed_files:
            print(f"   - {f}")
    
    print("\n✨ Import complete!")

if __name__ == '__main__':
    main()
