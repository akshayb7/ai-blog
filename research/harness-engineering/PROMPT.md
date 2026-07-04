# PROMPT — Harness Engineering (blog-writer instructions)

**Read `research.md` in this folder first.** It holds the thesis, the accurate 2026 F1 facts (sourced), the full mapping, and the curated war stories. This file is the writing spec.

---

## What to write

A **standalone field-notes post** for the blog's **new "AI Engineering" category** (`content/posts/ai-engineering/`, `/category/ai-engineering`). Not part of the Codex. Not a tutorial.

- **Working title** (pick the sharpest, refine freely): "Harness Engineering: The 50/50 Rule" · "The Model Is Half the Car"
- **Slug**: globally unique (slugs are flat across categories). Suggest `harness-engineering`.
- **Length**: ~2,000–2,600 words. 10–13 min read. Standalone — no series scaffolding.
- **Central analogy**: 2026 Formula 1. The driver = the model; the car / telemetry / pit crew / rulebook = the harness. Analogy-first, engineering after — same cadence as the Codex, but its own voice/category.

## The thesis (must land in the opening)

Same driver, same raw pace — the team with the better harness wins the championship. In 2026 F1 rewrote its rules so the internal-combustion engine is only **half** the car; the other half is how you deploy and manage electrical energy (power split moved from ~80/20 to **50/50**). AI had the same year: the model is a necessary but no-longer-differentiating driver. The leverage moved to the harness around it. **Harness engineering is building that half of the car.**

The load-bearing insight (state it, don't bury it): a great harness doesn't make the model smarter — it makes the model's mistakes cheap and recoverable (a 2-second pit stop, not a retirement), so you can point it at harder work than you'd dare unroped.

## Structure — 4 rungs, each = F1 element → principle → one worked example from Akshay's own setup

Open on the 50/50 rule and the thesis. Then:

1. **Adaptive context (active aero).** 2026 cars auto-reconfigure their wings by track position — low-drag on straights, high-downforce in corners — instead of one static setup. That's context loading: the right context for the phase, not everything-always. **Example:** the global `CLAUDE.md` was taxing every turn in every project ~15KB; trimmed 242→36 lines (**77% lighter**), domain detail moved to on-demand routed files. (research.md, Slot 3 ★)

2. **Verification + recovery (the pit stop).** A great crew turns a mistake into a 2-second stop, not a retirement. Cheap recoverable failure beats never failing. **Example:** the secrets-sanitizer that caught a live JWT leaking into a committed template *before* any public check-in — failure caught in the garage. Reinforce with this week's live one: the test+build gate run on the merged tree before shipping a post. (research.md, Slot 1 ★)

3. **Guardrails (the stewards / rulebook).** Rules that keep you from a penalty or a crash — enforced automatically, not by memory. Show two faces: **(a)** the loud cap — a PreToolUse rate-limiter capping `gh pr create` at 3 per 10 min, born from a ~**17-PR** agent-fleet blowout (with a deliberate `CLAUDE_ALLOW_PR=1` override); **(b)** the quiet integrity check — a review harness that silently fell back to self-review when the cross-model reviewer died mid-run, fixed with an `independent_review: passed|pending` flag that fails loudly instead of masquerading. Nod to this week's vault-sync PostToolUse hook as the newest steward. (research.md, Slot 2 ★)

4. **Removal (MGU-H).** The FIA killed the MGU-H — brilliant at reclaiming energy, but too hard to master reliably — and the paddock cheered. The contrarian close: the best harness move is often *subtraction*. **Example:** an agentic CLI reviewer (ran a tool-loop, wrote artifacts, needed hourly OAuth, hung on long prompts) replaced with a stateless `curl` call to the API. The clever component got cut *because* it was clever. (research.md, Slot 4 ★)

**Closer:** gesture at the pieces left on the cutting-room floor — the pit wall (cross-model plan review / second opinion) and the garage between races (session-context handoff/pickup memory) — as "another log." End on the thesis restated through the season: capability is table stakes; the championship is the harness.

## Voice + hard rules

- **Field notes, not tutorial.** Keep the failures in. Every rung must contain something that couldn't be written without having run it — the 15KB number, the 17-PR count, the hung-CLI symptom, the JWT-before-checkin catch.
- **F1 frame is the discipline against navel-gazing.** Every rung is about the *principle*; Akshay's setup is the worked example, never the subject. If a paragraph reads as "look at my elaborate rig," rewrite it as "here's why this principle earns its keep."
- **Reveal the bet, not the blueprint.** State the job + the one decision + what it's built on. NEVER include: real secret/token values, exact prompts, full configs, vault contents, Mechademy/client specifics, or the meritwise story (client work — omit entirely for v1). The self-hosted-harness stories carry the whole post.
- **Reads as Akshay.** First person, his voice. No Claude co-attribution, no "as an AI." Talking about the tools he uses (Claude Code, hooks, subagents, cross-model review) is expected and fine.
- **2026 F1 accuracy is non-negotiable.** DRS does not exist in 2026 — never mention it as current. Use active aero, Overtake Mode, the 50/50 split, MGU-H removal exactly as in research.md.
- **No AI-slop.** No "in today's fast-paced world," no "unlock/leverage/delve," no listicle padding, no em-dash-and-rule-of-three tics on every line. Concrete nouns, real numbers, earned transitions.

## SEO / GEO

- "Harness engineering" is a coined-term POV bet — anchor it in the title and H1, let the body earn it. Weave in higher-volume adjacents naturally where honest: "context engineering," "AI agents," "agentic engineering," "LLM tooling."
- Meta description: 1–2 sentences, the 50/50 thesis in plain language.

## Frontmatter (fill all)

```yaml
title: "..."                         # the chosen title
date: "2026-07-04"
description: "..."                    # the 50/50 thesis, plain
category: "AI Engineering"
tags: ["Harness Engineering", "AI Agents", "Context Engineering", "LLM Tooling", "Claude Code"]  # 3-6, TitleCase, tune
featured: true                        # takes the homepage slot; flip prior featured post to false
image: "/images/harness-engineering.png"   # hero, 1200×624 — generate separately
author: "Akshay"
readTime: "12 min read"               # estimate after drafting
```

## After the draft
- Save MDX to `content/posts/ai-engineering/<slug>.mdx`.
- Hero + inline images generated separately (F1/pit-crew editorial style — front-load subject/layout/palette in the prompt per the image-gen pattern).
- New category → add nav link + hero pill once the post is live (per CLAUDE.md nav rules).
- Vault sync note afterward per CLAUDE.md § Vault Sync.
