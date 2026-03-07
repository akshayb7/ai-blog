# Blog Post Creation: Local Image Generation & Quantization

## Context

The research doc at `research/image-gen-quantization/research.md` contains hands-on findings from experimenting with local AI image generation on a Mac Mini (48GB, Apple Silicon) using mflux. All data comes from real testing — real failures, real benchmarks, real images.

## What to produce

Two blog posts for the `ai-blog` (Next.js + MDX). Posts go in `content/posts/`. Look at existing posts (e.g., `content/posts/distributed-systems/`) for frontmatter format, writing style, and tone.

### Post 1: "Running AI Image Generation Locally on Apple Silicon"
**Category**: Create a new category folder `content/posts/ai-image-generation/`
**Audience**: Developers and technical enthusiasts who want to run image gen locally
**Tone**: Practical, experience-driven (not a tutorial — a "here's what I learned" narrative)

Cover:
- Why run image gen locally? (privacy, zero API costs, offline capability)
- The mflux ecosystem on Apple Silicon — what it is, how MLX + unified memory makes this possible
- Three models tested: Klein (fast), Dev (quality), Qwen (smart) — with real speed/quality data
- The routing decision: when to use which model
- Real results and comparisons
- Setup gotchas (gated repos, HuggingFace auth, wrong CLI commands per model)

### Post 2: "Why Your AI Images Look Pixelated: Quantization, Distillation & Inference Explained"
**Category**: Same folder `content/posts/ai-image-generation/`
**Audience**: Anyone curious about how image generation actually works under the hood
**Tone**: Explainer with real examples — use the actual test results to illustrate concepts

Cover:
- What quantization is and how it works (bit precision, memory tradeoffs)
- Why mflux downloads full models and quantizes at load time
- The q4 vs q6 vs q8 experiment — with the pixelation story
- Distilled vs base models: what distillation actually changes architecturally
- Why distilled models can't use negative prompts or custom guidance (CFG mechanism)
- Steps, guidance, negative prompts — what these parameters mean technically
- The Apple Silicon unified memory advantage
- Practical recommendations for different hardware configs

## Before writing

1. **Read the research doc thoroughly** — it has all the raw data, benchmarks, and failure stories
2. **Use the `/blog-writer` skill** if available — it knows the writing conventions for this blog
3. **Use the `/notebooklm` skill** to deepen technical knowledge:
   - Create a notebook with the research doc as a source
   - Add these additional sources for deeper technical context:
     - The mflux GitHub README: https://github.com/filipstrand/mflux
     - Qwen-Image paper/blog: https://qwenlm.github.io/blog/qwen-vlo/
     - Any good explainer on quantization techniques (GPTQ, AWQ, GGUF)
     - Any good explainer on knowledge distillation in diffusion models
   - Ask NotebookLM to research: "How does quantization work in diffusion models?", "What is knowledge distillation and how does it affect inference?", "How does classifier-free guidance work?"
   - Use the deeper context to make the blog posts technically accurate, not just experiential
4. **Use the `/image-gen` skill** to generate comparison images for the posts (e.g., same prompt at different quantization levels, same prompt on different models)
5. **Check existing posts** for style, frontmatter format, and series structure

## Writing guidelines

- First-person narrative ("I tested...", "What surprised me was...")
- Lead with the practical/experiential angle, weave in technical explanations
- Use real numbers from the benchmarks — don't round or generalize
- Include the failure stories — they're more interesting than the successes
- Code blocks for CLI commands
- Tables for comparisons
- No fluff — every paragraph should teach something
- Link posts to each other (Post 1 references Post 2 for deep dives, Post 2 references Post 1 for setup)

## Series metadata
```
series: "Local AI Image Generation"
seriesPart: 1  (or 2)
category: "AI Image Generation"
tags: ["Image Generation", "Apple Silicon", "MLX", "Quantization", "FLUX", "Qwen", "Local AI", "mflux"]
```
