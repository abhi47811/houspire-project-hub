# 🔧 API Error Troubleshooting Guide

**Houspire Project Hub - Fixing "Analysis failed" and "Edge Function" errors**

---

## 🚨 Common Errors

### Error 1: "Analysis failed - Edge Function returned a non-2xx status code"

**What it means:** The room analysis API is not configured or encountering an error.

**Solution:** Configure API keys for AI vision analysis.

### Error 2: "The app encountered an error"

**What it means:** Generic error, usually related to missing API configuration.

**Solution:** Follow the setup steps below.

---

## ✅ Quick Fix (5 Minutes)

### Step 1: Get OpenRouter API Key

OpenRouter provides access to multiple AI models including Google Gemini and GPT.

1. **Go to:** https://openrouter.ai/
2. **Sign up / Log in**
3. **Add Credits:** $5-10 (covers 50-100 analyses)
4. **Create API Key:**
   - Go to "Keys" section
   - Click "Create Key"
   - Copy the key (starts with `sk-or-v1-...`)
   - Save it somewhere safe

### Step 2: Add API Key to Supabase

1. **Go to:** https://supabase.com/dashboard/project/nvnxptkgksuhfcpmungq
2. **Navigate to:** Edge Functions → Settings → Secrets
3. **Add New Secret:**
   - Name: `OPENROUTER_API_KEY`
   - Value: `sk-or-v1-your-key-here`
4. **Click Save**

### Step 3: Test

1. **Reload your app**
2. **Try analyzing a room**
3. **Should work now!** ✅

---

## 🛠️ Detailed Setup

### Required API Keys

Your app needs these API keys for full functionality:

#### 1. **OPENROUTER_API_KEY** (Required for AI Features)

**Used for:**
- Room analysis (detecting doors, windows, dimensions)
- Architectural preservation validation
- Design recommendations
- Budget itemization

**Cost:** $0.01-0.05 per analysis

**Where to get:** https://openrouter.ai/

**How to add:**
```bash
Supabase Dashboard → Edge Functions → Settings → Secrets
Name: OPENROUTER_API_KEY
Value: sk-or-v1-your-key-here
```

#### 2. **REPLICATE_API_KEY** (Optional for Image Cleaning)

**Used for:**
- Background removal
- Image enhancement
- Upscaling

**Cost:** $0.002-0.005 per image

**Where to get:** https://replicate.com/

**How to add:**
```bash
Supabase Dashboard → Edge Functions → Settings → Secrets
Name: REPLICATE_API_KEY
Value: r8_your-key-here
```

**Alternative:** You can use `FAL_KEY` instead:
```bash
Name: FAL_KEY
Value: your-fal-key-here
```

#### 3. **SUPABASE_URL** & **SUPABASE_SERVICE_ROLE_KEY** (Already configured)

These should already be set, but if missing:

```bash
Supabase Dashboard → Settings → API

SUPABASE_URL: https://nvnxptkgksuhfcpmungq.supabase.co
SUPABASE_SERVICE_ROLE_KEY: (from Settings → API → service_role key)
```

---

## 🔍 Error Analysis

### Error: "API keys not configured"

**Cause:** Missing OPENROUTER_API_KEY or LOVABLE_API_KEY

**Solution:**
1. Add OPENROUTER_API_KEY to Supabase Edge Functions
2. Reload app
3. Retry analysis

### Error: "Rate limit exceeded"

**Cause:** Too many requests in short time

**Solution:**
1. Wait 60 seconds
2. Retry
3. If persistent, check API provider dashboard for rate limits

### Error: "API authentication failed"

**Cause:** Invalid or expired API key, or insufficient credits

**Solution:**
1. Check API key is correct
2. Verify credits available on provider dashboard
3. Add more credits if needed

### Error: "Bad request"

**Cause:** Invalid image URL or corrupted image

**Solution:**
1. Check image URL is accessible
2. Try uploading a different image
3. Ensure image format is supported (JPG, PNG)

### Error: "Image processing API key not configured"

**Cause:** Missing REPLICATE_API_KEY or FAL_KEY (for cleaning feature)

**Solution:**
1. Add REPLICATE_API_KEY or FAL_KEY
2. Or skip cleaning phase if not needed
3. App will use original image if cleaning is skipped

---

## 🎯 Feature Requirements by API Key

| Feature | Required API Key | Cost Estimate |
|---------|------------------|---------------|
| Room Analysis | OPENROUTER_API_KEY | $0.01-0.05 |
| Door/Window Detection | OPENROUTER_API_KEY | Included in analysis |
| Image Cleaning | REPLICATE_API_KEY or FAL_KEY | $0.002-0.005 |
| Render Generation | OPENROUTER_API_KEY | $0.10-0.50 |
| Preservation Validation | OPENROUTER_API_KEY | $0.01-0.03 |

