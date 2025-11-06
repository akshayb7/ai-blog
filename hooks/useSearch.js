import { useState, useEffect } from 'react';
import FlexSearch from 'flexsearch';

export function useSearch(posts) {
  const [index, setIndex] = useState(null);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  // Initialize FlexSearch index
  useEffect(() => {
    if (!posts || posts.length === 0) return;

    const searchIndex = new FlexSearch.Index({
      tokenize: 'forward',
      cache: true,
      resolution: 9,
    });

    // Index all posts
    posts.forEach((post, i) => {
      const searchableText = [
        post.title,
        post.description,
        post.category,
        post.tags?.join(' '),
      ].filter(Boolean).join(' ');

      searchIndex.add(i, searchableText);
    });

    setIndex(searchIndex);
  }, [posts]);

  // Perform search when query changes
  useEffect(() => {
    if (!index || !query.trim()) {
      setResults([]);
      return;
    }

    const searchResults = index.search(query, { limit: 10 });
    const matchedPosts = searchResults.map((idx) => posts[idx]);
    setResults(matchedPosts);
  }, [query, index, posts]);

  return { query, setQuery, results };
}