# Research & Drafts

This folder contains research notes, raw data, and session dumps that feed into future blog posts.

## How to use

Each subfolder is a topic. Inside you'll find:
- **`research.md`** — Raw notes, data, and findings from hands-on experimentation
- **`PROMPT.md`** — Kickoff instructions for a Claude Code session to write the actual blog post(s)

## Workflow

1. Experiment with something interesting
2. Dump findings into a research doc here
3. Open a new Claude Code session in the `ai-blog` repo
4. Point it at the `PROMPT.md` for the topic
5. It writes the blog post(s) using the research + additional research via NotebookLM skill

## Current Topics

- `image-gen-quantization/` — Local image generation on Apple Silicon, quantization, distillation, model comparison
