'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AddToCartButton from './AddToCartButton';
import WishlistButton from './WishlistButton';
import { parseAttributeText } from '../lib/parseAttributes';

export default function ProductDetail({ product }) {
  const [activeTab, setActiveTab] = useState('specification');
  const [mainImage, setMainImage] = useState(product.image);

  const hasDiscount = product.special && product.special_raw > 0;
  const allImages = [product.image, ...(product.images || [])].filter(Boolean);

  const tabs = [
    { key: 'specification', label: 'Specification' },
    { key: 'description', label: 'Description' },
    { key: 'reviews', label: `Reviews (${product.reviews || 0})` },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <nav className="flex items-center gap-1.5 text-xs text-gray-500 mb-4">
        <Link href="/" className="hover:text-primary">🏠</Link><span>/</span>
        <Link href="/products" className="hover:text-primary">Products</Link><span>/</span>
        <span className="text-gray-800 font-medium line-clamp-1">{product.name}</span>
      </nav>

      <div className="flex items-center justify-between mb-4 text-xs text-gray-500">
        <div className="flex items-center gap-3">
          <span>Share:</span>
          <button className="hover:text-primary">💬</button>
          <button className="hover:text-primary">📱</button>
          <button className="hover:text-primary">🔗</button>
        </div>
        <button className="hover:text-primary">🔖 Save</button>
      </div>

      <div className="bg-white rounded-xl border p-6 md:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* ছবি */}
          <div>
            <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden mb-4 border">
              {mainImage ? (
                <Image src={mainImage} alt={product.name} fill className="object-contain p-6" priority sizes="(max-width:768px) 100vw, 50vw" />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-300 text-6xl">📷</div>
              )}
            </div>
            {allImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {allImages.map((img, i) => (
                  <button key={i} onClick={() => setMainImage(img)}
                    className={`w-16 h-16 shrink-0 border-2 rounded-lg overflow-hidden bg-gray-50 transition ${mainImage === img ? 'border-primary' : 'border-gray-200'}`}>
                    <img src={img} alt="" className="w-full h-full object-contain p-1" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* তথ্য */}
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 leading-tight">{product.name}</h1>

            <div className="flex flex-wrap gap-2 mb-4">
              {hasDiscount ? (
                <span className="px-3 py-1 bg-gray-100 rounded text-sm">
                  Price: <strong className="text-primary">{product.special_raw?.toLocaleString()}৳</strong>{' '}
                  <span className="line-through text-gray-400 text-xs">{product.price_raw?.toLocaleString()}৳</span>
                </span>
              ) : (
                <span className="px-3 py-1 bg-gray-100 rounded text-sm">Price: <strong>{product.price_raw?.toLocaleString()}৳</strong></span>
              )}
              <span className="px-3 py-1 bg-gray-100 rounded text-sm">Regular: <strong>{product.price_raw?.toLocaleString()}৳</strong></span>
              <span className={`px-3 py-1 rounded text-sm ${product.in_stock ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-600'}`}>
                Status: <strong>{product.in_stock ? 'In Stock' : 'Out of Stock'}</strong>
              </span>
              {product.model && <span className="px-3 py-1 bg-gray-100 rounded text-sm">Model: <strong>{product.model}</strong></span>}
            </div>

            {product.manufacturer && (
              <div className="mb-4">
                <span className="text-sm text-gray-500">Brand: </span>
                <span className="px-2 py-0.5 bg-gray-100 border rounded text-sm font-medium">{product.manufacturer}</span>
              </div>
            )}

            {product.attributes?.length > 0 && (
              <div className="mb-5">
                <h3 className="text-sm font-bold text-gray-800 mb-2">Key Features</h3>
                <ul className="space-y-1">
                  {product.attributes.slice(0, 6).map((attr, i) => {
                    const rows = parseAttributeText(attr.text);
                    const preview = rows.slice(0, 1).map(r => r.label ? `${r.label}: ${r.value}` : r.value).join('');
                    return (
                      <li key={i} className="text-xs text-gray-600 pl-3 relative before:content-[''] before:absolute before:left-0 before:top-1.5 before:w-1.5 before:h-1.5 before:bg-gray-300 before:rounded-full">
                        {preview || attr.attribute_name}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            <div className="border rounded-lg p-4 mb-5">
              <h3 className="text-sm font-bold text-gray-800 mb-2">Payment Options</h3>
              <div className="border-2 border-primary rounded-lg p-3">
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold text-primary">{(product.special_raw || product.price_raw)?.toLocaleString()}৳</span>
                  {hasDiscount && <span className="text-xs text-gray-400 line-through">{product.price_raw?.toLocaleString()}৳</span>}
                </div>
                <p className="text-[10px] text-gray-500">Cash Discount Price</p>
                <p className="text-[10px] text-gray-400">Online / Cash Payment</p>
              </div>
            </div>

            <div className="flex gap-3">
              <AddToCartButton product={product} />
              <WishlistButton product={product} />
            </div>
          </div>
        </div>
      </div>

      {/* ট্যাবস */}
      <div className="mt-8">
        <div className="flex border-b">
          {tabs.map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)}
              className={`px-5 py-3 text-sm font-semibold border-b-2 transition ${
                activeTab === tab.key ? 'text-white bg-primary border-primary rounded-t-lg' : 'text-gray-600 border-transparent hover:text-primary'
              }`}>
              {tab.label}
            </button>
          ))}
        </div>

        <div className="bg-white border border-t-0 rounded-b-xl p-6">
          {activeTab === 'specification' && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4">Specification</h2>
              {product.attributes?.length > 0 ? (
                <div className="border rounded-xl overflow-hidden divide-y">
                  {product.attributes.map((attr, i) => {
                    const rows = parseAttributeText(attr.text);
                    return (
                      <div key={i}>
                        <div className="bg-gray-100 px-4 py-2 text-xs font-bold text-gray-600 uppercase tracking-wide">{attr.attribute_name}</div>
                        {rows.map((row, j) => (
                          <div key={j} className={`flex text-sm ${j % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                            {row.label && <span className="w-1/3 px-4 py-2.5 font-medium text-gray-700 border-r">{row.label}</span>}
                            <span className={`px-4 py-2.5 text-gray-600 ${row.label ? 'flex-1' : 'w-full'}`}>{row.value}</span>
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              ) : <p className="text-gray-400 text-sm">No specifications available</p>}
            </div>
          )}

          {activeTab === 'description' && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4">Description</h2>
              {product.description ? (
                <div className="prose prose-sm max-w-none text-gray-600" dangerouslySetInnerHTML={{ __html: product.description }} />
              ) : <p className="text-gray-400 text-sm">No description available</p>}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Reviews ({product.reviews || 0})</h2>
                  <p className="text-sm text-gray-500">Get specific details about this product from customers who own it.</p>
                </div>
                <button className="px-4 py-2 border-2 border-primary text-primary rounded-lg text-sm font-semibold hover:bg-primary hover:text-white transition">Write a Review</button>
              </div>
              {product.rating > 0 && (
                <div className="mb-4">
                  <span className="text-yellow-400 text-lg">{'★'.repeat(Math.round(product.rating))}{'☆'.repeat(5 - Math.round(product.rating))}</span>
                  <span className="text-sm text-gray-600 ml-2">{product.rating} out of 5</span>
                </div>
              )}
              {(!product.reviews || product.reviews === 0) && (
                <p className="text-gray-400 text-sm py-8 text-center">No reviews yet. Be the first to review!</p>
              )}
            </div>
          )}
        </div>
      </div>

      {product.related?.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-bold text-gray-900 mb-5">Similar Products</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {product.related.map(rel => (
              <div key={rel.id} className="bg-white rounded-lg border p-3 hover:shadow-md transition">
                <Link href={`/products/${rel.slug}?id=${rel.id}`} className="block">
                  {rel.image && <img src={rel.image} alt={rel.name} className="w-full aspect-square object-contain mb-2" />}
                  <h3 className="text-xs font-medium text-gray-800 line-clamp-2 mb-1">{rel.name}</h3>
                  <p className="text-sm font-bold text-primary">{(rel.special_raw || rel.price_raw)?.toLocaleString()}৳</p>
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
