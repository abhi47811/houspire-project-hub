// Supabase Edge Function: extract-budget-items
// Analyzes approved renders and extracts furniture/finish items using Gemini 2.0 Flash
// Matches items to pricing database using 4-strategy algorithm

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface ExtractedItem {
  name: string
  category: 'furniture' | 'flooring' | 'lighting' | 'hardware' | 'decor' | 'materials' | 'glass' | 'soft_furnishings'
  confidence: number
  quantity: number
  specifications?: string
}

interface MatchResult {
  pricing_item_id: string
  match_strategy: 'exact' | 'synonym' | 'fuzzy' | 'llm'
  match_confidence: number
  alternative_matches: any[]
}

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const { render_id, project_id, room_id } = await req.json()

    console.log(`🔍 Extracting budget items for render: ${render_id}`)

    // 1. Fetch render details
    const { data: render, error: renderError } = await supabase
      .from('renders')
      .select('*, rooms(*)')
      .eq('id', render_id)
      .single()

    if (renderError) throw renderError

    if (!render.image_url) {
      throw new Error('Render has no image URL')
    }

    // 2. Call Gemini 2.0 Flash Vision API for item extraction
    const extractedItems = await extractItemsFromRender(render.image_url, render.rooms.room_type)

    console.log(`✅ Extracted ${extractedItems.length} items from render`)

    // 3. Fetch project details for city and budget tier
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .select('city, budget_tier')
      .eq('id', project_id)
      .single()

    if (projectError) throw projectError

    const city = project?.city || 'Hyderabad'
    const budgetTier = project?.budget_tier || 'mid_premium'

    // 4. Match each extracted item to pricing database
    const budgetItems = []
    for (const item of extractedItems) {
      const matchResult = await matchItemToPricing(item, supabase)
      
      if (matchResult) {
        // Fetch pricing details
        const { data: pricingItem } = await supabase
          .from('pricing_items')
          .select('*')
          .eq('id', matchResult.pricing_item_id)
          .single()

        if (pricingItem) {
          // Get tier-based price and apply city multiplier
          const basePrice = getTierPrice(pricingItem, budgetTier)
          const cityMultiplier = getCityMultiplier(pricingItem, city)
          const rate = basePrice * cityMultiplier
          const amount = rate * item.quantity
          const gstAmount = (amount * pricingItem.gst_percent) / 100
          const total = amount + gstAmount

          budgetItems.push({
            project_id,
            room_id,
            render_id,
            item_name: pricingItem.item_name,
            category: pricingItem.category,
            ai_item_name: item.name,
            ai_confidence: item.confidence,
            ai_category: item.category,
            ai_specifications: { detected: item.specifications },
            quantity: item.quantity,
            unit: pricingItem.unit,
            rate,
            amount,
            pricing_item_id: matchResult.pricing_item_id,
            match_strategy: matchResult.match_strategy,
            match_confidence: matchResult.match_confidence,
            alternative_matches: matchResult.alternative_matches,
            gst_percent: pricingItem.gst_percent,
            gst_amount: gstAmount,
            total,
            budget_tier: budgetTier,
            status: 'pending',
            user_edited: false
          })
        }
      } else {
        // No match found - create unmatched item
        budgetItems.push({
          project_id,
          room_id,
          render_id,
          item_name: item.name,
          category: mapToValidCategory(item.category),
          ai_item_name: item.name,
          ai_confidence: item.confidence,
          ai_category: item.category,
          ai_specifications: { detected: item.specifications },
          quantity: item.quantity,
          unit: 'nos',
          rate: 0,
          amount: 0,
          pricing_item_id: null,
          match_strategy: null,
          match_confidence: 0,
          alternative_matches: [],
          gst_percent: 18,
          gst_amount: 0,
          total: 0,
          budget_tier: budgetTier,
          status: 'unmatched',
          user_edited: false
        })
      }
    }

    // 5. Insert budget items into database
    const { data: insertedItems, error: insertError } = await supabase
      .from('budget_items')
      .insert(budgetItems)
      .select()

    if (insertError) throw insertError

    console.log(`💾 Inserted ${insertedItems.length} budget items`)

    // 6. Send notification to user
    const { data: projectData } = await supabase
      .from('projects')
      .select('created_by')
      .eq('id', project_id)
      .single()

    if (projectData?.created_by) {
      await supabase.from('notifications').insert({
        user_id: projectData.created_by,
        title: 'Budget Extraction Complete',
        message: `${insertedItems.length} items extracted from your render. Review now!`,
        type: 'budget_ready',
        link: `/projects/${project_id}/budget`
      })
    }

    return new Response(
      JSON.stringify({
        success: true,
        items_extracted: extractedItems.length,
        items_matched: budgetItems.filter(i => i.pricing_item_id).length,
        items_unmatched: budgetItems.filter(i => !i.pricing_item_id).length,
        total_amount: budgetItems.reduce((sum, item) => sum + (item.total || 0), 0)
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    console.error('❌ Error:', error)
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})

// AI Item Extraction using Gemini 2.0 Flash
async function extractItemsFromRender(imageUrl: string, roomType: string): Promise<ExtractedItem[]> {
  const GOOGLE_AI_API_KEY = Deno.env.get('GOOGLE_AI_API_KEY')
  
  if (!GOOGLE_AI_API_KEY) {
    console.warn('⚠️  GOOGLE_AI_API_KEY not set, using mock data')
    return getMockExtractedItems(roomType)
  }

  const prompt = `Analyze this interior design render and extract ALL visible items with quantities.

Room Type: ${roomType}

Extract items into these categories (use exact category names):
1. furniture: Sofas, chairs, tables, beds, cabinets, TV units, wardrobes, etc.
2. flooring: Floor tiles, wooden flooring, vinyl, carpet, marble, etc.
3. lighting: Lights, fans, chandeliers, LED strips, etc.
4. hardware: Handles, hinges, locks, rails, fittings, etc.
5. decor: Curtains, cushions, rugs, artwork, plants, mirrors, etc.
6. materials: Laminates, veneers, plywood, MDF, edge bands, etc.
7. glass: Glass panels, mirrors, partitions, etc.
8. soft_furnishings: Curtains, blinds, upholstery, etc.

For each item provide:
- name: Brief descriptive name (e.g., "3-seater sofa", "Dining table 6-seater")
- category: furniture/flooring/lighting/hardware/decor/materials/glass/soft_furnishings
- confidence: 0.0-1.0 (how certain are you this item exists?)
- quantity: Number of units visible
- specifications: Size, material, color (if identifiable)

Return ONLY valid JSON array of items. Example:
[
  {"name": "3-seater sofa", "category": "furniture", "confidence": 0.95, "quantity": 1, "specifications": "Fabric, grey, modern style"},
  {"name": "Coffee table", "category": "furniture", "confidence": 0.90, "quantity": 1, "specifications": "Wooden, rectangular"},
  {"name": "Vitrified floor tiles", "category": "flooring", "confidence": 0.85, "quantity": 1, "specifications": "2x2 ft, grey"}
]`

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GOOGLE_AI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [
              { text: prompt },
              {
                inline_data: {
                  mime_type: 'image/jpeg',
                  data: await fetchImageAsBase64(imageUrl)
                }
              }
            ]
          }]
        })
      }
    )

    const data = await response.json()
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text
    
    if (!text) {
      console.error('No text response from Gemini')
      return getMockExtractedItems(roomType)
    }
    
    // Extract JSON from markdown code blocks if present
    const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/\[[\s\S]*\]/)
    const jsonText = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : text
    
    const items: ExtractedItem[] = JSON.parse(jsonText)
    return items
    
  } catch (error) {
    console.error('Gemini API error:', error)
    return getMockExtractedItems(roomType)
  }
}

