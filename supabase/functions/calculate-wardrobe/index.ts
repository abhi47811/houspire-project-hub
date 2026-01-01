// Wardrobe Budget Calculator - Supabase Edge Function
// Based on: WARDROBE_CALCULATOR_COMPLETE_SPEC.md
// Version: 1.0

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

// ============================================
// TYPES & INTERFACES
// ============================================

interface WardrobeCalculatorInput {
  width_ft: number;           // 3-12 feet
  height: '7ft' | '8ft' | '9ft';
  type: 'swing' | 'sliding';
  carcass: 'HDMR' | 'BWR';
  finish_tier: 'budget' | 'mid' | 'premium';
  finish_type?: string;       // Specific finish (laminate, acrylic, PU, veneer)
  has_loft: boolean;
  handle_type: 'standard' | 'gola';
  city: string;
  room_id?: string;
  project_id?: string;
  render_id?: string;
}

interface Module {
  width_ft: number;
  type: '3ft' | '2ft' | '1.5ft' | '6ft_base' | '3ft_addon' | '4ft_addon';
  shutters: number;
  hinges?: number;
  tracks?: number;
  handles: number;
  drawer_channels: number;
  hanging_rods: number;
}

interface BOQItem {
  item_name: string;
  item_category: string;
  quantity: number;
  uom: string;
  rate: number;
  amount: number;
  notes?: string;
}

interface CalculationResult {
  boq_items: BOQItem[];
  subtotal: number;
  city_multiplier: number;
  total_before_gst: number;
  gst_amount: number;
  grand_total: number;
  dimensions: {
    width_ft: number;
    height: string;
    depth_ft: number;
    total_sqft: number;
  };
  breakdown: {
    carcass_cost: number;
    shutter_cost: number;
    hardware_cost: number;
    labor_cost: number;
  };
}

// ============================================
// PRICING DATA (from spec)
// ============================================

const CARCASS_RATES = {
  'HDMR_budget': 180,
  'HDMR_mid': 200,
  'HDMR_premium': 220,
  'BWR_budget': 280,
  'BWR_mid': 300,
  'BWR_premium': 320
};

const SHUTTER_RATES = {
  'laminate_budget': 250,
  'acrylic_mid': 600,
  'PU_mid': 850,
  'PU_premium': 950,
  'veneer_premium': 1200
};

// Hardware rates - will be fetched from citywise pricing database via get_city_price()
const HARDWARE_RATES = {
  'hinge_budget': 180,
  'hinge_mid': 220,
  'hinge_premium': 280,
  'drawer_channel_budget': 600,
  'drawer_channel_mid': 800,
  'drawer_channel_premium': 1200,
  'handle_budget': 80,
  'handle_mid': 150,
  'handle_premium': 300,
  'hanging_rod': 150,  // per rod
  'sliding_track_6ft': 2500,
  'sliding_track_extension_2ft': 800,
  'sliding_track_extension_3ft': 1200,
  'sliding_track_extension_4ft': 1600
};

// City multipliers - updated with citywise pricing data (Jan 2026)
// These match the database city_multipliers for consistency
const CITY_MULTIPLIERS: Record<string, number> = {
  'mumbai': 1.10,      // Most expensive
  'pune': 1.08,        // Premium market
  'bangalore': 1.05,   // IT hub
  'delhi': 1.00,       // Base reference
  'chennai': 1.02,     // South India hub
  'hyderabad': 0.97,   // Most affordable of metros
  'kolkata': 0.95,
  'ahmedabad': 0.92,
  'jaipur': 0.90,
  'lucknow': 0.88,
  'surat': 0.85
};

// ============================================
// MODULE CALCULATION LOGIC
// ============================================

