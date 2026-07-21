'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '../components/CartProvider';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://www.techmart.com.bd';

const ZONES = [
  { id: 785, name: 'ঢাকা' },
  { id: 786, name: 'চট্টগ্রাম' },
  { id: 789, name: 'রাজশাহী' },
  { id: 787, name: 'খুলনা' },
  { id: 791, name: 'সিলেট' },
  { id: 784, name: 'বরিশাল' },
  { id: 790, name: 'রংপুর' },
  { id: 788, name: 'ময়মনসিংহ' },
];

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    email: '',
    telephone: '',
    address_1: '',
    address_2: '',
    city: '',
    postcode: '',
    zone_id: '785',
    shipping_code: 'flat.flat',
    shipping_cost: 80,
    payment_code: 'cod',
    payment_method: 'ক্যাশ অন ডেলিভারি',
    comment: '',
  });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const placeOrder = async () => {
    setError('');
    if (!form.firstname || !form.telephone || !form.address_1 || !form.city) {
      setError('সব প্রয়োজনীয় তথ্য পূরণ করুন');
      return;
    }
    if (!cart.items || cart.items.length === 0) {
      setError('কার্ট খালি');
      return;
    }

    setLoading(true);
    try {
      const url = new URL(`${API_BASE}/index.php`);
      url.searchParams.set('route', 'api/custom/checkout');
      url.searchParams.set('action', 'place_order');

      const res = await fetch(url.toString(), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          // কার্ট আইটেম সার্ভারে পাঠাচ্ছি
          cart_items: cart.items.map(item => ({
            product_id: item.product_id,
            quantity: item.quantity,
            unit_price: item.unit_price_raw,
          })),
          cart_subtotal: cart.subtotal_raw,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setOrderId(data.order_id);
        setStep(3);
        await clearCart();
      } else {
        setError(data.error || 'অর্ডার প্লেস করতে সমস্যা হয়েছে');
      }
    } catch (err) {
      setError('সার্ভারে সমস্যা হয়েছে, আবার চেষ্টা করুন');
    } finally {
      setLoading(false);
    }
  };

  // কার্ট খালি
  if ((!cart.items || cart.items.length === 0) && step !== 3) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <p className="text-5xl mb-4">🛒</p>
        <h1 className="text-xl font-bold text-gray-800 mb-3">কার্ট খালি</h1>
        <Link href="/products" className="text-primary hover:underline">শপিং করুন →</Link>
      </div>
    );
  }

  // অর্ডার সফল
  if (step === 3) {
    return (
      <div className="max-w-lg mx-auto px-4 py-20 text-center">
        <div className="bg-white rounded-2xl border p-8">
          <p className="text-6xl mb-4">✅</p>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">অর্ডার সফল!</h1>
          <p className="text-gray-500 mb-2">আপনার অর্ডার নম্বর:</p>
          <p className="text-3xl font-bold text-primary mb-6">#{orderId}</p>
          <p className="text-sm text-gray-500 mb-6">আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব। ধন্যবাদ!</p>
          <Link href="/products"
            className="inline-block px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-orange-600 transition">
            আরও শপিং করুন
          </Link>
        </div>
      </div>
    );
  }

  const grandTotal = (cart.subtotal_raw || 0) + form.shipping_cost;

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      {/* স্টেপ ইন্ডিকেটর */}
      <div className="flex items-center justify-center gap-4 mb-8">
        {['তথ্য দিন', 'পেমেন্ট ও অর্ডার'].map((label, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className={`w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold ${
              step > i + 1 ? 'bg-green-500 text-white' :
              step === i + 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
            }`}>{step > i + 1 ? '✓' : i + 1}</span>
            <span className={`text-sm ${step === i + 1 ? 'font-semibold text-gray-800' : 'text-gray-400'}`}>{label}</span>
            {i < 1 && <span className="text-gray-300 mx-2">→</span>}
          </div>
        ))}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm">{error}</div>
      )}

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          {step === 1 && (
            <div className="bg-white rounded-xl border p-6">
              <h2 className="font-bold text-gray-800 text-lg mb-5">ডেলিভারি তথ্য</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">নাম *</label>
                  <input name="firstname" value={form.firstname} onChange={handleChange}
                    className="w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:border-primary" placeholder="আপনার নাম" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">পদবি</label>
                  <input name="lastname" value={form.lastname} onChange={handleChange}
                    className="w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:border-primary" placeholder="পদবি" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">মোবাইল নম্বর *</label>
                  <input name="telephone" value={form.telephone} onChange={handleChange}
                    className="w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:border-primary" placeholder="01XXXXXXXXX" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">ইমেইল</label>
                  <input name="email" value={form.email} onChange={handleChange} type="email"
                    className="w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:border-primary" placeholder="email@example.com" />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-sm text-gray-600 mb-1">ঠিকানা *</label>
                  <input name="address_1" value={form.address_1} onChange={handleChange}
                    className="w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:border-primary" placeholder="বাসা/ফ্ল্যাট নম্বর, রোড, এলাকা" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">শহর *</label>
                  <input name="city" value={form.city} onChange={handleChange}
                    className="w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:border-primary" placeholder="শহর" />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">বিভাগ *</label>
                  <select name="zone_id" value={form.zone_id} onChange={handleChange}
                    className="w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:border-primary bg-white">
                    {ZONES.map((z) => (<option key={z.id} value={z.id}>{z.name}</option>))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">পোস্ট কোড</label>
                  <input name="postcode" value={form.postcode} onChange={handleChange}
                    className="w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:border-primary" placeholder="1200" />
                </div>
              </div>

              <h3 className="font-semibold text-gray-800 mt-6 mb-3">ডেলিভারি মেথড</h3>
              <div className="space-y-2">
                {[
                  { code: 'flat.flat', label: 'সারাদেশে ডেলিভারি', cost: 80 },
                  { code: 'free.free', label: 'ফ্রি ডেলিভারি (৫,০০০৳+)', cost: 0 },
                ].map((s) => (
                  <label key={s.code} className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition ${
                    form.shipping_code === s.code ? 'border-primary bg-orange-50' : 'hover:border-gray-300'
                  }`}>
                    <div className="flex items-center gap-3">
                      <input type="radio" name="shipping" checked={form.shipping_code === s.code}
                        onChange={() => setForm(prev => ({ ...prev, shipping_code: s.code, shipping_cost: s.cost }))} className="accent-primary" />
                      <span className="text-sm">{s.label}</span>
                    </div>
                    <span className="text-sm font-semibold">{s.cost > 0 ? `${s.cost}৳` : 'ফ্রি'}</span>
                  </label>
                ))}
              </div>

              <button onClick={() => {
                if (!form.firstname || !form.telephone || !form.address_1 || !form.city) {
                  setError('সব প্রয়োজনীয় তথ্য পূরণ করুন'); return;
                }
                setError(''); setStep(2);
              }} className="w-full mt-6 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-orange-600 transition text-sm">
                পরবর্তী ধাপ →
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="bg-white rounded-xl border p-6">
              <h2 className="font-bold text-gray-800 text-lg mb-5">পেমেন্ট মেথড</h2>
              <div className="space-y-2 mb-6">
                {[
                  { code: 'cod', label: '💵 ক্যাশ অন ডেলিভারি' },
                  { code: 'bkash', label: '📱 বিকাশ' },
                  { code: 'nagad', label: '📱 নগদ' },
                  { code: 'bank_transfer', label: '🏦 ব্যাংক ট্রান্সফার' },
                ].map((p) => (
                  <label key={p.code} className={`flex items-center gap-3 p-3 border rounded-lg cursor-pointer transition ${
                    form.payment_code === p.code ? 'border-primary bg-orange-50' : 'hover:border-gray-300'
                  }`}>
                    <input type="radio" name="payment" checked={form.payment_code === p.code}
                      onChange={() => setForm(prev => ({ ...prev, payment_code: p.code, payment_method: p.label.replace(/[^\u0980-\u09FF\s\w]/g, '').trim() }))}
                      className="accent-primary" />
                    <span className="text-sm">{p.label}</span>
                  </label>
                ))}
              </div>

              <div className="mb-6">
                <label className="block text-sm text-gray-600 mb-1">মন্তব্য (ঐচ্ছিক)</label>
                <textarea name="comment" value={form.comment} onChange={handleChange} rows={3}
                  className="w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:border-primary resize-none"
                  placeholder="বিশেষ কোনো নির্দেশনা..." />
              </div>

              <div className="flex gap-3">
                <button onClick={() => setStep(1)}
                  className="px-6 py-3 border rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition">← পেছনে</button>
                <button onClick={placeOrder} disabled={loading}
                  className="flex-1 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition text-sm disabled:opacity-50">
                  {loading ? '⏳ প্রসেসিং...' : '✓ অর্ডার কনফার্ম করুন'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* সারমারি */}
        <div className="lg:w-80 shrink-0">
          <div className="bg-white rounded-xl border p-5 sticky top-28">
            <h3 className="font-bold text-gray-800 mb-4">আপনার অর্ডার</h3>
            <div className="space-y-3 border-b pb-4 mb-4 max-h-60 overflow-y-auto">
              {cart.items?.map((item) => (
                <div key={item.cart_key} className="flex gap-3">
                  <div className="w-12 h-12 shrink-0 bg-gray-50 rounded-lg overflow-hidden">
                    {item.image && <img src={item.image} alt="" className="w-full h-full object-contain" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-gray-700 line-clamp-1">{item.name}</p>
                    <p className="text-xs text-gray-400">{item.quantity}x {item.unit_price}</p>
                  </div>
                  <span className="text-xs font-semibold text-gray-800 shrink-0">{item.total}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2 text-sm border-b pb-4 mb-4">
              <div className="flex justify-between text-gray-600">
                <span>সাব-টোটাল</span><span>{cart.subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>শিপিং</span><span>{form.shipping_cost > 0 ? `${form.shipping_cost}৳` : 'ফ্রি'}</span>
              </div>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>সর্বমোট</span>
              <span className="text-primary">{grandTotal.toLocaleString()} BDT</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
