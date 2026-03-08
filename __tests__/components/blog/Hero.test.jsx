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

  it('renders the featured category badges', () => {
    render(<Hero />);
    expect(screen.getByText('GenAI')).toBeInTheDocument();
    expect(screen.getByText('Distributed Systems')).toBeInTheDocument();
  });

  it('does not render stale placeholder categories', () => {
    render(<Hero />);
    expect(screen.queryByText('Deep Learning')).not.toBeInTheDocument();
    expect(screen.queryByText('ML Engineering')).not.toBeInTheDocument();
    expect(screen.queryByText('Data Science')).not.toBeInTheDocument();
  });

  it('category badges link to correct category pages', () => {
    render(<Hero />);

    const genAILink = screen.getByRole('link', { name: /GenAI/i });
    expect(genAILink).toHaveAttribute('href', '/category/genai');

    const distributedSystemsLink = screen.getByRole('link', { name: /Distributed Systems/i });
    expect(distributedSystemsLink).toHaveAttribute('href', '/category/distributed-systems');
  });

  it('renders one icon per category', () => {
    const { container } = render(<Hero />);
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBe(2);
  });

  it('has proper semantic structure', () => {
    render(<Hero />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
  });
});