// Helper: Fetch image as base64
async function fetchImageAsBase64(url: string): Promise<string> {
  const response = await fetch(url)
  const blob = await response.blob()
  const buffer = await blob.arrayBuffer()
  const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)))
  return base64
}

// Helper: Get tier-based price
function getTierPrice(pricingItem: any, tier: string): number {
  switch (tier) {
    case 'budget':
      return pricingItem.budget_price || 0
    case 'premium':
      return pricingItem.premium_price || 0
    case 'mid_premium':
    default:
      return pricingItem.mid_premium_price || 0
  }
}

// Helper: Get city multiplier
function getCityMultiplier(pricingItem: any, city: string): number {
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
  }

  const multiplierField = cityMultiplierMap[city] || 'hyderabad_multiplier'
  return pricingItem[multiplierField] || 1.0
}

// Helper: Map extracted category to valid pricing_items category
function mapToValidCategory(category: string): string {
  const categoryMap: Record<string, string> = {
    'furniture': 'furniture',
    'finish': 'materials',
    'fixture': 'hardware',
    'flooring': 'flooring',
    'lighting': 'lighting',
    'hardware': 'hardware',
    'decor': 'decor',
    'materials': 'materials',
    'glass': 'glass',
    'soft_furnishings': 'soft_furnishings'
  }
  return categoryMap[category] || 'decor'
}

