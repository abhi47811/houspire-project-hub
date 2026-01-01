#!/usr/bin/env python3
"""
Houspire Budget Module - Data Import Pipeline v2
Imports pricing data from Excel files into Supabase pricing_items table.

Usage:
    python3 scripts/import_pricing_data.py [path_to_zip_or_folder]

Database Schema (pricing_items):
    - budget_price, mid_premium_price, premium_price (base prices)
    - City multipliers: hyderabad_multiplier, delhi_multiplier, etc.
"""

import os
import sys
import re
import zipfile
import shutil
from pathlib import Path
from typing import Any, Dict, List, Optional
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

try:
    import pandas as pd
    from supabase import create_client, Client
except ImportError:
    print("❌ Missing dependencies. Install with:")
    print("   pip3 install pandas openpyxl supabase python-dotenv")
    sys.exit(1)

# =============================================================================
# CONFIGURATION
# =============================================================================

SUPABASE_URL = os.getenv('VITE_SUPABASE_URL') or os.getenv('SUPABASE_URL')
SUPABASE_KEY = os.getenv('VITE_SUPABASE_ANON_KEY') or os.getenv('SUPABASE_ANON_KEY') or os.getenv('SUPABASE_SERVICE_ROLE_KEY')

if not SUPABASE_URL or not SUPABASE_KEY:
    print("❌ Missing Supabase credentials!")
    print("   Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env file")
    sys.exit(1)

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# City multipliers from Module 07 specification
CITY_MULTIPLIERS = {
    'hyderabad': 1.00,
    'delhi': 1.20,
    'bangalore': 1.15,
    'pune': 1.05,
    'mumbai': 1.25,
    'chennai': 1.10,
    'kolkata': 0.95,
    'ahmedabad': 0.93,
    'jaipur': 0.90,
    'lucknow': 0.88,
    'surat': 0.85,
}

# GST rates by category
GST_RATES = {
    'loose_furniture': 18, 'furniture': 18, 'modular_furniture': 18,
    'kitchen': 18, 'wardrobe': 18, 'plywood': 18, 'mdf': 18, 'hdhmr': 18,
    'particle_board': 18, 'laminate': 18, 'laminates': 18, 'veneer': 18, 'veneers': 18,
    'acrylic': 18, 'hardware': 18, 'handles': 12, 'hinges': 12, 'channels': 12,
    'fittings': 18, 'glass': 18, 'mirror': 18, 'stone': 28, 'granite': 28,
    'marble': 28, 'quartz': 28, 'countertop': 28, 'countertops': 28, 'tile': 18,
    'floor_tiles': 18, 'kitchen_tiles': 18, 'flooring': 18, 'lighting': 18,
    'electrical': 18, 'electrical_lighting': 18, 'paint': 18, 'wallpaper': 18,
    'curtain': 12, 'window_furnishings': 12, 'fabric': 12, 'upholstery': 12,
    'mattress': 18, 'appliance': 18, 'chimney': 18, 'hob': 18, 'sink': 18,
    'kitchen_sinks': 18, 'faucet': 18, 'sanitary': 18, 'bathroom': 18,
    'false_ceiling': 18, 'gypsum': 18, 'civil': 18, 'labor': 18,
    'home_decor': 18, 'baskets': 18, 'wardrobe_organisers': 18, 'organisers': 18,
    'edgebanding': 18, 'aluminium': 18, 'wooden_panels': 18, 'stone_cladding': 18,
    'wood_polish': 18, 'default': 18,
}

# =============================================================================
# HELPER FUNCTIONS
# =============================================================================

def clean_price(value: Any) -> float:
    """Clean and convert price value to float."""
    if value is None or pd.isna(value):
        return 0.0
    if isinstance(value, (int, float)):
        return float(value)
    if isinstance(value, str):
        cleaned = re.sub(r'[₹$,\s]', '', value)
        match = re.search(r'[\d.]+', cleaned)
        if match:
            try:
                return float(match.group())
            except ValueError:
                return 0.0
    return 0.0

