import Link from 'next/link';
import ProductCard from './components/ProductCard';
import HeroSlider from './components/HeroSlider';
import { getFeaturedProducts, getCategories } from './lib/api';

export default async function HomePage() {
  let featuredData = { data: [] };
  let categoriesData = { data: [] };

  try {
    [featuredData, categoriesData] = await Promise.all([
      getFeaturedProducts(20),
      getCategories(),
    ]);
  } catch (error) {
    console.error('Homepage error:', error);
  }

  return (
    <>
      <HeroSlider />

      {/* Featured Category */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Featured Category</h2>
          <p className="text-sm text-gray-500 mt-1">Get Your Desired Product from Featured Category!</p>
        </div>
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
          {(categoriesData.data || []).slice(0, 16).map((cat) => (
            <Link key={cat.id} href={`/products?category_id=${cat.id}`}
              className="group flex flex-col items-center gap-2 p-3 bg-white rounded-xl border border-gray-100 hover:border-primary/30 hover:shadow-lg transition-all text-center">
              {cat.image ? (
                <img src={cat.image} alt={cat.name} className="w-10 h-10 object-contain group-hover:scale-110 transition-transform" />
              ) : (
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary text-lg">📦</div>
              )}
              <span className="text-[11px] font-medium text-gray-700 leading-tight line-clamp-2">{cat.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      {featuredData.data?.length > 0 && (
        <section className="bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
              <p className="text-sm text-gray-500 mt-1">Check & Get Your Desired Product!</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {featuredData.data.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/products" className="inline-block px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary-600 transition text-sm">
                View All Products →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* SEO Content */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="prose prose-sm max-w-none text-gray-600">
          <h2 className="text-xl font-bold text-gray-900">Best Tech Shop in Bangladesh: TechMart</h2>
          <p>TechMart is one of the most trusted online tech shops in Bangladesh, offering the latest smartphones, laptops, gadgets, and electronics at the best prices. Whether you are looking for the latest iPhone, Samsung Galaxy, or budget-friendly accessories, TechMart has it all.</p>
          <p>We offer nationwide delivery across all 64 districts of Bangladesh with cash on delivery option. All our products are 100% genuine with official warranty. Shop with confidence at TechMart — your trusted tech partner.</p>
        </div>
      </section>
    </>
  );
}
