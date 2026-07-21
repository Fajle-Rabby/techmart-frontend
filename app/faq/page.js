'use client';

import { useState } from 'react';
import Link from 'next/link';

const faqs = [
  { q: 'অর্ডার করতে কি অ্যাকাউন্ট লাগবে?', a: 'না, আপনি গেস্ট হিসেবেও অর্ডার করতে পারবেন। তবে অ্যাকাউন্ট থাকলে অর্ডার ট্র্যাক করা সহজ হবে।' },
  { q: 'ডেলিভারি চার্জ কত?', a: 'ঢাকার ভেতরে ৬০৳ এবং ঢাকার বাইরে ১২০৳। ৫,০০০৳+ অর্ডারে সারাদেশে ফ্রি ডেলিভারি।' },
  { q: 'ডেলিভারি কত দিনে পাবো?', a: 'ঢাকায় ১-২ কার্যদিবস এবং ঢাকার বাইরে ৩-৫ কার্যদিবসের মধ্যে ডেলিভারি করা হয়।' },
  { q: 'পেমেন্ট মেথড কি কি?', a: 'ক্যাশ অন ডেলিভারি, বিকাশ, নগদ এবং ব্যাংক ট্রান্সফার — এই চারটি মেথডে পেমেন্ট করা যায়।' },
  { q: 'পণ্য কি অরিজিনাল?', a: 'হ্যাঁ, আমাদের সকল পণ্য ১০০% অরিজিনাল এবং অথোরাইজড ডিস্ট্রিবিউটর থেকে সংগ্রহ করা।' },
  { q: 'রিটার্ন পলিসি কি?', a: 'পণ্যে কোনো ত্রুটি থাকলে ৭ দিনের মধ্যে রিটার্ন করতে পারবেন। বিস্তারিত জানতে রিটার্ন পলিসি পেজ দেখুন।' },
  { q: 'ওয়ারেন্টি পাবো?', a: 'ব্র্যান্ড ভেদে পণ্যের সাথে অফিসিয়াল ওয়ারেন্টি কার্ড দেওয়া হয়।' },
  { q: 'অর্ডার ক্যান্সেল করতে পারবো?', a: 'ডেলিভারির আগে যেকোনো সময় অর্ডার ক্যান্সেল করতে পারবেন। আমাদের সাথে যোগাযোগ করুন।' },
];

export default function FaqPage() {
  const [open, setOpen] = useState(null);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary">হোম</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">সাধারণ প্রশ্ন</span>
      </nav>

      <h1 className="text-2xl font-bold text-gray-900 mb-8">সাধারণ জিজ্ঞাসা (FAQ)</h1>

      <div className="space-y-3">
        {faqs.map((faq, i) => (
          <div key={i} className="bg-white rounded-xl border overflow-hidden">
            <button onClick={() => setOpen(open === i ? null : i)}
              className="w-full px-5 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition">
              <span className="text-sm font-medium text-gray-800 pr-4">{faq.q}</span>
              <span className="text-primary text-xl shrink-0">{open === i ? '−' : '+'}</span>
            </button>
            {open === i && (
              <div className="px-5 pb-4 text-sm text-gray-600 border-t pt-3">{faq.a}</div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-primary/5 rounded-xl p-6 mt-8 text-center">
        <p className="text-sm text-gray-600 mb-3">আপনার প্রশ্নের উত্তর পাননি?</p>
        <Link href="/contact" className="inline-block px-6 py-2.5 bg-primary text-white rounded-xl text-sm font-medium hover:bg-orange-600 transition">
          আমাদের জিজ্ঞাসা করুন
        </Link>
      </div>
    </div>
  );
}
