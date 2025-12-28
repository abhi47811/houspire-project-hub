import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  Shield, 
  Wand2,
  MessageSquare,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Textarea } from '@/components/ui/textarea';
import { useQualityControl, QualityViolation } from '@/hooks/useQualityControl';
import { cn } from '@/lib/utils';

interface QualityControlPanelProps {
  roomId: string;
  ceilingFanDetected?: boolean;
  onAutoFix?: (violation: QualityViolation) => void;
  compact?: boolean;
}

const SEVERITY_CONFIG = {
  critical: { color: 'bg-destructive text-destructive-foreground', icon: XCircle },
  high: { color: 'bg-orange-500 text-white', icon: AlertTriangle },
  medium: { color: 'bg-amber-500 text-white', icon: AlertTriangle },
  low: { color: 'bg-blue-500 text-white', icon: AlertTriangle },
};

const getScoreColor = (score: number) => {
  if (score >= 85) return 'text-green-600';
  if (score >= 70) return 'text-amber-600';
  return 'text-destructive';
};

const getScoreBadge = (score: number) => {
  if (score >= 85) return { label: 'Excellent', variant: 'bg-green-500/10 text-green-600 border-green-500/20' };
  if (score >= 70) return { label: 'Good', variant: 'bg-amber-500/10 text-amber-600 border-amber-500/20' };
  return { label: 'Needs Review', variant: 'bg-destructive/10 text-destructive border-destructive/20' };
};

export function QualityControlPanel({ 
  roomId, 
  ceilingFanDetected,
  onAutoFix,
  compact = false 
}: QualityControlPanelProps) {
  const [expandedViolation, setExpandedViolation] = useState<string | null>(null);
  const [overrideNotes, setOverrideNotes] = useState<Record<string, string>>({});
  
  const { 
    violations, 
    qualityScore, 
    violationsLoading,
    overrideViolation,
    markAutoFixed,
    getRuleByCode,
  } = useQualityControl(roomId);

  const activeViolations = violations.filter(v => !v.resolved_at);
  const scoreBadge = getScoreBadge(qualityScore);

  const handleAutoFix = async (violation: QualityViolation) => {
    const rule = getRuleByCode(violation.rule_code);
    if (rule?.auto_fix_available && onAutoFix) {
      onAutoFix(violation);
      await markAutoFixed.mutateAsync({
        violationId: violation.id,
        fixDescription: `Auto-fixed by regenerating without ${violation.rule_code === 'FAN_LIGHT_CONFLICT' ? 'hanging lights' : 'conflicting elements'}`
      });
    }
  };

  const handleOverride = async (violationId: string) => {
    const notes = overrideNotes[violationId] || 'Reviewer override - accepted as-is';
    await overrideViolation.mutateAsync({ violationId, notes });
    setExpandedViolation(null);
  };

  if (violationsLoading) {
    return (
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Shield className="h-4 w-4 animate-pulse" />
            <span className="text-sm">Checking quality...</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <Badge className={cn("text-xs", scoreBadge.variant)}>
          QC: {qualityScore}
        </Badge>
        {activeViolations.length > 0 && (
          <Badge variant="destructive" className="text-xs">
            {activeViolations.length} issue{activeViolations.length !== 1 ? 's' : ''}
          </Badge>
        )}
      </div>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            <CardTitle className="text-sm">Quality Control</CardTitle>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={scoreBadge.variant}>{scoreBadge.label}</Badge>
            <span className={cn("text-2xl font-bold", getScoreColor(qualityScore))}>
              {qualityScore}
            </span>
          </div>
        </div>
        <CardDescription className="text-xs">
          Automated quality checks based on design rules
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        {/* Ceiling Fan Detection Status */}
        {ceilingFanDetected && (
          <div className="flex items-center gap-2 p-2 bg-amber-500/10 rounded-lg border border-amber-500/20">
            <AlertTriangle className="h-4 w-4 text-amber-600" />
            <span className="text-xs text-amber-700">
              Ceiling fan detected - lighting restrictions active
            </span>
          </div>
        )}

        {/* All Checks Passed */}
        {activeViolations.length === 0 && (
          <div className="flex items-center gap-2 p-3 bg-green-500/10 rounded-lg border border-green-500/20">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <div>
              <p className="text-sm font-medium text-green-700">All Quality Checks Passed</p>
              <p className="text-xs text-green-600">No violations detected</p>
            </div>
          </div>
        )}

        {/* Violations List */}
        {activeViolations.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-medium text-muted-foreground">
              Active Violations ({activeViolations.length})
            </p>
            
            {activeViolations.map((violation) => {
              const config = SEVERITY_CONFIG[violation.severity];
              const Icon = config.icon;
              const rule = getRuleByCode(violation.rule_code);
              const isExpanded = expandedViolation === violation.id;
              
              return (
                <Collapsible 
                  key={violation.id}
                  open={isExpanded}
                  onOpenChange={() => setExpandedViolation(isExpanded ? null : violation.id)}
                >
                  <div className="border rounded-lg overflow-hidden">
                    <CollapsibleTrigger asChild>
                      <div className="flex items-center justify-between p-3 cursor-pointer hover:bg-muted/50">
                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          <Icon className={cn("h-4 w-4 shrink-0", 
                            violation.severity === 'critical' ? 'text-destructive' :
                            violation.severity === 'high' ? 'text-orange-500' :
                            'text-amber-500'
                          )} />
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-medium truncate">
                                {rule?.rule_name || violation.rule_code}
                              </span>
                              <Badge className={cn("text-[10px] px-1.5 py-0", config.color)}>
                                {violation.severity}
                              </Badge>
                            </div>
                            <p className="text-[10px] text-muted-foreground truncate">
                              {violation.violation_description}
                            </p>
                          </div>
                        </div>
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                    </CollapsibleTrigger>
                    
                    <CollapsibleContent>
                      <div className="px-3 pb-3 space-y-3 border-t bg-muted/30">
                        <div className="pt-3">
                          <p className="text-xs text-muted-foreground mb-2">
                            {rule?.rule_description}
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            Detected at: {violation.detected_at_stage} stage
                          </p>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex flex-col gap-2">
                          {rule?.auto_fix_available && onAutoFix && (
                            <Button 
                              size="sm" 
                              onClick={() => handleAutoFix(violation)}
                              disabled={markAutoFixed.isPending}
                              className="w-full"
                            >
                              <Wand2 className="h-3 w-3 mr-1" />
                              Auto-Fix (Regenerate)
                            </Button>
                          )}
                          
                          <div className="space-y-2">
                            <Textarea
                              placeholder="Override reason (optional)..."
                              value={overrideNotes[violation.id] || ''}
                              onChange={(e) => setOverrideNotes(prev => ({
                                ...prev,
                                [violation.id]: e.target.value
                              }))}
                              className="text-xs h-16"
                            />
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleOverride(violation.id)}
                              disabled={overrideViolation.isPending}
                              className="w-full"
                            >
                              <MessageSquare className="h-3 w-3 mr-1" />
                              Override & Accept
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </div>
                </Collapsible>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Compact badge component for room cards
export function QualityScoreBadge({ score, violations }: { score: number; violations?: number }) {
  const badge = getScoreBadge(score);
  
  return (
    <div className="flex items-center gap-1">
      <Badge className={cn("text-[10px] px-1.5", badge.variant)}>
        QC {score}
      </Badge>
      {(violations ?? 0) > 0 && (
        <Badge variant="destructive" className="text-[10px] px-1.5">
          {violations}
        </Badge>
      )}
    </div>
  );
}
