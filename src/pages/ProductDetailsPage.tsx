import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Heart, 
  Sparkles, 
  ShoppingBag, 
  Star, 
  Check, 
  Truck, 
  ShieldCheck, 
  RotateCcw,
  ArrowRight,
  Eye,
  Share2
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/common/ProductCard';
import { useShopping } from '../context/ShoppingContext';
import { useAuth } from '../context/AuthContext';
import { getCompleteLookRecommendations, getSimilarProducts } from '../utils/recommendations';

export const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, openCompleteMyLook, trackViewedProduct } = useShopping();
  const { user, toggleWishlistItem } = useAuth();

  const product = PRODUCTS.find(p => p.productId === id) || PRODUCTS[0];

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColorIdx, setSelectedColorIdx] = useState(0);
  const [addedNotice, setAddedNotice] = useState(false);

  // Track product view in browsing history
  useEffect(() => {
    if (product) {
      trackViewedProduct(product.productId);
      window.scrollTo(0, 0);
    }
  }, [product.productId]);

  const currentSize = selectedSize || product.availableSizes[0] || 'Standard';
  const currentColor = product.availableColors[selectedColorIdx] || product.availableColors[0];
  const isWishlisted = user?.wishlist.includes(product.productId) || false;

  const lookRecommendations = getCompleteLookRecommendations(product, PRODUCTS);
  const similarProducts = getSimilarProducts(product, PRODUCTS);

  const handleAddToCart = () => {
    addToCart(product, currentSize, currentColor);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      
      {/* Breadcrumb */}
      <nav className="text-xs text-taupe-dark flex items-center gap-2">
        <Link to="/" className="hover:text-charcoal-900">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-charcoal-900">Shop</Link>
        <span>/</span>
        <Link to={`/moods?mood=${product.moodTags[0]}`} className="hover:text-charcoal-900 capitalize">{product.moodTags[0]} Mood</Link>
        <span>/</span>
        <span className="text-charcoal-900 font-medium truncate">{product.name}</span>
      </nav>

      {/* Main Product Stage (2 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left: Multi-Image Gallery (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="aspect-[3/4] rounded-3xl overflow-hidden bg-sand-light border border-sand shadow-soft relative group">
            <img
              src={product.images[activeImageIdx] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            {product.isTrending && (
              <span className="absolute top-4 left-4 px-3 py-1 bg-charcoal-900 text-ivory-50 text-[10px] uppercase font-bold tracking-widest rounded-full shadow-subtle">
                Trending Choice
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`w-20 h-24 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                    activeImageIdx === idx ? 'border-charcoal-900 scale-102 ring-1 ring-charcoal-900' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Info & Actions (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          <div>
            <div className="flex items-center justify-between text-xs text-taupe-dark mb-1.5">
              <span className="uppercase tracking-widest font-semibold">{product.brand}</span>
              <div className="flex items-center gap-1 text-amber-600 font-medium">
                <Star className="w-4 h-4 fill-current" />
                <span>{product.rating}</span>
                <span className="text-taupe-dark">({product.reviewsCount} reviews)</span>
              </div>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl text-charcoal-900 leading-tight">
              {product.name}
            </h1>

            {/* Pricing */}
            <div className="flex items-baseline gap-3 mt-3">
              <span className="font-serif text-3xl font-bold text-charcoal-900">
                ${product.discountPrice || product.price}
              </span>
              {product.discountPrice && (
                <span className="text-base text-taupe-dark line-through">
                  ${product.price}
                </span>
              )}
              {product.discountPrice && (
                <span className="px-2 py-0.5 text-xs font-semibold bg-emerald-100 text-emerald-800 rounded-md">
                  Save ${(product.price - product.discountPrice).toFixed(0)}
                </span>
              )}
            </div>
          </div>

          {/* Mood & Aesthetic tags */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-sand">
            <span className="px-3 py-1 rounded-full bg-sand/70 text-charcoal-800 text-xs font-medium capitalize">
              Mood: {product.moodTags.join(', ')}
            </span>
            {product.aestheticTags.map(aes => (
              <span key={aes} className="px-3 py-1 rounded-full bg-ivory-100 border border-sand text-charcoal-700 text-xs font-medium capitalize">
                #{aes.replace('-', ' ')}
              </span>
            ))}
          </div>

          <p className="text-xs sm:text-sm text-charcoal-600 font-light leading-relaxed">
            {product.description}
          </p>

          {/* Color Selector */}
          <div>
            <span className="text-xs uppercase font-semibold text-charcoal-800 tracking-wider block mb-2">
              Color: <span className="font-normal text-taupe-dark">{currentColor.name}</span>
            </span>
            <div className="flex gap-2.5">
              {product.availableColors.map((color, idx) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColorIdx(idx)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
                    selectedColorIdx === idx ? 'ring-2 ring-charcoal-900 scale-110' : 'border-sand hover:scale-105'
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                >
                  {selectedColorIdx === idx && (
                    <Check className={`w-4 h-4 ${color.hex === '#FFFFFF' || color.hex === '#F5F2EB' ? 'text-charcoal-900' : 'text-white'}`} />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selector */}
          {product.availableSizes.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs uppercase font-semibold text-charcoal-800 tracking-wider">
                  Select Size
                </span>
                <span className="text-xs text-taupe-dark hover:underline cursor-pointer">
                  Size Guide & Fit
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.availableSizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all ${
                      currentSize === size
                        ? 'bg-charcoal-900 text-ivory-50 shadow-subtle'
                        : 'bg-white border border-sand hover:border-taupe text-charcoal-800'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3 pt-4 border-t border-sand">
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex-1 py-4 rounded-2xl bg-charcoal-900 hover:bg-charcoal-800 text-ivory-50 text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 shadow-soft"
              >
                <ShoppingBag className="w-4 h-4 text-gold" />
                Add to Bag
              </button>

              <button
                type="button"
                onClick={() => toggleWishlistItem(product.productId)}
                className={`p-4 rounded-2xl border transition-colors flex items-center justify-center ${
                  isWishlisted
                    ? 'bg-rose-50 border-rose-200 text-rose-600'
                    : 'bg-white border-sand text-charcoal-700 hover:text-charcoal-900'
                }`}
                title={isWishlisted ? "Wishlisted" : "Add to wishlist"}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* PRIMARY SIGNATURE CTA: Complete My Look */}
            <button
              type="button"
              onClick={() => openCompleteMyLook(product)}
              className="w-full py-3.5 px-4 rounded-2xl bg-sand hover:bg-sand-dark text-charcoal-900 text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-2 border border-sand-dark shadow-subtle"
            >
              <Sparkles className="w-4 h-4 text-gold" />
              Complete My Look Studio (15% Bundle Savings)
            </button>

            {addedNotice && (
              <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs flex items-center gap-2 animate-in fade-in">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Added to bag! Size: {currentSize}, Color: {currentColor.name}</span>
              </div>
            )}
          </div>

          {/* Service Guarantees */}
          <div className="p-4 rounded-2xl bg-sand-light/60 border border-sand space-y-2 text-xs text-charcoal-700">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-taupe-dark" />
              <span>Complimentary express delivery on orders over $150</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-taupe-dark" />
              <span>30-day effortless return & exchange privilege</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-taupe-dark" />
              <span>100% authenticated artisanal craftsmanship</span>
            </div>
          </div>

        </div>

      </div>

      {/* 2. SIGNATURE COMPLETE MY LOOK INLINE SECTION */}
      <section className="bg-white rounded-3xl p-8 sm:p-12 border border-sand shadow-soft space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-taupe-dark font-semibold mb-1">
              <Sparkles className="w-3.5 h-3.5 text-gold" />
              <span>Signature Stylist Suggestions</span>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-charcoal-900">
              Complete Your Look With This Piece
            </h3>
            <p className="text-xs text-taupe-dark mt-1">
              Our styling engine generated these handpicked complements specifically for your {product.name}
            </p>
          </div>

          <button
            onClick={() => openCompleteMyLook(product)}
            className="px-6 py-3 rounded-full bg-charcoal-900 text-ivory-50 text-xs uppercase tracking-wider font-semibold hover:bg-charcoal-800 transition-colors flex items-center gap-2 shadow-subtle shrink-0"
          >
            <Sparkles className="w-4 h-4 text-gold" />
            <span>Customize Full Look Canvas</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            lookRecommendations.bestMatchingLook.footwear,
            lookRecommendations.bestMatchingLook.bags,
            lookRecommendations.bestMatchingLook.jewellery,
            lookRecommendations.bestMatchingLook.accessories,
          ].filter((p): p is typeof product => Boolean(p)).map(item => (
            <ProductCard key={item.productId} product={item} />
          ))}
        </div>
      </section>

      {/* 3. Customer Reviews Section */}
      <section className="space-y-6 pt-6 border-t border-sand">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif text-2xl text-charcoal-900">Atelier Client Reviews</h3>
            <p className="text-xs text-taupe-dark">Verified feedback from connoisseurs</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-serif text-2xl font-bold text-charcoal-900">{product.rating}</span>
            <div className="flex text-amber-600">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {(product.reviews || [
            {
              id: 'rev-default-1',
              author: 'Elena Rostova',
              rating: 5,
              date: '1 week ago',
              comment: 'Exceptional tailoring and material feel. Styled with the recommended kitten heels for an opening night, perfectly balanced look.',
              verified: true
            },
            {
              id: 'rev-default-2',
              author: 'Audrey Thorne',
              rating: 5,
              date: '3 weeks ago',
              comment: 'The Complete My Look suggestion was spot-on. I ordered the matching handbag and earrings together and received endless compliments.',
              verified: true
            }
          ]).map(rev => (
            <div key={rev.id} className="p-5 rounded-2xl bg-white border border-sand space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-sm font-semibold text-charcoal-900">{rev.author}</span>
                  {rev.verified && (
                    <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">
                      Verified Purchase
                    </span>
                  )}
                </div>
                <span className="text-xs text-taupe-dark">{rev.date}</span>
              </div>
              <div className="flex text-amber-600">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <p className="text-xs text-charcoal-600 leading-relaxed font-light">
                "{rev.comment}"
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Similar Products Section */}
      <section className="space-y-6 pt-6 border-t border-sand">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-serif text-2xl text-charcoal-900">Similar Creations</h3>
            <p className="text-xs text-taupe-dark">More pieces sharing this silhouette and mood</p>
          </div>
          <Link to="/shop" className="text-xs uppercase font-semibold text-charcoal-800 hover:text-charcoal-900 underline">
            View All
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {similarProducts.map(p => (
            <ProductCard key={p.productId} product={p} />
          ))}
        </div>
      </section>

    </div>
  );
};

