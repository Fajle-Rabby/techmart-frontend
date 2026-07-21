import Link from 'next/link';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://www.techmart.com.bd';

export async function generateMetadata({ searchParams }) {
  try {
    const res = await fetch(`${API_BASE}/index.php?route=api/custom/blog&id=${searchParams?.id}`);
    const data = await res.json();
    if (data.success) return { title: `${data.data.title} - TechMart Blog` };
  } catch (e) {}
  return { title: 'Blog - TechMart' };
}

export default async function BlogPostPage({ searchParams }) {
  const id = searchParams?.id;
  if (!id) return <div className="max-w-4xl mx-auto px-4 py-20 text-center text-gray-400">Post not found</div>;

  let post = null;
  try {
    const res = await fetch(`${API_BASE}/index.php?route=api/custom/blog&id=${id}`, { next: { revalidate: 300 } });
    const data = await res.json();
    if (data.success) post = data.data;
  } catch (e) {}

  if (!post) return <div className="max-w-4xl mx-auto px-4 py-20 text-center text-gray-400">Post not found</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <nav className="text-xs text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary">🏠</Link> / <Link href="/blog" className="hover:text-primary">Blog</Link> / <span className="text-gray-800 font-medium">{post.title}</span>
      </nav>
      <article className="bg-white rounded-xl border p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">{post.title}</h1>
        <div className="prose prose-sm max-w-none text-gray-600" dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
      <div className="mt-6 text-center">
        <Link href="/blog" className="text-primary text-sm hover:underline">← Back to Blog</Link>
      </div>
    </div>
  );
}
