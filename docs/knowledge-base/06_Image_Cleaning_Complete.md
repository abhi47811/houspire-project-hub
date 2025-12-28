# MODULE 6: IMAGE CLEANING & PREPARATION KNOWLEDGE BASE
## Phase 3: Clean & Prepare - Complete Pre-Processing System

**Purpose**: Transform raw property photos into clean canvases ready for staging  
**Phase**: 3 of 7 (Clean & Prepare)  
**Critical**: Quality cleaning = Quality staging output  
**Priority**: Architectural preservation during ALL cleaning operations

---

## OVERVIEW: CLEANING OBJECTIVES

### **Primary Goals:**
1. ✅ Remove ALL existing furniture, clutter, and temporary items
2. ✅ Create clean, neutral canvas for staging
3. ✅ Preserve 100% of architectural elements (doors, windows, walls)
4. ✅ Repair damage (stains, holes, scratches) 
5. ✅ Remove wires, cables, outlets (if in staging area)
6. ✅ Prepare optimal base for AI staging generation

### **NON-NEGOTIABLE Rules:**
- ❌ NEVER modify doors (position, size, style)
- ❌ NEVER modify windows (position, size, style)
- ❌ NEVER alter wall structure
- ❌ NEVER change room dimensions
- ❌ NEVER remove architectural features (molding, built-ins, columns)

---

## PART 1: REMOVAL DECISION ALGORITHM

### **WHAT TO REMOVE (Complete List)**

#### ✅ **FURNITURE - REMOVE ALL**
```
Decision: REMOVE 100% of existing furniture

Includes:
- Sofas, couches, sectionals
- Chairs (dining, accent, office)
- Tables (coffee, side, dining, desk)
- Beds and bedframes
- Dressers, cabinets (freestanding)
- Bookshelves (freestanding)
- Entertainment units, TV stands
- Benches, stools, ottomans
- Any movable furniture

Why: Will be replaced with styled furniture during staging
Method: Generative fill with texture matching
```

#### ✅ **CLUTTER & PERSONAL ITEMS - REMOVE ALL**
```
Decision: REMOVE 100% of clutter and personal belongings

Includes:
- Boxes, bags, suitcases
- Clothes (on floor, furniture, hanging)
- Toys, books (scattered)
- Personal photos, posters
- Kitchen items on counters
- Bathroom toiletries
- Papers, documents
- Random objects
- Moving boxes
- Storage containers

Why: Creates messy, unprofessional appearance
Method: Generative fill
```

#### ✅ **WALL DECORATIONS - REMOVE**
```
Decision: REMOVE old/personal wall items

Includes:
- Old artwork, posters
- Personal photographs
- Clocks (will add new styled ones)
- Wall-mounted shelves with personal items
- Bulletin boards, whiteboards
- Tapestries, macramé
- Personal memorabilia

Why: Will be replaced with styled decor
Method: Generative fill matching wall texture

PRESERVE: Built-in shelving structure, architectural niches
```

#### ✅ **WIRES & CABLES - REMOVE (Intelligent)**
```
Decision: REMOVE visible wires and cables strategically

Includes:
- Hanging electrical wires
- TV cables, phone chargers
- Extension cords on floor
- Visible cable management
- Ethernet cables
- Appliance cords (if visible and removable)

Method: 
- Trace wire path
- Intelligent inpainting along wire route
- Match background texture (wall/floor)
- Preserve where wire enters outlet/device (if keeping device)

Special Cases:
- Ceiling fan wire: Remove if replacing fan, keep if preserving fan
- Lamp cords: Remove with lamp, or hide if keeping lamp
```

#### ✅ **LIGHT SWITCHES & OUTLETS - CONDITIONAL REMOVAL**
```
Decision: CONTEXT-DEPENDENT

REMOVE IF:
- Located in middle of wall where staging furniture will go
- In prime staging area (will be covered by virtual furniture anyway)
- Visible and distracting in key photo areas
- Can be cleanly removed without architectural violation

KEEP IF:
- Required by electrical code appearance
- Near door/window (architectural area)
- On edge of photo (not central staging area)
- Removal would look unnatural

Method:
- Generative fill matching wall texture
- Ensure wall paint/texture continuous
- No visible seams or artifacts
```

