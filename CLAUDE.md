# CLAUDE.md

This file defines the rules, architecture, and conventions for the ai-blog project.
Read this fully at the start of every session before touching any code.

---

## What This Project Is

A personal technical blog — **Akshay's Expedition Logs** (blog.akshayworks.com).
Deep dives into distributed systems, ML infrastructure, and the occasional rabbit hole.
Inspired by One Piece / pirate exploration — the expedition metaphor is meaningful, not a gimmick.

This is NOT a SaaS product. It's a personal space that should feel warm, opinionated, and human.
It should look world-class but never feel AI-generated or templated.

---

## Project Structure

```
ai-blog/
  app/                          # Next.js App Router pages
    page.js                     # Homepage — hero, featured post, recent posts, newsletter
    posts/page.js               # All posts listing
    posts/[slug]/page.js        # Individual post page
    about/page.js               # "About the Captain" page
    og/route.tsx                # Dynamic OG image generation
    layout.js                   # Root layout — ThemeProvider, fonts, performance monitor
    globals.css                 # Global styles, glassmorphism, code blocks, scrollbars

  components/
    blog/                       # Blog-specific components
      Navigation.jsx            # Fixed glassmorphic nav with Straw Hat logo
      Hero.jsx                  # Homepage hero with gradient heading + category pills
      FeaturedPost.jsx          # Large immersive card with image overlay
      PostCard.jsx              # Glass-card for post grid
      RecentPosts.jsx           # 3-column post grid
      TableOfContents.jsx       # Desktop sidebar + mobile floating button
      CodeBlock.jsx             # Dark code blocks with language headers + copy
      ReadingProgress.jsx       # Amber gradient progress bar
      SearchModal.jsx           # Cmd+K search with FlexSearch
      Newsletter.jsx            # Newsletter signup card
      Comments.jsx              # Giscus (GitHub Discussions) integration
      Footer.jsx                # Site footer with social links
      MDXImage.jsx              # Optimized image component for MDX

    ui/                         # Reusable UI primitives
      button.tsx                # Button variants (default, glass, etc.)
      card.tsx                  # Card with glass-card styling
      badge.tsx                 # Badge variants
      straw-hat.tsx             # Custom Straw Hat SVG icon (One Piece reference)

  content/posts/                # MDX blog posts organized by category
    distributed-systems/        # Ray Architecture Deep Dive series (5 parts)

  lib/
    posts.js                    # Post loading, sorting, metadata extraction
    utils.ts                    # cn() utility (clsx + tailwind-merge)

  hooks/
    useSearch.js                # FlexSearch index hook

  public/images/                # Post hero images
```

---

## Technology Stack

- **Framework**: Next.js 16 (App Router), React 19
- **Styling**: TailwindCSS 3.4 + @tailwindcss/typography
- **Animation**: Framer Motion
- **Content**: MDX via next-mdx-remote, rehype-pretty-code (Shiki), remark-gfm, KaTeX
- **Theme**: next-themes (class-based dark mode)
- **Search**: FlexSearch (client-side full-text)
- **Comments**: Giscus (GitHub Discussions)
- **OG Images**: @vercel/og (dynamic generation)
- **Icons**: Lucide React
- **Package management**: npm (lockfile committed)
- **Linting**: ESLint 9 + eslint-config-next, husky + lint-staged pre-commit hooks
- **Testing**: Vitest (unit) + Playwright (e2e) + Testing Library

---

## Design System

### Brand Identity
- **Name**: "Akshay's Expedition Logs"
- **Logo**: Custom Straw Hat SVG icon in amber-to-orange gradient box
- **Tagline**: "Deep dives into distributed systems, ML infrastructure, and the occasional rabbit hole"
- **Theme**: Pirate/exploration metaphor — genuine, not decorative

### Color Palette
- **Primary accent**: Amber-500/600 (expedition gold)
- **Secondary accent**: Orange-600 (warm adventure)
- **Gradient**: Amber → Orange (consistent throughout)
- **Inline code**: Pink-600 on pink-50 (light), pink-400 on pink-900/10 (dark)
- **Selection**: Amber-500
- **Backgrounds**: Slate-50 with amber tints (light), slate-950 with amber tints (dark)

