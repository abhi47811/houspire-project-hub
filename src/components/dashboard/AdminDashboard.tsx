import React, { forwardRef } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';
import { useDeadlineTracking } from '@/hooks/useDashboardData';

// Core Metric Cards
import { ActiveProjectsCard } from './ActiveProjectsCard';
import { RenderingProgressCard } from './RenderingProgressCard';
import { CostTrackingCard } from './CostTrackingCard';
import { QualityMetricsCard } from './QualityMetricsCard';

// Status & Compliance Cards
import { DeadlineTrackerCard } from './DeadlineTrackerCard';
import { PreservationComplianceCard } from './PreservationComplianceCard';

// Analytics Cards
import { PipelineVisualizationCard } from './PipelineVisualizationCard';
import { CityBreakdownCard } from './CityBreakdownCard';
import { PopularCombinationsCard } from './PopularCombinationsCard';

// Activity & Team Cards
import { RecentProjectsCard } from './RecentProjectsCard';
import { TeamActivityFeed } from './TeamActivityFeed';
import { TeamPerformanceCard } from './TeamPerformanceCard';
import { QuickActionsPanel } from './QuickActionsPanel';

export const AdminDashboard = forwardRef<HTMLDivElement, Record<string, never>>(function AdminDashboard(_props, ref) {
  const { profile, user } = useAuth();
  const { data: deadlines } = useDeadlineTracking();
  
  const userName = profile?.full_name || user?.email?.split('@')[0] || 'Admin';
  const hasOverdue = (deadlines?.overdue || 0) > 0;

  return (
    <div ref={ref} className="space-y-6 pb-20">
      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Welcome back, {userName}!</h1>
        <p className="text-muted-foreground">Here's an overview of all projects and team activity.</p>
      </div>

      {/* Critical Alerts */}
      {hasOverdue && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            {deadlines?.overdue} project{deadlines?.overdue !== 1 ? 's are' : ' is'} overdue! Immediate attention required.
          </AlertDescription>
        </Alert>
      )}

      {/* Row 1: Core KPIs (4 cards) */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <ActiveProjectsCard />
        <RenderingProgressCard />
        <CostTrackingCard />
        <QualityMetricsCard />
      </div>

      {/* Row 2: Status & Compliance (2 wide cards) */}
      <div className="grid gap-4 lg:grid-cols-2">
        <DeadlineTrackerCard />
        <PreservationComplianceCard />
      </div>

      {/* Row 3: Pipeline Visualization (full width) */}
      <PipelineVisualizationCard />

      {/* Row 4: Analytics Charts (3 cards) */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <CityBreakdownCard />
        <PopularCombinationsCard />
        <TeamPerformanceCard />
      </div>

      {/* Row 5: Activity (2 wide cards) */}
      <div className="grid gap-6 lg:grid-cols-2">
        <RecentProjectsCard />
        <TeamActivityFeed />
      </div>

      {/* Quick Actions FAB */}
      <QuickActionsPanel />
    </div>
  );
});

export default AdminDashboard;
