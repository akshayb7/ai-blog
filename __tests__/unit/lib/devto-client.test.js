import { describe, it, expect, vi } from 'vitest';
import { pushDraft } from '@/lib/crosspost/devto-client';
import { parseEnv } from '@/lib/crosspost/env';

const article = { title: 'T', body_markdown: 'B', tags: ['ray', 'python'], canonical_url: 'https://blog.akshayworks.com/posts/t' };

const okResponse = (body) => ({ ok: true, status: 200, json: async () => body, text: async () => JSON.stringify(body) });

describe('lib/crosspost/devto-client', () => {
  describe('pushDraft', () => {
    it('creates an unpublished draft with POST and comma-joined tags', async () => {
      const fetchImpl = vi.fn().mockResolvedValue(okResponse({ id: 42, url: 'https://dev.to/x/t-draft', published: false }));

      const result = await pushDraft({ article, apiKey: 'k', fetchImpl });

      const [url, init] = fetchImpl.mock.calls[0];
      expect(url).toBe('https://dev.to/api/articles');
      expect(init.method).toBe('POST');
      expect(init.headers['api-key']).toBe('k');
      expect(JSON.parse(init.body).article).toMatchObject({ published: false, tags: 'ray,python', canonical_url: article.canonical_url });
      expect(result).toEqual({ id: 42, url: 'https://dev.to/x/t-draft', published: false, action: 'created' });
    });

    it('updates with PUT and never sends published, so a live article is not unpublished', async () => {
      const fetchImpl = vi.fn().mockResolvedValue(okResponse({ id: 42, url: 'u', published: true }));

      const result = await pushDraft({ article, apiKey: 'k', articleId: 42, fetchImpl });

      const [url, init] = fetchImpl.mock.calls[0];
      expect(url).toBe('https://dev.to/api/articles/42');
      expect(init.method).toBe('PUT');
      expect(JSON.parse(init.body).article).not.toHaveProperty('published');
      expect(result).toMatchObject({ id: 42, action: 'updated', published: true });
    });

    it('throws with status and body on failure, without leaking the key', async () => {
      const fetchImpl = vi.fn().mockResolvedValue({ ok: false, status: 422, text: async () => '{"error":"Tag limit"}' });

      const err = await pushDraft({ article, apiKey: 'secret-key', fetchImpl }).catch((e) => e);

      expect(err.message).toContain('422');
      expect(err.message).toContain('Tag limit');
      expect(err.message).not.toContain('secret-key');
    });
  });

  describe('parseEnv', () => {
    it('parses plain, exported and quoted values', () => {
      const env = parseEnv('A=1\nexport B="two words"\nC=\'three\'\n');
      expect(env).toEqual({ A: '1', B: 'two words', C: 'three' });
    });

    it('ignores comments and blank lines', () => {
      expect(parseEnv('# note\n\nKEY=v\n')).toEqual({ KEY: 'v' });
    });

    it('keeps = signs inside values', () => {
      expect(parseEnv('KEY=a=b=c')).toEqual({ KEY: 'a=b=c' });
    });
  });
});
