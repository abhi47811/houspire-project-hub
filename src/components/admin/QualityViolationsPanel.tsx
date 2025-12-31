import { useEffect, useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/integrations/supabase/client';
import { AlertTriangle, CheckCircle, XCircle, RefreshCw, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Violation {
  id: string;
  room_id: string;
  render_id: string | null;
  rule_code: string;
  severity: string;
  violation_description: string;
  detected_at_stage: string;
  auto_fixed: boolean;
  fix_description: string | null;
  resolved_at: string | null;
  reviewer_notes: string | null;
  created_at: string;
  rooms?: {
    room_type: string | null;
    selected_style: string | null;
  } | null;
}

interface ViolationStats {
  total: number;
  unresolved: number;
  bySeverity: Record<string, number>;
  byType: Record<string, number>;
}

export function QualityViolationsPanel() {
  const [violations, setViolations] = useState<Violation[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<ViolationStats | null>(null);
  const [resolvingId, setResolvingId] = useState<string | null>(null);
  const [resolveNotes, setResolveNotes] = useState<Record<string, string>>({});
  const { toast } = useToast();

  useEffect(() => {
    loadViolations();
  }, []);

  const loadViolations = useCallback(async () => {
    setLoading(true);
    try {
      // Load unresolved violations
      const { data, error } = await supabase
        .from('quality_violations')
        .select('*, rooms(room_type, selected_style)')
        .is('resolved_at', null)
        .order('created_at', { ascending: false })
        .limit(50);
      
      if (error) throw error;
      
      setViolations(data || []);
      
      // Calculate stats
      const total = data?.length || 0;
      const bySeverity = data?.reduce((acc: Record<string, number>, v) => {
        acc[v.severity] = (acc[v.severity] || 0) + 1;
        return acc;
      }, {}) || {};
      
      const byType = data?.reduce((acc: Record<string, number>, v) => {
        acc[v.rule_code] = (acc[v.rule_code] || 0) + 1;
        return acc;
      }, {}) || {};
      
      setStats({ total, unresolved: total, bySeverity, byType });
      
    } catch (error) {
      console.error('Failed to load violations:', error);
      toast({
        title: 'Error',
        description: 'Failed to load quality violations',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    loadViolations();
  }, [loadViolations]);

  const resolveViolation = async (violationId: string) => {
    setResolvingId(violationId);
    try {
      const { error } = await supabase
        .from('quality_violations')
        .update({ 
          resolved_at: new Date().toISOString(),
          reviewer_notes: resolveNotes[violationId] || null
        })
        .eq('id', violationId);
      
      if (error) throw error;
      
      toast({
        title: 'Resolved',
        description: 'Violation marked as resolved'
      });
      
      await loadViolations();
    } catch (error) {
      console.error('Failed to resolve violation:', error);
      toast({
        title: 'Error',
        description: 'Failed to resolve violation',
        variant: 'destructive'
      });
    } finally {
      setResolvingId(null);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'destructive';
      case 'high': return 'default';
      case 'medium': return 'secondary';
      case 'low': return 'outline';
      default: return 'default';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <XCircle className="h-4 w-4 text-destructive" />;
      case 'high':
        return <AlertTriangle className="h-4 w-4 text-orange-500" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
    }
  };

  const formatRuleCode = (code: string) => {
    return code.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-sm text-muted-foreground">Total Violations</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-destructive">
                {stats.bySeverity?.critical || 0}
              </div>
              <p className="text-sm text-muted-foreground">Critical</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-orange-500">
                {stats.bySeverity?.high || 0}
              </div>
              <p className="text-sm text-muted-foreground">High</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="text-2xl font-bold text-yellow-500">
                {stats.bySeverity?.medium || 0}
              </div>
              <p className="text-sm text-muted-foreground">Medium</p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Violation Type Breakdown */}
      {stats && Object.keys(stats.byType).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Violations by Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {Object.entries(stats.byType).map(([type, count]) => (
                <Badge key={type} variant="outline" className="text-xs">
                  {formatRuleCode(type)}: {count}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
      {/* Violations List */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Unresolved Quality Violations</CardTitle>
          <Button variant="outline" size="sm" onClick={loadViolations} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : violations.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <CheckCircle className="h-12 w-12 text-green-500 mb-4" />
              <p className="text-lg font-medium">No unresolved violations!</p>
              <p className="text-sm text-muted-foreground">All quality issues have been addressed.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {violations.map(violation => (
                <div 
                  key={violation.id} 
                  className="border rounded-lg p-4 space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      {getSeverityIcon(violation.severity)}
                      <span className="font-medium">
                        {formatRuleCode(violation.rule_code)}
                      </span>
                      <Badge variant={getSeverityColor(violation.severity) as "default" | "destructive" | "outline" | "secondary"}>
                        {violation.severity}
                      </Badge>
                      {violation.auto_fixed && (
                        <Badge variant="outline" className="text-xs">
                          Auto-fixable
                        </Badge>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {new Date(violation.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    {violation.violation_description}
                  </p>
                  
                  {violation.fix_description && (
                    <p className="text-sm text-blue-600 dark:text-blue-400">
                      💡 Fix: {violation.fix_description}
                    </p>
                  )}
                  
                  <div className="text-xs text-muted-foreground">
                    Room: {violation.rooms?.room_type || 'Unknown'} | 
                    Style: {violation.rooms?.selected_style || 'Not set'} |
                    Stage: {violation.detected_at_stage}
                  </div>

                  {/* Resolution Section */}
                  <div className="pt-2 border-t space-y-2">
                    <Textarea
                      placeholder="Resolution notes (optional)"
                      value={resolveNotes[violation.id] || ''}
                      onChange={(e) => setResolveNotes(prev => ({
                        ...prev,
                        [violation.id]: e.target.value
                      }))}
                      className="text-sm h-16"
                    />
                    <Button 
                      size="sm"
                      onClick={() => resolveViolation(violation.id)}
                      disabled={resolvingId === violation.id}
                    >
                      {resolvingId === violation.id ? (
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      ) : (
                        <CheckCircle className="h-4 w-4 mr-2" />
                      )}
                      Mark Resolved
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
