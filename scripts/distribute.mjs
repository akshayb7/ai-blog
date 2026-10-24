#!/usr/bin/env node
// Usage: npm run distribute <slug> [-- --dry-run]
// Converts a post for Dev.to and pushes it as an unpublished draft.
import fs from 'fs';
import os from 'os';
import path from 'path';
import { convertToDevto } from '../lib/crosspost/devto.js';
import { pushDraft } from '../lib/crosspost/devto-client.js';
import { parseEnv } from '../lib/crosspost/env.js';
import { findPostFile } from '../lib/crosspost/posts.js';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const POSTS_DIR = path.join(ROOT, 'content/posts');
const STATE_FILE = path.join(ROOT, '.crosspost/devto.json');
const SECRETS_FILE = path.join(os.homedir(), '.config/shell/secrets.env');

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const slug = args.find((a) => !a.startsWith('--'));

function fail(msg) {
  console.error(msg);
  process.exit(1);
}

function loadApiKey() {
  if (process.env.DEVTO_API_KEY) return process.env.DEVTO_API_KEY;
  if (!fs.existsSync(SECRETS_FILE)) return undefined;
  return parseEnv(fs.readFileSync(SECRETS_FILE, 'utf8')).DEVTO_API_KEY;
}

const readState = () => (fs.existsSync(STATE_FILE) ? JSON.parse(fs.readFileSync(STATE_FILE, 'utf8')) : {});

function writeState(state) {
  fs.mkdirSync(path.dirname(STATE_FILE), { recursive: true });
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2) + '\n');
}

if (!slug) fail('Usage: npm run distribute <slug> [-- --dry-run]');

const file = findPostFile(slug, POSTS_DIR);
if (!file) fail(`No post found for slug "${slug}" under content/posts/`);

const article = convertToDevto({ slug, raw: fs.readFileSync(file, 'utf8') });

// The canonical URL should resolve before Dev.to goes live, or Google may index Dev.to first.
const live = await fetch(article.canonical_url, { method: 'HEAD' }).catch(() => null);
if (!live?.ok) {
  console.warn(`Warning: ${article.canonical_url} is not live yet (${live ? live.status : 'unreachable'}). Publish on the blog before publishing on Dev.to.`);
}

if (dryRun) {
  const { body_markdown, ...meta } = article;
  console.log(JSON.stringify({ ...meta, body_chars: body_markdown.length }, null, 2));
  process.exit(0);
}

const apiKey = loadApiKey();
if (!apiKey) fail('DEVTO_API_KEY not found in the environment or ~/.config/shell/secrets.env');

const state = readState();
const result = await pushDraft({ article, apiKey, articleId: state[slug]?.id });

state[slug] = { id: result.id, url: result.url };
writeState(state);

console.log(`Dev.to draft ${result.action}: ${result.url}`);
if (result.published) console.log('Note: this article is already published; the update changed the live post.');
