import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ArchitecturalPreservationService } from '../architecturalPreservationService';
import type { ArchitecturalElement, PreservationRule } from '../architecturalPreservationService';

describe('ArchitecturalPreservationService', () => {
  let service: ArchitecturalPreservationService;

  beforeEach(() => {
    service = new ArchitecturalPreservationService();
  });

  describe('extractArchitecturalElements', () => {
    it('should extract architectural elements from room image', async () => {
      const mockImageUrl = 'https://example.com/room.jpg';
      const elements = await service.extractArchitecturalElements(mockImageUrl);

      expect(elements).toBeDefined();
      expect(Array.isArray(elements)).toBe(true);
    });

    it('should identify common architectural features', async () => {
      const mockImageUrl = 'https://example.com/room.jpg';
      const elements = await service.extractArchitecturalElements(mockImageUrl);

      const expectedTypes = ['door', 'window', 'column', 'archway', 'built-in'];
      elements.forEach(element => {
        expect(element).toHaveProperty('type');
        expect(element).toHaveProperty('dimensions');
        expect(element).toHaveProperty('position');
      });
    });

    it('should handle images with no architectural features', async () => {
      const mockImageUrl = 'https://example.com/empty-room.jpg';
      const elements = await service.extractArchitecturalElements(mockImageUrl);

      expect(elements).toBeDefined();
      expect(Array.isArray(elements)).toBe(true);
    });
  });

  describe('generatePreservationRules', () => {
    it('should generate rules for architectural elements', () => {
      const mockElements: ArchitecturalElement[] = [
        {
          type: 'window',
          dimensions: { width: 150, height: 180 },
          position: { x: 200, y: 50 },
          material: 'wood',
          condition: 'good'
        },
        {
          type: 'door',
          dimensions: { width: 90, height: 210 },
          position: { x: 0, y: 0 },
          material: 'wood',
          condition: 'excellent'
        }
      ];

      const rules = service.generatePreservationRules(mockElements);

      expect(rules).toBeDefined();
      expect(rules.length).toBe(mockElements.length);
      expect(rules.every(r => r.preserve)).toBe(true);
    });

    it('should set appropriate clearance zones', () => {
      const mockElements: ArchitecturalElement[] = [
        {
          type: 'door',
          dimensions: { width: 90, height: 210 },
          position: { x: 0, y: 0 },
          material: 'wood',
          condition: 'good'
        }
      ];

      const rules = service.generatePreservationRules(mockElements);

      expect(rules[0].clearanceZone).toBeDefined();
      expect(rules[0].clearanceZone).toBeGreaterThan(0);
    });

    it('should include restoration recommendations for damaged elements', () => {
      const mockElements: ArchitecturalElement[] = [
        {
          type: 'window',
          dimensions: { width: 150, height: 180 },
          position: { x: 200, y: 50 },
          material: 'wood',
          condition: 'poor'
        }
      ];

      const rules = service.generatePreservationRules(mockElements);

      expect(rules[0].restorationRecommendations).toBeDefined();
      expect(rules[0].restorationRecommendations.length).toBeGreaterThan(0);
    });
  });

  describe('validateDesignAgainstPreservation', () => {
    it('should validate design that respects preservation rules', () => {
      const mockRules: PreservationRule[] = [
        {
          elementType: 'window',
          preserve: true,
          clearanceZone: 30,
          modificationAllowed: false,
          restorationRecommendations: []
        }
      ];

      const mockDesign = {
        furniturePlacement: [
          {
            type: 'sofa',
            position: { x: 100, y: 100 },
            dimensions: { length: 210, width: 90 }
          }
        ],
        modifications: []
      };

      const validation = service.validateDesignAgainstPreservation(mockDesign, mockRules);

      expect(validation.isValid).toBe(true);
      expect(validation.violations.length).toBe(0);
    });

    it('should detect clearance zone violations', () => {
      const mockRules: PreservationRule[] = [
        {
          elementType: 'door',
          elementPosition: { x: 0, y: 100 },
          preserve: true,
          clearanceZone: 90,
          modificationAllowed: false,
          restorationRecommendations: []
        }
      ];

      const mockDesign = {
        furniturePlacement: [
          {
            type: 'cabinet',
            position: { x: 20, y: 100 },
            dimensions: { length: 120, width: 45 }
          }
        ],
        modifications: []
      };

      const validation = service.validateDesignAgainstPreservation(mockDesign, mockRules);

      expect(validation.isValid).toBe(false);
      expect(validation.violations.length).toBeGreaterThan(0);
      expect(validation.violations[0].severity).toBe('high');
    });

    it('should warn about unauthorized modifications', () => {
      const mockRules: PreservationRule[] = [
        {
          elementType: 'archway',
          preserve: true,
          clearanceZone: 0,
          modificationAllowed: false,
          restorationRecommendations: []
        }
      ];

      const mockDesign = {
        furniturePlacement: [],
        modifications: [
          {
            elementType: 'archway',
            modificationType: 'removal'
          }
        ]
      };

      const validation = service.validateDesignAgainstPreservation(mockDesign, mockRules);

      expect(validation.isValid).toBe(false);
      expect(validation.violations.some(v => v.type === 'unauthorized_modification')).toBe(true);
    });
  });

  describe('applyPreservationToRender', () => {
    it('should enhance render prompt with preservation instructions', () => {
      const basePrompt = 'Modern living room with sofa and coffee table';
      const mockRules: PreservationRule[] = [
        {
          elementType: 'window',
          preserve: true,
          clearanceZone: 30,
          modificationAllowed: false,
          restorationRecommendations: []
        },
        {
          elementType: 'door',
          preserve: true,
          clearanceZone: 90,
          modificationAllowed: false,
          restorationRecommendations: []
        }
      ];

      const enhancedPrompt = service.applyPreservationToRender(basePrompt, mockRules);

      expect(enhancedPrompt).toContain('preserve');
      expect(enhancedPrompt.toLowerCase()).toContain('window');
      expect(enhancedPrompt.toLowerCase()).toContain('door');
    });

    it('should include restoration details in prompt', () => {
      const basePrompt = 'Traditional bedroom design';
      const mockRules: PreservationRule[] = [
        {
          elementType: 'molding',
          preserve: true,
          clearanceZone: 0,
          modificationAllowed: false,
          restorationRecommendations: ['Repair damaged sections', 'Repaint to original color']
        }
      ];

      const enhancedPrompt = service.applyPreservationToRender(basePrompt, mockRules);

      expect(enhancedPrompt.toLowerCase()).toContain('restore');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty element lists', () => {
      const rules = service.generatePreservationRules([]);

      expect(rules).toBeDefined();
      expect(rules.length).toBe(0);
    });

    it('should handle elements with missing properties', () => {
      const incompleteElement: Partial<ArchitecturalElement> = {
        type: 'window'
      };

      expect(() => {
        service.generatePreservationRules([incompleteElement as ArchitecturalElement]);
      }).not.toThrow();
    });

    it('should handle designs with no furniture', () => {
      const mockRules: PreservationRule[] = [
        {
          elementType: 'window',
          preserve: true,
          clearanceZone: 30,
          modificationAllowed: false,
          restorationRecommendations: []
        }
      ];

      const emptyDesign = {
        furniturePlacement: [],
        modifications: []
      };

      const validation = service.validateDesignAgainstPreservation(emptyDesign, mockRules);

      expect(validation.isValid).toBe(true);
    });
  });
});
