import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
const OPENROUTER_API_KEY = Deno.env.get("OPENROUTER_API_KEY");

// City multipliers for pricing
const cityMultipliers: Record<string, number> = {
  'Mumbai': 1.2,
  'Delhi': 1.15,
  'Bangalore': 1.1,
  'Chennai': 1.05,
  'Hyderabad': 1.0,
  'Pune': 1.05,
  'Kolkata': 0.95,
  'Ahmedabad': 0.9,
  'Jaipur': 0.85,
  'Surat': 0.85,
  'Lucknow': 0.8,
};

// Normalize item name for matching
function normalizeName(name: string): string {
  return name.toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Calculate Levenshtein distance for fuzzy matching
function levenshteinDistance(a: string, b: string): number {
  const matrix: number[][] = [];
  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }
  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }
  return matrix[b.length][a.length];
}

// Find best match in pricing items
async function findBestMatch(
  supabase: any,
  itemName: string,
  category: string
): Promise<{ pricingItem: any; matchStrategy: string; confidence: number } | null> {
  const normalized = normalizeName(itemName);
  
  // Strategy 1: Direct match in pricing_items
  const { data: directMatches } = await supabase
    .from('pricing_items')
    .select('*')
    .eq('is_active', true)
    .or(`item_name.ilike.%${normalized}%,synonyms.cs.{${normalized}}`);
  
  if (directMatches && directMatches.length > 0) {
    // Find closest match
    let bestMatch = directMatches[0];
    let bestDistance = levenshteinDistance(normalized, normalizeName(bestMatch.item_name));
    
    for (const match of directMatches) {
      const distance = levenshteinDistance(normalized, normalizeName(match.item_name));
      if (distance < bestDistance) {
        bestMatch = match;
        bestDistance = distance;
      }
    }
    
    const maxLen = Math.max(normalized.length, normalizeName(bestMatch.item_name).length);
    const similarity = 1 - (bestDistance / maxLen);
    
    if (similarity >= 0.5) {
      return { pricingItem: bestMatch, matchStrategy: 'direct', confidence: similarity };
    }
  }
  
  // Strategy 2: Synonym lookup
  const { data: synonyms } = await supabase
    .from('item_synonyms')
    .select('*')
    .eq('is_active', true)
    .ilike('synonym', `%${normalized}%`);
  
  if (synonyms && synonyms.length > 0) {
    // Find pricing item by canonical name
    for (const syn of synonyms) {
      const { data: pricingItems } = await supabase
        .from('pricing_items')
        .select('*')
        .eq('is_active', true)
        .ilike('item_name', `%${syn.canonical_name}%`)
        .limit(1);
      
      if (pricingItems && pricingItems.length > 0) {
        return { 
          pricingItem: pricingItems[0], 
          matchStrategy: 'synonym', 
          confidence: syn.confidence_score || 0.85 
        };
      }
    }
  }
  
  // Strategy 3: Fuzzy match with category filter
  const normalizedCategory = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
  const { data: categoryItems } = await supabase
    .from('pricing_items')
    .select('*')
    .eq('is_active', true)
    .or(`category.eq.${normalizedCategory},category.ilike.%${category}%`);
  
  if (categoryItems && categoryItems.length > 0) {
    let bestMatch = null;
    let bestSimilarity = 0;
    
    for (const item of categoryItems) {
      const itemNorm = normalizeName(item.item_name);
      const distance = levenshteinDistance(normalized, itemNorm);
      const maxLen = Math.max(normalized.length, itemNorm.length);
      const similarity = 1 - (distance / maxLen);
      
      if (similarity > bestSimilarity && similarity >= 0.45) {
        bestMatch = item;
        bestSimilarity = similarity;
      }
    }
    
    if (bestMatch) {
      return { pricingItem: bestMatch, matchStrategy: 'fuzzy', confidence: bestSimilarity };
    }
  }
  
  return null;
}

