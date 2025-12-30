# 🚀 Manual Edge Function Deployment Guide

## ⚠️ **CRITICAL: Your Edge Functions Need Redeployment**

The code fixes are in GitHub, but Supabase is still running the old versions. You need to manually redeploy them.

---

## 📋 **Option 1: Supabase Dashboard (Easiest)**

### Step 1: Go to Edge Functions
```
1. Open: https://supabase.com/dashboard/project/nvnxptkgksuhfcpmungq
2. Click: "Edge Functions" in left sidebar
3. You should see: vision-ai, image-processing, generate-ai, etc.
```

### Step 2: Redeploy Each Function

#### For `vision-ai`:
```
1. Click on "vision-ai" function
2. Click "Deploy new version" or "Edit"
3. Replace code with the updated version from GitHub
4. Or simply click "Sync with GitHub" if available
```

#### For `image-processing`:
```
1. Click on "image-processing" function
2. Click "Deploy new version"  
3. Replace code with updated version
```

---

## 📋 **Option 2: Using Supabase CLI (From Your Local Machine)**

If you have a local machine with the code:

### Step 1: Install Supabase CLI
```bash
# On Mac
brew install supabase/tap/supabase

# On Linux
curl -sL https://github.com/supabase/cli/releases/latest/download/supabase_linux_amd64.tar.gz | tar xz
sudo mv supabase /usr/local/bin/

# On Windows
scoop install supabase
```

### Step 2: Login to Supabase
```bash
supabase login
# Follow the prompts to authenticate
```

### Step 3: Link to Your Project
```bash
cd /path/to/houspire-project-hub
supabase link --project-ref nvnxptkgksuhfcpmungq
```

### Step 4: Deploy Functions
```bash
# Deploy all functions
supabase functions deploy

# Or deploy specific functions
supabase functions deploy vision-ai
supabase functions deploy image-processing
supabase functions deploy generate-ai
```

---

## 📋 **Option 3: Quick Fix via Supabase Dashboard**

### Copy-Paste Method:

#### 1. Deploy vision-ai with updated code:

**Go to:** https://supabase.com/dashboard/project/nvnxptkgksuhfcpmungq/functions

**Click:** vision-ai → Edit

**Replace entire code with:**
```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
const OPENROUTER_API_KEY = Deno.env.get("OPENROUTER_API_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

// ... (rest of the code from GitHub)
```

**Get full code from:**
https://github.com/abhi47811/houspire-project-hub/blob/main/supabase/functions/vision-ai/index.ts

#### 2. Deploy image-processing with updated code:

**Click:** image-processing → Edit

**Get code from:**
https://github.com/abhi47811/houspire-project-hub/blob/main/supabase/functions/image-processing/index.ts

---

## 📋 **Option 4: GitHub Integration (Best for Production)**

### Enable Automatic Deployment:

1. **Go to:** Supabase Dashboard → Edge Functions → Settings
2. **Enable:** "Deploy from GitHub"
3. **Connect:** Your GitHub repository (abhi47811/houspire-project-hub)
4. **Select Branch:** main
5. **Functions Path:** supabase/functions
6. **Save**

**Now:** Every push to main automatically deploys functions! 🎉

---

## ✅ **After Deployment - Verify**

### Test 1: Check Function Version
```bash
# Go to: Supabase Dashboard → Edge Functions → vision-ai
# Look for: Last deployed timestamp (should be recent)
```

### Test 2: Test with curl
```bash
curl -X POST \
  https://nvnxptkgksuhfcpmungq.supabase.co/functions/v1/vision-ai \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{"action": "quickAnalysis", "imageUrl": "https://example.com/room.jpg"}'

# Should return: Demo mode message if no API keys
# Or: Analysis results if API keys configured
```

### Test 3: Test in App
1. Reload app (Ctrl+Shift+R)
2. Upload room image
3. Click "Analyze Room"
4. **Should see:** Better error message or demo mode response

---

## 🔑 **After Deploying, Add API Keys**

Don't forget to configure the API keys in Supabase:

### Required Keys:
```
OPENROUTER_API_KEY=sk-or-v1-your-key-here
SUPABASE_URL=https://nvnxptkgksuhfcpmungq.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

### Optional Keys:
```
REPLICATE_API_KEY=r8_your-key-here
FAL_KEY=your-fal-key-here
```

**Location:** Supabase Dashboard → Edge Functions → Settings → Secrets

---

## 🎯 **Complete Deployment Checklist**

- [ ] Functions deployed with updated code
- [ ] OPENROUTER_API_KEY added to secrets
- [ ] SUPABASE_URL configured
- [ ] SUPABASE_SERVICE_ROLE_KEY configured
- [ ] App reloaded (hard refresh)
- [ ] Room analysis tested
- [ ] No error messages
- [ ] Ready to use! ✅

---

## 📊 **Deployment Status Check**

### Current Status:
```
✅ Code: Updated in GitHub (commit 8fe0bec)
⏳ Supabase: Needs redeployment
⏳ API Keys: Need to be configured
```

### After Following This Guide:
```
✅ Code: Updated in GitHub
✅ Supabase: Functions redeployed
✅ API Keys: Configured
✅ App: Working perfectly!
```

---

## 🆘 **Troubleshooting Deployment**

### Error: "Function not found"
- **Solution:** Make sure function name matches exactly (vision-ai, not vision_ai)

### Error: "Permission denied"
- **Solution:** Check you're logged in to correct Supabase project

### Error: "Invalid function code"
- **Solution:** Check for syntax errors, missing imports

### Functions not updating:
- **Solution:** Force redeploy or wait 1-2 minutes for propagation

---

## 📞 **Need Help?**

If deployment fails:

1. Check Supabase function logs for errors
2. Verify GitHub code is correct
3. Try manual code copy-paste method
4. Contact Supabase support if needed

---

## 🎉 **Success Indicators**

After successful deployment:

✅ No "Edge Function returned a non-2xx status code" error  
✅ Better error messages with instructions  
✅ Demo mode works without API keys  
✅ Room analysis works with API keys  
✅ App runs smoothly  

---

**Follow Option 1 (Dashboard) or Option 4 (GitHub Integration) for the easiest deployment!**

**Document Version:** 1.0.0  
**Last Updated:** December 30, 2024  
**Status:** Ready to Deploy
