# CLAUDE.md — Expedition Logs Blog

Read this fully at the start of every session before touching any code.

## What This Project Is

**Name**: Expedition Logs
**URL**: https://blog.akshayworks.com
**Purpose**: Akshay's technical blog — field notes from building with distributed systems, ML infrastructure, and AI at scale. Not tutorials. The difference matters: tutorials clean up the mess, field notes keep it in.
**Stack**: Next.js 16 (App Router) · Tailwind CSS v3 · shadcn/ui · MDX · Framer Motion
**Status**: Live in production. Writing and design work ongoing in parallel.

---

## Repository Structure

```
ai-blog/
├── CLAUDE.md                        # This file — project rules and conventions
├── PROGRESS.md                      # Living progress tracker (updated every session)
│
├── app/                             # Next.js App Router
│   ├── layout.js                    # Root layout — fonts, metadata, ThemeProvider
│   ├── page.js                      # Homepage — Hero, FeaturedPost, RecentPosts, Newsletter
│   ├── globals.css                  # Global styles, .glass / .glass-card utilities
│   ├── about/page.js                # About page
│   ├── posts/[slug]/page.js         # Individual post page — MDX rendering, ToC, ReadingProgress
│   ├── category/[category]/page.js  # Category listing page
│   ├── posts/page.js                # All posts listing
│   ├── og/route.js                  # Dynamic OG image generation (@vercel/og)
│   ├── sitemap.ts                   # Auto-generated sitemap
│   ├── robots.ts                    # robots.txt
│   └── feed.xml/                    # RSS feed
│
├── components/
│   ├── blog/                        # All page-level components
│   │   ├── Navigation.jsx           # Fixed glassmorphic nav, search (⌘K), mobile menu
│   │   ├── Hero.jsx                 # Homepage hero — h1 + category pills
│   │   ├── FeaturedPost.jsx         # Full-width featured card with image overlay
│   │   ├── RecentPosts.jsx          # 3-column post grid
│   │   ├── PostCard.jsx             # Individual card in the grid
│   │   ├── Newsletter.jsx           # Email signup section
│   │   ├── Footer.jsx               # 4-column footer with social links
│   │   ├── TableOfContents.jsx      # Fixed sidebar ToC (post pages)
│   │   ├── ReadingProgress.jsx      # Top progress bar (post pages)
│   │   ├── SearchModal.jsx          # ⌘K full-text search modal (FlexSearch)
│   │   ├── Comments.jsx             # Giscus GitHub Discussions comments
│   │   ├── CodeBlock.jsx            # Code block with copy button
│   │   ├── MDXImage.jsx             # next/image wrapper for MDX img tags
│   │   └── PerformanceMonitor.jsx   # Dev-only performance logging
│   │
│   └── ui/                          # shadcn/ui primitives (copy-paste model)
│       ├── card.tsx
│       ├── badge.tsx
│       ├── button.tsx
│       └── straw-hat.tsx            # Custom SVG logo component
│
├── content/
│   └── posts/                       # All MDX blog posts — organized by category folder
│       ├── distributed-systems/     # Ray series and distributed systems posts
│       └── ai-image-generation/     # Local image gen series
│
├── lib/
│   └── posts.js                     # Post loading — getAllPosts, getPostBySlug, getFeaturedPost
│
├── public/
│   └── images/                      # All blog images (hero, post images, demos)
│
├── research/                        # Pre-writing research docs and PROMPT.md files
│   └── <topic>/
│       ├── research.md              # Raw research notes
│       └── PROMPT.md                # Writing instructions for the blog-writer skill
│
├── hooks/                           # React hooks
│
├── __tests__/                       # Vitest unit tests
├── e2e/                             # Playwright end-to-end tests
│
├── tailwind.config.js               # Tailwind config — typography plugin, dark mode
├── next.config.mjs                  # Next.js config
└── mdx-components.jsx               # MDX component overrides
```

---

## Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
# Runs at http://localhost:3000 (or 3001 if 3000 is taken)

# Run unit tests
npm test

# Run e2e tests
npm run test:e2e

