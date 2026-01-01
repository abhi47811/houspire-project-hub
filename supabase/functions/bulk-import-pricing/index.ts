import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PricingItem {
  item_name: string;
  category: string;
  sub_category?: string;
  budget_price: number;
  mid_premium_price: number;
  premium_price: number;
  unit: string;
  style: string;
  room_type: string;
  priority: string;
  notes?: string;
  source_file?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { items, generateSynonyms = false } = await req.json() as { 
      items: PricingItem[]; 
      generateSynonyms?: boolean;
    };

    if (!items || !Array.isArray(items)) {
      return new Response(
        JSON.stringify({ error: 'Items array is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Processing ${items.length} items for import...`);

    // City multipliers
    const cityMultipliers = {
      hyderabad: 1.0,
      mumbai: 1.15,
      delhi: 1.10,
      bangalore: 1.05,
      chennai: 0.95,
      pune: 1.0,
      kolkata: 0.95,
      ahmedabad: 0.90,
      jaipur: 0.85,
      lucknow: 0.80,
      surat: 0.85,
    };

    // Clean category names for mapping
    const categoryMap: Record<string, string> = {
      'DEFAULT': 'Furniture',
      'FLOORING': 'Flooring',
      'SEATING': 'Furniture',
      'PLANTS': 'Decor',
      'WALL SCONCES': 'Lighting',
      'CEILING': 'Ceiling',
      'MIRROR': 'Decor',
      'ARTWORK': 'Decor',
      'ACCESSORIES': 'Decor',
      'VANITY': 'Fixtures',
      'SINK': 'Fixtures',
      'FAUCET': 'Fixtures',
      'TOILET': 'Fixtures',
      'STORAGE': 'Storage',
      'TOWELS': 'Soft Furnishings',
      'RUGS': 'Soft Furnishings',
      'CURTAINS': 'Soft Furnishings',
      'BLINDS': 'Soft Furnishings',
      'BED': 'Furniture',
      'MATTRESS': 'Furniture',
      'BEDDING': 'Soft Furnishings',
      'WARDROBE': 'Storage',
      'DRESSER': 'Furniture',
      'NIGHTSTAND': 'Furniture',
      'SIDE TABLES': 'Furniture',
      'SOFA': 'Furniture',
      'ACCENT CHAIRS': 'Furniture',
      'COFFEE TABLE': 'Furniture',
      'TV UNIT': 'Furniture',
      'DINING TABLE': 'Furniture',
      'DINING CHAIRS': 'Furniture',
      'CABINET': 'Storage',
      'COUNTER': 'Fixtures',
      'BACKSPLASH': 'Finishes',
      'APPLIANCES': 'Appliances',
      'PENDANT': 'Lighting',
      'CHANDELIER': 'Lighting',
      'TABLE LAMP': 'Lighting',
      'FLOOR LAMP': 'Lighting',
      'WALL ART': 'Decor',
    };

    // Process items in batches of 100
    const batchSize = 100;
    let inserted = 0;
    let updated = 0;
    let errors: string[] = [];
    const synonymsToCreate: Array<{ synonym: string; canonical_name: string; category: string }> = [];

    for (let i = 0; i < items.length; i += batchSize) {
      const batch = items.slice(i, i + batchSize);
      
      const processedItems = batch
        .filter(item => {
          // Filter out header rows or invalid items
          if (!item.item_name || item.item_name === 'CATEGORY' || item.item_name === 'SUB-CATEGORY') {
            return false;
          }
          return true;
        })
        .map(item => {
          const cleanCategory = categoryMap[item.category?.toUpperCase()] || item.category || 'Other';
          const styleSlug = item.style?.toLowerCase().replace(/\s+/g, '_') || 'general';
          
          // Generate synonyms for this item
          if (generateSynonyms) {
            // Add style-prefixed synonym
            synonymsToCreate.push({
              synonym: `${styleSlug.replace(/_/g, ' ')} ${item.item_name.toLowerCase()}`,
              canonical_name: item.item_name,
              category: cleanCategory,
            });
            
            // Add room-prefixed synonym
            if (item.room_type) {
              synonymsToCreate.push({
                synonym: `${item.room_type} ${item.item_name.toLowerCase()}`,
                canonical_name: item.item_name,
                category: cleanCategory,
              });
            }
          }

          return {
            item_name: item.item_name.trim(),
            category: cleanCategory,
            sub_category: item.sub_category || null,
            budget_price: Number(item.budget_price) || 0,
            mid_premium_price: Number(item.mid_premium_price) || 0,
            premium_price: Number(item.premium_price) || 0,
            unit: item.unit || 'nos',
            style_tags: [styleSlug],
            room_type: item.room_type || null,
            priority: item.priority || 'RECOMMENDED',
            specification: item.notes || null,
            source: 'excel_import',
            is_active: true,
            gst_percent: 18,
            // City multipliers
            hyderabad_multiplier: cityMultipliers.hyderabad,
            mumbai_multiplier: cityMultipliers.mumbai,
            delhi_multiplier: cityMultipliers.delhi,
            bangalore_multiplier: cityMultipliers.bangalore,
            chennai_multiplier: cityMultipliers.chennai,
            pune_multiplier: cityMultipliers.pune,
            kolkata_multiplier: cityMultipliers.kolkata,
            ahmedabad_multiplier: cityMultipliers.ahmedabad,
            jaipur_multiplier: cityMultipliers.jaipur,
            lucknow_multiplier: cityMultipliers.lucknow,
            surat_multiplier: cityMultipliers.surat,
          };
        });

      if (processedItems.length === 0) continue;

      // Upsert items - update style_tags if exists, insert if not
      const { data, error } = await supabase
        .from('pricing_items')
        .upsert(processedItems, {
          onConflict: 'item_name,category',
          ignoreDuplicates: false,
        })
        .select('id');

      if (error) {
        console.error(`Batch ${Math.floor(i / batchSize) + 1} error:`, error);
        errors.push(`Batch ${Math.floor(i / batchSize) + 1}: ${error.message}`);
      } else {
        const count = data?.length || processedItems.length;
        inserted += count;
        console.log(`Batch ${Math.floor(i / batchSize) + 1}: Processed ${count} items`);
      }
    }

    // Insert synonyms if requested
    let synonymsInserted = 0;
    if (generateSynonyms && synonymsToCreate.length > 0) {
      // Deduplicate synonyms
      const uniqueSynonyms = Array.from(
        new Map(synonymsToCreate.map(s => [s.synonym, s])).values()
      );

      // Insert in batches
      for (let i = 0; i < uniqueSynonyms.length; i += batchSize) {
        const batch = uniqueSynonyms.slice(i, i + batchSize).map(s => ({
          synonym: s.synonym,
          canonical_name: s.canonical_name,
          category: s.category,
          source: 'auto_generated',
          confidence_score: 0.85,
          is_active: true,
        }));

        const { error } = await supabase
          .from('item_synonyms')
          .upsert(batch, {
            onConflict: 'synonym,canonical_name',
            ignoreDuplicates: true,
          });

        if (!error) {
          synonymsInserted += batch.length;
        }
      }
    }

    // Get final counts
    const { count: totalItems } = await supabase
      .from('pricing_items')
      .select('*', { count: 'exact', head: true });

    const { count: totalSynonyms } = await supabase
      .from('item_synonyms')
      .select('*', { count: 'exact', head: true });

    const result = {
      success: true,
      processed: items.length,
      inserted,
      errors: errors.length > 0 ? errors : undefined,
      synonymsGenerated: generateSynonyms ? synonymsInserted : 0,
      totals: {
        pricingItems: totalItems,
        synonyms: totalSynonyms,
      },
    };

    console.log('Import complete:', result);

    return new Response(
      JSON.stringify(result),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Bulk import error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
