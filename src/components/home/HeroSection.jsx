import React from 'react';
import { ArrowRight } from 'lucide-react';
import { resolveImage } from '../../services/api';

export default function HeroSection({ onShopNow }) {
  return (
    <section className="w-full bg-[#f2f0f1] relative overflow-hidden pt-8 md:pt-14 pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Heading, Subtitle, CTA, Stats */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 z-10 py-4 md:py-10">
            <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-black leading-[1.08] tracking-tight uppercase">
              FIND CLOTHES THAT MATCHES YOUR STYLE
            </h1>

            <p className="text-sm sm:text-base text-gray-600 max-w-xl leading-relaxed">
              Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
            </p>

            <div>
              <button
                onClick={onShopNow}
                className="w-full sm:w-auto px-12 py-4 rounded-full bg-black text-white font-extrabold text-sm tracking-wide hover:bg-neutral-800 active:scale-95 transition-all shadow-xl cursor-pointer"
              >
                Shop Now
              </button>
            </div>

            {/* Statistics Matrix (Figma Exact 22:349 Frame 57) */}
            <div className="pt-4 flex flex-wrap items-center justify-between sm:justify-start sm:space-x-8 gap-y-4">
              <div className="text-left">
                <span className="font-display font-black text-2xl sm:text-4xl text-black block">200+</span>
                <span className="text-xs text-gray-500 font-medium">International Brands</span>
              </div>
              <div className="h-10 w-px bg-gray-300 hidden sm:block" />
              <div className="text-left">
                <span className="font-display font-black text-2xl sm:text-4xl text-black block">2,000+</span>
                <span className="text-xs text-gray-500 font-medium">High-Quality Products</span>
              </div>
              <div className="h-10 w-px bg-gray-300 hidden sm:block" />
              <div className="text-left">
                <span className="font-display font-black text-2xl sm:text-4xl text-black block">30,000+</span>
                <span className="text-xs text-gray-500 font-medium">Happy Customers</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Fashion Models Image with Sparkle Stars */}
          <div className="lg:col-span-5 relative flex items-end justify-center">
            {/* Big Sparkle Star (Top Right) */}
            <img
              src={resolveImage('sparkle-star.png')}
              alt="Sparkle Star"
              className="absolute top-4 right-2 sm:right-6 w-16 sm:w-24 h-auto z-20 pointer-events-none animate-pulse"
            />

            {/* Small Sparkle Star (Middle Left) */}
            <img
              src={resolveImage('sparkle-star.png')}
              alt="Sparkle Star"
              className="absolute top-1/2 -left-2 sm:left-4 w-10 sm:w-14 h-auto z-20 pointer-events-none opacity-80"
            />

            {/* Models Image */}
            <div className="relative w-full max-w-md lg:max-w-none">
              <img
                src={resolveImage('hero-fashion-models.png')}
                alt="Fashion Models - Find clothes that matches your style"
                className="w-full h-auto object-contain object-bottom drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
