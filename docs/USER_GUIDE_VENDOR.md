# Vendor Finder User Guide

## Overview

As a Vendor Finder, you manage the vendor database and help match the right suppliers to budget items. This guide covers vendor management, matching algorithms, and verification processes.

---

## Getting Started

### Accessing Vendor Features

1. Log in with your credentials
2. Navigate to **Vendors** page from sidebar
3. View all vendors in the database

### Your Responsibilities

- Maintain accurate vendor database
- Verify vendor credentials
- Curate preferred suppliers
- Monitor vendor performance
- Assist with vendor selection

---

## Vendor Database

### Viewing All Vendors

The vendor list shows:

| Column | Description |
|--------|-------------|
| Business Name | Company name |
| Categories | Product categories served |
| City | Primary location |
| Rating | Average customer rating |
| Verified | Credential verification status |
| Curated | Preferred vendor status |

### Filtering Vendors

1. **By Category**: Select from dropdown
2. **By City**: Filter to specific city
3. **By Status**: Verified only, Curated only
4. **Search**: Type business name

### Sorting Options

Click column headers to sort by:
- Name (A-Z, Z-A)
- Rating (High to Low)
- Projects Completed
- On-time Percentage

---

## Adding New Vendors

### Required Information

| Field | Required | Description |
|-------|----------|-------------|
| Business Name | ✅ | Official registered name |
| Categories | ✅ | Product/service categories |
| City | ✅ | Primary operating location |
| Contact Name | ✅ | Primary contact person |
| Phone | ✅ | Contact number |
| Email | ✅ | Business email |
| Address | No | Full address |
| Discount % | No | Standard discount offered |
| Min Order | No | Minimum order value |
| Lead Time | No | Typical delivery days |

### Adding Process

1. Click **"Add Vendor"** button
2. Fill in required fields
3. Add optional details
4. Click **"Save Vendor"**
5. Vendor appears in database

### Bulk Import

For multiple vendors:

1. Download template CSV
2. Fill in vendor data
3. Upload completed file
4. Review imported entries
5. Confirm additions

---

## Vendor Categories

### Standard Categories

| Category | Examples |
|----------|----------|
| Furniture | Sofas, beds, tables, chairs, storage |
| Lighting | Chandeliers, lamps, LED fixtures |
| Flooring | Tiles, hardwood, laminate, carpet |
| Wall Finishes | Paint, wallpaper, panels |
| Soft Furnishings | Curtains, blinds, upholstery |
| Decor | Art, plants, accessories |
| Electrical | Switches, fixtures, wiring |
| Civil Contractors | Construction, renovation |
| Modular Kitchens | Kitchen systems |
| Bathroom Fittings | Sanitary, fixtures |

### Multi-Category Vendors

Vendors can serve multiple categories:
- Select all applicable categories
- System matches across categories
- Increases vendor utilization

---

## Vendor Verification

### Verification Criteria

| Check | Description |
|-------|-------------|
| Business Registration | Valid GST/Company registration |
| Physical Address | Verified showroom/warehouse |
| Portfolio | Sample work quality |
| References | Past client feedback |
| Bank Details | Valid business account |
| Insurance | Liability coverage |

### Verification Process

1. Request documents from vendor
2. Review submitted materials
3. Conduct verification checks:
   - [ ] Registration valid
   - [ ] Address verified
   - [ ] Portfolio reviewed
   - [ ] References contacted
4. Mark as **Verified** if all pass
5. Add notes on verification

### Verified Badge Benefits

Verified vendors get:
- Higher matching scores
- Priority in recommendations
- Badge displayed to clients
- Access to larger projects

---

## Curated Vendors

### What is Curated Status?

Curated vendors are top-tier suppliers:
- Consistently high quality
- Reliable delivery
- Competitive pricing
- Good communication
- Proven track record

### Curation Criteria

| Metric | Threshold |
|--------|-----------|
| Rating | 4.5+ stars |
| On-time % | 95%+ |
| Projects | 10+ completed |
| Active | Last 3 months |