# Build for production
npm run build
```

**Package manager**: `npm`. The `package-lock.json` is always committed. Never use `yarn` or `pnpm`.

---

## Non-Negotiable Rules

### Session Continuity
- Use the `session-context` skill at the start and end of every working session.
- `/pickup` at the start of a session to restore context from `PROGRESS.md`.
- `/handoff` before stopping to snapshot decisions, progress, and next steps.
- Never start work in a new session without reading `PROGRESS.md` first.
- **Also run `/handoff` after any significant commit**, defined as:
  - A new component, page, or design pattern is introduced
  - A content or nav decision changes the site structure
  - A new blog post is written and pushed
  - A TBD decision in this `CLAUDE.md` is resolved
  The rule of thumb: if losing this session's context would mean losing a decision that
  affects future content or design work, run `/handoff` now, not later.

### Git Commits
- Small, atomic commits. One logical change per commit.
- Commit message format: `type(scope): short description`
  - Types: `feat`, `fix`, `content`, `style`, `refactor`, `test`, `chore`, `docs`
  - Examples: `content: add Ray fault tolerance post`, `feat(nav): add dark mode toggle`, `fix(hero): sync category pills with nav`
- Never commit broken builds. Run `npm run build` before merging to main.
- Never commit `.env` files or API keys.
- Branch naming: `content/<post-slug>`, `feat/<feature-name>`, `chore/<task>`

### Code Quality
- **Server Components by default** — `'use client'` only when interactivity is required.
  Push the client boundary to the smallest possible leaf component.
- **shadcn/ui first** — use or extend shadcn primitives before building anything custom.
  If it's in the shadcn registry, use it.
- **No hardcoded nav links or category lists** in components — derive from data or lib functions.
  (The Hero category pills being hardcoded is a known issue to fix.)
- **No `console.log` in production components** — remove before committing.
- **No non-functional UI** — a newsletter with `alert('coming soon!')` ships nothing. Either
  integrate it or remove it.

### Parallel Subagents
- Use the `Agent` tool to parallelize independent work. Any time two tasks have no shared
  output dependency, run them concurrently — do not do them sequentially.
- Common patterns:
  - Write a new component while simultaneously updating tests
  - Spawn an `Explore` agent for codebase research while writing content
  - Use a `general-purpose` agent to look up current library docs via Context7 while
    implementing the integration in the main context
- Rule of thumb: if two tasks have no shared output dependency, parallelize them.

### Research and Documentation Tools
- **Context7 MCP**: Before integrating any new library or API, use Context7 to retrieve
  current documentation:
  1. Call `mcp__context7__resolve-library-id` with the library name
  2. Call `mcp__context7__query-docs` with the library ID and your specific question
  Never assume API signatures from memory — Next.js, MDX, and shadcn APIs change.
- **WebSearch**: Use for anything time-sensitive — current Next.js version, shadcn component
  availability, Vercel/Railway deployment notes.

---

## Content Creation

### The Voice
Posts are **field notes**, not tutorials. The distinction is load-bearing:
- Tutorials: clean up the mess, show the happy path, present polished steps.
- Field notes: keep the failures in, show what broke first, include real benchmarks.

Every post should contain things that couldn't have been written without running the code.

### MDX Frontmatter Schema

Every post must have these fields:

```yaml
---
title: "Full post title in quotes"
date: "YYYY-MM-DD"
description: "1-2 sentence description used in cards, SEO, and OG images"
category: "Distributed Systems"        # Must match a real nav category
tags: ["Tag1", "Tag2", "Tag3"]         # 3-6 tags, TitleCase
featured: false                         # true for the homepage featured slot — only 1 post at a time
image: "/images/your-image.png"         # Required. OG image + card thumbnail. 1200×630 recommended.
author: "Akshay"
readTime: "12 min read"                # Estimate manually
series: "Ray Architecture Deep Dive"   # Optional — only if part of a named series
seriesPart: 1                          # Optional — series index number
---
```

### Post Organization

Posts live in `content/posts/<category-slug>/` where `category-slug` matches the URL pattern
used in the nav:

| Category Name | Folder | Nav URL |
|---|---|---|
| Distributed Systems | `content/posts/distributed-systems/` | `/category/distributed-systems` |
| AI Image Generation | `content/posts/ai-image-generation/` | `/category/ai-image-generation` |

**Slug = filename** (without `.mdx`). The `lib/posts.js` loader recursively scans all
category subfolders and maps filename → slug. A post at
`content/posts/distributed-systems/ray-gcs-brain-of-the-cluster.mdx` is accessible at
`/posts/ray-gcs-brain-of-the-cluster`.

### Images

- All post images in `public/images/`
- Naming: `<short-topic-description>.png` (e.g., `local-image-gen-apple-silicon.png`)
- Hero / OG images: 1200×630px
- Inline demo images: any size, referenced via `<MDXImage>` in MDX
- Generated images from mflux: save to `~/Pictures/generated/` first, then copy to `public/images/`

### Writing Workflow

1. Create `research/<topic>/research.md` — raw notes, links, benchmarks, failures
2. Create `research/<topic>/PROMPT.md` — writing instructions for the blog-writer skill
3. Run `/blog-writer` to draft the post
4. Save the MDX file to `content/posts/<category>/`
5. Add images to `public/images/`
6. Run `/content-repurposer` to generate LinkedIn / Twitter / Reddit variants
7. Commit and push on a `content/<slug>` branch → open PR → merge to main

### Skills for Content

| Task | Skill |
|---|---|
| Write a blog post from research notes | `/blog-writer` |
| Generate LinkedIn, Twitter, Reddit, HN variants | `/content-repurposer` |
| Generate images locally (Apple Silicon) | `/image-gen` |
| Snapshot session state | `/session-context` |

### Distribution Strategy

- **LinkedIn**: Link in profile, never in post body. Wednesday 10am. Understated close.
- **Twitter/X**: 5-tweet thread + link reply.
- **Reddit (r/LocalLLaMA)**: Native self-post, link at bottom. Technical content only.
- **HN**: Wait for posts with deep technical novelty. Wednesday 8am EST.
- **RSS**: Feed at `/feed.xml` — already live and generated.

---

## Frontend Architecture

### Design System

- **Accent color**: Amber/orange (`amber-500` / `orange-600`) — consistent with the straw hat identity
- **Dark mode**: `class` strategy via `next-themes`. Slate-950 backgrounds in dark.
- **Glass surfaces**: `.glass` and `.glass-card` utilities in `globals.css` — use on nav and
  overlaid elements only. Do not apply to prose content or plain card surfaces.
- **Typography plugin**: `@tailwindcss/typography` with amber link colors and custom dark mode overrides

### Component Conventions

- **One component per file** in `components/blog/`
- **PascalCase** filenames: `FeaturedPost.jsx`, `TableOfContents.jsx`
- **`'use client'` only when needed**: Navigation, SearchModal, Newsletter, ReadingProgress,
  TableOfContents are client. Most else should be server.
- **shadcn from `components/ui/`**: Card, Badge, Button are the active primitives.
  Add new shadcn components via `npx shadcn@latest add <component>`.

### Page Structure

All pages follow the same shell:

```jsx
<div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50/20 to-orange-50/20 dark:from-slate-950 dark:via-amber-950/20 dark:to-slate-900">
  <Navigation posts={allPosts} />
  <main>...</main>
  <Footer />
