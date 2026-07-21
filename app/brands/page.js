import Link from 'next/link';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://www.techmart.com.bd';

export const metadata = { title: 'Brands - TechMart' };

async function getBrands() {
  try {
    const res = await fetch(`${API_BASE}/index.php?route=api/custom/manufacturers`, { next: { revalidate: 300 } });
    return res.json();
  } catch (e) { return { success: false, data: [] }; }
}

export default async function BrandsPage() {
  const data = await getBrands();
  const brands = data.data || [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <nav className="text-xs text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary">🏠</Link> / <span className="text-gray-800 font-medium">Brands</span>
      </nav>
      <h1 className="text-2xl font-bold text-gray-900 mb-8">All Brands</h1>

      {brands.length > 0 ? (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
          {brands.map(brand => (
            <Link key={brand.id} href={`/products?manufacturer_id=${brand.id}`}
              className="group bg-white rounded-xl border p-4 text-center hover:border-primary/30 hover:shadow-lg transition-all">
              {brand.image ? (
                <img src={brand.image} alt={brand.name} className="w-16 h-16 object-contain mx-auto mb-2 group-hover:scale-110 transition-transform" />
              ) : (
                <div className="w-16 h-16 bg-gray-100 rounded-lg mx-auto mb-2 flex items-center justify-center text-gray-400 text-xl font-bold">
                  {brand.name[0]}
                </div>
              )}
              <p className="text-xs font-medium text-gray-700 line-clamp-1">{brand.name}</p>
              <p className="text-[10px] text-gray-400">{brand.product_count} products</p>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-400 py-20">No brands found</p>
      )}
    </div>
  );
}
