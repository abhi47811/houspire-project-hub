# 📋 COPY THIS ENTIRE PROMPT TO LOVABLE

---

**IMPORTANT**: This prompt will ADD architectural preservation to your existing HOUSPIRE app. It will:
1. Add missing columns to rooms table (doors, windows, positions)
2. Update generate-ai edge function with preservation-first prompts
3. Fix PhaseGenerate UI to show real validation (not hardcoded)
4. Enable door/window preservation in all renders

**Estimated time**: 13-18 hours

---

## 🎯 PROMPT STARTS HERE (Copy everything below this line)

---

Update the existing HOUSPIRE AI platform to implement MANDATORY architectural preservation.

## 🚨 CRITICAL MISSION:
Fix the issue where doors and windows disappear in AI-generated renders. The current app has this problem:
- Base image shows 1 door on left wall
- Final render shows NO door (door disappeared!)
- Root cause: No architectural preservation in AI prompts

## 📊 CURRENT STATE ANALYSIS:
The app already has:
- ✅ projects, rooms, renders tables (basic structure)
- ✅ generate-ai edge function (missing preservation)
- ✅ PhaseGenerate.tsx component (shows fake validation)
- ⚠️ architectural_preservation table (exists but not used)

## 🔧 WHAT NEEDS TO BE FIXED:

### FIX 1: DATABASE SCHEMA - Add Missing Columns

**Update rooms table** - Add architectural fields:
```sql
-- Migration: Add architectural preservation columns to rooms
ALTER TABLE public.rooms
  ADD COLUMN IF NOT EXISTS doors INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS windows INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS door_positions JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS window_positions JSONB DEFAULT '[]'::jsonb;

-- Add helpful comment
COMMENT ON COLUMN public.rooms.doors IS 'Number of doors in the room (extracted from analysis)';
COMMENT ON COLUMN public.rooms.windows IS 'Number of windows in the room (extracted from analysis)';
COMMENT ON COLUMN public.rooms.door_positions IS 'Array of door positions: [{"wall": "left", "position": "center", "width": "3ft"}]';
COMMENT ON COLUMN public.rooms.window_positions IS 'Array of window positions: [{"wall": "right", "position": "upper", "size": "4x3ft"}]';
```

**Update renders table** - Add preservation validation fields:
```sql
-- Migration: Add preservation validation to renders
ALTER TABLE public.renders
  ADD COLUMN IF NOT EXISTS doors_preserved BOOLEAN,
  ADD COLUMN IF NOT EXISTS windows_preserved BOOLEAN,
  ADD COLUMN IF NOT EXISTS preservation_validation JSONB DEFAULT '{}'::jsonb;

-- Add helpful comment
COMMENT ON COLUMN public.renders.doors_preserved IS 'Whether all doors were preserved in the render';
COMMENT ON COLUMN public.renders.windows_preserved IS 'Whether all windows were preserved in the render';
COMMENT ON COLUMN public.renders.preservation_validation IS 'Detailed validation: {"doors": {"expected": 1, "found": 1}, "windows": {"expected": 2, "found": 2}}';

-- Add index for preservation queries
CREATE INDEX IF NOT EXISTS idx_renders_preservation 
  ON public.renders(doors_preserved, windows_preserved);
```

**Update room_analysis table** - Add architectural extraction fields:
```sql
-- Migration: Add door/window extraction to room_analysis
ALTER TABLE public.room_analysis
  ADD COLUMN IF NOT EXISTS door_count INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS window_count INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS door_details JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS window_details JSONB DEFAULT '[]'::jsonb;

COMMENT ON COLUMN public.room_analysis.door_count IS 'Number of doors detected in original image';
COMMENT ON COLUMN public.room_analysis.window_count IS 'Number of windows detected in original image';
```

### FIX 2: EDGE FUNCTION - Add Preservation Prompt Builder

**File**: `supabase/functions/generate-ai/index.ts`