function calculateModules(width_ft: number, type: 'swing' | 'sliding'): Module[] {
  const modules: Module[] = [];

  if (type === 'swing') {
    // Swing wardrobe: Use 3ft, 2ft, 1.5ft modules
    let remaining = width_ft;

    while (remaining >= 3) {
      modules.push({
        width_ft: 3,
        type: '3ft',
        shutters: 2,
        hinges: 8,  // 4 per shutter for 7'/8'
        handles: 2,
        drawer_channels: 5,  // 2 top + 3 storage drawers
        hanging_rods: 1
      });
      remaining -= 3;
    }

    if (remaining >= 2) {
      modules.push({
        width_ft: 2,
        type: '2ft',
        shutters: 1,
        hinges: 4,
        handles: 1,
        drawer_channels: 4,  // 1 top + 3 storage drawers
        hanging_rods: 1
      });
      remaining -= 2;
    }

    if (remaining >= 1.5) {
      modules.push({
        width_ft: 1.5,
        type: '1.5ft',
        shutters: 1,
        hinges: 4,
        handles: 1,
        drawer_channels: 4,
        hanging_rods: 1
      });
    }
  } else {
    // Sliding wardrobe: Start with 6ft base, add extensions
    modules.push({
      width_ft: 6,
      type: '6ft_base',
      shutters: 2,
      tracks: 1,
      handles: 2,
      drawer_channels: 10,  // 2 modules × 5 channels
      hanging_rods: 2
    });

    let remaining = width_ft - 6;

    while (remaining >= 4) {
      modules.push({
        width_ft: 4,
        type: '4ft_addon',
        shutters: 1,
        tracks: 0,  // Extension of base track
        handles: 1,
        drawer_channels: 5,
        hanging_rods: 1
      });
      remaining -= 4;
    }

    while (remaining >= 3) {
      modules.push({
        width_ft: 3,
        type: '3ft_addon',
        shutters: 1,
        tracks: 0,
        handles: 1,
        drawer_channels: 5,
        hanging_rods: 1
      });
      remaining -= 3;
    }

    // Note: 2ft add-ons possible but don't add shutters
    if (remaining >= 2) {
      modules.push({
        width_ft: 2,
        type: '3ft_addon',  // Use 3ft logic but adjust width
        shutters: 0,
        tracks: 0,
        handles: 0,
        drawer_channels: 5,
        hanging_rods: 1
      });
    }
  }

  return modules;
}

function calculateCarcassArea(
  modules: Module[],
  height: '7ft' | '8ft' | '9ft',
  has_loft: boolean
): number {
  const depth_ft = 2;  // 24" = 2 ft
  
  // Base height
  const base_height_ft = height === '7ft' ? 7 : height === '8ft' ? 8 : 7;
  
  // Total width
  const total_width_ft = modules.reduce((sum, m) => sum + m.width_ft, 0);
  
  // Calculate surface area (both sides + top + bottom + back + shelves)
  let total_sqft = 0;
  
  // Sides: 2 × (height × depth)
  total_sqft += 2 * base_height_ft * depth_ft;
  
  // Top & Bottom: 2 × (width × depth)
  total_sqft += 2 * total_width_ft * depth_ft;
  
  // Back panel: width × height
  total_sqft += total_width_ft * base_height_ft;
  
  // Internal shelves (estimate 3 shelves per 3ft module)
  const shelf_count = Math.floor(total_width_ft / 3) * 3;
  total_sqft += shelf_count * 3 * depth_ft;
  
  // Loft (if applicable)
  if (has_loft && height === '7ft') {
    const loft_height_ft = 2;
    total_sqft += 2 * loft_height_ft * depth_ft;  // Sides
    total_sqft += 2 * total_width_ft * depth_ft;   // Top & Bottom
    total_sqft += total_width_ft * loft_height_ft; // Back
  }
  
  return Math.round(total_sqft * 10) / 10;  // Round to 1 decimal
}

function calculateShutterArea(
  modules: Module[],
  height: '7ft' | '8ft' | '9ft'
): number {
  const shutter_height_ft = height === '7ft' ? 7 : height === '8ft' ? 8 : 7;
  
  let total_sqft = 0;
  
  for (const module of modules) {
    // Each shutter covers full height × (module_width / shutters_count)
    if (module.shutters > 0) {
      const shutter_width_ft = module.width_ft / (module.type === '3ft' ? 2 : 1);
      total_sqft += module.shutters * shutter_height_ft * shutter_width_ft;
    }
  }
  
  return Math.round(total_sqft * 10) / 10;
}

