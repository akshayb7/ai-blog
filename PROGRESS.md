# ai-blog Progress

## Current State

Branch: `chore/claude-md` — PR open, pushed, ready to review/merge.
Blog live locally at http://localhost:3001. Dev server running in background.
119 unit tests passing. Previous branch `research/image-gen-quantization` (PR #17) still open against main.

## Recent Changes

### 2026-03-08 — Session: CLAUDE.md + design system overhaul

- **CLAUDE.md created**: Full project guide — repo structure, content workflow, MDX frontmatter schema, frontend conventions, testing rules, active series, known issues, key architectural decisions
- **Testing rules codified**: Coverage baseline 94.3% statements / 83.9% branch. Rule: any component modified gets tests updated alongside.
- **`lib/categories.js` created**: Single source of truth for hero category pills. Add category here to show it on homepage.
- **Hero.jsx refactored**: Derives pills from `lib/categories.js`, converted from `'use client'` to Server Component, single amber accent on all pills
- **Category renamed**: "AI Image Generation" → "GenAI" across nav, post frontmatter, hero pills, URL (`/category/genai`)
- **Newsletter removed**: Non-functional alert popup removed from homepage. RSS Feed link added to footer Explore section.
- **Dark mode toggle added**: Sun/Moon in nav (desktop right of search, mobile left of hamburger). Mounted check prevents hydration mismatch.
- **Default theme set to dark**: `defaultTheme="dark"` in ThemeProvider
- **Glass removed from prose**: Post content wrapper no longer uses `glass-card` — prose sits directly on page background
- **Card hover fixed**: Removed stacked `hover:scale-105` (card) + `hover:scale-110` (image). Now: card stays still, image breathes at `scale-105`, amber border transition on hover.
- **Font swapped**: Inter → IBM Plex Sans (body/headings) + IBM Plex Mono (code blocks). Loaded via next/font/google with CSS variables.
- **Descender clipping fixed**: Added `pb-2` to hero h1 — `bg-clip-text` was cutting off 'g' descender with IBM Plex Sans
- **Category badges updated**: White bg + dark text in light mode, dark glass in dark mode. Works on dark images in both themes.
- **Footer copy updated**: Matches current About page voice ("Field notes from building..." / "Currently into: One Piece, F1, techno...")
- **Featured post changed**: `running-image-gen-locally-apple-silicon` is now the featured post (was `why-ray-from-python-to-distributed`)

### 2026-03-08 — Session: AI Image Gen post + About page rewrite (prior)
- New post: `running-image-gen-locally-apple-silicon.mdx` — Part 1 of image gen series
- About page rewritten with real personal voice
- PR #17 open against main

## Key Decisions

- **`lib/categories.js`**: Controls which categories appear as hero pills. Only add when category has real posts.
- **GenAI over "AI Image Generation"**: Broader label, better URL (`/category/genai`), covers image gen + fine-tuning + inference posts under one umbrella.
- **Field notes framing**: Not tutorials. Failures stay in. Every post has things that couldn't be written without running the code.
- **Newsletter deferred**: Remove until real integration exists. RSS is the honest alternative.
- **Dark mode default**: Blog defaults to dark. User preference persists via next-themes.
- **IBM Plex Sans**: Chosen for engineering heritage over DM Sans (generic) and Geist (becoming the Next.js default). IBM Plex Mono for code.
- **Badge strategy**: White/dark text in light mode, black glass in dark mode — works on always-dark images in both themes.
- **LinkedIn strategy**: No external links in post body. "Link in profile." Wednesday 10am.

## Next Steps (Prioritized)

1. **Merge PR #17** (`research/image-gen-quantization`) into main — image gen post + about page
2. **Merge `chore/claude-md`** into main after PR #17 — CLAUDE.md + design overhaul
3. **Write Post 2**: "Why Your AI Images Look Pixelated: Quantization, Distillation & Inference" — research + PROMPT.md ready in `research/image-gen-quantization/`
4. **Reddit post**: r/LocalLLaMA for Post 1 — native self-post, link at bottom
5. **HN submission**: Wait for Post 2. Wednesday 8am EST.
6. **Photo for About page**: Straw hat placeholder still in use
7. **Remaining design items** (lower priority, discuss before doing):
   - Remove gradient text on hero h1 (plain bold instead)
   - Further strip glassmorphism from cards/footer (nav-only glass)

## Series Status

### Local AI Image Generation
- Part 1: ✅ Written, pushed, PR #17 open — "Running AI Image Generation Locally on Apple Silicon" — **currently featured post**
- Part 2: 📋 Planned — "Why Your AI Images Look Pixelated: Quantization, Distillation & Inference Explained"

### Ray Architecture Deep Dive
- Parts 1-7: ✅ Published on main
- Part 8+: Not planned yet
