#!/usr/bin/env node
// Usage: npm run kit -- init <slug>    scaffold research/<slug>/distribution-kit.md
//        npm run kit -- check <slug>   validate the drafts against the platform rules
import fs from 'fs';
import path from 'path';
import { findPostFile } from '../lib/crosspost/posts.js';
import { checkKit, kitPath, renderKitSkeleton } from '../lib/crosspost/kit.js';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const [command, slug] = process.argv.slice(2);

function fail(msg) {
  console.error(msg);
  process.exit(1);
}

if (!['init', 'check'].includes(command) || !slug) fail('Usage: npm run kit -- <init|check> <slug>');

const kitFile = path.join(ROOT, kitPath(slug));

if (command === 'init') {
  const postFile = findPostFile(slug, path.join(ROOT, 'content/posts'));
  if (!postFile) fail(`No post found for slug "${slug}" under content/posts/`);
  if (fs.existsSync(kitFile)) fail(`${kitPath(slug)} already exists. Delete it first to start over.`);

  const today = new Date().toISOString().slice(0, 10);
  fs.mkdirSync(path.dirname(kitFile), { recursive: true });
  fs.writeFileSync(kitFile, renderKitSkeleton({ slug, raw: fs.readFileSync(postFile, 'utf8'), today }));
  console.log(`Created ${kitPath(slug)}`);
}

if (command === 'check') {
  if (!fs.existsSync(kitFile)) fail(`${kitPath(slug)} not found. Run: npm run kit -- init ${slug}`);

  const problems = checkKit(fs.readFileSync(kitFile, 'utf8'));
  if (problems.length) {
    console.error(problems.map((p) => `- ${p}`).join('\n'));
    process.exit(1);
  }
  console.log(`${kitPath(slug)} passes the platform rules.`);
}