async function calculateHardware(
  modules: Module[],
  type: 'swing' | 'sliding',
  finish_tier: string,
  handle_type: string,
  city: string,
  supabaseClient: any
): Promise<{ name: string; quantity: number; rate: number; amount: number }[]> {
  const hardware: { name: string; quantity: number; rate: number; amount: number }[] = [];
  const tier_suffix = `_${finish_tier}` as '_budget' | '_mid' | '_premium';
  
  let total_hinges = 0;
  let total_handles = 0;
  let total_drawer_channels = 0;
  let total_hanging_rods = 0;
  let total_tracks = 0;
  
  for (const module of modules) {
    if (module.hinges) total_hinges += module.hinges;
    if (module.handles) total_handles += module.handles;
    total_drawer_channels += module.drawer_channels;
    total_hanging_rods += module.hanging_rods;
    if (module.tracks) total_tracks += module.tracks;
  }
  
  // Hinges (for swing) - fetch city-specific price
  if (type === 'swing' && total_hinges > 0) {
    let hinge_rate = HARDWARE_RATES[`hinge${tier_suffix}`] || HARDWARE_RATES.hinge_mid;
    
    // Try to get city-specific price from database
    try {
      const { data: cityPrice } = await supabaseClient.rpc('get_city_price', {
        p_item_name: 'Soft-Close Hinge',
        p_category: 'hardware',
        p_city: city
      });
      if (cityPrice) hinge_rate = cityPrice;
    } catch (e) {
      console.log('Using fallback hinge rate:', e);
    }
    
    hardware.push({
      name: 'Soft-Close Hinges',
      quantity: total_hinges,
      rate: hinge_rate,
      amount: total_hinges * hinge_rate
    });
  }
  
  // Sliding tracks (for sliding)
  if (type === 'sliding' && total_tracks > 0) {
    hardware.push({
      name: 'Sliding Track System (6ft base)',
      quantity: 1,
      rate: HARDWARE_RATES.sliding_track_6ft,
      amount: HARDWARE_RATES.sliding_track_6ft
    });
    
    // Add track extensions
    const total_width = modules.reduce((sum, m) => sum + m.width_ft, 0);
    const extension_ft = total_width - 6;
    if (extension_ft > 0) {
      hardware.push({
        name: `Sliding Track Extension (${extension_ft}ft)`,
        quantity: 1,
        rate: extension_ft * 400,  // ₹400 per ft
        amount: extension_ft * 400
      });
    }
  }
  
  // Handles or G-profile - fetch city-specific price
  if (handle_type === 'standard' && total_handles > 0) {
    let handle_rate = HARDWARE_RATES[`handle${tier_suffix}`] || HARDWARE_RATES.handle_mid;
    
    // Try to get city-specific price from database
    try {
      const { data: cityPrice } = await supabaseClient.rpc('get_city_price', {
        p_item_name: 'Cabinet Handle',
        p_category: 'handles',
        p_city: city
      });
      if (cityPrice) handle_rate = cityPrice;
    } catch (e) {
      console.log('Using fallback handle rate:', e);
    }
    
    hardware.push({
      name: 'Handles',
      quantity: total_handles,
      rate: handle_rate,
      amount: total_handles * handle_rate
    });
  } else if (handle_type === 'gola') {
    const total_width = modules.reduce((sum, m) => sum + m.width_ft, 0);
    hardware.push({
      name: 'G-Profile (Gola)',
      quantity: total_width,
      rate: 250,  // ₹250 per rft
      amount: total_width * 250
    });
  }
  
  // Drawer channels - fetch city-specific price
  if (total_drawer_channels > 0) {
    let channel_rate = HARDWARE_RATES[`drawer_channel${tier_suffix}`] || HARDWARE_RATES.drawer_channel_mid;
    
    // Try to get city-specific price from database
    try {
      const { data: cityPrice } = await supabaseClient.rpc('get_city_price', {
        p_item_name: 'Drawer Channel Soft-Close',
        p_category: 'hardware',
        p_city: city
      });
      if (cityPrice) channel_rate = cityPrice;
    } catch (e) {
      console.log('Using fallback channel rate:', e);
    }
    
    hardware.push({
      name: 'Drawer Channels (Soft-Close)',
      quantity: total_drawer_channels,
      rate: channel_rate,
      amount: total_drawer_channels * channel_rate
    });
  }
  
  // Hanging rods
  if (total_hanging_rods > 0) {
    hardware.push({
      name: 'Hanging Rods (SS)',
      quantity: total_hanging_rods,
      rate: HARDWARE_RATES.hanging_rod,
      amount: total_hanging_rods * HARDWARE_RATES.hanging_rod
    });
  }
  
  return hardware;
}