#### ✅ **DAMAGE & IMPERFECTIONS - REPAIR**
```
Decision: REPAIR all visible damage

Includes:
- Wall stains, marks, scuffs
- Holes, cracks, dents in walls
- Ceiling damage, water stains
- Floor scratches, stains, damage
- Chipped paint, peeling wallpaper
- Broken tiles (floor, bathroom)
- Damaged woodwork

Why: Creates clean professional appearance
Method:
- Texture synthesis to match surrounding area
- Color matching to adjacent surface
- Preserve texture pattern (if present)
```

#### ✅ **OLD CEILING FANS - CONDITIONAL**
```
Decision: REMOVE if staging will add new styled fan

Process:
1. Carefully remove fan blades and housing
2. Preserve ceiling surface
3. Fill mounting point with ceiling texture
4. Ensure no visible removal artifacts
5. Keep ceiling perfectly clean for new virtual fan

ALWAYS REMEMBER: New staged room MUST have ceiling fan (Indian market)
So clean ceiling to accept new virtual fan installation
```

---

### **WHAT TO PRESERVE (NEVER REMOVE)**

#### ❌ **DOORS - ABSOLUTE PRESERVATION**
```
NEVER touch doors:
- Position: Locked
- Size: Locked
- Style: Locked
- Frame: Locked
- Hardware: Locked (if visible)
- Color: Keep (unless repainting entire room)

Cleaning Around Doors:
✓ Can remove furniture near door
✓ Can clean floor near door
✓ Can clean wall adjacent to door
✓ CANNOT modify door itself in any way

Quality Check:
- Door before cleaning = Door after cleaning (pixel-perfect)
```

#### ❌ **WINDOWS - ABSOLUTE PRESERVATION**
```
NEVER touch windows:
- Position: Locked
- Size: Locked  
- Style: Locked
- Frame: Locked
- Sill: Locked
- Glass: Keep (can subtly clean if very dirty)

Cleaning Around Windows:
✓ Can remove curtains/blinds (will add new styled ones)
✓ Can clean floor near window
✓ Can clean wall adjacent to window
✓ CANNOT modify window structure

Special Case - Window Treatments:
- Remove: Old curtains, blinds, shades (will add new)
- Preserve: Window frame, sill, glass structure
```

#### ❌ **WALLS - STRUCTURE PRESERVATION**
```
Wall Structure: LOCKED
Wall Surface: CAN CLEAN/REPAIR

Preserve:
- Wall position (room shape locked)
- Wall thickness
- Corners and edges
- Built-in features (niches, shelves, mantels)
- Architectural molding, trim
- Structural elements

Can Modify:
✓ Wall color (paint/texture matching during fill)
✓ Wall damage repair (stains, holes)
✓ Surface cleaning (marks, scuffs)
✓ Wallpaper removal (if needed)

Quality Check:
- Room shape identical before/after
- Wall positions unchanged
- Built-ins intact
```

#### ❌ **CEILING - STRUCTURE PRESERVATION**
```
Ceiling Structure: LOCKED

Preserve:
- Ceiling height (exact same)
- Ceiling type (flat, vaulted, tray, coffered)
- Beams (if exposed)
- Architectural details (molding, medallions)
- Ceiling openings (vents, skylights)

Can Modify:
✓ Remove old ceiling fan (if adding new virtual one)
✓ Repair damage (stains, cracks)
✓ Clean surface
✓ Remove hanging light fixtures (if replacing)

Quality Check:
- Ceiling height unchanged
- Structural features intact
```

#### ❌ **FLOOR - LAYOUT PRESERVATION**
```
Floor Layout: LOCKED
Floor Surface: CAN CLEAN/CHANGE MATERIAL

Preserve:
- Floor level (height)
- Room footprint (dimensions)
- Floor transitions (doorways, level changes)

Can Modify:
✓ Floor material (tile → wood, etc.)
✓ Floor finish (polish, texture)
✓ Damage repair (scratches, stains)
✓ Remove rugs (will add new styled ones)

Quality Check:
- Room dimensions same
- Floor level unchanged
- Transitions intact
```

#### ❌ **BUILT-IN FEATURES - PRESERVATION**
```
NEVER remove built-ins:
- Built-in shelving
- Built-in cabinets
- Fireplace mantels
- Kitchen cabinets (built-in)
- Bathroom vanities (built-in)
- Window seats
- Architectural niches
- Crown molding
- Baseboards
- Columns, pillars

Can Clean:
✓ Remove items ON built-in shelves
✓ Clean surface of built-ins
✓ Repair damage to built-ins
✓ CANNOT remove the built-in structure itself
```

---

## PART 2: CLEANING TECHNIQUES

