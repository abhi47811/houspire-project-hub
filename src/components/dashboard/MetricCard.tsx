import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PremiumSkeleton } from '@/components/ui/premium';
import { cn } from '@/lib/utils';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  iconColor?: string;
  iconBgColor?: string;
  gradient?: string;
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
  success: 'badge-premium bg-green-100 text-green-700',
  warning: 'badge-premium bg-yellow-100 text-yellow-700',
  danger: 'badge-premium bg-red-100 text-red-700',
  info: 'badge-premium bg-blue-100 text-blue-700',
};

const gradientVariants = {
  blue: 'from-blue-500 to-cyan-500',
  purple: 'from-purple-500 to-pink-500',
  orange: 'from-orange-500 to-red-500',
  green: 'from-green-500 to-emerald-500',
  primary: 'from-primary to-primary/60',
};

export function MetricCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor = 'text-primary',
  iconBgColor,
  gradient = 'primary',
  trend,
  badge,
  isLoading,
  className,
  animationDelay = 0,
}: MetricCardProps) {
  if (isLoading) {
    return <MetricCardSkeleton />;
  }

  const gradientClass = gradientVariants[gradient as keyof typeof gradientVariants] || gradientVariants.primary;

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-2xl',
        'bg-white hover:shadow-premium-2xl',
        'border border-gray-200/50',
        'hover:scale-[1.03] hover:-translate-y-2',
        'transition-all duration-500 cursor-pointer',
        'opacity-0 animate-fade-in-up',
        className
      )}
      style={{ animationDelay: `${animationDelay}ms` }}
    >
      {/* Gradient background */}
      <div className={cn(
        'absolute inset-0 bg-gradient-to-br opacity-5',
        'group-hover:opacity-10 transition-opacity duration-500',
        gradientClass
      )} />
      
      <div className="p-6 relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className={cn(
            'p-3 rounded-xl bg-gradient-to-br',
            'group-hover:scale-110 transition-transform duration-300',
            'shadow-premium-sm',
            gradientClass
          )}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          
          {badge && (
            <span className={cn(
              badgeVariants[badge.variant]
            )}>
              {badge.text}
            </span>
          )}
        </div>
        
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900 group-hover:scale-105 transition-transform duration-300">
            {value}
          </p>
        </div>

        {subtitle && (
          <p className="mt-2 text-sm text-gray-500">{subtitle}</p>
        )}
        
        {trend && (
          <div className={cn(
            'mt-3 flex items-center gap-1.5 text-sm font-medium',
            trend.isPositive ? 'text-green-600' : 'text-red-600'
          )}>
            {trend.isPositive ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            <span>{Math.abs(trend.value)}% from last month</span>
          </div>
        )}
      </div>
      
      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
    </div>
  );
}

export function MetricCardSkeleton() {
  return (
    <div className="rounded-2xl bg-white border border-gray-200/50 p-6 space-y-4">
      <div className="flex items-start justify-between">
        <PremiumSkeleton variant="circular" className="h-12 w-12" />
        <PremiumSkeleton variant="text" className="h-6 w-16" />
      </div>
      <div className="space-y-2">
        <PremiumSkeleton variant="text" className="h-4 w-24" />
        <PremiumSkeleton variant="text" className="h-8 w-20" />
      </div>
    </div>
  );
}