# LOVABLE PROMPT: Feature 2 - Smart AI Recommendations Engine

**CONTEXT:**  
This is Feature 2 of 15 platform enhancements for HOUSPIRE AI. Feature 1 (Version Control) was completed with 100% success (A+ grade). Apply the same quality standards.

---

## 🎯 TASK

Implement **Smart AI Recommendations Engine** with **100% feature completeness**. All requirements are **MANDATORY** and **NON-NEGOTIABLE**.

---

## 📋 QUICK REQUIREMENTS

### Database (3 Tables - 40 Fields Total)

**Table 1: `ai_recommendations`** (18 fields minimum)
- Store AI-generated style/furniture/budget/trend recommendations
- Fields: id, room_id, recommendation_type, room_context, recommended_styles, furniture_suggestions, budget_alternatives, trend_data, model_used, confidence_score, reasoning, was_accepted, selected_option, user_feedback, generated_at, expires_at, created_by, CHECK constraints
- Indexes: room_id, recommendation_type, generated_at
- RLS: 4 policies (view/create/update for users, all for admins)

**Table 2: `recommendation_feedback`** (12 fields minimum)
- Track user feedback to improve AI
- Fields: id, recommendation_id, room_id, feedback_type, selected_option, rejection_reason, modification_details, helpfulness_score, user_comment, feedback_data, created_by, created_at
- Indexes: recommendation_id, room_id
- RLS: 3 policies (view/create for users, all for admins)

**Table 3: `similar_projects`** (10 fields minimum)
- Cache similar project recommendations
- Fields: id, source_room_id, similar_room_id, similarity_score, matching_factors, similar_room_preview, calculated_at, expires_at, created_at, UNIQUE constraint
- Indexes: source_room_id + similarity_score, expires_at
- RLS: 2 policies (view for users, all for system)

**Realtime:** Enable for all 3 tables

---

### Service Layer (`src/services/features/recommendationService.ts`)

**Size:** 15-18 KB | 550-650 lines  
**Methods:** **Minimum 14**

**Core (4):**
1. `getRecommendations(roomId, type?)` - Fetch all recommendations
2. `getRecommendationById(id)` - Fetch single recommendation
3. `generateStyleRecommendations(roomContext)` - Call AI API for styles
4. `generateFurniturePlacement(roomContext)` - Call AI API for furniture

**Budget (2):**
5. `generateBudgetAlternatives(roomContext, budgetItems)` - Optimize budget
6. `calculatePotentialSavings(roomId)` - Calculate savings

**Trends (2):**
7. `getTrendAnalysis(city, roomType)` - Get city trends
8. `getTrendingStyles()` - Get global trends

**Similar Projects (3):**
9. `findSimilarProjects(roomId, limit?)` - Find similar rooms
10. `calculateSimilarity(roomId1, roomId2)` - Calculate similarity score
11. `refreshSimilarProjects(roomId)` - Refresh cache

**Feedback (3):**
12. `submitFeedback(feedback)` - Submit user feedback
13. `acceptRecommendation(id, option)` - Mark as accepted
14. `rejectRecommendation(id, reason)` - Mark as rejected

**Interfaces Required (8):**
- `RoomContext`, `StyleRecommendation`, `FurniturePlacement`, `BudgetAlternative`, `TrendAnalysis`, `SimilarProject`, `AIRecommendation`, `RecommendationFeedback`

---

### React Hooks (`src/hooks/useRecommendations.ts`)

**Size:** 8-10 KB | 280-350 lines  
**Hooks:** 3 | **Mutations:** 6

**Hook 1: `useRecommendations(roomId, type?)`**
- Query: Fetch recommendations
- Real-time subscription
- Mutations:
  1. `generateStyles` - Generate style recommendations
  2. `generateFurniture` - Generate furniture placement
  3. `acceptRecommendation` - Accept recommendation
  4. `rejectRecommendation` - Reject recommendation
  5. `submitFeedback` - Submit feedback

**Hook 2: `useSimilarProjects(roomId)`**
- Query: Fetch similar projects
- Mutation:
  6. `refreshSimilar` - Refresh similar projects cache

