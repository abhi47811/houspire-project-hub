#!/usr/bin/env python3
"""
============================================================================
LIBRARY METADATA ANALYZER
============================================================================
Purpose: Analyze library images and populate analysis_data and color_palette
Author: Manus AI
Date: 2025-12-28

This tool uses OpenAI's GPT-4 Vision to analyze interior design images
and extract:
- Color palette (primary, secondary, accent, neutral)
- Furniture list
- Layout pattern
- Lighting style
- Design elements

Usage:
  python3 library_metadata_analyzer.py --analyze-all
  python3 library_metadata_analyzer.py --analyze-id <library_image_id>
  python3 library_metadata_analyzer.py --test <image_url>

============================================================================
"""

import os
import sys
import json
import argparse
from typing import Dict, List, Optional
import requests

# Check for required packages
try:
    from openai import OpenAI
except ImportError:
    print("Error: openai package not installed")
    print("Install with: pip install openai")
    sys.exit(1)

try:
    from supabase import create_client, Client
except ImportError:
    print("Error: supabase package not installed")
    print("Install with: pip install supabase")
    sys.exit(1)

# ============================================================================
# CONFIGURATION
# ============================================================================

OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
SUPABASE_URL = os.getenv('SUPABASE_URL')
SUPABASE_SERVICE_ROLE_KEY = os.getenv('SUPABASE_SERVICE_ROLE_KEY')

if not OPENAI_API_KEY:
    print("Error: OPENAI_API_KEY environment variable not set")
    sys.exit(1)

if not SUPABASE_URL or not SUPABASE_SERVICE_ROLE_KEY:
    print("Error: SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not set")
    sys.exit(1)

# Initialize clients
openai_client = OpenAI(api_key=OPENAI_API_KEY)
supabase: Client = create_client(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

# ============================================================================
# ANALYSIS PROMPT
# ============================================================================

ANALYSIS_PROMPT = """Analyze this interior design image and provide a detailed breakdown in JSON format.

Extract the following information:

1. **Color Palette**: Identify the 4 main colors
   - primary: The dominant color in the space
   - secondary: The second most prominent color
   - accent: The accent/pop color used for highlights
   - neutral: The neutral/background color

2. **Furniture**: List all major furniture pieces visible (e.g., "L-shaped sofa", "wooden coffee table")

3. **Layout**: Describe the layout pattern (e.g., "Symmetrical with focal seating area", "Open plan with defined zones")

4. **Lighting**: Describe the lighting style (e.g., "Warm ambient with accent spotlights", "Natural light with pendant fixtures")

5. **Design Elements**: List key design elements (e.g., "Ethnic cushions", "Indoor plants", "Artwork")

6. **Style Tags**: List applicable style tags (e.g., "modern", "minimalist", "indian", "contemporary")

Return ONLY a valid JSON object with this exact structure:
{
  "color_palette": {
    "primary": "color name",
    "secondary": "color name",
    "accent": "color name",
    "neutral": "color name"
  },
  "analysis_data": {
    "furniture": ["item 1", "item 2", ...],
    "layout": "layout description",
    "lighting": "lighting description",
    "design_elements": ["element 1", "element 2", ...],
    "style_tags": ["tag1", "tag2", ...]
  }
}

Be specific and descriptive. Use actual color names (e.g., "Saffron", "Teal", "Cream") not generic terms."""

# ============================================================================
# ANALYSIS FUNCTION
# ============================================================================

def analyze_image(image_url: str) -> Dict:
    """
    Analyze an image using GPT-4 Vision and return metadata
    """
    print(f"Analyzing image: {image_url[:60]}...")
    
    try:
        response = openai_client.chat.completions.create(
            model="gpt-4-vision-preview",
            messages=[
                {
                    "role": "user",
                    "content": [
                        {
                            "type": "text",
                            "text": ANALYSIS_PROMPT
                        },
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": image_url
                            }
                        }
                    ]
                }
            ],
            max_tokens=1000,
            temperature=0.3,
        )
        
        content = response.choices[0].message.content
        
        # Parse JSON response
        # Remove markdown code blocks if present
        if content.startswith("```json"):
            content = content.replace("```json", "").replace("```", "").strip()
        elif content.startswith("```"):
            content = content.replace("```", "").strip()
        
        metadata = json.loads(content)
        
        print("✅ Analysis complete")
        return metadata
        
    except json.JSONDecodeError as e:
        print(f"❌ Error parsing JSON response: {e}")
        print(f"Response was: {content}")
        return None
    except Exception as e:
        print(f"❌ Error analyzing image: {e}")
        return None

# ============================================================================
# DATABASE OPERATIONS
# ============================================================================