</div>
```

### Navigation

Nav links must reflect **actual content categories** only. Never add a nav link for a category
that has no posts. Current live nav links:

```js
const navLinks = [
  { name: 'All Posts', href: '/posts' },
  { name: 'Image Generation', href: '/category/ai-image-generation' },
  { name: 'Distributed Systems', href: '/category/distributed-systems' },
  { name: 'About', href: '/about' },
];
```

Update this list whenever a new category has at least 1 published post.

---

## Active Series

| Series | Category | Posts | Status |
|---|---|---|---|
| Ray Architecture Deep Dive | Distributed Systems | 7 parts | Active — Parts 1–7 live |
| Local AI Image Generation | AI Image Generation | 2 parts | Active — Part 1 live, Part 2 planned |

### Ray Architecture Deep Dive (Parts 1–7 published)
- Part 1: Why Ray? From Python to Distributed Clusters
- Part 2: Ray Runtime — From Init to First Task
- Part 3: Tasks, Actors, and the Execution Model
- Part 4: The Object Store and Zero-Copy Memory
- Part 5: Ray GCS — Brain of the Cluster
- Part 6: Scheduling and Resource Management
- Part 7: Fault Tolerance and Recovery

### Local AI Image Generation
- Part 1: Running AI Image Generation Locally on Apple Silicon ✅
- Part 2: Why Your AI Images Look Pixelated — Quantization, Distillation & Inference (research + PROMPT.md ready in `research/image-gen-quantization/`)

---

## Key Architectural Decisions

1. **MDX via `next-mdx-remote`** — server-side rendering, supports math (KaTeX), GFM, syntax highlighting (rehype-pretty-code with github-dark theme)
2. **Flat slug routing** — slugs are filenames, not full paths. `lib/posts.js` resolves category subfolders automatically. This means slug collisions across categories are not supported — names must be globally unique.
3. **Dynamic OG images** — generated at `/og` using `@vercel/og`. Takes `title` and `category` query params. Post metadata references these via `generateMetadata`.
4. **FlexSearch for full-text search** — client-side, no server required. Search index is built from all post frontmatter on the client.
5. **Giscus for comments** — GitHub Discussions-backed. Zero database, zero maintenance.
6. **next-themes for dark mode** — `ThemeProvider` wraps the app. `'class'` strategy.
7. **Framer Motion installed** — available for animation work. Not yet used systematically.
8. **RSS feed** — generated at build time from all posts. Live at `/feed.xml`.

---

## Known Issues (Fix Before Next Significant Deploy)

1. **Hero category pills are hardcoded** — `Hero.jsx` lists Deep Learning, GenAI, ML Engineering,
   Data Science. These do not match the actual nav or content. Either derive from real categories
   or remove the pills.
2. **Newsletter is non-functional** — `Newsletter.jsx` shows `alert('coming soon!')`. Replace
   with a real integration (ConvertKit / Resend) or remove the section entirely.
3. **No dark mode toggle in nav** — `ThemeProvider` is wired up but there's no UI affordance
   to switch. Users cannot change the theme.
4. **`'use client'` on Hero** — Hero contains no state or interactivity and is marked `'use client'`.
   Should be a Server Component.

---

## Deployment

- **Hosting**: Vercel (inferred from `blog.akshayworks.com` domain and `@vercel/og` dependency)
- **Branch strategy**: All feature/content work on branches → PR → merge to `main` → Vercel auto-deploys
- **Build check**: Run `npm run build` locally before merging anything to main

---

## Product Philosophy

> For any design, architecture, or content strategy decision, invoke `/design-philosophy` or `/frontend-design`. Document which philosophy was applied.

The blog's identity is **Linear-adjacent** in philosophy: every design decision must be explainable. "It looks nice" is not a reason. If you cannot explain why a component exists or why a visual element is there, remove it.

---

**Last Updated**: 2026-03-08
**Maintained By**: Claude Code Agent
**Project Owner**: Akshay Bhardwaj
