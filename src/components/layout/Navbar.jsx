import React, { useState } from 'react';
import { Search, ShoppingCart, Heart, User, ChevronDown, Menu, X, ArrowRight } from 'lucide-react';

export default function Navbar({
  cartCount = 0,
  wishlistCount = 0,
  onOpenCart,
  onOpenWishlist,
  onNavigate,
  onSearch,
  searchQuery = '',
  setSearchQuery,
  currentView
}) {
  const [showPromo, setShowPromo] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate('catalog');
    }
  };

  return (
    <header className="w-full sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 transition-all">
      {/* Top Announcement Promo Bar (Exact Figma Frame 1) */}
      {showPromo && (
        <div className="bg-black text-white text-xs py-2.5 px-4 text-center relative flex items-center justify-center">
          <p className="font-normal text-[11px] sm:text-xs">
            Sign up and get 20% off to your first order.{' '}
            <button 
              onClick={() => onNavigate('catalog')}
              className="font-bold underline ml-1 hover:text-gray-300 transition-colors cursor-pointer"
            >
              Sign Up Now
            </button>
          </p>
          <button
            onClick={() => setShowPromo(false)}
            className="absolute right-4 text-gray-400 hover:text-white p-1"
            aria-label="Dismiss banner"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Left Side: Mobile Menu Button + Brand Logo */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-black hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo SHOP.CO */}
          <div
            onClick={() => onNavigate('home')}
            className="cursor-pointer select-none"
          >
            <span className="font-display font-black text-2xl sm:text-3xl tracking-tighter text-black">
              SHOP.CO
            </span>
          </div>
        </div>

        {/* Center: Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-7 text-sm font-medium text-gray-700">
          {/* Shop Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShopDropdownOpen(!shopDropdownOpen)}
              onMouseEnter={() => setShopDropdownOpen(true)}
              className="flex items-center space-x-1 hover:text-black transition-colors py-2 cursor-pointer"
            >
              <span className={currentView === 'catalog' ? 'text-black font-bold' : ''}>Shop</span>
              <ChevronDown size={15} className={`transition-transform duration-200 ${shopDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {shopDropdownOpen && (
              <div 
                onMouseLeave={() => setShopDropdownOpen(false)}
                className="absolute top-full left-0 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 p-2.5 space-y-1 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
              >
                <button
                  onClick={() => { onNavigate('catalog', { category: 'all' }); setShopDropdownOpen(false); }}
                  className="w-full text-left px-3.5 py-2 text-xs font-semibold rounded-xl text-gray-700 hover:bg-gray-50 hover:text-black flex items-center justify-between"
                >
                  <span>All Categories</span>
                  <ArrowRight size={13} className="text-gray-400" />
                </button>
                <button
                  onClick={() => { onNavigate('catalog', { category: 't-shirts' }); setShopDropdownOpen(false); }}
                  className="w-full text-left px-3.5 py-2 text-xs font-semibold rounded-xl text-gray-700 hover:bg-gray-50 hover:text-black"
                >
                  T-Shirts & Tops
                </button>
                <button
                  onClick={() => { onNavigate('catalog', { category: 'shirts' }); setShopDropdownOpen(false); }}
                  className="w-full text-left px-3.5 py-2 text-xs font-semibold rounded-xl text-gray-700 hover:bg-gray-50 hover:text-black"
                >
                  Casual & Formal Shirts
                </button>
                <button
                  onClick={() => { onNavigate('catalog', { category: 'jeans' }); setShopDropdownOpen(false); }}
                  className="w-full text-left px-3.5 py-2 text-xs font-semibold rounded-xl text-gray-700 hover:bg-gray-50 hover:text-black"
                >
                  Jeans & Denim
                </button>
                <button
                  onClick={() => { onNavigate('catalog', { category: 'shorts' }); setShopDropdownOpen(false); }}
                  className="w-full text-left px-3.5 py-2 text-xs font-semibold rounded-xl text-gray-700 hover:bg-gray-50 hover:text-black"
                >
                  Bermuda Shorts
                </button>
              </div>
            )}
          </div>

          <button
            onClick={() => onNavigate('catalog', { sort: 'price_low' })}
            className="hover:text-black transition-colors cursor-pointer"
          >
            On Sale
          </button>
          <button
            onClick={() => onNavigate('catalog', { new_arrivals: 'true' })}
            className="hover:text-black transition-colors cursor-pointer"
          >
            New Arrivals
          </button>
          <button
            onClick={() => {
              const brandsEl = document.getElementById('brands-strip');
              if (brandsEl) brandsEl.scrollIntoView({ behavior: 'smooth' });
              else onNavigate('home');
            }}
            className="hover:text-black transition-colors cursor-pointer"
          >
            Brands
          </button>
        </nav>

        {/* Center-Right: Search Bar with Autocomplete */}
        <div className="flex-1 max-w-lg hidden sm:block">
          <form onSubmit={handleSearchSubmit} className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products..."
              className="w-full bg-[#f0f0f0] rounded-full py-2.5 pl-11 pr-4 text-xs sm:text-sm text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black/10 focus:bg-white border border-transparent focus:border-gray-300 transition-all"
            />
          </form>
        </div>

        {/* Right Side: Action Icons */}
        <div className="flex items-center space-x-2 sm:space-x-3.5">
          {/* Mobile search toggle */}
          <button
            onClick={() => onNavigate('catalog')}
            className="sm:hidden p-2 text-gray-700 hover:text-black hover:bg-gray-100 rounded-full"
            aria-label="Search"
          >
            <Search size={22} />
          </button>

          {/* Wishlist */}
          <button
            onClick={onOpenWishlist}
            className="relative p-2 text-gray-700 hover:text-black hover:bg-gray-100 rounded-full transition-colors active:scale-95 cursor-pointer"
            aria-label="Wishlist"
          >
            <Heart size={22} />
            {wishlistCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 text-white font-bold text-[10px] rounded-full flex items-center justify-center shadow">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Icon */}
          <button
            onClick={onOpenCart}
            className="relative p-2 text-gray-700 hover:text-black hover:bg-gray-100 rounded-full transition-colors active:scale-95 cursor-pointer"
            aria-label="Shopping Cart"
          >
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-black text-white font-bold text-[10px] rounded-full flex items-center justify-center shadow">
                {cartCount}
              </span>
            )}
          </button>

          {/* Profile User Icon */}
          <button
            onClick={() => alert('Account Profile: Jackob Henderson (VIP Customer)')}
            className="p-2 text-gray-700 hover:text-black hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
            aria-label="User account"
          >
            <User size={22} />
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white px-5 py-4 space-y-3 animate-in fade-in duration-200">
          <form onSubmit={handleSearchSubmit} className="relative mb-2">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for products..."
              className="w-full bg-[#f0f0f0] rounded-xl py-2 pl-10 pr-4 text-xs text-black placeholder-gray-500 focus:outline-none"
            />
          </form>

          <div className="flex flex-col space-y-2 text-sm font-semibold">
            <button
              onClick={() => { onNavigate('catalog'); setMobileMenuOpen(false); }}
              className="text-left py-2 px-3 rounded-lg hover:bg-gray-50 text-gray-800"
            >
              Shop All Catalog
            </button>
            <button
              onClick={() => { onNavigate('catalog', { new_arrivals: 'true' }); setMobileMenuOpen(false); }}
              className="text-left py-2 px-3 rounded-lg hover:bg-gray-50 text-gray-800"
            >
              New Arrivals
            </button>
            <button
              onClick={() => { onNavigate('catalog', { sort: 'price_low' }); setMobileMenuOpen(false); }}
              className="text-left py-2 px-3 rounded-lg hover:bg-gray-50 text-gray-800"
            >
              On Sale
            </button>
            <button
              onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }}
              className="text-left py-2 px-3 rounded-lg hover:bg-gray-50 text-gray-800"
            >
              Brands
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
