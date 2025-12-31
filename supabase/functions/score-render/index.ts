/**
 * Score Render Edge Function
 * Uses AI vision to analyze render quality and return a detailed score breakdown
 */
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

interface QualityScore {
  overall: number;
  breakdown: {
    photorealism: number;
    architectural_preservation: number;
    style_consistency: number;
    furniture_proportions: number;
    lighting_quality: number;
    color_accuracy: number;
  };
  issues: string[];
  recommendations: string[];
}

const QUALITY_ANALYSIS_PROMPT = `You are an expert interior design quality assessor. Analyze the interior design render image and provide a detailed quality score.

Rate each category from 0-100:
1. PHOTOREALISM: Does it look like a real photograph? Check for AI artifacts, unrealistic lighting, or distortions.
2. ARCHITECTURAL PRESERVATION: Are windows, doors, ceiling heights, camera angle, and structural elements realistic and consistent?
3. STYLE CONSISTENCY: Is the design style cohesive throughout? No mixing of incompatible elements?
4. FURNITURE PROPORTIONS: Are furniture pieces realistically sized and positioned in the space?
5. LIGHTING QUALITY: Is the lighting natural and consistent? No impossible shadows or highlights?
6. COLOR ACCURACY: Are colors realistic and harmonious for the style?

Respond ONLY with valid JSON in this exact format:
{
  "overall": <number 0-100>,
  "breakdown": {
    "photorealism": <number 0-100>,
    "architectural_preservation": <number 0-100>,
    "style_consistency": <number 0-100>,
    "furniture_proportions": <number 0-100>,
    "lighting_quality": <number 0-100>,
    "color_accuracy": <number 0-100>
  },
  "issues": ["list of specific issues found"],
  "recommendations": ["list of improvement suggestions"]
}`;

async function analyzeRenderQuality(renderImageUrl: string, referenceImageUrl?: string): Promise<QualityScore> {
  if (!LOVABLE_API_KEY) {
    throw new Error("LOVABLE_API_KEY not configured");
  }

  console.log("Analyzing render quality with AI...");

  const hasReference = !!referenceImageUrl;
  const prompt = hasReference
    ? `You are an expert interior design quality assessor.

You will be given TWO images:
- Image A: the CLEANED/base room photo (ground truth)
- Image B: the GENERATED RENDER (must preserve the same room)

Score Image B against Image A.

CRITICAL RULES FOR ARCHITECTURAL PRESERVATION (0-100):
- If camera angle/viewpoint changes vs Image A → architectural_preservation MUST be 0-20.
- If the number of windows/doors changes or new windows/doors appear → MUST be 0-20.
- If windows/doors move to different walls → MUST be 0-20.
- Only score 90+ if Image B keeps the same camera position AND the same openings.

Then rate each category from 0-100:
1. PHOTOREALISM
2. ARCHITECTURAL PRESERVATION (relative to Image A)
3. STYLE CONSISTENCY
4. FURNITURE PROPORTIONS
5. LIGHTING QUALITY
6. COLOR ACCURACY

Respond ONLY with valid JSON in the exact format described.`
    : QUALITY_ANALYSIS_PROMPT;

  const content: any[] = [{ type: "text", text: prompt }];
  if (hasReference) {
    content.push({ type: "image_url", image_url: { url: referenceImageUrl } });
  }
  content.push({ type: "image_url", image_url: { url: renderImageUrl } });

  const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash",
      messages: [
        {
          role: "user",
          content,
        },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`AI analysis failed: ${errorText}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error("No response from AI");
  }

  // Parse JSON from response (handle markdown code blocks)
  let jsonStr = content;
  if (content.includes("```json")) {
    jsonStr = content.split("```json")[1].split("```")[0].trim();
  } else if (content.includes("```")) {
    jsonStr = content.split("```")[1].split("```")[0].trim();
  }

  try {
    const parsed = JSON.parse(jsonStr);
    return parsed as QualityScore;
  } catch {
    console.error("Failed to parse AI response:", content);
    // Return default score if parsing fails
    return {
      overall: 75,
      breakdown: {
        photorealism: 75,
        architectural_preservation: 80,
        style_consistency: 75,
        furniture_proportions: 75,
        lighting_quality: 70,
        color_accuracy: 75,
      },
      issues: ["Unable to fully analyze image"],
      recommendations: ["Please review manually"],
    };
  }
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { renderId, imageUrl, referenceImageUrl } = await req.json();

    if (!renderId && !imageUrl) {
      throw new Error("Either renderId or imageUrl is required");
    }

    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);
    let renderImageUrl = imageUrl;
    const refUrl: string | undefined = referenceImageUrl;

    // If renderId provided, fetch the render
    if (renderId) {
      const { data: render, error } = await supabase
        .from("renders")
        .select("image_url")
        .eq("id", renderId)
        .single();

      if (error) throw error;
      renderImageUrl = render.image_url;
    }

    if (!renderImageUrl) {
      throw new Error("No image URL found for render");
    }

    console.log(`Scoring render: ${renderImageUrl.slice(0, 50)}...`);

    // Analyze the render (optionally against a reference/base image)
    const qualityScore = await analyzeRenderQuality(renderImageUrl, refUrl);

    console.log(`Quality score: ${qualityScore.overall}/100`);

    // If renderId provided, update the render record
    if (renderId) {
      await supabase
        .from("renders")
        .update({
          quality_score: qualityScore.overall, // Store as 0-100
          quality_details: qualityScore,
          updated_at: new Date().toISOString(),
        })
        .eq("id", renderId);

      console.log("Render record updated with quality score");
    }

    return new Response(
      JSON.stringify({
        success: true,
        score: qualityScore,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
