import matter from 'gray-matter';
import { remark } from 'remark';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import remarkHtml from 'remark-html';
import { SITE_URL } from './devto.js';

const text = (value) => ({ type: 'text', value });
const strong = (children) => ({ type: 'strong', children });
const paragraph = (children) => ({ type: 'paragraph', children });

// Substack's editor has no table block and flattens pasted tables to plain text,
// so each row becomes a bullet. The first cell is the label; with 3+ columns the
// remaining cells carry their header ("Header: value"). Inline formatting survives.
function tableToNodes(table) {
  const [head, ...rows] = table.children;
  const labels = head.children.map((cell) => cell.children);
  const twoColumns = labels.length === 2;

  const items = rows.map((row) => {
    const cells = row.children.map((cell) => cell.children);
    const parts = [strong(cells[0] ?? [])];
    if (twoColumns) {
      parts.push(text(' — '), ...(cells[1] ?? []));
    } else {
      cells.slice(1).forEach((cell, i) => {
        parts.push(text(i === 0 ? ' — ' : '; '), ...labels[i + 1], text(': '), ...cell);
      });
    }
    return { type: 'listItem', spread: false, children: [paragraph(parts)] };
  });

  const nodes = [{ type: 'list', ordered: false, spread: false, children: items }];
  if (twoColumns) nodes.unshift(paragraph([{ type: 'emphasis', children: [...labels[0], text(' — '), ...labels[1]] }]));
  return nodes;
}

function transform(node, siteUrl, report) {
  if (!node.children) return;

  node.children = node.children.flatMap((child) => {
    if (child.type === 'table') {
      report.tables += 1;
      return tableToNodes(child);
    }
    // No math parser on Substack's paste path, so keep the raw $...$ and flag it for a manual check.
    if (child.type === 'inlineMath') {
      report.math += 1;
      return [text(`$${child.value}$`)];
    }
    if (child.type === 'math') {
      report.math += 1;
      return [paragraph([text(`$$ ${child.value.replace(/\s*\n\s*/g, ' ')} $$`)])];
    }
    if (child.type === 'image') report.images += 1;
    if ((child.type === 'image' || child.type === 'link') && child.url.startsWith('/')) {
      child.url = `${siteUrl}${child.url}`;
    }
    return [child];
  });

  node.children.forEach((child) => transform(child, siteUrl, report));
}

// Pure: raw MDX string in, Substack-pasteable HTML out. Title and subtitle are separate
// fields in Substack's editor, so they are returned rather than put in the body.
export function convertToSubstack({ slug, raw, siteUrl = SITE_URL }) {
  const { data, content } = matter(raw);
  const url = `${siteUrl}/posts/${slug}`;
  const report = { tables: 0, math: 0, images: 0 };

  const processor = remark().use(remarkGfm).use(remarkMath).use(remarkHtml);
  const tree = processor.parse(content);
  transform(tree, siteUrl, report);

  // Substack has no canonical URL field, so a visible backlink is the only attribution.
  tree.children.push(
    paragraph([{ type: 'emphasis', children: [text('Originally published at '), { type: 'link', url, children: [text(url)] }] }]),
  );

  const html = String(processor.stringify(processor.runSync(tree)));
  return { title: data.title, subtitle: data.description, html, report };
}
