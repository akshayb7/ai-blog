# ai-blog Progress

## Current State

**New post on branch `content/harness-engineering`, PR open, awaiting merge.** First entry in a new **AI Engineering** category.

Live on production:
- Codex Entry 1: `/posts/attention-is-a-potluck`
- Codex Entry 2: `/posts/seat-ribbons`
- Codex Entry 3: `/posts/eight-friends-at-the-buffet`

Pending merge:
- AI Engineering #1: `/posts/harness-engineering` — "Harness Engineering: The Model Is Half the Car"

119 unit tests passing. Production build clean (gate run pre-commit). Vault notes in sync (`my-brain-child/Blog/`).

## Recent Changes

### 2026-07-05 — Session: Harness Engineering post + new AI Engineering category
- **New post**: "Harness Engineering: The Model Is Half the Car" at `content/posts/ai-engineering/harness-engineering.mdx` (~2,300 words). Field notes; 2026 F1 analogy (LLM = engine/power unit; harness = context, verification, guardrails, removal). Four rungs: active aero → adaptive context (15KB→3.4KB CLAUDE.md trim); pit stop → verify-before-merge + JWT sanitizer; rulebook → 17-PR rate-limiter + `independent_review` flag; MGU-H → agentic-reviewer→curl removal. War stories mined from vault handoffs via Haiku subagents.
- **New category "AI Engineering"** wired: hero pill (`lib/categories.js`, Wrench icon) + nav link (`Navigation.jsx`). Hero test updated for the 4th category. Featured slot moved Entry 3 → harness post (auto by date; flag flipped).
- **3 FLUX.1 Dev images** (navy Red Bull-inspired, seeds 7010–7012; regenerated 3× to fix palette + strip real Shell/Red Bull logos + garbled text). Note: navy+red+yellow F1 scenes strongly pull real sponsor logos from FLUX — the "plain unbranded prototype" framing was needed.
- **Cross-model review (2 rounds)** by Gemini + Codex — the post's own "pit wall." R1 caught a "cars are faster" factual error + engine/driver analogy inconsistency; R2 caught a "fastest package ever" overclaim + residual driver wobble. All fixed. Both models green post-fix.
- Research + PROMPT at `research/harness-engineering/`. Vault note at `my-brain-child/Blog/AI-Engineering/Harness Engineering.md`; routing table `_LLM_Context.md` updated.

