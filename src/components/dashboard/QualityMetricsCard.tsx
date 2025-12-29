import React from 'react';
import { Star } from 'lucide-react';
import { MetricCard } from './MetricCard';
import { useQualityMetrics } from '@/hooks/useDashboardData';

export function QualityMetricsCard() {
  const { data, isLoading } = useQualityMetrics();

  const avgScore = data?.avgScore ?? 0;
  const passed = data?.passed ?? 0;
  const total = data?.total ?? 0;

  // Determine status badge
  const getBadge = () => {
    if (avgScore >= 90) return { text: 'Excellent', variant: 'success' as const };
    if (avgScore >= 85) return { text: 'Good', variant: 'warning' as const };
    return { text: 'Below Target', variant: 'danger' as const };
  };

  return (
    <MetricCard
      title="Avg Quality Score"
      value={`${Math.round(avgScore)}%`}
      subtitle={`${passed}/${total} passed (85%+ threshold)`}
      icon={Star}
      iconColor="text-yellow-500"
      iconBgColor="bg-yellow-500/10"
      badge={total > 0 ? getBadge() : undefined}
      isLoading={isLoading}
    />
  );
}
