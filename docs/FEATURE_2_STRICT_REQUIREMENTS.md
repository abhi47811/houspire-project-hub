# Feature 2: Smart AI Recommendations Engine - STRICT REQUIREMENTS

**Version:** 1.0  
**Date:** 2025-12-30  
**Status:** 🔒 NON-NEGOTIABLE REQUIREMENTS  
**Enforcement:** 100% Completion Mandatory

---

## 🎯 OVERVIEW

**Feature:** Smart AI Recommendations Engine  
**Purpose:** Provide data-driven, context-aware style and furniture recommendations based on room characteristics, budget, location trends, and user preferences.

**Success Criteria:**
- ✅ Recommend 5-7 styles with confidence scores
- ✅ Suggest optimal furniture placement
- ✅ Show trending styles by city
- ✅ Display "Projects like yours" gallery
- ✅ Filter recommendations by budget
- ✅ Learn from user choices

---

## 🗄️ DATABASE REQUIREMENTS (MANDATORY)

### Table 1: `ai_recommendations`

**Purpose:** Store AI-generated recommendations for rooms

**Required Fields (18 minimum):**

```sql
CREATE TABLE public.ai_recommendations (
  -- Identity
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  room_id uuid NOT NULL REFERENCES public.rooms(id) ON DELETE CASCADE,
  
  -- Recommendation Type
  recommendation_type text NOT NULL CHECK (recommendation_type IN (
    'style', 
    'furniture_placement', 
    'budget_optimization', 
    'trend_analysis'
  )),
  
  -- Room Context (captured at recommendation time)
  room_context jsonb NOT NULL, -- {room_type, size_sqft, budget, location, natural_light, etc.}
  
  -- Style Recommendations (for recommendation_type = 'style')
  recommended_styles jsonb DEFAULT '[]', -- [{style_name, confidence_score, reasoning, estimated_cost}]
  
  -- Furniture Recommendations (for recommendation_type = 'furniture_placement')
  furniture_suggestions jsonb DEFAULT '[]', -- [{item_name, category, placement_coords, dimensions, rationale}]
  
  -- Budget Recommendations (for recommendation_type = 'budget_optimization')
  budget_alternatives jsonb DEFAULT '[]', -- [{original_item, alternative_item, cost_saving, quality_impact}]
  
  -- Trend Data (for recommendation_type = 'trend_analysis')
  trend_data jsonb DEFAULT '{}', -- {city_trends, popular_styles, adoption_rate, time_period}
  
  -- AI Model Info
  model_used text NOT NULL, -- 'gemini-2.0-flash', 'gpt-4', etc.
  confidence_score numeric(5,2) CHECK (confidence_score BETWEEN 0 AND 100),
  reasoning text, -- Human-readable explanation
  
  -- User Interaction
  was_accepted boolean DEFAULT false,
  selected_option text, -- Which recommendation user chose
  user_feedback text, -- Optional feedback
  
  -- Metadata
  generated_at timestamptz DEFAULT now(),
  expires_at timestamptz, -- Recommendations can expire (e.g., 7 days)
  created_by uuid REFERENCES public.profiles(id),
  
  -- Constraints
  CONSTRAINT valid_recommendation_data CHECK (
    (recommendation_type = 'style' AND recommended_styles IS NOT NULL) OR
    (recommendation_type = 'furniture_placement' AND furniture_suggestions IS NOT NULL) OR
    (recommendation_type = 'budget_optimization' AND budget_alternatives IS NOT NULL) OR
    (recommendation_type = 'trend_analysis' AND trend_data IS NOT NULL)
  )
);
```

**Indexes (3 minimum):**
```sql
CREATE INDEX idx_ai_recommendations_room_id ON public.ai_recommendations(room_id);
CREATE INDEX idx_ai_recommendations_type ON public.ai_recommendations(recommendation_type);
CREATE INDEX idx_ai_recommendations_generated_at ON public.ai_recommendations(generated_at DESC);
```

**RLS Policies (4 minimum):**
```sql
-- Users can view recommendations for their project rooms
CREATE POLICY "Users can view recommendations for their rooms"
ON public.ai_recommendations FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM rooms r
    JOIN projects p ON p.id = r.project_id
    WHERE r.id = ai_recommendations.room_id
    AND (p.created_by = auth.uid() OR p.assigned_to = auth.uid())
  )
);

-- Users can create recommendations (through API)
CREATE POLICY "Users can create recommendations"
ON public.ai_recommendations FOR INSERT
WITH CHECK (
  EXISTS (
    SELECT 1 FROM rooms r
    JOIN projects p ON p.id = r.project_id
    WHERE r.id = ai_recommendations.room_id
    AND (p.created_by = auth.uid() OR p.assigned_to = auth.uid())
  )
);

-- Users can update their recommendations (feedback)
CREATE POLICY "Users can update recommendations feedback"
ON public.ai_recommendations FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM rooms r
    JOIN projects p ON p.id = r.project_id
    WHERE r.id = ai_recommendations.room_id
    AND (p.created_by = auth.uid() OR p.assigned_to = auth.uid())
  )
);

-- Admins can manage all
CREATE POLICY "Admins can manage all recommendations"
ON public.ai_recommendations FOR ALL
USING (get_user_role(auth.uid()) = 'admin');
```

