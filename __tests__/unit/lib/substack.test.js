import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { convertToSubstack } from '@/lib/crosspost/substack';

const FM = 'title: "A Post"\ndescription: "About things"';
const convert = (body) => convertToSubstack({ slug: 'a-post', raw: `---\n${FM}\n---\n\n${body}\n` });

describe('lib/crosspost/substack', () => {
  it('returns title and subtitle separately and keeps frontmatter out of the body', () => {
    const r = convert('Hello.');
    expect(r.title).toBe('A Post');
    expect(r.subtitle).toBe('About things');
    expect(r.html).toContain('<p>Hello.</p>');
    expect(r.html).not.toContain('A Post');
  });

  it('ends with an Originally published backlink, since Substack has no canonical field', () => {
    const { html } = convert('Hello.');
    expect(html).toContain('Originally published at');
    expect(html).toContain('<a href="https://blog.akshayworks.com/posts/a-post">');
  });

  describe('links and images', () => {
    it('makes relative links and images absolute', () => {
      const { html, report } = convert('See [Part 2](/posts/part-2) and ![d](/images/d.png).');
      expect(html).toContain('href="https://blog.akshayworks.com/posts/part-2"');
      expect(html).toContain('src="https://blog.akshayworks.com/images/d.png"');
      expect(report.images).toBe(1);
    });

    it('leaves absolute URLs alone', () => {
      expect(convert('[x](https://example.com/a)').html).toContain('href="https://example.com/a"');
    });
  });

  describe('tables', () => {
    const two = '| Manager | Responsibility |\n|---|---|\n| `GcsNodeManager` | Node **registration** |\n| `GcsJobManager` | Job status |';

    it('turns a two-column table into a header line plus one bullet per row', () => {
      const { html, report } = convert(two);
      expect(html).not.toContain('<table');
      expect(html).toContain('<em>Manager — Responsibility</em>');
      expect(html).toContain('<li><strong><code>GcsNodeManager</code></strong> — Node <strong>registration</strong></li>');
      expect(html).toContain('<li><strong><code>GcsJobManager</code></strong> — Job status</li>');
      expect(report.tables).toBe(1);
    });

    it('labels the remaining cells with their headers for 3+ columns', () => {
      const { html } = convert('| Name | Size | Speed |\n|---|---|---|\n| Klein | 4B | fast |');
      expect(html).toContain('<li><strong>Klein</strong> — Size: 4B; Speed: fast</li>');
    });

    it('keeps links inside table cells', () => {
      const { html } = convert('| A | B |\n|---|---|\n| x | [y](/posts/y) |');
      expect(html).toContain('href="https://blog.akshayworks.com/posts/y"');
    });
  });

  describe('math', () => {
    it('keeps inline math as raw $...$ and counts it', () => {
      const { html, report } = convert('Weights $W^Q$ here.');
      expect(html).toContain('Weights $W^Q$ here.');
      expect(report.math).toBe(1);
    });

    it('keeps block math as raw $$ ... $$ on one line', () => {
      const { html, report } = convert('$$\nx = 1\ny = 2\n$$');
      expect(html).toContain('<p>$$ x = 1 y = 2 $$</p>');
      expect(report.math).toBe(1);
    });

    it('does not count or alter dollar signs inside code', () => {
      const { html, report } = convert('```python\nprice = "$a$"\n```');
      expect(html).toContain('price = "$a$"');
      expect(report.math).toBe(0);
    });
  });

  it('keeps fenced code as pre/code', () => {
    expect(convert('```python\nimport ray\n```').html).toContain('<pre><code class="language-python">import ray');
  });

  describe('all published posts', () => {
    const root = path.join(process.cwd(), 'content/posts');
    const files = fs
      .readdirSync(root, { recursive: true })
      .filter((f) => f.endsWith('.mdx'))
      .map((f) => path.join(root, f));

    it.each(files.map((f) => [path.basename(f, '.mdx'), f]))('%s converts cleanly', (slug, file) => {
      const { html } = convertToSubstack({ slug, raw: fs.readFileSync(file, 'utf8') });
      expect(html).not.toContain('<table');
      expect(html).not.toMatch(/(href|src)="\/(?!\/)/);
      expect(html).toContain('Originally published at');
    });
  });
});