### **TECHNIQUE 1: AO-STYLE CLEANING (Ambient Occlusion Approach)**

**What is AO-Style Cleaning:**
Your proprietary method - uses ambient occlusion understanding to clean intelligently while preserving depth, shadows, and architectural features.

**Core Principles:**
```
1. Analyze lighting and shadows BEFORE cleaning
2. Preserve contact shadows (where walls meet floor, corners)
3. Maintain ambient occlusion in room corners
4. Keep depth cues during furniture removal
5. Match existing light quality after cleaning
```

**Step-by-Step AO-Style Cleaning:**

```
STEP 1: SHADOW ANALYSIS
- Identify primary light source direction
- Map existing shadows (where furniture casts shadow)
- Note ambient occlusion areas (corners, contacts)
- Understand room's light and depth

STEP 2: SELECTIVE REMOVAL
- Remove furniture but PRESERVE floor contact shadows (subtle)
- Remove clutter but KEEP corner darkening
- Clear walls but MAINTAIN texture and lighting
- Clean but DON'T flatten (keep 3D depth cues)

STEP 3: INTELLIGENT FILL
- Use surrounding texture to fill removed areas
- Match lighting gradient (darker in corners, lighter near windows)
- Preserve floor-to-wall contact shadows (2-3mm dark line)
- Maintain atmospheric depth (subtle variations)

STEP 4: DEPTH PRESERVATION
- Keep slight corner darkening (10-15% darker than center)
- Preserve light falloff from window
- Maintain subtle shadow under where new furniture will go
- Don't create "flat" uniformly lit surfaces

RESULT: Clean room that maintains 3D depth, natural lighting, and realistic spatial cues
```

**AO-Style Quality Checks:**
```
✓ Room still has depth (not flat 2D)
✓ Corners subtly darker than center
✓ Light falloff from window preserved
✓ Floor-wall contact has subtle shadow line
✓ Texture variations maintained (not uniform)
✓ Ready for realistic furniture staging
```

---

### **TECHNIQUE 2: WIRE & CABLE REMOVAL**

**Intelligent Wire Removal Protocol:**

**Step 1: Wire Identification**
```
Identify:
- Wire path (start to end)
- Wire thickness (1-5mm typically)
- Background surface (wall, floor, ceiling)
- Wire color vs background
- Shadow cast by wire (if any)
```

**Step 2: Background Analysis**
```
Analyze surface behind/around wire:
- Texture pattern (wood grain, wall paint, tile)
- Color gradient (any shading)
- Lighting (brighter/darker areas)
- Existing features (don't remove with wire)
```

**Step 3: Removal Execution**
```
Method: Intelligent inpainting

1. Trace Wire Path:
   - Create precise mask along wire (1-2mm wider than wire)
   - Include wire shadow in mask if present
   
2. Generate Fill:
   - Match background texture precisely
   - Continue texture pattern (if wood grain/tile)
   - Match color gradient
   - Preserve lighting direction
   
3. Edge Blending:
   - Feather mask edges (0.5-1mm)
   - Ensure seamless transition
   - No visible inpainting boundaries
   
4. Shadow Handling:
   - If wire cast shadow, remove shadow too
   - Preserve underlying surface shadow (if any)
```

**Special Cases:**

**Ceiling Fan Wire:**
```
IF: Removing old ceiling fan
THEN:
  1. Remove fan blades, housing, visible wires
  2. Preserve ceiling texture
  3. Fill mounting point with ceiling material
  4. Ensure smooth ceiling for new virtual fan
  5. Quality check: No visible removal artifacts
```

**Floor Extension Cord:**
```
Process:
1. Trace cord path across floor
2. Identify floor material (wood, tile, carpet)
3. Continue floor pattern across cord path
4. Match floor lighting (darker away from window)
5. Preserve floor texture (grain direction, tile grout)
```

**Wall Outlet with Visible Wires:**
```
Decision Tree:
- If outlet in staging area → Remove outlet + wires
- If outlet at room edge → Keep outlet, remove only wires
- If outlet required for realism → Keep, hide wires behind virtual furniture

Method:
1. Remove wires first (inpaint with wall texture)
2. If removing outlet, match wall texture/color
3. Preserve wall imperfections (not perfect smooth)
4. Check lighting consistency
```

---

### **TECHNIQUE 3: WALL DAMAGE REPAIR**

**Repairing While Preserving Architecture:**

