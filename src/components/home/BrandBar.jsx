import React from 'react';

export default function BrandBar() {
  return (
    <section className="w-full bg-black py-8 sm:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-around gap-6 sm:gap-10 md:gap-14 text-white">
          {/* VERSACE */}
          <span className="font-serif tracking-[0.25em] text-xl sm:text-2xl md:text-3xl font-extrabold uppercase hover:opacity-80 transition-opacity select-none">
            VERSACE
          </span>

          {/* ZARA */}
          <span className="font-serif tracking-widest text-2xl sm:text-3xl md:text-4xl font-black uppercase hover:opacity-80 transition-opacity select-none">
            ZARA
          </span>

          {/* GUCCI */}
          <span className="font-serif tracking-[0.3em] text-xl sm:text-2xl md:text-3xl font-bold uppercase hover:opacity-80 transition-opacity select-none">
            GUCCI
          </span>

          {/* PRADA */}
          <span className="font-serif tracking-[0.2em] text-2xl sm:text-3xl md:text-4xl font-black uppercase hover:opacity-80 transition-opacity select-none">
            PRADA
          </span>

          {/* CALVIN KLEIN */}
          <span className="font-sans tracking-[0.15em] text-lg sm:text-xl md:text-2xl font-light uppercase hover:opacity-80 transition-opacity select-none">
            Calvin Klein
          </span>
        </div>
      </div>
    </section>
  );
}
