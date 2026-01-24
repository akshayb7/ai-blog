import { describe, it, expect, vi } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { useSearch } from '@/hooks/useSearch';

const mockPosts = [
  {
    slug: 'post-1',
    title: 'Introduction to Machine Learning',
    description: 'Learn the basics of ML algorithms',
    category: 'Machine Learning',
    tags: ['python', 'ml', 'ai'],
  },
  {
    slug: 'post-2',
    title: 'Deep Learning with PyTorch',
    description: 'Building neural networks with PyTorch',
    category: 'Deep Learning',
    tags: ['pytorch', 'deep-learning', 'neural-networks'],
  },
  {
    slug: 'post-3',
    title: 'Natural Language Processing',
    description: 'Text processing and NLP techniques',
    category: 'NLP',
    tags: ['nlp', 'text', 'transformers'],
  },
];

describe('hooks/useSearch', () => {
  describe('initialization', () => {
    it('returns empty results initially', () => {
      const { result } = renderHook(() => useSearch(mockPosts));

      expect(result.current.results).toEqual([]);
      expect(result.current.query).toBe('');
    });

    it('provides setQuery function', () => {
      const { result } = renderHook(() => useSearch(mockPosts));

      expect(typeof result.current.setQuery).toBe('function');
    });

    it('handles empty posts array', () => {
      const { result } = renderHook(() => useSearch([]));

      expect(result.current.results).toEqual([]);
    });

    it('handles undefined posts', () => {
      const { result } = renderHook(() => useSearch(undefined));

      expect(result.current.results).toEqual([]);
    });
  });

  describe('search functionality', () => {
    it('finds matches in title', async () => {
      const { result } = renderHook(() => useSearch(mockPosts));

      act(() => {
        result.current.setQuery('Machine Learning');
      });

      await waitFor(() => {
        expect(result.current.results.length).toBeGreaterThan(0);
        expect(result.current.results.some((p) => p.slug === 'post-1')).toBe(true);
      });
    });

    it('finds matches in description', async () => {
      const { result } = renderHook(() => useSearch(mockPosts));

      act(() => {
        result.current.setQuery('neural networks');
      });

      await waitFor(() => {
        expect(result.current.results.length).toBeGreaterThan(0);
        expect(result.current.results.some((p) => p.slug === 'post-2')).toBe(true);
      });
    });

    it('finds matches in tags', async () => {
      const { result } = renderHook(() => useSearch(mockPosts));

      act(() => {
        result.current.setQuery('transformers');
      });

      await waitFor(() => {
        expect(result.current.results.length).toBeGreaterThan(0);
        expect(result.current.results.some((p) => p.slug === 'post-3')).toBe(true);
      });
    });

    it('finds matches in category', async () => {
      const { result } = renderHook(() => useSearch(mockPosts));

      act(() => {
        result.current.setQuery('Deep Learning');
      });

      await waitFor(() => {
        expect(result.current.results.length).toBeGreaterThan(0);
        expect(result.current.results.some((p) => p.slug === 'post-2')).toBe(true);
      });
    });

    it('returns empty results for non-matching query', async () => {
      const { result } = renderHook(() => useSearch(mockPosts));

      act(() => {
        result.current.setQuery('xyznonexistent123');
      });

      await waitFor(() => {
        expect(result.current.results).toEqual([]);
      });
    });

    it('returns empty results for whitespace-only query', async () => {
      const { result } = renderHook(() => useSearch(mockPosts));

      act(() => {
        result.current.setQuery('   ');
      });

      await waitFor(() => {
        expect(result.current.results).toEqual([]);
      });
    });

    it('clears results when query is cleared', async () => {
      const { result } = renderHook(() => useSearch(mockPosts));

      act(() => {
        result.current.setQuery('Machine');
      });

      await waitFor(() => {
        expect(result.current.results.length).toBeGreaterThan(0);
      });

      act(() => {
        result.current.setQuery('');
      });

      await waitFor(() => {
        expect(result.current.results).toEqual([]);
      });
    });
  });

  describe('result limits', () => {
    it('limits results to maximum of 10', async () => {
      const manyPosts = Array.from({ length: 15 }, (_, i) => ({
        slug: `post-${i}`,
        title: `Test Post ${i}`,
        description: 'Common description for testing',
        category: 'Test',
        tags: ['test'],
      }));

      const { result } = renderHook(() => useSearch(manyPosts));

      act(() => {
        result.current.setQuery('Test');
      });

      await waitFor(() => {
        expect(result.current.results.length).toBeLessThanOrEqual(10);
      });
    });
  });
});
