import { describe, it, expect, beforeEach, vi } from 'vitest';
import { QualityScoringService } from '../qualityScoringService';
import type { QualityScore, ScoringCriteria } from '../qualityScoringService';

describe('QualityScoringService', () => {
  let service: QualityScoringService;

  beforeEach(() => {
    service = new QualityScoringService();
  });

  describe('calculateQualityScore', () => {
    it('should calculate perfect score for ideal design', () => {
      const mockData = {
        designComplexity: 0.9,
        functionalityScore: 0.95,
        aestheticScore: 0.92,
        budgetAdherence: 0.88,
        technicalQuality: 0.91,
        hasArchitecturalPreservation: true,
        hasFurniturePlacement: true,
        hasColorPalette: true,
        hasLightingPlan: true,
        completionPercentage: 95
      };

      const score = service.calculateQualityScore(mockData);

      expect(score.totalScore).toBeGreaterThan(85);
      expect(score.grade).toBe('A');
      expect(score.categories).toHaveProperty('design');
      expect(score.categories).toHaveProperty('functionality');
      expect(score.categories).toHaveProperty('aesthetics');
      expect(score.categories).toHaveProperty('budget');
      expect(score.categories).toHaveProperty('technical');
    });

    it('should handle poor design quality appropriately', () => {
      const mockData = {
        designComplexity: 0.3,
        functionalityScore: 0.4,
        aestheticScore: 0.35,
        budgetAdherence: 0.5,
        technicalQuality: 0.4,
        hasArchitecturalPreservation: false,
        hasFurniturePlacement: false,
        hasColorPalette: false,
        hasLightingPlan: false,
        completionPercentage: 40
      };

      const score = service.calculateQualityScore(mockData);

      expect(score.totalScore).toBeLessThan(60);
      expect(score.grade).toMatch(/[CD]/);
      expect(score.improvements.length).toBeGreaterThan(0);
    });

    it('should provide specific improvement suggestions', () => {
      const mockData = {
        designComplexity: 0.5,
        functionalityScore: 0.6,
        aestheticScore: 0.55,
        budgetAdherence: 0.4,
        technicalQuality: 0.5,
        hasArchitecturalPreservation: false,
        hasFurniturePlacement: true,
        hasColorPalette: false,
        hasLightingPlan: false,
        completionPercentage: 50
      };

      const score = service.calculateQualityScore(mockData);

      expect(score.improvements).toBeDefined();
      expect(Array.isArray(score.improvements)).toBe(true);
      expect(score.improvements.length).toBeGreaterThan(0);
      expect(score.improvements.some(imp => imp.category === 'budget')).toBe(true);
    });
  });

  describe('Grade Assignment', () => {
    it('should assign correct grades based on score ranges', () => {
      const testCases = [
        { score: 95, expectedGrade: 'A' },
        { score: 85, expectedGrade: 'A' },
        { score: 75, expectedGrade: 'B' },
        { score: 65, expectedGrade: 'C' },
        { score: 55, expectedGrade: 'D' },
        { score: 45, expectedGrade: 'F' }
      ];

      testCases.forEach(({ score, expectedGrade }) => {
        const mockData = {
          designComplexity: score / 100,
          functionalityScore: score / 100,
          aestheticScore: score / 100,
          budgetAdherence: score / 100,
          technicalQuality: score / 100,
          hasArchitecturalPreservation: true,
          hasFurniturePlacement: true,
          hasColorPalette: true,
          hasLightingPlan: true,
          completionPercentage: score
        };

        const result = service.calculateQualityScore(mockData);
        expect(result.grade).toBe(expectedGrade);
      });
    });
  });

  describe('Category Scoring', () => {
    it('should score each category independently', () => {
      const mockData = {
        designComplexity: 0.8,
        functionalityScore: 0.7,
        aestheticScore: 0.9,
        budgetAdherence: 0.6,
        technicalQuality: 0.85,
        hasArchitecturalPreservation: true,
        hasFurniturePlacement: true,
        hasColorPalette: true,
        hasLightingPlan: true,
        completionPercentage: 75
      };

      const score = service.calculateQualityScore(mockData);

      expect(score.categories.design.score).toBeGreaterThan(0);
      expect(score.categories.functionality.score).toBeGreaterThan(0);
      expect(score.categories.aesthetics.score).toBeGreaterThan(0);
      expect(score.categories.budget.score).toBeGreaterThan(0);
      expect(score.categories.technical.score).toBeGreaterThan(0);

      const totalCategoryScore = 
        score.categories.design.score +
        score.categories.functionality.score +
        score.categories.aesthetics.score +
        score.categories.budget.score +
        score.categories.technical.score;

      expect(Math.abs(totalCategoryScore - score.totalScore)).toBeLessThan(1);
    });
  });

  describe('Improvement Suggestions', () => {
    it('should suggest improvements for low aesthetic scores', () => {
      const mockData = {
        designComplexity: 0.8,
        functionalityScore: 0.8,
        aestheticScore: 0.4,
        budgetAdherence: 0.8,
        technicalQuality: 0.8,
        hasArchitecturalPreservation: true,
        hasFurniturePlacement: true,
        hasColorPalette: false,
        hasLightingPlan: false,
        completionPercentage: 70
      };

      const score = service.calculateQualityScore(mockData);

      const aestheticImprovements = score.improvements.filter(
        imp => imp.category === 'aesthetics'
      );
      expect(aestheticImprovements.length).toBeGreaterThan(0);
    });

    it('should suggest improvements for budget overruns', () => {
      const mockData = {
        designComplexity: 0.8,
        functionalityScore: 0.8,
        aestheticScore: 0.8,
        budgetAdherence: 0.3,
        technicalQuality: 0.8,
        hasArchitecturalPreservation: true,
        hasFurniturePlacement: true,
        hasColorPalette: true,
        hasLightingPlan: true,
        completionPercentage: 70
      };

      const score = service.calculateQualityScore(mockData);

      const budgetImprovements = score.improvements.filter(
        imp => imp.category === 'budget'
      );
      expect(budgetImprovements.length).toBeGreaterThan(0);
    });
  });

  describe('Edge Cases', () => {
    it('should handle missing optional fields gracefully', () => {
      const mockData = {
        designComplexity: 0.7,
        functionalityScore: 0.7,
        aestheticScore: 0.7,
        budgetAdherence: 0.7,
        technicalQuality: 0.7,
        completionPercentage: 70
      };

      const score = service.calculateQualityScore(mockData as any);

      expect(score.totalScore).toBeGreaterThan(0);
      expect(score.totalScore).toBeLessThanOrEqual(100);
      expect(score.grade).toBeDefined();
    });

    it('should cap scores at 100', () => {
      const mockData = {
        designComplexity: 1.5,
        functionalityScore: 1.5,
        aestheticScore: 1.5,
        budgetAdherence: 1.5,
        technicalQuality: 1.5,
        hasArchitecturalPreservation: true,
        hasFurniturePlacement: true,
        hasColorPalette: true,
        hasLightingPlan: true,
        completionPercentage: 150
      };

      const score = service.calculateQualityScore(mockData);

      expect(score.totalScore).toBeLessThanOrEqual(100);
    });

    it('should handle zero scores', () => {
      const mockData = {
        designComplexity: 0,
        functionalityScore: 0,
        aestheticScore: 0,
        budgetAdherence: 0,
        technicalQuality: 0,
        hasArchitecturalPreservation: false,
        hasFurniturePlacement: false,
        hasColorPalette: false,
        hasLightingPlan: false,
        completionPercentage: 0
      };

      const score = service.calculateQualityScore(mockData);

      expect(score.totalScore).toBeGreaterThanOrEqual(0);
      expect(score.grade).toBe('F');
      expect(score.improvements.length).toBeGreaterThan(3);
    });
  });
});