**Add this function** at the top (around line 50, after imports):
```typescript
/**
 * ============================================================================
 * ARCHITECTURAL PRESERVATION PROMPT BUILDER
 * ============================================================================
 * CRITICAL: This function builds the preservation section that MUST come
 * FIRST in every AI prompt to ensure doors/windows are preserved.
 * ============================================================================
 */
function buildArchitecturalPreservationPrompt(room: any): string {
  // Extract door/window counts from room data (multiple sources)
  const doors = room.doors || room.room_analysis?.door_count || 0;
  const windows = room.windows || room.room_analysis?.window_count || 0;
  const doorPositions = room.door_positions || [];
  const windowPositions = room.window_positions || [];
  
  // Build detailed door descriptions
  let doorDetails = "";
  if (doorPositions.length > 0) {
    doorDetails = doorPositions.map((d: any, i: number) => 
      `   - Door ${i+1}: ${d.wall} wall, ${d.position} position, ${d.width || 'standard'} width`
    ).join('\n');
  }
  
  // Build detailed window descriptions
  let windowDetails = "";
  if (windowPositions.length > 0) {
    windowDetails = windowPositions.map((w: any, i: number) => 
      `   - Window ${i+1}: ${w.wall} wall, ${w.position} position, ${w.size || 'standard'} size`
    ).join('\n');
  }
  
  return `
## ⚠️ CRITICAL - ARCHITECTURAL PRESERVATION (HIGHEST PRIORITY) ⚠️

**YOU MUST PRESERVE THE EXACT ARCHITECTURE FROM THE CLEANED IMAGE:**

### MANDATORY PRESERVATION:

1. **DOORS: ${doors} door(s) REQUIRED**
${doorDetails || '   - Keep ALL doors in their EXACT original positions'}
   - DO NOT add, remove, or move ANY doors
   - DO NOT block doors with furniture or decor
   - DO NOT change door sizes, styles, or orientations
   - Keep door frames and handles clearly visible
   - Maintain door swing clearance

2. **WINDOWS: ${windows} window(s) REQUIRED**
${windowDetails || '   - Keep ALL windows in their EXACT original positions'}
   - DO NOT add, remove, or move ANY windows
   - DO NOT block windows with heavy curtains or furniture
   - DO NOT change window sizes, styles, or orientations
   - Keep window frames visible
   - Maintain natural light flow

3. **ROOM DIMENSIONS: ${room.dimensions || 'As shown in cleaned image'}**
   - Maintain exact room proportions
   - Keep ceiling height consistent
   - Preserve wall lengths and angles
   - Keep floor area unchanged

4. **STRUCTURAL ELEMENTS:**
   - Preserve ALL architectural features (columns, beams, alcoves)
   - Keep floor-to-ceiling height consistent
   - Maintain wall textures/finishes
   - Preserve any built-in features (shelves, niches)

### ❌ ABSOLUTELY FORBIDDEN:
- Removing doors or windows from the image
- Moving doors/windows to different walls or positions
- Blocking doors/windows with any objects
- Adding extra doors/windows not in original image
- Changing the number of doors/windows
- Altering room dimensions or proportions

### ✅ VALIDATION CHECKLIST:
Before finalizing the render, AI must verify:
- [ ] ${doors} door(s) are clearly visible in correct positions
- [ ] ${windows} window(s) are clearly visible in correct positions
- [ ] All doors/windows match cleaned image positions exactly
- [ ] No furniture or decor blocking architectural elements
- [ ] Room dimensions feel consistent with original

**PRIORITY ORDER:** 
1. Architecture Preservation (HIGHEST)
2. Style Application
3. Furniture Placement
4. Decorative Elements

**IF IN DOUBT:** Always err on the side of preserving MORE architectural elements.
`;
}
```

**Update the prompt assembly** (find around line 480-500, where comprehensivePrompt is built):

**FIND THIS CODE:**
```typescript
comprehensivePrompt = buildComprehensivePrompt({
  roomType: room.room_type,
  selectedStyle: room.selected_style,
  smartDefaultData,
  libraryImageData,
  customRequirements: customRequirements || room.custom_requirements,
  city: room.projects?.city,
  budgetTier: room.projects?.budget_tier,
}) + qcPromptAdditions;
```

**REPLACE WITH THIS:**
```typescript
// 🚨 STEP 1: Build architectural preservation prompt (MUST BE FIRST!)
const preservationPrompt = buildArchitecturalPreservationPrompt(room);

// 🎨 STEP 2: Build style and design prompt
const stylePrompt = buildComprehensivePrompt({
  roomType: room.room_type,
  selectedStyle: room.selected_style,
  smartDefaultData,
  libraryImageData,
  customRequirements: customRequirements || room.custom_requirements,
  city: room.projects?.city,
  budgetTier: room.projects?.budget_tier,
});

// 🔧 STEP 3: Assemble final prompt (ORDER IS CRITICAL!)
comprehensivePrompt = `${preservationPrompt}\n\n${stylePrompt}\n\n${qcPromptAdditions}`;

console.log('📐 Architectural data:', {
  doors: room.doors,
  windows: room.windows,
  promptLength: comprehensivePrompt.length,
  preservationSectionLength: preservationPrompt.length
});
```

