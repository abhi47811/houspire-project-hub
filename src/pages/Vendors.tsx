import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PremiumButton, PremiumCard, PremiumSkeleton } from '@/components/ui/premium';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import {
  ArrowLeft,
  RefreshCw,
  Star,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  Award,
  Clock,
  Package,
  Percent,
  Search,
  Filter,
  Building2,
  Loader2,
} from 'lucide-react';

interface Vendor {
  id: string;
  business_name: string;
  contact_name: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  city: string | null;
  categories: string[];
  is_verified: boolean;
  is_curated: boolean;
  rating: number;
  total_reviews: number;
  projects_completed: number;
  on_time_percentage: number;
  discount_percentage: number;
  min_order_amount: number;
  lead_time_days: number;
}

interface VendorMatch {
  id: string;
  budget_item_id: string;
  vendor_id: string;
  match_score: number;
  price_quote: number | null;
  status: 'pending' | 'contacted' | 'selected' | 'rejected';
  vendor?: Vendor;
}

interface BudgetItem {
  id: string;
  category: string;
  item_name: string;
  quantity: number;
  unit: string;
  total: number;
  assigned_vendor_id: string | null;
  vendor_name: string | null;
}

interface Project {
  id: string;
  name: string;
  city: string | null;
}

const categoryLabels: Record<string, string> = {
  flooring: 'Flooring',
  wall_treatment: 'Wall Treatment',
  ceiling: 'Ceiling',
  furniture: 'Furniture',
  lighting: 'Lighting',
  fixtures: 'Fixtures',
};

