# Production Deployment Checklist

## Environment Configuration

### Supabase Secrets (Configured)
- [x] `LOVABLE_API_KEY` - Auto-configured by Lovable Cloud
- [x] `REPLICATE_API_KEY` - For image processing (LaMa Cleaner, rendering)
- [x] `OPENROUTER_API_KEY` - For AI analysis and generation
- [x] `GOOGLE_AI_API_KEY` - For Gemini Vision API

### Frontend Environment (Auto-configured)
- [x] `VITE_SUPABASE_URL` - Supabase project URL
- [x] `VITE_SUPABASE_PUBLISHABLE_KEY` - Supabase anon key
- [x] `VITE_SUPABASE_PROJECT_ID` - Project identifier

---

## Security Configuration

### Row Level Security (RLS)
All tables have RLS enabled with appropriate policies:

- [x] `projects` - Users can only access their own or assigned projects
- [x] `rooms` - Access through project ownership
- [x] `room_images` - Access through room/project ownership
- [x] `room_analysis` - Access through room/project ownership
- [x] `budget_items` - Access through project ownership
- [x] `vendors` - Public read, admin write
- [x] `vendor_matches` - Access through budget item/project ownership
- [x] `smart_defaults` - Public read, admin write
- [x] `pricing_reference` - Public read, admin write
- [x] `profiles` - Users can only access their own profile
- [x] `notifications` - Users can only see their own notifications
- [x] `job_queue` - Access through project ownership
- [x] `bulk_operations` - Access through project ownership
- [x] `api_logs` - Users can view logs for their projects
- [x] `user_sessions` - Users manage their own sessions
- [x] `change_events` - Access through project ownership
- [x] `optimistic_updates` - Users manage their own updates

### Storage Policies
- [x] `room-images` bucket - Authenticated users can upload/view/delete images for their projects
- [x] Admin override for all storage operations

---

## Deployment Testing Checklist

### User Flow Testing

#### Admin Role
- [ ] Can view all projects in dashboard
- [ ] Can assign renderers to projects
- [ ] Can manage team members
- [ ] Can view all API costs and logs
- [ ] Can access admin settings
- [ ] Can approve bulk operations

#### Renderer Role
- [ ] Can see only assigned projects
- [ ] Can upload room images (Phase 1)
- [ ] Can run AI analysis (Phase 2)
- [ ] Can clean images (Phase 3)
- [ ] Can customize design (Phase 4)
- [ ] Can generate renders (Phase 5)
- [ ] Can view job progress
- [ ] Receives notifications on completion

#### Budgeter Role
- [ ] Can view project budgets
- [ ] Can edit budget items
- [ ] Can approve budget categories
- [ ] Can see vendor recommendations

#### Vendor Finder Role
- [ ] Can access vendor matching page
- [ ] Can filter and sort vendors
- [ ] Can assign vendors to budget items
- [ ] Can run auto-assign for all items

### API Integration Testing
- [ ] Vision AI analysis returns room measurements
- [ ] Image cleaning removes furniture properly
- [ ] Render generation produces quality output
- [ ] API costs are logged correctly
- [ ] Error handling shows user-friendly messages

### Image Upload/Download
- [ ] Can upload multiple images per room
- [ ] Progress indicator shows during upload
- [ ] Images display correctly in viewer
- [ ] Can download original and processed images
- [ ] Image cleanup on room deletion

### Bulk Operations
- [ ] "Approve All Analysis" works for all rooms
- [ ] "Apply Style to All" updates all rooms
- [ ] "Approve All Budget Items" processes correctly
- [ ] "Auto Assign Vendors" finds best matches
- [ ] Progress shows accurate counts
- [ ] Notifications sent on completion

### Real-time Updates
- [ ] Job status updates in real-time
- [ ] Notifications appear without refresh
- [ ] Multiple users see consistent data
- [ ] Session tracking works correctly
- [ ] Debouncing prevents excessive updates

### Mobile Responsiveness
- [ ] Dashboard adapts to mobile
- [ ] Sidebar collapses on small screens
- [ ] Image upload works on mobile
- [ ] Forms are usable on touch devices
- [ ] Tables scroll horizontally

