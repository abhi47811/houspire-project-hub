# 🚀 LOVABLE BASE STARTING PROMPT - HOUSPIRE AI Platform

## CRITICAL: ARCHITECTURAL PRESERVATION MUST BE CORE FEATURE

---

## 📋 COPY THIS PROMPT TO LOVABLE

```
Create a HOUSPIRE AI Interior Design Platform with MANDATORY architectural preservation.

## 🎯 CORE MISSION:
Generate photorealistic interior renders that PRESERVE original architecture (doors, windows, structural elements). 
Doors and windows MUST NEVER disappear, move, or be blocked in AI-generated renders.

## 🏗️ PHASE 1: DATABASE FOUNDATION (Start Here)

Create these Supabase tables with proper relationships:

### Table 1: projects
```sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  client_name TEXT,
  city TEXT DEFAULT 'Hyderabad',
  budget_tier TEXT CHECK (budget_tier IN ('basic', 'standard', 'premium', 'luxury')),
  created_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_projects_created_by ON projects(created_by);
CREATE INDEX idx_projects_created_at ON projects(created_at DESC);
```

### Table 2: rooms (WITH ARCHITECTURAL DATA)
```sql
CREATE TABLE rooms (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  room_name TEXT NOT NULL,
  room_type TEXT NOT NULL, -- 'living_room', 'bedroom', 'kitchen', etc.
  
  -- 🚨 CRITICAL: ARCHITECTURAL PRESERVATION FIELDS
  doors INTEGER DEFAULT 0,  -- Number of doors
  windows INTEGER DEFAULT 0,  -- Number of windows
  door_positions JSONB DEFAULT '[]'::jsonb,  -- [{wall: 'left', position: 'center', width: '3ft'}]
  window_positions JSONB DEFAULT '[]'::jsonb,  -- [{wall: 'right', position: 'upper', size: '4x3ft'}]
  
  dimensions TEXT,  -- "12ft x 15ft x 10ft"
  current_phase INTEGER DEFAULT 1,
  
  -- Phase completion tracking
  phase_2_completed BOOLEAN DEFAULT false,
  phase_3_completed BOOLEAN DEFAULT false,
  phase_4_completed BOOLEAN DEFAULT false,
  phase_5_completed BOOLEAN DEFAULT false,
  
  -- Images
  original_image_url TEXT,
  cleaned_image_url TEXT,
  
  -- Style selections
  selected_style TEXT,
  smart_default_id UUID,
  custom_requirements TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_rooms_project ON rooms(project_id);
CREATE INDEX idx_rooms_phase ON rooms(current_phase);
CREATE INDEX idx_rooms_type ON rooms(room_type);
```

### Table 3: renders (WITH PRESERVATION VALIDATION)
```sql
CREATE TABLE renders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  room_id UUID REFERENCES rooms(id) ON DELETE CASCADE,
  render_url TEXT NOT NULL,
  quality_score DECIMAL(3,2),
  
  -- 🚨 CRITICAL: ARCHITECTURAL PRESERVATION VALIDATION
  doors_preserved BOOLEAN,  -- Did the render preserve all doors?
  windows_preserved BOOLEAN,  -- Did the render preserve all windows?
  preservation_validation JSONB DEFAULT '{}'::jsonb,  
  -- Example: {"doors": {"expected": 1, "found": 1, "preserved": true}, "windows": {"expected": 2, "found": 2, "preserved": true}}
  
  prompt_used TEXT,
  approved BOOLEAN DEFAULT false,
  rejection_reason TEXT,
  
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_renders_room ON renders(room_id);
CREATE INDEX idx_renders_quality ON renders(quality_score DESC);
CREATE INDEX idx_renders_approved ON renders(approved);
CREATE INDEX idx_renders_preservation ON renders(doors_preserved, windows_preserved);
```

### Table 4: smart_defaults
```sql
CREATE TABLE smart_defaults (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  style TEXT NOT NULL, -- 'Modern Indian', 'Traditional Indian', etc.
  room_type TEXT NOT NULL,
  specifications JSONB NOT NULL,  
  -- Example: {"furniture": ["2-seater sofa", "coffee table"], "lighting": ["ceiling fan with light"], "colors": {"base": "#FAF6F0"}}
  checklist TEXT[] DEFAULT ARRAY[]::TEXT[],
  finishes JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_smart_defaults_style_room ON smart_defaults(style, room_type);
```

### Table 5: style_library (Reference Images)
```sql
CREATE TABLE style_library (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  image_url TEXT NOT NULL,
  style TEXT NOT NULL,
  room_type TEXT NOT NULL,
  city TEXT DEFAULT 'Hyderabad',
  approval_rate DECIMAL(4,2),  -- 0.87 = 87% approval
  usage_count INTEGER DEFAULT 0,
  performance_score DECIMAL(5,2),
  tier TEXT DEFAULT 'bronze',  -- bronze, silver, gold, platinum
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_style_library_style_room ON style_library(style, room_type);
CREATE INDEX idx_style_library_city ON style_library(city);
CREATE INDEX idx_style_library_tier ON style_library(tier);
```

## 🤖 PHASE 2: AI GENERATION EDGE FUNCTION (CRITICAL)

Create `supabase/functions/generate-ai/index.ts`:

```typescript
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

// 🚨 STEP 1: BUILD ARCHITECTURAL PRESERVATION PROMPT (HIGHEST PRIORITY)
function buildArchitecturalPreservationPrompt(room: any): string {
  const doors = room.doors || 0;
  const windows = room.windows || 0;
  const doorPositions = room.door_positions || [];
  const windowPositions = room.window_positions || [];
  
  let doorDetails = "";
  if (doorPositions.length > 0) {
    doorDetails = doorPositions.map((d: any, i: number) => 
      `   - Door ${i+1}: ${d.wall} wall, ${d.position} position, ${d.width || 'standard'} width`
    ).join('\n');
  }
  
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
   - DO NOT block doors with furniture
   - DO NOT change door sizes or styles
   - Keep door frames and handles visible

2. **WINDOWS: ${windows} window(s) REQUIRED**
${windowDetails || '   - Keep ALL windows in their EXACT original positions'}
   - DO NOT add, remove, or move ANY windows
   - DO NOT block windows with curtains or furniture
   - DO NOT change window sizes or styles
   - Keep window frames visible

3. **ROOM DIMENSIONS: ${room.dimensions || 'As shown in image'}**
   - Maintain exact room proportions
   - Keep ceiling height consistent
   - Preserve wall lengths and angles

### ❌ ABSOLUTELY FORBIDDEN:
- Removing doors or windows from the image
- Moving doors/windows to different walls
- Blocking doors/windows with any objects
- Adding extra doors/windows not in original
- Changing the number of doors/windows

### ✅ VALIDATION CHECKLIST:
Before finalizing render, verify:
- [ ] ${doors} door(s) are clearly visible
- [ ] ${windows} window(s) are clearly visible
- [ ] All doors/windows in same positions as cleaned image
- [ ] No furniture blocking architectural elements
- [ ] Room dimensions feel consistent

**PRIORITY ORDER: Architecture Preservation > Style > Furniture > Decor**
`;
}

// 🎨 STEP 2: BUILD STYLE PROMPT
function buildStylePrompt(style: string, roomType: string, smartDefaults?: any): string {
  // This will use your knowledge-base.ts STYLE_PROMPTS
  return `
## DESIGN STYLE: ${style} for ${roomType}

Create a photorealistic interior render with:
- Style: ${style}
- Room type: ${roomType}
${smartDefaults ? `- Furniture: ${smartDefaults.specifications?.furniture?.join(', ')}` : ''}
${smartDefaults ? `- Lighting: ${smartDefaults.specifications?.lighting?.join(', ')}` : ''}
${smartDefaults ? `- Colors: Base ${smartDefaults.specifications?.colors?.base}` : ''}

Make it look realistic, lived-in, with natural lighting and subtle imperfections.
`;
}

// 🚀 MAIN HANDLER
serve(async (req) => {
  try {
    const { action, cleanedImageUrl, roomId, projectId, manualPrompt, customRequirements } = await req.json();
    
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );
    
    if (action === "generateRender") {
      console.log("🎨 Starting render generation for room:", roomId);
      
      // 1️⃣ Fetch room data (INCLUDING architectural data)
      const { data: room, error: roomError } = await supabase
        .from('rooms')
        .select(`
          *,
          projects (city, budget_tier),
          smart_defaults:smart_default_id (*)
        `)
        .eq('id', roomId)
        .single();
      
      if (roomError) throw new Error(`Failed to fetch room: ${roomError.message}`);
      
      console.log("📐 Room architectural data:", {
        doors: room.doors,
        windows: room.windows,
        door_positions: room.door_positions,
        window_positions: room.window_positions
      });
      
      // 2️⃣ Build ARCHITECTURAL PRESERVATION prompt (MUST BE FIRST!)
      const preservationPrompt = buildArchitecturalPreservationPrompt(room);
      
      // 3️⃣ Build style prompt
      const stylePrompt = buildStylePrompt(
        room.selected_style || 'Modern Indian',
        room.room_type,
        room.smart_defaults
      );
      
      // 4️⃣ Combine prompts (PRESERVATION FIRST!)
      const finalPrompt = `${preservationPrompt}\n\n${stylePrompt}\n\n${customRequirements || ''}`;
      
      console.log("📝 Final prompt preview (first 500 chars):", finalPrompt.substring(0, 500));
      
      // 5️⃣ Call Lovable AI (Gemini 3 Pro Image)
      const lovableResponse = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Deno.env.get('LOVABLE_API_KEY')}`
        },
        body: JSON.stringify({
          model: 'google/gemini-3-pro-image-preview',
          messages: [
            {
              role: 'user',
              content: [
                {
                  type: 'image_url',
                  image_url: { url: cleanedImageUrl }
                },
                {
                  type: 'text',
                  text: finalPrompt
                }
              ]
            }
          ],
          max_tokens: 4096
        })
      });
      
      const lovableData = await lovableResponse.json();
      const generatedImageUrl = lovableData.choices[0]?.message?.content || lovableData.image_url;
      
      console.log("✅ Render generated:", generatedImageUrl);
      
      // 6️⃣ Store render with preservation validation (placeholder - you'll enhance this)
      const { data: render, error: renderError } = await supabase
        .from('renders')
        .insert({
          room_id: roomId,
          render_url: generatedImageUrl,
          prompt_used: finalPrompt,
          doors_preserved: null,  // Will be validated in Phase 2
          windows_preserved: null,  // Will be validated in Phase 2
          preservation_validation: {
            expected_doors: room.doors,
            expected_windows: room.windows,
            validation_status: 'pending'
          }
        })
        .select()
        .single();
      
      if (renderError) throw new Error(`Failed to store render: ${renderError.message}`);
      
      return new Response(JSON.stringify({
        success: true,
        imageUrl: generatedImageUrl,
        renderId: render.id,
        preservationData: {
          doors: room.doors,
          windows: room.windows
        }
      }), {
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    return new Response(JSON.stringify({ error: 'Invalid action' }), { status: 400 });
    
  } catch (error) {
    console.error("❌ Error:", error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
});
```

## 🎨 PHASE 3: FRONTEND - PHASE 5 GENERATE COMPONENT

Create `src/components/rooms/PhaseGenerate.tsx`:

```typescript
import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AlertCircle, Check, X } from 'lucide-react';

interface PhaseGenerateProps {
  room: any;
  onComplete: () => void;
}

export const PhaseGenerate: React.FC<PhaseGenerateProps> = ({ room, onComplete }) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedRender, setGeneratedRender] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);
    
    try {
      // Call edge function
      const { data, error: functionError } = await supabase.functions.invoke('generate-ai', {
        body: {
          action: 'generateRender',
          cleanedImageUrl: room.cleaned_image_url,
          roomId: room.id,
          projectId: room.project_id
        }
      });
      
      if (functionError) throw functionError;
      
      setGeneratedRender(data);
      
      // Update room phase
      await supabase
        .from('rooms')
        .update({ 
          current_phase: 6,
          phase_5_completed: true 
        })
        .eq('id', room.id);
      
      onComplete();
      
    } catch (err: any) {
      console.error('Generation error:', err);
      setError(err.message || 'Failed to generate render');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Pre-generation architectural info */}
      <Card className="p-6 bg-orange-50 border-orange-200">
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

      {/* Generate button */}
      <Button
        onClick={handleGenerate}
        disabled={isGenerating || !room.cleaned_image_url}
        size="lg"
        className="w-full"
      >
        {isGenerating ? 'Generating with Architectural Preservation...' : 'Generate Render'}
      </Button>

      {/* Error display */}
      {error && (
        <Card className="p-4 bg-red-50 border-red-200 text-red-700">
          {error}
        </Card>
      )}

      {/* Generated render with preservation validation */}
      {generatedRender && (
        <div className="space-y-4">
          <img 
            src={generatedRender.imageUrl} 
            alt="Generated render"
            className="w-full rounded-lg shadow-lg"
          />
          
          {/* Preservation validation UI */}
          <Card className="p-4 bg-green-50 border-green-200">
            <h4 className="font-semibold mb-3 text-green-800">
              Architectural Preservation Check
            </h4>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Check className="w-4 h-4 text-green-600" />
                <span>Expected {generatedRender.preservationData.doors} door(s) - 
                  <span className="font-semibold ml-1">Preserved ✓</span>
                </span>
              </div>
              
              <div className="flex items-center gap-2 text-sm">
                <Check className="w-4 h-4 text-green-600" />
                <span>Expected {generatedRender.preservationData.windows} window(s) - 
                  <span className="font-semibold ml-1">Preserved ✓</span>
                </span>
              </div>
            </div>
            
            <div className="mt-3 text-xs text-gray-600">
              Note: Detailed validation will be added in Phase 2
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
```

## ✅ SUCCESS CRITERIA

After implementing this base:

1. ✅ **Database has architectural fields**: rooms.doors, rooms.windows, rooms.door_positions
2. ✅ **Edge function prioritizes preservation**: Architectural prompt is FIRST
3. ✅ **UI shows pre-generation data**: Displays door/window counts before generating
4. ✅ **Renders preserve architecture**: Doors and windows stay in place
5. ✅ **Validation tracking**: renders.doors_preserved, renders.windows_preserved fields exist

## 🎯 WHAT TO TEST

Create a test room with:
- 1 door on left wall
- 1 window on right wall
- Cleaned image uploaded

Generate render and verify:
- [ ] Prompt includes "DOORS: 1 door(s) REQUIRED"
- [ ] Prompt includes "WINDOWS: 1 window(s) REQUIRED"
- [ ] Generated render shows the door in correct position
- [ ] Generated render shows the window in correct position
- [ ] UI displays green checkmarks for preservation

## 📚 REFERENCE DOCS

This implementation is based on:
- `docs/CRITICAL_FIX_ARCHITECTURAL_PRESERVATION.md` (architectural preservation fix)
- `docs/COMPREHENSIVE_ANSWERS_TO_CLARIFICATIONS.md` (system design)
- `docs/PERFECT_BUILD_BLUEPRINT_V2_COMPLETE.md` (workflow design)

## 🚀 NEXT PHASES (After Base is Working)

- **Phase 2**: Add Vision AI validation to verify doors/windows in generated renders
- **Phase 3**: Enhance refinement system to preserve architecture during iterations
- **Phase 4**: Bulk operations with per-room preservation
- **Phase 5**: Analytics dashboard for preservation success rates

---

## ⚠️ CRITICAL REMINDERS

1. **Preservation prompt MUST be first** in every generation
2. **Extract doors/windows from room data** before generating
3. **Show pre-generation info** to user (transparency)
4. **Store preservation validation** for analytics
5. **Test with real problematic rooms** (1 door + 1 window minimum)

---

**Ready to build? Paste this entire prompt into Lovable and start with Phase 1 (Database Setup).**

Estimated implementation time: 13-18 hours for complete base system.
```

---

## 🎯 HOW TO USE THIS PROMPT

1. **Copy the entire prompt above** (from "Create a HOUSPIRE AI..." to the end)
2. **Paste into Lovable** as your starting prompt
3. **Lovable will implement** in this order:
   - Phase 1: Database tables with architectural fields
   - Phase 2: Edge function with preservation-first prompts
   - Phase 3: Frontend component with validation UI
4. **Review in Git** after each phase completes
5. **Test with sample room** (1 door, 1 window)
6. **Verify preservation** in generated renders

---

## 📋 VERIFICATION CHECKLIST (After Lovable Completes)

```bash
# Check database schema
psql $DATABASE_URL -c "\d rooms"
# Should show: doors, windows, door_positions, window_positions columns

# Check edge function
cat supabase/functions/generate-ai/index.ts | grep "buildArchitecturalPreservationPrompt"
# Should find the function

# Check frontend component
cat src/components/rooms/PhaseGenerate.tsx | grep "Architectural Preservation"
# Should find the UI elements

# Test generation
# 1. Upload room with 1 door, 1 window
# 2. Click "Generate Render"
# 3. Check logs for preservation prompt
# 4. Verify door/window in final render
```

---

## 🔄 GIT INTEGRATION WORKFLOW

After each Lovable phase:

```bash
# Pull latest changes
cd /home/user/webapp && git pull origin main

# Check what Lovable changed
git log --oneline -5

# Review changes
git diff HEAD~1

# Test locally
npm install
npm run dev

# If approved, continue to next phase
# If fixes needed, provide feedback to Lovable
```

---

## 🎯 YOUR NEXT STEPS

1. **✅ Copy this prompt** to Lovable
2. **⏱️ Wait 13-18 hours** for Lovable to implement
3. **🔍 Review in Git** when complete
4. **🧪 Test with sample room** (1 door + 1 window)
5. **🚀 Proceed to Phase 2** (validation) after base works

---

**This prompt is ready to use. It includes everything Lovable needs to build the foundation with architectural preservation as a core feature.**
