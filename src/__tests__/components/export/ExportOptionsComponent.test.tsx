import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ExportOptionsComponent } from '../../../components/export/ExportOptionsComponent';

describe('ExportOptionsComponent', () => {
  const mockProjectData = {
    projectId: 'test-project-123',
    projectName: 'Test Living Room Design',
    roomType: 'living_room',
    style: 'Modern Indian',
    budget: {
      total: 500000,
      categories: {
        furniture: 200000,
        lighting: 50000,
        flooring: 100000
      }
    }
  };

  const mockOnExport = vi.fn();

  beforeEach(() => {
    mockOnExport.mockClear();
  });

  it('should render export options', () => {
    render(
      <ExportOptionsComponent 
        projectData={mockProjectData} 
        onExport={mockOnExport} 
      />
    );

    expect(screen.getByText(/Export/i)).toBeInTheDocument();
  });

  it('should display all export format options', () => {
    render(
      <ExportOptionsComponent 
        projectData={mockProjectData} 
        onExport={mockOnExport} 
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
        onExport={mockOnExport} 
      />
    );

    const pdfOption = screen.getByLabelText(/PDF/i);
    fireEvent.click(pdfOption);

    expect(pdfOption).toBeChecked();
  });

  it('should show export options checkboxes', () => {
    render(
      <ExportOptionsComponent 
        projectData={mockProjectData} 
        onExport={mockOnExport} 
      />
    );

    expect(screen.getByLabelText(/Include Images/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Include Budget/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Include Quality Score/i)).toBeInTheDocument();
  });

  it('should toggle export options', async () => {
    render(
      <ExportOptionsComponent 
        projectData={mockProjectData} 
        onExport={mockOnExport} 
      />
    );

    const includeImagesCheckbox = screen.getByLabelText(/Include Images/i);
    fireEvent.click(includeImagesCheckbox);

    expect(includeImagesCheckbox).toBeChecked();

    fireEvent.click(includeImagesCheckbox);
    expect(includeImagesCheckbox).not.toBeChecked();
  });

  it('should call onExport with correct parameters', async () => {
    render(
      <ExportOptionsComponent 
        projectData={mockProjectData} 
        onExport={mockOnExport} 
      />
    );

    const pdfOption = screen.getByLabelText(/PDF/i);
    fireEvent.click(pdfOption);

    const exportButton = screen.getByRole('button', { name: /Export/i });
    fireEvent.click(exportButton);

    await waitFor(() => {
      expect(mockOnExport).toHaveBeenCalledWith(
        expect.objectContaining({
          format: 'pdf'
        })
      );
    });
  });

  it('should disable export button when no format selected', () => {
    render(
      <ExportOptionsComponent 
        projectData={mockProjectData} 
        onExport={mockOnExport} 
      />
    );

    const exportButton = screen.getByRole('button', { name: /Export/i });
    expect(exportButton).toBeDisabled();
  });

  it('should show loading state during export', async () => {
    const slowExport = vi.fn(() => new Promise(resolve => setTimeout(resolve, 1000)));

    render(
      <ExportOptionsComponent 
        projectData={mockProjectData} 
        onExport={slowExport} 
      />
    );

    const pdfOption = screen.getByLabelText(/PDF/i);
    fireEvent.click(pdfOption);

    const exportButton = screen.getByRole('button', { name: /Export/i });
    fireEvent.click(exportButton);

    expect(screen.getByText(/Exporting/i)).toBeInTheDocument();
  });

  it('should show success message after export', async () => {
    render(
      <ExportOptionsComponent 
        projectData={mockProjectData} 
        onExport={mockOnExport} 
      />
    );

    const pdfOption = screen.getByLabelText(/PDF/i);
    fireEvent.click(pdfOption);

    const exportButton = screen.getByRole('button', { name: /Export/i });
    fireEvent.click(exportButton);

    await waitFor(() => {
      expect(screen.getByText(/Export Successful/i) || screen.getByText(/Downloaded/i)).toBeInTheDocument();
    });
  });

  it('should handle export errors gracefully', async () => {
    const failingExport = vi.fn(() => Promise.reject(new Error('Export failed')));

    render(
      <ExportOptionsComponent 
        projectData={mockProjectData} 
        onExport={failingExport} 
      />
    );

    const pdfOption = screen.getByLabelText(/PDF/i);
    fireEvent.click(pdfOption);

    const exportButton = screen.getByRole('button', { name: /Export/i });
    fireEvent.click(exportButton);

    await waitFor(() => {
      expect(screen.getByText(/Error/i) || screen.getByText(/Failed/i)).toBeInTheDocument();
    });
  });

  it('should show file size estimate for different formats', () => {
    render(
      <ExportOptionsComponent 
        projectData={mockProjectData} 
        onExport={mockOnExport} 
        showFileSizeEstimate 
      />
    );

    expect(screen.getByText(/Size/i) || screen.getByText(/MB/i)).toBeInTheDocument();
  });

  it('should allow multiple format selection for ZIP export', async () => {
    render(
      <ExportOptionsComponent 
        projectData={mockProjectData} 
        onExport={mockOnExport} 
        allowMultipleFormats 
      />
    );

    const pdfOption = screen.getByLabelText(/PDF/i);
    const excelOption = screen.getByLabelText(/Excel/i);

    fireEvent.click(pdfOption);
    fireEvent.click(excelOption);

    expect(pdfOption).toBeChecked();
    expect(excelOption).toBeChecked();
  });

  it('should show format-specific options', () => {
    render(
      <ExportOptionsComponent 
        projectData={mockProjectData} 
        onExport={mockOnExport} 
      />
    );

    const pdfOption = screen.getByLabelText(/PDF/i);
    fireEvent.click(pdfOption);

    expect(screen.getByText(/Page Size/i) || screen.getByText(/Orientation/i)).toBeInTheDocument();
  });
});
