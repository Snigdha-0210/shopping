import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Sparkles, 
  ShoppingBag, 
  Bookmark, 
  Check, 
  RotateCcw, 
  CheckCircle2, 
  ArrowRight,
  Plus,
  X,
  Share2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Product, ProductCategory } from '../types';
import { PRODUCTS } from '../data/products';
import { getCompleteLookRecommendations } from '../utils/recommendations';
import { useShopping } from '../context/ShoppingContext';
import { useAuth } from '../context/AuthContext';

export const CompleteLookPage: React.FC = () => {
  const { productId } = useParams<{ productId?: string }>();
  const { addToCart, addCompleteLookToCart } = useShopping();
  const { saveLookToProfile } = useAuth();

  // Selected core hero product
  const [heroProduct, setHeroProduct] = useState<Product>(() => {
    if (productId) {
      const found = PRODUCTS.find(p => p.productId === productId);
      if (found) return found;
    }
    return PRODUCTS[0];
  });

  const [activeCategoryTab, setActiveCategoryTab] = useState<ProductCategory>('footwear');
  const [selectedItems, setSelectedItems] = useState<{ [category in ProductCategory]?: Product }>({});
  const [lookSaved, setLookSaved] = useState(false);
  const [lookTitle, setLookTitle] = useState('Atelier Signature Ensemble');

  // Sync recommendations whenever heroProduct changes
  useEffect(() => {
    const recs = getCompleteLookRecommendations(heroProduct, PRODUCTS);
    setSelectedItems({
      clothing: heroProduct.category !== 'clothing' ? recs.bestMatchingLook.clothing : undefined,
      footwear: recs.bestMatchingLook.footwear,
      bags: recs.bestMatchingLook.bags,
      jewellery: recs.bestMatchingLook.jewellery,
      accessories: recs.bestMatchingLook.accessories,
    });

    if (heroProduct.category === 'clothing') {
      setActiveCategoryTab('footwear');
    } else {
      setActiveCategoryTab('clothing');
    }

    setLookTitle(`${heroProduct.name.split(' ')[0]} ${heroProduct.moodTags[0]} Atelier Capsule`);
    setLookSaved(false);
  }, [heroProduct]);

  const recommendations = getCompleteLookRecommendations(heroProduct, PRODUCTS);

  const activeSelectedList: Product[] = [
    heroProduct,
    ...Object.values(selectedItems).filter((item): item is Product => Boolean(item))
  ];

  const totalRegularPrice = activeSelectedList.reduce((acc, item) => acc + item.price, 0);
  const bundleDiscount = totalRegularPrice * 0.15;
  const bundlePrice = Math.round(totalRegularPrice - bundleDiscount);

  const toggleProductSelection = (category: ProductCategory, product: Product) => {
    setSelectedItems(prev => {
      if (prev[category]?.productId === product.productId) {
        const next = { ...prev };
        delete next[category];
        return next;
      }
      return {
        ...prev,
        [category]: product
      };
    });
  };

  const handleAddEntireLookToCart = () => {
    addCompleteLookToCart(activeSelectedList);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  };

  const handleSaveLook = () => {
    saveLookToProfile({
      id: 'look-' + Date.now(),
      title: lookTitle,
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      heroProduct: heroProduct,
      complementaryProducts: Object.values(selectedItems).filter((p): p is Product => Boolean(p)),
      totalPrice: totalRegularPrice,
      discountedTotal: bundlePrice,
      mood: heroProduct.moodTags[0]
    });

    setLookSaved(true);
    confetti({
      particleCount: 60,
      spread: 60,
      colors: ['#D4AF37', '#1C1917', '#FAF8F5']
    });
  };

  const categoryTabs: { id: ProductCategory; label: string }[] = [
    { id: 'clothing', label: 'Clothing' },
    { id: 'footwear', label: 'Footwear' },
    { id: 'bags', label: 'Bags' },
    { id: 'jewellery', label: 'Jewellery' },
    { id: 'accessories', label: 'Accessories' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* 1. Atelier Studio Title Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-sand text-xs uppercase font-sans tracking-widest text-charcoal-800 font-semibold shadow-subtle">
          <Sparkles className="w-3.5 h-3.5 text-gold" />
          <span>Signature Styling Atelier</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl text-charcoal-900 font-normal">
          Complete My Look
        </h1>
        <p className="font-serif italic text-lg sm:text-xl text-charcoal-700">
          "Love one piece? Let us style the rest."
        </p>
        <p className="text-xs sm:text-sm text-charcoal-600 font-light max-w-xl mx-auto">
          Choose any anchor piece. Our AI stylist harmonizes matching apparel, shoes, bags, and heirloom jewelry, automatically applying a 15% look discount.
        </p>
      </div>

      {/* 2. Anchor Piece Selector Carousel (Quick Switcher) */}
      <div className="bg-white rounded-3xl p-6 border border-sand shadow-subtle">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs uppercase font-serif tracking-widest text-charcoal-900 font-semibold">
            Choose Your Anchor Piece to Style:
          </span>
          <span className="text-xs text-taupe-dark">
            Click any garment or footwear below
          </span>
        </div>

        <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2">
          {PRODUCTS.slice(0, 10).map(item => {
            const isHero = heroProduct.productId === item.productId;
            return (
              <button
                key={item.productId}
                onClick={() => setHeroProduct(item)}
                className={`flex items-center gap-3 p-2 rounded-2xl border transition-all shrink-0 text-left ${
                  isHero
                    ? 'border-charcoal-900 bg-sand/60 ring-2 ring-charcoal-900 shadow-soft'
                    : 'border-sand bg-sand-light/30 hover:bg-white hover:border-taupe'
                }`}
              >
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-12 h-14 object-cover rounded-xl bg-white"
                />
                <div className="pr-2 max-w-[140px]">
                  <span className="text-[9px] uppercase tracking-wider text-taupe-dark font-medium">{item.category}</span>
                  <p className="font-serif text-xs font-medium text-charcoal-900 line-clamp-1">{item.name}</p>
                  <span className="text-[11px] font-semibold text-charcoal-800">${item.discountPrice || item.price}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Main Styling Studio Canvas */}
      <div className="bg-white rounded-3xl border border-sand shadow-elevated overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        
        {/* Left Outfit Mannequin / Moodboard (5 cols) */}
        <div className="lg:col-span-5 bg-sand-light/60 p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-sand flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs uppercase font-serif tracking-widest text-charcoal-800">
                Live Outfit Moodboard
              </span>
              <button
                onClick={handleSaveLook}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all ${
                  lookSaved
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-white border border-sand hover:bg-sand text-charcoal-800'
                }`}
              >
                {lookSaved ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Look Saved!
                  </>
                ) : (
                  <>
                    <Bookmark className="w-3.5 h-3.5" />
                    Save Look
                  </>
                )}
              </button>
            </div>

            {/* Mannequin Preview Layout */}
            <div className="grid grid-cols-3 gap-3">
              
              {/* Anchor Hero (spans 2 cols) */}
              <div className="col-span-2 relative aspect-[3/4] rounded-2xl overflow-hidden bg-white border-2 border-charcoal-900 shadow-soft">
                <img
                  src={heroProduct.images[0]}
                  alt={heroProduct.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 bg-charcoal-900 text-ivory-50 text-[10px] font-bold uppercase tracking-wider rounded-full shadow-subtle">
                  Anchor Piece
                </div>
                <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 via-black/30 to-transparent text-white">
                  <span className="text-[10px] uppercase text-gold font-semibold">{heroProduct.brand}</span>
                  <h4 className="font-serif text-sm line-clamp-1">{heroProduct.name}</h4>
                  <span className="text-xs text-ivory-300 font-mono">${heroProduct.discountPrice || heroProduct.price}</span>
                </div>
              </div>

              {/* Complementary Accents Column (1 col) */}
              <div className="col-span-1 flex flex-col gap-2.5">
                
                {/* Footwear slot */}
                <div className={`relative aspect-square rounded-xl overflow-hidden border ${
                  selectedItems.footwear ? 'border-charcoal-900 bg-white' : 'border-dashed border-sand-dark bg-sand/30 flex items-center justify-center'
                }`}>
                  {selectedItems.footwear ? (
                    <>
                      <img src={selectedItems.footwear.images[0]} alt="Footwear" className="w-full h-full object-cover" />
                      <button
                        onClick={() => toggleProductSelection('footwear', selectedItems.footwear!)}
                        className="absolute top-1 right-1 w-5 h-5 bg-charcoal-900 text-white rounded-full flex items-center justify-center text-[10px]"
                        title="Remove"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </>
                  ) : (
                    <span className="text-[10px] text-taupe-dark uppercase font-semibold">Shoes</span>
                  )}
                </div>

                {/* Bag slot */}
                <div className={`relative aspect-square rounded-xl overflow-hidden border ${
                  selectedItems.bags ? 'border-charcoal-900 bg-white' : 'border-dashed border-sand-dark bg-sand/30 flex items-center justify-center'
                }`}>
                  {selectedItems.bags ? (
                    <>
                      <img src={selectedItems.bags.images[0]} alt="Bag" className="w-full h-full object-cover" />
                      <button
                        onClick={() => toggleProductSelection('bags', selectedItems.bags!)}
                        className="absolute top-1 right-1 w-5 h-5 bg-charcoal-900 text-white rounded-full flex items-center justify-center text-[10px]"
                        title="Remove"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </>
                  ) : (
                    <span className="text-[10px] text-taupe-dark uppercase font-semibold">Bag</span>
                  )}
                </div>

                {/* Jewellery slot */}
                <div className={`relative aspect-square rounded-xl overflow-hidden border ${
                  selectedItems.jewellery ? 'border-charcoal-900 bg-white' : 'border-dashed border-sand-dark bg-sand/30 flex items-center justify-center'
                }`}>
                  {selectedItems.jewellery ? (
                    <>
                      <img src={selectedItems.jewellery.images[0]} alt="Jewellery" className="w-full h-full object-cover" />
                      <button
                        onClick={() => toggleProductSelection('jewellery', selectedItems.jewellery!)}
                        className="absolute top-1 right-1 w-5 h-5 bg-charcoal-900 text-white rounded-full flex items-center justify-center text-[10px]"
                        title="Remove"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </>
                  ) : (
                    <span className="text-[10px] text-taupe-dark uppercase font-semibold">Jewels</span>
                  )}
                </div>

              </div>

            </div>

            {/* Harmony Note */}
            <div className="mt-4 p-3.5 rounded-2xl bg-white border border-sand">
              <span className="text-[10px] uppercase font-bold tracking-wider text-charcoal-800 flex items-center gap-1.5 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-gold" />
                Curated Stylist Logic
              </span>
              <p className="text-xs text-charcoal-600 leading-relaxed font-light">
                Colors and silhouettes calibrated for a <strong className="capitalize text-charcoal-900">{heroProduct.moodTags[0]}</strong> presence with {heroProduct.aestheticTags.map(a => a.replace('-', ' ')).join(', ')} design sensibilities.
              </p>
            </div>
          </div>

          {/* Pricing & Add Complete Look to Bag */}
          <div className="mt-6 pt-5 border-t border-sand">
            <div className="flex items-baseline justify-between mb-1 text-xs">
              <span className="text-taupe-dark">Total ({activeSelectedList.length} items styled):</span>
              <span className="line-through text-taupe-dark">${totalRegularPrice}</span>
            </div>

            <div className="flex items-baseline justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="font-serif text-3xl font-bold text-charcoal-900">${bundlePrice}</span>
                <span className="px-2.5 py-0.5 text-[10px] uppercase font-bold bg-emerald-100 text-emerald-800 rounded-full">
                  Save 15%
                </span>
              </div>
              <span className="text-xs font-semibold text-emerald-700">Save ${bundleDiscount.toFixed(0)}</span>
            </div>

            <button
              onClick={handleAddEntireLookToCart}
              className="w-full py-4 rounded-2xl bg-charcoal-900 hover:bg-charcoal-800 text-ivory-50 text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 shadow-soft"
            >
              <ShoppingBag className="w-4 h-4 text-gold" />
              Add Complete Look to Bag
            </button>
          </div>
        </div>

        {/* Right Category Shelves (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
          <div>
            {/* Category tabs */}
            <div className="flex items-center gap-2 pb-4 border-b border-sand overflow-x-auto no-scrollbar">
              {categoryTabs.map(cat => {
                const isSelected = selectedItems[cat.id];
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategoryTab(cat.id)}
                    className={`relative px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase whitespace-nowrap transition-all ${
                      activeCategoryTab === cat.id
                        ? 'bg-charcoal-900 text-ivory-50'
                        : 'bg-sand-light text-charcoal-700 hover:bg-sand'
                    }`}
                  >
                    <span>{cat.label}</span>
                    {isSelected && (
                      <span className="ml-1.5 w-1.5 h-1.5 inline-block rounded-full bg-gold"></span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Candidate shelf */}
            <div className="pt-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs uppercase font-serif tracking-widest text-charcoal-800">
                  Recommended {activeCategoryTab} Pairs
                </h4>
                <span className="text-[11px] text-taupe-dark">
                  Click to add/swap into this look
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-h-[440px] overflow-y-auto pr-1">
                {recommendations[activeCategoryTab].map(item => {
                  const isSelected = selectedItems[activeCategoryTab]?.productId === item.productId;

                  return (
                    <div
                      key={item.productId}
                      onClick={() => toggleProductSelection(activeCategoryTab, item)}
                      className={`cursor-pointer p-3.5 rounded-2xl border transition-all flex gap-3.5 relative ${
                        isSelected
                          ? 'border-charcoal-900 bg-white ring-2 ring-charcoal-900 shadow-soft'
                          : 'border-sand bg-white/70 hover:bg-white hover:border-taupe'
                      }`}
                    >
                      <div className="w-20 h-24 rounded-xl overflow-hidden bg-sand-light shrink-0 relative">
                        <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                        {isSelected && (
                          <div className="absolute inset-0 bg-charcoal-900/30 flex items-center justify-center">
                            <div className="w-6 h-6 rounded-full bg-charcoal-900 text-ivory-50 flex items-center justify-center">
                              <Check className="w-3.5 h-3.5" />
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex flex-col justify-between flex-1">
                        <div>
                          <span className="text-[9px] uppercase tracking-wider text-taupe-dark font-medium">{item.brand}</span>
                          <h5 className="font-serif text-sm text-charcoal-900 line-clamp-1">{item.name}</h5>
                          <span className="text-[10px] text-charcoal-500 capitalize">{item.subcategory}</span>
                        </div>

                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-sand/40">
                          <span className="font-serif text-sm font-semibold text-charcoal-900">
                            ${item.discountPrice || item.price}
                          </span>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart(item);
                            }}
                            className="text-[10px] uppercase font-semibold text-charcoal-800 hover:text-charcoal-900 underline"
                          >
                            Buy Only This
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-sand flex items-center justify-between text-xs text-taupe-dark">
            <span>Any selected item can be bought alone or as part of the 15% discounted look.</span>
            <button
              onClick={() => {
                setSelectedItems({
                  footwear: recommendations.bestMatchingLook.footwear,
                  bags: recommendations.bestMatchingLook.bags,
                  jewellery: recommendations.bestMatchingLook.jewellery,
                  accessories: recommendations.bestMatchingLook.accessories,
                });
              }}
              className="flex items-center gap-1 text-charcoal-800 hover:text-charcoal-900 font-semibold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Recommended Look
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};

