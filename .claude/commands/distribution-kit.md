---
description: Draft the LinkedIn, Hacker News and Reddit posts for a published blog post
argument-hint: <post-slug>
---

Build the distribution kit for the post with slug `$ARGUMENTS`.

1. Run `npm run kit -- init $ARGUMENTS`. It creates `research/$ARGUMENTS/distribution-kit.md` with the live URL, schedule and `TODO` markers. If it reports the file exists, stop and tell me.
2. Read the post from `content/posts/`. Find it with `find content/posts -name "$ARGUMENTS.mdx"`.
3. Invoke the `content-repurposer` skill in `linkedin`, `hn` and `reddit` modes and replace every `TODO` in the kit. Rules:
   - Three different opening hooks, one per platform.
   - Reddit: pick 1-2 subreddits that fit the post's topic. One `### r/<name>` section each, written as a native self-post with the blog link at the end.
   - LinkedIn: no link in the body, 3-5 hashtags, 16 lines max.
   - HN: title 80 chars or fewer, first comment 2-3 sentences.
4. Run `npm run kit -- check $ARGUMENTS`. Fix what it reports and re-run until it passes.
5. Do not post anywhere. Tell me the kit path and the schedule, then stop.
