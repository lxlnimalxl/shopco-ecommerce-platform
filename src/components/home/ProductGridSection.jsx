import React from 'react';
import { Star, Heart, ShoppingBag, Eye } from 'lucide-react';
import { resolveImage } from '../../services/api';

export default function ProductGridSection({
  title,
  products = [],
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  wishlist = [],
  onViewAll
}) {
  return (
    <section className="py-14 sm:py-20 border-b border-gray-100 last:border-b-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl text-black text-center tracking-tight uppercase mb-10 sm:mb-14">
          {title}
        </h2>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {products.map((product) => {
            const isWishlisted = wishlist.includes(product.id);
            const discountPercent = product.discount_percent || 
              (product.original_price > product.price 
                ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
                : 0);

            return (
              <div
                key={product.id}
                className="group flex flex-col justify-between bg-transparent rounded-2xl transition-all duration-300"
              >
                {/* Image Container with Badges & Actions */}
                <div className="relative w-full aspect-square bg-[#F0EEED] rounded-2xl sm:rounded-3xl overflow-hidden flex items-center justify-center p-4">
                  <img
                    src={resolveImage(product.image)}
                    alt={product.name}
                    className="w-full h-full object-contain object-center transition-transform duration-500 group-hover:scale-108 cursor-pointer"
                    onClick={() => onSelectProduct && onSelectProduct(product)}
                  />

                  {/* Wishlist Heart Toggle */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (onToggleWishlist) onToggleWishlist(product.id);
                    }}
                    className={`absolute top-3 right-3 p-2 rounded-full transition-all cursor-pointer ${
                      isWishlisted 
                        ? 'bg-rose-50 text-rose-500 shadow-sm' 
                        : 'bg-white/80 text-gray-500 hover:text-black hover:bg-white'
                    }`}
                    aria-label="Wishlist"
                  >
                    <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
                  </button>

                  {/* Quick View Button on Hover */}
                  <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-all duration-200 flex gap-2">
                    <button
                      onClick={() => onSelectProduct && onSelectProduct(product)}
                      className="flex-1 py-2.5 px-3 rounded-full bg-white text-black font-semibold text-xs flex items-center justify-center gap-1.5 shadow-md hover:bg-black hover:text-white transition-colors cursor-pointer"
                    >
                      <Eye size={14} />
                      <span>Details</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (onAddToCart) onAddToCart(product);
                      }}
                      className="p-2.5 rounded-full bg-black text-white hover:bg-neutral-800 transition-colors shadow-md cursor-pointer"
                      title="Quick Add to Cart"
                    >
                      <ShoppingBag size={14} />
                    </button>
                  </div>
                </div>

                {/* Product Metadata */}
                <div className="mt-4 space-y-1.5 flex-1 flex flex-col justify-between">
                  <h3
                    onClick={() => onSelectProduct && onSelectProduct(product)}
                    className="font-bold text-sm sm:text-base text-black truncate cursor-pointer hover:underline"
                    title={product.name}
                  >
                    {product.name}
                  </h3>

                  {/* Rating Stars (Golden yellow #FFC633) */}
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center text-[#FFC633]">
                      {[1, 2, 3, 4, 5].map((star) => {
                        const filled = star <= Math.floor(product.rating || 4.5);
                        const half = !filled && star === Math.ceil(product.rating || 4.5);
                        return (
                          <Star
                            key={star}
                            size={14}
                            className={`${
                              filled ? 'fill-[#FFC633] text-[#FFC633]' : half ? 'fill-[#FFC633]/50 text-[#FFC633]' : 'text-gray-300'
                            }`}
                          />
                        );
                      })}
                    </div>
                    <span className="text-xs text-gray-600 font-semibold">
                      {product.rating || 4.5}/<span className="text-gray-400">5</span>
                    </span>
                  </div>

                  {/* Price & Discount Pill */}
                  <div className="flex items-center space-x-2.5 pt-1">
                    <span className="font-display font-black text-lg sm:text-xl text-black">
                      ${product.price}
                    </span>
                    {product.original_price && product.original_price > product.price && (
                      <span className="text-sm sm:text-base font-bold text-gray-400 line-through">
                        ${product.original_price}
                      </span>
                    )}
                    {discountPercent > 0 && (
                      <span className="text-[11px] font-bold text-[#FF3333] bg-[#FF3333]/10 px-2 py-0.5 rounded-full">
                        -{discountPercent}%
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Button */}
        {onViewAll && (
          <div className="mt-10 sm:mt-12 text-center">
            <button
              onClick={onViewAll}
              className="w-full sm:w-auto px-16 py-3.5 rounded-full border border-gray-300 text-black font-bold text-sm hover:bg-black hover:text-white hover:border-black active:scale-95 transition-all shadow-sm cursor-pointer"
            >
              View All
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
