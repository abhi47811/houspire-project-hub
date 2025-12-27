# Production Deployment Checklist

## 1. Production Environment

### API Keys Verification
- [ ] `REPLICATE_API_KEY` - Production key configured
- [ ] `OPENROUTER_API_KEY` - Production key configured  
- [ ] `GOOGLE_AI_API_KEY` - Production key configured
- [ ] All keys tested with production endpoints

### Supabase Configuration
- [ ] Production project created (separate from development)
- [ ] All migrations applied successfully
- [ ] RLS policies verified and tested
- [ ] Edge functions deployed
- [ ] Storage buckets configured with proper policies

### Domain & SSL
- [ ] Custom domain configured in Lovable settings
- [ ] DNS records pointing correctly (A record to 185.158.133.1)
- [ ] SSL certificate provisioned automatically
- [ ] Both root and www subdomain configured
- [ ] HTTPS enforced for all traffic

### CDN & Performance
- [ ] Images served through Supabase Storage CDN
- [ ] Static assets cached properly
- [ ] Gzip compression enabled
- [ ] Browser caching headers set

---

## 2. Backup Strategy

### Database Backups
- [ ] Point-in-time recovery enabled in Supabase
- [ ] Daily automated backups configured
- [ ] Backup retention: 30 days minimum
- [ ] Weekly backup verification scheduled

### Backup Locations
| Backup Type | Location | Frequency | Retention |
|-------------|----------|-----------|-----------|
| Database | Supabase PITR | Continuous | 7 days |
| Database Snapshots | Supabase | Daily | 30 days |
| Storage (Images) | Supabase Storage | Real-time | Indefinite |
| Code | GitHub | On push | Indefinite |

### Restore Procedure
1. **Navigate to Lovable Cloud settings**
2. **Access Database → Backups section**
3. **Select restore point** (timestamp before issue)
4. **Initiate restore** (creates new database state)
5. **Verify data integrity** after restore
6. **Test application functionality**

### Backup Testing Schedule
- Monthly: Test database restore to staging
- Quarterly: Full disaster recovery drill
- Document results in backup log

---

## 3. Disaster Recovery

### Rollback Procedure

#### Code Rollback
1. Go to Project Settings → History in Lovable
2. Select previous working version
3. Click "Restore this version"
4. Verify application functionality
5. Edge functions auto-redeploy with restored code

#### Database Rollback
1. Access Lovable Cloud → Database → Backups
2. Select point-in-time before incident
3. Initiate restore
4. Update any dependent services
5. Verify data integrity

### Emergency Runbook

#### Issue: Application Down
1. Check Lovable status page
2. Verify DNS configuration
3. Check edge function logs for errors
4. Review recent deployments
5. Rollback if recent change caused issue

#### Issue: Database Connection Failed
1. Check Cloud instance status
2. Verify connection limits not exceeded
3. Review database logs for errors
4. Check RLS policies for blocking queries
5. Contact support if infrastructure issue

#### Issue: High API Costs
1. Check `api_logs` table for spike source
2. Identify problematic project/user
3. Temporarily disable affected feature
4. Review and optimize API calls
5. Set up cost alerts for future

#### Issue: Security Breach
1. Immediately rotate all API keys
2. Review access logs for unauthorized access
3. Check for data exfiltration
4. Notify affected users if required
5. Document incident and remediation
6. Conduct post-mortem

### Recovery Time Objectives (RTO)
| Scenario | Target RTO | Procedure |
|----------|------------|-----------|
| Code issue | 5 minutes | Rollback to previous version |
| Database corruption | 30 minutes | Point-in-time restore |
| Full outage | 1 hour | New deployment + restore |
| Security incident | 2 hours | Full audit + remediation |

---

## 4. Team Training

### Training Sessions

#### Session 1: Platform Overview (All Roles)
- [ ] Application architecture explanation
- [ ] Navigation and common UI patterns
- [ ] Login/authentication process
- [ ] Notification system
- [ ] Keyboard shortcuts (Ctrl+K for search)

#### Session 2: Admin Role Training
- [ ] Dashboard overview and metrics
- [ ] Creating new projects
- [ ] Assigning team members to projects
- [ ] Managing user accounts and roles
- [ ] Viewing analytics and API costs
- [ ] Vendor management
- [ ] Pricing configuration

#### Session 3: Renderer Role Training
- [ ] Understanding the 5-phase workflow
- [ ] Phase 1: Uploading room images
- [ ] Phase 2: Reviewing AI analysis
- [ ] Phase 3: Cleaning images
- [ ] Phase 4: Customizing design styles
- [ ] Phase 5: Generating final renders
- [ ] Using bulk operations
- [ ] Handling failed jobs

#### Session 4: Budgeter Role Training
- [ ] Accessing project budgets
- [ ] Understanding budget categories
- [ ] Editing budget items
- [ ] Applying GST calculations
- [ ] Assigning vendors to items
- [ ] Approving budget categories

#### Session 5: Vendor Finder Training
- [ ] Understanding vendor matching algorithm
- [ ] Adding new vendors
- [ ] Verifying vendor information
- [ ] Setting pricing agreements
- [ ] Using auto-assign feature

### Training Materials Provided
- [ ] User guides in `/docs` folder
- [ ] Video recordings of sessions
- [ ] Quick reference cards
- [ ] FAQ document
- [ ] Troubleshooting guide access

---

## 5. Soft Launch Plan