---

### Table 2: `recommendation_feedback`

**Purpose:** Track user feedback on recommendations to improve AI

**Required Fields (12 minimum):**

```sql
CREATE TABLE public.recommendation_feedback (
  -- Identity
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  recommendation_id uuid NOT NULL REFERENCES public.ai_recommendations(id) ON DELETE CASCADE,
  room_id uuid NOT NULL REFERENCES public.rooms(id) ON DELETE CASCADE,
  
  -- Feedback Type
  feedback_type text NOT NULL CHECK (feedback_type IN (
    'accepted', 
    'rejected', 
    'modified', 
    'helpful', 
    'not_helpful'
  )),
  
  -- Feedback Details
  selected_option text, -- Which specific recommendation was chosen
  rejection_reason text, -- Why was it rejected
  modification_details jsonb, -- What changes did user make
  helpfulness_score integer CHECK (helpfulness_score BETWEEN 1 AND 5),
  
  -- Context
  user_comment text,
  feedback_data jsonb DEFAULT '{}', -- Additional structured feedback
  
  -- Metadata
  created_by uuid NOT NULL REFERENCES public.profiles(id),
  created_at timestamptz DEFAULT now()
);
```

**Indexes (2 minimum):**
```sql
CREATE INDEX idx_recommendation_feedback_rec_id ON public.recommendation_feedback(recommendation_id);
CREATE INDEX idx_recommendation_feedback_room_id ON public.recommendation_feedback(room_id);
```

**RLS Policies (3 minimum):**
```sql
CREATE POLICY "Users can view feedback for their rooms"
ON public.recommendation_feedback FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM rooms r
    JOIN projects p ON p.id = r.project_id
    WHERE r.id = recommendation_feedback.room_id
    AND (p.created_by = auth.uid() OR p.assigned_to = auth.uid())
  )
);

CREATE POLICY "Users can create feedback"
ON public.recommendation_feedback FOR INSERT
WITH CHECK (created_by = auth.uid());

CREATE POLICY "Admins can manage all feedback"
ON public.recommendation_feedback FOR ALL
USING (get_user_role(auth.uid()) = 'admin');
```

---

### Table 3: `similar_projects`

**Purpose:** Cache similar project recommendations for performance

**Required Fields (10 minimum):**

```sql
CREATE TABLE public.similar_projects (
  -- Identity
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_room_id uuid NOT NULL REFERENCES public.rooms(id) ON DELETE CASCADE,
  similar_room_id uuid NOT NULL REFERENCES public.rooms(id) ON DELETE CASCADE,
  
  -- Similarity Metrics
  similarity_score numeric(5,2) CHECK (similarity_score BETWEEN 0 AND 100),
  matching_factors text[], -- ['room_type', 'budget_range', 'style', 'city']
  
  -- Similar Room Details (denormalized for performance)
  similar_room_preview jsonb NOT NULL, -- {room_name, style, budget, final_image_url}
  
  -- Metadata
  calculated_at timestamptz DEFAULT now(),
  expires_at timestamptz DEFAULT (now() + interval '30 days'),
  created_at timestamptz DEFAULT now(),
  
  -- Prevent duplicate pairs
  CONSTRAINT unique_similar_pair UNIQUE (source_room_id, similar_room_id)
);
```

**Indexes (2 minimum):**
```sql
CREATE INDEX idx_similar_projects_source ON public.similar_projects(source_room_id, similarity_score DESC);
CREATE INDEX idx_similar_projects_expires ON public.similar_projects(expires_at) WHERE expires_at < now();
```

**RLS Policies (2 minimum):**
```sql
CREATE POLICY "Users can view similar projects for their rooms"
ON public.similar_projects FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM rooms r
    JOIN projects p ON p.id = r.project_id
    WHERE r.id = similar_projects.source_room_id
    AND (p.created_by = auth.uid() OR p.assigned_to = auth.uid())
  )
);

CREATE POLICY "System can manage similar projects"
ON public.similar_projects FOR ALL
USING (auth.uid() IS NOT NULL); -- Any authenticated user (API calls)
```

---

### Realtime Subscriptions

**Enable realtime for all tables:**
```sql
ALTER TABLE public.ai_recommendations REPLICA IDENTITY FULL;
ALTER TABLE public.recommendation_feedback REPLICA IDENTITY FULL;
ALTER TABLE public.similar_projects REPLICA IDENTITY FULL;

ALTER PUBLICATION supabase_realtime ADD TABLE public.ai_recommendations;
ALTER PUBLICATION supabase_realtime ADD TABLE public.recommendation_feedback;
ALTER PUBLICATION supabase_realtime ADD TABLE public.similar_projects;
```

---

## 🔧 SERVICE LAYER REQUIREMENTS (MANDATORY)

### File: `src/services/features/recommendationService.ts`

