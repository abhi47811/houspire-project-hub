import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ExportOptionsComponent } from '../../../components/export/ExportOptionsComponent';

describe('ExportOptionsComponent', () => {
  const mockProjectData = {
    project_name: 'Test Living Room Design',
    rooms: [
      {
        id: 'room-1',
        room_type: 'living_room',
        style: 'Modern Indian',
      }
    ]
  };

  const mockBudgetData = {
    total: 500000,
    categories: {
      furniture: 200000,
      lighting: 50000,
      flooring: 100000
    }
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render export options', () => {
    render(
      <ExportOptionsComponent 
        projectData={mockProjectData} 
        budgetData={mockBudgetData}
      />
    );

    expect(screen.getByText(/Export/i)).toBeInTheDocument();
  });

  it('should display all export format options', () => {
    render(
      <ExportOptionsComponent 
        projectData={mockProjectData} 
        budgetData={mockBudgetData}
      />
    );

    expect(screen.getByText(/PDF/i)).toBeInTheDocument();
    expect(screen.getByText(/Excel/i)).toBeInTheDocument();
    expect(screen.getByText(/CSV/i)).toBeInTheDocument();
    expect(screen.getByText(/ZIP/i)).toBeInTheDocument();
  });

  it('should allow selecting export format', async () => {
    render(
      <ExportOptionsComponent 
        projectData={mockProjectData} 
        budgetData={mockBudgetData}
      />
    );

    const pdfOption = screen.getByRole('radio', { name: /PDF Report/i });
    fireEvent.click(pdfOption);

    expect(pdfOption).toBeChecked();
  });

  it('should show export options checkboxes for PDF format', () => {
    render(
      <ExportOptionsComponent 
        projectData={mockProjectData} 
        budgetData={mockBudgetData}
      />
    );

    // Select PDF format first to show options
    const pdfOption = screen.getByRole('radio', { name: /PDF Report/i });
    fireEvent.click(pdfOption);

    expect(screen.getByLabelText(/Budget Breakdown/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Quality Scores/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Render Images/i)).toBeInTheDocument();
  });

  it('should toggle export options', async () => {
    render(
      <ExportOptionsComponent 
        projectData={mockProjectData} 
        budgetData={mockBudgetData}
      />
    );

    // PDF is default, options should be visible
    const budgetCheckbox = screen.getByLabelText(/Budget Breakdown/i);
    
    // Default should be checked
    expect(budgetCheckbox).toBeChecked();
    
    fireEvent.click(budgetCheckbox);
    expect(budgetCheckbox).not.toBeChecked();
  });

  it('should have an export button', () => {
    render(
      <ExportOptionsComponent 
        projectData={mockProjectData} 
        budgetData={mockBudgetData}
      />
    );

    const exportButton = screen.getByRole('button', { name: /Export/i });
    expect(exportButton).toBeInTheDocument();
  });

  it('should show format-specific info text', () => {
    render(
      <ExportOptionsComponent 
        projectData={mockProjectData} 
        budgetData={mockBudgetData}
      />
    );

    // PDF is the default format
    expect(screen.getByText(/PDF Report/i)).toBeInTheDocument();
    expect(screen.getByText(/Complete project report/i)).toBeInTheDocument();
  });

  it('should update info text when format changes', () => {
    render(
      <ExportOptionsComponent 
        projectData={mockProjectData} 
        budgetData={mockBudgetData}
      />
    );

    const excelOption = screen.getByRole('radio', { name: /Excel Spreadsheet/i });
    fireEvent.click(excelOption);

    expect(screen.getByText(/Excel Spreadsheet/i)).toBeInTheDocument();
    expect(screen.getByText(/Detailed budget breakdown/i)).toBeInTheDocument();
  });

  it('should render with custom className', () => {
    const { container } = render(
      <ExportOptionsComponent 
        projectData={mockProjectData} 
        budgetData={mockBudgetData}
        className="custom-class"
      />
    );

    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });
});
