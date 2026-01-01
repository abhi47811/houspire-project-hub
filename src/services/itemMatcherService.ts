/**
 * 4-STRATEGY ITEM MATCHING ENGINE
 * Based on Module_19_Budget_Item_Matching.md
 * 
 * Goal: 100% match rate, ≥95% accuracy, <100ms per item
 * Strategies: Exact → Synonym → Contains → Token-based → Keyword Fallback
 */

import { supabase } from '@/integrations/supabase/client';

export interface MatchResult {
  pricing_item_id: string;
  item_name: string;
  category: string;
  match_strategy: 'exact' | 'synonym' | 'fuzzy' | 'token' | 'keyword';
  match_confidence: number;
  alternative_matches: AlternativeMatch[];
  rate: number;
  unit: string;
  gst_percent: number;
}

export interface AlternativeMatch {
  pricing_item_id: string;
  item_name: string;
  match_score: number;
  rate: number;
}

export interface ExtractedItem {
  name: string;
  category: string;
  confidence: number;
  quantity: number;
  specifications?: string;
}

/**
 * NORMALIZATION: Convert item name to canonical form
 * - Lowercase
 * - Remove punctuation
 * - Collapse spaces
 * - Remove articles (a, an, the)
 */
function normalizeItemName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')  // Remove punctuation
    .replace(/\b(a|an|the)\b/g, '')  // Remove articles
    .replace(/\s+/g, ' ')  // Collapse spaces
    .trim();
}

/**
 * TOKENIZATION: Split name into words
 */
function tokenize(name: string): string[] {
  return normalizeItemName(name)
    .split(' ')
    .filter(token => token.length > 2);  // Skip short words
}

/**
 * STRATEGY 1: EXACT MATCH
 * Confidence: 1.0 (100%)
 * Match on normalized item_name
 */
async function exactMatch(item: ExtractedItem, tier: string, city: string): Promise<MatchResult | null> {
  const normalized = normalizeItemName(item.name);
  
  const { data, error } = await supabase
    .from('pricing_items')
    .select('*')
    .ilike('item_name', normalized)
    .eq('category', item.category)
    .eq('is_active', true)
    .limit(1)
    .single();

  if (error || !data) return null;

  return {
    pricing_item_id: data.id,
    item_name: data.item_name,
    category: data.category,
    match_strategy: 'exact',
    match_confidence: 1.0,
    alternative_matches: [],
    rate: getTierPrice(data, tier, city),
    unit: data.unit,
    gst_percent: data.gst_percent,
  };
}

/**
 * STRATEGY 2: SYNONYM MATCH
 * Confidence: 0.95 (95%)
 * Match using item_synonyms table
 */
