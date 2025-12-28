# MODULE 2: LIGHTING BEHAVIOR SYSTEM
## Complete Lighting Physics for Photorealistic Generation

**Purpose**: Define how light behaves in real environments for AI to simulate accurately  
**Critical for**: Shadow direction, light quality, atmospheric effects, photorealism  
**Rule**: ALWAYS analyze original photo lighting BEFORE generation

---

## STEP 1: ANALYZE ORIGINAL PHOTO LIGHTING

### Before generating ANY render, AI MUST detect:

**1. Primary Light Source**
- [ ] Window on LEFT wall
- [ ] Window on RIGHT wall  
- [ ] Window on FRONT wall (behind camera)
- [ ] Window on BACK wall (in view)
- [ ] Ceiling lights
- [ ] No obvious source (ambient/diffused)

**2. Time of Day** (from light color/quality)
- [ ] Morning (7-10am): Cool, low angle, soft
- [ ] Midday (11am-2pm): Bright, harsh, overhead
- [ ] Afternoon (2-5pm): Warm, medium angle
- [ ] Evening (5-7pm): Golden, low angle, warm
- [ ] Overcast: Soft, diffused, no hard shadows

**3. Light Temperature**
- [ ] Cool (6000-7000K): Morning, shaded, north-facing
- [ ] Neutral (5000-5500K): Midday, balanced
- [ ] Warm (3000-4000K): Afternoon, evening, incandescent

**4. Shadow Quality**
- [ ] Hard shadows: Direct sunlight, sharp edges
- [ ] Soft shadows: Diffused light, gradual falloff
- [ ] No shadows: Very overcast or even artificial light

---

## NATURAL LIGHT PHYSICS

### WINDOW LIGHT BEHAVIOR

**Direct Sunlight Through Window:**

**Characteristics:**
- **Intensity**: High (10,000-100,000 lux)
- **Direction**: Follows sun position
- **Quality**: Hard, creates defined shadows
- **Color**: 5000-6500K (cooler in morning, warmer in afternoon)
- **Falloff**: Rapid - intensity halves every 6-8 feet from window
- **Pattern**: Rectangular window shape visible on floor/wall

**Shadow Properties:**
- **Edge Sharpness**: Hard edges (2-5mm penumbra)
- **Density**: Dark, defined shadows
- **Direction**: Away from window at angle matching sun
- **Length**: Longer in morning/evening, shorter at midday

**Generation Rules:**
```
IF: Direct sunlight detected
THEN: 
  - Create rectangular light patch on floor matching window shape
  - Cast hard shadows from all objects (2-5mm soft edge)
  - Shadow direction: Away from window at 30-60° angle
  - Light intensity: Brightest near window, 50% at 8 feet
  - Color temp: 5500K (neutral sunlight)
  - Visible dust particles in light beam (volumetric)
```

**Prompt Keywords:**
```
"direct afternoon sunlight streaming through left window, hard shadows cast at 45-degree angle away from window, rectangular light pattern on floor, volumetric light rays with dust particles visible, high contrast lighting, 5500K color temperature, shadow density 0.7, sharp shadow edges (3mm penumbra)"
```

---

**Diffused Daylight Through Window:**

**Characteristics:**
- **Intensity**: Medium (1,000-5,000 lux)
- **Direction**: General from window, no defined beam
- **Quality**: Soft, gentle
- **Color**: 6000-6500K (slightly cool)
- **Falloff**: Gradual - gentle decrease across room
- **Pattern**: No defined window shape, overall glow

**Shadow Properties:**
- **Edge Sharpness**: Soft edges (20-40mm penumbra)
- **Density**: Light, subtle shadows
- **Direction**: Subtle, generally away from window
- **Visibility**: Low contrast, gentle

**Generation Rules:**
```
IF: Diffused daylight (curtains, overcast, north-facing)
THEN:
  - Soft overall illumination from window side
  - Gentle shadows with 30mm soft edges
  - Light falloff is gradual (70% at 12 feet)
  - Color temp: 6200K (cool daylight)
  - No harsh contrasts, even lighting
  - Subtle volumetric glow (minimal particles)
```

**Prompt Keywords:**
```
"soft diffused daylight through sheer curtains on right window, gentle even illumination, subtle soft shadows (30mm penumbra), light falloff gradual across room, 6200K cool daylight, low contrast, peaceful ambient lighting"
```

---

### SUN POSITION BY TIME (INDIA)

