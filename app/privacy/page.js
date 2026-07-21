import Link from 'next/link';

export const metadata = { title: 'প্রাইভেসি পলিসি - TechMart' };

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href="/" className="hover:text-primary">হোম</Link><span className="mx-2">/</span>
        <span className="text-gray-800">প্রাইভেসি পলিসি</span>
      </nav>
      <div className="bg-white rounded-2xl border p-8 prose prose-sm max-w-none text-gray-600">
        <h1 className="text-2xl font-bold text-gray-900">প্রাইভেসি পলিসি</h1>
        <p className="text-xs text-gray-400">সর্বশেষ আপডেট: জুলাই ২০২৬</p>

        <h2 className="text-base font-bold text-gray-800 !mt-6">আমরা কী তথ্য সংগ্রহ করি</h2>
        <p>অর্ডার প্রসেস করতে আমরা আপনার নাম, ইমেইল, ফোন নম্বর, শিপিং ঠিকানা এবং পেমেন্ট তথ্য সংগ্রহ করি।</p>

        <h2 className="text-base font-bold text-gray-800 !mt-6">তথ্য ব্যবহার</h2>
        <p>আপনার তথ্য শুধুমাত্র অর্ডার প্রসেসিং, ডেলিভারি, কাস্টমার সাপোর্ট এবং প্রোমোশনাল আপডেট পাঠাতে ব্যবহার করা হয়।</p>

        <h2 className="text-base font-bold text-gray-800 !mt-6">তথ্য সুরক্ষা</h2>
        <p>আপনার ব্যক্তিগত তথ্য SSL এনক্রিপশন দিয়ে সুরক্ষিত। আমরা কোনো তৃতীয় পক্ষের কাছে আপনার তথ্য বিক্রি বা শেয়ার করি না।</p>

        <h2 className="text-base font-bold text-gray-800 !mt-6">কুকিজ</h2>
        <p>আমাদের ওয়েবসাইট কুকিজ ব্যবহার করে আপনার ব্রাউজিং অভিজ্ঞতা উন্নত করতে এবং কার্ট সেশন সংরক্ষণ করতে।</p>

        <h2 className="text-base font-bold text-gray-800 !mt-6">যোগাযোগ</h2>
        <p>প্রাইভেসি সংক্রান্ত যেকোনো প্রশ্নের জন্য <Link href="/contact" className="text-primary hover:underline">যোগাযোগ করুন</Link>।</p>
      </div>
    </div>
  );
}
