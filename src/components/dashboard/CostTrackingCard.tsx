import React from 'react';
import { IndianRupee } from 'lucide-react';
import { MetricCard } from './MetricCard';
import { useCostTracking } from '@/hooks/useDashboardData';

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function CostTrackingCard() {
  const { data, isLoading } = useCostTracking();

  const todaysCost = data?.todaysCost ?? 0;
  const monthsCost = data?.monthsCost ?? 0;
  const avgCost = data?.avgCostPerProject ?? 0;

  // Determine status badge
  const getBadge = () => {
    if (avgCost < 100) return { text: 'Excellent', variant: 'success' as const };
    if (avgCost <= 400) return { text: 'Good', variant: 'warning' as const };
    return { text: 'Over Budget', variant: 'danger' as const };
  };

  return (
    <MetricCard
      title="AI Spend Today"
      value={formatCurrency(todaysCost)}
      subtitle={`This month: ${formatCurrency(monthsCost)} • Avg/project: ${formatCurrency(avgCost)}`}
      icon={IndianRupee}
      iconColor="text-success"
      iconBgColor="bg-success/10"
      badge={getBadge()}
      isLoading={isLoading}
    />
  );
}
