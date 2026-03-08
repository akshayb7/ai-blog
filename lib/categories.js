import { Camera, Network } from 'lucide-react';

/**
 * Categories that appear as pills in the Hero section.
 * Only add a category here once it has published posts.
 * The slug must match the URL pattern: /category/<slug>
 */
export const featuredCategories = [
  {
    name: 'GenAI',
    slug: 'genai',
    icon: Camera,
  },
  {
    name: 'Distributed Systems',
    slug: 'distributed-systems',
    icon: Network,
  },
];