---

## 📊 Demo Mode

If no API keys are configured, the app runs in **Demo Mode:**

- ✅ UI fully functional
- ✅ Projects and rooms can be created
- ✅ Budget calculator works
- ✅ PDF export works
- ⚠️ Room analysis returns mock data
- ⚠️ Image cleaning skipped (uses original)
- ⚠️ Render generation not available

**To exit demo mode:** Add OPENROUTER_API_KEY

---

## 🧪 Testing API Setup

### Test 1: Check API Keys
```bash
Supabase Dashboard → Edge Functions → Settings → Secrets

Should see:
✅ OPENROUTER_API_KEY: sk-or-v1-***
✅ SUPABASE_URL: https://nvnxptkgksuhfcpmungq.supabase.co
✅ SUPABASE_SERVICE_ROLE_KEY: ***
```

### Test 2: Analyze a Room
1. Create test project
2. Add room
3. Upload image
4. Click "Analyze Room"
5. **Expected:** Analysis completes in 10-30 seconds
6. **Success:** Door/window counts shown

### Test 3: Check API Usage
```bash
OpenRouter Dashboard → Usage

Should see:
- Recent API calls
- Token usage
- Cost tracking
```

---

## 💡 Best Practices

### 1. API Key Security
- Never commit API keys to Git
- Only store in Supabase Edge Functions settings
- Use separate keys for dev/prod
- Rotate keys regularly

### 2. Cost Management
- Start with $10 credit
- Monitor usage in provider dashboard
- Set budget alerts
- Use cheaper models for testing

### 3. Error Handling
- Check app logs for detailed errors
- Use API test page: `/admin/api-test`
- Test with sample images first
- Verify image URLs are accessible

### 4. Performance
- Use smaller images for faster analysis
- Batch operations when possible
- Cache results when appropriate
- Monitor response times

---

## 🔗 Quick Links

### API Providers
- **OpenRouter:** https://openrouter.ai/ (AI vision & chat)
- **Replicate:** https://replicate.com/ (Image processing)
- **Fal.ai:** https://fal.ai/ (Alternative image processing)

### Supabase Setup
- **Dashboard:** https://supabase.com/dashboard/project/nvnxptkgksuhfcpmungq
- **Edge Functions:** Dashboard → Edge Functions → Settings → Secrets
- **API Settings:** Dashboard → Settings → API

### Documentation
- **Quick Start:** [QUICK_START_API_SETUP.md](./QUICK_START_API_SETUP.md)
- **Full Guide:** [DEPLOYMENT_GUIDE_COMPLETE.md](./DEPLOYMENT_GUIDE_COMPLETE.md)
- **Testing:** [TESTING_VERIFICATION_GUIDE.md](./TESTING_VERIFICATION_GUIDE.md)

---

## 📞 Still Having Issues?

### Check These:

1. **API Keys Valid?**
   - Test on provider dashboard
   - Verify not expired
   - Check credits available

2. **Supabase Configuration?**
   - Edge Functions deployed
   - Secrets saved correctly
   - No typos in key names

3. **Network Issues?**
   - Image URLs accessible
   - No firewall blocking APIs
   - Internet connection stable

4. **App Issues?**
   - Clear browser cache
   - Hard reload (Ctrl+Shift+R)
   - Try different browser
   - Check console for errors

### Debug Tools:

1. **Browser Console:** F12 → Console tab
2. **Network Tab:** F12 → Network tab → Filter: Fetch/XHR
3. **API Test Page:** `/admin/api-test`
4. **Supabase Logs:** Dashboard → Edge Functions → Logs

---

## 🎉 Success Checklist

- [x] OPENROUTER_API_KEY added to Supabase
- [x] API key has credits
- [x] App reloaded
- [x] Room analysis works
- [x] No error messages
- [x] Door/window counts accurate
- [x] Ready to generate renders!

---

## 📝 Common Scenarios

### Scenario 1: Just Starting Out
```
1. Add OPENROUTER_API_KEY ($5-10 credits)
2. Skip REPLICATE_API_KEY for now
3. Test room analysis
4. Add image processing key later if needed
```

### Scenario 2: Full Production
```
1. Add OPENROUTER_API_KEY ($20-50 credits)
2. Add REPLICATE_API_KEY ($10-20 credits)
3. Set up monitoring
4. Configure budget alerts
5. Ready for client projects
```

### Scenario 3: Testing Only
```
1. Use demo mode (no keys)
2. Test UI and workflows
3. Use mock data for validation
4. Add keys when ready for real testing
```

---

**Document Version:** 1.0.0  
**Last Updated:** December 30, 2024  
**Status:** ✅ Complete

---

**Questions?** See [QUICK_START_API_SETUP.md](./QUICK_START_API_SETUP.md) or check `/admin/api-test`
