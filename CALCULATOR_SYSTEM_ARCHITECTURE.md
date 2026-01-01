# 🧮 Houspire Calculator System - Complete Architecture

**Date:** January 1, 2026  
**Version:** 2.0 (AI-Integrated)  
**Purpose:** Precision budget calculations with AI render analysis + user approval

---

## 🎯 VISION

**Current Problem:**
- AI extracts items from renders → 33% match rate
- Generic pricing → high variance (59% error)
- Missing specialized items (wardrobes, kitchens)
- No dimensional calculations

**Solution:**
```
AI Render Analysis
    ↓
Calculator Suggestions (with dimensions)
    ↓
User Approval/Adjustment
    ↓
Precision BOQ (variance <5%)
```

---

## 🏗️ SYSTEM ARCHITECTURE

### Phase 1: AI Extraction (Current)
```
Render Upload → Gemini Vision AI → Extract Items → Match to Pricing DB
```

**Current Output:**
- Item names (e.g., "Brown leather sofa", "TV unit")
- Categories (Furniture, Electrical, etc.)
- Quantities
- Confidence scores

### Phase 2: Calculator Integration (NEW)
```
AI Extraction
    ↓
Detect Calculator-Eligible Items
    ↓
Run Dimension Analysis (Gemini AI)
    ↓
Calculator Suggestions
    ↓
User Approval UI
    ↓
Precision BOQ Generation
```

---

## 📊 CALCULATOR TYPES

### Type 1: Modular Calculators (High Precision)
**Use for:** Wardrobes, Kitchens, TVUnits, Study Tables
**Inputs:** Dimensions (L×W×H), module type, finish
**Output:** Complete BOQ with hardware breakdown
**Variance:** <5%

### Type 2: Dimensional Calculators (Medium Precision)
**Use for:** Flooring, Ceiling, Painting, Wallpaper, Curtains
**Inputs:** Area (sqft), material, wastage factor
**Output:** Material + labor costs
**Variance:** <10%

### Type 3: Catalog Calculators (Standard Precision)
**Use for:** Furniture, Lighting, Decor, Appliances
**Inputs:** Item specs, style tags, budget tier
**Output:** Pricing from database
**Variance:** <15%

---

## 🧮 CALCULATOR SPECIFICATIONS

### Calculator 1: Wardrobe Calculator

**Trigger Detection:**
```typescript
function detectWardrobeCalculator(aiItem) {
  return (
    aiItem.category === 'Furniture' &&
    (
      aiItem.name.includes('wardrobe') ||
      aiItem.name.includes('closet') ||
      aiItem.name.includes('almirah') ||
      aiItem.room_type === 'wardrobe'
    )
  );
}
```

**AI Dimension Extraction:**
```
Prompt to Gemini Vision AI:
"Analyze this wardrobe in the render:
1. Estimate width in feet (min 3', max 12')
2. Estimate height: 7' (standard) or 8' (tall)
3. Count visible shutters (2, 3, or 4)
4. Identify type: swing or sliding
5. Detect finish: laminate, acrylic, PU, or veneer
6. Return JSON: {width_ft, height_ft, shutters, type, finish}"
```

**Calculator Logic:**
```typescript
interface WardrobeInput {
  width_ft: number;        // 3-12 feet
  height: '7ft' | '8ft';   // Standard or tall
  type: 'swing' | 'sliding';
  finish_tier: 'budget' | 'mid' | 'premium';
  carcass: 'HDMR' | 'BWR';
  has_loft: boolean;
  city: string;
}

function calculateWardrobe(input: WardrobeInput): BOQ {
  // Step 1: Determine modules
  const modules = calculateModules(input.width_ft, input.type);
  
  // Step 2: Calculate carcass
  const carcass_sqft = calculateCarcassArea(modules, input.height);
  const carcass_cost = carcass_sqft * getCarcassRate(input.carcass);
  
  // Step 3: Calculate shutters
  const shutter_sqft = calculateShutterArea(modules);
  const shutter_cost = shutter_sqft * getShutterRate(input.finish_tier);
  
  // Step 4: Calculate hardware
  const hardware = calculateHardware(modules, input.type);
  const hardware_cost = sumHardwareCosts(hardware);
  
  // Step 5: Apply city multiplier
  const subtotal = carcass_cost + shutter_cost + hardware_cost;
  const city_multiplier = getCityMultiplier(input.city);
  const total = subtotal * city_multiplier;
  
  return {
    items: [
      { name: 'Carcass', sqft: carcass_sqft, rate, amount: carcass_cost },
      { name: 'Shutters', sqft: shutter_sqft, rate, amount: shutter_cost },
      ...hardware.map(h => ({ name: h.name, qty: h.qty, rate: h.rate, amount: h.cost }))
    ],
    subtotal,
    city_multiplier,
    total,
    gst: total * 0.18,
    grand_total: total * 1.18
  };
}
```

