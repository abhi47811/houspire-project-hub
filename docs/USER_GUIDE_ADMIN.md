# Admin User Guide

## Overview

As an Admin, you have full access to manage the interior design automation platform. This guide covers all administrative functions.

---

## Dashboard

### Accessing the Admin Dashboard

1. Log in with your admin credentials
2. You'll be automatically redirected to the admin dashboard
3. The dashboard shows:
   - **Active Projects**: Currently in-progress projects
   - **Pending Approvals**: Items awaiting your review
   - **Team Activity**: Recent actions by team members
   - **API Usage**: Cost tracking for AI services

### Understanding Metrics

| Metric | Description |
|--------|-------------|
| Projects In Progress | Active projects not yet completed |
| Rooms Processed | Total rooms across all phases |
| Budget Generated | Total value of all budgets |
| API Costs Today | AI service costs for current day |

---

## Project Management

### Creating a New Project

1. Click **"New Project"** button or press `Cmd+N`
2. Fill in project details:
   - **Project Name**: Unique identifier (e.g., "Kumar Residence - 3BHK")
   - **Client Name**: Full client name
   - **Client Email**: For notifications
   - **City**: Select from available cities (affects pricing)
   - **Deadline**: Expected completion date
   - **Estimated Budget**: Client's budget range
3. Click **"Create Project"**

### Assigning Projects to Renderers

1. Open the project detail page
2. Click **"Assign Renderer"** dropdown
3. Select a team member with "Renderer" role
4. The renderer will receive a notification

### Project Statuses

| Status | Description |
|--------|-------------|
| Draft | Project created, no work started |
| In Progress | Active work being done |
| Review | Awaiting admin approval |
| Approved | Budget approved, ready for execution |
| Completed | All work finished |
| Cancelled | Project cancelled |

### Approving Completed Projects

1. Navigate to **Projects** → filter by "Review" status
2. Review all rooms have completed Phase 5
3. Check budget has been generated and approved
4. Click **"Approve Project"**
5. Client will be notified (if email configured)

---

## Team Management

### Accessing User Management

1. Go to **Admin** → **Users** tab
2. View all registered users

### User Roles

| Role | Permissions |
|------|-------------|
| Admin | Full access to all features |
| Renderer | Upload images, run analysis, generate renders |
| Budgeter | Generate and edit budgets, assign vendors |
| Vendor Finder | Manage vendor database, match vendors |

### Editing User Roles

1. Find the user in the list
2. Click the role dropdown
3. Select new role
4. Changes take effect immediately

### Deactivating Users

1. Find the user
2. Toggle the "Active" switch to off
3. User will be logged out and cannot access the system

---

## Vendor Management

### Adding New Vendors

1. Go to **Admin** → **Vendors** tab
2. Click **"Add Vendor"**
3. Fill in vendor details:
   - **Business Name**: Official company name
   - **Categories**: Select all applicable (Furniture, Lighting, etc.)
   - **City**: Primary operating city
   - **Contact Info**: Name, phone, email
   - **Pricing**: Discount percentage, minimum order

### Curated Vendors

Curated vendors are preferred suppliers with verified quality.

1. Find vendor in list
2. Toggle **"Curated"** badge
3. Curated vendors appear first in matching

### Vendor Verification

1. Review vendor documentation
2. Verify business registration
3. Check portfolio/references
4. Toggle **"Verified"** status

---

## Pricing Management

### Updating Base Prices

1. Go to **Admin** → **Pricing** tab
2. Find item category
3. Edit base rate
4. Changes apply to new budgets only

### City Multipliers

Different cities have different cost factors:

| City | Multiplier |
|------|------------|
| Mumbai | 1.20x |
| Delhi | 1.15x |
| Bangalore | 1.10x |
| Chennai | 1.05x |
| Pune | 1.05x |
| Hyderabad | 1.00x |
| Kolkata | 0.95x |
| Ahmedabad | 0.90x |
| Jaipur | 0.85x |
| Surat | 0.85x |
| Lucknow | 0.80x |

### Adding New Items

1. Click **"Add Item"**
2. Enter:
   - Item name
   - Category
   - Specification
   - Base rate
   - Unit (nos, sqft, rft, etc.)
3. City multipliers apply automatically

---

## Analytics

### Viewing Reports

1. Go to **Admin** → **Analytics** tab
2. Select date range
3. View metrics:
   - Projects by status
   - Revenue trends
   - API cost breakdown
   - Team productivity

### API Cost Tracking

Monitor AI service usage:

| Service | Typical Cost |
|---------|--------------|
| Room Analysis | $0.01-0.03 |
| Image Cleaning | $0.05-0.10 |
| Render Generation | $0.10-0.20 |
| Budget Itemization | $0.02-0.05 |

### Exporting Reports

1. Select desired date range
2. Click **"Export"**
3. Choose format (CSV, PDF)
4. Report downloads automatically

---

## System Settings

### Notification Preferences

Configure when admins receive alerts:

- New project created
- Project awaiting approval
- Failed jobs requiring attention
- Budget thresholds exceeded

### Backup & Recovery

Data is automatically backed up daily. Contact support for:

- Point-in-time recovery
- Data export requests
- Account deletion

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Cmd+K` | Global search |
| `Cmd+N` | New project |
| `Esc` | Close dialogs |
| `?` | Show shortcuts |

---

## Support

For issues not covered in this guide:

- Email: support@example.com
- Response time: 24-48 hours
- Emergency: See [Troubleshooting Guide](./TROUBLESHOOTING.md)
