import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { 
  Search, 
  SlidersHorizontal, 
  RotateCcw, 
  Sparkles, 
  X,
  Filter
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/common/ProductCard';
import { ProductCategory, MoodType } from '../types';
import { MOODS } from '../data/moods';

export const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const initialSearch = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || 'all';
  const initialAesthetic = searchParams.get('aesthetic') || 'all';
  const initialOccasion = searchParams.get('occasion') || 'all';
  const initialMood = searchParams.get('mood') || 'all';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedMood, setSelectedMood] = useState<string>(initialMood);
  const [selectedAesthetic, setSelectedAesthetic] = useState<string>(initialAesthetic);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Sync when search URL params change
  useEffect(() => {
    if (searchParams.get('search')) setSearchQuery(searchParams.get('search') || '');
    if (searchParams.get('category')) setSelectedCategory(searchParams.get('category') || 'all');
    if (searchParams.get('aesthetic')) setSelectedAesthetic(searchParams.get('aesthetic') || 'all');
    if (searchParams.get('mood')) setSelectedMood(searchParams.get('mood') || 'all');
  }, [searchParams]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedMood('all');
    setSelectedAesthetic('all');
    setSelectedPriceRange('all');
    setSortBy('featured');
    setSearchParams({});
  };

  const filteredProducts = PRODUCTS.filter(p => {
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchBrand = p.brand.toLowerCase().includes(q);
      const matchDesc = p.description.toLowerCase().includes(q);
      const matchTags = p.productTags.some(t => t.toLowerCase().includes(q));
      const matchMood = p.moodTags.some(m => m.toLowerCase().includes(q));
      if (!matchName && !matchBrand && !matchDesc && !matchTags && !matchMood) return false;
    }

    // Category
    if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;

    // Mood
    if (selectedMood !== 'all' && !p.moodTags.includes(selectedMood as MoodType)) return false;

    // Aesthetic
    if (selectedAesthetic !== 'all' && !p.aestheticTags.includes(selectedAesthetic as any)) return false;

    // Price
    const price = p.discountPrice || p.price;
    if (selectedPriceRange === 'under-150' && price >= 150) return false;
    if (selectedPriceRange === '150-300' && (price < 150 || price > 300)) return false;
    if (selectedPriceRange === 'over-300' && price <= 300) return false;

    return true;
  }).sort((a, b) => {
    const priceA = a.discountPrice || a.price;
    const priceB = b.discountPrice || b.price;
    if (sortBy === 'price-low') return priceA - priceB;
    if (sortBy === 'price-high') return priceB - priceA;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
    return 0;
  });

  const categories = [
    { id: 'all', label: 'All Categories' },
    { id: 'clothing', label: 'Clothing' },
    { id: 'footwear', label: 'Footwear' },
    { id: 'bags', label: 'Bags' },
    { id: 'jewellery', label: 'Jewellery' },
    { id: 'accessories', label: 'Accessories' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 border-b border-sand gap-4">
        <div>
          <span className="text-xs uppercase font-sans tracking-widest text-taupe-dark font-medium block mb-1">
            The Atelier Archive
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-charcoal-900 font-normal">
            Curated Catalogue
          </h1>
          <p className="text-xs text-charcoal-600 font-light mt-1">
            Discover artisanal garments, footwear, fine jewelry, and handcrafted leather accessories.
          </p>
        </div>

        {/* Search bar */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search keywords, fabrics, mood..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-sand rounded-full py-2.5 pl-10 pr-4 text-xs text-charcoal-900 focus:outline-none focus:ring-1 focus:ring-charcoal-900 shadow-subtle"
          />
          <Search className="w-4 h-4 text-taupe-dark absolute left-3.5 top-3" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-2.5 text-taupe-dark hover:text-charcoal-900"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Categories Horizontal Bar */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? 'bg-charcoal-900 text-ivory-50 shadow-subtle'
                  : 'bg-white border border-sand hover:bg-sand text-charcoal-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-taupe-dark">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-sand rounded-xl px-3 py-1.5 text-xs text-charcoal-900 focus:outline-none focus:ring-1 focus:ring-charcoal-900"
            >
              <option value="featured">Featured Curations</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
              <option value="newest">New Arrivals</option>
            </select>
          </div>

          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="lg:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-sand bg-white text-xs font-semibold"
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Main Grid with Sidebar Filter */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Filter Sidebar (3 cols) */}
        <aside className={`lg:col-span-3 space-y-6 ${mobileFilterOpen ? 'block' : 'hidden lg:block'}`}>
          <div className="p-6 bg-white rounded-3xl border border-sand shadow-subtle space-y-6">
            
            <div className="flex items-center justify-between pb-3 border-b border-sand">
              <span className="font-serif text-sm uppercase tracking-wider text-charcoal-900 font-semibold">
                Filter Catalogue
              </span>
              <button
                onClick={handleResetFilters}
                className="text-xs text-taupe-dark hover:text-charcoal-900 underline flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" />
                Clear
              </button>
            </div>

            {/* Mood Filter */}
            <div>
              <span className="text-xs uppercase font-semibold text-charcoal-800 tracking-wider block mb-2">
                Mood Alignment
              </span>
              <div className="space-y-1 text-xs text-charcoal-700 max-h-44 overflow-y-auto pr-1">
                <label className="flex items-center gap-2 cursor-pointer py-0.5">
                  <input
                    type="radio"
                    name="mood"
                    checked={selectedMood === 'all'}
                    onChange={() => setSelectedMood('all')}
                    className="accent-charcoal-900"
                  />
                  <span>All Moods</span>
                </label>
                {MOODS.map(m => (
                  <label key={m.id} className="flex items-center gap-2 cursor-pointer py-0.5 capitalize">
                    <input
                      type="radio"
                      name="mood"
                      checked={selectedMood === m.id}
                      onChange={() => setSelectedMood(m.id)}
                      className="accent-charcoal-900"
                    />
                    <span>{m.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="pt-4 border-t border-sand">
              <span className="text-xs uppercase font-semibold text-charcoal-800 tracking-wider block mb-2">
                Price
              </span>
              <div className="space-y-1 text-xs text-charcoal-700">
                {[
                  { id: 'all', label: 'All Prices' },
                  { id: 'under-150', label: 'Under $150' },
                  { id: '150-300', label: '$150 - $300' },
                  { id: 'over-300', label: 'Over $300' },
                ].map(item => (
                  <label key={item.id} className="flex items-center gap-2 cursor-pointer py-0.5">
                    <input
                      type="radio"
                      name="shopPrice"
                      checked={selectedPriceRange === item.id}
                      onChange={() => setSelectedPriceRange(item.id)}
                      className="accent-charcoal-900"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Aesthetic Filter */}
            <div className="pt-4 border-t border-sand">
              <span className="text-xs uppercase font-semibold text-charcoal-800 tracking-wider block mb-2">
                Aesthetic Tags
              </span>
              <div className="flex flex-wrap gap-1.5">
                {['all', 'old-money', 'quiet-luxury', 'clean-girl', 'street-style', 'coquette', 'dark-academia', 'minimalist'].map(tag => (
                  <button
                    key={tag}
                    onClick={() => setSelectedAesthetic(tag)}
                    className={`px-2.5 py-1 rounded-full text-[11px] capitalize transition-all ${
                      selectedAesthetic === tag
                        ? 'bg-charcoal-900 text-ivory-50 font-medium'
                        : 'bg-sand-light border border-sand text-charcoal-700'
                    }`}
                  >
                    {tag === 'all' ? 'All' : tag.replace('-', ' ')}
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
              Showing <strong>{filteredProducts.length}</strong> creations
            </span>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-sand p-8">
              <Sparkles className="w-8 h-8 text-taupe-dark mx-auto mb-3" />
              <h3 className="font-serif text-xl text-charcoal-900 mb-1">No products match your criteria</h3>
              <p className="text-xs text-taupe-dark mb-4">Try clearing your filters or searching for another keyword.</p>
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

