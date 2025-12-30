# 🚀 HOUSPIRE - Complete Deployment Guide

**Date:** December 30, 2025  
**Version:** 1.0.0  
**Status:** Production Ready

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Database Setup](#database-setup)
4. [Environment Configuration](#environment-configuration)
5. [Frontend Deployment](#frontend-deployment)
6. [Edge Functions Deployment](#edge-functions-deployment)
7. [Storage Configuration](#storage-configuration)
8. [Post-Deployment Checklist](#post-deployment-checklist)
9. [Monitoring & Maintenance](#monitoring--maintenance)
10. [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

HOUSPIRE is a complete interior design platform with:
- ✅ 5-phase room transformation workflow
- ✅ Architectural preservation (doors & windows)
- ✅ AI-powered room analysis
- ✅ Bulk operations
- ✅ Budget calculator (Indian pricing)
- ✅ PDF export & presentations
- ✅ Analytics dashboard
- ✅ Image comparison slider

---

## 📦 Prerequisites

### Required Accounts
1. **Supabase Account** - [https://supabase.com](https://supabase.com)
2. **GitHub Account** - [https://github.com](https://github.com)
3. **Vercel/Netlify Account** - For frontend hosting
4. **API Keys:**
   - Lovable API Key (for AI generation)
   - OpenRouter API Key (alternative AI provider)

### Local Requirements
```bash
Node.js >= 18.x
npm >= 9.x
Git
Supabase CLI (optional but recommended)
```

---

## 🗄️ Database Setup

### Step 1: Create Supabase Project

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Click "New Project"
3. Enter project details:
   - **Name:** houspire-production
   - **Database Password:** (generate strong password)
   - **Region:** Choose closest to your users
4. Wait for project creation (~2 minutes)

### Step 2: Apply Migrations

**Option A: Using Supabase Dashboard**

1. Navigate to: Database → SQL Editor
2. Open each migration file in order:
   ```
   20251227070140_848df4c2-cf9c-4e92-89b0-bb5829241925.sql  (Base schema)
   20251230110024_add_architectural_preservation_columns.sql (Preservation)
   20251230113257_seed_smart_defaults_and_style_library.sql   (Seed data)
   20251230113752_create_bulk_operations_tables.sql           (Bulk operations)
   ```
3. Run each migration
4. Verify no errors

**Option B: Using Supabase CLI**

```bash
# Install Supabase CLI
npm install -g supabase

# Link to your project
supabase link --project-ref YOUR_PROJECT_REF

# Push migrations
supabase db push

# Verify
supabase db diff
```

### Step 3: Set Up Storage Buckets

1. Navigate to: Storage → Create new bucket
2. Create buckets:
   - **room-images** (public) - For uploaded room photos
   - **renders** (public) - For generated renders
   - **cleaned-images** (public) - For cleaned room images
   - **exports** (private) - For PDF exports

3. Configure bucket policies:
   ```sql
   -- Allow authenticated uploads
   CREATE POLICY "Allow authenticated uploads"
   ON storage.objects FOR INSERT
   TO authenticated
   WITH CHECK (bucket_id = 'room-images');

   -- Allow public read
   CREATE POLICY "Allow public read"
   ON storage.objects FOR SELECT
   TO public
   USING (bucket_id IN ('room-images', 'renders', 'cleaned-images'));
   ```

---

## ⚙️ Environment Configuration

### Step 1: Get Supabase Credentials

From Supabase Dashboard → Settings → API:

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGc...your-anon-key
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...your-service-role-key
```

### Step 2: Configure Edge Function Environment

Navigate to: Functions → Configuration

Add environment variables:
```bash
LOVABLE_API_KEY=your_lovable_api_key
OPENROUTER_API_KEY=your_openrouter_api_key
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...your-service-role-key
```

### Step 3: Create .env File (Local Development)

```bash
# .env.local
VITE_SUPABASE_PROJECT_ID=your_project_id
VITE_SUPABASE_PUBLISHABLE_KEY=your_anon_key
VITE_SUPABASE_URL=https://your-project.supabase.co
```

---

## 🌐 Frontend Deployment

### Option A: Deploy to Vercel (Recommended)

1. **Connect GitHub Repository**
   ```bash
   # Push to GitHub if not already done
   git remote add origin https://github.com/yourusername/houspire-project-hub.git
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [https://vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Configure project:
     - **Framework Preset:** Vite
     - **Build Command:** `npm run build`
     - **Output Directory:** `dist`

3. **Add Environment Variables**
   - Navigate to: Settings → Environment Variables
   - Add:
     ```
     VITE_SUPABASE_PROJECT_ID
     VITE_SUPABASE_PUBLISHABLE_KEY
     VITE_SUPABASE_URL
     ```

4. **Deploy**
   - Click "Deploy"
   - Wait for build (~2-3 minutes)
   - Get deployment URL

### Option B: Deploy to Netlify

1. **Connect Repository**
   - Go to [https://app.netlify.com](https://app.netlify.com)
   - New site from Git
   - Select repository

2. **Configure Build**
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`

3. **Environment Variables**
   - Site settings → Environment variables
   - Add Supabase credentials

4. **Deploy**

### Option C: Deploy to Cloudflare Pages

1. **Connect Repository**
   - Go to Cloudflare Dashboard → Pages
   - Create a project
   - Connect GitHub

2. **Build Settings**
   - **Framework preset:** Vite
   - **Build command:** `npm run build`
   - **Build output:** `dist`

3. **Environment Variables**
   - Add Supabase credentials

4. **Deploy**

---

## ⚡ Edge Functions Deployment

### Step 1: Install Supabase CLI

```bash
npm install -g supabase
supabase login
```

### Step 2: Link Project

```bash
supabase link --project-ref YOUR_PROJECT_REF
```

### Step 3: Deploy Functions

```bash
# Deploy all functions
supabase functions deploy

# Or deploy specific function
supabase functions deploy generate-ai
```

### Step 4: Verify Deployment

```bash
# Test function
curl -X POST https://YOUR_PROJECT_REF.supabase.co/functions/v1/generate-ai \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{"roomId": "test"}'
```

---

## 📁 Storage Configuration

### Configure CORS for Storage

```sql
-- Enable CORS for storage buckets
INSERT INTO storage.cors (bucket_id, origin, methods)
VALUES
  ('room-images', '*', ARRAY['GET', 'POST', 'PUT', 'DELETE']),
  ('renders', '*', ARRAY['GET', 'POST']),
  ('cleaned-images', '*', ARRAY['GET', 'POST']),
  ('exports', '*', ARRAY['GET', 'POST']);
```

### Set Up Storage Policies

```sql
-- Room Images Bucket
CREATE POLICY "Users can upload room images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'room-images');

CREATE POLICY "Anyone can view room images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'room-images');

-- Renders Bucket (similar policies)
-- Cleaned Images Bucket (similar policies)
-- Exports Bucket (private - authenticated only)
```

---

## ✅ Post-Deployment Checklist

### Immediate After Deployment

- [ ] **Test Authentication**
  - Sign up new user
  - Sign in existing user
  - Password reset flow

- [ ] **Test Project Creation**
  - Create new project
  - Add rooms to project
  - Upload room images

- [ ] **Test Room Workflow**
  - Phase 1: Upload original image
  - Phase 2: Clean image
  - Phase 3: Select style
  - Phase 4: Request refinement
  - Phase 5: Generate render

- [ ] **Test Architectural Preservation**
  - Create room with 1 door, 1 window
  - Generate render
  - Verify doors & windows preserved

- [ ] **Test Bulk Operations**
  - Select multiple rooms
  - Run bulk generate
  - Monitor progress

- [ ] **Test Budget Calculator**
  - Calculate room budget
  - Export budget report

- [ ] **Test PDF Export**
  - Generate project report
  - Generate presentation
  - Download PDFs

- [ ] **Test Admin Dashboard**
  - View analytics
  - Check preservation stats
  - Monitor recent activity

### Security Checks

- [ ] **Environment Variables**
  - No secrets in frontend code
  - All API keys in environment variables
  - Service role key only in backend

- [ ] **RLS Policies**
  - Users can only see their projects
  - Admins have proper access
  - Public policies are correct

- [ ] **Storage Security**
  - Private buckets are private
  - Public buckets have correct policies
  - File upload size limits set

### Performance Checks

- [ ] **Frontend Performance**
  - Lighthouse score > 90
  - First contentful paint < 2s
  - Time to interactive < 3s

- [ ] **Database Performance**
  - Indexes on foreign keys
  - Indexes on frequently queried columns
  - Query performance acceptable

- [ ] **Edge Function Performance**
  - Functions respond < 5s
  - Proper error handling
  - Logging configured

---

## 📊 Monitoring & Maintenance

### Set Up Monitoring

1. **Supabase Dashboard**
   - Monitor database usage
   - Check storage usage
   - Review function logs

2. **Vercel Analytics** (if using Vercel)
   - Page views
   - Performance metrics
   - Error tracking

3. **Custom Monitoring**
   - Set up Sentry for error tracking
   - Configure uptime monitoring
   - Set up alerts

### Regular Maintenance

**Daily:**
- Check error logs
- Monitor function failures
- Review user feedback

**Weekly:**
- Review database size
- Check storage usage
- Analyze performance metrics

**Monthly:**
- Update dependencies
- Review security alerts
- Optimize slow queries
- Clean up old data

---

## 🔧 Troubleshooting

### Common Issues

**Issue: "Failed to load resource: 403"**
- **Cause:** Missing RLS policies or incorrect environment variables
- **Fix:** Check Supabase policies and verify `.env` configuration

**Issue: "Function timeout"**
- **Cause:** Edge function taking too long
- **Fix:** Increase timeout in function configuration or optimize code

**Issue: "Storage upload failed"**
- **Cause:** Missing storage policies or CORS issues
- **Fix:** Verify storage bucket policies and CORS configuration

**Issue: "Architectural preservation not working"**
- **Cause:** Migration not applied or missing room data
- **Fix:** Apply `20251230110024_add_architectural_preservation_columns.sql` migration

**Issue: "Bulk operations stuck"**
- **Cause:** Edge function error or database connection issue
- **Fix:** Check function logs and database status

### Getting Help

- **Documentation:** Check `/docs` folder in repository
- **GitHub Issues:** [https://github.com/yourusername/houspire-project-hub/issues](https://github.com/yourusername/houspire-project-hub/issues)
- **Supabase Support:** [https://supabase.com/support](https://supabase.com/support)

---

## 🎉 Success!

Your HOUSPIRE platform is now deployed and ready for production use!

### Next Steps

1. **Create Admin Account**
   - Sign up with your admin email
   - Update role to 'admin' in database

2. **Test Complete Workflow**
   - Create test project
   - Run through all phases
   - Verify all features work

3. **Onboard Users**
   - Invite team members
   - Assign roles
   - Train on platform usage

4. **Monitor & Iterate**
   - Collect user feedback
   - Monitor performance
   - Plan feature enhancements

---

**🌐 App URL:** Your deployment URL  
**📦 Repository:** https://github.com/abhi47811/houspire-project-hub  
**📧 Support:** support@houspire.com

**Built with ❤️ by the HOUSPIRE Team**
