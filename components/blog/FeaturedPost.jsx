import Link from 'next/link';
import Image from 'next/image';
import { Clock, ArrowRight } from 'lucide-react';

export default function FeaturedPost({ post }) {
  return (
    <div className="mb-20">
      <h2 className="font-heading text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6">Featured</h2>
      
      <Link href={`/posts/${post.slug}`}>
        <div className="rounded-3xl overflow-hidden border border-gray-200/80 dark:border-slate-700/60 hover:border-amber-300/60 dark:hover:border-amber-600/30 hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-200 cursor-pointer group bg-white dark:bg-slate-900">
          <div className="relative h-96 overflow-hidden">
            {/* Image - OPTIMIZED */}
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              priority
              quality={85}
              sizes="(max-width: 768px) 100vw, 1280px"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10" />

            {/* Category Badge */}
            <div className="absolute top-6 left-6 z-20">
              <span
                className="px-4 py-1.5 rounded-full text-sm font-medium text-white border border-white/20"
                style={{
                  background: 'rgba(0, 0, 0, 0.4)',
                  backdropFilter: 'blur(10px)',
                }}
              >
                {post.category}
              </span>
            </div>

            {/* Content Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 z-20">
              <div className="flex items-center space-x-4 text-sm text-white/90 mb-3">
                <span className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime}</span>
                </span>
                <span>•</span>
                <span>{post.date}</span>
              </div>
              
              <h3 className="font-heading text-3xl md:text-4xl font-bold text-white mb-3">
                {post.title}
              </h3>
              
              <p className="text-lg text-white/90 mb-4 line-clamp-2">
                {post.excerpt}
              </p>
              
              <div className="inline-flex items-center space-x-2 text-white hover:space-x-3 transition-all">
                <span className="font-medium">Read More</span>
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}