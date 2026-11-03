import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Sparkles, 
  SlidersHorizontal, 
  X, 
  Check, 
  RotateCcw,
  Star,
  ChevronDown
} from 'lucide-react';
import { MOODS } from '../data/moods';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/common/ProductCard';
import { useShopping } from '../context/ShoppingContext';
import { MoodType, ProductCategory } from '../types';

export const MoodShoppingPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { activeMood, setActiveMood } = useShopping();

  // Read mood from search params if provided, otherwise activeMood
  const moodParam = (searchParams.get('mood') as MoodType) || activeMood || 'elegant';
  const [currentMood, setCurrentMood] = useState<MoodType>(moodParam);

  // Sync state when param changes
  useEffect(() => {
    if (searchParams.get('mood')) {
      setCurrentMood(searchParams.get('mood') as MoodType);
    }
  }, [searchParams]);

  // Filters
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [selectedColor, setSelectedColor] = useState<string>('all');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('recommended');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const currentMoodObj = MOODS.find(m => m.id === currentMood) || MOODS[0];

  const handleMoodSelect = (moodId: MoodType) => {
    setCurrentMood(moodId);
    setActiveMood(moodId);
    setSearchParams({ mood: moodId });
  };

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedPriceRange('all');
    setSelectedColor('all');
    setSelectedBrand('all');
    setSelectedSize('all');
    setSortBy('recommended');
  };

  // Filter products by mood + additional filter options
  const filteredProducts = PRODUCTS.filter(p => {
    // 1. Mood filter
    if (!p.moodTags.includes(currentMood)) return false;

    // 2. Category
    if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;

    // 3. Price
    const effectivePrice = p.discountPrice || p.price;
    if (selectedPriceRange === 'under-150' && effectivePrice >= 150) return false;
    if (selectedPriceRange === '150-300' && (effectivePrice < 150 || effectivePrice > 300)) return false;
    if (selectedPriceRange === 'over-300' && effectivePrice <= 300) return false;

    // 4. Color
    if (selectedColor !== 'all') {
      const hasColor = p.availableColors.some(c => c.name.toLowerCase().includes(selectedColor.toLowerCase()));
      if (!hasColor) return false;
    }

    // 5. Brand
    if (selectedBrand !== 'all' && p.brand !== selectedBrand) return false;

    // 6. Size
    if (selectedSize !== 'all' && !p.availableSizes.includes(selectedSize)) return false;

    return true;
  }).sort((a, b) => {
    const priceA = a.discountPrice || a.price;
    const priceB = b.discountPrice || b.price;
    if (sortBy === 'price-low') return priceA - priceB;
    if (sortBy === 'price-high') return priceB - priceA;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // recommended default
  });

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: 'All Categories' },
    { id: 'clothing', label: 'Clothing' },
    { id: 'footwear', label: 'Footwear' },
    { id: 'bags', label: 'Bags' },
    { id: 'jewellery', label: 'Jewellery' },
    { id: 'accessories', label: 'Accessories' },
  ];

  const brands = ['all', 'Maison Éthérée', 'Studio Élan', 'Kaufmann & Sons', 'Vesper Noir', 'Sub Rosa Street', 'Aura Joaillerie'];
  const sizes = ['all', 'XS', 'S', 'M', 'L', 'XL', '37', '38', '39', '40'];
  const colors = [
    { name: 'all', label: 'All Colors' },
    { name: 'black', label: 'Noir / Black', hex: '#1C1917' },
    { name: 'white', label: 'White / Cream', hex: '#FAF8F5' },
    { name: 'taupe', label: 'Taupe / Sand', hex: '#C4B5A5' },
    { name: 'gold', label: 'Gold / Champagne', hex: '#D4AF37' },
    { name: 'silver', label: 'Silver / Grey', hex: '#D1D5DB' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* 1. Header Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sand text-xs uppercase font-sans tracking-widest text-charcoal-800 font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-gold" />
          <span>Mood-Based Shopping</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl text-charcoal-900 font-normal">
          What's Your Mood Today?
        </h1>
        <p className="text-sm text-charcoal-600 font-light max-w-xl mx-auto">
          Select any of the 10 moods below. Product curation, cuts, fabrics, and aesthetics adjust in real time to match your emotion.
        </p>
      </div>

      {/* 2. All 10 Mood Cards Grid Selector */}
      <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-3">
        {MOODS.map(mood => {
          const isSelected = currentMood === mood.id;
          return (
            <button
              key={mood.id}
              onClick={() => handleMoodSelect(mood.id)}
              className={`group flex flex-col items-center p-3 rounded-2xl border transition-all duration-300 relative text-center ${
                isSelected
                  ? 'bg-charcoal-900 text-ivory-50 border-charcoal-900 shadow-elevated scale-105 ring-2 ring-gold'
                  : 'bg-white hover:bg-sand-light border-sand text-charcoal-800 hover:border-taupe'
              }`}
            >
              <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full overflow-hidden mb-2 relative">
                <img
                  src={mood.image}
                  alt={mood.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {isSelected && (
                  <div className="absolute inset-0 bg-charcoal-900/40 flex items-center justify-center">
                    <Check className="w-4 h-4 text-gold" />
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

      {/* 3. Detailed Dynamic Mood Hero Aura Box */}
      <div className={`rounded-3xl p-6 sm:p-10 border border-sand bg-gradient-to-r ${currentMoodObj.auraGradient} relative overflow-hidden shadow-soft`}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          
          <div className="md:col-span-8 space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-white text-xs uppercase font-bold tracking-wider text-charcoal-900 shadow-subtle">
                Active Selection: {currentMoodObj.name}
              </span>
              <span className="text-xs text-charcoal-700 italic font-serif">
                {currentMoodObj.tagline}
              </span>
            </div>

            <p className="font-serif text-2xl sm:text-3xl text-charcoal-900 font-normal leading-snug">
              {currentMoodObj.quote}
            </p>

            <p className="text-xs sm:text-sm text-charcoal-700 font-light leading-relaxed max-w-2xl">
              {currentMoodObj.description}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-charcoal-800 uppercase tracking-wider">
                Stylist Keywords:
              </span>
              {currentMoodObj.recommendedKeywords.map(k => (
                <span key={k} className="px-3 py-1 rounded-full bg-white/90 text-charcoal-900 text-xs font-medium shadow-subtle">
                  {k}
                </span>
              ))}
            </div>
          </div>

          <div className="md:col-span-4 flex justify-end">
            <div className="w-full max-w-[260px] aspect-[3/4] rounded-2xl overflow-hidden shadow-elevated border-2 border-white">
              <img src={currentMoodObj.image} alt={currentMoodObj.name} className="w-full h-full object-cover" />
            </div>
          </div>

        </div>
      </div>

      {/* 4. Filter Bar & Sort Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-sand gap-4">
        
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-charcoal-900 text-ivory-50'
                  : 'bg-white border border-sand hover:bg-sand text-charcoal-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Sort Dropdown & Filter Toggle */}
        <div className="flex items-center gap-3 self-end md:self-auto">
          <div className="flex items-center gap-2">
            <span className="text-xs text-taupe-dark">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-sand rounded-xl px-3 py-1.5 text-xs text-charcoal-900 focus:outline-none focus:ring-1 focus:ring-charcoal-900"
            >
              <option value="recommended">Curator's Choice</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

          <button
            type="button"
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-sand bg-white text-xs font-semibold text-charcoal-800 hover:bg-sand"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Faceted Filters</span>
          </button>
        </div>

      </div>

      {/* 5. Main Content: Sidebar Filters + Dynamic Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Filter Sidebar (3 cols) */}
        <aside className={`lg:col-span-3 space-y-6 ${mobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
          <div className="p-6 bg-white rounded-3xl border border-sand shadow-subtle space-y-6">
            
            <div className="flex items-center justify-between pb-4 border-b border-sand">
              <h4 className="font-serif text-sm uppercase tracking-wider text-charcoal-900 font-semibold">
                Refine by Criteria
              </h4>
              <button
                onClick={handleResetFilters}
                className="text-xs text-taupe-dark hover:text-charcoal-900 underline flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            </div>

            {/* Price Filter */}
            <div>
              <span className="text-xs uppercase font-semibold text-charcoal-800 tracking-wider block mb-2.5">
                Price Range
              </span>
              <div className="space-y-1.5 text-xs text-charcoal-700">
                {[
                  { id: 'all', label: 'All Prices' },
                  { id: 'under-150', label: 'Under $150' },
                  { id: '150-300', label: '$150 - $300' },
                  { id: 'over-300', label: 'Luxury ($300+)' },
                ].map(item => (
                  <label key={item.id} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="price"
                      checked={selectedPriceRange === item.id}
                      onChange={() => setSelectedPriceRange(item.id)}
                      className="accent-charcoal-900"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Brand Filter */}
            <div className="pt-4 border-t border-sand">
              <span className="text-xs uppercase font-semibold text-charcoal-800 tracking-wider block mb-2.5">
                Atelier Brand
              </span>
              <div className="space-y-1.5 text-xs text-charcoal-700 max-h-40 overflow-y-auto">
                {brands.map(b => (
                  <label key={b} className="flex items-center gap-2 cursor-pointer capitalize">
                    <input
                      type="radio"
                      name="brand"
                      checked={selectedBrand === b}
                      onChange={() => setSelectedBrand(b)}
                      className="accent-charcoal-900"
                    />
                    <span>{b === 'all' ? 'All Brands' : b}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Color Swatches */}
            <div className="pt-4 border-t border-sand">
              <span className="text-xs uppercase font-semibold text-charcoal-800 tracking-wider block mb-2.5">
                Color Palette
              </span>
              <div className="flex flex-wrap gap-2">
                {colors.map(c => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`px-2.5 py-1 rounded-xl text-xs flex items-center gap-1.5 border transition-all ${
                      selectedColor === c.name
                        ? 'border-charcoal-900 bg-sand font-medium'
                        : 'border-sand bg-white text-charcoal-700'
                    }`}
                  >
                    {c.hex && (
                      <span className="w-2.5 h-2.5 rounded-full border border-sand" style={{ backgroundColor: c.hex }} />
                    )}
                    <span>{c.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="pt-4 border-t border-sand">
              <span className="text-xs uppercase font-semibold text-charcoal-800 tracking-wider block mb-2.5">
                Size
              </span>
              <div className="flex flex-wrap gap-1.5">
                {sizes.map(s => (
                  <button
                    key={s}
                    onClick={() => setSelectedSize(s)}
                    className={`px-3 py-1 rounded-lg text-xs uppercase font-medium transition-all ${
                      selectedSize === s
                        ? 'bg-charcoal-900 text-ivory-50'
                        : 'bg-sand-light border border-sand text-charcoal-800 hover:border-taupe'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

          </div>
        </aside>

        {/* Products Grid (9 cols) */}
        <main className="lg:col-span-9">
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs text-taupe-dark">
              Showing <strong>{filteredProducts.length}</strong> creations for <span className="capitalize font-semibold text-charcoal-900">{currentMood}</span> mood
            </span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-sand p-8">
              <Sparkles className="w-8 h-8 text-taupe-dark mx-auto mb-3" />
              <h3 className="font-serif text-xl text-charcoal-900 mb-1">No products match these specific filters</h3>
              <p className="text-xs text-taupe-dark mb-4">Try clearing some filter criteria to expand your results.</p>
              <button
                onClick={handleResetFilters}
                className="px-5 py-2.5 rounded-full bg-charcoal-900 text-ivory-50 text-xs uppercase tracking-wider font-semibold"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.productId} product={product} />
              ))}
            </div>
          )}
        </main>

      </div>

    </div>
  );
};