### Week 1: Internal Testing
- [ ] All team members use platform daily
- [ ] Document any issues found
- [ ] Fix critical bugs immediately
- [ ] Optimize based on feedback

### Week 2: Pilot Projects (1-2)
- [ ] Select 2 real but low-risk projects
- [ ] Assign experienced renderer
- [ ] Monitor all phases closely
- [ ] Daily check-ins with team
- [ ] Document any issues

### Week 3: Expanded Pilot (3-5)
- [ ] Add 3 more projects
- [ ] Different room types tested
- [ ] Multiple renderers involved
- [ ] Track completion times
- [ ] Gather client feedback

### Success Criteria for Full Launch
- [ ] No critical bugs in 7 days
- [ ] Projects completing within SLA
- [ ] API costs within budget
- [ ] Positive user feedback (>80%)
- [ ] All team members comfortable

### Feedback Collection
- Daily standup for issue reporting
- Weekly retrospective meetings
- User satisfaction surveys
- Performance metrics review

---

## 6. Final Launch Checklist

### Technical Readiness
- [ ] All automated tests passing
- [ ] Manual QA completed for all flows
- [ ] Load testing completed (10+ concurrent users)
- [ ] Security audit completed and issues resolved
- [ ] Performance optimized (page load < 3s)

### Documentation Complete
- [ ] Admin user guide finalized
- [ ] Renderer user guide finalized
- [ ] Budgeter user guide finalized
- [ ] Vendor finder guide finalized
- [ ] Technical API documentation complete
- [ ] Database schema documented
- [ ] Troubleshooting guide ready

### Monitoring Configured
- [ ] Error tracking active
- [ ] Uptime monitoring configured
- [ ] API cost alerts set
- [ ] Performance monitoring active
- [ ] Business metrics dashboard ready

### Operational Readiness
- [ ] Team fully trained
- [ ] Support process defined
- [ ] Escalation path documented
- [ ] On-call schedule created
- [ ] Communication channels set up

### Backup & Recovery
- [ ] Backup system verified
- [ ] Restore procedure tested
- [ ] Disaster recovery plan documented
- [ ] Rollback procedure tested

### Business Readiness
- [ ] Pricing finalized
- [ ] Client contracts ready
- [ ] Billing system configured
- [ ] SLA documents prepared

---

## 7. Post-Launch Monitoring

### Day 1 Checklist
- [ ] Monitor error rates every hour
- [ ] Check API costs every 2 hours
- [ ] Verify all jobs completing
- [ ] Respond to any user issues immediately
- [ ] End-of-day status report

### Week 1 Activities
- [ ] Daily error rate review
- [ ] Daily cost monitoring
- [ ] User feedback collection
- [ ] Performance optimization
- [ ] Bug fixes as needed

### Month 1 Goals
- [ ] Establish baseline metrics
- [ ] Identify optimization opportunities
- [ ] Gather feature requests
- [ ] Plan next iteration
- [ ] Calculate ROI

---

## 8. Support Process

### Issue Severity Levels

| Level | Description | Response Time | Resolution Time |
|-------|-------------|---------------|-----------------|
| P1 - Critical | System down, data loss | 15 minutes | 1 hour |
| P2 - High | Major feature broken | 1 hour | 4 hours |
| P3 - Medium | Minor feature issue | 4 hours | 24 hours |
| P4 - Low | Enhancement request | 24 hours | Next sprint |

### Escalation Path
1. **Level 1**: Team lead / Senior renderer
2. **Level 2**: Technical administrator
3. **Level 3**: Development team
4. **Level 4**: External support (Lovable/Supabase)

### Support Channels
- Primary: In-app notification system
- Secondary: Email to support team
- Emergency: Phone call to on-call

---

## 9. Key SQL Queries for Monitoring

### Daily Health Check
```sql
-- Projects created today
SELECT COUNT(*) FROM projects 
WHERE created_at > NOW() - INTERVAL '24 hours';

-- Failed jobs in last hour
SELECT job_type, COUNT(*) FROM job_queue 
WHERE status = 'failed' 
AND created_at > NOW() - INTERVAL '1 hour'
GROUP BY job_type;

-- API costs today
SELECT service, SUM(cost_usd) as total_cost 
FROM api_logs 
WHERE created_at > NOW() - INTERVAL '24 hours'
GROUP BY service
ORDER BY total_cost DESC;
```

### Weekly Report Query
```sql
SELECT 
  DATE_TRUNC('day', created_at) as date,
  COUNT(*) as projects_created,
  COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed
FROM projects
WHERE created_at > NOW() - INTERVAL '7 days'
GROUP BY DATE_TRUNC('day', created_at)
ORDER BY date;
```

---

## 10. Launch Day Schedule

| Time | Activity | Owner |
|------|----------|-------|
| 9:00 AM | Final system check | Tech Lead |
| 9:30 AM | Team standup | All |
| 10:00 AM | Go live announcement | Admin |
| 10:15 AM | First projects created | Renderers |
| 12:00 PM | Mid-day check-in | All |
| 3:00 PM | Status review | Tech Lead |
| 5:00 PM | End-of-day summary | Admin |
| 6:00 PM | On-call handoff | Tech Lead |

---

## Contacts

- **Technical Issues**: Review console logs, check edge function logs
- **Database Issues**: Run linter, check RLS policies  
- **API Issues**: Verify secrets, check API key validity
- **Billing Issues**: Contact Lovable support
