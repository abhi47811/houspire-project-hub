import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Upload, FileSpreadsheet, CheckCircle, AlertCircle, Loader2, Trash2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ImportResult {
  success: boolean;
  message?: string;
  error?: string;
  stats?: {
    totalParsed: number;
    inserted: number;
    skipped: number;
    sheets: number;
    errors: number;
  };
  errors?: string[];
  preview?: Array<{ name: string; category: string; midPrice: number }>;
}

export function PricingDataImport() {
  const [isUploading, setIsUploading] = useState(false);
  const [clearExisting, setClearExisting] = useState(false);
  const [result, setResult] = useState<ImportResult | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setSelectedFile(acceptedFiles[0]);
      setResult(null);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls'],
      'text/csv': ['.csv'],
    },
    maxFiles: 1,
    maxSize: 50 * 1024 * 1024, // 50MB max
  });

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('clearExisting', clearExisting.toString());

      const { data: { session } } = await supabase.auth.getSession();
      
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/import-pricing-data`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${session?.access_token || import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: formData,
        }
      );

      const data: ImportResult = await response.json();
      setResult(data);

      if (data.success) {
        toast.success(data.message || 'Import successful');
        setSelectedFile(null);
      } else {
        toast.error(data.error || 'Import failed');
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Upload failed';
      setResult({ success: false, error: message });
      toast.error(message);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileSpreadsheet className="h-5 w-5" />
          Import Pricing Data
        </CardTitle>
        <CardDescription>
          Upload Excel files (.xlsx, .xls) or CSV with real pricing data to replace placeholder items
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Dropzone */}
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
            transition-colors
            ${isDragActive ? 'border-primary bg-primary/5' : 'border-muted-foreground/25 hover:border-primary/50'}
          `}
        >
          <input {...getInputProps()} />
          <Upload className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
          {isDragActive ? (
            <p className="text-primary font-medium">Drop the file here...</p>
          ) : (
            <div>
              <p className="font-medium">Drag & drop an Excel file here</p>
              <p className="text-sm text-muted-foreground mt-1">
                or click to browse (.xlsx, .xls, .csv)
              </p>
            </div>
          )}
        </div>

        {/* Selected file */}
        {selectedFile && (
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div className="flex items-center gap-3">
              <FileSpreadsheet className="h-5 w-5 text-green-600" />
              <div>
                <p className="font-medium text-sm">{selectedFile.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(selectedFile.size / 1024).toFixed(1)} KB
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSelectedFile(null);
                setResult(null);
              }}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}

        {/* Options */}
        <div className="flex items-center space-x-2">
          <Switch
            id="clear-existing"
            checked={clearExisting}
            onCheckedChange={setClearExisting}
          />
          <Label htmlFor="clear-existing" className="text-sm">
            Clear existing pricing data before import
          </Label>
        </div>

        {/* Upload button */}
        <Button
          onClick={handleUpload}
          disabled={!selectedFile || isUploading}
          className="w-full"
        >
          {isUploading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Importing...
            </>
          ) : (
            <>
              <Upload className="h-4 w-4 mr-2" />
              Import Pricing Data
            </>
          )}
        </Button>

        {/* Progress/Results */}
        {isUploading && (
          <div className="space-y-2">
            <Progress value={undefined} className="h-2" />
            <p className="text-sm text-muted-foreground text-center">
              Processing Excel file...
            </p>
          </div>
        )}

        {result && (
          <div className={`p-4 rounded-lg ${result.success ? 'bg-green-50 dark:bg-green-950/30' : 'bg-red-50 dark:bg-red-950/30'}`}>
            <div className="flex items-start gap-3">
              {result.success ? (
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-600 mt-0.5" />
              )}
              <div className="flex-1">
                <p className={`font-medium ${result.success ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'}`}>
                  {result.success ? result.message : result.error}
                </p>

                {result.stats && (
                  <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
                    <div className="text-center p-2 bg-background rounded">
                      <p className="text-lg font-bold">{result.stats.totalParsed}</p>
                      <p className="text-xs text-muted-foreground">Parsed</p>
                    </div>
                    <div className="text-center p-2 bg-background rounded">
                      <p className="text-lg font-bold text-green-600">{result.stats.inserted}</p>
                      <p className="text-xs text-muted-foreground">Inserted</p>
                    </div>
                    <div className="text-center p-2 bg-background rounded">
                      <p className="text-lg font-bold">{result.stats.sheets}</p>
                      <p className="text-xs text-muted-foreground">Sheets</p>
                    </div>
                    <div className="text-center p-2 bg-background rounded">
                      <p className="text-lg font-bold text-yellow-600">{result.stats.skipped}</p>
                      <p className="text-xs text-muted-foreground">Skipped</p>
                    </div>
                  </div>
                )}

                {result.preview && result.preview.length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs font-medium mb-2">Sample imported items:</p>
                    <div className="space-y-1">
                      {result.preview.map((item, i) => (
                        <div key={i} className="flex items-center justify-between text-xs bg-background p-2 rounded">
                          <span className="truncate flex-1">{item.name}</span>
                          <Badge variant="outline" className="ml-2 text-xs">
                            {item.category}
                          </Badge>
                          <span className="ml-2 font-mono">₹{item.midPrice.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {result.errors && result.errors.length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs font-medium text-red-600 mb-1">Errors:</p>
                    <ul className="text-xs text-red-600 list-disc list-inside">
                      {result.errors.slice(0, 5).map((err, i) => (
                        <li key={i}>{err}</li>
                      ))}
                      {result.errors.length > 5 && (
                        <li>...and {result.errors.length - 5} more</li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="text-xs text-muted-foreground space-y-1 mt-4 p-3 bg-muted/50 rounded-lg">
          <p className="font-medium">Expected Excel format:</p>
          <ul className="list-disc list-inside space-y-0.5">
            <li>Columns: item_name, category, specification, unit, rate/price</li>
            <li>Optional: budget_price, mid_premium_price, premium_price</li>
            <li>Optional: city-specific prices (hyderabad, delhi, mumbai, etc.)</li>
            <li>Multiple sheets will all be processed</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
