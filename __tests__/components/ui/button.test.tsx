import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/components/ui/button';

describe('Button', () => {
  it('renders children correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders with default variant', () => {
    render(<Button>Default</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-blue-600');
  });

  it('renders destructive variant', () => {
    render(<Button variant="destructive">Destructive</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-red-500');
  });

  it('renders outline variant', () => {
    render(<Button variant="outline">Outline</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('border', 'border-input');
  });

  it('renders secondary variant', () => {
    render(<Button variant="secondary">Secondary</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-secondary');
  });

  it('renders ghost variant', () => {
    render(<Button variant="ghost">Ghost</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('hover:bg-accent');
  });

  it('renders link variant', () => {
    render(<Button variant="link">Link</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('underline-offset-4');
  });

  it('renders glass variant', () => {
    render(<Button variant="glass">Glass</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('glass');
  });

  it('renders with default size', () => {
    render(<Button>Default Size</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('h-10', 'px-4', 'py-2');
  });

  it('renders small size', () => {
    render(<Button size="sm">Small</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('h-9');
  });

  it('renders large size', () => {
    render(<Button size="lg">Large</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('h-11');
  });

  it('renders icon size', () => {
    render(<Button size="icon">Icon</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('h-10', 'w-10');
  });

  it('handles disabled state', () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(button).toHaveClass('disabled:opacity-50');
  });

  it('accepts additional className', () => {
    render(<Button className="custom-class">Custom</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(<Button ref={ref}>Ref</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('renders as Slot when asChild is true', () => {
    render(
      <Button asChild>
        <a href="https://example.com">Link Button</a>
      </Button>
    );
    const link = screen.getByRole('link', { name: 'Link Button' });
    expect(link).toHaveAttribute('href', 'https://example.com');
  });
});
