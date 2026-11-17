import React, { useState, useMemo } from 'react';
import { 
  SlidersHorizontal, 
  ChevronRight, 
  ChevronDown, 
  Check, 
  X, 
  Star, 
  Heart, 
  ShoppingBag, 
  Eye, 
  ArrowLeft, 
  ArrowRight,
  RotateCcw
} from 'lucide-react';
import { resolveImage } from '../../services/api';

export default function CategoryCatalog({
  products = [],
  activeCategory,
  activeDressStyle,
  onSelectCategory,
  onSelectDressStyle,
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  wishlist = [],
  onNavigateHome
}) {
  // Local filter states
  const [selectedCategory, setSelectedCategory] = useState(activeCategory || '');
  const [selectedDressStyle, setSelectedDressStyle] = useState(activeDressStyle || '');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [priceRange, setPriceRange] = useState(300);
  const [sortBy, setSortBy] = useState('popular');
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const categories = ['All', 'T-shirts', 'Shirts', 'Shorts', 'Hoodie', 'Jeans'];
  const dressStyles = ['All', 'Casual', 'Formal', 'Party', 'Gym'];
  
  const colors = [
    { name: 'Green', hex: '#00C12B' },
    { name: 'Red', hex: '#F50606' },
    { name: 'Yellow', hex: '#F5DD06' },
    { name: 'Orange', hex: '#F57906' },
    { name: 'Cyan', hex: '#06CAF5' },
    { name: 'Blue', hex: '#063AF5' },
    { name: 'Purple', hex: '#7D06F5' },
    { name: 'Pink', hex: '#F506A4' },
    { name: 'White', hex: '#FFFFFF', border: true },
    { name: 'Black', hex: '#000000' }
  ];

  const sizes = [
    'XX-Small',
    'X-Small',
    'Small',
    'Medium',
    'Large',
    'X-Large',
    '2X-Large',
    '3X-Large',
    '4X-Large'
  ];

  const handleResetFilters = () => {
    setSelectedCategory('');
    setSelectedDressStyle('');
    setSelectedColor('');
    setSelectedSize('');
    setPriceRange(300);
    setSortBy('popular');
    setCurrentPage(1);
  };

  // Filtered & Sorted products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (selectedCategory && selectedCategory !== 'All') {
        const catName = typeof product.category === 'object' ? product.category.name : product.category;
        if (catName && !catName.toLowerCase().includes(selectedCategory.toLowerCase())) {
          return false;
        }
      }

      // Dress style filter
      if (selectedDressStyle && selectedDressStyle !== 'All') {
        const styleName = product.dress_style || '';
        if (!styleName.toLowerCase().includes(selectedDressStyle.toLowerCase())) {
          return false;
        }
      }

      // Price filter
      if (product.price > priceRange) {
        return false;
      }

      // Size filter
      if (selectedSize && product.sizes && Array.isArray(product.sizes)) {
        if (!product.sizes.includes(selectedSize)) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
      if (sortBy === 'newest') return (b.id || 0) - (a.id || 0);
      return (b.reviews_count || 0) - (a.reviews_count || 0); // popular
    });
  }, [products, selectedCategory, selectedDressStyle, priceRange, selectedSize, sortBy]);

  // Pagination calculation
  const itemsPerPage = 9;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="w-full bg-white pb-20">
      {/* Breadcrumb (Figma Exact 26:865) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 border-t border-gray-100">
        <nav className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500">
          <button 
            onClick={onNavigateHome}
            className="hover:text-black transition-colors cursor-pointer"
          >
            Home
          </button>
          <ChevronRight size={14} />
          <button 
            onClick={handleResetFilters}
            className="hover:text-black transition-colors cursor-pointer"
          >
            Shop
          </button>
          <ChevronRight size={14} />
          <span className="text-black font-semibold">
            {selectedDressStyle || selectedCategory || 'Casual'}
          </span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ========================================================= */}
          {/* DESKTOP FILTER SIDEBAR (Figma Exact 26:868 Frame 56) */}
          {/* ========================================================= */}
          <aside className="hidden lg:block lg:col-span-3 p-6 rounded-3xl border border-gray-200/80 bg-white space-y-6 sticky top-24">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h3 className="font-extrabold text-lg text-black">Filters</h3>
              <button
                onClick={handleResetFilters}
                className="text-xs text-gray-400 hover:text-black flex items-center gap-1 cursor-pointer"
                title="Reset all filters"
              >
                <RotateCcw size={12} />
                <span>Reset</span>
              </button>
            </div>

            {/* Category Filter List */}
            <div className="space-y-2.5 pb-5 border-b border-gray-100">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat === 'All' ? '' : cat);
                    setCurrentPage(1);
                  }}
                  className={`w-full flex items-center justify-between py-1 text-sm text-left transition-colors cursor-pointer ${
                    (cat === 'All' && !selectedCategory) || selectedCategory === cat
                      ? 'font-bold text-black'
                      : 'text-gray-500 hover:text-black font-normal'
                  }`}
                >
                  <span>{cat}</span>
                  <ChevronRight size={14} className="text-gray-400" />
                </button>
              ))}
            </div>

            {/* Price Slider */}
            <div className="space-y-4 pb-5 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h4 className="font-bold text-sm text-black">Price</h4>
                <span className="font-bold text-xs text-black">Up to ${priceRange}</span>
              </div>
              <input
                type="range"
                min="50"
                max="300"
                step="10"
                value={priceRange}
                onChange={(e) => {
                  setPriceRange(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="w-full accent-black cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-400">
                <span>$50</span>
                <span>$300</span>
              </div>
            </div>

            {/* Colors Swatches */}
            <div className="space-y-3 pb-5 border-b border-gray-100">
              <h4 className="font-bold text-sm text-black">Colors</h4>
              <div className="flex flex-wrap gap-2.5">
                {colors.map((c) => {
                  const isSelected = selectedColor === c.name;
                  return (
                    <button
                      key={c.name}
                      onClick={() => {
                        setSelectedColor(isSelected ? '' : c.name);
                        setCurrentPage(1);
                      }}
                      className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform hover:scale-110 cursor-pointer ${
                        c.border ? 'border border-gray-300' : ''
                      } ${isSelected ? 'ring-2 ring-black ring-offset-2' : ''}`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    >
                      {isSelected && (
                        <Check
                          size={14}
                          className={c.name === 'White' || c.name === 'Yellow' ? 'text-black' : 'text-white'}
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Size Tags */}
            <div className="space-y-3 pb-5 border-b border-gray-100">
              <h4 className="font-bold text-sm text-black">Size</h4>
              <div className="flex flex-wrap gap-2">
                {sizes.map((s) => {
                  const isSelected = selectedSize === s;
                  return (
                    <button
                      key={s}
                      onClick={() => {
                        setSelectedSize(isSelected ? '' : s);
                        setCurrentPage(1);
                      }}
                      className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-black text-white'
                          : 'bg-[#F0F0F0] text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dress Style Accordion */}
            <div className="space-y-2 pb-5 border-b border-gray-100">
              <h4 className="font-bold text-sm text-black mb-3">Dress Style</h4>
              {dressStyles.map((style) => (
                <button
                  key={style}
                  onClick={() => {
                    setSelectedDressStyle(style === 'All' ? '' : style);
                    setCurrentPage(1);
                  }}
                  className={`w-full flex items-center justify-between py-1 text-sm text-left transition-colors cursor-pointer ${
                    (style === 'All' && !selectedDressStyle) || selectedDressStyle === style
                      ? 'font-bold text-black'
                      : 'text-gray-500 hover:text-black font-normal'
                  }`}
                >
                  <span>{style}</span>
                  <ChevronRight size={14} className="text-gray-400" />
                </button>
              ))}
            </div>

            {/* Apply Filter Button */}
            <button
              onClick={() => setCurrentPage(1)}
              className="w-full py-3.5 rounded-full bg-black text-white font-bold text-xs uppercase hover:bg-neutral-800 active:scale-98 transition-all shadow cursor-pointer"
            >
              Apply Filter
            </button>
          </aside>

          {/* ========================================================= */}
          {/* CATALOG MAIN CONTENT AREA */}
          {/* ========================================================= */}
          <main className="lg:col-span-9 space-y-6">
            {/* Header: Title, Total Count, Mobile Filter Trigger, Sort */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="font-display font-black text-2xl sm:text-3xl text-black uppercase">
                  {selectedDressStyle || selectedCategory || 'Casual'}
                </h1>
                <p className="text-xs text-gray-500 mt-1">
                  Showing {(currentPage - 1) * itemsPerPage + 1}-
                  {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of{' '}
                  {filteredProducts.length} Products
                </p>
              </div>

              <div className="flex items-center space-x-3">
                {/* Mobile Filter Button */}
                <button
                  onClick={() => setMobileFilterOpen(true)}
                  className="lg:hidden p-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-black flex items-center gap-1.5 text-xs font-bold cursor-pointer"
                >
                  <SlidersHorizontal size={16} />
                  <span>Filters</span>
                </button>

                {/* Sort By Dropdown */}
                <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500">
                  <span className="whitespace-nowrap">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-transparent font-bold text-black focus:outline-none cursor-pointer py-1 pr-2"
                  >
                    <option value="popular">Most Popular</option>
                    <option value="newest">Newest Arrivals</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            {paginatedProducts.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
                {paginatedProducts.map((product) => {
                  const isWishlisted = wishlist.includes(product.id);
                  const discountPercent = product.discount_percent || 
                    (product.original_price > product.price 
                      ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
                      : 0);

                  return (
                    <div
                      key={product.id}
                      className="group flex flex-col justify-between bg-white rounded-2xl"
                    >
                      {/* Image Frame */}
                      <div className="relative w-full aspect-square bg-[#F0EEED] rounded-2xl overflow-hidden flex items-center justify-center p-3">
                        <img
                          src={resolveImage(product.image)}
                          alt={product.name}
                          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-108 cursor-pointer"
                          onClick={() => onSelectProduct && onSelectProduct(product)}
                        />

                        {/* Wishlist Heart */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onToggleWishlist) onToggleWishlist(product.id);
                          }}
                          className={`absolute top-2.5 right-2.5 p-2 rounded-full transition-all cursor-pointer ${
                            isWishlisted 
                              ? 'bg-rose-50 text-rose-500 shadow-sm' 
                              : 'bg-white/80 text-gray-500 hover:text-black hover:bg-white'
                          }`}
                        >
                          <Heart size={15} fill={isWishlisted ? 'currentColor' : 'none'} />
                        </button>

                        {/* Hover Overlay Controls */}
                        <div className="absolute inset-x-2.5 bottom-2.5 opacity-0 group-hover:opacity-100 transition-all duration-200 flex gap-2">
                          <button
                            onClick={() => onSelectProduct && onSelectProduct(product)}
                            className="flex-1 py-2 px-2.5 rounded-full bg-white text-black font-semibold text-xs flex items-center justify-center gap-1 shadow hover:bg-black hover:text-white transition-colors cursor-pointer"
                          >
                            <Eye size={13} />
                            <span>View</span>
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onAddToCart) onAddToCart(product);
                            }}
                            className="p-2 rounded-full bg-black text-white hover:bg-neutral-800 transition-colors shadow cursor-pointer"
                            title="Quick Add"
                          >
                            <ShoppingBag size={14} />
                          </button>
                        </div>
                      </div>

                      {/* Product Info */}
                      <div className="mt-3 space-y-1">
                        <h3
                          onClick={() => onSelectProduct && onSelectProduct(product)}
                          className="font-bold text-sm text-black truncate cursor-pointer hover:underline"
                          title={product.name}
                        >
                          {product.name}
                        </h3>

                        {/* Star Rating */}
                        <div className="flex items-center space-x-1.5">
                          <div className="flex items-center text-[#FFC633]">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star
                                key={s}
                                size={13}
                                className={s <= Math.round(product.rating || 4.5) ? 'fill-[#FFC633]' : 'text-gray-300'}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-600 font-semibold">
                            {product.rating || 4.5}/<span className="text-gray-400">5</span>
                          </span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center space-x-2 pt-0.5">
                          <span className="font-display font-black text-base sm:text-lg text-black">
                            ${product.price}
                          </span>
                          {product.original_price && product.original_price > product.price && (
                            <span className="text-xs sm:text-sm font-bold text-gray-400 line-through">
                              ${product.original_price}
                            </span>
                          )}
                          {discountPercent > 0 && (
                            <span className="text-[10px] font-bold text-[#FF3333] bg-[#FF3333]/10 px-1.5 py-0.5 rounded-full">
                              -{discountPercent}%
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="p-16 text-center rounded-3xl border border-dashed border-gray-300 space-y-4">
                <p className="text-gray-500 font-medium">
                  No products found matching your current filter criteria.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-2.5 rounded-full bg-black text-white text-xs font-bold hover:bg-neutral-800 cursor-pointer"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            {/* Pagination (Figma Exact 26:899) */}
            {totalPages > 1 && (
              <div className="pt-8 border-t border-gray-100 flex items-center justify-between">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-bold text-black flex items-center gap-1.5 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  <ArrowLeft size={14} />
                  <span>Previous</span>
                </button>

                <div className="flex items-center space-x-1 sm:space-x-2">
                  {[...Array(totalPages)].map((_, i) => {
                    const pageNum = i + 1;
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-9 h-9 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                          currentPage === pageNum
                            ? 'bg-black text-white shadow-sm'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-bold text-black flex items-center gap-1.5 hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  <span>Next</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* ========================================================= */}
      {/* MOBILE FILTER DRAWER */}
      {/* ========================================================= */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="relative ml-auto w-full max-w-sm bg-white h-full overflow-y-auto p-6 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h3 className="font-extrabold text-lg text-black">Filters</h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 rounded-full text-gray-400 hover:text-black cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Mobile Categories */}
            <div className="space-y-2">
              <h4 className="font-bold text-xs uppercase text-gray-400">Categories</h4>
              <div className="space-y-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat === 'All' ? '' : cat);
                      setCurrentPage(1);
                    }}
                    className={`w-full py-1.5 text-sm text-left ${
                      selectedCategory === cat || (cat === 'All' && !selectedCategory)
                        ? 'font-bold text-black'
                        : 'text-gray-500'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Price */}
            <div className="space-y-3 pt-3 border-t border-gray-100">
              <div className="flex justify-between text-sm font-bold">
                <span>Price</span>
                <span>Up to ${priceRange}</span>
              </div>
              <input
                type="range"
                min="50"
                max="300"
                step="10"
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-black"
              />
            </div>

            {/* Mobile Sizes */}
            <div className="space-y-3 pt-3 border-t border-gray-100">
              <h4 className="font-bold text-sm">Size</h4>
              <div className="flex flex-wrap gap-2">
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(selectedSize === s ? '' : s)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                      selectedSize === s
                        ? 'bg-black text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setMobileFilterOpen(false)}
              className="w-full py-3.5 rounded-full bg-black text-white font-bold text-xs uppercase"
            >
              Apply Filter
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