### 2026-07-04 — Session: merge vault-sync + Entry 3
- **Vault-sync workflow merged** (PR #25): CLAUDE.md § Vault Sync + `.claude/hooks/vault-sync-reminder.sh` (PostToolUse Bash hook that flags a published post with no vault note) + `.claude/settings.json`. Legacy local `.claude/handoffs/*` removed — handoffs are vault-only now (`ClaudeSessions/ai-blog-5fbf/`).
- **Codex Entry 3 merged to main** (PR #23) — was stranded as an open PR since 2026-04-27. Verified 119/119 tests + clean production build on the merged tree before shipping.

## Recent Changes (prior)

### 2026-04-27 — Session: Entry 3 launch (Eight Friends at the Buffet)
- **Entry 3 drafted**: "Eight Friends at the Buffet" at `content/posts/codex/eight-friends-at-the-buffet.mdx`. Multi-head attention via the four-cravings-for-cat opening → eight buffet lines → 24 chefs → Master Chef ($W^O$). Centerpiece: the parameter-count table showing 1,048,576 params either way.
- **Opening rewrite**: original draft mixed two POVs (you-as-guest then word-as-guest); revised to keep *cat* as the guest from sentence one.
- **Three FLUX.1 Dev illustrations**: hero (eight guests at a long buffet, seed 8848), inline-1 (eight parallel buffet lines top-down, seed 8181), inline-2 (Master Chef tray, seed 9292).
- **Featured slot moved** from Entry 2 → Entry 3.

### 2026-04-26 — Session: Entry 2 launch (Seat Ribbons)
- **Entry 2 published**: "The Seat Ribbons" at `content/posts/codex/seat-ribbons.mdx`. Positional encoding via the *cat sat on the mat / mat sat on the cat* asymmetry → ribbons → why integers fail → sinusoidal waves → math → training-length crack motivating RoPE.
- **GPT pre-pass edits applied**: softened overclaims, sharpened 513-ribbon framing, harder RoPE transition, added closer.
- **Three illustrations**: hero + inline-1 in FLUX.1 Dev, inline-2 in FLUX.2 Klein. inline-1 took multiple regens to land six ribbons exactly (seed 6006 with explicit count in negative prompt).
- **Cache-busting via filename versioning**: all 7 Codex images live under final `-vN.png` names. No orphan files, no `_backup-dev/` folder.
- **Featured slot moved** from Entry 1 → Entry 2.
- **PR #22 opened** against `main`.
- See handoff `2026-04-26-2358.md`.

### 2026-04-19 — Session: The Codex launch + Entry 1
- Codex series launched (living, unnumbered; primitives + teardowns). Entry 1 "Attention is a Potluck" shipped with 4 FLUX.1 Dev illustrations. Codex added as first nav category and hero pill. Reference doc saved at `research/attention-is-a-potluck/analogy-reference.md`. See handoff `2026-04-19-1353.md`.

### Prior (compressed)
- 2026-03-14: Post 2 (quantization/distillation/inference) merged, auto-feature logic added — see handoff `2026-03-14-0045.md`
- 2026-03-08: CLAUDE.md + design overhaul — see handoff `2026-03-08-2350.md`

## Key Decisions

- **The Codex is unnumbered and continuous.** No "Part N of M." Each entry stands alone, linked by idea/tag. Entry types are `primitive` (evergreen) and `teardown` (per-model). Reasoning: Gemma 4 is not the finale — Qwen, Claude, DeepSeek all slot in as peers, not sequels.
- **Codex category = existing category system, no bespoke routing.** `content/posts/codex/` → `/category/codex`. A `/codex` curated view comes once 3–4 entries exist.
- **Image bar per entry**: one hero + 2–3 inline illustrations in warm editorial style. FLUX.1 Dev at 1200×624 (hero) and 1216×800 (inline). FLUX.2 Klein acceptable for abstract pattern illustrations only — for editorial photoreal ribbon/dish renders, Dev is required despite the time cost.
- **Image cache-busting**: rename files (`-vN.png`) per regen and update MDX refs. Overwriting the same filename does not bust the Next image cache or browser cache reliably.
- **Writing bar**: "phone-half-distracted comprehension, coffee re-read math click, dinner-conversation recall three weeks later." Not ELI5 — full concept fidelity delivered through a concrete image first, math after.

## Next Steps (Prioritized)

1. **Draft Entry 4 — "The Express Lane"** (stacking + residuals + fresh Q/K/V per block). Material in `research/attention-is-a-potluck/analogy-reference.md` Rungs 5 & 6.
2. **RoPE deep dive** — promised in Entry 2's closer.
3. **Eventually**: first teardown — Gemma 4 architecture walkthrough.
4. **Known issues still open**:
   - Newsletter non-functional (`alert('coming soon!')`)
   - `'use client'` on Hero may be removable (imports server-safe `lib/categories`) — verify
   - Dark mode toggle in nav — verify it works end-to-end

## Series Status

### The Codex — LIVE
- Entry 1: ✅ "Attention is a Potluck" — shipped
- Entry 2: ✅ "The Seat Ribbons" — shipped
- Entry 3: 🚀 "Eight Friends at the Buffet" — drafted, PR pending, will be featured on merge
- Entry 4: 📝 "The Express Lane" — next
- Future: RoPE deep dive, GQA, FlashAttention, MoE, quantization, LoRA, Gemma 4 teardown, Qwen teardown

### Local AI Image Generation — COMPLETE
- Parts 1–2: ✅ Published

### Ray Architecture Deep Dive — COMPLETE (for now)
- Parts 1–7: ✅ Published on main
