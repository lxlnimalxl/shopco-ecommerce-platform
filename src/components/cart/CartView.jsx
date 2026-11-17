import React, { useState } from 'react';
import { 
  ChevronRight, 
  Trash2, 
  Minus, 
  Plus, 
  Tag, 
  ArrowRight, 
  ShoppingBag, 
  ShieldCheck, 
  Truck 
} from 'lucide-react';
import { resolveImage } from '../../services/api';

export default function CartView({
  cart = [],
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCheckout,
  onNavigateHome,
  onNavigateCatalog
}) {
  const [promoCode, setPromoCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState('');

  // Valid promo coupons
  const validCoupons = {
    SHOP20: { code: 'SHOP20', discount: 0.2, label: '20% Off' },
    SUMMER30: { code: 'SUMMER30', discount: 0.3, label: '30% Off' },
    WELCOME10: { code: 'WELCOME10', discount: 0.1, label: '10% Off' }
  };

  const handleApplyPromo = (e) => {
    e.preventDefault();
    const cleanCode = promoCode.trim().toUpperCase();
    if (validCoupons[cleanCode]) {
      setAppliedCoupon(validCoupons[cleanCode]);
      setCouponError('');
    } else {
      setCouponError('Invalid coupon code. Try SHOP20 or SUMMER30.');
    }
  };

  // Calculations
  const subtotal = cart.reduce((acc, item) => {
    const unitPrice = item.product?.price || 0;
    return acc + unitPrice * (item.quantity || 1);
  }, 0);

  // Discount calculation
  const discountRate = appliedCoupon ? appliedCoupon.discount : 0.2; // Default 20% promotional discount as per Figma
  const discountAmount = Math.round(subtotal * discountRate);

  const deliveryFee = subtotal > 200 || subtotal === 0 ? 0 : 15;
  const grandTotal = Math.max(0, subtotal - discountAmount + deliveryFee);

  return (
    <div className="w-full bg-white pb-24">
      {/* Breadcrumb (Figma Exact 31:32) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 border-t border-gray-100">
        <nav className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500">
          <button onClick={onNavigateHome} className="hover:text-black cursor-pointer">
            Home
          </button>
          <ChevronRight size={14} />
          <span className="text-black font-semibold">Cart</span>
        </nav>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2">
        <h1 className="font-display font-black text-3xl sm:text-4xl text-black uppercase tracking-tight mb-8">
          YOUR CART
        </h1>

        {cart.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* ========================================================= */}
            {/* CART ITEMS LIST */}
            {/* ========================================================= */}
            <div className="lg:col-span-7 p-6 sm:p-7 rounded-3xl border border-gray-200/90 bg-white divide-y divide-gray-100 space-y-6">
              {cart.map((item, index) => {
                const product = item.product;
                const size = item.size || 'Large';
                const color = item.color || '#000000';

                return (
                  <div
                    key={`${product.id}-${index}-${size}-${color}`}
                    className={`flex items-start gap-4 sm:gap-6 ${index > 0 ? 'pt-6' : ''}`}
                  >
                    {/* Item Thumbnail */}
                    <div className="w-24 sm:w-28 aspect-square rounded-2xl bg-[#F0EEED] p-2 flex items-center justify-center flex-shrink-0">
                      <img
                        src={resolveImage(product.image)}
                        alt={product.name}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Metadata & Controls */}
                    <div className="flex-1 flex flex-col justify-between h-full space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-bold text-base sm:text-lg text-black">
                            {product.name}
                          </h3>
                          <div className="text-xs text-gray-500 space-y-0.5 mt-1">
                            <p>
                              Size: <span className="text-black font-medium">{size}</span>
                            </p>
                            <p className="flex items-center gap-1.5">
                              Color: 
                              <span
                                className="w-3.5 h-3.5 rounded-full inline-block border border-gray-300"
                                style={{ backgroundColor: color }}
                              />
                            </p>
                          </div>
                        </div>

                        {/* Trash Button */}
                        <button
                          onClick={() => onRemoveItem && onRemoveItem(index)}
                          className="text-rose-500 hover:text-rose-700 p-1.5 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                          aria-label="Remove item"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>

                      {/* Price & Quantity Stepper */}
                      <div className="flex items-center justify-between pt-2">
                        <span className="font-display font-black text-xl sm:text-2xl text-black">
                          ${product.price}
                        </span>

                        <div className="flex items-center bg-[#F0F0F0] rounded-full px-4 py-2 space-x-4">
                          <button
                            onClick={() =>
                              onUpdateQuantity && onUpdateQuantity(index, Math.max(1, item.quantity - 1))
                            }
                            className="text-black hover:opacity-60 transition-opacity cursor-pointer"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="text-xs sm:text-sm font-bold select-none">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              onUpdateQuantity && onUpdateQuantity(index, item.quantity + 1)
                            }
                            className="text-black hover:opacity-60 transition-opacity cursor-pointer"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ========================================================= */}
            {/* ORDER SUMMARY CARD */}
            {/* ========================================================= */}
            <div className="lg:col-span-5 p-6 sm:p-7 rounded-3xl border border-gray-200/90 bg-white space-y-5 sticky top-24">
              <h2 className="font-display font-black text-xl sm:text-2xl text-black uppercase">
                Order Summary
              </h2>

              <div className="space-y-3.5 text-sm sm:text-base border-b border-gray-100 pb-5">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-bold text-black">${subtotal}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>
                    Discount {appliedCoupon ? `(${appliedCoupon.label})` : '(-20%)'}
                  </span>
                  <span className="font-bold text-[#FF3333]">-${discountAmount}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span className="font-bold text-black">
                    {deliveryFee === 0 ? (
                      <span className="text-emerald-600">Free</span>
                    ) : (
                      `$${deliveryFee}`
                    )}
                  </span>
                </div>
              </div>

              {/* Grand Total */}
              <div className="flex justify-between items-center text-lg sm:text-xl font-bold">
                <span className="text-black">Total</span>
                <span className="font-display font-black text-2xl text-black">${grandTotal}</span>
              </div>

              {/* Promo Code Form */}
              <form onSubmit={handleApplyPromo} className="space-y-2 pt-2">
                <div className="flex gap-2.5">
                  <div className="relative flex-1">
                    <Tag size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Add promo code (SHOP20)"
                      className="w-full bg-[#F0F0F0] rounded-full py-3 pl-11 pr-4 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-black uppercase placeholder-gray-400"
                    />
                  </div>
                  <button
                    type="submit"
                    className="py-3 px-6 rounded-full bg-black text-white text-xs sm:text-sm font-bold hover:bg-neutral-800 transition-colors shadow cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {appliedCoupon && (
                  <p className="text-xs text-emerald-600 font-semibold">
                    ✓ Promo code {appliedCoupon.code} applied successfully!
                  </p>
                )}
                {couponError && (
                  <p className="text-xs text-rose-500 font-semibold">{couponError}</p>
                )}
              </form>

              {/* Go to Checkout CTA */}
              <button
                onClick={() => onCheckout && onCheckout({ subtotal, discountAmount, deliveryFee, grandTotal })}
                className="w-full py-4 rounded-full bg-black text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2 hover:bg-neutral-800 active:scale-98 transition-all shadow-lg cursor-pointer"
              >
                <span>Go to Checkout</span>
                <ArrowRight size={18} />
              </button>

              {/* Guarantees */}
              <div className="pt-3 grid grid-cols-2 gap-2 text-center text-xs text-gray-400">
                <div className="flex items-center justify-center gap-1.5">
                  <ShieldCheck size={14} className="text-gray-500" />
                  <span>Secure Checkout</span>
                </div>
                <div className="flex items-center justify-center gap-1.5">
                  <Truck size={14} className="text-gray-500" />
                  <span>Fast Delivery</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20 px-4 rounded-3xl border border-dashed border-gray-200 space-y-4 max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mx-auto text-gray-400">
              <ShoppingBag size={28} />
            </div>
            <h2 className="font-display font-black text-2xl text-black">Your Cart is Empty</h2>
            <p className="text-sm text-gray-500">
              Looks like you haven't added anything to your cart yet. Explore our latest arrivals and luxury styles.
            </p>
            <button
              onClick={onNavigateCatalog}
              className="px-8 py-3.5 rounded-full bg-black text-white text-xs font-bold uppercase tracking-wider hover:bg-neutral-800 transition-colors shadow cursor-pointer"
            >
              Start Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
