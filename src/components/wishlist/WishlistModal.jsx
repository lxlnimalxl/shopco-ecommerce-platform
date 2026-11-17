import React from 'react';
import { X, Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { resolveImage } from '../../services/api';

export default function WishlistModal({
  isOpen,
  onClose,
  wishlistIds = [],
  products = [],
  onRemoveFromWishlist,
  onAddToCart,
  onSelectProduct
}) {
  if (!isOpen) return null;

  const wishlistedProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Heart size={20} className="text-rose-500 fill-rose-500" />
            <h3 className="font-display font-black text-xl text-black uppercase">
              Wishlist ({wishlistedProducts.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-gray-400 hover:text-black cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content list */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {wishlistedProducts.length > 0 ? (
            wishlistedProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center gap-4 p-3 rounded-2xl border border-gray-100 hover:border-gray-200 transition-colors bg-white"
              >
                <div
                  onClick={() => {
                    if (onSelectProduct) onSelectProduct(product);
                    onClose();
                  }}
                  className="w-16 h-16 rounded-xl bg-[#F0EEED] p-1 flex items-center justify-center cursor-pointer flex-shrink-0"
                >
                  <img
                    src={resolveImage(product.image)}
                    alt={product.name}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h4
                    onClick={() => {
                      if (onSelectProduct) onSelectProduct(product);
                      onClose();
                    }}
                    className="font-bold text-sm text-black truncate cursor-pointer hover:underline"
                  >
                    {product.name}
                  </h4>
                  <span className="font-display font-black text-sm text-black block mt-0.5">
                    ${product.price}
                  </span>
                </div>

                <div className="flex items-center space-x-2 flex-shrink-0">
                  <button
                    onClick={() => {
                      if (onAddToCart) onAddToCart(product);
                      if (onRemoveFromWishlist) onRemoveFromWishlist(product.id);
                    }}
                    className="p-2 rounded-full bg-black text-white hover:bg-neutral-800 transition-colors cursor-pointer"
                    title="Move to Cart"
                  >
                    <ShoppingBag size={14} />
                  </button>
                  <button
                    onClick={() => onRemoveFromWishlist && onRemoveFromWishlist(product.id)}
                    className="p-2 rounded-full text-gray-400 hover:text-rose-500 hover:bg-rose-50 transition-colors cursor-pointer"
                    title="Remove"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-24 space-y-3">
              <Heart size={36} className="text-gray-300 mx-auto" />
              <p className="text-sm font-bold text-gray-500">Your wishlist is empty</p>
              <p className="text-xs text-gray-400 max-w-xs mx-auto">
                Save your favorite items here to track them or move them quickly into your cart.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100">
          <button
            onClick={onClose}
            className="w-full py-3.5 rounded-full bg-black text-white font-bold text-xs uppercase hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            Close Wishlist
          </button>
        </div>
      </div>
    </div>
  );
}
