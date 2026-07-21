'use client';

import { useState, useEffect } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://www.techmart.com.bd';

export default function ReviewSection({ productId, initialRating = 0, initialCount = 0 }) {
  const [reviews, setReviews] = useState([]);
  const [avgRating, setAvgRating] = useState(initialRating);
  const [total, setTotal] = useState(initialCount);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [form, setForm] = useState({ name: '', text: '', rating: 5 });

  useEffect(() => {
    if (!productId) return;
    fetch(`${API_BASE}/index.php?route=api/custom/reviews&action=list&product_id=${productId}`)
      .then(r => r.json())
      .then(d => { if (d.success) { setReviews(d.reviews); setAvgRating(d.avg_rating); setTotal(d.total); } })
      .catch(() => {});
  }, [productId]);

  const submitReview = async () => {
    if (!form.name || form.text.length < 10) { setMessage('Name and review (min 10 chars) required'); return; }
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/index.php?route=api/custom/reviews&action=add`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ product_id: productId, ...form }),
      });
      const data = await res.json();
      setMessage(data.message || data.error);
      if (data.success) { setShowForm(false); setForm({ name: '', text: '', rating: 5 }); }
    } catch (e) { setMessage('Error submitting review'); }
    setLoading(false);
    setTimeout(() => setMessage(''), 4000);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Reviews ({total})</h2>
          {avgRating > 0 && (
            <div className="flex items-center gap-2 mt-1">
              <span className="text-yellow-400 text-lg">{'★'.repeat(Math.round(avgRating))}{'☆'.repeat(5 - Math.round(avgRating))}</span>
              <span className="text-sm text-gray-600">{avgRating} out of 5</span>
            </div>
          )}
        </div>
        <button onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 border-2 border-primary text-primary rounded-lg text-sm font-semibold hover:bg-primary hover:text-white transition">
          Write a Review
        </button>
      </div>

      {message && <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg text-sm mb-4">{message}</div>}

      {showForm && (
        <div className="bg-gray-50 rounded-xl p-5 mb-6 border">
          <h3 className="font-semibold text-gray-800 mb-3 text-sm">Write Your Review</h3>
          <div className="space-y-3">
            <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
              placeholder="Your Name *" className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-primary" />
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Rating:</span>
              {[1,2,3,4,5].map(n => (
                <button key={n} onClick={() => setForm(p => ({ ...p, rating: n }))}
                  className={`text-xl ${n <= form.rating ? 'text-yellow-400' : 'text-gray-300'}`}>★</button>
              ))}
            </div>
            <textarea value={form.text} onChange={e => setForm(p => ({ ...p, text: e.target.value }))}
              placeholder="Your review (min 10 characters) *" rows={4}
              className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-primary resize-none" />
            <button onClick={submitReview} disabled={loading}
              className="px-6 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-600 transition disabled:opacity-50">
              {loading ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>
        </div>
      )}

      {reviews.length > 0 ? (
        <div className="space-y-4">
          {reviews.map(r => (
            <div key={r.id} className="border-b pb-4">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-yellow-400 text-sm">{'★'.repeat(r.rating)}{'☆'.repeat(5 - r.rating)}</span>
              </div>
              <p className="text-sm text-gray-700 mb-1">{r.text}</p>
              <p className="text-xs text-gray-400">By {r.author} on {r.date}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-400 text-sm py-6 text-center">No reviews yet. Be the first to review!</p>
      )}
    </div>
  );
}
