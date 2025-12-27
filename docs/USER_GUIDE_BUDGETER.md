# Budgeter User Guide

## Overview

As a Budgeter, you manage the Bill of Quantities (BOQ) for interior design projects. This guide covers budget generation, editing, vendor assignment, and report exports.

---

## Getting Started

### Accessing Budget Features

1. Log in with your credentials
2. Navigate to a project with completed renders
3. Click **"Budget"** tab or go to Budget page

### Prerequisites for Budget Generation

Before generating a budget, ensure:
- ✅ All rooms have Phase 5 completed
- ✅ All renders are approved
- ✅ Project has city assigned (for pricing)

---

## Generating Budgets

### Automatic Generation

1. Navigate to project detail page
2. Click **"Generate Budget"** button
3. AI analyzes all approved renders
4. Budget items appear in 30-60 seconds

### What Gets Generated

The AI identifies and prices:

| Category | Examples |
|----------|----------|
| Furniture | Sofas, beds, tables, chairs |
| Lighting | Chandeliers, lamps, spots |
| Flooring | Tiles, wood, carpet |
| Wall Finishes | Paint, wallpaper, paneling |
| Soft Furnishings | Curtains, cushions, rugs |
| Decor | Art, plants, accessories |
| Electrical | Switches, sockets, wiring |
| Civil Works | False ceiling, partitions |

### Understanding Pricing

Prices are calculated as:

```
Item Total = Quantity × Rate × City Multiplier
GST Amount = Item Total × GST%
Final Total = Item Total + GST Amount
```

---

## Viewing Budget Items

### Budget Table Structure

| Column | Description |
|--------|-------------|
| Item Name | Material or product name |
| Category | Grouping (Furniture, Lighting, etc.) |
| Specification | Quality/variant details |
| Room | Which room this is for |
| Quantity | Amount needed |
| Unit | Measurement (nos, sqft, rft) |
| Rate | Price per unit |
| Amount | Quantity × Rate |
| GST % | Tax percentage |
| GST Amount | Calculated tax |
| Total | Final with tax |
| Vendor | Assigned vendor (if any) |
| Status | Pending/Approved |

### Filtering & Sorting

1. **By Category**: Click category tabs
2. **By Room**: Use room filter dropdown
3. **By Status**: Show pending/approved only
4. **Sort**: Click column headers

---

## Editing Budget Items

### Editing Individual Items

1. Click on any editable field
2. Modify value
3. Press Enter or click away
4. Changes save automatically

### Editable Fields

| Field | Notes |
|-------|-------|
| Item Name | Keep descriptive |
| Specification | Update quality/variant |
| Quantity | Must be positive number |
| Unit | Select from dropdown |
| Rate | Per-unit price |
| GST % | Default 18%, can change |

### Adding New Items

1. Click **"Add Item"** button
2. Fill required fields:
   - Item name
   - Category
   - Quantity
   - Rate
3. Click **"Save"**

### Deleting Items

1. Click delete icon (trash) on row
2. Confirm deletion
3. Item removed immediately

### Bulk Editing

For mass changes:

1. Select multiple items (checkboxes)
2. Click **"Bulk Edit"**
3. Modify common fields:
   - GST percentage
   - Status
   - Vendor assignment
4. Apply changes

---

## Budget Approval

### Approving Individual Items

1. Review item details
2. Verify rate and quantity
3. Click **"Approve"** checkbox
4. Item status changes to approved

### Bulk Approval

1. Click **"Approve All"** in category header
2. Or use **"Approve All Budget Items"** button
3. Confirm in dialog
4. All pending items approved

### Approval Workflow

```
Pending → Approved → [Vendor Assigned] → Ready for Execution
```

---

## Vendor Assignment

### Understanding Vendor Matching

System automatically finds matching vendors based on:

1. **Category match**: Vendor sells this category
2. **City proximity**: Local vendors preferred
3. **Rating**: Higher rated vendors score better
4. **Price**: Competitive pricing considered
5. **Reliability**: On-time delivery history

### Viewing Vendor Matches

