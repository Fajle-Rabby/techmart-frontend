'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from './CartProvider';
import { useAuth } from './AuthProvider';

export default function Header() {
  const [searchQuery, setSearchQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  const { cart } = useCart();
  const { isLoggedIn, customer } = useAuth();

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://www.techmart.com.bd'}/index.php?route=api/custom/categories&flat=1`)
      .then(r => r.json())
      .then(d => { if (d.success) setCategories(d.data || []); })
      .catch(() => {});
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="sticky top-0 z-50">
      {/* মেইন হেডার - সাদা */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-4">
          {/* লোগো */}
          <Link href="/" className="shrink-0">
            <span className="text-xl font-black tracking-tight text-gray-900">TECH <span className="text-primary">MART</span></span>
          </Link>

          {/* সার্চ বার */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl">
            <div className="flex w-full border border-gray-300 rounded-lg overflow-hidden hover:border-primary transition">
              <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for product brands and more"
                className="w-full px-4 py-2.5 text-sm focus:outline-none" />
              <button type="submit" className="px-4 bg-white hover:bg-gray-50 border-l text-gray-500">
                🔍
              </button>
            </div>
          </form>

          {/* রাইট আইকনস */}
          <div className="flex items-center gap-5 shrink-0">
            <Link href="/products?featured=1" className="hidden lg:flex flex-col items-center text-gray-600 hover:text-primary transition">
              <span className="text-lg">🏷️</span>
              <span className="text-[10px] leading-tight">Offers</span>
              <span className="text-[9px] text-gray-400">Latest Offers</span>
            </Link>

            <Link href={isLoggedIn ? '/account' : '/login'} className="hidden sm:flex flex-col items-center text-gray-600 hover:text-primary transition">
              <span className="text-lg">👤</span>
              <span className="text-[10px] leading-tight">Account</span>
              <span className="text-[9px] text-gray-400">{isLoggedIn ? customer?.firstname : 'Register or Login'}</span>
            </Link>

            {/* কার্ট - ফ্লোটিং */}
            <Link href="/cart" className="relative flex flex-col items-center text-gray-600 hover:text-primary transition">
              <span className="text-lg">🛒</span>
              <span className="text-[10px]">Cart</span>
              {cart.total_qty > 0 && (
                <span className="absolute -top-1 -right-2 bg-primary text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {cart.total_qty}
                </span>
              )}
            </Link>

            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-gray-600 text-xl">
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* মোবাইল সার্চ */}
        <form onSubmit={handleSearch} className="md:hidden px-4 pb-3">
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for product brands and more"
              className="w-full px-4 py-2 text-sm focus:outline-none" />
            <button type="submit" className="px-3 text-gray-500">🔍</button>
          </div>
        </form>
      </div>

      {/* ক্যাটাগরি নেভিগেশন বার - ডার্ক */}
      <nav className={`bg-gray-900 text-white ${menuOpen ? 'block' : 'hidden'} md:block`}>
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex flex-col md:flex-row md:items-center overflow-x-auto scrollbar-hide">
            {categories.slice(0, 12).map((cat) => (
              <li key={cat.id} className="shrink-0">
                <Link href={`/products?category_id=${cat.id}`}
                  className="block px-3 py-2.5 text-xs font-medium text-gray-200 hover:text-primary hover:bg-gray-800 transition whitespace-nowrap"
                  onClick={() => setMenuOpen(false)}>
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
