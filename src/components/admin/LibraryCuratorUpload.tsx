import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Upload, Loader2, Image as ImageIcon, RefreshCw, CheckCircle2, XCircle } from 'lucide-react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

const ROOM_TYPES = [
  { value: 'living_room', label: 'Living Room' },
  { value: 'master_bedroom', label: 'Master Bedroom' },
  { value: 'bedroom', label: 'Bedroom' },
  { value: 'guest_room', label: 'Guest Room' },
  { value: 'kids_room', label: 'Kids Room' },
  { value: 'kitchen', label: 'Kitchen' },
  { value: 'dining_room', label: 'Dining Room' },
  { value: 'bathroom', label: 'Bathroom' },
  { value: 'home_office', label: 'Home Office' },
  { value: 'study_room', label: 'Study Room' },
  { value: 'pooja_room', label: 'Pooja Room' },
  { value: 'balcony', label: 'Balcony' },
  { value: 'foyer', label: 'Entrance/Foyer' },
  { value: 'walk_in_closet', label: 'Walk-in Closet' },
  { value: 'utility_room', label: 'Utility/Laundry' },
  { value: 'entertainment_room', label: 'Entertainment Room' },
  { value: 'gym', label: 'Gym' },
];

const DESIGN_STYLES = [
  { value: 'modern_indian', label: 'Modern Indian ⭐' },
  { value: 'contemporary', label: 'Contemporary' },
  { value: 'minimalist', label: 'Minimalist' },
  { value: 'traditional_indian', label: 'Traditional Indian' },
  { value: 'transitional', label: 'Transitional' },
  { value: 'scandinavian', label: 'Scandinavian' },
  { value: 'industrial', label: 'Industrial' },
  { value: 'mid_century_modern', label: 'Mid-Century Modern' },
  { value: 'coastal', label: 'Coastal' },
  { value: 'bohemian', label: 'Bohemian' },
  { value: 'art_deco', label: 'Art Deco' },
  { value: 'rustic', label: 'Rustic' },
  { value: 'eclectic', label: 'Eclectic' },
  { value: 'tropical', label: 'Tropical' },
  { value: 'japandi', label: 'Japandi' },
  { value: 'farmhouse', label: 'Farmhouse' },
  { value: 'coastal_indian', label: 'Coastal Indian' },
];

const TIERS = [
  { value: 'unverified', label: 'Unverified' },
  { value: 'learning', label: 'Learning' },
  { value: 'standard', label: 'Standard' },
  { value: 'featured', label: 'Featured' },
];

const CITIES = [
  'Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Hyderabad',
  'Pune', 'Kolkata', 'Ahmedabad', 'Jaipur', 'Surat', 'Lucknow'
];

