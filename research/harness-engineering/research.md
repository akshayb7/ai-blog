# Harness Engineering — research notes

**Category**: AI Engineering (new) — `content/posts/ai-engineering/` → `/category/ai-engineering`
**Type**: standalone field-notes post (bucket may grow into a series later)
**Central analogy**: 2026 Formula 1 — the driver (model) vs the car/telemetry/crew/rulebook around it (the harness)
**Working title candidates**: "Harness Engineering: The 50/50 Rule" · "The Model Is Half the Car" · "You Don't Tune the Driver"

---

## Thesis (load-bearing)

Same driver, same raw pace — the team with the better harness wins the championship.

In 2026, F1 rewrote its rules so the internal-combustion engine is only **half** the car; the other half is how you deploy and manage electrical energy. AI had the same year. The model (the driver) is necessary but no longer the differentiator — the leverage moved to the harness around it: the context you load, the tools you give it, the verification that catches mistakes, the guardrails that keep it legal. **Harness engineering is building that half of the car.**

The insight that separates this from a "here's my setup" listicle: a great harness doesn't make the model smarter. It makes the model's mistakes cheap and recoverable — a 2-second pit stop instead of a retirement — so you can point it at harder work than you'd ever dare unroped.

---

## The 2026 F1 facts (accurate, sourced — do NOT use DRS anywhere)

- **DRS is dead.** Last used at the 2025 Abu Dhabi GP. Removed for 2026.
- **Active aerodynamics** replaces it: front AND rear wings automatically reconfigure depending on where the car is on the circuit (low-drag mode on straights, high-downforce in corners). Available to *any* driver at predetermined points — not gated to being within 1s of the car ahead.
- **Overtake Mode / Manual Override Mode (MOM)**: within 1s of the car ahead, a driver can deploy up to **0.5MJ** of extra electrical energy (~67bhp) from the MGU-K. Strategic — deploy it all at once or spread it across a lap.
- **Power split: 50/50** electric/combustion (was ~80/20 combustion). Overall more power available even though the ICE element drops (~550→400kW) because the MGU-K nearly triples (120→350kW).
- **MGU-H removed** — it reclaimed exhaust energy but "proved a tricky component to master"; its removal was popular. The 1.6L V6 turbo ICE stays.
- **Sustainable fuel** — fully sustainable from 2026 (non-food/waste/atmospheric carbon).
- **Chassis**: smaller, narrower, lighter, more nimble; min weight 768kg (ex-fuel).

Sources:
- https://www.formula1.com/en/latest/article/the-beginners-guide-to-the-2026-regulations.6j0tS0hrHG2T01tpmK6XYz
- https://www.espn.com/f1/story/_/id/47333501/formula-1-f1-new-terminology-explained-overtake-mode-boost-drs-how-affects-2026-racing-drivers-regulations-rules
- https://www.motorsportmagazine.com/articles/single-seaters/f1/how-f1-2026s-new-active-aero-will-work-without-drs/
- https://www.formula1.com/en/latest/article/explained-2026-power-unit-regulations-fia.68izKQ2tn1voQPWvgLVMXN

---

## The mapping (F1 element → harness primitive → our live example)

| Harness primitive | 2026 F1 element | Live example (non-sensitive) |
|---|---|---|
| **The 50/50 thesis** | Power split moved from 80/20 ICE to 50/50 electric | Opening frame — engine (model) is half the car now |
| **Adaptive context** | Active aero — wings auto-reconfigure by track position | Lean-global `CLAUDE.md` + load-on-demand routed detail; the right context for the phase, not one static setup |
| **Discretionary escalation** | Overtake Mode — budgeted 0.5MJ boost, deployed strategically | When to spend the expensive thing: bigger model, deep subagent fan-out, extended thinking — only within striking distance |
| **Cut the brittle part** | MGU-H removed — brilliant but too hard to master | Kill the over-clever harness component that costs more to tune than it returns |
| **Verification + recovery** | The pit stop — a mistake costs 2s, not the race | Test+build gate on the merged tree before shipping (failure caught in the garage, not on track) |
| **Guardrails / stewards** | The rulebook + stewards | PostToolUse hook (vault-sync reminder) — an automated steward flagging a forgotten step |
| **Second opinion** | Race engineer on the pit wall | Cross-model plan review — a second strategist catching single-model blind spots |

