import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  ChevronRight, 
  Compass, 
  Layers, 
  SlidersHorizontal,
  Flame,
  CheckCircle2,
  TrendingUp,
  Star
} from 'lucide-react';
import { MOODS } from '../data/moods';
import { AESTHETICS, OCCASIONS } from '../data/aesthetics';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/common/ProductCard';
import { useShopping } from '../context/ShoppingContext';
import { useAuth } from '../context/AuthContext';
import { getPersonalizedRecommendations } from '../utils/recommendations';
import { MoodType } from '../types';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { activeMood, setActiveMood, openCompleteMyLook } = useShopping();
  const { user } = useAuth();

  // Active mood state for the interactive "What's Your Mood Today?" section
  const [selectedHomeMood, setSelectedHomeMood] = useState<MoodType>(activeMood || 'elegant');

  // Filter products for the selected mood
  const moodProducts = PRODUCTS.filter(p => p.moodTags.includes(selectedHomeMood));
  const currentMoodObj = MOODS.find(m => m.id === selectedHomeMood) || MOODS[0];

  // Hero feature product for Complete My Look spotlight
  const signatureLookHero = PRODUCTS.find(p => p.productId === 'prod-001') || PRODUCTS[0];
  const signatureShoes = PRODUCTS.find(p => p.productId === 'prod-011');
  const signatureBag = PRODUCTS.find(p => p.productId === 'prod-015');
  const signatureJewellery = PRODUCTS.find(p => p.productId === 'prod-019');

  // Smart personalized recommendations based on profile
  const personalizedList = user 
    ? getPersonalizedRecommendations(PRODUCTS, user.preferences, user.recentlyViewed)
    : PRODUCTS.slice(0, 8);

  // Editorial collections
  const editorialCollections = [
    {
      title: 'The Elegant Edit',
      desc: 'Fluid silk, immaculate tailoring, and sculptural accents.',
      image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
      tag: 'The Elegant Edit'
    },
    {
      title: 'Minimal Wardrobe',
      desc: 'Purity of silhouette, monochromatic serenity, and organic textures.',
      image: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=800&q=80',
      tag: 'Minimal Wardrobe'
    },
    {
      title: 'Party Ready',
      desc: 'Light-catching sequins, stiletto lines, and midnight glamour.',
      image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80',
      tag: 'Party Ready'
    },
    {
      title: 'Everyday Essentials',
      desc: 'Crisp poplin shirting, tailored denim, and understated luxury.',
      image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80',
      tag: 'Everyday Essentials'
    }
  ];

  return (
    <div className="space-y-24 sm:space-y-32 pb-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-ivory-100/60 pt-6">
        {/* Ambient atmospheric aura blur */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-amber-200/20 via-rose-100/30 to-sand/40 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content (7 cols) */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-sand shadow-subtle backdrop-blur-sm">
                <Sparkles className="w-4 h-4 text-gold" />
                <span className="text-xs uppercase font-sans tracking-[0.2em] font-semibold text-charcoal-800">
                  A New Era of Fashion Discovery
                </span>
              </div>

              <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-charcoal-900 leading-[1.1] font-normal">
                Shopping That <br />
                <span className="italic font-serif font-light text-charcoal-700">Feels Like</span> <span className="underline decoration-gold/60 underline-offset-8">YOU.</span>
              </h1>

              <p className="font-sans text-base sm:text-lg text-charcoal-600 max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
                Discover your mood. Find your style. Complete your look. An intelligent personal atelier pairing your emotions with handcrafted fashion.
              </p>

              {/* Primary & Secondary CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Link
                  to="/moods"
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-charcoal-900 hover:bg-charcoal-800 text-ivory-50 text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-elevated flex items-center justify-center gap-3 group"
                >
                  <Sparkles className="w-4 h-4 text-gold group-hover:rotate-12 transition-transform" />
                  <span>Explore Your Mood</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/style-discovery"
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-white hover:bg-sand-light text-charcoal-900 border border-sand-dark text-xs uppercase tracking-widest font-semibold transition-all duration-300 shadow-subtle flex items-center justify-center gap-2"
                >
                  <Compass className="w-4 h-4 text-taupe-dark" />
                  <span>Discover Your Style</span>
                </Link>
              </div>

              {/* Quick Mood Pills Bar in Hero */}
              <div className="pt-6 border-t border-sand/60">
                <span className="text-[11px] uppercase tracking-wider text-taupe-dark block mb-2.5 font-medium">
                  Quick Mood Select:
                </span>
                <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                  {MOODS.slice(0, 6).map(m => (
                    <button
                      key={m.id}
                      onClick={() => {
                        setSelectedHomeMood(m.id);
                        setActiveMood(m.id);
                      }}
                      className={`px-3 py-1 rounded-full text-xs transition-all ${
                        selectedHomeMood === m.id
                          ? 'bg-charcoal-900 text-ivory-50 font-medium scale-105 shadow-subtle'
                          : 'bg-white/80 hover:bg-white text-charcoal-700 border border-sand'
                      }`}
                    >
                      {m.name}
                    </button>
                  ))}
                  <Link 
                    to="/moods" 
                    className="px-3 py-1 rounded-full text-xs text-bronze-dark font-medium hover:underline flex items-center gap-1"
                  >
                    +4 more
                  </Link>
                </div>
              </div>
            </div>

            {/* Right Editorial Photography Grid (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Main Hero Portrait */}
                <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border-2 border-white">
                  <img
                    src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80"
                    alt="High fashion editorial model"
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <span className="px-2.5 py-1 text-[10px] uppercase font-bold tracking-widest bg-white/20 backdrop-blur-md rounded-full mb-2 inline-block">
                      Autumn / Winter 2026
                    </span>
                    <h3 className="font-serif text-2xl font-light">The Mood-Driven Atelier</h3>
                    <p className="text-xs text-ivory-300 mt-1">Curated around your emotional frequency.</p>
                  </div>
                </div>

                {/* Floating "Complete My Look" Floating Interactive Teaser */}
                <div 
                  onClick={() => openCompleteMyLook(signatureLookHero)}
                  className="cursor-pointer absolute -bottom-8 -left-6 sm:-left-8 bg-white p-4 rounded-2xl shadow-elevated border border-sand max-w-[260px] animate-bounce-subtle hover:scale-105 transition-transform"
                >
                  <div className="flex items-center gap-2.5 mb-2">
                    <div className="w-8 h-8 rounded-full bg-gold/15 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-gold" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-taupe-dark font-semibold block">Signature Feature</span>
                      <span className="font-serif text-xs font-semibold text-charcoal-900">Complete My Look</span>
                    </div>
                  </div>
                  <p className="text-[11px] text-charcoal-600 line-clamp-2">
                    "Select one hero piece — our engine harmonizes matching shoes, bag & jewelry."
                  </p>
                  <div className="mt-2 text-[10px] uppercase tracking-wider font-bold text-bronze-dark flex items-center gap-1">
                    <span>Try Look Studio</span>
                    <ChevronRight className="w-3 h-3" />
                  </div>
                </div>

                {/* Floating Mood Badge */}
                <div className="absolute -top-4 -right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full border border-sand shadow-soft flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                  <span className="text-xs font-medium text-charcoal-800">10 Moods Live</span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. FEATURE 1: MOOD-BASED SHOPPING (PRIMARY FEATURE) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sand/60 text-xs font-semibold uppercase tracking-widest text-charcoal-800 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-gold" />
            <span>Primary Feature</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-charcoal-900 font-normal">
            What's Your Mood Today?
          </h2>
          <p className="font-sans text-sm sm:text-base text-charcoal-600 mt-3 font-light leading-relaxed">
            Select how you want to feel. The platform dynamically recalibrates every recommendation, color palette, and garment cut to embody your chosen state of mind.
          </p>
        </div>

        {/* 10 Moods Selector Tabs (Horizontal Cards) */}
        <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2.5 mb-10">
          {MOODS.map(mood => {
            const isSelected = selectedHomeMood === mood.id;
            return (
              <button
                key={mood.id}
                onClick={() => {
                  setSelectedHomeMood(mood.id);
                  setActiveMood(mood.id);
                }}
                className={`group flex flex-col items-center p-2.5 rounded-2xl border transition-all duration-300 relative text-center ${
                  isSelected
                    ? 'bg-charcoal-900 text-ivory-50 border-charcoal-900 shadow-elevated scale-105'
                    : 'bg-white hover:bg-sand-light border-sand text-charcoal-800 hover:border-taupe'
                }`}
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden mb-2 relative">
                  <img
                    src={mood.image}
                    alt={mood.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {isSelected && (
                    <div className="absolute inset-0 bg-charcoal-900/30 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-gold"></div>
                    </div>
                  )}
                </div>
                <span className="font-serif text-xs font-semibold capitalize tracking-wide">
                  {mood.name}
                </span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Mood Atmosphere Showcase Box */}
        <div className={`rounded-3xl p-6 sm:p-10 border border-sand shadow-soft transition-all duration-500 mb-12 bg-gradient-to-r ${currentMoodObj.auraGradient} relative overflow-hidden`}>
          <div className="max-w-3xl space-y-3 relative z-10">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-white/80 backdrop-blur-sm text-[11px] uppercase tracking-wider font-bold text-charcoal-900 shadow-subtle">
                Active Mood: {currentMoodObj.name}
              </span>
              <span className="text-xs text-charcoal-700 font-serif italic">
                {currentMoodObj.tagline}
              </span>
            </div>
            
            <p className="font-serif italic text-lg sm:text-2xl text-charcoal-900 font-light">
              {currentMoodObj.quote}
            </p>

            <p className="text-xs sm:text-sm text-charcoal-700 max-w-2xl font-light">
              {currentMoodObj.description}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-semibold text-charcoal-800 uppercase tracking-wider">
                Stylist Focus:
              </span>
              {currentMoodObj.recommendedKeywords.map(kw => (
                <span key={kw} className="px-2.5 py-0.5 rounded-full bg-white/90 text-charcoal-800 text-[11px] font-medium shadow-subtle">
                  {kw}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Dynamic Product Recommendations for Selected Mood */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-serif text-2xl text-charcoal-900">
                Curated For Your <span className="capitalize">{selectedHomeMood}</span> Mood
              </h3>
              <p className="text-xs text-taupe-dark">
                Displaying {moodProducts.length} tailored pieces synchronized with your current selection
              </p>
            </div>

            <Link
              to={`/moods?mood=${selectedHomeMood}`}
              className="px-5 py-2.5 rounded-full bg-charcoal-900 hover:bg-charcoal-800 text-ivory-50 text-xs uppercase tracking-wider font-semibold transition-colors flex items-center gap-2 shadow-subtle"
            >
              <span>Explore My Mood</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {moodProducts.slice(0, 8).map(product => (
              <ProductCard key={product.productId} product={product} />
            ))}
          </div>
        </div>

      </section>

      {/* 3. FEATURE 5: COMPLETE MY LOOK (SIGNATURE FEATURE SPOTLIGHT) */}
      <section className="bg-sand-light/60 py-20 border-y border-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-sand text-xs font-semibold uppercase tracking-widest text-charcoal-900 mb-3 shadow-subtle">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>Signature Feature</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-charcoal-900 font-normal">
              Complete My Look
            </h2>
            <p className="font-serif italic text-lg sm:text-xl text-charcoal-700 mt-2">
              "Love one piece? Let us style the rest."
            </p>
            <p className="font-sans text-xs sm:text-sm text-charcoal-600 mt-2 font-light max-w-xl mx-auto">
              Select any garment or accessory, and our intelligent styling algorithm instantly curates matching clothing, footwear, bags, and jewelry into a harmonized ensemble with a 15% look discount.
            </p>
          </div>

          {/* Interactive Styling Showcase Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-sand shadow-elevated">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Core Anchor Product Showcase (5 cols) */}
              <div className="lg:col-span-5 relative">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-sand-light relative shadow-soft">
                  <img
                    src={signatureLookHero.images[0]}
                    alt={signatureLookHero.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-charcoal-900 text-ivory-50 text-[10px] uppercase font-bold tracking-wider shadow-subtle">
                    Anchor Piece
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 via-black/30 to-transparent text-white">
                    <span className="text-[10px] uppercase tracking-wider text-gold font-semibold">{signatureLookHero.brand}</span>
                    <h4 className="font-serif text-lg">{signatureLookHero.name}</h4>
                    <p className="text-xs text-ivory-200 mt-0.5">${signatureLookHero.discountPrice || signatureLookHero.price}</p>
                  </div>
                </div>
              </div>

              {/* Complementary Products Curated Live (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="flex items-center gap-2 text-xs font-serif uppercase tracking-widest text-charcoal-800 mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-gold" />
                    <span>Algorithmic Harmony Matrix</span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl text-charcoal-900">
                    The Evening Silk Gala Capsule
                  </h3>
                  <p className="text-xs text-charcoal-600 font-light mt-1">
                    Engineered to complement the drape of mulberry silk with handcrafted Italian pumps, structured leather, and heirloom baroque pearls.
                  </p>
                </div>

                {/* 3 Complementary Matching Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                  
                  {signatureShoes && (
                    <div className="p-3 rounded-2xl border border-sand bg-sand-light/40 flex flex-col justify-between">
                      <div className="aspect-square rounded-xl overflow-hidden bg-white mb-2">
                        <img src={signatureShoes.images[0]} alt={signatureShoes.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <span className="text-[9px] uppercase tracking-wider font-semibold text-taupe-dark">1. Footwear</span>
                        <h5 className="font-serif text-xs text-charcoal-900 line-clamp-1">{signatureShoes.name}</h5>
                        <span className="text-xs font-semibold text-charcoal-900">${signatureShoes.discountPrice || signatureShoes.price}</span>
                      </div>
                    </div>
                  )}

                  {signatureBag && (
                    <div className="p-3 rounded-2xl border border-sand bg-sand-light/40 flex flex-col justify-between">
                      <div className="aspect-square rounded-xl overflow-hidden bg-white mb-2">
                        <img src={signatureBag.images[0]} alt={signatureBag.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <span className="text-[9px] uppercase tracking-wider font-semibold text-taupe-dark">2. Leather Bag</span>
                        <h5 className="font-serif text-xs text-charcoal-900 line-clamp-1">{signatureBag.name}</h5>
                        <span className="text-xs font-semibold text-charcoal-900">${signatureBag.discountPrice || signatureBag.price}</span>
                      </div>
                    </div>
                  )}

                  {signatureJewellery && (
                    <div className="p-3 rounded-2xl border border-sand bg-sand-light/40 flex flex-col justify-between">
                      <div className="aspect-square rounded-xl overflow-hidden bg-white mb-2">
                        <img src={signatureJewellery.images[0]} alt={signatureJewellery.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <span className="text-[9px] uppercase tracking-wider font-semibold text-taupe-dark">3. Heirloom Jewellery</span>
                        <h5 className="font-serif text-xs text-charcoal-900 line-clamp-1">{signatureJewellery.name}</h5>
                        <span className="text-xs font-semibold text-charcoal-900">${signatureJewellery.discountPrice || signatureJewellery.price}</span>
                      </div>
                    </div>
                  )}

                </div>

                {/* Bundle Action Bar */}
                <div className="pt-4 border-t border-sand flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs text-taupe-dark">Complete 4-Piece Look:</span>
                      <span className="font-serif text-2xl font-bold text-charcoal-900">$1,044</span>
                      <span className="text-xs line-through text-taupe-dark">$1,228</span>
                    </div>
                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                      15% Complete Look Savings Applied (-$184)
                    </span>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <button
                      onClick={() => openCompleteMyLook(signatureLookHero)}
                      className="flex-1 sm:flex-initial px-6 py-3.5 rounded-full bg-charcoal-900 hover:bg-charcoal-800 text-ivory-50 text-xs uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-2 shadow-soft"
                    >
                      <Sparkles className="w-4 h-4 text-gold" />
                      <span>Open Look Studio</span>
                    </button>
                    
                    <Link
                      to="/complete-look"
                      className="px-4 py-3.5 rounded-full border border-sand-dark hover:bg-sand text-charcoal-900 text-xs font-semibold uppercase tracking-wider transition-colors"
                    >
                      Browse All Looks
                    </Link>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 4. FEATURE 2: DISCOVER YOUR STYLE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sand/60 text-xs font-semibold uppercase tracking-widest text-charcoal-800 mb-2">
              <Compass className="w-3.5 h-3.5 text-taupe-dark" />
              <span>Feature 2</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl text-charcoal-900 font-normal">
              Find Your Aesthetic
            </h2>
            <p className="font-sans text-xs sm:text-sm text-charcoal-600 mt-2 font-light">
              Explore your personal style DNA across Old Money, Clean Girl, Dark Academia, Quiet Luxury, and more.
            </p>
          </div>

          <Link
            to="/style-discovery"
            className="inline-flex items-center gap-2 text-xs uppercase font-semibold tracking-wider text-charcoal-900 hover:text-bronze underline underline-offset-4"
          >
            <span>Take the Interactive Stylist Quiz</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Aesthetic Cards Gallery */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {AESTHETICS.slice(0, 5).map(aesthetic => (
            <Link
              key={aesthetic.id}
              to={`/shop?aesthetic=${aesthetic.id}`}
              className="group relative rounded-2xl overflow-hidden aspect-[3/4] border border-sand shadow-subtle"
            >
              <img
                src={aesthetic.image}
                alt={aesthetic.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              
              <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                <span className="text-[9px] uppercase tracking-widest text-ivory-300 font-medium">Aesthetic Edit</span>
                <h4 className="font-serif text-base sm:text-lg font-medium">{aesthetic.name}</h4>
                <p className="text-[10px] text-ivory-300 line-clamp-1 mt-0.5">{aesthetic.tagline}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Occasion Discovery Pills */}
        <div className="mt-8 pt-8 border-t border-sand flex items-center justify-between flex-wrap gap-4">
          <span className="text-xs uppercase font-serif tracking-wider text-charcoal-800">
            Discover by Occasion:
          </span>
          <div className="flex flex-wrap gap-2">
            {OCCASIONS.map(occ => (
              <Link
                key={occ.id}
                to={`/shop?occasion=${occ.id}`}
                className="px-3 py-1.5 rounded-full bg-white border border-sand hover:border-charcoal-900 text-xs text-charcoal-700 hover:text-charcoal-900 transition-colors shadow-subtle"
              >
                {occ.name}
              </Link>
            ))}
          </div>
        </div>

      </section>

      {/* 5. FEATURE 3: SMART PRODUCT RECOMMENDATIONS ("Picked Just for You") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-taupe-dark font-medium mb-1">
              <Star className="w-3.5 h-3.5 text-gold fill-current" />
              <span>Smart Recommendation Engine</span>
            </div>
            <h2 className="font-serif text-3xl text-charcoal-900 font-normal">
              Picked Just for You
            </h2>
            <p className="text-xs text-taupe-dark">
              Scored via your mood affinity ({selectedHomeMood}), browsing history, and style tags.
            </p>
          </div>

          <Link
            to="/shop"
            className="text-xs uppercase font-semibold tracking-wider text-charcoal-800 hover:text-charcoal-900 underline"
          >
            View Full Catalogue
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {personalizedList.slice(0, 4).map(product => (
            <ProductCard key={product.productId} product={product} />
          ))}
        </div>

      </section>

      {/* 6. FEATURE 4: INTERACTIVE EDITORIAL COLLECTIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs uppercase font-sans tracking-widest text-taupe-dark font-medium block mb-1">
            Visual Storytelling
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-charcoal-900 font-normal">
            Curated Editorial Collections
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-600 font-light mt-2">
            Fashion stories designed like an atelier lookbook. Explore seasonal edits crafted with uncompromised artistry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {editorialCollections.map(col => (
            <Link
              key={col.title}
              to={`/shop?collection=${encodeURIComponent(col.tag)}`}
              className="group relative rounded-3xl overflow-hidden aspect-[4/5] border border-sand shadow-soft flex flex-col justify-end p-6"
            >
              <img
                src={col.image}
                alt={col.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              
              <div className="relative z-10 text-white space-y-1">
                <span className="text-[10px] uppercase tracking-widest text-gold font-semibold">Editorial</span>
                <h4 className="font-serif text-xl font-normal group-hover:translate-x-1 transition-transform">{col.title}</h4>
                <p className="text-xs text-ivory-200 line-clamp-2 font-light">{col.desc}</p>
                <div className="pt-2 text-[10px] uppercase tracking-wider font-semibold text-ivory-100 flex items-center gap-1 group-hover:text-gold transition-colors">
                  <span>Explore Collection</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </Link>
          ))}
        </div>

      </section>

    </div>
  );
};

