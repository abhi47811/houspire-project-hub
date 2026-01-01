import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
const OPENROUTER_API_KEY = Deno.env.get("OPENROUTER_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

// Cost per 1M tokens (approximate)
const MODEL_COSTS = {
  "google/gemini-2.5-pro": { input: 1.25, output: 5.0 },
  "google/gemini-2.5-flash": { input: 0.075, output: 0.30 },
  "google/gemini-2.5-flash-lite": { input: 0.018, output: 0.075 },
  "openai/gpt-5": { input: 2.5, output: 10.0 },
  "openai/gpt-5-mini": { input: 0.15, output: 0.60 },
};

async function logApiCall(
  supabase: any,
  data: {
    projectId?: string;
    roomId?: string;
    service: string;
    endpoint: string;
    model?: string;
    inputTokens?: number;
    outputTokens?: number;
    costUsd: number;
    latencyMs: number;
    status: string;
    errorMessage?: string;
    metadata?: any;
  }
) {
  try {
    await supabase.from("api_logs").insert({
      project_id: data.projectId,
      room_id: data.roomId,
      service: data.service,
      endpoint: data.endpoint,
      model: data.model,
      input_tokens: data.inputTokens,
      output_tokens: data.outputTokens,
      cost_usd: data.costUsd,
      latency_ms: data.latencyMs,
      status: data.status,
      error_message: data.errorMessage,
      metadata: data.metadata,
    });
  } catch (e) {
    console.error("Failed to log API call:", e);
  }
}

function calculateCost(model: string, inputTokens: number, outputTokens: number): number {
  const costs = MODEL_COSTS[model as keyof typeof MODEL_COSTS] || { input: 0.1, output: 0.3 };
  return (inputTokens * costs.input + outputTokens * costs.output) / 1_000_000;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const startTime = Date.now();
  const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

  try {
    const { action, imageUrl, imageUrls, originalUrl, cleanedUrl, renderUrl, requirements, roomData, smartDefaults, analysis, projectId, roomId, expectedDoors, expectedWindows } = await req.json();

    // Check if API keys are configured
    if (!LOVABLE_API_KEY && !OPENROUTER_API_KEY) {
      return new Response(JSON.stringify({
        error: "API keys not configured",
        message: "Please configure LOVABLE_API_KEY or OPENROUTER_API_KEY in Supabase Edge Functions settings",
        demo: true,
        result: {
          // Return demo data based on action
          ...(action === "analyzeRoom" && {
            dimensions: { length_feet: 12, width_feet: 14, height_feet: 9 },
            window_count: 2,
            mirror_count: 0,
            door_count: 1,
            ceiling_fan_count: 1,
            ac_unit_count: 0,
            outlet_count: 4,
            window_positions: [
              { position: "north wall", size: "4x5 feet" },
              { position: "east wall", size: "4x5 feet" }
            ],
            mirror_positions: [],
            door_positions: [{ position: "south wall", type: "entry door" }],
            other_features: [],
            measurement_confidence: 80,
            suggested_styles: [
              { name: "Modern Minimalist", confidence: 90, description: "Clean lines and neutral colors" },
              { name: "Contemporary Fusion", confidence: 75, description: "Mix of modern and traditional" }
            ]
          }),
          ...(action === "validatePreservation" && {
            doors: expectedDoors || 1,
            windows: expectedWindows || 2,
            doorsPreserved: true,
            windowsPreserved: true,
            confidence: 95,
            notes: "Demo mode: All architectural elements preserved"
          })
        }
      }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Use OpenRouter as primary, Lovable as fallback
    const apiKey = OPENROUTER_API_KEY || LOVABLE_API_KEY;
    const apiUrl = OPENROUTER_API_KEY 
      ? "https://openrouter.ai/api/v1/chat/completions"
      : "https://ai.gateway.lovable.dev/v1/chat/completions";

    let systemPrompt = "";
    let userContent: any[] = [];
    let model = "google/gemini-2.5-flash";

    switch (action) {
      case "analyzeRoom":
        // Use gpt-5-mini for faster analysis (15-30s instead of 60-120s)
        model = "openai/gpt-5-mini";
        systemPrompt = `You are an expert interior design analyst with precise architectural detection capabilities.

CRITICAL DISTINCTION - Identify these elements correctly:
- WINDOWS: Have frames, show outdoor views or natural light, transparent glass showing outside
- MIRRORS: Reflect the room interior, show room's own contents, often have decorative frames
- DOORS: Entry/exit points, have handles, may be open or closed
- AC UNITS: Wall-mounted cooling units, often white/beige rectangles on walls

Analyze the room image and extract with high accuracy:
1. Room dimensions (estimate length, width, height in feet based on visual cues)
2. Window count and positions (ONLY count if showing outdoor view/natural light)
3. Mirror count and positions (count separately from windows)
4. Door count and positions (entry doors, closet doors, balcony doors)
5. Ceiling features (fans, lights, AC ducts)
6. Outlet count (electrical outlets visible)
7. AC unit count
8. Other architectural features (moldings, columns, arches, niches, built-in wardrobes)
9. Suggested design styles (3-5 options with confidence percentage)

Return as structured JSON with this format:
{
  "dimensions": { "length_feet": number, "width_feet": number, "height_feet": number },
  "window_count": number,
  "mirror_count": number,
  "door_count": number,
  "ceiling_fan_count": number,
  "ac_unit_count": number,
  "outlet_count": number,
  "window_positions": [{"position": string, "size": string}],
  "mirror_positions": [{"position": string, "size": string}],
  "door_positions": [{"position": string, "type": string}],
  "other_features": [{"type": string, "position": string}],
  "measurement_confidence": number (0-100),
  "suggested_styles": [{"name": string, "confidence": number, "description": string}]
}`;
        userContent = [
          { type: "text", text: "Analyze this room image for interior design renovation. Pay special attention to distinguishing mirrors from windows - mirrors reflect room contents while windows show outdoor views." },
          { type: "image_url", image_url: { url: imageUrl } },
        ];
        break;

      case "validateCleaning":
        systemPrompt = `You are a quality assurance expert for image cleaning. Compare the original and cleaned images.
Check that:
1. All furniture is removed
2. Windows and doors are preserved exactly
3. Wall surfaces are clean and visible
4. No artifacts or distortions
Return JSON with: { valid: boolean, issues: string[], preservedElements: string[], qualityScore: number (0-100) }`;
        userContent = [
          { type: "text", text: "Validate the cleaning quality. First image is original, second is cleaned." },
          { type: "image_url", image_url: { url: originalUrl } },
          { type: "image_url", image_url: { url: cleanedUrl } },
        ];
        break;

      case "validateFinalRender":
        model = "google/gemini-2.5-pro";
        systemPrompt = `You are a magazine-quality interior design critic. Evaluate the render for:
1. Architectural preservation (windows, doors, ceiling - MUST be 100%)
2. Design style accuracy
3. Photorealism quality
4. Furniture proportions
5. Overall magazine-worthiness
Requirements to check: ${JSON.stringify(requirements)}
Return JSON with scores (0-100) for each category and overall, plus any issues found.`;
        userContent = [
          { type: "text", text: "Evaluate this interior design render for magazine-quality publication." },
          { type: "image_url", image_url: { url: renderUrl } },
        ];
        break;

      case "itemizeBudget":
        model = "google/gemini-2.5-pro";
        systemPrompt = `You are an expert interior design estimator and quantity surveyor. Analyze this room and provide accurate measurements and counts.

STEP 1: ESTIMATE ROOM DIMENSIONS FIRST
Observe furniture scale, ceiling height, and spatial proportions to estimate:
- Room length (ft): typical 12-25 ft
- Room width (ft): typical 10-20 ft
- Ceiling height (ft): typical 9-12 ft (industrial/loft: 10-14 ft)
- Floor area = length × width (sqft)
- Wall perimeter = 2 × (length + width)

STEP 2: QUANTITY RULES BY CATEGORY

===============================================
A. ARCHITECTURAL ELEMENTS - MEASURE AREA/LENGTH
===============================================

FLOORING:
- Quantity: FULL floor area in sqft (NOT "1 sqft" or "2 sqft")
- Examples: 15ft × 18ft = 270 sqft, 12ft × 14ft = 168 sqft
- Room sizes: Small 100-150, Medium 150-300, Large 300-500 sqft
- Detect type: wood/laminate, marble, tile, concrete, carpet
- Unit: "sqft"

WALL PAINT - CRITICAL DETECTION:
- Quantity: Total painted wall area in sqft
- Calculate: Wall perimeter × ceiling height - windows/doors
- Example: (15+18+15+18)ft × 10ft = 660 sqft, minus 100 sqft for openings = 560 sqft
- Detect finish type from visual cues:
  * Matte/flat finish (no reflection) → "Interior Emulsion Paint"
  * Satin/eggshell finish (soft sheen) → "Premium Emulsion Paint"
  * High gloss/shiny → "Duco Paint Gloss"
  * Textured/patterned surface → "Textured Wall Paint"
  * Rough plaster/Italian look → "Stucco Venetian Plaster"
  * Chalky/traditional look → "Limewash Paint"
  * Metallic/shimmer effect → "Metallic Paint Finish"
- Include as SEPARATE line items:
  * Wall Putty: same sqft as paint (for smooth finish)
  * Wall Primer: same sqft as paint (base coat)
- Unit: "sqft"

WALLS (non-paint treatments):
- Quantity: Wall area in sqft (width × height)
- Example: 15ft wide × 10ft high = 150 sqft
- Deduct 30-50 sqft per large window/door
- Unit: "sqft"

CEILING:
- Quantity: Ceiling area = floor area (sqft)
- Example: Same as floor (270 sqft)
- For painted ceiling, add "Ceiling Paint" as separate item
- Unit: "sqft"

LINEAR ELEMENTS (pipes, ducts, molding):
- Quantity: Total visible length in running feet
- Examples: Exposed pipes 30-50 rft, Ducting 15-40 rft, Molding = perimeter (40-80 rft)
- Unit: "rft" (running feet)

===============================================
B. LIGHTING - COUNT EACH FIXTURE
===============================================

CEILING LIGHTS:
- Downlights/Recessed lights: Count each (e.g., "6 LED Downlights")
- Spotlights: Count each
- Unit: "nos"

CHANDELIERS:
- Count: 1 per room typically
- Identify type: crystal, modern, contemporary, rustic
- Identify size: small (3-4 light), medium (6-8 light), large (12+ light)
- Example: "Crystal Chandelier 6 Light": quantity: 1, unit: "nos"

PENDANT LIGHTS:
- Count each pendant (dining often has 3-5 over table)
- Example: "Pendant Light Modern": quantity: 3, unit: "nos"

CEILING FANS:
- Count each fan
- Identify type: regular, designer, BLDC
- Example: "Designer Ceiling Fan": quantity: 1, unit: "nos"

FLOOR LAMPS:
- Count each (tripod lamp, arc lamp, standard lamp)
- Example: "Floor Lamp Tripod": quantity: 2, unit: "nos"

TABLE LAMPS:
- Count each (bedside lamps, desk lamps)
- Example: "Table Lamp Ceramic": quantity: 2, unit: "nos"

WALL SCONCES:
- Count (usually in pairs)
- Example: "Wall Sconce Modern": quantity: 2, unit: "nos"

TRACK LIGHTING:
- Measure track length in rft + count spots separately
- Example: "Track Lighting": quantity: 12, unit: "rft"

LED STRIP/COVE LIGHTING:
- Measure length in running feet (perimeter of cove)
- Example: "LED Strip Warm": quantity: 45, unit: "rft"

===============================================
C. SOFT FURNISHINGS - MEASURE OR COUNT
===============================================

CURTAINS:
- Measure: window width × 2 (for fullness) × drop height = sqft
- Example: 2 windows × (5ft × 2) × 8ft = 160 sqft
- Detect type: sheer, blackout, linen, velvet, silk
- Example: "Blackout Curtains": quantity: 160, unit: "sqft"

BLINDS:
- Measure: window area in sqft
- Detect type: roller, venetian, roman, vertical
- Example: "Roller Blinds": quantity: 40, unit: "sqft"

THROW BLANKETS:
- Count each
- Example: "Chenille Throw Blanket": quantity: 1, unit: "nos"

THROW PILLOWS/CUSHIONS:
- Count each individual cushion
- Example: "Velvet Cushion": quantity: 4, unit: "nos"

BEDDING SETS:
- Count: 1 per bed
- Detect type: cotton, linen, silk
- Example: "Cotton Bedding Set King": quantity: 1, unit: "set"

AREA RUGS:
- Count as 1 item (NOT sqft!)
- Example: "Handwoven Area Rug": quantity: 1, unit: "nos"

===============================================
D. FALSE CEILING - MEASURE AREA
===============================================

Detect type from visual appearance:
- Smooth white/painted surface → "Gypsum False Ceiling"
- Decorative molding/cornices → "POP False Ceiling"
- Grid pattern visible → "Grid False Ceiling"
- Wood panels/planks → "Wooden False Ceiling"
- Metal/industrial look → "Metal False Ceiling"

Quantity: Same as floor area (sqft)
Example: "Gypsum False Ceiling": quantity: 270, unit: "sqft"

COVE LIGHTING (if present):
- Measure perimeter of cove in rft
- Example: "Cove Lighting Profile": quantity: 66, unit: "rft"

===============================================
E. DOORS - COUNT AND IDENTIFY TYPE
===============================================

Count each door visible:
- Entry doors
- Bedroom doors
- Bathroom doors
- Closet/wardrobe doors
- Balcony/patio doors

Identify type:
- Flush Door (plain, flat surface)
- Panel Door (raised/recessed panels)
- Glass Door (full or partial glass)
- Sliding Door
- Folding Door

Standard size: 7ft × 3ft (include frame)
Example: "Flush Door with Frame": quantity: 2, unit: "nos"

===============================================
F. WINDOWS - COUNT AND ESTIMATE SIZE
===============================================

Count each window visible:
- Standard windows
- Floor-to-ceiling windows
- Bay windows
- Skylights

Estimate size category:
- Small: 3ft × 3ft = 9 sqft
- Medium: 4ft × 5ft = 20 sqft
- Large: 6ft × 5ft = 30 sqft
- Floor-to-ceiling: 8ft × 10ft = 80 sqft

Identify type:
- Sliding Window
- Casement Window
- Fixed Window
- French Window

Example: "UPVC Sliding Window": quantity: 3, unit: "nos"

===============================================
G. ELECTRICAL - COUNT POINTS
===============================================

SWITCHES:
- Count visible switch plates
- Example: "Modular Switch 6 Module": quantity: 4, unit: "nos"

SOCKETS/OUTLETS:
- Count visible electrical outlets
- Example: "Power Socket 16A": quantity: 6, unit: "nos"

AC UNITS:
- Count each (split AC, window AC)
- Example: "Split AC 1.5 Ton": quantity: 1, unit: "nos"

===============================================
H. KITCHEN - MEASURE AND COUNT (Kitchen images only)
===============================================

BASE CABINETS:
- Measure total length in running feet
- Example: "Modular Kitchen Base Unit": quantity: 12, unit: "rft"

UPPER/WALL CABINETS:
- Measure total length in running feet
- Example: "Modular Kitchen Wall Unit": quantity: 10, unit: "rft"

TALL UNITS:
- Count each tall cabinet
- Example: "Kitchen Tall Unit": quantity: 1, unit: "nos"

COUNTERTOP:
- Measure length × 2ft depth = sqft
- Detect material: granite, quartz, marble, laminate
- Example: "Quartz Countertop": quantity: 24, unit: "sqft"

BACKSPLASH:
- Measure length × 1.5ft height = sqft
- Example: "Glass Backsplash": quantity: 18, unit: "sqft"

APPLIANCES (count each):
- Chimney: "Kitchen Chimney": quantity: 1, unit: "nos"
- Hob/Cooktop: "Built-in Hob 4 Burner": quantity: 1, unit: "nos"
- Oven: "Built-in Oven": quantity: 1, unit: "nos"
- Sink: "Kitchen Sink Stainless": quantity: 1, unit: "nos"
- Refrigerator: Count if visible

===============================================
I. BATHROOM - COUNT FIXTURES (Bathroom images only)
===============================================

TOILET/WC:
- Count (usually 1)
- Identify type: wall-hung, floor-mounted
- Example: "EWC Wall Hung": quantity: 1, unit: "nos"

WASH BASIN:
- Count (1 or 2 for double vanity)
- Identify type: countertop, wall-mounted, pedestal
- Example: "Wash Basin Countertop": quantity: 1, unit: "nos"

SHOWER:
- Count shower areas
- Identify type: regular, rain shower, handheld
- Example: "Rain Shower Set": quantity: 1, unit: "set"

BATHTUB:
- Count if present
- Identify type: freestanding, built-in, corner
- Example: "Freestanding Bathtub": quantity: 1, unit: "nos"

VANITY/CABINET:
- Count units
- Example: "Bathroom Vanity Unit": quantity: 1, unit: "nos"

BATHROOM TILES:
- Wall tiles: Measure wall area in sqft
- Floor tiles: Measure floor area in sqft
- Example: "Ceramic Wall Tiles": quantity: 120, unit: "sqft"
- Example: "Vitrified Floor Tiles": quantity: 40, unit: "sqft"

BATHROOM ACCESSORIES:
- Mirror: Count
- Towel rails, soap dispensers: Count

===============================================
J. FURNITURE - COUNT ITEMS PRECISELY
===============================================

SOFAS:
- Count each sofa unit
- Identify type: 2-seater, 3-seater, L-shaped, sectional
- Example: "3-Seater Leather Sofa": quantity: 1, unit: "nos"

BEDS:
- Count each bed
- Identify size: king, queen, single
- Example: "King Size Upholstered Bed": quantity: 1, unit: "nos"

DINING TABLES:
- Count (usually 1)
- Identify size: 4-seater, 6-seater, 8-seater
- Example: "Dining Table 6 Seater": quantity: 1, unit: "nos"

DINING CHAIRS:
- Count each chair
- Example: "Dining Chair Upholstered": quantity: 6, unit: "nos"

WARDROBES:
- Count units
- Estimate width: 4ft, 6ft, 8ft
- Example: "Sliding Wardrobe 6ft": quantity: 1, unit: "nos"

TV UNITS:
- Count
- Example: "TV Unit Wall Mounted": quantity: 1, unit: "nos"

STUDY/WORK TABLES:
- Count each
- Example: "Study Table with Storage": quantity: 1, unit: "nos"

SIDE TABLES:
- Count each
- Example: "Bedside Table": quantity: 2, unit: "nos"

COFFEE TABLES:
- Count
- Example: "Coffee Table Wooden": quantity: 1, unit: "nos"

ARMCHAIRS/ACCENT CHAIRS:
- Count each
- Example: "Accent Chair Velvet": quantity: 2, unit: "nos"

===============================================
K. DECOR - COUNT ITEMS
===============================================

ARTWORK/WALL ART:
- Count individual pieces or as gallery wall
- Example: "Framed Art Print": quantity: 3, unit: "nos"

MIRRORS (decorative):
- Count each
- Example: "Decorative Wall Mirror": quantity: 1, unit: "nos"

PLANTS:
- Count each pot/planter
- Example: "Indoor Plant with Pot": quantity: 4, unit: "nos"

VASES:
- Count each
- Example: "Decorative Vase Ceramic": quantity: 2, unit: "nos"

CLOCKS:
- Count
- Example: "Wall Clock Modern": quantity: 1, unit: "nos"

SCULPTURES:
- Count
- Example: "Decorative Sculpture": quantity: 1, unit: "nos"

===============================================
CRITICAL REMINDERS - NEVER DO THIS:
===============================================
❌ Flooring: quantity: 1, unit: "sqft" (Should be 150-500 sqft)
❌ Wall paint: quantity: 1, unit: "sqft" (Should be 400-700 sqft)
❌ False ceiling: quantity: 2, unit: "sqft" (Should be 150-500 sqft)
❌ Curtains: quantity: 1, unit: "nos" (Should be sqft for fabric)
❌ Area rug: quantity: 120, unit: "sqft" (Should be 1 nos)
❌ Pipes: quantity: 6, unit: "rft" (Should be 30-50 rft)

===============================================
OUTPUT FORMAT
===============================================
For each item return:
{
  "item_name": "specific name matching pricing database",
  "category": "flooring|wall_treatment|ceiling|lighting|soft_furnishings|false_ceiling|doors|windows|electrical|kitchen|bathroom|furniture|decor|fixtures",
  "specification": "material, color, finish, style details",
  "quantity": <MEASURE architectural in sqft/rft, COUNT items in nos>,
  "unit": "sqft|rft|nos|set"
}

Return as JSON array.`;
        const imageContents = (imageUrls || []).map((url: string) => ({
          type: "image_url",
          image_url: { url },
        }));
        userContent = [
          { type: "text", text: `Analyze this room image carefully:

STEP 1: First estimate room dimensions (length × width × height in feet)
STEP 2: Calculate floor area, wall areas, ceiling area (in sqft) - NOT "1 sqft"!
STEP 3: Estimate linear measurements for pipes, ducts, molding (in rft) - NOT "2 rft" or "6 rft" for full ceiling runs!
STEP 4: Count furniture and decor items precisely (1 sofa, 2 chairs, 4 cushions)

CRITICAL REMINDERS:
- Floor/ceiling: 150-500 sqft (NEVER "1 sqft")
- Walls: 100-300 sqft each (NEVER "1 sqft")
- Pipes/ducts: 20-50 rft (NEVER "2 rft" or "6 rft" for full runs)
- Furniture: countable (1, 2, 4, 6)
- Area rugs: 1 nos (NEVER sqft)` },
          ...imageContents,
        ];
        break;

      case "generatePrompt":
        systemPrompt = `You are an expert prompt engineer for interior design image generation.
Create a detailed, photorealistic prompt for an AI image generator based on:
- Room data: ${JSON.stringify(roomData)}
- Smart defaults: ${JSON.stringify(smartDefaults)}
- Analysis results: ${JSON.stringify(analysis)}

The prompt should:
1. Describe the exact room layout preserving all architectural elements
2. Specify the design style, colors, and materials
3. Detail furniture placement and style
4. Include lighting specifications
5. Emphasize photorealism and magazine-quality output

Return JSON with: { prompt: string, negativePrompt: string, styleKeywords: string[] }`;
        userContent = [
          { type: "text", text: "Generate an optimal interior design prompt." },
        ];
        break;

      case "quickAnalysis":
        model = "google/gemini-2.5-flash-lite";
        systemPrompt = `Quickly analyze this room image and return basic info:
- room_type: (living_room, bedroom, kitchen, etc.)
- approximate_size: (small, medium, large)
- natural_light: (low, medium, high)
- current_style: brief description
Return as JSON.`;
        userContent = [
          { type: "text", text: "Quick room analysis." },
          { type: "image_url", image_url: { url: imageUrl } },
        ];
        break;

      case "validatePreservation":
        model = "google/gemini-2.5-flash";
        systemPrompt = `You are an architectural preservation validator. Analyze this interior image and count architectural elements precisely.

IMPORTANT DISTINCTIONS:
- DOORS: Entry/exit points with handles, including closet doors, room doors, balcony doors
- WINDOWS: Openings that show outdoor views or natural light coming in
- Do NOT count mirrors as windows (mirrors reflect room interiors)

Count and verify:
1. Number of doors visible
2. Number of windows visible

Expected elements:
- Expected doors: ${expectedDoors || 0}
- Expected windows: ${expectedWindows || 0}

Return JSON with:
{
  "doors": number,
  "windows": number,
  "doorsPreserved": boolean (doors count matches expected),
  "windowsPreserved": boolean (windows count matches expected),
  "confidence": number (0-100),
  "notes": string (any observations about preservation)
}`;
        userContent = [
          { type: "text", text: `Validate architectural preservation in this cleaned/rendered room image. Expected: ${expectedDoors || 0} doors, ${expectedWindows || 0} windows.` },
          { type: "image_url", image_url: { url: imageUrl } },
        ];
        break;

      default:
        throw new Error(`Unknown action: ${action}`);
    }

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        ...(OPENROUTER_API_KEY && {
          "HTTP-Referer": "https://houspire.app",
          "X-Title": "Houspire Interior Design"
        })
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userContent },
        ],
        response_format: { type: "json_object" },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`AI API error: ${response.status} - ${errorText}`);
      
      if (response.status === 429) {
        throw new Error("Rate limit exceeded. Please try again in a few moments.");
      }
      if (response.status === 402 || response.status === 401) {
        throw new Error("API authentication failed. Please check your API key and credits.");
      }
      if (response.status === 400) {
        throw new Error(`Bad request: ${errorText}. Please check the image URL and parameters.`);
      }
      throw new Error(`AI API error (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    const latencyMs = Date.now() - startTime;
    const inputTokens = data.usage?.prompt_tokens || 0;
    const outputTokens = data.usage?.completion_tokens || 0;
    const costUsd = calculateCost(model, inputTokens, outputTokens);

    await logApiCall(supabase, {
      projectId,
      roomId,
      service: "lovable-ai",
      endpoint: action,
      model,
      inputTokens,
      outputTokens,
      costUsd,
      latencyMs,
      status: "success",
    });

    let result;
    try {
      result = JSON.parse(data.choices[0].message.content);
    } catch {
      result = { raw: data.choices[0].message.content };
    }

    return new Response(JSON.stringify({ result, usage: { inputTokens, outputTokens, costUsd } }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    const latencyMs = Date.now() - startTime;
    console.error("Vision AI error:", error);

    await logApiCall(supabase, {
      service: "lovable-ai",
      endpoint: "vision",
      costUsd: 0,
      latencyMs,
      status: "error",
      errorMessage: error instanceof Error ? error.message : "Unknown error",
    });

    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
