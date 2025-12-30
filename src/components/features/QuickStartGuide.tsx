import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Circle } from 'lucide-react';

interface QuickStartStep {
  id: number;
  title: string;
  description: string;
  phase: string;
  isNew?: boolean;
}

const quickStartSteps: QuickStartStep[] = [
  {
    id: 1,
    title: 'Upload Room Photo',
    description: 'Take a photo of your room and upload it to start the design process',
    phase: 'Phase 1: Upload',
  },
  {
    id: 2,
    title: 'AI Room Analysis',
    description: 'Our AI analyzes your room type, dimensions, and architectural elements',
    phase: 'Phase 2: Analyze',
  },
  {
    id: 3,
    title: 'Clean & Preserve',
    description: 'AI removes existing furniture while preserving architectural features',
    phase: 'Phase 3: Clean',
  },
  {
    id: 4,
    title: 'Choose Smart Defaults',
    description: 'Select from 169 presets across 13 styles and 3 budget tiers',
    phase: 'Phase 4: Customize',
    isNew: true,
  },
  {
    id: 5,
    title: 'Review Budget Breakdown',
    description: 'See detailed cost analysis with GST and city-specific pricing',
    phase: 'Phase 4: Customize',
    isNew: true,
  },
  {
    id: 6,
    title: 'Generate AI Renders',
    description: 'Get photorealistic renders of your redesigned space',
    phase: 'Phase 5: Generate',
  },
  {
    id: 7,
    title: 'Check Quality Score',
    description: 'View 100-point quality analysis with improvement suggestions',
    phase: 'After Generation',
    isNew: true,
  },
  {
    id: 8,
    title: 'Export & Share',
    description: 'Export to PDF, Excel, or ZIP for clients and contractors',
    phase: 'After Generation',
    isNew: true,
  },
  {
    id: 9,
    title: 'Find Vendors',
    description: 'Get AI-matched vendor recommendations for materials and furniture',
    phase: 'After Generation',
    isNew: true,
  },
];

interface QuickStartGuideProps {
  currentPhase?: number;
}

export function QuickStartGuide({ currentPhase = 0 }: QuickStartGuideProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Start Guide</CardTitle>
        <CardDescription>
          Follow these steps to create your perfect room design
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {quickStartSteps.map((step) => {
            const isCompleted = step.id < currentPhase;
            const isCurrent = step.id === currentPhase;

            return (
              <div
                key={step.id}
                className={`flex items-start gap-4 pb-4 border-b last:border-0 ${
                  isCurrent ? 'bg-primary/5 -mx-4 px-4 py-3 rounded-lg' : ''
                }`}
              >
                <div className="flex-shrink-0 mt-1">
                  {isCompleted ? (
                    <CheckCircle2 className="h-5 w-5 text-success" />
                  ) : (
                    <Circle className={`h-5 w-5 ${isCurrent ? 'text-primary' : 'text-muted-foreground'}`} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className={`font-semibold text-sm ${isCurrent ? 'text-primary' : ''}`}>
                      {step.id}. {step.title}
                    </h4>
                    {step.isNew && (
                      <Badge variant="secondary" className="text-xs">
                        NEW
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">
                    {step.description}
                  </p>
                  <p className="text-xs text-muted-foreground font-medium">
                    {step.phase}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 p-4 bg-secondary rounded-lg">
          <h5 className="font-semibold text-sm mb-2">💡 Pro Tips</h5>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• Use the "More" menu (⋮) to access Budget, Export, and Vendor features</li>
            <li>• Choose budget tiers (Premium/Mid-Range/Budget) for cost control</li>
            <li>• Export to PDF for professional client presentations</li>
            <li>• Check Quality Score to identify improvement areas</li>
            <li>• Use Version History to compare different design iterations</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