**Size Target:** ~15-18 KB | ~550-650 lines  
**Method Count:** **Minimum 14 methods**

---

### Required Interfaces

```typescript
export interface RoomContext {
  room_id: string;
  room_type: string;
  room_name: string;
  dimensions: {
    length_feet: number;
    width_feet: number;
    height_feet: number;
    area_sqft: number;
  };
  budget: {
    total_budget: number;
    spent: number;
    remaining: number;
  };
  location: {
    city: string;
    region: string;
  };
  characteristics: {
    natural_light: 'low' | 'medium' | 'high';
    window_count: number;
    door_count: number;
    ceiling_features: string[];
  };
  current_phase: string;
  selected_style?: string;
}

export interface StyleRecommendation {
  style_name: string;
  confidence_score: number; // 0-100
  reasoning: string;
  estimated_cost: number;
  pros: string[];
  cons: string[];
  sample_images?: string[];
  budget_fit: 'under_budget' | 'within_budget' | 'over_budget';
}

export interface FurniturePlacement {
  item_name: string;
  category: string;
  placement: {
    x: number; // percentage from left
    y: number; // percentage from top
    rotation: number; // degrees
  };
  dimensions: {
    width: number;
    depth: number;
    height: number;
  };
  rationale: string;
  estimated_cost: number;
  priority: 'essential' | 'recommended' | 'optional';
}

export interface BudgetAlternative {
  original_item: string;
  original_cost: number;
  alternative_item: string;
  alternative_cost: number;
  cost_saving: number;
  savings_percentage: number;
  quality_impact: 'minimal' | 'moderate' | 'significant';
  recommendation: string;
}

export interface TrendAnalysis {
  city: string;
  popular_styles: Array<{
    style_name: string;
    adoption_rate: number; // percentage
    trend: 'rising' | 'stable' | 'declining';
  }>;
  trending_items: Array<{
    item_name: string;
    category: string;
    popularity_score: number;
  }>;
  seasonal_trends: {
    current_season: string;
    recommended_colors: string[];
    recommended_materials: string[];
  };
  time_period: string;
  sample_size: number;
}

export interface SimilarProject {
  room_id: string;
  room_name: string;
  project_name: string;
  style: string;
  budget: number;
  final_image_url: string;
  similarity_score: number;
  matching_factors: string[];
  completion_date: string;
}

export interface AIRecommendation {
  id: string;
  room_id: string;
  recommendation_type: 'style' | 'furniture_placement' | 'budget_optimization' | 'trend_analysis';
  room_context: RoomContext;
  recommended_styles?: StyleRecommendation[];
  furniture_suggestions?: FurniturePlacement[];
  budget_alternatives?: BudgetAlternative[];
  trend_data?: TrendAnalysis;
  model_used: string;
  confidence_score: number;
  reasoning: string;
  was_accepted: boolean;
  selected_option?: string;
  user_feedback?: string;
  generated_at: string;
  expires_at: string;
  created_by?: string;
}

export interface RecommendationFeedback {
  id: string;
  recommendation_id: string;
  room_id: string;
  feedback_type: 'accepted' | 'rejected' | 'modified' | 'helpful' | 'not_helpful';
  selected_option?: string;
  rejection_reason?: string;
  modification_details?: any;
  helpfulness_score?: number;
  user_comment?: string;
  feedback_data?: any;
  created_by: string;
  created_at: string;
}
```

---

### Required Methods (14 minimum)

#### 1. Core Recommendation Methods (4)

```typescript
// Get all recommendations for a room
async getRecommendations(
  roomId: string, 
  type?: 'style' | 'furniture_placement' | 'budget_optimization' | 'trend_analysis'
): Promise<AIRecommendation[]>

// Get a specific recommendation by ID
async getRecommendationById(recommendationId: string): Promise<AIRecommendation | null>

// Generate new style recommendations (calls AI API)
async generateStyleRecommendations(roomContext: RoomContext): Promise<AIRecommendation>

// Generate furniture placement suggestions (calls AI API)
async generateFurniturePlacement(roomContext: RoomContext): Promise<AIRecommendation>
```

#### 2. Budget & Optimization Methods (2)

```typescript
// Generate budget optimization suggestions
async generateBudgetAlternatives(
  roomContext: RoomContext, 
  currentBudgetItems: any[]
): Promise<AIRecommendation>

// Calculate cost savings from alternatives
async calculatePotentialSavings(roomId: string): Promise<{
  total_savings: number;
  savings_percentage: number;
  alternatives_count: number;
}>
```

#### 3. Trend Analysis Methods (2)

```typescript
// Get trend analysis for a city
async getTrendAnalysis(city: string, roomType: string): Promise<TrendAnalysis>

// Get trending styles across all cities
async getTrendingStyles(): Promise<Array<{
  style: string;
  trend_score: number;
  cities: string[];
}>>
```

#### 4. Similar Projects Methods (3)

```typescript
// Find similar projects for a room
async findSimilarProjects(roomId: string, limit?: number): Promise<SimilarProject[]>

// Calculate similarity score between two rooms
async calculateSimilarity(roomId1: string, roomId2: string): Promise<number>

// Refresh similar projects cache
async refreshSimilarProjects(roomId: string): Promise<void>
```

