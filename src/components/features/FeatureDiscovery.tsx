import { useState } from 'react';
import { X, Sparkles, FileText, Download, ShoppingCart, TrendingUp, History, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';

interface FeatureGuide {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  location: string;
  howTo: string[];
  badge?: string;
}

const features: FeatureGuide[] = [
  {
    id: 'smart-defaults',
    title: 'Smart Defaults & Budget Tiers',
    description: 'Choose from 169 pre-designed room configurations across 3 budget tiers',
    icon: <Sparkles className="h-5 w-5" />,
    location: 'Phase 4: Customize',
    howTo: [
      'Navigate to Phase 4 (Customize)',
      'See "Smart Defaults" section',
      'Select your budget tier (Premium/Mid-Range/Budget)',
      'Choose from style-specific presets',
      'See real-time cost estimation',
    ],
    badge: 'NEW',
  },
  {
    id: 'budget-breakdown',
    title: 'Budget Breakdown & Cost Analysis',
    description: 'Detailed cost breakdown with GST, city multipliers, and category-wise pricing',
    icon: <FileText className="h-5 w-5" />,
    location: 'Room Menu → View Budget',
    howTo: [
      'Open any room',
      'Click the "More" menu (⋮) in top right',
      'Select "View Budget"',
      'See detailed cost breakdown',
      'View GST calculations and city-specific pricing',
    ],
    badge: 'NEW',
  },
  {
    id: 'export',
    title: 'Multi-Format Export',
    description: 'Export your designs to PDF, Excel, CSV, or ZIP with professional reports',
    icon: <Download className="h-5 w-5" />,
    location: 'Room Menu → Export Room',
    howTo: [
      'Open any room with completed design',
      'Click the "More" menu (⋮)',
      'Select "Export Room"',
      'Choose format (PDF, Excel, CSV, or ZIP)',
      'Select export options (images, budget, quality score)',
      'Download your professional report',
    ],
    badge: 'NEW',
  },
  {
    id: 'vendors',
    title: 'AI Vendor Matching',
    description: 'Find the best vendors for furniture, materials, and decor items',
    icon: <ShoppingCart className="h-5 w-5" />,
    location: 'Room Menu → Find Vendors',
    howTo: [
      'Open any room',
      'Click the "More" menu (⋮)',
      'Select "Find Vendors"',
      'Browse AI-matched vendors',
      'Compare prices and ratings',
      'Contact vendors directly',
    ],
    badge: 'NEW',
  },
  {
    id: 'quality-score',
    title: 'Quality Scoring System',
    description: '100-point quality analysis with A-F grading and improvement suggestions',
    icon: <TrendingUp className="h-5 w-5" />,
    location: 'Room Menu → Quality Score',
    howTo: [
      'Complete a room design (Phase 5)',
      'Click the "More" menu (⋮)',
      'Select "Quality Score"',
      'View your 100-point quality rating',
      'See category-wise scores',
      'Review improvement suggestions',
    ],
    badge: 'NEW',
  },
  {
    id: 'version-history',
    title: 'Version History & Comparison',
    description: 'Track all design iterations and compare different versions side-by-side',
    icon: <History className="h-5 w-5" />,
    location: 'Phase 6: History (Tab)',
    howTo: [
      'Open any room',
      'Click on "History" tab (Phase 6)',
      'View timeline of all renders',
      'Select versions to compare',
      'See side-by-side comparison',
      'Restore previous versions',
    ],
  },
  {
    id: 'architectural',
    title: 'Architectural Preservation',
    description: 'Automatically detect and preserve doors, windows, and architectural elements',
    icon: <Settings className="h-5 w-5" />,
    location: 'Phase 4: Customize → Settings',
    howTo: [
      'Navigate to Phase 4 (Customize)',
      'Look for "Architectural Preservation" section',
      'AI automatically detects elements',
      'Configure preservation rules',
      'Elements are protected during rendering',
    ],
    badge: 'NEW',
  },
];

interface FeatureDiscoveryProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FeatureDiscovery({ isOpen, onClose }: FeatureDiscoveryProps) {
  const [selectedFeature, setSelectedFeature] = useState<FeatureGuide | null>(null);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Discover New Features
            </DialogTitle>
            <DialogDescription>
              Explore all the powerful features available in HOUSPIRE
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 md:grid-cols-2">
            {features.map((feature) => (
              <Card
                key={feature.id}
                className="cursor-pointer hover:border-primary transition-colors"
                onClick={() => setSelectedFeature(feature)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg text-primary">
                        {feature.icon}
                      </div>
                      <div>
                        <CardTitle className="text-base">{feature.title}</CardTitle>
                        {feature.badge && (
                          <Badge variant="secondary" className="mt-1 text-xs">
                            {feature.badge}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">
                    {feature.description}
                  </CardDescription>
                  <div className="mt-3 flex items-center text-xs text-muted-foreground">
                    <span className="font-medium">Location:</span>
                    <span className="ml-2">{feature.location}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="flex justify-end mt-4">
            <Button onClick={onClose}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Feature Detail Dialog */}
      {selectedFeature && (
        <Dialog open={!!selectedFeature} onOpenChange={() => setSelectedFeature(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  {selectedFeature.icon}
                </div>
                <div>
                  <DialogTitle>{selectedFeature.title}</DialogTitle>
                  {selectedFeature.badge && (
                    <Badge variant="secondary" className="mt-1">
                      {selectedFeature.badge}
                    </Badge>
                  )}
                </div>
              </div>
              <DialogDescription>{selectedFeature.description}</DialogDescription>
            </DialogHeader>

            <div className="space-y-4 mt-4">
              <div>
                <h4 className="font-semibold mb-2">📍 Where to Find It</h4>
                <p className="text-sm text-muted-foreground bg-secondary px-3 py-2 rounded-lg">
                  {selectedFeature.location}
                </p>
              </div>

              <div>
                <h4 className="font-semibold mb-2">📖 How to Use</h4>
                <ol className="space-y-2 text-sm">
                  {selectedFeature.howTo.map((step, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold">
                        {index + 1}
                      </span>
                      <span className="text-muted-foreground pt-0.5">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline" onClick={() => setSelectedFeature(null)}>
                Back
              </Button>
              <Button onClick={() => { setSelectedFeature(null); onClose(); }}>
                Got It!
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

// Feature Announcement Banner Component
export function FeatureAnnouncementBanner() {
  const [isVisible, setIsVisible] = useState(() => {
    const dismissed = localStorage.getItem('feature-banner-dismissed');
    return !dismissed;
  });

  const [showDiscovery, setShowDiscovery] = useState(false);

  const handleDismiss = () => {
    localStorage.setItem('feature-banner-dismissed', 'true');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <>
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border-b">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-primary animate-pulse" />
              <div>
                <p className="font-semibold text-sm">
                  🎉 New Features Available!
                </p>
                <p className="text-xs text-muted-foreground">
                  Export designs, view budgets, find vendors, check quality scores, and more!
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="default"
                onClick={() => setShowDiscovery(true)}
              >
                Explore Features
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleDismiss}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <FeatureDiscovery isOpen={showDiscovery} onClose={() => setShowDiscovery(false)} />
    </>
  );
}
