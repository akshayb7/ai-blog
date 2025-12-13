import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPostBySlug, getAllPostSlugs, getAllPosts } from '@/lib/posts';
import Navigation from '@/components/blog/Navigation';
import Footer from '@/components/blog/Footer';
import ReadingProgress from '@/components/blog/ReadingProgress';
import TableOfContents from '@/components/blog/TableOfContents';
import MDXImage from '@/components/blog/MDXImage';
import Comments from '@/components/blog/Comments';
import { Clock, Calendar, User, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import rehypePrettyCode from 'rehype-pretty-code';
import 'katex/dist/katex.min.css';

import { useMDXComponents } from '@/mdx-components';

// Custom components for MDX
const components = useMDXComponents({
  img: MDXImage,
});

// Generate static params for all posts
export async function generateStaticParams() {
  const slugs = getAllPostSlugs();

  // Filter out any invalid slugs
  const validSlugs = slugs.filter(slug => slug && slug !== 'undefined' && slug.trim() !== '');

  return validSlugs.map((slug) => ({
    slug: slug,
  }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { frontmatter } = getPostBySlug(slug);

  return {
    title: `${frontmatter.title} | Akshay's Expedition Logs`,
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

  // Validate slug
  if (!slug || slug === 'undefined' || slug.trim() === '') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Invalid Post</h1>
          <Link href="/" className="text-blue-600 hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const { frontmatter, content } = getPostBySlug(slug);
  const allPosts = getAllPosts(); // For search

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/30 dark:from-slate-950 dark:via-blue-950 dark:to-slate-900">
      <ReadingProgress />
      <Navigation posts={allPosts} />
      <TableOfContents />

      <article className="pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-6">
          {/* Back Button */}
          <Link
            href="/"
            className="inline-flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>

          {/* Hero Image - OPTIMIZED WITH NEXT.JS IMAGE */}
          {frontmatter.image && (
            <div className="glass-card rounded-2xl overflow-hidden mb-8 border border-white/20 relative h-96">
              <Image
                src={frontmatter.image}
                alt={frontmatter.title}
                fill
                className="object-cover"
                priority
                fetchPriority="high"
                quality={85}
                sizes="(max-width: 768px) 100vw, 896px"
              />
            </div>
          )}

          {/* Post Header */}
          <header className="mb-12">
            {/* Category Badge */}
            <div className="mb-4">
              <span className="glass-card px-4 py-1.5 rounded-full text-sm font-medium text-gray-700 dark:text-gray-200 border border-white/20">
                {frontmatter.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight">
              {frontmatter.title}
            </h1>

            {/* Description */}
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              {frontmatter.description}
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
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
                    className="px-3 py-1 text-xs font-medium text-gray-600 dark:text-gray-400 bg-white/50 dark:bg-slate-800/50 rounded-full border border-gray-200 dark:border-slate-700"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {/* Post Content */}
          <div className="glass-card rounded-2xl p-8 md:p-12 border border-white/20">
            <div className="prose prose-lg dark:prose-invert max-w-none
              prose-headings:scroll-mt-24
              prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4
              prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:leading-relaxed prose-p:mb-6
              prose-a:no-underline hover:prose-a:underline
              prose-code:text-sm prose-code:font-normal
              prose-pre:bg-slate-900 dark:prose-pre:bg-slate-950 prose-pre:rounded-xl prose-pre:p-6 prose-pre:border prose-pre:border-slate-700
              prose-ul:my-6 prose-ol:my-6
              prose-li:my-2
              prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:bg-blue-50/50 dark:prose-blockquote:bg-blue-950/30 prose-blockquote:py-2 prose-blockquote:my-6
              prose-img:rounded-xl prose-img:shadow-lg prose-img:my-8
              prose-hr:border-gray-200 dark:prose-hr:border-gray-700 prose-hr:my-8
            ">
              <MDXRemote
                source={content}
                components={components}
                options={{
                  mdxOptions: {
                    remarkPlugins: [remarkMath, remarkGfm],
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

          {/* Comments */}
          <Comments />

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