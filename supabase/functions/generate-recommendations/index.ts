import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface RoomContext {
  room_id: string;
  room_type: string;
  room_name?: string;
  dimensions: {
    length_feet?: number;
    width_feet?: number;
    height_feet?: number;
  };
  budget_tier: string;
  city?: string;
  selected_style?: string;
  analysis_data?: Record<string, unknown>;
  project_context?: Record<string, unknown>;
}

interface StyleRecommendation {
  id: string;
  style_name: string;
  confidence_score: number;
  estimated_cost_range: { min: number; max: number; currency: string };
  budget_fit: string;
  pros: string[];
  cons: string[];
  color_palette: string[];
  key_elements: string[];
  reasoning: string;
  match_factors: string[];
}

interface FurniturePlacement {
  id: string;
  item_name: string;
  category: string;
  dimensions: { width: number; depth: number; height: number; unit: string };
  placement: { x: number; y: number; rotation: number; zone: string };
  estimated_cost: number;
  priority: string;
  rationale: string;
}

interface BudgetAlternative {
  id: string;
  original_item: { name: string; category: string; cost: number };
  alternative_item: { name: string; category: string; cost: number };
  savings_amount: number;
  savings_percent: number;
  quality_impact: string;
  recommendation_strength: string;
  reasoning: string;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { room_context, recommendation_type, additional_data } = await req.json();

    if (!room_context || !recommendation_type) {
      return new Response(
        JSON.stringify({ error: "Missing room_context or recommendation_type" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Build the AI prompt based on recommendation type
    const systemPrompt = buildSystemPrompt(recommendation_type);
    const userPrompt = buildUserPrompt(room_context, recommendation_type, additional_data);

    console.log(`🤖 Generating ${recommendation_type} recommendations for room ${room_context.room_id}`);

    // Call Lovable AI Gateway
    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        tools: [buildToolDefinition(recommendation_type)],
        tool_choice: { type: "function", function: { name: getToolName(recommendation_type) } },
      }),
    });

