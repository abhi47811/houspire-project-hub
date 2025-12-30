import * as React from "react";
import { cn } from "@/lib/utils";

interface BadgeIndicatorProps {
  count: number;
  max?: number;
  className?: string;
  showZero?: boolean;
  pulse?: boolean;
}

/**
 * iPhone-style notification badge indicator
 * Shows count as number, or "9+" if exceeds max
 */
export function BadgeIndicator({
  count,
  max = 9,
  className,
  showZero = false,
  pulse = false,
}: BadgeIndicatorProps) {
  if (count <= 0 && !showZero) return null;

  const displayCount = count > max ? `${max}+` : count.toString();

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center rounded-full bg-destructive text-destructive-foreground text-xs font-bold min-w-[18px] h-[18px] px-1",
        pulse && "animate-pulse",
        className
      )}
      aria-label={`${count} items need attention`}
    >
      {displayCount}
    </span>
  );
}

/**
 * Simple dot indicator for attention (no count)
 */
export function AttentionDot({
  className,
  pulse = true,
}: {
  className?: string;
  pulse?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-block w-2.5 h-2.5 rounded-full bg-destructive",
        pulse && "animate-pulse",
        className
      )}
      aria-label="Needs attention"
    />
  );
}