**Stain Removal:**
```
Process:
1. Identify stain type (water, marks, discoloration)
2. Sample clean wall color nearby
3. Match wall texture (smooth, orange peel, knockdown)
4. Fill stain area with matched texture/color
5. Blend edges seamlessly
6. Preserve wall structure (no dimension change)

Quality Check:
✓ Color matches surrounding wall
✓ Texture pattern continuous
✓ No visible repair boundaries
✓ Wall surface natural (not too perfect)
```

**Hole & Crack Repair:**
```
Process:
1. Identify damage (nail holes, cracks, dents)
2. Analyze wall surface around damage
3. Generate fill matching wall texture
4. Ensure no raised/depressed areas (flat surface)
5. Match wall color precisely
6. Add subtle texture variation (not uniform)

Critical:
- Wall must remain FLAT (no 3D changes)
- Texture must CONTINUE (not stop at repair)
- Color must MATCH (sample from nearby)
- Result must look NATURAL (not patched)
```

**Peeling Paint/Wallpaper:**
```
Process:
1. Remove peeling area (create clean edge)
2. Sample intact surface nearby
3. Extend surface texture over damaged area
4. Match color and pattern
5. Blend seamlessly

For Wallpaper:
- If pattern, continue pattern correctly
- Match pattern alignment
- Preserve seam appearance (if visible)
```

---

### **TECHNIQUE 4: FLOOR CLEANING & REPAIR**

**Floor Surface Cleaning:**

**Wood Floor:**
```
Common Issues: Scratches, stains, scuffs

Repair Process:
1. Identify wood grain direction
2. Sample clean floor area nearby
3. Continue grain pattern over damage
4. Match wood color (may have variations)
5. Preserve natural wood imperfections
6. Don't make TOO perfect (needs character)

Floor Characteristics to Preserve:
- Grain direction consistency
- Natural color variation (±10%)
- Plank boundaries (if visible)
- Slight imperfections (authentic wood)
```

**Tile Floor:**
```
Common Issues: Cracked tiles, stains, grout damage

Repair Process:
1. Identify tile pattern and layout
2. Sample intact tiles
3. Replace damaged tiles digitally
4. Match grout lines exactly
5. Preserve tile spacing and alignment
6. Match tile color and sheen

Critical:
- Grout lines must be STRAIGHT
- Tile pattern must CONTINUE correctly
- Color must MATCH neighboring tiles
- Reflection/sheen must be CONSISTENT
```

**Carpet:**
```
Common Issues: Stains, wear patterns, damage

Repair Process:
1. Sample clean carpet texture nearby
2. Match carpet pile direction
3. Continue texture over stained area
4. Match color (carpets have variation)
5. Preserve carpet texture randomness

Quality:
- Texture must look fibrous (not smooth)
- Color natural (slightly varied)
- No visible patch boundaries
```

---

### **TECHNIQUE 5: TEXTURE MATCHING & SYNTHESIS**

**Critical Skill: Matching Background Textures**

**Wall Textures:**
```
Common Types:
1. Flat/Smooth: Simple color match
2. Orange Peel: Subtle bumpy texture
3. Knockdown: Irregular flattened bumps
4. Popcorn: Rough textured (older homes)

Matching Process:
- Sample texture from clean area (10x10cm)
- Analyze texture pattern frequency
- Generate similar texture for fill area
- Ensure seamless edge blending
- Preserve lighting gradient across texture
```

**Floor Textures:**
```
Wood:
- Grain direction (parallel boards)
- Grain spacing (2-5mm typical)
- Color variation (natural)
- Knots and natural marks

Tile:
- Pattern repetition (continue pattern)
- Grout width (1-2mm)
- Tile size consistency
- Color matching (sample multiple tiles)

Carpet:
- Pile direction (one way)
- Texture randomness (not uniform)
- Color variation (slight)
- Fiber appearance (not smooth)
```

**Ceiling Textures:**
```
Types:
- Smooth painted
- Popcorn/Acoustic
- Textured/Stippled

Matching:
- Sample from undamaged area
- Continue texture pattern
- Match paint sheen (flat, eggshell, satin)
- Preserve any imperfections
```

---

## PART 3: QUALITY VERIFICATION FOR CLEANED IMAGES

### **PRE-STAGING QUALITY CHECKLIST**

**Before Passing to Phase 5 (Generation), Verify:**

