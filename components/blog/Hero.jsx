'use client';

import Link from 'next/link';
import { Brain, Code, BookOpen, Sparkles } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

export default function Hero() {
  const categories = [
    { name: 'Deep Learning', icon: Brain, color: 'from-blue-500 to-cyan-500' },
    { name: 'GenAI', icon: Sparkles, color: 'from-purple-500 to-pink-500' },
    { name: 'ML Engineering', icon: Code, color: 'from-green-500 to-emerald-500' },
    { name: 'Data Science', icon: BookOpen, color: 'from-orange-500 to-red-500' },
  ];

  return (
    <div className="pt-32 pb-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Main Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-gray-900 via-blue-900 to-cyan-900 dark:from-gray-100 dark:via-blue-300 dark:to-cyan-300 bg-clip-text text-transparent leading-tight">
            Akshay's Expedition Logs
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            Exploring Machine Learning, Deep Learning, and Generative AI through
            practical implementations and visual explanations
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
                  variant="glass"
                  className="px-4 py-2 hover:scale-105 transition-transform cursor-pointer"
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