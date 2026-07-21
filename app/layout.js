import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { CartProvider } from './components/CartProvider';
import { AuthProvider } from './components/AuthProvider';
import JsonLd from './components/JsonLd';
import { generateOrgSchema } from './lib/seo';

export const metadata = {
  metadataBase: new URL('https://www.techmart.com.bd'),
  title: {
    default: 'TechMart - বাংলাদেশের বিশ্বস্ত অনলাইন টেক শপ',
    template: '%s | TechMart',
  },
  description: 'মোবাইল, ল্যাপটপ, গ্যাজেট ও ইলেকট্রনিক্স পণ্য কিনুন সেরা দামে।',
  keywords: 'mobile, laptop, gadget, electronics, bangladesh, techmart',
  openGraph: {
    type: 'website',
    locale: 'bn_BD',
    url: 'https://www.techmart.com.bd',
    siteName: 'TechMart',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  const orgSchema = generateOrgSchema();

  return (
    <html lang="bn">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <JsonLd data={orgSchema} />
      </head>
      <body className="bg-gray-50 text-gray-900">
        <AuthProvider>
          <CartProvider>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