    if (!aiResponse.ok) {
      if (aiResponse.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (aiResponse.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add funds." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await aiResponse.text();
      console.error("AI Gateway error:", aiResponse.status, errorText);
      throw new Error(`AI Gateway error: ${aiResponse.status}`);
    }

    const aiResult = await aiResponse.json();
    
    // Extract tool call result
    const toolCall = aiResult.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall?.function?.arguments) {
      throw new Error("No valid response from AI");
    }

    const recommendations = JSON.parse(toolCall.function.arguments);
    console.log(`✅ Generated ${recommendation_type} recommendations successfully`);

    // Store in database
    const insertData = buildInsertData(room_context, recommendation_type, recommendations);
    
    const { data: inserted, error: insertError } = await supabase
      .from("ai_recommendations")
      .insert(insertData)
      .select()
      .single();

    if (insertError) {
      console.error("Database insert error:", insertError);
      throw insertError;
    }

    return new Response(
      JSON.stringify({
        success: true,
        recommendation_id: inserted.id,
        type: recommendation_type,
        ...recommendations,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Generate recommendations error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

function buildSystemPrompt(type: string): string {
  const basePrompt = `You are an expert interior design AI assistant for HOUSPIRE, an Indian interior design platform. You provide data-driven recommendations based on room characteristics, budget constraints, and regional preferences.

Important guidelines:
- Consider Indian market prices and preferences
- Factor in climate (hot summers in most regions)
- Consider Vastu Shastra principles when relevant
- Provide practical, actionable recommendations
- Be specific with cost estimates in INR`;

  switch (type) {
    case "style":
      return `${basePrompt}

For style recommendations:
- Suggest 5-7 suitable design styles
- Rank by confidence score (0-100)
- Consider room type, size, and budget
- Include pros and cons for each
- Provide color palettes and key elements`;

    case "furniture":
      return `${basePrompt}

For furniture placement:
- Suggest optimal furniture arrangement
- Consider traffic flow and natural light
- Provide X,Y coordinates (room as 100x100 grid)
- Include dimensions and cost estimates
- Prioritize essential items first`;

    case "budget":
      return `${basePrompt}

For budget optimization:
- Identify cost-saving alternatives
- Maintain quality where possible
- Calculate savings percentages
- Consider local availability
- Suggest reputable brands`;

    case "trend":
      return `${basePrompt}

For trend analysis:
- Identify current popular styles
- Note rising and declining trends
- Consider regional preferences
- Suggest seasonal recommendations`;

    default:
      return basePrompt;
  }
}

function buildUserPrompt(context: RoomContext, type: string, additionalData?: Record<string, unknown>): string {
  const roomInfo = `Room Details:
- Type: ${context.room_type}
- Name: ${context.room_name || "N/A"}
- Dimensions: ${context.dimensions.length_feet || "Unknown"}ft x ${context.dimensions.width_feet || "Unknown"}ft x ${context.dimensions.height_feet || "Unknown"}ft
- Budget Tier: ${context.budget_tier}
- City: ${context.city || "Not specified"}
- Current Style: ${context.selected_style || "None selected"}
- Windows: ${context.analysis_data?.window_count || "Unknown"}
- Doors: ${context.analysis_data?.door_count || "Unknown"}
- Has ceiling fan: ${context.analysis_data?.ceiling_fan_detected || false}`;

  switch (type) {
    case "style":
      return `${roomInfo}

Please recommend 5-7 suitable design styles for this room, ranked by how well they match the room characteristics and budget. For each style, provide confidence score, estimated cost range, pros, cons, and key elements.`;

    case "furniture":
      return `${roomInfo}

Please suggest an optimal furniture arrangement for this room. Provide placement coordinates (on a 100x100 grid where 0,0 is top-left corner), dimensions, cost estimates, and priority levels. Consider traffic flow, natural light from windows, and door positions.`;

    case "budget":
      const budgetItems = additionalData?.budget_items || [];
      return `${roomInfo}

Current budget items:
${JSON.stringify(budgetItems, null, 2)}

Please analyze these items and suggest cost-effective alternatives where possible. For each alternative, calculate savings and note any quality trade-offs.`;

    case "trend":
      return `${roomInfo}

Please provide trend analysis for ${context.room_type} rooms in ${context.city || "India"}. Include current popular styles, rising trends, and seasonal recommendations.`;

    default:
      return roomInfo;
  }
}

function getToolName(type: string): string {
  switch (type) {
    case "style":
      return "generate_style_recommendations";
    case "furniture":
      return "generate_furniture_placement";
    case "budget":
      return "generate_budget_alternatives";
    case "trend":
      return "generate_trend_analysis";
    default:
      return "generate_recommendations";
  }
}

function buildToolDefinition(type: string): Record<string, unknown> {
  switch (type) {
    case "style":
      return {
        type: "function",
        function: {
          name: "generate_style_recommendations",
          description: "Generate style recommendations for a room",
          parameters: {
            type: "object",
            properties: {
              styles: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: { type: "string" },
                    style_name: { type: "string" },
                    confidence_score: { type: "number", minimum: 0, maximum: 100 },
                    estimated_cost_range: {
                      type: "object",
                      properties: {
                        min: { type: "number" },
                        max: { type: "number" },
                        currency: { type: "string" },
                      },
                      required: ["min", "max", "currency"],
                    },
                    budget_fit: { type: "string", enum: ["under_budget", "within_budget", "over_budget"] },
                    pros: { type: "array", items: { type: "string" } },
                    cons: { type: "array", items: { type: "string" } },
                    color_palette: { type: "array", items: { type: "string" } },
                    key_elements: { type: "array", items: { type: "string" } },
                    reasoning: { type: "string" },
                    match_factors: { type: "array", items: { type: "string" } },
                  },
                  required: ["id", "style_name", "confidence_score", "estimated_cost_range", "budget_fit", "pros", "cons", "reasoning"],
                },
              },
              overall_confidence: { type: "number" },
              reasoning: { type: "string" },
            },
            required: ["styles", "overall_confidence", "reasoning"],
          },
        },
      };

    case "furniture":
      return {
        type: "function",
        function: {
          name: "generate_furniture_placement",
          description: "Generate furniture placement suggestions for a room",
          parameters: {
            type: "object",
            properties: {
              placements: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: { type: "string" },
                    item_name: { type: "string" },
                    category: { type: "string", enum: ["seating", "table", "storage", "lighting", "decor", "bed", "appliance", "other"] },
                    dimensions: {
                      type: "object",
                      properties: {
                        width: { type: "number" },
                        depth: { type: "number" },
                        height: { type: "number" },
                        unit: { type: "string" },
                      },
                      required: ["width", "depth", "height", "unit"],
                    },
                    placement: {
                      type: "object",
                      properties: {
                        x: { type: "number" },
                        y: { type: "number" },
                        rotation: { type: "number" },
                        zone: { type: "string" },
                      },
                      required: ["x", "y", "rotation", "zone"],
                    },
                    estimated_cost: { type: "number" },
                    priority: { type: "string", enum: ["essential", "recommended", "optional"] },
                    rationale: { type: "string" },
                  },
                  required: ["id", "item_name", "category", "dimensions", "placement", "estimated_cost", "priority", "rationale"],
                },
              },
              layout_reasoning: { type: "string" },
              total_estimated_cost: { type: "number" },
            },
            required: ["placements", "layout_reasoning", "total_estimated_cost"],
          },
        },
      };