**Pricing Breakdown:**
| Component | Unit | Budget | Mid | Premium |
|-----------|------|--------|-----|---------|
| HDMR Carcass | sqft | ₹180 | ₹200 | ₹220 |
| BWR Carcass | sqft | ₹280 | ₹300 | ₹320 |
| Laminate Shutter | sqft | ₹250 | - | - |
| Acrylic Shutter | sqft | - | ₹600 | - |
| PU Shutter | sqft | - | ₹850 | ₹950 |
| Veneer Shutter | sqft | - | - | ₹1,200 |
| Soft-Close Hinge | piece | ₹180 | ₹220 | ₹280 |
| Drawer Channel | pair | ₹600 | ₹800 | ₹1,200 |
| Handle | piece | ₹80 | ₹150 | ₹300 |

---

### Calculator 2: Kitchen Calculator

**Trigger Detection:**
```typescript
function detectKitchenCalculator(aiItem, room_type) {
  return (
    room_type === 'kitchen' ||
    aiItem.name.includes('cabinet') ||
    aiItem.name.includes('counter') ||
    aiItem.name.includes('modular kitchen')
  );
}
```

**AI Dimension Extraction:**
```
Prompt to Gemini Vision AI:
"Analyze this kitchen in the render:
1. Measure base cabinet length (running feet)
2. Measure overhead cabinet length (running feet)
3. Count tall units (if any)
4. Identify countertop material: granite, quartz, or Corian
5. Identify finish: laminate, acrylic, PU, or veneer
6. Return JSON: {base_rft, overhead_rft, tall_units, countertop, finish}"
```

**Calculator Logic:**
```typescript
interface KitchenInput {
  base_rft: number;         // Running feet of base cabinets
  overhead_rft: number;     // Running feet of overhead cabinets
  tall_units: number;       // Count of 2'×7' units
  countertop: 'granite' | 'quartz' | 'corian';
  finish_tier: 'budget' | 'mid' | 'premium';
  carcass: 'HDMR' | 'BWR';
  dado_rft: number;         // Backsplash length
  city: string;
}

function calculateKitchen(input: KitchenInput): BOQ {
  // Step 1: Base cabinets (carcass + shutters + hardware)
  const base_cost = input.base_rft * getBaseCabinetRate(input.carcass, input.finish_tier);
  
  // Step 2: Overhead cabinets
  const overhead_cost = input.overhead_rft * getOverheadRate(input.carcass, input.finish_tier);
  
  // Step 3: Tall units
  const tall_cost = input.tall_units * getTallUnitRate(input.carcass, input.finish_tier);
  
  // Step 4: Countertop (2' depth standard)
  const countertop_sqft = input.base_rft * 2;
  const countertop_cost = countertop_sqft * getCountertopRate(input.countertop);
  
  // Step 5: Dado/backsplash (2.5' height standard)
  const dado_sqft = input.dado_rft * 2.5;
  const dado_cost = dado_sqft * getDadoRate(input.countertop);
  
  // Step 6: Sink + accessories
  const accessories_cost = calculateKitchenAccessories(input.finish_tier);
  
  // Step 7: Apply city multiplier
  const subtotal = base_cost + overhead_cost + tall_cost + countertop_cost + dado_cost + accessories_cost;
  const total = subtotal * getCityMultiplier(input.city);
  
  return { /* BOQ */ };
}
```

