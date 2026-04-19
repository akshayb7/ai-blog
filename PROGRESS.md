# ai-blog Progress

## Current State

Three branches with work:
- `chore/claude-md` — pushed, PR-ready. CLAUDE.md + full design overhaul (12 commits).
- `content/quantization-distillation-inference` — pushed, PR-ready. Post 2 + auto-feature + hero image.
- `research/image-gen-quantization` (PR #17) — open against main. Post 1 + about page rewrite.

**Merge order**: PR #17 first → `chore/claude-md` → `content/quantization-distillation-inference`.

Blog live locally at http://localhost:3001. 119 unit tests passing.

## Recent Changes

### 2026-03-14 — Session: Post 2 + auto-feature + LinkedIn

- **Post 2 written**: "Why Your AI Images Look Pixelated — Quantization, Distillation & Inference" — merged best of old branch version (inline images, mflux-save tip, tighter structure) + new additions (hardware recs, CFG formula, "What I Got Wrong" section)
- **Hero image generated**: FLUX.1 Dev at q8, 1200×640, seed 4219
- **Auto-feature**: `getFeaturedPost()` now returns newest post by date. No more manual `featured: true` flag management.
- **LinkedIn post drafted**: For Post 2, scheduled Wednesday March 19, 10 AM. Q4 vs q6 comparison image as attachment.
- **Post 2 date**: Set to 2026-03-18

### 2026-03-08 — Prior session: CLAUDE.md + design overhaul
- CLAUDE.md created, testing rules added, Hero/Nav/Newsletter/Footer/Cards/Font/Theme/Badges all updated — see handoff `2026-03-08-2350.md`

## Key Decisions

- **Auto-featured post**: Newest post (by date) is always featured. No manual flag. Simpler, no maintenance.
- **Post 2 merged approach**: Old branch had inline images + practical tips. New version had hardware recs + CFG depth. Combined the best of both, cut Post 1 overlap.
- **LinkedIn voice**: Match Post 1 style (conversational, flowing sentences). Avoid per-line insight structure. Attach visual proof (q4 vs q6 comparison).
- **Settled decisions now in CLAUDE.md**: GenAI category, IBM Plex Sans font, badge strategy, glass policy, dark mode default, lib/categories.js — no longer tracked here.

## Next Steps (Prioritized)

1. **Merge all three branches** in order: PR #17 → chore/claude-md → content/quantization-distillation-inference
2. **Reddit post**: r/LocalLLaMA for Post 1 — native self-post, link at bottom
3. **HN submission**: Post 2 has deeper technical novelty. Wednesday 8am EST.
4. **Photo for About page**: Straw hat placeholder still in use
5. **Remaining design items** (discuss before doing):
   - Remove gradient text on hero h1
   - Further strip glassmorphism from cards/footer

## Series Status

### Local AI Image Generation — COMPLETE
- Part 1: ✅ "Running AI Image Generation Locally on Apple Silicon" — LinkedIn posted, got traction
- Part 2: ✅ "Why Your AI Images Look Pixelated — Quantization, Distillation & Inference" — LinkedIn scheduled March 19

### Ray Architecture Deep Dive
- Parts 1-7: ✅ Published on main
- Part 8+: Not planned yet
