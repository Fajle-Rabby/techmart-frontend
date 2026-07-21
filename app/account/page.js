'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../components/AuthProvider';

export default function AccountPage() {
  const { customer, isLoggedIn, loading: authLoading, logout, getOrders, updateProfile } = useAuth();
  const router = useRouter();
  const [tab, setTab] = useState('orders');
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');

  const [profileForm, setProfileForm] = useState({
    firstname: '', lastname: '', telephone: '',
  });

  useEffect(() => {
    if (!authLoading && !isLoggedIn) {
      router.push('/login');
    }
  }, [authLoading, isLoggedIn, router]);

  useEffect(() => {
    if (customer) {
      setProfileForm({
        firstname: customer.firstname || '',
        lastname: customer.lastname || '',
        telephone: customer.telephone || '',
      });
    }
  }, [customer]);

  useEffect(() => {
    if (isLoggedIn && tab === 'orders') {
      loadOrders();
    }
  }, [isLoggedIn, tab]);

  const loadOrders = async () => {
    setLoadingOrders(true);
    try {
      const data = await getOrders();
      if (data.success) setOrders(data.orders || []);
    } catch (e) {}
    setLoadingOrders(false);
  };

  const handleProfileSave = async () => {
    setSaving(true);
    const result = await updateProfile(profileForm);
    setSaving(false);
    if (result.success) {
      setMessage('প্রোফাইল আপডেট হয়েছে!');
      setEditing(false);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (authLoading || !isLoggedIn) {
    return <div className="max-w-4xl mx-auto px-4 py-20 text-center text-gray-400">লোড হচ্ছে...</div>;
  }

  const statusColor = (status) => {
    const s = (status || '').toLowerCase();
    if (s.includes('complete') || s.includes('delivered')) return 'bg-green-100 text-green-700';
    if (s.includes('processing') || s.includes('shipped')) return 'bg-blue-100 text-blue-700';
    if (s.includes('cancel')) return 'bg-red-100 text-red-700';
    return 'bg-yellow-100 text-yellow-700';
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary">হোম</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">আমার অ্যাকাউন্ট</span>
      </nav>

      {/* হেডার */}
      <div className="bg-white rounded-2xl border p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-primary/10 text-primary rounded-full flex items-center justify-center text-2xl font-bold">
              {customer?.firstname?.charAt(0) || 'U'}
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                {customer?.firstname} {customer?.lastname}
              </h1>
              <p className="text-sm text-gray-500">{customer?.email}</p>
            </div>
          </div>
          <button onClick={handleLogout}
            className="px-4 py-2 text-sm text-red-500 border border-red-200 rounded-lg hover:bg-red-50 transition">
            লগআউট
          </button>
        </div>
      </div>

      {message && (
        <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-xl mb-6 text-sm">{message}</div>
      )}

      {/* ট্যাব */}
      <div className="flex gap-2 mb-6">
        {[
          { key: 'orders', label: '📦 অর্ডার হিস্ট্রি' },
          { key: 'profile', label: '👤 প্রোফাইল' },
        ].map(t => (
          <button key={t.key} onClick={() => setTab(t.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
              tab === t.key ? 'bg-primary text-white' : 'bg-white border text-gray-600 hover:border-primary'
            }`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* অর্ডার ট্যাব */}
      {tab === 'orders' && (
        <div className="bg-white rounded-xl border">
          {loadingOrders ? (
            <div className="p-10 text-center text-gray-400">লোড হচ্ছে...</div>
          ) : orders.length === 0 ? (
            <div className="p-10 text-center">
              <p className="text-4xl mb-3">📦</p>
              <p className="text-gray-500 mb-4">কোনো অর্ডার নেই</p>
              <Link href="/products" className="text-primary hover:underline text-sm">শপিং শুরু করুন →</Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left px-4 py-3 font-medium text-gray-600">অর্ডার #</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">তারিখ</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">পেমেন্ট</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">মোট</th>
                    <th className="text-left px-4 py-3 font-medium text-gray-600">স্ট্যাটাস</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(order => (
                    <tr key={order.order_id} className="border-b last:border-0 hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-primary">#{order.order_id}</td>
                      <td className="px-4 py-3 text-gray-600">{order.date}</td>
                      <td className="px-4 py-3 text-gray-600">{order.payment_method}</td>
                      <td className="px-4 py-3 font-semibold text-gray-800">{order.total}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* প্রোফাইল ট্যাব */}
      {tab === 'profile' && (
        <div className="bg-white rounded-xl border p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-bold text-gray-800 text-lg">ব্যক্তিগত তথ্য</h2>
            {!editing && (
              <button onClick={() => setEditing(true)}
                className="px-4 py-1.5 text-sm text-primary border border-primary rounded-lg hover:bg-primary/5 transition">
                এডিট করুন
              </button>
            )}
          </div>

          {editing ? (
            <div className="space-y-4 max-w-md">
              <div>
                <label className="block text-sm text-gray-600 mb-1">নাম</label>
                <input value={profileForm.firstname}
                  onChange={(e) => setProfileForm(prev => ({ ...prev, firstname: e.target.value }))}
                  className="w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">পদবি</label>
                <input value={profileForm.lastname}
                  onChange={(e) => setProfileForm(prev => ({ ...prev, lastname: e.target.value }))}
                  className="w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">মোবাইল</label>
                <input value={profileForm.telephone}
                  onChange={(e) => setProfileForm(prev => ({ ...prev, telephone: e.target.value }))}
                  className="w-full px-4 py-3 border rounded-xl text-sm focus:outline-none focus:border-primary" />
              </div>
              <div className="flex gap-3">
                <button onClick={handleProfileSave} disabled={saving}
                  className="px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-orange-600 transition disabled:opacity-50">
                  {saving ? 'সেভ হচ্ছে...' : 'সেভ করুন'}
                </button>
                <button onClick={() => setEditing(false)}
                  className="px-6 py-2.5 border rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition">
                  বাতিল
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4 text-sm">
              <div className="flex border-b pb-3">
                <span className="w-32 text-gray-500">নাম</span>
                <span className="text-gray-800 font-medium">{customer?.firstname} {customer?.lastname}</span>
              </div>
              <div className="flex border-b pb-3">
                <span className="w-32 text-gray-500">ইমেইল</span>
                <span className="text-gray-800">{customer?.email}</span>
              </div>
              <div className="flex">
                <span className="w-32 text-gray-500">মোবাইল</span>
                <span className="text-gray-800">{customer?.telephone}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