#### 5. Feedback Methods (3)

```typescript
// Submit user feedback on recommendation
async submitFeedback(feedback: Omit<RecommendationFeedback, 'id' | 'created_at'>): Promise<void>

// Mark recommendation as accepted
async acceptRecommendation(recommendationId: string, selectedOption: string): Promise<void>

// Mark recommendation as rejected
async rejectRecommendation(
  recommendationId: string, 
  reason: string
): Promise<void>
```

---

### Required Helper Methods (Internal)

```typescript
// Build room context from room data
private async buildRoomContext(roomId: string): Promise<RoomContext>

// Call AI API for style recommendations
private async callStyleRecommendationAPI(context: RoomContext): Promise<StyleRecommendation[]>

// Call AI API for furniture placement
private async callFurniturePlacementAPI(context: RoomContext): Promise<FurniturePlacement[]>

// Calculate confidence score
private calculateConfidenceScore(recommendations: any[], context: RoomContext): number

// Filter by budget constraints
private filterByBudget(recommendations: any[], budget: number): any[]
```

---

## ⚛️ REACT HOOKS REQUIREMENTS (MANDATORY)

### File: `src/hooks/useRecommendations.ts`

**Size Target:** ~8-10 KB | ~280-350 lines  
**Hook Count:** **Minimum 3 hooks**  
**Mutation Count:** **Minimum 6 mutations**

---

### Hook 1: `useRecommendations(roomId, type?)`

**Purpose:** Main hook for fetching and managing recommendations

```typescript
export function useRecommendations(
  roomId: string | undefined,
  type?: 'style' | 'furniture_placement' | 'budget_optimization' | 'trend_analysis'
) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Query: Fetch recommendations
  const { 
    data: recommendations = [], 
    isLoading, 
    error, 
    refetch 
  } = useQuery({
    queryKey: ['recommendations', roomId, type],
    queryFn: () => recommendationService.getRecommendations(roomId!, type),
    enabled: !!roomId,
  });

  // Real-time subscription
  useEffect(() => {
    if (!roomId) return;
    
    const channel = supabase
      .channel(`recommendations-${roomId}`)
      .on('postgres_changes', { 
        event: '*', 
        schema: 'public', 
        table: 'ai_recommendations',
        filter: `room_id=eq.${roomId}`
      }, () => {
        queryClient.invalidateQueries({ queryKey: ['recommendations', roomId] });
      })
      .subscribe();
    
    return () => { supabase.removeChannel(channel); };
  }, [roomId, queryClient]);

  // Mutation 1: Generate style recommendations
  const generateStyles = useMutation({
    mutationFn: (context: RoomContext) => 
      recommendationService.generateStyleRecommendations(context),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recommendations', roomId] });
      toast({ title: 'Style recommendations generated' });
    },
    onError: (e: Error) => toast({ 
      title: 'Failed to generate recommendations', 
      description: e.message, 
      variant: 'destructive' 
    }),
  });

  // Mutation 2: Generate furniture placement
  const generateFurniture = useMutation({
    mutationFn: (context: RoomContext) => 
      recommendationService.generateFurniturePlacement(context),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recommendations', roomId] });
      toast({ title: 'Furniture suggestions generated' });
    },
    onError: (e: Error) => toast({ 
      title: 'Failed to generate furniture suggestions', 
      description: e.message, 
      variant: 'destructive' 
    }),
  });

  // Mutation 3: Accept recommendation
  const acceptRecommendation = useMutation({
    mutationFn: ({ id, option }: { id: string; option: string }) => 
      recommendationService.acceptRecommendation(id, option),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recommendations', roomId] });
      toast({ title: 'Recommendation accepted' });
    },
    onError: (e: Error) => toast({ 
      title: 'Failed to accept', 
      description: e.message, 
      variant: 'destructive' 
    }),
  });

  // Mutation 4: Reject recommendation
  const rejectRecommendation = useMutation({
    mutationFn: ({ id, reason }: { id: string; reason: string }) => 
      recommendationService.rejectRecommendation(id, reason),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recommendations', roomId] });
      toast({ title: 'Recommendation rejected' });
    },
    onError: (e: Error) => toast({ 
      title: 'Failed to reject', 
      description: e.message, 
      variant: 'destructive' 
    }),
  });

  // Mutation 5: Submit feedback
  const submitFeedback = useMutation({
    mutationFn: (feedback: Omit<RecommendationFeedback, 'id' | 'created_at'>) => 
      recommendationService.submitFeedback(feedback),
    onSuccess: () => {
      toast({ title: 'Feedback submitted' });
    },
    onError: (e: Error) => toast({ 
      title: 'Failed to submit feedback', 
      description: e.message, 
      variant: 'destructive' 
    }),
  });

  // Computed values
  const styleRecommendations = recommendations.filter(r => r.recommendation_type === 'style');
  const furnitureRecommendations = recommendations.filter(r => r.recommendation_type === 'furniture_placement');
  const hasRecommendations = recommendations.length > 0;

  return {
    recommendations,
    styleRecommendations,
    furnitureRecommendations,
    hasRecommendations,
    isLoading,
    error,
    refetch,
    generateStyles,
    generateFurniture,
    acceptRecommendation,
    rejectRecommendation,
    submitFeedback,
  };
}
```

