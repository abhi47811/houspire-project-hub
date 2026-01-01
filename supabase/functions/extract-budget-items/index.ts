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

// AI Item Extraction using Gemini 2.0 Flash with Style-Aware Analysis
async function extractItemsFromRender(imageUrl: string, roomType: string): Promise<ExtractedItem[]> {
  const GOOGLE_AI_API_KEY = Deno.env.get('GOOGLE_AI_API_KEY')
  
  if (!GOOGLE_AI_API_KEY) {
    console.warn('⚠️  GOOGLE_AI_API_KEY not set, using mock data')
    return getMockExtractedItems(roomType)
  }

  // PHASE 1: STYLE DETECTION FIRST (Critical for accurate item detection)
  const stylePrompt = `Analyze this interior design image and identify the PRIMARY design style.

IMPORTANT: Be precise about the style as this affects material identification.

Possible Styles:
- Industrial Loft: Exposed brick, concrete, metal fixtures, pipes, raw materials
- Modern Luxury: Marble, chandeliers, ornate furniture, premium finishes
- Contemporary: Clean lines, neutral colors, simple furniture
- Traditional: Wood, carved details, classic furniture
- Scandinavian: White/light colors, minimalist, natural wood
- Bohemian: Colorful, eclectic, plants, textiles
- Minimalist: Simple, bare, functional, limited decor
- Rustic: Wood, stone, natural materials
- Mid-Century Modern: Retro furniture, wood, geometric patterns

Return ONLY a JSON object:
{
  "style": "style_name",
  "confidence": 0.0-1.0,
  "key_features": ["feature1", "feature2", "feature3"]
}`

  let detectedStyle = 'contemporary'
  let styleFeatures: string[] = []

  try {
    const styleResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GOOGLE_AI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [
              { text: stylePrompt },
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

    const styleData = await styleResponse.json()
    const styleText = styleData.candidates?.[0]?.content?.parts?.[0]?.text
    
    if (styleText) {
      const styleMatch = styleText.match(/```json\n([\s\S]*?)\n```/) || styleText.match(/\{[\s\S]*\}/)
      const styleJson = styleMatch ? (styleMatch[1] || styleMatch[0]) : styleText
      const styleResult = JSON.parse(styleJson)
      detectedStyle = styleResult.style || 'contemporary'
      styleFeatures = styleResult.key_features || []
      console.log(`🎨 Detected style: ${detectedStyle} (confidence: ${styleResult.confidence})`)
    }
  } catch (error) {
    console.error('Style detection error:', error)
  }

  // PHASE 2: STYLE-AWARE ITEM EXTRACTION
  const prompt = `Analyze this ${detectedStyle} style interior design render and extract ALL visible items.

Room Type: ${roomType}
Detected Style: ${detectedStyle}
Key Features: ${styleFeatures.join(', ')}

CRITICAL INSTRUCTIONS FOR ${detectedStyle.toUpperCase()} STYLE:

${getStyleSpecificInstructions(detectedStyle)}

Extract items into these categories (use exact category names):
1. furniture: Sofas, chairs, tables, beds, cabinets, TV units, wardrobes, etc.
2. flooring: Floor tiles, wooden flooring, vinyl, carpet, marble, EXPOSED CONCRETE, etc.
3. lighting: Lights, fans, chandeliers, LED strips, INDUSTRIAL PENDANTS, etc.
4. hardware: Handles, hinges, locks, rails, fittings, EXPOSED PIPES, DUCTWORK, etc.
5. decor: Curtains, cushions, rugs, artwork, plants, mirrors, throw pillows, blankets, etc.
6. materials: Laminates, veneers, plywood, MDF, edge bands, EXPOSED BRICK, CONCRETE, etc.
7. glass: Glass panels, mirrors, partitions, etc.
8. soft_furnishings: Curtains, blinds, upholstery, rugs, throw pillows, etc.

For each item provide:
- name: Brief descriptive name matching the detected style (e.g., "Industrial pendant light", "Exposed concrete floor")
- category: furniture/flooring/lighting/hardware/decor/materials/glass/soft_furnishings
- confidence: 0.0-1.0 (how certain are you this item exists?)
- quantity: Number of units visible (count carefully - don't miss items)
- specifications: Size, material, color, style-specific details

IMPORTANT: 
- Include ALL visible items, even small decor pieces (plants, artwork, pillows, rugs)
- For structural elements like floors/ceilings, describe the ACTUAL material (not assumed luxury)
- Don't assume marble/granite unless clearly visible - concrete/painted surfaces are common
- Count individual items accurately (e.g., 4 throw pillows, not 1 set)

Return ONLY valid JSON array. Example for industrial style:
[
  {"name": "Brown leather sofa", "category": "furniture", "confidence": 0.95, "quantity": 1, "specifications": "3-seater, brown leather, industrial style"},
  {"name": "Exposed concrete floor", "category": "flooring", "confidence": 0.90, "quantity": 1, "specifications": "Polished concrete, grey"},
  {"name": "Industrial pendant light", "category": "lighting", "confidence": 0.92, "quantity": 3, "specifications": "Edison bulb, metal cage"},
  {"name": "Exposed brick wall", "category": "materials", "confidence": 0.88, "quantity": 1, "specifications": "Red brick, unfinished"},
  {"name": "Indoor plant", "category": "decor", "confidence": 0.85, "quantity": 3, "specifications": "Various sizes, potted"},
  {"name": "Throw pillow", "category": "soft_furnishings", "confidence": 0.90, "quantity": 4, "specifications": "Mixed patterns and textures"}
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

// Helper: Get style-specific extraction instructions
function getStyleSpecificInstructions(style: string): string {
  const instructions: Record<string, string> = {
    'industrial loft': `
- FLOORING: Look for polished concrete, NOT marble or tiles (unless clearly visible)
- WALLS: Check for exposed brick walls, concrete walls, NOT painted/wallpapered surfaces
- CEILING: Look for exposed concrete, visible pipes, ductwork, metal beams
- LIGHTING: Industrial pendants with Edison bulbs, NOT chandeliers or ornate fixtures
- FURNITURE: Leather, metal frames, wood - NOT ornate or traditional pieces
- DECOR: Include ALL plants, artwork, rugs, throw pillows, blankets visible in the scene`,
    'modern luxury': `
- FLOORING: Marble, granite, high-end tiles (check for veining/patterns)
- WALLS: Premium paint, textured finishes, wallpaper, paneling
- CEILING: False ceiling with cove lighting, ornate details
- LIGHTING: Crystal chandeliers, designer pendants, recessed lights
- FURNITURE: Ornate, upholstered, premium materials
- DECOR: Artwork, sculptures, premium textiles`,
    'contemporary': `
- FLOORING: Wood, engineered flooring, premium tiles
- WALLS: Clean painted surfaces, accent walls
- CEILING: Simple false ceiling or exposed
- LIGHTING: Modern fixtures, clean lines
- FURNITURE: Simple, functional, neutral colors
- DECOR: Minimal but present - plants, simple artwork`,
    'default': `
- Carefully examine all materials - don't assume premium finishes
- Look for ACTUAL visible materials, not what you expect to see
- Include ALL decor items: plants, artwork, rugs, pillows, throws, etc.
- Count items individually, don't group into sets
- Check for exposed structural elements (brick, concrete, pipes)`
  }
  
  return instructions[style.toLowerCase()] || instructions['default']
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
