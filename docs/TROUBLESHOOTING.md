# Troubleshooting Guide

## Overview

This guide helps resolve common issues. For each problem, find symptoms, likely causes, and solutions.

---

## Quick Diagnostics

### Check System Status

1. **Application Status**: Try loading the app
2. **Auth Status**: Try logging in
3. **Database Status**: Check if data loads
4. **Edge Functions**: Check job processing

### Gather Information

Before troubleshooting, collect:
- Error message (exact text)
- Browser console errors (F12 → Console)
- Network errors (F12 → Network)
- Steps to reproduce

---

## Authentication Issues

### Can't Log In

**Symptoms:**
- "Invalid credentials" error
- Stuck on login page
- Session not persisting

**Solutions:**

1. **Check credentials**
   - Verify email is correct
   - Try password reset
   - Check caps lock

2. **Clear browser data**
   - Clear cookies for this site
   - Clear local storage
   - Try incognito mode

3. **Check email confirmation**
   - Look for confirmation email
   - Check spam folder
   - Resend confirmation

### Session Expires Too Quickly

**Symptoms:**
- Logged out unexpectedly
- "Session expired" messages

**Solutions:**

1. **Check browser settings**
   - Cookies must be enabled
   - Third-party cookies needed

2. **Network issues**
   - Stable connection required
   - VPN may cause issues

### Password Reset Not Working

**Symptoms:**
- No reset email received
- Reset link expired

**Solutions:**

1. Check spam/junk folder
2. Wait 5 minutes and retry
3. Contact admin to reset manually

---

## Project & Room Issues

### Can't Create Project

**Symptoms:**
- Create button disabled
- Error on save
- Form validation errors

**Solutions:**

1. **Fill required fields**
   - Project name required
   - City must be selected

2. **Check permissions**
   - Must be logged in
   - Active account required

### Room Not Saving

**Symptoms:**
- Changes lost after refresh
- Save errors

**Solutions:**

1. **Check network connection**
2. **Refresh and retry**
3. **Check browser console for errors**

### Maximum Rooms Reached

**Symptoms:**
- "Maximum 7 rooms" error
- Can't add more rooms

**Solutions:**

1. Delete unused rooms
2. Request limit increase (admin)
3. Create new project for additional rooms

---

## Image Upload Issues

### Upload Fails

**Symptoms:**
- Upload stuck at percentage
- "Upload failed" error
- Timeout errors

**Solutions:**

1. **Check file requirements**
   - Max 10MB
   - JPEG, PNG, WebP, HEIC only
   - Minimum 1920x1080 resolution

2. **Try smaller file**
   - Compress image
   - Reduce resolution

3. **Network issues**
   - Check internet speed
   - Try on different network
   - Disable VPN temporarily

### Image Not Displaying

**Symptoms:**
- Broken image icon
- "Failed to load" message

**Solutions:**

1. **Refresh page**
2. **Clear browser cache**
3. **Re-upload image**

---

## AI Processing Issues

### Analysis Not Starting

**Symptoms:**
- "Analyze" button does nothing
- Job not appearing in queue

**Solutions:**

1. **Verify image uploaded**
   - Check Phase 1 completed

2. **Check job queue**
   - May be queued behind others
   - Wait for processing

3. **Refresh and retry**

### Analysis Taking Too Long

**Symptoms:**
- Stuck on "Processing" for > 2 minutes
- No progress updates

**Solutions:**

1. **Check job status**
   - May be retrying
   - View in job queue

2. **Cancel and retry**
   - Cancel stuck job
   - Re-submit analysis

### Analysis Results Wrong

**Symptoms:**
- Incorrect dimensions
- Wrong room type detected
- Missing features

**Solutions:**

1. **Upload better photo**
   - Better lighting
   - Full room visible
   - No obstructions

2. **Edit results manually**
   - Correct dimensions
   - Update feature counts
   - Approve after corrections

---

## Cleaning Issues

### Cleaning Produces Artifacts

**Symptoms:**
- Blurry areas
- Missing walls
- Strange patterns

**Solutions:**

1. **Retry with fallback model**
   - Click "Retry Cleanup"
   - Uses alternative AI model

2. **Check original image**
   - Low quality input = low quality output
   - Re-upload better image

3. **Manual adjustment**
   - Use image editor
   - Re-upload edited version

### Cleaning Removes Too Much

**Symptoms:**
- Windows removed
- Doors missing
- Architectural features gone

**Solutions:**

1. **Report issue**
   - Note what was incorrectly removed
   - Contact admin

2. **Retry cleanup**
   - Different result possible
   - Try up to 3 times

---

## Render Generation Issues

### Render Not Generating

**Symptoms:**
- Stuck on generation
- "Generation failed" error

**Solutions:**

1. **Check prerequisites**
   - Cleaned image approved
   - Style selected
   - Phase 4 completed

2. **Check API credits**
   - May be rate limited
   - Wait and retry

3. **Simplify prompt**
   - Less complex style
   - Fewer requirements

### Render Quality Poor

**Symptoms:**
- Low resolution
- Wrong style
- Proportions off

**Solutions:**

1. **Regenerate**
   - Different seed = different result
   - Try 2-3 times

2. **Adjust settings**
   - Different style
   - More specific requirements

3. **Check cleaned image**
   - Quality issues propagate
   - Re-clean if needed

---

## Budget Issues

### Budget Not Generating

**Symptoms:**
- Generate button disabled
- "No renders found" error

**Solutions:**