**Morning (7-10am):**
- **Sun Angle**: Low (15-35° above horizon)
- **Light Direction**: Long angled rays
- **Shadow Length**: Long (2-3× object height)
- **Color Temperature**: 6000-7000K (cool, bluish)
- **Quality**: Soft to moderate
- **Best for**: Bedrooms, east-facing rooms

**Generation Rules:**
```
Morning Light:
- Shadow length = Object height × 2.5
- Shadow direction: West (away from east window)
- Angle: 25° from horizontal
- Color: Cool white (#F0F8FF), 6500K
- Intensity: Medium-bright
```

---

**Midday (11am-2pm):**
- **Sun Angle**: High (60-80° above horizon)
- **Light Direction**: Nearly overhead
- **Shadow Length**: Short (0.5-1× object height)
- **Color Temperature**: 5500-6000K (neutral white)
- **Quality**: Harsh, high contrast
- **Character**: Intense, bright

**Generation Rules:**
```
Midday Light:
- Shadow length = Object height × 0.7
- Shadow direction: Directly below/slightly offset
- Angle: 70° from horizontal (nearly down)
- Color: Bright white (#FFFFFF), 5800K
- Intensity: Very high
- Warning: Can be too harsh - often avoid for staging
```

---

**Afternoon (2-5pm):**
- **Sun Angle**: Medium (30-50° above horizon)
- **Light Direction**: Angled, pleasant
- **Shadow Length**: Medium (1-1.5× object height)
- **Color Temperature**: 4500-5500K (warm white)
- **Quality**: Balanced, ideal
- **Best for**: Living rooms, most staging

**Generation Rules:**
```
Afternoon Light:
- Shadow length = Object height × 1.2
- Shadow direction: East (away from west window)
- Angle: 40° from horizontal
- Color: Warm white (#FFF8F0), 5000K
- Intensity: Bright, pleasant
- This is IDEAL for most renders
```

**Prompt Keywords:**
```
"pleasant afternoon sunlight (2-4pm) from west window, warm white 5000K color temperature, balanced shadows at 40-degree angle (shadow length 1.2× object height), medium contrast, ideal interior lighting, natural warm glow"
```

---

**Evening/Golden Hour (5-7pm):**
- **Sun Angle**: Low (5-20° above horizon)
- **Light Direction**: Very long angled rays
- **Shadow Length**: Very long (3-5× object height)
- **Color Temperature**: 3000-4000K (golden, warm)
- **Quality**: Magical, dramatic
- **Character**: Rich, warm, atmospheric

**Generation Rules:**
```
Golden Hour Light:
- Shadow length = Object height × 4
- Shadow direction: Long, dramatic
- Angle: 10° from horizontal (nearly horizontal rays)
- Color: Golden (#FFD700), 3500K
- Intensity: Moderate, rich
- Creates warm, cozy atmosphere
```

**Prompt Keywords:**
```
"golden hour evening light (5:30pm) streaming through window, rich warm 3500K golden glow, dramatic long shadows (4× object height), low-angle light rays, atmospheric warm lighting, magical quality, cozy ambiance"
```

---

### INDIAN CLIMATE SPECIFIC LIGHTING

**Summer Harsh Sun (March-June):**

**Characteristics:**
- **Intensity**: Extremely high
- **Contrast**: Very high (bright highlights, dark shadows)
- **Color**: 7000-8000K (very cool, almost blue)
- **Heat Shimmer**: Slight atmospheric distortion
- **Dust**: Visible particles in air

**Generation Rules:**
```
Indian Summer Sun:
- Extremely bright highlights (overexposed look near window)
- Very dark shadows (contrast 0.9)
- Cool color temperature: 7500K
- Visible dust particles (volumetric haze)
- Heat shimmer effect (minimal, 0.5% distortion)
- High atmospheric scattering
```

**Prompt Keywords:**
```
"harsh Indian summer afternoon sunlight, extremely bright window light, high contrast (0.9), dark defined shadows, cool 7500K temperature, visible dust in air creating slight haze, heat shimmer effect, intense tropical lighting"
```

---

**Monsoon Diffused Light (June-September):**

**Characteristics:**
- **Intensity**: Low to medium
- **Contrast**: Low (soft, even)
- **Color**: 6000-6500K (cool, overcast)
- **Quality**: Very diffused, gentle
- **Atmosphere**: Humid, soft

