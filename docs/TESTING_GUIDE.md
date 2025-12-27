# Houspire Testing Guide

## Overview

This document provides comprehensive testing instructions for the Houspire interior design platform. Follow these checklists before each release.

---

## 1. Test Environment Setup

### Create Test Users

Create these users through the signup flow at `/login`:

| Email | Password | Role | Full Name |
|-------|----------|------|-----------|
| admin@houspire.test | Test@123 | admin | Admin User |
| renderer@houspire.test | Test@123 | renderer | Render Artist |
| budgeter@houspire.test | Test@123 | budgeter | Budget Manager |

After creating users, update their roles via SQL:
```sql
UPDATE public.profiles 
SET role = 'admin', full_name = 'Admin User'
WHERE id = (SELECT id FROM auth.users WHERE email = 'admin@houspire.test');

UPDATE public.profiles 
SET role = 'renderer', full_name = 'Render Artist'
WHERE id = (SELECT id FROM auth.users WHERE email = 'renderer@houspire.test');

UPDATE public.profiles 
SET role = 'budgeter', full_name = 'Budget Manager'
WHERE id = (SELECT id FROM auth.users WHERE email = 'budgeter@houspire.test');
```

### Verify Test Data

The migration has seeded:
- 7 sample vendors (curated + unverified)
- 14 pricing reference items
- 5 smart defaults for room types

---

## 2. Manual Test Checklists

### Authentication Tests

| # | Test Case | Steps | Expected Result | Status |
|---|-----------|-------|-----------------|--------|
| A1 | User Registration | 1. Go to /login 2. Click "Sign up" 3. Enter email/password 4. Submit | Account created, redirected to dashboard | ⬜ |
| A2 | User Login | 1. Go to /login 2. Enter credentials 3. Click Login | Logged in, redirected to dashboard | ⬜ |
| A3 | Session Persistence | 1. Login 2. Refresh page | User remains logged in | ⬜ |
| A4 | Logout | 1. Click user menu 2. Click "Sign out" | Logged out, redirected to login | ⬜ |
| A5 | Protected Routes | 1. Logout 2. Navigate to /projects | Redirected to /login | ⬜ |
| A6 | Role-based Access | 1. Login as renderer 2. Try to access /admin | Access denied or redirected | ⬜ |
| A7 | Invalid Credentials | 1. Enter wrong password 2. Try to login | Error message shown | ⬜ |

### Admin Flow Tests

| # | Test Case | Steps | Expected Result | Status |
|---|-----------|-------|-----------------|--------|
| AD1 | Dashboard Stats | 1. Login as admin 2. View dashboard | Stats cards show project/room/user counts | ⬜ |
| AD2 | Create Project | 1. Go to /projects 2. Click "New Project" 3. Fill form 4. Submit | Project created, appears in list | ⬜ |
| AD3 | View All Projects | 1. Login as admin 2. Go to /projects | Can see projects from all users | ⬜ |
| AD4 | Admin Panel Access | 1. Navigate to /admin | Admin panel loads with all tabs | ⬜ |
| AD5 | User Management | 1. Go to Admin > Users 2. View user list | All users listed with roles | ⬜ |
| AD6 | Change User Role | 1. Select user 2. Change role 3. Save | Role updated successfully | ⬜ |
| AD7 | Vendor Management | 1. Go to Admin > Vendors 2. Add new vendor | Vendor added to list | ⬜ |
| AD8 | Pricing Management | 1. Go to Admin > Pricing 2. Edit rate | Rate updated in database | ⬜ |
| AD9 | Analytics View | 1. Go to Admin > Analytics | Charts render with data | ⬜ |

### Renderer Flow Tests

