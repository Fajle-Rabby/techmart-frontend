import Link from 'next/link';
import ProductCard from '../components/ProductCard';
import { getProducts, getCategories } from '../lib/api';

export const metadata = { title: 'Products - TechMart' };

export default async function ProductsPage({ searchParams }) {
  const page = parseInt(searchParams?.page) || 1;
  const search = searchParams?.search || null;
  const categoryId = searchParams?.category_id || null;
  const featured = searchParams?.featured || null;
  const sort = searchParams?.sort || 'p.sort_order';
  const order = searchParams?.order || 'ASC';
  const limit = 20;

  let productsData = { data: [], total: 0 };
  let categoriesData = { data: [] };

  try {
    const params = { page, limit, sort, order };
    if (search) params.search = search;
    if (categoryId) params.categoryId = categoryId;
    [productsData, categoriesData] = await Promise.all([
      featured ? import('../lib/api').then(m => m.getFeaturedProducts(limit)) : getProducts(params),
      getCategories(),
    ]);
  } catch (error) {
    console.error('Products page error:', error);
  }

  const totalPages = Math.ceil((productsData.total || 0) / limit);
  const currentCategory = categoryId ? (categoriesData.data || []).find(c => c.id == categoryId) : null;
  const pageTitle = search ? `Search: "${search}"` : currentCategory ? currentCategory.name : featured ? 'Featured Products' : 'All Products';

  const sortOptions = [
    { label: 'Default', sort: 'p.sort_order', order: 'ASC' },
    { label: 'Name (A-Z)', sort: 'pd.name', order: 'ASC' },
    { label: 'Price (Low→High)', sort: 'p.price', order: 'ASC' },
    { label: 'Price (High→Low)', sort: 'p.price', order: 'DESC' },
    { label: 'Newest', sort: 'p.date_added', order: 'DESC' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      {/* ব্রেডক্রাম্ব */}
      <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-4">
        <Link href="/" className="hover:text-primary">🏠</Link>
        <span>/</span>
        {currentCategory ? (
          <>
            <Link href="/products" className="hover:text-primary">Products</Link>
            <span>/</span>
            <span className="text-gray-800 font-medium">{currentCategory.name}</span>
          </>
        ) : (
          <span className="text-gray-800 font-medium">{pageTitle}</span>
        )}
      </nav>

      {/* সাব-ক্যাটাগরি ট্যাগ */}
      {categoryId && currentCategory?.children?.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {currentCategory.children.map(sub => (
            <Link key={sub.id} href={`/products?category_id=${sub.id}`}
              className="px-3 py-1 bg-white border rounded-full text-xs text-gray-600 hover:border-primary hover:text-primary transition">
              {sub.name}
            </Link>
          ))}
        </div>
      )}

      <div className="flex gap-6">
        {/* সাইডবার ফিল্টার */}
        <aside className="hidden lg:block w-56 shrink-0 space-y-5">
          {/* প্রাইস রেঞ্জ */}
          <div className="bg-white rounded-lg border p-4">
            <h3 className="font-semibold text-gray-800 text-sm mb-3">Price Range</h3>
            <input type="range" min="0" max="100000" className="w-full mb-2" />
            <div className="flex gap-2">
              <input type="text" placeholder="0" className="w-full px-2 py-1.5 border rounded text-xs text-center" />
              <input type="text" placeholder="100000" className="w-full px-2 py-1.5 border rounded text-xs text-center" />
            </div>
          </div>

          {/* Availability */}
          <div className="bg-white rounded-lg border p-4">
            <h3 className="font-semibold text-gray-800 text-sm mb-3 flex items-center justify-between">
              Availability <span className="text-gray-400 text-lg cursor-pointer">⌃</span>
            </h3>
            {['In Stock', 'Pre Order', 'Up Coming'].map(label => (
              <label key={label} className="flex items-center gap-2 py-1 cursor-pointer">
                <input type="checkbox" className="accent-primary rounded" />
                <span className="text-xs text-gray-600">{label}</span>
              </label>
            ))}
          </div>

          {/* ক্যাটাগরি */}
          <div className="bg-white rounded-lg border p-4">
            <h3 className="font-semibold text-gray-800 text-sm mb-3">Categories</h3>
            <ul className="space-y-0.5 max-h-60 overflow-y-auto">
              <li>
                <Link href="/products"
                  className={`block px-2 py-1.5 rounded text-xs transition ${!categoryId ? 'bg-primary/10 text-primary font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}>
                  All Products
                </Link>
              </li>
              {(categoriesData.data || []).map(cat => (
                <li key={cat.id}>
                  <Link href={`/products?category_id=${cat.id}`}
                    className={`block px-2 py-1.5 rounded text-xs transition ${categoryId == cat.id ? 'bg-primary/10 text-primary font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}>
                    {cat.name} <span className="text-gray-400">({cat.product_count})</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* মেইন কন্টেন্ট */}
        <div className="flex-1 min-w-0">
          {/* টাইটেল + সর্ট বার */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5 bg-white rounded-lg border px-4 py-3">
            <h1 className="text-base font-bold text-gray-900">{pageTitle}</h1>
            <div className="flex items-center gap-3 text-xs">
              <span className="text-gray-500">
                Showing {productsData.data?.length || 0} of {productsData.total || productsData.data?.length || 0}
              </span>
              <span className="text-gray-300">|</span>
              <span className="text-gray-500">Sort By:</span>
              <div className="flex gap-1">
                {sortOptions.map(opt => (
                  <Link key={opt.label}
                    href={`/products?sort=${opt.sort}&order=${opt.order}${categoryId ? `&category_id=${categoryId}` : ''}${search ? `&search=${search}` : ''}`}
                    className={`px-2.5 py-1 rounded-md border transition ${sort === opt.sort && order === opt.order ? 'bg-primary text-white border-primary' : 'text-gray-600 border-gray-200 hover:border-primary'}`}>
                    {opt.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* প্রোডাক্ট গ্রিড */}
          {productsData.data?.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4">
              {productsData.data.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-gray-400">
              <p className="text-5xl mb-3">🔍</p>
              <p className="text-lg">No products found</p>
            </div>
          )}

          {/* পেজিনেশন */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-8">
              <div className="flex gap-1">
                {page > 1 && (
                  <Link href={`/products?page=${page - 1}${categoryId ? `&category_id=${categoryId}` : ''}${search ? `&search=${search}` : ''}`}
                    className="px-3 py-2 text-xs border rounded-lg hover:border-primary">PREV</Link>
                )}
                {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => i + 1).map(p => (
                  <Link key={p}
                    href={`/products?page=${p}${sort !== 'p.sort_order' ? `&sort=${sort}&order=${order}` : ''}${categoryId ? `&category_id=${categoryId}` : ''}${search ? `&search=${search}` : ''}`}
                    className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-medium transition ${page === p ? 'bg-primary text-white' : 'border hover:border-primary text-gray-600'}`}>
                    {p}
                  </Link>
                ))}
                {page < totalPages && (
                  <Link href={`/products?page=${page + 1}${categoryId ? `&category_id=${categoryId}` : ''}${search ? `&search=${search}` : ''}`}
                    className="px-3 py-2 text-xs border rounded-lg hover:border-primary">NEXT</Link>
                )}
              </div>
              <span className="text-xs text-gray-500">
                Showing {(page - 1) * limit + 1} to {Math.min(page * limit, productsData.total || 0)} of {productsData.total || 0} ({totalPages} Pages)
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
