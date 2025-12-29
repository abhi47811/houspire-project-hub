import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface BudgetItem {
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
  vendor_name: string | null;
  room_name?: string | null;
}

interface ProjectDetails {
  name: string;
  client_name: string | null;
  city: string | null;
  created_at: string;
  budget_tier: string | null;
}

export const generateBudgetPDF = (
  projectDetails: ProjectDetails,
  budgetItems: BudgetItem[]
): jsPDF => {
  const doc = new jsPDF();
  
  // Colors
  const primaryColor: [number, number, number] = [245, 131, 22]; // Houspire orange
  const darkGray: [number, number, number] = [51, 51, 51];
  const lightGray: [number, number, number] = [128, 128, 128];
  
  // Title
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...darkGray);
  doc.text('BUDGET ESTIMATE', 105, 25, { align: 'center' });
  
  // Subtitle line
  doc.setDrawColor(...primaryColor);
  doc.setLineWidth(1);
  doc.line(60, 30, 150, 30);
  
  // Project Details Box
  doc.setFillColor(249, 250, 251);
  doc.roundedRect(15, 40, 180, 35, 3, 3, 'F');
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...darkGray);
  doc.text('Project:', 20, 50);
  doc.text('Client:', 20, 58);
  doc.text('Location:', 20, 66);
  
  doc.text('Date:', 120, 50);
  doc.text('Tier:', 120, 58);
  
  doc.setFont('helvetica', 'normal');
  doc.text(projectDetails.name || 'N/A', 45, 50);
  doc.text(projectDetails.client_name || 'N/A', 45, 58);
  doc.text(projectDetails.city || 'N/A', 45, 66);
  
  const formattedDate = new Date(projectDetails.created_at).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
  doc.text(formattedDate, 145, 50);
  doc.text((projectDetails.budget_tier || 'Standard').toUpperCase(), 145, 58);
  
  // Group items by category
  const itemsByCategory = budgetItems.reduce((acc, item) => {
    const category = item.category || 'General';
    if (!acc[category]) acc[category] = [];
    acc[category].push(item);
    return acc;
  }, {} as Record<string, BudgetItem[]>);
  
  let yPosition = 85;
  let serialNo = 1;
  
  // For each category, create a section
  Object.entries(itemsByCategory).forEach(([category, items], categoryIndex) => {
    // Check if we need a new page
    if (yPosition > 250) {
      doc.addPage();
      yPosition = 20;
    }
    
    // Category heading
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...primaryColor);
    doc.text(category.replace('_', ' ').toUpperCase(), 15, yPosition);
    yPosition += 5;
    
    // Items table for this category
    const tableData = items.map(item => {
      const row = [
        serialNo++,
        item.item_name,
        item.specification || '-',
        item.quantity.toString(),
        item.unit,
        formatCurrency(item.rate),
        formatCurrency(item.amount),
        `${item.gst_percent}%`,
        formatCurrency(item.total)
      ];
      return row;
    });
    
    const categoryTotal = items.reduce((sum, item) => sum + (item.total || 0), 0);
    
    autoTable(doc, {
      startY: yPosition,
      head: [['#', 'Item', 'Specification', 'Qty', 'Unit', 'Rate', 'Amount', 'GST', 'Total']],
      body: tableData,
      foot: [[
        { content: `${category.replace('_', ' ')} Total`, colSpan: 8, styles: { halign: 'right', fontStyle: 'bold' } },
        { content: formatCurrency(categoryTotal), styles: { fontStyle: 'bold' } }
      ]],
      theme: 'striped',
      headStyles: { 
        fillColor: primaryColor,
        textColor: [255, 255, 255],
        fontStyle: 'bold',
        fontSize: 8
      },
      footStyles: { 
        fillColor: [240, 240, 240],
        textColor: darkGray,
        fontSize: 9
      },
      bodyStyles: {
        fontSize: 8,
        textColor: darkGray
      },
      columnStyles: {
        0: { cellWidth: 10, halign: 'center' },
        1: { cellWidth: 35 },
        2: { cellWidth: 35 },
        3: { cellWidth: 12, halign: 'right' },
        4: { cellWidth: 15 },
        5: { cellWidth: 20, halign: 'right' },
        6: { cellWidth: 22, halign: 'right' },
        7: { cellWidth: 12, halign: 'center' },
        8: { cellWidth: 25, halign: 'right' }
      },
      margin: { left: 15, right: 15 },
      didDrawPage: (data) => {
        // Add page header on subsequent pages
        if (data.pageNumber > 1) {
          doc.setFontSize(10);
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(...lightGray);
          doc.text(`${projectDetails.name} - Budget Estimate`, 15, 10);
        }
      }
    });
    
    yPosition = (doc as any).lastAutoTable.finalY + 10;
  });
  
  // Summary Section
  if (yPosition > 220) {
    doc.addPage();
    yPosition = 30;
  }
  
  const subtotal = budgetItems.reduce((sum, item) => sum + (item.amount || 0), 0);
  const totalGst = budgetItems.reduce((sum, item) => sum + (item.gst_amount || 0), 0);
  const grandTotal = budgetItems.reduce((sum, item) => sum + (item.total || 0), 0);
  
  // Summary box
  doc.setDrawColor(...primaryColor);
  doc.setLineWidth(0.5);
  doc.setFillColor(255, 250, 245);
  doc.roundedRect(100, yPosition, 95, 45, 3, 3, 'FD');
  
  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...darkGray);
  
  doc.text('Subtotal:', 105, yPosition + 12);
  doc.text(formatCurrency(subtotal), 190, yPosition + 12, { align: 'right' });
  
  doc.text('Total GST:', 105, yPosition + 22);
  doc.text(formatCurrency(totalGst), 190, yPosition + 22, { align: 'right' });
  
  doc.setDrawColor(...lightGray);
  doc.line(105, yPosition + 28, 190, yPosition + 28);
  
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(...primaryColor);
  doc.text('Grand Total:', 105, yPosition + 38);
  doc.text(formatCurrency(grandTotal), 190, yPosition + 38, { align: 'right' });
  
  yPosition += 55;
  
  // Terms & Conditions
  if (yPosition > 230) {
    doc.addPage();
    yPosition = 30;
  }
  
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...darkGray);
  doc.text('Terms & Conditions', 15, yPosition);
  
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...lightGray);
  
  const terms = [
    '1. Prices are subject to change based on material availability and market conditions.',
    '2. GST as applicable is charged separately as per government norms.',
    '3. 50% advance payment required to commence work.',
    '4. Balance payment due upon project completion.',
    '5. This estimate is valid for 30 days from date of issue.',
    '6. Actual costs may vary based on final measurements and material selection.',
    '7. Transportation charges may apply for locations outside city limits.',
    '8. Warranty terms as per manufacturer guidelines for individual products.'
  ];
  
  terms.forEach((term, i) => {
    doc.text(term, 15, yPosition + 8 + (i * 5));
  });
  
  // Footer on all pages
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    
    // Footer line
    doc.setDrawColor(...primaryColor);
    doc.setLineWidth(0.5);
    doc.line(15, 282, 195, 282);
    
    // Footer text
    doc.setFontSize(8);
    doc.setFont('helvetica', 'italic');
    doc.setTextColor(...lightGray);
    doc.text(`Page ${i} of ${pageCount}`, 105, 288, { align: 'center' });
    doc.text('Generated by Houspire - AI Interior Design Platform', 105, 293, { align: 'center' });
  }
  
  return doc;
};

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount || 0);
}
