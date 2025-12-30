import { describe, it, expect, beforeEach } from 'vitest';
import { getStylePrompt, buildRenderPrompt, getAllStyles } from '../../../lib/stylePrompts';

describe('Style Prompts Library', () => {
  describe('getStylePrompt', () => {
    it('should return prompt for Modern Indian style', () => {
      const prompt = getStylePrompt('modern_indian');

      expect(prompt).toBeDefined();
      expect(prompt.style).toBe('Modern Indian');
      expect(prompt.basePrompt).toContain('Indian');
      expect(prompt.colorPalette).toHaveLength(5);
      expect(prompt.keyElements.length).toBeGreaterThanOrEqual(6);
    });

    it('should return prompt for Contemporary style', () => {
      const prompt = getStylePrompt('contemporary');

      expect(prompt).toBeDefined();
      expect(prompt.style).toBe('Contemporary');
      expect(prompt.materials).toBeDefined();
      expect(prompt.lighting).toBeDefined();
    });

    it('should return prompt for all 13 styles', () => {
      const styles = [
        'modern_indian',
        'contemporary',
        'minimalist',
        'scandinavian',
        'mid_century_modern',
        'industrial',
        'tropical',
        'traditional_indian',
        'transitional',
        'eclectic',
        'art_deco',
        'bohemian',
        'japandi'
      ];

      styles.forEach(style => {
        const prompt = getStylePrompt(style);
        expect(prompt).toBeDefined();
        expect(prompt.style).toBeTruthy();
        expect(prompt.basePrompt).toBeTruthy();
      });
    });

    it('should throw error for invalid style', () => {
      expect(() => {
        getStylePrompt('invalid_style' as any);
      }).toThrow();
    });

    it('should include room-specific variations when available', () => {
      const prompt = getStylePrompt('modern_indian');

      if (prompt.roomSpecificVariations) {
        expect(prompt.roomSpecificVariations).toBeDefined();
        expect(typeof prompt.roomSpecificVariations).toBe('object');
      }
    });
  });

  describe('buildRenderPrompt', () => {
    it('should build comprehensive prompt with all parameters', () => {
      const result = buildRenderPrompt({
        style: 'modern_indian',
        roomType: 'living_room',
        customAdditions: ['Add indoor plants', 'Include artwork'],
        preserveElements: ['window', 'door'],
        budgetTier: 'premium'
      });

      expect(result).toBeDefined();
      expect(result.prompt).toContain('Modern Indian');
      expect(result.prompt).toContain('living room');
      expect(result.prompt).toContain('plants');
      expect(result.prompt).toContain('artwork');
      expect(result.negativePrompt).toBeDefined();
    });

    it('should handle minimal parameters', () => {
      const result = buildRenderPrompt({
        style: 'minimalist',
        roomType: 'bedroom'
      });

      expect(result).toBeDefined();
      expect(result.prompt).toContain('Minimalist');
      expect(result.prompt).toContain('bedroom');
    });

    it('should include architectural preservation instructions', () => {
      const result = buildRenderPrompt({
        style: 'contemporary',
        roomType: 'living_room',
        preserveElements: ['window', 'door', 'built-in shelving']
      });

      expect(result.prompt).toContain('preserve');
      expect(result.prompt.toLowerCase()).toContain('window');
      expect(result.prompt.toLowerCase()).toContain('door');
      expect(result.prompt.toLowerCase()).toContain('shelving');
    });

    it('should apply budget tier modifications', () => {
      const premiumResult = buildRenderPrompt({
        style: 'modern_indian',
        roomType: 'living_room',
        budgetTier: 'premium'
      });

      const budgetResult = buildRenderPrompt({
        style: 'modern_indian',
        roomType: 'living_room',
        budgetTier: 'budget'
      });

      expect(premiumResult.prompt).not.toBe(budgetResult.prompt);
    });

    it('should include style-specific avoidances in negative prompt', () => {
      const result = buildRenderPrompt({
        style: 'minimalist',
        roomType: 'living_room'
      });

      expect(result.negativePrompt).toBeDefined();
      expect(result.negativePrompt.length).toBeGreaterThan(0);
    });

    it('should handle room-specific variations', () => {
      const livingRoomPrompt = buildRenderPrompt({
        style: 'modern_indian',
        roomType: 'living_room'
      });

      const bedroomPrompt = buildRenderPrompt({
        style: 'modern_indian',
        roomType: 'bedroom'
      });

      expect(livingRoomPrompt.prompt).not.toBe(bedroomPrompt.prompt);
    });

    it('should merge custom additions into prompt', () => {
      const customAdditions = [
        'Add a reading nook',
        'Include statement lighting',
        'Add texture through textiles'
      ];

      const result = buildRenderPrompt({
        style: 'contemporary',
        roomType: 'bedroom',
        customAdditions
      });

      customAdditions.forEach(addition => {
        expect(result.prompt.toLowerCase()).toContain(addition.toLowerCase().substring(0, 10));
      });
    });
  });

  describe('getAllStyles', () => {
    it('should return all 13 available styles', () => {
      const styles = getAllStyles();

      expect(styles).toHaveLength(13);
      expect(Array.isArray(styles)).toBe(true);
    });

    it('should return styles with required properties', () => {
      const styles = getAllStyles();

      styles.forEach(style => {
        expect(style).toHaveProperty('id');
        expect(style).toHaveProperty('name');
        expect(style).toHaveProperty('description');
        expect(style).toHaveProperty('colorPalette');
        expect(Array.isArray(style.colorPalette)).toBe(true);
        expect(style.colorPalette.length).toBe(5);
      });
    });

    it('should include popular Indian styles', () => {
      const styles = getAllStyles();
      const styleIds = styles.map(s => s.id);

      expect(styleIds).toContain('modern_indian');
      expect(styleIds).toContain('traditional_indian');
      expect(styleIds).toContain('tropical');
    });

    it('should include international styles', () => {
      const styles = getAllStyles();
      const styleIds = styles.map(s => s.id);

      expect(styleIds).toContain('scandinavian');
      expect(styleIds).toContain('japandi');
      expect(styleIds).toContain('industrial');
      expect(styleIds).toContain('minimalist');
    });
  });

  describe('Color Palettes', () => {
    it('should have exactly 5 colors for each style', () => {
      const styles = getAllStyles();

      styles.forEach(style => {
        expect(style.colorPalette).toHaveLength(5);
      });
    });

    it('should have valid hex color codes', () => {
      const styles = getAllStyles();
      const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

      styles.forEach(style => {
        style.colorPalette.forEach(color => {
          expect(hexColorRegex.test(color)).toBe(true);
        });
      });
    });
  });

  describe('Style Consistency', () => {
    it('should maintain consistent structure across all styles', () => {
      const styles = getAllStyles();
      const requiredKeys = ['style', 'basePrompt', 'colorPalette', 'keyElements', 'materials', 'lighting', 'furnitureStyle', 'avoid'];

      styles.forEach(styleData => {
        const prompt = getStylePrompt(styleData.id);
        requiredKeys.forEach(key => {
          expect(prompt).toHaveProperty(key);
        });
      });
    });

    it('should have meaningful descriptions', () => {
      const styles = getAllStyles();

      styles.forEach(style => {
        expect(style.description.length).toBeGreaterThan(20);
        expect(style.description).not.toContain('undefined');
        expect(style.description).not.toContain('null');
      });
    });

    it('should have comprehensive key elements', () => {
      const styles = getAllStyles();

      styles.forEach(styleData => {
        const prompt = getStylePrompt(styleData.id);
        expect(prompt.keyElements.length).toBeGreaterThanOrEqual(5);
      });
    });
  });

  describe('Budget Tier Adaptations', () => {
    it('should adjust materials for budget tier', () => {
      const premiumPrompt = buildRenderPrompt({
        style: 'contemporary',
        roomType: 'living_room',
        budgetTier: 'premium'
      });

      const budgetPrompt = buildRenderPrompt({
        style: 'contemporary',
        roomType: 'living_room',
        budgetTier: 'budget'
      });

      expect(premiumPrompt.prompt).toContain('high-quality');
      expect(budgetPrompt.prompt).toContain('cost-effective');
    });
  });

  describe('Integration Support', () => {
    it('should support architectural preservation parameters', () => {
      const preserveElements = ['arched doorway', 'exposed beams', 'bay window'];

      const result = buildRenderPrompt({
        style: 'traditional_indian',
        roomType: 'living_room',
        preserveElements
      });

      expect(result.prompt.toLowerCase()).toContain('preserve');
    });

    it('should handle empty custom additions gracefully', () => {
      const result = buildRenderPrompt({
        style: 'minimalist',
        roomType: 'bedroom',
        customAdditions: []
      });

      expect(result).toBeDefined();
      expect(result.prompt).toBeTruthy();
    });

    it('should handle undefined optional parameters', () => {
      const result = buildRenderPrompt({
        style: 'scandinavian',
        roomType: 'living_room'
      });

      expect(result).toBeDefined();
      expect(result.prompt).toBeTruthy();
      expect(result.negativePrompt).toBeTruthy();
    });
  });
});
