import { getProduct } from '../../lib/api';
import ProductDetail from '../../components/ProductDetail';

export async function generateMetadata({ searchParams }) {
  try {
    const data = await getProduct(searchParams?.id);
    if (data.success) {
      return {
        title: `${data.data.name} - TechMart`,
        description: data.data.meta_description || `${data.data.name} কিনুন সেরা দামে`,
      };
    }
  } catch (e) {}
  return { title: 'Product - TechMart' };
}

export default async function ProductPage({ searchParams }) {
  const productId = searchParams?.id;

  if (!productId) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-400 text-lg">Product not found</p>
        <a href="/products" className="text-primary hover:underline mt-4 inline-block">Browse All Products →</a>
      </div>
    );
  }

  let product = null;
  try {
    const data = await getProduct(productId);
    if (data.success) product = data.data;
  } catch (error) {
    console.error('Product fetch error:', error);
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p className="text-gray-400 text-lg">Product not found</p>
        <a href="/products" className="text-primary hover:underline mt-4 inline-block">Browse All Products →</a>
      </div>
    );
  }

  return <ProductDetail product={product} />;
}
