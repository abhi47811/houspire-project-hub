# 🚀 Lovable Deployment Guide - HOUSPIRE Platform

## Overview
This guide explains how to trigger a deployment rebuild in Lovable.dev to update your preview environment with the latest code changes.

---

## 🔴 Critical Issue: Stale Deployment

### Problem
- **Code Status**: ✅ Latest changes committed to GitHub `main` branch
- **Lovable Preview**: ❌ Running old code from previous deployment
- **Result**: Users see "Room not found" errors and missing features

### Solution
**Manually trigger a Lovable rebuild to deploy latest code**

---

## 📋 Deployment Methods

### Method 1: Lovable Dashboard Rebuild (RECOMMENDED)

#### Step 1: Access Lovable Dashboard
1. Go to https://lovable.dev
2. Sign in with your account
3. Navigate to your project: **"houspire-project-hub"**

#### Step 2: Find Deployment Section
Look for one of these options in the dashboard:
- **"Deploy"** button in top right
- **"Deployments"** tab in left sidebar
- **"Preview"** section with deployment status
- **"Settings"** → **"Deployments"**

#### Step 3: Trigger Rebuild
Click one of these buttons:
- **"Rebuild"** - Rebuilds from latest GitHub commit
- **"Redeploy"** - Redeploys current code
- **"Deploy Now"** - Triggers immediate deployment
- **"Sync with GitHub"** - Pulls latest changes and deploys

#### Step 4: Wait for Completion
- Build process takes: **2-5 minutes**
- Watch for: **"Deployment successful"** message
- Check deployment logs for any errors

#### Step 5: Verify Deployment
1. Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
2. Open Lovable preview URL
3. Test problematic routes:
   - `/room/[room-id]` - Should redirect, not show "Room not found"
   - `/projects/[id]/rooms/[id]` - Should load room details
4. Check browser console for errors

---

### Method 2: Trigger via Dummy Commit (AUTOMATED)

If Lovable has auto-deploy enabled, you can trigger deployment by pushing a commit:

```bash
cd /home/user/webapp

# Make a small documentation change
echo "" >> README.md

# Commit and push
git add README.md
git commit -m "chore: trigger Lovable rebuild"
git push origin main

# Wait 2-5 minutes for Lovable to detect change and rebuild
```

**Auto-Deploy Requirements**:
- GitHub integration must be active
- Auto-deploy must be enabled in Lovable settings
- Deployment branch must be set to `main`

---

### Method 3: Lovable CLI (If Available)

If Lovable provides a CLI tool:

```bash
# Install Lovable CLI (if not installed)
npm install -g @lovable/cli

# Login
lovable login

# Trigger deployment
lovable deploy --project houspire-project-hub

# Or rebuild
lovable rebuild
```

**Note**: Check Lovable documentation for CLI availability

---

## 🔍 Troubleshooting Deployment

### Issue 1: Deployment Not Starting

**Symptoms**:
- No deployment triggered after clicking "Deploy"
- No change in deployment status

**Solutions**:
1. **Check GitHub Integration**:
   - Go to Lovable Settings → Integrations
   - Verify GitHub connection is active
   - Reconnect if needed

2. **Check Deployment Branch**:
   - Ensure deployment branch is set to `main`
   - Old branch (`genspark_ai_developer`) was deleted
   - Update branch setting if incorrect

3. **Force Re-link**:
   - Disconnect GitHub repository
   - Reconnect GitHub repository
   - Select `main` branch
   - Enable auto-deploy

---

### Issue 2: Deployment Fails

**Symptoms**:
- Deployment starts but fails
- Error message in deployment logs

**Solutions**:
1. **Check Build Logs**:
   - Open deployment logs in Lovable dashboard
   - Look for specific error messages
   - Common issues:
     - Missing environment variables
     - Build command failures
     - Dependency issues

2. **Verify Build Locally**:
   ```bash
   cd /home/user/webapp
   npm install
   npm run build
   # Should complete successfully
   ```