### Marking as Curated

1. Find vendor in database
2. Verify meets all criteria
3. Toggle **"Curated"** switch
4. Add curation notes
5. Save changes

### Curated Benefits

- Top position in matching
- "Curated" badge displayed
- Preferred for premium projects
- Featured in recommendations

---

## Vendor Matching

### How Matching Works

When a budget item needs a vendor:

1. System identifies item category
2. Filters vendors by category + city
3. Calculates match scores
4. Ranks vendors by score
5. Presents top matches

### Match Score Formula

```
Score = 
  Category Match × 30% +
  City Match × 20% +
  Rating × 20% +
  On-time % × 15% +
  Curated Bonus × 10% +
  Verified Bonus × 5%
```

### Score Interpretation

| Score | Recommendation |
|-------|----------------|
| 90-100 | Highly recommended |
| 75-89 | Good match |
| 60-74 | Acceptable |
| Below 60 | Consider alternatives |

### Improving Match Quality

1. Ensure vendor categories are accurate
2. Keep city information updated
3. Maintain rating data
4. Track on-time performance
5. Curate top performers

---

## Vendor Performance

### Tracking Metrics

| Metric | Description |
|--------|-------------|
| Rating | Average from 1-5 |
| Total Reviews | Number of ratings |
| Projects Completed | Finished projects |
| On-time % | Delivery reliability |
| Lead Time | Average days to deliver |

### Updating Performance

After project completion:

1. Find vendor in database
2. Click **"Add Review"**
3. Enter:
   - Star rating (1-5)
   - On-time delivery (Yes/No)
   - Comments
4. Save review
5. Metrics update automatically

### Low Performance Handling

If vendor underperforms:

1. Document issues
2. Contact vendor for resolution
3. Add warning notes
4. Consider removing Curated status
5. If persistent, deactivate vendor

---

## Pricing Agreements

### Standard Pricing

Default discount percentages:

| Vendor Tier | Discount |
|-------------|----------|
| Standard | 0-5% |
| Verified | 5-10% |
| Curated | 10-15% |
| Premium Partners | 15-20% |

### Setting Vendor Discounts

1. Open vendor details
2. Edit **"Discount %"** field
3. Save changes
4. Applied to future budget items

### Minimum Order Values

For bulk discounts:
- Set minimum order amount
- System shows if order qualifies
- Discount applies automatically

---

## Vendor Communication

### Contact Information

Always maintain current:
- Primary contact name
- Phone number
- Email address
- Alternative contact

### Reaching Vendors

1. Click vendor name
2. View contact details
3. Options:
   - Copy phone number
   - Open email client
   - View on map

### Communication Log

Track vendor interactions:
- Quote requests
- Order confirmations
- Delivery updates
- Issue reports

---

## Reporting

### Vendor Analytics

View insights:
- Total active vendors
- Vendors by category
- Geographic coverage
- Performance trends

### Export Options

1. **Vendor List**: Complete database
2. **Performance Report**: Metrics summary
3. **Category Coverage**: Gap analysis

---

## Best Practices

### Database Hygiene

1. **Regular audits**: Review quarterly
2. **Update contacts**: When they change
3. **Remove inactive**: No orders in 6 months
4. **Verify annually**: Recheck credentials
5. **Track performance**: After each project

### Relationship Management

1. Respond to vendor queries promptly
2. Provide clear requirements
3. Give constructive feedback
4. Resolve disputes fairly
5. Build long-term partnerships

---

## Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| No matches found | Expand categories or city |
| Low scores | Check vendor data accuracy |
| Outdated info | Contact vendor for update |
| Duplicate entries | Merge vendor records |

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Cmd+F` | Search vendors |
| `N` | Add new vendor |
| `E` | Edit selected |
| `V` | Toggle verified |
| `C` | Toggle curated |

---

## Support

For vendor management help:
- Admin can assist with access
- See [Troubleshooting Guide](./TROUBLESHOOTING.md)