    case "budget":
      return {
        type: "function",
        function: {
          name: "generate_budget_alternatives",
          description: "Generate budget optimization alternatives",
          parameters: {
            type: "object",
            properties: {
              alternatives: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    id: { type: "string" },
                    original_item: {
                      type: "object",
                      properties: {
                        name: { type: "string" },
                        category: { type: "string" },
                        cost: { type: "number" },
                      },
                      required: ["name", "category", "cost"],
                    },
                    alternative_item: {
                      type: "object",
                      properties: {
                        name: { type: "string" },
                        category: { type: "string" },
                        cost: { type: "number" },
                        brand_suggestion: { type: "string" },
                      },
                      required: ["name", "category", "cost"],
                    },
                    savings_amount: { type: "number" },
                    savings_percent: { type: "number" },
                    quality_impact: { type: "string", enum: ["none", "minimal", "moderate", "significant"] },
                    recommendation_strength: { type: "string", enum: ["strongly_recommend", "recommend", "consider", "caution"] },
                    reasoning: { type: "string" },
                  },
                  required: ["id", "original_item", "alternative_item", "savings_amount", "savings_percent", "quality_impact", "recommendation_strength", "reasoning"],
                },
              },
              total_potential_savings: { type: "number" },
              optimization_summary: { type: "string" },
            },
            required: ["alternatives", "total_potential_savings", "optimization_summary"],
          },
        },
      };

    case "trend":
      return {
        type: "function",
        function: {
          name: "generate_trend_analysis",
          description: "Generate trend analysis for design styles",
          parameters: {
            type: "object",
            properties: {
              city_trends: {
                type: "object",
                properties: {
                  top_styles: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        style_name: { type: "string" },
                        adoption_rate: { type: "number" },
                        trend_direction: { type: "string", enum: ["rising", "stable", "declining"] },
                        popularity_rank: { type: "number" },
                      },
                    },
                  },
                  trending_items: { type: "array", items: { type: "object" } },
                  seasonal_recommendations: { type: "array", items: { type: "string" } },
                },
              },
              global_trends: {
                type: "object",
                properties: {
                  rising_styles: { type: "array", items: { type: "string" } },
                  stable_styles: { type: "array", items: { type: "string" } },
                  declining_styles: { type: "array", items: { type: "string" } },
                },
              },
              analysis_summary: { type: "string" },
            },
            required: ["city_trends", "global_trends", "analysis_summary"],
          },
        },
      };

    default:
      return {
        type: "function",
        function: {
          name: "generate_recommendations",
          description: "Generate general recommendations",
          parameters: {
            type: "object",
            properties: {
              recommendations: { type: "array", items: { type: "object" } },
              summary: { type: "string" },
            },
            required: ["recommendations", "summary"],
          },
        },
      };
  }
}

function buildInsertData(
  context: RoomContext,
  type: string,
  recommendations: Record<string, unknown>
): Record<string, unknown> {
  const baseData = {
    room_id: context.room_id,
    recommendation_type: type,
    room_context: context,
    model_used: "google/gemini-2.5-flash",
    confidence_score: recommendations.overall_confidence || null,
    reasoning: recommendations.reasoning || recommendations.analysis_summary || recommendations.optimization_summary || recommendations.layout_reasoning || null,
    generated_at: new Date().toISOString(),
    expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  };

  switch (type) {
    case "style":
      return {
        ...baseData,
        recommended_styles: recommendations.styles || [],
        furniture_suggestions: [],
        budget_alternatives: [],
        trend_data: {},
      };

    case "furniture":
      return {
        ...baseData,
        recommended_styles: [],
        furniture_suggestions: recommendations.placements || [],
        budget_alternatives: [],
        trend_data: {},
      };

    case "budget":
      return {
        ...baseData,
        recommended_styles: [],
        furniture_suggestions: [],
        budget_alternatives: recommendations.alternatives || [],
        trend_data: {},
      };

    case "trend":
      return {
        ...baseData,
        recommended_styles: [],
        furniture_suggestions: [],
        budget_alternatives: [],
        trend_data: {
          city_trends: recommendations.city_trends,
          global_trends: recommendations.global_trends,
          analysis_summary: recommendations.analysis_summary,
        },
      };

    default:
      return {
        ...baseData,
        recommended_styles: [],
        furniture_suggestions: [],
        budget_alternatives: [],
        trend_data: recommendations,
      };
  }
}