---

### Hook 2: `useSimilarProjects(roomId)`

**Purpose:** Fetch and manage similar project recommendations

```typescript
export function useSimilarProjects(roomId: string | undefined) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: similarProjects = [], isLoading, error } = useQuery({
    queryKey: ['similar-projects', roomId],
    queryFn: () => recommendationService.findSimilarProjects(roomId!),
    enabled: !!roomId,
  });

  // Mutation 6: Refresh similar projects
  const refreshSimilar = useMutation({
    mutationFn: (roomId: string) => 
      recommendationService.refreshSimilarProjects(roomId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['similar-projects', roomId] });
      toast({ title: 'Similar projects refreshed' });
    },
    onError: (e: Error) => toast({ 
      title: 'Failed to refresh', 
      description: e.message, 
      variant: 'destructive' 
    }),
  });

  return {
    similarProjects,
    isLoading,
    error,
    refreshSimilar,
  };
}
```

---

### Hook 3: `useTrendAnalysis(city, roomType)`

**Purpose:** Fetch trend analysis data

```typescript
export function useTrendAnalysis(city: string | undefined, roomType: string | undefined) {
  const { data: trendData, isLoading, error } = useQuery({
    queryKey: ['trend-analysis', city, roomType],
    queryFn: () => recommendationService.getTrendAnalysis(city!, roomType!),
    enabled: !!city && !!roomType,
  });

  return {
    trendData,
    isLoading,
    error,
  };
}
```

---

## 🎨 UI COMPONENTS REQUIREMENTS (MANDATORY)

### Component 1: `SmartRecommendations.tsx`

**Size Target:** ~18-22 KB | ~650-750 lines

**Purpose:** Main recommendations panel showing AI suggestions

**Required Props:**
```typescript
interface SmartRecommendationsProps {
  roomId: string;
  roomContext: RoomContext;
  onStyleSelected?: (styleName: string) => void;
  onFurnitureAccepted?: (placements: FurniturePlacement[]) => void;
}
```

**Required Features:**

1. **Style Recommendations Section (MANDATORY)**
   - Display 5-7 style cards in grid
   - Each card shows:
     - Style name (large, bold)
     - Confidence badge (0-100%) with color coding
     - Estimated cost with budget fit indicator
     - Pros list (3-5 bullets)
     - Cons list (2-3 bullets)
     - Sample image preview
     - "Select Style" button
   - Sorting: confidence score (high to low)
   - Filtering: budget fit (under/within/over budget)

2. **Furniture Placement Section (MANDATORY)**
   - Visual 2D room layout with furniture overlays
   - List view showing:
     - Item name + category
     - Placement coordinates (visual indicator)
     - Dimensions
     - Rationale tooltip
     - Estimated cost
     - Priority badge (essential/recommended/optional)
   - Actions:
     - Accept all placements
     - Accept individual items
     - Modify placement (drag-and-drop)
     - Reject item

3. **Budget Alternatives Section (MANDATORY)**
   - Table or card view showing:
     - Original item → Alternative item
     - Cost comparison (original vs alternative)
     - Savings amount + percentage
     - Quality impact indicator
     - Recommendation text
   - Actions:
     - Accept alternative (replaces original in budget)
     - Reject alternative
     - See details (opens modal)

4. **Trend Insights Section (MANDATORY)**
   - City-specific trends card:
     - Top 3 popular styles (with adoption rate %)
     - Trending items (top 5)
     - Seasonal recommendations
   - Global trends widget:
     - Rising/declining styles
     - Regional comparisons

5. **Similar Projects Gallery (MANDATORY)**
   - Horizontal scrollable gallery
   - Each card shows:
     - Final render image
     - Room name + style
     - Similarity score badge
     - Matching factors tags
     - "View Project" link
   - Load more / pagination

6. **Actions Panel (MANDATORY)**
   - "Generate Recommendations" button (if none exist)
   - "Refresh Recommendations" button
   - "Accept All Styles" button
   - "Apply Furniture Layout" button
   - "Save Preferences" button

**Required States:**
```typescript
const [selectedTab, setSelectedTab] = useState<'styles' | 'furniture' | 'budget' | 'trends' | 'similar'>('styles');
const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
const [acceptedPlacements, setAcceptedPlacements] = useState<string[]>([]);
const [budgetFilter, setBudgetFilter] = useState<'all' | 'under' | 'within'>('all');
```