#### **1. ARCHITECTURAL PRESERVATION (22/22 Required)**
```
☑ All doors preserved (position, size, style)
☑ All windows preserved (position, size, style)
☑ Wall structure unchanged (room shape identical)
☑ Ceiling structure preserved (height, type)
☑ Floor layout identical (dimensions same)
☑ Built-in features intact (shelves, cabinets, niches)
☑ Molding/trim preserved
☑ Columns/beams preserved (if present)
☑ Room dimensions unchanged
☑ Architectural details intact

SCORE: ___/22

MUST BE: 22/22 (100%) to proceed
IF BELOW: Re-clean with corrections
```

---

#### **2. REMOVAL COMPLETENESS**
```
☑ All furniture removed
☑ All clutter removed
☑ All personal items removed
☑ Wall decorations removed (unless architectural)
☑ Old curtains/blinds removed
☑ Visible wires/cables removed
☑ Distracting outlets removed (if applicable)
☑ Old ceiling fan removed (if replacing)
☑ Room is "clean canvas" ready for staging

SCORE: ___/9

PASSING: 8/9+ (one minor item acceptable)
```

---

#### **3. DAMAGE REPAIR QUALITY**
```
☑ Wall stains removed/repaired
☑ Holes and cracks filled
☑ Floor damage repaired
☑ Ceiling damage repaired
☑ Paint peeling addressed
☑ All repairs seamless (no visible boundaries)
☑ Texture matching accurate
☑ Color matching accurate

SCORE: ___/8

PASSING: 7/8+ (minor imperfection acceptable)
```

---

#### **4. INPAINTING QUALITY**
```
☑ No visible artifacts (ghosting, halos, distortions)
☑ No seam lines visible
☑ Texture continuous (no pattern breaks)
☑ Color consistent across fills
☑ Lighting gradient preserved
☑ Edge blending seamless
☑ No AI-generated weirdness
☑ Natural appearance overall

SCORE: ___/8

PASSING: 7/8+ 
```

---

#### **5. DEPTH & LIGHTING PRESERVATION (AO-Style)**
```
☑ Room maintains 3D depth (not flat)
☑ Corner ambient occlusion preserved (10-15% darker)
☑ Light falloff from window maintained
☑ Floor-wall contact shadows present (subtle 2-3mm)
☑ Lighting direction consistent
☑ No "flat" uniform lighting
☑ Shadow cues maintained
☑ Atmospheric depth present

SCORE: ___/8

PASSING: 7/8+
```

---

#### **6. TEXTURE QUALITY**
```
☑ Wall texture natural and continuous
☑ Floor texture matches surrounding
☑ Ceiling texture consistent
☑ Grain direction correct (if wood)
☑ Tile patterns aligned (if tile)
☑ No visible repeating patterns (tiling artifacts)
☑ Imperfections present (not TOO perfect)
☑ Material appearance realistic

SCORE: ___/8

PASSING: 7/8+
```

---

### **OVERALL CLEANING QUALITY SCORE**

```
Total Points: 63 possible

SCORE RANGES:
58-63 (92%+) = Excellent → APPROVE for staging
52-57 (82-91%) = Good → Minor touch-ups, then approve  
46-51 (73-81%) = Acceptable → Revise problem areas
Below 46 (< 73%) = REJECT → Re-clean

CRITICAL:
- Architectural Preservation MUST be 22/22 (non-negotiable)
- If architecture score < 22, AUTOMATIC REJECTION regardless of other scores
```

---

## PART 4: SPECIFIC CLEANING SCENARIOS

### **SCENARIO 1: EMPTY ROOM WITH OLD FURNITURE**

**Input**: Room with outdated furniture that needs complete replacement

**Cleaning Process:**
```
1. Remove ALL furniture:
   - Sofa, chairs, tables, etc.
   - Use generative fill matching floor texture
   - Preserve floor-wall contact shadows (subtle)
   
2. Remove wall decorations:
   - Old artwork, photos, clocks
   - Fill with wall texture matching
   - Maintain wall lighting gradient
   
3. Remove old ceiling fan:
   - Clean removal (no artifacts)
   - Fill ceiling mounting point
   - Prepare for new virtual fan
   
4. Repair any damage:
   - Wall marks, stains
   - Floor scratches
   - Ceiling imperfections
   
5. Quality check:
   - Doors/windows intact
   - Clean canvas achieved
   - No artifacts
   - Ready for staging

OUTPUT: Clean empty room, all architecture preserved, ready for styled furniture
```

---

### **SCENARIO 2: CLUTTERED ROOM**

**Input**: Room filled with personal items, mess, boxes