**Hook 3: `useTrendAnalysis(city, roomType)`**
- Query: Fetch trend data

**All mutations:** Toast notifications on success/error

---

### UI Components

**Component 1: `SmartRecommendations.tsx`** (18-22 KB | 650-750 lines)

**5 MANDATORY Tabs:**

**1. Styles Tab:**
- Display 5-7 style recommendation cards
- Each card: style name, confidence badge (0-100%, color-coded), estimated cost, budget fit indicator, pros list (3-5), cons list (2-3), sample image, "Select" button
- Filter by budget fit (under/within/over)
- Sort by confidence score

**2. Furniture Tab:**
- 2D room layout viewer (SVG-based, top-down view)
- Furniture items as overlays with placement coordinates
- List view: item name, category, dimensions, rationale, cost, priority badge
- Actions: accept all, accept individual, modify placement, reject

**3. Budget Tab:**
- Table/card view of budget alternatives
- Columns: original item, alternative item, cost comparison, savings %, quality impact, recommendation
- Actions: accept alternative (updates budget), reject, view details

**4. Trends Tab:**
- City-specific trends: top 3 popular styles (adoption rate %), trending items, seasonal recommendations
- Global trends: rising/stable/declining styles, regional comparisons

**5. Similar Projects Tab:**
- Horizontal scrollable gallery
- Each card: final render image, room name + style, similarity score badge, matching factors tags, "View Project" link

**Actions Panel:**
- "Generate Recommendations" button
- "Refresh Recommendations" button
- "Accept All Styles" button (when multiple selected)
- "Apply Furniture Layout" button

**Component 2: `StyleRecommendationCard.tsx`** (5-7 KB | 180-220 lines)
- Props: `recommendation`, `isSelected`, `onSelect`, `onViewDetails`
- Display: style name, confidence badge (color-coded >80% green, 60-80% yellow, <60% orange), budget fit, cost, pros (✓), cons (⚠), sample image (16:9), select button

**Component 3: `FurniturePlacementViewer.tsx`** (8-10 KB | 300-350 lines)
- Props: `roomDimensions`, `placements`, `onPlacementModified`, `onPlacementAccepted`, `onPlacementRejected`
- Features: SVG 2D room view, draggable furniture rectangles, labels on hover, grid snapping, dimension indicators, legend, zoom controls

---

### Integration Points (3 Required)

**1. PhaseCustomize (`src/components/rooms/PhaseCustomize.tsx`)**
```tsx
// Add button above style selector
<Button onClick={() => setShowRecommendations(true)}>
  <Sparkles className="mr-2" /> Get AI Style Recommendations
</Button>

// Add modal
<Dialog open={showRecommendations} onOpenChange={setShowRecommendations}>
  <SmartRecommendations 
    roomId={room.id}
    roomContext={buildRoomContext(room)}
    onStyleSelected={(style) => {
      setSelectedStyle(style);
      setShowRecommendations(false);
    }}
  />
</Dialog>
```

**2. Budget Page (`src/pages/Budget.tsx`)**
- Add "Optimize Budget" button in header
- On click: generate budget alternatives, show modal, allow accept/reject

**3. Dashboard (`src/pages/Dashboard.tsx`)**
- Add "Trending Styles" card widget
- Use `useTrendAnalysis(userCity, 'all')`
- Show top 3 styles with trend indicators (↑↓→)

---

## 🧪 TESTING (12 Test Cases Minimum)

**File:** `src/__tests__/features/recommendations.test.tsx`

**Required Tests:**
1. Generates style recommendations with confidence scores
2. Filters recommendations by budget
3. Calculates similarity between rooms
4. Generates furniture placement suggestions
5. Accepts recommendation and updates database
6. Submits feedback with validation
7. useRecommendations fetches data for room
8. useSimilarProjects returns similar rooms
9. generateStyles mutation triggers API call
10. acceptRecommendation mutation updates state
11. SmartRecommendations renders all 5 tabs
12. StyleRecommendationCard displays all required fields

**All tests must pass.**

---

## 📋 DEFINITION OF DONE

