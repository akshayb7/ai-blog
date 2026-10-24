# Distribution Strategy

**The blog is canonical.** Publish on blog.akshayworks.com first, confirm the post is live, then distribute. Every other platform links back to it (a `canonical_url` where the platform supports one, a visible backlink where it doesn't).

Automate only where a platform has a safe API. Everything else is a paste-ready draft that Akshay posts by hand: Hacker News and Reddit have no submit API (and bot-posted self-promotion gets accounts banned), and LinkedIn rewards hand-posted native content.

## Pipeline

Run these once the post is live. Slug = the post's filename without `.mdx`.

| Platform | Command | What it does | Akshay does |
|---|---|---|---|
| Dev.to | `npm run distribute <slug>` | Converts the MDX and pushes an unpublished draft with `canonical_url` set. Re-running updates the same draft. `-- --dry-run` previews without posting. | Publishes the draft 3-7 days after the blog post. |
| Substack | `npm run substack <slug>` | Writes `research/<slug>/substack.html` and prints the title and subtitle. | Opens the file, copies, pastes into the Substack editor, checks the flagged items. |
| LinkedIn, HN, Reddit | `/distribution-kit <slug>` | Writes `research/<slug>/distribution-kit.md`: schedule, then drafts written by `/content-repurposer`. `npm run kit -- check <slug>` enforces the mechanical platform rules. | Reads the drafts for voice, then posts by hand on the scheduled day. |

Twitter/X is not in the kit. Run `/content-repurposer` in `twitter` mode when wanted.

## Setup and state

- `DEVTO_API_KEY` lives in `~/.config/shell/secrets.env` (create it at dev.to/settings/extensions). The script reads it from there or from the environment, never from the repo.
- `.crosspost/devto.json` maps each slug to its Dev.to article ID so a re-run updates instead of duplicating. **Commit it** after the first push of a post, so both laptops share it.
- `research/<slug>/distribution-kit.md` and `substack.html` are time-bound scratch. Do not commit them.

## Platform notes

- **Dev.to**: the converter keeps at most 4 tags (lowercase alphanumeric, in frontmatter order), so put the 4 that matter first. Math becomes Dev.to katex tags. Never send `published` on an update: it would revert a live article to draft (the script already avoids this).
- **Substack**: no posting API and no canonical URL field, so the export ends with an "Originally published at" link. The editor has no table block, so tables become bullet lists. Math is left as raw `$...$` and flagged; confirm it renders. Substack is for the email list, not discovery.
- **LinkedIn**: link in profile, never in post body. Wednesday 10am. Understated close. 16 lines max, no emojis, 3-5 hashtags.
- **Twitter/X**: 5-tweet thread + link reply.
- **Reddit**: native self-post, link at bottom, 1-2 subreddits matched to the topic (r/mlops, r/DistributedComputing, r/LocalLLaMA and similar). Technical content only.
- **HN**: only posts with deep technical novelty. Title 80 chars or fewer, no clickbait. Wednesday 8am EST.
- **RSS**: feed at `/feed.xml`, already live and generated.
