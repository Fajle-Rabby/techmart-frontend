'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const slides = [
  { title: 'সেরা দামে টেক পণ্য', subtitle: 'মোবাইল, ল্যাপটপ, গ্যাজেট — সবকিছু এক জায়গায়', btn: 'SHOP NOW', link: '/products', bg: 'from-indigo-900 via-indigo-800 to-purple-900' },
  { title: 'New Arrivals 2026', subtitle: 'Latest smartphones & gadgets at unbeatable prices', btn: 'EXPLORE', link: '/products?featured=1', bg: 'from-slate-900 via-gray-800 to-slate-900' },
  { title: 'Accessories & Gadgets', subtitle: 'Earbuds, Smartwatch, Chargers & more', btn: 'BROWSE', link: '/categories', bg: 'from-violet-900 via-purple-800 to-fuchsia-900' },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  useEffect(() => { const t = setInterval(() => setCurrent(p => (p + 1) % slides.length), 5000); return () => clearInterval(t); }, []);
  const slide = slides[current];

  return (
    <section className={`bg-gradient-to-r ${slide.bg} transition-all duration-700`}>
      <div className="max-w-7xl mx-auto px-4 py-14 md:py-20 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 text-white">
          <h1 className="text-3xl md:text-5xl font-black leading-tight mb-3">{slide.title}</h1>
          <p className="text-gray-300 text-base md:text-lg mb-6">{slide.subtitle}</p>
          <Link href={slide.link} className="inline-flex items-center gap-2 px-7 py-3 bg-primary text-white rounded-lg font-bold text-sm hover:bg-primary-600 transition shadow-lg shadow-primary/30">
            {slide.btn} →
          </Link>
          <div className="flex gap-2 mt-8">
            {slides.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)} className={`h-1.5 rounded-full transition-all ${i === current ? 'bg-primary w-8' : 'bg-white/30 w-4'}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
