'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../components/AuthProvider';

export default function RegisterPage() {
  const { register, isLoggedIn } = useAuth();
  const router = useRouter();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    firstname: '', lastname: '', email: '',
    telephone: '', password: '', confirm: '',
  });

  if (isLoggedIn) { router.push('/account'); return null; }

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.firstname || !form.email || !form.telephone || !form.password) {
      setError('সব প্রয়োজনীয় তথ্য পূরণ করুন'); return;
    }
    if (form.password.length < 4) { setError('পাসওয়ার্ড কমপক্ষে ৪ অক্ষর হতে হবে'); return; }
    if (form.password !== form.confirm) { setError('পাসওয়ার্ড মিলছে না'); return; }

    setLoading(true);
    const result = await register(form);
    setLoading(false);

    if (result.success) {
      router.push('/account');
    } else {
      setError(result.error || 'রেজিস্ট্রেশন ব্যর্থ');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="bg-white rounded-2xl border p-8">
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">অ্যাকাউন্ট তৈরি করুন</h1>
        <p className="text-sm text-gray-500 text-center mb-8">TechMart এ রেজিস্টার করুন</p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">নাম *</label>
              <input name="firstname" value={form.firstname} onChange={handleChange}
                className="w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:border-primary" placeholder="নাম" />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-1">পদবি</label>
              <input name="lastname" value={form.lastname} onChange={handleChange}
                className="w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:border-primary" placeholder="পদবি" />
            </div>
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">ইমেইল *</label>
            <input name="email" type="email" value={form.email} onChange={handleChange}
              className="w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:border-primary" placeholder="email@example.com" />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">মোবাইল নম্বর *</label>
            <input name="telephone" value={form.telephone} onChange={handleChange}
              className="w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:border-primary" placeholder="01XXXXXXXXX" />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">পাসওয়ার্ড *</label>
            <input name="password" type="password" value={form.password} onChange={handleChange}
              className="w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:border-primary" placeholder="কমপক্ষে ৪ অক্ষর" />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">পাসওয়ার্ড নিশ্চিত করুন *</label>
            <input name="confirm" type="password" value={form.confirm} onChange={handleChange}
              className="w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:border-primary" placeholder="আবার পাসওয়ার্ড দিন" />
          </div>

          <button type="submit" disabled={loading}
            className="w-full py-3 bg-primary text-white rounded-xl font-semibold hover:bg-orange-600 transition text-sm disabled:opacity-50">
            {loading ? '⏳ তৈরি হচ্ছে...' : 'অ্যাকাউন্ট তৈরি করুন'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          আগে থেকেই অ্যাকাউন্ট আছে?{' '}
          <Link href="/login" className="text-primary font-medium hover:underline">লগইন করুন</Link>
        </p>
      </div>
    </div>
  );
}