| # | Test Case | Steps | Expected Result | Status |
|---|-----------|-------|-----------------|--------|
| R1 | View Assigned Projects | 1. Login as renderer 2. Go to dashboard | Only assigned projects visible | ⬜ |
| R2 | Add Room | 1. Open project 2. Click "Add Room" 3. Fill details | Room created with number | ⬜ |
| R3 | Upload Image (Phase 1) | 1. Open room 2. Upload image 3. Wait | Image uploaded to storage | ⬜ |
| R4 | Analyze Room (Phase 2) | 1. Click "Analyze" 2. Wait for completion | Room analysis with dimensions | ⬜ |
| R5 | Verify Measurements | 1. Review analysis 2. Edit if needed 3. Approve | Analysis marked as verified | ⬜ |
| R6 | Clean Image (Phase 3) | 1. Start cleaning 2. Wait for completion | Cleaned image generated | ⬜ |
| R7 | Approve Cleaned Image | 1. Compare before/after 2. Approve | Phase 3 marked complete | ⬜ |
| R8 | Select Style (Phase 4) | 1. View suggested styles 2. Select one | Style saved to room | ⬜ |
| R9 | Customize Settings | 1. Adjust color/lighting 2. Save | Settings persisted | ⬜ |
| R10 | Generate Render (Phase 5) | 1. Start generation 2. Wait | Render image created | ⬜ |
| R11 | Approve Final Render | 1. Review quality 2. Approve | Room workflow complete | ⬜ |
| R12 | Bulk Approve Analysis | 1. Select all rooms 2. Click "Approve All" | All rooms approved at once | ⬜ |
| R13 | Apply Style to All | 1. Select style 2. Click "Apply to All" | Style applied to all rooms | ⬜ |
| R14 | Copy Settings | 1. Click "Copy Settings" 2. Select source 3. Select targets | Settings copied to targets | ⬜ |
| R15 | Job Progress | 1. Start long job 2. Observe progress | Progress bar updates in real-time | ⬜ |
| R16 | Notifications | 1. Complete a phase 2. Check notifications | Notification appears | ⬜ |

### Budgeter Flow Tests

| # | Test Case | Steps | Expected Result | Status |
|---|-----------|-------|-----------------|--------|
| B1 | Generate Budget | 1. Open completed project 2. Go to Budget 3. Click Generate | BOQ items created | ⬜ |
| B2 | View BOQ | 1. Open budget page | Itemized list with categories | ⬜ |
| B3 | Edit Quantity | 1. Select item 2. Change quantity | Amount recalculated | ⬜ |
| B4 | Edit Rate | 1. Select item 2. Change rate | Total recalculated with GST | ⬜ |
| B5 | Approve Item | 1. Click approve on item | Status changed to approved | ⬜ |
| B6 | Bulk Approve | 1. Select category 2. Click "Approve All" | All items in category approved | ⬜ |
| B7 | Auto-assign Vendors | 1. Click "Auto-assign Vendors" | Best vendors matched to items | ⬜ |
| B8 | Export Excel | 1. Click "Export Excel" | XLSX file downloads | ⬜ |
| B9 | Export PDF | 1. Click "Export PDF" | PDF quote downloads | ⬜ |
| B10 | Budget Summary | 1. View summary section | Total, GST, Grand Total correct | ⬜ |

### Vendor Finder Flow Tests

| # | Test Case | Steps | Expected Result | Status |
|---|-----------|-------|-----------------|--------|
| V1 | View Vendor Matches | 1. Open budget item 2. View matches | Matched vendors listed with scores | ⬜ |
| V2 | Filter by Category | 1. Open vendor list 2. Select category | Only matching vendors shown | ⬜ |
| V3 | Filter by City | 1. Select city filter | Only vendors in city shown | ⬜ |
| V4 | Select Vendor | 1. Choose vendor for item 2. Confirm | Vendor assigned to item | ⬜ |
| V5 | Add Curated Vendor | 1. Click "Add Vendor" 2. Fill form | New vendor in list | ⬜ |
| V6 | View Vendor Details | 1. Click on vendor | Details modal opens | ⬜ |

### Cross-Cutting Tests

| # | Test Case | Steps | Expected Result | Status |
|---|-----------|-------|-----------------|--------|
| X1 | Real-time Notifications | 1. Open 2 tabs 2. Complete action in tab 1 | Notification in tab 2 | ⬜ |
| X2 | Image Loading | 1. Navigate through phases | All images load correctly | ⬜ |
| X3 | Cost Tracking | 1. Perform API operations 2. Check api_logs | Costs recorded accurately | ⬜ |
| X4 | Breadcrumb Navigation | 1. Navigate deep into room 2. Click breadcrumb | Returns to correct page | ⬜ |
| X5 | Mobile Responsive | 1. Open on mobile 2. Navigate app | All features accessible | ⬜ |
| X6 | Keyboard Shortcuts | 1. Press Cmd+K | Global search opens | ⬜ |
| X7 | Error Boundary | 1. Force error 2. Observe | Error page with recovery options | ⬜ |
| X8 | Network Offline | 1. Go offline 2. Try action | Offline message shown | ⬜ |

---

## 3. API Integration Tests

### Vision AI (GPT-4 Vision)

| # | Test Case | Expected Result | Status |
|---|-----------|-----------------|--------|
| API1 | Room Analysis | Returns dimensions, features, styles | ⬜ |
| API2 | Invalid Image | Returns appropriate error | ⬜ |
| API3 | Rate Limit | Respects OpenRouter limits | ⬜ |

### Image Processing

