import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Hero from '@/components/blog/Hero';

describe('Hero', () => {
  it('renders the main heading', () => {
    render(<Hero />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent("Akshay's Expedition Logs");
  });

  it('renders the subtitle', () => {
    render(<Hero />);
    expect(screen.getByText(/Deep dives into distributed systems/)).toBeInTheDocument();
  });

  it('renders all category badges', () => {
    render(<Hero />);
    expect(screen.getByText('Deep Learning')).toBeInTheDocument();
    expect(screen.getByText('GenAI')).toBeInTheDocument();
    expect(screen.getByText('ML Engineering')).toBeInTheDocument();
    expect(screen.getByText('Data Science')).toBeInTheDocument();
  });

  it('category badges link to correct category pages', () => {
    render(<Hero />);

    const deepLearningLink = screen.getByRole('link', { name: /Deep Learning/i });
    expect(deepLearningLink).toHaveAttribute('href', '/category/deep-learning');

    const genAILink = screen.getByRole('link', { name: /GenAI/i });
    expect(genAILink).toHaveAttribute('href', '/category/genai');

    const mlEngineeringLink = screen.getByRole('link', { name: /ML Engineering/i });
    expect(mlEngineeringLink).toHaveAttribute('href', '/category/ml-engineering');

    const dataScienceLink = screen.getByRole('link', { name: /Data Science/i });
    expect(dataScienceLink).toHaveAttribute('href', '/category/data-science');
  });

  it('renders category icons', () => {
    const { container } = render(<Hero />);
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBe(4);
  });

  it('has proper semantic structure', () => {
    render(<Hero />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
  });
});
