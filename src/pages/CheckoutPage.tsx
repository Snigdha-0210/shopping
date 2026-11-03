import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  CreditCard, 
  Truck, 
  Sparkles, 
  CheckCircle2, 
  ArrowLeft,
  ShoppingBag,
  Lock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useShopping } from '../context/ShoppingContext';
import { useAuth } from '../context/AuthContext';
import { Order } from '../types';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { cart, cartSubtotal, cartDiscount, cartTotal, clearCart } = useShopping();
  const { user, addOrderToHistory } = useAuth();

  const [shippingInfo, setShippingInfo] = useState({
    fullName: user?.name || 'Eleanor Vance',
    street: '742 Evergreen Terrace',
    city: 'New York',
    state: 'NY',
    zipCode: '10021',
    country: 'United States'
  });

  const [paymentMethod, setPaymentMethod] = useState<'card' | 'apple-pay' | 'google-pay'>('card');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  const shippingCost = cartTotal >= 150 ? 0 : 15;
  const finalTotal = cartTotal + shippingCost;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const newOrder: Order = {
        id: 'ord-' + Math.random().toString(36).substring(2, 9),
        orderNumber: 'AA-' + Math.floor(10000 + Math.random() * 90000),
        createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        items: [...cart],
        totalAmount: finalTotal,
        subtotal: cartSubtotal,
        discount: cartDiscount,
        status: 'Confirmed',
        shippingAddress: { ...shippingInfo },
        paymentMethod: paymentMethod === 'card' ? 'Visa (ending in 8831)' : paymentMethod === 'apple-pay' ? 'Apple Pay' : 'Google Pay'
      };

      addOrderToHistory(newOrder);
      setCompletedOrder(newOrder);
      clearCart();
      setIsSubmitting(false);

      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.5 }
      });
    }, 1000);
  };

  if (completedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 mx-auto flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div>
          <span className="text-xs uppercase font-sans tracking-widest text-taupe-dark font-semibold">
            Order Confirmation
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-charcoal-900 mt-1">
            Thank you for shopping with AURA & ATELIER
          </h1>
          <p className="text-xs sm:text-sm text-charcoal-600 mt-2">
            Your acquisition <strong>{completedOrder.orderNumber}</strong> has been confirmed and transferred to our master ateliers for dispatch.
          </p>
        </div>

        <div className="p-6 bg-white rounded-3xl border border-sand shadow-soft text-left space-y-4 max-w-xl mx-auto">
          <div className="flex justify-between text-xs pb-3 border-b border-sand">
            <span className="text-taupe-dark">Total Paid:</span>
            <span className="font-serif text-lg font-bold text-charcoal-900">${completedOrder.totalAmount.toFixed(0)}</span>
          </div>

          <div className="text-xs space-y-1">
            <span className="font-semibold text-charcoal-800 uppercase tracking-wider block mb-1">Delivering To:</span>
            <p>{completedOrder.shippingAddress.fullName}</p>
            <p>{completedOrder.shippingAddress.street}, {completedOrder.shippingAddress.city}, {completedOrder.shippingAddress.zipCode}</p>
          </div>

          <div className="text-xs space-y-1 pt-2 border-t border-sand">
            <span className="font-semibold text-charcoal-800 uppercase tracking-wider block mb-1">Items Styled:</span>
            {completedOrder.items.map(item => (
              <div key={item.id} className="flex justify-between py-1">
                <span className="text-charcoal-700 truncate pr-2">{item.quantity}x {item.product.name} ({item.selectedSize})</span>
                <span className="font-semibold text-charcoal-900">${(item.product.price * item.quantity).toFixed(0)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-3 pt-4">
          <Link
            to="/profile?tab=orders"
            className="px-6 py-3 rounded-full bg-charcoal-900 text-ivory-50 text-xs uppercase tracking-wider font-semibold hover:bg-charcoal-800 transition-colors"
          >
            View in Profile Order History
          </Link>
          <Link
            to="/"
            className="px-6 py-3 rounded-full bg-sand text-charcoal-900 text-xs uppercase tracking-wider font-semibold hover:bg-sand-dark transition-colors"
          >
            Continue Discovery
          </Link>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center space-y-4">
        <ShoppingBag className="w-12 h-12 text-taupe-dark mx-auto" />
        <h2 className="font-serif text-3xl text-charcoal-900">Your bag is empty</h2>
        <p className="text-xs text-taupe-dark max-w-sm mx-auto">
          Add items by exploring your mood or crafting a Complete Look outfit.
        </p>
        <Link
          to="/moods"
          className="inline-block px-6 py-3 rounded-full bg-charcoal-900 text-ivory-50 text-xs uppercase tracking-wider font-semibold"
        >
          Explore Your Mood
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      <div>
        <Link to="/" className="inline-flex items-center gap-2 text-xs uppercase font-semibold text-taupe-dark hover:text-charcoal-900 mb-2">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Shopping</span>
        </Link>
        <h1 className="font-serif text-3xl sm:text-4xl text-charcoal-900">
          Atelier Checkout & Dispatch
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Form: Shipping & Payment (7 cols) */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Shipping Form */}
          <div className="p-6 sm:p-8 bg-white rounded-3xl border border-sand shadow-soft space-y-4">
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-charcoal-900" />
              <h3 className="font-serif text-lg text-charcoal-900 font-medium">1. Delivery Destination</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="sm:col-span-2">
                <label className="block text-taupe-dark uppercase font-semibold text-[10px] tracking-wider mb-1">
                  Full Recipient Name
                </label>
                <input
                  type="text"
                  required
                  value={shippingInfo.fullName}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, fullName: e.target.value })}
                  className="w-full bg-ivory-50 border border-sand rounded-xl px-3 py-2.5 text-xs text-charcoal-900"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-taupe-dark uppercase font-semibold text-[10px] tracking-wider mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  required
                  value={shippingInfo.street}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, street: e.target.value })}
                  className="w-full bg-ivory-50 border border-sand rounded-xl px-3 py-2.5 text-xs text-charcoal-900"
                />
              </div>

              <div>
                <label className="block text-taupe-dark uppercase font-semibold text-[10px] tracking-wider mb-1">
                  City
                </label>
                <input
                  type="text"
                  required
                  value={shippingInfo.city}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                  className="w-full bg-ivory-50 border border-sand rounded-xl px-3 py-2.5 text-xs text-charcoal-900"
                />
              </div>

              <div>
                <label className="block text-taupe-dark uppercase font-semibold text-[10px] tracking-wider mb-1">
                  Postal Code
                </label>
                <input
                  type="text"
                  required
                  value={shippingInfo.zipCode}
                  onChange={(e) => setShippingInfo({ ...shippingInfo, zipCode: e.target.value })}
                  className="w-full bg-ivory-50 border border-sand rounded-xl px-3 py-2.5 text-xs text-charcoal-900"
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="p-6 sm:p-8 bg-white rounded-3xl border border-sand shadow-soft space-y-4">
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-charcoal-900" />
              <h3 className="font-serif text-lg text-charcoal-900 font-medium">2. Payment Method</h3>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'card', label: 'Credit Card' },
                { id: 'apple-pay', label: 'Apple Pay' },
                { id: 'google-pay', label: 'Google Pay' },
              ].map(method => (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setPaymentMethod(method.id as any)}
                  className={`p-3 rounded-2xl border text-xs font-semibold tracking-wider uppercase transition-all ${
                    paymentMethod === method.id
                      ? 'border-charcoal-900 bg-sand/60 ring-2 ring-charcoal-900 text-charcoal-900'
                      : 'border-sand bg-sand-light/30 text-charcoal-700 hover:bg-white'
                  }`}
                >
                  {method.label}
                </button>
              ))}
            </div>

            {paymentMethod === 'card' && (
              <div className="space-y-3 pt-2 text-xs">
                <div>
                  <label className="block text-taupe-dark uppercase font-semibold text-[10px] tracking-wider mb-1">Card Number</label>
                  <input
                    type="text"
                    defaultValue="•••• •••• •••• 8831"
                    className="w-full bg-ivory-50 border border-sand rounded-xl px-3 py-2.5 font-mono"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-taupe-dark uppercase font-semibold text-[10px] tracking-wider mb-1">Expiry</label>
                    <input type="text" defaultValue="11/29" className="w-full bg-ivory-50 border border-sand rounded-xl px-3 py-2.5 font-mono" />
                  </div>
                  <div>
                    <label className="block text-taupe-dark uppercase font-semibold text-[10px] tracking-wider mb-1">CVC</label>
                    <input type="text" defaultValue="392" className="w-full bg-ivory-50 border border-sand rounded-xl px-3 py-2.5 font-mono" />
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handleSubmitOrder}
            disabled={isSubmitting}
            className="w-full py-4 rounded-2xl bg-charcoal-900 hover:bg-charcoal-800 text-ivory-50 text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 shadow-elevated"
          >
            <Lock className="w-4 h-4 text-gold" />
            <span>{isSubmitting ? 'Securing Acquisition...' : `Confirm & Place Order ($${finalTotal.toFixed(0)})`}</span>
          </button>

        </div>

        {/* Right Summary: Order Breakdown (5 cols) */}
        <div className="lg:col-span-5">
          <div className="p-6 sm:p-8 bg-white rounded-3xl border border-sand shadow-soft space-y-6 sticky top-28">
            <h3 className="font-serif text-lg text-charcoal-900 font-medium">Order Summary</h3>

            {/* Items List */}
            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {cart.map(item => (
                <div key={item.id} className="flex gap-3 text-xs">
                  <img src={item.product.images[0]} alt={item.product.name} className="w-14 h-18 object-cover rounded-xl bg-sand-light shrink-0" />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h5 className="font-serif font-medium text-charcoal-900 line-clamp-1">{item.product.name}</h5>
                      <span className="text-[10px] text-taupe-dark block">Size: {item.selectedSize} • Color: {item.selectedColor.name}</span>
                      {item.lookBundleId && (
                        <span className="text-[9px] uppercase font-bold text-bronze-dark bg-gold/15 px-1.5 py-0.5 rounded-full inline-block mt-0.5">
                          15% Look Bundle
                        </span>
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-taupe-dark">Qty: {item.quantity}</span>
                      <span className="font-semibold text-charcoal-900">
                        ${((item.lookBundleId ? item.product.price * 0.85 : (item.product.discountPrice || item.product.price)) * item.quantity).toFixed(0)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="space-y-2 pt-4 border-t border-sand text-xs text-charcoal-700">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-serif text-sm">${cartSubtotal.toFixed(0)}</span>
              </div>
              {cartDiscount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Look & Product Savings</span>
                  <span>-${cartDiscount.toFixed(0)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Express Shipping</span>
                <span>{shippingCost === 0 ? 'Complimentary' : `$${shippingCost}`}</span>
              </div>
              <div className="flex justify-between text-base font-serif font-bold text-charcoal-900 pt-3 border-t border-sand">
                <span>Total Amount</span>
                <span>${finalTotal.toFixed(0)}</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 text-[11px] text-taupe-dark pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Certified 256-Bit Encrypted Atelier Transaction</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