**Pricing Breakdown:**
| Component | Unit | Budget | Mid | Premium |
|-----------|------|--------|-----|---------|
| Base Cabinet (HDMR+Laminate) | rft | ₹8,500 | - | - |
| Base Cabinet (BWR+Acrylic) | rft | - | ₹12,000 | - |
| Base Cabinet (BWR+PU) | rft | - | - | ₹16,000 |
| Overhead Cabinet (HDMR+Laminate) | rft | ₹5,500 | - | - |
| Overhead Cabinet (BWR+Acrylic) | rft | - | ₹8,000 | - |
| Granite Countertop | sqft | ₹250 | ₹350 | - |
| Quartz Countertop | sqft | - | ₹500 | ₹600 |
| SS Sink (Single Bowl) | piece | ₹4,500 | ₹6,500 | ₹12,000 |
| Tall Unit (2'×7') | unit | ₹35,000 | ₹45,000 | ₹60,000 |

---

### Calculator 3: Flooring Calculator

**Trigger Detection:**
```typescript
function detectFlooringCalculator(aiItem, extraction_data) {
  return (
    aiItem.category === 'Flooring' ||
    aiItem.name.includes('floor') ||
    aiItem.name.includes('tile') ||
    aiItem.name.includes('vinyl') ||
    extraction_data.room_area_sqft > 0
  );
}
```

**AI Dimension Extraction:**
```
Prompt to Gemini Vision AI:
"Estimate the flooring area in this room:
1. Identify room dimensions if visible
2. Estimate area in sq ft (min 80, max 500)
3. Identify flooring material: tiles, vinyl, wood, marble, carpet
4. Return JSON: {area_sqft, material}"
```

**Calculator Logic:**
```typescript
interface FlooringInput {
  area_sqft: number;
  material: 'tiles' | 'vinyl' | 'wood' | 'marble' | 'carpet';
  tier: 'budget' | 'mid' | 'premium';
  wastage_percent: number;  // Default 10%
  city: string;
}

function calculateFlooring(input: FlooringInput): BOQ {
  const wastage_multiplier = 1 + (input.wastage_percent / 100);
  const material_sqft = input.area_sqft * wastage_multiplier;
  
  const material_rate = getFlooringRate(input.material, input.tier);
  const material_cost = material_sqft * material_rate;
  
  const labor_rate = getFlooringLaborRate(input.material);
  const labor_cost = input.area_sqft * labor_rate;
  
  const total = (material_cost + labor_cost) * getCityMultiplier(input.city);
  
  return { /* BOQ */ };
}
```

**Pricing Breakdown:**
| Material | Unit | Budget | Mid | Premium |
|----------|------|--------|-----|---------|
| Vitrified Tiles | sqft | ₹70 | ₹120 | ₹200 |
| Vinyl Flooring | sqft | ₹80 | ₹140 | ₹250 |
| Engineered Wood | sqft | - | ₹200 | ₹350 |
| Italian Marble | sqft | - | - | ₹450 |
| Labor (Tiles) | sqft | ₹35 | ₹40 | ₹50 |
| Labor (Vinyl) | sqft | ₹25 | ₹30 | ₹35 |

---

### Calculator 4: Ceiling Calculator

**Trigger Detection:**
```typescript
function detectCeilingCalculator(aiItem, extraction_data) {
  return (
    aiItem.name.includes('ceiling') ||
    aiItem.name.includes('false ceiling') ||
    aiItem.name.includes('gypsum') ||
    extraction_data.ceiling_detected
  );
}
```

**AI Analysis:**
```
Prompt:
"Analyze the ceiling in this render:
1. Estimate ceiling area (typically 90% of floor area)
2. Identify type: simple, step, cove, 3D design
3. Detect lighting: recessed, cove lighting, chandelier
4. Return JSON: {area_sqft, ceiling_type, lighting_type}"
```

**Pricing:**
| Ceiling Type | Unit | Budget | Mid | Premium |
|--------------|------|--------|-----|---------|
| Simple Gypsum | sqft | ₹90 | ₹120 | ₹150 |
| Step Ceiling | sqft | ₹120 | ₹160 | ₹220 |
| Cove Ceiling | sqft | ₹140 | ₹190 | ₹280 |
| 3D Panel/Design | sqft | - | ₹250 | ₹400 |

---

### Calculator 5: Painting Calculator

