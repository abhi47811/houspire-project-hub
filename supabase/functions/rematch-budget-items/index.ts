import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface BudgetItem {
  id: string;
  item_name: string;
  category: string;
  pricing_item_id: string | null;
  quantity: number;
  gst_percent: number;
  budget_tier: string;
}

interface PricingItem {
  id: string;
  item_name: string;
  category: string;
  budget_price: number;
  mid_premium_price: number;
  premium_price: number;
  gst_percent: number;
}

interface MatchResult {
  pricing_item: PricingItem;
  match_strategy: string;
  match_confidence: number;
}

// Calculate Levenshtein distance for fuzzy matching
function levenshteinDistance(str1: string, str2: string): number {
  const m = str1.length;
  const n = str2.length;
  const dp: number[][] = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));

  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]) + 1;
      }
    }
  }
  return dp[m][n];
}

// Calculate similarity score (0 to 1)
function similarityScore(str1: string, str2: string): number {
  const maxLen = Math.max(str1.length, str2.length);
  if (maxLen === 0) return 1;
  const distance = levenshteinDistance(str1, str2);
  return 1 - distance / maxLen;
}

// Normalize item name for comparison
function normalizeItemName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Get tier price from pricing item
function getTierPrice(pricingItem: PricingItem, tier: string): number {
  switch (tier) {
    case 'budget': return pricingItem.budget_price;
    case 'premium': return pricingItem.premium_price;
    default: return pricingItem.mid_premium_price;
  }
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { project_id, item_id } = await req.json();

    if (!project_id && !item_id) {
      return new Response(
        JSON.stringify({ error: 'project_id or item_id required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`[rematch] Starting rematch for project: ${project_id || 'N/A'}, item: ${item_id || 'N/A'}`);

    // Fetch unmatched budget items
    let query = supabase
      .from('budget_items')
      .select('id, item_name, category, pricing_item_id, quantity, gst_percent, budget_tier')
      .is('pricing_item_id', null);

    if (project_id) {
      query = query.eq('project_id', project_id);
    }
    if (item_id) {
      query = query.eq('id', item_id);
    }

    const { data: unmatchedItems, error: fetchError } = await query;

    if (fetchError) {
      console.error('[rematch] Error fetching items:', fetchError);
      throw fetchError;
    }

    if (!unmatchedItems || unmatchedItems.length === 0) {
      console.log('[rematch] No unmatched items found');
      return new Response(
        JSON.stringify({ matched: 0, total: 0, message: 'No unmatched items found' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`[rematch] Found ${unmatchedItems.length} unmatched items`);

    // Fetch all synonyms
    const { data: synonyms } = await supabase
      .from('item_synonyms')
      .select('synonym, canonical_name, category, confidence_score')
      .eq('is_active', true);

    // Fetch all active pricing items
    const { data: pricingItems } = await supabase
      .from('pricing_items')
      .select('id, item_name, category, budget_price, mid_premium_price, premium_price, gst_percent')
      .eq('is_active', true);

    if (!pricingItems || pricingItems.length === 0) {
      console.log('[rematch] No pricing items found');
      return new Response(
        JSON.stringify({ matched: 0, total: unmatchedItems.length, message: 'No pricing items in database' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`[rematch] Loaded ${synonyms?.length || 0} synonyms, ${pricingItems.length} pricing items`);

    let matchedCount = 0;
    const matchResults: { itemId: string; itemName: string; matchedTo: string; strategy: string }[] = [];

    for (const item of unmatchedItems as BudgetItem[]) {
      const normalizedName = normalizeItemName(item.item_name);
      let match: MatchResult | null = null;

      // Step 1: Direct match in pricing_items
      const directMatch = pricingItems.find(p => 
        normalizeItemName(p.item_name) === normalizedName &&
        (!item.category || p.category.toLowerCase() === item.category.toLowerCase())
      );

      if (directMatch) {
        match = {
          pricing_item: directMatch,
          match_strategy: 'direct',
          match_confidence: 1.0
        };
        console.log(`[rematch] Direct match: "${item.item_name}" -> "${directMatch.item_name}"`);
      }

      // Step 2: Synonym lookup
      if (!match && synonyms) {
        const synonymMatch = synonyms.find(s => 
          normalizeItemName(s.synonym) === normalizedName
        );

        if (synonymMatch) {
          const canonicalMatch = pricingItems.find(p =>
            normalizeItemName(p.item_name) === normalizeItemName(synonymMatch.canonical_name)
          );

          if (canonicalMatch) {
            match = {
              pricing_item: canonicalMatch,
              match_strategy: 'synonym',
              match_confidence: synonymMatch.confidence_score || 0.9
            };
            console.log(`[rematch] Synonym match: "${item.item_name}" -> "${synonymMatch.canonical_name}" -> "${canonicalMatch.item_name}"`);
          }
        }
      }

      // Step 3: Fuzzy match with similarity threshold
      if (!match) {
        let bestMatch: PricingItem | null = null;
        let bestScore = 0;
        const THRESHOLD = 0.65; // Lowered threshold for better matching

        // Normalize category for comparison (handle flooring vs Flooring)
        const normalizedCategory = item.category?.toLowerCase().replace(/_/g, ' ');
        
        // Filter by category if available, with flexible matching
        const categoryItems = normalizedCategory
          ? pricingItems.filter(p => {
              const pCat = p.category.toLowerCase().replace(/_/g, ' ');
              return pCat === normalizedCategory || 
                     pCat.includes(normalizedCategory) || 
                     normalizedCategory.includes(pCat);
            })
          : pricingItems;

        for (const pricingItem of categoryItems) {
          const score = similarityScore(normalizedName, normalizeItemName(pricingItem.item_name));
          if (score > bestScore && score >= THRESHOLD) {
            bestScore = score;
            bestMatch = pricingItem;
          }
        }

        // Also check against synonyms for fuzzy match
        if (synonyms) {
          for (const syn of synonyms) {
            const synScore = similarityScore(normalizedName, normalizeItemName(syn.synonym));
            if (synScore > bestScore && synScore >= THRESHOLD) {
              const canonicalPricing = pricingItems.find(p =>
                normalizeItemName(p.item_name) === normalizeItemName(syn.canonical_name)
              );
              if (canonicalPricing) {
                bestScore = synScore;
                bestMatch = canonicalPricing;
              }
            }
          }
        }

        if (bestMatch) {
          match = {
            pricing_item: bestMatch,
            match_strategy: 'fuzzy',
            match_confidence: bestScore
          };
          console.log(`[rematch] Fuzzy match: "${item.item_name}" -> "${bestMatch.item_name}" (score: ${bestScore.toFixed(2)})`);
        }
      }

      // Update the budget item if matched
      if (match) {
        const tierPrice = getTierPrice(match.pricing_item, item.budget_tier || 'mid_premium');
        const amount = tierPrice * item.quantity;
        const gstAmount = amount * (item.gst_percent / 100);

        // Note: amount, gst_amount, total are generated columns - only update rate
        const { error: updateError } = await supabase
          .from('budget_items')
          .update({
            pricing_item_id: match.pricing_item.id,
            match_strategy: match.match_strategy,
            match_confidence: match.match_confidence,
            rate: tierPrice,
            status: 'matched',
            updated_at: new Date().toISOString()
          })
          .eq('id', item.id);

        if (updateError) {
          console.error(`[rematch] Error updating item ${item.id}:`, updateError);
        } else {
          matchedCount++;
          matchResults.push({
            itemId: item.id,
            itemName: item.item_name,
            matchedTo: match.pricing_item.item_name,
            strategy: match.match_strategy
          });
        }
      } else {
        console.log(`[rematch] No match found for: "${item.item_name}" (category: ${item.category})`);
      }
    }

    console.log(`[rematch] Completed: ${matchedCount}/${unmatchedItems.length} items matched`);

    return new Response(
      JSON.stringify({
        matched: matchedCount,
        total: unmatchedItems.length,
        unmatched: unmatchedItems.length - matchedCount,
        results: matchResults,
        message: `Successfully matched ${matchedCount} of ${unmatchedItems.length} items`
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: unknown) {
    console.error('[rematch] Error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
