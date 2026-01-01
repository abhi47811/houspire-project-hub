import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Gemini API configuration
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

interface ExtractedItem {
  item_name: string;
  category: string;
  sub_category?: string;
  quantity: number;
  unit: string;
  specifications?: Record<string, any>;
  confidence: number;
  location_in_image?: string;
}

interface PricingMatch {
  pricing_item_id: string;
  item_name: string;
  match_strategy: 'exact' | 'synonym' | 'fuzzy' | 'llm';
  match_confidence: number;
  tier_price: number;
  city_price: number;
  gst_percent: number;
}

interface AlternativeMatch {
  pricing_item_id: string;
  item_name: string;
  category: string;
  match_score: number;
  tier_price: number;
}

Deno.serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const GEMINI_API_KEY = Deno.env.get("GOOGLE_AI_API_KEY");
    if (!GEMINI_API_KEY) {
      throw new Error("GOOGLE_AI_API_KEY not configured");
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { render_id, project_id, room_id, budget_tier = 'mid_premium' } = await req.json();

    if (!render_id || !project_id) {
      throw new Error("render_id and project_id are required");
    }

    console.log(`[extract-budget-items] Starting extraction for render: ${render_id}`);

    // 1. Get render and project details
    const { data: render, error: renderError } = await supabase
      .from('renders')
      .select('id, image_url, room_id')
      .eq('id', render_id)
      .single();

    if (renderError || !render) {
      throw new Error(`Render not found: ${renderError?.message}`);
    }

    const { data: project, error: projectError } = await supabase
      .from('projects')
      .select('id, name, city, budget_tier')
      .eq('id', project_id)
      .single();

    if (projectError || !project) {
      throw new Error(`Project not found: ${projectError?.message}`);
    }

    const city = project.city || 'Hyderabad';
    const effectiveTier = budget_tier || project.budget_tier || 'mid_premium';

    console.log(`[extract-budget-items] City: ${city}, Tier: ${effectiveTier}`);

    // 2. Call Gemini Vision to extract items from render
    const extractedItems = await extractItemsFromRender(render.image_url, GEMINI_API_KEY);
    console.log(`[extract-budget-items] Extracted ${extractedItems.length} items from render`);

    // 3. Create extraction batch ID
    const extractionBatchId = crypto.randomUUID();

    // 4. Match each item to pricing database and insert budget_items
    const insertedItems: any[] = [];
    
    for (const item of extractedItems) {
      try {
        // Try to match item to pricing database
        const match = await matchItemToPricing(supabase, item, city, effectiveTier);
        
        // Get alternative matches
        const alternatives = await getAlternativeMatches(supabase, item, city, effectiveTier);

        // Calculate pricing
        let rate = 0;
        let gstPercent = 18;
        
        if (match) {
          rate = match.city_price;
          gstPercent = match.gst_percent;
        }

        const amount = rate * item.quantity;
        const gstAmount = amount * (gstPercent / 100);
        const total = amount + gstAmount;

        // Insert budget item
        const { data: budgetItem, error: insertError } = await supabase
          .from('budget_items')
          .insert({
            project_id,
            room_id: room_id || render.room_id,
            render_id,
            item_name: match?.item_name || item.item_name,
            category: item.category,
            specification: item.specifications ? JSON.stringify(item.specifications) : null,
            quantity: item.quantity,
            unit: item.unit,
            rate,
            amount,
            gst_percent: gstPercent,
            gst_amount: gstAmount,
            total,
            status: match ? 'pending' : 'unmatched',
            // AI extraction fields
            ai_item_name: item.item_name,
            ai_category: item.category,
            ai_confidence: item.confidence,
            ai_specifications: item.specifications || {},
            // Matching fields
            pricing_item_id: match?.pricing_item_id || null,
            match_strategy: match?.match_strategy || null,
            match_confidence: match?.match_confidence || null,
            alternative_matches: alternatives,
            // Metadata
            extraction_batch_id: extractionBatchId,
            budget_tier: effectiveTier,
          })
          .select()
          .single();

        if (insertError) {
          console.error(`[extract-budget-items] Failed to insert item: ${item.item_name}`, insertError);
        } else {
          insertedItems.push(budgetItem);
        }
      } catch (itemError) {
        console.error(`[extract-budget-items] Error processing item: ${item.item_name}`, itemError);
      }
    }

    console.log(`[extract-budget-items] Inserted ${insertedItems.length} budget items`);

    // 5. Calculate totals
    const subtotal = insertedItems.reduce((sum, item) => sum + (item.amount || 0), 0);
    const totalGst = insertedItems.reduce((sum, item) => sum + (item.gst_amount || 0), 0);
    const grandTotal = subtotal + totalGst;

    // 6. Send notification to user
    const { data: projectOwner } = await supabase
      .from('projects')
      .select('created_by')
      .eq('id', project_id)
      .single();

    if (projectOwner?.created_by) {
      await supabase.from('notifications').insert({
        user_id: projectOwner.created_by,
        title: 'Budget Extraction Complete',
        message: `Extracted ${insertedItems.length} items from render. Total: ₹${grandTotal.toLocaleString('en-IN')}`,
        type: 'success',
        link: `/projects/${project_id}/budget`,
      });
    }

    return new Response(JSON.stringify({
      success: true,
      extraction_batch_id: extractionBatchId,
      items_count: insertedItems.length,
      matched_count: insertedItems.filter(i => i.pricing_item_id).length,
      unmatched_count: insertedItems.filter(i => !i.pricing_item_id).length,
      subtotal,
      total_gst: totalGst,
      grand_total: grandTotal,
      items: insertedItems,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error: unknown) {
    console.error('[extract-budget-items] Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({
      success: false,
      error: errorMessage,
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

/**
 * Extract items from render image using Gemini Vision
 */
async function extractItemsFromRender(imageUrl: string, apiKey: string): Promise<ExtractedItem[]> {
  const prompt = `You are an expert interior designer analyzing a room render image.

TASK: Identify ALL furniture, finishes, fixtures, and decor items visible in this room.

For each item, provide:
1. item_name: Specific name (e.g., "3-seater fabric sofa", "Wooden TV unit 6ft", "Vitrified floor tiles 2x2")
2. category: One of [Furniture, Flooring, Wall Finish, Ceiling, Lighting, Soft Furnishings, Decor, Storage, Fixtures, Appliances]
3. sub_category: More specific (e.g., "Seating", "Tables", "Tiles", "Paint", "Pendant Light")
4. quantity: Number visible (default 1)
5. unit: nos, sqft, rft, set (based on item type)
6. specifications: Object with relevant details like:
   - material (fabric, wood, marble, etc.)
   - finish (matte, glossy, textured)
   - color
   - dimensions if apparent
7. confidence: 0.0-1.0 how sure you are
8. location_in_image: Where in the room (center, left wall, floor, ceiling)

IMPORTANT:
- Include FLOOR FINISHES (tiles, marble, wood flooring) with approximate sqft
- Include WALL FINISHES (paint, wallpaper, panels) with approximate sqft
- Include CEILING details (false ceiling, molding)
- Be specific about furniture sizes (2-seater vs 3-seater, 4ft vs 6ft)
- Estimate quantities for items like cushions, lights, panels

Return a JSON array of items. Example:
[
  {
    "item_name": "L-shaped sectional sofa",
    "category": "Furniture",
    "sub_category": "Seating",
    "quantity": 1,
    "unit": "nos",
    "specifications": {
      "material": "fabric",
      "color": "beige",
      "type": "L-shaped",
      "seating": "6-seater"
    },
    "confidence": 0.95,
    "location_in_image": "center"
  },
  {
    "item_name": "Vitrified floor tiles 2x2",
    "category": "Flooring",
    "sub_category": "Tiles",
    "quantity": 150,
    "unit": "sqft",
    "specifications": {
      "material": "vitrified",
      "finish": "glossy",
      "color": "beige",
      "size": "2x2 ft"
    },
    "confidence": 0.9,
    "location_in_image": "floor"
  }
]

Return ONLY the JSON array, no other text.`;

  try {
    // Fetch image and convert to base64
    const imageResponse = await fetch(imageUrl);
    const imageBuffer = await imageResponse.arrayBuffer();
    const base64Image = btoa(String.fromCharCode(...new Uint8Array(imageBuffer)));
    const mimeType = imageResponse.headers.get('content-type') || 'image/jpeg';

    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          parts: [
            { text: prompt },
            {
              inline_data: {
                mime_type: mimeType,
                data: base64Image,
              }
            }
          ]
        }],
        generationConfig: {
          temperature: 0.1,
          topP: 0.8,
          maxOutputTokens: 4096,
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    const textResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || '[]';
    
    // Parse JSON from response
    const jsonMatch = textResponse.match(/\[[\s\S]*\]/);
    if (!jsonMatch) {
      console.error('[extract-budget-items] Failed to parse Gemini response:', textResponse);
      return [];
    }

    const items = JSON.parse(jsonMatch[0]) as ExtractedItem[];
    return items;

  } catch (error) {
    console.error('[extract-budget-items] Gemini extraction error:', error);
    return [];
  }
}

/**
 * Match extracted item to pricing database using 4-strategy algorithm
 */
async function matchItemToPricing(
  supabase: any,
  item: ExtractedItem,
  city: string,
  tier: string
): Promise<PricingMatch | null> {
  const itemName = item.item_name.toLowerCase().trim();
  const category = item.category;

  // Strategy 1: Exact match
  const { data: exactMatch } = await supabase
    .from('pricing_items')
    .select('*')
    .ilike('item_name', itemName)
    .eq('category', category)
    .eq('is_active', true)
    .limit(1)
    .single();

  if (exactMatch) {
    return buildPricingMatch(exactMatch, 'exact', 1.0, city, tier);
  }

  // Strategy 2: Synonym match
  const { data: synonymMatch } = await supabase
    .from('item_synonyms')
    .select('canonical_name, confidence_score')
    .ilike('synonym', itemName)
    .eq('is_active', true)
    .limit(1)
    .single();

  if (synonymMatch) {
    const { data: canonicalItem } = await supabase
      .from('pricing_items')
      .select('*')
      .ilike('item_name', synonymMatch.canonical_name)
      .eq('is_active', true)
      .limit(1)
      .single();

    if (canonicalItem) {
      return buildPricingMatch(canonicalItem, 'synonym', synonymMatch.confidence_score, city, tier);
    }
  }

  // Strategy 3: Fuzzy match (contains search)
  const keywords = itemName.split(' ').filter(w => w.length > 2);
  if (keywords.length > 0) {
    const { data: fuzzyMatches } = await supabase
      .from('pricing_items')
      .select('*')
      .eq('category', category)
      .eq('is_active', true)
      .or(keywords.map(k => `item_name.ilike.%${k}%`).join(','))
      .limit(5);

    if (fuzzyMatches && fuzzyMatches.length > 0) {
      // Score matches by keyword overlap
      const scored = fuzzyMatches.map((m: any) => {
        const matchedKeywords = keywords.filter(k => 
          m.item_name.toLowerCase().includes(k)
        );
        return {
          item: m,
          score: matchedKeywords.length / keywords.length,
        };
      }).sort((a: { item: any; score: number }, b: { item: any; score: number }) => b.score - a.score);

      if (scored[0].score >= 0.5) {
        return buildPricingMatch(scored[0].item, 'fuzzy', scored[0].score, city, tier);
      }
    }
  }

  // Strategy 4: No match found - return null (item will be marked as 'unmatched')
  return null;
}

/**
 * Get alternative matches for an item
 */
async function getAlternativeMatches(
  supabase: any,
  item: ExtractedItem,
  city: string,
  tier: string
): Promise<AlternativeMatch[]> {
  const { data: alternatives } = await supabase
    .from('pricing_items')
    .select('id, item_name, category, budget_price, mid_premium_price, premium_price')
    .eq('category', item.category)
    .eq('is_active', true)
    .limit(5);

  if (!alternatives) return [];

  return alternatives.map((alt: any) => {
    const tierPrice = tier === 'budget' ? alt.budget_price 
      : tier === 'premium' ? alt.premium_price 
      : alt.mid_premium_price;

    return {
      pricing_item_id: alt.id,
      item_name: alt.item_name,
      category: alt.category,
      match_score: 0.5, // Default score for alternatives
      tier_price: tierPrice,
    };
  });
}

/**
 * Build pricing match result with city-specific pricing
 */
function buildPricingMatch(
  pricingItem: any,
  strategy: 'exact' | 'synonym' | 'fuzzy' | 'llm',
  confidence: number,
  city: string,
  tier: string
): PricingMatch {
  // Get tier price
  const tierPrice = tier === 'budget' ? pricingItem.budget_price 
    : tier === 'premium' ? pricingItem.premium_price 
    : pricingItem.mid_premium_price;

  // Get city multiplier
  const cityKey = `${city.toLowerCase()}_multiplier`;
  const multiplier = pricingItem[cityKey] || 1.0;
  const cityPrice = tierPrice * multiplier;

  return {
    pricing_item_id: pricingItem.id,
    item_name: pricingItem.item_name,
    match_strategy: strategy,
    match_confidence: confidence,
    tier_price: tierPrice,
    city_price: cityPrice,
    gst_percent: pricingItem.gst_percent || 18,
  };
}
