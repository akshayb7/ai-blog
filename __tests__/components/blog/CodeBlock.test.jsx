import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CodeBlock from '@/components/blog/CodeBlock';

describe('CodeBlock', () => {
  beforeEach(() => {
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    });
  });

  it('renders children correctly', () => {
    render(<CodeBlock>const x = 1;</CodeBlock>);
    expect(screen.getByText('const x = 1;')).toBeInTheDocument();
  });

  it('detects language from data-language prop', () => {
    render(<CodeBlock data-language="javascript">code</CodeBlock>);
    expect(screen.getByText('javascript')).toBeInTheDocument();
  });

  it('detects language from className', () => {
    render(<CodeBlock className="language-python">code</CodeBlock>);
    expect(screen.getByText('python')).toBeInTheDocument();
  });

  it('defaults to "text" when no language specified', () => {
    render(<CodeBlock>code</CodeBlock>);
    expect(screen.getByText('text')).toBeInTheDocument();
  });

  it('renders copy button', () => {
    render(<CodeBlock>code</CodeBlock>);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('copies code to clipboard when copy button is clicked', async () => {
    const codeContent = 'const hello = "world";';
    render(<CodeBlock>{codeContent}</CodeBlock>);
    const button = screen.getByRole('button');

    fireEvent.click(button);

    await waitFor(() => {
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(codeContent);
    });
  });

  it('shows check icon after copying', async () => {
    render(<CodeBlock>code</CodeBlock>);
    const button = screen.getByRole('button');

    fireEvent.click(button);

    await waitFor(() => {
      const checkIcon = document.querySelector('.text-green-500');
      expect(checkIcon).toBeInTheDocument();
    });
  });

  it('renders terminal icon', () => {
    const { container } = render(<CodeBlock>code</CodeBlock>);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });

  it('has correct styling classes', () => {
    const { container } = render(<CodeBlock>code</CodeBlock>);
    const wrapper = container.firstChild;
    expect(wrapper).toHaveClass('rounded-xl', 'border-slate-700', 'bg-slate-900');
  });

  it('renders pre element', () => {
    const { container } = render(<CodeBlock className="language-js">code</CodeBlock>);
    const pre = container.querySelector('pre');
    expect(pre).toBeInTheDocument();
    expect(pre).toHaveClass('language-js');
  });

  it('extracts text from nested children', () => {
    render(
      <CodeBlock>
        <span>
          <code>nested code</code>
        </span>
      </CodeBlock>
    );
    expect(screen.getByText('nested code')).toBeInTheDocument();
  });
});