Standalone post = pick the **4 with the best war-story**, gesture at the rest. Strongest live rungs (both from *this week*): the pit stop (verify-before-merge) and the stewards (the hook we built). The 50/50 split is the opener; MGU-H-removed is the sharpest contrarian rung.

---

## Proposed structure (prune to ~4 rungs for standalone)

1. **Open on the 50/50 rule** — F1 decided the engine is half the car; state the AI parallel. Thesis.
2. **Adaptive context** (active aero) — the model can only race on what you loaded. War story slot.
3. **Verification + recovery** (pit stop) — cheap recoverable failure > never failing. War story: the verify-before-merge gate. *(This week's, real.)*
4. **Guardrails** (stewards) — hooks/permissions as automated rule-enforcement. War story: the vault-sync hook. *(This week's, real.)*
5. **Cut the brittle part** (MGU-H) — the contrarian close: the best harness move is often *removal*. War story slot.
6. Closer — gesture at the pit wall (second opinion) and the garage between races (memory/handoff) as "another log."

---

## War stories — MINED from Claude session handoffs (curated)

Sourced from `my-brain-child/ClaudeSessions/` handoffs via Haiku subagents. Ranked; ★ = recommended anchor per rung. All are Akshay's own harness — reveal the bet, not the blueprint.

### Slot 1 — Verification / recovery (the pit stop): caught it in the garage
- ★ **The sanitizer that caught a live JWT before it hit a public repo.** A secrets-sanitizer on the config-sync step caught an n8n JWT (`eyJ…`) leaking into a committed template *on the first sync*, before any public check-in. Fix hardened the regex set (JWT / Slack `xoxb-` / Google `AIza…`). — _src: 2026-05-08_. SAFE (never show the token).
- **The memory harness that silently broke for six weeks.** `~/.claude/obsidian-sessions.json` went missing 2026-04-01; handoffs silently stopped being written and nobody noticed until a session-start check surfaced it — then 41 scattered legacy handoffs got migrated to one canonical vault path. The irony: the harness that watches everything wasn't itself watched. — _src: my-setup 2026-05-13_. SAFE.
- **Three-round review as a diminishing-returns gate.** Principal + 5 toolkit agents in parallel; finding counts fell 11+8 → 2+6 → 0+3 across rounds. Rule codified: if round 3 yields ≤2 minors, ship — don't loop. — _src: raphael-os 2026-05-08_. SAFE.
- (Product, genericize-or-skip) **Green /health while the deploy never landed.** Old+new instances exceeded a 15-client Postgres cap on redeploy → new worker couldn't boot → deploy *failed* but the old instance kept serving, so health looked fine while the change silently never shipped. — _src: meritwise 2026-07-04_. STRIP client name + DB ref.

### Slot 2 — Guardrail / hook built after getting burned (the stewards / rulebook)
- ★ **The PR rate-limiter, born from a 17-PR blowout.** An agent fleet fired ~17 `gh pr create` calls in one incident; the fix was a PreToolUse(Bash) guard capping it at 3 per 10 min, with a `CLAUDE_ALLOW_PR=1` deliberate override. A steward with an escape hatch. — _src: 2026-06-28_. SAFE. **Most vivid burn in the set.**
- ★ **The review harness that noticed it was reviewing itself.** During an autonomous skill-forge run, the cross-model reviewer (Gemini) died mid-run and the gates silently fell back to self-review — still labelled "independent." Fix: an `independent_review: passed|pending` field so a degraded reviewer fails loudly instead of masquerading. — _src: Skills_Created 2026-06-19_. SAFE. **Subtle, sophisticated — pairs with the PR-guard as the two faces of guardrails.**
- **Skill-drift detector, tuned against alert fatigue.** Weekly launchd job: static scan + live smoke test; only near-certain drift → FAIL (alerts), everything noisy → WARN (silent log). Plus per-job 1h cooldown on Telegram alerts so a failing job can't spam. — _src: 2026-06-28_. SAFE.
- **The four fail-safe hooks.** guard-bash (unsafe commands), session-health (context-loss), handoff-nudge (forgotten handoffs), format-edited — PreToolUse / SessionStart / Stop / PostToolUse. — _src: 2026-06-21_. SAFE. (This week's vault-sync hook is the fifth, live.)

### Slot 3 — Workflow change (adaptive context / active aero)
- ★ **The 15KB-every-turn context tax.** The global `CLAUDE.md` was loading ~15KB on *every* turn in *every* project. Trimmed 242→36 lines (15KB→3.4KB, 77% lighter); domain detail moved to on-demand routed files that load only when relevant. Active aero: the right context for the phase, not one heavy static setup. — _src: 2026-06-21_. SAFE. **This is the adaptive-context anchor.**
- **File-mediated handoff to beat context decay.** Oracle subagents each run in a clean context, write a decision file to disk, and exit; a manifest tracks completion for crash recovery. Motivated by Opus quality decaying past ~100K tokens. — _src: ouroboros 2026-03-14_. SAFE.

### Slot 4 — Removal: cut the brilliant-but-brittle part (MGU-H)
- ★ **Killed the agentic reviewer for a dumb curl call.** The Gemini review step ran through an agentic CLI (Antigravity/"agy") that ran a tool-loop, wrote artifacts, needed hourly OAuth refresh, and intermittently hung on long prompts — great in theory, unusable for a headless gate. Replaced with a stateless single-shot `gemini_review.sh` (curl → API). The clever component was removed *because* it was clever. — _src: Skills_Created 2026-06-19_. SAFE. **Perfect MGU-H story — lead the removal rung with this.**
- **Deleted the Artifact tool from the local-visuals path.** Stopped routing local HTML/visuals through claude.ai hosting — same tokens, external leak for zero benefit. Removal as a privacy + simplicity win. — _src: 2026-06-21_. SAFE.
- (Support) **Chose *not* to build** the MCP-secrets→env-vars migration: verified the risk (no `${VAR}` expansion in settings.json, unreliable stdio env inheritance) outweighed the benefit; hardened with `chmod 600` instead. The best harness change is sometimes the one you decline. — _src: 2026-06-28_. SAFE.

### Recommended final 4 rungs (the standalone cut)
1. **Adaptive context** — the 15KB-every-turn trim (active aero). ★
2. **Verification/recovery** — the JWT sanitizer catch OR verify-before-merge (this week). ★
3. **Guardrails** — the 17-PR rate-limiter + the self-review-masquerade fix (two faces of stewards). ★
4. **Removal** — the agentic-reviewer → curl swap (MGU-H). ★
Closer gestures at the pit wall (cross-model review) and the garage between races (session-context memory).

---

## Voice + scope guardrails

- Field notes, not tutorial. Keep the failures in. Things that couldn't be written without running it.
- Analogy-first, then the engineering, matching the Codex cadence (though this is its own category).
- **Reveal the bet, not the blueprint**: state the job + the one decision + what it's built on. Withhold prompts, exact configs, secrets, vault contents, Mechademy specifics.
- No Claude co-attribution; reads as Akshay. Talking about the tools he uses is fine.
- GEO/SEO handled by `/blog-writer`. Naming note: "harness engineering" is an emerging term — coining it is a POV bet (good for thought-leadership, thinner raw search volume than "context engineering" / "AI agents"). Anchor the term in the title, let the body earn it.

## Open questions
- Category name confirmed: **AI Engineering**.
- Series vs standalone: standalone for now; revisit if it lands.
- Which 4 rungs make the final cut (depends on which war stories Akshay brings).
