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

async function logApiCall(supabase: any, data: any) {
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

// Lovable AI image generation helper - using Gemini 3 Pro Image
async function callLovableAI(
  cleanedImageUrl: string,
  prompt: string
): Promise<{ imageUrl: string; model: string; latency: number }> {
  const startTime = Date.now();

  if (!LOVABLE_API_KEY) {
    throw new Error("LOVABLE_API_KEY not configured");
  }

  console.log("Attempting generation with Lovable AI (Gemini 3 Pro Image)...");

  const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemini-3-pro-image-preview",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Transform this empty room into a stunning, magazine-quality interior design render.

CRITICAL REQUIREMENTS:
1. PRESERVE ALL ARCHITECTURAL ELEMENTS EXACTLY (windows, doors, ceiling height)
2. Apply the following design:
${prompt}

The result must be photorealistic, professionally lit, and suitable for publication in an interior design magazine.`,
            },
            {
              type: "image_url",
              image_url: { url: cleanedImageUrl },
            },
          ],
        },
      ],
      modalities: ["image", "text"],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Lovable AI HTTP ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  const images = data.choices?.[0]?.message?.images;

  if (!images || images.length === 0) {
    throw new Error("No image in Lovable AI response");
  }

  const latency = Date.now() - startTime;
  console.log(`✅ Lovable AI (Gemini 3) succeeded in ${latency}ms`);

  return {
    imageUrl: images[0].image_url.url,
    model: "google/gemini-3-pro-image-preview",
    latency,
  };
}

// OpenRouter fallback helper
async function callOpenRouter(
  cleanedImageUrl: string,
  prompt: string
): Promise<{ imageUrl: string; model: string; latency: number }> {
  const startTime = Date.now();

  if (!OPENROUTER_API_KEY) {
    throw new Error("OPENROUTER_API_KEY not configured");
  }

  console.log("Attempting generation with OpenRouter fallback...");

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": SUPABASE_URL || "https://houspire.com",
      "X-Title": "Houspire Interior Design",
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `Transform this empty room into a stunning interior design render.

REQUIREMENTS:
1. PRESERVE ALL ARCHITECTURAL ELEMENTS (windows, doors, ceiling)
2. Apply this design: ${prompt}

Create a photorealistic, magazine-quality result.`,
            },
            {
              type: "image_url",
              image_url: { url: cleanedImageUrl },
            },
          ],
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenRouter HTTP ${response.status}: ${errorText}`);
  }

  const data = await response.json();
  const latency = Date.now() - startTime;

  // OpenRouter may return image in different formats
  const images = data.choices?.[0]?.message?.images;
  const content = data.choices?.[0]?.message?.content;

  let imageUrl: string | null = null;

  if (images && images.length > 0) {
    imageUrl = images[0].image_url?.url || images[0];
  } else if (content && typeof content === "string" && content.startsWith("data:image")) {
    imageUrl = content;
  }

  if (!imageUrl) {
    throw new Error("No image in OpenRouter response");
  }

  console.log(`✅ OpenRouter fallback succeeded in ${latency}ms`);

  return {
    imageUrl,
    model: "google/gemini-2.5-flash",
    latency,
  };
}

// Generate render with fallback
async function generateRenderWithFallback(
  cleanedImageUrl: string,
  prompt: string
): Promise<{ imageUrl: string; model: string; latency: number; provider: string }> {
  // Try Lovable AI first
  try {
    const result = await callLovableAI(cleanedImageUrl, prompt);
    return { ...result, provider: "lovable" };
  } catch (lovableError) {
    console.warn("⚠️ Lovable AI failed:", lovableError instanceof Error ? lovableError.message : String(lovableError));

    // Fallback to OpenRouter
    if (OPENROUTER_API_KEY) {
      try {
        const result = await callOpenRouter(cleanedImageUrl, prompt);
        return { ...result, provider: "openrouter" };
      } catch (openrouterError) {
        console.error("❌ OpenRouter fallback also failed:", openrouterError instanceof Error ? openrouterError.message : String(openrouterError));
        throw new Error(`All AI providers failed. Lovable: ${lovableError instanceof Error ? lovableError.message : "Unknown"}. OpenRouter: ${openrouterError instanceof Error ? openrouterError.message : "Unknown"}`);
      }
    } else {
      throw lovableError;
    }
  }
}

