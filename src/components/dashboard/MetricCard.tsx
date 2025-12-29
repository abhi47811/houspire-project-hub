import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  iconColor?: string;
  iconBgColor?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  badge?: {
    text: string;
    variant: 'success' | 'warning' | 'danger' | 'info';
  };
  isLoading?: boolean;
  className?: string;
  animationDelay?: number;
}

const badgeVariants = {
  success: 'bg-success/10 text-success',
  warning: 'bg-warning/10 text-warning',
  danger: 'bg-destructive/10 text-destructive',
  info: 'bg-primary/10 text-primary',
};

export function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor = 'text-primary',
  iconBgColor,
  trend,
  badge,
  isLoading,
  className,
  animationDelay = 0,
}: MetricCardProps) {
  if (isLoading) {
    return <MetricCardSkeleton />;
  }

  const delayClass = animationDelay > 0 ? `delay-${animationDelay}` : '';

  return (
    <Card 
      className={cn(
        'opacity-0 animate-fade-in-up',
        delayClass,
        className
      )}
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-sm font-medium text-muted-foreground tracking-wide">
          {title}
        </CardTitle>
        <div 
          className={cn(
            'rounded-xl p-2.5 transition-transform duration-200 group-hover:scale-105',
            'bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5'
          )}
        >
          <Icon className={cn('h-5 w-5', iconColor)} />
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-baseline justify-between gap-2">
          <div className="metric-number text-foreground">{value}</div>
          {badge && (
            <span className={cn(
              'rounded-full px-2.5 py-1 text-xs font-semibold',
              badgeVariants[badge.variant]
            )}>
              {badge.text}
            </span>
          )}
        </div>
        {subtitle && (
          <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
        )}
        {trend && (
          <div className={cn(
            'mt-3 flex items-center gap-1.5 text-sm font-medium',
            trend.isPositive ? 'text-success' : 'text-destructive'
          )}>
            {trend.isPositive ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            <span>{Math.abs(trend.value)}% from last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function MetricCardSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-10 w-10 rounded-xl" />
      </CardHeader>
      <CardContent className="pt-0">
        <Skeleton className="h-9 w-20" />
        <Skeleton className="mt-3 h-4 w-36" />
      </CardContent>
    </Card>
  );
}