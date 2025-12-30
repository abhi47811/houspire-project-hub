# 🧪 Testing & Verification Guide

## Complete System Testing Protocol for Houspire

**Last Updated:** December 30, 2024  
**Version:** 1.0.0  
**Status:** Production Ready

---

## 📋 Table of Contents

1. [Quick Test Checklist](#quick-test-checklist)
2. [Authentication Testing](#authentication-testing)
3. [Database Testing](#database-testing)
4. [API Edge Functions Testing](#api-edge-functions-testing)
5. [UI Component Testing](#ui-component-testing)
6. [Room Workflow Testing](#room-workflow-testing)
7. [Architectural Preservation Testing](#architectural-preservation-testing)
8. [Performance Testing](#performance-testing)
9. [Integration Testing](#integration-testing)
10. [Security Testing](#security-testing)

---

## ✅ Quick Test Checklist

### Before Production Deployment

- [ ] Database migrations applied
- [ ] API keys configured in Supabase
- [ ] Authentication working
- [ ] Projects can be created
- [ ] Rooms can be added
- [ ] Images can be uploaded
- [ ] Renders can be generated
- [ ] Architectural preservation works
- [ ] Budget calculator works
- [ ] PDF export works
- [ ] Analytics dashboard loads

---

## 🔐 Authentication Testing

### Test Cases

#### 1. Sign Up Flow
```bash
# Manual Test
1. Navigate to /login
2. Click "Sign Up"
3. Enter email: test@example.com
4. Enter password: TestPassword123!
5. Enter full name: Test User
6. Submit form
7. ✅ Verify redirect to dashboard
8. ✅ Check profile created in database
```

#### 2. Sign In Flow
```bash
# Manual Test
1. Navigate to /login
2. Enter existing credentials
3. Submit form
4. ✅ Verify redirect to dashboard
5. ✅ Check session stored
```

#### 3. Protected Routes
```bash
# Manual Test
1. Log out
2. Try to access /projects
3. ✅ Verify redirect to /login
4. Log in
5. ✅ Verify redirect back to /projects
```

### Expected Results
- ✅ Sign up creates profile in database
- ✅ Sign in creates session
- ✅ Protected routes redirect to login
- ✅ Session persists across page reloads
- ✅ Logout clears session

---

## 🗄️ Database Testing

### Migration Testing

```bash
# Run migrations
cd /home/user/webapp
supabase db push

# Verify tables exist
supabase db dump --schema public

# Expected tables:
✅ profiles
✅ projects
✅ rooms
✅ renders
✅ smart_defaults
✅ style_library
✅ budget_items
✅ vendors
✅ team_members
✅ bulk_operations
✅ bulk_operation_items
✅ room_analysis
```

### Seed Data Testing

```sql
-- Check Smart Defaults
SELECT COUNT(*) FROM smart_defaults;
-- Expected: 169 records

-- Check Style Library
SELECT COUNT(*) FROM style_library;
-- Expected: 24+ records

-- Verify architectural preservation columns
SELECT 
  column_name, 
  data_type 
FROM information_schema.columns 
WHERE table_name = 'rooms' 
  AND column_name IN ('doors', 'windows', 'door_positions', 'window_positions');
-- Expected: 4 columns found
```

### Row Level Security (RLS) Testing

```sql
-- Test as authenticated user
SELECT * FROM profiles WHERE id = auth.uid();
-- ✅ Should return own profile

-- Test as admin
SELECT * FROM profiles;
-- ✅ Should return all profiles (if admin)
```

---

## 🔌 API Edge Functions Testing

### Using the API Test Page

Navigate to `/admin/api-test` (admin only) to access the comprehensive API testing interface.

### 1. Health Check
```bash
curl -X POST \
  https://nvnxptkgksuhfcpmungq.supabase.co/functions/v1/health-check \
  -H "Authorization: Bearer YOUR_SUPABASE_ANON_KEY" \
  -H "Content-Type: application/json"

# Expected Response:
{
  "status": "healthy",
  "timestamp": "2024-12-30T11:00:00Z",
  "version": "1.0.0"
}
```

### 2. AI Render Generation
```bash
curl -X POST \
  https://nvnxptkgksuhfcpmungq.supabase.co/functions/v1/generate-ai \
  -H "Authorization: Bearer YOUR_SUPABASE_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "roomId": "your-room-id",
    "style": "Modern Minimalist",
    "customPrompt": "Warm lighting, wooden accents"
  }'

# Expected Response:
{
  "success": true,
  "render_id": "uuid",
  "image_url": "https://...",
  "doors_preserved": 2,
  "windows_preserved": 3,
  "preservation_validation": {...}
}
```

### 3. Room Analysis
```bash
curl -X POST \
  https://nvnxptkgksuhfcpmungq.supabase.co/functions/v1/vision-ai \
  -H "Authorization: Bearer YOUR_SUPABASE_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "image_url": "https://example.com/room.jpg",
    "analysis_type": "full"
  }'

# Expected Response:
{
  "success": true,
  "room_type": "living_room",
  "dimensions": {...},
  "door_count": 2,
  "window_count": 3,
  "door_positions": [...],
  "window_positions": [...]
}
```

### 4. Image Processing
```bash
curl -X POST \
  https://nvnxptkgksuhfcpmungq.supabase.co/functions/v1/image-processing \
  -H "Authorization: Bearer YOUR_SUPABASE_ANON_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "image_url": "https://example.com/room.jpg",
    "operation": "remove_background"
  }'

# Expected Response:
{
  "success": true,
  "processed_url": "https://...",
  "original_url": "https://..."
}
```

---

## 🎨 UI Component Testing

### Manual Testing Checklist

#### Dashboard
- [ ] Stats cards display correct counts
- [ ] Recent projects load
- [ ] Recent rooms load
- [ ] Quick actions work

#### Projects Page
- [ ] Project list loads
- [ ] Create project modal opens
- [ ] Project cards display correctly
- [ ] Search/filter works

#### Room Detail Page
- [ ] Room info loads
- [ ] Phase progression works
- [ ] Image upload works
- [ ] Style selection works
- [ ] Render generation works

#### Budget Calculator
- [ ] City selection works
- [ ] Budget tier selection works
- [ ] Room-wise breakdown displays
- [ ] Total calculation correct
- [ ] PDF export works

#### Analytics Dashboard
- [ ] Charts render correctly
- [ ] Data updates in real-time
- [ ] Filters work
- [ ] Export functionality works

---

## 🏠 Room Workflow Testing

### Phase 1: Capture
```bash
# Manual Test
1. Create new room
2. Upload room photo
3. Enter dimensions (12 x 14 x 9)
4. Select room type (Living Room)
5. Count doors: 2
6. Count windows: 3
7. Add requirements text
8. ✅ Click "Next Phase"
```

**Expected Results:**
- ✅ Image uploaded to storage
- ✅ Room record created in database
- ✅ Doors/windows counts saved
- ✅ Phase advances to 2

### Phase 2: Clean
```bash
# Manual Test
1. View uploaded image
2. Click "Clean Image"
3. Wait for processing
4. Review cleaned image
5. ✅ Click "Approve & Continue"
```

**Expected Results:**
- ✅ Background removed
- ✅ Cleaned image saved
- ✅ Architectural elements preserved
- ✅ Phase advances to 3

### Phase 3: Style Selection
```bash
# Manual Test
1. Browse Smart Defaults
2. Select style (Modern Minimalist)
3. View specifications
4. Customize if needed
5. ✅ Click "Next Phase"
```

**Expected Results:**
- ✅ Smart defaults loaded (169 options)
- ✅ Style selected
- ✅ Specifications saved
- ✅ Phase advances to 4

### Phase 4: Refinement (Optional)
```bash
# Manual Test
1. Review style selections
2. Make adjustments
3. Add custom requirements
4. ✅ Click "Next Phase"
```

**Expected Results:**
- ✅ Refinements saved
- ✅ Custom requirements stored
- ✅ Phase advances to 5

### Phase 5: Generate
```bash
# Manual Test
1. Review all inputs
2. Click "Generate Render"
3. Wait for AI processing (30-60 seconds)
4. View generated render
5. Check preservation validation
6. ✅ Download or approve
```

**Expected Results:**
- ✅ Render generated
- ✅ Architectural preservation validated
- ✅ Doors: 2/2 preserved ✓
- ✅ Windows: 3/3 preserved ✓
- ✅ Render saved to database

---

## 🏗️ Architectural Preservation Testing

### Critical Test: Door & Window Preservation

```sql
-- Create test room with known architecture
INSERT INTO rooms (
  project_id,
  room_name,
  room_type,
  doors,
  windows,
  door_positions,
  window_positions
) VALUES (
  'project-uuid',
  'Test Living Room',
  'living_room',
  2,
  3,
  '[{"position": "left", "width": "0.9m", "height": "2.1m"}]',
  '[{"position": "front", "width": "1.2m", "height": "1.5m"}]'
);
```

### Generate Test Render

```bash
# Use API Test Page or curl
curl -X POST \
  https://nvnxptkgksuhfcpmungq.supabase.co/functions/v1/generate-ai \
  -H "Authorization: Bearer YOUR_SUPABASE_ANON_KEY" \
  -d '{
    "roomId": "test-room-id",
    "style": "Modern Minimalist"
  }'
```

### Verify Preservation

```sql
-- Check render preservation data
SELECT 
  r.id,
  r.doors,
  r.windows,
  ren.doors_preserved,
  ren.windows_preserved,
  ren.preservation_validation
FROM rooms r
JOIN renders ren ON r.id = ren.room_id
WHERE r.id = 'test-room-id';

-- Expected result:
-- doors: 2, doors_preserved: 2 ✓
-- windows: 3, windows_preserved: 3 ✓
-- preservation_validation: {"doors": "preserved", "windows": "preserved"}
```

### Success Criteria
- ✅ Door count matches: Original = Generated
- ✅ Window count matches: Original = Generated
- ✅ Positions maintained
- ✅ Dimensions accurate
- ✅ No architectural elements disappeared

---

## ⚡ Performance Testing

### Load Time Benchmarks

```bash
# Dashboard load time
Target: < 2 seconds
Test: Open /dashboard
Measure: First Contentful Paint

# Project list load time
Target: < 1 second
Test: Open /projects with 50 projects
Measure: Time to Interactive

# Render generation time
Target: 30-60 seconds
Test: Generate AI render
Measure: API response time
```

### Database Query Performance

```sql
-- Slow query test
EXPLAIN ANALYZE
SELECT * FROM rooms r
JOIN renders ren ON r.id = ren.room_id
WHERE r.project_id = 'project-uuid'
ORDER BY r.created_at DESC
LIMIT 20;

-- Expected: < 100ms
```

### API Response Times

| Endpoint | Target | Max |
|----------|--------|-----|
| health-check | < 100ms | 500ms |
| generate-ai | 30-60s | 120s |
| vision-ai | 5-10s | 30s |
| image-processing | 5-10s | 30s |

---

## 🔗 Integration Testing

### End-to-End Workflow

```bash
# Complete project workflow
1. Sign up / Log in
2. Create project
3. Add room
4. Upload image
5. Clean image
6. Select style
7. Generate render
8. Verify preservation
9. Calculate budget
10. Export PDF
11. View analytics

# Expected: All steps complete successfully
```

### Cross-Component Testing

```bash
# Test data flow
1. Create room → Check database
2. Generate render → Check storage
3. Calculate budget → Check calculations
4. Export PDF → Check file generation
```

---

## 🔒 Security Testing

### Authentication Security

```bash
# Test SQL injection
1. Try login with: ' OR '1'='1
2. ✅ Should fail / be sanitized

# Test XSS
1. Try project name: <script>alert('xss')</script>
2. ✅ Should be escaped
```

### API Security

```bash
# Test unauthorized access
curl -X POST \
  https://nvnxptkgksuhfcpmungq.supabase.co/functions/v1/generate-ai \
  -H "Content-Type: application/json"

# ✅ Should return 401 Unauthorized
```

### Database Security

```sql
-- Test RLS
SELECT * FROM profiles WHERE id != auth.uid();
-- ✅ Should return empty (non-admin users)
```

---

## 📊 Testing Reports

### Test Summary Template

```markdown
## Test Run: [Date]

### Environment
- URL: https://8080-sandbox.novita.ai
- Database: nvnxptkgksuhfcpmungq
- Tester: [Name]

### Results
- Total Tests: 50
- Passed: 48 ✅
- Failed: 2 ❌
- Skipped: 0 ⏭️

### Failed Tests
1. Budget calculator - Mumbai tier calculation
   - Expected: ₹1,500,000
   - Actual: ₹1,450,000
   - Fix: Update pricing data

2. Render generation - Timeout on large images
   - Expected: < 60s
   - Actual: 75s
   - Fix: Optimize image preprocessing

### Recommendations
- Update budget pricing for Mumbai
- Add image size validation before processing
```

---

## 🚀 Automated Testing (Future)

### Jest Configuration

```javascript
// jest.config.js
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
```

### Example Test

```typescript
// src/services/__tests__/budgetCalculatorService.test.ts
import { calculateRoomBudget } from '../budgetCalculatorService';

describe('Budget Calculator', () => {
  it('calculates correct budget for living room in Mumbai', () => {
    const result = calculateRoomBudget({
      roomType: 'living_room',
      city: 'Mumbai',
      budgetTier: 'premium',
      area: 200
    });

    expect(result.total).toBeGreaterThan(0);
    expect(result.perSqFt).toBe(750);
  });
});
```

---

## 📝 Testing Checklist for Production

### Pre-Deployment
- [ ] All migrations applied
- [ ] API keys configured
- [ ] Environment variables set
- [ ] Database seeded
- [ ] Edge functions deployed

### Post-Deployment
- [ ] Health check passes
- [ ] Authentication works
- [ ] Dashboard loads
- [ ] Projects can be created
- [ ] Rooms can be added
- [ ] Renders can be generated
- [ ] Budget calculator works
- [ ] PDF export works
- [ ] Analytics dashboard works

### Critical Path Testing
- [ ] Sign up → Create project → Add room → Generate render
- [ ] Architectural preservation verified
- [ ] Budget calculation accurate
- [ ] PDF export successful

---

## 🎯 Success Metrics

### Acceptance Criteria

| Feature | Success Rate | Target |
|---------|--------------|--------|
| Authentication | 100% | 100% |
| Project Creation | 100% | 100% |
| Room Workflow | 95%+ | 90% |
| Render Generation | 90%+ | 85% |
| Architectural Preservation | 95%+ | 94% |
| Budget Calculation | 100% | 100% |
| PDF Export | 100% | 100% |

---

## 📞 Support & Issues

### Reporting Test Failures

1. Document the test case
2. Include screenshots/logs
3. Note environment details
4. Create GitHub issue
5. Link to test report

### Test Data

Use the API Test Page at `/admin/api-test` for:
- Quick edge function testing
- Real-time monitoring
- Response validation
- Error debugging

---

## 🎉 You're Ready!

This comprehensive testing guide ensures your Houspire app is production-ready. Run through each section before deploying to production.

**Next Steps:**
1. Run through Quick Test Checklist
2. Test critical path (sign up → render)
3. Verify architectural preservation
4. Deploy to production
5. Monitor in production

**Questions?** See:
- [Quick Start Guide](./QUICK_START_API_SETUP.md)
- [Deployment Guide](./DEPLOYMENT_GUIDE_COMPLETE.md)
- [API Test Page](/admin/api-test)

---

**Last Updated:** December 30, 2024  
**Version:** 1.0.0  
**Status:** ✅ Production Ready
