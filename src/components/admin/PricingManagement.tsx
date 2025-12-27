import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { toast } from 'sonner';
import { Plus, Pencil, IndianRupee, Search, Upload } from 'lucide-react';

const CATEGORIES = ['flooring', 'paint', 'furniture', 'lighting', 'electrical', 'false_ceiling'];
const CITIES = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Surat', 'Lucknow'];

interface PricingItem {
  id: string;
  category: string;
  item_name: string;
  specification: string | null;
  unit: string;
  base_rate: number;
  city_multipliers: Record<string, number> | null;
}

export function PricingManagement() {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<PricingItem | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isMultipliersDialogOpen, setIsMultipliersDialogOpen] = useState(false);

  const [newItem, setNewItem] = useState({
    category: '',
    item_name: '',
    specification: '',
    unit: 'nos',
    base_rate: 0,
    city_multipliers: CITIES.reduce((acc, city) => ({ ...acc, [city]: 1.0 }), {} as Record<string, number>)
  });

  // Fetch pricing items
  const { data: pricingItems, isLoading } = useQuery({
    queryKey: ['admin-pricing', categoryFilter],
    queryFn: async () => {
      let query = supabase.from('pricing_reference').select('*').order('category', { ascending: true });

      if (categoryFilter !== 'all') {
        query = query.eq('category', categoryFilter);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as PricingItem[];
    }
  });

  // Add pricing item mutation
  const addItemMutation = useMutation({
    mutationFn: async (item: typeof newItem) => {
      const { error } = await supabase.from('pricing_reference').insert({
        category: item.category,
        item_name: item.item_name,
        specification: item.specification || null,
        unit: item.unit,
        base_rate: item.base_rate,
        city_multipliers: item.city_multipliers
      });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-pricing'] });
      toast.success('Pricing item added successfully');
      setIsAddDialogOpen(false);
      setNewItem({
        category: '',
        item_name: '',
        specification: '',
        unit: 'nos',
        base_rate: 0,
        city_multipliers: CITIES.reduce((acc, city) => ({ ...acc, [city]: 1.0 }), {} as Record<string, number>)
      });
    },
    onError: (error) => {
      toast.error(`Failed to add item: ${error.message}`);
    }
  });

  // Update pricing item mutation
  const updateItemMutation = useMutation({
    mutationFn: async (item: PricingItem) => {
      const { error } = await supabase
        .from('pricing_reference')
        .update({
          category: item.category,
          item_name: item.item_name,
          specification: item.specification,
          unit: item.unit,
          base_rate: item.base_rate,
          city_multipliers: item.city_multipliers
        })
        .eq('id', item.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-pricing'] });
      toast.success('Pricing item updated successfully');
      setIsEditDialogOpen(false);
      setEditingItem(null);
    },
    onError: (error) => {
      toast.error(`Failed to update item: ${error.message}`);
    }
  });

  const filteredItems = pricingItems?.filter(item =>
    item.item_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.specification?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCSVImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      try {
        const text = e.target?.result as string;
        const lines = text.split('\n');
        const headers = lines[0].split(',').map(h => h.trim().toLowerCase());

        const items = lines.slice(1).filter(line => line.trim()).map(line => {
          const values = line.split(',');
          return {
            category: values[headers.indexOf('category')] || 'other',
            item_name: values[headers.indexOf('item_name')] || values[headers.indexOf('name')] || '',
            specification: values[headers.indexOf('specification')] || null,
            unit: values[headers.indexOf('unit')] || 'nos',
            base_rate: parseFloat(values[headers.indexOf('base_rate')] || values[headers.indexOf('rate')] || '0'),
            city_multipliers: CITIES.reduce((acc, city) => ({ ...acc, [city]: 1.0 }), {} as Record<string, number>)
          };
        }).filter(item => item.item_name);

        if (items.length > 0) {
          const { error } = await supabase.from('pricing_reference').insert(items);
          if (error) throw error;
          queryClient.invalidateQueries({ queryKey: ['admin-pricing'] });
          toast.success(`Imported ${items.length} pricing items`);
        }
      } catch (error: any) {
        toast.error(`Import failed: ${error.message}`);
      }
    };
    reader.readAsText(file);
    event.target.value = '';
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map(i => <Skeleton key={i} className="h-12" />)}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <IndianRupee className="h-5 w-5" />
              Pricing Management
            </CardTitle>
            <CardDescription>Manage material pricing and city multipliers</CardDescription>
          </div>
          <div className="flex gap-2">
            <label htmlFor="csv-import">
              <Button variant="outline" className="gap-2" asChild>
                <span>
                  <Upload className="h-4 w-4" />
                  Import CSV
                </span>
              </Button>
              <input
                id="csv-import"
                type="file"
                accept=".csv"
                className="hidden"
                onChange={handleCSVImport}
              />
            </label>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Item
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Pricing Item</DialogTitle>
                  <DialogDescription>Add a new material or service to the pricing database</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div>
                    <Label>Category *</Label>
                    <Select
                      value={newItem.category}
                      onValueChange={(value) => setNewItem({ ...newItem, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map(cat => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Item Name *</Label>
                    <Input
                      value={newItem.item_name}
                      onChange={(e) => setNewItem({ ...newItem, item_name: e.target.value })}
                      placeholder="e.g., Vitrified Tiles 800x800"
                    />
                  </div>
                  <div>
                    <Label>Specification</Label>
                    <Input
                      value={newItem.specification}
                      onChange={(e) => setNewItem({ ...newItem, specification: e.target.value })}
                      placeholder="e.g., Double charged, glossy finish"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Unit</Label>
                      <Select
                        value={newItem.unit}
                        onValueChange={(value) => setNewItem({ ...newItem, unit: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="nos">nos</SelectItem>
                          <SelectItem value="sq ft">sq ft</SelectItem>
                          <SelectItem value="rmt">rmt</SelectItem>
                          <SelectItem value="set">set</SelectItem>
                          <SelectItem value="kg">kg</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Base Rate (₹)</Label>
                      <Input
                        type="number"
                        value={newItem.base_rate}
                        onChange={(e) => setNewItem({ ...newItem, base_rate: parseFloat(e.target.value) })}
                      />
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                  <Button
                    onClick={() => addItemMutation.mutate(newItem)}
                    disabled={!newItem.category || !newItem.item_name || addItemMutation.isPending}
                  >
                    {addItemMutation.isPending ? 'Adding...' : 'Add Item'}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Filters */}
        <div className="flex gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search items..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {CATEGORIES.map(cat => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Pricing Table */}
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Item Name</TableHead>
                <TableHead>Specification</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead className="text-right">Base Rate</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredItems?.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Badge variant="secondary">{item.category}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">{item.item_name}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {item.specification || '-'}
                  </TableCell>
                  <TableCell>{item.unit}</TableCell>
                  <TableCell className="text-right">₹{item.base_rate.toLocaleString()}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setEditingItem(item);
                        setIsEditDialogOpen(true);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredItems?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                    No pricing items found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Edit Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Pricing Item</DialogTitle>
            </DialogHeader>
            {editingItem && (
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Category</Label>
                    <Select
                      value={editingItem.category}
                      onValueChange={(value) => setEditingItem({ ...editingItem, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {CATEGORIES.map(cat => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Item Name</Label>
                    <Input
                      value={editingItem.item_name}
                      onChange={(e) => setEditingItem({ ...editingItem, item_name: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <Label>Specification</Label>
                  <Input
                    value={editingItem.specification || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, specification: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Unit</Label>
                    <Select
                      value={editingItem.unit}
                      onValueChange={(value) => setEditingItem({ ...editingItem, unit: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nos">nos</SelectItem>
                        <SelectItem value="sq ft">sq ft</SelectItem>
                        <SelectItem value="rmt">rmt</SelectItem>
                        <SelectItem value="set">set</SelectItem>
                        <SelectItem value="kg">kg</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Base Rate (₹)</Label>
                    <Input
                      type="number"
                      value={editingItem.base_rate}
                      onChange={(e) => setEditingItem({ ...editingItem, base_rate: parseFloat(e.target.value) })}
                    />
                  </div>
                </div>
                <div>
                  <Label className="mb-2 block">City Multipliers</Label>
                  <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto p-2 border rounded-md">
                    {CITIES.map(city => (
                      <div key={city} className="flex items-center gap-2">
                        <span className="text-sm w-20">{city}</span>
                        <Input
                          type="number"
                          step="0.01"
                          className="h-8"
                          value={(editingItem.city_multipliers as Record<string, number>)?.[city] || 1.0}
                          onChange={(e) => {
                            const multipliers = { ...(editingItem.city_multipliers || {}) };
                            multipliers[city] = parseFloat(e.target.value) || 1.0;
                            setEditingItem({ ...editingItem, city_multipliers: multipliers });
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
              <Button
                onClick={() => editingItem && updateItemMutation.mutate(editingItem)}
                disabled={updateItemMutation.isPending}
              >
                {updateItemMutation.isPending ? 'Saving...' : 'Save Changes'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
