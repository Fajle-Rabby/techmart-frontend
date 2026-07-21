'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://www.techmart.com.bd';

export default function ComparePage() {
  const [ids, setIds] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('techmart_compare') || '[]');
    setIds(saved);
  }, []);

  useEffect(() => {
    if (ids.length === 0) { setLoading(false); return; }
    Promise.all(ids.map(id =>
      fetch(`${API_BASE}/index.php?route=api/custom/products&id=${id}`).then(r => r.json())
    )).then(results => {
      setProducts(results.filter(r => r.success).map(r => r.data));
    }).catch(() => {}).finally(() => setLoading(false));
  }, [ids]);

  const removeItem = (id) => {
    const updated = ids.filter(i => i !== id);
    setIds(updated);
    setProducts(products.filter(p => p.id !== id));
    localStorage.setItem('techmart_compare', JSON.stringify(updated));
  };

  const clearAll = () => {
    setIds([]); setProducts([]);
    localStorage.removeItem('techmart_compare');
  };

  if (loading) return <div className="max-w-7xl mx-auto px-4 py-20 text-center text-gray-400">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">🔄 Compare Products</h1>
        {products.length > 0 && (
          <button onClick={clearAll} className="text-sm text-red-500 hover:underline">Clear All</button>
        )}
      </div>

      {products.length === 0 ? (
        <div className="bg-white rounded-xl border p-16 text-center">
          <p className="text-5xl mb-4">🔄</p>
          <p className="text-xl font-bold text-gray-800 mb-2">No products to compare</p>
          <p className="text-gray-500 mb-6">Add products to compare from product pages</p>
          <Link href="/products" className="inline-block px-6 py-3 bg-primary text-white rounded-xl font-medium">Browse Products</Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-white border rounded-xl overflow-hidden text-sm">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-3 text-left text-gray-500 w-32">Product</th>
                {products.map(p => (
                  <th key={p.id} className="px-4 py-3 text-center min-w-[200px]">
                    <button onClick={() => removeItem(p.id)} className="text-red-400 text-xs float-right">✕</button>
                    <Link href={`/products/${p.slug}?id=${p.id}`}>
                      {p.image && <img src={p.image} alt={p.name} className="w-24 h-24 object-contain mx-auto mb-2" />}
                      <p className="text-xs font-medium text-gray-800 hover:text-primary line-clamp-2">{p.name}</p>
                    </Link>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr className="border-b bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-700">Price</td>
                {products.map(p => (
                  <td key={p.id} className="px-4 py-3 text-center font-bold text-primary">
                    {(p.special_raw || p.price_raw)?.toLocaleString()}৳
                  </td>
                ))}
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-medium text-gray-700">Brand</td>
                {products.map(p => <td key={p.id} className="px-4 py-3 text-center">{p.manufacturer || '-'}</td>)}
              </tr>
              <tr className="border-b bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-700">Model</td>
                {products.map(p => <td key={p.id} className="px-4 py-3 text-center">{p.model || '-'}</td>)}
              </tr>
              <tr className="border-b">
                <td className="px-4 py-3 font-medium text-gray-700">Status</td>
                {products.map(p => (
                  <td key={p.id} className="px-4 py-3 text-center">
                    <span className={p.in_stock ? 'text-green-600' : 'text-red-500'}>{p.in_stock ? 'In Stock' : 'Out of Stock'}</span>
                  </td>
                ))}
              </tr>
              <tr className="border-b bg-gray-50">
                <td className="px-4 py-3 font-medium text-gray-700">Rating</td>
                {products.map(p => (
                  <td key={p.id} className="px-4 py-3 text-center">
                    <span className="text-yellow-400">{'★'.repeat(Math.round(p.rating || 0))}</span> {p.rating || 0}/5
                  </td>
                ))}
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-gray-700">Action</td>
                {products.map(p => (
                  <td key={p.id} className="px-4 py-3 text-center">
                    <Link href={`/products/${p.slug}?id=${p.id}`}
                      className="inline-block px-4 py-2 bg-primary text-white rounded-lg text-xs font-medium hover:bg-primary-600 transition">
                      Buy Now
                    </Link>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
