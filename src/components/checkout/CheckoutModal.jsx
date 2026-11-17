import React, { useState } from 'react';
import { X, CheckCircle, Shield, CreditCard, Lock, ArrowRight, Printer } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CheckoutModal({
  isOpen,
  onClose,
  cart = [],
  totals = { subtotal: 0, discountAmount: 0, deliveryFee: 0, grandTotal: 0 },
  onOrderSuccess
}) {
  const [step, setStep] = useState('form'); // 'form' | 'success'
  const [formData, setFormData] = useState({
    name: 'Alex Morgan',
    email: 'alex.morgan@example.com',
    address: '742 Evergreen Terrace',
    city: 'San Francisco',
    postalCode: '94107',
    country: 'United States',
    paymentMethod: 'card',
    cardNumber: '4532 •••• •••• 8912',
    cardExpiry: '12/28',
    cardCvc: '849'
  });
  const [orderId, setOrderId] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newOrderId = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderId(newOrderId);

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      // ignore
    }

    setStep('success');
    if (onOrderSuccess) {
      onOrderSuccess({
        id: newOrderId,
        customer: formData,
        cart,
        totals
      });
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-[32px] p-6 sm:p-10 max-w-2xl w-full shadow-2xl relative my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-gray-400 hover:text-black hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <X size={20} />
        </button>

        {step === 'form' ? (
          <div>
            <div className="flex items-center space-x-2 text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">
              <Lock size={14} className="text-emerald-600" />
              <span>256-Bit SSL Encrypted</span>
            </div>
            <h2 className="font-display font-black text-2xl sm:text-3xl text-black uppercase mb-6">
              Checkout & Payment
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Shipping Information */}
              <div className="space-y-4">
                <h3 className="font-bold text-sm text-black uppercase tracking-wider">
                  Shipping Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-gray-600 block mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600 block mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-600 block mb-1">
                    Street Address
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-gray-600 block mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600 block mb-1">Postal</label>
                    <input
                      type="text"
                      required
                      value={formData.postalCode}
                      onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600 block mb-1">Country</label>
                    <input
                      type="text"
                      required
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="space-y-4 pt-4 border-t border-gray-100">
                <h3 className="font-bold text-sm text-black uppercase tracking-wider">
                  Payment Method
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {['card', 'paypal', 'apple'].map((method) => (
                    <button
                      type="button"
                      key={method}
                      onClick={() => setFormData({ ...formData, paymentMethod: method })}
                      className={`py-3 px-2 rounded-2xl border text-center font-bold text-xs uppercase transition-all cursor-pointer ${
                        formData.paymentMethod === method
                          ? 'border-black bg-black text-white shadow-sm'
                          : 'border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {method === 'card' && 'Credit Card'}
                      {method === 'paypal' && 'PayPal'}
                      {method === 'apple' && 'Apple Pay'}
                    </button>
                  ))}
                </div>

                {formData.paymentMethod === 'card' && (
                  <div className="space-y-3 bg-gray-50 p-4 rounded-2xl border border-gray-200">
                    <div>
                      <label className="text-xs font-semibold text-gray-600 block mb-1">
                        Card Number
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.cardNumber}
                        onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                        className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-black"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-semibold text-gray-600 block mb-1">
                          Expiry (MM/YY)
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.cardExpiry}
                          onChange={(e) => setFormData({ ...formData, cardExpiry: e.target.value })}
                          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-black"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-gray-600 block mb-1">
                          CVC
                        </label>
                        <input
                          type="password"
                          required
                          value={formData.cardCvc}
                          onChange={(e) => setFormData({ ...formData, cardCvc: e.target.value })}
                          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-black"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Order Mini Summary */}
              <div className="bg-gray-50 p-4 rounded-2xl space-y-2 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-black">${totals.subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Discount</span>
                  <span className="font-bold text-[#FF3333]">-${totals.discountAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery</span>
                  <span className="font-bold text-black">
                    {totals.deliveryFee === 0 ? 'Free' : `$${totals.deliveryFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold pt-2 border-t border-gray-200">
                  <span className="text-black">Total to Pay</span>
                  <span className="font-display font-black text-black">${totals.grandTotal}</span>
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-4 rounded-full bg-black text-white font-extrabold text-sm uppercase tracking-wider hover:bg-neutral-800 active:scale-98 transition-all shadow-xl cursor-pointer"
              >
                Pay ${totals.grandTotal} & Complete Order
              </button>
            </form>
          </div>
        ) : (
          /* ========================================================= */
          /* ORDER CONFIRMATION INVOICE */
          /* ========================================================= */
          <div className="text-center py-6 space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle size={36} />
            </div>

            <div>
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest block mb-1">
                Order Placed Successfully!
              </span>
              <h2 className="font-display font-black text-2xl sm:text-3xl text-black uppercase">
                Thank You for Your Order
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 mt-2">
                We've sent an order confirmation and digital receipt to{' '}
                <span className="font-bold text-black">{formData.email}</span>
              </p>
            </div>

            {/* Receipt Card */}
            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 text-left space-y-3 text-xs sm:text-sm">
              <div className="flex justify-between border-b border-gray-200 pb-3">
                <div>
                  <span className="text-gray-400 block text-xs">Order Number</span>
                  <span className="font-mono font-bold text-black text-base">{orderId}</span>
                </div>
                <div className="text-right">
                  <span className="text-gray-400 block text-xs">Payment Status</span>
                  <span className="font-bold text-emerald-600">PAID IN FULL</span>
                </div>
              </div>

              <div className="space-y-1 text-gray-600 pt-1">
                <p>
                  <span className="font-semibold text-black">Recipient:</span> {formData.name}
                </p>
                <p>
                  <span className="font-semibold text-black">Delivery Address:</span>{' '}
                  {formData.address}, {formData.city}, {formData.country}
                </p>
                <p>
                  <span className="font-semibold text-black">Items count:</span> {cart.length} item(s)
                </p>
              </div>

              <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
                <span className="font-bold text-black">Total Paid:</span>
                <span className="font-display font-black text-xl text-black">
                  ${totals.grandTotal}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={handlePrint}
                className="flex-1 py-3.5 rounded-full border border-gray-300 font-bold text-xs uppercase flex items-center justify-center gap-2 hover:bg-gray-100 cursor-pointer"
              >
                <Printer size={16} />
                <span>Print Invoice</span>
              </button>
              <button
                onClick={onClose}
                className="flex-1 py-3.5 rounded-full bg-black text-white font-bold text-xs uppercase hover:bg-neutral-800 cursor-pointer"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
