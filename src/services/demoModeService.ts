# 🔑 API KEYS SETUP GUIDE - HOUSPIRE

**Critical:** These API keys are required for the app to function properly.

---

## 📋 Required API Keys

### 1. **Supabase** (✅ Already Configured)
- **Status:** ✅ Working
- **Keys Found:**
  - VITE_SUPABASE_URL
  - VITE_SUPABASE_PUBLISHABLE_KEY
  - VITE_SUPABASE_PROJECT_ID

### 2. **AI Generation Services** (❌ Missing - Required)

#### **Option A: OpenRouter (Recommended)**
- **Purpose:** AI image generation, vision analysis
- **Cost:** Pay-as-you-go, ~$0.10-0.50 per image
- **Sign up:** https://openrouter.ai/
- **Get API Key:** Dashboard → API Keys → Create New Key
- **Required for:**
  - Room render generation
  - AI room analysis (door/window detection)
  - Image cleaning

#### **Option B: Lovable AI**
- **Purpose:** Alternative AI provider
- **Cost:** Varies by plan
- **Sign up:** https://lovable.dev/
- **Get API Key:** Account settings → API
- **Required for:**
  - High-quality render generation
  - Style transfer

---

## ⚙️ Configuration Steps

### Step 1: Get OpenRouter API Key

1. Go to https://openrouter.ai/
2. Sign up for an account
3. Navigate to: **Keys** section
4. Click **Create New Key**
5. Copy the key (starts with `sk-or-...`)

### Step 2: Add Credits (Minimum $5 recommended)

1. Go to: **Billing** section
2. Add $5-10 to start
3. This covers ~20-50 renders

### Step 3: Configure Environment Variables

#### **For Local Development:**

Create/update `.env.local`:
```bash
# Supabase (Already configured)
VITE_SUPABASE_PROJECT_ID="nvnxptkgksuhfcpmungq"
VITE_SUPABASE_PUBLISHABLE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
VITE_SUPABASE_URL="https://nvnxptkgksuhfcpmungq.supabase.co"

# OpenRouter (Add this)
OPENROUTER_API_KEY="sk-or-v1-your-api-key-here"

# Lovable (Optional)
LOVABLE_API_KEY="your-lovable-api-key-here"
```

#### **For Supabase Edge Functions:**

1. Go to Supabase Dashboard: https://supabase.com/dashboard
2. Select your project: `nvnxptkgksuhfcpmungq`
3. Navigate to: **Edge Functions** → **Settings**
4. Add these secrets:

```bash
OPENROUTER_API_KEY = sk-or-v1-your-api-key-here
LOVABLE_API_KEY = your-lovable-api-key-here (optional)
SUPABASE_URL = https://nvnxptkgksuhfcpmungq.supabase.co
SUPABASE_SERVICE_ROLE_KEY = your-service-role-key-from-settings
```

To get Service Role Key:
- Supabase Dashboard → Settings → API
- Copy the **service_role** key (keep it secret!)

---

## 🔧 Alternative: Use Mock/Demo Mode

If you want to test without API keys, we can create a demo mode:

<function_calls>
<invoke name="Write">
<parameter name="content">// Demo Mode - Mock AI Services
// Use this for testing without API keys

export const DEMO_MODE = true; // Set to false when you have API keys

export async function mockGenerateRender(roomData: any) {
  console.log('🎭 DEMO MODE: Using mock render generation');
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Return mock render URL (using a placeholder image)
  return {
    success: true,
    renderUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=800',
    message: 'Mock render generated (Demo Mode)',
    preservationData: {
      doors: roomData.doors || 1,
      windows: roomData.windows || 1,
      doorsPreserved: true,
      windowsPreserved: true,
    },
  };
}

export async function mockAnalyzeRoom(imageUrl: string) {
  console.log('🎭 DEMO MODE: Using mock room analysis');
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return {
    success: true,
    analysis: {
      doors: 1,
      windows: 2,
      doorPositions: [{ wall: 'left', position: 'center', width: 'standard' }],
      windowPositions: [
        { wall: 'front', position: 'left', size: 'large' },
        { wall: 'front', position: 'right', size: 'large' },
      ],
      dimensions: {
        estimatedLength: 12,
        estimatedWidth: 10,
        estimatedHeight: 9,
        unit: 'feet',
        confidence: 0.75,
      },
      lighting: {
        naturalLight: 'high',
        artificialLight: 'medium',
        lightSources: 3,
      },
      suggestions: [
        'Good natural light from 2 windows',
        'Single door provides good access',
        'Room dimensions suitable for living space',
      ],
    },
  };
}

export async function mockCleanImage(imageUrl: string) {
  console.log('🎭 DEMO MODE: Using mock image cleaning');
  
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Return same image or a cleaned version placeholder
  return {
    success: true,
    cleanedUrl: imageUrl,
    message: 'Mock cleaning complete (Demo Mode)',
  };
}
