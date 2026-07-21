'use client';

import Link from 'next/link';
import { useCart } from '../components/CartProvider';

export default function CartPage() {
  const { cart, loading, updateQuantity, removeItem, clearCart } = useCart();

  if (!cart.items || cart.items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <p className="text-6xl mb-4">🛒</p>
        <h1 className="text-2xl font-bold text-gray-800 mb-3">আপনার কার্ট খালি</h1>
        <p className="text-gray-500 mb-6">পছন্দের পণ্য কার্টে যোগ করুন</p>
        <Link
          href="/products"
          className="inline-block px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-orange-600 transition"
        >
          শপিং শুরু করুন
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          🛒 কার্ট <span className="text-gray-400 text-lg font-normal">({cart.total_qty}টি পণ্য)</span>
        </h1>
        <button
          onClick={clearCart}
          className="text-sm text-red-500 hover:text-red-600 hover:underline"
        >
          কার্ট খালি করুন
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* আইটেম লিস্ট */}
        <div className="flex-1 space-y-3">
          {cart.items.map((item) => (
            <div
              key={item.cart_key}
              className="bg-white rounded-xl border p-4 flex gap-4 items-start"
            >
              {/* ছবি */}
              <div className="w-20 h-20 shrink-0 bg-gray-50 rounded-lg overflow-hidden">
                {item.image ? (
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain p-1" />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-300 text-2xl">📷</div>
                )}
              </div>

              {/* তথ্য */}
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-1">{item.name}</h3>

                {item.options?.length > 0 && (
                  <p className="text-xs text-gray-400 mb-1">{item.options.join(', ')}</p>
                )}

                <p className="text-primary font-bold text-sm">{item.unit_price}</p>

                {!item.in_stock && (
                  <p className="text-xs text-red-500 mt-1">⚠ স্টকে নেই</p>
                )}

                {/* পরিমাণ ও মুছুন */}
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center border rounded-lg overflow-hidden">
                    <button
                      onClick={() => updateQuantity(item.cart_key, item.quantity - 1)}
                      className="px-2.5 py-1 hover:bg-gray-100 text-gray-600 text-sm"
                      disabled={loading}
                    >
                      −
                    </button>
                    <span className="px-3 py-1 text-sm font-medium">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.cart_key, item.quantity + 1)}
                      className="px-2.5 py-1 hover:bg-gray-100 text-gray-600 text-sm"
                      disabled={loading}
                    >
                      +
                    </button>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="font-bold text-gray-800 text-sm">{item.total}</span>
                    <button
                      onClick={() => removeItem(item.cart_key)}
                      className="text-red-400 hover:text-red-600 text-lg"
                      disabled={loading}
                      title="মুছুন"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* সারমারি */}
        <div className="lg:w-80 shrink-0">
          <div className="bg-white rounded-xl border p-5 sticky top-28">
            <h3 className="font-bold text-gray-800 mb-4">অর্ডার সারমারি</h3>

            <div className="space-y-2 text-sm border-b pb-4 mb-4">
              <div className="flex justify-between text-gray-600">
                <span>সাব-টোটাল ({cart.total_qty}টি)</span>
                <span>{cart.subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>শিপিং</span>
                <span className="text-green-600">চেকআউটে</span>
              </div>
            </div>

            <div className="flex justify-between font-bold text-lg mb-6">
              <span>মোট</span>
              <span className="text-primary">{cart.subtotal}</span>
            </div>

            <Link
              href="/checkout"
              className="block w-full py-3 bg-primary text-white rounded-xl font-semibold hover:bg-orange-600 transition text-center text-sm"
            >
              চেকআউট করুন →
            </Link>

            <Link
              href="/products"
              className="block text-center text-sm text-gray-500 hover:text-primary mt-3"
            >
              ← শপিং চালিয়ে যান
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