---

## Performance Testing

### Load Testing Targets
- [ ] 10+ concurrent users without degradation
- [ ] Image uploads < 5 seconds (5MB file)
- [ ] API responses < 2 seconds
- [ ] Real-time updates < 500ms latency
- [ ] Page load < 3 seconds

### Database Optimization
- [ ] Indexes on frequently queried columns
- [ ] Connection pooling configured
- [ ] Query performance monitored
- [ ] No N+1 query issues

---

## Monitoring & Alerting

### Error Tracking
Set up monitoring for:
- [ ] Frontend JavaScript errors
- [ ] Edge function failures
- [ ] Database connection issues
- [ ] Storage upload failures

### API Cost Monitoring
Query to check daily costs:
```sql
SELECT 
  DATE(created_at) as date,
  service,
  SUM(cost_usd) as total_cost,
  COUNT(*) as call_count
FROM api_logs
WHERE created_at > NOW() - INTERVAL '7 days'
GROUP BY DATE(created_at), service
ORDER BY date DESC, total_cost DESC;
```

### Failed Jobs Alert
Query for failed jobs:
```sql
SELECT 
  job_type,
  COUNT(*) as failed_count,
  MAX(created_at) as last_failure
FROM job_queue
WHERE status = 'failed'
  AND created_at > NOW() - INTERVAL '1 hour'
GROUP BY job_type
HAVING COUNT(*) > 5;
```

### Alert Thresholds
- [ ] Failed jobs: > 5 failures/hour → Alert
- [ ] API costs: > ₹1000/day → Warning
- [ ] API costs: > ₹5000/day → Critical
- [ ] Database errors: Any → Alert
- [ ] Storage full: > 80% → Warning

---

## Backup & Recovery

### Database Backups
- [ ] Daily automated backups enabled
- [ ] Point-in-time recovery configured
- [ ] Backup retention: 7 days minimum
- [ ] Tested restore procedure

### Storage Backups
- [ ] Room images backed up daily
- [ ] Cross-region replication (optional)
- [ ] Verified restoration process

---

## Weekly Reports

### Project Metrics Query
```sql
SELECT 
  DATE_TRUNC('week', created_at) as week,
  COUNT(*) as projects_created,
  COUNT(CASE WHEN status = 'completed' THEN 1 END) as projects_completed,
  ROUND(
    COUNT(CASE WHEN status = 'completed' THEN 1 END)::numeric / 
    NULLIF(COUNT(*), 0) * 100, 2
  ) as completion_rate
FROM projects
WHERE created_at > NOW() - INTERVAL '4 weeks'
GROUP BY DATE_TRUNC('week', created_at)
ORDER BY week DESC;
```

### User Activity Query
```sql
SELECT 
  p.role,
  COUNT(DISTINCT s.user_id) as active_users,
  AVG(EXTRACT(EPOCH FROM (s.last_active_at - s.session_started_at))) / 60 as avg_session_minutes
FROM user_sessions s
JOIN profiles p ON p.id = s.user_id
WHERE s.created_at > NOW() - INTERVAL '7 days'
GROUP BY p.role;
```

---

## Go-Live Checklist

### Final Verification
- [ ] All test cases passed
- [ ] No console errors in production build
- [ ] All API keys configured and tested
- [ ] Storage policies verified
- [ ] RLS policies verified
- [ ] Mobile testing complete
- [ ] Load testing complete
- [ ] Backup system verified
- [ ] Monitoring alerts configured
- [ ] Team trained on system

### Post-Launch
- [ ] Monitor error rates for 24 hours
- [ ] Check API costs daily for first week
- [ ] Gather user feedback
- [ ] Address critical issues immediately
- [ ] Schedule weekly review meetings

---

## Support Contacts

- **Technical Issues**: Check console logs, edge function logs
- **Database Issues**: Run linter, check RLS policies
- **Storage Issues**: Verify bucket policies, check quotas
- **API Issues**: Check secrets, verify API key validity
