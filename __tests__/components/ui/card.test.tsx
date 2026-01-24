import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';

describe('Card', () => {
  it('renders children correctly', () => {
    render(<Card>Card Content</Card>);
    expect(screen.getByText('Card Content')).toBeInTheDocument();
  });

  it('applies glass-card class', () => {
    const { container } = render(<Card>Content</Card>);
    expect(container.firstChild).toHaveClass('glass-card');
  });

  it('accepts additional className', () => {
    const { container } = render(<Card className="custom-class">Content</Card>);
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(<Card ref={ref}>Content</Card>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('has correct base styles', () => {
    const { container } = render(<Card>Content</Card>);
    expect(container.firstChild).toHaveClass('rounded-lg', 'border', 'shadow-sm');
  });
});

describe('CardHeader', () => {
  it('renders children correctly', () => {
    render(<CardHeader>Header Content</CardHeader>);
    expect(screen.getByText('Header Content')).toBeInTheDocument();
  });

  it('has correct padding', () => {
    const { container } = render(<CardHeader>Header</CardHeader>);
    expect(container.firstChild).toHaveClass('p-6');
  });

  it('accepts additional className', () => {
    const { container } = render(<CardHeader className="custom">Header</CardHeader>);
    expect(container.firstChild).toHaveClass('custom');
  });
});

describe('CardTitle', () => {
  it('renders as h3 element', () => {
    render(<CardTitle>Title</CardTitle>);
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Title');
  });

  it('has correct typography styles', () => {
    render(<CardTitle>Title</CardTitle>);
    const title = screen.getByRole('heading');
    expect(title).toHaveClass('text-2xl', 'font-semibold');
  });

  it('accepts additional className', () => {
    render(<CardTitle className="custom">Title</CardTitle>);
    expect(screen.getByRole('heading')).toHaveClass('custom');
  });
});

describe('CardDescription', () => {
  it('renders children correctly', () => {
    render(<CardDescription>Description text</CardDescription>);
    expect(screen.getByText('Description text')).toBeInTheDocument();
  });

  it('has muted foreground color', () => {
    render(<CardDescription>Description</CardDescription>);
    expect(screen.getByText('Description')).toHaveClass('text-muted-foreground');
  });

  it('accepts additional className', () => {
    render(<CardDescription className="custom">Description</CardDescription>);
    expect(screen.getByText('Description')).toHaveClass('custom');
  });
});

describe('CardContent', () => {
  it('renders children correctly', () => {
    render(<CardContent>Main content</CardContent>);
    expect(screen.getByText('Main content')).toBeInTheDocument();
  });

  it('has correct padding', () => {
    const { container } = render(<CardContent>Content</CardContent>);
    expect(container.firstChild).toHaveClass('p-6', 'pt-0');
  });

  it('accepts additional className', () => {
    const { container } = render(<CardContent className="custom">Content</CardContent>);
    expect(container.firstChild).toHaveClass('custom');
  });
});

describe('CardFooter', () => {
  it('renders children correctly', () => {
    render(<CardFooter>Footer content</CardFooter>);
    expect(screen.getByText('Footer content')).toBeInTheDocument();
  });

  it('has flex layout', () => {
    const { container } = render(<CardFooter>Footer</CardFooter>);
    expect(container.firstChild).toHaveClass('flex', 'items-center');
  });

  it('accepts additional className', () => {
    const { container } = render(<CardFooter className="custom">Footer</CardFooter>);
    expect(container.firstChild).toHaveClass('custom');
  });
});

describe('Card composition', () => {
  it('renders a complete card with all parts', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card description text</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Main card content</p>
        </CardContent>
        <CardFooter>
          <button>Action</button>
        </CardFooter>
      </Card>
    );

    expect(screen.getByText('Card Title')).toBeInTheDocument();
    expect(screen.getByText('Card description text')).toBeInTheDocument();
    expect(screen.getByText('Main card content')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
  });
});