### Visual Effects
- Glassmorphism: blur(20px), semi-transparent backgrounds — used on nav, cards, modals
- Reading progress bar: amber gradient, fixed top
- Code blocks: slate-900 with language headers, amber-highlighted lines

### Typography
- Font: Inter (Google Fonts)
- Hierarchy: Clean heading sizes, relaxed line-height for body

---

## Non-Negotiable Rules

### Session Continuity
- Use the `session-context` skill at the start and end of every working session.
- `/pickup` at the start of a session to restore context from `PROGRESS.md`.
- `/handoff` before stopping to snapshot decisions, progress, and next steps into `PROGRESS.md`.
- Never start coding in a new session without reading `PROGRESS.md` first.
- **Also run `/handoff` after any significant commit**, defined as:
  - A new component or page is created
  - The design system changes (colors, fonts, layout patterns)
  - A build/deploy configuration changes
  - SEO or metadata structure changes
  Context compaction and session limits are real — don't let important decisions
  live only in the conversation history.

### Git Commits
- Small, atomic commits. One logical change per commit.
- Commit after each working component, not at the end of a big batch.
- Commit message format: `type(scope): short description`
  (e.g. `feat(og): rebuild OG images with amber brand`, `fix(nav): correct mobile menu z-index`)
- Never commit broken code. Run `npm run build` before committing.

### Testing
- Run `npm run lint` before commits (husky pre-commit hook enforces this).
- Unit tests: `npm run test` (Vitest)
- E2E tests: `npm run test:e2e` (Playwright)
- Build verification: `npm run build` — must pass before any deploy.

### Code Quality
- **No `console.log` in production code** — remove debug statements before committing.
- **Prefer editing existing files** over creating new ones.
- **Component files**: JSX for blog components, TSX for ui primitives.
- **Tailwind classes**: Use `cn()` from `lib/utils.ts` for conditional class merging.
- **Images**: Always use Next.js `<Image>` with proper width/height/alt. Quality: 85%.

### Content (MDX Posts)
- All posts live in `content/posts/{category}/`.
- Frontmatter fields: title, date, description, category, readTime, featured, image, series, seriesOrder.
- Use rehype-pretty-code for code blocks (Shiki themes, line highlighting).
- Use remark-gfm for tables, strikethrough, footnotes.
- Use KaTeX for math expressions.
- Blog posts should be written using the `blog-writer` skill for voice and SEO/GEO consistency.

### SEO & Metadata
- Every page needs: title, description, canonical URL, OG image.
- Posts include JSON-LD schema (Article type).
- Dynamic OG images generated via `/og` route.

---

## Parallel Subagents

- Use the `Task` tool to parallelize independent work. Any time two tasks do not depend
  on each other's output, run them concurrently — do not do them sequentially.
- Common patterns for this project:
  - Edit multiple independent components simultaneously (e.g. PostCard + FeaturedPost)
  - Run build verification in background while making the next change
  - Research font options or design references while implementing a different change
- Rule of thumb: if two tasks have no shared output dependency, parallelize them.

---

## Research and Documentation Tools

- **WebSearch**: Use for current information — library versions, API docs, font options,
  design references. Do not guess if information might be stale.
- **Context7 MCP**: Before writing integration code for external services (Giscus, Vercel OG,
  FlexSearch, etc.), use Context7 to retrieve current documentation:
  1. Call `mcp__context7__resolve-library-id` with the library name
  2. Call `mcp__context7__query-docs` with the library ID and your question
  Never assume API signatures from memory — verified docs prevent broken integrations.

---

## Deployment

- **Hosting**: Vercel (automatic deploys from main branch)
- **Domain**: blog.akshayworks.com
- **Build**: `npm run build` (Next.js static + dynamic)
- **Preview**: Every PR gets a Vercel preview deployment

---

## Available Skills

| Skill | Use For |
|---|---|
| `blog-writer` | Writing blog posts in Akshay's voice with SEO + GEO optimization |
| `product-philosophy` | Design critiques, UX decisions, product thinking |
| `tech-architect` | Stack decisions, infrastructure choices |
| `session-context` | Session continuity via PROGRESS.md |
