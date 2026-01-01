// Supabase Edge Function: test-gemini
// Simple function to verify GOOGLE_AI_API_KEY is accessible and Gemini can be called

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  const GOOGLE_AI_API_KEY = Deno.env.get('GOOGLE_AI_API_KEY')
  
  console.log('=== test-gemini invoked ===')
  console.log('🔑 API Key exists:', !!GOOGLE_AI_API_KEY)
  console.log('🔑 API Key length:', GOOGLE_AI_API_KEY?.length || 0)
  
  if (!GOOGLE_AI_API_KEY) {
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: 'GOOGLE_AI_API_KEY not configured in environment',
        api_key_exists: false,
        api_key_length: 0
      }), 
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )
  }
  
  try {
    console.log('🤖 Calling Gemini API with test prompt...')
    
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GOOGLE_AI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: "Say 'Hello from Houspire!' and nothing else." }] }]
        })
      }
    )
    
    console.log('📥 Gemini response status:', response.status)
    
    const data = await response.json()
    const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text
    
    console.log('✅ Gemini response text:', responseText)
    
    if (!response.ok) {
      console.error('❌ Gemini API error:', JSON.stringify(data))
      return new Response(
        JSON.stringify({ 
          success: false,
          status: response.status,
          api_key_exists: true,
          api_key_length: GOOGLE_AI_API_KEY.length,
          error: data.error?.message || 'Unknown API error',
          full_response: data
        }), 
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
      )
    }
    
    return new Response(
      JSON.stringify({ 
        success: true,
        status: response.status,
        api_key_exists: true,
        api_key_length: GOOGLE_AI_API_KEY.length,
        response_text: responseText || 'No response text',
        message: 'Gemini API is working correctly!'
      }), 
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 200 }
    )
    
  } catch (error) {
    console.error('❌ Test failed:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error instanceof Error ? error.message : String(error),
        api_key_exists: true,
        api_key_length: GOOGLE_AI_API_KEY.length
      }), 
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
