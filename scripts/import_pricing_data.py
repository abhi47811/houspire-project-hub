#!/usr/bin/env python3
"""
Houspire Budget Module - Master Data Import Pipeline
Parses 27 Excel files and uploads to Supabase pricing_items table
"""

import os
import sys
import pandas as pd
from pathlib import Path
from typing import List, Dict, Any
import re
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Supabase configuration
SUPABASE_URL = os.getenv("VITE_SUPABASE_URL")
SUPABASE_KEY = os.getenv("VITE_SUPABASE_ANON_KEY")  # Use service role key for imports

if not SUPABASE_URL or not SUPABASE_KEY:
    print("❌ ERROR: Supabase credentials not found in .env file")
    sys.exit(1)

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Data directory
DATA_DIR = Path("/home/user/budget_data/Budgets-6 cities")

# GST rate mappings (as per Indian GST rules)
GST_RATES = {
    'furniture': 18,
    'loose_furniture': 18,
    'home_decor': 18,
    'electrical': 18,
    'lighting': 18,
    'plywood': 18,
    'mdf': 18,
    'hardware': 18,
    'handles': 12,
    'hinges': 12,
    'channels': 12,
    'laminates': 18,
    'veneers': 18,
    'tiles': 18,
    'granite': 18,
    'quartz': 18,
    'paint': 18,
    'wallpaper': 18,
    'glass': 18,
    'acrylic': 18,
    'mirror': 18,
    'wood_polish': 18,
    'stone': 18,
    'false_ceiling': 18,
    'window_furnishings': 18,
    'baskets': 18,
    'organisers': 18,
    'kitchen_sink': 18,
    'edgebanding': 18,
    'aluminium': 18
}

def get_gst_rate(category: str) -> int:
    """Determine GST rate based on category"""
    category_lower = category.lower().replace(' ', '_')
    for key, rate in GST_RATES.items():
        if key in category_lower:
            return rate
    return 18  # Default GST rate


def clean_price(value: Any) -> float:
    """Clean and convert price strings to float"""
    if pd.isna(value):
        return None
    if isinstance(value, (int, float)):
        return float(value)
    # Remove ₹, commas, spaces
    cleaned = str(value).replace('₹', '').replace(',', '').replace(' ', '').strip()
    try:
        return float(cleaned)
    except ValueError:
        return None


def detect_budget_tier(row_data: Dict, idx: int, prev_item_name: str) -> str:
    """
    Detect budget tier based on price patterns
    In the Excel files, same item appears 3 times with different prices:
    Row 1: Budget tier (lowest price)
    Row 2: Mid-Premium tier (medium price)  
    Row 3: Premium tier (highest price)
    """
    item_name = row_data.get('Furniture Item') or row_data.get('Item Name') or row_data.get('Item')
    
    # If item name is same as previous, it's a tier variant
    if item_name == prev_item_name:
        # Check price progression
        prices = [
            clean_price(row_data.get('Hyderabad')),
            clean_price(row_data.get('Delhi/Gurgaon')),
            clean_price(row_data.get('Mumbai'))
        ]
        avg_price = sum(p for p in prices if p) / len([p for p in prices if p])
        
        # Simple heuristic: mid-premium is ~1.7-2x budget, premium is ~3-4x budget
        if avg_price > 80000:
            return 'premium'
        elif avg_price > 40000:
            return 'mid_premium'
        else:
            return 'budget'
    
    # First occurrence of item = budget tier
    return 'budget'


def parse_loose_furniture() -> List[Dict]:
    """Parse loose_furniture_citywise_rates_2025_COMPLETE.xlsx"""
    print("\n📦 Parsing Loose Furniture...")
    
    file_path = DATA_DIR / "loose_furniture_citywise_rates_2025_COMPLETE.xlsx"
    df = pd.read_excel(file_path, sheet_name='Loose Furniture Complete', skiprows=3)
    
    items = []
    prev_item_name = None
    tier_counter = 0
    
    for idx, row in df.iterrows():
        # Skip empty rows
        if pd.isna(row.get('Room')) or pd.isna(row.get('Furniture Item')):
            continue
        
        item_name = str(row['Furniture Item']).strip()
        
        # Detect tier progression
        if item_name == prev_item_name:
            tier_counter += 1
        else:
            tier_counter = 0
            prev_item_name = item_name
        
        tier_map = {0: 'budget', 1: 'mid_premium', 2: 'premium'}
        budget_tier = tier_map.get(tier_counter, 'budget')
        
        item = {
            'category': 'loose_furniture',
            'room_category': str(row['Room']).strip(),
            'item_name': item_name,
            'item_type': 'furniture',
            'specification': str(row.get('Specification', '')).strip(),
            'unit': str(row.get('Unit', 'piece')).strip(),
            'hyderabad_price': clean_price(row.get('Hyderabad')),
            'delhi_price': clean_price(row.get('Delhi/Gurgaon')),
            'bangalore_price': clean_price(row.get('Bangalore')),
            'pune_price': clean_price(row.get('Pune')),
            'mumbai_price': clean_price(row.get('Mumbai')),
            'chennai_price': None,  # Not in this file
            'budget_tier': budget_tier,
            'gst_rate': 18,
            'recommended_brands': str(row.get('Recommended Brands', '')).strip(),
            'material_description': str(row.get('Material', '')).strip(),
            'warranty': str(row.get('Warranty', '')).strip(),
            'notes': str(row.get('Notes', '')).strip(),
            'synonyms': generate_synonyms(item_name)
        }
        
        items.append(item)
    
    print(f"   ✅ Parsed {len(items)} furniture items")
    return items


