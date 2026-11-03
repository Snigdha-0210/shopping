import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserProfile, UserPreferences, SavedLook, Order } from '../types';

interface AuthContextType {
  user: UserProfile | null;
  loading: boolean;
  login: (email: string, name?: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  updatePreferences: (prefs: Partial<UserPreferences>) => void;
  saveLookToProfile: (look: SavedLook) => void;
  removeSavedLook: (lookId: string) => void;
  toggleWishlistItem: (productId: string) => void;
  addOrderToHistory: (order: Order) => void;
}

const defaultPreferences: UserPreferences = {
  activeMood: 'elegant',
  favoriteAesthetics: ['old-money', 'quiet-luxury', 'clean-girl'],
  preferredColors: ['#1C1917', '#F5F2EB', '#C4A482'],
  occasions: ['party', 'office', 'date-night'],
  budgetRange: [50, 600]
};

const initialDefaultUser: UserProfile = {
  uid: 'usr-guest-atelier-01',
  name: 'Eleanor Vance',
  email: 'eleanor.vance@atelier.com',
  isAnonymous: false,
  preferences: defaultPreferences,
  savedLooks: [],
  wishlist: ['prod-001', 'prod-015', 'prod-019'],
  recentlyViewed: ['prod-001', 'prod-002', 'prod-011'],
  orderHistory: [
    {
      id: 'ord-9012',
      orderNumber: 'AA-84920',
      createdAt: '2026-10-24',
      items: [],
      totalAmount: 389.00,
      subtotal: 410.00,
      discount: 21.00,
      status: 'Delivered',
      shippingAddress: {
        fullName: 'Eleanor Vance',
        street: '742 Evergreen Terrace',
        city: 'New York',
        state: 'NY',
        zipCode: '10021',
        country: 'United States'
      },
      paymentMethod: 'Apple Pay (Ending in 4092)'
    }
  ]
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('aura_user_profile');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return initialDefaultUser;
      }
    }
    return initialDefaultUser;
  });

  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('aura_user_profile', JSON.stringify(user));
    }
  }, [user]);

  const login = async (email: string, name?: string) => {
    setLoading(true);
    // Simulate auth or Firebase integration
    setTimeout(() => {
      const newUser: UserProfile = {
        uid: 'usr-' + Math.random().toString(36).substring(2, 9),
        name: name || email.split('@')[0],
        email,
        isAnonymous: false,
        preferences: defaultPreferences,
        savedLooks: user?.savedLooks || [],
        wishlist: user?.wishlist || [],
        recentlyViewed: user?.recentlyViewed || [],
        orderHistory: user?.orderHistory || []
      };
      setUser(newUser);
      setLoading(false);
    }, 500);
  };

  const loginWithGoogle = async () => {
    setLoading(true);
    setTimeout(() => {
      const googleUser: UserProfile = {
        uid: 'usr-google-8891',
        name: 'Sophia Laurent',
        email: 'sophia.laurent@gmail.com',
        isAnonymous: false,
        preferences: defaultPreferences,
        savedLooks: user?.savedLooks || [],
        wishlist: user?.wishlist || [],
        recentlyViewed: user?.recentlyViewed || [],
        orderHistory: user?.orderHistory || []
      };
      setUser(googleUser);
      setLoading(false);
    }, 600);
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('aura_user_profile');
  };

  const updatePreferences = (prefs: Partial<UserPreferences>) => {
    setUser(prev => {
      if (!prev) return null;
      return {
        ...prev,
        preferences: {
          ...prev.preferences,
          ...prefs
        }
      };
    });
  };

  const saveLookToProfile = (look: SavedLook) => {
    setUser(prev => {
      if (!prev) return null;
      const exists = prev.savedLooks.some(l => l.id === look.id);
      const updatedLooks = exists ? prev.savedLooks : [look, ...prev.savedLooks];
      return {
        ...prev,
        savedLooks: updatedLooks
      };
    });
  };

  const removeSavedLook = (lookId: string) => {
    setUser(prev => {
      if (!prev) return null;
      return {
        ...prev,
        savedLooks: prev.savedLooks.filter(l => l.id !== lookId)
      };
    });
  };

  const toggleWishlistItem = (productId: string) => {
    setUser(prev => {
      if (!prev) return null;
      const isWishlisted = prev.wishlist.includes(productId);
      const updated = isWishlisted
        ? prev.wishlist.filter(id => id !== productId)
        : [...prev.wishlist, productId];
      return {
        ...prev,
        wishlist: updated
      };
    });
  };

  const addOrderToHistory = (order: Order) => {
    setUser(prev => {
      if (!prev) return null;
      return {
        ...prev,
        orderHistory: [order, ...prev.orderHistory]
      };
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        loginWithGoogle,
        logout,
        updatePreferences,
        saveLookToProfile,
        removeSavedLook,
        toggleWishlistItem,
        addOrderToHistory
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

