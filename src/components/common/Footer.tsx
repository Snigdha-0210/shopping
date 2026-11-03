import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, Truck, RefreshCw, Heart } from 'lucide-react';
import { MOODS } from '../../data/moods';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-charcoal-900 text-ivory-100 pt-16 pb-12 border-t border-charcoal-800">
      
      {/* Guarantees bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 mb-12 border-b border-charcoal-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-full bg-charcoal-800 flex items-center justify-center shrink-0">
            <Sparkles className="w-5 h-5 text-gold" />
          </div>
          <div>
            <h5 className="font-serif text-sm text-ivory-50">Mood & Look Styling</h5>
            <p className="text-xs text-charcoal-400">Intelligent outfit harmonization</p>
          </div>
        </div>

        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-full bg-charcoal-800 flex items-center justify-center shrink-0">
            <Truck className="w-5 h-5 text-gold" />
          </div>
          <div>
            <h5 className="font-serif text-sm text-ivory-50">Express Delivery</h5>
            <p className="text-xs text-charcoal-400">Complimentary on orders over $150</p>
          </div>
        </div>

        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-full bg-charcoal-800 flex items-center justify-center shrink-0">
            <RefreshCw className="w-5 h-5 text-gold" />
          </div>
          <div>
            <h5 className="font-serif text-sm text-ivory-50">30-Day Atelier Returns</h5>
            <p className="text-xs text-charcoal-400">Pre-paid doorstep collection</p>
          </div>
        </div>

        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-full bg-charcoal-800 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5 text-gold" />
          </div>
          <div>
            <h5 className="font-serif text-sm text-ivory-50">Artisanal Provenance</h5>
            <p className="text-xs text-charcoal-400">100% certified ethical craft</p>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-charcoal-800">
        
        {/* Brand column (4 cols) */}
        <div className="md:col-span-4 space-y-4">
          <Link to="/" className="inline-block">
            <span className="font-serif text-2xl tracking-widest text-ivory-50 block">
              AURA <span className="text-gold font-light">&</span> ATELIER
            </span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-charcoal-400 block -mt-1">
              Mood & Look Atelier
            </span>
          </Link>

          <p className="text-xs text-charcoal-400 leading-relaxed max-w-sm">
            Reimagining online fashion through sensory emotional alignment. We bridge personal sentiment with intelligent styling algorithms to craft complete looks that resonate with who you are right now.
          </p>

          <div className="pt-2 text-xs text-ivory-300">
            <span className="block font-medium">Flagship Salons:</span>
            <span className="text-charcoal-400">Paris (Rue Saint-Honoré) • New York (SoHo) • Milan (Via Montenapoleone)</span>
          </div>
        </div>

        {/* Shop by Mood (2 cols) */}
        <div className="md:col-span-2 space-y-3">
          <h5 className="font-serif text-sm uppercase tracking-wider text-ivory-50">Shop by Mood</h5>
          <ul className="space-y-1.5 text-xs text-charcoal-400">
            {MOODS.slice(0, 6).map(m => (
              <li key={m.id}>
                <Link to={`/moods?mood=${m.id}`} className="hover:text-gold transition-colors capitalize">
                  {m.name} Mood
                </Link>
              </li>
            ))}
            <li>
              <Link to="/moods" className="text-gold hover:underline text-[11px] font-medium">
                View All 10 Moods →
              </Link>
            </li>
          </ul>
        </div>

        {/* Signature Features (3 cols) */}
        <div className="md:col-span-3 space-y-3">
          <h5 className="font-serif text-sm uppercase tracking-wider text-ivory-50">Atelier Services</h5>
          <ul className="space-y-1.5 text-xs text-charcoal-400">
            <li>
              <Link to="/complete-look" className="hover:text-gold transition-colors flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-gold" />
                Complete My Look Studio
              </Link>
            </li>
            <li>
              <Link to="/style-discovery" className="hover:text-gold transition-colors">
                Find Your Aesthetic Quiz
              </Link>
            </li>
            <li>
              <Link to="/shop" className="hover:text-gold transition-colors">
                The Curated Edit (All Products)
              </Link>
            </li>
            <li>
              <Link to="/profile" className="hover:text-gold transition-colors">
                Saved Outfits & Lookbook
              </Link>
            </li>
            <li>
              <Link to="/profile?tab=wishlist" className="hover:text-gold transition-colors">
                Private Wishlist
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter (3 cols) */}
        <div className="md:col-span-3 space-y-3">
          <h5 className="font-serif text-sm uppercase tracking-wider text-ivory-50">The Atelier Journal</h5>
          <p className="text-xs text-charcoal-400 leading-relaxed">
            Receive weekly mood-board inspirations, private trunk show invitations, and seasonal capsule launches.
          </p>

          {subscribed ? (
            <div className="p-3 rounded-xl bg-charcoal-800 border border-charcoal-700 text-xs text-emerald-400">
              ✓ Welcome to the Atelier Circle. Check your inbox for your 10% welcome privilege.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full bg-charcoal-800 border border-charcoal-700 rounded-xl px-3 py-2 text-xs text-ivory-50 placeholder-charcoal-500 focus:outline-none focus:border-gold"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-3 bg-ivory-50 hover:bg-gold text-charcoal-900 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5"
              >
                <span>Subscribe</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>

      </div>

      {/* Bottom Legal / Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-charcoal-500 gap-4">
        <p>© 2026 AURA & ATELIER Inc. All rights reserved. Designed with intentionality.</p>
        <div className="flex items-center gap-6">
          <span className="hover:text-ivory-300 transition-colors cursor-pointer">Privacy Policy</span>
          <span className="hover:text-ivory-300 transition-colors cursor-pointer">Terms of Service</span>
          <span className="hover:text-ivory-300 transition-colors cursor-pointer">Cookie Preferences</span>
        </div>
      </div>

    </footer>
  );
};

