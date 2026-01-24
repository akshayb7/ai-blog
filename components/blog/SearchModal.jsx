'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, Clock, ArrowRight } from 'lucide-react';
import { useSearch } from '@/hooks/useSearch';

export default function SearchModal({ isOpen, onClose, posts }) {
  const router = useRouter();
  const { query, setQuery, results } = useSearch(posts);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleSelectPost = useCallback((post) => {
    router.push(`/posts/${post.slug}`);
    onClose();
    setQuery('');
  }, [router, onClose, setQuery]);

  // Reset selection when results change
  useEffect(() => {
    setSelectedIndex(0);
  }, [results]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < results.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
      } else if (e.key === 'Enter' && results[selectedIndex]) {
        e.preventDefault();
        handleSelectPost(results[selectedIndex]);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, results, selectedIndex, onClose, handleSelectPost]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-2xl glass-card rounded-2xl border border-white/20 shadow-2xl">
        {/* Search Input */}
        <div className="flex items-center gap-3 p-4 border-b border-white/10">
          <Search className="w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search posts..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-gray-900 dark:text-gray-100 placeholder-gray-500 text-lg"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-2 hover:bg-white/50 dark:hover:bg-slate-800/50 rounded-lg transition-colors"
            aria-label="Close search"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto hide-scrollbar">
          {query.trim() === '' ? (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              <Search className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p className="text-sm">Start typing to search posts...</p>
              <p className="text-xs mt-2 opacity-75">
                Try searching for topics, titles, or tags
              </p>
            </div>
          ) : results.length === 0 ? (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              <p className="text-sm">No results found for "{query}"</p>
              <p className="text-xs mt-2 opacity-75">
                Try different keywords or check your spelling
              </p>
            </div>
          ) : (
            <div className="p-2">
              {results.map((post, idx) => (
                <button
                  key={post.slug}
                  onClick={() => handleSelectPost(post)}
                  className={`w-full text-left p-4 rounded-xl transition-colors ${
                    idx === selectedIndex
                      ? 'bg-blue-50/50 dark:bg-blue-950/30 border border-blue-200/50 dark:border-blue-800/50'
                      : 'hover:bg-gray-50/50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {/* Post Image */}
                    {post.image && (
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                      />
                    )}

                    {/* Post Info */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1 line-clamp-1">
                        {post.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                        {post.description}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-500">
                        <span className="px-2 py-0.5 bg-gray-100 dark:bg-slate-800 rounded">
                          {post.category}
                        </span>
                        {post.readTime && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.readTime}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Arrow */}
                    <ArrowRight className={`w-5 h-5 flex-shrink-0 transition-opacity ${
                      idx === selectedIndex ? 'opacity-100 text-blue-600 dark:text-blue-400' : 'opacity-0'
                    }`} />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer Hint */}
        <div className="border-t border-white/10 p-3 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-4">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>Esc Close</span>
          </div>
          <span>{results.length} {results.length === 1 ? 'result' : 'results'}</span>
        </div>
      </div>
    </div>
  );
}