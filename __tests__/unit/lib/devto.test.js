import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { convertToDevto, toDevtoTags, SITE_URL } from '@/lib/crosspost/devto';

const post = (frontmatter, body) => `---\n${frontmatter}\n---\n\n${body}\n`;
const FM = 'title: "A Post"\ndescription: "About things"\ntags: ["Ray", "ML Infrastructure"]\nimage: "/images/cover.png"';

const convert = (body, fm = FM) => convertToDevto({ slug: 'a-post', raw: post(fm, body) });

describe('lib/crosspost/devto', () => {
  describe('toDevtoTags', () => {
    it('lowercases and strips non-alphanumerics', () => {
      expect(toDevtoTags(['ML Infrastructure', 'Gen-AI'])).toEqual(['mlinfrastructure', 'genai']);
    });

    it('caps at 4 and dedupes', () => {
      expect(toDevtoTags(['A', 'a', 'B', 'C', 'D', 'E'])).toEqual(['a', 'b', 'c', 'd']);
    });

    it('drops tags that are empty after cleaning', () => {
      expect(toDevtoTags(['!!!', 'Ray'])).toEqual(['ray']);
    });
  });

  describe('frontmatter', () => {
    it('maps fields and sets the canonical URL', () => {
      const a = convert('Hello.', `${FM}\nseries: "Ray Deep Dive"`);
      expect(a).toMatchObject({
        title: 'A Post',
        description: 'About things',
        tags: ['ray', 'mlinfrastructure'],
        canonical_url: `${SITE_URL}/posts/a-post`,
        main_image: `${SITE_URL}/images/cover.png`,
        series: 'Ray Deep Dive',
      });
    });

    it('omits series and main_image when absent', () => {
      const a = convert('Hello.', 'title: "T"\ndescription: "D"\ntags: ["x"]');
      expect(a).not.toHaveProperty('series');
      expect(a).not.toHaveProperty('main_image');
    });
  });

  describe('images', () => {
    it('makes relative image URLs absolute', () => {
      const a = convert('![diagram](/images/posts/d.png)');
      expect(a.body_markdown).toContain(`![diagram](${SITE_URL}/images/posts/d.png)`);
    });

    it('leaves already-absolute URLs alone', () => {
      const a = convert('![x](https://example.com/x.png)');
      expect(a.body_markdown).toContain('![x](https://example.com/x.png)');
    });
  });

  describe('math', () => {
    it('converts a one-line $$ block', () => {
      const a = convert('$$a = b + c$$');
      expect(a.body_markdown).toContain('{% katex %}\na = b + c\n{% endkatex %}');
    });

    it('converts a multi-line $$ block', () => {
      const a = convert('$$\nx = 1\ny = 2\n$$');
      expect(a.body_markdown).toContain('{% katex %}\nx = 1\ny = 2\n{% endkatex %}');
    });

    it('converts inline math', () => {
      const a = convert('Weights $W^Q$ and $W^K$ here.');
      expect(a.body_markdown).toContain('{% katex inline %}W^Q{% endkatex %} and {% katex inline %}W^K{% endkatex %}');
    });

    it('does not treat currency as math', () => {
      const a = convert('It costs $5 and then $10 more.');
      expect(a.body_markdown).toContain('It costs $5 and then $10 more.');
    });
  });

  describe('code', () => {
    it('leaves fenced code untouched', () => {
      const body = '```python\nimport ray\nprice = "$a$"\n![x](/images/y.png)\n```';
      expect(convert(body).body_markdown).toContain(body);
    });

    it('leaves inline code spans untouched', () => {
      const a = convert('Use `$x$` and `![a](/b.png)` literally.');
      expect(a.body_markdown).toContain('Use `$x$` and `![a](/b.png)` literally.');
    });
  });

  describe('MDX', () => {
    it('strips import and export lines outside fences', () => {
      const a = convert("import Foo from './Foo';\nexport const meta = {};\n\nBody text.");
      expect(a.body_markdown).not.toMatch(/^(import|export) /m);
      expect(a.body_markdown).toContain('Body text.');
    });

    it('throws on a JSX component outside a code fence rather than dropping it', () => {
      expect(() => convert('<MDXImage src="/a.png" alt="a" />')).toThrow(/MDXImage/);
    });

    it('ignores JSX-looking text inside a code fence', () => {
      expect(() => convert('```jsx\n<Foo />\n```')).not.toThrow();
    });
  });

  describe('all published posts', () => {
    const root = path.join(process.cwd(), 'content/posts');
    const files = fs
      .readdirSync(root, { recursive: true })
      .filter((f) => f.endsWith('.mdx'))
      .map((f) => path.join(root, f));

    it('finds posts to check', () => {
      expect(files.length).toBeGreaterThan(0);
    });

    it.each(files.map((f) => [path.basename(f, '.mdx'), f]))('%s converts cleanly', (slug, file) => {
      const { body_markdown, tags } = convertToDevto({ slug, raw: fs.readFileSync(file, 'utf8') });
      const outsideFences = body_markdown.replace(/```[\s\S]*?```/g, '');
      expect(outsideFences).not.toMatch(/\]\(\/(?!\/)/);
      expect(outsideFences).not.toMatch(/^\s*<[A-Z]/m);
      expect(outsideFences).not.toMatch(/\$\$/);
      expect(tags.length).toBeLessThanOrEqual(4);
    });
  });
});
