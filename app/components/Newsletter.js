'use client';

import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) { setDone(true); setEmail(''); }
  };

  if (done) {
    return (
      <div className="text-center">
        <p className="text-green-400 text-sm font-medium">✓ সাবস্ক্রাইব হয়েছে! ধন্যবাদ।</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex max-w-sm">
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
        placeholder="আপনার ইমেইল দিন" required
        className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-l-lg text-sm text-white placeholder-gray-400 focus:outline-none focus:border-primary" />
      <button type="submit" className="px-4 py-2 bg-primary text-white rounded-r-lg text-sm font-medium hover:bg-orange-600 transition">
        সাবস্ক্রাইব
      </button>
    </form>
  );
}