def get_gst_rate(category: str) -> int:
    """Get GST rate for a category."""
    return GST_RATES.get(category.lower().replace(' ', '_'), GST_RATES['default'])

def generate_synonyms(item_name: str) -> List[str]:
    """Generate synonyms for an item."""
    synonyms = []
    name_lower = item_name.lower()
    
    synonym_map = {
        'sofa': ['couch', 'settee'], 'couch': ['sofa', 'settee'],
        'teapoy': ['coffee table', 'center table'], 'coffee table': ['teapoy', 'center table'],
        'almirah': ['wardrobe', 'cupboard'], 'wardrobe': ['almirah', 'cupboard'],
        'cupboard': ['almirah', 'wardrobe'], 'sunmica': ['laminate', 'formica'],
        'laminate': ['sunmica', 'formica'], 'plywood': ['ply', 'board'],
        'granite': ['stone', 'countertop'], 'marble': ['stone', 'countertop'],
        'quartz': ['stone', 'countertop'], 'hinge': ['soft close', 'hardware'],
        'handle': ['knob', 'pull'], 'drawer': ['tandem', 'channel'],
        'bed': ['cot', 'bedstead'], 'chair': ['seat', 'armchair'],
        'table': ['desk', 'surface'], 'divan': ['daybed', 'sofa bed'],
        'ottoman': ['pouf', 'footstool'], 'shelf': ['shelving', 'rack'],
        'mirror': ['looking glass'], 'curtain': ['drape', 'blind'],
        'tv unit': ['tv stand', 'media console'], 'bookshelf': ['bookcase', 'book rack'],
    }
    
    for key, values in synonym_map.items():
        if key in name_lower:
            synonyms.extend(values)
    
    return list(set(s for s in synonyms if s.lower() not in name_lower))[:5]

def generate_keywords(item_name: str, category: str) -> List[str]:
    """Generate search keywords for an item."""
    keywords = []
    words = re.findall(r'\b\w+\b', item_name.lower())
    keywords.extend([w for w in words if len(w) > 2])
    keywords.append(category.lower().replace('_', ' '))
    return list(set(keywords))[:10]

def extract_unit(item_name: str, default: str = 'nos') -> str:
    """Extract unit from item name."""
    name_lower = item_name.lower()
    if any(x in name_lower for x in ['sqft', 'sq ft', 'sq.ft', 'sft']):
        return 'sqft'
    if any(x in name_lower for x in ['rft', 'r.ft', 'running']):
        return 'rft'
    if '/kg' in name_lower or 'per kg' in name_lower:
        return 'kg'
    if 'pair' in name_lower:
        return 'pair'
    if 'set' in name_lower:
        return 'set'
    if 'sheet' in name_lower:
        return 'sheet'
    return default

# =============================================================================
# EXCEL PARSING
# =============================================================================