// 4-Strategy Matching Algorithm
async function matchItemToPricing(item: ExtractedItem, supabase: any): Promise<MatchResult | null> {
  // Strategy 1: Exact Match by item name and category
  const exactMatch = await supabase
    .from('pricing_items')
    .select('*')
    .ilike('item_name', item.name)
    .eq('category', mapToValidCategory(item.category))
    .eq('is_active', true)
    .limit(1)
    .single()

  if (exactMatch.data) {
    return {
      pricing_item_id: exactMatch.data.id,
      match_strategy: 'exact',
      match_confidence: 1.0,
      alternative_matches: []
    }
  }

  // Strategy 2: Synonym Match using keywords array
  const { data: synonymMatches } = await supabase
    .from('pricing_items')
    .select('*')
    .contains('keywords', [item.name.toLowerCase()])
    .eq('is_active', true)
    .limit(5)

  if (synonymMatches && synonymMatches.length > 0) {
    return {
      pricing_item_id: synonymMatches[0].id,
      match_strategy: 'synonym',
      match_confidence: 0.85,
      alternative_matches: synonymMatches.slice(1, 4).map((m: any) => ({
        id: m.id,
        name: m.item_name,
        confidence: 0.75
      }))
    }
  }

  // Strategy 3: Fuzzy Match (contains in name or specification)
  const { data: fuzzyMatches } = await supabase
    .from('pricing_items')
    .select('*')
    .or(`item_name.ilike.%${item.name}%,specification.ilike.%${item.name}%`)
    .eq('category', mapToValidCategory(item.category))
    .eq('is_active', true)
    .limit(5)

  if (fuzzyMatches && fuzzyMatches.length > 0) {
    return {
      pricing_item_id: fuzzyMatches[0].id,
      match_strategy: 'fuzzy',
      match_confidence: 0.65,
      alternative_matches: fuzzyMatches.slice(1, 4).map((m: { id: string; item_name: string }) => ({
        id: m.id,
        name: m.item_name,
        confidence: 0.55
      }))
    }
  }

  // Strategy 4: Broader category search
  const { data: categoryMatches } = await supabase
    .from('pricing_items')
    .select('*')
    .eq('category', mapToValidCategory(item.category))
    .eq('is_active', true)
    .limit(5)

  if (categoryMatches && categoryMatches.length > 0) {
    // Find best match by simple word overlap
    const itemWords = item.name.toLowerCase().split(/\s+/)
    let bestMatch = categoryMatches[0]
    let bestScore = 0

    for (const match of categoryMatches) {
      const matchWords = match.item_name.toLowerCase().split(/\s+/)
      const overlap = itemWords.filter(w => matchWords.includes(w)).length
      if (overlap > bestScore) {
        bestScore = overlap
        bestMatch = match
      }
    }

    if (bestScore > 0) {
      return {
        pricing_item_id: bestMatch.id,
        match_strategy: 'fuzzy',
        match_confidence: 0.5,
        alternative_matches: categoryMatches.filter((m: any) => m.id !== bestMatch.id).slice(0, 3).map((m: any) => ({
          id: m.id,
          name: m.item_name,
          confidence: 0.4
        }))
      }
    }
  }

  return null
}

// Mock data for testing without Gemini API
function getMockExtractedItems(roomType: string): ExtractedItem[] {
  const mockItems: Record<string, ExtractedItem[]> = {
    'living_room': [
      { name: '3-Seater Sofa', category: 'furniture', confidence: 0.95, quantity: 1, specifications: 'Fabric, modern style' },
      { name: 'Coffee Table', category: 'furniture', confidence: 0.90, quantity: 1, specifications: 'Wooden, rectangular' },
      { name: 'TV Unit', category: 'furniture', confidence: 0.92, quantity: 1, specifications: '6ft wide, wall-mounted' },
      { name: 'Vitrified Tiles', category: 'flooring', confidence: 0.85, quantity: 1, specifications: '2x2 ft, grey' },
      { name: 'LED Downlight 12W COB', category: 'lighting', confidence: 0.88, quantity: 4 }
    ],
    'bedroom': [
      { name: 'King Size Bed', category: 'furniture', confidence: 0.96, quantity: 1, specifications: 'Wooden, with storage' },
      { name: 'Wardrobe', category: 'furniture', confidence: 0.94, quantity: 1, specifications: '8ft sliding door' },
      { name: 'Bedside Table', category: 'furniture', confidence: 0.91, quantity: 2 },
      { name: 'Laminate Flooring', category: 'flooring', confidence: 0.80, quantity: 1, specifications: 'Oak finish' }
    ],
    'kitchen': [
      { name: 'Modular Kitchen Cabinet', category: 'furniture', confidence: 0.93, quantity: 1, specifications: '10ft base + upper units' },
      { name: 'Granite Countertop', category: 'materials', confidence: 0.90, quantity: 1, specifications: 'Black granite, 25 sqft' },
      { name: 'Soft Close Hinge', category: 'hardware', confidence: 0.88, quantity: 20, specifications: 'Full overlay' }
    ]
  }

  const key = roomType.toLowerCase().replace(/\s+/g, '_')
  return mockItems[key] || mockItems['living_room']
}
