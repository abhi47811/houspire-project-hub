import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.3";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Category pricing mappings (INR)
const CATEGORY_PRICING: Record<string, { budget: number; mid: number; premium: number; unit: string }> = {
  'SOFA / PRIMARY SEATING': { budget: 35000, mid: 65000, premium: 150000, unit: 'piece' },
  'ACCENT CHAIRS': { budget: 8000, mid: 18000, premium: 45000, unit: 'piece' },
  'COFFEE TABLE': { budget: 6000, mid: 15000, premium: 40000, unit: 'piece' },
  'SIDE TABLES': { budget: 3000, mid: 8000, premium: 20000, unit: 'piece' },
  'CONSOLE TABLE': { budget: 8000, mid: 18000, premium: 45000, unit: 'piece' },
  'TV UNIT': { budget: 12000, mid: 28000, premium: 70000, unit: 'piece' },
  'BOOKSHELF': { budget: 10000, mid: 25000, premium: 60000, unit: 'piece' },
  'STORAGE CABINET': { budget: 8000, mid: 20000, premium: 50000, unit: 'piece' },
  'FIREPLACE': { budget: 25000, mid: 60000, premium: 200000, unit: 'piece' },
  'OTTOMAN / POUF': { budget: 4000, mid: 10000, premium: 25000, unit: 'piece' },
  'CEILING LIGHT': { budget: 3000, mid: 8000, premium: 25000, unit: 'piece' },
  'FLOOR LAMPS': { budget: 2500, mid: 6000, premium: 18000, unit: 'piece' },
  'TABLE LAMPS': { budget: 1500, mid: 4000, premium: 12000, unit: 'piece' },
  'WALL SCONCES': { budget: 1500, mid: 4000, premium: 12000, unit: 'piece' },
  'WINDOW TREATMENT': { budget: 3000, mid: 8000, premium: 20000, unit: 'set' },
  'FLOORING': { budget: 60, mid: 120, premium: 300, unit: 'sq ft' },
  'AREA RUG': { budget: 5000, mid: 15000, premium: 50000, unit: 'piece' },
  'WALL TREATMENT': { budget: 2000, mid: 5000, premium: 15000, unit: 'sq ft' },
  'CEILING': { budget: 80, mid: 150, premium: 350, unit: 'sq ft' },
  'MIRROR': { budget: 4000, mid: 10000, premium: 30000, unit: 'piece' },
  'ARTWORK': { budget: 2000, mid: 6000, premium: 25000, unit: 'piece' },
  'ACCESSORIES': { budget: 500, mid: 1500, premium: 5000, unit: 'piece' },
  'PLANTS': { budget: 800, mid: 2000, premium: 6000, unit: 'piece' },
  'CLOCK': { budget: 2000, mid: 5000, premium: 15000, unit: 'piece' },
  'TECHNOLOGY': { budget: 25000, mid: 50000, premium: 150000, unit: 'piece' },
  'BAR CART': { budget: 6000, mid: 15000, premium: 40000, unit: 'piece' },
  // Bedroom categories
  'BED': { budget: 25000, mid: 55000, premium: 150000, unit: 'piece' },
  'BEDSIDE TABLES': { budget: 4000, mid: 10000, premium: 28000, unit: 'piece' },
  'DRESSER': { budget: 15000, mid: 35000, premium: 80000, unit: 'piece' },
  'WARDROBE': { budget: 35000, mid: 80000, premium: 200000, unit: 'piece' },
  'SEATING': { budget: 8000, mid: 18000, premium: 45000, unit: 'piece' },
  // Kitchen categories
  'CABINETS': { budget: 1200, mid: 2500, premium: 5000, unit: 'running ft' },
  'COUNTERTOP': { budget: 250, mid: 600, premium: 1500, unit: 'sq ft' },
  'BACKSPLASH': { budget: 80, mid: 180, premium: 400, unit: 'sq ft' },
  'APPLIANCES': { budget: 15000, mid: 35000, premium: 100000, unit: 'piece' },
  'SINK': { budget: 5000, mid: 12000, premium: 35000, unit: 'piece' },
  'FAUCET': { budget: 3000, mid: 8000, premium: 25000, unit: 'piece' },
  // Bathroom categories  
  'VANITY': { budget: 12000, mid: 28000, premium: 70000, unit: 'piece' },
  'TOILET': { budget: 8000, mid: 18000, premium: 50000, unit: 'piece' },
  'SHOWER': { budget: 15000, mid: 35000, premium: 100000, unit: 'set' },
  'BATHTUB': { budget: 20000, mid: 50000, premium: 150000, unit: 'piece' },
  'TILES': { budget: 50, mid: 100, premium: 250, unit: 'sq ft' },
  // Default fallback
  'DEFAULT': { budget: 2000, mid: 5000, premium: 15000, unit: 'piece' },
};

