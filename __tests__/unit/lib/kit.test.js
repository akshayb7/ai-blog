import { describe, it, expect } from 'vitest';
import fs from 'fs';
import path from 'path';
import { suggestSchedule, renderKitSkeleton, checkKit, kitPath } from '@/lib/crosspost/kit';
import { findPostFile } from '@/lib/crosspost/posts';

const RAW = `---
title: "A Post"
date: "2026-03-06"
category: "Distributed Systems"
tags: ["Ray", "Python"]
---

Body.
`;

// 2026-03-06 is a Friday.
describe('lib/crosspost/kit', () => {
  describe('suggestSchedule', () => {
    it('picks the first Wednesday on or after publish, and Dev.to 3-7 days after', () => {
      expect(suggestSchedule('2026-03-06', '2026-03-01')).toEqual({
        linkedin: '2026-03-11',
        hn: '2026-03-11',
        devtoFrom: '2026-03-09',
        devtoTo: '2026-03-13',
      });
    });

    it('uses the publish date itself when it is a Wednesday', () => {
      expect(suggestSchedule('2026-03-11', '2026-03-01').linkedin).toBe('2026-03-11');
    });

    it('slides dates already in the past forward to today', () => {
      expect(suggestSchedule('2026-03-06', '2026-10-24')).toEqual({
        linkedin: '2026-10-28',
        hn: '2026-10-28',
        devtoFrom: '2026-10-24',
        devtoTo: '2026-10-24',
      });
    });
  });

  describe('kitPath', () => {
    it('lives under research/<slug>/', () => {
      expect(kitPath('a-post')).toBe('research/a-post/distribution-kit.md');
    });
  });

  describe('renderKitSkeleton', () => {
    const md = renderKitSkeleton({ slug: 'a-post', raw: RAW, today: '2026-03-01' });

    it('includes the live URL, publish date and schedule', () => {
      expect(md).toContain('(https://blog.akshayworks.com/posts/a-post)');
      expect(md).toContain('**Published:** 2026-03-06');
      expect(md).toContain('npm run distribute a-post');
      expect(md).toContain('Wednesday 2026-03-11, 10 AM');
    });

    it('prefills the HN URL and leaves the drafts as TODO', () => {
      expect(md).toMatch(/### URL\n\nhttps:\/\/blog\.akshayworks\.com\/posts\/a-post/);
      expect(md).toContain('TODO');
    });

    it('gives a Dev.to window while the 3-7 day wait is still ahead', () => {
      expect(md).toContain('publish the draft between 2026-03-09 and 2026-03-13');
    });

    it('says to publish any time once the wait has passed', () => {
      const old = renderKitSkeleton({ slug: 'a-post', raw: RAW, today: '2026-10-24' });
      expect(old).toContain('publish the draft any time');
    });

    it('fails the checker with only the TODO message until the drafts are written', () => {
      expect(checkKit(md)).toEqual(['Unfilled TODO markers remain.']);
    });
  });

  describe('checkKit', () => {
    const linkedin = [
      'Most ML bottlenecks are not in compute.',
      'They are in the metadata path.',
      'Wrote the full breakdown on my blog. Link in profile.',
      '#Ray #Python #MLInfrastructure',
    ].join('\n');

    const kit = ({ li = linkedin, title = 'How Ray Keeps Cluster State Without a Bottleneck', comment = 'Covers the GCS.', reddit = '### r/mlops\n\nBody.' } = {}) =>
      `# Kit\n\n## Schedule\n\n- x\n\n## LinkedIn\n\n${li}\n\n## Hacker News\n\n### Title\n\n${title}\n\n### URL\n\nhttps://x.dev\n\n### First comment\n\n${comment}\n\n## Reddit\n\n${reddit}\n`;

    it('passes a clean kit', () => {
      expect(checkKit(kit())).toEqual([]);
    });

    it('flags LinkedIn over 16 lines', () => {
      const long = Array.from({ length: 17 }, (_, i) => `Line ${i}.`).join('\n') + '\n#a #b #c';
      expect(checkKit(kit({ li: long })).join()).toMatch(/LinkedIn: 18 lines, max is 16/);
    });

    it('flags a link, an emoji and a banned phrase in LinkedIn', () => {
      const bad = `Excited to share this \u{1F680}\nhttps://blog.akshayworks.com/posts/x\n#a #b #c`;
      const out = checkKit(kit({ li: bad })).join('\n');
      expect(out).toMatch(/no links/);
      expect(out).toMatch(/no emojis/);
      expect(out).toMatch(/banned phrase/);
    });

    it('flags too few or too many hashtags', () => {
      expect(checkKit(kit({ li: 'Hello.\n#a #b' })).join()).toMatch(/2 hashtags/);
      expect(checkKit(kit({ li: 'Hello.\n#a #b #c #d #e #f' })).join()).toMatch(/6 hashtags/);
    });

    it('flags an over-long or ALL CAPS HN title', () => {
      expect(checkKit(kit({ title: 'x'.repeat(81) })).join()).toMatch(/81 chars/);
      expect(checkKit(kit({ title: 'RAY IS GREAT' })).join()).toMatch(/ALL CAPS/);
    });

    it('flags a missing HN first comment', () => {
      expect(checkKit(kit({ comment: '' })).join()).toMatch(/first comment is missing/);
    });

    it('requires 1-2 subreddits', () => {
      expect(checkKit(kit({ reddit: 'no sub heading' })).join()).toMatch(/at least one/);
      expect(checkKit(kit({ reddit: '### r/a\n\nx\n\n### r/b\n\nx\n\n### r/c\n\nx' })).join()).toMatch(/3 subreddits/);
    });

    it('ignores TODO inside HTML comments', () => {
      expect(checkKit(kit() + '\n<!-- TODO later -->\n')).toEqual([]);
    });
  });

  describe('findPostFile', () => {
    const postsDir = path.join(process.cwd(), 'content/posts');

    it('finds a post in a category subfolder by slug', () => {
      const file = findPostFile('ray-gcs-brain-of-the-cluster', postsDir);
      expect(fs.existsSync(file)).toBe(true);
      expect(file.endsWith('ray-gcs-brain-of-the-cluster.mdx')).toBe(true);
    });

    it('returns undefined for an unknown slug', () => {
      expect(findPostFile('nope', postsDir)).toBeUndefined();
    });
  });
});
