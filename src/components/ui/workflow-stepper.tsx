import { cn } from "@/lib/utils";
import { CheckCircle, Upload, Search, Sparkles, Palette, Image, IndianRupee } from "lucide-react";

export interface WorkflowStep {
  id: number;
  name: string;
  shortName?: string;
  description?: string;
  icon?: React.ElementType;
}

const DEFAULT_STEPS: WorkflowStep[] = [
  { id: 1, name: "Setup", shortName: "Setup", description: "Project & room configuration", icon: Upload },
  { id: 2, name: "Upload & Analyze", shortName: "Analyze", description: "Upload images & AI analysis", icon: Search },
  { id: 3, name: "Clean", shortName: "Clean", description: "Remove furniture & artifacts", icon: Sparkles },
  { id: 4, name: "Customize", shortName: "Style", description: "Select style & customize", icon: Palette },
  { id: 5, name: "Generate & Quality", shortName: "Render", description: "AI rendering & quality check", icon: Image },
  { id: 6, name: "Budget & Vendors", shortName: "Budget", description: "Itemization & vendor matching", icon: IndianRupee },
];

interface WorkflowStepperProps {
  currentStep: number;
  completedSteps?: number[];
  steps?: WorkflowStep[];
  onStepClick?: (step: number) => void;
  className?: string;
  variant?: "horizontal" | "vertical";
  showLabels?: boolean;
  compact?: boolean;
}

export function WorkflowStepper({
  currentStep,
  completedSteps = [],
  steps = DEFAULT_STEPS,
  onStepClick,
  className,
  variant = "horizontal",
  showLabels = true,
  compact = false,
}: WorkflowStepperProps) {
  const isCompleted = (stepId: number) => completedSteps.includes(stepId);
  const isCurrent = (stepId: number) => stepId === currentStep;
  const isClickable = (stepId: number) => !!onStepClick && (isCompleted(stepId) || stepId <= currentStep);

  if (variant === "vertical") {
    return (
      <div className={cn("flex flex-col gap-4", className)}>
        {steps.map((step, index) => {
          const Icon = step.icon || Upload;
          const completed = isCompleted(step.id);
          const current = isCurrent(step.id);
          const clickable = isClickable(step.id);

          return (
            <div
              key={step.id}
              className={cn(
                "flex items-start gap-3",
                clickable && "cursor-pointer",
              )}
              onClick={() => clickable && onStepClick?.(step.id)}
            >
              {/* Step indicator */}
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors",
                    completed && "bg-success border-success text-success-foreground",
                    current && !completed && "bg-primary border-primary text-primary-foreground",
                    !completed && !current && "bg-muted border-muted-foreground/25 text-muted-foreground"
                  )}
                >
                  {completed ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <Icon className="h-5 w-5" />
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "w-0.5 h-8 mt-2",
                      completed ? "bg-success" : "bg-border"
                    )}
                  />
                )}
              </div>

              {/* Step content */}
              <div className="pt-1.5">
                <p
                  className={cn(
                    "text-sm font-medium",
                    current && "text-primary",
                    !current && !completed && "text-muted-foreground"
                  )}
                >
                  {step.name}
                </p>
                {step.description && showLabels && (
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {step.description}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // Horizontal variant (default)
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const Icon = step.icon || Upload;
          const completed = isCompleted(step.id);
          const current = isCurrent(step.id);
          const clickable = isClickable(step.id);

          return (
            <div key={step.id} className="flex items-center flex-1 last:flex-none">
              {/* Step indicator */}
              <div
                className={cn(
                  "flex flex-col items-center",
                  clickable && "cursor-pointer group"
                )}
                onClick={() => clickable && onStepClick?.(step.id)}
              >
                <div
                  className={cn(
                    "flex items-center justify-center rounded-full border-2 transition-all",
                    compact ? "h-8 w-8" : "h-10 w-10",
                    completed && "bg-success border-success text-success-foreground",
                    current && !completed && "bg-primary border-primary text-primary-foreground ring-4 ring-primary/20",
                    !completed && !current && "bg-muted border-muted-foreground/25 text-muted-foreground",
                    clickable && "group-hover:ring-2 group-hover:ring-primary/30"
                  )}
                >
                  {completed ? (
                    <CheckCircle className={cn(compact ? "h-4 w-4" : "h-5 w-5")} />
                  ) : (
                    <Icon className={cn(compact ? "h-4 w-4" : "h-5 w-5")} />
                  )}
                </div>
                {showLabels && (
                  <span
                    className={cn(
                      "mt-2 text-center",
                      compact ? "text-[10px]" : "text-xs",
                      current && "text-primary font-medium",
                      completed && "text-success",
                      !current && !completed && "text-muted-foreground"
                    )}
                  >
                    {compact ? step.shortName || step.name : step.name}
                  </span>
                )}
              </div>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "flex-1 mx-2",
                    compact ? "h-0.5" : "h-1",
                    "rounded-full",
                    completed ? "bg-success" : "bg-border"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Export default steps for reuse
export { DEFAULT_STEPS };
