import Link from 'next/link';

export const metadata = {
  title: 'আমাদের সম্পর্কে - TechMart',
  description: 'TechMart বাংলাদেশের বিশ্বস্ত অনলাইন টেক শপ।',
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary">হোম</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-800">আমাদের সম্পর্কে</span>
      </nav>

      <div className="bg-white rounded-2xl border p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">আমাদের সম্পর্কে</h1>

        <div className="prose prose-sm max-w-none text-gray-600 space-y-4">
          <p>
            <strong className="text-gray-800">TechMart</strong> বাংলাদেশের অন্যতম বিশ্বস্ত অনলাইন টেক শপ। আমরা ২০২০ সাল থেকে গ্রাহকদের কাছে 
            সেরা মানের মোবাইল ফোন, ল্যাপটপ, গ্যাজেট ও ইলেকট্রনিক্স পণ্য পৌঁছে দিচ্ছি সেরা দামে।
          </p>

          <h2 className="text-lg font-bold text-gray-800 !mt-8">আমাদের মিশন</h2>
          <p>
            বাংলাদেশের প্রতিটি মানুষের কাছে সাশ্রয়ী মূল্যে অরিজিনাল টেক পণ্য পৌঁছে দেওয়া এবং 
            সেরা কাস্টমার সার্ভিস প্রদান করা।
          </p>

          <h2 className="text-lg font-bold text-gray-800 !mt-8">কেন TechMart?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 !mt-4">
            {[
              { icon: '🛡️', title: '১০০% অরিজিনাল', desc: 'সকল পণ্য সরাসরি অথোরাইজড ডিস্ট্রিবিউটর থেকে সংগ্রহ করা' },
              { icon: '🚚', title: 'দ্রুত ডেলিভারি', desc: 'ঢাকায় ২৪ ঘণ্টা, সারাদেশে ২-৫ দিনের মধ্যে' },
              { icon: '💰', title: 'সেরা দাম', desc: 'বাজারের সবচেয়ে কম দামে পণ্য পাবেন' },
              { icon: '🔄', title: 'ইজি রিটার্ন', desc: '৭ দিনের মধ্যে রিটার্ন ও রিফান্ড সুবিধা' },
            ].map((item, i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-4">
                <span className="text-2xl">{item.icon}</span>
                <h3 className="font-semibold text-gray-800 mt-2 text-sm">{item.title}</h3>
                <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>

          <h2 className="text-lg font-bold text-gray-800 !mt-8">যোগাযোগ</h2>
          <p>
            যেকোনো প্রশ্ন বা সাহায্যের জন্য আমাদের <Link href="/contact" className="text-primary hover:underline">যোগাযোগ পেজে</Link> মেসেজ 
            পাঠান অথবা কল করুন: <strong>+880 1XXX-XXXXXX</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
