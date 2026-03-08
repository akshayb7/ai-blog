# ai-blog Progress

## Current State
PR #17 merged to main. Post 1 is live.
Post 2 written and saved as untracked file on `research/image-gen-quantization` — needs commit + PR.

## Recent Changes

### 2026-03-08 — Session: Post 2 written
- **New post**: `content/posts/ai-image-generation/why-ai-images-look-pixelated-quantization-distillation-inference.mdx` — Part 2 of series. Covers quantization mechanics, the q4/q6/q8 cliff on Qwen, distillation, CFG, and why Klein can't use negative prompts.
- References existing images (qwen-rome-q4/q6/q8) — no new images needed
- Cross-links to Post 1

### 2026-03-08 — Session: AI Image Gen post + About page rewrite
- **New post**: `content/posts/ai-image-generation/running-image-gen-locally-apple-silicon.mdx` — Part 1 of "Local AI Image Generation" series. Field notes from running Klein/Dev/Qwen on Mac Mini M4 Pro.
- **New images** (6): `public/images/` — hero, klein-forest-demo, dev-brutalist-demo, qwen-rome-q4/q6/q8
- **New category folder**: `content/posts/ai-image-generation/`
- **Nav updated**: Replaced placeholder Deep Learning/GenAI links with `Image Generation` → `/category/ai-image-generation` and `Distributed Systems` → `/category/distributed-systems`
- **About page rewritten**: AlphaGo pivot origin, Digit+Chip magazine, Cricket 07 + GTA Vice City, agent orchestration, automation, data lakes, pattern recognition, salsa, poetry, anime, DJ, F1
- **Research PROMPT.md updated**: Field notes framing, LinkedIn "link in profile" strategy
- **content-repurposer skill updated**: LinkedIn default = link in profile (never external link in body), Wednesday 10am posting time, exact phrasing examples
- **LinkedIn post drafted & scheduled**: Wednesday 10am, hero image attached, no external link

## Key Decisions

- **Post framing**: Field notes (not tutorials) — failures and real data are the differentiator
- **LinkedIn strategy**: No external links in post body. Always "link in profile" with understated phrasing. External links kill ~60% reach.
- **Post 2 references**: Removed all direct links to Post 2 (doesn't exist yet). Use "future post coming soon" language.
- **Nav categories**: Only link categories that have actual content. Removed Deep Learning/GenAI placeholders.
- **About page voice**: Lead with AlphaGo pivot (the surprising origin), not generic ML engineer copy.

## Next Steps (Prioritized)

1. **Commit + PR for Post 2** — file is untracked on `research/image-gen-quantization`
2. **Hero image for Post 2** — `quantization-comparison-hero.png` referenced but doesn't exist yet; use image-gen skill or collage from existing qwen images
3. **Reddit post**: r/LocalLLaMA is the right sub for Post 1 — native self-post, link at the bottom
4. **LinkedIn post for Post 2** — draft via content-repurposer, schedule for next Wednesday 10am
5. **HN submission**: Now Post 2 exists, good candidate. Best day: Wednesday 8am EST.
6. **Photo for About page**: Add personal photo when ready — layout currently uses straw hat placeholder

## Series Status

### Local AI Image Generation
- Part 1: ✅ Written, pushed, PR open — "Running AI Image Generation Locally on Apple Silicon"
- Part 2: ✅ Written — "Why Your AI Images Look Pixelated: Quantization, Distillation & Inference Explained" — needs commit + PR

### Ray Architecture Deep Dive
- Parts 1-7: ✅ Published on main
- Part 8+: Not planned yet
