# TechMart — Next.js Frontend (ধাপ ২)

## 🚀 সেটআপ

### ১. Node.js ইনস্টল করুন
Node.js 18+ ইনস্টল থাকতে হবে: https://nodejs.org

### ২. প্রজেক্ট সেটআপ
```bash
# ফোল্ডারে যান
cd techmart-frontend

# ডিপেন্ডেন্সি ইনস্টল
npm install

# ডেভেলপমেন্ট সার্ভার চালু
npm run dev
```

### ৩. ব্রাউজারে দেখুন
http://localhost:3000

## 📁 ফোল্ডার স্ট্রাকচার

```
techmart-frontend/
├── app/
│   ├── layout.js              ← মূল লেআউট (হেডার + ফুটার)
│   ├── page.js                ← হোমপেজ
│   ├── globals.css            ← গ্লোবাল CSS
│   ├── components/
│   │   ├── Header.js          ← হেডার (নেভিগেশন + সার্চ)
│   │   ├── Footer.js          ← ফুটার
│   │   └── ProductCard.js     ← প্রোডাক্ট কার্ড
│   ├── lib/
│   │   └── api.js             ← OpenCart API হেল্পার
│   └── products/
│       ├── page.js            ← প্রোডাক্ট লিস্ট পেজ
│       └── [slug]/
│           └── page.js        ← প্রোডাক্ট ডিটেইলস পেজ
├── .env.local                 ← API URL কনফিগ
├── next.config.js             ← Next.js কনফিগ
├── tailwind.config.js         ← Tailwind CSS কনফিগ
└── package.json               ← ডিপেন্ডেন্সি
```

## ⚙️ কনফিগারেশন

`.env.local` ফাইলে আপনার API URL সেট করুন:
```
NEXT_PUBLIC_API_URL=https://www.techmart.com.bd
```

## ➡️ পরবর্তী ধাপ

- **ধাপ ৩**: কার্ট ও চেকআউট সিস্টেম
- **ধাপ ৪**: ইউজার লগইন/রেজিস্ট্রেশন (JWT Auth)
- **ধাপ ৫**: SEO অপটিমাইজেশন
- **ধাপ ৬**: ডিপ্লয়মেন্ট
