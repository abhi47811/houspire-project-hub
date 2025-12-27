# Renderer User Guide

## Overview

As a Renderer, you're responsible for processing room images through the 5-phase workflow. This guide covers every step from upload to final render approval.

---

## Getting Started

### Accessing Your Projects

1. Log in with your credentials
2. Dashboard shows your assigned projects
3. Click a project to view rooms

### Understanding the 5 Phases

| Phase | Name | Description |
|-------|------|-------------|
| 1 | Upload | Upload original room photos |
| 2 | Analyze | AI analyzes room features |
| 3 | Clean | Remove furniture from images |
| 4 | Customize | Select design style and options |
| 5 | Generate | Create photorealistic renders |

---

## Phase 1: Upload Room Images

### Image Requirements

| Requirement | Specification |
|-------------|---------------|
| Format | JPEG, PNG, WebP, HEIC |
| Max Size | 10 MB per image |
| Resolution | Minimum 1920x1080 |
| Quantity | 1 primary image per room |

### Best Practices for Photos

✅ **Do:**
- Take photos in daylight
- Capture full room including ceiling
- Stand in corner for widest angle
- Keep camera level (no tilting)
- Clear clutter before shooting

❌ **Don't:**
- Use flash (creates harsh shadows)
- Take partial room shots
- Include people or pets
- Use heavy filters
- Shoot in low light

### Uploading Images

1. Navigate to room detail page
2. Click **"Upload Image"** or drag-and-drop
3. Wait for upload progress (shows percentage)
4. Verify image appears correctly
5. Click **"Complete Upload"** to proceed

### Uploading Multiple Rooms

Use bulk upload for efficiency:

1. Go to project page
2. Click **"Add Rooms"**
3. Enter number of rooms (max 7)
4. Upload images for each room
5. All uploads process in parallel

---

## Phase 2: Analyze Rooms

### Starting Analysis

1. Room must have Phase 1 completed
2. Click **"Analyze Room"** button
3. AI processes image (15-30 seconds)
4. Results appear automatically

### Understanding Analysis Results

The AI detects:

- **Dimensions**: Estimated length × width × height
- **Windows**: Count and positions
- **Doors**: Count and positions
- **Outlets**: Electrical outlet count
- **Features**: Ceiling fans, beams, alcoves
- **Suggested Styles**: AI-recommended design styles

### Verifying Measurements

1. Review detected dimensions
2. Compare against actual measurements if known
3. **Edit** any incorrect values
4. Check window/door counts
5. Click **"Approve Analysis"**

### Bulk Analysis

For multiple rooms:

1. Go to project page
2. Click **"Analyze All Rooms"**
3. Jobs queue automatically
4. Monitor progress in job indicator
5. Review each when complete

### Bulk Approval

When all analyses look correct:

1. Click **"Approve All Analysis"** button
2. Confirm in dialog
3. All rooms advance to Phase 3

---

## Phase 3: Clean Images

### What Cleaning Does

The AI removes:
- Existing furniture
- Decorations and art
- Personal items
- Clutter

It preserves:
- Walls and floors
- Windows and doors
- Built-in features
- Architectural elements

### Starting Cleanup

1. Room must have approved analysis
2. Click **"Clean Room"** button
3. AI processes image (30-60 seconds)
4. Compare original vs cleaned

### Reviewing Cleaned Images

Use the image comparison slider:

1. Drag slider left/right to compare
2. Check architectural elements preserved:
   - ✅ Windows intact
   - ✅ Doors intact
   - ✅ Flooring consistent
   - ✅ Wall colors correct
3. Look for artifacts or errors

### Quality Standards

| Check | Pass | Fail |
|-------|------|------|
| Windows visible | Clear glass, frames intact | Missing or distorted |
| Floors | Consistent pattern | Patchy or missing areas |
| Walls | Smooth, correct color | Smudges or wrong color |
| Corners | Sharp edges | Blurred or warped |

### Handling Failed Cleanups

If cleaning quality is poor:

1. Click **"Retry Cleanup"**
2. System uses fallback model
3. If still poor, contact admin

### Approving Cleaned Images

1. Verify all quality checks pass
2. Click **"Approve Cleaning"**
3. Room advances to Phase 4

---

## Phase 4: Customize Design

### Selecting Design Style

Choose from available styles:

| Style | Best For |
|-------|----------|
| Modern Minimalist | Young professionals, small spaces |
| Contemporary Indian | Traditional meets modern |
| Scandinavian | Bright, airy preferences |
| Industrial | Lofts, creative spaces |
| Traditional | Heritage homes, older clients |
| Bohemian | Artistic, eclectic tastes |
| Art Deco | Luxury, statement spaces |
| Japandi | Zen, mindful living |