function getCityMultiplier(city: string): number {
  const normalized = city.toLowerCase().trim();
  return CITY_MULTIPLIERS[normalized] || 1.0;
}

function determineFinishType(finish_tier: string, finish_type?: string): string {
  if (finish_type) return finish_type;
  
  if (finish_tier === 'budget') return 'laminate';
  if (finish_tier === 'mid') return 'acrylic';
  if (finish_tier === 'premium') return 'PU';
  
  return 'laminate';
}

// ============================================
// MAIN CALCULATOR FUNCTION
// ============================================

async function calculateWardrobe(input: WardrobeCalculatorInput, supabaseClient: any): Promise<CalculationResult> {
  // Step 1: Calculate modules
  const modules = calculateModules(input.width_ft, input.type);
  
  // Step 2: Calculate carcass
  const carcass_sqft = calculateCarcassArea(modules, input.height, input.has_loft);
  const carcass_key = `${input.carcass}_${input.finish_tier}` as keyof typeof CARCASS_RATES;
  const carcass_rate = CARCASS_RATES[carcass_key] || CARCASS_RATES.HDMR_mid;
  const carcass_cost = carcass_sqft * carcass_rate;
  
  // Step 3: Calculate shutters
  const shutter_sqft = calculateShutterArea(modules, input.height);
  const finish_type = determineFinishType(input.finish_tier, input.finish_type);
  const shutter_key = `${finish_type}_${input.finish_tier}` as keyof typeof SHUTTER_RATES;
  const shutter_rate = SHUTTER_RATES[shutter_key] || SHUTTER_RATES.laminate_budget;
  const shutter_cost = shutter_sqft * shutter_rate;
  
  // Step 4: Calculate hardware (with city-specific pricing)
  const hardware_items = await calculateHardware(modules, input.type, input.finish_tier, input.handle_type, input.city, supabaseClient);
  const hardware_cost = hardware_items.reduce((sum, item) => sum + item.amount, 0);
  
  // Step 5: Labor cost (10% of material cost)
  const material_cost = carcass_cost + shutter_cost + hardware_cost;
  const labor_cost = material_cost * 0.10;
  
  // Step 6: Apply city multiplier
  const subtotal = material_cost + labor_cost;
  const city_multiplier = getCityMultiplier(input.city);
  const total_before_gst = subtotal * city_multiplier;
  
  // Step 7: GST (18%)
  const gst_amount = total_before_gst * 0.18;
  const grand_total = total_before_gst + gst_amount;
  
  // Build BOQ items
  const boq_items: BOQItem[] = [
    {
      item_name: `${input.carcass} Carcass (${input.width_ft}ft × ${input.height})`,
      item_category: 'Wardrobe - Carcass',
      quantity: carcass_sqft,
      uom: 'sqft',
      rate: carcass_rate,
      amount: carcass_cost,
      notes: `With 0.8mm laminate internal finish + edge bending`
    },
    {
      item_name: `${finish_type.charAt(0).toUpperCase() + finish_type.slice(1)} Shutters`,
      item_category: 'Wardrobe - Shutters',
      quantity: shutter_sqft,
      uom: 'sqft',
      rate: shutter_rate,
      amount: shutter_cost,
      notes: `${input.type === 'swing' ? 'Swing' : 'Sliding'} shutters`
    },
    ...hardware_items.map(h => ({
      item_name: h.name,
      item_category: 'Wardrobe - Hardware',
      quantity: h.quantity,
      uom: h.name.includes('Profile') ? 'rft' : 'piece',
      rate: h.rate,
      amount: h.amount
    })),
    {
      item_name: 'Labor & Installation',
      item_category: 'Wardrobe - Labor',
      quantity: 1,
      uom: 'lot',
      rate: labor_cost,
      amount: labor_cost,
      notes: '10% of material cost'
    }
  ];
  
  return {
    boq_items,
    subtotal,
    city_multiplier,
    total_before_gst,
    gst_amount,
    grand_total,
    dimensions: {
      width_ft: input.width_ft,
      height: input.height,
      depth_ft: 2,
      total_sqft: carcass_sqft + shutter_sqft
    },
    breakdown: {
      carcass_cost,
      shutter_cost,
      hardware_cost,
      labor_cost
    }
  };
}

