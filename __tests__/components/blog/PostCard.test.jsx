import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import PostCard from '@/components/blog/PostCard';

const mockPost = {
  slug: 'test-post',
  title: 'Test Post Title',
  excerpt: 'This is a test excerpt for the post card.',
  category: 'Machine Learning',
  date: 'January 1, 2024',
  readTime: '5 min read',
  image: '/images/test-image.jpg',
};

describe('PostCard', () => {
  it('renders the post title', () => {
    render(<PostCard post={mockPost} />);
    expect(screen.getByText('Test Post Title')).toBeInTheDocument();
  });

  it('renders the post excerpt', () => {
    render(<PostCard post={mockPost} />);
    expect(screen.getByText('This is a test excerpt for the post card.')).toBeInTheDocument();
  });

  it('renders the post category as a badge', () => {
    render(<PostCard post={mockPost} />);
    expect(screen.getByText('Machine Learning')).toBeInTheDocument();
  });

  it('renders the post date', () => {
    render(<PostCard post={mockPost} />);
    expect(screen.getByText('January 1, 2024')).toBeInTheDocument();
  });

  it('renders the read time', () => {
    render(<PostCard post={mockPost} />);
    expect(screen.getByText('5 min read')).toBeInTheDocument();
  });

  it('links to the correct post URL', () => {
    render(<PostCard post={mockPost} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/posts/test-post');
  });

  it('renders the post image', () => {
    render(<PostCard post={mockPost} />);
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('alt', 'Test Post Title');
  });

  it('renders the clock icon for read time', () => {
    const { container } = render(<PostCard post={mockPost} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });
});
