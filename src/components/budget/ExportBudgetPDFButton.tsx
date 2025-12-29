import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Download, Loader2, FileText } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { generateBudgetPDF } from '@/lib/generateBudgetPDF';

interface ExportBudgetPDFButtonProps {
  projectId: string;
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  showIcon?: boolean;
  className?: string;
}

export function ExportBudgetPDFButton({ 
  projectId, 
  variant = 'outline',
  size = 'default',
  showIcon = true,
  className 
}: ExportBudgetPDFButtonProps) {
  const [exporting, setExporting] = useState(false);

  const handleExport = async () => {
    setExporting(true);
    toast.info('Generating PDF...');

    try {
      // Fetch project details
      const { data: project, error: projectError } = await supabase
        .from('projects')
        .select('name, client_name, city, created_at, budget_tier')
        .eq('id', projectId)
        .single();

      if (projectError) throw projectError;

      // Fetch budget items with room info
      const { data: budgetItems, error: itemsError } = await supabase
        .from('budget_items')
        .select(`
          category,
          item_name,
          specification,
          quantity,
          unit,
          rate,
          amount,
          gst_percent,
          gst_amount,
          total,
          vendor_name,
          room_id
        `)
        .eq('project_id', projectId)
        .order('category', { ascending: true })
        .order('sort_order', { ascending: true });

      if (itemsError) throw itemsError;

      if (!budgetItems || budgetItems.length === 0) {
        toast.error('No budget items found. Generate a budget first.');
        return;
      }

      // Transform data
      const items = budgetItems.map(item => ({
        category: item.category,
        item_name: item.item_name,
        specification: item.specification,
        quantity: item.quantity || 1,
        unit: item.unit || 'nos',
        rate: item.rate || 0,
        amount: item.amount || 0,
        gst_percent: item.gst_percent || 18,
        gst_amount: item.gst_amount || 0,
        total: item.total || 0,
        vendor_name: item.vendor_name
      }));

      const projectDetails = {
        name: project.name,
        client_name: project.client_name,
        city: project.city,
        created_at: project.created_at,
        budget_tier: project.budget_tier
      };

      // Generate PDF
      const pdf = generateBudgetPDF(projectDetails, items);

      // Download
      const filename = `Budget_${project.name.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(filename);

      toast.success('Budget PDF downloaded!');
    } catch (error: any) {
      console.error('PDF export failed:', error);
      toast.error(error.message || 'Failed to generate PDF');
    } finally {
      setExporting(false);
    }
  };

  return (
    <Button
      onClick={handleExport}
      disabled={exporting}
      variant={variant}
      size={size}
      className={className}
    >
      {exporting ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          {showIcon && <FileText className="mr-2 h-4 w-4" />}
          Download PDF Quote
        </>
      )}
    </Button>
  );
}