1. **Complete all renders**
   - All rooms must have Phase 5 done
   - All renders must be approved

2. **Set project city**
   - City required for pricing
   - Update in project settings

### Wrong Prices

**Symptoms:**
- Prices too high/low
- Wrong city multiplier

**Solutions:**

1. **Check city setting**
   - Verify project city is correct

2. **Update pricing reference**
   - Admin can update base rates
   - Check for outdated prices

3. **Edit manually**
   - Adjust individual item rates
   - Override as needed

### Missing Items

**Symptoms:**
- Expected items not in budget
- Incomplete list

**Solutions:**

1. **Re-generate budget**
   - Delete existing items
   - Generate fresh

2. **Add manually**
   - Click "Add Item"
   - Enter details

---

## Vendor Matching Issues

### No Vendors Found

**Symptoms:**
- Empty vendor list
- "No matches" message

**Solutions:**

1. **Check vendor database**
   - May need to add vendors for category
   - Check city coverage

2. **Expand search criteria**
   - Include nearby cities
   - Broader categories

### Wrong Vendor Suggestions

**Symptoms:**
- Low match scores
- Irrelevant vendors

**Solutions:**

1. **Update item categories**
   - Ensure correct category selected

2. **Update vendor data**
   - Verify vendor categories accurate
   - Update city information

---

## Performance Issues

### Slow Loading

**Symptoms:**
- Pages take > 3 seconds
- Spinner shows long time

**Solutions:**

1. **Check network connection**
   - Run speed test
   - Try different network

2. **Clear browser cache**
   - Old cached data may slow things

3. **Reduce data**
   - Archive old projects
   - Delete unused images

### Browser Freezing

**Symptoms:**
- Tab becomes unresponsive
- Browser crashes

**Solutions:**

1. **Use modern browser**
   - Chrome, Firefox, Safari recommended
   - Keep updated

2. **Close other tabs**
   - Free up memory

3. **Disable extensions**
   - Some extensions interfere

---

## Mobile Issues

### Touch Not Responding

**Symptoms:**
- Buttons hard to tap
- Gestures not working

**Solutions:**

1. **Use larger targets**
   - Zoom in slightly
   - Use buttons not links

2. **Update browser**
   - Mobile browser updates fix issues

### Layout Broken

**Symptoms:**
- Overlapping elements
- Content cut off

**Solutions:**

1. **Rotate device**
   - Try landscape/portrait

2. **Clear cache**
   - Force refresh page

3. **Report bug**
   - Screenshot the issue
   - Note device and browser

---

## Common Error Messages

### "Network Error"

**Cause:** Internet connection issue

**Solution:**
1. Check internet connection
2. Refresh page
3. Try again in a few minutes

### "Unauthorized"

**Cause:** Session expired or permissions issue

**Solution:**
1. Log out and log back in
2. Verify you have access
3. Contact admin if persists

### "Rate Limited"

**Cause:** Too many requests

**Solution:**
1. Wait 1-5 minutes
2. Retry operation
3. Reduce parallel operations

### "Internal Server Error"

**Cause:** Backend issue

**Solution:**
1. Wait and retry
2. Try simpler operation
3. Report if persists

### "File Too Large"

**Cause:** Image exceeds 10MB limit

**Solution:**
1. Compress image
2. Reduce dimensions
3. Use different format

### "Invalid Image Format"

**Cause:** Unsupported file type

**Solution:**
1. Convert to JPEG or PNG
2. Save as WebP
3. Don't use GIF or BMP

---

## How to Retry Failed Jobs

1. Go to project page
2. Find failed job in queue
3. Click "Retry" button
4. Job re-queues with higher priority
5. Monitor for completion

**If retries keep failing:**
1. Check original image quality
2. Try different settings
3. Contact admin for help

---

## When to Contact Support

Contact support when:
- Issue persists after troubleshooting
- Error messages are unclear
- Data appears lost or corrupted
- Security concerns
- Billing questions

**How to contact:**
- Email: support@example.com
- In-app: Click help icon
- Response time: 24-48 hours

**Include in your request:**
1. Exact error message
2. Steps to reproduce
3. Screenshots
4. Browser and device info
5. Account email

---

## Emergency Procedures

### Data Loss Suspected

1. Stop making changes immediately
2. Note what data is missing
3. Contact support urgently
4. Do not delete or modify anything

### Security Concern

1. Change password immediately
2. Log out all sessions
3. Contact admin
4. Document suspicious activity

### System Down

1. Check status page
2. Try again in 5-10 minutes
3. Use alternative browser/device
4. Report if extended outage

---

## Useful Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Cmd+R` | Refresh page |
| `Cmd+Shift+R` | Hard refresh (clear cache) |
| `F12` | Open developer tools |
| `Cmd+K` | Open search |
| `Esc` | Close dialogs |

---

## Browser Compatibility

### Supported Browsers

| Browser | Minimum Version |
|---------|-----------------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |

### Known Issues

- **Internet Explorer**: Not supported
- **Old Safari**: May have layout issues
- **Opera Mini**: Limited functionality

---

## FAQs

**Q: Can I undo changes?**
A: Most changes can be undone by editing. For major issues, contact support.

**Q: Why is processing slow?**
A: AI operations take time. Complex images take longer.

**Q: How long are images stored?**
A: Images are retained for the project lifetime. Deleted projects remove images.

**Q: Can I use the app offline?**
A: No, internet connection is required for all features.

**Q: Is my data secure?**
A: Yes, all data is encrypted and access is controlled by permissions.
