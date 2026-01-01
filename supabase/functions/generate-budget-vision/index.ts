import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

/**
 * VISION-BASED BUDGET EXTRACTION (PRODUCTION VERSION)
 * 
 * This function:
 * 1. Uses vision AI to extract items from room image (NOT mock data)
 * 2. Matches extracted items to pricing database using synonyms
 * 3. Applies city-specific pricing
 * 4. Returns complete budget with match statistics
 * 
 * Created: 2026-01-01
 * Purpose: Fix "not reading the image well" issue
 */

interface ExtractedItem {
  item_name: string;
  category: string;
  specification?: string;
  quantity?: number;
  unit?: string;
}

interface BudgetItem {
  render_id: string;
  ai_item_name: string;
  ai_category: string;
  ai_description: string;
  quantity: number;
  unit: string;
  matched_item_id: string | null;
  unit_cost: number;
  total_cost: number;
  city_multiplier: number;
  status: string;
  confidence_score: number;
}

async function extractItemsFromImage(
  renderUrl: string,
  supabaseUrl: string,
  supabaseKey: string
): Promise<ExtractedItem[]> {
  console.log(`Calling vision-ai to extract items from image: ${renderUrl}`);
  
  const visionResponse = await fetch(`${supabaseUrl}/functions/v1/vision-ai`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${supabaseKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      action: 'itemizeBudget',
      imageUrls: [renderUrl]
    })
  });
  
  if (!visionResponse.ok) {
    const errorText = await visionResponse.text();
    console.error(`Vision AI error: ${visionResponse.status} - ${errorText}`);
    throw new Error(`Vision AI extraction failed: ${errorText}`);
  }
  
  const { result, error } = await visionResponse.json();
  
  if (error) {
    throw new Error(`Vision AI error: ${error}`);
  }
  
  const items = Array.isArray(result) ? result : [];
  console.log(`Vision AI extracted ${items.length} items`);
  
  return items;
}

async function matchItemToPricing(
  supabase: any,
  item: ExtractedItem,
  city: string
): Promise<{
  pricingItem: any;
  matchType: 'synonym' | 'direct' | 'category' | 'none';
  confidence: number;
  cityPrice: number;
}> {
  const itemName = item.item_name.toLowerCase().trim();
  const category = item.category.toLowerCase().trim();
  
  console.log(`Matching item: "${itemName}" (${category})`);
  
  // Strategy 1: Try synonym match (highest confidence)
  const { data: synonymMatches, error: synonymError } = await supabase
    .from('item_synonyms')
    .select('canonical_name, confidence_score')
    .ilike('synonym', itemName)
    .order('confidence_score', { ascending: false })
    .limit(3);
  
  if (!synonymError && synonymMatches && synonymMatches.length > 0) {
    // Try each synonym match until we find pricing
    for (const syn of synonymMatches) {
      const { data: pricingItem } = await supabase
        .from('pricing_items')
        .select('*')
        .ilike('item_name', syn.canonical_name)
        .limit(1)
        .single();
      
      if (pricingItem) {
        console.log(`  ✅ Synonym match: "${itemName}" → "${syn.canonical_name}" (${syn.confidence_score})`);
        
        // Get city-specific price
        const { data: cityPrice } = await supabase.rpc('get_city_price', {
          item_name: pricingItem.item_name,
          category: pricingItem.category,
          city: city
        });
        
        const finalPrice = cityPrice || pricingItem.base_price;
        
        return {
          pricingItem,
          matchType: 'synonym',
          confidence: syn.confidence_score,
          cityPrice: finalPrice
        };
      }
    }
  }
  
  // Strategy 2: Try direct name match
  const { data: directMatch } = await supabase
    .from('pricing_items')
    .select('*')
    .ilike('item_name', `%${itemName}%`)
    .limit(1)
    .single();
  
  if (directMatch) {
    console.log(`  ✅ Direct match: "${itemName}"`);
    
    const { data: cityPrice } = await supabase.rpc('get_city_price', {
      item_name: directMatch.item_name,
      category: directMatch.category,
      city: city
    });
    
    return {
      pricingItem: directMatch,
      matchType: 'direct',
      confidence: 0.80,
      cityPrice: cityPrice || directMatch.base_price
    };
  }
  
  // Strategy 3: Try category match (fallback)
  const { data: categoryMatch } = await supabase
    .from('pricing_items')
    .select('*')
    .ilike('category', `%${category}%`)
    .limit(1)
    .single();
  
  if (categoryMatch) {
    console.log(`  ⚠️ Category match only: "${category}"`);
    
    const { data: cityPrice } = await supabase.rpc('get_city_price', {
      item_name: categoryMatch.item_name,
      category: categoryMatch.category,
      city: city
    });
    
    return {
      pricingItem: categoryMatch,
      matchType: 'category',
      confidence: 0.50,
      cityPrice: cityPrice || categoryMatch.base_price
    };
  }
  
  console.log(`  ❌ No match found for: "${itemName}"`);
  
  return {
    pricingItem: null,
    matchType: 'none',
    confidence: 0,
    cityPrice: 0
  };
}

