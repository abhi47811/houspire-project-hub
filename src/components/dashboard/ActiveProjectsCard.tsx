import React from 'react';
import { FolderOpen } from 'lucide-react';
import { MetricCard } from './MetricCard';
import { useActiveProjects } from '@/hooks/useDashboardData';

export function ActiveProjectsCard() {
  const { data: activeCount, isLoading } = useActiveProjects();

  return (
    <MetricCard
      title="Active Projects"
      value={activeCount ?? 0}
      icon={FolderOpen}
      gradient="blue"
      isLoading={isLoading}
    />
  );
}