**Pricing:**
| Surface | Unit | Budget | Mid | Premium |
|---------|------|--------|-----|---------|
| Wall Paint (2 coats) | sqft | ₹18 | ₹28 | ₹45 |
| Ceiling Paint | sqft | ₹15 | ₹22 | ₹35 |
| Wood Polish | sqft | ₹80 | ₹120 | ₹180 |
| Enamel Paint | sqft | ₹45 | ₹65 | ₹90 |

---

### Calculator 6: Curtain/Blinds Calculator

**AI Analysis:**
```
Prompt:
"Measure windows in this room:
1. Count number of windows
2. Estimate average window width (4-8 feet typical)
3. Estimate average window height (4-6 feet typical)
4. Identify style: curtains, blinds, sheer, blackout
5. Return JSON: {window_count, avg_width_ft, avg_height_ft, style}"
```

**Pricing:**
| Type | Unit | Budget | Mid | Premium |
|------|------|--------|-----|---------|
| Curtain Fabric | sqft | ₹80 | ₹150 | ₹300 |
| Curtain Rod | piece | ₹500 | ₹1,200 | ₹2,500 |
| Roller Blinds | sqft | ₹120 | ₹180 | ₹280 |
| Roman Blinds | sqft | ₹180 | ₹280 | ₹450 |
| Labor (Stitching) | sqft | ₹40 | ₹60 | ₹80 |

---

## 🔄 AI-CALCULATOR INTEGRATION WORKFLOW

### Step 1: Render Upload & Initial Extraction
```
User uploads render
    ↓
Gemini Vision AI extracts:
  - Room type
  - Items list
  - Style detection
  - Initial budget items
```

### Step 2: Calculator Detection
```typescript
function detectApplicableCalculators(extraction_data) {
  const calculators = [];
  
  // Check for wardrobe
  if (extraction_data.items.some(i => i.name.includes('wardrobe'))) {
    calculators.push({
      type: 'wardrobe',
      confidence: 0.95,
      trigger_item: 'wardrobe'
    });
  }
  
  // Check for kitchen
  if (extraction_data.room_type === 'kitchen') {
    calculators.push({
      type: 'kitchen',
      confidence: 1.0,
      trigger_item: 'modular kitchen'
    });
  }
  
  // Check for flooring (always applicable)
  if (extraction_data.room_area_sqft > 0) {
    calculators.push({
      type: 'flooring',
      confidence: 0.90,
      trigger_item: 'floor area'
    });
  }
  
  // Check for ceiling
  if (extraction_data.ceiling_detected) {
    calculators.push({
      type: 'ceiling',
      confidence: 0.85,
      trigger_item: 'false ceiling'
    });
  }
  
  return calculators;
}
```

### Step 3: AI Dimension Analysis (Enhanced Prompt)
```
For each applicable calculator, run focused Gemini analysis:

"You are analyzing a {room_type} render for precise budget calculations.

TASK: Extract dimensional data for {calculator_type} calculator.

RENDER ANALYSIS:
{render_description}

EXTRACT THE FOLLOWING:
{calculator_specific_dimensions}

RULES:
- Use standard Indian dimensions
- Provide ranges if exact measurement unclear
- Note: "estimated" or "measured" confidence
- Return structured JSON

OUTPUT FORMAT:
{json_schema}"
```

### Step 4: Calculator Suggestions UI
```typescript
interface CalculatorSuggestion {
  calculator_type: 'wardrobe' | 'kitchen' | 'flooring' | 'ceiling' | 'painting' | 'curtains';
  confidence: number;
  ai_detected_dimensions: Record<string, any>;
  default_selections: {
    tier: 'budget' | 'mid' | 'premium';
    materials: string[];
    finish: string;
  };
  estimated_cost_range: {
    min: number;
    max: number;
  };
  requires_user_input: string[];  // Fields user must confirm/adjust
}

// UI shows calculator suggestions in Budget page
```

