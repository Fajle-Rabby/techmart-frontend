'use client';

import { useState } from 'react';
import { useCart } from './CartProvider';

export default function AddToCartButton({ product }) {
  const { addToCart, loading } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');

  const handleAdd = async () => {
    const result = await addToCart({
      id: product.id,
      name: product.name,
      model: product.model,
      image: product.image,
      price_raw: product.price_raw,
      special_raw: product.special_raw,
      in_stock: product.in_stock,
      qty: quantity,
    });

    if (result.success) {
      setMessage('✓ কার্টে যোগ হয়েছে!');
      setTimeout(() => setMessage(''), 2000);
    } else {
      setMessage(result.error || 'সমস্যা হয়েছে');
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div>
      <div className="flex gap-3 items-center">
        <div className="flex items-center border rounded-xl overflow-hidden">
          <button onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-3 py-3 hover:bg-gray-100 transition text-gray-600">−</button>
          <span className="px-4 py-3 text-sm font-medium min-w-[40px] text-center">{quantity}</span>
          <button onClick={() => setQuantity(quantity + 1)}
            className="px-3 py-3 hover:bg-gray-100 transition text-gray-600">+</button>
        </div>

        <button onClick={handleAdd} disabled={!product.in_stock || loading}
          className="flex-1 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-orange-600 transition text-sm disabled:opacity-50 disabled:cursor-not-allowed">
          {loading ? '⏳ যোগ হচ্ছে...' : '🛒 কার্টে যোগ করুন'}
        </button>
      </div>

      {message && (
        <p className={`mt-2 text-sm font-medium ${message.includes('✓') ? 'text-green-600' : 'text-red-500'}`}>
          {message}
        </p>
      )}
    </div>
  );
}
