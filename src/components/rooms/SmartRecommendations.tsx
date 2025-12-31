/**
 * Smart Recommendations Component
 * 
 * Main UI component displaying AI-powered recommendations including:
 * - Style recommendations with confidence scores
 * - Furniture placement suggestions
 * - Budget optimization alternatives
 * - Trend analysis insights
 * - Similar projects gallery
 * 
 * Size Target: 18-22 KB | ~650-750 lines
 * Features: 5 tabs, multiple sections, real-time updates
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
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  useRecommendations, 
  useSimilarProjects, 
  useTrendAnalysis,
  usePotentialSavings,
  type RoomContext 
} from '@/hooks/useRecommendations';
import { StyleRecommendationCard } from './StyleRecommendationCard';
import { FurniturePlacementViewer } from './FurniturePlacementViewer';

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
    refreshSimilar,
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
    generateStyles.mutate(roomContext);
  };

  const handleGenerateFurniture = () => {
    generateFurniture.mutate(roomContext);
  };

  const handleGenerateBudgetAlternatives = async () => {
    // Fetch actual budget items from the room
    let budgetItems: any[] = [];
    try {
      const { data: items } = await import('@/integrations/supabase/client').then(m => 
        m.supabase.from('budget_items').select('*').eq('room_id', roomId)
      );
      budgetItems = items || [];
    } catch (error) {
      console.error('Failed to fetch budget items:', error);
    }
    
    generateBudgetAlternatives.mutate({
      context: roomContext,
      items: budgetItems,
    });
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

  const handleRefreshSimilar = () => {
    refreshSimilar.mutate(roomId);
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
                    <ScrollArea className="h-[400px]">
                      <div className="space-y-4">
                        {latestFurnitureRec?.furniture_suggestions?.map((item, index) => (
                          <div key={index} className="border rounded-lg p-4 space-y-2">
                            <div className="flex items-start justify-between">
                              <div>
                                <h4 className="font-semibold">{item.item_name}</h4>
                                <p className="text-sm text-muted-foreground">{item.category}</p>
                              </div>
                              <Badge
                                variant={
                                  item.priority === 'essential'
                                    ? 'default'
                                    : item.priority === 'recommended'
                                    ? 'secondary'
                                    : 'outline'
                                }
                              >
                                {item.priority}
                              </Badge>
                            </div>
                            <Separator />
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div>
                                <span className="text-muted-foreground">Position:</span>
                                <span className="ml-2">
                                  {Math.round(item.placement.x)}%, {Math.round(item.placement.y)}%
                                </span>
                              </div>
                              <div>
                                <span className="text-muted-foreground">Cost:</span>
                                <span className="ml-2">₹{item.estimated_cost.toLocaleString()}</span>
                              </div>
                            </div>
                            <p className="text-xs text-muted-foreground">{item.rationale}</p>
                            <Button
                              size="sm"
                              variant="outline"
                              className="w-full"
                              onClick={() => handleAcceptPlacement(item.item_name)}
                              disabled={acceptedPlacements.includes(item.item_name)}
                            >
                              {acceptedPlacements.includes(item.item_name) ? '✓ Accepted' : 'Accept Item'}
                            </Button>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
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
                <AlertTitle>Find Budget Alternatives</AlertTitle>
                <AlertDescription>
                  Discover cost-effective alternatives that maintain quality while reducing expenses.
                </AlertDescription>
                <Button
                  className="mt-4"
                  onClick={handleGenerateBudgetAlternatives}
                  disabled={generateBudgetAlternatives.isPending}
                >
                  {generateBudgetAlternatives.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Finding Alternatives...
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
                {/* Savings Summary */}
                <Card className="bg-green-50 dark:bg-green-900/20">
                  <CardContent className="pt-6">
                    <div className="text-center space-y-2">
                      <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                        {formattedSavings}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Total Potential Savings ({savings?.savings_percentage.toFixed(1)}%)
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {savings?.alternatives_count} alternatives found
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Budget Alternatives List */}
                <div className="space-y-4">
                  {latestBudgetRec?.budget_alternatives?.map((alt, index) => (
                    <Card key={index}>
                      <CardContent className="pt-6">
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            {/* Original */}
                            <div className="space-y-2">
                              <p className="text-sm font-medium text-muted-foreground">Original</p>
                              <h4 className="font-semibold">{alt.original_item}</h4>
                              <p className="text-lg font-bold">
                                ₹{alt.original_cost.toLocaleString()}
                              </p>
                            </div>

                            {/* Alternative */}
                            <div className="space-y-2">
                              <p className="text-sm font-medium text-muted-foreground">Alternative</p>
                              <h4 className="font-semibold">{alt.alternative_item}</h4>
                              <p className="text-lg font-bold text-green-600">
                                ₹{alt.alternative_cost.toLocaleString()}
                              </p>
                            </div>
                          </div>

                          <Separator />

                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm font-medium">Savings</p>
                              <p className="text-lg font-bold text-green-600">
                                ₹{alt.cost_saving.toLocaleString()} ({alt.savings_percentage}%)
                              </p>
                            </div>
                            <Badge
                              variant={
                                alt.quality_impact === 'minimal'
                                  ? 'default'
                                  : alt.quality_impact === 'moderate'
                                  ? 'secondary'
                                  : 'destructive'
                              }
                            >
                              {alt.quality_impact} quality impact
                            </Badge>
                          </div>

                          <p className="text-sm text-muted-foreground">{alt.recommendation}</p>

                          <Button
                            className="w-full"
                            onClick={() => handleAcceptBudgetAlternative(alt)}
                          >
                            Accept Alternative
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </TabsContent>

          {/* ============================================= */}
          {/* TAB 4: TREND ANALYSIS */}
          {/* ============================================= */}
          <TabsContent value="trends" className="space-y-4">
            {isLoadingTrends ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <>
                {/* City Trends */}
                {hasTrendData && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5" />
                        Popular in {roomContext.location.city}
                      </CardTitle>
                      <CardDescription>
                        Based on {trendData?.sample_size || 0} recent projects
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {trendData?.popular_styles.map((style, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-medium">{style.style_name}</span>
                              <div className="flex items-center gap-2">
                                <Badge variant={style.trend === 'rising' ? 'default' : 'secondary'}>
                                  {style.trend === 'rising' ? '↑' : style.trend === 'declining' ? '↓' : '→'} {style.trend}
                                </Badge>
                                <span className="text-sm font-semibold">
                                  {style.adoption_rate.toFixed(1)}%
                                </span>
                              </div>
                            </div>
                            <Progress value={style.adoption_rate} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Seasonal Trends */}
                {trendData?.seasonal_trends && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Seasonal Recommendations</CardTitle>
                      <CardDescription>
                        Trending for {trendData.seasonal_trends.current_season}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm font-medium mb-2">Recommended Colors</p>
                          <div className="flex flex-wrap gap-2">
                            {trendData.seasonal_trends.recommended_colors.map((color, index) => (
                              <Badge key={index} variant="outline">
                                {color}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium mb-2">Recommended Materials</p>
                          <div className="flex flex-wrap gap-2">
                            {trendData.seasonal_trends.recommended_materials.map((material, index) => (
                              <Badge key={index} variant="secondary">
                                {material}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Global Trends */}
                <Card>
                  <CardHeader>
                    <CardTitle>Top Trending Styles Globally</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {globalTrends.slice(0, 5).map((trend, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="font-medium">{trend.style}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-muted-foreground">
                              {trend.cities.length} cities
                            </span>
                            <Badge>{trend.trend_score}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </TabsContent>

          {/* ============================================= */}
          {/* TAB 5: SIMILAR PROJECTS */}
          {/* ============================================= */}
          <TabsContent value="similar" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Similar Projects</h3>
                <p className="text-sm text-muted-foreground">
                  Completed projects similar to yours
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefreshSimilar}
                disabled={refreshSimilar.isPending}
              >
                {refreshSimilar.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
              </Button>
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
                {similarProjects.map((project) => (
                  <Card key={project.room_id} className="overflow-hidden">
                    <div className="aspect-video relative bg-muted">
                      {project.final_image_url ? (
                        <img
                          src={project.final_image_url}
                          alt={project.room_name}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <Images className="h-12 w-12 text-muted-foreground" />
                        </div>
                      )}
                      <Badge className="absolute top-2 right-2">
                        {project.similarity_score}% match
                      </Badge>
                    </div>
                    <CardContent className="pt-4 space-y-2">
                      <h4 className="font-semibold">{project.room_name}</h4>
                      <p className="text-sm text-muted-foreground">{project.project_name}</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{project.style}</span>
                        <span className="font-medium">₹{project.budget.toLocaleString()}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {project.matching_factors.map((factor, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {factor.replace('_', ' ')}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
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
