import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/posts';

type Post = {
    slug: string;
    date: string;
    [key: string]: any;
};

export default function sitemap(): MetadataRoute.Sitemap {
    const posts = getAllPosts() as Post[];
    const baseUrl = 'https://blog.akshayworks.com';

    const postUrls = posts.map((post) => ({
        url: `${baseUrl}/posts/${post.slug}`,
        lastModified: new Date(post.date || new Date()),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    return [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        ...postUrls,
    ];
}
