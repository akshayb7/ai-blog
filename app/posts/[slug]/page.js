import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPostBySlug, getAllPostSlugs } from '@/lib/posts';
import Navigation from '@/components/blog/Navigation';
import Footer from '@/components/blog/Footer';
import ReadingProgress from '@/components/blog/ReadingProgress';
import TableOfContents from '@/components/blog/TableOfContents';
import { Clock, Calendar, User, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypePrettyCode from 'rehype-pretty-code';
import 'katex/dist/katex.min.css';

// Generate static params for all posts
export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { frontmatter } = getPostBySlug(slug);
  
  return {
    title: `${frontmatter.title} | Akshay\'s Expedition Logs`,
    description: frontmatter.description,
    openGraph: {
      title: frontmatter.title,
      description: frontmatter.description,
      images: [frontmatter.image],
    },
  };
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const { frontmatter, content } = getPostBySlug(slug);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/30">
      <ReadingProgress />
      <Navigation />
      <TableOfContents />

      <article className="pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          {/* Back Button */}
          <Link 
            href="/"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          {/* Hero Image */}
          {frontmatter.image && (
            <div className="glass-card rounded-2xl overflow-hidden mb-8 border border-white/20">
              <img
                src={frontmatter.image}
                alt={frontmatter.title}
                className="w-full h-96 object-cover"
              />
            </div>
          )}

          {/* Post Header */}
          <header className="mb-12">
            {/* Category Badge */}
            <div className="mb-4">
              <span className="glass-card px-4 py-1.5 rounded-full text-sm font-medium text-gray-700 border border-white/20">
                {frontmatter.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {frontmatter.title}
            </h1>

            {/* Description */}
            <p className="text-xl text-gray-600 mb-6 leading-relaxed">
              {frontmatter.description}
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              {frontmatter.author && (
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>{frontmatter.author}</span>
                </div>
              )}
              {frontmatter.date && (
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(frontmatter.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</span>
                </div>
              )}
              {frontmatter.readTime && (
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{frontmatter.readTime}</span>
                </div>
              )}
            </div>

            {/* Tags */}
            {frontmatter.tags && frontmatter.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6">
                {frontmatter.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-medium text-gray-600 bg-white/50 rounded-full border border-gray-200"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Post Content */}
          <div className="glass-card rounded-2xl p-8 md:p-12 border border-white/20">
            <div className="prose prose-lg prose-gray max-w-none
              prose-headings:font-bold prose-headings:text-gray-900
              prose-h1:text-4xl prose-h1:mb-6
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4
              prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
              prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-gray-900 prose-strong:font-semibold
              prose-code:text-pink-600 prose-code:bg-pink-50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-xl prose-pre:p-6
              prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
              prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6
              prose-li:text-gray-700 prose-li:my-2
              prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-600
              prose-img:rounded-xl prose-img:shadow-lg
            ">
              <MDXRemote 
                source={content}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkMath],
                    rehypePlugins: [
                      rehypeKatex,
                      [
                        rehypePrettyCode,
                        {
                          theme: 'github-dark',
                          keepBackground: true,
                        },
                      ],
                    ],
                  },
                }}
              />
            </div>
          </div>

          {/* Back to Home Button */}
          <div className="mt-12 text-center">
            <Link
              href="/"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium rounded-xl hover:shadow-lg transition-shadow"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
}