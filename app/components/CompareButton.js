'use client';

import { useState, useEffect } from 'react';

export default function CompareButton({ productId }) {
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('techmart_compare') || '[]');
    setAdded(saved.includes(productId));
  }, [productId]);

  const toggle = () => {
    let saved = JSON.parse(localStorage.getItem('techmart_compare') || '[]');
    if (added) {
      saved = saved.filter(id => id !== productId);
    } else {
      if (saved.length >= 4) { alert('Maximum 4 products can be compared'); return; }
      saved.push(productId);
    }
    localStorage.setItem('techmart_compare', JSON.stringify(saved));
    setAdded(!added);
  };

  return (
    <button onClick={toggle}
      className={`px-3 py-2 border rounded-lg text-xs font-medium transition ${
        added ? 'border-primary text-primary bg-primary/5' : 'border-gray-200 text-gray-500 hover:border-primary hover:text-primary'
      }`}>
      {added ? '✓ Added to Compare' : '🔄 Add to Compare'}
    </button>
  );
}