### Step 5: User Approval/Adjustment
```
Budget Page UI:

┌─────────────────────────────────────────────────────┐
│  CALCULATOR SUGGESTIONS                             │
├─────────────────────────────────────────────────────┤
│                                                     │
│  🧮 Wardrobe Calculator Detected                   │
│  Confidence: 95%                                    │
│                                                     │
│  AI Detected:                                       │
│    Width: 8 feet (estimated)                        │
│    Height: 7 feet (standard)                        │
│    Type: Swing wardrobe                             │
│    Shutters: 4 visible                              │
│                                                     │
│  Default Selections:                                │
│    Tier: Mid (₹2,500-4,000/sqft)                   │
│    Carcass: BWR Plywood                             │
│    Finish: Acrylic                                  │
│                                                     │
│  Estimated Cost: ₹85,000 - ₹1,10,000                │
│                                                     │
│  ✅ Use Calculator    ✏️ Adjust     ❌ Skip         │
└─────────────────────────────────────────────────────┘
```

### Step 6: Calculator Execution
```typescript
async function executeCalculator(
  calculator_type: string,
  user_approved_inputs: Record<string, any>,
  project_data: Project
): Promise<BOQ> {
  // Select calculator
  const calculator = getCalculator(calculator_type);
  
  // Merge AI detections + user inputs
  const final_inputs = {
    ...user_approved_inputs,
    city: project_data.city,
    budget_tier: project_data.budget_tier
  };
  
  // Run calculation
  const boq = calculator.calculate(final_inputs);
  
  // Store in budget_items
  await saveBudgetItems(boq, project_data.id, {
    source: 'calculator',
    calculator_type,
    confidence: 1.0  // User approved
  });
  
  return boq;
}
```

---

## 📊 BUDGET RANGE VALIDATION

### Step 1: Set Budget Range (Project Creation)
```typescript
interface ProjectBudget {
  min_budget: number;  // e.g., ₹25,00,000
  max_budget: number;  // e.g., ₹35,00,000
  allocated_by_room: {
    living_room: { min: number, max: number },
    master_bedroom: { min: number, max: number },
    kitchen: { min: number, max: number },
    // ...
  };
}
```

### Step 2: Real-Time Budget Tracking
```typescript
function validateBudgetItem(item: BudgetItem, project: Project): ValidationResult {
  const room_budget = project.budget.allocated_by_room[item.room_type];
  const current_room_total = getCurrentRoomTotal(item.room_type, project.id);
  const new_total = current_room_total + item.total;
  
  if (new_total > room_budget.max) {
    return {
      status: 'over_budget',
      warning: `This item exceeds your ${item.room_type} budget by ₹${formatCurrency(new_total - room_budget.max)}`,
      suggestion: `Consider:
        - Lower tier: Budget → Mid (save ~30%)
        - Alternative materials: BWR → HDMR (save ₹100/sqft)
        - Reduce dimensions: 8ft → 7ft wardrobe (save ~15%)`
    };
  } else if (new_total < room_budget.min) {
    return {
      status: 'under_budget',
      info: `You have ₹${formatCurrency(room_budget.min - new_total)} remaining in your ${item.room_type} budget`,
      suggestion: `Consider upgrading:
        - Mid → Premium tier (+40% quality)
        - Add loft storage (+₹15,000)
        - Upgrade finish: Acrylic → PU (+₹200/sqft)`
    };
  } else {
    return {
      status: 'within_budget',
      info: `Budget utilization: ${Math.round((new_total / room_budget.max) * 100)}%`
    };
  }
}
```

### Step 3: Budget Warning UI
```
┌─────────────────────────────────────────────────────┐
│  ⚠️ BUDGET ALERT                                    │
├─────────────────────────────────────────────────────┤
│                                                     │
│  This 8ft wardrobe (₹1,10,000) will exceed your    │
│  master bedroom budget by ₹25,000.                  │
│                                                     │
│  Current: ₹2,15,000 / ₹2,50,000                     │
│  After: ₹3,25,000 / ₹2,50,000  ⚠️ +₹75,000         │
│                                                     │
│  SUGGESTIONS:                                       │
│  💡 Reduce to 6ft wardrobe → Save ₹30,000          │
│  💡 Change to 7ft height → Save ₹15,000            │
│  💡 Switch HDMR carcass → Save ₹20,000             │
│  💡 Use laminate finish → Save ₹35,000             │
│                                                     │
│  🔄 Adjust Calculator    ✅ Proceed Anyway          │
└─────────────────────────────────────────────────────┘
```

---

## 🎯 SUCCESS METRICS

