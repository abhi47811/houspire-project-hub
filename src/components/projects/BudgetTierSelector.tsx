import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';
import { Gem, Scale, Wallet } from 'lucide-react';

interface BudgetTierSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const budgetTiers = [
  {
    id: 'premium',
    name: 'Premium',
    icon: Gem,
    multiplier: '2.5x',
    description: 'Luxury finishes, imported materials',
    features: ['Premium Italian marble', 'Designer furniture', 'Smart home integration', 'Custom millwork'],
    priceRange: '₹15,000-25,000/sqft',
    color: 'text-amber-500',
    bgColor: 'bg-gradient-to-br from-amber-50 to-amber-100/50 dark:from-amber-950/20 dark:to-amber-900/10',
  },
  {
    id: 'mid_range',
    name: 'Mid-Range',
    icon: Scale,
    multiplier: '1.0x',
    description: 'Quality local materials, balanced design',
    features: ['Indian marble/granite', 'Quality branded furniture', 'Standard electrical', 'MDF veneer'],
    priceRange: '₹8,000-12,000/sqft',
    color: 'text-primary',
    bgColor: 'bg-gradient-to-br from-primary/5 to-primary/10',
    recommended: true,
  },
  {
    id: 'budget',
    name: 'Budget',
    icon: Wallet,
    multiplier: '0.5x',
    description: 'Cost-effective, essential finishes',
    features: ['Vitrified tiles', 'Ready-made furniture', 'Basic fixtures', 'Laminate finishes'],
    priceRange: '₹4,000-6,000/sqft',
    color: 'text-green-600',
    bgColor: 'bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-950/20 dark:to-green-900/10',
  },
];

export function BudgetTierSelector({ value, onChange }: BudgetTierSelectorProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">Budget Tier *</label>
        <span className="text-xs text-muted-foreground">Affects material & finish suggestions</span>
      </div>
      
      <RadioGroup value={value} onValueChange={onChange}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {budgetTiers.map((tier) => {
            const IconComponent = tier.icon;
            const isSelected = value === tier.id;
            
            return (
              <label key={tier.id} htmlFor={`tier-${tier.id}`} className="cursor-pointer">
                <Card className={cn(
                  "relative overflow-hidden transition-all hover:shadow-md border-2",
                  tier.bgColor,
                  isSelected ? "border-primary ring-1 ring-primary/20" : "border-transparent"
                )}>
                  {tier.recommended && (
                    <div className="absolute top-0 right-0">
                      <Badge className="rounded-none rounded-bl-lg text-[10px] py-0.5">
                        Recommended
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="pb-2 pt-4">
                    <div className="flex items-center gap-2">
                      <RadioGroupItem value={tier.id} id={`tier-${tier.id}`} />
                      <IconComponent className={cn("h-5 w-5", tier.color)} />
                      <CardTitle className="text-base">{tier.name}</CardTitle>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {tier.multiplier}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{tier.priceRange}</span>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="pb-4 pt-0">
                    <CardDescription className="text-xs mb-2">{tier.description}</CardDescription>
                    <ul className="text-xs space-y-1">
                      {tier.features.slice(0, 3).map((feature, i) => (
                        <li key={i} className="flex items-center gap-1.5 text-muted-foreground">
                          <span className="h-1 w-1 rounded-full bg-current" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </label>
            );
          })}
        </div>
      </RadioGroup>
    </div>
  );
}
