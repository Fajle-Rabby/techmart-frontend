/**
 * TechMart SEO হেল্পার
 * প্রতিটি পেজের জন্য মেটা ট্যাগ, Open Graph, Schema তৈরি করে
 */

const SITE_NAME = 'TechMart';
const SITE_URL = 'https://www.techmart.com.bd';

/**
 * প্রোডাক্ট পেজের জন্য SEO মেটাডেটা
 */
export function generateProductMeta(product) {
  const title = product.meta_title || `${product.name} - ${SITE_NAME}`;
  const description = product.meta_description || 
    `${product.name} কিনুন মাত্র ${product.special || product.price} তে। ${product.manufacturer || ''} এর অরিজিনাল পণ্য। সারাদেশে ডেলিভারি।`;

  return {
    title,
    description: description.substring(0, 160),
    keywords: product.meta_keyword || `${product.name}, ${product.manufacturer || ''}, buy online bangladesh`,
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${SITE_URL}/products/${product.slug}?id=${product.id}`,
      images: product.image ? [{ url: product.image, width: 500, height: 500, alt: product.name }] : [],
      siteName: SITE_NAME,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: product.image ? [product.image] : [],
    },
    alternates: {
      canonical: `${SITE_URL}/products/${product.slug}?id=${product.id}`,
    },
  };
}

/**
 * ক্যাটাগরি পেজের জন্য SEO মেটাডেটা
 */
export function generateCategoryMeta(category) {
  const title = `${category.name} - ${SITE_NAME}`;
  const description = `${category.name} ক্যাটাগরিতে ${category.product_count}+ পণ্য পাওয়া যাচ্ছে। সেরা দামে কিনুন ${SITE_NAME} থেকে।`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
      siteName: SITE_NAME,
    },
  };
}

/**
 * প্রোডাক্টের JSON-LD Schema (Google Rich Results)
 */
export function generateProductSchema(product) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.meta_description || product.name,
    image: product.image || '',
    sku: product.sku || product.model || '',
    brand: {
      '@type': 'Brand',
      name: product.manufacturer || SITE_NAME,
    },
    offers: {
      '@type': 'Offer',
      url: `${SITE_URL}/products/${product.slug}?id=${product.id}`,
      priceCurrency: 'BDT',
      price: product.special_raw && product.special_raw > 0 ? product.special_raw : product.price_raw,
      availability: product.in_stock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: SITE_NAME,
      },
    },
  };

  // রেটিং থাকলে যোগ করি
  if (product.rating > 0 && product.reviews > 0) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviews,
    };
  }

  return schema;
}

/**
 * ব্রেডক্রাম্ব Schema
 */
export function generateBreadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url ? `${SITE_URL}${item.url}` : undefined,
    })),
  };
}

/**
 * Organization Schema (হোমপেজের জন্য)
 */
export function generateOrgSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+880-1XXX-XXXXXX',
      contactType: 'customer service',
      areaServed: 'BD',
      availableLanguage: ['Bengali', 'English'],
    },
    sameAs: [
      'https://facebook.com/techmart',
      // অন্যান্য সোশ্যাল লিংক
    ],
  };
}
