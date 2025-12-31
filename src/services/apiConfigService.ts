// API Configuration and Setup Check
// For Lovable Cloud projects, LOVABLE_API_KEY is automatically available as a backend secret

export interface ApiConfig {
  supabase: {
    configured: boolean;
    url?: string;
    anonKey?: string;
  };
  openRouter: {
    configured: boolean;
  };
  lovable: {
    configured: boolean;
  };
  isCloudProject: boolean;
}

/**
 * Check if this is a Lovable Cloud project
 * Cloud projects have VITE_SUPABASE_URL automatically configured
 */
function isLovableCloudProject(): boolean {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  // If we have a Supabase URL, this is a Cloud project with backend access
  return !!supabaseUrl;
}

/**
 * Check API configuration status
 * For Cloud projects, AI is always available via LOVABLE_API_KEY (backend secret)
 */
export function checkApiConfig(): ApiConfig {
  const isCloud = isLovableCloudProject();
  
  return {
    supabase: {
      configured: !!(
        import.meta.env.VITE_SUPABASE_URL &&
        import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
      ),
      url: import.meta.env.VITE_SUPABASE_URL,
      anonKey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
    },
    // OpenRouter is configured if explicitly set, or always available via Cloud
    openRouter: {
      configured: isCloud, // Cloud projects can use edge functions with OPENROUTER_API_KEY
    },
    // Lovable AI is always available in Cloud projects
    lovable: {
      configured: isCloud, // LOVABLE_API_KEY is auto-provisioned for Cloud projects
    },
    isCloudProject: isCloud,
  };
}

/**
 * Get missing API keys
 */
export function getMissingApiKeys(): string[] {
  const config = checkApiConfig();
  const missing: string[] = [];

  if (!config.supabase.configured) {
    missing.push('Supabase (VITE_SUPABASE_URL, VITE_SUPABASE_PUBLISHABLE_KEY)');
  }
  
  // For Cloud projects, no API keys are missing since they're auto-provisioned
  if (!config.isCloudProject && !config.openRouter.configured && !config.lovable.configured) {
    missing.push('OpenRouter or Lovable AI key required for AI features');
  }

  return missing;
}

/**
 * Check if app can function (at least Supabase configured)
 */
export function canAppFunction(): boolean {
  const config = checkApiConfig();
  return config.supabase.configured;
}

/**
 * Check if AI features are available
 * For Cloud projects, AI is always available via edge functions
 */
export function canUseAiFeatures(): boolean {
  const config = checkApiConfig();
  return config.isCloudProject || config.openRouter.configured || config.lovable.configured;
}

/**
 * Get setup instructions
 */
export function getSetupInstructions(): string {
  const config = checkApiConfig();
  
  if (config.isCloudProject) {
    return '✅ Lovable Cloud project - AI features are automatically available!';
  }

  const missing = getMissingApiKeys();

  if (missing.length === 0) {
    return '✅ All API keys configured!';
  }

  let instructions = '⚠️ Missing API Keys:\n\n';

  instructions += `
🔑 To enable AI features, connect to Lovable Cloud or add API keys:

Option 1: Use Lovable Cloud (Recommended)
- AI features are automatically available
- No API key configuration needed

Option 2: Add OpenRouter API Key
1. Go to https://openrouter.ai/
2. Sign up for an account
3. Create an API key
4. Add as Supabase Edge Function secret:
   OPENROUTER_API_KEY=sk-or-v1-your-key-here

Cost: ~$0.10-0.50 per render (pay-as-you-go)
`;

  return instructions;
}

/**
 * Display setup warning in console
 */
export function displaySetupWarning() {
  const config = checkApiConfig();

  if (config.isCloudProject) {
    console.log('✅ Lovable Cloud project - AI features available via edge functions');
    return;
  }

  if (!config.openRouter.configured && !config.lovable.configured) {
    console.warn(`
╔═══════════════════════════════════════════════════════════╗
║                  ⚠️  API KEYS MISSING  ⚠️                  ║
╚═══════════════════════════════════════════════════════════╝

AI features will NOT work without API keys.

Connect to Lovable Cloud for automatic AI access, or:

Required: OpenRouter API Key
Get it at: https://openrouter.ai/

Add as Supabase Edge Function secret:
OPENROUTER_API_KEY=sk-or-v1-your-key-here

═══════════════════════════════════════════════════════════
    `);
  } else {
    console.log('✅ API keys configured successfully');
  }
}

/**
 * Get user-friendly error message for API failures
 */
export function getApiErrorMessage(error: unknown): string {
  const errorMessage = error instanceof Error ? error.message : String(error);

  // Check for common API key issues
  if (errorMessage.includes('401') || errorMessage.includes('unauthorized')) {
    return 'API key is invalid or expired. Please check your configuration.';
  }

  if (errorMessage.includes('402') || errorMessage.includes('payment')) {
    return 'Insufficient credits. Please add credits to your account.';
  }

  if (errorMessage.includes('429') || errorMessage.includes('rate limit')) {
    return 'Rate limit exceeded. Please wait a moment and try again.';
  }

  if (errorMessage.includes('API key')) {
    return 'API key is not configured. Please add your API key to continue.';
  }

  if (errorMessage.includes('CORS')) {
    return 'Network configuration issue. Please check your Edge Function settings.';
  }

  return errorMessage;
}