**Cleaning Process:**
```
1. Remove ALL clutter first:
   - Boxes, bags, clothes
   - Personal items, toys
   - Papers, objects
   - Create clean floor/surfaces
   
2. Then remove furniture:
   - Identify furniture vs clutter
   - Remove furniture pieces
   - Clean fill all areas
   
3. Address wall clutter:
   - Remove posters, personal photos
   - Clean bulletin boards
   - Remove temporary wall items
   
4. Wire management:
   - Remove visible cables
   - Clean charging stations
   - Hide/remove extension cords
   
5. Deep clean:
   - Repair any hidden damage
   - Clean all surfaces
   - Create pristine base

OUTPUT: Transformed from cluttered to clean professional space
```

---

### **SCENARIO 3: POORLY FURNISHED ROOM**

**Input**: Room has some good furniture, some bad - selective removal

**Decision Tree:**
```
For Each Furniture Piece:
  IF: Piece is styling target (will be replaced) → REMOVE
  IF: Piece is good quality but wrong style → REMOVE (will add styled version)
  IF: Built-in feature → PRESERVE (cannot remove)
  
Examples:
- Old sofa → REMOVE (will add styled sofa)
- Cheap side table → REMOVE (will add styled table)  
- Built-in bookshelf → PRESERVE (can style with new items)
- Damaged furniture → REMOVE
- Generic furniture → REMOVE (will add specific style)

Basically: Remove EVERYTHING except built-ins
This creates clean canvas for complete styling
```

---

### **SCENARIO 4: DAMAGED WALLS/FLOOR**

**Input**: Room structure fine but surfaces damaged

**Cleaning Process:**
```
1. Wall Damage Assessment:
   - Stains, marks, scuffs
   - Holes, cracks, dents
   - Peeling paint
   - Water damage
   
2. Systematic Repair:
   - Start with largest damage areas
   - Use texture matching for each repair
   - Blend edges carefully
   - Maintain wall structure (no 3D changes)
   
3. Floor Damage:
   - Scratches → Continue grain pattern
   - Stains → Match floor color
   - Broken tiles → Replace digitally
   - Carpet stains → Texture synthesis
   
4. Quality Verification:
   - All repairs seamless
   - Texture continuous
   - Color matched
   - No visible boundaries

OUTPUT: Surfaces repaired, clean, professional appearance
```

---

### **SCENARIO 5: WIRE/CABLE HEAVY ROOM**

**Input**: Lots of visible wires, cables, tech setup

**Cleaning Process:**
```
1. Wire Inventory:
   - List all visible wires
   - Note wire paths
   - Identify which to remove
   
2. Systematic Removal:
   Priority order:
   a) Hanging wires (most visible)
   b) Floor cables (trip hazards look bad)
   c) Wall-mounted cables
   d) Behind-furniture wires (if furniture being removed)
   
3. Intelligent Inpainting:
   - Trace each wire precisely
   - Match background texture (wall/floor)
   - Remove wire shadows too
   - Blend seamlessly
   
4. Outlet Handling:
   - Remove outlets in staging areas
   - Keep outlets at room edges
   - Fill cleanly if removing
   
5. Final Clean:
   - No visible wire remnants
   - All surfaces continuous
   - Natural appearance

OUTPUT: Wire-free clean room ready for staging
```

---

### **SCENARIO 6: BATHROOM CLEANING**

**Input**: Bathroom with old fixtures, toiletries, personal items

**Cleaning Process:**
```
PRESERVE (Built-in/Structural):
- Toilet (cannot remove - built-in plumbing)
- Sink/Vanity (if built-in)
- Bathtub/Shower (structural)
- Tiles (if good condition, part of structure)
- Medicine cabinet (if built-in)

REMOVE:
- Toiletries, personal items
- Shower curtain (if ugly - will add styled one)
- Bath mat, towels
- Soap, bottles, etc.
- Countertop clutter
- Old decorations

REPAIR:
- Grout stains
- Tile damage
- Water stains on walls/ceiling
- Countertop marks

SPECIAL CONSIDERATIONS:
- Keep toilet/fixtures unless virtual staging plan includes replacing them
- Clean glass/mirrors (remove water spots)
- Make sterile, hotel-like clean appearance

OUTPUT: Clean bathroom, structural fixtures intact, ready for styling with towels/accessories
```

---

### **SCENARIO 7: KITCHEN CLEANING**

**Input**: Kitchen with appliances, countertop items, clutter

