import Link from 'next/link';
import Image from 'next/image';
import { Clock } from 'lucide-react';

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function PostCard({ post }) {
  return (
    <Link href={`/posts/${post.slug}`}>
      <Card className="h-full overflow-hidden hover:scale-105 transition-transform duration-300 cursor-pointer group border-white/20">
        <div className="relative h-48 overflow-hidden">
          {/* Image - OPTIMIZED */}
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            quality={85}
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10" />

          {/* Category Badge */}
          <div className="absolute top-4 left-4 z-20">
            <Badge variant="glass" className="backdrop-blur-md bg-black/30 text-white border-white/20">
              {post.category}
            </Badge>
          </div>
        </div>

        <CardContent className="p-6">
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
          <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 line-clamp-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-gray-600 dark:text-gray-400 line-clamp-2 text-sm leading-relaxed">
            {post.excerpt}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}