**Required Layout:**
```tsx
<Card>
  <CardHeader>
    <h2>AI Recommendations</h2>
    <Tabs value={selectedTab} onValueChange={setSelectedTab}>
      <TabsList>
        <TabsTrigger value="styles">Styles</TabsTrigger>
        <TabsTrigger value="furniture">Furniture</TabsTrigger>
        <TabsTrigger value="budget">Budget</TabsTrigger>
        <TabsTrigger value="trends">Trends</TabsTrigger>
        <TabsTrigger value="similar">Similar Projects</TabsTrigger>
      </TabsList>
    </Tabs>
  </CardHeader>
  
  <CardContent>
    <TabsContent value="styles">
      {/* Style recommendation cards */}
    </TabsContent>
    
    <TabsContent value="furniture">
      {/* Furniture placement UI */}
    </TabsContent>
    
    <TabsContent value="budget">
      {/* Budget alternatives table */}
    </TabsContent>
    
    <TabsContent value="trends">
      {/* Trend analysis widgets */}
    </TabsContent>
    
    <TabsContent value="similar">
      {/* Similar projects gallery */}
    </TabsContent>
  </CardContent>
</Card>
```

---

### Component 2: `StyleRecommendationCard.tsx`

**Size Target:** ~5-7 KB | ~180-220 lines

**Purpose:** Individual style recommendation card

**Required Props:**
```typescript
interface StyleRecommendationCardProps {
  recommendation: StyleRecommendation;
  isSelected: boolean;
  onSelect: (styleName: string) => void;
  onViewDetails: (styleName: string) => void;
}
```

**Required Display:**
- Style name (h3)
- Confidence badge (with color: >80% green, 60-80% yellow, <60% orange)
- Budget fit indicator (icon + text)
- Estimated cost (formatted currency)
- Pros list (green checkmarks)
- Cons list (orange warnings)
- Sample image (aspect ratio 16:9, 300x169)
- "Select" button (primary when not selected, secondary when selected)
- "View Details" link

---

### Component 3: `FurniturePlacementViewer.tsx`

**Size Target:** ~8-10 KB | ~300-350 lines

**Purpose:** 2D room visualization with furniture overlays

**Required Props:**
```typescript
interface FurniturePlacementViewerProps {
  roomDimensions: { length_feet: number; width_feet: number };
  placements: FurniturePlacement[];
  onPlacementModified?: (placementId: string, newCoords: { x: number; y: number }) => void;
  onPlacementAccepted?: (placementId: string) => void;
  onPlacementRejected?: (placementId: string) => void;
}
```

**Required Features:**
- SVG-based 2D room representation (top-down view)
- Furniture items as draggable rectangles
- Item labels on hover
- Grid snapping (optional)
- Measurement indicators (show dimensions)
- Legend (color-coded by category)
- Zoom controls (+/- buttons)
- Reset view button

---

## 🔗 INTEGRATION REQUIREMENTS (MANDATORY)

### Integration Point 1: PhaseCustomize (Style Selection)

**File:** `src/components/rooms/PhaseCustomize.tsx`

**Required Changes:**
1. Add "Get AI Recommendations" button above style selector
2. On click, call `generateStyles.mutate(roomContext)`
3. Show `<SmartRecommendations />` in a modal or side panel
4. When user selects recommended style, auto-populate style selector
5. Close modal/panel after selection

**Code Location:**
```tsx
// Add before existing style selector
<div className="mb-6">
  <Button 
    onClick={() => setShowRecommendations(true)}
    variant="outline"
    className="w-full"
  >
    <Sparkles className="mr-2 h-4 w-4" />
    Get AI Style Recommendations
  </Button>
</div>

{/* Add modal */}
<Dialog open={showRecommendations} onOpenChange={setShowRecommendations}>
  <DialogContent className="max-w-6xl">
    <SmartRecommendations 
      roomId={room.id}
      roomContext={buildRoomContext(room)}
      onStyleSelected={(style) => {
        setSelectedStyle(style);
        setShowRecommendations(false);
      }}
    />
  </DialogContent>
</Dialog>
```

---

### Integration Point 2: Budget Page (Budget Optimization)

**File:** `src/pages/Budget.tsx`

**Required Changes:**
1. Add "Optimize Budget" button in header
2. On click, call `generateBudgetAlternatives.mutate(roomContext, budgetItems)`
3. Show alternatives in a modal
4. Allow user to accept alternatives (updates budget_items table)
5. Show projected savings in budget summary

---

### Integration Point 3: Dashboard (Trending Styles Widget)

**File:** `src/pages/Dashboard.tsx`

**Required Changes:**
1. Add "Trending Styles" card in dashboard grid
2. Use `useTrendAnalysis(userCity, 'all')` hook
3. Show top 3 trending styles with trend indicators (↑ rising, → stable, ↓ declining)
4. Link to style library or new project creation

---

## 🧪 TESTING REQUIREMENTS (MANDATORY)

### Test File: `src/__tests__/features/recommendations.test.tsx`

**Minimum 12 Test Cases:**