**Cleaning Process:**
```
PRESERVE (Built-in):
- Kitchen cabinets (built-in)
- Countertops (structural)
- Sink (built-in plumbing)
- Built-in appliances (if present)
- Backsplash (structural)

REMOVE:
- Countertop appliances (toaster, microwave if freestanding)
- Dishes, utensils visible
- Refrigerator magnets, notes
- Clutter on counters
- Old dish rack
- Cleaning supplies visible
- Personal items

CONDITIONAL:
- Freestanding refrigerator: Usually keep (large removal, may look empty)
- Stove: Usually keep (if built-in or slide-in)
- Dishwasher: Keep (built-in)

REPAIR:
- Countertop stains
- Cabinet marks/damage
- Backsplash grout
- Floor damage

GOAL: Clean, minimal kitchen ready for styled accessories
```

---

## PART 5: EDGE CASES & SPECIAL SITUATIONS

### **EDGE CASE 1: What if Furniture is Covering Damage?**

**Problem**: Removing furniture reveals floor/wall damage underneath

**Solution:**
```
1. Remove furniture first (as planned)
2. Newly revealed damage will be visible
3. Assess damage type (stains, marks, wear)
4. Repair damage using texture matching
5. Match surrounding floor/wall texture
6. Blend seamlessly
7. Result: Clean surface ready for new virtual furniture

IMPORTANT: 
- Don't assume floor/wall under furniture is perfect
- Be prepared for hidden damage
- Budget extra time for repairs
- Use texture synthesis to fix
```

---

### **EDGE CASE 2: What if Room is Already Empty?**

**Problem**: Room already empty, what to clean?

**Solution:**
```
If room is empty:
1. Check for wall damage (marks, holes, stains) → Repair
2. Check for floor damage (scratches, stains) → Repair  
3. Remove any remaining wall decorations → Clean
4. Remove old ceiling fan (if ugly) → Prepare for new
5. Ensure surfaces perfect → Clean canvas
6. Verify architecture intact → Preserve

Even "empty" rooms may need:
- Damage repair
- Surface cleaning
- Preparation for staging

OUTPUT: Pristine empty room ready for furniture
```

---

### **EDGE CASE 3: What if There's a Person in Photo?**

**Problem**: Property photo has person visible

**Solution:**
```
REMOVE person using generative fill:

Process:
1. Identify person location
2. Assess what's behind person (wall, floor, furniture)
3. Remove person
4. Fill with background (wall texture if against wall, floor if standing on floor)
5. Ensure seamless removal
6. No ghost artifacts
7. Natural appearance

Quality Check:
✓ No person remnants (hands, feet, shadows)
✓ Background continuous
✓ Lighting consistent where person was
✓ No strange artifacts

This is HIGH PRIORITY - cannot stage with people in photo
```

---

### **EDGE CASE 4: What if Ceiling Fan is Nice and Matches Style?**

**Problem**: Existing ceiling fan actually matches the styling plan

**Solution:**
```
Decision Tree:

IF: Existing fan matches target style AND is high quality
THEN: KEEP the fan
  - Don't remove
  - May need to clean/enhance slightly
  - Preserve as-is
  
IF: Existing fan is generic/builder-grade/doesn't match style
THEN: REMOVE and prepare for virtual replacement
  - Remove fan cleanly
  - Fill ceiling mounting
  - Will add styled fan during staging

REMEMBER: All Indian interiors MUST have ceiling fan
So if removing old one, staging MUST include new styled one
```

---

### **EDGE CASE 5: What About Architectural Lighting (Recessed, Chandeliers)?**

**Problem**: Should we remove existing lighting fixtures?

**Solution:**
```
RECESSED LIGHTING (Built-in):
- PRESERVE (architectural feature)
- Cannot remove (built into ceiling)
- Keep as-is, may be visible in staged render

CHANDELIERS/PENDANT LIGHTS (Freestanding):
Decision:
- If matches target style → KEEP
- If doesn't match OR is ugly → REMOVE
  - Remove fixture cleanly
  - Fill ceiling mounting point
  - Will add styled lighting during staging

WALL SCONCES:
- Usually REMOVE (will add styled versions)
- Fill wall holes cleanly
- Match wall texture

GENERAL RULE:
Built-in = Keep
Freestanding/Decorative = Remove (will add styled versions)
```

---

## PART 6: INTEGRATION WITH OVERALL PIPELINE

### **Phase 3 Position in 7-Phase Pipeline:**

