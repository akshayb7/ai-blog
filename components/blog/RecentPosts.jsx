import PostCard from './PostCard';

export default function RecentPosts({ posts }) {
  return (
    <div className="mb-20">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post, idx) => (
          <PostCard key={idx} post={post} />
        ))}
      </div>
    </div>
  );
}