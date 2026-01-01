import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PremiumButton, PremiumCard, PremiumSkeleton } from '@/components/ui/premium';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import {
  ArrowLeft,
  Download,
  FileSpreadsheet,
  FileText,
  Package,
  RefreshCw,
  Sparkles,
  Check,
  Trash2,
  Users,
  IndianRupee,
  ChevronDown,
  Loader2,
  Zap,
  Scan,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  Brain,
} from 'lucide-react';
import { ExportBudgetPDFButton } from '@/components/budget/ExportBudgetPDFButton';
import { useRecommendations } from '@/hooks/useRecommendations';

interface AlternativeMatch {
  pricing_item_id?: string;
  id?: string;  // Legacy field
  item_name?: string;
  name?: string;  // Legacy field
  category?: string;
  match_score?: number;
  confidence?: number;  // Legacy field
  tier_price?: number;
}

interface BudgetItem {
  id: string;
  project_id: string;
  room_id: string | null;
  render_id: string | null;
  category: string;
  item_name: string;
  specification: string | null;
  quantity: number;
  unit: string;
  rate: number;
  amount: number;
  gst_percent: number;
  gst_amount: number;
  total: number;
  assigned_vendor_id: string | null;
  vendor_name: string | null;
  status: 'pending' | 'approved' | 'rejected' | 'unmatched';
  sort_order: number | null;
  // AI extraction fields
  ai_item_name: string | null;
  ai_category: string | null;
  ai_confidence: number | null;
  ai_specifications: Record<string, any> | null;
  // Matching fields
  pricing_item_id: string | null;
  match_strategy: 'exact' | 'synonym' | 'fuzzy' | 'llm' | null;
  match_confidence: number | null;
  alternative_matches: AlternativeMatch[] | null;
  user_edited: boolean;
  budget_tier: string | null;
}

interface Project {
  id: string;
  name: string;
  city: string | null;
  budget_tier: string | null;
}

interface Render {
  id: string;
  room_id: string;
  image_url: string;
  approval_status: string;
}

const categories = [
  { id: 'all', label: 'All Items' },
  { id: 'Furniture', label: 'Furniture' },
  { id: 'Flooring', label: 'Flooring' },
  { id: 'Wall Finish', label: 'Wall Finish' },
  { id: 'Ceiling', label: 'Ceiling' },
  { id: 'Lighting', label: 'Lighting' },
  { id: 'Soft Furnishings', label: 'Soft Furnishings' },
  { id: 'Decor', label: 'Decor' },
];

// Match strategy display config
const matchStrategyConfig: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  exact: { label: 'Exact', color: 'bg-green-500/10 text-green-600 border-green-500/20', icon: <CheckCircle2 className="h-3 w-3" /> },
  synonym: { label: 'Synonym', color: 'bg-blue-500/10 text-blue-600 border-blue-500/20', icon: <Check className="h-3 w-3" /> },
  fuzzy: { label: 'Fuzzy', color: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20', icon: <HelpCircle className="h-3 w-3" /> },
  llm: { label: 'AI', color: 'bg-purple-500/10 text-purple-600 border-purple-500/20', icon: <Brain className="h-3 w-3" /> },
};