// ============================================
// EDGE FUNCTION HANDLER
// ============================================

serve(async (req) => {
  try {
    // CORS headers
    if (req.method === 'OPTIONS') {
      return new Response('ok', {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
        }
      });
    }

    // Parse request body
    const input: WardrobeCalculatorInput = await req.json();
    
    // Validate input
    if (!input.width_ft || input.width_ft < 3 || input.width_ft > 12) {
      return new Response(
        JSON.stringify({ error: 'width_ft must be between 3 and 12 feet' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    if (!['7ft', '8ft', '9ft'].includes(input.height)) {
      return new Response(
        JSON.stringify({ error: 'height must be 7ft, 8ft, or 9ft' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    if (!['swing', 'sliding'].includes(input.type)) {
      return new Response(
        JSON.stringify({ error: 'type must be swing or sliding' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Initialize Supabase client for city pricing
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );
    
    // Run calculator (with city-specific pricing)
    const result = await calculateWardrobe(input, supabaseClient);
    
    // If project_id and room_id provided, save to database
    if (input.project_id && input.room_id) {
      
      // Save calculator suggestion
      const { data: suggestion, error: suggestionError } = await supabaseClient
        .from('calculator_suggestions')
        .insert({
          render_id: input.render_id,
          project_id: input.project_id,
          room_id: input.room_id,
          calculator_type: 'wardrobe',
          ai_detected_dimensions: {
            width_ft: input.width_ft,
            height: input.height,
            type: input.type
          },
          confidence_score: 1.0,  // User-approved
          estimated_cost_min: result.grand_total * 0.95,
          estimated_cost_max: result.grand_total * 1.05,
          status: 'approved',
          user_adjusted_inputs: input,
          final_boq: result
        })
        .select()
        .single();
      
      if (suggestionError) {
        console.error('Error saving suggestion:', suggestionError);
      }
      
      // Save BOQ items to budget_items
      const budgetItems = result.boq_items.map(item => ({
        project_id: input.project_id,
        room_id: input.room_id,
        render_id: input.render_id || null,
        item_name: item.item_name,
        item_category: item.item_category,
        ai_item_name: item.item_name,
        ai_category: item.item_category,
        quantity: item.quantity,
        uom: item.uom,
        rate: item.rate,
        status: 'approved',
        source: 'calculator',
        calculator_suggestion_id: suggestion?.id || null,
        dimensions: input,
        match_strategy: 'calculator',
        match_confidence: 1.0
      }));
      
      const { error: itemsError } = await supabaseClient
        .from('budget_items')
        .insert(budgetItems);
      
      if (itemsError) {
        console.error('Error saving budget items:', itemsError);
      }
    }
    
    return new Response(
      JSON.stringify({
        success: true,
        calculator: 'wardrobe',
        input,
        result
      }),
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  } catch (error: unknown) {
    console.error('Wardrobe calculator error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({
        error: 'Calculation failed',
        message: errorMessage
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
});
