import { getPostsByCategory, getAllPosts } from '@/lib/posts';
import Navigation from '@/components/blog/Navigation';
import Footer from '@/components/blog/Footer';
import PostCard from '@/components/blog/PostCard';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

// Generate static params for all categories
export async function generateStaticParams() {
  const posts = getAllPosts();
  const categories = [...new Set(posts.map(post => post.category))];
  
  return categories.map((category) => ({
    category: category.toLowerCase().replace(/\s+/g, '-'),
  }));
}

// Generate metadata
export async function generateMetadata({ params }) {
  const { category } = await params;
  const displayCategory = category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  return {
    title: `${displayCategory} Posts | AI Lab`,
    description: `Browse all ${displayCategory} posts`,
  };
}

export default async function CategoryPage({ params }) {
  const { category } = await params;
  
  // Convert URL slug back to category name
  const displayCategory = category
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  const posts = getPostsByCategory(displayCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/30">
      <Navigation />

      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Back Button */}
          <Link 
            href="/"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          {/* Header */}
          <div className="mb-12">
            <div className="mb-4">
              <span className="glass-card px-4 py-2 rounded-full text-sm font-medium text-gray-700 border border-white/20">
                {displayCategory}
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {displayCategory} Posts
            </h1>
            <p className="text-xl text-gray-600">
              {posts.length} {posts.length === 1 ? 'post' : 'posts'} in this category
            </p>
          </div>

          {/* Posts Grid */}
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="glass-card rounded-2xl p-12 text-center border border-white/20">
              <p className="text-gray-600 text-lg">No posts in this category yet.</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}