// Analyze room image using AI vision
async function analyzeRoomWithVision(
  imageUrl: string,
  roomType: string
): Promise<any[]> {
  const apiKey = OPENROUTER_API_KEY || LOVABLE_API_KEY;
  
  if (!apiKey) {
    console.log("No API key configured, using fallback extraction");
    return [];
  }
  
  const apiUrl = OPENROUTER_API_KEY 
    ? "https://openrouter.ai/api/v1/chat/completions"
    : "https://ai.gateway.lovable.dev/v1/chat/completions";
  
  const systemPrompt = `You are an expert interior design estimator. Analyze this room image and extract ALL visible items for budget estimation.

IMPORTANT: Be thorough and identify EVERY item visible in the image:
- Furniture: sofas, chairs, tables, beds, wardrobes, shelves, TV units, desks
- Lighting: chandeliers, pendant lights, floor lamps, table lamps, ceiling lights, spotlights, LED strips
- Decor: cushions, throws, rugs, curtains, artwork, mirrors, plants, vases
- Flooring: tiles, marble, wood, carpet
- Wall treatment: paint, wallpaper, paneling, accent walls
- Ceiling: false ceiling, cove lighting, fans
- Fixtures: electrical points, switches, AC units

For EACH item, provide:
- item_name: specific descriptive name (e.g., "brown leather 3-seater sofa", "industrial tripod floor lamp")
- category: one of [flooring, wall_treatment, ceiling, furniture, lighting, fixtures, decor]
- specification: detailed specs like material, color, size, style
- quantity: count (be precise - count each item)
- unit: sqft, nos, rft, mtr, set as appropriate

Return ONLY a JSON array of items. Be comprehensive - miss nothing!`;

  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        ...(OPENROUTER_API_KEY && {
          "HTTP-Referer": "https://houspire.app",
          "X-Title": "Houspire Budget Extraction"
        })
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { 
            role: "user", 
            content: [
              { type: "text", text: `Analyze this ${roomType || 'room'} image and extract ALL items for budget estimation. Be thorough!` },
              { type: "image_url", image_url: { url: imageUrl } }
            ]
          }
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Vision API error: ${response.status} - ${errorText}`);
      return [];
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;
    
    if (!content) {
      console.error("No content in vision response");
      return [];
    }

    try {
      const parsed = JSON.parse(content);
      // Handle both array and object with items array
      const items = Array.isArray(parsed) ? parsed : (parsed.items || parsed.budget_items || []);
      console.log(`Vision extracted ${items.length} items from image`);
      return items;
    } catch (e) {
      console.error("Failed to parse vision response:", e);
      return [];
    }
  } catch (error) {
    console.error("Vision API call failed:", error);
    return [];
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { projectId, city, roomId } = await req.json();
    
    if (!projectId) {
      throw new Error('Project ID is required');
    }

    console.log(`Generating budget for project: ${projectId}, city: ${city}, roomId: ${roomId}`);

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const multiplier = cityMultipliers[city] || 1.0;

    // Get render images for the project/room
    let renders: any[] = [];
    
    if (roomId) {
      // Get renders for specific room
      const { data } = await supabase
        .from('renders')
        .select('id, image_url, room_id, rooms!inner(room_type)')
        .eq('room_id', roomId)
        .order('created_at', { ascending: false })
        .limit(3);
      renders = data || [];
    } else {
      // Get renders for all rooms in project
      const { data } = await supabase
        .from('renders')
        .select('id, image_url, room_id, rooms!inner(room_type, project_id)')
        .eq('rooms.project_id', projectId)
        .order('created_at', { ascending: false })
        .limit(10);
      renders = data || [];
    }

    console.log(`Found ${renders.length} renders to analyze`);

    // Delete existing budget items for this project
    const { error: deleteError } = await supabase
      .from('budget_items')
      .delete()
      .eq('project_id', projectId);

    if (deleteError) {
      console.error('Error deleting existing items:', deleteError);
      throw deleteError;
    }

    const allBudgetItems: any[] = [];
    const processedRooms = new Set<string>();

    // Analyze each render with AI vision
    for (const render of renders) {
      // Skip if we already processed this room (take latest render only)
      if (processedRooms.has(render.room_id)) {
        continue;
      }
      processedRooms.add(render.room_id);

      const roomType = render.rooms?.room_type || 'living_room';
      console.log(`Analyzing render ${render.id} for room type: ${roomType}`);

      // Extract items using AI vision
      const extractedItems = await analyzeRoomWithVision(render.image_url, roomType);

      for (let i = 0; i < extractedItems.length; i++) {
        const item = extractedItems[i];
        
        // Find matching pricing item
        const match = await findBestMatch(supabase, item.item_name, item.category);
        
        const budgetItem: any = {
          project_id: projectId,
          room_id: render.room_id,
          render_id: render.id,
          category: item.category || 'furniture',
          item_name: item.item_name,
          ai_item_name: item.item_name,
          specification: item.specification || '',
          quantity: item.quantity || 1,
          unit: item.unit || 'nos',
          sort_order: allBudgetItems.length + 1,
          status: 'pending',
          ai_category: item.category,
          ai_confidence: match?.confidence || 0,
        };

        if (match) {
          // Use pricing from matched item
          const tierPrice = match.pricingItem.mid_premium_price || match.pricingItem.budget_price || 0;
          budgetItem.pricing_item_id = match.pricingItem.id;
          budgetItem.match_strategy = match.matchStrategy;
          budgetItem.match_confidence = match.confidence;
          budgetItem.rate = Math.round(tierPrice * multiplier);
          budgetItem.gst_percent = match.pricingItem.gst_percent || 18;
        } else {
          // No match - estimate based on category
          budgetItem.match_strategy = 'unmatched';
          budgetItem.match_confidence = 0;
          budgetItem.rate = 0;
          budgetItem.gst_percent = 18;
        }

        allBudgetItems.push(budgetItem);
      }
    }

    console.log(`Total items extracted: ${allBudgetItems.length}`);

    // Insert all budget items
    if (allBudgetItems.length > 0) {
      const { data, error: insertError } = await supabase
        .from('budget_items')
        .insert(allBudgetItems)
        .select();

      if (insertError) {
        console.error('Error inserting budget items:', insertError);
        throw insertError;
      }

      const matchedCount = allBudgetItems.filter(i => i.pricing_item_id).length;
      const unmatchedCount = allBudgetItems.length - matchedCount;

      console.log(`Inserted ${data?.length || 0} items (${matchedCount} matched, ${unmatchedCount} unmatched)`);

      return new Response(
        JSON.stringify({ 
          success: true, 
          itemsCount: data?.length || 0,
          matchedCount,
          unmatchedCount,
          rendersAnalyzed: processedRooms.size,
          message: `Budget generated from ${processedRooms.size} room(s) using AI vision`
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } else {
      // No renders found or no items extracted
      return new Response(
        JSON.stringify({ 
          success: true, 
          itemsCount: 0,
          matchedCount: 0,
          unmatchedCount: 0,
          message: 'No renders found to analyze. Please generate room renders first.'
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to generate budget';
    console.error('Error in generate-budget:', errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