// Style multipliers
const STYLE_MULTIPLIERS: Record<string, number> = {
  'art_deco': 1.25,
  'industrial': 1.10,
  'contemporary': 1.05,
  'mid_century_modern': 1.15,
  'scandinavian': 0.95,
  'minimalist': 0.90,
  'japandi': 1.10,
  'bohemian': 0.95,
  'farmhouse': 0.90,
  'traditional_indian': 1.00,
  'modern_indian': 1.05,
  'indian_coastal': 1.00,
  'transitional': 1.00,
};

// Room type slug mapping
const ROOM_SLUGS: Record<string, string> = {
  'living room': 'living_room',
  'bedroom': 'bedroom',
  'master bedroom': 'master_bedroom',
  'guest room': 'guest_room',
  'kids room': 'kids_room',
  'nursery': 'nursery',
  'kitchen': 'kitchen',
  'dining room': 'dining_room',
  'bathroom': 'bathroom',
  'home office': 'home_office',
  'foyer': 'foyer',
  'balcony': 'balcony',
  'pooja room': 'pooja_room',
  'wardrobes': 'wardrobe',
};

// Style slug mapping
const STYLE_SLUGS: Record<string, string> = {
  'art deco': 'art_deco',
  'industrial': 'industrial',
  'contemporary': 'contemporary',
  'mid century modern': 'mid_century_modern',
  'scandinavian': 'scandinavian',
  'minimalist': 'minimalist',
  'japandi': 'japandi',
  'bohemian': 'bohemian',
  'farmhouse': 'farmhouse',
  'traditional indian': 'traditional_indian',
  'modern indian': 'modern_indian',
  'indian coastal': 'indian_coastal',
  'transitional': 'transitional',
};

interface ChecklistItem {
  category: string;
  item: string;
  include: string;
  priority: string;
  notes: string;
}

interface ParsedFile {
  style: string;
  roomType: string;
  items: ChecklistItem[];
}

function parseChecklistFromMarkdown(markdown: string, fileName: string): ParsedFile {
  // Extract style and room type from filename like "Living Room-Industrial.xlsx"
  const fileMatch = fileName.match(/^(.+?)-(.+?)\.xlsx$/i);
  let roomType = 'living_room';
  let style = 'industrial';
  
  if (fileMatch) {
    roomType = ROOM_SLUGS[fileMatch[1].toLowerCase()] || fileMatch[1].toLowerCase().replace(/\s+/g, '_');
    style = STYLE_SLUGS[fileMatch[2].toLowerCase()] || fileMatch[2].toLowerCase().replace(/\s+/g, '_');
  }
  
  const items: ChecklistItem[] = [];
  const lines = markdown.split('\n');
  
  let inChecklistSection = false;
  let currentCategory = '';
  
  for (const line of lines) {
    // Detect checklist section by header patterns
    if (line.includes('ITEM CHECKLIST') || line.includes('3D RENDER ITEM CHECKLIST')) {
      inChecklistSection = true;
      continue;
    }
    
    // Detect end of checklist (next page or finish combinations)
    if (inChecklistSection && (line.includes('## Page 3') || line.includes('SHUTTER/FINISH'))) {
      inChecklistSection = false;
      continue;
    }
    
    if (!inChecklistSection) continue;
    
    // Parse table rows
    if (line.startsWith('|') && !line.includes('CATEGORY') && !line.includes('|-')) {
      const cells = line.split('|').map(c => c.trim()).filter(c => c);
      
      if (cells.length >= 4) {
        // First column might be category or empty (continuation)
        if (cells[0] && !cells[0].match(/^(YES|NO|OPTIONAL)$/i)) {
          currentCategory = cells[0];
        }
        
        // Check if it's an item row (has YES/NO/OPTIONAL in third column)
        const includeCell = cells[2];
        if (includeCell && includeCell.match(/^(YES|NO|OPTIONAL)$/i)) {
          items.push({
            category: currentCategory,
            item: cells[1] || '',
            include: includeCell,
            priority: cells[3] || 'Essential',
            notes: cells[4] || '',
          });
        }
      }
    }
  }
  
  return { style, roomType, items };
}