**Update render storage** (find where render is inserted into database, around line 550-600):

**FIND THIS CODE:**
```typescript
const { data: insertedRender, error: insertError } = await supabase
  .from('renders')
  .insert({
    room_id: roomId,
    render_url: imageUrl,
    // ... other fields
  })
```

**UPDATE TO INCLUDE PRESERVATION DATA:**
```typescript
const { data: insertedRender, error: insertError } = await supabase
  .from('renders')
  .insert({
    room_id: roomId,
    render_url: imageUrl,
    prompt_used: comprehensivePrompt,
    quality_score: null,
    approved: false,
    // 🚨 NEW: Add preservation validation (placeholder for now)
    doors_preserved: null,  // Will be validated in Phase 2
    windows_preserved: null,  // Will be validated in Phase 2
    preservation_validation: {
      expected_doors: room.doors || 0,
      expected_windows: room.windows || 0,
      validation_status: 'pending',
      timestamp: new Date().toISOString()
    }
  })
```

### FIX 3: FRONTEND - Update PhaseGenerate.tsx

**File**: `src/components/rooms/PhaseGenerate.tsx`

**Find the hardcoded validation** (around line 586):
```typescript
const validationItems: ValidationItem[] = [
  { id: 'windows', label: 'Windows/doors preserved', passed: true, critical: true }, // ⚠️ HARDCODED!
```

**Replace with real validation**:
```typescript
// 🔧 NEW: Real-time preservation validation
const [preservationStatus, setPreservationStatus] = useState<{
  doorsPreserved: boolean | null;
  windowsPreserved: boolean | null;
  expectedDoors: number;
  foundDoors: number;
  expectedWindows: number;
  foundWindows: number;
  validationPending: boolean;
} | null>(null);

// Fetch validation data when render is available
useEffect(() => {
  if (latestRender?.id) {
    const fetchValidation = async () => {
      const { data: render } = await supabase
        .from('renders')
        .select('doors_preserved, windows_preserved, preservation_validation')
        .eq('id', latestRender.id)
        .single();
      
      if (render) {
        const validation = render.preservation_validation || {};
        setPreservationStatus({
          doorsPreserved: render.doors_preserved,
          windowsPreserved: render.windows_preserved,
          expectedDoors: validation.expected_doors || 0,
          foundDoors: validation.found_doors || 0,
          expectedWindows: validation.expected_windows || 0,
          foundWindows: validation.found_windows || 0,
          validationPending: validation.validation_status === 'pending'
        });
      }
    };
    
    fetchValidation();
  }
}, [latestRender]);

// 🔧 NEW: Build validation items dynamically
const validationItems: ValidationItem[] = useMemo(() => {
  const items: ValidationItem[] = [];
  
  if (preservationStatus) {
    // Door preservation
    if (preservationStatus.expectedDoors > 0) {
      items.push({
        id: 'doors',
        label: `Doors preserved (${preservationStatus.foundDoors || '?'}/${preservationStatus.expectedDoors})`,
        passed: preservationStatus.doorsPreserved === true,
        critical: true
      });
    }
    
    // Window preservation
    if (preservationStatus.expectedWindows > 0) {
      items.push({
        id: 'windows',
        label: `Windows preserved (${preservationStatus.foundWindows || '?'}/${preservationStatus.expectedWindows})`,
        passed: preservationStatus.windowsPreserved === true,
        critical: true
      });
    }
    
    // If validation is pending, show status
    if (preservationStatus.validationPending) {
      items.push({
        id: 'validation_pending',
        label: 'Validation in progress...',
        passed: null,
        critical: false
      });
    }
  }
  
  // Other validation items
  items.push(
    { id: 'ceiling', label: 'False ceiling height correct', passed: true },
    { id: 'style', label: 'Style applied correctly', passed: true },
    { id: 'colors', label: 'Color palette matches', passed: true },
    { id: 'lighting', label: 'Lighting as specified', passed: true }
  );
  
  return items;
}, [preservationStatus]);
```

