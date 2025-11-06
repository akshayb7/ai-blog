import Link from 'next/link';
import { Clock } from 'lucide-react';

export default function PostCard({ post }) {
  return (
    <Link href={`/posts/${post.slug}`}>
      <article className="glass-card rounded-2xl overflow-hidden border border-white/20 hover:scale-105 transition-transform duration-300 cursor-pointer group h-full">
        <div className="relative h-48 overflow-hidden">
          {/* Image */}
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          
          {/* Category Badge */}
          <span
            className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium text-white border border-white/20"
            style={{
              background: 'rgba(0, 0, 0, 0.3)',
              backdropFilter: 'blur(10px)',
            }}
          >
            {post.category}
          </span>
        </div>

        <div className="p-6">
          {/* Meta Info */}
          <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-400 mb-3">
            <span className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{post.readTime}</span>
            </span>
            <span>•</span>
            <span>{post.date}</span>
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-gray-600 dark:text-gray-400 line-clamp-2 text-sm leading-relaxed">
            {post.excerpt}
          </p>
        </div>
      </article>
    </Link>
  );
}