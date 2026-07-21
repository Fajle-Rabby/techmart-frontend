'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../components/AuthProvider';

export default function LoginPage() {
  const { login, isLoggedIn } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (isLoggedIn) {
    router.push('/account');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) { setError('ইমেইল ও পাসওয়ার্ড দিন'); return; }

    setLoading(true);
    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      router.push('/account');
    } else {
      setError(result.error || 'লগইন ব্যর্থ');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white rounded-2xl border p-8">
        <h1 className="text-2xl font-bold text-gray-900 text-center mb-2">লগইন করুন</h1>
        <p className="text-sm text-gray-500 text-center mb-8">আপনার TechMart অ্যাকাউন্টে প্রবেশ করুন</p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl mb-6 text-sm">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">ইমেইল</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:border-primary"
              placeholder="email@example.com" />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">পাসওয়ার্ড</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:border-primary"
              placeholder="আপনার পাসওয়ার্ড" />
          </div>

          <button type="submit" disabled={loading}
            className="w-full py-3 bg-primary text-white rounded-xl font-semibold hover:bg-orange-600 transition text-sm disabled:opacity-50">
            {loading ? '⏳ লগইন হচ্ছে...' : 'লগইন করুন'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          অ্যাকাউন্ট নেই?{' '}
          <Link href="/register" className="text-primary font-medium hover:underline">রেজিস্টার করুন</Link>
        </p>
      </div>
    </div>
  );
}
