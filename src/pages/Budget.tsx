import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
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
} from 'lucide-react';

interface BudgetItem {
  id: string;
  project_id: string;
  room_id: string | null;
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
  status: 'pending' | 'approved' | 'rejected';
  sort_order: number | null;
}

interface Project {
  id: string;
  name: string;
  city: string | null;
}

const categories = [
  { id: 'all', label: 'All Items' },
  { id: 'flooring', label: 'Flooring' },
  { id: 'wall_treatment', label: 'Wall Treatment' },
  { id: 'ceiling', label: 'Ceiling' },
  { id: 'furniture', label: 'Furniture' },
  { id: 'lighting', label: 'Lighting' },
  { id: 'fixtures', label: 'Fixtures' },
];

export default function Budget() {
  const { projectId } = useParams<{ projectId: string }>();
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [editingCell, setEditingCell] = useState<{ id: string; field: string } | null>(null);

  // Fetch project
  const { data: project, isLoading: projectLoading } = useQuery({
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
      return data as BudgetItem[];
    },
    enabled: !!projectId,
  });

  // Calculate totals
  const subtotal = budgetItems.reduce((sum, item) => sum + (item.amount || 0), 0);
  const totalGst = budgetItems.reduce((sum, item) => sum + (item.gst_amount || 0), 0);
  const grandTotal = budgetItems.reduce((sum, item) => sum + (item.total || 0), 0);
  const itemsCount = budgetItems.length;

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
    // Mock vendor assignment
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

  const handleExportPDF = () => {
    toast({
      title: 'Exporting PDF',
      description: 'Quote document is being generated.',
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
      const { error } = await supabase
        .from('budget_items')
        .update({ [field]: value })
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  if (projectLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-4 gap-4">
          {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-24" />)}
        </div>
        <Skeleton className="h-96" />
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to={`/projects/${projectId}`} className="hover:text-foreground flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" />
              {project.name}
            </Link>
            <span>/</span>
            <span>Budget</span>
          </div>
          <h1 className="text-2xl font-bold">Budget & BOQ</h1>
        </div>

        <div className="flex items-center gap-2">
          {budgetItems.length === 0 ? (
            <Button onClick={handleGenerateBudget} disabled={isGenerating}>
              {isGenerating ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              Generate Budget
            </Button>
          ) : (
            <Button variant="outline" onClick={handleGenerateBudget} disabled={isGenerating}>
              {isGenerating ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <RefreshCw className="mr-2 h-4 w-4" />
              )}
              Regenerate
            </Button>
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
              <DropdownMenuItem onClick={handleExportPDF}>
                <FileText className="mr-2 h-4 w-4" />
                Download PDF Quote
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleExportVendorTemplates}>
                <Package className="mr-2 h-4 w-4" />
                Export Vendor Templates
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
            <TabsList className="grid w-full grid-cols-7">
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
                Generate a budget from your completed room renders
              </p>
              <Button onClick={handleGenerateBudget} disabled={isGenerating}>
                {isGenerating ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Sparkles className="mr-2 h-4 w-4" />
                )}
                Generate Budget
              </Button>
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
                    <TableHead>Specification</TableHead>
                    <TableHead className="text-right">Qty</TableHead>
                    <TableHead>Unit</TableHead>
                    <TableHead className="text-right">Rate (₹)</TableHead>
                    <TableHead className="text-right">Amount (₹)</TableHead>
                    <TableHead className="text-right">GST (₹)</TableHead>
                    <TableHead className="text-right">Total (₹)</TableHead>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {budgetItems.map((item, index) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedItems.includes(item.id)}
                          onCheckedChange={(checked) => handleSelectItem(item.id, !!checked)}
                        />
                      </TableCell>
                      <TableCell className="font-medium">{index + 1}</TableCell>
                      <TableCell className="font-medium">{item.item_name}</TableCell>
                      <TableCell className="text-muted-foreground text-sm max-w-[200px] truncate">
                        {item.specification || '-'}
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
                            {item.rate.toLocaleString('en-IN')}
                          </span>
                        )}
                      </TableCell>
                      <TableCell className="text-right">{item.amount?.toLocaleString('en-IN')}</TableCell>
                      <TableCell className="text-right">{item.gst_amount?.toLocaleString('en-IN')}</TableCell>
                      <TableCell className="text-right font-medium">{item.total?.toLocaleString('en-IN')}</TableCell>
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
                        <Badge
                          variant={item.status === 'approved' ? 'default' : 'outline'}
                          className={item.status === 'approved' ? 'bg-green-500/10 text-green-600 border-green-500/20' : ''}
                        >
                          {item.status === 'approved' ? 'Approved' : 'Pending'}
                        </Badge>
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
