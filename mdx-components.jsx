import CodeBlock from '@/components/blog/CodeBlock';

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