@AGENTS.md

## Claude Code Notes

### Session Continuity
- Use the `session-context` skill at the start and end of every working session.
- `/pickup` at the start of a session to restore context from `PROGRESS.md`.
- `/handoff` before stopping to snapshot decisions, progress, and next steps.
- Never start work in a new session without reading `PROGRESS.md` first.
- **Also run `/handoff` after any significant commit**, defined as:
  - A new component, page, or design pattern is introduced
  - A content or nav decision changes the site structure
  - A new blog post is written and pushed
  - A TBD decision in `AGENTS.md` is resolved
  The rule of thumb: if losing this session's context would mean losing a decision that
  affects future content or design work, run `/handoff` now, not later.


### Parallel Subagents
- Use the `Agent` tool to parallelize independent work. Any time two tasks have no shared
  output dependency, run them concurrently — do not do them sequentially.
- Common patterns:
  - Write a new component while simultaneously updating tests
  - Spawn an `Explore` agent for codebase research while writing content
  - Use a `general-purpose` agent to look up current library docs via Context7 while
    implementing the integration in the main context
- Rule of thumb: if two tasks have no shared output dependency, parallelize them.


### Research and Documentation Tools
- **Context7 MCP**: Before integrating any new library or API, use Context7 to retrieve
  current documentation:
  1. Call `mcp__context7__resolve-library-id` with the library name
  2. Call `mcp__context7__query-docs` with the library ID and your specific question
  Never assume API signatures from memory — Next.js, MDX, and shadcn APIs change.
- **WebSearch**: Use for anything time-sensitive — current Next.js version, shadcn component
  availability, Vercel/Railway deployment notes.


### Skills for Content

| Task | Skill |
|---|---|
| Write a blog post from research notes | `/blog-writer` |
| Generate LinkedIn, Twitter, Reddit, HN variants | `/content-repurposer` |
| Generate images locally (Apple Silicon) | `/image-gen` |
| Snapshot session state | `/session-context` |


---

## Product Philosophy

> For any design, architecture, or content strategy decision, invoke `/design-philosophy` or `/frontend-design`. Document which philosophy was applied.

The blog's identity is **Linear-adjacent** in philosophy: every design decision must be explainable. "It looks nice" is not a reason. If you cannot explain why a component exists or why a visual element is there, remove it.
