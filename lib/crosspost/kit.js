import matter from 'gray-matter';
import { SITE_URL } from './devto.js';

const DAY_MS = 86400000;
const WEDNESDAY = 3;
const LINKEDIN_MAX_LINES = 16;
const HN_TITLE_MAX = 80;

const toDate = (iso) => new Date(`${iso}T00:00:00Z`);
const toIso = (d) => d.toISOString().slice(0, 10);
const addDays = (d, n) => new Date(d.getTime() + n * DAY_MS);
const later = (a, b) => (a > b ? a : b);

function nextWednesday(d) {
  return addDays(d, (WEDNESDAY - d.getUTCDay() + 7) % 7);
}

// Dates are suggestions from distribution-strategy.md: LinkedIn and HN on a Wednesday,
// Dev.to 3-7 days after the blog post. Anything already in the past slides to today.
export function suggestSchedule(publishedIso, todayIso) {
  const published = toDate(publishedIso);
  const today = toDate(todayIso);
  return {
    linkedin: toIso(nextWednesday(later(published, today))),
    hn: toIso(nextWednesday(later(published, today))),
    devtoFrom: toIso(later(addDays(published, 3), today)),
    devtoTo: toIso(later(addDays(published, 7), today)),
  };
}

export function kitPath(slug) {
  return `research/${slug}/distribution-kit.md`;
}

// Deterministic facts plus TODO markers. The /content-repurposer skill fills the drafts.
export function renderKitSkeleton({ slug, raw, today, siteUrl = SITE_URL }) {
  const { data } = matter(raw);
  const url = `${siteUrl}/posts/${slug}`;
  const s = suggestSchedule(data.date, today);
  const devtoWhen =
    s.devtoFrom === s.devtoTo
      ? 'publish the draft any time, the 3-7 day wait has passed'
      : `publish the draft between ${s.devtoFrom} and ${s.devtoTo}`;

  return `# Distribution kit: ${data.title}

**Live:** [${url.replace('https://', '')}](${url})
**Published:** ${data.date}
**Category:** ${data.category} | **Tags:** ${(data.tags ?? []).join(', ')}

## Schedule

- **Dev.to:** run \`npm run distribute ${slug}\`, then ${devtoWhen}
- **LinkedIn:** Wednesday ${s.linkedin}, 10 AM. Link goes in your profile, never in the post.
- **Hacker News:** Wednesday ${s.hn}, 8 AM EST
- **Reddit:** after LinkedIn, one subreddit at a time

## LinkedIn

TODO

## Hacker News

### Title

TODO

### URL

${url}

### First comment

TODO

## Reddit

<!-- Pick 1-2 of: r/MachineLearning, r/mlops, r/LocalLLaMA, r/Python, r/ExperiencedDevs, r/DistributedComputing, r/selfhosted -->

### r/TODO

TODO
`;
}

function splitSections(markdown, level) {
  const marker = '#'.repeat(level);
  const out = {};
  let current = null;
  for (const line of markdown.split('\n')) {
    const m = line.match(new RegExp(`^${marker} (.+)$`));
    if (m) {
      current = m[1].trim();
      out[current] = [];
    } else if (current) {
      out[current].push(line);
    }
  }
  return Object.fromEntries(Object.entries(out).map(([k, v]) => [k, v.join('\n').trim()]));
}

const BANNED_LINKEDIN = [/excited to share/i, /i just published/i, /link in bio/i, /\bagree\?/i, /\bthoughts\?/i];

// Mechanical hard rejections from the content-repurposer skill. Voice is still a human call.
export function checkKit(markdown) {
  const problems = [];
  const text = markdown.replace(/<!--[\s\S]*?-->/g, '');

  // Placeholders would trip every other rule, so report only this until they are filled.
  if (/\bTODO\b/.test(text)) return ['Unfilled TODO markers remain.'];

  const sections = splitSections(text, 2);

  const linkedin = sections.LinkedIn ?? '';
  if (!linkedin) {
    problems.push('LinkedIn: section is missing.');
  } else {
    const lines = linkedin.split('\n').filter((l) => l.trim()).length;
    if (lines > LINKEDIN_MAX_LINES) problems.push(`LinkedIn: ${lines} lines, max is ${LINKEDIN_MAX_LINES}.`);
    if (/https?:\/\/|www\./i.test(linkedin)) problems.push('LinkedIn: no links in the post body; use "link in profile".');
    if (/\p{Extended_Pictographic}/u.test(linkedin)) problems.push('LinkedIn: no emojis.');
    const hashtags = linkedin.match(/(?<!\w)#[A-Za-z][A-Za-z0-9_]*/g) ?? [];
    if (hashtags.length < 3 || hashtags.length > 5) problems.push(`LinkedIn: ${hashtags.length} hashtags, want 3-5.`);
    for (const re of BANNED_LINKEDIN) {
      if (re.test(linkedin)) problems.push(`LinkedIn: banned phrase ${re}.`);
    }
  }

  const hn = splitSections(sections['Hacker News'] ?? '', 3);
  const title = hn.Title?.split('\n').find((l) => l.trim());
  if (!title) {
    problems.push('Hacker News: title is missing.');
  } else {
    if (title.length > HN_TITLE_MAX) problems.push(`Hacker News: title is ${title.length} chars, max is ${HN_TITLE_MAX}.`);
    if (title === title.toUpperCase() && /[A-Z]/.test(title)) problems.push('Hacker News: title is ALL CAPS.');
  }
  if (!hn['First comment']) problems.push('Hacker News: first comment is missing.');

  const subreddits = Object.keys(splitSections(sections.Reddit ?? '', 3));
  if (subreddits.length === 0) problems.push('Reddit: needs at least one "### r/<subreddit>" section.');
  if (subreddits.length > 2) problems.push(`Reddit: ${subreddits.length} subreddits, pick 1-2.`);

  return problems;
}
