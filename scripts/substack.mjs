#!/usr/bin/env node
// Usage: npm run substack <slug>
// Writes research/<slug>/substack.html. Open it, select all, copy, paste into Substack's editor.
import fs from 'fs';
import path from 'path';
import { convertToSubstack } from '../lib/crosspost/substack.js';
import { findPostFile } from '../lib/crosspost/posts.js';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const slug = process.argv[2];

function fail(msg) {
  console.error(msg);
  process.exit(1);
}

if (!slug) fail('Usage: npm run substack <slug>');

const postFile = findPostFile(slug, path.join(ROOT, 'content/posts'));
if (!postFile) fail(`No post found for slug "${slug}" under content/posts/`);

const { title, subtitle, html, report } = convertToSubstack({ slug, raw: fs.readFileSync(postFile, 'utf8') });

const out = path.join(ROOT, 'research', slug, 'substack.html');
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(
  out,
  `<!doctype html>\n<html lang="en"><head><meta charset="utf-8"><title>${title.replace(/</g, '&lt;')}</title></head>\n<body>\n${html}</body></html>\n`,
);

console.log(`Wrote research/${slug}/substack.html\n`);
console.log(`Title:    ${title}\nSubtitle: ${subtitle}\n`);
console.log('Open the file, select all, copy, and paste into the Substack editor body. Title and subtitle go in their own fields.');
console.log('\nCheck in the editor:');
if (report.tables) console.log(`- ${report.tables} table(s) were turned into bullet lists (Substack has no table block).`);
if (report.math) console.log(`- ${report.math} math expression(s) are raw $...$ text; confirm they render, or insert them as LaTeX blocks.`);
if (report.images) console.log(`- ${report.images} image(s) use absolute URLs; confirm they all loaded.`);
