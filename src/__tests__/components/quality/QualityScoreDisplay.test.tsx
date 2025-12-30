import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { QualityScoreDisplay } from '../../../components/quality/QualityScoreDisplay';

describe('QualityScoreDisplay Component', () => {
  const mockQualityScore = {
    totalScore: 87,
    grade: 'A' as const,
    categories: {
      design: { score: 18, maxScore: 20, feedback: 'Excellent design complexity' },
      functionality: { score: 22, maxScore: 25, feedback: 'Very functional layout' },
      aesthetics: { score: 19, maxScore: 20, feedback: 'Beautiful aesthetic choices' },
      budget: { score: 13, maxScore: 15, feedback: 'Good budget management' },
      technical: { score: 15, maxScore: 20, feedback: 'Solid technical execution' }
    },
    improvements: [
      {
        category: 'functionality',
        priority: 'medium' as const,
        suggestion: 'Consider adding more storage solutions'
      }
    ],
    timestamp: new Date().toISOString()
  };

  it('should render quality score display', () => {
    render(<QualityScoreDisplay qualityScore={mockQualityScore} />);

    expect(screen.getByText(/Quality Score/i)).toBeInTheDocument();
    expect(screen.getByText('87')).toBeInTheDocument();
    expect(screen.getByText('A')).toBeInTheDocument();
  });

  it('should display all category scores', () => {
    render(<QualityScoreDisplay qualityScore={mockQualityScore} />);

    expect(screen.getByText(/Design/i)).toBeInTheDocument();
    expect(screen.getByText(/Functionality/i)).toBeInTheDocument();
    expect(screen.getByText(/Aesthetics/i)).toBeInTheDocument();
    expect(screen.getByText(/Budget/i)).toBeInTheDocument();
    expect(screen.getByText(/Technical/i)).toBeInTheDocument();
  });

  it('should show category scores with progress bars', () => {
    render(<QualityScoreDisplay qualityScore={mockQualityScore} />);

    const progressBars = screen.getAllByRole('progressbar');
    expect(progressBars.length).toBeGreaterThan(0);
  });

  it('should display improvement suggestions', () => {
    render(<QualityScoreDisplay qualityScore={mockQualityScore} />);

    expect(screen.getByText(/Consider adding more storage solutions/i)).toBeInTheDocument();
  });

  it('should show grade badge with appropriate styling', () => {
    render(<QualityScoreDisplay qualityScore={mockQualityScore} />);

    const gradeBadge = screen.getByText('A');
    expect(gradeBadge).toHaveClass(/badge/i);
  });

  it('should handle different grade levels', () => {
    const grades: Array<'A' | 'B' | 'C' | 'D' | 'F'> = ['A', 'B', 'C', 'D', 'F'];

    grades.forEach(grade => {
      const score = {
        ...mockQualityScore,
        grade,
        totalScore: grade === 'A' ? 90 : grade === 'B' ? 80 : grade === 'C' ? 70 : grade === 'D' ? 60 : 50
      };

      const { rerender } = render(<QualityScoreDisplay qualityScore={score} />);
      expect(screen.getByText(grade)).toBeInTheDocument();
      rerender(<div />);
    });
  });

  it('should expand/collapse category details', async () => {
    render(<QualityScoreDisplay qualityScore={mockQualityScore} />);

    const expandButton = screen.getAllByRole('button')[0];
    fireEvent.click(expandButton);

    await waitFor(() => {
      expect(screen.getByText(/Excellent design complexity/i)).toBeInTheDocument();
    });
  });

  it('should display improvement priorities', () => {
    const scoreWithPriorities = {
      ...mockQualityScore,
      improvements: [
        { category: 'functionality', priority: 'high' as const, suggestion: 'High priority item' },
        { category: 'aesthetics', priority: 'medium' as const, suggestion: 'Medium priority item' },
        { category: 'technical', priority: 'low' as const, suggestion: 'Low priority item' }
      ]
    };

    render(<QualityScoreDisplay qualityScore={scoreWithPriorities} />);

    expect(screen.getByText(/High priority item/i)).toBeInTheDocument();
    expect(screen.getByText(/Medium priority item/i)).toBeInTheDocument();
    expect(screen.getByText(/Low priority item/i)).toBeInTheDocument();
  });

  it('should handle missing improvements gracefully', () => {
    const scoreWithoutImprovements = {
      ...mockQualityScore,
      improvements: []
    };

    render(<QualityScoreDisplay qualityScore={scoreWithoutImprovements} />);

    expect(screen.queryByText(/Improvement Suggestions/i)).not.toBeInTheDocument();
  });

  it('should show relative performance indicators', () => {
    render(<QualityScoreDisplay qualityScore={mockQualityScore} showComparison />);

    expect(screen.getByText(/Above Average/i) || screen.getByText(/Excellent/i)).toBeInTheDocument();
  });
});
