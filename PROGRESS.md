# ai-blog Progress

## Current State

**Active branch**: `transformers` — The Codex series launched. Entry 1 "Attention is a Potluck" shipped.

Two atomic commits pushed, PR ready:
- `feat(nav): add Codex category to nav and hero pills`
- `content(codex): add first entry — Attention is a Potluck`

PR URL: https://github.com/akshayb7/ai-blog/pull/new/transformers

Blog live locally at http://localhost:3001. 119 unit tests passing. Production build clean.

Prior branches on main already merged.

## Recent Changes

### 2026-04-19 — Session: The Codex launch + Entry 1

- **New series launched**: The Codex — living, unnumbered, two entry types (primitives + teardowns). See handoff `2026-04-19-1353.md` for full strategy.
- **Entry 1 published**: "Attention is a Potluck" at `content/posts/codex/attention-is-a-potluck.mdx`. Teaches single-head + self-attention via potluck analogy (craving/label/food → Q/K/V). Math arrives at ~60% mark.
- **Four FLUX.1 Dev illustrations** generated (~5 regens on the weighted plate to tune butter chicken + leaf). Hero, weighted plate, round table, three chefs.
- **Discoverability**: Codex added as first content category in nav and first hero pill. New lucide icon `NotebookText`. Hero test updated for 3 categories.
- **Reference doc saved**: `research/attention-is-a-potluck/analogy-reference.md` — full 6-rung potluck ladder + vocabulary + voice notes + scope proposals for future entries.

### 2026-03-14 — Session: Post 2 + auto-feature + LinkedIn
- Post 2 (quantization/distillation/inference) merged, auto-feature logic added, LinkedIn scheduled — see handoff `2026-03-14-0045.md`

### 2026-03-08 — Prior: CLAUDE.md + design overhaul
- See handoff `2026-03-08-2350.md`

## Key Decisions

- **The Codex is unnumbered and continuous.** No "Part N of M." Each entry stands alone, linked by idea/tag. Entry types are `primitive` (evergreen) and `teardown` (per-model). Reasoning: Gemma 4 is not the finale — Qwen, Claude, DeepSeek, and whatever ships next all slot in as peers, not sequels.
- **Codex category = existing category system, no bespoke routing needed.** `content/posts/codex/` → `/category/codex` works today. A future `/codex` page will be a themed curated view of the same content (not built yet — wait until 3–4 entries exist).
- **Image bar per entry**: one hero + 2–3 inline illustrations in a consistent warm editorial style. Use FLUX.1 Dev at 1200×624 (hero) and 1216×800 (inline).
- **Writing bar**: "phone-half-distracted comprehension, coffee re-read math click, dinner-conversation recall three weeks later." Not ELI5 — full concept fidelity delivered through a concrete everyday image first, math after.
- **Settled decisions now in CLAUDE.md**: auto-feature logic, font, categories infrastructure — no longer tracked here.

## Next Steps (Prioritized)

1. **Draft Entry 2 — "The Seat Ribbons"** (positional encoding). Material already in `research/attention-is-a-potluck/analogy-reference.md` Rung 3. Target 8–10 min standalone read. Tease RoPE for a later entry.
2. **Open PR** for the `transformers` branch when ready to deploy Entry 1.
3. **Draft Entry 3 — "Eight Friends at the Buffet"** (multi-head attention). Centerpiece: the parameter-count "aha" (identical params for 8 heads of 64 vs 1 head of 512).
4. **Draft Entry 4 — "The Express Lane"** (stacking + residuals + fresh Q/K/V per block).
5. **Eventually**: first teardown entry — Gemma 4 architecture walkthrough.
6. **Known issues still open**:
   - Newsletter non-functional (shows `alert('coming soon!')`)
   - Potentially resolved, needs verification: `'use client'` on Hero (now server-safe), dark mode toggle in nav (icons appear present)

## Series Status

### The Codex — LIVE (new)
- Entry 1: ✅ "Attention is a Potluck" — shipped, `transformers` branch, PR pending merge
- Entry 2: 📝 "The Seat Ribbons" — next
- Entry 3: 📝 "Eight Friends at the Buffet" — planned
- Entry 4: 📝 "The Express Lane" — planned
- Future: RoPE deep dive, GQA, FlashAttention, MoE, quantization, LoRA, Gemma 4 teardown, Qwen teardown, etc.

### Local AI Image Generation — COMPLETE
- Part 1: ✅ "Running AI Image Generation Locally on Apple Silicon"
- Part 2: ✅ "Why Your AI Images Look Pixelated — Quantization, Distillation & Inference"

### Ray Architecture Deep Dive — COMPLETE (for now)
- Parts 1–7: ✅ Published on main
- Part 8+: Not planned
