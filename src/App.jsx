import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HeroSection from './components/home/HeroSection';
import BrandBar from './components/home/BrandBar';
import ProductGridSection from './components/home/ProductGridSection';
import BrowseStyleSection from './components/home/BrowseStyleSection';
import TestimonialsSection from './components/home/TestimonialsSection';
import CategoryCatalog from './components/catalog/CategoryCatalog';
import ProductDetailPage from './components/pdp/ProductDetailPage';
import CartView from './components/cart/CartView';
import CheckoutModal from './components/checkout/CheckoutModal';
import WishlistModal from './components/wishlist/WishlistModal';
import { fetchProducts, fetchCategories, fetchTestimonials, fallbackProducts } from './services/api';
import { CheckCircle2, ShoppingBag } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'catalog' | 'pdp' | 'cart'
  const [products, setProducts] = useState(fallbackProducts);
  const [activeProduct, setActiveProduct] = useState(fallbackProducts[0]);
  const [activeCategory, setActiveCategory] = useState('');
  const [activeDressStyle, setActiveDressStyle] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Cart state persisted in localStorage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('shopco_cart');
      return saved ? JSON.parse(saved) : [
        {
          product: fallbackProducts[0],
          size: 'Large',
          color: '#4F4631',
          quantity: 1
        },
        {
          product: fallbackProducts[1],
          size: 'Medium',
          color: '#000000',
          quantity: 1
        }
      ];
    } catch {
      return [];
    }
  });

  // Wishlist state persisted in localStorage
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem('shopco_wishlist');
      return saved ? JSON.parse(saved) : [fallbackProducts[0].id, fallbackProducts[2].id];
    } catch {
      return [];
    }
  });

  // Modals & Overlays
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [checkoutTotals, setCheckoutTotals] = useState({
    subtotal: 0,
    discountAmount: 0,
    deliveryFee: 0,
    grandTotal: 0
  });

  // Notification Toast
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage('');
    }, 3000);
  };

  // Sync cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('shopco_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Sync wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('shopco_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  // Load products from API on mount
  useEffect(() => {
    fetchProducts()
      .then((data) => {
        if (data && data.length > 0) {
          setProducts(data);
          setActiveProduct(data[0]);
        }
      })
      .catch((err) => {
        console.warn('Backend not reached, using built-in mock products:', err);
      });
  }, []);

  // Handlers
  const handleAddToCart = (product, options = {}) => {
    const selectedSize = options.size || 'Large';
    const selectedColor = options.color || '#4F4631';
    const qty = options.quantity || 1;

    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.size === selectedSize &&
          item.color === selectedColor
      );

      if (existingIdx > -1) {
        const next = [...prevCart];
        next[existingIdx].quantity += qty;
        return next;
      } else {
        return [
          ...prevCart,
          {
            product,
            size: selectedSize,
            color: selectedColor,
            quantity: qty
          }
        ];
      }
    });

    showToast(`Added "${product.name}" to cart!`);
  };

  const handleUpdateCartQuantity = (index, newQuantity) => {
    setCart((prev) => {
      const next = [...prev];
      if (newQuantity <= 0) {
        next.splice(index, 1);
      } else {
        next[index].quantity = newQuantity;
      }
      return next;
    });
  };

  const handleRemoveFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
    showToast('Item removed from cart.');
  };

  const handleToggleWishlist = (productId) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        showToast('Removed from wishlist.');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to wishlist!');
        return [...prev, productId];
      }
    });
  };

  const handleSelectProduct = (product) => {
    setActiveProduct(product);
    setCurrentView('pdp');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectStyle = (styleName) => {
    setActiveDressStyle(styleName);
    setActiveCategory('');
    setCurrentView('catalog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleInitiateCheckout = (totals) => {
    setCheckoutTotals(totals);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = (orderInfo) => {
    setCart([]);
    showToast(`Order #${orderInfo.id} confirmed! Thank you.`);
  };

  const handleNavigate = (view) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sliced collections for home grids
  const newArrivals = products.slice(0, 4);
  const topSelling = products.slice(4, 8);
  const relatedProducts = products.filter((p) => p.id !== activeProduct?.id).slice(0, 4);

  // Cart total items count
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white text-black flex flex-col font-sans selection:bg-black selection:text-white antialiased">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-black text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center space-x-2 text-xs sm:text-sm font-semibold animate-bounce">
          <CheckCircle2 size={18} className="text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Global Navbar */}
      <Navbar
        cartCount={cartCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => handleNavigate('cart')}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onNavigate={handleNavigate}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        currentView={currentView}
      />

      {/* Main Content Area based on currentView */}
      <main className="flex-1">
        {currentView === 'home' && (
          <div>
            <HeroSection onShopNow={() => handleNavigate('catalog')} />
            <BrandBar />
            
            {/* NEW ARRIVALS */}
            <ProductGridSection
              title="NEW ARRIVALS"
              products={newArrivals}
              onSelectProduct={handleSelectProduct}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              wishlist={wishlist}
              onViewAll={() => handleNavigate('catalog')}
            />

            {/* TOP SELLING */}
            <ProductGridSection
              title="TOP SELLING"
              products={topSelling}
              onSelectProduct={handleSelectProduct}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              wishlist={wishlist}
              onViewAll={() => handleNavigate('catalog')}
            />

            {/* BROWSE BY DRESS STYLE */}
            <BrowseStyleSection onSelectStyle={handleSelectStyle} />

            {/* HAPPY CUSTOMERS TESTIMONIALS */}
            <TestimonialsSection />
          </div>
        )}

        {currentView === 'catalog' && (
          <CategoryCatalog
            products={products}
            activeCategory={activeCategory}
            activeDressStyle={activeDressStyle}
            onSelectCategory={setActiveCategory}
            onSelectDressStyle={setActiveDressStyle}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlist={wishlist}
            onNavigateHome={() => handleNavigate('home')}
          />
        )}

        {currentView === 'pdp' && (
          <ProductDetailPage
            product={activeProduct}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            wishlist={wishlist}
            onSelectProduct={handleSelectProduct}
            relatedProducts={relatedProducts}
            onNavigateHome={() => handleNavigate('home')}
            onNavigateCatalog={() => handleNavigate('catalog')}
          />
        )}

        {currentView === 'cart' && (
          <CartView
            cart={cart}
            onUpdateQuantity={handleUpdateCartQuantity}
            onRemoveItem={handleRemoveFromCart}
            onClearCart={() => setCart([])}
            onCheckout={handleInitiateCheckout}
            onNavigateHome={() => handleNavigate('home')}
            onNavigateCatalog={() => handleNavigate('catalog')}
          />
        )}
      </main>

      {/* Global Footer */}
      <Footer onSubscribe={(email) => showToast(`Subscribed ${email} to SHOP.CO updates!`)} />

      {/* Modals */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        totals={checkoutTotals}
        onOrderSuccess={handleOrderSuccess}
      />

      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistIds={wishlist}
        products={products}
        onRemoveFromWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        onSelectProduct={handleSelectProduct}
      />
    </div>
  );
}
