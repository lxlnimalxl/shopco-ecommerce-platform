import React from 'react';
import { resolveImage } from '../../services/api';

export default function BrowseStyleSection({ onSelectStyle }) {
  const styles = [
    {
      id: 'casual',
      name: 'Casual',
      image: '/src/assets/images/style-casual.png',
      span: 'md:col-span-4',
    },
    {
      id: 'formal',
      name: 'Formal',
      image: '/src/assets/images/style-formal.png',
      span: 'md:col-span-8',
    },
    {
      id: 'party',
      name: 'Party',
      image: '/src/assets/images/style-party.png',
      span: 'md:col-span-8',
    },
    {
      id: 'gym',
      name: 'Gym',
      image: '/src/assets/images/style-gym.png',
      span: 'md:col-span-4',
    },
  ];

  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#F0F0F0] rounded-[36px] sm:rounded-[44px] p-6 sm:p-12 lg:p-16">
          {/* Section Heading */}
          <h2 className="font-display font-black text-2xl sm:text-4xl lg:text-5xl text-black text-center tracking-tight uppercase mb-8 sm:mb-14">
            BROWSE BY DRESS STYLE
          </h2>

          {/* Asymmetric 2x2 Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6">
            {styles.map((style) => (
              <div
                key={style.id}
                onClick={() => onSelectStyle && onSelectStyle(style.name)}
                className={`${style.span} relative h-48 sm:h-64 lg:h-72 rounded-3xl overflow-hidden bg-white group cursor-pointer shadow-sm hover:shadow-lg transition-all duration-300`}
              >
                {/* Title */}
                <span className="absolute top-6 left-6 z-10 font-bold text-2xl sm:text-3xl text-black">
                  {style.name}
                </span>

                {/* Cover Image */}
                <img
                  src={resolveImage(style.image)}
                  alt={style.name}
                  className="w-full h-full object-cover object-right group-hover:scale-105 transition-transform duration-500"
                />

                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-transparent pointer-events-none" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
