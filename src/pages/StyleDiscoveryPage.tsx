import React, { useState } from 'react';
import { 
  Sparkles, 
  Check, 
  Compass, 
  Palette, 
  Calendar, 
  Sliders, 
  ArrowRight,
  RotateCcw
} from 'lucide-react';
import { AESTHETICS, OCCASIONS, COLOR_PALETTES } from '../data/aesthetics';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/common/ProductCard';
import { AestheticType, OccasionType } from '../types';
import { useAuth } from '../context/AuthContext';

export const StyleDiscoveryPage: React.FC = () => {
  const { user, updatePreferences } = useAuth();

  // Multi-select state
  const [selectedAesthetics, setSelectedAesthetics] = useState<AestheticType[]>(
    user?.preferences.favoriteAesthetics || ['old-money', 'quiet-luxury']
  );
  const [selectedOccasions, setSelectedOccasions] = useState<OccasionType[]>(
    user?.preferences.occasions || ['date-night', 'office']
  );
  const [selectedColors, setSelectedColors] = useState<string[]>(
    user?.preferences.preferredColors || ['#1C1917', '#F5F2EB']
  );
  const [maxBudget, setMaxBudget] = useState<number>(500);

  // Toggle helpers
  const toggleAesthetic = (id: AestheticType) => {
    setSelectedAesthetics(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      updatePreferences({ favoriteAesthetics: next });
      return next;
    });
  };

  const toggleOccasion = (id: OccasionType) => {
    setSelectedOccasions(prev => {
      const next = prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id];
      updatePreferences({ occasions: next });
      return next;
    });
  };

  const toggleColor = (hex: string) => {
    setSelectedColors(prev => {
      const next = prev.includes(hex) ? prev.filter(x => x !== hex) : [...prev, hex];
      updatePreferences({ preferredColors: next });
      return next;
    });
  };

  const handleReset = () => {
    setSelectedAesthetics(['old-money']);
    setSelectedOccasions(['date-night']);
    setSelectedColors(['#1C1917']);
    setMaxBudget(500);
  };

  // Personalized collection scoring and filtering based on user selections
  const personalizedCollection = PRODUCTS.filter(p => {
    const effectivePrice = p.discountPrice || p.price;
    if (effectivePrice > maxBudget) return false;

    // Check if matches at least one selected aesthetic if any selected
    if (selectedAesthetics.length > 0) {
      const hasAesthetic = p.aestheticTags.some(tag => selectedAesthetics.includes(tag));
      if (!hasAesthetic) return false;
    }

    // Check occasion
    if (selectedOccasions.length > 0) {
      const hasOccasion = p.occasionTags.some(tag => selectedOccasions.includes(tag));
      if (!hasOccasion) return false;
    }

    return true;
  }).sort((a, b) => {
    // Rank by number of matching aesthetic tags + ratings
    const scoreA = a.aestheticTags.filter(t => selectedAesthetics.includes(t)).length * 10 + a.rating;
    const scoreB = b.aestheticTags.filter(t => selectedAesthetics.includes(t)).length * 10 + b.rating;
    return scoreB - scoreA;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* 1. Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sand text-xs uppercase font-sans tracking-widest text-charcoal-800 font-semibold">
          <Compass className="w-3.5 h-3.5 text-taupe-dark" />
          <span>Interactive Style Discovery</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl text-charcoal-900 font-normal">
          Find Your Aesthetic
        </h1>
        <p className="text-sm text-charcoal-600 font-light max-w-xl mx-auto">
          Mix and match personal aesthetics, upcoming occasions, color palettes, and spending comfort. We tailor an exclusive lookbook designed for your lifestyle.
        </p>
      </div>

      {/* 2. Interactive Discovery Control Console */}
      <div className="p-6 sm:p-10 bg-white rounded-3xl border border-sand shadow-elevated space-y-10">
        
        {/* Step 1: Aesthetics (10 choices) */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-xs uppercase font-serif tracking-widest text-taupe-dark">Step 01</span>
              <h3 className="font-serif text-xl sm:text-2xl text-charcoal-900">Select Your Favorite Aesthetics</h3>
              <p className="text-xs text-charcoal-500">Choose one or more fashion aesthetics that match your wardrobe aspirations</p>
            </div>
            <span className="text-xs text-charcoal-700 bg-sand px-3 py-1 rounded-full font-semibold">
              {selectedAesthetics.length} selected
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {AESTHETICS.map(aes => {
              const isSelected = selectedAesthetics.includes(aes.id);
              return (
                <div
                  key={aes.id}
                  onClick={() => toggleAesthetic(aes.id)}
                  className={`cursor-pointer rounded-2xl overflow-hidden border transition-all duration-200 relative group ${
                    isSelected
                      ? 'border-charcoal-900 ring-2 ring-charcoal-900 shadow-soft scale-102'
                      : 'border-sand opacity-80 hover:opacity-100 hover:border-taupe'
                  }`}
                >
                  <div className="aspect-[4/3] w-full overflow-hidden bg-sand-light relative">
                    <img src={aes.image} alt={aes.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    {isSelected && (
                      <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-charcoal-900 text-ivory-50 flex items-center justify-center">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>
                  <div className="p-3 bg-white">
                    <h5 className="font-serif text-sm text-charcoal-900 font-medium">{aes.name}</h5>
                    <p className="text-[10px] text-taupe-dark line-clamp-1 mt-0.5">{aes.tagline}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Step 2: Occasions (8 choices) */}
        <div className="pt-8 border-t border-sand">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-xs uppercase font-serif tracking-widest text-taupe-dark">Step 02</span>
              <h3 className="font-serif text-xl sm:text-2xl text-charcoal-900">Where Are You Going? (Occasions)</h3>
              <p className="text-xs text-charcoal-500">Pick the settings you are dressing for right now</p>
            </div>
            <span className="text-xs text-charcoal-700 bg-sand px-3 py-1 rounded-full font-semibold">
              {selectedOccasions.length} selected
            </span>
          </div>

          <div className="flex flex-wrap gap-2.5">
            {OCCASIONS.map(occ => {
              const isSelected = selectedOccasions.includes(occ.id);
              return (
                <button
                  key={occ.id}
                  onClick={() => toggleOccasion(occ.id)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase transition-all flex items-center gap-2 ${
                    isSelected
                      ? 'bg-charcoal-900 text-ivory-50 shadow-subtle'
                      : 'bg-sand-light border border-sand hover:border-charcoal-800 text-charcoal-800'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 text-gold" />}
                  <span>{occ.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 3: Color Palette & Budget */}
        <div className="pt-8 border-t border-sand grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          
          {/* Colors */}
          <div>
            <span className="text-xs uppercase font-serif tracking-widest text-taupe-dark">Step 03</span>
            <h4 className="font-serif text-lg text-charcoal-900 mb-1">Preferred Color Palette</h4>
            <p className="text-xs text-charcoal-500 mb-3">Filter by tones you love to wear</p>

            <div className="flex flex-wrap gap-2">
              {COLOR_PALETTES.map(col => {
                const isSelected = selectedColors.includes(col.hex);
                return (
                  <button
                    key={col.hex}
                    onClick={() => toggleColor(col.hex)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs transition-all ${
                      isSelected
                        ? 'border-charcoal-900 bg-sand font-semibold'
                        : 'border-sand bg-white text-charcoal-700'
                    }`}
                  >
                    <span 
                      className="w-3.5 h-3.5 rounded-full border border-sand" 
                      style={{ backgroundColor: col.hex }} 
                    />
                    <span>{col.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Budget Slider */}
          <div>
            <span className="text-xs uppercase font-serif tracking-widest text-taupe-dark">Step 04</span>
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-serif text-lg text-charcoal-900">Spending Comfort</h4>
              <span className="font-serif text-lg font-bold text-charcoal-900">Up to ${maxBudget}</span>
            </div>
            <p className="text-xs text-charcoal-500 mb-3">Adjust the slider to your ideal price ceiling</p>

            <input
              type="range"
              min="100"
              max="600"
              step="25"
              value={maxBudget}
              onChange={(e) => setMaxBudget(Number(e.target.value))}
              className="w-full accent-charcoal-900 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-taupe-dark mt-1 font-mono">
              <span>$100</span>
              <span>$350</span>
              <span>$600+</span>
            </div>
          </div>

        </div>

        {/* Action bar */}
        <div className="pt-6 border-t border-sand flex items-center justify-between">
          <button
            onClick={handleReset}
            className="text-xs text-taupe-dark hover:text-charcoal-900 underline flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Reset Stylist Inputs
          </button>
          
          <span className="text-xs font-semibold text-charcoal-800">
            {personalizedCollection.length} pieces discovered matching your persona
          </span>
        </div>

      </div>

      {/* 3. Personalized Results Gallery */}
      <div>
        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-xs uppercase tracking-widest text-taupe-dark font-medium block">
              Dynamic Lookbook Result
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-charcoal-900">
              Your Personalized Aesthetic Capsule
            </h2>
          </div>
          <span className="text-xs text-taupe-dark">
            Showing pieces tailored to your exact taste profile
          </span>
        </div>

        {personalizedCollection.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-sand p-8">
            <Sparkles className="w-8 h-8 text-taupe-dark mx-auto mb-3" />
            <h4 className="font-serif text-xl text-charcoal-900 mb-1">No products match this exact combination</h4>
            <p className="text-xs text-taupe-dark mb-4">Try selecting another aesthetic or increasing your budget.</p>
            <button
              onClick={handleReset}
              className="px-5 py-2.5 rounded-full bg-charcoal-900 text-ivory-50 text-xs uppercase tracking-wider font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {personalizedCollection.map(product => (
              <ProductCard key={product.productId} product={product} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

