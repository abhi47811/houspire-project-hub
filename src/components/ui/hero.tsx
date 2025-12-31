/**
 * Premium Hero Section Component
 * Stunning hero sections with animations and glassmorphism
 */

import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PremiumButton, PremiumBadge } from './premium';

// ============================================================================
// HERO SECTION
// ============================================================================

interface HeroSectionProps {
  badge?: {
    icon?: LucideIcon;
    text: string;
  };
  title: string;
  subtitle: string;
  gradient?: boolean;
  actions?: Array<{
    label: string;
    icon?: LucideIcon;
    onClick: () => void;
    variant?: 'primary' | 'secondary' | 'outline';
  }>;
  stats?: Array<{
    icon: LucideIcon;
    label: string;
    value: string;
  }>;
}

export function HeroSection({
  badge,
  title,
  subtitle,
  gradient = true,
  actions,
  stats,
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden py-12 px-6">
      {/* Animated gradient mesh background */}
      <div className="absolute inset-0 bg-mesh-gradient opacity-50 animate-gradient-shift" />
      
      {/* Floating gradient orbs */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-mocha/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
        {/* Badge */}
        {badge && (
          <div className="inline-flex items-center gap-2 animate-bounce-in">
            <PremiumBadge size="lg" className="glass-subtle shadow-premium-lg">
              {badge.icon && <badge.icon className="w-4 h-4" />}
              {badge.text}
            </PremiumBadge>
          </div>
        )}
        
        {/* Title */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight animate-slide-up-fade">
          {gradient ? (
            <span className="text-gradient-animated bg-size-200">
              {title}
            </span>
          ) : (
            <span className="text-gray-900">{title}</span>
          )}
        </h1>
        
        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto animate-slide-up-fade delay-100">
          {subtitle}
        </p>
        
        {/* Actions */}
        {actions && actions.length > 0 && (
          <div className="flex flex-wrap gap-4 justify-center animate-slide-up-fade delay-200">
            {actions.map((action, index) => (
              <PremiumButton
                key={index}
                variant={action.variant || 'primary'}
                size="lg"
                icon={action.icon}
                iconPosition="left"
                onClick={action.onClick}
              >
                {action.label}
              </PremiumButton>
            ))}
          </div>
        )}
        
        {/* Stats */}
        {stats && stats.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-600 animate-slide-up-fade delay-300">
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center gap-2">
                <stat.icon className="w-5 h-5 text-primary" />
                <span className="font-semibold text-gray-900">{stat.value}</span>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// ============================================================================
// PAGE HEADER
// ============================================================================

interface PageHeaderProps {
  title: string;
  description?: string;
  gradient?: boolean;
  icon?: LucideIcon;
  badge?: {
    text: string;
    variant?: 'default' | 'success' | 'warning' | 'error';
  };
  actions?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  description,
  gradient = true,
  icon: Icon,
  badge,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <div className={cn('relative mb-8 animate-fade-in-up', className)}>
      {/* Decorative background */}
      <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-mocha/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
      
      <div className="relative flex items-start justify-between gap-4">
        <div className="flex-1 space-y-3">
          <div className="flex items-center gap-3 flex-wrap">
            {Icon && (
              <div className="p-3 rounded-xl bg-gradient-to-br from-primary to-primary/60 shadow-premium-md">
                <Icon className="w-6 h-6 text-white" />
              </div>
            )}
            
            <h1 className={cn(
              'text-3xl md:text-4xl font-bold tracking-tight',
              gradient ? 'text-gradient-primary' : 'text-gray-900'
            )}>
              {title}
            </h1>
            
            {badge && (
              <PremiumBadge variant={badge.variant}>
                {badge.text}
              </PremiumBadge>
            )}
          </div>
          
          {description && (
            <p className="text-lg text-gray-600 max-w-3xl">
              {description}
            </p>
          )}
        </div>
        
        {actions && (
          <div className="flex items-center gap-2">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// SECTION HEADER
// ============================================================================

interface SectionHeaderProps {
  title: string;
  description?: string;
  badge?: string;
  action?: {
    label: string;
    onClick: () => void;
    icon?: LucideIcon;
  };
}

export function SectionHeader({
  title,
  description,
  badge,
  action,
}: SectionHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4 mb-6">
      <div className="space-y-1">
        <div className="flex items-center gap-3">
          <h2 className="text-2xl font-semibold text-gray-900">
            {title}
          </h2>
          {badge && (
            <PremiumBadge size="sm">
              {badge}
            </PremiumBadge>
          )}
        </div>
        {description && (
          <p className="text-gray-600">
            {description}
          </p>
        )}
      </div>
      
      {action && (
        <PremiumButton
          size="sm"
          icon={action.icon}
          onClick={action.onClick}
        >
          {action.label}
        </PremiumButton>
      )}
    </div>
  );
}

// ============================================================================
// FEATURE SHOWCASE
// ============================================================================

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  gradient: string;
}

interface FeatureShowcaseProps {
  features: Feature[];
}

export function FeatureShowcase({ features }: FeatureShowcaseProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-12">
      {features.map((feature, index) => (
        <div
          key={index}
          className="group relative overflow-hidden rounded-2xl bg-white border border-gray-200/50 p-8 hover:shadow-premium-xl hover:-translate-y-1 transition-all duration-500"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          {/* Gradient background */}
          <div className={cn(
            'absolute inset-0 bg-gradient-to-br opacity-5 group-hover:opacity-10 transition-opacity duration-500',
            feature.gradient
          )} />
          
          {/* Content */}
          <div className="relative z-10 space-y-4">
            <div className={cn(
              'inline-flex p-4 rounded-xl bg-gradient-to-br shadow-premium-sm group-hover:scale-110 transition-transform duration-300',
              feature.gradient
            )}>
              <feature.icon className="w-8 h-8 text-white" />
            </div>
            
            <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary transition-colors duration-300">
              {feature.title}
            </h3>
            
            <p className="text-gray-600 leading-relaxed">
              {feature.description}
            </p>
          </div>
          
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
        </div>
      ))}
    </div>
  );
}

// ============================================================================
// STATS BAR
// ============================================================================

interface StatItem {
  label: string;
  value: string;
  icon?: LucideIcon;
  change?: string;
  changeType?: 'positive' | 'negative';
}

interface StatsBarProps {
  stats: StatItem[];
  className?: string;
}

export function StatsBar({ stats, className }: StatsBarProps) {
  return (
    <div className={cn(
      'glass-medium rounded-2xl p-6 shadow-premium-lg',
      className
    )}>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="text-center space-y-2">
            {stat.icon && (
              <div className="inline-flex p-2 rounded-lg bg-primary/10">
                <stat.icon className="w-5 h-5 text-primary" />
              </div>
            )}
            <div className="text-3xl font-bold text-gray-900">
              {stat.value}
            </div>
            <div className="text-sm text-gray-600">
              {stat.label}
            </div>
            {stat.change && (
              <div className={cn(
                'text-xs font-medium',
                stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              )}>
                {stat.change}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
