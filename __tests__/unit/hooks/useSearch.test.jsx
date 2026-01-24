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

      await waitFor(
        () => {
          expect(result.current.results.length).toBeGreaterThan(0);
        },
        { timeout: 2000 }
      );
    });

    it('finds matches in description', async () => {
      const { result } = renderHook(() => useSearch(mockPosts));

      act(() => {
        result.current.setQuery('neural networks');
      });

      await waitFor(
        () => {
          expect(result.current.results.length).toBeGreaterThan(0);
        },
        { timeout: 2000 }
      );
    });

    it('returns empty results for whitespace-only query', () => {
      const { result } = renderHook(() => useSearch(mockPosts));

      act(() => {
        result.current.setQuery('   ');
      });

      // Whitespace query should immediately return empty
      expect(result.current.results).toEqual([]);
    });

    it('updates query value when setQuery is called', () => {
      const { result } = renderHook(() => useSearch(mockPosts));

      act(() => {
        result.current.setQuery('test query');
      });

      expect(result.current.query).toBe('test query');
    });
  });
});
