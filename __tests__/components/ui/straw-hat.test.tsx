import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StrawHat } from '@/components/ui/straw-hat';

describe('StrawHat', () => {
  it('renders an SVG element', () => {
    const { container } = render(<StrawHat />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('accepts className prop', () => {
    const { container } = render(<StrawHat className="w-8 h-8 text-amber-500" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveClass('w-8', 'h-8', 'text-amber-500');
  });

  it('has correct viewBox', () => {
    const { container } = render(<StrawHat />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('viewBox', '0 0 24 24');
  });

  it('has correct stroke properties', () => {
    const { container } = render(<StrawHat />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('stroke', 'currentColor');
    expect(svg).toHaveAttribute('fill', 'none');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(<StrawHat ref={ref} />);
    expect(ref.current).toBeInstanceOf(SVGSVGElement);
  });

  it('passes additional props to SVG', () => {
    const { container } = render(<StrawHat data-testid="straw-hat" aria-label="Straw Hat Icon" />);
    const svg = container.querySelector('svg');
    expect(svg).toHaveAttribute('data-testid', 'straw-hat');
    expect(svg).toHaveAttribute('aria-label', 'Straw Hat Icon');
  });

  it('contains hat brim ellipse', () => {
    const { container } = render(<StrawHat />);
    const ellipse = container.querySelector('ellipse');
    expect(ellipse).toBeInTheDocument();
  });

  it('contains hat paths', () => {
    const { container } = render(<StrawHat />);
    const paths = container.querySelectorAll('path');
    expect(paths.length).toBe(2);
  });
});
