import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/posts');

// Get all post slugs
export function getAllPostSlugs() {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames
      .filter((fileName) => fileName.endsWith('.mdx'))
      .map((fileName) => fileName.replace(/\.mdx$/, ''));
  } catch (error) {
    console.warn('Posts directory not found, returning empty array');
    return [];
  }
}

// Get post data by slug
export function getPostBySlug(slug) {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  return {
    slug,
    frontmatter: data,
    content,
  };
}

// Get all posts with frontmatter
export function getAllPosts() {
  const slugs = getAllPostSlugs();
  const posts = slugs
    .map((slug) => {
      const { frontmatter } = getPostBySlug(slug);
      return {
        slug,
        excerpt: frontmatter.description || frontmatter.excerpt,
        ...frontmatter,
      };
    })
    // Sort by date (newest first)
    .sort((a, b) => {
      if (a.date && b.date) {
        return new Date(b.date) - new Date(a.date);
      }
      return 0;
    });

  return posts;
}

// Get featured post
export function getFeaturedPost() {
  const posts = getAllPosts();
  return posts.find((post) => post.featured === true) || posts[0];
}

// Get recent posts (excluding featured)
export function getRecentPosts(limit = 6) {
  const posts = getAllPosts();
  const featuredPost = getFeaturedPost();

  return posts
    .filter((post) => post.slug !== featuredPost?.slug)
    .slice(0, limit);
}

// Get posts by category
export function getPostsByCategory(category) {
  const posts = getAllPosts();
  return posts.filter(
    (post) => post.category?.toLowerCase() === category.toLowerCase()
  );
}