**Database:**
- [ ] 3 tables exist (ai_recommendations, recommendation_feedback, similar_projects)
- [ ] 40+ fields total (18+12+10)
- [ ] 7 indexes minimum
- [ ] 9 RLS policies minimum
- [ ] Realtime enabled on all 3

**Service:**
- [ ] File is 15-18 KB / 550-650 lines
- [ ] 14+ methods implemented
- [ ] 8 interfaces defined
- [ ] Error handling throughout

**Hooks:**
- [ ] File is 8-10 KB / 280-350 lines
- [ ] 3 hooks implemented
- [ ] 6 mutations implemented
- [ ] Real-time subscription working
- [ ] Toast notifications on all actions

**Components:**
- [ ] SmartRecommendations.tsx (18-22 KB, 650-750 lines)
- [ ] 5 tabs working (Styles, Furniture, Budget, Trends, Similar)
- [ ] StyleRecommendationCard.tsx (5-7 KB, 180-220 lines)
- [ ] FurniturePlacementViewer.tsx (8-10 KB, 300-350 lines)

**Integration:**
- [ ] PhaseCustomize: "Get AI Recommendations" button works
- [ ] Budget page: "Optimize Budget" button works
- [ ] Dashboard: "Trending Styles" widget shows data

**Testing:**
- [ ] 12/12 test cases pass
- [ ] No console errors

---

## 🚫 FORBIDDEN

- ❌ Using fewer than 18 fields in ai_recommendations
- ❌ Implementing fewer than 14 service methods
- ❌ Implementing fewer than 6 mutations
- ❌ Omitting any of the 5 tabs (Styles/Furniture/Budget/Trends/Similar)
- ❌ Not implementing furniture placement 2D viewer
- ❌ Skipping budget filtering logic
- ❌ Not adding integration points in PhaseCustomize/Budget/Dashboard
- ❌ Skipping test cases
- ❌ Missing RLS policies

---

## 🎯 IMPLEMENTATION ORDER

1. **Database (30 min):** Create migration with 3 tables
2. **Service Layer (3-4 hours):** 14+ methods + 8 interfaces
3. **Hooks (2-3 hours):** 3 hooks + 6 mutations
4. **Components (4-5 hours):** 3 components with all tabs
5. **Integration (1-2 hours):** 3 integration points
6. **Testing (2-3 hours):** 12 test cases

**Total:** 13-18 hours

---

## 📸 EVIDENCE REQUIRED

After implementation, provide:

1. Screenshot: SmartRecommendations showing all 5 tabs
2. Screenshot: Style recommendation cards with confidence badges
3. Screenshot: 2D furniture placement viewer
4. Screenshot: Budget alternatives table
5. Screenshot: Similar projects gallery
6. Database query: `SELECT * FROM ai_recommendations LIMIT 1;` (verify 18+ columns)

---

## 📚 REFERENCES

- **Full Spec:** `docs/FEATURE_2_STRICT_REQUIREMENTS.md` (1,200+ lines)
- **Database Schema:** See full spec for exact SQL
- **Service Methods:** See full spec for signatures
- **Component Layouts:** See full spec for JSX structure

---

## ✅ ACCEPTANCE

Feature will be **ACCEPTED** only if:
1. ✅ 100% of database requirements met
2. ✅ 100% of service methods implemented (14+)
3. ✅ 100% of hooks/mutations implemented (3 hooks, 6 mutations)
4. ✅ 100% of UI components built (3 components, 5 tabs)
5. ✅ 100% of integration points added (3 locations)
6. ✅ 12/12 test cases pass
7. ✅ No console errors

**Partial implementation = REJECTION**

---

## 🎯 QUALITY STANDARD

**Expected Grade:** A+ (100% completion)  
**Precedent:** Feature 1 (Version Control) achieved 100% with this approach

**Verification:** Strict checklist review by AI Assistant

---

**START IMPLEMENTATION NOW.**

**Questions?** Reference `docs/FEATURE_2_STRICT_REQUIREMENTS.md` for complete details.

---

**Document:** Lovable Prompt - Feature 2  
**Version:** 1.0  
**Date:** 2025-12-30  
**Status:** Ready for Deployment
