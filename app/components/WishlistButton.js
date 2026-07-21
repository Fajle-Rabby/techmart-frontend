'use client';

import { useState, useEffect } from 'react';

export default function WishlistButton({ product }) {
  const [isWished, setIsWished] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('techmart_wishlist') || '[]');
      setIsWished(saved.some(item => item.id === product.id));
    } catch (e) {}
  }, [product.id]);

  const toggle = () => {
    try {
      let saved = JSON.parse(localStorage.getItem('techmart_wishlist') || '[]');
      if (isWished) {
        saved = saved.filter(item => item.id !== product.id);
      } else {
        saved.push({
          id: product.id,
          name: product.name,
          slug: product.slug,
          image: product.image,
          model: product.model,
          price_raw: product.price_raw,
          special_raw: product.special_raw,
        });
      }
      localStorage.setItem('techmart_wishlist', JSON.stringify(saved));
      setIsWished(!isWished);
    } catch (e) {}
  };

  return (
    <button onClick={toggle} title={isWished ? 'উইশলিস্ট থেকে মুছুন' : 'উইশলিস্টে যোগ করুন'}
      className={`px-4 py-3 border-2 rounded-xl transition text-lg ${
        isWished ? 'border-red-400 text-red-500 bg-red-50' : 'border-gray-200 hover:border-primary hover:text-primary'
      }`}>
      {isWished ? '❤️' : '♡'}
    </button>
  );
}
