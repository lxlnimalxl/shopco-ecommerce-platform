import React, { useState } from 'react';
import { Star, CheckCircle, ArrowLeft, ArrowRight } from 'lucide-react';

export default function TestimonialsSection({ testimonials = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const defaultTestimonials = [
    {
      id: 1,
      name: 'Sarah M.',
      verified: true,
      rating: 5,
      content:
        '"I\'m blown away by the quality and style of the clothes I received from SHOP.CO. From casual wear to elegant dresses, every piece I\'ve bought has exceeded my expectations."'
    },
    {
      id: 2,
      name: 'Alex K.',
      verified: true,
      rating: 5,
      content:
        '"Finding clothes that align with my personal style used to be a challenge until I discovered SHOP.CO. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions."'
    },
    {
      id: 3,
      name: 'James L.',
      verified: true,
      rating: 5,
      content:
        '"As someone who\'s always on the lookout for unique fashion pieces, I\'m thrilled to have stumbled upon SHOP.CO. The selection of clothes is not only diverse but also on-point with the latest trends."'
    },
    {
      id: 4,
      name: 'Mooen T.',
      verified: true,
      rating: 5,
      content:
        '"As a frequent online shopper, I appreciate the prompt delivery and exceptional customer support from SHOP.CO. The sizing guide is spot-on, and the fabric feels ultra-premium."'
    }
  ];

  const items = testimonials.length > 0 ? testimonials : defaultTestimonials;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-14 sm:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: Title & Navigation Controls */}
        <div className="flex items-end justify-between mb-8 sm:mb-12">
          <h2 className="font-display font-black text-2xl sm:text-4xl lg:text-5xl text-black tracking-tight uppercase">
            OUR HAPPY CUSTOMERS
          </h2>

          <div className="flex items-center space-x-3">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full border border-gray-200 hover:bg-black hover:text-white hover:border-black transition-colors cursor-pointer"
              aria-label="Previous review"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              onClick={handleNext}
              className="p-3 rounded-full border border-gray-200 hover:bg-black hover:text-white hover:border-black transition-colors cursor-pointer"
              aria-label="Next review"
            >
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.slice(0, 3).map((item, idx) => (
            <div
              key={item.id || idx}
              className="p-7 sm:p-8 rounded-3xl border border-gray-200/80 bg-white space-y-4 hover:shadow-md transition-shadow"
            >
              {/* Star Rating */}
              <div className="flex items-center text-[#FFC633]">
                {[...Array(item.rating || 5)].map((_, i) => (
                  <Star key={i} size={18} className="fill-[#FFC633] text-[#FFC633]" />
                ))}
              </div>

              {/* Author & Verified Badge */}
              <div className="flex items-center space-x-1.5">
                <span className="font-bold text-base sm:text-lg text-black">{item.name}</span>
                {item.verified && (
                  <CheckCircle size={16} className="text-emerald-500 fill-emerald-500 text-white" />
                )}
              </div>

              {/* Review Text */}
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                {item.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
