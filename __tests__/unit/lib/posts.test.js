import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  getAllPostSlugs,
  getPostBySlug,
  getAllPosts,
  getFeaturedPost,
  getRecentPosts,
  getPostsByCategory,
} from '@/lib/posts';

describe('lib/posts', () => {
  describe('getAllPostSlugs', () => {
    it('returns an array of strings', () => {
      const slugs = getAllPostSlugs();
      expect(Array.isArray(slugs)).toBe(true);
      slugs.forEach((slug) => {
        expect(typeof slug).toBe('string');
      });
    });

    it('returns non-empty array when posts exist', () => {
      const slugs = getAllPostSlugs();
      expect(slugs.length).toBeGreaterThan(0);
    });

    it('slugs do not contain file extensions', () => {
      const slugs = getAllPostSlugs();
      slugs.forEach((slug) => {
        expect(slug).not.toMatch(/\.mdx$/);
      });
    });
  });

  describe('getPostBySlug', () => {
    it('returns post with frontmatter and content', () => {
      const slugs = getAllPostSlugs();
      if (slugs.length > 0) {
        const post = getPostBySlug(slugs[0]);
        expect(post).toHaveProperty('slug');
        expect(post).toHaveProperty('frontmatter');
        expect(post).toHaveProperty('content');
      }
    });

    it('frontmatter contains required fields', () => {
      const slugs = getAllPostSlugs();
      if (slugs.length > 0) {
        const post = getPostBySlug(slugs[0]);
        expect(post.frontmatter).toHaveProperty('title');
      }
    });

    it('throws error for invalid slug', () => {
      expect(() => getPostBySlug('non-existent-post-slug-12345')).toThrow();
    });
  });

  describe('getAllPosts', () => {
    it('returns array of posts with required fields', () => {
      const posts = getAllPosts();
      expect(Array.isArray(posts)).toBe(true);
      posts.forEach((post) => {
        expect(post).toHaveProperty('slug');
        expect(post).toHaveProperty('title');
      });
    });

    it('posts are sorted by date (newest first)', () => {
      const posts = getAllPosts();
      if (posts.length > 1) {
        for (let i = 0; i < posts.length - 1; i++) {
          if (posts[i].date && posts[i + 1].date) {
            const date1 = new Date(posts[i].date);
            const date2 = new Date(posts[i + 1].date);
            expect(date1.getTime()).toBeGreaterThanOrEqual(date2.getTime());
          }
        }
      }
    });
  });

  describe('getFeaturedPost', () => {
    it('returns a single post object', () => {
      const featured = getFeaturedPost();
      if (featured) {
        expect(featured).toHaveProperty('slug');
        expect(featured).toHaveProperty('title');
      }
    });

    it('returns featured post if one exists, otherwise first post', () => {
      const featured = getFeaturedPost();
      const allPosts = getAllPosts();

      if (featured) {
        const hasFeaturedPost = allPosts.some((p) => p.featured === true);
        if (hasFeaturedPost) {
          expect(featured.featured).toBe(true);
        } else {
          expect(featured.slug).toBe(allPosts[0]?.slug);
        }
      }
    });
  });

  describe('getRecentPosts', () => {
    it('respects the limit parameter', () => {
      const limit = 3;
      const recentPosts = getRecentPosts(limit);
      expect(recentPosts.length).toBeLessThanOrEqual(limit);
    });

    it('excludes the featured post', () => {
      const featured = getFeaturedPost();
      const recentPosts = getRecentPosts(10);

      if (featured) {
        const containsFeatured = recentPosts.some(
          (p) => p.slug === featured.slug
        );
        expect(containsFeatured).toBe(false);
      }
    });

    it('uses default limit of 6', () => {
      const recentPosts = getRecentPosts();
      expect(recentPosts.length).toBeLessThanOrEqual(6);
    });
  });

  describe('getPostsByCategory', () => {
    it('filters posts by category', () => {
      const allPosts = getAllPosts();
      if (allPosts.length > 0 && allPosts[0].category) {
        const category = allPosts[0].category;
        const filtered = getPostsByCategory(category);

        expect(filtered.length).toBeGreaterThan(0);
        filtered.forEach((post) => {
          expect(post.category.toLowerCase()).toBe(category.toLowerCase());
        });
      }
    });

    it('is case-insensitive', () => {
      const allPosts = getAllPosts();
      if (allPosts.length > 0 && allPosts[0].category) {
        const category = allPosts[0].category;
        const lowerResults = getPostsByCategory(category.toLowerCase());
        const upperResults = getPostsByCategory(category.toUpperCase());

        expect(lowerResults.length).toBe(upperResults.length);
      }
    });

    it('returns empty array for non-existent category', () => {
      const filtered = getPostsByCategory('non-existent-category-12345');
      expect(filtered).toEqual([]);
    });
  });
});
