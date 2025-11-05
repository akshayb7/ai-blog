import Navigation from '@/components/blog/Navigation';
import Hero from '@/components/blog/Hero';
import FeaturedPost from '@/components/blog/FeaturedPost';
import RecentPosts from '@/components/blog/RecentPosts';
import Newsletter from '@/components/blog/Newsletter';
import Footer from '@/components/blog/Footer';
import { getFeaturedPost, getRecentPosts } from '@/lib/posts';

export default function Home() {
  // Load posts from MDX files
  const featuredPost = getFeaturedPost();
  const recentPosts = getRecentPosts(3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/30">
      <Navigation />
      
      <main>
        <Hero />
        
        <div className="max-w-7xl mx-auto px-6 pb-20">
          {featuredPost && <FeaturedPost post={featuredPost} />}
          {recentPosts.length > 0 && <RecentPosts posts={recentPosts} />}
          <Newsletter />
        </div>
      </main>

      <Footer />
    </div>
  );
}