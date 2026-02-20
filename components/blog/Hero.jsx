'use client';

import Link from 'next/link';
import { Brain, Code, BookOpen, Sparkles } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

export default function Hero() {
  const categories = [
    { name: 'Deep Learning', icon: Brain, color: 'from-amber-600 to-amber-700' },
    { name: 'GenAI', icon: Sparkles, color: 'from-amber-500 to-orange-600' },
    { name: 'ML Engineering', icon: Code, color: 'from-amber-700 to-yellow-700' },
    { name: 'Data Science', icon: BookOpen, color: 'from-orange-500 to-amber-600' },
  ];

  return (
    <div className="pt-32 pb-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Main Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="font-heading text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-amber-800 to-orange-900 dark:from-gray-100 dark:via-amber-300 dark:to-orange-300 bg-clip-text text-transparent leading-tight">
            Akshay's Expedition Logs
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Deep dives into distributed systems, ML infrastructure, and the architectures
            that make AI at scale actually work
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap justify-center gap-3">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const categorySlug = cat.name.toLowerCase().replace(/\s+/g, '-');
            return (
              <Link
                key={cat.name}
                href={`/category/${categorySlug}`}
              >
                <Badge
                  variant="outline"
                  className="px-4 py-2 cursor-pointer border-gray-200 dark:border-slate-700 hover:border-amber-300 dark:hover:border-amber-700 transition-colors bg-white/80 dark:bg-slate-900/80"
                >
                  <div className={`bg-gradient-to-r ${cat.color} p-1 rounded mr-2`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  {cat.name}
                </Badge>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}