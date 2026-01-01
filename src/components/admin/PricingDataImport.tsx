import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Upload, 
  FileSpreadsheet, 
  CheckCircle, 
  AlertCircle, 
  Loader2, 
  Trash2, 
  Archive,
  FileText 
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface FileResult {
  name: string;
  items: number;
}

interface ImportResult {
  success: boolean;
  message?: string;
  error?: string;
  stats?: {
    totalParsed: number;
    uniqueItems: number;
    inserted: number;
    skipped: number;
    files: number;
    errors: number;
  };
  fileResults?: FileResult[];
  categoryCounts?: Record<string, number>;
  errors?: string[];
  preview?: Array<{ 
    name: string; 
    category: string; 
    unit: string;
    budgetPrice: number;
    midPrice: number; 
    premiumPrice: number;
    gst: number;
  }>;
}

export function PricingDataImport() {
  const [isUploading, setIsUploading] = useState(false);
  const [clearExisting, setClearExisting] = useState(true);
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
      'application/zip': ['.zip'],
      'application/x-zip-compressed': ['.zip'],
    },
    maxFiles: 1,
    maxSize: 100 * 1024 * 1024, // 100MB max for ZIP files
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

  const isZipFile = selectedFile?.name.toLowerCase().endsWith('.zip');

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileSpreadsheet className="h-5 w-5" />
          Import Pricing Data
        </CardTitle>
        <CardDescription>
          Upload Excel files or a ZIP containing multiple Excel files with real pricing data
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
              <p className="font-medium">Drag & drop your pricing files here</p>
              <p className="text-sm text-muted-foreground mt-1">
                Supports: .xlsx, .xls, .csv, or .zip containing Excel files
              </p>
            </div>
          )}
        </div>

        {/* Selected file */}
        {selectedFile && (
          <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
            <div className="flex items-center gap-3">
              {isZipFile ? (
                <Archive className="h-5 w-5 text-amber-600" />
              ) : (
                <FileSpreadsheet className="h-5 w-5 text-green-600" />
              )}
              <div>
                <p className="font-medium text-sm">{selectedFile.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  {isZipFile && ' (ZIP archive)'}
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
        <div className="flex items-center space-x-2 p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg border border-amber-200 dark:border-amber-900">
          <Switch
            id="clear-existing"
            checked={clearExisting}
            onCheckedChange={setClearExisting}
          />
          <Label htmlFor="clear-existing" className="text-sm">
            Clear existing pricing data before import (recommended for fresh data)
          </Label>
        </div>

        {/* Upload button */}
        <Button
          onClick={handleUpload}
          disabled={!selectedFile || isUploading}
          className="w-full"
          size="lg"
        >
          {isUploading ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              {isZipFile ? 'Extracting & Importing...' : 'Importing...'}
            </>
          ) : (
            <>
              <Upload className="h-4 w-4 mr-2" />
              Import Pricing Data
            </>
          )}
        </Button>

        {/* Progress */}
        {isUploading && (
          <div className="space-y-2">
            <Progress value={undefined} className="h-2" />
            <p className="text-sm text-muted-foreground text-center">
              {isZipFile ? 'Extracting ZIP and processing Excel files...' : 'Processing Excel file...'}
            </p>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className={`p-4 rounded-lg ${result.success ? 'bg-green-50 dark:bg-green-950/30' : 'bg-red-50 dark:bg-red-950/30'}`}>
            <div className="flex items-start gap-3">
              {result.success ? (
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
              ) : (
                <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <p className={`font-medium ${result.success ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'}`}>
                  {result.success ? result.message : result.error}
                </p>

                {result.stats && (
                  <div className="mt-3 grid grid-cols-3 sm:grid-cols-6 gap-2">
                    <div className="text-center p-2 bg-background rounded">
                      <p className="text-lg font-bold">{result.stats.files}</p>
                      <p className="text-xs text-muted-foreground">Files</p>
                    </div>
                    <div className="text-center p-2 bg-background rounded">
                      <p className="text-lg font-bold">{result.stats.totalParsed}</p>
                      <p className="text-xs text-muted-foreground">Parsed</p>
                    </div>
                    <div className="text-center p-2 bg-background rounded">
                      <p className="text-lg font-bold">{result.stats.uniqueItems}</p>
                      <p className="text-xs text-muted-foreground">Unique</p>
                    </div>
                    <div className="text-center p-2 bg-background rounded">
                      <p className="text-lg font-bold text-green-600">{result.stats.inserted}</p>
                      <p className="text-xs text-muted-foreground">Inserted</p>
                    </div>
                    <div className="text-center p-2 bg-background rounded">
                      <p className="text-lg font-bold text-yellow-600">{result.stats.skipped}</p>
                      <p className="text-xs text-muted-foreground">Skipped</p>
                    </div>
                    <div className="text-center p-2 bg-background rounded">
                      <p className="text-lg font-bold text-red-600">{result.stats.errors}</p>
                      <p className="text-xs text-muted-foreground">Errors</p>
                    </div>
                  </div>
                )}

                {/* Files processed */}
                {result.fileResults && result.fileResults.length > 1 && (
                  <div className="mt-3">
                    <p className="text-xs font-medium mb-2">Files processed:</p>
                    <div className="flex flex-wrap gap-1">
                      {result.fileResults.map((f, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          <FileText className="h-3 w-3 mr-1" />
                          {f.name.split('/').pop()} ({f.items})
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Category breakdown */}
                {result.categoryCounts && Object.keys(result.categoryCounts).length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs font-medium mb-2">Items by category:</p>
                    <div className="flex flex-wrap gap-1">
                      {Object.entries(result.categoryCounts)
                        .sort((a, b) => b[1] - a[1])
                        .slice(0, 12)
                        .map(([cat, count]) => (
                          <Badge key={cat} variant="secondary" className="text-xs">
                            {cat}: {count}
                          </Badge>
                        ))}
                    </div>
                  </div>
                )}

                {/* Preview */}
                {result.preview && result.preview.length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs font-medium mb-2">Sample imported items:</p>
                    <div className="space-y-1 max-h-48 overflow-y-auto">
                      {result.preview.map((item, i) => (
                        <div key={i} className="flex items-center justify-between text-xs bg-background p-2 rounded gap-2">
                          <span className="truncate flex-1 min-w-0">{item.name}</span>
                          <Badge variant="outline" className="shrink-0">
                            {item.category}
                          </Badge>
                          <span className="shrink-0 text-muted-foreground">{item.unit}</span>
                          <div className="shrink-0 text-right font-mono">
                            <span className="text-muted-foreground">₹{item.budgetPrice.toLocaleString()}</span>
                            <span className="mx-1">/</span>
                            <span className="font-semibold">₹{item.midPrice.toLocaleString()}</span>
                            <span className="mx-1">/</span>
                            <span className="text-muted-foreground">₹{item.premiumPrice.toLocaleString()}</span>
                          </div>
                          <span className="shrink-0 text-muted-foreground">+{item.gst}%</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {result.errors && result.errors.length > 0 && (
                  <div className="mt-3">
                    <p className="text-xs font-medium text-red-600 mb-1">Errors:</p>
                    <ul className="text-xs text-red-600 list-disc list-inside max-h-24 overflow-y-auto">
                      {result.errors.slice(0, 10).map((err, i) => (
                        <li key={i}>{err}</li>
                      ))}
                      {result.errors.length > 10 && (
                        <li>...and {result.errors.length - 10} more</li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="text-xs text-muted-foreground space-y-2 mt-4 p-3 bg-muted/50 rounded-lg">
          <p className="font-medium">Expected Excel format:</p>
          <ul className="list-disc list-inside space-y-0.5">
            <li><strong>Required:</strong> Item name column (item_name, name, description, material)</li>
            <li><strong>Prices:</strong> budget, mid/standard, premium columns OR single rate/price column</li>
            <li><strong>Optional:</strong> category, specification, unit (default: nos)</li>
            <li>Multiple sheets will be processed (sheet name used for sub-category)</li>
            <li>ZIP files: All .xlsx/.xls files inside will be extracted and imported</li>
          </ul>
          <div className="mt-2 pt-2 border-t border-muted-foreground/20">
            <p className="font-medium">City multipliers (applied automatically):</p>
            <p>Mumbai 1.25× | Delhi 1.20× | Bangalore 1.15× | Hyderabad/Chennai 1.10× | Pune 1.05× | Others 0.88-0.96×</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
