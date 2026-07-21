/**
 * robots.txt — সার্চ ইঞ্জিন ক্রলারদের জন্য নির্দেশনা
 */
export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/cart', '/checkout', '/account', '/api/'],
      },
    ],
    sitemap: 'https://www.techmart.com.bd/sitemap.xml',
  };
}
