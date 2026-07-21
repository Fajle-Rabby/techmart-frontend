'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '../components/CartProvider';

export default function WishlistPage() {
  const [items, setItems] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    try {
      const saved = localStorage.getItem('techmart_wishlist');
      if (saved) setItems(JSON.parse(saved));
    } catch (e) {}
  }, []);

  const removeItem = (id) => {
    const updated = items.filter(item => item.id !== id);
    setItems(updated);
    localStorage.setItem('techmart_wishlist', JSON.stringify(updated));
  };

  const moveToCart = async (item) => {
    await addToCart({
      id: item.id, name: item.name, model: item.model || '',
      image: item.image, price_raw: item.price_raw,
      special_raw: item.special_raw, in_stock: true, qty: 1,
    });
    removeItem(item.id);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary">হোম</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">উইশলিস্ট</span>
      </nav>

      <h1 className="text-2xl font-bold text-gray-900 mb-6">💖 উইশলিস্ট</h1>

      {items.length === 0 ? (
        <div className="bg-white rounded-xl border p-16 text-center">
          <p className="text-5xl mb-4">💖</p>
          <h2 className="text-xl font-bold text-gray-800 mb-2">উইশলিস্ট খালি</h2>
          <p className="text-gray-500 mb-6">পছন্দের পণ্য উইশলিস্টে যোগ করুন</p>
          <Link href="/products" className="inline-block px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-orange-600 transition">
            শপিং করুন
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map(item => (
            <div key={item.id} className="bg-white rounded-xl border p-4 flex gap-4 items-center">
              <div className="w-16 h-16 shrink-0 bg-gray-50 rounded-lg overflow-hidden">
                {item.image ? (
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain p-1" />
                ) : <div className="flex items-center justify-center h-full text-2xl text-gray-300">📷</div>}
              </div>
              <div className="flex-1 min-w-0">
                <Link href={`/products/${item.slug || 'product'}?id=${item.id}`} className="text-sm font-medium text-gray-800 hover:text-primary line-clamp-1">
                  {item.name}
                </Link>
                <p className="text-primary font-bold text-sm mt-1">
                  {item.special_raw > 0 ? `${item.special_raw.toLocaleString()} BDT` : `${item.price_raw.toLocaleString()} BDT`}
                </p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => moveToCart(item)}
                  className="px-3 py-2 bg-primary text-white rounded-lg text-xs font-medium hover:bg-orange-600 transition">
                  🛒 কার্টে
                </button>
                <button onClick={() => removeItem(item.id)}
                  className="px-3 py-2 text-red-400 hover:text-red-600 text-lg">✕</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
