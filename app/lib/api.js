const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://www.techmart.com.bd';

async function fetchAPI(route, params = {}) {
  const url = new URL(`${API_BASE}/index.php`);
  url.searchParams.set('route', route);
  Object.entries(params).forEach(([key, value]) => {
    if (value !== null && value !== undefined) url.searchParams.set(key, value);
  });
  const res = await fetch(url.toString(), { next: { revalidate: 60 } });
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

// Products
export async function getProducts({ categoryId = null, search = null, sort = 'p.sort_order', order = 'ASC', page = 1, limit = 20, manufacturerId = null } = {}) {
  return fetchAPI('api/custom/products', { category_id: categoryId, search, sort, order, start: (page - 1) * limit, limit, manufacturer_id: manufacturerId });
}
export async function getProduct(id) { return fetchAPI('api/custom/products', { id }); }
export async function getFeaturedProducts(limit = 10) { return fetchAPI('api/custom/products', { featured: 1, limit }); }

// Categories
export async function getCategories() { return fetchAPI('api/custom/categories'); }
export async function getCategory(id) { return fetchAPI('api/custom/categories', { id }); }

// Search
export async function searchProducts(query, page = 1, limit = 20) { return getProducts({ search: query, page, limit }); }

// Brands
export async function getBrands() { return fetchAPI('api/custom/manufacturers'); }
export async function getBrand(id) { return fetchAPI('api/custom/manufacturers', { id }); }

// Blog
export async function getBlogPosts() { return fetchAPI('api/custom/blog'); }
export async function getBlogPost(id) { return fetchAPI('api/custom/blog', { id }); }