1. Click on budget item row
2. Expand to see "Vendor Matches" section
3. View ranked vendors with scores

### Match Score Interpretation

| Score | Meaning |
|-------|---------|
| 90-100 | Excellent match |
| 70-89 | Good match |
| 50-69 | Acceptable |
| Below 50 | Poor match |

### Manual Vendor Assignment

1. Expand budget item
2. View vendor options
3. Click **"Select"** on preferred vendor
4. Vendor name appears in item row

### Auto-Assign Best Vendors

For automatic assignment:

1. Click **"Auto-Assign Vendors"** button
2. System selects highest-scoring vendors
3. Review assignments
4. Override if needed

### Vendor Information

Click vendor name to see:
- Business details
- Contact information
- Rating and reviews
- On-time percentage
- Discount percentage

---

## GST Compliance

### Standard GST Rates

| Category | GST % |
|----------|-------|
| Furniture | 18% |
| Lighting | 18% |
| Electronics | 18% |
| Civil Works | 18% |
| Flooring | 18% |
| Soft Furnishings | 12% |
| Decor Items | 12% |

### GST Calculations

All calculations follow Indian GST rules:

```
Taxable Amount = Quantity × Rate
CGST = Taxable Amount × 9%
SGST = Taxable Amount × 9%
Total GST = CGST + SGST = 18%
Grand Total = Taxable Amount + Total GST
```

### GST Summary

Budget page shows:
- Total Taxable Amount
- Total CGST
- Total SGST
- Grand Total with GST

---

## Exporting Reports

### Excel Export (BOQ)

1. Click **"Export Excel"** button
2. File downloads as `.xlsx`
3. Contains:
   - All budget items
   - Category subtotals
   - GST breakdown
   - Grand totals
   - Vendor assignments

### PDF Export (Quote)

1. Click **"Export PDF"** button
2. Professional quote generates
3. Includes:
   - Company letterhead
   - Client details
   - Itemized list
   - Terms & conditions
   - Validity period

### Custom Reports

For specific requirements:
1. Filter items as needed
2. Select visible columns
3. Export filtered view
4. Opens in Excel for further editing

---

## Budget Summary

### Project Budget Overview

Dashboard shows:

| Metric | Description |
|--------|-------------|
| Total Estimated | Sum of all items |
| Approved Value | Sum of approved items |
| Pending Value | Sum of pending items |
| Variance | Estimated - Approved |

### Category Breakdown

View spending by category:
- Furniture: XX%
- Lighting: XX%
- Civil: XX%
- etc.

### Room-wise Split

See budget per room:
- Living Room: ₹XX,XXX
- Master Bedroom: ₹XX,XXX
- etc.

---

## Tips for Efficiency

### Best Practices

1. **Generate early**: Budget while renders are being approved
2. **Review by category**: Systematic approach
3. **Use bulk approval**: For verified items
4. **Auto-assign vendors**: Then review/override
5. **Export regularly**: Keep backups

### Common Adjustments

| Scenario | Action |
|----------|--------|
| Client budget constraint | Reduce quantities or spec |
| Premium preference | Upgrade specifications |
| Missing item | Add manually |
| Wrong room | Delete and re-add |

### Quality Checks

Before finalizing:

- [ ] All items have quantities
- [ ] Rates are market-appropriate
- [ ] GST percentages are correct
- [ ] Vendors are assigned
- [ ] Room allocations are right
- [ ] No duplicate items

---

## Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| Budget not generating | Ensure all Phase 5 completed |
| Missing items | Re-generate or add manually |
| Wrong prices | Check city setting, edit rates |
| No vendor matches | Add vendors to database |
| Export failing | Try different browser |

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Cmd+S` | Save changes |
| `Tab` | Move to next field |
| `Enter` | Save field, move down |
| `Esc` | Cancel editing |
| `Cmd+E` | Export Excel |

---

## Support

For budget-related issues:
- Contact project admin
- Email: support@example.com
- See [Troubleshooting Guide](./TROUBLESHOOTING.md)
