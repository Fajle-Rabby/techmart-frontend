import Link from 'next/link';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://www.techmart.com.bd';

export const metadata = { title: 'Blog - TechMart' };

async function getPosts() {
  try {
    const res = await fetch(`${API_BASE}/index.php?route=api/custom/blog`, { next: { revalidate: 300 } });
    return res.json();
  } catch (e) { return { success: false, data: [] }; }
}

export default async function BlogPage() {
  const data = await getPosts();
  const posts = data.data || [];

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <nav className="text-xs text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary">🏠</Link> / <span className="text-gray-800 font-medium">Blog</span>
      </nav>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Blog</h1>

      {posts.length > 0 ? (
        <div className="space-y-4">
          {posts.map(post => (
            <Link key={post.id} href={`/blog/${post.slug}?id=${post.id}`}
              className="block bg-white rounded-xl border p-6 hover:border-primary/30 hover:shadow-md transition-all group">
              <h2 className="text-lg font-bold text-gray-800 group-hover:text-primary transition mb-2">{post.title}</h2>
              <p className="text-sm text-gray-500 line-clamp-3">{post.excerpt}</p>
              <span className="text-xs text-primary font-medium mt-3 inline-block">Read More →</span>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400 py-20">No blog posts yet</p>
      )}
    </div>
  );
}