export default function Vendors() {
  const { projectId } = useParams<{ projectId: string }>();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [minScore, setMinScore] = useState([0]);
  const [sortBy, setSortBy] = useState('score');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetch project
  const { data: project } = useQuery({
    queryKey: ['project', projectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('id, name, city')
        .eq('id', projectId)
        .maybeSingle();
      if (error) throw error;
      return data as Project | null;
    },
    enabled: !!projectId,
  });

  // Fetch budget items
  const { data: budgetItems = [], isLoading: itemsLoading } = useQuery({
    queryKey: ['budget-items-for-vendors', projectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('budget_items')
        .select('id, category, item_name, quantity, unit, total, assigned_vendor_id, vendor_name')
        .eq('project_id', projectId)
        .order('category', { ascending: true });
      if (error) throw error;
      return data as BudgetItem[];
    },
    enabled: !!projectId,
  });

  // Fetch all vendors
  const { data: vendors = [] } = useQuery({
    queryKey: ['vendors'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('vendors')
        .select('*')
        .order('rating', { ascending: false });
      if (error) throw error;
      return data as Vendor[];
    },
  });

  // Fetch vendor matches
  const { data: vendorMatches = [], isLoading: matchesLoading } = useQuery({
    queryKey: ['vendor-matches', projectId],
    queryFn: async () => {
      const itemIds = budgetItems.map(item => item.id);
      if (itemIds.length === 0) return [];
      
      const { data, error } = await supabase
        .from('vendor_matches')
        .select('*')
        .in('budget_item_id', itemIds)
        .order('match_score', { ascending: false });
      if (error) throw error;
      return data as VendorMatch[];
    },
    enabled: budgetItems.length > 0,
  });

  // Group budget items by category
  const itemsByCategory = budgetItems.reduce((acc, item) => {
    const cat = item.category;
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(item);
    return acc;
  }, {} as Record<string, BudgetItem[]>);

  // Get vendor matches for a budget item with vendor data
  const getMatchesForItem = (itemId: string): (VendorMatch & { vendor: Vendor })[] => {
    const matches = vendorMatches
      .filter(m => m.budget_item_id === itemId)
      .map(match => ({
        ...match,
        vendor: vendors.find(v => v.id === match.vendor_id)!,
      }))
      .filter(m => m.vendor);

    // Apply filters
    let filtered = matches;
    
    if (verifiedOnly) {
      filtered = filtered.filter(m => m.vendor.is_verified);
    }
    
    if (minScore[0] > 0) {
      filtered = filtered.filter(m => m.match_score >= minScore[0]);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(m => 
        m.vendor.business_name.toLowerCase().includes(query) ||
        m.vendor.contact_name?.toLowerCase().includes(query)
      );
    }

    // Sort
    if (sortBy === 'score') {
      filtered.sort((a, b) => b.match_score - a.match_score);
    } else if (sortBy === 'rating') {
      filtered.sort((a, b) => b.vendor.rating - a.vendor.rating);
    }

    return filtered.slice(0, 3);
  };

  // Generate vendor matches (mock implementation)
  const handleRefreshMatches = async () => {
    setIsRefreshing(true);
    try {
      // For each budget item, find matching vendors and create matches
      for (const item of budgetItems) {
        const matchingVendors = vendors.filter(v => 
          v.categories.includes(item.category) || 
          v.city === project?.city
        );

        for (const vendor of matchingVendors.slice(0, 3)) {
          // Calculate match score based on various factors
          let score = 50;
          if (vendor.categories.includes(item.category)) score += 20;
          if (vendor.city === project?.city) score += 15;
          if (vendor.is_curated) score += 10;
          if (vendor.is_verified) score += 5;
          score = Math.min(100, score + Math.floor(vendor.rating * 2));

          // Upsert vendor match
          await supabase
            .from('vendor_matches')
            .upsert({
              budget_item_id: item.id,
              vendor_id: vendor.id,
              match_score: score,
              status: 'pending',
            }, {
              onConflict: 'budget_item_id,vendor_id',
            });
        }
      }

      toast({
        title: 'Matches Refreshed',
        description: `Found vendor matches for ${budgetItems.length} items.`,
      });

      queryClient.invalidateQueries({ queryKey: ['vendor-matches', projectId] });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to refresh vendor matches.',
        variant: 'destructive',
      });
    } finally {
      setIsRefreshing(false);
    }
  };

  const handleSelectVendor = async (budgetItemId: string, vendorId: string, vendorName: string) => {
    try {
      // Update budget item
      await supabase
        .from('budget_items')
        .update({ 
          assigned_vendor_id: vendorId,
          vendor_name: vendorName,
        })
        .eq('id', budgetItemId);

      // Update vendor match status
      await supabase
        .from('vendor_matches')
        .update({ status: 'selected' })
        .eq('budget_item_id', budgetItemId)
        .eq('vendor_id', vendorId);

      toast({
        title: 'Vendor Selected',
        description: `${vendorName} assigned to this item.`,
      });

      queryClient.invalidateQueries({ queryKey: ['budget-items-for-vendors', projectId] });
      queryClient.invalidateQueries({ queryKey: ['vendor-matches', projectId] });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to select vendor.',
        variant: 'destructive',
      });
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'bg-green-500/10 text-green-600 border-green-500/20';
    if (score >= 70) return 'bg-amber-500/10 text-amber-600 border-amber-500/20';
    return 'bg-muted text-muted-foreground';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const filteredCategories = categoryFilter === 'all' 
    ? Object.keys(itemsByCategory) 
    : [categoryFilter].filter(c => itemsByCategory[c]);

  if (itemsLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-3">
            <Skeleton className="h-96" />
          </div>
          <div className="col-span-9">
            <Skeleton className="h-96" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between glass-subtle p-6 rounded-xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to={`/projects/${projectId}`} className="hover:text-foreground flex items-center gap-1 hover-lift">
              <ArrowLeft className="h-4 w-4" />
              {project?.name || 'Project'}
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">Vendors</span>
          </div>
          <h1 className="text-3xl font-bold text-gradient-primary">Vendor Matching</h1>
        </div>

        <PremiumButton onClick={handleRefreshMatches} disabled={isRefreshing}>
          {isRefreshing ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <RefreshCw className="mr-2 h-4 w-4" />
          )}
          Refresh Matches
        </PremiumButton>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar Filters */}
        <div className="col-span-12 lg:col-span-3">
          <Card className="sticky top-4">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Search */}
              <div className="space-y-2">
                <Label className="text-xs">Search Vendor</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="space-y-2">
                <Label className="text-xs">Category</Label>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="all">All Categories</SelectItem>
                    {Object.keys(categoryLabels).map(cat => (
                      <SelectItem key={cat} value={cat}>{categoryLabels[cat]}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Verified Only */}
              <div className="flex items-center justify-between">
                <Label className="text-xs">Verified Only</Label>
                <Switch checked={verifiedOnly} onCheckedChange={setVerifiedOnly} />
              </div>

              {/* Min Score */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-xs">Min Score</Label>
                  <span className="text-xs text-muted-foreground">{minScore[0]}</span>
                </div>
                <Slider
                  value={minScore}
                  onValueChange={setMinScore}
                  max={100}
                  step={10}
                />
              </div>

              {/* Sort By */}
              <div className="space-y-2">
                <Label className="text-xs">Sort By</Label>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-popover">
                    <SelectItem value="score">Match Score</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="col-span-12 lg:col-span-9">
          {budgetItems.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-16 text-center">
                <Package className="h-12 w-12 text-muted-foreground/50 mb-4" />
                <h3 className="text-lg font-medium mb-2">No budget items yet</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Generate a budget first to match vendors
                </p>
                <Link to={`/projects/${projectId}/budget`}>
                  <Button>Go to Budget</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <ScrollArea className="h-[calc(100vh-200px)]">
              <div className="space-y-6 pr-4">
                {filteredCategories.map(category => (
                  <div key={category} className="space-y-4">
                    <h2 className="text-lg font-semibold flex items-center gap-2">
                      <Building2 className="h-5 w-5 text-primary" />
                      {categoryLabels[category] || category}
                    </h2>

                    {itemsByCategory[category]?.map(item => {
                      const matches = getMatchesForItem(item.id);
                      
                      return (
                        <Card key={item.id}>
                          <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <CardTitle className="text-base">{item.item_name}</CardTitle>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {item.quantity} {item.unit} • {formatCurrency(item.total)}
                                </p>
                              </div>
                              {item.assigned_vendor_id && (
                                <Badge className="bg-green-500/10 text-green-600 border-green-500/20">
                                  <CheckCircle className="mr-1 h-3 w-3" />
                                  {item.vendor_name}
                                </Badge>
                              )}
                            </div>
                          </CardHeader>
                          <CardContent>
                            {matches.length === 0 ? (
                              <p className="text-sm text-muted-foreground text-center py-4">
                                No vendor matches found. Click "Refresh Matches" to find vendors.
                              </p>
                            ) : (
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                {matches.map((match, index) => (
                                  <VendorCard
                                    key={match.id}
                                    match={match}
                                    isTopMatch={index === 0}
                                    isSelected={item.assigned_vendor_id === match.vendor_id}
                                    onSelect={() => handleSelectVendor(
                                      item.id, 
                                      match.vendor_id, 
                                      match.vendor.business_name
                                    )}
                                    getScoreColor={getScoreColor}
                                  />
                                ))}
                              </div>
                            )}
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </div>
      </div>
    </div>
  );
}

interface VendorCardProps {
  match: VendorMatch & { vendor: Vendor };
  isTopMatch: boolean;
  isSelected: boolean;
  onSelect: () => void;
  getScoreColor: (score: number) => string;
}

function VendorCard({ match, isTopMatch, isSelected, onSelect, getScoreColor }: VendorCardProps) {
  const { vendor } = match;

  return (
    <div className={`p-4 rounded-lg border ${isSelected ? 'border-primary bg-primary/5' : 'bg-card'}`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-medium text-sm">{vendor.business_name}</h4>
          {vendor.contact_name && (
            <p className="text-xs text-muted-foreground">{vendor.contact_name}</p>
          )}
        </div>
        <Badge className={getScoreColor(match.match_score)}>
          {match.match_score}
        </Badge>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-1 mb-3">
        {vendor.is_curated && (
          <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
            <Award className="mr-0.5 h-2.5 w-2.5" />
            Curated
          </Badge>
        )}
        {vendor.is_verified && (
          <Badge variant="outline" className="text-[10px] px-1.5 py-0">
            <CheckCircle className="mr-0.5 h-2.5 w-2.5" />
            Verified
          </Badge>
        )}
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1 mb-3">
        <div className="flex">
          {[1, 2, 3, 4, 5].map(star => (
            <Star
              key={star}
              className={`h-3 w-3 ${
                star <= Math.floor(vendor.rating)
                  ? 'fill-amber-400 text-amber-400'
                  : 'text-muted-foreground/30'
              }`}
            />
          ))}
        </div>
        <span className="text-xs text-muted-foreground">
          {vendor.rating.toFixed(1)} ({vendor.total_reviews})
        </span>
      </div>

      {/* Contact */}
      <div className="space-y-1 mb-3 text-xs">
        {vendor.phone && (
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Phone className="h-3 w-3" />
            {vendor.phone}
          </div>
        )}
        {vendor.city && (
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <MapPin className="h-3 w-3" />
            {vendor.address}, {vendor.city}
          </div>
        )}
      </div>

      {/* Performance */}
      <div className="grid grid-cols-2 gap-2 mb-3 text-xs">
        <div className="flex items-center gap-1 text-muted-foreground">
          <Package className="h-3 w-3" />
          {vendor.projects_completed} projects
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
          <Clock className="h-3 w-3" />
          {vendor.on_time_percentage}% on-time
        </div>
        <div className="flex items-center gap-1 text-muted-foreground">
          <Percent className="h-3 w-3" />
          {vendor.discount_percentage}% discount
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          size="sm"
          variant={isTopMatch && !isSelected ? 'default' : 'outline'}
          className="flex-1 text-xs"
          onClick={onSelect}
          disabled={isSelected}
        >
          {isSelected ? 'Selected' : 'Select Vendor'}
        </Button>
        {vendor.phone && (
          <Button
            size="sm"
            variant="ghost"
            className="px-2"
            asChild
          >
            <a href={`tel:${vendor.phone}`}>
              <Phone className="h-3 w-3" />
            </a>
          </Button>
        )}
      </div>
    </div>
  );
}
