/**
 * F-076: Export Options Component
 * 
 * UI for selecting export format and options
 * with preview and download functionality.
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
  FileImage,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  exportBudgetToExcel,
  exportBudgetToCSV,
  exportProjectToPDF,
  exportProjectPackage,
  exportImageWithWatermark,
  triggerDownload,
  type ExportOptions,
  type ExportResult,
} from '@/services/features/exportService';
import { toast } from '@/hooks/use-toast';

interface Room {
  id: string;
  name?: string;
  [key: string]: unknown;
}

interface BudgetItem {
  id: string;
  [key: string]: unknown;
}

interface ExportOptionsComponentProps {
  projectData: {
    project_name: string;
    rooms: Room[];
  };
  budgetData?: BudgetItem[];
  className?: string;
}

export function ExportOptionsComponent({
  projectData,
  budgetData,
  className,
}: ExportOptionsComponentProps) {
  const [format, setFormat] = useState<'pdf' | 'excel' | 'csv' | 'zip'>('pdf');
  const [options, setOptions] = useState<ExportOptions>({
    format: 'pdf',
    include_budget: true,
    include_quality_scores: true,
    include_renders: true,
    include_specifications: false,
  });
  const [isExporting, setIsExporting] = useState(false);
  const [exportResult, setExportResult] = useState<ExportResult | null>(null);

  const formats = [
    {
      id: 'pdf',
      name: 'PDF Report',
      description: 'Complete project report with budget and renders',
      icon: FileText,
    },
    {
      id: 'excel',
      name: 'Excel Spreadsheet',
      description: 'Detailed budget breakdown with formulas',
      icon: FileSpreadsheet,
    },
    {
      id: 'csv',
      name: 'CSV File',
      description: 'Budget data for external tools',
      icon: File,
    },
    {
      id: 'zip',
      name: 'Complete Package',
      description: 'ZIP archive with all project files',
      icon: Package,
    },
  ];

  const handleFormatChange = (newFormat: string) => {
    setFormat(newFormat as typeof format);
    setOptions({ ...options, format: newFormat as typeof format });
    setExportResult(null);
  };

  const handleOptionChange = (key: keyof ExportOptions, value: boolean) => {
    setOptions({ ...options, [key]: value });
  };

  const handleExport = async () => {
    setIsExporting(true);
    setExportResult(null);

    try {
      let result: ExportResult;

      switch (format) {
        case 'pdf':
          result = await exportProjectToPDF(projectData, options);
          break;
        case 'excel':
          if (!budgetData) {
            throw new Error('Budget data required for Excel export');
          }
          result = await exportBudgetToExcel(budgetData, projectData.project_name);
          break;
        case 'csv':
          if (!budgetData) {
            throw new Error('Budget data required for CSV export');
          }
          result = await exportBudgetToCSV(budgetData);
          break;
        case 'zip':
          result = await exportProjectPackage(projectData, options);
          break;
        default:
          throw new Error('Invalid export format');
      }

      setExportResult(result);

      if (result.success) {
        toast({
          title: 'Export Successful',
          description: `${result.file_name} is ready for download`,
        });

        // Trigger download if URL available
        if (result.file_url && result.file_name) {
          triggerDownload(result.file_url, result.file_name);
        }
      } else {
        toast({
          title: 'Export Failed',
          description: result.error || 'An error occurred during export',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Export error:', error);
      toast({
        title: 'Export Failed',
        description: error instanceof Error ? error.message : 'Unknown error',
        variant: 'destructive',
      });
    } finally {
      setIsExporting(false);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
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
        {/* Format Selection */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Export Format</Label>
          <RadioGroup value={format} onValueChange={handleFormatChange}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {formats.map((fmt) => {
                const Icon = fmt.icon;
                return (
                  <div key={fmt.id} className="relative">
                    <RadioGroupItem
                      value={fmt.id}
                      id={fmt.id}
                      className="peer sr-only"
                    />
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
                        <div className="text-xs text-muted-foreground mt-0.5">
                          {fmt.description}
                        </div>
                      </div>
                    </Label>
                  </div>
                );
              })}
            </div>
          </RadioGroup>
        </div>

        <Separator />

        {/* Export Options */}
        {(format === 'pdf' || format === 'zip') && (
          <>
            <div className="space-y-3">
              <Label className="text-sm font-medium">Include in Export</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="budget"
                    checked={options.include_budget}
                    onCheckedChange={(checked) =>
                      handleOptionChange('include_budget', checked as boolean)
                    }
                  />
                  <label
                    htmlFor="budget"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    Budget Breakdown
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="quality"
                    checked={options.include_quality_scores}
                    onCheckedChange={(checked) =>
                      handleOptionChange('include_quality_scores', checked as boolean)
                    }
                  />
                  <label
                    htmlFor="quality"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    Quality Scores
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="renders"
                    checked={options.include_renders}
                    onCheckedChange={(checked) =>
                      handleOptionChange('include_renders', checked as boolean)
                    }
                  />
                  <label
                    htmlFor="renders"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    Render Images
                  </label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="specs"
                    checked={options.include_specifications}
                    onCheckedChange={(checked) =>
                      handleOptionChange('include_specifications', checked as boolean)
                    }
                  />
                  <label
                    htmlFor="specs"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                  >
                    Design Specifications
                  </label>
                </div>
              </div>
            </div>
            <Separator />
          </>
        )}

        {/* Export Button */}
        <Button
          onClick={handleExport}
          disabled={isExporting}
          className="w-full"
          size="lg"
        >
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

        {/* Export Result */}
        {exportResult && exportResult.success && (
          <Alert className="bg-green-500/10 border-green-500/20">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            <AlertDescription>
              <div className="space-y-1">
                <div className="font-medium text-sm text-green-700 dark:text-green-400">
                  Export Complete
                </div>
                <div className="text-xs text-green-700 dark:text-green-400">
                  <div>{exportResult.file_name}</div>
                  {exportResult.file_size && (
                    <div className="text-[11px] mt-1">
                      Size: {formatFileSize(exportResult.file_size)}
                    </div>
                  )}
                </div>
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Format Info */}
        <div className="p-3 bg-muted/50 rounded-lg">
          <div className="text-xs text-muted-foreground">
            {format === 'pdf' && (
              <>
                <strong>PDF Report</strong> includes project overview, room details,
                budget breakdown, and renders gallery. Perfect for client presentations.
              </>
            )}
            {format === 'excel' && (
              <>
                <strong>Excel Spreadsheet</strong> includes detailed budget with
                formulas, category breakdown, and item-by-item costs. Ideal for
                financial planning.
              </>
            )}
            {format === 'csv' && (
              <>
                <strong>CSV File</strong> exports raw budget data that can be imported
                into accounting software or spreadsheet applications.
              </>
            )}
            {format === 'zip' && (
              <>
                <strong>Complete Package</strong> bundles all project files including
                budgets, specifications, renders, and quality reports.
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
