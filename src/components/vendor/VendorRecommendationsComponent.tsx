/**
 * F-079-F-084: Vendor Recommendations Component
 * 
 * Displays AI-powered vendor recommendations with ratings,
 * pricing, and match scores.
 */

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import {
  Store,
  Star,
  MapPin,
  Phone,
  Mail,
  Globe,
  TrendingUp,
  Package,
  Truck,
  Award,
  ExternalLink,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { VendorRecommendation } from '@/services/features/vendorAIService';

interface VendorRecommendationsComponentProps {
  recommendations: VendorRecommendation[];
  onSelectVendor?: (vendorId: string) => void;
  onContactVendor?: (vendorId: string) => void;
  className?: string;
}

export function VendorRecommendationsComponent({
  recommendations,
  onSelectVendor,
  onContactVendor,
  className,
}: VendorRecommendationsComponentProps) {
  const getPriceRangeBadge = (range: string) => {
    const colors = {
      budget: 'bg-green-500/10 text-green-700 border-green-500/20',
      mid_range: 'bg-blue-500/10 text-blue-700 border-blue-500/20',
      premium: 'bg-purple-500/10 text-purple-700 border-purple-500/20',
    };
    return colors[range as keyof typeof colors] || colors.mid_range;
  };

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-primary/10">
            <Store className="w-4 h-4 text-primary" />
          </div>
          <div>
            <CardTitle className="text-base">Vendor Recommendations</CardTitle>
            <CardDescription className="text-xs">
              AI-matched vendors for your project • {recommendations.length} matches
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {recommendations.map((rec, idx) => {
          const { vendor, match_score, reasons, estimated_cost } = rec;

          return (
            <Card key={vendor.id} className="overflow-hidden border-2">
              <CardContent className="p-4 space-y-3">
                {/* Vendor Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-sm truncate">{vendor.name}</h3>
                      {idx === 0 && (
                        <Badge variant="default" className="text-[10px] h-4 px-1">
                          <Award className="w-2.5 h-2.5 mr-0.5" />
                          Best Match
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <MapPin className="w-3 h-3" />
                      <span>
                        {vendor.location.city}
                        {vendor.location.area && `, ${vendor.location.area}`}
                      </span>
                    </div>
                  </div>

                  {/* Match Score */}
                  <div className="text-right">
                    <div className="text-lg font-bold text-primary">
                      {match_score}%
                    </div>
                    <div className="text-[10px] text-muted-foreground">
                      Match Score
                    </div>
                  </div>
                </div>

                {/* Ratings */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    <span className="text-sm font-medium">
                      {vendor.ratings.overall.toFixed(1)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      ({vendor.ratings.review_count})
                    </span>
                  </div>
                  
                  <Badge
                    variant="outline"
                    className={cn('text-[10px] h-4 px-1', getPriceRangeBadge(vendor.price_range))}
                  >
                    {vendor.price_range.replace('_', ' ')}
                  </Badge>

                  <Badge variant="outline" className="text-[10px] h-4 px-1">
                    <TrendingUp className="w-2.5 h-2.5 mr-0.5" />
                    {vendor.years_in_business}y
                  </Badge>
                </div>

                {/* Match Progress */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-muted-foreground">Match Quality</span>
                    <span className="font-medium">{match_score}%</span>
                  </div>
                  <Progress value={match_score} className="h-1.5" />
                </div>

                {/* Rating Breakdown */}
                <div className="grid grid-cols-4 gap-2 text-xs">
                  <div className="text-center">
                    <div className="font-medium">{vendor.ratings.quality.toFixed(1)}</div>
                    <div className="text-[10px] text-muted-foreground">Quality</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium">{vendor.ratings.pricing.toFixed(1)}</div>
                    <div className="text-[10px] text-muted-foreground">Pricing</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium">{vendor.ratings.reliability.toFixed(1)}</div>
                    <div className="text-[10px] text-muted-foreground">Reliability</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium">{vendor.ratings.customer_service.toFixed(1)}</div>
                    <div className="text-[10px] text-muted-foreground">Service</div>
                  </div>
                </div>

                <Separator />

                {/* Match Reasons */}
                <div className="space-y-1">
                  <div className="text-xs font-medium text-muted-foreground">
                    Why this vendor?
                  </div>
                  {reasons.map((reason, ridx) => (
                    <div key={ridx} className="flex items-start gap-2 text-xs">
                      <div className="w-1 h-1 rounded-full bg-primary mt-1.5 shrink-0" />
                      <span>{reason}</span>
                    </div>
                  ))}
                </div>

                {/* Specialties */}
                {vendor.specialties.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {vendor.specialties.slice(0, 3).map((specialty, sidx) => (
                      <Badge
                        key={sidx}
                        variant="secondary"
                        className="text-[10px] h-4 px-1.5"
                      >
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Services */}
                <div className="flex gap-2 text-xs">
                  {vendor.delivery_available && (
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Truck className="w-3 h-3" />
                      <span>Delivery</span>
                    </div>
                  )}
                  {vendor.installation_available && (
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Package className="w-3 h-3" />
                      <span>Installation</span>
                    </div>
                  )}
                  {vendor.certifications && vendor.certifications.length > 0 && (
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Award className="w-3 h-3" />
                      <span>{vendor.certifications[0]}</span>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Estimated Cost */}
                <div className="flex items-center justify-between p-2 bg-muted/50 rounded">
                  <span className="text-xs font-medium">Estimated Cost:</span>
                  <span className="text-sm font-bold text-primary">
                    ₹{estimated_cost.toLocaleString('en-IN')}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  {onSelectVendor && (
                    <Button
                      size="sm"
                      className="flex-1"
                      onClick={() => onSelectVendor(vendor.id)}
                    >
                      Select Vendor
                    </Button>
                  )}
                  {onContactVendor && (
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1"
                      onClick={() => onContactVendor(vendor.id)}
                    >
                      <Phone className="w-3 h-3 mr-2" />
                      Contact
                    </Button>
                  )}
                </div>

                {/* Contact Details (collapsed) */}
                <details className="text-xs">
                  <summary className="cursor-pointer text-muted-foreground hover:text-foreground">
                    Contact Details
                  </summary>
                  <div className="mt-2 space-y-1 pl-4">
                    <div className="flex items-center gap-2">
                      <Phone className="w-3 h-3" />
                      <a href={`tel:${vendor.contact.phone}`} className="hover:underline">
                        {vendor.contact.phone}
                      </a>
                    </div>
                    {vendor.contact.email && (
                      <div className="flex items-center gap-2">
                        <Mail className="w-3 h-3" />
                        <a href={`mailto:${vendor.contact.email}`} className="hover:underline">
                          {vendor.contact.email}
                        </a>
                      </div>
                    )}
                    {vendor.contact.website && (
                      <div className="flex items-center gap-2">
                        <Globe className="w-3 h-3" />
                        <a
                          href={vendor.contact.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline flex items-center gap-1"
                        >
                          {vendor.contact.website}
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      </div>
                    )}
                  </div>
                </details>
              </CardContent>
            </Card>
          );
        })}

        {recommendations.length === 0 && (
          <div className="text-center py-8 text-muted-foreground">
            <Store className="w-12 h-12 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No vendor recommendations available</p>
            <p className="text-xs mt-1">
              Adjust your requirements to see more matches
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
