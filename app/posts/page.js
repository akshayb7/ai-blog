import { getAllPosts } from '@/lib/posts';
import Navigation from '@/components/blog/Navigation';
import Footer from '@/components/blog/Footer';
import PostCard from '@/components/blog/PostCard';

export const metadata = {
  title: 'All Posts | Akshay\'s Expedition Logs',
  description: 'Browse all expedition logs on Machine Learning, Deep Learning, and Generative AI',
};

export default function AllPostsPage() {
  const posts = getAllPosts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/30 dark:from-slate-950 dark:via-blue-950 dark:to-slate-900">
      <Navigation />

      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              All Posts
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {posts.length} {posts.length === 1 ? 'post' : 'posts'} about Machine Learning, AI, and more
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
              <p className="text-gray-600 dark:text-gray-300 text-lg">No posts yet. Check back soon!</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}