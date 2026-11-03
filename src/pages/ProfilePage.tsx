import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { 
  User, 
  Sparkles, 
  Bookmark, 
  Heart, 
  Clock, 
  Sliders, 
  Trash2, 
  ShoppingBag, 
  ExternalLink,
  CheckCircle2,
  Package,
  Check
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useShopping } from '../context/ShoppingContext';
import { PRODUCTS } from '../data/products';
import { MOODS } from '../data/moods';
import { AESTHETICS, COLOR_PALETTES } from '../data/aesthetics';
import { ProductCard } from '../components/common/ProductCard';
import { MoodType, AestheticType } from '../types';

export const ProfilePage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { user, logout, updatePreferences, removeSavedLook } = useAuth();
  const { addCompleteLookToCart, setActiveMood } = useShopping();

  const tabParam = searchParams.get('tab') || 'saved-looks';
  const [activeTab, setActiveTab] = useState(tabParam);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSearchParams({ tab });
  };

  if (!user) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center space-y-4">
        <User className="w-12 h-12 text-taupe-dark mx-auto" />
        <h2 className="font-serif text-3xl text-charcoal-900">Sign in to your Atelier Profile</h2>
        <p className="text-xs text-taupe-dark max-w-sm mx-auto">
          Access your personalized mood preferences, curated saved looks, and order history.
        </p>
        <Link
          to="/"
          className="inline-block px-6 py-3 rounded-full bg-charcoal-900 text-ivory-50 text-xs uppercase tracking-wider font-semibold"
        >
          Return to Home
        </Link>
      </div>
    );
  }

  // Wishlist products
  const wishlistProducts = user.wishlist
    .map(id => PRODUCTS.find(p => p.productId === id))
    .filter((p): p is typeof PRODUCTS[0] => Boolean(p));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* 1. Profile Header Card */}
      <div className="p-6 sm:p-10 rounded-3xl bg-white border border-sand shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-18 h-18 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-sand via-ivory-200 to-taupe-light border-2 border-charcoal-900 flex items-center justify-center text-charcoal-900 font-serif text-2xl font-semibold shadow-subtle">
            {user.name.charAt(0)}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-2xl sm:text-3xl text-charcoal-900 font-normal">
                {user.name}
              </h1>
              <span className="px-2.5 py-0.5 text-[10px] uppercase font-bold tracking-widest bg-gold/15 text-bronze-dark rounded-full">
                Atelier Circle
              </span>
            </div>
            <p className="text-xs text-taupe-dark font-mono">{user.email}</p>
            <div className="flex items-center gap-3 pt-1 text-xs text-charcoal-700">
              <span>Active Mood: <strong className="capitalize text-charcoal-900">{user.preferences.activeMood}</strong></span>
              <span>•</span>
              <span>Saved Looks: <strong className="text-charcoal-900">{user.savedLooks.length}</strong></span>
              <span>•</span>
              <span>Wishlist: <strong className="text-charcoal-900">{user.wishlist.length}</strong></span>
            </div>
          </div>
        </div>

        <button
          onClick={logout}
          className="self-start md:self-auto px-4 py-2 rounded-xl border border-sand hover:bg-sand text-xs text-charcoal-700 font-medium transition-colors"
        >
          Sign Out
        </button>
      </div>

      {/* 2. Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-sand pb-3 overflow-x-auto no-scrollbar">
        {[
          { id: 'saved-looks', label: 'Saved Looks', icon: Bookmark, count: user.savedLooks.length },
          { id: 'wishlist', label: 'Wishlist', icon: Heart, count: user.wishlist.length },
          { id: 'preferences', label: 'My Style Persona', icon: Sliders },
          { id: 'orders', label: 'Order History', icon: Clock, count: user.orderHistory.length },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-xs uppercase font-semibold tracking-wider whitespace-nowrap transition-all ${
                isActive
                  ? 'bg-charcoal-900 text-ivory-50 shadow-subtle'
                  : 'bg-white border border-sand hover:bg-sand text-charcoal-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.count !== undefined && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] ${
                  isActive ? 'bg-white/20 text-white' : 'bg-sand text-charcoal-800'
                }`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* 3. Tab Contents */}

      {/* TAB A: SAVED LOOKS (From Complete My Look) */}
      {activeTab === 'saved-looks' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-2xl text-charcoal-900">Your Styled Outfits</h3>
              <p className="text-xs text-taupe-dark">Custom lookbooks assembled with Complete My Look</p>
            </div>
            <Link
              to="/complete-look"
              className="text-xs uppercase font-semibold text-charcoal-800 hover:text-charcoal-900 underline flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>Open Styling Studio</span>
            </Link>
          </div>

          {user.savedLooks.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-sand p-8 space-y-3">
              <Bookmark className="w-10 h-10 text-taupe-dark mx-auto" />
              <h4 className="font-serif text-xl text-charcoal-900">No saved looks yet</h4>
              <p className="text-xs text-taupe-dark max-w-sm mx-auto">
                Explore any product and click "Complete My Look" to customize and save your dream outfits.
              </p>
              <Link
                to="/complete-look"
                className="inline-block px-5 py-2.5 rounded-full bg-charcoal-900 text-ivory-50 text-xs uppercase tracking-wider font-semibold"
              >
                Style an Outfit Now
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {user.savedLooks.map(look => {
                const allItems = [look.heroProduct, ...look.complementaryProducts];
                return (
                  <div key={look.id} className="p-6 bg-white rounded-3xl border border-sand shadow-soft flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-taupe-dark">Lookbook #{look.id.slice(-4)}</span>
                          <h4 className="font-serif text-xl text-charcoal-900">{look.title}</h4>
                          <span className="text-xs text-taupe-dark">Created on {look.createdAt}</span>
                        </div>
                        <button
                          onClick={() => removeSavedLook(look.id)}
                          className="text-taupe-dark hover:text-rose-600 transition-colors p-1"
                          title="Delete saved look"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Items Gallery Horizontal */}
                      <div className="flex gap-2.5 mt-4 overflow-x-auto pb-2">
                        {allItems.map((item, idx) => (
                          <div key={item.productId} className="w-20 rounded-xl overflow-hidden bg-sand-light shrink-0 border border-sand text-center">
                            <img src={item.images[0]} alt={item.name} className="w-full h-24 object-cover" />
                            <div className="p-1 bg-white">
                              <span className="text-[9px] text-taupe-dark block line-clamp-1">{idx === 0 ? 'Anchor' : item.category}</span>
                              <span className="text-[10px] font-semibold text-charcoal-900 block">${item.discountPrice || item.price}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-sand flex items-center justify-between">
                      <div>
                        <span className="text-xs text-taupe-dark">Bundle Price (15% Off):</span>
                        <div className="font-serif text-2xl font-bold text-charcoal-900">${look.discountedTotal}</div>
                      </div>

                      <button
                        onClick={() => addCompleteLookToCart(allItems)}
                        className="px-5 py-2.5 rounded-full bg-charcoal-900 hover:bg-charcoal-800 text-ivory-50 text-xs uppercase tracking-wider font-semibold transition-colors flex items-center gap-2 shadow-subtle"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 text-gold" />
                        <span>Add Entire Look to Bag</span>
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB B: WISHLIST */}
      {activeTab === 'wishlist' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-2xl text-charcoal-900">Personal Wishlist</h3>
              <p className="text-xs text-taupe-dark">{wishlistProducts.length} saved favorites</p>
            </div>
          </div>

          {wishlistProducts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-sand p-8 space-y-3">
              <Heart className="w-10 h-10 text-taupe-dark mx-auto" />
              <h4 className="font-serif text-xl text-charcoal-900">Your wishlist is empty</h4>
              <p className="text-xs text-taupe-dark max-w-sm mx-auto">
                Save pieces as you explore our catalogue to review and style later.
              </p>
              <Link
                to="/shop"
                className="inline-block px-5 py-2.5 rounded-full bg-charcoal-900 text-ivory-50 text-xs uppercase tracking-wider font-semibold"
              >
                Explore Catalogue
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {wishlistProducts.map(product => (
                <ProductCard key={product.productId} product={product} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB C: PREFERENCES (MY STYLE PERSONA) */}
      {activeTab === 'preferences' && (
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-sand shadow-soft space-y-10">
          <div>
            <h3 className="font-serif text-2xl text-charcoal-900">My Style Persona & Preferences</h3>
            <p className="text-xs text-taupe-dark">These settings directly tune the recommendation engine and Complete My Look combinations.</p>
          </div>

          {/* Active Mood Selection */}
          <div>
            <span className="text-xs uppercase font-semibold text-charcoal-800 tracking-wider block mb-3">
              Current Default Mood:
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {MOODS.map(m => {
                const isSelected = user.preferences.activeMood === m.id;
                return (
                  <button
                    key={m.id}
                    onClick={() => {
                      updatePreferences({ activeMood: m.id });
                      setActiveMood(m.id);
                    }}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      isSelected
                        ? 'border-charcoal-900 bg-sand/60 ring-2 ring-charcoal-900 font-semibold'
                        : 'border-sand bg-sand-light/30 hover:bg-white text-charcoal-700'
                    }`}
                  >
                    <span className="capitalize text-xs block">{m.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Favorite Aesthetics */}
          <div className="pt-6 border-t border-sand">
            <span className="text-xs uppercase font-semibold text-charcoal-800 tracking-wider block mb-3">
              Favorite Aesthetics:
            </span>
            <div className="flex flex-wrap gap-2">
              {AESTHETICS.map(aes => {
                const isSelected = user.preferences.favoriteAesthetics.includes(aes.id);
                return (
                  <button
                    key={aes.id}
                    onClick={() => {
                      const current = user.preferences.favoriteAesthetics;
                      const next = isSelected ? current.filter(x => x !== aes.id) : [...current, aes.id];
                      updatePreferences({ favoriteAesthetics: next });
                    }}
                    className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all flex items-center gap-2 ${
                      isSelected
                        ? 'bg-charcoal-900 text-ivory-50'
                        : 'bg-sand-light border border-sand text-charcoal-800'
                    }`}
                  >
                    {isSelected && <Check className="w-3.5 h-3.5 text-gold" />}
                    <span>{aes.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Preferred Colors */}
          <div className="pt-6 border-t border-sand">
            <span className="text-xs uppercase font-semibold text-charcoal-800 tracking-wider block mb-3">
              Preferred Color Palette:
            </span>
            <div className="flex flex-wrap gap-2">
              {COLOR_PALETTES.map(col => {
                const isSelected = user.preferences.preferredColors.includes(col.hex);
                return (
                  <button
                    key={col.hex}
                    onClick={() => {
                      const current = user.preferences.preferredColors;
                      const next = isSelected ? current.filter(x => x !== col.hex) : [...current, col.hex];
                      updatePreferences({ preferredColors: next });
                    }}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs transition-all ${
                      isSelected
                        ? 'border-charcoal-900 bg-sand font-semibold'
                        : 'border-sand bg-white text-charcoal-700'
                    }`}
                  >
                    <span className="w-3.5 h-3.5 rounded-full border border-sand" style={{ backgroundColor: col.hex }} />
                    <span>{col.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>
      )}

      {/* TAB D: ORDER HISTORY */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-2xl text-charcoal-900">Your Atelier Order History</h3>
              <p className="text-xs text-taupe-dark">All previous acquisitions and shipments</p>
            </div>
          </div>

          <div className="space-y-4">
            {user.orderHistory.map(order => (
              <div key={order.id} className="p-6 bg-white rounded-3xl border border-sand shadow-soft space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-sand pb-4 gap-2">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-taupe-dark font-medium">Order Number</span>
                    <h5 className="font-serif text-base font-semibold text-charcoal-900">{order.orderNumber}</h5>
                    <span className="text-xs text-taupe-dark">Placed on {order.createdAt}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      {order.status}
                    </span>
                    <span className="font-serif text-lg font-bold text-charcoal-900">
                      ${order.totalAmount.toFixed(0)}
                    </span>
                  </div>
                </div>

                <div className="text-xs text-charcoal-600 space-y-1">
                  <p><strong>Shipping to:</strong> {order.shippingAddress.fullName}, {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.country}</p>
                  <p><strong>Payment:</strong> {order.paymentMethod}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};

