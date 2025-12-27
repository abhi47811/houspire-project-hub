import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
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
    const { action, imageUrl, imageUrls, originalUrl, cleanedUrl, renderUrl, requirements, roomData, smartDefaults, analysis, projectId, roomId } = await req.json();

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    let systemPrompt = "";
    let userContent: any[] = [];
    let model = "google/gemini-2.5-flash";

    switch (action) {
      case "analyzeRoom":
        model = "google/gemini-2.5-pro";
        systemPrompt = `You are an expert interior design analyst. Analyze the room image and extract:
1. Room dimensions (estimate length, width, height in feet)
2. Window count and positions
3. Door count and positions
4. Ceiling features (fans, lights)
5. Outlet count
6. Any architectural features
7. Suggested design styles (3-5 options)
Return as structured JSON.`;
        userContent = [
          { type: "text", text: "Analyze this room image for interior design renovation." },
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
        systemPrompt = `You are an expert interior design estimator. Analyze the room renders and itemize all materials and furniture visible.
For each item provide:
- item_name: specific product name
- category: (Flooring, Wall Treatment, Ceiling, Furniture, Lighting, Fixtures)
- specification: detailed specs
- quantity: estimated count/area
- unit: (sqft, nos, rft, etc.)
Return as JSON array.`;
        const imageContents = (imageUrls || []).map((url: string) => ({
          type: "image_url",
          image_url: { url },
        }));
        userContent = [
          { type: "text", text: "Itemize all materials and furniture from these room renders for budget estimation." },
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

      default:
        throw new Error(`Unknown action: ${action}`);
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
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
      if (response.status === 429) {
        throw new Error("Rate limit exceeded. Please try again later.");
      }
      if (response.status === 402) {
        throw new Error("API credits exhausted. Please add credits.");
      }
      throw new Error(`AI API error: ${response.status} - ${errorText}`);
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