async function generateBudgetFromImage(
  supabase: any,
  renderUrl: string,
  renderId: string,
  city: string
): Promise<{ items: BudgetItem[], stats: any }> {
  const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
  
  // Step 1: Extract items from image using vision AI
  const extractedItems = await extractItemsFromImage(renderUrl, supabaseUrl, supabaseKey);
  
  if (extractedItems.length === 0) {
    console.warn('No items extracted from image');
    return { items: [], stats: { total: 0, matched: 0, matchRate: 0 } };
  }
  
  // Step 2: Match each item to pricing database
  const budgetItems: BudgetItem[] = [];
  const cityMultipliers: Record<string, number> = {
    'Mumbai': 1.10,
    'Delhi': 1.00,
    'Bangalore': 1.05,
    'Chennai': 0.95,
    'Hyderabad': 0.97,
    'Pune': 1.08,
    'Kolkata': 0.95,
    'Ahmedabad': 0.90,
    'Jaipur': 0.85,
    'Surat': 0.85,
    'Lucknow': 0.80,
    'Gurgaon': 1.00,
  };
  
  const cityMultiplier = cityMultipliers[city] || 1.00;
  
  for (const item of extractedItems) {
    const match = await matchItemToPricing(supabase, item, city);
    
    const quantity = item.quantity || 1;
    const unitCost = match.cityPrice;
    const totalCost = unitCost * quantity;
    
    budgetItems.push({
      render_id: renderId,
      ai_item_name: item.item_name,
      ai_category: item.category,
      ai_description: item.specification || '',
      quantity: quantity,
      unit: item.unit || 'nos',
      matched_item_id: match.pricingItem?.id || null,
      unit_cost: unitCost,
      total_cost: totalCost,
      city_multiplier: cityMultiplier,
      status: match.pricingItem ? 'approved' : 'pending',
      confidence_score: match.confidence
    });
  }
  
  const matched = budgetItems.filter(i => i.matched_item_id !== null).length;
  const total = budgetItems.length;
  const matchRate = total > 0 ? (matched / total) * 100 : 0;
  
  return {
    items: budgetItems,
    stats: {
      total,
      matched,
      unmatched: total - matched,
      matchRate: Math.round(matchRate * 10) / 10,
      city,
      cityMultiplier
    }
  };
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { renderId, renderUrl, city } = await req.json();
    
    if (!renderId) {
      throw new Error('renderId is required');
    }
    
    if (!renderUrl) {
      throw new Error('renderUrl is required');
    }
    
    console.log(`Generating vision-based budget for render: ${renderId}, city: ${city || 'Delhi'}`);

    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Generate budget from image
    const { items, stats } = await generateBudgetFromImage(
      supabase,
      renderUrl,
      renderId,
      city || 'Delhi'
    );

    // Delete existing budget items for this render
    const { error: deleteError } = await supabase
      .from('budget_items')
      .delete()
      .eq('render_id', renderId);

    if (deleteError) {
      console.error('Error deleting existing items:', deleteError);
      // Continue anyway - not critical
    }

    // Insert new items
    if (items.length > 0) {
      const { data, error: insertError } = await supabase
        .from('budget_items')
        .insert(items)
        .select();

      if (insertError) {
        console.error('Error inserting budget items:', insertError);
        throw insertError;
      }

      console.log(`Inserted ${data?.length || 0} budget items`);
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        stats,
        message: `Budget generated from image: ${stats.matched}/${stats.total} items matched (${stats.matchRate}%)`
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to generate budget';
    console.error('Error in generate-budget-vision:', errorMessage);
    console.error('Full error:', error);
    
    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        details: error instanceof Error ? error.stack : undefined
      }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