def parse_excel_file(file_path: Path, category_override: str = None) -> List[Dict]:
    """Parse a single Excel file and return list of items."""
    items = []
    
    try:
        excel_file = pd.ExcelFile(file_path)
        
        for sheet_name in excel_file.sheet_names:
            df = pd.read_excel(file_path, sheet_name=sheet_name)
            
            if df.empty:
                continue
            
            df.columns = df.columns.str.strip().str.lower()
            
            # Detect columns
            item_col = None
            for col in df.columns:
                if any(x in col for x in ['item', 'name', 'description', 'product', 'particular', 'furniture']):
                    item_col = col
                    break
            if not item_col:
                item_col = df.columns[0]
            
            # Detect price columns
            price_cols = {}
            for col in df.columns:
                col_lower = col.lower()
                if 'budget' in col_lower:
                    price_cols['budget'] = col
                elif 'mid' in col_lower or 'medium' in col_lower:
                    price_cols['mid'] = col
                elif 'premium' in col_lower or 'high' in col_lower:
                    price_cols['premium'] = col
                elif 'gst' in col_lower:
                    price_cols['gst'] = col
                # City columns
                for city in CITY_MULTIPLIERS.keys():
                    if city in col_lower or (city == 'delhi' and 'gurgaon' in col_lower):
                        price_cols[city] = col
            
            prev_item_name = None
            tier_counter = 0
            
            for idx, row in df.iterrows():
                item_name = str(row.get(item_col, '')).strip()
                
                if not item_name or item_name.lower() in ['item', 'name', 'description', 'sr', 'sno', 's.no', 'total', 'nan']:
                    continue
                if len(item_name) < 3:
                    continue
                
                # Handle tier detection for repeated items
                if item_name == prev_item_name:
                    tier_counter += 1
                else:
                    tier_counter = 0
                    prev_item_name = item_name
                
                category = category_override or 'miscellaneous'
                
                # Get prices
                budget_price = mid_price = premium_price = 0
                
                if 'budget' in price_cols:
                    budget_price = clean_price(row.get(price_cols['budget']))
                if 'mid' in price_cols:
                    mid_price = clean_price(row.get(price_cols['mid']))
                if 'premium' in price_cols:
                    premium_price = clean_price(row.get(price_cols['premium']))
                
                # If no tier prices, use city prices
                if budget_price == 0 and mid_price == 0 and premium_price == 0:
                    city_prices = {}
                    for city in CITY_MULTIPLIERS.keys():
                        if city in price_cols:
                            city_prices[city] = clean_price(row.get(price_cols[city]))
                    
                    # Calculate base price from Hyderabad (1.0x multiplier)
                    base_price = 0
                    if city_prices.get('hyderabad', 0) > 0:
                        base_price = city_prices['hyderabad']
                    else:
                        for city, mult in CITY_MULTIPLIERS.items():
                            if city_prices.get(city, 0) > 0:
                                base_price = city_prices[city] / mult
                                break
                    
                    if base_price > 0:
                        # Use tier counter to assign tier
                        if tier_counter == 0:
                            budget_price = base_price
                            mid_price = base_price * 1.5
                            premium_price = base_price * 2.5
                        elif tier_counter == 1:
                            mid_price = base_price
                            budget_price = base_price * 0.67
                            premium_price = base_price * 1.67
                        else:
                            premium_price = base_price
                            budget_price = base_price * 0.4
                            mid_price = base_price * 0.6
                
                if mid_price == 0 and budget_price == 0 and premium_price == 0:
                    continue
                
                # Fill missing prices
                if mid_price == 0:
                    mid_price = (budget_price + premium_price) / 2 if budget_price and premium_price else budget_price or premium_price
                if budget_price == 0:
                    budget_price = mid_price * 0.67
                if premium_price == 0:
                    premium_price = mid_price * 1.67
                
                gst = get_gst_rate(category)
                if 'gst' in price_cols:
                    gst_val = clean_price(row.get(price_cols['gst']))
                    if 0 < gst_val <= 100:
                        gst = int(gst_val)
                
                # Build item matching database schema
                item = {
                    'item_name': item_name[:200],
                    'category': category,
                    'sub_category': sheet_name if sheet_name.lower() not in ['sheet1', 'sheet 1'] else None,
                    'specification': None,
                    'unit': extract_unit(item_name),
                    'budget_price': round(budget_price, 2),
                    'mid_premium_price': round(mid_price, 2),
                    'premium_price': round(premium_price, 2),
                    'gst_percent': gst,
                    'hyderabad_multiplier': CITY_MULTIPLIERS['hyderabad'],
                    'delhi_multiplier': CITY_MULTIPLIERS['delhi'],
                    'bangalore_multiplier': CITY_MULTIPLIERS['bangalore'],
                    'pune_multiplier': CITY_MULTIPLIERS['pune'],
                    'mumbai_multiplier': CITY_MULTIPLIERS['mumbai'],
                    'chennai_multiplier': CITY_MULTIPLIERS['chennai'],
                    'kolkata_multiplier': CITY_MULTIPLIERS['kolkata'],
                    'ahmedabad_multiplier': CITY_MULTIPLIERS['ahmedabad'],
                    'jaipur_multiplier': CITY_MULTIPLIERS['jaipur'],
                    'lucknow_multiplier': CITY_MULTIPLIERS['lucknow'],
                    'surat_multiplier': CITY_MULTIPLIERS['surat'],
                    'synonyms': generate_synonyms(item_name),
                    'keywords': generate_keywords(item_name, category),
                    'is_active': True,
                    'source': 'excel_import',
                }
                
                items.append(item)
        
        return items
    
    except Exception as e:
        print(f"   ⚠️  Error parsing {file_path.name}: {e}")
        return []

