/**
 * Score Render Edge Function
 * Uses AI vision to analyze render quality and return a detailed score breakdown.
 *
 * Key requirement: When a reference (cleaned/base) image is provided, architectural preservation must
 * be penalized (0–20) if camera angle/viewpoint or openings (windows/doors) do not match.
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

type PreservationFlags = {
  camera_angle_match?: boolean;
  openings_match?: boolean;
  extra_windows_detected?: boolean;
  extra_doors_detected?: boolean;
};

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
  // Optional extra data (safe to store in JSON)
  preservation_flags?: PreservationFlags;
}

const BASE_PROMPT = `You are an expert interior design quality assessor. Analyze the interior design render image and provide a detailed quality score.

Rate each category from 0-100:
1. PHOTOREALISM: Does it look like a real photograph? Check for AI artifacts, unrealistic lighting, or distortions.
2. ARCHITECTURAL PRESERVATION: Are windows, doors, ceiling heights, camera angle, and structural elements realistic and consistent?
3. STYLE CONSISTENCY: Is the design style cohesive throughout? No mixing of incompatible elements?
4. FURNITURE PROPORTIONS: Are furniture pieces realistically sized and positioned in the space?
5. LIGHTING QUALITY: Is the lighting natural and consistent? No impossible shadows or highlights?
6. COLOR ACCURACY: Are colors realistic and harmonious for the style?

Respond ONLY with valid JSON. You MUST include these keys: overall, breakdown, issues, recommendations.
JSON format:
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

function clamp0to100(n: unknown, fallback: number): number {
  const num = typeof n === "number" ? n : Number(n);
  if (!Number.isFinite(num)) return fallback;
  return Math.max(0, Math.min(100, Math.round(num)));
}

function sanitizeQualityScore(raw: any): QualityScore {
  const fallback: QualityScore = {
    overall: 75,
    breakdown: {
      photorealism: 75,
      architectural_preservation: 75,
      style_consistency: 75,
      furniture_proportions: 75,
      lighting_quality: 75,
      color_accuracy: 75,
    },
    issues: ["Unable to fully analyze image"],
    recommendations: ["Please review manually"],
  };

  if (!raw || typeof raw !== "object") return fallback;

  const breakdown = raw.breakdown ?? {};
  const score: QualityScore = {
    overall: clamp0to100(raw.overall, fallback.overall),
    breakdown: {
      photorealism: clamp0to100(breakdown.photorealism, fallback.breakdown.photorealism),
      architectural_preservation: clamp0to100(
        breakdown.architectural_preservation,
        fallback.breakdown.architectural_preservation,
      ),
      style_consistency: clamp0to100(breakdown.style_consistency, fallback.breakdown.style_consistency),
      furniture_proportions: clamp0to100(
        breakdown.furniture_proportions,
        fallback.breakdown.furniture_proportions,
      ),
      lighting_quality: clamp0to100(breakdown.lighting_quality, fallback.breakdown.lighting_quality),
      color_accuracy: clamp0to100(breakdown.color_accuracy, fallback.breakdown.color_accuracy),
    },
    issues: Array.isArray(raw.issues) ? raw.issues.map(String) : fallback.issues,
    recommendations: Array.isArray(raw.recommendations)
      ? raw.recommendations.map(String)
      : fallback.recommendations,
    preservation_flags:
      raw.preservation_flags && typeof raw.preservation_flags === "object"
        ? {
            camera_angle_match:
              typeof raw.preservation_flags.camera_angle_match === "boolean"
                ? raw.preservation_flags.camera_angle_match
                : undefined,
            openings_match:
              typeof raw.preservation_flags.openings_match === "boolean"
                ? raw.preservation_flags.openings_match
                : undefined,
            extra_windows_detected:
              typeof raw.preservation_flags.extra_windows_detected === "boolean"
                ? raw.preservation_flags.extra_windows_detected
                : undefined,
            extra_doors_detected:
              typeof raw.preservation_flags.extra_doors_detected === "boolean"
                ? raw.preservation_flags.extra_doors_detected
                : undefined,
          }
        : undefined,
  };

  return score;
}

function parseJsonFromModelText(modelText: string): any {
  let jsonStr = modelText.trim();

  // Handle markdown code blocks
  if (jsonStr.includes("```json")) {
    jsonStr = jsonStr.split("```json")[1].split("```")[0].trim();
  } else if (jsonStr.includes("```")) {
    jsonStr = jsonStr.split("```")[1].split("```")[0].trim();
  }

  return JSON.parse(jsonStr);
}

function computeOverallFromBreakdown(score: QualityScore): number {
  const b = score.breakdown;
  const avg =
    (b.photorealism +
      b.architectural_preservation +
      b.style_consistency +
      b.furniture_proportions +
      b.lighting_quality +
      b.color_accuracy) /
    6;
  return clamp0to100(avg, score.overall);
}

function enforcePreservationCaps(score: QualityScore): QualityScore {
  const flags = score.preservation_flags;
  if (!flags) return score;

  const cameraMismatch = flags.camera_angle_match === false;
  const openingsMismatch = flags.openings_match === false;
  const extraWindows = flags.extra_windows_detected === true;
  const extraDoors = flags.extra_doors_detected === true;

  if (cameraMismatch || openingsMismatch || extraWindows || extraDoors) {
    const capped = {
      ...score,
      breakdown: {
        ...score.breakdown,
        architectural_preservation: Math.min(score.breakdown.architectural_preservation, 20),
      },
    } satisfies QualityScore;

    // Make overall reflect the preservation penalty (never higher than the recalculated average)
    capped.overall = Math.min(capped.overall, computeOverallFromBreakdown(capped));

    // Ensure issues mention the mismatch (helpful for UI/QA)
    const extraIssues: string[] = [];
    if (cameraMismatch) extraIssues.push("Camera angle/viewpoint does not match the reference image.");
    if (openingsMismatch) extraIssues.push("Windows/doors/openings do not match the reference image.");
    if (extraWindows) extraIssues.push("Extra windows detected compared to the reference image.");
    if (extraDoors) extraIssues.push("Extra doors detected compared to the reference image.");

    const issues = Array.from(new Set([...(capped.issues ?? []), ...extraIssues]));
    return { ...capped, issues };
  }

  // If flags say everything matches, still ensure overall isn't inflated
  return { ...score, overall: Math.min(score.overall, computeOverallFromBreakdown(score)) };
}

async function analyzeRenderQuality(renderImageUrl: string, referenceImageUrl?: string): Promise<QualityScore> {
  if (!LOVABLE_API_KEY) {
    throw new Error("LOVABLE_API_KEY not configured");
  }

  const hasReference = !!referenceImageUrl;

  const strictReferencePrompt = `You are an expert interior design quality assessor.

You will be given TWO images:
- Image A: the CLEANED/base room photo (ground truth)
- Image B: the GENERATED RENDER (must preserve the same room)

Your job: score Image B against Image A.

ABSOLUTE RULES (NON-NEGOTIABLE):
- If camera angle/viewpoint changes vs Image A → architectural_preservation MUST be 0-20.
- If the number of windows/doors changes or new windows/doors appear → architectural_preservation MUST be 0-20.
- If windows/doors move to different walls → architectural_preservation MUST be 0-20.
- Only score 90+ for architectural_preservation if Image B keeps the SAME camera position AND the SAME openings.

First, decide these flags (be strict):
- camera_angle_match: true only if camera position + viewing direction are the same.
- openings_match: true only if windows/doors/openings count AND placement match.
- extra_windows_detected: true if Image B has ANY additional windows.
- extra_doors_detected: true if Image B has ANY additional doors.

Then rate each category 0-100:
1. photorealism
2. architectural_preservation (relative to Image A, MUST obey rules)
3. style_consistency
4. furniture_proportions
5. lighting_quality
6. color_accuracy

Respond ONLY with valid JSON. You MUST include these keys: overall, breakdown, issues, recommendations.
You MUST ALSO include preservation_flags with the booleans.

JSON format:
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
  "issues": ["..."],
  "recommendations": ["..."],
  "preservation_flags": {
    "camera_angle_match": <true|false>,
    "openings_match": <true|false>,
    "extra_windows_detected": <true|false>,
    "extra_doors_detected": <true|false>
  }
}`;

  const prompt = hasReference ? strictReferencePrompt : BASE_PROMPT;

  const requestContent: any[] = [{ type: "text", text: prompt }];
  if (hasReference) {
    requestContent.push({ type: "image_url", image_url: { url: referenceImageUrl } });
  }
  requestContent.push({ type: "image_url", image_url: { url: renderImageUrl } });

  const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // Prefer a stricter reasoning model for better rule adherence
      model: "openai/gpt-5-mini",
      messages: [{ role: "user", content: requestContent }],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`AI analysis failed: ${errorText}`);
  }

  const data = await response.json();
  const aiText: string | undefined = data.choices?.[0]?.message?.content;

  if (!aiText) {
    throw new Error("No response from AI");
  }

  try {
    const parsed = parseJsonFromModelText(aiText);
    const sanitized = sanitizeQualityScore(parsed);
    return hasReference ? enforcePreservationCaps(sanitized) : sanitized;
  } catch (e) {
    console.error("Failed to parse AI response:", aiText);
    console.error("Parse error:", e);
    return {
      overall: 75,
      breakdown: {
        photorealism: 75,
        architectural_preservation: hasReference ? 60 : 75,
        style_consistency: 75,
        furniture_proportions: 75,
        lighting_quality: 70,
        color_accuracy: 75,
      },
      issues: ["Unable to fully analyze image"],
      recommendations: ["Please review manually"],
      preservation_flags: hasReference
        ? { camera_angle_match: false, openings_match: false, extra_windows_detected: false, extra_doors_detected: false }
        : undefined,
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

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error("Backend env not configured");
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    let renderImageUrl: string | undefined = imageUrl;
    const refUrl: string | undefined = referenceImageUrl || undefined;

    // If renderId provided, fetch the render
    if (renderId) {
      const { data: render, error } = await supabase
        .from("renders")
        .select("image_url")
        .eq("id", renderId)
        .single();

      if (error) throw error;
      renderImageUrl = render?.image_url;
    }

    if (!renderImageUrl) {
      throw new Error("No image URL found for render");
    }

    console.log("Scoring render:", renderImageUrl.slice(0, 80));
    if (refUrl) console.log("Using reference image:", refUrl.slice(0, 80));

    const qualityScore = await analyzeRenderQuality(renderImageUrl, refUrl);

    console.log(`Quality score: ${qualityScore.overall}/100 (arch: ${qualityScore.breakdown.architectural_preservation})`);

    // If renderId provided, update the render record
    if (renderId) {
      const { error: updateError } = await supabase
        .from("renders")
        .update({
          quality_score: qualityScore.overall, // Store as 0-100
          quality_details: qualityScore,
          updated_at: new Date().toISOString(),
        })
        .eq("id", renderId);

      if (updateError) throw updateError;
      console.log("Render record updated with quality score");
    }

    return new Response(JSON.stringify({ success: true, score: qualityScore }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
