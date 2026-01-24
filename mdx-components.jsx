import CodeBlock from '@/components/blog/CodeBlock';

// Named useMDXComponents by MDX convention - not actually a React hook
export function useMDXComponents(components) {
  return {
    pre: ({ children, ...props }) => {
      // The children of pre is usually a code element with the className
      const codeElement = children;
      const className = codeElement?.props?.className || '';

      return (
        <CodeBlock className={className} {...props}>
          {codeElement?.props?.children}
        </CodeBlock>
      );
    },
    ...components,
  };
}

// Re-export with a non-hook name for internal use
export const getMDXComponents = useMDXComponents;