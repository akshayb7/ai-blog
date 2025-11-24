'use client';

import Image from 'next/image';
import { useState } from 'react';

export default function MDXImage({ src, alt, ...props }) {
  const [isLoading, setIsLoading] = useState(true);

  // Handle both absolute URLs and relative paths
  const imageSrc = src.startsWith('http') ? src : src;

  return (
    <div className="relative w-full my-8">
      <div className={`relative w-full transition-opacity duration-300 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Image
          src={imageSrc}
          alt={alt || 'Blog post image'}
          width={1200}
          height={675}
          className="rounded-xl shadow-lg w-full h-auto"
          quality={85}
          onLoad={() => setIsLoading(false)}
          sizes="(max-width: 768px) 100vw, 896px"
        />
      </div>
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-xl" />
      )}
    </div>
  );
}