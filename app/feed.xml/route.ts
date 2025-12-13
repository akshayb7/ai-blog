import { getAllPosts } from '@/lib/posts';

type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  [key: string]: any;
};

export async function GET() {
  const posts = getAllPosts() as Post[];
  const baseUrl = 'https://blog.akshayworks.com';

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>Akshay's Expedition Logs</title>
    <link>${baseUrl}</link>
    <description>Documenting the journey through Machine Learning, Deep Learning, and Generative AI</description>
    <language>en-us</language>
    ${posts
      .map((post) => {
        return `
      <item>
        <title><![CDATA[${post.title}]]></title>
        <link>${baseUrl}/posts/${post.slug}</link>
        <guid isPermaLink="true">${baseUrl}/posts/${post.slug}</guid>
        <pubDate>${new Date(post.date).toUTCString()}</pubDate>
        <description><![CDATA[${post.excerpt}]]></description>
      </item>`;
      })
      .join('')}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