export function LibraryCuratorUpload() {
  const queryClient = useQueryClient();
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [roomType, setRoomType] = useState('');
  const [designStyle, setDesignStyle] = useState('');
  const [tier, setTier] = useState('standard');
  const [city, setCity] = useState('');
  const [uploadResults, setUploadResults] = useState<{ success: number; failed: number } | null>(null);

  // Load library statistics
  const { data: stats, refetch: refetchStats } = useQuery({
    queryKey: ['library-curator-stats'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('style_library')
        .select('room_type, design_style, tier, status');

      if (error) throw error;

      const total = data?.length || 0;
      const active = data?.filter(d => d.status === 'active').length || 0;
      
      const byRoom = data?.reduce((acc: Record<string, number>, item) => {
        acc[item.room_type] = (acc[item.room_type] || 0) + 1;
        return acc;
      }, {}) || {};

      const byStyle = data?.reduce((acc: Record<string, number>, item) => {
        acc[item.design_style] = (acc[item.design_style] || 0) + 1;
        return acc;
      }, {}) || {};

      const byTier = data?.reduce((acc: Record<string, number>, item) => {
        acc[item.tier || 'unverified'] = (acc[item.tier || 'unverified'] || 0) + 1;
        return acc;
      }, {}) || {};

      return { total, active, byRoom, byStyle, byTier };
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(e.target.files);
    setUploadResults(null);
  };

  const handleUpload = async () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      toast({
        title: 'No Files Selected',
        description: 'Please select images to upload',
        variant: 'destructive'
      });
      return;
    }

    if (!roomType || !designStyle) {
      toast({
        title: 'Missing Information',
        description: 'Please select room type and design style',
        variant: 'destructive'
      });
      return;
    }

    setUploading(true);
    setUploadProgress(0);
    let successCount = 0;
    let errorCount = 0;

    try {
      const totalFiles = selectedFiles.length;

      for (let i = 0; i < totalFiles; i++) {
        const file = selectedFiles[i];
        setUploadProgress(Math.round(((i) / totalFiles) * 100));

        try {
          // Upload to storage
          const fileName = `library/${designStyle}/${roomType}/${Date.now()}_${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`;
          const { data: uploadData, error: uploadError } = await supabase.storage
            .from('room-images')
            .upload(fileName, file, {
              contentType: file.type,
              upsert: false
            });

          if (uploadError) throw uploadError;

          // Get public URL
          const { data: urlData } = supabase.storage
            .from('room-images')
            .getPublicUrl(fileName);

          // Insert into style_library
          const { error: insertError } = await supabase
            .from('style_library')
            .insert({
              image_url: urlData.publicUrl,
              storage_path: fileName,
              room_type: roomType,
              design_style: designStyle,
              city: city && city !== 'any' ? city : null,
              tier: tier as 'unverified' | 'learning' | 'standard' | 'featured',
              source_type: 'user_upload',
              status: 'active',
              quality_score: 85,
              curator_verified: true,
              curator_verified_at: new Date().toISOString(),
              tags: [roomType.replace('_', ' '), designStyle.replace('_', ' ')],
            });

          if (insertError) throw insertError;

          successCount++;
        } catch (error) {
          console.error(`Failed to upload ${file.name}:`, error);
          errorCount++;
        }
      }

      setUploadProgress(100);
      setUploadResults({ success: successCount, failed: errorCount });

      toast({
        title: 'Upload Complete',
        description: `Successfully uploaded ${successCount} images. ${errorCount > 0 ? `${errorCount} failed.` : ''}`
      });

      // Reset form on success
      if (successCount > 0) {
        setSelectedFiles(null);
        // Reset file input
        const fileInput = document.getElementById('curator-file-input') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      }

      // Refresh stats
      refetchStats();
      queryClient.invalidateQueries({ queryKey: ['style-library'] });
      queryClient.invalidateQueries({ queryKey: ['library-count'] });

    } catch (error: any) {
      toast({
        title: 'Upload Failed',
        description: error.message,
        variant: 'destructive'
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Upload Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Upload className="h-5 w-5" />
            Curator Image Upload
          </CardTitle>
          <CardDescription>
            Upload curated reference images to the style library
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="curator-file-input">Select Images</Label>
              <Input
                id="curator-file-input"
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                disabled={uploading}
              />
              {selectedFiles && (
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <ImageIcon className="h-4 w-4" />
                  {selectedFiles.length} file(s) selected
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Room Type *</Label>
              <Select value={roomType} onValueChange={setRoomType} disabled={uploading}>
                <SelectTrigger>
                  <SelectValue placeholder="Select room type" />
                </SelectTrigger>
                <SelectContent>
                  {ROOM_TYPES.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Design Style *</Label>
              <Select value={designStyle} onValueChange={setDesignStyle} disabled={uploading}>
                <SelectTrigger>
                  <SelectValue placeholder="Select design style" />
                </SelectTrigger>
                <SelectContent>
                  {DESIGN_STYLES.map(style => (
                    <SelectItem key={style.value} value={style.value}>
                      {style.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>City (Optional)</Label>
              <Select value={city} onValueChange={setCity} disabled={uploading}>
                <SelectTrigger>
                  <SelectValue placeholder="Select city" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any City</SelectItem>
                  {CITIES.map(c => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Quality Tier</Label>
              <Select value={tier} onValueChange={setTier} disabled={uploading}>
                <SelectTrigger>
                  <SelectValue placeholder="Select tier" />
                </SelectTrigger>
                <SelectContent>
                  {TIERS.map(t => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {uploading && (
            <div className="space-y-2">
              <Progress value={uploadProgress} />
              <p className="text-sm text-muted-foreground text-center">
                Uploading... {uploadProgress}%
              </p>
            </div>
          )}

          {uploadResults && (
            <div className="flex items-center gap-4 p-3 rounded-lg bg-muted">
              {uploadResults.success > 0 && (
                <span className="flex items-center gap-1 text-green-600">
                  <CheckCircle2 className="h-4 w-4" />
                  {uploadResults.success} uploaded
                </span>
              )}
              {uploadResults.failed > 0 && (
                <span className="flex items-center gap-1 text-destructive">
                  <XCircle className="h-4 w-4" />
                  {uploadResults.failed} failed
                </span>
              )}
            </div>
          )}

          <Button
            onClick={handleUpload}
            disabled={uploading || !selectedFiles || selectedFiles.length === 0}
            className="w-full"
          >
            {uploading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Uploading...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Upload to Library
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Statistics Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Library Statistics</CardTitle>
            <Button variant="outline" size="sm" onClick={() => refetchStats()}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {stats && (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 rounded-lg bg-muted text-center">
                  <p className="text-2xl font-bold">{stats.total}</p>
                  <p className="text-sm text-muted-foreground">Total Images</p>
                </div>
                <div className="p-4 rounded-lg bg-muted text-center">
                  <p className="text-2xl font-bold">{stats.active}</p>
                  <p className="text-sm text-muted-foreground">Active</p>
                </div>
                <div className="p-4 rounded-lg bg-muted text-center">
                  <p className="text-2xl font-bold">{Object.keys(stats.byRoom).length}</p>
                  <p className="text-sm text-muted-foreground">Room Types</p>
                </div>
                <div className="p-4 rounded-lg bg-muted text-center">
                  <p className="text-2xl font-bold">{Object.keys(stats.byStyle).length}</p>
                  <p className="text-sm text-muted-foreground">Design Styles</p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <p className="font-medium text-sm">By Room Type</p>
                  <div className="space-y-1 max-h-48 overflow-auto">
                    {Object.entries(stats.byRoom)
                      .sort(([, a], [, b]) => (b as number) - (a as number))
                      .map(([room, count]) => (
                        <div key={room} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{room.replace(/_/g, ' ')}</span>
                          <Badge variant="secondary">{count as number}</Badge>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="font-medium text-sm">By Design Style</p>
                  <div className="space-y-1 max-h-48 overflow-auto">
                    {Object.entries(stats.byStyle)
                      .sort(([, a], [, b]) => (b as number) - (a as number))
                      .map(([style, count]) => (
                        <div key={style} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">{style.replace(/_/g, ' ')}</span>
                          <Badge variant="secondary">{count as number}</Badge>
                        </div>
                      ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="font-medium text-sm">By Tier</p>
                  <div className="space-y-1">
                    {Object.entries(stats.byTier)
                      .map(([tierName, count]) => (
                        <div key={tierName} className="flex justify-between text-sm">
                          <span className="text-muted-foreground capitalize">{tierName}</span>
                          <Badge variant="secondary">{count as number}</Badge>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}