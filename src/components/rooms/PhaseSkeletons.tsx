import { Skeleton } from '@/components/ui/skeleton';

// Skeleton for PhaseClean
export function PhaseCleanSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-64 mt-1" />
        </div>
        <Skeleton className="h-8 w-8 rounded" />
      </div>

      {/* Image Comparison Slider */}
      <div className="space-y-3">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="aspect-video w-full rounded-lg" />
        <Skeleton className="h-2 w-full rounded-full" />
      </div>

      {/* Cleaning Status */}
      <div className="space-y-3">
        <Skeleton className="h-4 w-28" />
        <div className="grid grid-cols-3 gap-3">
          <Skeleton className="h-20 rounded-lg" />
          <Skeleton className="h-20 rounded-lg" />
          <Skeleton className="h-20 rounded-lg" />
        </div>
      </div>

      {/* Validation Checklist */}
      <div className="space-y-3">
        <Skeleton className="h-4 w-36" />
        <div className="space-y-2">
          <Skeleton className="h-12 w-full rounded-lg" />
          <Skeleton className="h-12 w-full rounded-lg" />
          <Skeleton className="h-12 w-full rounded-lg" />
          <Skeleton className="h-12 w-full rounded-lg" />
        </div>
      </div>

      {/* Actions */}
      <div className="pt-4 border-t space-y-2">
        <Skeleton className="h-10 w-full rounded" />
        <div className="grid grid-cols-2 gap-2">
          <Skeleton className="h-10 rounded" />
          <Skeleton className="h-10 rounded" />
        </div>
      </div>
    </div>
  );
}

// Skeleton for PhaseGenerate
export function PhaseGenerateSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-4 w-56 mt-1" />
      </div>

      {/* Render Display */}
      <div className="space-y-3">
        <Skeleton className="aspect-video w-full rounded-lg" />
      </div>

      {/* Generation Status */}
      <div className="space-y-3">
        <div className="grid grid-cols-3 gap-3">
          <Skeleton className="h-20 rounded-lg" />
          <Skeleton className="h-20 rounded-lg" />
          <Skeleton className="h-20 rounded-lg" />
        </div>
      </div>

      {/* Quality Metrics */}
      <div className="space-y-3">
        <Skeleton className="h-4 w-32" />
        <div className="space-y-2">
          <Skeleton className="h-8 w-full rounded" />
          <Skeleton className="h-8 w-full rounded" />
          <Skeleton className="h-8 w-full rounded" />
        </div>
      </div>

      {/* Actions */}
      <div className="pt-4 border-t flex gap-2">
        <Skeleton className="h-10 flex-1 rounded" />
        <Skeleton className="h-10 w-10 rounded" />
        <Skeleton className="h-10 w-10 rounded" />
      </div>
    </div>
  );
}

// Skeleton for PhaseCustomize
export function PhaseCustomizeSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-4 w-36 mt-1" />
      </div>

      {/* Path Selection Cards */}
      <Skeleton className="h-8 w-48 mx-auto" />
      <div className="grid grid-cols-1 gap-4">
        <Skeleton className="h-40 w-full rounded-lg" />
        <Skeleton className="h-32 w-full rounded-lg" />
        <Skeleton className="h-32 w-full rounded-lg" />
        <Skeleton className="h-28 w-full rounded-lg" />
      </div>

      {/* Tip Box */}
      <Skeleton className="h-24 w-full rounded-lg" />
    </div>
  );
}

// Skeleton for PhaseAnalyze
export function PhaseAnalyzeSkeleton() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Skeleton className="h-6 w-36" />
        <Skeleton className="h-4 w-48 mt-1" />
      </div>

      {/* Detected Features */}
      <div className="space-y-3">
        <Skeleton className="h-5 w-40" />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          <Skeleton className="h-16 rounded-lg" />
          <Skeleton className="h-16 rounded-lg" />
          <Skeleton className="h-16 rounded-lg" />
          <Skeleton className="h-16 rounded-lg" />
          <Skeleton className="h-16 rounded-lg" />
          <Skeleton className="h-16 rounded-lg" />
        </div>
      </div>

      {/* Measurements */}
      <div className="space-y-3">
        <Skeleton className="h-5 w-32" />
        <div className="grid grid-cols-3 gap-3">
          <Skeleton className="h-20 rounded-lg" />
          <Skeleton className="h-20 rounded-lg" />
          <Skeleton className="h-20 rounded-lg" />
        </div>
      </div>

      {/* Style Suggestions */}
      <div className="space-y-3">
        <Skeleton className="h-5 w-36" />
        <div className="space-y-2">
          <Skeleton className="h-14 w-full rounded-lg" />
          <Skeleton className="h-14 w-full rounded-lg" />
          <Skeleton className="h-14 w-full rounded-lg" />
        </div>
      </div>

      {/* Actions */}
      <div className="pt-4 border-t flex gap-2">
        <Skeleton className="h-10 flex-1 rounded" />
        <Skeleton className="h-10 w-32 rounded" />
      </div>
    </div>
  );
}