function generateSynonyms(itemName: string, category: string, style: string): string[] {
  const synonyms: string[] = [];
  const lowerItem = itemName.toLowerCase();
  const lowerCategory = category.toLowerCase();
  
  // Add base variations
  synonyms.push(lowerItem);
  
  // Add style prefix
  synonyms.push(`${style} ${lowerItem}`);
  synonyms.push(`${style} style ${lowerItem}`);
  
  // Common variations
  if (lowerItem.includes('(')) {
    synonyms.push(lowerItem.replace(/\s*\([^)]*\)/g, '').trim());
  }
  
  // Category-specific synonyms
  if (lowerCategory.includes('sofa') || lowerCategory.includes('seating')) {
    if (lowerItem.includes('sofa')) {
      synonyms.push(lowerItem.replace('sofa', 'couch'));
    }
  }
  
  if (lowerCategory.includes('lamp')) {
    synonyms.push(lowerItem.replace('lamps', 'lighting'));
    synonyms.push(lowerItem.replace('lamp', 'light'));
  }
  
  return [...new Set(synonyms)].filter(s => s.length > 2);
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { action, markdownContent, fileName, items } = await req.json();
    
    if (action === 'parse') {
      // Parse markdown content from a single file
      const parsed = parseChecklistFromMarkdown(markdownContent, fileName);
      console.log(`Parsed ${parsed.items.length} items from ${fileName} (${parsed.style}/${parsed.roomType})`);
      
      return new Response(JSON.stringify({
        success: true,
        style: parsed.style,
        roomType: parsed.roomType,
        itemCount: parsed.items.length,
        items: parsed.items,
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    if (action === 'import') {
      // Import items into pricing_items table
      const insertItems: Array<{
        item_name: string;
        category: string;
        sub_category: string;
        budget_price: number;
        mid_premium_price: number;
        premium_price: number;
        unit: string;
        gst_percent: number;
        style_tags: string[];
        room_type: string;
        priority: string;
        keywords: string[];
        synonyms: string[];
        source: string;
        is_active: boolean;
      }> = [];
      
      const synonymsToInsert: Array<{
        canonical_name: string;
        synonym: string;
        confidence_score: number;
        category: string;
        source: string;
      }> = [];
      
      for (const item of items) {
        const categoryPricing = CATEGORY_PRICING[item.category] || CATEGORY_PRICING['DEFAULT'];
        const styleMultiplier = STYLE_MULTIPLIERS[item.style] || 1.0;
        
        // Apply style multiplier to prices
        const budgetPrice = Math.round(categoryPricing.budget * styleMultiplier);
        const midPrice = Math.round(categoryPricing.mid * styleMultiplier);
        const premiumPrice = Math.round(categoryPricing.premium * styleMultiplier);
        
        // Generate keywords from item name and notes
        const keywords = [
          ...item.itemName.toLowerCase().split(/\s+/),
          ...item.notes.toLowerCase().split(/\s+/).filter((w: string) => w.length > 3),
          item.style,
          item.roomType,
        ].filter((k: string) => k.length > 2);
        
        // Generate synonyms
        const synonyms = generateSynonyms(item.itemName, item.category, item.style);
        
        insertItems.push({
          item_name: item.itemName,
          category: item.category.toLowerCase().replace(/\s+/g, '_'),
          sub_category: item.category,
          budget_price: budgetPrice,
          mid_premium_price: midPrice,
          premium_price: premiumPrice,
          unit: categoryPricing.unit,
          gst_percent: 18,
          style_tags: [item.style],
          room_type: item.roomType,
          priority: item.priority,
          keywords: [...new Set(keywords)],
          synonyms: synonyms,
          source: 'excel_import',
          is_active: true,
        });
        
        // Add to synonyms table
        for (const syn of synonyms) {
          synonymsToInsert.push({
            canonical_name: item.itemName,
            synonym: syn,
            confidence_score: 0.9,
            category: item.category.toLowerCase().replace(/\s+/g, '_'),
            source: 'excel_import',
          });
        }
      }
      
      console.log(`Importing ${insertItems.length} pricing items and ${synonymsToInsert.length} synonyms`);
      
      // Insert pricing items in batches
      let insertedItems = 0;
      const batchSize = 100;
      
      for (let i = 0; i < insertItems.length; i += batchSize) {
        const batch = insertItems.slice(i, i + batchSize);
        const { error } = await supabase
          .from('pricing_items')
          .upsert(batch, { 
            onConflict: 'item_name,category',
            ignoreDuplicates: false 
          });
        
        if (error) {
          console.error(`Error inserting batch ${i / batchSize}:`, error);
        } else {
          insertedItems += batch.length;
        }
      }
      
      // Insert synonyms in batches
      let insertedSynonyms = 0;
      for (let i = 0; i < synonymsToInsert.length; i += batchSize) {
        const batch = synonymsToInsert.slice(i, i + batchSize);
        const { error } = await supabase
          .from('item_synonyms')
          .upsert(batch, { 
            onConflict: 'canonical_name,synonym',
            ignoreDuplicates: true 
          });
        
        if (error) {
          console.error(`Error inserting synonyms batch ${i / batchSize}:`, error);
        } else {
          insertedSynonyms += batch.length;
        }
      }
      
      return new Response(JSON.stringify({
        success: true,
        insertedItems,
        insertedSynonyms,
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    return new Response(JSON.stringify({
      error: 'Invalid action. Use "parse" or "import"',
    }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
    
  } catch (error: unknown) {
    console.error('Import error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({
      error: 'Import failed',
      message: errorMessage,
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
