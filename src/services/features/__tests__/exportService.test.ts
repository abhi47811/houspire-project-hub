import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ExportService } from '../exportService';
import type { ExportFormat, ExportOptions } from '../exportService';

describe('ExportService', () => {
  let service: ExportService;

  beforeEach(() => {
    service = new ExportService();
  });

  describe('Export Format Generation', () => {
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
          flooring: 100000,
          decorItems: 75000,
          fabric: 75000
        }
      },
      smartDefaults: {
        furniture: ['Sofa Set', 'Coffee Table', 'TV Unit'],
        lighting: 'Ambient + Task',
        flooring: 'Engineered Wood'
      },
      qualityScore: {
        totalScore: 87,
        grade: 'A',
        categories: {
          design: { score: 18, maxScore: 20 },
          functionality: { score: 22, maxScore: 25 },
          aesthetics: { score: 19, maxScore: 20 },
          budget: { score: 13, maxScore: 15 },
          technical: { score: 15, maxScore: 20 }
        }
      },
      architecturalElements: {
        doors: 2,
        windows: 3,
        builtIns: 1
      }
    };

    it('should generate PDF export data', async () => {
      const result = await service.exportToPDF(mockProjectData);

      expect(result).toBeDefined();
      expect(result.format).toBe('pdf');
      expect(result.filename).toContain('.pdf');
      expect(result.data).toBeDefined();
    });

    it('should generate Excel export data', async () => {
      const result = await service.exportToExcel(mockProjectData);

      expect(result).toBeDefined();
      expect(result.format).toBe('excel');
      expect(result.filename).toContain('.xlsx');
      expect(result.sheets).toBeDefined();
      expect(result.sheets.length).toBeGreaterThan(0);
    });

    it('should generate CSV export data', async () => {
      const result = await service.exportToCSV(mockProjectData);

      expect(result).toBeDefined();
      expect(result.format).toBe('csv');
      expect(result.filename).toContain('.csv');
      expect(result.data).toBeDefined();
      expect(typeof result.data).toBe('string');
    });

    it('should generate ZIP export with multiple files', async () => {
      const result = await service.exportToZIP(mockProjectData);

      expect(result).toBeDefined();
      expect(result.format).toBe('zip');
      expect(result.filename).toContain('.zip');
      expect(result.files).toBeDefined();
      expect(result.files.length).toBeGreaterThan(1);
    });
  });

  describe('Export Options', () => {
    it('should respect includeImages option', async () => {
      const mockData = {
        projectId: 'test-project',
        projectName: 'Test Project',
        images: ['image1.jpg', 'image2.jpg']
      };

      const withImages = await service.exportToZIP(mockData, {
        includeImages: true
      });

      const withoutImages = await service.exportToZIP(mockData, {
        includeImages: false
      });

      expect(withImages.files.length).toBeGreaterThan(withoutImages.files.length);
    });

    it('should include budget breakdown when specified', async () => {
      const mockData = {
        projectId: 'test-project',
        budget: {
          total: 500000,
          categories: {
            furniture: 200000,
            lighting: 50000
          }
        }
      };

      const result = await service.exportToPDF(mockData, {
        includeBudget: true
      });

      expect(result.data).toContain('Budget');
      expect(result.data).toContain('500000');
    });

    it('should include quality score when specified', async () => {
      const mockData = {
        projectId: 'test-project',
        qualityScore: {
          totalScore: 87,
          grade: 'A'
        }
      };

      const result = await service.exportToPDF(mockData, {
        includeQualityScore: true
      });

      expect(result.data).toContain('Quality Score');
      expect(result.data).toContain('87');
    });
  });

  describe('File Naming', () => {
    it('should generate unique filenames', async () => {
      const mockData = {
        projectId: 'test-project',
        projectName: 'Test Project'
      };

      const result1 = await service.exportToPDF(mockData);
      const result2 = await service.exportToPDF(mockData);

      expect(result1.filename).not.toBe(result2.filename);
    });

    it('should use project name in filename', async () => {
      const mockData = {
        projectId: 'test-project',
        projectName: 'My Living Room'
      };

      const result = await service.exportToPDF(mockData);

      expect(result.filename.toLowerCase()).toContain('living');
    });

    it('should sanitize filenames', async () => {
      const mockData = {
        projectId: 'test-project',
        projectName: 'Test/Project\\With:Special*Characters?'
      };

      const result = await service.exportToPDF(mockData);

      expect(result.filename).not.toMatch(/[/\\:*?"<>|]/);
    });
  });

  describe('Data Integrity', () => {
    it('should preserve all budget categories in export', async () => {
      const mockData = {
        projectId: 'test-project',
        budget: {
          total: 500000,
          categories: {
            furniture: 200000,
            lighting: 50000,
            flooring: 100000,
            decorItems: 75000,
            fabric: 75000
          }
        }
      };

      const result = await service.exportToExcel(mockData);

      const budgetSheet = result.sheets.find(s => s.name === 'Budget');
      expect(budgetSheet).toBeDefined();
      expect(budgetSheet?.rows.length).toBe(Object.keys(mockData.budget.categories).length + 1);
    });

    it('should handle missing optional data gracefully', async () => {
      const minimalData = {
        projectId: 'test-project',
        projectName: 'Minimal Project'
      };

      const result = await service.exportToPDF(minimalData);

      expect(result).toBeDefined();
      expect(result.data).toBeDefined();
    });

    it('should validate required fields', async () => {
      const invalidData = {};

      await expect(async () => {
        await service.exportToPDF(invalidData as any);
      }).rejects.toThrow();
    });
  });

  describe('Excel Workbook Structure', () => {
    it('should create multiple sheets for comprehensive export', async () => {
      const mockData = {
        projectId: 'test-project',
        projectName: 'Test Project',
        budget: { total: 500000, categories: { furniture: 200000 } },
        smartDefaults: { furniture: ['Sofa'], lighting: 'Ambient' },
        qualityScore: { totalScore: 85, grade: 'A' }
      };

      const result = await service.exportToExcel(mockData);

      expect(result.sheets.length).toBeGreaterThanOrEqual(3);
      const sheetNames = result.sheets.map(s => s.name);
      expect(sheetNames).toContain('Summary');
      expect(sheetNames).toContain('Budget');
    });

    it('should format currency values correctly', async () => {
      const mockData = {
        projectId: 'test-project',
        budget: {
          total: 1234567,
          categories: { furniture: 567890 }
        }
      };

      const result = await service.exportToExcel(mockData);
      const budgetSheet = result.sheets.find(s => s.name === 'Budget');

      expect(budgetSheet?.rows.some(row => 
        row.some(cell => String(cell).includes('₹') || String(cell).includes(','))
      )).toBe(true);
    });
  });

  describe('CSV Format', () => {
    it('should create valid CSV with headers', async () => {
      const mockData = {
        projectId: 'test-project',
        budget: {
          categories: {
            furniture: 200000,
            lighting: 50000
          }
        }
      };

      const result = await service.exportToCSV(mockData);
      const lines = result.data.split('\n');

      expect(lines[0]).toContain('Category');
      expect(lines.length).toBeGreaterThan(1);
    });

    it('should handle special characters in CSV', async () => {
      const mockData = {
        projectId: 'test-project',
        projectName: 'Test, Project "With" Special\'Chars'
      };

      const result = await service.exportToCSV(mockData);

      expect(result.data).toBeDefined();
      expect(result.data.split('\n').length).toBeGreaterThan(0);
    });
  });

  describe('Performance', () => {
    it('should export large datasets efficiently', async () => {
      const largeData = {
        projectId: 'test-project',
        projectName: 'Large Project',
        budget: {
          categories: Object.fromEntries(
            Array.from({ length: 50 }, (_, i) => [`category${i}`, 10000])
          )
        }
      };

      const startTime = Date.now();
      const result = await service.exportToExcel(largeData);
      const endTime = Date.now();

      expect(result).toBeDefined();
      expect(endTime - startTime).toBeLessThan(5000); // Should complete in <5 seconds
    });
  });
});
