import Link from 'next/link';

export const metadata = { title: 'ডেলিভারি তথ্য - TechMart' };

export default function ShippingPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary">হোম</Link><span className="mx-2">/</span>
        <span className="text-gray-800">ডেলিভারি তথ্য</span>
      </nav>
      <div className="bg-white rounded-2xl border p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">ডেলিভারি তথ্য</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          {[
            { area: 'ঢাকার ভেতরে', time: '১-২ কার্যদিবস', cost: '৬০৳' },
            { area: 'ঢাকার বাইরে', time: '৩-৫ কার্যদিবস', cost: '১২০৳' },
          ].map((d, i) => (
            <div key={i} className="bg-gray-50 rounded-xl p-5 text-center">
              <h3 className="font-bold text-gray-800 mb-2">{d.area}</h3>
              <p className="text-2xl font-bold text-primary mb-1">{d.cost}</p>
              <p className="text-xs text-gray-500">সময়: {d.time}</p>
            </div>
          ))}
        </div>

        <div className="bg-green-50 rounded-xl p-5 text-center mb-8">
          <p className="text-green-700 font-semibold">🎉 ৫,০০০৳+ অর্ডারে সারাদেশে ফ্রি ডেলিভারি!</p>
        </div>

        <div className="prose prose-sm max-w-none text-gray-600 space-y-4">
          <h2 className="text-base font-bold text-gray-800">ডেলিভারি প্রক্রিয়া</h2>
          <p>অর্ডার কনফার্ম হওয়ার পর আমাদের টিম পণ্যটি প্যাক করে কুরিয়ার সার্ভিসের মাধ্যমে আপনার ঠিকানায় পাঠিয়ে দেয়। ডেলিভারি ম্যান আপনাকে আগে ফোনে জানাবে।</p>

          <h2 className="text-base font-bold text-gray-800">ক্যাশ অন ডেলিভারি</h2>
          <p>পণ্য হাতে পেয়ে চেক করে তারপর পেমেন্ট করুন। ক্যাশ অন ডেলিভারি সারাদেশে পাওয়া যায়।</p>
        </div>
      </div>
    </div>
  );
}
