/**
 * F-055: Quality Score Display Component
 * 
 * Visual representation of render quality assessment
 * with detailed breakdown and improvement suggestions.
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Award,
  CheckCircle2,
  AlertCircle,
  XCircle,
  Lightbulb,
  TrendingUp,
  Palette,
  Building2,
  Sofa,
  Image as ImageIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { QualityScore } from '@/services/features/qualityScoringService';

interface QualityScoreDisplayProps {
  score: QualityScore;
  className?: string;
}

export function QualityScoreDisplay({
  score,
  className,
}: QualityScoreDisplayProps) {
  // Determine grade color
  const getGradeColor = (grade: string) => {
    switch (grade) {
      case 'A+':
      case 'Excellent':
        return 'text-green-600 dark:text-green-400';
      case 'A':
      case 'Good':
        return 'text-blue-600 dark:text-blue-400';
      case 'B':
      case 'Fair':
        return 'text-yellow-600 dark:text-yellow-400';
      case 'C':
      case 'D':
      case 'F':
      case 'Poor':
        return 'text-red-600 dark:text-red-400';
      default:
        return 'text-gray-600';
    }
  };

  const getGradeBg = (grade: string) => {
    switch (grade) {
      case 'A+':
      case 'Excellent':
        return 'bg-green-500/10 border-green-500/20';
      case 'A':
      case 'Good':
        return 'bg-blue-500/10 border-blue-500/20';
      case 'B':
      case 'Fair':
        return 'bg-yellow-500/10 border-yellow-500/20';
      case 'C':
      case 'D':
      case 'F':
      case 'Poor':
        return 'bg-red-500/10 border-red-500/20';
      default:
        return 'bg-gray-500/10';
    }
  };

  const getScoreIcon = (grade: string) => {
    switch (grade) {
      case 'A+':
      case 'Excellent':
        return <Award className="w-6 h-6 text-green-600 dark:text-green-400" />;
      case 'A':
      case 'Good':
        return <CheckCircle2 className="w-6 h-6 text-blue-600 dark:text-blue-400" />;
      case 'B':
      case 'Fair':
        return <AlertCircle className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />;
      case 'C':
      case 'D':
      case 'F':
      case 'Poor':
        return <XCircle className="w-6 h-6 text-red-600 dark:text-red-400" />;
      default:
        return null;
    }
  };

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-primary/10">
              <TrendingUp className="w-4 h-4 text-primary" />
            </div>
            <div>
              <CardTitle className="text-base">Quality Assessment</CardTitle>
              <CardDescription className="text-xs">
                AI-powered render analysis
              </CardDescription>
            </div>
          </div>
          <Badge variant="secondary" className="text-xs">
            v{score.scoring_version}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Overall Score */}
        <div className={cn('p-4 rounded-lg border', getGradeBg(score.quality_grade))}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              {getScoreIcon(score.quality_grade)}
              <div>
                <div className={cn('text-2xl font-bold', getGradeColor(score.quality_grade))}>
                  {score.total_score}/100
                </div>
                <div className="text-sm text-muted-foreground">Overall Score</div>
              </div>
            </div>
            <Badge
              variant="outline"
              className={cn('text-sm', getGradeColor(score.quality_grade))}
            >
              {score.quality_grade}
            </Badge>
          </div>
          <Progress
            value={score.total_score}
            className="h-2"
          />
        </div>

        <Separator />

        {/* Component Scores */}
        <div className="space-y-3">
          <div className="text-sm font-medium">Score Breakdown</div>

          {/* Style Consistency */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-muted-foreground" />
                <span>Style Consistency</span>
              </div>
              <span className="font-medium">
                {score.style_consistency}/100
              </span>
            </div>
            <Progress
              value={score.style_consistency}
              className="h-1.5"
            />
          </div>

          {/* Architectural Accuracy */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-muted-foreground" />
                <span>Architectural Accuracy</span>
              </div>
              <span className="font-medium">
                {score.architectural_accuracy}/100
              </span>
            </div>
            <Progress
              value={score.architectural_accuracy}
              className="h-1.5"
            />
          </div>

          {/* Furniture Placement */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Sofa className="w-4 h-4 text-muted-foreground" />
                <span>Furniture Placement</span>
              </div>
              <span className="font-medium">
                {score.furniture_placement}/100
              </span>
            </div>
            <Progress
              value={score.furniture_placement}
              className="h-1.5"
            />
          </div>

          {/* Color & Material */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-muted-foreground" />
                <span>Color & Materials</span>
              </div>
              <span className="font-medium">
                {score.color_material_adherence}/100
              </span>
            </div>
            <Progress
              value={score.color_material_adherence}
              className="h-1.5"
            />
          </div>

          {/* Technical Quality */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-muted-foreground" />
                <span>Technical Quality</span>
              </div>
              <span className="font-medium">
                {score.technical_quality}/100
              </span>
            </div>
            <Progress
              value={score.technical_quality}
              className="h-1.5"
            />
          </div>
        </div>

        {/* Improvement Suggestions */}
        {score.suggestions.length > 0 && (
          <>
            <Separator />
            <Alert>
              <Lightbulb className="w-4 h-4" />
              <AlertDescription>
                <div className="space-y-1">
                  <div className="font-medium text-sm">Improvement Suggestions</div>
                  {score.suggestions.map((suggestion, idx) => (
                    <div key={idx} className="text-xs flex items-start gap-2">
                      <div className="w-1 h-1 rounded-full bg-primary mt-1.5 shrink-0" />
                      <span>{suggestion}</span>
                    </div>
                  ))}
                </div>
              </AlertDescription>
            </Alert>
          </>
        )}

        {/* Success State for High Scores */}
        {score.total_score >= 85 && (
          <>
            <Separator />
            <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/20">
              <div className="flex items-center gap-2 text-sm font-medium text-green-700 dark:text-green-400">
                <CheckCircle2 className="w-4 h-4" />
                <span>Excellent Quality - Ready for client presentation</span>
              </div>
            </div>
          </>
        )}

        {/* Metadata */}
        <div className="text-xs text-muted-foreground text-center pt-2">
          Scored: {new Date(score.scored_at).toLocaleString()}
        </div>
      </CardContent>
    </Card>
  );
}