def parse_materials_file(file_name: str, category: str, item_type: str) -> List[Dict]:
    """Generic parser for materials files (plywood, MDF, laminates, etc.)"""
    print(f"\n🔨 Parsing {category}...")
    
    file_path = DATA_DIR / file_name
    
    try:
        # Try to read first sheet
        xl_file = pd.ExcelFile(file_path)
        sheet_name = xl_file.sheet_names[0]
        df = pd.read_excel(file_path, sheet_name=sheet_name)
        
        items = []
        
        # Try to find relevant columns (they vary across files)
        city_cols = {}
        for col in df.columns:
            col_lower = str(col).lower()
            if 'mumbai' in col_lower:
                city_cols['mumbai'] = col
            elif 'delhi' in col_lower or 'gurgaon' in col_lower:
                city_cols['delhi'] = col
            elif 'hyderabad' in col_lower:
                city_cols['hyderabad'] = col
            elif 'bangalore' in col_lower or 'bengaluru' in col_lower:
                city_cols['bangalore'] = col
            elif 'pune' in col_lower:
                city_cols['pune'] = col
        
        # Find item name column
        item_col = None
        for col in df.columns:
            col_lower = str(col).lower()
            if 'product' in col_lower or 'item' in col_lower or 'brand' in col_lower or 'name' in col_lower:
                item_col = col
                break
        
        if not item_col:
            print(f"   ⚠️  Could not identify item column in {file_name}")
            return []
        
        for idx, row in df.iterrows():
            # Skip header/empty rows
            if pd.isna(row.get(item_col)):
                continue
            
            item_name = str(row[item_col]).strip()
            
            # Skip obvious header rows
            if any(x in item_name.lower() for x in ['product', 'item', 'brand', 'name', 'total']):
                continue
            
            item = {
                'category': category,
                'room_category': 'universal',  # Materials apply to all rooms
                'item_name': item_name,
                'item_type': item_type,
                'specification': '',
                'unit': str(row.get('Unit', 'sqft')).strip() if 'Unit' in df.columns else 'sqft',
                'hyderabad_price': clean_price(row.get(city_cols.get('hyderabad'))),
                'delhi_price': clean_price(row.get(city_cols.get('delhi'))),
                'bangalore_price': clean_price(row.get(city_cols.get('bangalore'))),
                'pune_price': clean_price(row.get(city_cols.get('pune'))),
                'mumbai_price': clean_price(row.get(city_cols.get('mumbai'))),
                'chennai_price': None,
                'budget_tier': 'mid_premium',  # Default for materials
                'gst_rate': get_gst_rate(category),
                'recommended_brands': '',
                'material_description': '',
                'warranty': '',
                'notes': '',
                'synonyms': generate_synonyms(item_name)
            }
            
            # Only add if we have at least one price
            if any([item['hyderabad_price'], item['delhi_price'], item['mumbai_price']]):
                items.append(item)
        
        print(f"   ✅ Parsed {len(items)} {category} items")
        return items
        
    except Exception as e:
        print(f"   ❌ Error parsing {file_name}: {str(e)}")
        return []


def generate_synonyms(item_name: str) -> List[str]:
    """Generate common synonyms for an item"""
    synonyms = []
    item_lower = item_name.lower()
    
    # Furniture synonyms
    synonym_map = {
        'sofa': ['couch', 'settee', 'divan'],
        'table': ['desk', 'surface'],
        'chair': ['seat', 'seater'],
        'wardrobe': ['cupboard', 'closet', 'almirah'],
        'bed': ['cot', 'bedframe'],
        'cabinet': ['cupboard', 'storage unit'],
        'shelf': ['shelving', 'rack'],
        'tv unit': ['tv stand', 'entertainment unit', 'media console'],
        'dining': ['dining table', 'dining set'],
        'coffee table': ['center table', 'tea table'],
        'side table': ['end table', 'bedside table', 'nightstand'],
        'bookshelf': ['bookcase', 'book rack'],
        'drawer': ['chest of drawers', 'dresser'],
        'mirror': ['looking glass'],
        'lamp': ['light', 'lighting'],
        'curtain': ['drape', 'window treatment'],
        'rug': ['carpet', 'mat'],
        'cushion': ['pillow', 'throw pillow'],
        'plywood': ['ply', 'board'],
        'laminate': ['lamination', 'surface finish'],
        'granite': ['stone', 'countertop'],
        'tile': ['flooring', 'ceramic'],
        'paint': ['wall finish', 'coating'],
        'handle': ['knob', 'pull'],
        'hinge': ['door hinge', 'hardware']
    }
    
    for key, values in synonym_map.items():
        if key in item_lower:
            synonyms.extend(values)
    
    return list(set(synonyms))  # Remove duplicates


