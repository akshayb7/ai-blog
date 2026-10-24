import fs from 'fs';
import path from 'path';

// Finds content/posts/**/<slug>.mdx. Slugs are filenames, so the first match is the only match.
export function findPostFile(slug, postsDir) {
  const file = fs.readdirSync(postsDir, { recursive: true }).find((f) => path.basename(f) === `${slug}.mdx`);
  return file && path.join(postsDir, file);
}
