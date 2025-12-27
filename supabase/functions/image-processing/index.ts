import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const REPLICATE_API_KEY = Deno.env.get("REPLICATE_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

// Cost estimates per call
const COST_ESTIMATES = {
  "lama-cleaner": 0.002,
  "cleanup-pictures": 0.003,
  "real-esrgan": 0.005,
};

async function logApiCall(supabase: any, data: any) {
  try {
    await supabase.from("api_logs").insert({
      project_id: data.projectId,
      room_id: data.roomId,
      service: data.service,
      endpoint: data.endpoint,
      model: data.model,
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

async function pollPrediction(predictionId: string, maxAttempts = 60): Promise<any> {
  for (let i = 0; i < maxAttempts; i++) {
    const response = await fetch(`https://api.replicate.com/v1/predictions/${predictionId}`, {
      headers: { Authorization: `Token ${REPLICATE_API_KEY}` },
    });
    
    const prediction = await response.json();
    
    if (prediction.status === "succeeded") {
      return prediction;
    } else if (prediction.status === "failed") {
      throw new Error(prediction.error || "Prediction failed");
    }
    
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }
  
  throw new Error("Prediction timed out");
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const startTime = Date.now();
  const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);

  try {
    const { action, imageUrl, mask, projectId, roomId } = await req.json();

    if (!REPLICATE_API_KEY) {
      // Return mock response if API key not configured
      console.log("REPLICATE_API_KEY not configured, returning mock response");
      return new Response(JSON.stringify({
        result: {
          output: imageUrl, // Return original image
          mock: true,
          message: "Replicate API key not configured. Add REPLICATE_API_KEY to use image processing.",
        },
        usage: { costUsd: 0 },
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let model = "";
    let input: any = {};
    let costKey = "";

    switch (action) {
      case "cleanRoom":
        model = "cjwbw/lama-cleaner:8c0acea2d4f2af1f33c71c8c8b07ea0d8a0ad87c08c1a7ab4f611e98dee6f1a3";
        costKey = "lama-cleaner";
        input = {
          image: imageUrl,
          mask: mask,
          ldm_steps: 25,
          ldm_sampler: "plms",
          hd_strategy: "Resize",
          hd_strategy_resize_limit: 2048,
        };
        break;

      case "retryCleanup":
        // Fallback to different model
        model = "sczhou/codeformer:7de2ea26c616d5bf2245ad0d5e24f0ff9a6204578a5c876db53142edd9d2cd56";
        costKey = "cleanup-pictures";
        input = {
          image: imageUrl,
          upscale: 1,
          face_upsample: false,
          background_enhance: true,
          codeformer_fidelity: 0.7,
        };
        break;

      case "upscaleImage":
        model = "nightmareai/real-esrgan:f121d640bd286e1fdc67f9799164c1d5be36ff74576ee11c803ae5b665dd46aa";
        costKey = "real-esrgan";
        input = {
          image: imageUrl,
          scale: 4,
          face_enhance: false,
        };
        break;

      default:
        throw new Error(`Unknown action: ${action}`);
    }

    // Start prediction
    const createResponse = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        Authorization: `Token ${REPLICATE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ version: model.split(":")[1], input }),
    });

    if (!createResponse.ok) {
      const errorText = await createResponse.text();
      throw new Error(`Replicate API error: ${createResponse.status} - ${errorText}`);
    }

    const prediction = await createResponse.json();
    
    // Poll for completion
    const result = await pollPrediction(prediction.id);
    const latencyMs = Date.now() - startTime;
    const costUsd = COST_ESTIMATES[costKey as keyof typeof COST_ESTIMATES] || 0.005;

    await logApiCall(supabase, {
      projectId,
      roomId,
      service: "replicate",
      endpoint: action,
      model: model.split("/")[1]?.split(":")[0] || model,
      costUsd,
      latencyMs,
      status: "success",
      metadata: { predictionId: prediction.id },
    });

    return new Response(JSON.stringify({
      result: {
        output: Array.isArray(result.output) ? result.output[0] : result.output,
        predictionId: prediction.id,
      },
      usage: { costUsd },
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    const latencyMs = Date.now() - startTime;
    console.error("Image processing error:", error);

    await logApiCall(supabase, {
      service: "replicate",
      endpoint: "image-processing",
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
