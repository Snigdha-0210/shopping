import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, MoodType, AestheticType, OccasionType, CartItem, ProductColor } from '../types';
import { PRODUCTS } from '../data/products';
import { useAuth } from './AuthContext';

interface ShoppingContextType {
  activeMood: MoodType;
  setActiveMood: (mood: MoodType) => void;
  activeAesthetic: AestheticType | null;
  setActiveAesthetic: (aes: AestheticType | null) => void;
  activeOccasion: OccasionType | null;
  setActiveOccasion: (occ: OccasionType | null) => void;
  
  cart: CartItem[];
  addToCart: (product: Product, size?: string, color?: ProductColor, bundleId?: string) => void;
  addCompleteLookToCart: (items: Product[]) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQty: number) => void;
  clearCart: () => void;
  
  cartSubtotal: number;
  cartDiscount: number;
  cartTotal: number;
  cartCount: number;
  
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  
  stylingHeroProduct: Product | null;
  openCompleteMyLook: (product: Product) => void;
  closeCompleteMyLook: () => void;
  
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  
  trackViewedProduct: (productId: string) => void;
  recentlyViewedProducts: Product[];
}

const ShoppingContext = createContext<ShoppingContextType | undefined>(undefined);

export const ShoppingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, updatePreferences } = useAuth();

  const [activeMood, setActiveMoodState] = useState<MoodType>(() => {
    return user?.preferences.activeMood || 'elegant';
  });

  const [activeAesthetic, setActiveAesthetic] = useState<AestheticType | null>(null);
  const [activeOccasion, setActiveOccasion] = useState<OccasionType | null>(null);

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('aura_cart');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });

  const [recentlyViewedIds, setRecentlyViewedIds] = useState<string[]>(() => {
    return user?.recentlyViewed || ['prod-001', 'prod-002', 'prod-011'];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [stylingHeroProduct, setStylingHeroProduct] = useState<Product | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    localStorage.setItem('aura_cart', JSON.stringify(cart));
  }, [cart]);

  const setActiveMood = (mood: MoodType) => {
    setActiveMoodState(mood);
    updatePreferences({ activeMood: mood });
  };

  const addToCart = (
    product: Product,
    size?: string,
    color?: ProductColor,
    bundleId?: string
  ) => {
    const selectedSize = size || product.availableSizes[0] || 'Standard';
    const selectedColor = color || product.availableColors[0];
    const itemId = `${product.productId}-${selectedSize}-${selectedColor.name}${bundleId ? `-${bundleId}` : ''}`;

    setCart(prev => {
      const existing = prev.find(item => item.id === itemId);
      if (existing) {
        return prev.map(item =>
          item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          product,
          quantity: 1,
          selectedSize,
          selectedColor,
          lookBundleId: bundleId
        }
      ];
    });

    setIsCartOpen(true);
  };

  const addCompleteLookToCart = (items: Product[]) => {
    const bundleId = 'look-' + Math.random().toString(36).substring(2, 8);
    items.forEach(product => {
      addToCart(product, product.availableSizes[0], product.availableColors[0], bundleId);
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev =>
      prev.map(item => (item.id === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const openCompleteMyLook = (product: Product) => {
    setStylingHeroProduct(product);
  };

  const closeCompleteMyLook = () => {
    setStylingHeroProduct(null);
  };

  const trackViewedProduct = (productId: string) => {
    setRecentlyViewedIds(prev => {
      const filtered = prev.filter(id => id !== productId);
      return [productId, ...filtered].slice(0, 10);
    });
  };

  // Calculations
  const cartSubtotal = cart.reduce((sum, item) => {
    const price = item.product.price;
    return sum + price * item.quantity;
  }, 0);

  // 15% discount for bundle items or individual product discounts
  const cartDiscount = cart.reduce((sum, item) => {
    const regular = item.product.price;
    const effective = item.lookBundleId
      ? regular * 0.85 // 15% bundle discount
      : (item.product.discountPrice || regular);
    return sum + (regular - effective) * item.quantity;
  }, 0);

  const cartTotal = Math.max(0, cartSubtotal - cartDiscount);
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  const recentlyViewedProducts = recentlyViewedIds
    .map(id => PRODUCTS.find(p => p.productId === id))
    .filter((p): p is Product => Boolean(p));

  return (
    <ShoppingContext.Provider
      value={{
        activeMood,
        setActiveMood,
        activeAesthetic,
        setActiveAesthetic,
        activeOccasion,
        setActiveOccasion,
        cart,
        addToCart,
        addCompleteLookToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartSubtotal,
        cartDiscount,
        cartTotal,
        cartCount,
        isCartOpen,
        setIsCartOpen,
        stylingHeroProduct,
        openCompleteMyLook,
        closeCompleteMyLook,
        quickViewProduct,
        setQuickViewProduct,
        searchQuery,
        setSearchQuery,
        trackViewedProduct,
        recentlyViewedProducts
      }}
    >
      {children}
    </ShoppingContext.Provider>
  );
};

export const useShopping = () => {
  const context = useContext(ShoppingContext);
  if (!context) {
    throw new Error('useShopping must be used within a ShoppingProvider');
  }
  return context;
};

