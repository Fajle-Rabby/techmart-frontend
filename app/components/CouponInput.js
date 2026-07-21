'use client';

import { useState } from 'react';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://www.techmart.com.bd';

export default function CouponInput({ onApply }) {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [applied, setApplied] = useState(null);

  const verify = async () => {
    if (!code.trim()) return;
    setLoading(true); setMessage('');
    try {
      const res = await fetch(`${API_BASE}/index.php?route=api/custom/coupon`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: code.trim() }),
      });
      const data = await res.json();
      if (data.success) {
        setApplied(data.coupon);
        setMessage(`✓ "${data.coupon.name}" applied! ${data.coupon.type === 'P' ? data.coupon.discount + '%' : data.coupon.discount + '৳'} off`);
        if (onApply) onApply(data.coupon);
      } else {
        setMessage(data.error || 'Invalid coupon');
        setApplied(null);
      }
    } catch (e) { setMessage('Error verifying coupon'); }
    setLoading(false);
  };

  const remove = () => {
    setApplied(null); setCode(''); setMessage('');
    if (onApply) onApply(null);
  };

  return (
    <div>
      {!applied ? (
        <div className="flex gap-2">
          <input value={code} onChange={e => setCode(e.target.value)} placeholder="Coupon Code"
            className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none focus:border-primary" />
          <button onClick={verify} disabled={loading}
            className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-600 transition disabled:opacity-50">
            {loading ? '...' : 'Apply'}
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between bg-green-50 px-3 py-2 rounded-lg">
          <span className="text-sm text-green-700">✓ {applied.code}</span>
          <button onClick={remove} className="text-red-400 text-xs hover:text-red-600">Remove</button>
        </div>
      )}
      {message && <p className={`text-xs mt-1 ${applied ? 'text-green-600' : 'text-red-500'}`}>{message}</p>}
    </div>
  );
}
