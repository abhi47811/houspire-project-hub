// API Configuration Verification Script
// Tests if OpenRouter API key is working in Supabase Edge Functions

import { supabase } from '@/integrations/supabase/client';

export interface ApiTestResult {
  service: string;
  status: 'success' | 'error' | 'not_configured';
  message: string;
  details?: any;
}

/**
 * Test OpenRouter API key in Edge Functions
 */
export async function testOpenRouterConnection(): Promise<ApiTestResult> {
  try {
    console.log('🔍 Testing OpenRouter API connection...');

    // Call health-check function which should verify API keys
    const { data, error } = await supabase.functions.invoke('health-check', {
      body: { checkApiKeys: true },
    });

    if (error) {
      return {
        service: 'OpenRouter',
        status: 'error',
        message: `Connection failed: ${error.message}`,
        details: error,
      };
    }

    if (data?.openRouterConfigured) {
      return {
        service: 'OpenRouter',
        status: 'success',
        message: 'API key is configured and working!',
        details: data,
      };
    }

    return {
      service: 'OpenRouter',
      status: 'not_configured',
      message: 'API key not found in Edge Function secrets',
    };
  } catch (error: any) {
    return {
      service: 'OpenRouter',
      status: 'error',
      message: error.message || 'Unknown error',
      details: error,
    };
  }
}

/**
 * Test Supabase connection
 */
export async function testSupabaseConnection(): Promise<ApiTestResult> {
  try {
    console.log('🔍 Testing Supabase connection...');

    // Try to fetch user profile (requires authentication)
    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      return {
        service: 'Supabase',
        status: 'success',
        message: 'Connected and authenticated',
        details: { userId: user.id },
      };
    }

    // Not authenticated, but connection works
    return {
      service: 'Supabase',
      status: 'success',
      message: 'Connected (not authenticated)',
    };
  } catch (error: any) {
    return {
      service: 'Supabase',
      status: 'error',
      message: error.message || 'Connection failed',
      details: error,
    };
  }
}

/**
 * Test AI room analysis (requires OpenRouter)
 */
export async function testAiAnalysis(imageUrl?: string): Promise<ApiTestResult> {
  try {
    console.log('🔍 Testing AI analysis...');

    const testImage = imageUrl || 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0';

    const { data, error } = await supabase.functions.invoke('vision-ai', {
      body: {
        imageUrl: testImage,
        action: 'analyze_room',
      },
    });

    if (error) {
      // Check for specific error types
      if (error.message?.includes('API key')) {
        return {
          service: 'AI Analysis',
          status: 'not_configured',
          message: 'OpenRouter API key not configured',
          details: error,
        };
      }

      if (error.message?.includes('credits') || error.message?.includes('402')) {
        return {
          service: 'AI Analysis',
          status: 'error',
          message: 'Insufficient credits in OpenRouter account',
          details: error,
        };
      }

      return {
        service: 'AI Analysis',
        status: 'error',
        message: `Analysis failed: ${error.message}`,
        details: error,
      };
    }

    return {
      service: 'AI Analysis',
      status: 'success',
      message: 'AI analysis working correctly!',
      details: data,
    };
  } catch (error: any) {
    return {
      service: 'AI Analysis',
      status: 'error',
      message: error.message || 'Unknown error',
      details: error,
    };
  }
}

/**
 * Test render generation (requires OpenRouter)
 */
export async function testRenderGeneration(): Promise<ApiTestResult> {
  try {
    console.log('🔍 Testing render generation...');

    // This is a lightweight test - doesn't actually generate
    const { data, error } = await supabase.functions.invoke('generate-ai', {
      body: {
        test: true, // Test mode
        roomType: 'living_room',
        style: 'contemporary',
      },
    });

    if (error) {
      if (error.message?.includes('API key')) {
        return {
          service: 'Render Generation',
          status: 'not_configured',
          message: 'OpenRouter API key not configured',
          details: error,
        };
      }

      return {
        service: 'Render Generation',
        status: 'error',
        message: `Generation failed: ${error.message}`,
        details: error,
      };
    }

    return {
      service: 'Render Generation',
      status: 'success',
      message: 'Render generation endpoint working!',
      details: data,
    };
  } catch (error: any) {
    return {
      service: 'Render Generation',
      status: 'error',
      message: error.message || 'Unknown error',
      details: error,
    };
  }
}

/**
 * Run all API tests
 */
export async function runAllApiTests(): Promise<ApiTestResult[]> {
  console.log('🚀 Running comprehensive API tests...');

  const results: ApiTestResult[] = [];

  // Test Supabase (should always work)
  results.push(await testSupabaseConnection());

  // Test OpenRouter
  results.push(await testOpenRouterConnection());

  // Test AI features (only if OpenRouter is configured)
  const openRouterResult = results.find((r) => r.service === 'OpenRouter');
  if (openRouterResult?.status === 'success') {
    results.push(await testAiAnalysis());
    results.push(await testRenderGeneration());
  } else {
    results.push({
      service: 'AI Analysis',
      status: 'not_configured',
      message: 'Skipped (OpenRouter not configured)',
    });
    results.push({
      service: 'Render Generation',
      status: 'not_configured',
      message: 'Skipped (OpenRouter not configured)',
    });
  }

  return results;
}

/**
 * Format test results for display
 */
export function formatTestResults(results: ApiTestResult[]): string {
  let output = '\n╔══════════════════════════════════════════════════════════╗\n';
  output += '║              API CONFIGURATION TEST RESULTS              ║\n';
  output += '╚══════════════════════════════════════════════════════════╝\n\n';

  results.forEach((result) => {
    const icon =
      result.status === 'success'
        ? '✅'
        : result.status === 'error'
        ? '❌'
        : '⚠️';

    output += `${icon} ${result.service}\n`;
    output += `   Status: ${result.status.toUpperCase()}\n`;
    output += `   Message: ${result.message}\n`;
    if (result.details) {
      output += `   Details: ${JSON.stringify(result.details, null, 2)}\n`;
    }
    output += '\n';
  });

  return output;
}

/**
 * Get setup recommendations based on test results
 */
export function getSetupRecommendations(results: ApiTestResult[]): string[] {
  const recommendations: string[] = [];

  const supabaseTest = results.find((r) => r.service === 'Supabase');
  const openRouterTest = results.find((r) => r.service === 'OpenRouter');
  const aiAnalysisTest = results.find((r) => r.service === 'AI Analysis');

  if (supabaseTest?.status === 'error') {
    recommendations.push('❌ Fix Supabase connection - check environment variables');
  }

  if (openRouterTest?.status === 'not_configured') {
    recommendations.push(
      '⚠️ Add OpenRouter API key to Supabase Edge Functions secrets'
    );
    recommendations.push('   → Lovable Dashboard → Project Settings → Secrets');
  }

  if (openRouterTest?.status === 'error') {
    if (openRouterTest.message?.includes('credits')) {
      recommendations.push('💳 Add credits to your OpenRouter account');
    } else {
      recommendations.push('❌ Check OpenRouter API key is valid');
    }
  }

  if (aiAnalysisTest?.status === 'error' && !openRouterTest) {
    recommendations.push('⚠️ AI Analysis not working - check Edge Function logs');
  }

  if (recommendations.length === 0) {
    recommendations.push('✅ All systems operational! You're ready to go!');
  }

  return recommendations;
}
