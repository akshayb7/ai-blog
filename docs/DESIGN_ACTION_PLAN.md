# Design Action Plan: Expedition Logs

Comprehensive design improvements synthesized from product philosophy critique
(Stripe, Linear, Apple) and best personal tech blog research (Julia Evans,
Josh Comeau, Dan Abramov, Gwern, Maggie Appleton, Cassidy Williams, Linus Lee).

**Goal**: World-class visual quality that feels personal and human — not like
a SaaS product, not like an AI-generated template.

---

## What's Working (Do NOT Change)

- **Straw Hat logo** — genuine One Piece reference, instantly recognizable
- **Amber/orange color palette** — warm, distinctive, fits expedition metaphor
- **"Expedition Logs" naming** — authentic, not forced
- **Reading progress bar** — functional and on-brand (amber gradient)
- **Sticky Table of Contents** — essential for long-form content
- **Code block styling** — dark theme + language headers + copy buttons + amber line highlights
- **Footer personal touch** — "Currently into: One Piece, techno sets, and distributed systems"
- **Content quality** — Ray series is genuinely world-class technical writing

---

## Priority 1: Fix OG Images to Match Brand

**Impact**: High (every social share)
**Effort**: Low (~20 minutes)
**Source**: Stripe consistency + competitive benchmark