async function synonymMatch(item: ExtractedItem, tier: string, city: string): Promise<MatchResult | null> {
  const normalized = normalizeItemName(item.name);
  
  // First, check if this is a known synonym
  const { data: synonymData } = await supabase
    .from('item_synonyms')
    .select('canonical_name, confidence_score, category')
    .or(`canonical_name.ilike.${normalized},synonym.ilike.${normalized}`)
    .eq('is_active', true)
    .order('confidence_score', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (!synonymData) return null;

  // Find pricing item by canonical name
  const { data: pricingData } = await supabase
    .from('pricing_items')
    .select('*')
    .ilike('item_name', synonymData.canonical_name)
    .eq('category', item.category)
    .eq('is_active', true)
    .limit(1)
    .single();

  if (!pricingData) return null;

  return {
    pricing_item_id: pricingData.id,
    item_name: pricingData.item_name,
    category: pricingData.category,
    match_strategy: 'synonym',
    match_confidence: 0.95 * (synonymData.confidence_score || 1.0),
    alternative_matches: [],
    rate: getTierPrice(pricingData, tier, city),
    unit: pricingData.unit,
    gst_percent: pricingData.gst_percent,
  };
}

/**
 * STRATEGY 3: CONTAINS MATCH (Substring)
 * Confidence: 85-90%
 * Check if item name contains key words from database
 */
async function containsMatch(item: ExtractedItem, tier: string, city: string): Promise<MatchResult | null> {
  const tokens = tokenize(item.name);
  if (tokens.length === 0) return null;

  // Search for items where any token is contained in the item_name
  const orConditions = tokens
    .map(token => `item_name.ilike.%${token}%`)
    .join(',');

  const { data: matches } = await supabase
    .from('pricing_items')
    .select('*')
    .or(orConditions)
    .eq('category', item.category)
    .eq('is_active', true)
    .limit(5);

  if (!matches || matches.length === 0) return null;

  // Score each match by number of matching tokens
  const scoredMatches = matches.map(match => {
    const matchTokens = tokenize(match.item_name);
    const overlap = tokens.filter(t => matchTokens.includes(t)).length;
    const score = overlap / Math.max(tokens.length, matchTokens.length);
    return { match, score };
  });

  // Sort by score (highest first)
  scoredMatches.sort((a, b) => b.score - a.score);
  const best = scoredMatches[0];

  if (best.score < 0.3) return null;  // Minimum threshold

  const alternatives = scoredMatches.slice(1, 4).map(m => ({
    pricing_item_id: m.match.id,
    item_name: m.match.item_name,
    match_score: m.score * 0.85,
    rate: getTierPrice(m.match, tier, city),
  }));

  return {
    pricing_item_id: best.match.id,
    item_name: best.match.item_name,
    category: best.match.category,
    match_strategy: 'fuzzy',
    match_confidence: 0.85 + (best.score * 0.05),  // 85-90%
    alternative_matches: alternatives,
    rate: getTierPrice(best.match, tier, city),
    unit: best.match.unit,
    gst_percent: best.match.gst_percent,
  };
}

/**
 * STRATEGY 4: TOKEN-BASED MATCH (Word Overlap + Fuzzy)
 * Confidence: 35-80%
 * Find best match by word overlap within same category
 */
async function tokenMatch(item: ExtractedItem, tier: string, city: string): Promise<MatchResult | null> {
  const tokens = tokenize(item.name);
  if (tokens.length === 0) return null;

  // Get all items in category
  const { data: categoryItems } = await supabase
    .from('pricing_items')
    .select('*')
    .eq('category', item.category)
    .eq('is_active', true)
    .limit(50);

  if (!categoryItems || categoryItems.length === 0) return null;

  // Calculate overlap score for each item
  const scoredMatches = categoryItems.map(dbItem => {
    const dbTokens = tokenize(dbItem.item_name);
    const overlap = tokens.filter(t => dbTokens.includes(t)).length;
    const score = overlap > 0 ? overlap / Math.max(tokens.length, dbTokens.length) : 0;
    return { dbItem, score };
  });

  // Sort by score
  scoredMatches.sort((a, b) => b.score - a.score);
  const best = scoredMatches[0];

  if (best.score === 0) return null;

  const confidence = 0.35 + (best.score * 0.45);  // 35-80%
  const alternatives = scoredMatches.slice(1, 4).map(m => ({
    pricing_item_id: m.dbItem.id,
    item_name: m.dbItem.item_name,
    match_score: confidence * m.score,
    rate: getTierPrice(m.dbItem, tier, city),
  }));

  return {
    pricing_item_id: best.dbItem.id,
    item_name: best.dbItem.item_name,
    category: best.dbItem.category,
    match_strategy: 'token',
    match_confidence: confidence,
    alternative_matches: alternatives,
    rate: getTierPrice(best.dbItem, tier, city),
    unit: best.dbItem.unit,
    gst_percent: best.dbItem.gst_percent,
  };
}

/**
 * STRATEGY 5: KEYWORD EXTRACTION FALLBACK
 * Confidence: 60-80%
 * Extract key noun and match to category
 */
async function keywordFallback(item: ExtractedItem, tier: string, city: string): Promise<MatchResult | null> {
  // Extract the most important word (usually the noun)
  const tokens = tokenize(item.name);
  if (tokens.length === 0) return null;

  // Common furniture/material keywords (prioritize these)
  const keywords = ['sofa', 'chair', 'table', 'bed', 'cabinet', 'wardrobe', 'light', 'tile', 'marble', 'wood', 'granite'];
  const keyToken = tokens.find(t => keywords.includes(t)) || tokens[tokens.length - 1];  // Last word is usually the noun

  const { data: matches } = await supabase
    .from('pricing_items')
    .select('*')
    .ilike('item_name', `%${keyToken}%`)
    .eq('category', item.category)
    .eq('is_active', true)
    .limit(5);

  if (!matches || matches.length === 0) return null;

  const best = matches[0];
  const alternatives = matches.slice(1, 4).map(m => ({
    pricing_item_id: m.id,
    item_name: m.item_name,
    match_score: 0.60,
    rate: getTierPrice(m, tier, city),
  }));

  return {
    pricing_item_id: best.id,
    item_name: best.item_name,
    category: best.category,
    match_strategy: 'keyword',
    match_confidence: 0.70,
    alternative_matches: alternatives,
    rate: getTierPrice(best, tier, city),
    unit: best.unit,
    gst_percent: best.gst_percent,
  };
}

/**
 * MAIN MATCHING FUNCTION
 * Tries all strategies in order until a match is found
 */
export async function matchItemToPricing(
  item: ExtractedItem,
  tier: string = 'mid_premium',
  city: string = 'Hyderabad'
): Promise<MatchResult | null> {
  console.log(`🔍 Matching item: "${item.name}" (category: ${item.category})`);

  // Try Strategy 1: Exact Match
  const exact = await exactMatch(item, tier, city);
  if (exact) {
    console.log(`✅ Exact match found: ${exact.item_name} (confidence: 100%)`);
    return exact;
  }

  // Try Strategy 2: Synonym Match
  const synonym = await synonymMatch(item, tier, city);
  if (synonym) {
    console.log(`✅ Synonym match found: ${synonym.item_name} (confidence: ${synonym.match_confidence * 100}%)`);
    return synonym;
  }

  // Try Strategy 3: Contains Match
  const contains = await containsMatch(item, tier, city);
  if (contains) {
    console.log(`✅ Contains match found: ${contains.item_name} (confidence: ${contains.match_confidence * 100}%)`);
    return contains;
  }

  // Try Strategy 4: Token Match
  const token = await tokenMatch(item, tier, city);
  if (token) {
    console.log(`✅ Token match found: ${token.item_name} (confidence: ${token.match_confidence * 100}%)`);
    return token;
  }

  // Try Strategy 5: Keyword Fallback
  const keyword = await keywordFallback(item, tier, city);
  if (keyword) {
    console.log(`✅ Keyword match found: ${keyword.item_name} (confidence: ${keyword.match_confidence * 100}%)`);
    return keyword;
  }

  console.log(`❌ No match found for: "${item.name}"`);
  return null;
}

/**
 * Helper: Get tier-based price with city multiplier
 */
function getTierPrice(pricingItem: any, tier: string, city: string): number {
  // Get base price by tier
  let basePrice = 0;
  switch (tier.toLowerCase()) {
    case 'budget':
      basePrice = pricingItem.budget_price || 0;
      break;
    case 'premium':
      basePrice = pricingItem.premium_price || 0;
      break;
    case 'mid_premium':
    default:
      basePrice = pricingItem.mid_premium_price || 0;
  }

  // Apply city multiplier
  const cityMultiplierMap: Record<string, string> = {
    'Hyderabad': 'hyderabad_multiplier',
    'Delhi': 'delhi_multiplier',
    'Gurgaon': 'delhi_multiplier',
    'Bangalore': 'bangalore_multiplier',
    'Bengaluru': 'bangalore_multiplier',
    'Pune': 'pune_multiplier',
    'Mumbai': 'mumbai_multiplier',
    'Chennai': 'chennai_multiplier',
    'Kolkata': 'kolkata_multiplier',
    'Ahmedabad': 'ahmedabad_multiplier',
    'Jaipur': 'jaipur_multiplier',
    'Lucknow': 'lucknow_multiplier',
    'Surat': 'surat_multiplier'
  };

  const multiplierField = cityMultiplierMap[city] || 'hyderabad_multiplier';
  const cityMultiplier = pricingItem[multiplierField] || 1.0;

  return Math.round(basePrice * cityMultiplier);
}
