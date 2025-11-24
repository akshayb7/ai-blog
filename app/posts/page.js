import Navigation from '@/components/blog/Navigation';
import Footer from '@/components/blog/Footer';
import PostCard from '@/components/blog/PostCard';
import { getAllPosts } from '@/lib/posts';
import { BookOpen } from 'lucide-react';

export const metadata = {
  title: 'All Posts | Akshay\'s Expedition Logs',
  description: 'Browse all blog posts about Machine Learning, AI, and Data Science',
};

export default function PostsPage() {
  const allPosts = getAllPosts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/30 dark:from-slate-950 dark:via-blue-950 dark:to-slate-900">
      <Navigation posts={allPosts} />

      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 mb-6">
              <BookOpen className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              All Posts
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Exploring Machine Learning, Deep Learning, and AI through practical implementations
            </p>
            <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
              {allPosts.length} {allPosts.length === 1 ? 'post' : 'posts'} published
            </div>
          </div>

          {/* Posts Grid */}
          {allPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {allPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-600 dark:text-gray-400 text-lg">
                No posts found. Check back soon!
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}