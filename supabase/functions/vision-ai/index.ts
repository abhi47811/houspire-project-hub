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

A. ARCHITECTURAL ELEMENTS - MEASURE AREA/LENGTH:

FLOORING:
- Quantity: FULL floor area in sqft (NOT "1 sqft" or "2 sqft")
- Examples: 15ft × 18ft = 270 sqft, 12ft × 14ft = 168 sqft
- Room sizes: Small 100-150, Medium 150-300, Large 300-500 sqft
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

B. FURNITURE & DECOR - COUNT ITEMS:
- Sofas, chairs, tables: Count each (1 sofa, 2 chairs, 1 table)
- Cushions, plants, lamps: Count each (4 cushions, 3 plants)
- Lighting fixtures: Count each (4 ceiling lights, 1 floor lamp)
- Artwork: Count pieces (6 frames OR "1 gallery wall set")
- Area rugs: Count as items (1 area rug), NOT sqft
- Unit: "nos" (number of items)

CRITICAL - ARCHITECTURAL EXAMPLES:

Living Room (18ft × 15ft, 10ft ceiling):
✅ Concrete Floor: quantity: 270, unit: "sqft" (NOT 1 sqft!)
✅ Interior Emulsion Paint: quantity: 560, unit: "sqft" (walls minus openings)
✅ Wall Primer: quantity: 560, unit: "sqft" (same as paint)
✅ Wall Putty: quantity: 560, unit: "sqft" (same as paint)
✅ Brick Accent Wall: quantity: 150, unit: "sqft" (15ft × 10ft)
✅ Exposed Concrete Ceiling: quantity: 270, unit: "sqft" (same as floor)
✅ Ceiling Paint: quantity: 270, unit: "sqft" (if painted)
✅ Exposed Industrial Pipes: quantity: 35, unit: "rft" (running across ceiling)
✅ Metal Ducting: quantity: 20, unit: "rft"

FURNITURE EXAMPLES:
✅ 3-Seater Leather Sofa: quantity: 1, unit: "nos"
✅ Velvet Armchairs: quantity: 2, unit: "nos"
✅ Wooden Coffee Table: quantity: 1, unit: "nos"
✅ Throw Cushions: quantity: 4, unit: "nos"
✅ Area Rug: quantity: 1, unit: "nos" (NOT sqft!)
✅ Potted Plants: quantity: 3, unit: "nos"
✅ Industrial Light Tracks: quantity: 4, unit: "nos"

WRONG EXAMPLES - NEVER DO THIS:
❌ Concrete floor: quantity: 1, unit: "sqft" (IMPOSSIBLE - room is not 1 sqft!)
❌ Wall paint: quantity: 1, unit: "sqft" (Should be 400-600 sqft)
❌ Brick wall: quantity: 1, unit: "sqft" (Should be 150+ sqft)
❌ Ceiling pipes: quantity: 6, unit: "rft" (Too short - should be 30-50 rft)
❌ Sofa: quantity: 3, unit: "nos" (Counting seats, not sofas)
❌ Area rug: quantity: 120, unit: "sqft" (Should be 1 nos)

CRITICAL REMINDER:
- Architectural elements need REALISTIC measurements (150-500 sqft for floors, 400-700 sqft for wall paint)
- ALWAYS include Wall Primer + Wall Putty as separate items when walls are painted
- Furniture/decor are COUNTABLE items (1, 2, 4, 6)
- NEVER use "1 sqft" for a full room floor/ceiling/wall
- NEVER use "2 rft" or "6 rft" for pipes running across entire ceiling

For each item return:
{
  "item_name": "specific name",
  "category": "flooring|wall_treatment|ceiling|furniture|lighting|decor|fixtures",
  "specification": "material, color, finish, style",
  "quantity": <MEASURE architectural in sqft/rft, COUNT furniture in nos>,
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
