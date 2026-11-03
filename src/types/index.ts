export type MoodType =
  | 'elegant'
  | 'casual'
  | 'party'
  | 'luxury'
  | 'minimal'
  | 'streetwear'
  | 'chic'
  | 'vintage'
  | 'romantic'
  | 'sporty';

export type AestheticType =
  | 'old-money'
  | 'coquette'
  | 'street-style'
  | 'clean-girl'
  | 'dark-academia'
  | 'minimalist'
  | 'y2k'
  | 'quiet-luxury'
  | 'bohemian'
  | 'classic';

export type OccasionType =
  | 'college'
  | 'office'
  | 'date-night'
  | 'wedding'
  | 'vacation'
  | 'party'
  | 'casual-outings'
  | 'festive-wear';

export type ProductCategory =
  | 'clothing'
  | 'footwear'
  | 'bags'
  | 'jewellery'
  | 'accessories';

export interface ProductColor {
  name: string;
  hex: string;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  productId: string;
  name: string;
  brand: string;
  description: string;
  price: number;
  discountPrice?: number;
  category: ProductCategory;
  subcategory: string;
  images: string[];
  availableSizes: string[];
  availableColors: ProductColor[];
  moodTags: MoodType[];
  aestheticTags: AestheticType[];
  occasionTags: OccasionType[];
  styleTags: string[];
  productTags: string[];
  rating: number;
  reviewsCount: number;
  stock: number;
  isTrending?: boolean;
  isNew?: boolean;
  editorialCollection?: string;
  reviews?: ProductReview[];
}

export interface MoodConfig {
  id: MoodType;
  name: string;
  tagline: string;
  description: string;
  quote: string;
  auraGradient: string;
  accentBg: string;
  image: string;
  recommendedKeywords: string[];
}

export interface AestheticConfig {
  id: AestheticType;
  name: string;
  tagline: string;
  description: string;
  image: string;
  colorPalette: string[];
  vibe: string;
}

export interface OccasionConfig {
  id: OccasionType;
  name: string;
  description: string;
  image: string;
}

export interface CartItem {
  id: string; // unique item id in cart
  product: Product;
  quantity: number;
  selectedSize: string;
  selectedColor: ProductColor;
  lookBundleId?: string; // if part of Complete My Look bundle
}

export interface SavedLook {
  id: string;
  title: string;
  createdAt: string;
  heroProduct: Product;
  complementaryProducts: Product[];
  totalPrice: number;
  discountedTotal: number;
  mood?: MoodType;
}

export interface UserPreferences {
  activeMood: MoodType;
  favoriteAesthetics: AestheticType[];
  preferredColors: string[];
  occasions: OccasionType[];
  budgetRange: [number, number];
}

export interface UserProfile {
  uid: string;
  name: string;
  email: string;
  isAnonymous?: boolean;
  preferences: UserPreferences;
  savedLooks: SavedLook[];
  wishlist: string[]; // product IDs
  recentlyViewed: string[]; // product IDs
  orderHistory: Order[];
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  items: CartItem[];
  totalAmount: number;
  subtotal: number;
  discount: number;
  status: 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered';
  shippingAddress: {
    fullName: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: string;
}

