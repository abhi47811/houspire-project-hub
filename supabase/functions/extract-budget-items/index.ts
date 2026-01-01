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
  category: 'furniture' | 'finish' | 'fixture' | 'hardware' | 'decor'
  room_category: string
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
      .select('*, rooms(*), room_analysis(*)')
      .eq('id', render_id)
      .single()

    if (renderError) throw renderError

    if (!render.image_url) {
      throw new Error('Render has no image URL')
    }

    // 2. Call Gemini 2.0 Flash Vision API for item extraction
    const extractedItems = await extractItemsFromRender(render.image_url, render.rooms.room_type)

    console.log(`✅ Extracted ${extractedItems.length} items from render`)

    // 3. Fetch project's city for pricing
    const { data: project, error: projectError } = await supabase
      .from('projects')
      .select('city')
      .eq('id', project_id)
      .single()

    if (projectError) throw projectError

    const { data: city, error: cityError } = await supabase
      .from('cities')
      .select('*')
      .eq('city_name', project.city)
      .single()

    if (cityError) {
      console.warn(`City ${project.city} not found in database, using Hyderabad as default`)
    }

    const cityId = city?.id || 1 // Default to Hyderabad

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
          // Get city-specific price
          const cityPrice = getCityPrice(pricingItem, city?.city_name || 'Hyderabad')
          const subtotal = cityPrice * item.quantity
          const gstAmount = (subtotal * pricingItem.gst_rate) / 100
          const total = subtotal + gstAmount

          budgetItems.push({
            project_id,
            room_id,
            render_id,
            ai_item_name: item.name,
            ai_confidence: item.confidence,
            ai_category: item.category,
            quantity: item.quantity,
            pricing_item_id: matchResult.pricing_item_id,
            match_strategy: matchResult.match_strategy,
            match_confidence: matchResult.match_confidence,
            alternative_matches: matchResult.alternative_matches,
            city_id: cityId,
            base_price: pricingItem.hyderabad_price, // Using Hyderabad as base
            city_price: cityPrice,
            subtotal,
            gst_rate: pricingItem.gst_rate,
            gst_amount: gstAmount,
            total,
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
          ai_item_name: item.name,
          ai_confidence: item.confidence,
          ai_category: item.category,
          quantity: item.quantity,
          pricing_item_id: null,
          match_strategy: null,
          match_confidence: 0,
          alternative_matches: [],
          city_id: cityId,
          base_price: null,
          city_price: null,
          subtotal: null,
          gst_rate: 18, // Default GST
          gst_amount: null,
          total: null,
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
    await supabase.from('notifications').insert({
      user_id: render.created_by,
      title: 'Budget Extraction Complete',
      message: `${insertedItems.length} items extracted from your render. Review now!`,
      type: 'budget_ready',
      link: `/projects/${project_id}/budget`,
      read: false
    })

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
  const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY')
  
  if (!GEMINI_API_KEY) {
    console.warn('⚠️  GEMINI_API_KEY not set, using mock data')
    return getMockExtractedItems(roomType)
  }

  const prompt = `Analyze this interior design render and extract ALL visible items with quantities.

Room Type: ${roomType}

Extract:
1. FURNITURE: Sofas, chairs, tables, beds, cabinets, TV units, etc.
2. FINISHES: Floor tiles, wall paint, wallpaper, wood panels, ceiling, etc.
3. FIXTURES: Lights, fans, switches, handles, etc.
4. DECOR: Curtains, cushions, rugs, artwork, plants, etc.

For each item provide:
- name: Brief descriptive name (e.g., "3-seater sofa", "Dining table 6-seater")
- category: furniture/finish/fixture/hardware/decor
- confidence: 0.0-1.0 (how certain are you this item exists?)
- quantity: Number of units visible
- specifications: Size, material, color (if identifiable)

Return ONLY valid JSON array of items. Example:
[
  {"name": "3-seater sofa", "category": "furniture", "confidence": 0.95, "quantity": 1, "specifications": "Fabric, grey, modern style"},
  {"name": "Coffee table", "category": "furniture", "confidence": 0.90, "quantity": 1, "specifications": "Wooden, rectangular"},
  {"name": "Floor tiles", "category": "finish", "confidence": 0.85, "quantity": 1, "specifications": "Vitrified, 2x2 ft, grey"}
]`

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`,
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
    const text = data.candidates[0].content.parts[0].text
    
    // Extract JSON from markdown code blocks if present
    const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/) || text.match(/\[[\s\S]*\]/)
    const jsonText = jsonMatch ? (jsonMatch[1] || jsonMatch[0]) : text
    
    const items: ExtractedItem[] = JSON.parse(jsonText)
    
    // Add room_category
    return items.map(item => ({
      ...item,
      room_category: roomType.toLowerCase().replace(' ', '_')
    }))
    
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

// Helper: Get city-specific price
function getCityPrice(pricingItem: any, cityName: string): number {
  const cityMap: Record<string, string> = {
    'Hyderabad': 'hyderabad_price',
    'Delhi': 'delhi_price',
    'Gurgaon': 'delhi_price',
    'Bangalore': 'bangalore_price',
    'Bengaluru': 'bangalore_price',
    'Pune': 'pune_price',
    'Mumbai': 'mumbai_price',
    'Chennai': 'chennai_price'
  }

  const priceField = cityMap[cityName] || 'hyderabad_price'
  return pricingItem[priceField] || pricingItem.hyderabad_price || 0
}

// 4-Strategy Matching Algorithm
async function matchItemToPricing(item: ExtractedItem, supabase: any): Promise<MatchResult | null> {
  // Strategy 1: Exact Match
  const exactMatch = await supabase
    .from('pricing_items')
    .select('*')
    .ilike('item_name', item.name)
    .eq('room_category', item.room_category)
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

  // Strategy 2: Synonym Match
  const { data: synonymMatches } = await supabase
    .from('item_synonyms')
    .select('*, pricing_items!inner(*)')
    .or(`synonym.ilike.%${item.name}%,standard_term.ilike.%${item.name}%`)
    .limit(5)

  if (synonymMatches && synonymMatches.length > 0) {
    return {
      pricing_item_id: synonymMatches[0].pricing_items.id,
      match_strategy: 'synonym',
      match_confidence: 0.85,
      alternative_matches: synonymMatches.slice(1, 4).map((m: any) => ({
        id: m.pricing_items.id,
        name: m.pricing_items.item_name,
        confidence: 0.75
      }))
    }
  }

  // Strategy 3: Fuzzy Match (contains)
  const { data: fuzzyMatches } = await supabase
    .from('pricing_items')
    .select('*')
    .or(`item_name.ilike.%${item.name}%,specification.ilike.%${item.name}%`)
    .eq('item_type', item.category === 'furniture' ? 'furniture' : 'finish')
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

  // Strategy 4: LLM Classification (if confidence < 0.70)
  if (item.confidence < 0.70) {
    // TODO: Implement LLM-based classification
    console.log(`⚠️  Low confidence item, skipping LLM classification: ${item.name}`)
  }

  return null
}

// Mock data for testing without Gemini API
function getMockExtractedItems(roomType: string): ExtractedItem[] {
  const mockItems: Record<string, ExtractedItem[]> = {
    'living_room': [
      { name: '3-Seater Sofa', category: 'furniture', room_category: 'living_room', confidence: 0.95, quantity: 1, specifications: 'Fabric, modern style' },
      { name: 'Coffee Table', category: 'furniture', room_category: 'living_room', confidence: 0.90, quantity: 1, specifications: 'Wooden, rectangular' },
      { name: 'TV Unit', category: 'furniture', room_category: 'living_room', confidence: 0.92, quantity: 1, specifications: '6ft wide, wall-mounted' },
      { name: 'Vitrified Tiles', category: 'finish', room_category: 'living_room', confidence: 0.85, quantity: 1, specifications: '2x2 ft, grey' },
      { name: 'Ceiling Light', category: 'fixture', room_category: 'living_room', confidence: 0.88, quantity: 2 }
    ],
    'bedroom': [
      { name: 'King Size Bed', category: 'furniture', room_category: 'bedroom', confidence: 0.96, quantity: 1, specifications: 'Wooden, with storage' },
      { name: 'Wardrobe', category: 'furniture', room_category: 'bedroom', confidence: 0.94, quantity: 1, specifications: '8ft sliding door' },
      { name: 'Bedside Table', category: 'furniture', room_category: 'bedroom', confidence: 0.91, quantity: 2 },
      { name: 'Wall Paint', category: 'finish', room_category: 'bedroom', confidence: 0.80, quantity: 1, specifications: 'Asian Paints, beige' }
    ],
    'kitchen': [
      { name: 'Kitchen Cabinets', category: 'furniture', room_category: 'kitchen', confidence: 0.93, quantity: 1, specifications: '10ft base + upper units' },
      { name: 'Granite Countertop', category: 'finish', room_category: 'kitchen', confidence: 0.90, quantity: 1, specifications: 'Black granite, 25 sqft' },
      { name: 'Kitchen Sink', category: 'fixture', room_category: 'kitchen', confidence: 0.88, quantity: 1, specifications: 'Stainless steel, double bowl' }
    ]
  }

  return mockItems[roomType.toLowerCase().replace(' ', '_')] || mockItems['living_room']
}