// Build enhanced prompt using library reference data
function buildEnhancedPrompt(
  basePrompt: string,
  libraryReference: {
    image_url: string;
    design_style: string;
    color_palette?: Record<string, string>;
    analysis_data?: Record<string, unknown>;
  } | null
): string {
  let enhancedPrompt = basePrompt;
  
  if (libraryReference) {
    enhancedPrompt += `\n\nIMPORTANT: Use this reference as your primary style guide.`;
    enhancedPrompt += `\nReference style: ${libraryReference.design_style}`;
    
    // Extract color palette if available
    if (libraryReference.color_palette && Object.keys(libraryReference.color_palette).length > 0) {
      const colors = Object.values(libraryReference.color_palette).slice(0, 5).join(', ');
      enhancedPrompt += `\nMatch this color palette: ${colors}`;
    }
    
    // Extract furniture list if available
    const analysisData = libraryReference.analysis_data as Record<string, unknown> | undefined;
    if (analysisData?.furniture_list && Array.isArray(analysisData.furniture_list)) {
      const furniture = (analysisData.furniture_list as string[]).slice(0, 5).join(', ');
      enhancedPrompt += `\nInclude similar furniture: ${furniture}`;
    }
    
    // Extract layout pattern if available
    if (analysisData?.layout_pattern) {
      enhancedPrompt += `\nFollow this layout style: ${analysisData.layout_pattern}`;
    }
  }
  
  return enhancedPrompt;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const startTime = Date.now();
  const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

  try {
    const {
      action,
      cleanedImageUrl,
      prompt,
      imageUrl,
      projectId,
      roomId,
      // Seed image specific params
      seedPrompt,
      roomType,
      designStyle,
      city,
      tier,
    } = await req.json();

    if (!LOVABLE_API_KEY && !OPENROUTER_API_KEY) {
      throw new Error("No AI API keys configured");
    }

    switch (action) {
      case "generateRender": {
        console.log("generateRender called with prompt:", prompt?.slice(0, 100));
        console.log("cleanedImageUrl:", cleanedImageUrl?.slice(0, 100));
        console.log("roomId:", roomId);

        // Fetch library reference if room has one selected
        let libraryReference = null;
        if (roomId) {
          const { data: room, error: roomError } = await supabase
            .from('rooms')
            .select('library_reference_id, selected_style')
            .eq('id', roomId)
            .single();
          
          if (!roomError && room?.library_reference_id) {
            console.log("Found library_reference_id:", room.library_reference_id);
            
            const { data: libImage, error: libError } = await supabase
              .from('style_library')
              .select('id, image_url, design_style, color_palette, analysis_data')
              .eq('id', room.library_reference_id)
              .single();
            
            if (!libError && libImage) {
              libraryReference = libImage;
              console.log("Loaded library reference:", libImage.design_style);
            }
          }
        }

        // Build enhanced prompt with library reference data
        const enhancedPrompt = buildEnhancedPrompt(prompt, libraryReference);
        console.log("Enhanced prompt:", enhancedPrompt.slice(0, 200));

        const result = await generateRenderWithFallback(cleanedImageUrl, enhancedPrompt);
        const latencyMs = Date.now() - startTime;

        await logApiCall(supabase, {
          projectId,
          roomId,
          service: result.provider === "lovable" ? "lovable-ai" : "openrouter",
          endpoint: action,
          model: result.model,
          costUsd: result.provider === "lovable" ? 0.04 : 0.02,
          latencyMs,
          status: "success",
          metadata: { 
            provider: result.provider,
            usedLibraryReference: !!libraryReference,
            libraryReferenceId: libraryReference?.id || null
          },
        });

        return new Response(
          JSON.stringify({
            result: { imageUrl: result.imageUrl },
            usage: { costUsd: result.provider === "lovable" ? 0.04 : 0.02 },
            provider: result.provider,
            usedLibraryReference: !!libraryReference,
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      case "quickAnalysis": {
        if (!LOVABLE_API_KEY) {
          throw new Error("LOVABLE_API_KEY required for analysis");
        }

        const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${LOVABLE_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "google/gemini-2.5-flash-lite",
            messages: [
              {
                role: "user",
                content: [
                  { type: "text", text: "Quickly identify the room type and basic features. Return JSON: { room_type, size_estimate, features: [] }" },
                  { type: "image_url", image_url: { url: imageUrl } },
                ],
              },
            ],
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`AI API error: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        const latencyMs = Date.now() - startTime;

        await logApiCall(supabase, {
          projectId,
          roomId,
          service: "lovable-ai",
          endpoint: action,
          model: "google/gemini-2.5-flash-lite",
          costUsd: 0.0005,
          latencyMs,
          status: "success",
        });

        let result;
        try {
          result = JSON.parse(data.choices[0].message.content);
        } catch {
          result = { raw: data.choices[0].message.content };
        }

        return new Response(JSON.stringify({ result }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      case "generateSeedImage": {
        if (!LOVABLE_API_KEY) {
          throw new Error("LOVABLE_API_KEY required for seed generation");
        }

        const seedModel = "google/gemini-3-pro-image-preview";
        const seedCostPerCall = 0.04;

        const seedResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${LOVABLE_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: seedModel,
            messages: [{ role: "user", content: seedPrompt }],
            modalities: ["image", "text"],
          }),
        });

        if (!seedResponse.ok) {
          const errorText = await seedResponse.text();
          throw new Error(`AI image generation failed: ${seedResponse.status} - ${errorText}`);
        }

        const seedData = await seedResponse.json();
        const seedLatencyMs = Date.now() - startTime;

        const seedImages = seedData.choices?.[0]?.message?.images;
        if (!seedImages || seedImages.length === 0) {
          throw new Error("No image generated");
        }

        const imageDataUrl = seedImages[0].image_url.url;
        const base64Data = imageDataUrl.replace(/^data:image\/\w+;base64,/, "");

        const binaryString = atob(base64Data);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }

        const fileName = `seed-${Date.now()}-${Math.random().toString(36).substr(2, 9)}.png`;
        const { error: uploadError } = await supabase.storage
          .from("room-images")
          .upload(`seed/${fileName}`, bytes, {
            contentType: "image/png",
            cacheControl: "3600",
          });

        if (uploadError) {
          throw new Error(`Storage upload failed: ${uploadError.message}`);
        }

        const {
          data: { publicUrl },
        } = supabase.storage.from("room-images").getPublicUrl(`seed/${fileName}`);

        const { data: libraryData, error: insertError } = await supabase
          .from("style_library")
          .insert({
            image_url: publicUrl,
            thumbnail_url: publicUrl,
            source_type: "houspire_generated",
            room_type: roomType,
            design_style: designStyle,
            city: city,
            tier: tier || "standard",
            status: "active",
            quality_score: 85,
            initial_performance_known: false,
            tags: ["seed-collection", "ai-generated"],
            ranking_score: 50,
            times_selected: 0,
            times_viewed: 0,
            times_led_to_approval: 0,
            times_led_to_rejection: 0,
          })
          .select("id")
          .single();

        if (insertError) {
          throw new Error(`Database insert failed: ${insertError.message}`);
        }

        await logApiCall(supabase, {
          service: "lovable-ai",
          endpoint: "generateSeedImage",
          model: seedModel,
          costUsd: seedCostPerCall,
          latencyMs: seedLatencyMs,
          status: "success",
          metadata: { roomType, designStyle, city },
        });

        return new Response(
          JSON.stringify({
            success: true,
            libraryId: libraryData.id,
            imageUrl: publicUrl,
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      default:
        throw new Error(`Unknown action: ${action}`);
    }
  } catch (error) {
    const latencyMs = Date.now() - startTime;
    console.error("Generate AI error:", error);

    await logApiCall(supabase, {
      service: "lovable-ai",
      endpoint: "generate",
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
