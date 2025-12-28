import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface TrackOutcomeRequest {
  projectId: string;
  roomId: string;
  libraryImageId: string;
  approved: boolean;
  qualityScore?: number;
  refinementsCount?: number;
}

interface TierResult {
  previousTier: string;
  newTier: string;
  promoted: boolean;
  archived: boolean;
  message: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get user from auth header
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'No authorization header' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return new Response(
        JSON.stringify({ error: 'Invalid token' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const body: TrackOutcomeRequest = await req.json();
    const { projectId, roomId, libraryImageId, approved, qualityScore, refinementsCount } = body;

    console.log(`[track-render-outcome] Processing: project=${projectId}, room=${roomId}, library=${libraryImageId}, approved=${approved}`);

    // Step 1: Find or create library_usage record
    let usageId: string | null = null;
    
    // Check if there's an existing usage record for this room/library combination
    const { data: existingUsage } = await supabase
      .from('library_usage')
      .select('id')
      .eq('room_id', roomId)
      .eq('library_image_id', libraryImageId)
      .is('outcome_recorded_at', null)
      .maybeSingle();

    if (existingUsage) {
      usageId = existingUsage.id;
      console.log(`[track-render-outcome] Found existing usage record: ${usageId}`);
    } else {
      // Create a new usage record
      const { data: newUsage, error: createError } = await supabase
        .from('library_usage')
        .insert({
          library_image_id: libraryImageId,
          project_id: projectId,
          room_id: roomId,
          user_id: user.id,
          selected_at: new Date().toISOString()
        })
        .select('id')
        .single();

      if (createError) {
        console.error('[track-render-outcome] Error creating usage record:', createError);
        return new Response(
          JSON.stringify({ error: 'Failed to create usage record', details: createError.message }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      usageId = newUsage.id;
      console.log(`[track-render-outcome] Created new usage record: ${usageId}`);
    }

    // Step 2: Record the outcome using the database function
    const { error: outcomeError } = await supabase.rpc('record_library_usage_outcome', {
      p_usage_id: usageId,
      p_approved: approved,
      p_quality_score: qualityScore || null
    });

    if (outcomeError) {
      console.error('[track-render-outcome] Error recording outcome:', outcomeError);
      return new Response(
        JSON.stringify({ error: 'Failed to record outcome', details: outcomeError.message }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`[track-render-outcome] Outcome recorded for usage: ${usageId}`);

    // Step 3: Get the library image's current state
    const { data: libraryImage, error: fetchError } = await supabase
      .from('style_library')
      .select('id, tier, approval_rate, times_selected, times_led_to_approval, times_led_to_rejection, source_type, original_uploader_id')
      .eq('id', libraryImageId)
      .single();

    if (fetchError || !libraryImage) {
      console.error('[track-render-outcome] Error fetching library image:', fetchError);
      return new Response(
        JSON.stringify({ 
          success: true, 
          usageId,
          message: 'Outcome recorded but could not check tier status'
        }),
        { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Step 4: Check and apply tier promotion using database function
    const { data: newTier, error: tierError } = await supabase.rpc('auto_promote_tier', {
      lib_id: libraryImageId
    });

    const previousTier = libraryImage.tier;
    const tierResult: TierResult = {
      previousTier: previousTier || 'unverified',
      newTier: newTier || previousTier || 'unverified',
      promoted: newTier !== null && newTier !== previousTier && 
                ['featured', 'standard'].includes(newTier) && 
                ['unverified', 'learning', 'standard'].includes(previousTier || 'unverified'),
      archived: false,
      message: ''
    };

    // Step 5: Check for auto-archive (poor performers)
    if (libraryImage.times_selected >= 10 && 
        libraryImage.approval_rate !== null && 
        libraryImage.approval_rate < 0.5) {
      
      const { error: archiveError } = await supabase
        .from('style_library')
        .update({ 
          status: 'archived',
          curator_notes: `Auto-archived: ${Math.round(libraryImage.approval_rate * 100)}% approval after ${libraryImage.times_selected} uses`
        })
        .eq('id', libraryImageId);

      if (!archiveError) {
        tierResult.archived = true;
        tierResult.message = `Image archived due to low approval rate (${Math.round(libraryImage.approval_rate * 100)}%)`;
        console.log(`[track-render-outcome] Auto-archived image: ${libraryImageId}`);
      }
    }

    // Step 6: Create notification for tier promotion
    if (tierResult.promoted && libraryImage.original_uploader_id) {
      const tierLabel = tierResult.newTier === 'featured' ? '⭐ Featured' : '✓ Standard';
      
      await supabase.rpc('create_targeted_notification', {
        p_target_user_id: libraryImage.original_uploader_id,
        p_title: `Your reference was promoted to ${tierLabel}!`,
        p_message: `Great news! Your uploaded reference image has been promoted to the ${tierResult.newTier} tier based on its excellent performance.`,
        p_type: 'success',
        p_link: null
      });

      tierResult.message = `Promoted from ${tierResult.previousTier} to ${tierResult.newTier}`;
      console.log(`[track-render-outcome] Tier promotion notification sent to: ${libraryImage.original_uploader_id}`);
    }

    console.log(`[track-render-outcome] Complete. Tier result:`, tierResult);

    return new Response(
      JSON.stringify({
        success: true,
        usageId,
        tierResult,
        libraryStats: {
          approval_rate: libraryImage.approval_rate,
          times_selected: libraryImage.times_selected,
          times_led_to_approval: libraryImage.times_led_to_approval,
          times_led_to_rejection: libraryImage.times_led_to_rejection
        }
      }),
      { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('[track-render-outcome] Unexpected error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: 'Internal server error', details: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
