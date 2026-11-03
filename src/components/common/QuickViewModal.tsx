import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Sparkles, ShoppingBag, Heart, Star, Check } from 'lucide-react';
import { useShopping } from '../../context/ShoppingContext';
import { useAuth } from '../../context/AuthContext';

export const QuickViewModal: React.FC = () => {
  const { 
    quickViewProduct, 
    setQuickViewProduct, 
    addToCart, 
    openCompleteMyLook 
  } = useShopping();
  
  const { user, toggleWishlistItem } = useAuth();

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);

  if (!quickViewProduct) return null;

  const currentSize = selectedSize || quickViewProduct.availableSizes[0] || 'Standard';
  const currentColor = quickViewProduct.availableColors[selectedColorIdx] || quickViewProduct.availableColors[0];
  const isWishlisted = user?.wishlist.includes(quickViewProduct.productId) || false;

  const handleAddToCart = () => {
    addToCart(quickViewProduct, currentSize, currentColor);
    setQuickViewProduct(null);
  };

  const handleOpenCompleteLook = () => {
    const prod = quickViewProduct;
    setQuickViewProduct(null);
    openCompleteMyLook(prod);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-charcoal-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-150">
      <div 
        className="fixed inset-0" 
        onClick={() => setQuickViewProduct(null)} 
      />

      <div className="relative w-full max-w-4xl bg-ivory-50 rounded-3xl shadow-2xl border border-sand overflow-hidden z-10 grid grid-cols-1 md:grid-cols-2">
        {/* Close Button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-charcoal-800 flex items-center justify-center shadow-subtle transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Image Gallery */}
        <div className="p-6 bg-sand-light/50 flex flex-col gap-3">
          <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-white border border-sand">
            <img
              src={quickViewProduct.images[activeImageIdx] || quickViewProduct.images[0]}
              alt={quickViewProduct.name}
              className="w-full h-full object-cover"
            />
          </div>

          {quickViewProduct.images.length > 1 && (
            <div className="flex gap-2 justify-center">
              {quickViewProduct.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`w-14 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                    activeImageIdx === idx ? 'border-charcoal-900 scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Details & Actions */}
        <div className="p-6 sm:p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-taupe-dark mb-1">
              <span className="uppercase tracking-widest">{quickViewProduct.brand}</span>
              <div className="flex items-center gap-1 text-amber-600 font-medium">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>{quickViewProduct.rating} ({quickViewProduct.reviewsCount} reviews)</span>
              </div>
            </div>

            <h3 className="font-serif text-2xl text-charcoal-900 mb-2">
              {quickViewProduct.name}
            </h3>

            <div className="flex items-baseline gap-3 mb-4">
              <span className="font-serif text-2xl font-bold text-charcoal-900">
                ${quickViewProduct.discountPrice || quickViewProduct.price}
              </span>
              {quickViewProduct.discountPrice && (
                <span className="text-sm text-taupe-dark line-through">
                  ${quickViewProduct.price}
                </span>
              )}
            </div>

            <p className="text-xs text-charcoal-600 leading-relaxed mb-5">
              {quickViewProduct.description}
            </p>

            {/* Color Swatches */}
            <div className="mb-4">
              <span className="text-xs uppercase font-semibold text-charcoal-800 tracking-wider block mb-2">
                Color: <span className="font-normal text-taupe-dark">{currentColor.name}</span>
              </span>
              <div className="flex gap-2">
                {quickViewProduct.availableColors.map((color, idx) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColorIdx(idx)}
                    className={`w-7 h-7 rounded-full flex items-center justify-center border transition-all ${
                      selectedColorIdx === idx ? 'ring-2 ring-charcoal-900 scale-110' : 'border-sand'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  >
                    {selectedColorIdx === idx && (
                      <Check className={`w-3.5 h-3.5 ${color.hex === '#FFFFFF' || color.hex === '#F5F2EB' ? 'text-charcoal-900' : 'text-white'}`} />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Sizes */}
            {quickViewProduct.availableSizes.length > 0 && (
              <div className="mb-6">
                <span className="text-xs uppercase font-semibold text-charcoal-800 tracking-wider block mb-2">
                  Select Size
                </span>
                <div className="flex flex-wrap gap-2">
                  {quickViewProduct.availableSizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold tracking-wider transition-all ${
                        currentSize === size
                          ? 'bg-charcoal-900 text-ivory-50'
                          : 'bg-white border border-sand hover:border-taupe text-charcoal-800'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Action CTAs */}
          <div className="space-y-2.5 pt-4 border-t border-sand">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 py-3 px-4 rounded-2xl bg-charcoal-900 hover:bg-charcoal-800 text-ivory-50 text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 shadow-soft"
              >
                <ShoppingBag className="w-4 h-4" />
                Add to Bag
              </button>

              <button
                type="button"
                onClick={() => toggleWishlistItem(quickViewProduct.productId)}
                className={`p-3 rounded-2xl border transition-colors flex items-center justify-center ${
                  isWishlisted
                    ? 'bg-rose-50 border-rose-200 text-rose-600'
                    : 'bg-white border-sand text-charcoal-700 hover:text-charcoal-900'
                }`}
                title={isWishlisted ? "Wishlisted" : "Add to wishlist"}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Signature Complete My Look CTA */}
            <button
              type="button"
              onClick={handleOpenCompleteLook}
              className="w-full py-3 px-4 rounded-2xl bg-sand/70 hover:bg-sand text-charcoal-900 text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 border border-sand-dark"
            >
              <Sparkles className="w-4 h-4 text-gold" />
              Complete My Look With This Piece
            </button>

            <div className="text-center pt-1">
              <Link
                to={`/product/${quickViewProduct.productId}`}
                onClick={() => setQuickViewProduct(null)}
                className="text-xs text-taupe-dark hover:text-charcoal-900 underline"
              >
                View Full Product Specifications & Reviews
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

