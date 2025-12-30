#!/usr/bin/env python3
"""
Data Extraction and Transformation Script
Extracts data from Excel files and prepares for database import

This script processes the Houspire Style Staging data:
- 13 styles × ~13 room types = 169 Excel files
- Extracts specifications, item checklists, finish combinations
- Generates SQL INSERT statements for style_library table
"""

import pandas as pd
import openpyxl
import os
import json
import sys
from typing import Dict, List, Any
from pathlib import Path

# Configuration
BASE_PATH = "/home/user/houspire_staging_data/Houspire-Individual Style Staging"
OUTPUT_DIR = "/home/user/webapp/temp"
OUTPUT_SQL_FILE = f"{OUTPUT_DIR}/style_library_seed_data.sql"
OUTPUT_JSON_FILE = f"{OUTPUT_DIR}/style_library_data.json"

# Ensure output directory exists
os.makedirs(OUTPUT_DIR, exist_ok=True)

class StyleDataExtractor:
    """Extract and transform style data from Excel files"""
    
    def __init__(self, base_path: str):
        self.base_path = base_path
        self.extracted_data = []
        self.errors = []
    
    def normalize_room_type(self, filename: str) -> str:
        """Normalize room type from filename"""
        # Remove file extension
        name = filename.replace('.xlsx', '')
        
        # Extract room type (before the dash)
        if '-' in name:
            room_type = name.split('-')[0].strip()
        else:
            room_type = name.strip()
        
        # Normalize common variations
        replacements = {
            'Master Bedroom': 'Master Bedroom',
            'Living': 'Living Room',
            'Dining': 'Dining Room',
            'Kids ROom': 'Kids Room',
            'Guest Bedroom': 'Guest Room',
            'Wardrobe': 'Wardrobes',
            'pooja room': 'Pooja Room',
        }
        
        return replacements.get(room_type, room_type)
    
    def extract_specifications_sheet(self, df: pd.DataFrame, style_name: str, room_type: str) -> Dict[str, Any]:
        """Extract data from main specifications sheet"""
        specs = {
            'overall_mood': '',
            'key_principles': [],
            'color_palette': {},
            'materials': [],
            'furniture_items': [],
            'decor_elements': [],
            'lighting': {},
            'textiles': []
        }
        
        current_category = None
        
        try:
            for idx, row in df.iterrows():
                # Skip header rows
                if idx < 2:
                    continue
                
                # Get column values
                col0 = str(row.iloc[0]) if pd.notna(row.iloc[0]) else ''
                col1 = str(row.iloc[1]) if pd.notna(row.iloc[1]) else ''
                col2 = str(row.iloc[2]) if pd.notna(row.iloc[2]) else ''
                col3 = str(row.iloc[3]) if pd.notna(row.iloc[3]) else ''
                
                # Extract overall mood
                if 'overall mood' in col1.lower():
                    specs['overall_mood'] = col3
                
                # Extract key principles
                if 'key principles' in col1.lower() or any(keyword in col2.lower() for keyword in ['heritage', 'clean lines', 'warm color', 'handcrafted']):
                    if col2 and col3:
                        specs['key_principles'].append({
                            'principle': col2,
                            'description': col3
                        })
                
                # Track categories for furniture and decor
                if col0.isupper() and len(col0) > 3 and col0 not in ['CATEGORY', 'STYLE NOTES']:
                    current_category = col0
                
                # Extract furniture specifications
                if current_category and 'SOFA' in current_category or 'SEATING' in current_category or 'TABLE' in current_category:
                    if col1 and col3 and col1 not in ['SUB-CATEGORY', 'Style', 'Configuration']:
                        specs['furniture_items'].append({
                            'category': current_category,
                            'sub_category': col1,
                            'specification': col2,
                            'options': col3,
                            'notes': str(row.iloc[4]) if pd.notna(row.iloc[4]) else '',
                            'priority': str(row.iloc[5]) if pd.notna(row.iloc[5]) else ''
                        })
        
        except Exception as e:
            self.errors.append(f"Error extracting specs for {style_name}/{room_type}: {str(e)}")
        
        return specs
    
    def extract_item_checklist(self, df: pd.DataFrame) -> List[Dict[str, Any]]:
        """Extract data from Item Checklist sheet"""
        checklist = []
        
        try:
            current_category = None
            
            for idx, row in df.iterrows():
                # Skip header
                if idx < 1:
                    continue
                
                col0 = str(row.iloc[0]) if pd.notna(row.iloc[0]) else ''
                col1 = str(row.iloc[1]) if pd.notna(row.iloc[1]) else ''
                col2 = str(row.iloc[2]) if pd.notna(row.iloc[2]) else ''
                col3 = str(row.iloc[3]) if pd.notna(row.iloc[3]) else ''
                col4 = str(row.iloc[4]) if pd.notna(row.iloc[4]) else ''
                
                # Update category
                if col0 and not col1 and col0 != 'CATEGORY':
                    current_category = col0
                    continue
                
                # Extract item
                if col1 and col2:
                    checklist.append({
                        'category': current_category or 'General',
                        'item': col1,
                        'include': col2.upper() == 'YES',
                        'priority': col3,
                        'notes': col4
                    })
        
        except Exception as e:
            self.errors.append(f"Error extracting checklist: {str(e)}")
        
        return checklist
    
    def extract_finish_combinations(self, df: pd.DataFrame) -> List[Dict[str, Any]]:
        """Extract data from Shutter Finish Summary sheet"""
        finishes = []
        
        try:
            for idx, row in df.iterrows():
                # Skip header and category rows
                if idx < 2:
                    continue
                
                col0 = str(row.iloc[0]) if pd.notna(row.iloc[0]) else ''
                col1 = str(row.iloc[1]) if pd.notna(row.iloc[1]) else ''
                col2 = str(row.iloc[2]) if pd.notna(row.iloc[2]) else ''
                col3 = str(row.iloc[3]) if pd.notna(row.iloc[3]) else ''
                col4 = str(row.iloc[4]) if pd.notna(row.iloc[4]) else ''
                col5 = str(row.iloc[5]) if pd.notna(row.iloc[5]) else ''
                col6 = str(row.iloc[6]) if pd.notna(row.iloc[6]) else ''
                
                # Skip category headers
                if not col1 or '(' in col0:
                    continue
                
                # Extract finish combination
                if col1 and col2:
                    finishes.append({
                        'id': col0,
                        'name': col1,
                        'tv_unit': col2,
                        'bookshelf': col3,
                        'price': col4,
                        'rating': col5.count('★') if '★' in col5 else 0,
                        'description': col6
                    })
        
        except Exception as e:
            self.errors.append(f"Error extracting finishes: {str(e)}")
        
        return finishes
    
    def process_file(self, style_dir: str, filename: str) -> Dict[str, Any]:
        """Process a single Excel file"""
        file_path = os.path.join(self.base_path, style_dir, filename)
        style_name = style_dir.strip()
        room_type = self.normalize_room_type(filename)
        
        print(f"Processing: {style_name} / {room_type}")
        
        try:
            wb = openpyxl.load_workbook(file_path, read_only=True)
            sheet_names = wb.sheetnames
            
            # Extract from main specification sheet (first sheet)
            main_sheet = sheet_names[0]
            df_specs = pd.read_excel(file_path, sheet_name=main_sheet)
            specifications = self.extract_specifications_sheet(df_specs, style_name, room_type)
            
            # Extract from Item Checklist (if exists)
            item_checklist = []
            if 'Item Checklist' in sheet_names:
                df_checklist = pd.read_excel(file_path, sheet_name='Item Checklist')
                item_checklist = self.extract_item_checklist(df_checklist)
            
            # Extract from Shutter Finish Summary (if exists)
            finish_combinations = []
            if 'Shutter Finish Summary' in sheet_names or 'Finish Summary' in sheet_names:
                sheet_name = 'Shutter Finish Summary' if 'Shutter Finish Summary' in sheet_names else 'Finish Summary'
                df_finishes = pd.read_excel(file_path, sheet_name=sheet_name)
                finish_combinations = self.extract_finish_combinations(df_finishes)
            
            # Build complete record
            record = {
                'style_name': style_name,
                'room_type': room_type,
                'description': specifications.get('overall_mood', ''),
                'mood_keywords': self.extract_mood_keywords(specifications),
                'cultural_significance': '',
                'specifications': specifications,
                'item_checklist': item_checklist,
                'finish_combinations': finish_combinations,
                'color_palettes': [],
                'budget_range_min': None,
                'budget_range_max': None,
                'budget_notes': '',
                'popularity_score': 50,  # Default
                'popular_in_cities': [],
                'data_source': 'excel_import',
                'data_version': '1.0'
            }
            
            return record
        
        except Exception as e:
            error_msg = f"Error processing {style_name}/{room_type}: {str(e)}"
            self.errors.append(error_msg)
            print(f"  ❌ {error_msg}")
            return None
    
    def extract_mood_keywords(self, specs: Dict) -> List[str]:
        """Extract mood keywords from specifications"""
        keywords = []
        
        if 'overall_mood' in specs:
            mood = specs['overall_mood'].lower()
            possible_keywords = [
                'contemporary', 'elegant', 'warm', 'minimalist', 'rustic', 
                'modern', 'traditional', 'coastal', 'industrial', 'luxurious',
                'cozy', 'sophisticated', 'clean', 'natural', 'artistic'
            ]
            keywords = [kw for kw in possible_keywords if kw in mood]
        
        return keywords[:5]  # Limit to 5
    
    def process_all_files(self):
        """Process all Excel files in the base directory"""
        print("=" * 80)
        print("🚀 Starting Data Extraction")
        print("=" * 80)
        
        total_files = 0
        successful = 0
        
        for style_dir in sorted(os.listdir(self.base_path)):
            style_path = os.path.join(self.base_path, style_dir)
            
            if not os.path.isdir(style_path):
                continue
            
            print(f"\n📁 Processing style: {style_dir}")
            
            for filename in sorted(os.listdir(style_path)):
                if not filename.endswith('.xlsx'):
                    continue
                
                total_files += 1
                record = self.process_file(style_dir, filename)
                
                if record:
                    self.extracted_data.append(record)
                    successful += 1
                    print(f"  ✅ Success")
        
        print("\n" + "=" * 80)
        print(f"📊 Extraction Complete")
        print(f"   Total files processed: {total_files}")
        print(f"   Successful: {successful}")
        print(f"   Failed: {total_files - successful}")
        print(f"   Total records: {len(self.extracted_data)}")
        print("=" * 80)
    
    def generate_json_output(self):
        """Generate JSON file with extracted data"""
        print(f"\n📝 Writing JSON output to: {OUTPUT_JSON_FILE}")
        
        with open(OUTPUT_JSON_FILE, 'w', encoding='utf-8') as f:
            json.dump(self.extracted_data, f, indent=2, ensure_ascii=False)
        
        print(f"✅ JSON file created ({len(self.extracted_data)} records)")
    
    def generate_sql_output(self):
        """Generate SQL INSERT statements"""
        print(f"\n📝 Generating SQL INSERT statements...")
        
        with open(OUTPUT_SQL_FILE, 'w', encoding='utf-8') as f:
            f.write("-- =====================================================\n")
            f.write("-- Style Library Seed Data\n")
            f.write("-- Auto-generated from Excel files\n")
            f.write(f"-- Total records: {len(self.extracted_data)}\n")
            f.write("-- =====================================================\n\n")
            
            for record in self.extracted_data:
                # Escape single quotes in strings
                def escape_sql(value):
                    if value is None:
                        return 'NULL'
                    if isinstance(value, (dict, list)):
                        json_str = json.dumps(value, ensure_ascii=False)
                        escaped = json_str.replace("'", "''")
                        return f"'{escaped}'"
                    if isinstance(value, str):
                        escaped = value.replace("'", "''")
                        return f"'{escaped}'"
                    return str(value)
                
                sql = f"""INSERT INTO public.style_library (
  style_name,
  room_type,
  description,
  mood_keywords,
  cultural_significance,
  specifications,
  item_checklist,
  finish_combinations,
  color_palettes,
  budget_range_min,
  budget_range_max,
  budget_notes,
  popularity_score,
  popular_in_cities,
  data_source,
  data_version
) VALUES (
  {escape_sql(record['style_name'])},
  {escape_sql(record['room_type'])},
  {escape_sql(record['description'])},
  ARRAY{record['mood_keywords']}::text[],
  {escape_sql(record['cultural_significance'])},
  {escape_sql(record['specifications'])}::jsonb,
  {escape_sql(record['item_checklist'])}::jsonb,
  {escape_sql(record['finish_combinations'])}::jsonb,
  {escape_sql(record['color_palettes'])}::jsonb,
  {escape_sql(record['budget_range_min'])},
  {escape_sql(record['budget_range_max'])},
  {escape_sql(record['budget_notes'])},
  {record['popularity_score']},
  ARRAY{record['popular_in_cities']}::text[],
  {escape_sql(record['data_source'])},
  {escape_sql(record['data_version'])}
);

"""
                f.write(sql)
            
            f.write("\n-- =====================================================\n")
            f.write("-- Update statistics\n")
            f.write("-- =====================================================\n\n")
            f.write("ANALYZE public.style_library;\n")
        
        print(f"✅ SQL file created: {OUTPUT_SQL_FILE}")
    
    def print_summary(self):
        """Print summary statistics"""
        if not self.extracted_data:
            print("\n❌ No data extracted!")
            return
        
        print("\n" + "=" * 80)
        print("📊 EXTRACTION SUMMARY")
        print("=" * 80)
        
        # Count by style
        styles = {}
        room_types = set()
        
        for record in self.extracted_data:
            style = record['style_name']
            room = record['room_type']
            
            styles[style] = styles.get(style, 0) + 1
            room_types.add(room)
        
        print(f"\n🎨 Styles ({len(styles)}):")
        for style, count in sorted(styles.items()):
            print(f"   {style}: {count} rooms")
        
        print(f"\n🏠 Room Types ({len(room_types)}):")
        for room in sorted(room_types):
            print(f"   - {room}")
        
        if self.errors:
            print(f"\n⚠️  Errors ({len(self.errors)}):")
            for error in self.errors[:10]:  # Show first 10 errors
                print(f"   - {error}")
            if len(self.errors) > 10:
                print(f"   ... and {len(self.errors) - 10} more")
        
        print("\n" + "=" * 80)

def main():
    """Main execution function"""
    print("\n" + "=" * 80)
    print("🎨 HOUSPIRE STYLE DATA EXTRACTION TOOL")
    print("=" * 80)
    
    # Check if base path exists
    if not os.path.exists(BASE_PATH):
        print(f"\n❌ Error: Base path not found: {BASE_PATH}")
        sys.exit(1)
    
    # Initialize extractor
    extractor = StyleDataExtractor(BASE_PATH)
    
    # Process all files
    extractor.process_all_files()
    
    # Generate outputs
    extractor.generate_json_output()
    extractor.generate_sql_output()
    
    # Print summary
    extractor.print_summary()
    
    print("\n✅ All done! Check output files:")
    print(f"   JSON: {OUTPUT_JSON_FILE}")
    print(f"   SQL:  {OUTPUT_SQL_FILE}")
    print("\n" + "=" * 80)

if __name__ == '__main__':
    main()
