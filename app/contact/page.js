'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary">হোম</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">যোগাযোগ</span>
      </nav>

      <h1 className="text-2xl font-bold text-gray-900 mb-8">যোগাযোগ করুন</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* তথ্য */}
        <div className="space-y-4">
          {[
            { icon: '📍', title: 'ঠিকানা', text: 'ঢাকা, বাংলাদেশ' },
            { icon: '📞', title: 'ফোন', text: '+880 1XXX-XXXXXX' },
            { icon: '✉️', title: 'ইমেইল', text: 'info@techmart.com.bd' },
            { icon: '🕐', title: 'কার্যসময়', text: 'সকাল ১০টা - রাত ১০টা (শুক্রবার বন্ধ)' },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-xl border p-5 flex items-start gap-4">
              <span className="text-2xl">{item.icon}</span>
              <div>
                <h3 className="font-semibold text-gray-800 text-sm">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ফর্ম */}
        <div className="lg:col-span-2">
          {sent ? (
            <div className="bg-white rounded-xl border p-10 text-center">
              <p className="text-5xl mb-4">✅</p>
              <h2 className="text-xl font-bold text-gray-800 mb-2">মেসেজ পাঠানো হয়েছে!</h2>
              <p className="text-gray-500">আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।</p>
            </div>
          ) : (
            <div className="bg-white rounded-xl border p-6">
              <h2 className="font-bold text-gray-800 text-lg mb-5">মেসেজ পাঠান</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input name="name" value={form.name} onChange={handleChange} placeholder="আপনার নাম *" required
                    className="w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:border-primary" />
                  <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="ইমেইল *" required
                    className="w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:border-primary" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input name="phone" value={form.phone} onChange={handleChange} placeholder="মোবাইল নম্বর"
                    className="w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:border-primary" />
                  <input name="subject" value={form.subject} onChange={handleChange} placeholder="বিষয়"
                    className="w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:border-primary" />
                </div>
                <textarea name="message" value={form.message} onChange={handleChange} rows={5} placeholder="আপনার মেসেজ লিখুন *" required
                  className="w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:border-primary resize-none" />
                <button type="submit" className="px-8 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-orange-600 transition text-sm">
                  মেসেজ পাঠান
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
