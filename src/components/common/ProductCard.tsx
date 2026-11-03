import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Sparkles, Eye, ShoppingBag, Star } from 'lucide-react';
import { Product } from '../../types';
import { useShopping } from '../../context/ShoppingContext';
import { useAuth } from '../../context/AuthContext';

interface ProductCardProps {
  product: Product;
  featured?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, featured = false }) => {
  const { openCompleteMyLook, setQuickViewProduct, addToCart } = useShopping();
  const { user, toggleWishlistItem } = useAuth();
  const [isHovered, setIsHovered] = useState(false);

  const isWishlisted = user?.wishlist.includes(product.productId) || false;

  return (
    <div 
      className={`group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-sand/70 transition-all duration-300 hover:shadow-soft hover:-translate-y-1 ${
        featured ? 'ring-1 ring-gold/40' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Stage */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-sand-light">
        <Link to={`/product/${product.productId}`} className="block w-full h-full">
          <img
            src={isHovered && product.images[1] ? product.images[1] : product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
        </Link>

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10 pointer-events-none">
          {product.isTrending && (
            <span className="px-2.5 py-1 text-[10px] uppercase font-sans font-semibold tracking-wider bg-charcoal-900 text-ivory-50 rounded-full shadow-subtle">
              Trending
            </span>
          )}
          {product.discountPrice && (
            <span className="px-2.5 py-1 text-[10px] uppercase font-sans font-semibold tracking-wider bg-blush-dark text-white rounded-full shadow-subtle">
              Save ${(product.price - product.discountPrice).toFixed(0)}
            </span>
          )}
          <span className="px-2 py-0.5 text-[9px] uppercase font-sans tracking-wider bg-white/90 backdrop-blur-sm text-charcoal-700 rounded-md">
            {product.moodTags[0]}
          </span>
        </div>

        {/* Top Right Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              toggleWishlistItem(product.productId);
            }}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all shadow-subtle ${
              isWishlisted
                ? 'bg-rose-50 text-rose-600 scale-110'
                : 'bg-white/80 backdrop-blur-sm text-charcoal-700 hover:bg-white hover:text-charcoal-900'
            }`}
            title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setQuickViewProduct(product);
            }}
            className="w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm text-charcoal-700 hover:bg-white hover:text-charcoal-900 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100 shadow-subtle"
            title="Quick view product"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Overlay Action Bar on Hover */}
        <div className="absolute inset-x-3 bottom-3 flex gap-2 z-10 opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              addToCart(product);
            }}
            className="flex-1 py-2.5 bg-white/95 backdrop-blur-md text-charcoal-900 hover:bg-charcoal-900 hover:text-white rounded-xl text-xs font-semibold tracking-wider uppercase transition-colors shadow-subtle flex items-center justify-center gap-1.5"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Add to Bag
          </button>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          <div className="flex items-center justify-between text-xs text-taupe-dark mb-1">
            <span className="uppercase tracking-widest text-[10px] font-medium">{product.brand}</span>
            <div className="flex items-center gap-1 text-amber-600 font-medium">
              <Star className="w-3 h-3 fill-current" />
              <span>{product.rating}</span>
            </div>
          </div>

          <Link to={`/product/${product.productId}`} className="block group-hover:text-bronze transition-colors">
            <h3 className="font-serif text-base text-charcoal-900 line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {/* Aesthetic tags */}
          <div className="flex items-center gap-1.5 mt-1.5 flex-wrap">
            {product.aestheticTags.slice(0, 2).map(tag => (
              <span key={tag} className="text-[10px] text-charcoal-500 bg-sand/50 px-2 py-0.5 rounded-full capitalize">
                #{tag.replace('-', ' ')}
              </span>
            ))}
          </div>
        </div>

        {/* Pricing & Signature Complete My Look Button */}
        <div className="pt-2 border-t border-sand/50 flex flex-col gap-2.5">
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-lg font-semibold text-charcoal-900">
                ${product.discountPrice || product.price}
              </span>
              {product.discountPrice && (
                <span className="text-xs text-taupe-dark line-through">
                  ${product.price}
                </span>
              )}
            </div>
            <span className="text-[11px] text-taupe-dark capitalize">
              {product.subcategory}
            </span>
          </div>

          {/* PRIMARY SIGNATURE CTA: Complete My Look */}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              openCompleteMyLook(product);
            }}
            className="w-full py-2 px-3 rounded-xl border border-charcoal-900/15 bg-sand-light hover:bg-charcoal-900 hover:text-ivory-50 text-charcoal-900 text-xs font-semibold tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 group/btn shadow-subtle"
            title="Style complementary pieces with this item"
          >
            <Sparkles className="w-3.5 h-3.5 text-gold group-hover/btn:rotate-12 transition-transform" />
            <span>Complete My Look</span>
          </button>
        </div>
      </div>
    </div>
  );
};

