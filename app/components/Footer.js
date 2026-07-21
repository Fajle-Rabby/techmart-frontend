import Link from 'next/link';
import Newsletter from './Newsletter';

export default function Footer() {
  return (
    <footer className="bg-dark text-gray-400 mt-12">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* ব্র্যান্ড */}
          <div>
            <h3 className="text-xl font-black text-white mb-4">TECH <span className="text-primary">MART</span></h3>
            <div className="flex gap-3 mt-4">
              {['WhatsApp', 'Facebook', 'YouTube', 'Instagram', 'LinkedIn'].map((s, i) => (
                <a key={i} href="#" className="w-9 h-9 border border-gray-700 hover:border-primary hover:text-primary rounded-full flex items-center justify-center text-xs transition">
                  {s[0]}
                </a>
              ))}
            </div>
          </div>

          {/* ABOUT US */}
          <div>
            <h4 className="text-white font-bold text-xs tracking-widest mb-4">ABOUT US</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { href: '/about', label: 'About Tech Mart' },
                { href: '/contact', label: 'Contact' },
                { href: '/privacy', label: 'Privacy Policy' },
              ].map(l => (
                <li key={l.href}><Link href={l.href} className="hover:text-primary transition">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* SERVICE */}
          <div>
            <h4 className="text-white font-bold text-xs tracking-widest mb-4">SERVICE</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { href: '/shipping', label: 'Delivery Information' },
                { href: '/returns', label: 'Return & Refund Policy' },
                { href: '/faq', label: 'FAQ' },
              ].map(l => (
                <li key={l.href}><Link href={l.href} className="hover:text-primary transition">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h4 className="text-white font-bold text-xs tracking-widest mb-4">SUPPORT</h4>
            <div className="bg-dark-800 rounded-xl p-4 mb-3 border border-gray-800">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📞</span>
                <div>
                  <p className="text-[10px] text-gray-500">11 AM - 8 PM</p>
                  <p className="text-white font-bold text-lg">+88 01518-739712</p>
                </div>
              </div>
            </div>
            <div className="bg-dark-800 rounded-xl p-4 border border-gray-800">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📍</span>
                <div>
                  <p className="text-[10px] text-gray-500">Store Locator</p>
                  <p className="text-primary font-bold text-sm">Find Our Stores</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* বটম বার */}
        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs">
          <p>Copyright © {new Date().getFullYear()} Tech Mart | Since 2025 | All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="w-8 h-5 bg-green-700 rounded-sm" title="Bangladesh"></span>
          </div>
        </div>
      </div>
    </footer>
  );
}
