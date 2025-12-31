/**
 * F-076: Export Options Component - Simplified
 */

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Download,
  FileText,
  FileSpreadsheet,
  File,
  Package,
  CheckCircle2,
  Loader2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';

interface ExportOptionsComponentProps {
  projectData: {
    project_name: string;
    rooms: Array<{ id: string; name?: string; [key: string]: unknown }>;
  };
  budgetData?: any[];
  className?: string;
}

export function ExportOptionsComponent({
  projectData,
  budgetData,
  className,
}: ExportOptionsComponentProps) {
  const [format, setFormat] = useState<'pdf' | 'excel' | 'csv' | 'zip'>('pdf');
  const [options, setOptions] = useState({
    include_budget: true,
    include_quality_scores: true,
    include_renders: true,
    include_specifications: false,
  });
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);

  const formats = [
    { id: 'pdf', name: 'PDF Report', description: 'Complete project report', icon: FileText },
    { id: 'excel', name: 'Excel', description: 'Budget breakdown', icon: FileSpreadsheet },
    { id: 'csv', name: 'CSV', description: 'Raw data export', icon: File },
    { id: 'zip', name: 'Package', description: 'All files', icon: Package },
  ];

  const handleExport = async () => {
    setIsExporting(true);
    setExportComplete(false);

    try {
      // Simulate export
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setExportComplete(true);
      toast({
        title: 'Export Successful',
        description: `${projectData.project_name}_${format.toUpperCase()} is ready`,
      });
    } catch (error) {
      toast({
        title: 'Export Failed',
        description: 'An error occurred during export',
        variant: 'destructive',
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Card className={cn('w-full', className)}>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-primary/10">
            <Download className="w-4 h-4 text-primary" />
          </div>
          <div>
            <CardTitle className="text-base">Export Project</CardTitle>
            <CardDescription className="text-xs">
              Download project data in various formats
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-3">
          <Label className="text-sm font-medium">Export Format</Label>
          <RadioGroup value={format} onValueChange={(v) => setFormat(v as typeof format)}>
            <div className="grid grid-cols-2 gap-3">
              {formats.map((fmt) => {
                const Icon = fmt.icon;
                return (
                  <div key={fmt.id} className="relative">
                    <RadioGroupItem value={fmt.id} id={fmt.id} className="peer sr-only" />
                    <Label
                      htmlFor={fmt.id}
                      className={cn(
                        'flex items-start gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all',
                        'hover:bg-accent hover:text-accent-foreground',
                        'peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary/5'
                      )}
                    >
                      <Icon className="w-5 h-5 mt-0.5 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm">{fmt.name}</div>
                        <div className="text-xs text-muted-foreground mt-0.5">{fmt.description}</div>
                      </div>
                    </Label>
                  </div>
                );
              })}
            </div>
          </RadioGroup>
        </div>

        <Separator />

        {(format === 'pdf' || format === 'zip') && (
          <div className="space-y-3">
            <Label className="text-sm font-medium">Include in Export</Label>
            <div className="space-y-2">
              {[
                { key: 'include_budget', label: 'Budget Breakdown' },
                { key: 'include_quality_scores', label: 'Quality Scores' },
                { key: 'include_renders', label: 'Render Images' },
                { key: 'include_specifications', label: 'Specifications' },
              ].map(({ key, label }) => (
                <div key={key} className="flex items-center space-x-2">
                  <Checkbox
                    id={key}
                    checked={options[key as keyof typeof options]}
                    onCheckedChange={(checked) => setOptions({ ...options, [key]: !!checked })}
                  />
                  <label htmlFor={key} className="text-sm cursor-pointer">{label}</label>
                </div>
              ))}
            </div>
          </div>
        )}

        <Button onClick={handleExport} disabled={isExporting} className="w-full" size="lg">
          {isExporting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Exporting...
            </>
          ) : (
            <>
              <Download className="w-4 h-4 mr-2" />
              Export {format.toUpperCase()}
            </>
          )}
        </Button>

        {exportComplete && (
          <Alert className="bg-green-500/10 border-green-500/20">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            <AlertDescription className="text-green-700 dark:text-green-400">
              Export complete! File is ready for download.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}