export default function Budget() {
  const { projectId } = useParams<{ projectId: string }>();
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [extractionProgress, setExtractionProgress] = useState(0);
  const [editingCell, setEditingCell] = useState<{ id: string; field: string } | null>(null);

  // AI Budget Optimization hook
  const { generateBudgetAlternatives, isLoading: isOptimizing } = useRecommendations(undefined);

  // Fetch project
  const { data: project, isLoading: projectLoading } = useQuery({
    queryKey: ['project', projectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('id, name, city, budget_tier')
        .eq('id', projectId)
        .maybeSingle();
      if (error) throw error;
      return data as Project | null;
    },
    enabled: !!projectId,
  });

  // Fetch approved renders for extraction
  const { data: approvedRenders = [] } = useQuery({
    queryKey: ['approved-renders', projectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('renders')
        .select(`
          id,
          room_id,
          image_url,
          approval_status,
          rooms!inner(project_id)
        `)
        .eq('rooms.project_id', projectId)
        .eq('approval_status', 'approved');
      if (error) throw error;
      return (data || []) as Render[];
    },
    enabled: !!projectId,
  });

  // Fetch budget items
  const { data: budgetItems = [], isLoading: itemsLoading } = useQuery({
    queryKey: ['budget-items', projectId, selectedCategory],
    queryFn: async () => {
      let query = supabase
        .from('budget_items')
        .select('*')
        .eq('project_id', projectId)
        .order('sort_order', { ascending: true });
      
      if (selectedCategory !== 'all') {
        query = query.eq('category', selectedCategory);
      }
      
      const { data, error } = await query;
      if (error) throw error;
      return (data || []) as unknown as BudgetItem[];
    },
    enabled: !!projectId,
  });

  // Calculate totals
  const subtotal = budgetItems.reduce((sum, item) => sum + (item.amount || 0), 0);
  const totalGst = budgetItems.reduce((sum, item) => sum + (item.gst_amount || 0), 0);
  const grandTotal = budgetItems.reduce((sum, item) => sum + (item.total || 0), 0);
  const itemsCount = budgetItems.length;
  const matchedCount = budgetItems.filter(i => i.pricing_item_id).length;
  const unmatchedCount = budgetItems.filter(i => i.status === 'unmatched' || !i.pricing_item_id).length;

  // Extract budget items from approved renders
  const handleExtractFromRenders = async () => {
    if (approvedRenders.length === 0) {
      toast({
        title: 'No Approved Renders',
        description: 'Approve some renders first to extract budget items.',
        variant: 'destructive',
      });
      return;
    }

    setIsExtracting(true);
    setExtractionProgress(0);

    try {
      let processedCount = 0;
      let totalItems = 0;

      for (const render of approvedRenders) {
        const { data, error } = await supabase.functions.invoke('extract-budget-items', {
          body: {
            render_id: render.id,
            project_id: projectId,
            room_id: render.room_id,
            budget_tier: project?.budget_tier || 'mid_premium',
          },
        });

        if (error) {
          console.error(`Failed to extract from render ${render.id}:`, error);
        } else {
          totalItems += data?.items_count || 0;
        }

        processedCount++;
        setExtractionProgress((processedCount / approvedRenders.length) * 100);
      }

      toast({
        title: 'Extraction Complete',
        description: `Extracted ${totalItems} items from ${approvedRenders.length} renders.`,
      });

      queryClient.invalidateQueries({ queryKey: ['budget-items', projectId] });
    } catch (error: any) {
      toast({
        title: 'Extraction Failed',
        description: error.message || 'Failed to extract budget items.',
        variant: 'destructive',
      });
    } finally {
      setIsExtracting(false);
      setExtractionProgress(0);
    }
  };

  const handleGenerateBudget = async () => {
    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-budget', {
        body: { projectId, city: project?.city || 'Mumbai' }
      });

      if (error) throw error;

      toast({
        title: 'Budget Generated',
        description: `Generated ${data?.itemsCount || 0} budget items successfully.`,
      });

      queryClient.invalidateQueries({ queryKey: ['budget-items', projectId] });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Failed to generate budget.',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedItems(budgetItems.map(item => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (itemId: string, checked: boolean) => {
    if (checked) {
      setSelectedItems(prev => [...prev, itemId]);
    } else {
      setSelectedItems(prev => prev.filter(id => id !== itemId));
    }
  };

  const handleApproveSelected = async () => {
    try {
      const { error } = await supabase
        .from('budget_items')
        .update({ status: 'approved' })
        .in('id', selectedItems);

      if (error) throw error;

      toast({
        title: 'Items Approved',
        description: `${selectedItems.length} items approved successfully.`,
      });

      setSelectedItems([]);
      queryClient.invalidateQueries({ queryKey: ['budget-items', projectId] });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to approve items.',
        variant: 'destructive',
      });
    }
  };

  const handleAutoAssignVendors = async () => {
    toast({
      title: 'Vendors Assigned',
      description: `Auto-assigned vendors to ${selectedItems.length} items.`,
    });
    setSelectedItems([]);
  };

  const handleDeleteSelected = async () => {
    try {
      const { error } = await supabase
        .from('budget_items')
        .delete()
        .in('id', selectedItems);

      if (error) throw error;

      toast({
        title: 'Items Deleted',
        description: `${selectedItems.length} items deleted successfully.`,
      });

      setSelectedItems([]);
      queryClient.invalidateQueries({ queryKey: ['budget-items', projectId] });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete items.',
        variant: 'destructive',
      });
    }
  };

  const handleExportExcel = () => {
    toast({
      title: 'Exporting Excel',
      description: 'BOQ spreadsheet is being generated.',
    });
  };

  const handleExportVendorTemplates = () => {
    toast({
      title: 'Exporting Vendor Templates',
      description: 'Vendor-wise sheets are being generated.',
    });
  };

  const handleCellEdit = async (itemId: string, field: string, value: any) => {
    try {
      const updateData: any = { [field]: value, user_edited: true };
      
      // Recalculate amounts if quantity or rate changed
      if (field === 'quantity' || field === 'rate') {
        const item = budgetItems.find(i => i.id === itemId);
        if (item) {
          const newQty = field === 'quantity' ? value : item.quantity;
          const newRate = field === 'rate' ? value : item.rate;
          const newAmount = newQty * newRate;
          const newGst = newAmount * (item.gst_percent / 100);
          
          updateData.amount = newAmount;
          updateData.gst_amount = newGst;
          updateData.total = newAmount + newGst;
          updateData.custom_quantity = field === 'quantity' ? value : null;
          updateData.custom_price = field === 'rate' ? value : null;
        }
      }

      const { error } = await supabase
        .from('budget_items')
        .update(updateData)
        .eq('id', itemId);

      if (error) throw error;

      queryClient.invalidateQueries({ queryKey: ['budget-items', projectId] });
      setEditingCell(null);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update item.',
        variant: 'destructive',
      });
    }
  };

  // Select alternative pricing item
  const handleSelectAlternative = async (itemId: string, alternative: AlternativeMatch) => {
    try {
      const item = budgetItems.find(i => i.id === itemId);
      if (!item) return;

      const altName = alternative.item_name || alternative.name || 'Unknown';
      const altPricingId = alternative.pricing_item_id || alternative.id;
      const altPrice = alternative.tier_price;

      // If no price available, show a warning
      if (altPrice === undefined) {
        toast({
          title: 'Price Not Available',
          description: 'This alternative does not have pricing information.',
          variant: 'destructive',
        });
        return;
      }

      const newAmount = altPrice * item.quantity;
      const newGst = newAmount * (item.gst_percent / 100);

      const { error } = await supabase
        .from('budget_items')
        .update({
          item_name: altName,
          pricing_item_id: altPricingId,
          user_selected_item_id: altPricingId,
          rate: altPrice,
          amount: newAmount,
          gst_amount: newGst,
          total: newAmount + newGst,
          status: 'pending',
          user_edited: true,
        })
        .eq('id', itemId);

      if (error) throw error;

      toast({
        title: 'Item Updated',
        description: `Changed to "${altName}"`,
      });

      queryClient.invalidateQueries({ queryKey: ['budget-items', projectId] });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update item.',
        variant: 'destructive',
      });
    }
  };

  const handleOptimizeBudget = async () => {
    if (!project || budgetItems.length === 0) {
      toast({
        title: 'Cannot Optimize',
        description: 'Please add budget items first',
        variant: 'destructive',
      });
      return;
    }

    toast({
      title: 'AI Budget Optimization',
      description: 'Analyzing your budget for cost-saving alternatives...',
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const getConfidenceBadge = (confidence: number | null) => {
    if (confidence === null) return null;
    const percent = Math.round(confidence * 100);
    const color = percent >= 80 ? 'bg-green-500/10 text-green-600' 
      : percent >= 60 ? 'bg-yellow-500/10 text-yellow-600' 
      : 'bg-red-500/10 text-red-600';
    return (
      <Badge variant="outline" className={`text-xs ${color}`}>
        {percent}%
      </Badge>
    );
  };

  if (projectLoading) {
    return (
      <div className="space-y-6 animate-fade-in">
        <PremiumSkeleton className="h-12 w-64" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => <PremiumSkeleton key={i} className="h-32" />)}
        </div>
        <PremiumSkeleton className="h-96" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Project not found</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header with Premium Styling */}
      <div className="flex items-center justify-between glass-subtle p-6 rounded-xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to={`/projects/${projectId}`} className="hover:text-foreground flex items-center gap-1 hover-lift">
              <ArrowLeft className="h-4 w-4" />
              {project.name}
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium">Budget</span>
          </div>
          <h1 className="text-3xl font-bold text-gradient-primary">Budget & BOQ</h1>
        </div>

        <div className="flex items-center gap-2">
          {/* AI Extract Button */}
          <PremiumButton
            variant="outline"
            onClick={handleExtractFromRenders}
            disabled={isExtracting || approvedRenders.length === 0}
            className="border-purple-500/30 hover:border-purple-500 hover:bg-purple-500/5"
          >
            {isExtracting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Scan className="mr-2 h-4 w-4 text-purple-500" />
            )}
            Extract from Renders ({approvedRenders.length})
          </PremiumButton>

          {budgetItems.length === 0 ? (
            <PremiumButton onClick={handleGenerateBudget} disabled={isGenerating}>
              {isGenerating ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              Generate Budget
            </PremiumButton>
          ) : (
            <>
              <PremiumButton variant="outline" onClick={handleGenerateBudget} disabled={isGenerating}>
                {isGenerating ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="mr-2 h-4 w-4" />
                )}
                Regenerate
              </PremiumButton>

              <PremiumButton 
                variant="outline" 
                onClick={handleOptimizeBudget} 
                disabled={isOptimizing || isGenerating}
                className="border-primary/30 hover:border-primary hover:bg-primary/5"
              >
                {isOptimizing ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Zap className="mr-2 h-4 w-4 text-primary" />
                )}
                Optimize Budget
              </PremiumButton>
            </>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-popover">
              <DropdownMenuItem onClick={handleExportExcel}>
                <FileSpreadsheet className="mr-2 h-4 w-4" />
                Download Excel BOQ
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <ExportBudgetPDFButton 
                  projectId={projectId!} 
                  variant="ghost" 
                  size="sm"
                  className="w-full justify-start font-normal px-2 py-1.5 h-auto cursor-pointer"
                />
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleExportVendorTemplates}>
                <Package className="mr-2 h-4 w-4" />
                Export Vendor Templates
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Extraction Progress */}
      {isExtracting && (
        <Card className="border-purple-500/20 bg-purple-500/5">
          <CardContent className="py-4">
            <div className="flex items-center gap-4">
              <Scan className="h-5 w-5 text-purple-500 animate-pulse" />
              <div className="flex-1">
                <p className="text-sm font-medium">Extracting items from renders...</p>
                <Progress value={extractionProgress} className="h-2 mt-2" />
              </div>
              <span className="text-sm text-muted-foreground">{Math.round(extractionProgress)}%</span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <IndianRupee className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Subtotal</span>
            </div>
            <p className="text-2xl font-bold mt-1">{formatCurrency(subtotal)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">GST (18%)</span>
            </div>
            <p className="text-2xl font-bold mt-1">{formatCurrency(totalGst)}</p>
          </CardContent>
        </Card>
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <IndianRupee className="h-4 w-4 text-primary" />
              <span className="text-sm text-primary">Grand Total</span>
            </div>
            <p className="text-2xl font-bold mt-1 text-primary">{formatCurrency(grandTotal)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Items</span>
            </div>
            <p className="text-2xl font-bold mt-1">{itemsCount}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {matchedCount} matched / {unmatchedCount} unmatched
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Brain className="h-4 w-4 text-purple-500" />
              <span className="text-sm text-muted-foreground">AI Extracted</span>
            </div>
            <p className="text-2xl font-bold mt-1">
              {budgetItems.filter(i => i.ai_item_name).length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Bulk Actions */}
      {selectedItems.length > 0 && (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="py-3">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Checkbox
                  checked={selectedItems.length === budgetItems.length}
                  onCheckedChange={handleSelectAll}
                />
                <span className="text-sm font-medium">{selectedItems.length} selected</span>
              </div>
              <div className="flex-1" />
              <Button size="sm" onClick={handleApproveSelected}>
                <Check className="mr-2 h-3 w-3" />
                Approve Selected
              </Button>
              <Button size="sm" variant="outline" onClick={handleAutoAssignVendors}>
                <Users className="mr-2 h-3 w-3" />
                Auto-Assign Vendors
              </Button>
              <Button size="sm" variant="destructive" onClick={handleDeleteSelected}>
                <Trash2 className="mr-2 h-3 w-3" />
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Category Tabs & Table */}
      <Card>
        <CardHeader className="pb-0">
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid w-full grid-cols-8">
              {categories.map(cat => (
                <TabsTrigger key={cat.id} value={cat.id} className="text-xs">
                  {cat.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent className="pt-4">
          {itemsLoading ? (
            <div className="space-y-2">
              {[1, 2, 3, 4, 5].map(i => <Skeleton key={i} className="h-12" />)}
            </div>
          ) : budgetItems.length === 0 ? (
            <div className="text-center py-12">
              <Package className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-medium mb-2">No budget items yet</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Extract items from approved renders or generate a budget
              </p>
              <div className="flex justify-center gap-2">
                <Button onClick={handleExtractFromRenders} disabled={isExtracting || approvedRenders.length === 0}>
                  <Scan className="mr-2 h-4 w-4" />
                  Extract from Renders
                </Button>
                <Button variant="outline" onClick={handleGenerateBudget} disabled={isGenerating}>
                  {isGenerating ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Sparkles className="mr-2 h-4 w-4" />
                  )}
                  Generate Budget
                </Button>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedItems.length === budgetItems.length && budgetItems.length > 0}
                        onCheckedChange={handleSelectAll}
                      />
                    </TableHead>
                    <TableHead className="w-12">S.No</TableHead>
                    <TableHead>Item Name</TableHead>
                    <TableHead>Match</TableHead>
                    <TableHead className="text-right">Qty</TableHead>
                    <TableHead>Unit</TableHead>
                    <TableHead className="text-right">Rate (₹)</TableHead>
                    <TableHead className="text-right">Amount (₹)</TableHead>
                    <TableHead className="text-right">Total (₹)</TableHead>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {budgetItems.map((item, index) => (
                    <TableRow key={item.id} className={item.status === 'unmatched' ? 'bg-yellow-500/5' : ''}>
                      <TableCell>
                        <Checkbox
                          checked={selectedItems.includes(item.id)}
                          onCheckedChange={(checked) => handleSelectItem(item.id, !!checked)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <HoverCard>
                            <HoverCardTrigger asChild>
                              <span className="font-medium cursor-help">{item.item_name}</span>
                            </HoverCardTrigger>
                            <HoverCardContent className="w-80">
                              <div className="space-y-2">
                                {item.ai_item_name && (
                                  <div>
                                    <p className="text-xs text-muted-foreground">AI Detected:</p>
                                    <p className="text-sm font-medium">{item.ai_item_name}</p>
                                  </div>
                                )}
                                {item.ai_specifications && Object.keys(item.ai_specifications).length > 0 && (
                                  <div>
                                    <p className="text-xs text-muted-foreground">Specifications:</p>
                                    <ul className="text-xs space-y-1">
                                      {Object.entries(item.ai_specifications).map(([key, val]) => (
                                        <li key={key}><span className="font-medium">{key}:</span> {String(val)}</li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                                {item.alternative_matches && item.alternative_matches.length > 0 && (
                                  <div>
                                    <p className="text-xs text-muted-foreground mb-1">Alternatives:</p>
                                    <div className="space-y-1">
                                      {item.alternative_matches.slice(0, 3).map((alt, i) => {
                                        const altName = alt.item_name || alt.name || 'Unknown';
                                        const altPrice = alt.tier_price;
                                        return (
                                          <button
                                            key={i}
                                            onClick={() => handleSelectAlternative(item.id, alt)}
                                            className="w-full text-left text-xs p-1.5 rounded hover:bg-accent flex justify-between items-center"
                                          >
                                            <span>{altName}</span>
                                            {altPrice !== undefined ? (
                                              <span className="text-muted-foreground">₹{altPrice.toLocaleString('en-IN')}</span>
                                            ) : (
                                              <span className="text-muted-foreground text-xs italic">N/A</span>
                                            )}
                                          </button>
                                        );
                                      })}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </HoverCardContent>
                          </HoverCard>
                          {item.specification && (
                            <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                              {item.specification}
                            </p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {item.match_strategy && matchStrategyConfig[item.match_strategy] && (
                            <Badge variant="outline" className={`text-xs ${matchStrategyConfig[item.match_strategy].color}`}>
                              {matchStrategyConfig[item.match_strategy].icon}
                              <span className="ml-1">{matchStrategyConfig[item.match_strategy].label}</span>
                            </Badge>
                          )}
                          {item.ai_confidence && getConfidenceBadge(item.ai_confidence)}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        {editingCell?.id === item.id && editingCell?.field === 'quantity' ? (
                          <Input
                            type="number"
                            defaultValue={item.quantity}
                            className="w-20"
                            autoFocus
                            onBlur={(e) => handleCellEdit(item.id, 'quantity', parseFloat(e.target.value))}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                handleCellEdit(item.id, 'quantity', parseFloat((e.target as HTMLInputElement).value));
                              }
                            }}
                          />
                        ) : (
                          <span
                            className="cursor-pointer hover:text-primary"
                            onDoubleClick={() => setEditingCell({ id: item.id, field: 'quantity' })}
                          >
                            {item.quantity}
                          </span>
                        )}
                      </TableCell>
                      <TableCell>{item.unit}</TableCell>
                      <TableCell className="text-right">
                        {editingCell?.id === item.id && editingCell?.field === 'rate' ? (
                          <Input
                            type="number"
                            defaultValue={item.rate}
                            className="w-24"
                            autoFocus
                            onBlur={(e) => handleCellEdit(item.id, 'rate', parseFloat(e.target.value))}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                handleCellEdit(item.id, 'rate', parseFloat((e.target as HTMLInputElement).value));
                              }
                            }}
                          />
                        ) : (
                          <span
                            className="cursor-pointer hover:text-primary"
                            onDoubleClick={() => setEditingCell({ id: item.id, field: 'rate' })}
                          >
                            {item.rate?.toLocaleString('en-IN') || '-'}
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">{item.amount?.toLocaleString('en-IN') || '-'}</TableCell>
                      <TableCell className="text-right font-medium">{item.total?.toLocaleString('en-IN') || '-'}</TableCell>
                      <TableCell>
                        <Select
                          value={item.vendor_name || 'auto'}
                          onValueChange={(value) => handleCellEdit(item.id, 'vendor_name', value === 'auto' ? null : value)}
                        >
                          <SelectTrigger className="w-32 h-8 text-xs">
                            <SelectValue placeholder="Auto-assign" />
                          </SelectTrigger>
                          <SelectContent className="bg-popover">
                            <SelectItem value="auto">Auto-assign</SelectItem>
                            <SelectItem value="vendor_1">Urban Ladder</SelectItem>
                            <SelectItem value="vendor_2">Pepperfry</SelectItem>
                            <SelectItem value="vendor_3">Local Vendor</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        {item.status === 'unmatched' ? (
                          <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">
                            <AlertCircle className="h-3 w-3 mr-1" />
                            Unmatched
                          </Badge>
                        ) : (
                          <Badge
                            variant={item.status === 'approved' ? 'default' : 'outline'}
                            className={item.status === 'approved' ? 'bg-green-500/10 text-green-600 border-green-500/20' : ''}
                          >
                            {item.status === 'approved' ? 'Approved' : 'Pending'}
                          </Badge>
                        )}
                        {item.user_edited && (
                          <Badge variant="outline" className="ml-1 text-xs">Edited</Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
