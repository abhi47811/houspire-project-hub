import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
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

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const startTime = Date.now();
  const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

  try {
    const { action, cleanedImageUrl, prompt, imageUrl, projectId, roomId } = await req.json();

    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    let model = "google/gemini-2.5-flash";
    let messages: any[] = [];
    let modalities: string[] | undefined;
    let costPerCall = 0.002;

    switch (action) {
      case "generateRender":
        model = "google/gemini-3-pro-image-preview";
        modalities = ["image", "text"];
        costPerCall = 0.04;
        messages = [
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
        ];
        break;

      case "quickAnalysis":
        model = "google/gemini-2.5-flash-lite";
        costPerCall = 0.0005;
        messages = [
          {
            role: "user",
            content: [
              { type: "text", text: "Quickly identify the room type and basic features. Return JSON: { room_type, size_estimate, features: [] }" },
              { type: "image_url", image_url: { url: imageUrl } },
            ],
          },
        ];
        break;

      case "generateSeedImage": {
        // Generate a single seed image for the library
        const { seedPrompt, roomType, designStyle, city, tier } = await req.json();
        
        const seedModel = "google/gemini-2.5-flash-image-preview";
        const seedCostPerCall = 0.02;
        
        // Generate the image
        const seedResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${LOVABLE_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: seedModel,
            messages: [{ role: "user", content: seedPrompt }],
            modalities: ["image", "text"]
          }),
        });

        if (!seedResponse.ok) {
          const errorText = await seedResponse.text();
          throw new Error(`AI image generation failed: ${seedResponse.status} - ${errorText}`);
        }

        const seedData = await seedResponse.json();
        const seedLatencyMs = Date.now() - startTime;
        
        // Extract base64 image
        const seedImages = seedData.choices?.[0]?.message?.images;
        if (!seedImages || seedImages.length === 0) {
          throw new Error("No image generated");
        }
        
        const imageDataUrl = seedImages[0].image_url.url;
        const base64Data = imageDataUrl.replace(/^data:image\/\w+;base64,/, '');
        
        // Convert base64 to Uint8Array
        const binaryString = atob(base64Data);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
          bytes[i] = binaryString.charCodeAt(i);
        }
        
        // Upload to storage
        const fileName = `seed-${Date.now()}-${Math.random().toString(36).substr(2, 9)}.png`;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('room-images')
          .upload(`seed/${fileName}`, bytes, { 
            contentType: 'image/png',
            cacheControl: '3600'
          });
        
        if (uploadError) {
          throw new Error(`Storage upload failed: ${uploadError.message}`);
        }
        
        // Get public URL
        const { data: { publicUrl } } = supabase.storage
          .from('room-images')
          .getPublicUrl(`seed/${fileName}`);
        
        // Insert to style_library
        const { data: libraryData, error: insertError } = await supabase
          .from('style_library')
          .insert({
            image_url: publicUrl,
            thumbnail_url: publicUrl,
            source_type: 'houspire_generated',
            room_type: roomType,
            design_style: designStyle,
            city: city,
            tier: tier || 'standard',
            status: 'active',
            quality_score: 85,
            initial_performance_known: false,
            tags: ['seed-collection', 'ai-generated'],
            ranking_score: 50,
            times_selected: 0,
            times_viewed: 0,
            times_led_to_approval: 0,
            times_led_to_rejection: 0
          })
          .select('id')
          .single();
        
        if (insertError) {
          throw new Error(`Database insert failed: ${insertError.message}`);
        }
        
        // Log the API call
        await logApiCall(supabase, {
          service: "lovable-ai",
          endpoint: "generateSeedImage",
          model: seedModel,
          costUsd: seedCostPerCall,
          latencyMs: seedLatencyMs,
          status: "success",
          metadata: { roomType, designStyle, city }
        });
        
        return new Response(JSON.stringify({
          success: true,
          libraryId: libraryData.id,
          imageUrl: publicUrl
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      default:
        throw new Error(`Unknown action: ${action}`);
    }

    const requestBody: any = {
      model,
      messages,
    };

    if (modalities) {
      requestBody.modalities = modalities;
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
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

    await logApiCall(supabase, {
      projectId,
      roomId,
      service: "lovable-ai",
      endpoint: action,
      model,
      inputTokens,
      outputTokens,
      costUsd: costPerCall,
      latencyMs,
      status: "success",
    });

    // Handle image generation response
    if (action === "generateRender") {
      const images = data.choices?.[0]?.message?.images;
      if (images && images.length > 0) {
        return new Response(JSON.stringify({
          result: {
            imageUrl: images[0].image_url.url,
            content: data.choices[0].message.content,
          },
          usage: { inputTokens, outputTokens, costUsd: costPerCall },
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    }

    let result;
    try {
      result = JSON.parse(data.choices[0].message.content);
    } catch {
      result = { raw: data.choices[0].message.content };
    }

    return new Response(JSON.stringify({
      result,
      usage: { inputTokens, outputTokens, costUsd: costPerCall },
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
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