def update_library_metadata(library_id: str, metadata: Dict) -> bool:
    """
    Update a library image with analyzed metadata
    """
    try:
        response = supabase.table('style_library').update({
            'color_palette': metadata.get('color_palette'),
            'analysis_data': metadata.get('analysis_data'),
        }).eq('id', library_id).execute()
        
        print(f"✅ Updated library image {library_id}")
        return True
        
    except Exception as e:
        print(f"❌ Error updating database: {e}")
        return False

def get_library_images_without_metadata() -> List[Dict]:
    """
    Get all library images that don't have metadata yet
    """
    try:
        response = supabase.table('style_library').select('*').is_('analysis_data', 'null').execute()
        return response.data
    except Exception as e:
        print(f"❌ Error fetching library images: {e}")
        return []

def get_library_image_by_id(library_id: str) -> Optional[Dict]:
    """
    Get a specific library image by ID
    """
    try:
        response = supabase.table('style_library').select('*').eq('id', library_id).single().execute()
        return response.data
    except Exception as e:
        print(f"❌ Error fetching library image: {e}")
        return None

# ============================================================================
# COMMANDS
# ============================================================================

def cmd_test(image_url: str):
    """
    Test the analyzer on a single image URL
    """
    print("=" * 80)
    print("TEST MODE")
    print("=" * 80)
    
    metadata = analyze_image(image_url)
    
    if metadata:
        print("\n" + "=" * 80)
        print("ANALYSIS RESULT")
        print("=" * 80)
        print(json.dumps(metadata, indent=2))
    else:
        print("\n❌ Analysis failed")

def cmd_analyze_id(library_id: str):
    """
    Analyze a specific library image by ID
    """
    print("=" * 80)
    print(f"ANALYZING LIBRARY IMAGE: {library_id}")
    print("=" * 80)
    
    # Fetch the image
    library_image = get_library_image_by_id(library_id)
    
    if not library_image:
        print(f"❌ Library image {library_id} not found")
        return
    
    print(f"Image URL: {library_image['image_url'][:60]}...")
    print(f"Design Style: {library_image.get('design_style', 'N/A')}")
    print(f"Room Type: {library_image.get('room_type', 'N/A')}")
    
    # Analyze
    metadata = analyze_image(library_image['image_url'])
    
    if metadata:
        # Update database
        success = update_library_metadata(library_id, metadata)
        
        if success:
            print("\n✅ Analysis complete and saved to database")
            print("\nMetadata:")
            print(json.dumps(metadata, indent=2))
        else:
            print("\n❌ Analysis succeeded but failed to save to database")
    else:
        print("\n❌ Analysis failed")

def cmd_analyze_all():
    """
    Analyze all library images that don't have metadata yet
    """
    print("=" * 80)
    print("ANALYZING ALL LIBRARY IMAGES WITHOUT METADATA")
    print("=" * 80)
    
    # Fetch images
    images = get_library_images_without_metadata()
    
    if not images:
        print("✅ No images need analysis (all have metadata)")
        return
    
    print(f"\nFound {len(images)} images to analyze\n")
    
    success_count = 0
    fail_count = 0
    
    for i, image in enumerate(images, 1):
        print(f"\n[{i}/{len(images)}] Processing {image['id']}")
        print(f"  Style: {image.get('design_style', 'N/A')}")
        print(f"  Room: {image.get('room_type', 'N/A')}")
        
        metadata = analyze_image(image['image_url'])
        
        if metadata:
            success = update_library_metadata(image['id'], metadata)
            if success:
                success_count += 1
            else:
                fail_count += 1
        else:
            fail_count += 1
        
        # Rate limiting: wait 1 second between requests
        if i < len(images):
            import time
            time.sleep(1)
    
    print("\n" + "=" * 80)
    print("ANALYSIS COMPLETE")
    print("=" * 80)
    print(f"✅ Success: {success_count}")
    print(f"❌ Failed: {fail_count}")
    print(f"📊 Total: {len(images)}")

# ============================================================================
# MAIN
# ============================================================================

def main():
    parser = argparse.ArgumentParser(description='Analyze library images and populate metadata')
    
    subparsers = parser.add_subparsers(dest='command', help='Command to execute')
    
    # Test command
    parser_test = subparsers.add_parser('test', help='Test analyzer on a single image URL')
    parser_test.add_argument('image_url', help='URL of the image to analyze')
    
    # Analyze ID command
    parser_id = subparsers.add_parser('analyze-id', help='Analyze a specific library image by ID')
    parser_id.add_argument('library_id', help='UUID of the library image')
    
    # Analyze all command
    parser_all = subparsers.add_parser('analyze-all', help='Analyze all images without metadata')
    
    args = parser.parse_args()
    
    if not args.command:
        parser.print_help()
        sys.exit(1)
    
    if args.command == 'test':
        cmd_test(args.image_url)
    elif args.command == 'analyze-id':
        cmd_analyze_id(args.library_id)
    elif args.command == 'analyze-all':
        cmd_analyze_all()

if __name__ == '__main__':
    main()