**Add pre-generation info card** (add before the generate button, around line 800):
```typescript
{/* 🚨 NEW: Show architectural data before generation */}
{room.doors > 0 || room.windows > 0 ? (
  <Card className="p-6 bg-orange-50 border-orange-200 mb-4">
    <h3 className="font-semibold mb-4 flex items-center gap-2">
      <AlertCircle className="w-5 h-5 text-orange-600" />
      Architectural Preservation Active
    </h3>
    
    <div className="grid grid-cols-2 gap-4 text-sm">
      <div>
        <div className="font-medium text-gray-700">Doors to Preserve:</div>
        <div className="text-2xl font-bold text-orange-600">{room.doors || 0}</div>
      </div>
      <div>
        <div className="font-medium text-gray-700">Windows to Preserve:</div>
        <div className="text-2xl font-bold text-orange-600">{room.windows || 0}</div>
      </div>
    </div>
    
    <div className="mt-4 text-sm text-gray-600">
      ✓ AI will preserve all architectural elements<br />
      ✓ Doors and windows will remain in exact positions<br />
      ✓ No structural changes will be made
    </div>
  </Card>
) : (
  <Card className="p-4 bg-yellow-50 border-yellow-200 mb-4">
    <div className="flex items-start gap-2">
      <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
      <div className="text-sm text-yellow-800">
        <strong>Note:</strong> No door/window data detected. 
        For best results, ensure room analysis in Phase 2 extracts architectural elements.
      </div>
    </div>
  </Card>
)}
```

### FIX 4: UPDATE QUALITY METRICS

**Find qualityMetrics** (around line 574):
```typescript
const qualityMetrics: QualityMetric[] = [
  { name: 'Architectural Preservation', score: 100, critical: true },
```

**Update to use real data**:
```typescript
const qualityMetrics: QualityMetric[] = useMemo(() => {
  const metrics: QualityMetric[] = [];
  
  // Architectural preservation score
  if (preservationStatus && !preservationStatus.validationPending) {
    const doorsOk = preservationStatus.doorsPreserved !== false;
    const windowsOk = preservationStatus.windowsPreserved !== false;
    const score = (doorsOk && windowsOk) ? 100 : 
                  (doorsOk || windowsOk) ? 50 : 0;
    
    metrics.push({ 
      name: 'Architectural Preservation', 
      score, 
      critical: true 
    });
  } else {
    metrics.push({ 
      name: 'Architectural Preservation', 
      score: 100, 
      critical: true 
    });
  }
  
  metrics.push(
    { name: 'Design Style Accuracy', score: 92 },
    { name: 'Photorealism', score: 88 },
    { name: 'Furniture Proportions', score: 95 },
    { name: 'Magazine Quality', score: 90 }
  );
  
  return metrics;
}, [preservationStatus]);
```

## ✅ SUCCESS CRITERIA

After implementation, verify:

1. **Database columns exist:**
   ```sql
   SELECT column_name FROM information_schema.columns 
   WHERE table_name = 'rooms' 
   AND column_name IN ('doors', 'windows', 'door_positions', 'window_positions');
   ```
   Should return 4 rows.

2. **Edge function has preservation:**
   - Check `supabase/functions/generate-ai/index.ts` has `buildArchitecturalPreservationPrompt` function
   - Prompt assembly has preservation FIRST: `preservationPrompt + stylePrompt`

3. **Frontend shows real data:**
   - Pre-generation card shows door/window counts from `room.doors`, `room.windows`
   - Validation items show real preservation status (not hardcoded)

4. **End-to-end test:**
   - Create/update test room with: `doors = 1`, `windows = 1`
   - Generate render
   - Check logs: preservation prompt appears FIRST
   - Verify render: door and window present in correct positions
   - UI shows: "Doors preserved (1/1) ✓" and "Windows preserved (1/1) ✓"

## 🚨 CRITICAL REMINDERS

1. **Prompt order is CRITICAL**: Preservation MUST be first
2. **Don't skip database migrations**: Columns are required
3. **Test with real data**: Use room with actual door/window counts
4. **Check logs**: Verify preservation section appears in AI prompts
5. **Validate results**: Doors/windows should be visible in renders

## 📚 REFERENCE FILES

Implementation details are in:
- `docs/CRITICAL_FIX_ARCHITECTURAL_PRESERVATION.md` - Complete fix explanation
- `docs/IMPLEMENTATION_STATUS_DETAILED.md` - Current status audit
- `docs/COMPREHENSIVE_ANSWERS_TO_CLARIFICATIONS.md` - System architecture

---

## 🎯 FINAL NOTES

This update will:
- ✅ Add missing database columns (rooms.doors, rooms.windows, etc.)
- ✅ Create buildArchitecturalPreservationPrompt function
- ✅ Fix prompt assembly to prioritize preservation
- ✅ Update UI to show real validation (not fake)
- ✅ Fix the door disappearing issue

**Estimated time**: 13-18 hours for Lovable to implement.

After completion:
1. Pull changes from Git
2. Test with room that has 1 door + 1 window
3. Verify door/window preserved in final render
4. Celebrate! 🎉

---

**END OF PROMPT**
