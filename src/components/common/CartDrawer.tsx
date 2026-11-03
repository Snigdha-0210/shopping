import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ShoppingBag, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { useShopping } from '../../context/ShoppingContext';

export const CartDrawer: React.FC = () => {
  const navigate = useNavigate();
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    removeFromCart, 
    updateQuantity, 
    cartSubtotal, 
    cartDiscount, 
    cartTotal 
  } = useShopping();

  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  if (!isCartOpen) return null;

  const freeShippingThreshold = 150;
  const freeShippingProgress = Math.min(100, (cartTotal / freeShippingThreshold) * 100);
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - cartTotal);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'AURA10' || promoCode.trim().toUpperCase() === 'LOOK15') {
      setPromoApplied(true);
    }
  };

  const finalTotal = promoApplied ? Math.round(cartTotal * 0.9) : cartTotal;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-charcoal-900/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="absolute inset-0" 
        onClick={() => setIsCartOpen(false)} 
        aria-hidden="true" 
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-ivory-50 shadow-2xl flex flex-col border-l border-sand animate-in slide-in-from-right duration-300">
          
          {/* Drawer Header */}
          <div className="p-5 border-b border-sand bg-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-charcoal-900" />
              <h3 className="font-serif text-lg text-charcoal-900 font-medium">Your Shopping Bag</h3>
              <span className="text-xs bg-sand px-2 py-0.5 rounded-full font-semibold text-charcoal-700">
                {cart.length}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-charcoal-500 hover:text-charcoal-900 rounded-full hover:bg-sand/50 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Meter */}
          <div className="bg-sand/40 px-5 py-3 border-b border-sand text-xs">
            {amountToFreeShipping > 0 ? (
              <p className="text-charcoal-700 mb-1.5">
                Add <strong className="text-charcoal-900">${amountToFreeShipping.toFixed(0)}</strong> more for <span className="font-semibold text-bronze-dark">Complimentary Express Shipping</span>
              </p>
            ) : (
              <p className="text-emerald-700 font-medium mb-1.5 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                You unlocked Complimentary Express Shipping!
              </p>
            )}
            <div className="w-full bg-sand-dark/60 h-1.5 rounded-full overflow-hidden">
              <div 
                className="bg-charcoal-900 h-full transition-all duration-500 ease-out"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 rounded-full bg-sand/60 mx-auto flex items-center justify-center text-taupe-dark">
                  <ShoppingBag className="w-7 h-7" />
                </div>
                <h4 className="font-serif text-lg text-charcoal-800">Your bag is empty</h4>
                <p className="text-xs text-taupe-dark max-w-xs mx-auto">
                  Explore products by your current mood or let our stylists complete your look.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/moods');
                  }}
                  className="mt-3 px-5 py-2.5 rounded-full bg-charcoal-900 text-ivory-50 text-xs uppercase tracking-wider font-semibold hover:bg-charcoal-800 transition-colors"
                >
                  Explore Your Mood
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div 
                  key={item.id}
                  className="p-3 bg-white rounded-2xl border border-sand flex gap-3 relative group"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-20 h-24 object-cover rounded-xl bg-sand-light shrink-0"
                  />

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h5 className="font-serif text-sm text-charcoal-900 line-clamp-1">{item.product.name}</h5>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-taupe-dark hover:text-rose-600 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2 text-[11px] text-taupe-dark mt-0.5">
                        <span>Size: <strong className="text-charcoal-800">{item.selectedSize}</strong></span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <span 
                            className="w-2.5 h-2.5 rounded-full border border-sand" 
                            style={{ backgroundColor: item.selectedColor.hex }} 
                          />
                          {item.selectedColor.name}
                        </span>
                      </div>

                      {item.lookBundleId && (
                        <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 text-[9px] uppercase font-semibold tracking-wider bg-gold/15 text-bronze-dark rounded-full">
                          <Sparkles className="w-2.5 h-2.5 text-gold" />
                          Complete Look 15% Off
                        </span>
                      )}
                    </div>

                    {/* Quantity and Price */}
                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-sand/40">
                      <div className="flex items-center border border-sand rounded-lg bg-sand-light/50">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 text-charcoal-700 hover:text-charcoal-900"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-semibold text-charcoal-900">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-charcoal-700 hover:text-charcoal-900"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="font-serif text-sm font-semibold text-charcoal-900">
                          ${((item.lookBundleId ? item.product.price * 0.85 : (item.product.discountPrice || item.product.price)) * item.quantity).toFixed(0)}
                        </span>
                      </div>
                    </div>

                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer with Totals & Checkout */}
          {cart.length > 0 && (
            <div className="p-5 bg-white border-t border-sand space-y-3">
              {/* Promo input */}
              <form onSubmit={handleApplyPromo} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Enter promo code (try AURA10)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-1 bg-ivory-50 border border-sand rounded-xl px-3 py-2 text-xs uppercase tracking-wider focus:outline-none focus:ring-1 focus:ring-charcoal-900"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-sand hover:bg-sand-dark text-charcoal-900 rounded-xl text-xs uppercase tracking-wider font-semibold transition-colors"
                >
                  Apply
                </button>
              </form>

              {promoApplied && (
                <div className="p-2 rounded-lg bg-emerald-50 text-emerald-800 text-xs flex items-center justify-between">
                  <span>Code <strong>{promoCode.toUpperCase()}</strong> applied (-10%)</span>
                  <span>Active</span>
                </div>
              )}

              {/* Price summary */}
              <div className="space-y-1.5 text-xs text-charcoal-700 pt-2 border-t border-sand/50">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-serif text-sm">${cartSubtotal.toFixed(0)}</span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Look & Item Savings</span>
                    <span>-${cartDiscount.toFixed(0)}</span>
                  </div>
                )}
                {promoApplied && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Promo Discount</span>
                    <span>-${(cartTotal * 0.1).toFixed(0)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{amountToFreeShipping === 0 ? 'Complimentary' : '$15.00'}</span>
                </div>
                <div className="flex justify-between text-base font-serif font-bold text-charcoal-900 pt-2 border-t border-sand">
                  <span>Estimated Total</span>
                  <span>${finalTotal.toFixed(0)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                type="button"
                onClick={() => {
                  setIsCartOpen(false);
                  navigate('/checkout');
                }}
                className="w-full py-3.5 px-4 rounded-2xl bg-charcoal-900 hover:bg-charcoal-800 text-ivory-50 text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 shadow-soft"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-taupe-dark">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Encrypted 256-Bit SSL Checkout • Free 30-Day Returns</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

