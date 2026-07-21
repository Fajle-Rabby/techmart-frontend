import Link from 'next/link';

export const metadata = { title: 'রিটার্ন পলিসি - TechMart' };

export default function ReturnsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary">হোম</Link><span className="mx-2">/</span>
        <span className="text-gray-800">রিটার্ন পলিসি</span>
      </nav>
      <div className="bg-white rounded-2xl border p-8 prose prose-sm max-w-none text-gray-600">
        <h1 className="text-2xl font-bold text-gray-900">রিটার্ন ও রিফান্ড পলিসি</h1>

        <h2 className="text-base font-bold text-gray-800 !mt-6">রিটার্ন শর্তাবলী</h2>
        <p>পণ্য গ্রহণের ৭ দিনের মধ্যে রিটার্ন করতে পারবেন যদি:</p>
        <p>• পণ্যে ম্যানুফ্যাকচারিং ত্রুটি থাকে</p>
        <p>• ভুল পণ্য ডেলিভারি হয়ে থাকে</p>
        <p>• পণ্য ভাঙা বা ক্ষতিগ্রস্ত অবস্থায় আসে</p>

        <h2 className="text-base font-bold text-gray-800 !mt-6">যেসব ক্ষেত্রে রিটার্ন প্রযোজ্য নয়</h2>
        <p>• ব্যবহৃত বা ক্ষতিগ্রস্ত পণ্য</p>
        <p>• প্যাকেজিং ছাড়া পণ্য</p>
        <p>• "মন পরিবর্তন" জনিত কারণে</p>
        <p>• সফটওয়্যার বা ডিজিটাল পণ্য</p>

        <h2 className="text-base font-bold text-gray-800 !mt-6">রিফান্ড প্রক্রিয়া</h2>
        <p>রিটার্ন অনুমোদিত হলে ৩-৭ কার্যদিবসের মধ্যে আপনার পেমেন্ট মেথডে রিফান্ড করা হবে। বিকাশ/নগদে পেমেন্ট করলে একই নম্বরে রিফান্ড পাবেন।</p>

        <h2 className="text-base font-bold text-gray-800 !mt-6">রিটার্ন করতে</h2>
        <p>আমাদের সাথে <Link href="/contact" className="text-primary hover:underline">যোগাযোগ করুন</Link> অথবা কল করুন: <strong>+880 1XXX-XXXXXX</strong></p>
      </div>
    </div>
  );
}