### Calculator Accuracy
| Metric | Target | Current (Post-Implementation) |
|--------|--------|-------------------------------|
| **Match Rate** | 100% | TBD |
| **Cost Variance** | <5% | TBD (was 59%) |
| **User Adjustment Rate** | <20% | TBD |
| **Calculator Usage** | >60% of applicable items | TBD |

### Budget Compliance
| Metric | Target | 
|--------|--------|
| **Projects Within Budget** | >85% |
| **Budget Overruns** | <15% |
| **Average Variance** | <8% |
| **User Budget Awareness** | >95% |

---

## 📂 DATABASE SCHEMA ADDITIONS

### New Tables

#### `calculators` Table
```sql
CREATE TABLE calculators (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,  -- 'wardrobe', 'kitchen', etc.
  version TEXT NOT NULL DEFAULT '1.0',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### `calculator_suggestions` Table
```sql
CREATE TABLE calculator_suggestions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  render_id UUID REFERENCES renders(id),
  project_id UUID REFERENCES projects(id),
  room_id UUID REFERENCES rooms(id),
  calculator_type TEXT NOT NULL,
  ai_detected_dimensions JSONB NOT NULL,
  confidence_score DECIMAL(3,2),
  estimated_cost_min DECIMAL(12,2),
  estimated_cost_max DECIMAL(12,2),
  status TEXT DEFAULT 'pending',  -- 'pending', 'approved', 'adjusted', 'skipped'
  user_adjusted_inputs JSONB,
  final_boq JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### Update `budget_items` Table
```sql
ALTER TABLE budget_items
ADD COLUMN calculator_id UUID REFERENCES calculators(id),
ADD COLUMN calculator_suggestion_id UUID REFERENCES calculator_suggestions(id),
ADD COLUMN source TEXT DEFAULT 'manual',  -- 'ai_extraction', 'calculator', 'manual'
ADD COLUMN dimensions JSONB;  -- Store calculator-specific dimensions
```

---

## 🚀 IMPLEMENTATION PHASES

### Phase 1: Wardrobe & Kitchen Calculators (Week 1)
- [ ] Implement wardrobe calculator logic
- [ ] Implement kitchen calculator logic
- [ ] Create calculator detection in extraction flow
- [ ] Build calculator suggestions UI
- [ ] Add user approval workflow

### Phase 2: Flooring, Ceiling, Painting (Week 2)
- [ ] Implement dimensional calculators
- [ ] Enhanced AI dimension extraction prompts
- [ ] Budget range validation
- [ ] Warning/suggestion system

### Phase 3: Integration & Testing (Week 3)
- [ ] End-to-end AI → Calculator → BOQ flow
- [ ] Multi-room testing
- [ ] Budget compliance testing
- [ ] Variance analysis

### Phase 4: Additional Calculators (Week 4)
- [ ] Curtain/blinds calculator
- [ ] TV unit calculator
- [ ] Study table calculator
- [ ] Bathroom vanity calculator

---

## 📖 DOCUMENTATION FILES TO CREATE

1. **WARDROBE_CALCULATOR_IMPLEMENTATION.md** - Complete TypeScript code
2. **KITCHEN_CALCULATOR_IMPLEMENTATION.md** - Complete TypeScript code
3. **CALCULATOR_API_SPEC.md** - API endpoints for calculators
4. **CALCULATOR_UI_DESIGN.md** - Figma-style UI mockups
5. **BUDGET_RANGE_VALIDATION.md** - Validation logic & warnings
6. **AI_DIMENSION_PROMPTS.md** - Enhanced Gemini prompts for each calculator

---

## 🎉 EXPECTED OUTCOMES

### Before Calculator System:
- Match rate: 33% (9/27 items)
- Cost variance: 59%
- Budget confidence: Low
- Manual adjustments: Frequent

### After Calculator System:
- Match rate: **100%** (all items priced)
- Cost variance: **<5%** (precision calculations)
- Budget confidence: **High** (validated ranges)
- Manual adjustments: **Rare** (AI + calculators accurate)

---

**Repository:** https://github.com/abhi47811/houspire-project-hub  
**Status:** 🚀 Ready to implement  
**Next Steps:** Create individual calculator implementations
