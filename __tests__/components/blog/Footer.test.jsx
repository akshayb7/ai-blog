import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from '@/components/blog/Footer';

describe('Footer', () => {
  it('displays the current year in copyright', () => {
    render(<Footer />);
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(new RegExp(`© ${currentYear}`))).toBeInTheDocument();
  });

  it('displays the brand name', () => {
    render(<Footer />);
    expect(screen.getByText('Expedition Logs')).toBeInTheDocument();
  });

  it('displays the tagline', () => {
    render(<Footer />);
    expect(screen.getByText(/Deep dives into distributed systems/)).toBeInTheDocument();
  });

  it('has link to All Posts', () => {
    render(<Footer />);
    const link = screen.getByRole('link', { name: 'All Posts' });
    expect(link).toHaveAttribute('href', '/posts');
  });

  it('has link to About page', () => {
    render(<Footer />);
    const link = screen.getByRole('link', { name: 'About' });
    expect(link).toHaveAttribute('href', '/about');
  });

  it('has GitHub social link', () => {
    render(<Footer />);
    const link = screen.getByRole('link', { name: 'GitHub' });
    expect(link).toHaveAttribute('href', 'https://github.com/akshayb7');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('has LinkedIn social link', () => {
    render(<Footer />);
    const link = screen.getByRole('link', { name: 'LinkedIn' });
    expect(link).toHaveAttribute('href', 'https://www.linkedin.com/in/akshayb7/');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('has Portfolio social link', () => {
    render(<Footer />);
    const link = screen.getByRole('link', { name: 'Portfolio' });
    expect(link).toHaveAttribute('href', 'https://portfolio.akshayworks.com');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('has Email link', () => {
    render(<Footer />);
    const link = screen.getByRole('link', { name: 'Email' });
    expect(link).toHaveAttribute('href', 'mailto:akshay10.bhardwaj@gmail.com');
  });

  it('renders the StrawHat icon', () => {
    const { container } = render(<Footer />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('has correct section headings', () => {
    render(<Footer />);
    expect(screen.getByText('Explore')).toBeInTheDocument();
    expect(screen.getByText('Connect')).toBeInTheDocument();
  });
});
