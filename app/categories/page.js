import Link from 'next/link';
import { getCategories } from '../lib/api';

export const metadata = {
  title: 'ক্যাটাগরি - TechMart',
  description: 'TechMart এর সকল পণ্য ক্যাটাগরি দেখুন। মোবাইল, ল্যাপটপ, গ্যাজেট ও ইলেকট্রনিক্স।',
};

export default async function CategoriesPage() {
  let categoriesData = { data: [] };

  try {
    categoriesData = await getCategories();
  } catch (error) {
    console.error('Categories fetch error:', error);
  }

  const categories = categoriesData.data || [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* ব্রেডক্রাম্ব */}
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary">হোম</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">ক্যাটাগরি</span>
      </nav>

      <h1 className="text-2xl font-bold text-gray-900 mb-8">সকল ক্যাটাগরি</h1>

      {categories.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/products?category_id=${cat.id}`}
              className="group bg-white rounded-xl border border-gray-100 overflow-hidden hover:border-primary/30 hover:shadow-lg transition-all duration-300"
            >
              {/* ছবি */}
              <div className="aspect-square bg-gray-50 flex items-center justify-center overflow-hidden p-4">
                {cat.image ? (
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <span className="text-5xl text-gray-300 group-hover:scale-110 transition-transform duration-300">📦</span>
                )}
              </div>

              {/* তথ্য */}
              <div className="p-3 text-center border-t">
                <h3 className="text-sm font-semibold text-gray-800 group-hover:text-primary transition line-clamp-2 mb-1">
                  {cat.name}
                </h3>
                <p className="text-xs text-gray-400">{cat.product_count} পণ্য</p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-400">
          <p className="text-4xl mb-3">📦</p>
          <p className="text-lg">কোনো ক্যাটাগরি পাওয়া যায়নি</p>
        </div>
      )}

      {/* সাব-ক্যাটাগরি সহ ক্যাটাগরি সেকশন */}
      {categories.filter(c => c.children && c.children.length > 0).length > 0 && (
        <div className="mt-12">
          <h2 className="text-xl font-bold text-gray-900 mb-6">ক্যাটাগরি ও সাব-ক্যাটাগরি</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.filter(c => c.children && c.children.length > 0).map((cat) => (
              <div key={cat.id} className="bg-white rounded-xl border p-5">
                <Link
                  href={`/products?category_id=${cat.id}`}
                  className="flex items-center gap-3 mb-4 group"
                >
                  {cat.image ? (
                    <img src={cat.image} alt={cat.name} className="w-10 h-10 object-contain" />
                  ) : (
                    <span className="text-2xl">📦</span>
                  )}
                  <div>
                    <h3 className="font-semibold text-gray-800 group-hover:text-primary transition">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-gray-400">{cat.product_count} পণ্য</p>
                  </div>
                </Link>

                <div className="flex flex-wrap gap-2">
                  {cat.children.map((sub) => (
                    <Link
                      key={sub.id}
                      href={`/products?category_id=${sub.id}`}
                      className="px-3 py-1.5 bg-gray-50 text-xs text-gray-600 rounded-lg hover:bg-primary/10 hover:text-primary transition"
                    >
                      {sub.name} ({sub.product_count})
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
