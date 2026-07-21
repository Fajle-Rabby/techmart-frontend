/**
 * সাইটম্যাপ জেনারেটর
 * Google Search Console এ সাবমিট করুন: https://yourdomain.com/sitemap.xml
 */

const SITE_URL = 'https://www.techmart.com.bd';
const API_BASE = 'https://www.techmart.com.bd';

export default async function sitemap() {
  // স্ট্যাটিক পেজ
  const staticPages = [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: 'daily', priority: 1.0 },
    { url: `${SITE_URL}/products`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/categories`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/contact`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ];

  // প্রোডাক্ট পেজ
  let productPages = [];
  try {
    const res = await fetch(`${API_BASE}/index.php?route=api/custom/products&limit=100`);
    const data = await res.json();
    if (data.success && data.data) {
      productPages = data.data.map((product) => ({
        url: `${SITE_URL}/products/${product.slug}?id=${product.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      }));
    }
  } catch (e) {
    console.error('Sitemap product fetch error:', e);
  }

  // ক্যাটাগরি পেজ
  let categoryPages = [];
  try {
    const res = await fetch(`${API_BASE}/index.php?route=api/custom/categories&flat=1`);
    const data = await res.json();
    if (data.success && data.data) {
      categoryPages = data.data.map((cat) => ({
        url: `${SITE_URL}/products?category_id=${cat.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.6,
      }));
    }
  } catch (e) {
    console.error('Sitemap category fetch error:', e);
  }

  return [...staticPages, ...productPages, ...categoryPages];
}
