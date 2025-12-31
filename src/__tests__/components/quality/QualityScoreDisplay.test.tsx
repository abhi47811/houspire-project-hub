import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QualityScoreDisplay } from '../../../components/quality/QualityScoreDisplay';
import type { QualityScore } from '@/services/features/qualityScoringService';

describe('QualityScoreDisplay Component', () => {
  const mockQualityScore: QualityScore = {
    room_id: 'test-room-123',
    render_id: 'test-render-456',
    total_score: 87,
    quality_grade: 'Excellent',
    style_consistency: {
      score: 25,
      issues: [],
      strengths: ['Excellent design complexity', 'Great color harmony'],
    },
    architectural_accuracy: {
      score: 22,
      door_match: true,
      window_match: true,
      dimension_variance: 2.5,
      issues: [],
    },
    furniture_placement: {
      score: 18,
      rule_violations: [],
      clearance_issues: [],
    },
    color_material_adherence: {
      score: 12,
      palette_match: 85,
      material_accuracy: 90,
    },
    technical_quality: {
      score: 10,
      resolution_adequate: true,
      lighting_quality: 'good',
      render_artifacts: [],
    },
    suggestions: ['Consider adding more accent lighting'],
    scored_at: new Date().toISOString(),
    scoring_version: '1.0',
  };

  it('should render quality score display', () => {
    render(<QualityScoreDisplay score={mockQualityScore} />);

    expect(screen.getByText(/Quality Assessment/i)).toBeInTheDocument();
    expect(screen.getByText('87/100')).toBeInTheDocument();
    expect(screen.getByText('Excellent')).toBeInTheDocument();
  });

  it('should display all category scores', () => {
    render(<QualityScoreDisplay score={mockQualityScore} />);

    expect(screen.getByText(/Style Consistency/i)).toBeInTheDocument();
    expect(screen.getByText(/Architectural Accuracy/i)).toBeInTheDocument();
    expect(screen.getByText(/Furniture Placement/i)).toBeInTheDocument();
    expect(screen.getByText(/Color & Materials/i)).toBeInTheDocument();
    expect(screen.getByText(/Technical Quality/i)).toBeInTheDocument();
  });

  it('should show progress bars for scores', () => {
    render(<QualityScoreDisplay score={mockQualityScore} />);

    const progressBars = screen.getAllByRole('progressbar');
    expect(progressBars.length).toBeGreaterThan(0);
  });

  it('should display improvement suggestions', () => {
    render(<QualityScoreDisplay score={mockQualityScore} />);

    expect(screen.getByText(/Consider adding more accent lighting/i)).toBeInTheDocument();
  });

  it('should show grade badge with appropriate styling', () => {
    render(<QualityScoreDisplay score={mockQualityScore} />);

    const gradeBadge = screen.getByText('Excellent');
    expect(gradeBadge).toBeInTheDocument();
  });

  it('should handle different grade levels', () => {
    const grades: Array<'Excellent' | 'Good' | 'Fair' | 'Poor'> = ['Excellent', 'Good', 'Fair', 'Poor'];

    grades.forEach(grade => {
      const score: QualityScore = {
        ...mockQualityScore,
        quality_grade: grade,
        total_score: grade === 'Excellent' ? 90 : grade === 'Good' ? 80 : grade === 'Fair' ? 70 : 50
      };

      const { unmount } = render(<QualityScoreDisplay score={score} />);
      expect(screen.getByText(grade)).toBeInTheDocument();
      unmount();
    });
  });

  it('should display architectural accuracy badges', () => {
    render(<QualityScoreDisplay score={mockQualityScore} />);

    expect(screen.getByText(/Doors ✓/i)).toBeInTheDocument();
    expect(screen.getByText(/Windows ✓/i)).toBeInTheDocument();
  });

  it('should show failed architectural checks', () => {
    const scoreWithFailedChecks: QualityScore = {
      ...mockQualityScore,
      architectural_accuracy: {
        ...mockQualityScore.architectural_accuracy,
        door_match: false,
        window_match: false,
        issues: ['Door count mismatch'],
      }
    };

    render(<QualityScoreDisplay score={scoreWithFailedChecks} />);

    expect(screen.getByText(/Doors ✗/i)).toBeInTheDocument();
    expect(screen.getByText(/Windows ✗/i)).toBeInTheDocument();
  });

  it('should display issues when present', () => {
    const scoreWithIssues: QualityScore = {
      ...mockQualityScore,
      style_consistency: {
        ...mockQualityScore.style_consistency,
        issues: ['Color palette deviation detected'],
      }
    };

    render(<QualityScoreDisplay score={scoreWithIssues} />);

    expect(screen.getByText(/Color palette deviation detected/i)).toBeInTheDocument();
  });

  it('should show scoring version', () => {
    render(<QualityScoreDisplay score={mockQualityScore} />);

    expect(screen.getByText(/v1.0/i)).toBeInTheDocument();
  });

  it('should display strengths for excellent scores', () => {
    render(<QualityScoreDisplay score={mockQualityScore} />);

    expect(screen.getByText(/Key Strengths/i)).toBeInTheDocument();
    expect(screen.getByText(/Excellent design complexity/i)).toBeInTheDocument();
  });

  it('should render with custom className', () => {
    const { container } = render(
      <QualityScoreDisplay score={mockQualityScore} className="custom-class" />
    );

    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });

  it('should handle empty suggestions gracefully', () => {
    const scoreWithoutSuggestions: QualityScore = {
      ...mockQualityScore,
      suggestions: []
    };

    render(<QualityScoreDisplay score={scoreWithoutSuggestions} />);

    expect(screen.queryByText(/Improvement Suggestions/i)).not.toBeInTheDocument();
  });

  it('should display technical quality indicators', () => {
    render(<QualityScoreDisplay score={mockQualityScore} />);

    expect(screen.getByText(/Resolution ✓/i)).toBeInTheDocument();
    expect(screen.getByText(/Lighting: good/i)).toBeInTheDocument();
  });
});
