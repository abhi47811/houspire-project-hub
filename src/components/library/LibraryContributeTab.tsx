import { useState } from 'react';
import { Upload, FileSpreadsheet, FolderOpen, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/hooks/use-toast';

const roomTypes = [
  { value: 'living_room', label: 'Living Room' },
  { value: 'master_bedroom', label: 'Master Bedroom' },
  { value: 'bedroom', label: 'Bedroom' },
  { value: 'kitchen', label: 'Kitchen' },
  { value: 'dining_room', label: 'Dining Room' },
  { value: 'balcony', label: 'Balcony' },
  { value: 'study_room', label: 'Study Room' },
  { value: 'kids_room', label: 'Kids Room' },
  { value: 'pooja_room', label: 'Pooja Room' },
  { value: 'home_office', label: 'Home Office' },
];

const designStyles = [
  { value: 'modern_indian', label: 'Modern Indian' },
  { value: 'contemporary', label: 'Contemporary' },
  { value: 'minimalist', label: 'Minimalist' },
  { value: 'scandinavian', label: 'Scandinavian' },
  { value: 'industrial', label: 'Industrial' },
  { value: 'bohemian', label: 'Bohemian' },
  { value: 'art_deco', label: 'Art Deco' },
  { value: 'traditional', label: 'Traditional Indian' },
  { value: 'tropical', label: 'Tropical' },
  { value: 'japandi', label: 'Japandi' },
  { value: 'rustic', label: 'Rustic' },
  { value: 'luxury', label: 'Luxury Modern' },
  { value: 'coastal', label: 'Coastal' },
];

const cities = [
  'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad', 
  'Pune', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Surat', 'Lucknow'
];

interface ContributionStats {
  total_contributions: number;
  featured_count: number;
  standard_count: number;
  avg_approval_rate: number;
  total_times_selected: number;
}

export function LibraryContributeTab() {
  const { user } = useAuth();
  const [uploadMode, setUploadMode] = useState<'single' | 'bulk' | 'csv' | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  
  // Single upload form
  const [singleUpload, setSingleUpload] = useState({
    roomType: '',
    designStyle: '',
    city: '',
    tags: '',
  });

  // Fetch user's contribution stats
  const { data: stats } = useQuery({
    queryKey: ['contribution-stats', user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      
      const { data, error } = await supabase
        .from('user_library_contributions')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();
      
      if (error) throw error;
      return data as ContributionStats | null;
    },
    enabled: !!user?.id,
  });

  const handleSingleUpload = async () => {
    if (!singleUpload.roomType || !singleUpload.designStyle) {
      toast({
        title: 'Missing Information',
        description: 'Please select room type and design style.',
        variant: 'destructive',
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => Math.min(prev + 10, 90));
    }, 200);

    try {
      // In a real app, this would upload to storage and catalog
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      clearInterval(interval);
      setUploadProgress(100);
      
      toast({
        title: 'Upload Successful',
        description: 'Your reference has been submitted for curation.',
      });
      
      // Reset form
      setSingleUpload({ roomType: '', designStyle: '', city: '', tags: '' });
      setUploadMode(null);
    } catch (error) {
      toast({
        title: 'Upload Failed',
        description: 'Failed to upload reference. Please try again.',
        variant: 'destructive',
      });
    } finally {
      clearInterval(interval);
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="space-y-6">
      {/* Contribution Stats */}
      {stats && (
        <Card>
          <CardHeader>
            <CardTitle>Your Contributions</CardTitle>
            <CardDescription>Track your library contributions and their performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <p className="text-2xl font-bold">{stats.total_contributions}</p>
                <p className="text-sm text-muted-foreground">Total Contributed</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <p className="text-2xl font-bold text-yellow-600">{stats.featured_count}</p>
                <p className="text-sm text-muted-foreground">Featured</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <p className="text-2xl font-bold">{stats.standard_count}</p>
                <p className="text-sm text-muted-foreground">Standard</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <p className="text-2xl font-bold text-green-600">
                  {stats.avg_approval_rate ? `${Math.round(stats.avg_approval_rate * 100)}%` : '-'}
                </p>
                <p className="text-sm text-muted-foreground">Avg Success</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/50">
                <p className="text-2xl font-bold">{stats.total_times_selected}</p>
                <p className="text-sm text-muted-foreground">Times Selected</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Upload Options */}
      {!uploadMode && (
        <div className="grid md:grid-cols-3 gap-4">
          <Card 
            className="cursor-pointer transition-all hover:shadow-lg hover:border-primary"
            onClick={() => setUploadMode('single')}
          >
            <CardContent className="pt-6 text-center space-y-4">
              <div className="h-16 w-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <Upload className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Single Upload</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Upload one reference image at a time
                </p>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer transition-all hover:shadow-lg hover:border-primary"
            onClick={() => setUploadMode('bulk')}
          >
            <CardContent className="pt-6 text-center space-y-4">
              <div className="h-16 w-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <FolderOpen className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Bulk Upload</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Upload multiple images at once
                </p>
              </div>
            </CardContent>
          </Card>

          <Card 
            className="cursor-pointer transition-all hover:shadow-lg hover:border-primary"
            onClick={() => setUploadMode('csv')}
          >
            <CardContent className="pt-6 text-center space-y-4">
              <div className="h-16 w-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                <FileSpreadsheet className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">CSV Import</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Import from spreadsheet with URLs
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Single Upload Form */}
      {uploadMode === 'single' && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Single Upload</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setUploadMode(null)}>
                Cancel
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h4 className="font-medium mb-2">Drop your image here</h4>
              <p className="text-sm text-muted-foreground mb-4">
                PNG, JPG, or WebP up to 10MB
              </p>
              <Button variant="outline">Select File</Button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Room Type *</Label>
                <Select
                  value={singleUpload.roomType}
                  onValueChange={(value) => setSingleUpload({ ...singleUpload, roomType: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select room type..." />
                  </SelectTrigger>
                  <SelectContent>
                    {roomTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Design Style *</Label>
                <Select
                  value={singleUpload.designStyle}
                  onValueChange={(value) => setSingleUpload({ ...singleUpload, designStyle: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select style..." />
                  </SelectTrigger>
                  <SelectContent>
                    {designStyles.map(style => (
                      <SelectItem key={style.value} value={style.value}>{style.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>City (Optional)</Label>
                <Select
                  value={singleUpload.city}
                  onValueChange={(value) => setSingleUpload({ ...singleUpload, city: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select city..." />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map(city => (
                      <SelectItem key={city} value={city}>{city}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Tags (Optional)</Label>
                <Input
                  placeholder="luxury, marble, gold accents"
                  value={singleUpload.tags}
                  onChange={(e) => setSingleUpload({ ...singleUpload, tags: e.target.value })}
                />
              </div>
            </div>

            {isUploading && (
              <div className="space-y-2">
                <Progress value={uploadProgress} />
                <p className="text-sm text-muted-foreground text-center">
                  {uploadProgress < 100 ? 'Uploading...' : 'Complete!'}
                </p>
              </div>
            )}

            <Button
              className="w-full"
              onClick={handleSingleUpload}
              disabled={isUploading}
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Reference
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Bulk Upload */}
      {uploadMode === 'bulk' && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Bulk Upload</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setUploadMode(null)}>
                Cancel
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              <FolderOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h4 className="font-medium mb-2">Drop multiple images here</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Select up to 50 images at once
              </p>
              <Button variant="outline">Select Files</Button>
            </div>

            <div className="bg-muted/50 rounded-lg p-4">
              <h4 className="font-medium mb-2">Bulk Upload Tips</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• AI will auto-detect room type and design style</li>
                <li>• You can review and edit before final submission</li>
                <li>• Duplicates will be automatically detected</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}

      {/* CSV Import */}
      {uploadMode === 'csv' && (
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>CSV Import</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => setUploadMode(null)}>
                Cancel
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="border-2 border-dashed rounded-lg p-8 text-center">
              <FileSpreadsheet className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h4 className="font-medium mb-2">Upload CSV file</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Include columns: image_url, room_type, design_style, city, tags
              </p>
              <Button variant="outline">Select CSV</Button>
            </div>

            <div className="bg-muted/50 rounded-lg p-4">
              <h4 className="font-medium mb-2">CSV Format</h4>
              <code className="text-xs block bg-background p-2 rounded">
                image_url,room_type,design_style,city,tags<br />
                https://...,living_room,modern_indian,Mumbai,"luxury,marble"
              </code>
              <Button variant="link" className="px-0 mt-2 h-auto text-sm">
                Download Template
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Contribution Guidelines */}
      <Card>
        <CardHeader>
          <CardTitle>Contribution Guidelines</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium">High-quality renders</p>
                  <p className="text-sm text-muted-foreground">1920x1080 or higher resolution</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium">Accurate categorization</p>
                  <p className="text-sm text-muted-foreground">Correct room type and style</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium">Original or licensed</p>
                  <p className="text-sm text-muted-foreground">You have rights to share</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                <div>
                  <p className="font-medium">No watermarks</p>
                  <p className="text-sm text-muted-foreground">Clean images only</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                <div>
                  <p className="font-medium">No duplicates</p>
                  <p className="text-sm text-muted-foreground">Auto-detected and rejected</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
                <div>
                  <p className="font-medium">No AI hallucinations</p>
                  <p className="text-sm text-muted-foreground">Realistic, usable references</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default LibraryContributeTab;
