# 🚀 QUICK START: Get Your App Running with AI

**5 minutes to get AI features working!**

---

## ✅ What You Already Have

- ✅ **Supabase:** Configured and working
- ✅ **Frontend:** Running at https://8080-i69fholehtu9qdvp4xxdz-583b4d74.sandbox.novita.ai
- ✅ **Database:** Schema ready
- ✅ **All Code:** Deployed and functional

---

## ❌ What's Missing

- ❌ **OpenRouter API Key** - Required for AI features
- ❌ **Edge Function Configuration** - Needs API keys

---

## 🔑 Step-by-Step Setup (5 Minutes)

### Step 1: Get OpenRouter API Key (2 minutes)

1. **Go to OpenRouter:**
   - Visit: https://openrouter.ai/
   - Click "Sign Up" or "Log In"

2. **Add Credits ($5-10 recommended):**
   - Click "Credits" or "Billing"
   - Add $5 minimum (covers 20-50 renders)
   - Cost: ~$0.10-0.50 per render

3. **Create API Key:**
   - Go to "Keys" section
   - Click "Create New Key"
   - Give it a name: "Houspire Production"
   - Copy the key (starts with `sk-or-v1-...`)
   - **Important:** Save this key somewhere safe!

---

### Step 2: Configure Supabase Edge Functions (2 minutes)

1. **Go to Supabase Dashboard:**
   - Visit: https://supabase.com/dashboard
   - Select project: `nvnxptkgksuhfcpmungq`

2. **Add API Secrets:**
   - Navigate to: **Edge Functions** → **Settings** → **Secrets**
   - Add these environment variables:

   ```bash
   Name: OPENROUTER_API_KEY
   Value: sk-or-v1-your-actual-key-here
   ```

   ```bash
   Name: SUPABASE_URL
   Value: https://nvnxptkgksuhfcpmungq.supabase.co
   ```

   ```bash
   Name: SUPABASE_SERVICE_ROLE_KEY
   Value: (Get from Settings → API → service_role key)
   ```

3. **Save Secrets:**
   - Click "Add secret" for each
   - Verify all 3 are saved

---

### Step 3: Restart & Test (1 minute)

1. **Reload the App:**
   - Refresh your browser
   - The yellow API warning should disappear

2. **Test AI Features:**
   - Create a new project
   - Add a room
   - Upload an image
   - Try "Analyze Room" (AI detects doors/windows)
   - Try "Generate Render"

---

## ✨ What Each API Key Does

### **OpenRouter** (Required)
- ✅ Generate photorealistic renders
- ✅ AI room analysis (auto-detect doors/windows)
- ✅ Clean room images (remove furniture)
- ✅ Style transfer
- ✅ Architectural preservation

**Cost:** Pay-as-you-go
- Text generation: ~$0.001-0.01 per request
- Image generation: ~$0.10-0.50 per render
- Vision analysis: ~$0.01-0.05 per image

---

## 🎯 Quick Test Checklist

After adding API keys, test these features:

- [ ] **AI Room Analysis:**
  1. Upload room image
  2. Click "Analyze Room"
  3. Should detect doors & windows automatically

- [ ] **Image Cleaning:**
  1. Upload furnished room
  2. Click "Clean Image"
  3. Should remove furniture, keep walls

- [ ] **Render Generation:**
  1. Complete Phase 1-3
  2. Click "Generate Render"
  3. Should create photorealistic render
  4. Should preserve doors & windows ✅

- [ ] **Bulk Operations:**
  1. Select multiple rooms
  2. Click "Bulk Generate"
  3. Should process all rooms

---

## 🔧 Troubleshooting

### "API Key Invalid" Error

**Problem:** Wrong API key or not configured in Supabase

**Solution:**
1. Double-check the API key (no extra spaces)
2. Verify it's added to Supabase Edge Functions (not .env.local)
3. Restart the app

---

### "Insufficient Credits" Error

**Problem:** OpenRouter account has no credits

**Solution:**
1. Go to https://openrouter.ai/
2. Add credits ($5 minimum)
3. Try again

---

### "Function Timeout" Error

**Problem:** Edge function taking too long

**Solution:**
1. Check Supabase function logs
2. Verify API key is correct
3. Check if OpenRouter is down: https://status.openrouter.ai/

---

### AI Features Not Working

**Problem:** API keys not properly configured

**Solution:**
1. Check browser console for errors (F12)
2. Verify all 3 secrets in Supabase Edge Functions:
   - OPENROUTER_API_KEY
   - SUPABASE_URL
   - SUPABASE_SERVICE_ROLE_KEY
3. Reload the page
4. Check the yellow banner at bottom-right

---

## 💡 Pro Tips

### Save Money
- Use lower resolution for testing
- Batch process rooms (bulk operations)
- Cache results when possible

### Optimize Quality
- Provide clear room images
- Count doors/windows accurately
- Use detailed custom requirements
- Try different styles

### Monitor Usage
- Check OpenRouter dashboard for usage
- Set up budget alerts
- Review cost per project

---

## 📊 Expected Costs (Reference)

### Per Project (Typical)
- **1 Bedroom Apartment:** ~$2-5
- **3 Bedroom House:** ~$5-15
- **Commercial Space:** ~$10-30

### Per Operation
- **Room Analysis:** $0.01-0.05
- **Image Cleaning:** $0.05-0.10
- **Render Generation:** $0.10-0.50
- **Bulk 10 Rooms:** $1-5

**Recommendation:** Start with $10, monitor usage, add more as needed.

---

## 🎓 Alternative: Demo Mode

**If you don't want to add API keys yet:**

The app includes a demo mode that works without API keys:

1. All features work (UI)
2. Uses placeholder images
3. Simulates AI analysis
4. Perfect for testing workflow
5. No cost

**To Enable Demo Mode:**
- Just use the app without adding API keys
- You'll see demo indicators
- All UI and workflows function
- Great for presentations/demos

---

## ✅ Success! What's Next?

Once API keys are working:

1. ✅ Test all AI features
2. ✅ Create real projects
3. ✅ Generate actual renders
4. ✅ Verify architectural preservation
5. ✅ Deploy to production (Vercel/Netlify)
6. ✅ Share with clients!

---

## 🆘 Need Help?

**Check these resources:**
1. **API Setup Guide:** `docs/API_SETUP_GUIDE.md`
2. **Deployment Guide:** `docs/DEPLOYMENT_GUIDE_COMPLETE.md`
3. **Troubleshooting:** See the Troubleshooting section above
4. **OpenRouter Docs:** https://openrouter.ai/docs
5. **Supabase Docs:** https://supabase.com/docs/guides/functions

**Still stuck?**
- Check browser console (F12) for error messages
- Check Supabase function logs
- Review Edge Function configuration
- Verify API key is valid at https://openrouter.ai/

---

## 🎉 You're All Set!

**Your app now has:**
- ✅ Full authentication
- ✅ Project management
- ✅ AI room analysis
- ✅ Render generation
- ✅ Architectural preservation
- ✅ Bulk operations
- ✅ Budget calculator
- ✅ PDF export
- ✅ Analytics dashboard

**Total setup time:** ~5 minutes  
**Total cost to start:** $5-10  
**Ready for production:** YES! 🚀

---

**Happy designing! 🎨✨**
