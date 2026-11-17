import React, { useState } from 'react';
import { 
  ChevronRight, 
  Star, 
  Check, 
  Minus, 
  Plus, 
  ShoppingBag, 
  Heart, 
  CheckCircle, 
  SlidersHorizontal, 
  ChevronDown, 
  X,
  Share2
} from 'lucide-react';
import { resolveImage } from '../../services/api';

export default function ProductDetailPage({
  product,
  onAddToCart,
  onToggleWishlist,
  wishlist = [],
  onSelectProduct,
  relatedProducts = [],
  onNavigateHome,
  onNavigateCatalog
}) {
  // Gallery images (3 angles)
  const galleryImages = [
    resolveImage(product?.image || '/src/assets/images/pdp-detail-1.png'),
    resolveImage('/src/assets/images/pdp-detail-2.png'),
    resolveImage('/src/assets/images/pdp-detail-3.png'),
  ];

  const [activeImage, setActiveImage] = useState(galleryImages[0]);
  const [selectedColor, setSelectedColor] = useState('#4F4631');
  const [selectedSize, setSelectedSize] = useState('Large');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('reviews');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewSort, setReviewSort] = useState('latest');

  // New review form state
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewContent, setNewReviewContent] = useState('');

  // Pre-populated authentic reviews (Figma Exact 1:2)
  const [reviews, setReviews] = useState([
    {
      id: 1,
      author: 'Samantha D.',
      rating: 5,
      verified: true,
      date: 'August 14, 2023',
      content:
        '"I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It\'s become my favorite go-to shirt."'
    },
    {
      id: 2,
      author: 'Alex M.',
      rating: 5,
      verified: true,
      date: 'August 15, 2023',
      content:
        '"The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I\'m quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me."'
    },
    {
      id: 3,
      author: 'Ethan R.',
      rating: 4,
      verified: true,
      date: 'August 16, 2023',
      content:
        '"This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer\'s touch in every aspect of it."'
    },
    {
      id: 4,
      author: 'Olivia P.',
      rating: 5,
      verified: true,
      date: 'August 17, 2023',
      content:
        '"As a UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It\'s evident that the designer poured their creativity into making this t-shirt."'
    },
    {
      id: 5,
      author: 'Liam K.',
      rating: 4,
      verified: true,
      date: 'August 18, 2023',
      content:
        '"This t-shirt is a fusion of comfort and the creativity. The fabric is soft, and the design speaks volumes about the designer\'s skill. It\'s like wearing a piece of art that reflects my passion for both design and fashion."'
    },
    {
      id: 6,
      author: 'Ava H.',
      rating: 5,
      verified: true,
      date: 'August 19, 2023',
      content:
        '"I\'m not just wearing a t-shirt; I\'m wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter."'
    }
  ]);

  if (!product) return null;

  const isWishlisted = wishlist.includes(product.id);
  const discountPercent = product.discount_percent || 
    (product.original_price > product.price 
      ? Math.round(((product.original_price - product.price) / product.original_price) * 100)
      : 0);

  const colors = [
    { name: 'Brown Olive', hex: '#4F4631' },
    { name: 'Forest Green', hex: '#314F4A' },
    { name: 'Dark Slate', hex: '#31344F' },
  ];

  const sizes = product.sizes && product.sizes.length > 0 
    ? product.sizes 
    : ['Small', 'Medium', 'Large', 'X-Large'];

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewContent.trim()) return;

    const newRev = {
      id: Date.now(),
      author: newReviewAuthor,
      rating: newReviewRating,
      verified: true,
      date: 'Just now',
      content: `"${newReviewContent}"`
    };

    setReviews([newRev, ...reviews]);
    setNewReviewAuthor('');
    setNewReviewContent('');
    setShowReviewModal(false);
  };

  const handleAddToCartClick = () => {
    if (onAddToCart) {
      onAddToCart(product, {
        color: selectedColor,
        size: selectedSize,
        quantity: quantity
      });
    }
  };

  return (
    <div className="w-full bg-white pb-24">
      {/* Breadcrumb (Figma Exact 1:2) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 border-t border-gray-100">
        <nav className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500">
          <button onClick={onNavigateHome} className="hover:text-black cursor-pointer">
            Home
          </button>
          <ChevronRight size={14} />
          <button onClick={onNavigateCatalog} className="hover:text-black cursor-pointer">
            Shop
          </button>
          <ChevronRight size={14} />
          <button onClick={onNavigateCatalog} className="hover:text-black cursor-pointer">
            Men
          </button>
          <ChevronRight size={14} />
          <span className="text-black font-semibold truncate max-w-xs">{product.name}</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        {/* ========================================================= */}
        {/* PRODUCT HERO (GALLERY & DETAILS) */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left Column: 3-Angle Gallery */}
          <div className="lg:col-span-6 flex flex-col-reverse md:flex-row gap-4">
            {/* Thumbnail list (3 angle views) */}
            <div className="flex md:flex-col gap-3 justify-center">
              {galleryImages.map((imgSrc, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(imgSrc)}
                  className={`w-20 sm:w-24 md:w-28 aspect-square rounded-2xl bg-[#F0EEED] p-2 flex items-center justify-center border-2 transition-all cursor-pointer ${
                    activeImage === imgSrc ? 'border-black' : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <img src={imgSrc} alt="Thumbnail" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>

            {/* Main Image Frame */}
            <div className="relative flex-1 aspect-square bg-[#F0EEED] rounded-3xl overflow-hidden p-6 flex items-center justify-center">
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-contain transition-all duration-300"
              />

              {/* Wishlist toggle */}
              <button
                onClick={() => onToggleWishlist && onToggleWishlist(product.id)}
                className={`absolute top-4 right-4 p-3 rounded-full transition-all cursor-pointer ${
                  isWishlisted 
                    ? 'bg-rose-50 text-rose-500 shadow' 
                    : 'bg-white/80 text-gray-500 hover:text-black hover:bg-white'
                }`}
              >
                <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
              </button>
            </div>
          </div>

          {/* Right Column: Product Metadata, Variations & Add to Cart */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <h1 className="font-display font-black text-2xl sm:text-4xl text-black uppercase tracking-tight leading-tight">
                {product.name}
              </h1>

              {/* Rating score */}
              <div className="flex items-center space-x-2.5 mt-3">
                <div className="flex items-center text-[#FFC633]">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={18}
                      className={s <= Math.round(product.rating || 4.5) ? 'fill-[#FFC633]' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold text-black">
                  {product.rating || 4.5}/<span className="text-gray-400">5</span>
                </span>
                <span className="text-xs text-gray-400 font-medium">
                  ({reviews.length} reviews)
                </span>
              </div>

              {/* Price & Discount */}
              <div className="flex items-center space-x-3 mt-4">
                <span className="font-display font-black text-2xl sm:text-3xl text-black">
                  ${product.price}
                </span>
                {product.original_price && product.original_price > product.price && (
                  <span className="text-xl sm:text-2xl font-bold text-gray-400 line-through">
                    ${product.original_price}
                  </span>
                )}
                {discountPercent > 0 && (
                  <span className="text-xs font-bold text-[#FF3333] bg-[#FF3333]/10 px-2.5 py-1 rounded-full">
                    -{discountPercent}%
                  </span>
                )}
              </div>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-5">
              {product.description ||
                'This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior comfort and style.'}
            </p>

            {/* Select Colors */}
            <div className="space-y-3 border-t border-gray-100 pt-5">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                Select Colors
              </span>
              <div className="flex items-center space-x-3">
                {colors.map((c) => {
                  const isSelected = selectedColor === c.hex;
                  return (
                    <button
                      key={c.hex}
                      onClick={() => setSelectedColor(c.hex)}
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer ${
                        isSelected ? 'ring-2 ring-black ring-offset-2' : ''
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    >
                      {isSelected && <Check size={16} className="text-white" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Choose Size */}
            <div className="space-y-3 border-t border-gray-100 pt-5">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                Choose Size
              </span>
              <div className="flex flex-wrap gap-2.5">
                {sizes.map((s) => {
                  const isSelected = selectedSize === s;
                  return (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-black text-white shadow-sm'
                          : 'bg-[#F0F0F0] text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quantity Stepper & Add to Cart Button */}
            <div className="border-t border-gray-100 pt-6 flex items-center gap-4">
              {/* Stepper */}
              <div className="flex items-center justify-between bg-[#F0F0F0] rounded-full px-5 py-3 w-36">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="text-black hover:opacity-60 transition-opacity cursor-pointer p-0.5"
                >
                  <Minus size={16} />
                </button>
                <span className="font-bold text-sm text-black select-none">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="text-black hover:opacity-60 transition-opacity cursor-pointer p-0.5"
                >
                  <Plus size={16} />
                </button>
              </div>

              {/* Add to Cart CTA */}
              <button
                onClick={handleAddToCartClick}
                className="flex-1 py-3.5 px-6 rounded-full bg-black text-white font-extrabold text-sm tracking-wide flex items-center justify-center gap-2 hover:bg-neutral-800 active:scale-98 transition-all shadow-md cursor-pointer"
              >
                <ShoppingBag size={18} />
                <span>Add to Cart</span>
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* PRODUCT TABS (Details, Rating & Reviews, FAQs) */}
        {/* ========================================================= */}
        <div className="mt-20">
          <div className="flex border-b border-gray-200 text-center">
            <button
              onClick={() => setActiveTab('details')}
              className={`flex-1 py-4 text-sm sm:text-base font-bold transition-colors cursor-pointer ${
                activeTab === 'details'
                  ? 'border-b-2 border-black text-black'
                  : 'text-gray-400 hover:text-black'
              }`}
            >
              Product Details
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`flex-1 py-4 text-sm sm:text-base font-bold transition-colors cursor-pointer ${
                activeTab === 'reviews'
                  ? 'border-b-2 border-black text-black'
                  : 'text-gray-400 hover:text-black'
              }`}
            >
              Rating & Reviews ({reviews.length})
            </button>
            <button
              onClick={() => setActiveTab('faqs')}
              className={`flex-1 py-4 text-sm sm:text-base font-bold transition-colors cursor-pointer ${
                activeTab === 'faqs'
                  ? 'border-b-2 border-black text-black'
                  : 'text-gray-400 hover:text-black'
              }`}
            >
              FAQs
            </button>
          </div>

          {/* TAB: Product Details */}
          {activeTab === 'details' && (
            <div className="py-8 space-y-4 max-w-3xl text-sm text-gray-600 leading-relaxed">
              <h3 className="font-bold text-lg text-black">Product Specifications</h3>
              <ul className="list-disc pl-5 space-y-2">
                <li>Material: 100% Ring-Spun Combed Cotton for extreme breathability.</li>
                <li>Fit: Standard Regular Fit with reinforced crew neck collar.</li>
                <li>Weight: 220 GSM heavyweight luxury fabric.</li>
                <li>Care: Machine wash cold inside out, tumble dry low.</li>
                <li>Origin: Ethically sourced and manufactured in Portugal.</li>
              </ul>
            </div>
          )}

          {/* TAB: FAQs */}
          {activeTab === 'faqs' && (
            <div className="py-8 space-y-4 max-w-3xl text-sm text-gray-600">
              <div className="border border-gray-200 rounded-2xl p-4">
                <h4 className="font-bold text-black mb-1">What is the return policy?</h4>
                <p>We offer a 30-day money-back guarantee with free returns for all orders.</p>
              </div>
              <div className="border border-gray-200 rounded-2xl p-4">
                <h4 className="font-bold text-black mb-1">How fast is shipping?</h4>
                <p>Standard delivery takes 3-5 business days. Express overnight shipping is also available at checkout.</p>
              </div>
            </div>
          )}

          {/* TAB: Ratings & Reviews */}
          {activeTab === 'reviews' && (
            <div className="py-8 space-y-6">
              {/* Reviews Controls Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center space-x-2">
                  <h3 className="font-bold text-xl text-black">All Reviews</h3>
                  <span className="text-sm text-gray-500">({reviews.length})</span>
                </div>

                <div className="flex items-center space-x-3">
                  <select
                    value={reviewSort}
                    onChange={(e) => setReviewSort(e.target.value)}
                    className="bg-gray-100 text-xs sm:text-sm font-semibold rounded-full px-4 py-2.5 focus:outline-none cursor-pointer"
                  >
                    <option value="latest">Latest</option>
                    <option value="highest">Highest Rating</option>
                  </select>

                  <button
                    onClick={() => setShowReviewModal(true)}
                    className="px-5 py-2.5 rounded-full bg-black text-white text-xs sm:text-sm font-bold hover:bg-neutral-800 transition-colors cursor-pointer"
                  >
                    Write a Review
                  </button>
                </div>
              </div>

              {/* Reviews Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-6 rounded-3xl border border-gray-200 bg-white space-y-3.5"
                  >
                    {/* Stars */}
                    <div className="flex items-center text-[#FFC633]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} size={16} className="fill-[#FFC633]" />
                      ))}
                    </div>

                    {/* Author + Verified */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1.5">
                        <span className="font-bold text-base text-black">{rev.author}</span>
                        {rev.verified && (
                          <CheckCircle size={15} className="text-emerald-500 fill-emerald-500 text-white" />
                        )}
                      </div>
                      <span className="text-xs text-gray-400">{rev.date}</span>
                    </div>

                    {/* Content */}
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {rev.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ========================================================= */}
        {/* YOU MIGHT ALSO LIKE (Figma Exact 1:2) */}
        {/* ========================================================= */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 border-t border-gray-100 pt-16">
            <h2 className="font-display font-black text-2xl sm:text-4xl text-black text-center tracking-tight uppercase mb-10">
              YOU MIGHT ALSO LIKE
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.slice(0, 4).map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    if (onSelectProduct) onSelectProduct(p);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="group flex flex-col justify-between bg-white rounded-2xl cursor-pointer"
                >
                  <div className="relative aspect-square bg-[#F0EEED] rounded-2xl overflow-hidden p-3 flex items-center justify-center">
                    <img
                      src={resolveImage(p.image)}
                      alt={p.name}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="mt-3 space-y-1">
                    <h4 className="font-bold text-sm text-black truncate group-hover:underline">
                      {p.name}
                    </h4>
                    <div className="flex items-center space-x-1 text-[#FFC633]">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          size={12}
                          className={s <= Math.round(p.rating || 4.5) ? 'fill-[#FFC633]' : 'text-gray-300'}
                        />
                      ))}
                      <span className="text-xs text-gray-500 ml-1 font-semibold">{p.rating || 4.5}/5</span>
                    </div>
                    <span className="font-display font-black text-base text-black block">
                      ${p.price}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* WRITE A REVIEW MODAL */}
      {/* ========================================================= */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative">
            <button
              onClick={() => setShowReviewModal(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-black"
            >
              <X size={20} />
            </button>

            <h3 className="font-display font-black text-xl text-black uppercase mb-4">
              Write a Review
            </h3>

            <form onSubmit={handleAddReview} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-gray-600 block mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  value={newReviewAuthor}
                  onChange={(e) => setNewReviewAuthor(e.target.value)}
                  placeholder="e.g. Alex Morgan"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-600 block mb-1">Rating</label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setNewReviewRating(star)}
                      className="p-1 cursor-pointer"
                    >
                      <Star
                        size={22}
                        className={star <= newReviewRating ? 'text-[#FFC633] fill-[#FFC633]' : 'text-gray-300'}
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-600 block mb-1">Your Feedback</label>
                <textarea
                  required
                  rows={4}
                  value={newReviewContent}
                  onChange={(e) => setNewReviewContent(e.target.value)}
                  placeholder="Tell us what you liked about the fit, quality, or style..."
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm focus:outline-none focus:ring-2 focus:ring-black resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-black text-white font-bold text-xs uppercase hover:bg-neutral-800 transition-colors shadow cursor-pointer"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