**Generation Rules:**
```
Monsoon Light:
- Soft, even illumination (no hard shadows)
- Cool overcast color: 6200K
- Low contrast (0.3)
- Atmospheric moisture (slight haze)
- Gentle, peaceful lighting
- Shadow softness: 40mm penumbra
```

**Prompt Keywords:**
```
"soft monsoon diffused daylight, overcast sky light through window, gentle even illumination, minimal shadows (40mm soft edges), cool 6200K color temperature, low contrast (0.3), atmospheric moisture creating soft haze, peaceful rainy day lighting"
```

---

## ARTIFICIAL LIGHT PHYSICS

### CEILING LIGHTS (LED/CFL)

**Warm White LED (2700-3000K):**

**Characteristics:**
- **Color**: Warm white (#FFF8E7)
- **Quality**: Even, overhead
- **Shadows**: Soft, directly below
- **Coverage**: Wide spread (120° beam)

**Generation Rules:**
```
Warm Ceiling LED:
- Color temp: 2800K warm white
- Direction: Straight down from ceiling
- Shadow: Soft, directly below objects
- Intensity: Medium-bright
- Coverage: Entire room evenly
- Multiple lights: Overlapping coverage
```

**Prompt Keywords:**
```
"warm white LED ceiling lights (2800K), overhead even illumination, soft shadows directly below furniture, warm ambient glow, residential lighting quality, 120-degree beam spread, gentle interior lighting"
```

---

**Cool White LED (4000-5000K):**

**Characteristics:**
- **Color**: Cool white (#F0F4F8)
- **Quality**: Crisp, clear
- **Shadows**: Defined, overhead
- **Usage**: Modern offices, kitchens

**Generation Rules:**
```
Cool Ceiling LED:
- Color temp: 4500K cool white
- Direction: Overhead
- Shadow: Moderate definition
- Intensity: Bright
- Character: Clean, modern
```

---

### TABLE/FLOOR LAMPS

**Warm Incandescent/LED (2700K):**

**Characteristics:**
- **Color**: Warm golden glow (#FFEDD8)
- **Quality**: Point source, cozy
- **Pattern**: Cone of light from shade
- **Shadow**: Radiating from lamp
- **Atmosphere**: Intimate, warm

**Generation Rules:**
```
Table Lamp:
- Color temp: 2700K warm
- Direction: Radiates from lamp position
- Pattern: Cone shape (lampshade)
- Shadow: Cast away from lamp
- Intensity: Localized bright spot
- Falloff: Rapid (1/distance²)
- Ambient contribution: Warm glow on nearby surfaces
```

**Prompt Keywords:**
```
"warm table lamp (2700K) on side table, golden glow creating intimate lighting, cone of light from shade, soft shadows radiating away from lamp, localized bright spot with rapid falloff, warm ambient glow on nearby wall and sofa, cozy evening lighting"
```

---

### CEILING FAN WITH LIGHT (INDIAN ESSENTIAL)

**Typical Setup:**
- **Fan**: Contemporary 4-blade BLDC
- **Light**: Integrated LED, warm white
- **Position**: Center of room, 7-9 feet high

**Lighting Characteristics:**
- **Color**: 3000K warm white
- **Pattern**: Circular spread from center
- **Quality**: Even, overhead
- **Shadows**: Blade shadows rotating (if strong top light)

**Generation Rules:**
```
Ceiling Fan Light:
- Position: Center ceiling, 7.5-9 feet height
- Color temp: 3000K warm
- Direction: Downward, slight spread
- Shadow: Soft shadows below
- Fan blades: Subtle shadows if strong light from above
- Coverage: Room-wide, slight falloff at edges
```

**Prompt Keywords:**
```
"contemporary BLDC ceiling fan with integrated LED light (3000K warm white), center ceiling position at 8 feet height, soft even downward illumination, circular light spread, subtle shadows below furniture, fan blades visible, residential ambient lighting"
```

---

## SHADOW PHYSICS

### SHADOW CALCULATION RULES

**Shadow Direction:**
```
RULE: Shadow always cast OPPOSITE to light source
- Window on LEFT → Shadows point RIGHT
- Window on RIGHT → Shadows point LEFT
- Light from ABOVE → Shadows directly BELOW
```

**Shadow Length:**
```
Shadow Length = Object Height × tan(90° - Light Angle)

Examples:
- Light at 10° angle → Shadow = Height × 5.7
- Light at 30° angle → Shadow = Height × 1.7
- Light at 45° angle → Shadow = Height × 1.0
- Light at 70° angle → Shadow = Height × 0.36
```

**Shadow Softness (Penumbra):**
```
Hard Light (Direct sun):
- Penumbra: 2-5mm soft edge
- Density: 0.7-0.9 (dark)
- Edge definition: Sharp

Soft Light (Diffused, overcast):
- Penumbra: 20-40mm soft edge
- Density: 0.3-0.5 (light)
- Edge definition: Gradual

Medium Light (Afternoon window):
- Penumbra: 10-20mm soft edge
- Density: 0.5-0.7 (medium)
- Edge definition: Moderate
```

---

### AMBIENT OCCLUSION (AO)

**What is AO:**
Subtle darkening in crevices, corners, and contact points where ambient light cannot reach.

**AO Rules:**
```
AO Locations:
- Where furniture meets floor: 2-5mm dark line
- Room corners: Gradual darkening (10-15% darker)
- Under furniture overhangs: Subtle shadow
- Between cushions: Crevice darkening
- Object contact points: Dark accent

AO Intensity: 0.2-0.3 (subtle, not strong)
AO Color: Slightly cooler than ambient (hint of blue)
AO Falloff: 50-100mm from contact point
```

**Generation Prompt:**
```
"realistic ambient occlusion, subtle darkening (20%) in room corners, 3mm dark contact shadow where furniture meets floor, crevice darkening between sofa cushions, gentle shadow under furniture overhangs, natural light obstruction"
```

---

## LIGHT BOUNCING & FILL LIGHT

### INDIRECT ILLUMINATION

**How Light Bounces:**
1. **Primary Light** hits surface (wall, floor, furniture)
2. **Surface Reflects** portion of light (10-30% depending on color/material)
3. **Bounced Light** illuminates nearby surfaces (fill light)
4. **Color Tint**: Bounced light takes on color of reflecting surface

**Wall Bounce:**
```
White Wall:
- Reflects: 70-80% of light
- Color shift: Minimal (white)
- Effect: Bright, even fill light

Colored Wall (e.g., Teal):
- Reflects: 30-40% of light
- Color shift: Teal tint on nearby objects
- Effect: Colored ambient glow

Dark Wall:
- Reflects: 10-20% of light
- Color shift: Minimal (absorbs)
- Effect: Darker room, less fill
```

**Generation Rules:**
```
IF: White/cream walls
THEN: Add 15-20% fill light to shadow areas (warm white bounce)

IF: Colored walls (e.g., teal #008080)
THEN: Add 10-15% fill light WITH teal tint to nearby objects

IF: Dark walls
THEN: Add 5-10% minimal fill light (darker atmosphere)
```

---

## ATMOSPHERIC EFFECTS

### VOLUMETRIC LIGHT (GOD RAYS)

**When to Use:**
- Direct sunlight through window
- Dusty atmosphere
- Creates depth and realism

**Characteristics:**
- **Visibility**: Dust particles make light beams visible
- **Direction**: Follows light path from window
- **Intensity**: Subtle (don't overdo)
- **Particle Density**: 0.001-0.005 (very sparse)

**Generation Rules:**
```
Volumetric Light:
- Only with direct sunlight (not diffused)
- Beam follows window shape (rectangular)
- Subtle dust particles (1-3 visible per beam)
- Intensity: 0.2-0.3 (subtle glow)
- Falloff: Fades within 8-10 feet
```

**Prompt Keywords:**
```
"subtle volumetric light rays from window, fine dust particles (density 0.003) making light beam visible, rectangular beam shape matching window, soft glow effect (0.25 intensity), atmospheric depth, realistic light scattering"
```

---

### ATMOSPHERIC HAZE (DEPTH CUE)

**Purpose**: Creates sense of depth and atmosphere

**Characteristics:**
- **Effect**: Distant objects slightly hazier than near objects
- **Intensity**: Very subtle (0.05-0.1)
- **Color**: Slight cool tint (mimics air)
- **Distance**: Kicks in after 12-15 feet

**Generation Rules:**
```
Atmospheric Haze:
- Objects 0-8 feet: No haze (sharp)
- Objects 8-15 feet: Minimal haze (0.03)
- Objects 15+ feet: Subtle haze (0.08)
- Color tint: Very slight cool (#F8FBFF)
```

---

## LIGHT QUALITY SCORING

### Before Outputting Render, Verify:

**Light Source Consistency:**
☑ Shadow direction matches identified light source
☑ Shadow softness matches light quality (hard/soft)
☑ Shadow length matches light angle
☑ Multiple light sources don't contradict each other

**Color Temperature:**
☑ Warm light (2700-3500K) for evening/lamps
☑ Neutral (5000-5500K) for afternoon daylight
☑ Cool (6000-7000K) for morning/overcast
☑ No mixed temperatures (unless intentional)

**Shadow Quality:**
☑ Shadows present (not missing)
☑ Appropriate softness (hard direct, soft diffused)
☑ Ambient occlusion in corners/contacts
☑ Shadow density realistic (not too dark/light)

**Atmospheric Effects:**
☑ Volumetric light if direct sun (subtle)
☑ Slight atmospheric haze for depth
☑ Light bounce/fill in shadows (not pure black)
☑ No "flat" lighting (must have direction)

---

## LIGHTING SCENARIOS LIBRARY

### SCENARIO 1: Afternoon Window Light (MOST COMMON)
```
Setup:
- Window on LEFT wall
- Time: 3pm
- Condition: Clear day, direct sun

Generation Parameters:
- Light direction: From left, 40° angle
- Color temp: 5000K warm white
- Shadow: Medium soft (15mm penumbra)
- Shadow length: 1.2× object height pointing RIGHT
- Volumetric: Subtle (0.2 intensity)
- Fill light: 15% white wall bounce
- Ceiling fan: Warm LED (3000K) supplementary
- Atmosphere: Slight haze, pleasant

Prompt:
"pleasant afternoon sunlight (3pm) streaming from left window at 40-degree angle, warm white 5000K color temperature, medium soft shadows (15mm penumbra) pointing right with length 1.2× object height, subtle volumetric light rays (0.2 intensity), 15% fill light from white wall bounce, supplementary ceiling fan LED (3000K warm), slight atmospheric haze, balanced natural interior lighting"
```

---

### SCENARIO 2: Monsoon Overcast (INDIAN SPECIFIC)
```
Setup:
- Window visible
- Time: Afternoon
- Condition: Heavy overcast, monsoon

Generation Parameters:
- Light direction: General from windows, no defined beam
- Color temp: 6200K cool
- Shadow: Very soft (40mm penumbra)
- Shadow density: Light (0.3)
- No volumetric
- Fill light: Even, 20%
- Atmosphere: Humid haze (0.1)
- Mood: Peaceful, soft

Prompt:
"soft monsoon overcast daylight, diffused light from windows with no hard shadows, cool 6200K color temperature, very soft shadows (40mm penumbra, 0.3 density), even 20% fill light throughout, humid atmospheric haze (0.1 intensity), peaceful rainy day lighting, low contrast, gentle interior ambiance"
```

---

### SCENARIO 3: Evening Cozy with Lamps
```
Setup:
- Evening time (no daylight)
- Table lamps on
- Ceiling lights on
- Warm atmosphere

Generation Parameters:
- Primary: Ceiling fan LED (3000K)
- Secondary: Table lamps (2700K warm glow)
- Color temp: Mixed warm (2700-3000K)
- Shadow: Soft, multiple sources
- Lamp glow: Visible on nearby surfaces
- Ceiling fan light: Even overhead
- Atmosphere: Cozy, intimate
- Contrast: Low-medium

Prompt:
"cozy evening interior lighting, ceiling fan LED (3000K) providing even overhead illumination, warm table lamps (2700K) creating golden glow on side tables, visible warm light spill on nearby walls and sofa, soft shadows from multiple light sources, low-medium contrast, intimate warm atmosphere, residential evening ambiance"
```

---

## CRITICAL LIGHTING RULES SUMMARY

1. **ALWAYS analyze original photo lighting FIRST**
2. **Shadow direction MUST match identified light source**
3. **Shadow softness MUST match light quality**
4. **Color temperature MUST be consistent with time of day**
5. **Include ambient occlusion** (corners, contacts)
6. **Add fill light** (bounced from walls)
7. **Subtle atmospheric effects** (volumetric, haze)
8. **NO flat lighting** (must have direction)
9. **Ceiling fan light** is MANDATORY for Indian interiors
10. **NO contradicting light sources** (check multi-light scenes)

---

**END OF MODULE 2**

**Next Module**: Architectural Preservation Protocol (03_Preservation_Rules.md)