```typescript
describe('Smart AI Recommendations', () => {
  describe('Service Layer', () => {
    test('Generates style recommendations with confidence scores', async () => {
      const context = mockRoomContext();
      const rec = await recommendationService.generateStyleRecommendations(context);
      expect(rec.recommended_styles).toHaveLength(5); // At least 5
      rec.recommended_styles?.forEach(style => {
        expect(style.confidence_score).toBeGreaterThan(0);
        expect(style.confidence_score).toBeLessThanOrEqual(100);
      });
    });

    test('Filters recommendations by budget', async () => {
      const context = { ...mockRoomContext(), budget: { remaining: 50000 } };
      const rec = await recommendationService.generateStyleRecommendations(context);
      rec.recommended_styles?.forEach(style => {
        expect(style.budget_fit).toMatch(/under_budget|within_budget/);
      });
    });

    test('Calculates similarity between rooms', async () => {
      const score = await recommendationService.calculateSimilarity('room1', 'room2');
      expect(score).toBeGreaterThanOrEqual(0);
      expect(score).toBeLessThanOrEqual(100);
    });

    test('Generates furniture placement suggestions', async () => {
      const rec = await recommendationService.generateFurniturePlacement(mockRoomContext());
      expect(rec.furniture_suggestions).toBeDefined();
      expect(rec.furniture_suggestions!.length).toBeGreaterThan(0);
    });

    test('Accepts recommendation and updates database', async () => {
      await recommendationService.acceptRecommendation('rec-123', 'Modern Indian');
      const rec = await recommendationService.getRecommendationById('rec-123');
      expect(rec?.was_accepted).toBe(true);
      expect(rec?.selected_option).toBe('Modern Indian');
    });

    test('Submits feedback with validation', async () => {
      const feedback = {
        recommendation_id: 'rec-123',
        room_id: 'room-456',
        feedback_type: 'helpful' as const,
        helpfulness_score: 5,
        created_by: 'user-789',
      };
      await expect(recommendationService.submitFeedback(feedback)).resolves.not.toThrow();
    });
  });

  describe('React Hooks', () => {
    test('useRecommendations fetches data for room', async () => {
      const { result } = renderHook(() => useRecommendations('room-123'));
      await waitFor(() => expect(result.current.isLoading).toBe(false));
      expect(result.current.recommendations).toBeDefined();
    });

    test('useSimilarProjects returns similar rooms', async () => {
      const { result } = renderHook(() => useSimilarProjects('room-123'));
      await waitFor(() => expect(result.current.isLoading).toBe(false));
      expect(result.current.similarProjects).toHaveLength(3); // At least 3
    });

    test('generateStyles mutation triggers API call', async () => {
      const { result } = renderHook(() => useRecommendations('room-123'));
      act(() => {
        result.current.generateStyles.mutate(mockRoomContext());
      });
      await waitFor(() => expect(result.current.generateStyles.isSuccess).toBe(true));
    });

    test('acceptRecommendation mutation updates state', async () => {
      const { result } = renderHook(() => useRecommendations('room-123'));
      act(() => {
        result.current.acceptRecommendation.mutate({ id: 'rec-123', option: 'Modern Indian' });
      });
      await waitFor(() => expect(result.current.acceptRecommendation.isSuccess).toBe(true));
    });
  });

  describe('UI Components', () => {
    test('SmartRecommendations renders all tabs', () => {
      render(<SmartRecommendations roomId="room-123" roomContext={mockRoomContext()} />);
      expect(screen.getByText('Styles')).toBeInTheDocument();
      expect(screen.getByText('Furniture')).toBeInTheDocument();
      expect(screen.getByText('Budget')).toBeInTheDocument();
      expect(screen.getByText('Trends')).toBeInTheDocument();
      expect(screen.getByText('Similar Projects')).toBeInTheDocument();
    });

    test('StyleRecommendationCard displays all required fields', () => {
      const rec: StyleRecommendation = {
        style_name: 'Modern Indian',
        confidence_score: 87,
        reasoning: 'Best fit for your space',
        estimated_cost: 75000,
        pros: ['Timeless', 'Elegant'],
        cons: ['Expensive'],
        budget_fit: 'within_budget',
      };
      render(<StyleRecommendationCard recommendation={rec} isSelected={false} onSelect={jest.fn()} onViewDetails={jest.fn()} />);
      
      expect(screen.getByText('Modern Indian')).toBeInTheDocument();
      expect(screen.getByText('87%')).toBeInTheDocument();
      expect(screen.getByText('Timeless')).toBeInTheDocument();
      expect(screen.getByText('Expensive')).toBeInTheDocument();
    });
  });
});
```

**All tests must pass before deployment.**

---

## 📋 DEFINITION OF DONE (CHECKLIST)

### Database (10/10)

- [ ] `ai_recommendations` table exists with 18+ fields
- [ ] `recommendation_feedback` table exists with 12+ fields
- [ ] `similar_projects` table exists with 10+ fields
- [ ] All 3 tables have proper indexes (7 total minimum)
- [ ] All 3 tables have RLS policies (9 total minimum)
- [ ] CHECK constraints validated (recommendation_type, helpfulness_score, etc.)
- [ ] Realtime enabled for all 3 tables
- [ ] Foreign key relationships correct
- [ ] Triggers for updated_at (if needed)
- [ ] Migration file applied successfully

### Service Layer (7/7)