### Using Smart Defaults

Smart defaults pre-configure options based on room type:

1. Select room type (Living Room, Bedroom, etc.)
2. System loads appropriate defaults
3. Customize further if needed

### Copying Settings Between Rooms

1. Open source room with desired settings
2. Click **"Copy Settings"** button
3. Select target rooms
4. Choose what to copy:
   - ✅ Design style
   - ✅ Color preferences
   - ✅ Special requirements
5. Click **"Apply"**

### Applying Style to All Rooms

For consistent styling:

1. Configure one room fully
2. Click **"Apply Style to All"**
3. Select design style
4. Confirm application
5. All rooms update instantly

### Completing Customization

1. Review all settings
2. Click **"Complete Customization"**
3. Room ready for Phase 5

---

## Phase 5: Generate Renders

### Starting Generation

1. Room must have completed Phase 4
2. Click **"Generate Render"** button
3. AI creates photorealistic image (60-90 seconds)
4. Result appears when complete

### Quality Assessment

AI automatically scores renders:

| Score | Meaning | Action |
|-------|---------|--------|
| 90-100 | Excellent | Approve |
| 70-89 | Good | Review, likely approve |
| 50-69 | Acceptable | Review carefully |
| Below 50 | Poor | Retry or adjust settings |

### What to Check

1. **Furniture proportions**: Appropriate for room size
2. **Style consistency**: Matches selected design
3. **Lighting**: Natural and realistic
4. **Empty spaces**: No floating objects
5. **Wall/floor**: Clean transitions

### Regenerating Renders

If quality is insufficient:

1. Click **"Regenerate"**
2. Optionally adjust prompt/style
3. New render generates
4. Compare versions
5. Select best one

### Approving Final Renders

1. Confirm render meets quality standards
2. Click **"Approve Render"**
3. Room marked as complete
4. Moves to budget generation

---

## Bulk Operations

### Select All Rooms

1. Go to project page
2. Click checkbox in header
3. All rooms selected
4. Bulk action buttons appear

### Available Bulk Actions

| Action | Phases | Effect |
|--------|--------|--------|
| Analyze All | 1→2 | Queue analysis for all rooms |
| Approve All Analysis | 2 | Approve all analyses |
| Clean All | 2→3 | Queue cleaning for all rooms |
| Generate All | 4→5 | Queue render generation |
| Apply Style to All | 4 | Set same style on all rooms |

---

## Job Queue & Progress

### Monitoring Jobs

The job progress indicator shows:

- 🟡 Pending: Waiting to start
- 🔵 Processing: Currently running
- 🟢 Completed: Successfully finished
- 🔴 Failed: Error occurred

### Understanding Priorities

Jobs process by priority:

1. Single room requests (immediate)
2. Bulk operations (queued)
3. Retries (after failures)

### Handling Failed Jobs

1. Check error message
2. Common fixes:
   - **Image too dark**: Re-upload better photo
   - **Timeout**: Retry (temporary issue)
   - **Invalid format**: Check image requirements
3. Click **"Retry"** to requeue
4. Contact admin if persists

---

## Notifications

### Types of Notifications

| Icon | Type | Meaning |
|------|------|---------|
| ✅ | Success | Job completed successfully |
| ⚠️ | Warning | Attention needed |
| ❌ | Error | Job failed |
| ℹ️ | Info | General updates |

### Managing Notifications

1. Click bell icon to view all
2. Click notification to navigate
3. Mark as read individually or all
4. Notifications auto-dismiss after 30 days

---

## Tips for Efficiency

### Time-Saving Techniques

1. **Upload all rooms first**: Then batch analyze
2. **Use bulk approval**: When analyses are correct
3. **Copy settings**: Don't configure each room individually
4. **Apply style to all**: For consistent projects
5. **Monitor queue**: Prioritize failed jobs

### Quality Tips

1. **Check originals carefully**: Poor photos = poor results
2. **Verify analyses**: Correct dimensions matter
3. **Review cleaned images**: Catch issues early
4. **Compare renders**: Use the best version
5. **Document issues**: Help improve the system

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Cmd+K` | Global search |
| `←` `→` | Navigate phases |
| `Enter` | Approve current step |
| `Esc` | Close dialogs |
| `Space` | Toggle image comparison |

---

## Troubleshooting

See [Troubleshooting Guide](./TROUBLESHOOTING.md) for common issues.

## Support

Contact your project admin for:
- Access issues
- System errors
- Quality concerns
- Training requests
