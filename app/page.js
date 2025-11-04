import Navigation from '@/components/blog/Navigation';
import Hero from '@/components/blog/Hero';
import FeaturedPost from '@/components/blog/FeaturedPost';
import RecentPosts from '@/components/blog/RecentPosts';
import Newsletter from '@/components/blog/Newsletter';
import Footer from '@/components/blog/Footer';

export default function Home() {
  // TODO: This will come from MDX files later
  const featuredPost = {
    title: "Understanding Transformers: A Visual Deep Dive",
    excerpt: "Breaking down attention mechanisms, positional encodings, and the architecture that powers modern language models.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80",
    category: "Deep Learning",
    readTime: "12 min read",
    date: "Jan 15, 2025",
    slug: "understanding-transformers"
  };

  const recentPosts = [
    {
      title: "Fine-Tuning LLMs: A Practical Guide",
      excerpt: "Learn how to fine-tune large language models efficiently with LoRA and QLoRA techniques.",
      image: "https://images.unsplash.com/photo-1676277791608-ac54525aa94d?w=600&q=80",
      category: "GenAI",
      readTime: "8 min",
      date: "Jan 12, 2025",
      slug: "fine-tuning-llms"
    },
    {
      title: "Vector Databases Explained",
      excerpt: "Why vector databases are crucial for RAG systems and semantic search applications.",
      image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&q=80",
      category: "ML Engineering",
      readTime: "10 min",
      date: "Jan 8, 2025",
      slug: "vector-databases-explained"
    },
    {
      title: "Prompt Engineering Patterns",
      excerpt: "Proven patterns and techniques for getting the most out of language models.",
      image: "https://images.unsplash.com/photo-1655720828018-edd2daec9349?w=600&q=80",
      category: "GenAI",
      readTime: "6 min",
      date: "Jan 5, 2025",
      slug: "prompt-engineering-patterns"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50">
      <Navigation />
      
      <main>
        <Hero />
        
        <div className="max-w-7xl mx-auto px-6 pb-20">
          <FeaturedPost post={featuredPost} />
          <RecentPosts posts={recentPosts} />
          <Newsletter />
        </div>
      </main>

      <Footer />
    </div>
  );
}