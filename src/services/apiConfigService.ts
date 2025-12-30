// API Configuration and Setup Check
// Verifies API keys are configured and provides helpful error messages

export interface ApiConfig {
  supabase: {
    configured: boolean;
    url?: string;
    anonKey?: string;
  };
  openRouter: {
    configured: boolean;
    key?: string;
  };
  lovable: {
    configured: boolean;
    key?: string;
  };
}

/**
 * Check API configuration status
 */
export function checkApiConfig(): ApiConfig {
  return {
    supabase: {
      configured: !!(
        import.meta.env.VITE_SUPABASE_URL &&
        import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
      ),
      url: import.meta.env.VITE_SUPABASE_URL,
      anonKey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
    },
    openRouter: {
      configured: !!import.meta.env.VITE_OPENROUTER_API_KEY,
      key: import.meta.env.VITE_OPENROUTER_API_KEY,
    },
    lovable: {
      configured: !!import.meta.env.VITE_LOVABLE_API_KEY,
      key: import.meta.env.VITE_LOVABLE_API_KEY,
    },
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
  if (!config.openRouter.configured) {
    missing.push('OpenRouter (VITE_OPENROUTER_API_KEY)');
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
 */
export function canUseAiFeatures(): boolean {
  const config = checkApiConfig();
  return config.openRouter.configured || config.lovable.configured;
}

/**
 * Get setup instructions
 */
export function getSetupInstructions(): string {
  const missing = getMissingApiKeys();

  if (missing.length === 0) {
    return '✅ All API keys configured!';
  }

  let instructions = '⚠️ Missing API Keys:\n\n';

  if (missing.includes('OpenRouter (VITE_OPENROUTER_API_KEY)')) {
    instructions += `
🔑 OpenRouter API Key Required:

1. Go to https://openrouter.ai/
2. Sign up for an account
3. Create an API key
4. Add to .env.local:
   VITE_OPENROUTER_API_KEY=sk-or-v1-your-key-here

5. Restart the dev server

Without OpenRouter:
- ❌ Cannot generate renders
- ❌ Cannot analyze rooms
- ❌ Cannot clean images
- ✅ Can still browse and manage projects

Cost: ~$0.10-0.50 per render (pay-as-you-go)
`;
  }

  return instructions;
}

/**
 * Display setup warning in console
 */
export function displaySetupWarning() {
  const config = checkApiConfig();

  if (!config.openRouter.configured && !config.lovable.configured) {
    console.warn(`
╔═══════════════════════════════════════════════════════════╗
║                  ⚠️  API KEYS MISSING  ⚠️                  ║
╚═══════════════════════════════════════════════════════════╝

AI features will NOT work without API keys.

Required: OpenRouter API Key
Get it at: https://openrouter.ai/

Add to .env.local:
VITE_OPENROUTER_API_KEY=sk-or-v1-your-key-here

Then restart: npm run dev

See docs/API_SETUP_GUIDE.md for details.

═══════════════════════════════════════════════════════════
    `);
  } else {
    console.log('✅ API keys configured successfully');
  }
}

/**
 * Get user-friendly error message for API failures
 */
export function getApiErrorMessage(error: any): string {
  const errorMessage = error?.message || String(error);

  // Check for common API key issues
  if (errorMessage.includes('401') || errorMessage.includes('unauthorized')) {
    return 'API key is invalid or expired. Please check your configuration.';
  }

  if (errorMessage.includes('402') || errorMessage.includes('payment')) {
    return 'Insufficient credits. Please add credits to your OpenRouter account.';
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