| # | Test Case | Expected Result | Status |
|---|-----------|-----------------|--------|
| API4 | Furniture Removal | Clean image without furniture | ⬜ |
| API5 | Large Image | Handles images > 5MB | ⬜ |
| API6 | Processing Timeout | Retries on timeout | ⬜ |

### Render Generation

| # | Test Case | Expected Result | Status |
|---|-----------|-----------------|--------|
| API7 | Generate Render | High-quality styled image | ⬜ |
| API8 | Style Consistency | Output matches selected style | ⬜ |
| API9 | Failed Generation | Graceful error with retry | ⬜ |

### Budget Generation

| # | Test Case | Expected Result | Status |
|---|-----------|-----------------|--------|
| API10 | Extract Materials | BOQ items from render | ⬜ |
| API11 | Price Calculation | Correct rates applied | ⬜ |
| API12 | City Multiplier | Prices adjusted by city | ⬜ |

---

## 4. Performance Tests

### Load Times

| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| Initial page load | < 2s | | ⬜ |
| Dashboard load | < 1s | | ⬜ |
| Projects list | < 1s | | ⬜ |
| Project detail | < 1.5s | | ⬜ |
| Room detail | < 1.5s | | ⬜ |
| Image upload | < 10s | | ⬜ |

### API Response Times

| Operation | Target | Actual | Status |
|-----------|--------|--------|--------|
| Room analysis | < 30s | | ⬜ |
| Image cleaning | < 60s | | ⬜ |
| Render generation | < 90s | | ⬜ |
| Budget generation | < 30s | | ⬜ |
| Database queries | < 500ms | | ⬜ |

### Concurrency

| Test | Target | Status |
|------|--------|--------|
| 10 concurrent users | No errors | ⬜ |
| Real-time sync | No storms | ⬜ |
| Job queue processing | Sequential | ⬜ |

---

## 5. Edge Cases

| # | Scenario | Expected Behavior | Status |
|---|----------|-------------------|--------|
| E1 | Corrupt image upload | Error message, no crash | ⬜ |
| E2 | API call fails | Toast with retry option | ⬜ |
| E3 | Delete room mid-processing | Job cancelled gracefully | ⬜ |
| E4 | Project with 0 rooms | Empty state shown | ⬜ |
| E5 | Budget with 0 items | "Generate Budget" CTA | ⬜ |
| E6 | No vendors match | "No vendors found" message | ⬜ |
| E7 | User goes offline | Offline indicator shown | ⬜ |
| E8 | Very long project name | Truncated with ellipsis | ⬜ |
| E9 | Special characters in input | Properly escaped | ⬜ |
| E10 | Duplicate room names | Handled or prevented | ⬜ |

---

## 6. Browser Compatibility

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | Latest | ⬜ |
| Safari | Latest | ⬜ |
| Firefox | Latest | ⬜ |
| Edge | Latest | ⬜ |
| Chrome Mobile | Latest | ⬜ |
| Safari iOS | Latest | ⬜ |

---

## 7. Accessibility Tests

| Test | Tool | Status |
|------|------|--------|
| Keyboard navigation | Manual | ⬜ |
| Screen reader (VoiceOver) | macOS | ⬜ |
| Color contrast | Lighthouse | ⬜ |
| Focus indicators | Manual | ⬜ |
| ARIA labels | Axe DevTools | ⬜ |

---

## 8. Security Tests

| Test | Description | Status |
|------|-------------|--------|
| RLS policies | Verify users can't access others' data | ⬜ |
| SQL injection | Test form inputs | ⬜ |
| XSS prevention | Test text inputs | ⬜ |
| CSRF protection | Verify tokens | ⬜ |
| Auth bypass | Try direct API calls | ⬜ |

---

## 9. Bug Tracking

### Critical Bugs (Block Launch)

| ID | Description | Steps to Reproduce | Assigned | Status |
|----|-------------|--------------------|----------|--------|
| | | | | |

### High Priority Bugs

| ID | Description | Steps to Reproduce | Assigned | Status |
|----|-------------|--------------------|----------|--------|
| | | | | |

### Medium/Low Priority Bugs

| ID | Description | Steps to Reproduce | Assigned | Status |
|----|-------------|--------------------|----------|--------|
| | | | | |

---

## 10. Sign-off

| Role | Name | Date | Signature |
|------|------|------|-----------|
| QA Lead | | | |
| Dev Lead | | | |
| Product Owner | | | |

---

## Notes

- Run all tests before each production deployment
- Document any new edge cases discovered
- Update test data periodically to match production scenarios
- Enable leaked password protection in Supabase Auth settings