3. **Check Environment Variables**:
   - Verify `.env` variables are set in Lovable
   - Required variables:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_PUBLISHABLE_KEY`
     - `VITE_SUPABASE_PROJECT_ID`

---

### Issue 3: Deployment Succeeds But Changes Not Visible

**Symptoms**:
- Deployment shows "Success"
- But preview still shows old code

**Solutions**:
1. **Clear Browser Cache**:
   ```
   Hard Refresh:
   - Windows/Linux: Ctrl + Shift + R
   - Mac: Cmd + Shift + R
   
   Or via DevTools:
   - F12 → Application → Clear Storage → Clear site data
   ```

2. **Check Deployment URL**:
   - Verify you're on the correct preview URL
   - Lovable might have multiple preview URLs
   - Check if URL changed after deployment

3. **Verify Deployment Branch**:
   ```bash
   # Check what's on GitHub main branch
   git log -1 --oneline origin/main
   
   # Should match latest commits
   ```

4. **Check Build Timestamp**:
   - In Lovable dashboard, check "Last Deployed" timestamp
   - Should be recent (within last 10 minutes)
   - If old, deployment didn't actually run

---

## 📊 Deployment Verification Checklist

After triggering deployment, verify these items:

### ✅ Pre-Deployment Checks
- [ ] Latest code pushed to GitHub `main` branch
- [ ] All tests passing locally (`npm run test`)
- [ ] Build succeeds locally (`npm run build`)
- [ ] Database migrations applied (if any)
- [ ] Environment variables configured in Lovable

### ✅ During Deployment
- [ ] Deployment status shows "Building" or "Deploying"
- [ ] Build logs visible and updating
- [ ] No error messages in logs
- [ ] Deployment completes with "Success" message

### ✅ Post-Deployment Checks
- [ ] Preview URL accessible
- [ ] Browser cache cleared
- [ ] Home page loads correctly
- [ ] Navigation works (test multiple pages)
- [ ] Critical routes work:
  - [ ] `/projects` - Projects list loads
  - [ ] `/room/:roomId` - Redirects correctly
  - [ ] `/projects/:id/rooms/:id` - Room details load
- [ ] No console errors in browser DevTools
- [ ] Features work as expected:
  - [ ] Style selection shows all 13 styles
  - [ ] AI Recommendations button visible
  - [ ] Budget optimization works
  - [ ] Trending styles widget displays

---

## 🎯 Expected Results After Deployment

### Before Deployment (Current State)
```
❌ Accessing /room/[id] → "Room not found" error
❌ Style dropdown → "No presets available for Dining Room"
❌ AI Recommendations button → Doesn't appear or doesn't work
❌ Budget optimization → Shows no alternatives
❌ Trending styles → Widget empty
```

### After Successful Deployment
```
✅ Accessing /room/[id] → Redirects to /projects/[project-id]/rooms/[id]
✅ Style dropdown → Shows all 13 design styles
✅ AI Recommendations button → Visible and functional
✅ Budget optimization → Shows cost-saving alternatives
✅ Trending styles → Shows top 3 trending styles with data
✅ Smart defaults → Auto-populate for each room type
✅ Similar projects → Discovery feature works
```

---

## 🔄 Deployment Frequency

### When to Deploy
- **After bug fixes**: Immediately after critical fixes
- **After feature additions**: After testing locally
- **After database changes**: After applying migrations
- **After dependency updates**: After updating packages
- **On schedule**: Weekly/bi-weekly for routine updates

### Best Practices
1. **Test Locally First**: Always test changes locally before deploying
2. **Check Migrations**: Apply database migrations before deploying code changes
3. **Communicate**: Notify team/users before deploying breaking changes
4. **Monitor**: Watch deployment logs and check for errors
5. **Verify**: Test critical features after every deployment
6. **Rollback Plan**: Know how to revert if deployment fails

---

## 🆘 Emergency Rollback

If deployment introduces critical bugs:

### Option 1: Revert via Lovable Dashboard
1. Go to Deployments history
2. Find previous working deployment
3. Click "Restore" or "Rollback"
4. Wait for redeployment

### Option 2: Revert via Git
```bash
# Find last working commit
git log --oneline

# Revert to that commit
git revert [commit-hash]

# Push revert
git push origin main

# Lovable will auto-deploy reverted code
```

### Option 3: Quick Fix Forward
```bash
# Fix the bug
# Commit fix
git add .
git commit -m "hotfix: critical bug fix"
git push origin main

# Trigger immediate rebuild in Lovable
```

---

## 📞 Support Resources

### Lovable Support
- **Documentation**: https://docs.lovable.dev
- **Support Email**: support@lovable.dev
- **Community Forum**: https://community.lovable.dev
- **Status Page**: https://status.lovable.dev

### Project Resources
- **Repository**: https://github.com/[your-org]/houspire-project-hub
- **Supabase Dashboard**: https://supabase.com/dashboard/project/nvnxptkgksuhfcpmungq
- **Environment**: Supabase Project ID: `nvnxptkgksuhfcpmungq`

---

## 📝 Deployment Log Template

Use this template to track deployments:

```markdown
## Deployment - [Date]

**Triggered By**: [Your Name]
**Trigger Method**: [Dashboard/Commit/CLI]
**Branch**: main
**Commit**: [commit-hash]

**Changes Included**:
- [List key changes]
- [Bug fixes]
- [New features]

**Pre-Deployment Checks**:
- [x] Tests passing
- [x] Build successful
- [x] Migrations applied

**Deployment Status**: [Success/Failed]
**Deployment Time**: [Duration]

**Post-Deployment Verification**:
- [x] Preview URL accessible
- [x] Critical routes working
- [x] No console errors
- [x] Features functional

**Issues Found**: [None/List issues]
**Actions Taken**: [None/Fixes applied]
```

---

## ✅ Summary

**Quick Steps to Deploy**:
1. Go to https://lovable.dev
2. Open project "houspire-project-hub"
3. Click "Deploy" or "Rebuild"
4. Wait 2-5 minutes
5. Clear browser cache
6. Test preview URL

**Common Issues**:
- Stale cache → Hard refresh browser
- Wrong branch → Update to `main` in settings
- Missing env vars → Add in Lovable dashboard
- Build fails → Check logs for specific error

**Success Criteria**:
- ✅ `/room/:id` redirects correctly
- ✅ All 13 styles visible
- ✅ AI features functional
- ✅ No console errors

---

**Status**: 🟡 ACTION REQUIRED  
**Next Step**: Trigger Lovable rebuild via dashboard  
**Estimated Time**: 5-10 minutes  
**Impact**: Fixes all deployment-related bugs