- [ ] File is 15-18 KB / 550-650 lines
- [ ] All 14+ methods implemented
- [ ] All required interfaces defined (8 interfaces)
- [ ] Helper methods for AI API calls
- [ ] Error handling on all methods
- [ ] Budget filtering logic implemented
- [ ] Similarity calculation algorithm working

### React Hooks (5/5)

- [ ] File is 8-10 KB / 280-350 lines
- [ ] 3 hooks implemented (useRecommendations, useSimilarProjects, useTrendAnalysis)
- [ ] 6 mutations implemented
- [ ] Real-time subscription working
- [ ] Toast notifications on all actions

### UI Components (6/6)

- [ ] SmartRecommendations.tsx (18-22 KB, 650-750 lines)
- [ ] 5 tabs working (Styles, Furniture, Budget, Trends, Similar)
- [ ] StyleRecommendationCard.tsx (5-7 KB, 180-220 lines)
- [ ] FurniturePlacementViewer.tsx (8-10 KB, 300-350 lines)
- [ ] All required features visible
- [ ] Responsive design

### Integration (3/3)

- [ ] PhaseCustomize: "Get AI Recommendations" button added
- [ ] Budget page: "Optimize Budget" button added
- [ ] Dashboard: "Trending Styles" widget added

### Testing (3/3)

- [ ] 12+ test cases written
- [ ] All tests pass
- [ ] No console errors

---

## 🚫 FORBIDDEN ACTIONS

**The following will result in IMMEDIATE REJECTION:**

1. ❌ Using fewer than 18 fields in `ai_recommendations` table
2. ❌ Implementing fewer than 14 service methods
3. ❌ Implementing fewer than 6 mutations
4. ❌ Omitting any of the 5 required tabs in SmartRecommendations
5. ❌ Not implementing overlay feature for furniture placement
6. ❌ Skipping budget filtering logic
7. ❌ Not implementing similarity calculation
8. ❌ Not adding integration points in PhaseCustomize/Budget/Dashboard
9. ❌ Skipping test cases
10. ❌ Missing RLS policies on any table

---

## 📊 ACCEPTANCE CRITERIA

**Feature will be ACCEPTED only if:**

1. ✅ **100% of database requirements met** (3 tables, all fields, indexes, RLS)
2. ✅ **100% of service methods implemented** (14+ methods)
3. ✅ **100% of React hooks/mutations implemented** (3 hooks, 6 mutations)
4. ✅ **100% of UI components built** (3 components, all tabs/features)
5. ✅ **100% of integration points added** (3 locations)
6. ✅ **12/12 test cases pass**
7. ✅ **No console errors** during manual testing
8. ✅ **Real-time subscriptions working**

**Partial implementation will be REJECTED.**

---

## 🎯 SUCCESS METRICS (Post-Launch)

**Track these KPIs after deployment:**

1. **Adoption Rate:** % of users who click "Get AI Recommendations"
   - Target: 70%+ within 7 days

2. **Acceptance Rate:** % of recommendations accepted by users
   - Target: 50%+ acceptance for style recommendations

3. **Time Savings:** Average time to select style (before vs after)
   - Target: 30% reduction in decision time

4. **Budget Impact:** Average cost savings from budget alternatives
   - Target: 15-20% savings when alternatives accepted

5. **Similarity Accuracy:** User feedback on "Similar Projects" relevance
   - Target: 80%+ find similar projects helpful

6. **Trend Influence:** % of users who choose trending styles
   - Target: 40%+ influenced by trend data

---

## 📚 REFERENCES

- **Database Schema:** `supabase/migrations/[timestamp]_recommendations_tables.sql` (to be created)
- **Service Example:** See `versionControlService.ts` for code patterns
- **Hook Example:** See `useRenderVersions.ts` for React Query patterns
- **Component Example:** See `RenderVersionTimeline.tsx` for UI patterns

---

## 🚀 IMPLEMENTATION ORDER

**Follow this sequence:**

1. **Database (30 min):** Create migration with 3 tables
2. **Service Layer (3-4 hours):** Implement all 14+ methods
3. **React Hooks (2-3 hours):** Implement 3 hooks + 6 mutations
4. **UI Components (4-5 hours):** Build 3 components with all features
5. **Integration (1-2 hours):** Add to PhaseCustomize, Budget, Dashboard
6. **Testing (2-3 hours):** Write and verify 12 test cases
7. **Manual Testing (30 min):** Test all features end-to-end

**Total Estimated Time:** 13-18 hours

---

## 📝 FINAL NOTES

**This is a STRICT, NON-NEGOTIABLE specification.**

Every requirement listed is **MANDATORY**. Partial implementations will be **REJECTED** and sent back for completion.

**Expected Quality:** Same as Feature 1 (A+ grade, 100% completion)

**Verification:** I will verify using the Definition of Done checklist.

**Questions?** None expected - specification is complete.

---

**Document Version:** 1.0  
**Created:** 2025-12-30  
**Status:** Ready for Implementation  
**Approved By:** AI Assistant  
**Next Step:** Send to Lovable for implementation
