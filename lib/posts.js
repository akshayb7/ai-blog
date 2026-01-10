import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/posts');

// Recursively get all MDX files from posts directory and subdirectories
function getAllMdxFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      getAllMdxFiles(filePath, fileList);
    } else if (file.endsWith('.mdx')) {
      fileList.push(filePath);
    }
  });
  
  return fileList;
}

// Create a map of slug to full file path
function createSlugMap() {
  const mdxFiles = getAllMdxFiles(postsDirectory);
  const slugMap = {};
  
  mdxFiles.forEach(filePath => {
    const fileName = path.basename(filePath, '.mdx');
    slugMap[fileName] = filePath;
  });
  
  return slugMap;
}

// Get all post slugs
export function getAllPostSlugs() {
  try {
    const mdxFiles = getAllMdxFiles(postsDirectory);
    // Return just the filename without extension as the slug
    return mdxFiles.map(filePath => path.basename(filePath, '.mdx'));
  } catch (error) {
    console.warn('Posts directory not found, returning empty array');
    return [];
  }
}

// Get post data by slug (supports nested directories)
export function getPostBySlug(slug) {
  try {
    // First, try to find the file using our slug map
    const slugMap = createSlugMap();
    const fullPath = slugMap[slug];
    
    if (!fullPath) {
      throw new Error(`Post not found: ${slug}`);
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      frontmatter: data,
      content,
    };
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error.message);
    throw error;
  }
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