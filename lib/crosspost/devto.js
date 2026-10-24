import matter from 'gray-matter';

export const SITE_URL = 'https://blog.akshayworks.com';
const MAX_DEVTO_TAGS = 4;

// Dev.to allows lowercase alphanumeric tags only, max 4.
export function toDevtoTags(tags = []) {
  const cleaned = tags.map((t) => String(t).toLowerCase().replace(/[^a-z0-9]/g, '')).filter(Boolean);
  return [...new Set(cleaned)].slice(0, MAX_DEVTO_TAGS);
}

function absolutize(url, siteUrl) {
  return url.startsWith('/') ? `${siteUrl}${url}` : url;
}

// Inline math: opening $ not followed by a space, closing $ not preceded by a
// space or followed by a digit, so prose like "costs $5 and $10" is left alone.
const INLINE_MATH = /(?<![\\$\w])\$(?!\s)([^$\n]+?)(?<!\s)\$(?![\w$])/g;

function convertInline(line, siteUrl) {
  // Split on inline code spans so their contents are never rewritten.
  return line
    .split(/(`[^`]*`)/)
    .map((part, i) => {
      if (i % 2 === 1) return part;
      return part
        .replace(/(!?\[[^\]]*\]\()(\/[^)\s]*)(\))/g, (_, open, url, close) => `${open}${absolutize(url, siteUrl)}${close}`)
        .replace(INLINE_MATH, (_, tex) => `{% katex inline %}${tex}{% endkatex %}`);
    })
    .join('');
}

function convertBody(body, siteUrl) {
  const out = [];
  let inFence = false;
  let inMathBlock = false;

  for (const line of body.split('\n')) {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      out.push(line);
      continue;
    }
    if (inFence) {
      out.push(line);
      continue;
    }

    if (inMathBlock) {
      if (line.trim() === '$$') {
        out.push('{% endkatex %}');
        inMathBlock = false;
      } else {
        out.push(line);
      }
      continue;
    }

    if (/^\s*(import|export)\s/.test(line)) continue;

    const jsx = line.match(/^\s*<([A-Z][A-Za-z0-9]*)[\s/>]/);
    if (jsx) {
      // Dropping a component would silently lose content, so fail loudly instead.
      throw new Error(`Unsupported JSX component <${jsx[1]}> outside a code fence: ${line.trim()}`);
    }

    if (line.trim() === '$$') {
      out.push('{% katex %}');
      inMathBlock = true;
      continue;
    }
    const singleLine = line.match(/^\s*\$\$(.+)\$\$\s*$/);
    if (singleLine) {
      out.push(`{% katex %}\n${singleLine[1].trim()}\n{% endkatex %}`);
      continue;
    }

    out.push(convertInline(line, siteUrl));
  }

  return out.join('\n');
}

// Pure: raw MDX string in, Dev.to article fields out. Publishing is the caller's job.
export function convertToDevto({ slug, raw, siteUrl = SITE_URL }) {
  const { data, content } = matter(raw);

  const article = {
    title: data.title,
    description: data.description,
    tags: toDevtoTags(data.tags),
    canonical_url: `${siteUrl}/posts/${slug}`,
    body_markdown: convertBody(content, siteUrl).trim() + '\n',
  };
  if (data.image) article.main_image = absolutize(data.image, siteUrl);
  if (data.series) article.series = data.series;

  return article;
}
