import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  ShoppingBag, 
  Bookmark, 
  Check, 
  Plus, 
  Share2, 
  RotateCcw,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Product, ProductCategory } from '../../types';
import { PRODUCTS } from '../../data/products';
import { getCompleteLookRecommendations } from '../../utils/recommendations';
import { useShopping } from '../../context/ShoppingContext';
import { useAuth } from '../../context/AuthContext';

export const CompleteLookModal: React.FC = () => {
  const { 
    stylingHeroProduct, 
    closeCompleteMyLook, 
    addToCart, 
    addCompleteLookToCart 
  } = useShopping();
  
  const { saveLookToProfile } = useAuth();

  const [activeCategoryTab, setActiveCategoryTab] = useState<ProductCategory>('footwear');
  const [selectedItems, setSelectedItems] = useState<{ [category in ProductCategory]?: Product }>({});
  const [lookSaved, setLookSaved] = useState(false);
  const [lookName, setLookName] = useState('Evening Elegance Capsule');

  // When hero changes, populate intelligent styling recommendations
  useEffect(() => {
    if (stylingHeroProduct) {
      const recommendations = getCompleteLookRecommendations(stylingHeroProduct, PRODUCTS);
      
      // Select best matching look initially
      setSelectedItems({
        clothing: stylingHeroProduct.category !== 'clothing' ? recommendations.bestMatchingLook.clothing : undefined,
        footwear: recommendations.bestMatchingLook.footwear,
        bags: recommendations.bestMatchingLook.bags,
        jewellery: recommendations.bestMatchingLook.jewellery,
        accessories: recommendations.bestMatchingLook.accessories,
      });

      // Default active tab to a complementary category
      if (stylingHeroProduct.category === 'clothing') {
        setActiveCategoryTab('footwear');
      } else {
        setActiveCategoryTab('clothing');
      }

      setLookName(`${stylingHeroProduct.name.split(' ')[0]} ${stylingHeroProduct.moodTags[0]} Atelier Look`);
      setLookSaved(false);
    }
  }, [stylingHeroProduct]);

  if (!stylingHeroProduct) return null;

  const recommendations = getCompleteLookRecommendations(stylingHeroProduct, PRODUCTS);

  // Compute selected list & prices
  const activeSelectedList: Product[] = [
    stylingHeroProduct,
    ...Object.values(selectedItems).filter((item): item is Product => Boolean(item))
  ];

  const totalRegularPrice = activeSelectedList.reduce((acc, item) => acc + item.price, 0);
  // 15% complete look styling bundle discount
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
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
    closeCompleteMyLook();
  };

  const handleSaveLook = () => {
    saveLookToProfile({
      id: 'look-' + Date.now(),
      title: lookName,
      createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      heroProduct: stylingHeroProduct,
      complementaryProducts: Object.values(selectedItems).filter((p): p is Product => Boolean(p)),
      totalPrice: totalRegularPrice,
      discountedTotal: bundlePrice,
      mood: stylingHeroProduct.moodTags[0]
    });

    setLookSaved(true);
    confetti({
      particleCount: 50,
      spread: 60,
      colors: ['#D4AF37', '#FAF8F5', '#1C1917']
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
    <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal-900/60 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-200">
      <div className="relative w-full max-w-6xl bg-ivory-50 rounded-3xl shadow-2xl border border-sand overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header Bar */}
        <div className="px-6 py-4 bg-white border-b border-sand flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-sand/60 text-charcoal-900 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-gold" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-xl sm:text-2xl text-charcoal-900 font-medium">
                  Complete My Look Studio
                </h2>
                <span className="px-2 py-0.5 text-[10px] uppercase font-sans tracking-widest bg-gold/15 text-bronze-dark rounded-full font-semibold">
                  Personal Stylist AI
                </span>
              </div>
              <p className="text-xs text-taupe-dark">
                "Love one piece? Let us style the rest."
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSaveLook}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase transition-all ${
                lookSaved 
                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  : 'bg-sand hover:bg-sand-dark text-charcoal-800'
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

            <button
              onClick={closeCompleteMyLook}
              className="p-2 rounded-full hover:bg-sand/60 text-charcoal-700 hover:text-charcoal-900 transition-colors"
              aria-label="Close styling studio"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Modal Body: Split View */}
        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-12 gap-0">
          
          {/* Left Canvas: Outfit Mannequin / Moodboard (5 cols) */}
          <div className="lg:col-span-5 bg-sand-light/50 p-6 border-b lg:border-b-0 lg:border-r border-sand flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs uppercase font-serif tracking-widest text-charcoal-700">
                  Outfit Preview Canvas
                </span>
                <span className="text-xs text-taupe-dark">
                  {activeSelectedList.length} items styled
                </span>
              </div>

              {/* Interactive Mannequin Grid */}
              <div className="grid grid-cols-3 gap-2.5">
                
                {/* Hero Center Item (spans 2 cols) */}
                <div className="col-span-2 relative aspect-[3/4] rounded-2xl overflow-hidden bg-white border-2 border-charcoal-900 shadow-soft group">
                  <img
                    src={stylingHeroProduct.images[0]}
                    alt={stylingHeroProduct.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 left-2 px-2.5 py-1 bg-charcoal-900 text-ivory-50 text-[10px] font-semibold uppercase tracking-wider rounded-full shadow-subtle">
                    Anchor Piece
                  </div>
                  <div className="absolute inset-x-0 bottom-0 p-2.5 bg-gradient-to-t from-black/80 via-black/40 to-transparent text-white">
                    <p className="text-[11px] font-serif font-medium line-clamp-1">{stylingHeroProduct.name}</p>
                    <p className="text-[10px] text-ivory-300">${stylingHeroProduct.discountPrice || stylingHeroProduct.price}</p>
                  </div>
                </div>

                {/* Vertical Stack of styled components */}
                <div className="col-span-1 flex flex-col gap-2.5">
                  {/* Footwear slot */}
                  <div className={`relative aspect-square rounded-xl overflow-hidden border ${
                    selectedItems.footwear ? 'border-charcoal-900 bg-white' : 'border-dashed border-sand-dark bg-sand/30 flex items-center justify-center'
                  }`}>
                    {selectedItems.footwear ? (
                      <>
                        <img 
                          src={selectedItems.footwear.images[0]} 
                          alt={selectedItems.footwear.name}
                          className="w-full h-full object-cover" 
                        />
                        <button
                          onClick={() => toggleProductSelection('footwear', selectedItems.footwear!)}
                          className="absolute top-1 right-1 w-5 h-5 bg-charcoal-900/80 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-[10px]"
                          title="Remove item"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </>
                    ) : (
                      <span className="text-[10px] text-taupe-dark uppercase font-semibold">Footwear</span>
                    )}
                  </div>

                  {/* Bag slot */}
                  <div className={`relative aspect-square rounded-xl overflow-hidden border ${
                    selectedItems.bags ? 'border-charcoal-900 bg-white' : 'border-dashed border-sand-dark bg-sand/30 flex items-center justify-center'
                  }`}>
                    {selectedItems.bags ? (
                      <>
                        <img 
                          src={selectedItems.bags.images[0]} 
                          alt={selectedItems.bags.name}
                          className="w-full h-full object-cover" 
                        />
                        <button
                          onClick={() => toggleProductSelection('bags', selectedItems.bags!)}
                          className="absolute top-1 right-1 w-5 h-5 bg-charcoal-900/80 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-[10px]"
                          title="Remove item"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </>
                    ) : (
                      <span className="text-[10px] text-taupe-dark uppercase font-semibold">Bag</span>
                    )}
                  </div>

                  {/* Jewellery / Accessory slot */}
                  <div className={`relative aspect-square rounded-xl overflow-hidden border ${
                    selectedItems.jewellery || selectedItems.accessories ? 'border-charcoal-900 bg-white' : 'border-dashed border-sand-dark bg-sand/30 flex items-center justify-center'
                  }`}>
                    {(selectedItems.jewellery || selectedItems.accessories) ? (
                      <>
                        <img 
                          src={(selectedItems.jewellery || selectedItems.accessories)!.images[0]} 
                          alt="Jewellery"
                          className="w-full h-full object-cover" 
                        />
                        <button
                          onClick={() => {
                            if (selectedItems.jewellery) toggleProductSelection('jewellery', selectedItems.jewellery);
                            else if (selectedItems.accessories) toggleProductSelection('accessories', selectedItems.accessories);
                          }}
                          className="absolute top-1 right-1 w-5 h-5 bg-charcoal-900/80 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-[10px]"
                          title="Remove item"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </>
                    ) : (
                      <span className="text-[10px] text-taupe-dark uppercase font-semibold">Jewellery</span>
                    )}
                  </div>
                </div>

              </div>

              {/* Style Aesthetic Synopsis */}
              <div className="mt-4 p-3.5 rounded-2xl bg-white border border-sand">
                <div className="flex items-center gap-2 text-xs font-serif text-charcoal-900 mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-gold" />
                  <span>Curator's Harmony Notes</span>
                </div>
                <p className="text-xs text-charcoal-600 leading-relaxed">
                  Styled in harmony with <strong className="capitalize text-charcoal-900">{stylingHeroProduct.moodTags[0]}</strong> mood, featuring {stylingHeroProduct.aestheticTags.map(a => a.replace('-', ' ')).join(' & ')} aesthetic undertones.
                </p>
              </div>
            </div>

            {/* Bundle Checkout Bar in Left Column */}
            <div className="mt-6 pt-4 border-t border-sand">
              <div className="flex items-baseline justify-between mb-1">
                <span className="text-xs text-taupe-dark">Total Outfit Price ({activeSelectedList.length} items):</span>
                <span className="text-xs line-through text-taupe-dark">${totalRegularPrice}</span>
              </div>
              
              <div className="flex items-baseline justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-2xl font-bold text-charcoal-900">${bundlePrice}</span>
                  <span className="px-2 py-0.5 text-[10px] uppercase font-bold bg-emerald-100 text-emerald-800 rounded-full">
                    Bundle Savings 15%
                  </span>
                </div>
                <span className="text-xs font-medium text-emerald-700">Save ${bundleDiscount.toFixed(0)}</span>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleAddEntireLookToCart}
                  className="flex-1 py-3 px-4 rounded-xl bg-charcoal-900 hover:bg-charcoal-800 text-ivory-50 text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 shadow-soft"
                >
                  <ShoppingBag className="w-4 h-4 text-gold" />
                  Add Complete Look to Bag
                </button>
              </div>
            </div>

          </div>

          {/* Right Shelves: Category Selectors & Alternate Choices (7 cols) */}
          <div className="lg:col-span-7 p-6 flex flex-col justify-between">
            <div>
              {/* Category Filter Tabs */}
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
                          : 'bg-sand/50 text-charcoal-700 hover:bg-sand'
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

              {/* Matching Recommendations Grid for Active Category Tab */}
              <div className="pt-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-xs uppercase font-serif tracking-widest text-charcoal-800">
                    Recommended {activeCategoryTab} to Pair
                  </h4>
                  <span className="text-[11px] text-taupe-dark">
                    Select one to harmonize with your {stylingHeroProduct.name.split(' ')[0]}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[380px] overflow-y-auto pr-1">
                  {recommendations[activeCategoryTab].map(product => {
                    const isSelected = selectedItems[activeCategoryTab]?.productId === product.productId;

                    return (
                      <div
                        key={product.productId}
                        onClick={() => toggleProductSelection(activeCategoryTab, product)}
                        className={`cursor-pointer p-3 rounded-2xl border transition-all flex gap-3 relative ${
                          isSelected
                            ? 'border-charcoal-900 bg-white ring-2 ring-charcoal-900 shadow-soft'
                            : 'border-sand bg-white/70 hover:bg-white hover:border-taupe'
                        }`}
                      >
                        {/* Thumbnail */}
                        <div className="w-20 h-24 rounded-xl overflow-hidden bg-sand-light shrink-0 relative">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                          {isSelected && (
                            <div className="absolute inset-0 bg-charcoal-900/30 flex items-center justify-center">
                              <div className="w-6 h-6 rounded-full bg-charcoal-900 text-ivory-50 flex items-center justify-center">
                                <Check className="w-3.5 h-3.5" />
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Info */}
                        <div className="flex flex-col justify-between flex-1">
                          <div>
                            <span className="text-[10px] uppercase tracking-wider text-taupe-dark">{product.brand}</span>
                            <h5 className="font-serif text-sm text-charcoal-900 line-clamp-1">{product.name}</h5>
                            <p className="text-[11px] text-charcoal-500 line-clamp-1 mt-0.5">{product.subcategory}</p>
                          </div>

                          <div className="flex items-center justify-between mt-2 pt-2 border-t border-sand/40">
                            <span className="font-serif text-sm font-semibold text-charcoal-900">
                              ${product.discountPrice || product.price}
                            </span>
                            
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                addToCart(product);
                              }}
                              className="text-[10px] uppercase font-semibold text-charcoal-800 hover:text-charcoal-900 underline"
                              title="Buy this item individually"
                            >
                              Add Only This
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Bottom Quick Look Switcher */}
            <div className="mt-4 pt-4 border-t border-sand flex items-center justify-between text-xs text-taupe-dark">
              <span>Switching pieces recalculates the 15% look discount instantly.</span>
              <button
                onClick={() => {
                  // Reset to default best match
                  setSelectedItems({
                    footwear: recommendations.bestMatchingLook.footwear,
                    bags: recommendations.bestMatchingLook.bags,
                    jewellery: recommendations.bestMatchingLook.jewellery,
                    accessories: recommendations.bestMatchingLook.accessories,
                  });
                }}
                className="flex items-center gap-1 text-charcoal-800 hover:text-charcoal-900 font-medium"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset Stylist Picks
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