def detect_category_from_filename(filename: str) -> str:
    """Detect category from filename."""
    name_lower = filename.lower()
    
    category_map = {
        'loose_furniture': ['furniture', 'loose'],
        'modular_kitchen': ['kitchen'],
        'wardrobe': ['wardrobe', 'closet'],
        'plywood': ['plywood'],
        'mdf': ['mdf'],
        'hdhmr': ['hdhmr'],
        'laminate': ['laminate', 'laminates'],
        'veneer': ['veneer', 'veneers'],
        'acrylic': ['acrylic'],
        'hardware': ['hardware', 'handle', 'hinge', 'channel'],
        'glass': ['glass'],
        'mirror': ['mirror'],
        'stone': ['granite', 'marble', 'quartz', 'stone'],
        'countertops': ['countertop'],
        'floor_tiles': ['floor_tile', 'tiles'],
        'kitchen_tiles': ['dado', 'kitchen_tile'],
        'lighting': ['light', 'electrical'],
        'paint': ['paint'],
        'wallpaper': ['wallpaper'],
        'window_furnishings': ['curtain', 'window', 'furnishing'],
        'false_ceiling': ['ceiling', 'gypsum'],
        'home_decor': ['decor'],
        'baskets': ['basket'],
        'wardrobe_organisers': ['organiser', 'organizer'],
        'kitchen_sinks': ['sink'],
        'edgebanding': ['edge'],
        'aluminium': ['aluminium', 'aluminum'],
        'wooden_panels': ['wooden_panel', 'wood_panel'],
        'stone_cladding': ['cladding'],
        'wood_polish': ['polish'],
    }
    
    for category, patterns in category_map.items():
        for pattern in patterns:
            if pattern in name_lower:
                return category
    
    return 'miscellaneous'

# =============================================================================
# MAIN FUNCTIONS
# =============================================================================

def extract_zip(zip_path: Path, extract_to: Path) -> List[Path]:
    """Extract ZIP file and return list of Excel files."""
    print(f"\n📦 Extracting ZIP file: {zip_path.name}")
    
    with zipfile.ZipFile(zip_path, 'r') as zip_ref:
        zip_ref.extractall(extract_to)
    
    excel_files = []
    for ext in ['*.xlsx', '*.xls', '*.csv']:
        excel_files.extend(extract_to.rglob(ext))
    
    excel_files = [f for f in excel_files if not f.name.startswith('~') and not f.name.startswith('.')]
    
    print(f"   ✅ Found {len(excel_files)} Excel/CSV files")
    return excel_files

def deduplicate_items(items: List[Dict]) -> List[Dict]:
    """Remove duplicate items by name + category."""
    seen = set()
    unique_items = []
    
    for item in items:
        key = (item['item_name'].lower().strip(), item['category'])
        if key not in seen:
            seen.add(key)
            unique_items.append(item)
    
    return unique_items

