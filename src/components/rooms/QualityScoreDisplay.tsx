import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  Lightbulb, 
  Building2,
  Palette,
  Camera,
  Sofa,
  Sparkles
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface QualityCategory {
  name: string;
  score: number;
  weight: number;
  description: string;
  icon: React.ReactNode;
  critical?: boolean;
}

interface QualityScoreDisplayProps {
  overallScore: number;
  categories?: QualityCategory[];
  showSuggestions?: boolean;
}

const defaultCategories: QualityCategory[] = [
  {
    name: 'Architectural Preservation',
    score: 0,
    weight: 2,
    description: 'Awaiting AI scoring against the cleaned image',
    icon: <Building2 className="h-4 w-4" />,
    critical: true,
  },
  {
    name: 'Style Accuracy',
    score: 0,
    weight: 1.5,
    description: 'Awaiting AI scoring',
    icon: <Palette className="h-4 w-4" />,
  },
  {
    name: 'Photorealism',
    score: 0,
    weight: 1.5,
    description: 'Awaiting AI scoring',
    icon: <Camera className="h-4 w-4" />,
  },
  {
    name: 'Furniture Proportions',
    score: 0,
    weight: 1,
    description: 'Awaiting AI scoring',
    icon: <Sofa className="h-4 w-4" />,
  },
  {
    name: 'Lighting Quality',
    score: 0,
    weight: 1,
    description: 'Awaiting AI scoring',
    icon: <Lightbulb className="h-4 w-4" />,
  },
];

const getSuggestions = (categories: QualityCategory[]): string[] => {
  const suggestions: string[] = [];
  
  categories.forEach(cat => {
    if (cat.score < 85) {
      if (cat.name === 'Photorealism') {
        suggestions.push('Try regenerating with "Ultra high resolution" in prompt');
      }
      if (cat.name === 'Style Accuracy') {
        suggestions.push('Select a library reference for more consistent style matching');
      }
      if (cat.name === 'Lighting Quality') {
        suggestions.push('Add specific lighting requirements in customization');
      }
    }
  });
  
  return suggestions.length > 0 ? suggestions : ['All quality metrics are performing well'];
};

export function QualityScoreDisplay({ 
  overallScore, 
  categories = defaultCategories,
  showSuggestions = true 
}: QualityScoreDisplayProps) {
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-amber-600';
    return 'text-destructive';
  };

  const getScoreBg = (score: number) => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 75) return 'bg-amber-500';
    return 'bg-destructive';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 90) return <CheckCircle2 className="h-4 w-4 text-green-500" />;
    if (score >= 75) return <AlertTriangle className="h-4 w-4 text-amber-500" />;
    return <XCircle className="h-4 w-4 text-destructive" />;
  };

  const getOverallBadge = () => {
    if (overallScore >= 90) {
      return <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Excellent</Badge>;
    }
    if (overallScore >= 75) {
      return <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20">Good</Badge>;
    }
    return <Badge variant="destructive">Needs Improvement</Badge>;
  };

  const suggestions = getSuggestions(categories);

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <CardTitle className="text-sm">Quality Score</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            {getOverallBadge()}
            <span className={cn("text-2xl font-bold", getScoreColor(overallScore))}>
              {overallScore}
            </span>
          </div>
        </div>
        <CardDescription className="text-xs">
          10-point quality assessment based on design standards
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Overall Progress */}
        <div className="space-y-1">
          <Progress value={overallScore} className={cn("h-2", getScoreBg(overallScore))} />
          <div className="flex justify-between text-[10px] text-muted-foreground">
            <span>0</span>
            <span>50</span>
            <span>100</span>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">Category Breakdown</p>
          <div className="space-y-2">
            {categories.map((category, idx) => (
              <div 
                key={idx} 
                className={cn(
                  "flex items-center justify-between p-2.5 rounded-lg border",
                  category.critical && "border-amber-500/20 bg-amber-500/5"
                )}
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <div className="text-muted-foreground shrink-0">
                    {category.icon}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-medium truncate">{category.name}</span>
                      {category.critical && (
                        <Badge variant="outline" className="text-[9px] px-1 py-0">Critical</Badge>
                      )}
                    </div>
                    <p className="text-[10px] text-muted-foreground truncate">
                      {category.description}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {getScoreIcon(category.score)}
                  <span className={cn("text-sm font-semibold tabular-nums", getScoreColor(category.score))}>
                    {category.score}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Suggestions */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="bg-primary/5 rounded-lg p-3 space-y-2">
            <div className="flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-primary" />
              <span className="text-xs font-medium">Improvement Suggestions</span>
            </div>
            <ul className="space-y-1">
              {suggestions.map((suggestion, idx) => (
                <li key={idx} className="text-xs text-muted-foreground flex items-start gap-1.5">
                  <span className="text-primary">•</span>
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