### Problem
OG images use dark blue gradient (#020617 → #1e3a8a) with blue glow.
The entire blog brand is amber/gold. Social shares look like a different site entirely.

### Changes
- [ ] **File**: `app/og/route.tsx`
- [ ] Switch background gradient to dark slate with amber/gold accents (matching site palette)
- [ ] Replace blue glow decoration with amber/gold glow
- [ ] Add Straw Hat icon to OG image (top-left or integrated into layout)
- [ ] Change category pill styling to amber accent (not white-on-transparent)
- [ ] Update footer text color from blue (#60a5fa) to amber (#fbbf24)
- [ ] Test by sharing a post URL on Twitter/LinkedIn preview tools

### Design Reference
Every OG image should be instantly recognizable as "Expedition Logs" in a social feed.

---

## Priority 2: Reduce Glassmorphism — Content Needs Grounding

**Impact**: High (visual hierarchy, removes template feel)
**Effort**: Medium (~45 minutes)
**Source**: Linear "as little design as possible" + Apple deference + anti-AI-generated signal

### Problem
Glassmorphism on EVERY surface (nav, cards, content wrapper, footer, search modal,
newsletter, about page, badges). When everything is glass, nothing stands out.
Uniform glassmorphism is a top signal of AI-generated design.

### Changes
- [ ] **Keep glass on**: Navigation bar, search modal, floating TOC button
- [ ] **Remove glass from**: Post content wrapper on `posts/[slug]/page.js`
  - Replace with solid background: `bg-white dark:bg-slate-900` with subtle border
- [ ] **Reduce glass on**: PostCard — make cards more solid, less blur
  - `bg-white/95 dark:bg-slate-900/95` instead of full glassmorphism
  - Keep subtle border, reduce or remove backdrop-blur
- [ ] **Remove glass from**: Footer
  - Make footer solid, grounded — it anchors the page
  - `bg-slate-100 dark:bg-slate-900` with top border
- [ ] **Remove glass from**: About page content card
  - Solid background, clean borders
- [ ] **Remove glass from**: Newsletter card
  - Solid background with amber accent border or left stripe
- [ ] **Files to edit**:
  - `app/globals.css` (glass classes)
  - `components/blog/PostCard.jsx`
  - `components/blog/Footer.jsx`
  - `components/blog/Newsletter.jsx`
  - `app/posts/[slug]/page.js` (content wrapper)
  - `app/about/page.js`

### Design Principle
Glass = elevated, interactive, floating (nav, modals, tooltips).
Solid = grounded, readable, content-first (post body, cards, footer).

---

## Priority 3: Kill hover:scale-105 on Cards

**Impact**: Medium (removes #1 template tell)
**Effort**: Low (~15 minutes)
**Source**: Linear restraint + anti-AI-generated design research

### Problem
Scale-on-hover is the single most common "I used a template" signal.
Every AI-generated portfolio, every Next.js starter does this.
It adds zero information and breaks grid visual rhythm.

### Changes
- [ ] **File**: `components/blog/PostCard.jsx`
  - Remove `hover:scale-105`
  - Replace with: subtle border-color shift + shadow depth change
  - Example: `hover:border-amber-300/50 dark:hover:border-amber-600/30 hover:shadow-lg transition-all duration-200`
- [ ] **File**: `components/blog/FeaturedPost.jsx`
  - Remove `hover:scale-[1.02]` from the card
  - Keep the image `hover:scale-105` inside the overflow-hidden container (this is fine — contained zoom)
  - Add subtle shadow lift instead for the card itself

### Design Principle
Hover states should communicate "interactive" without breaking layout rhythm.
Border shifts and shadow depth > scale transforms.

---

## Priority 4: Add Display Heading Font

**Impact**: High (instant personality, "designed by a human with taste")
**Effort**: Low (~30 minutes)
**Source**: Stripe typographic craft + Josh Comeau intentionality + Apple personality

### Problem
Inter is the "I didn't choose a font" font. Technically excellent but says nothing
about you. Used by every Tailwind-based site. Doesn't signal intentional design choices.

### Options (evaluate and pick one)
1. **Space Grotesk** — geometric, modern, technical without being cold
2. **Outfit** — clean with subtle character, pairs well with Inter
3. **Sora** — slightly futuristic, great for tech blog
4. **DM Serif Display** — adds warmth, editorial feel (serif heading + sans body = classic combo)
5. **Instrument Serif** — elegant, works for "expedition journal" vibe

### Changes
- [ ] **File**: `app/layout.js` — import chosen heading font from next/font/google
- [ ] **File**: `tailwind.config.js` — add `fontFamily.heading` to theme extend
- [ ] **File**: `app/globals.css` — set heading font on h1, h2, h3 (or via Tailwind typography plugin)
- [ ] Apply to: Hero heading, post titles, section headings, "About the Captain"
- [ ] Keep Inter for body text, UI elements, navigation
- [ ] Test in both light and dark mode at all heading sizes

### Design Principle
One distinctive heading font + one clean body font = instant identity.
The contrast says "I chose these with intention."

---

## Priority 5: Add Author Card to Posts

**Impact**: Medium (human connection, builds trust)
**Effort**: Low (~30 minutes)
**Source**: Dan Abramov's presence + Superhuman detail + Stripe E-E-A-T

### Problem
Once readers enter a post, the author disappears. No avatar, no bio, no personality.
The best technical blogs maintain author presence throughout.

### Changes
- [ ] Create `components/blog/AuthorCard.jsx`:
  - Avatar (photo or Straw Hat icon fallback)
  - Name: "Akshay"
  - One-line bio: role + what you're into
  - "Currently into: [rotating interest]" (pulled from a config or hardcoded)
  - Links: GitHub, LinkedIn, Twitter/X
  - Styled with amber accent, NOT glassmorphism (solid, grounded)
- [ ] **File**: `app/posts/[slug]/page.js` — render AuthorCard after post content, before Comments
- [ ] Optional: Add compact byline under post title (avatar + name + reading time)

### Expedition Theme Touch
- Use "About the Captain" as the card heading or hover tooltip
- Series posts: "Continue the expedition →" instead of generic "Next post"

---

## Priority 6: Consolidate Category Pill Colors

**Impact**: Low-Medium (brand coherence)
**Effort**: Low (~15 minutes)
**Source**: Apple color discipline + Linear "one palette"

### Problem
Category pills use 4 different gradient colors:
- Deep Learning: violet-to-purple
- GenAI: amber-to-orange
- ML Engineering: emerald-to-teal
- Data Science: rose-to-pink

This fragments the amber brand identity. Multiple competing accent colors.

### Options
**Option A — Monochrome amber**: All pills use amber with text differentiation
**Option B — Muted variants**: Amber primary + desaturated/muted versions of other colors
**Option C — Icon-only differentiation**: Same amber pill, different icon per category

### Changes
- [ ] **File**: `components/blog/Hero.jsx` — update category pill styles
- [ ] **File**: `components/blog/PostCard.jsx` — update category badge
- [ ] **File**: `components/blog/FeaturedPost.jsx` — update category badge
- [ ] Ensure consistency across all locations where category badges appear

### Recommendation
Option B (muted variants) — keeps visual distinction between categories while
maintaining amber as the dominant brand color.

---

## Priority 7: Enrich About Page

**Impact**: High (authority + trust + subscriber conversion)
**Effort**: Medium (~1 hour, mostly content writing)
**Source**: Cassidy Williams warmth + Stripe "tell the whole story" + best blog patterns

### Problem
"About the Captain" is a great title, but the page is thin.
Doesn't build the authority signals that make readers trust deep technical dives.
Best personal blogs make their about page a mini-essay, not a resume.

### Changes
- [ ] **File**: `app/about/page.js`
- [ ] Add professional background: where you've worked, what you've built, scale numbers
- [ ] Add "The Expedition" section — why distributed systems? What's the journey?
- [ ] Add a photo (human connection, not just an icon)
- [ ] Expand personal interests into a narrative:
  - One Piece: what it means to you, why pirate metaphor resonates
  - Music: techno sets, what you listen to while coding
  - F1 / Cricket: quick mentions that make you relatable
  - Food: what you're cooking or eating lately
- [ ] Add "Captain's Log" section for recent personal updates (optional, low priority)
- [ ] Keep solid background (not glass) per Priority 2
- [ ] Add links to talks, GitHub repos, notable projects

### Design Principle
The about page is where readers decide to subscribe. Make it worth reading on its own.

---

## Priority 8: One "Impossible to Template" Detail

**Impact**: Very High (memorability — what separates good from unforgettable)
**Effort**: High (creative investment, ~2-4 hours)
**Source**: Julia Evans' hand-drawn zines, Josh Comeau's interactive widgets,
Linus Lee's custom tools, Maggie Appleton's illustrated gardens

### Problem
The blog is polished and well-built, but every element could exist on any
well-made Next.js blog. Nothing screams "only Akshay would do this."

### Options (pick one or two, don't do all)
1. **Custom-illustrated diagrams** in technical posts — hand-drawn or unique style
   (vs generic Mermaid/Excalidraw that every blog uses)
2. **"Ship's Log" sidebar widget** — shows what you're currently reading, listening to,
   watching, building. Updates periodically. Feels alive.
3. **Interactive expedition map** — visual representation of your blog series as
   a treasure map / navigation chart. Each series is an island.
4. **Custom code annotations** — editorial-style callouts in code blocks that feel
   like margin notes from a person, not auto-generated docs
5. **Expedition-themed 404 page** — "You've sailed off the map, Captain" with
   Straw Hat icon and personality

### Implementation
- [ ] Choose 1-2 options from above
- [ ] Design and implement
- [ ] This is a "when inspiration strikes" item, not a checkbox to rush through

### Design Principle
The detail that makes someone screenshot your blog and share it isn't the layout.
It's the thing that clearly required human taste and manual effort.

---

## Priority 9: Subtle Imperfection Signals

**Impact**: Medium (anti-AI-generated perception)
**Effort**: Low-Medium (ongoing mindset, not a single change)
**Source**: Anti-AI-generated design research, human craft patterns

### Problem
Perfectly symmetrical layouts, uniform spacing, and flawless consistency
paradoxically now read as "machine-made." The most human-feeling blogs have
content-specific design choices.

### Changes (Apply Gradually)
- [ ] Let some posts have slightly different layouts when content demands it
  (e.g., a post with many diagrams gets wider images, a code-heavy post
  gets different spacing)
- [ ] Vary pull quote styling between posts when it serves the content
- [ ] Allow asymmetric design in the About page (doesn't need to mirror homepage structure)
- [ ] Resist the urge to make every element pixel-identical across all pages

### Design Principle
Consistency is a tool, not a religion. Breaking it with intention signals human judgment.

---

## Implementation Notes

### Order of Operations
1. Priorities 1-3 in first session (OG, glassmorphism, hover — all low-effort)
2. Priority 4 in same or next session (heading font — needs visual testing)
3. Priority 5 in next session (author card — straightforward component)
4. Priority 6 alongside any other card work (category colors — quick)
5. Priority 7 when energy is right (about page — content-heavy)
6. Priorities 8-9 are ongoing creative investments, not rush items

### Branch Strategy
Work on `feature/design-refresh` branch. Each priority can be its own commit.

### Testing After Each Change
- Visual: Check both light and dark mode
- Responsive: Check mobile, tablet, desktop
- Build: `npm run build` must pass
- Social: For OG changes, test with Twitter Card Validator / LinkedIn Post Inspector