def upload_to_supabase(items: List[Dict]) -> int:
    """Upload items to Supabase pricing_items table."""
    if not items:
        print("   ⚠️  No items to upload")
        return 0
    
    print(f"\n📤 Uploading {len(items)} items to Supabase...")
    
    batch_size = 100
    total_uploaded = 0
    total_batches = (len(items) + batch_size - 1) // batch_size
    
    for i in range(0, len(items), batch_size):
        batch = items[i:i + batch_size]
        batch_num = (i // batch_size) + 1
        
        try:
            response = supabase.table('pricing_items').upsert(
                batch,
                on_conflict='item_name,category'
            ).execute()
            
            total_uploaded += len(batch)
            print(f"   ✅ Batch {batch_num}/{total_batches}: {len(batch)} items")
            
        except Exception as e:
            print(f"   ⚠️  Batch {batch_num} error: {e}")
            # Try inserting one by one
            for item in batch:
                try:
                    supabase.table('pricing_items').upsert([item]).execute()
                    total_uploaded += 1
                except Exception as item_error:
                    print(f"      ❌ Failed: {item['item_name'][:40]}")
    
    return total_uploaded

def get_category_summary(items: List[Dict]) -> Dict[str, int]:
    """Get count of items by category."""
    summary = {}
    for item in items:
        category = item['category']
        summary[category] = summary.get(category, 0) + 1
    return dict(sorted(summary.items(), key=lambda x: x[1], reverse=True))

def main():
    print("=" * 60)
    print("🏗️  HOUSPIRE BUDGET MODULE - DATA IMPORT PIPELINE v2")
    print("=" * 60)
    
    # Determine input path
    if len(sys.argv) > 1:
        input_path = Path(sys.argv[1])
    else:
        # Look for ZIP or Excel files
        possible_paths = [Path('budget_data'), Path('data'), Path('.'), Path.home() / 'Downloads']
        
        input_path = None
        for path in possible_paths:
            if path.exists():
                zip_files = list(path.glob('*Budget*.zip')) + list(path.glob('*cities*.zip'))
                if zip_files:
                    input_path = zip_files[0]
                    break
                excel_files = list(path.glob('*.xlsx')) + list(path.glob('*.xls'))
                if excel_files:
                    input_path = path
                    break
        
        if not input_path:
            print("\n❌ No input files found!")
            print("   Usage: python3 scripts/import_pricing_data.py <path_to_zip_or_folder>")
            sys.exit(1)
    
    print(f"\n📁 Input: {input_path}")
    
    excel_files = []
    temp_extract_dir = None
    
    if input_path.is_file() and input_path.suffix.lower() == '.zip':
        temp_extract_dir = Path('temp_extract')
        temp_extract_dir.mkdir(exist_ok=True)
        excel_files = extract_zip(input_path, temp_extract_dir)
    elif input_path.is_dir():
        for ext in ['*.xlsx', '*.xls', '*.csv']:
            excel_files.extend(input_path.rglob(ext))
        excel_files = [f for f in excel_files if not f.name.startswith('~')]
        print(f"\n📁 Found {len(excel_files)} Excel/CSV files")
    else:
        print(f"\n❌ Invalid input: {input_path}")
        sys.exit(1)
    
    if not excel_files:
        print("\n❌ No Excel files found!")
        sys.exit(1)
    
    # Parse all files
    all_items = []
    print(f"\n📊 Parsing {len(excel_files)} files...")
    
    for file_path in excel_files:
        category = detect_category_from_filename(file_path.name)
        items = parse_excel_file(file_path, category_override=category)
        if items:
            print(f"   ✅ {file_path.name}: {len(items)} items")
            all_items.extend(items)
        else:
            print(f"   ⚠️  {file_path.name}: 0 items")
    
    print(f"\n📊 Total items parsed: {len(all_items)}")
    
    unique_items = deduplicate_items(all_items)
    print(f"📊 Unique items: {len(unique_items)} (removed {len(all_items) - len(unique_items)} duplicates)")
    
    print("\n📋 Category breakdown:")
    for category, count in get_category_summary(unique_items).items():
        print(f"   • {category}: {count} items")
    
    uploaded = upload_to_supabase(unique_items)
    
    # Cleanup
    if temp_extract_dir and temp_extract_dir.exists():
        shutil.rmtree(temp_extract_dir)
    
    print("\n" + "=" * 60)
    print("✅ DATA IMPORT COMPLETE!")
    print("=" * 60)
    print(f"\n📊 Summary:")
    print(f"   • Files processed: {len(excel_files)}")
    print(f"   • Items parsed: {len(all_items)}")
    print(f"   • Unique items: {len(unique_items)}")
    print(f"   • Items uploaded: {uploaded}")
    print(f"   • Categories: {len(get_category_summary(unique_items))}")

if __name__ == "__main__":
    main()
