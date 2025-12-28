import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const lovableApiKey = Deno.env.get('LOVABLE_API_KEY')!;

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { action, imageId, batchSize = 5 } = await req.json();

    console.log(`[analyze-library-metadata] Action: ${action}, ImageId: ${imageId || 'batch'}`);

    // Get images to analyze
    let imagesToAnalyze: any[] = [];

    if (action === 'analyze_single' && imageId) {
      const { data, error } = await supabase
        .from('style_library')
        .select('id, image_url, room_type, design_style, color_palette, furniture_list, layout_pattern')
        .eq('id', imageId)
        .single();

      if (error) throw error;
      imagesToAnalyze = [data];
    } else if (action === 'analyze_batch') {
      // Get images with missing metadata
      const { data, error } = await supabase
        .from('style_library')
        .select('id, image_url, room_type, design_style, color_palette, furniture_list, layout_pattern')
        .eq('status', 'active')
        .or('color_palette.is.null,furniture_list.is.null,layout_pattern.is.null')
        .limit(batchSize);

      if (error) throw error;
      imagesToAnalyze = data || [];
    } else if (action === 'get_pending') {
      // Just return count of pending images
      const { count, error } = await supabase
        .from('style_library')
        .select('id', { count: 'exact', head: true })
        .eq('status', 'active')
        .or('color_palette.is.null,furniture_list.is.null,layout_pattern.is.null');

      if (error) throw error;

      return new Response(JSON.stringify({
        success: true,
        pendingCount: count || 0
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    } else {
      throw new Error(`Unknown action: ${action}`);
    }

    if (imagesToAnalyze.length === 0) {
      return new Response(JSON.stringify({
        success: true,
        message: 'No images to analyze',
        analyzed: 0
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const results: any[] = [];

    for (const image of imagesToAnalyze) {
      try {
        console.log(`[analyze-library-metadata] Analyzing image: ${image.id}`);

        // Call Lovable AI with vision capability
        const aiResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${lovableApiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'google/gemini-2.5-flash',
            messages: [
              {
                role: 'user',
                content: [
                  {
                    type: 'text',
                    text: `Analyze this interior design image and extract the following metadata. The room is a ${image.room_type} with ${image.design_style} style.

Return a JSON object with these fields:
1. "color_palette": Array of 4-6 dominant colors as hex codes (e.g., ["#F5F5DC", "#8B4513", "#2F4F4F"])
2. "furniture_list": Array of furniture items visible (e.g., ["sofa", "coffee table", "floor lamp", "bookshelf"])
3. "layout_pattern": Object describing the layout with fields:
   - "arrangement": "symmetrical" | "asymmetrical" | "linear" | "circular"
   - "focal_point": what draws the eye (e.g., "fireplace", "window", "accent wall")
   - "traffic_flow": "open" | "defined" | "compact"
4. "lighting_description": Brief description of lighting (e.g., "warm natural light from large windows with accent lamps")

Return ONLY valid JSON, no markdown or explanation.`
                  },
                  {
                    type: 'image_url',
                    image_url: {
                      url: image.image_url
                    }
                  }
                ]
              }
            ],
            max_tokens: 1000,
            temperature: 0.3
          })
        });

        if (!aiResponse.ok) {
          const errorText = await aiResponse.text();
          console.error(`[analyze-library-metadata] AI API error: ${errorText}`);
          results.push({ id: image.id, success: false, error: 'AI API error' });
          continue;
        }

        const aiData = await aiResponse.json();
        const content = aiData.choices?.[0]?.message?.content;

        if (!content) {
          console.error(`[analyze-library-metadata] No content in AI response for ${image.id}`);
          results.push({ id: image.id, success: false, error: 'No AI response' });
          continue;
        }

        // Parse the JSON response
        let metadata;
        try {
          // Clean up potential markdown formatting
          const cleanContent = content.replace(/```json\n?|\n?```/g, '').trim();
          metadata = JSON.parse(cleanContent);
        } catch (parseError) {
          console.error(`[analyze-library-metadata] Failed to parse AI response: ${content}`);
          results.push({ id: image.id, success: false, error: 'Invalid JSON response' });
          continue;
        }

        // Update the style_library record
        const updateData: any = {};
        if (metadata.color_palette) updateData.color_palette = metadata.color_palette;
        if (metadata.furniture_list) updateData.furniture_list = metadata.furniture_list;
        if (metadata.layout_pattern) updateData.layout_pattern = metadata.layout_pattern;
        updateData.updated_at = new Date().toISOString();

        // Store lighting_description in analysis_data
        if (metadata.lighting_description) {
          updateData.analysis_data = {
            ...(image.analysis_data || {}),
            lighting_description: metadata.lighting_description,
            analyzed_at: new Date().toISOString()
          };
        }

        const { error: updateError } = await supabase
          .from('style_library')
          .update(updateData)
          .eq('id', image.id);

        if (updateError) {
          console.error(`[analyze-library-metadata] Update error for ${image.id}:`, updateError);
          results.push({ id: image.id, success: false, error: updateError.message });
          continue;
        }

        console.log(`[analyze-library-metadata] Successfully analyzed ${image.id}`);
        results.push({
          id: image.id,
          success: true,
          metadata: {
            color_palette: metadata.color_palette,
            furniture_count: metadata.furniture_list?.length || 0,
            layout: metadata.layout_pattern?.arrangement
          }
        });

      } catch (imageError) {
        console.error(`[analyze-library-metadata] Error processing ${image.id}:`, imageError);
        results.push({ id: image.id, success: false, error: String(imageError) });
      }
    }

    const successCount = results.filter(r => r.success).length;
    console.log(`[analyze-library-metadata] Completed: ${successCount}/${results.length} successful`);

    return new Response(JSON.stringify({
      success: true,
      analyzed: results.length,
      successful: successCount,
      failed: results.length - successCount,
      results
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('[analyze-library-metadata] Error:', error);
    return new Response(JSON.stringify({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});