def upload_to_supabase(items: List[Dict]) -> bool:
    """Upload items to Supabase pricing_items table"""
    print(f"\n📤 Uploading {len(items)} items to Supabase...")
    
    try:
        # Upload in batches of 100
        batch_size = 100
        for i in range(0, len(items), batch_size):
            batch = items[i:i+batch_size]
            response = supabase.table('pricing_items').insert(batch).execute()
            print(f"   ✅ Uploaded batch {i//batch_size + 1}/{(len(items)-1)//batch_size + 1}")
        
        print(f"\n🎉 Successfully uploaded {len(items)} items to Supabase!")
        return True
        
    except Exception as e:
        print(f"\n❌ Error uploading to Supabase: {str(e)}")
        return False


def main():
    """Main execution function"""
    print("="*60)
    print("🏗️  HOUSPIRE BUDGET MODULE - DATA IMPORT PIPELINE")
    print("="*60)
    
    all_items = []
    
    # Parse all files
    all_items.extend(parse_loose_furniture())
    
    # Parse materials files
    materials_files = [
        ('plywood_citywise_rates_2025.xlsx', 'plywood', 'material'),
        ('mdf_citywise_rates_2025.xlsx', 'mdf', 'material'),
        ('laminates_citywise_rates_2025.xlsx', 'laminates', 'finish'),
        ('veneers_citywise_rates_2025.xlsx', 'veneers', 'finish'),
        ('handles_citywise_rates_2025.xlsx', 'handles', 'hardware'),
        ('hardware_hinges_channels_citywise_rates_2025.xlsx', 'hinges_channels', 'hardware'),
        ('floor_tiles_complete_citywise_rates_2025.xlsx', 'floor_tiles', 'finish'),
        ('kitchen_dado_tiles_citywise_rates_2025.xlsx', 'kitchen_tiles', 'finish'),
        ('quartz_granite_citywise_rates_2025.xlsx', 'countertops', 'finish'),
        ('interior_paint_finishes_citywise_rates_2025.xlsx', 'paint', 'finish'),
        ('wallpaper_citywise_rates_2025.xlsx', 'wallpaper', 'finish'),
        ('glass_shutters_panels_citywise_rates_2025.xlsx', 'glass', 'material'),
        ('acrylic_shutters_citywise_rates_2025.xlsx', 'acrylic', 'material'),
        ('mirror_panels_citywise_rates_2025.xlsx', 'mirror', 'finish'),
        ('wood_polish_citywise_rates_2025.xlsx', 'wood_polish', 'finish'),
        ('stone_cladding_citywise_rates_2025.xlsx', 'stone_cladding', 'finish'),
        ('false_ceiling_citywise_rates_2025.xlsx', 'false_ceiling', 'construction'),
        ('window_furnishings_citywise_rates_2025.xlsx', 'window_furnishings', 'decor'),
        ('home_decor_complete_citywise_rates_2025.xlsx', 'home_decor', 'decor'),
        ('baskets_citywise_rates_2025.xlsx', 'baskets', 'hardware'),
        ('wardrobe_organisers_citywise_rates_2025.xlsx', 'wardrobe_organisers', 'hardware'),
        ('kitchen_sinks_citywise_rates_2025.xlsx', 'kitchen_sinks', 'fixture'),
        ('edgebanding_citywise_rates_2025.xlsx', 'edgebanding', 'material'),
        ('aluminium_profiles_citywise_rates_2025.xlsx', 'aluminium', 'material'),
        ('wooden_panels_citywise_rates_2025.xlsx', 'wooden_panels', 'finish'),
        ('electrical_lighting_citywise_rates_2025.xlsx', 'electrical_lighting', 'fixture')
    ]
    
    for file_name, category, item_type in materials_files:
        items = parse_materials_file(file_name, category, item_type)
        all_items.extend(items)
    
    print(f"\n{'='*60}")
    print(f"📊 TOTAL ITEMS PARSED: {len(all_items)}")
    print(f"{'='*60}")
    
    # Upload to Supabase
    if all_items:
        success = upload_to_supabase(all_items)
        if success:
            print(f"\n✅ DATA IMPORT COMPLETE!")
            print(f"\n📋 Summary:")
            print(f"   • Total items imported: {len(all_items)}")
            print(f"   • Categories covered: {len(set(item['category'] for item in all_items))}")
            print(f"   • Cities: 5 (Hyderabad, Delhi, Bangalore, Pune, Mumbai)")
            print(f"   • Budget tiers: 3 (Budget, Mid-Premium, Premium)")
            return 0
        else:
            print(f"\n❌ DATA IMPORT FAILED!")
            return 1
    else:
        print(f"\n❌ No items to import!")
        return 1


if __name__ == "__main__":
    sys.exit(main())
