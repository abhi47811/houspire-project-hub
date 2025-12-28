import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Sparkles, Library, Edit, Check, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export type GenerationPath = 'smart_defaults' | 'library' | 'manual';

interface GenerationPathsSelectorProps {
  value: GenerationPath;
  onChange: (value: GenerationPath) => void;
}

const paths = [
  {
    id: 'smart_defaults' as GenerationPath,
    name: 'Smart Defaults',
    icon: Sparkles,
    iconColor: 'text-purple-500',
    badge: 'Fastest',
    badgeVariant: 'secondary' as const,
    description: 'Pre-configured specifications based on style and room type',
    features: [
      { text: 'Fastest generation (2-3 min)', positive: true },
      { text: 'Consistent quality', positive: true },
      { text: 'Budget-tier optimized', positive: true },
    ],
  },
  {
    id: 'library' as GenerationPath,
    name: 'Library Reference',
    icon: Library,
    iconColor: 'text-blue-500',
    badge: 'Recommended',
    badgeVariant: 'default' as const,
    description: 'Match a proven design from our curated library',
    features: [
      { text: 'Highest quality (85-95%)', positive: true },
      { text: 'Proven aesthetics', positive: true },
      { text: 'City-specific designs', positive: true },
    ],
  },
  {
    id: 'manual' as GenerationPath,
    name: 'Manual Prompt',
    icon: Edit,
    iconColor: 'text-orange-500',
    badge: 'Expert',
    badgeVariant: 'outline' as const,
    description: 'Write your own detailed prompt for full control',
    features: [
      { text: 'Full creative control', positive: true },
      { text: 'Custom specifications', positive: true },
      { text: 'Variable quality', positive: false },
    ],
  },
];

export function GenerationPathsSelector({ value, onChange }: GenerationPathsSelectorProps) {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Choose Your Generation Path</CardTitle>
        <p className="text-xs text-muted-foreground">Select how you want to generate your render</p>
      </CardHeader>
      <CardContent>
        <RadioGroup value={value} onValueChange={(v) => onChange(v as GenerationPath)}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {paths.map((path) => {
              const IconComponent = path.icon;
              const isSelected = value === path.id;
              
              return (
                <label key={path.id} htmlFor={`path-${path.id}`} className="cursor-pointer">
                  <Card className={cn(
                    "relative overflow-hidden transition-all hover:shadow-md h-full",
                    isSelected && "ring-2 ring-primary"
                  )}>
                    <CardHeader className="pb-2 pt-3">
                      <div className="flex items-center justify-between mb-1">
                        <RadioGroupItem value={path.id} id={`path-${path.id}`} />
                        <Badge variant={path.badgeVariant} className="text-[10px]">
                          {path.badge}
                        </Badge>
                      </div>
                      <CardTitle className="text-sm flex items-center gap-2">
                        <IconComponent className={cn("h-4 w-4", path.iconColor)} />
                        {path.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pb-3 pt-0">
                      <p className="text-xs text-muted-foreground mb-2">
                        {path.description}
                      </p>
                      <div className="space-y-1">
                        {path.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-1.5 text-[11px]">
                            {feature.positive ? (
                              <Check className="h-3 w-3 text-green-500 shrink-0" />
                            ) : (
                              <AlertCircle className="h-3 w-3 text-amber-500 shrink-0" />
                            )}
                            <span className="text-muted-foreground">{feature.text}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </label>
              );
            })}
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
