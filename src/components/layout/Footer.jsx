import React, { useState } from 'react';
import { Mail, ArrowRight } from 'lucide-react';

export default function Footer({ onSubscribe }) {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      if (onSubscribe) onSubscribe(newsletterEmail);
    }
  };

  return (
    <footer className="w-full bg-[#f0f0f0] pt-24 pb-12 relative mt-36">
      {/* Floating Newsletter Card (Exact Figma 22:673 Group 5) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 absolute -top-28 inset-x-0 z-20">
        <div className="bg-black text-white rounded-[32px] p-7 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="max-w-md">
            <h3 className="font-display font-extrabold text-2xl sm:text-4xl leading-tight tracking-tight uppercase">
              STAY UPTO DATE ABOUT OUR LATEST OFFERS
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
            <div className="relative w-full sm:w-80">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                required
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full bg-white text-black text-xs sm:text-sm rounded-full py-3.5 pl-11 pr-4 focus:outline-none focus:ring-2 focus:ring-gray-300 placeholder-gray-400"
              />
            </div>
            <button
              type="submit"
              className="py-3.5 px-6 rounded-full bg-white text-black font-extrabold text-xs sm:text-sm hover:bg-gray-200 transition-all active:scale-95 whitespace-nowrap shadow cursor-pointer"
            >
              {subscribed ? 'Subscribed!' : 'Subscribe to Newsletter'}
            </button>
          </form>
        </div>
      </div>

      {/* Main Footer Links Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-12 border-b border-gray-200">
          {/* Brand Bio */}
          <div className="col-span-2 space-y-4">
            <span className="font-display font-black text-3xl tracking-tighter text-black block">
              SHOP.CO
            </span>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-sm">
              We have clothes that suits your style and which you're proud to wear. From women to men, curated with timeless elegance and modern craftsmanship.
            </p>
            {/* Social Links */}
            <div className="flex items-center space-x-3 pt-2">
              <a href="#" className="w-9 h-9 rounded-full bg-white border border-gray-300 flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors shadow-xs">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-black flex items-center justify-center text-white hover:bg-gray-800 transition-colors shadow-xs">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="w-9 h-9 rounded-full bg-white border border-gray-300 flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors shadow-xs">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://github.com/lxlnimalxl" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white border border-gray-300 flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors shadow-xs">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Company */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-widest text-black">Company</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-600">
              <li><a href="#" className="hover:text-black">About</a></li>
              <li><a href="#" className="hover:text-black">Features</a></li>
              <li><a href="#" className="hover:text-black">Works</a></li>
              <li><a href="#" className="hover:text-black">Career</a></li>
            </ul>
          </div>

          {/* Help */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-widest text-black">Help</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-600">
              <li><a href="#" className="hover:text-black">Customer Support</a></li>
              <li><a href="#" className="hover:text-black">Delivery Details</a></li>
              <li><a href="#" className="hover:text-black">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-black">Privacy Policy</a></li>
            </ul>
          </div>

          {/* FAQ */}
          <div className="space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-widest text-black">FAQ</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-600">
              <li><a href="#" className="hover:text-black">Account</a></li>
              <li><a href="#" className="hover:text-black">Manage Deliveries</a></li>
              <li><a href="#" className="hover:text-black">Orders</a></li>
              <li><a href="#" className="hover:text-black">Payments</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright and Payment Methods Strip */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>Shop.co © 2000-2026, All Rights Reserved</p>

          {/* Payment Badges */}
          <div className="flex items-center space-x-2">
            <div className="px-2.5 py-1 bg-white rounded border border-gray-200 text-[10px] font-black tracking-wider text-blue-900 shadow-2xs">
              VISA
            </div>
            <div className="px-2.5 py-1 bg-white rounded border border-gray-200 text-[10px] font-black tracking-wider text-red-600 shadow-2xs">
              MC
            </div>
            <div className="px-2.5 py-1 bg-white rounded border border-gray-200 text-[10px] font-black tracking-wider text-blue-600 shadow-2xs">
              PayPal
            </div>
            <div className="px-2.5 py-1 bg-white rounded border border-gray-200 text-[10px] font-black tracking-wider text-black shadow-2xs">
              Pay
            </div>
            <div className="px-2.5 py-1 bg-white rounded border border-gray-200 text-[10px] font-black tracking-wider text-emerald-600 shadow-2xs">
              GPay
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