```
PHASE 1: Setup
- User uploads original photo
- Selects room type + style
- System initialized
    ↓
PHASE 2: Tag & Analyze  
- AI analyzes photo
- Detects room dimensions
- Identifies architecture (doors, windows)
- Maps existing furniture, clutter
- Assesses damage
- Creates cleaning plan
    ↓
PHASE 3: Clean & Prepare ← THIS MODULE
- Execute cleaning using Module 6 knowledge
- Remove furniture, clutter, damage
- Preserve architecture (Module 3 rules apply)
- Create clean canvas
- Quality verify (22/22 architecture + cleaning score)
    ↓
PHASE 4: Customize
- Apply style preferences
- Load style-specific rules (Module 4)
- Prepare generation parameters
    ↓
PHASE 5: Generate
- AI generates styled furniture (Module 1, 2, 4)
- Applies materials, lighting, style
- Creates staged render
    ↓
PHASE 6: Review
- Quality check (Module 7+9)
- Score 0-10
- Approve/Refine/Reject
    ↓
PHASE 7: Export
- Final post-processing
- Deliver to client
```

### **Module 6 Dependencies:**

**Uses from Other Modules:**
- **Module 3**: Architectural preservation rules (same rules apply during cleaning)
- **Module 2**: Lighting analysis (preserve lighting direction during cleaning)
- **Module 7+9**: Quality verification framework (adapted for cleaning)

**Feeds Into:**
- **Phase 5 Generation**: Clean base enables better staging
- **Module 1-4**: Clean canvas for applying materials, lighting, styles

---

## PART 7: CLEANING QUALITY GATES

### **GATE 1: Architectural Preservation Check**
```
BEFORE proceeding to Phase 4:

Run Architectural Verification (from Module 3):
☑ Doors: 100% preserved
☑ Windows: 100% preserved  
☑ Walls: Structure preserved
☑ Ceiling: Structure preserved
☑ Floor: Layout preserved
☑ Built-ins: All intact

MUST PASS: 22/22 (100%)

IF FAIL: STOP → Re-clean → Fix violations → Re-verify
IF PASS: Proceed to Gate 2
```

### **GATE 2: Cleaning Completeness Check**
```
Verify cleaning objectives met:
☑ All furniture removed
☑ All clutter removed
☑ All damage repaired
☑ All wires removed (as applicable)
☑ Room is "clean canvas"

MUST PASS: 8/9+

IF FAIL: Complete remaining cleaning tasks
IF PASS: Proceed to Gate 3
```

### **GATE 3: Inpainting Quality Check**
```
Verify technical quality:
☑ No artifacts, ghosting, halos
☑ Textures continuous and seamless
☑ Colors matched accurately
☑ Edges blended perfectly
☑ Lighting preserved
☑ Depth maintained (AO-style)

MUST PASS: 7/8+

IF FAIL: Fix inpainting issues → Re-verify
IF PASS: APPROVE for Phase 4 (Customize)
```

---

## SUMMARY: CLEANING SUCCESS CRITERIA

**A successfully cleaned image must:**

✅ **100% Architectural Preservation** (22/22 mandatory)
✅ **Complete Removal** (furniture, clutter, damage)
✅ **Seamless Inpainting** (no visible artifacts)
✅ **Texture Continuity** (walls, floors, ceiling natural)
✅ **Lighting Preserved** (AO-style depth maintained)
✅ **Damage Repaired** (professional appearance)
✅ **Ready for Staging** (clean canvas state)

**Quality Score Target:** 52+/63 (82%+)

**Critical Non-Negotiable:** Architectural preservation 22/22 (100%)

---

## FINAL CLEANING WORKFLOW SUMMARY

```
INPUT: Original property photo with furniture, clutter, damage
    ↓
ANALYZE: Identify what to remove vs preserve
    ↓
REMOVE: Furniture, clutter, wires, decorations
    ↓
PRESERVE: Doors, windows, walls, ceiling, floor structure, built-ins
    ↓
REPAIR: Damage (walls, floors, ceiling)
    ↓
INPAINT: Use texture matching, maintain depth
    ↓
VERIFY: Quality gates (architecture 22/22, cleaning 52+/63)
    ↓
OUTPUT: Clean canvas ready for Phase 5 (Generation)
```

---

**END OF MODULE 6**

**Knowledge Base Status**: NOW COMPLETE with cleaning system  
**Full Pipeline Coverage**: Phases 2-7 all covered  
**Ready for**: Complete end-to-end production workflow
