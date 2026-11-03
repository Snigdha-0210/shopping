import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Sparkles, 
  ShoppingBag, 
  Heart, 
  User, 
  Search, 
  Menu, 
  X, 
  SlidersHorizontal,
  Compass
} from 'lucide-react';
import { useShopping } from '../../context/ShoppingContext';
import { useAuth } from '../../context/AuthContext';
import { MOODS } from '../../data/moods';

interface NavbarProps {
  onOpenAuth: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAuth }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { 
    activeMood, 
    setActiveMood, 
    cartCount, 
    setIsCartOpen,
    searchQuery,
    setSearchQuery
  } = useShopping();
  const { user } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moodPickerOpen, setMoodPickerOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const currentMoodObj = MOODS.find(m => m.id === activeMood) || MOODS[0];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
      setSearchOpen(false);
    }
  };

  return (
    <>
      {/* Top editorial banner */}
      <div className="bg-charcoal-900 text-ivory-100 text-xs py-2 px-4 text-center font-sans tracking-widest uppercase flex items-center justify-center gap-3">
        <span>✨ Personalize your shopping: Shop by Mood & Complete Your Look</span>
        <span className="hidden md:inline text-gold">|</span>
        <span className="hidden md:inline text-ivory-400 font-light">Complimentary express delivery on orders over $150</span>
      </div>

      {/* Main Sticky Navbar */}
      <header className="sticky top-0 z-40 glass-nav border-b border-sand/70 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Mobile menu button */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-charcoal-800 hover:text-charcoal-900 transition-colors"
                aria-label="Toggle navigation"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Left Nav links (Desktop) */}
            <nav className="hidden lg:flex items-center gap-7 text-sm tracking-wider uppercase font-medium">
              <Link 
                to="/moods" 
                className={`transition-colors py-1 border-b-2 ${
                  location.pathname.startsWith('/moods') 
                    ? 'border-charcoal-900 text-charcoal-900 font-semibold' 
                    : 'border-transparent text-charcoal-600 hover:text-charcoal-900'
                }`}
              >
                Mood Shopping
              </Link>
              
              <Link 
                to="/complete-look" 
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all text-xs font-semibold uppercase tracking-wider ${
                  location.pathname === '/complete-look'
                    ? 'bg-charcoal-900 text-ivory-50 shadow-sm'
                    : 'bg-sand/60 text-charcoal-900 hover:bg-sand'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                Complete My Look
              </Link>

              <Link 
                to="/style-discovery" 
                className={`transition-colors py-1 border-b-2 ${
                  location.pathname === '/style-discovery' 
                    ? 'border-charcoal-900 text-charcoal-900 font-semibold' 
                    : 'border-transparent text-charcoal-600 hover:text-charcoal-900'
                }`}
              >
                Find Your Aesthetic
              </Link>

              <Link 
                to="/shop" 
                className={`transition-colors py-1 border-b-2 ${
                  location.pathname === '/shop' 
                    ? 'border-charcoal-900 text-charcoal-900 font-semibold' 
                    : 'border-transparent text-charcoal-600 hover:text-charcoal-900'
                }`}
              >
                Curated Catalogue
              </Link>
            </nav>

            {/* Brand Logo (Center) */}
            <div className="flex-1 lg:flex-initial text-center lg:text-left">
              <Link to="/" className="inline-block group text-center">
                <span className="block font-serif text-2xl sm:text-3xl tracking-widest text-charcoal-900 font-normal">
                  AURA <span className="text-gold font-light">&</span> ATELIER
                </span>
                <span className="block text-[10px] uppercase tracking-[0.25em] text-taupe-dark font-sans -mt-1 group-hover:text-charcoal-800 transition-colors">
                  Mood & Look Atelier
                </span>
              </Link>
            </div>

            {/* Right Side Utility Controls */}
            <div className="flex items-center gap-3 sm:gap-4">
              
              {/* Mood Aura Pill Trigger */}
              <div className="relative">
                <button
                  onClick={() => setMoodPickerOpen(!moodPickerOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-sand bg-white/70 hover:bg-white text-xs text-charcoal-800 transition-all shadow-subtle group"
                  title="Switch your shopping mood"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-gold animate-pulse"></span>
                  <span className="hidden sm:inline text-taupe-dark">Mood:</span>
                  <span className="font-semibold capitalize text-charcoal-900">{currentMoodObj.name}</span>
                </button>

                {/* Mood Dropdown Popover */}
                {moodPickerOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-elevated border border-sand/80 p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-sand/50">
                      <span className="text-xs uppercase font-serif tracking-wider text-charcoal-800">
                        Current Mood Aura
                      </span>
                      <Link 
                        to="/moods" 
                        onClick={() => setMoodPickerOpen(false)}
                        className="text-[11px] text-taupe-dark hover:text-charcoal-900 underline"
                      >
                        View all
                      </Link>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      {MOODS.map(m => (
                        <button
                          key={m.id}
                          onClick={() => {
                            setActiveMood(m.id);
                            setMoodPickerOpen(false);
                          }}
                          className={`flex items-center gap-2 p-2 rounded-xl text-left text-xs transition-colors ${
                            activeMood === m.id
                              ? 'bg-charcoal-900 text-ivory-50 font-medium'
                              : 'hover:bg-sand/40 text-charcoal-700'
                          }`}
                        >
                          <img 
                            src={m.image} 
                            alt={m.name} 
                            className="w-6 h-6 rounded-full object-cover shrink-0" 
                          />
                          <span className="truncate">{m.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Search Toggle */}
              <button
                type="button"
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-charcoal-700 hover:text-charcoal-900 transition-colors"
                aria-label="Search items"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist Link */}
              <Link
                to="/profile?tab=wishlist"
                className="relative p-2 text-charcoal-700 hover:text-charcoal-900 transition-colors"
                aria-label="View wishlist"
              >
                <Heart className="w-5 h-5" />
                {user && user.wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-blush-dark text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {user.wishlist.length}
                  </span>
                )}
              </Link>

              {/* Cart Drawer Trigger */}
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 text-charcoal-800 hover:text-charcoal-900 transition-colors group"
                aria-label="Shopping bag"
              >
                <ShoppingBag className="w-5 h-5 group-hover:scale-105 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-charcoal-900 text-ivory-50 text-[10px] font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* User Account / Profile */}
              {user ? (
                <Link
                  to="/profile"
                  className="flex items-center gap-2 p-1.5 pl-2 rounded-full border border-sand hover:border-taupe transition-colors"
                  title="My Style Profile"
                >
                  <div className="w-6 h-6 rounded-full bg-taupe/40 text-charcoal-800 text-xs font-semibold flex items-center justify-center">
                    {user.name.charAt(0)}
                  </div>
                  <span className="hidden md:inline text-xs font-medium text-charcoal-800 max-w-[80px] truncate">
                    {user.name.split(' ')[0]}
                  </span>
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={onOpenAuth}
                  className="p-2 text-charcoal-700 hover:text-charcoal-900 transition-colors"
                  aria-label="Sign In"
                >
                  <User className="w-5 h-5" />
                </button>
              )}

            </div>
          </div>

          {/* Search Dropdown / Bar */}
          {searchOpen && (
            <div className="pb-4 pt-1 animate-in slide-in-from-top-2 duration-200">
              <form onSubmit={handleSearchSubmit} className="relative max-w-xl mx-auto">
                <input
                  type="text"
                  placeholder="Search silk gowns, linen shirts, leather loafers, mood tags..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border border-sand-dark rounded-full py-2.5 pl-11 pr-24 text-sm focus:outline-none focus:ring-1 focus:ring-charcoal-900 shadow-soft"
                  autoFocus
                />
                <Search className="w-4 h-4 text-taupe-dark absolute left-4 top-3.5" />
                <button
                  type="submit"
                  className="absolute right-2 top-1.5 px-4 py-1.5 bg-charcoal-900 text-ivory-50 text-xs rounded-full uppercase tracking-wider font-semibold hover:bg-charcoal-800 transition-colors"
                >
                  Search
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-sand bg-ivory-50 px-4 pt-3 pb-6 space-y-3">
            <Link
              to="/moods"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-serif text-charcoal-900 border-b border-sand/40"
            >
              What's Your Mood Today?
            </Link>
            <Link
              to="/complete-look"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 py-2 text-base font-serif text-charcoal-900 border-b border-sand/40"
            >
              <Sparkles className="w-4 h-4 text-gold" />
              Complete My Look Studio
            </Link>
            <Link
              to="/style-discovery"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-serif text-charcoal-900 border-b border-sand/40"
            >
              Find Your Aesthetic
            </Link>
            <Link
              to="/shop"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-serif text-charcoal-900 border-b border-sand/40"
            >
              Curated Catalogue
            </Link>
            <Link
              to="/profile"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-base font-serif text-charcoal-900 border-b border-sand/40"
            >
              User Style Profile & Saved Looks
            </Link>
          </div>
        )}
      </header>
    </>
  );
};

