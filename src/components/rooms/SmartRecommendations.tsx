/**
 * Smart Recommendations Component
 * 
 * Main UI component displaying AI-powered recommendations including:
 * - Style recommendations with confidence scores
 * - Furniture placement suggestions
 * - Budget optimization alternatives
 * - Trend analysis insights
 * - Similar projects gallery
 */

import React, { useState } from 'react';
import { Sparkles, TrendingUp, DollarSign, Layout, Images, RefreshCw, Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { 
  useRecommendations, 
  useSimilarProjects, 
  useTrendAnalysis,
  usePotentialSavings,
  type RoomContext 
} from '@/hooks/useRecommendations';
import { StyleRecommendationCard } from './StyleRecommendationCard';
import type { Json } from '@/integrations/supabase/types';

// =====================================================
// COMPONENT PROPS
// =====================================================

interface SmartRecommendationsProps {
  roomId: string;
  roomContext: RoomContext;
  onStyleSelected?: (styleName: string) => void;
  onFurnitureAccepted?: (placements: any[]) => void;
  onBudgetAlternativeAccepted?: (alternative: any) => void;
}

// Helper to safely parse similar_room_preview JSON
interface SimilarRoomPreview {
  room_id?: string;
  room_name?: string;
  project_name?: string;
  final_image_url?: string;
  style?: string;
  budget?: number;
}

function parseSimilarRoomPreview(preview: Json | null): SimilarRoomPreview {
  if (!preview || typeof preview !== 'object' || Array.isArray(preview)) {
    return {};
  }
  return preview as unknown as SimilarRoomPreview;
}

// =====================================================
// MAIN COMPONENT
// =====================================================

export function SmartRecommendations({
  roomId,
  roomContext,
  onStyleSelected,
  onFurnitureAccepted,
  onBudgetAlternativeAccepted,
}: SmartRecommendationsProps) {
  // ===================================================
  // STATE
  // ===================================================
  
  const [selectedTab, setSelectedTab] = useState<'styles' | 'furniture' | 'budget' | 'trends' | 'similar'>('styles');
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [budgetFilter, setBudgetFilter] = useState<'all' | 'under' | 'within'>('all');
  const [acceptedPlacements, setAcceptedPlacements] = useState<string[]>([]);

  // ===================================================
  // HOOKS
  // ===================================================
  
  const {
    recommendations,
    styleRecommendations,
    furnitureRecommendations,
    budgetRecommendations,
    hasRecommendations,
    hasStyleRecommendations,
    hasFurnitureRecommendations,
    hasBudgetRecommendations,
    isLoading,
    generateStyles,
    generateFurniture,
    generateBudgetAlternatives,
    acceptRecommendation,
    refetch,
  } = useRecommendations(roomId);

  const {
    similarProjects,
    hasSimilarProjects,
    isLoading: isLoadingSimilar,
  } = useSimilarProjects(roomId, 6);

  const {
    trendData,
    globalTrends,
    hasTrendData,
    topTrendingStyle,
    isLoading: isLoadingTrends,
  } = useTrendAnalysis(roomContext.location.city, roomContext.room_type);

  const {
    savings,
    hasSavings,
    formattedSavings,
    isLoading: isLoadingSavings,
  } = usePotentialSavings(roomId);

  // ===================================================
  // HANDLERS
  // ===================================================
  
  const handleGenerateStyles = () => {
    generateStyles.mutate();
  };

  const handleGenerateFurniture = () => {
    generateFurniture.mutate();
  };

  const handleGenerateBudgetAlternatives = async () => {
    generateBudgetAlternatives.mutate();
  };

  const handleStyleSelect = (styleName: string) => {
    setSelectedStyle(styleName);
    if (onStyleSelected) {
      onStyleSelected(styleName);
    }
    
    // Accept the style recommendation
    const styleRec = styleRecommendations[0];
    if (styleRec) {
      acceptRecommendation.mutate({ id: styleRec.id, option: styleName });
    }
  };

  const handleAcceptPlacement = (placementId: string) => {
    setAcceptedPlacements([...acceptedPlacements, placementId]);
  };

  const handleAcceptAllPlacements = () => {
    const furnitureRec = furnitureRecommendations[0];
    if (furnitureRec?.furniture_suggestions && onFurnitureAccepted) {
      onFurnitureAccepted(furnitureRec.furniture_suggestions);
      acceptRecommendation.mutate({ id: furnitureRec.id, option: 'all_placements' });
    }
  };

  const handleAcceptBudgetAlternative = (alternative: any) => {
    if (onBudgetAlternativeAccepted) {
      onBudgetAlternativeAccepted(alternative);
    }
  };

  // ===================================================
  // COMPUTED VALUES
  // ===================================================
  
  const latestStyleRec = styleRecommendations[0];
  const latestFurnitureRec = furnitureRecommendations[0];
  const latestBudgetRec = budgetRecommendations[0];

  const filteredStyles = latestStyleRec?.recommended_styles?.filter(style => {
    if (budgetFilter === 'all') return true;
    if (budgetFilter === 'under') return style.budget_fit === 'under_budget';
    if (budgetFilter === 'within') return style.budget_fit === 'within_budget' || style.budget_fit === 'under_budget';
    return true;
  }) || [];

  // ===================================================
  // RENDER
  // ===================================================
  
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-2xl flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              AI Recommendations
            </CardTitle>
            <CardDescription>
              Smart suggestions powered by AI for your {roomContext.room_type}
            </CardDescription>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            disabled={isLoading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {/* Quick Stats */}
        {hasRecommendations && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            <Card>
              <CardContent className="pt-4">
                <div className="text-2xl font-bold">{styleRecommendations.length}</div>
                <p className="text-xs text-muted-foreground">Style Options</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="text-2xl font-bold">{furnitureRecommendations.length}</div>
                <p className="text-xs text-muted-foreground">Furniture Plans</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="text-2xl font-bold">{similarProjects.length}</div>
                <p className="text-xs text-muted-foreground">Similar Projects</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-4">
                <div className="text-2xl font-bold">{formattedSavings}</div>
                <p className="text-xs text-muted-foreground">Potential Savings</p>
              </CardContent>
            </Card>
          </div>
        )}
      </CardHeader>

      <CardContent>
        <Tabs value={selectedTab} onValueChange={(v) => setSelectedTab(v as any)}>
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="styles" className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              <span className="hidden sm:inline">Styles</span>
              {hasStyleRecommendations && (
                <Badge variant="secondary" className="ml-1">
                  {styleRecommendations.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="furniture" className="flex items-center gap-2">
              <Layout className="h-4 w-4" />
              <span className="hidden sm:inline">Furniture</span>
              {hasFurnitureRecommendations && (
                <Badge variant="secondary" className="ml-1">
                  {furnitureRecommendations.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="budget" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              <span className="hidden sm:inline">Budget</span>
              {hasSavings && (
                <Badge variant="secondary" className="ml-1">
                  Save
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="trends" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Trends</span>
            </TabsTrigger>
            <TabsTrigger value="similar" className="flex items-center gap-2">
              <Images className="h-4 w-4" />
              <span className="hidden sm:inline">Similar</span>
              {hasSimilarProjects && (
                <Badge variant="secondary" className="ml-1">
                  {similarProjects.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          {/* ============================================= */}
          {/* TAB 1: STYLE RECOMMENDATIONS */}
          {/* ============================================= */}
          <TabsContent value="styles" className="space-y-4">
            {!hasStyleRecommendations ? (
              <Alert>
                <Sparkles className="h-4 w-4" />
                <AlertTitle>Generate Style Recommendations</AlertTitle>
                <AlertDescription>
                  Let AI analyze your room and suggest the best styles based on dimensions, 
                  budget, and location trends.
                </AlertDescription>
                <Button
                  className="mt-4"
                  onClick={handleGenerateStyles}
                  disabled={generateStyles.isPending}
                >
                  {generateStyles.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      Generate Style Recommendations
                    </>
                  )}
                </Button>
              </Alert>
            ) : (
              <>
                {/* Filter Controls */}
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold">Recommended Styles</h3>
                    <p className="text-sm text-muted-foreground">
                      {filteredStyles.length} styles match your criteria
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={budgetFilter === 'all' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setBudgetFilter('all')}
                    >
                      All Styles
                    </Button>
                    <Button
                      variant={budgetFilter === 'within' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setBudgetFilter('within')}
                    >
                      Within Budget
                    </Button>
                    <Button
                      variant={budgetFilter === 'under' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setBudgetFilter('under')}
                    >
                      Under Budget
                    </Button>
                  </div>
                </div>

                {/* Confidence Score */}
                {latestStyleRec && (
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Overall Confidence</span>
                          <span className="text-sm font-bold">{latestStyleRec.confidence_score}%</span>
                        </div>
                        <Progress value={latestStyleRec.confidence_score} className="h-2" />
                        <p className="text-xs text-muted-foreground mt-2">
                          {latestStyleRec.reasoning}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Style Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredStyles.map((style, index) => (
                    <StyleRecommendationCard
                      key={index}
                      recommendation={style}
                      isSelected={selectedStyle === style.style_name}
                      onSelect={handleStyleSelect}
                      onViewDetails={(styleName) => console.log('View details:', styleName)}
                    />
                  ))}
                </div>

                {filteredStyles.length === 0 && (
                  <Alert>
                    <AlertDescription>
                      No styles match your current budget filter. Try selecting "All Styles" to see more options.
                    </AlertDescription>
                  </Alert>
                )}
              </>
            )}
          </TabsContent>

          {/* ============================================= */}
          {/* TAB 2: FURNITURE PLACEMENT */}
          {/* ============================================= */}
          <TabsContent value="furniture" className="space-y-4">
            {!hasFurnitureRecommendations ? (
              <Alert>
                <Layout className="h-4 w-4" />
                <AlertTitle>Generate Furniture Layout</AlertTitle>
                <AlertDescription>
                  AI will create an optimal furniture placement plan based on your room dimensions
                  and selected style.
                </AlertDescription>
                <Button
                  className="mt-4"
                  onClick={handleGenerateFurniture}
                  disabled={generateFurniture.isPending || !roomContext.selected_style}
                >
                  {generateFurniture.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Layout className="mr-2 h-4 w-4" />
                      Generate Furniture Layout
                    </>
                  )}
                </Button>
                {!roomContext.selected_style && (
                  <p className="text-sm text-muted-foreground mt-2">
                    Please select a style first to generate furniture recommendations.
                  </p>
                )}
              </Alert>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Furniture Layout</h3>
                    <p className="text-sm text-muted-foreground">
                      {latestFurnitureRec?.furniture_suggestions?.length || 0} items suggested
                    </p>
                  </div>
                  <Button onClick={handleAcceptAllPlacements}>
                    Accept All Placements
                  </Button>
                </div>

                {latestFurnitureRec?.furniture_suggestions && (
                  <div className="p-4 border rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      Furniture placement viewer requires room layout data. 
                      {latestFurnitureRec.furniture_suggestions.length} furniture items suggested.
                    </p>
                  </div>
                )}

                {/* Furniture List */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Furniture Items</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {latestFurnitureRec?.furniture_suggestions?.map((item: any, index: number) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                          <span className="text-sm">{item.name || item.type}</span>
                          <Badge variant="outline">{item.position || 'Suggested'}</Badge>
                        </div>
                      )) || (
                        <p className="text-sm text-muted-foreground">No furniture items available</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </TabsContent>

          {/* ============================================= */}
          {/* TAB 3: BUDGET ALTERNATIVES */}
          {/* ============================================= */}
          <TabsContent value="budget" className="space-y-4">
            {!hasBudgetRecommendations ? (
              <Alert>
                <DollarSign className="h-4 w-4" />
                <AlertTitle>Generate Budget Alternatives</AlertTitle>
                <AlertDescription>
                  AI will analyze your budget items and suggest cost-saving alternatives
                  without compromising on quality.
                </AlertDescription>
                <Button
                  className="mt-4"
                  onClick={handleGenerateBudgetAlternatives}
                  disabled={generateBudgetAlternatives.isPending}
                >
                  {generateBudgetAlternatives.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <DollarSign className="mr-2 h-4 w-4" />
                      Find Budget Alternatives
                    </>
                  )}
                </Button>
              </Alert>
            ) : (
              <>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Budget Alternatives</h3>
                    <p className="text-sm text-muted-foreground">
                      Potential savings: {formattedSavings}
                    </p>
                  </div>
                </div>

                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {latestBudgetRec?.budget_alternatives?.map((alt: any, index: number) => (
                        <div key={index} className="p-4 border rounded-lg space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-medium">{alt.item_name || alt.original_item}</span>
                            <Badge variant="secondary">
                              Save ₹{(alt.savings || 0).toLocaleString()}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{alt.alternative || alt.suggestion}</p>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleAcceptBudgetAlternative(alt)}
                          >
                            Accept Alternative
                          </Button>
                        </div>
                      )) || (
                        <p className="text-sm text-muted-foreground">No alternatives available</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </TabsContent>

          {/* ============================================= */}
          {/* TAB 4: TRENDS */}
          {/* ============================================= */}
          <TabsContent value="trends" className="space-y-4">
            {isLoadingTrends ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : !hasTrendData ? (
              <Alert>
                <TrendingUp className="h-4 w-4" />
                <AlertTitle>No Trend Data Available</AlertTitle>
                <AlertDescription>
                  Trend data for your city and room type is not available yet.
                  Check back later as we gather more data.
                </AlertDescription>
              </Alert>
            ) : (
              <>
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold">Design Trends</h3>
                  <p className="text-sm text-muted-foreground">
                    Popular styles in {roomContext.location.city} for {roomContext.room_type}
                  </p>
                </div>

                {topTrendingStyle && (
                  <Card className="bg-primary/5 border-primary/20">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3">
                        <TrendingUp className="h-8 w-8 text-primary" />
                        <div>
                          <p className="font-semibold">{topTrendingStyle}</p>
                          <p className="text-sm text-muted-foreground">Top trending style this month</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {globalTrends.map((trend: any, index: number) => (
                    <Card key={index}>
                      <CardContent className="pt-4">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{trend.style || trend.name}</span>
                          <Badge variant="outline">{trend.popularity || trend.score}%</Badge>
                        </div>
                        <Progress value={trend.popularity || trend.score} className="h-2 mt-2" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </TabsContent>

          {/* ============================================= */}
          {/* TAB 5: SIMILAR PROJECTS */}
          {/* ============================================= */}
          <TabsContent value="similar" className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-lg font-semibold">Similar Projects</h3>
                <p className="text-sm text-muted-foreground">
                  Projects with similar room characteristics
                </p>
              </div>
            </div>

            {isLoadingSimilar ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : !hasSimilarProjects ? (
              <Alert>
                <Images className="h-4 w-4" />
                <AlertTitle>No Similar Projects Found</AlertTitle>
                <AlertDescription>
                  We couldn't find projects similar to yours yet. As more projects are completed,
                  we'll show you relevant matches here.
                </AlertDescription>
              </Alert>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {similarProjects.map((project) => {
                  const preview = parseSimilarRoomPreview(project.similar_room_preview);
                  return (
                    <Card key={project.id} className="overflow-hidden">
                      <div className="aspect-video relative bg-muted">
                        {preview.final_image_url ? (
                          <img
                            src={preview.final_image_url}
                            alt={preview.room_name || 'Similar room'}
                            className="object-cover w-full h-full"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full">
                            <Images className="h-12 w-12 text-muted-foreground" />
                          </div>
                        )}
                        <Badge className="absolute top-2 right-2">
                          {Math.round(project.similarity_score * 100)}% match
                        </Badge>
                      </div>
                      <CardContent className="pt-4 space-y-2">
                        <h4 className="font-semibold">{preview.room_name || 'Room'}</h4>
                        <p className="text-sm text-muted-foreground">{preview.project_name || 'Project'}</p>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">{preview.style || 'Style'}</span>
                          <span className="font-medium">₹{(preview.budget || 0).toLocaleString()}</span>
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {project.matching_factors?.map((factor, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {factor.replace('_', ' ')}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}

// Export component
export default SmartRecommendations;
