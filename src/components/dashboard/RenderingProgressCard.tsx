import React from 'react';
import { Clock } from 'lucide-react';
import { MetricCard } from './MetricCard';
import { useRenderingProgress } from '@/hooks/useDashboardData';

export function RenderingProgressCard() {
  const { data: renderingCount, isLoading } = useRenderingProgress();

  return (
    <MetricCard
      title="In Progress (Rendering)"
      value={renderingCount ?? 0}
      subtitle="Phase 5 - Generation"
      icon={Clock}
      gradient="purple"
      isLoading={isLoading}
    />
  );
}
