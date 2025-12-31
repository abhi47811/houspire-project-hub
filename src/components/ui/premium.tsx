/**
 * Premium UI Components
 * Reusable components with million-dollar aesthetics
 */

import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

// ============================================================================
// PREMIUM STAT CARD
// ============================================================================

interface PremiumStatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  gradient: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  onClick?: () => void;
}

export function PremiumStatCard({
  title,
  value,
  icon: Icon,
  gradient,
  change,
  changeType = 'positive',
  onClick,
}: PremiumStatCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl",
        "bg-white hover:shadow-premium-2xl",
        "border border-gray-200/50",
        "hover:scale-[1.03] hover:-translate-y-2",
        "transition-all duration-500 cursor-pointer",
        "before:absolute before:inset-0",
        "before:bg-gradient-to-br before:opacity-5",
        "before:transition-opacity before:duration-500",
        "hover:before:opacity-10",
        gradient && `before:${gradient}`
      )}
      onClick={onClick}
    >
      {/* Gradient background */}
      <div className={cn(
        "absolute inset-0 bg-gradient-to-br opacity-5",
        "group-hover:opacity-10 transition-opacity duration-500",
        gradient
      )} />
      
      <div className="p-6 relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className={cn(
            "p-3 rounded-xl bg-gradient-to-br",
            "group-hover:scale-110 transition-transform duration-300",
            gradient
          )}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          
          {change && (
            <div className={cn(
              "badge-premium px-3 py-1 rounded-full text-xs font-medium",
              changeType === 'positive' && "bg-green-100 text-green-700",
              changeType === 'negative' && "bg-red-100 text-red-700",
              changeType === 'neutral' && "bg-gray-100 text-gray-700"
            )}>
              {change}
            </div>
          )}
        </div>
        
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900 group-hover:scale-105 transition-transform duration-300">
            {value}
          </p>
        </div>
      </div>
      
      {/* Shine effect */}
      <div className="shine-effect absolute inset-0" />
    </div>
  );
}

// ============================================================================
// PREMIUM BUTTON
// ============================================================================

interface PremiumButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
  children: React.ReactNode;
}

export function PremiumButton({
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  isLoading = false,
  children,
  className,
  ...props
}: PremiumButtonProps) {
  const baseStyles = "btn-premium inline-flex items-center justify-center gap-2 font-medium rounded-lg focus-ring disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-primary text-white hover:glow-primary",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
    outline: "border-2 border-gray-300 text-gray-700 hover:border-gray-400 hover:bg-gray-50",
    ghost: "text-gray-700 hover:bg-gray-100",
  };
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };
  
  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={isLoading}
      {...props}
    >
      {Icon && iconPosition === 'left' && (
        <Icon className={cn(
          "transition-transform duration-300",
          isLoading ? "animate-spin" : "group-hover:scale-110"
        )} size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20} />
      )}
      
      <span className="relative z-10">{children}</span>
      
      {Icon && iconPosition === 'right' && (
        <Icon className={cn(
          "transition-transform duration-300",
          isLoading ? "animate-spin" : "group-hover:translate-x-1"
        )} size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20} />
      )}
    </button>
  );
}

// ============================================================================
// PREMIUM CARD
// ============================================================================

interface PremiumCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'gradient';
  hoverable?: boolean;
  onClick?: () => void;
}

export function PremiumCard({
  children,
  className,
  variant = 'default',
  hoverable = true,
  onClick,
}: PremiumCardProps) {
  const baseStyles = "rounded-2xl p-6 transition-all duration-500";
  
  const variants = {
    default: "bg-white border border-gray-200/50 shadow-premium-md hover:shadow-premium-xl",
    glass: "glass-subtle border-white/20 shadow-premium-lg",
    gradient: "bg-gradient-card border border-white/30 shadow-premium-md",
  };
  
  const hoverStyles = hoverable ? "hover:scale-[1.02] hover:-translate-y-1 cursor-pointer" : "";
  
  return (
    <div
      className={cn(baseStyles, variants[variant], hoverStyles, className)}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

// ============================================================================
// PREMIUM BADGE
// ============================================================================

interface PremiumBadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function PremiumBadge({
  children,
  variant = 'default',
  size = 'md',
  className,
}: PremiumBadgeProps) {
  const baseStyles = "badge-premium inline-flex items-center gap-1 rounded-full font-medium";
  
  const variants = {
    default: "bg-gray-100 text-gray-700",
    success: "bg-green-100 text-green-700",
    warning: "bg-yellow-100 text-yellow-700",
    error: "bg-red-100 text-red-700",
    info: "bg-blue-100 text-blue-700",
  };
  
  const sizes = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-base",
  };
  
  return (
    <span className={cn(baseStyles, variants[variant], sizes[size], className)}>
      {children}
    </span>
  );
}

// ============================================================================
// PREMIUM SKELETON
// ============================================================================

interface PremiumSkeletonProps {
  className?: string;
  variant?: 'text' | 'rectangular' | 'circular';
}

export function PremiumSkeleton({ className, variant = 'rectangular' }: PremiumSkeletonProps) {
  const baseStyles = "loading-shimmer";
  
  const variants = {
    text: "h-4 w-full rounded",
    rectangular: "h-32 w-full rounded-xl",
    circular: "h-12 w-12 rounded-full",
  };
  
  return <div className={cn(baseStyles, variants[variant], className)} />;
}

// ============================================================================
// PREMIUM EMPTY STATE
// ============================================================================

interface PremiumEmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
    icon?: LucideIcon;
  };
}

export function PremiumEmptyState({ icon: Icon, title, description, action }: PremiumEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center animate-fade-in-up">
      <div className="relative mb-6">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-mocha/20 rounded-full blur-2xl scale-150" />
        
        {/* Icon container */}
        <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-primary/10 to-mocha/10 flex items-center justify-center animate-bounce-in">
          <Icon className="w-16 h-16 text-primary" />
        </div>
      </div>
      
      <h3 className="text-2xl font-semibold text-gray-900 mb-2">
        {title}
      </h3>
      <p className="text-gray-600 mb-6 max-w-md">
        {description}
      </p>
      
      {action && (
        <PremiumButton
          variant="primary"
          size="md"
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
// FLOATING ACTION BUTTON
// ============================================================================

interface FloatingActionButtonProps {
  icon: LucideIcon;
  onClick: () => void;
  label?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}

export function FloatingActionButton({
  icon: Icon,
  onClick,
  label,
  position = 'bottom-right',
}: FloatingActionButtonProps) {
  const positions = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6',
  };
  
  return (
    <button
      onClick={onClick}
      className={cn(
        "fixed z-50 group",
        "w-14 h-14 rounded-full",
        "bg-gradient-primary text-white",
        "shadow-premium-xl hover:shadow-glow-primary",
        "hover:scale-110 active:scale-95",
        "transition-all duration-300",
        "flex items-center justify-center",
        positions[position]
      )}
      aria-label={label}
    >
      <Icon className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
      
      {label && (
        <span className="absolute right-full mr-3 px-3 py-1.5 rounded-lg bg-gray-900 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
          {label}
        </span>
      )}
    </button>
  );
}
