import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';
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
import { Plus, Pencil, CheckCircle, Search, Star, Building2 } from 'lucide-react';

const CATEGORIES = ['flooring', 'furniture', 'lighting', 'electrical', 'false_ceiling', 'paint'];
const CITIES = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 'Pune', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Surat', 'Lucknow'];

interface Vendor {
  id: string;
  business_name: string;
  contact_name: string | null;
  phone: string | null;
  email: string | null;
  city: string | null;
  categories: string[];
  is_verified: boolean;
  is_curated: boolean;
  rating: number | null;
  projects_completed: number | null;
  on_time_percentage: number | null;
  discount_percentage: number | null;
}

export function VendorManagement() {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [cityFilter, setCityFilter] = useState<string>('all');
  const [showCuratedOnly, setShowCuratedOnly] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingVendor, setEditingVendor] = useState<Vendor | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const [newVendor, setNewVendor] = useState({
    business_name: '',
    contact_name: '',
    phone: '',
    email: '',
    city: '',
    categories: [] as string[],
    is_verified: true,
    is_curated: true,
    rating: 4.5,
    discount_percentage: 10
  });

  // Fetch vendors
  const { data: vendors, isLoading } = useQuery({
    queryKey: ['admin-vendors', categoryFilter, cityFilter, showCuratedOnly],
    queryFn: async () => {
      let query = supabase.from('vendors').select('*').order('business_name');

      if (categoryFilter !== 'all') {
        query = query.contains('categories', [categoryFilter]);
      }
      if (cityFilter !== 'all') {
        query = query.eq('city', cityFilter);
      }
      if (showCuratedOnly) {
        query = query.eq('is_curated', true);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Vendor[];
    }
  });

  // Add vendor mutation
  const addVendorMutation = useMutation({
    mutationFn: async (vendor: typeof newVendor) => {
      const { error } = await supabase.from('vendors').insert({
        business_name: vendor.business_name,
        contact_name: vendor.contact_name || null,
        phone: vendor.phone || null,
        email: vendor.email || null,
        city: vendor.city || null,
        categories: vendor.categories,
        is_verified: vendor.is_verified,
        is_curated: vendor.is_curated,
        rating: vendor.rating,
        discount_percentage: vendor.discount_percentage
      });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-vendors'] });
      toast.success('Vendor added successfully');
      setIsAddDialogOpen(false);
      setNewVendor({
        business_name: '',
        contact_name: '',
        phone: '',
        email: '',
        city: '',
        categories: [],
        is_verified: true,
        is_curated: true,
        rating: 4.5,
        discount_percentage: 10
      });
    },
    onError: (error) => {
      toast.error(`Failed to add vendor: ${error.message}`);
    }
  });

  // Update vendor mutation
  const updateVendorMutation = useMutation({
    mutationFn: async (vendor: Vendor) => {
      const { error } = await supabase
        .from('vendors')
        .update({
          business_name: vendor.business_name,
          contact_name: vendor.contact_name,
          phone: vendor.phone,
          email: vendor.email,
          city: vendor.city,
          categories: vendor.categories,
          is_verified: vendor.is_verified,
          is_curated: vendor.is_curated,
          rating: vendor.rating,
          discount_percentage: vendor.discount_percentage
        })
        .eq('id', vendor.id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-vendors'] });
      toast.success('Vendor updated successfully');
      setIsEditDialogOpen(false);
      setEditingVendor(null);
    },
    onError: (error) => {
      toast.error(`Failed to update vendor: ${error.message}`);
    }
  });

  // Verify vendor mutation
  const verifyVendorMutation = useMutation({
    mutationFn: async (vendorId: string) => {
      const { error } = await supabase
        .from('vendors')
        .update({ is_verified: true })
        .eq('id', vendorId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-vendors'] });
      toast.success('Vendor verified successfully');
    }
  });

  const filteredVendors = vendors?.filter(vendor =>
    vendor.business_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    vendor.contact_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {[1, 2, 3, 4, 5].map(i => <Skeleton key={i} className="h-16" />)}
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
              <Building2 className="h-5 w-5" />
              Vendor Management
            </CardTitle>
            <CardDescription>Manage curated and verified vendors</CardDescription>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Vendor
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>Add New Vendor</DialogTitle>
                <DialogDescription>Add a curated vendor to the database</DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
                <div>
                  <Label>Business Name *</Label>
                  <Input
                    value={newVendor.business_name}
                    onChange={(e) => setNewVendor({ ...newVendor, business_name: e.target.value })}
                    placeholder="Vendor Business Name"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Contact Name</Label>
                    <Input
                      value={newVendor.contact_name}
                      onChange={(e) => setNewVendor({ ...newVendor, contact_name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Phone</Label>
                    <Input
                      value={newVendor.phone}
                      onChange={(e) => setNewVendor({ ...newVendor, phone: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={newVendor.email}
                    onChange={(e) => setNewVendor({ ...newVendor, email: e.target.value })}
                  />
                </div>
                <div>
                  <Label>City</Label>
                  <Select
                    value={newVendor.city}
                    onValueChange={(value) => setNewVendor({ ...newVendor, city: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select city" />
                    </SelectTrigger>
                    <SelectContent>
                      {CITIES.map(city => (
                        <SelectItem key={city} value={city}>{city}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Categories</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {CATEGORIES.map(cat => (
                      <Badge
                        key={cat}
                        variant={newVendor.categories.includes(cat) ? 'default' : 'outline'}
                        className="cursor-pointer"
                        onClick={() => {
                          const cats = newVendor.categories.includes(cat)
                            ? newVendor.categories.filter(c => c !== cat)
                            : [...newVendor.categories, cat];
                          setNewVendor({ ...newVendor, categories: cats });
                        }}
                      >
                        {cat}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Rating</Label>
                    <Input
                      type="number"
                      min="0"
                      max="5"
                      step="0.1"
                      value={newVendor.rating}
                      onChange={(e) => setNewVendor({ ...newVendor, rating: parseFloat(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label>Discount %</Label>
                    <Input
                      type="number"
                      min="0"
                      max="50"
                      value={newVendor.discount_percentage}
                      onChange={(e) => setNewVendor({ ...newVendor, discount_percentage: parseInt(e.target.value) })}
                    />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>Cancel</Button>
                <Button
                  onClick={() => addVendorMutation.mutate(newVendor)}
                  disabled={!newVendor.business_name || addVendorMutation.isPending}
                >
                  {addVendorMutation.isPending ? 'Adding...' : 'Add Vendor'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search vendors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {CATEGORIES.map(cat => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={cityFilter} onValueChange={setCityFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="City" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cities</SelectItem>
              {CITIES.map(city => (
                <SelectItem key={city} value={city}>{city}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex items-center gap-2">
            <Switch checked={showCuratedOnly} onCheckedChange={setShowCuratedOnly} />
            <Label>Curated Only</Label>
          </div>
        </div>

        {/* Vendors Table */}
        <div className="rounded-md border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Business Name</TableHead>
                <TableHead>City</TableHead>
                <TableHead>Categories</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredVendors?.map((vendor) => (
                <TableRow key={vendor.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{vendor.business_name}</div>
                      <div className="text-xs text-muted-foreground">{vendor.contact_name}</div>
                    </div>
                  </TableCell>
                  <TableCell>{vendor.city || '-'}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {vendor.categories.slice(0, 2).map(cat => (
                        <Badge key={cat} variant="secondary" className="text-xs">{cat}</Badge>
                      ))}
                      {vendor.categories.length > 2 && (
                        <Badge variant="outline" className="text-xs">+{vendor.categories.length - 2}</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                      {vendor.rating?.toFixed(1) || '-'}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {vendor.is_verified && <Badge variant="default" className="text-xs">Verified</Badge>}
                      {vendor.is_curated && <Badge variant="secondary" className="text-xs">Curated</Badge>}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      {!vendor.is_verified && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => verifyVendorMutation.mutate(vendor.id)}
                        >
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setEditingVendor(vendor);
                          setIsEditDialogOpen(true);
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredVendors?.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                    No vendors found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Edit Vendor Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Edit Vendor</DialogTitle>
            </DialogHeader>
            {editingVendor && (
              <div className="space-y-4 py-4 max-h-[60vh] overflow-y-auto">
                <div>
                  <Label>Business Name</Label>
                  <Input
                    value={editingVendor.business_name}
                    onChange={(e) => setEditingVendor({ ...editingVendor, business_name: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Contact Name</Label>
                    <Input
                      value={editingVendor.contact_name || ''}
                      onChange={(e) => setEditingVendor({ ...editingVendor, contact_name: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label>Phone</Label>
                    <Input
                      value={editingVendor.phone || ''}
                      onChange={(e) => setEditingVendor({ ...editingVendor, phone: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <Label>City</Label>
                  <Select
                    value={editingVendor.city || ''}
                    onValueChange={(value) => setEditingVendor({ ...editingVendor, city: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {CITIES.map(city => (
                        <SelectItem key={city} value={city}>{city}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Categories</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {CATEGORIES.map(cat => (
                      <Badge
                        key={cat}
                        variant={editingVendor.categories.includes(cat) ? 'default' : 'outline'}
                        className="cursor-pointer"
                        onClick={() => {
                          const cats = editingVendor.categories.includes(cat)
                            ? editingVendor.categories.filter(c => c !== cat)
                            : [...editingVendor.categories, cat];
                          setEditingVendor({ ...editingVendor, categories: cats });
                        }}
                      >
                        {cat}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Rating</Label>
                    <Input
                      type="number"
                      min="0"
                      max="5"
                      step="0.1"
                      value={editingVendor.rating || 0}
                      onChange={(e) => setEditingVendor({ ...editingVendor, rating: parseFloat(e.target.value) })}
                    />
                  </div>
                  <div>
                    <Label>Discount %</Label>
                    <Input
                      type="number"
                      value={editingVendor.discount_percentage || 0}
                      onChange={(e) => setEditingVendor({ ...editingVendor, discount_percentage: parseInt(e.target.value) })}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={editingVendor.is_verified}
                      onCheckedChange={(checked) => setEditingVendor({ ...editingVendor, is_verified: checked })}
                    />
                    <Label>Verified</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={editingVendor.is_curated}
                      onCheckedChange={(checked) => setEditingVendor({ ...editingVendor, is_curated: checked })}
                    />
                    <Label>Curated</Label>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>Cancel</Button>
              <Button
                onClick={() => editingVendor && updateVendorMutation.mutate(editingVendor)}
                disabled={updateVendorMutation.isPending}
              >
                {updateVendorMutation.isPending ? 'Saving...' : 'Save Changes'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
