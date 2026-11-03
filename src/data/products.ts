import { Product } from '../types';

export const PRODUCTS: Product[] = [
  // --- CLOTHING ---
  {
    productId: 'prod-001',
    name: 'Aura Silk Backless Evening Gown',
    brand: 'Maison Éthérée',
    description: 'Sculpted from 100% 22-momme mulberry silk, this floor-sweeping gown features a delicate cowl neckline, fluid drape, and an open back designed for unforgettable evenings.',
    price: 340,
    discountPrice: 289,
    category: 'clothing',
    subcategory: 'Dresses',
    images: [
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: ['XS', 'S', 'M', 'L'],
    availableColors: [
      { name: 'Noir Black', hex: '#1C1917' },
      { name: 'Champagne Gold', hex: '#D4AF37' },
      { name: 'Burgundy Wine', hex: '#5E1914' }
    ],
    moodTags: ['elegant', 'party', 'luxury', 'romantic'],
    aestheticTags: ['quiet-luxury', 'old-money', 'classic'],
    occasionTags: ['party', 'wedding', 'date-night'],
    styleTags: ['Silk', 'Backless', 'Cowl Neck', 'Gown', 'Evening'],
    productTags: ['dress', 'silk', 'black', 'evening', 'formal'],
    rating: 4.9,
    reviewsCount: 42,
    stock: 14,
    isTrending: true,
    editorialCollection: 'The Elegant Edit',
    reviews: [
      {
        id: 'rev-1',
        author: 'Elena Rostova',
        rating: 5,
        date: '2 weeks ago',
        comment: 'The drape of this mulberry silk is sensational. Wore it to a gala and received compliments all night.',
        verified: true
      },
      {
        id: 'rev-2',
        author: 'Camille Laurent',
        rating: 5,
        date: '1 month ago',
        comment: 'Fits true to size. The cowl back is breathtaking.',
        verified: true
      }
    ]
  },
  {
    productId: 'prod-002',
    name: 'Atelier Tailored Double-Breasted Blazer',
    brand: 'Kaufmann & Sons',
    description: 'Precision Italian wool tailored with sharp peak lapels, horn buttons, and a structured shoulder silhouette that anchors any quiet luxury wardrobe.',
    price: 420,
    discountPrice: 375,
    category: 'clothing',
    subcategory: 'Blazers',
    images: [
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: ['S', 'M', 'L', 'XL'],
    availableColors: [
      { name: 'Oatmeal Taupe', hex: '#C4B5A5' },
      { name: 'Charcoal Black', hex: '#292524' }
    ],
    moodTags: ['elegant', 'luxury', 'minimal', 'chic'],
    aestheticTags: ['old-money', 'quiet-luxury', 'clean-girl', 'classic'],
    occasionTags: ['office', 'casual-outings', 'date-night'],
    styleTags: ['Wool', 'Double-Breasted', 'Structured', 'Outerwear'],
    productTags: ['blazer', 'wool', 'tailored', 'jacket'],
    rating: 4.8,
    reviewsCount: 38,
    stock: 19,
    isTrending: true,
    editorialCollection: 'The Elegant Edit'
  },
  {
    productId: 'prod-003',
    name: 'Relaxed Poplin Oversized Shirt',
    brand: 'Studio Élan',
    description: 'Crisp organic cotton poplin cut with generous boxy proportions, dropped shoulders, and mother-of-pearl buttons for effortless Parisian and clean-girl styling.',
    price: 135,
    category: 'clothing',
    subcategory: 'Shirts',
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: ['XS', 'S', 'M', 'L', 'XL'],
    availableColors: [
      { name: 'Crisp White', hex: '#FFFFFF' },
      { name: 'Sky Stripe', hex: '#B0C4DE' }
    ],
    moodTags: ['casual', 'minimal', 'chic'],
    aestheticTags: ['clean-girl', 'minimalist', 'classic', 'old-money'],
    occasionTags: ['casual-outings', 'office', 'college', 'vacation'],
    styleTags: ['Poplin', 'Oversized', 'Cotton', 'Classic Shirt'],
    productTags: ['shirt', 'white shirt', 'oversized', 'button-down'],
    rating: 4.7,
    reviewsCount: 56,
    stock: 35,
    isTrending: false,
    editorialCollection: 'Everyday Essentials'
  },
  {
    productId: 'prod-004',
    name: 'Wide-Leg Pleated Tailored Trousers',
    brand: 'Studio Élan',
    description: 'Flattering high-rise waist with fluid double front pleats and a relaxed drape through the leg. Cut in a seasonless crepe fabric.',
    price: 185,
    discountPrice: 155,
    category: 'clothing',
    subcategory: 'Trousers',
    images: [
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: ['XS', 'S', 'M', 'L'],
    availableColors: [
      { name: 'Sand Beige', hex: '#EBE6DD' },
      { name: 'Charcoal Black', hex: '#1C1917' }
    ],
    moodTags: ['minimal', 'elegant', 'casual', 'chic'],
    aestheticTags: ['clean-girl', 'old-money', 'minimalist', 'quiet-luxury'],
    occasionTags: ['office', 'casual-outings', 'date-night', 'college'],
    styleTags: ['Pleated', 'Wide Leg', 'High Rise', 'Tailored Pants'],
    productTags: ['trousers', 'pants', 'wide leg', 'pleated'],
    rating: 4.8,
    reviewsCount: 31,
    stock: 22,
    editorialCollection: 'Minimal Wardrobe'
  },
  {
    productId: 'prod-005',
    name: 'Midnight Sequin Halter Mini Dress',
    brand: 'Vesper Noir',
    description: 'Catch every ray of candlelight in this head-turning mini dress encrusted with micro-sequins, featuring a sculpted neckline and cross-tie back.',
    price: 260,
    discountPrice: 219,
    category: 'clothing',
    subcategory: 'Dresses',
    images: [
      'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: ['XS', 'S', 'M'],
    availableColors: [
      { name: 'Silver Shimmer', hex: '#D1D5DB' },
      { name: 'Midnight Onyx', hex: '#111827' }
    ],
    moodTags: ['party', 'chic'],
    aestheticTags: ['y2k', 'street-style'],
    occasionTags: ['party', 'date-night'],
    styleTags: ['Sequins', 'Halter', 'Mini Dress', 'Party'],
    productTags: ['dress', 'sequin', 'party dress', 'mini'],
    rating: 4.9,
    reviewsCount: 29,
    stock: 8,
    isTrending: true,
    editorialCollection: 'Party Ready'
  },
  {
    productId: 'prod-006',
    name: 'Heavyweight Fleece Boxy Hoodie',
    brand: 'Sub Rosa Street',
    description: 'Constructed from 480gsm custom loopback French terry with seamless raglan sleeves, dense ribbed cuffs, and zero exterior branding.',
    price: 145,
    category: 'clothing',
    subcategory: 'Hoodies',
    images: [
      'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: ['S', 'M', 'L', 'XL'],
    availableColors: [
      { name: 'Washed Ash Grey', hex: '#71717A' },
      { name: 'Faded Black', hex: '#27272A' }
    ],
    moodTags: ['streetwear', 'casual', 'sporty'],
    aestheticTags: ['street-style', 'minimalist', 'y2k'],
    occasionTags: ['college', 'casual-outings'],
    styleTags: ['Heavyweight', 'Boxy', 'Hoodie', 'Streetwear'],
    productTags: ['hoodie', 'sweatshirt', 'fleece', 'streetwear'],
    rating: 4.7,
    reviewsCount: 64,
    stock: 28,
    editorialCollection: 'Weekend Collection'
  },
  {
    productId: 'prod-007',
    name: 'Tiered Chiffon Romantic Maxi Skirt',
    brand: 'Fleur d’Amour',
    description: 'Ethereal ruffled tiers crafted in gossamer floral printed chiffon, designed with a smocked waistband and sunburst flounce.',
    price: 195,
    category: 'clothing',
    subcategory: 'Skirts',
    images: [
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: ['XS', 'S', 'M', 'L'],
    availableColors: [
      { name: 'Blush Floral', hex: '#FAD2E1' },
      { name: 'Sage Garden', hex: '#BEE1E6' }
    ],
    moodTags: ['romantic', 'vintage', 'casual'],
    aestheticTags: ['coquette', 'bohemian'],
    occasionTags: ['date-night', 'vacation', 'casual-outings'],
    styleTags: ['Chiffon', 'Tiered', 'Floral', 'Maxi Skirt'],
    productTags: ['skirt', 'maxi', 'floral', 'romantic'],
    rating: 4.9,
    reviewsCount: 19,
    stock: 12,
    editorialCollection: 'Trending This Season'
  },
  {
    productId: 'prod-008',
    name: 'Vintage Houndstooth Tweed Jacket',
    brand: 'Heritage Atelier',
    description: 'Inspired by archival 1960s British tailoring, featuring warm virgin wool houndstooth, braided contrast cord trim, and brushed brass crest buttons.',
    price: 380,
    discountPrice: 320,
    category: 'clothing',
    subcategory: 'Jackets',
    images: [
      'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: ['S', 'M', 'L'],
    availableColors: [
      { name: 'Espresso Houndstooth', hex: '#4A3B32' },
      { name: 'Cream Navy', hex: '#1E293B' }
    ],
    moodTags: ['vintage', 'elegant', 'chic'],
    aestheticTags: ['dark-academia', 'old-money', 'classic'],
    occasionTags: ['college', 'office', 'casual-outings'],
    styleTags: ['Tweed', 'Houndstooth', 'Wool', 'Crest Buttons'],
    productTags: ['jacket', 'tweed', 'vintage', 'blazer'],
    rating: 4.8,
    reviewsCount: 22,
    stock: 9,
    editorialCollection: 'The Elegant Edit'
  },
  {
    productId: 'prod-009',
    name: 'Technical Seamless Aerodynamic Rib Tank',
    brand: 'Aura Sport',
    description: 'Engineered with 4-way stretch micro-compression fabric and thermal moisture control, transitioning seamlessly from morning pilates to casual styling.',
    price: 78,
    category: 'clothing',
    subcategory: 'Tops',
    images: [
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: ['XS', 'S', 'M', 'L'],
    availableColors: [
      { name: 'Slate Olive', hex: '#556B2F' },
      { name: 'Charcoal Noir', hex: '#1C1917' }
    ],
    moodTags: ['sporty', 'casual', 'minimal'],
    aestheticTags: ['clean-girl', 'street-style'],
    occasionTags: ['college', 'casual-outings', 'vacation'],
    styleTags: ['Seamless', 'Ribbed', 'Compression', 'Activewear'],
    productTags: ['tank top', 'sporty', 'activewear', 'ribbed'],
    rating: 4.6,
    reviewsCount: 45,
    stock: 40,
    editorialCollection: 'Weekend Collection'
  },
  {
    productId: 'prod-010',
    name: 'Vintage Wash High-Rise Straight Jeans',
    brand: 'Kaufmann Denim',
    description: '100% rigid regenerative cotton denim with authentic 90s stone-washing, tobacco contrast stitching, and a leg-lengthening straight cut.',
    price: 165,
    category: 'clothing',
    subcategory: 'Denim',
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: ['24', '25', '26', '27', '28', '29', '30'],
    availableColors: [
      { name: 'Vintage Indigo', hex: '#3B82F6' },
      { name: 'Washed Charcoal', hex: '#374151' }
    ],
    moodTags: ['casual', 'minimal', 'streetwear'],
    aestheticTags: ['classic', 'clean-girl', 'minimalist'],
    occasionTags: ['college', 'casual-outings', 'vacation'],
    styleTags: ['High Rise', 'Straight Leg', 'Rigid Denim'],
    productTags: ['jeans', 'denim', 'casual', 'pants'],
    rating: 4.9,
    reviewsCount: 51,
    stock: 24,
    editorialCollection: 'Everyday Essentials'
  },

  // --- FOOTWEAR ---
  {
    productId: 'prod-011',
    name: 'Palermo Italian Calfskin Pointed Stiletto Pumps',
    brand: 'Aura Atelier Footwear',
    description: 'Handcrafted in Florence with buttery Italian nappa leather, a sleek 90mm sculpted heel, and padded memory-foam insole for poised evening comfort.',
    price: 360,
    discountPrice: 295,
    category: 'footwear',
    subcategory: 'Heels',
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: ['36', '37', '38', '39', '40', '41'],
    availableColors: [
      { name: 'Midnight Onyx', hex: '#1C1917' },
      { name: 'Nude Almond', hex: '#E2D7CF' },
      { name: 'Metallic Gold', hex: '#D4AF37' }
    ],
    moodTags: ['elegant', 'party', 'luxury', 'chic'],
    aestheticTags: ['old-money', 'quiet-luxury', 'classic'],
    occasionTags: ['party', 'wedding', 'date-night', 'office'],
    styleTags: ['Pointed Toe', 'Stiletto', 'Italian Leather', 'Heels'],
    productTags: ['heels', 'stiletto', 'pumps', 'shoes', 'leather'],
    rating: 4.9,
    reviewsCount: 34,
    stock: 15,
    isTrending: true,
    editorialCollection: 'The Elegant Edit'
  },
  {
    productId: 'prod-012',
    name: 'Retro 80s Suede Court Trainers',
    brand: 'Sub Rosa Street',
    description: 'Vintage basketball silhouettes reborn in buttery bone suede and chalk leather, grounded on gum rubber soles with subtle debossed emblems.',
    price: 160,
    category: 'footwear',
    subcategory: 'Sneakers',
    images: [
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: ['37', '38', '39', '40', '41', '42', '43'],
    availableColors: [
      { name: 'Chalk & Gum', hex: '#FAF8F5' },
      { name: 'Ash Charcoal', hex: '#4B5563' }
    ],
    moodTags: ['casual', 'streetwear', 'sporty', 'minimal'],
    aestheticTags: ['street-style', 'clean-girl', 'minimalist', 'classic'],
    occasionTags: ['casual-outings', 'college', 'vacation'],
    styleTags: ['Retro', 'Gum Sole', 'Suede', 'Sneakers'],
    productTags: ['sneakers', 'trainers', 'shoes', 'casual shoes'],
    rating: 4.8,
    reviewsCount: 78,
    stock: 30,
    isTrending: true,
    editorialCollection: 'Everyday Essentials'
  },
  {
    productId: 'prod-013',
    name: 'Belgravia Horsebit Suede Loafers',
    brand: 'Heritage Atelier',
    description: 'Understated aristocratic refinement featuring water-resistant camel suede, Blake-stitched leather soles, and antique gold horsebit hardware.',
    price: 310,
    discountPrice: 275,
    category: 'footwear',
    subcategory: 'Loafers',
    images: [
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: ['37', '38', '39', '40', '41'],
    availableColors: [
      { name: 'Chestnut Suede', hex: '#8B5A2B' },
      { name: 'Deep Espresso', hex: '#2F1B17' }
    ],
    moodTags: ['luxury', 'vintage', 'elegant', 'casual'],
    aestheticTags: ['old-money', 'dark-academia', 'quiet-luxury', 'classic'],
    occasionTags: ['office', 'college', 'casual-outings'],
    styleTags: ['Horsebit', 'Suede', 'Loafers', 'Slip-on'],
    productTags: ['loafers', 'shoes', 'flat shoes', 'leather'],
    rating: 4.9,
    reviewsCount: 26,
    stock: 14,
    editorialCollection: 'Minimal Wardrobe'
  },
  {
    productId: 'prod-014',
    name: 'Lucia Strappy Metallic Ankle-Tie Sandals',
    brand: 'Vesper Noir',
    description: 'Slender metallic leather straps caress the foot, culminating in self-tie ribbons around the ankle. Designed with a leg-accentuating 85mm stiletto.',
    price: 290,
    category: 'footwear',
    subcategory: 'Heels',
    images: [
      'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: ['36', '37', '38', '39', '40'],
    availableColors: [
      { name: 'Liquid Champagne', hex: '#E5C158' },
      { name: 'Chrome Silver', hex: '#E5E7EB' }
    ],
    moodTags: ['party', 'elegant', 'romantic'],
    aestheticTags: ['coquette', 'y2k', 'quiet-luxury'],
    occasionTags: ['party', 'wedding', 'date-night'],
    styleTags: ['Strappy', 'Metallic', 'Ankle Tie', 'Sandals'],
    productTags: ['sandals', 'heels', 'party shoes', 'metallic'],
    rating: 4.8,
    reviewsCount: 20,
    stock: 11,
    editorialCollection: 'Party Ready'
  },

  // --- BAGS ---
  {
    productId: 'prod-015',
    name: 'Siena Structured Trapeze Handbag',
    brand: 'Maison Éthérée',
    description: 'Exquisitely structured in smooth Italian box calf leather with hand-painted raw edges, an accordion interior, and an understated padlock closure.',
    price: 490,
    discountPrice: 420,
    category: 'bags',
    subcategory: 'Handbags',
    images: [
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: ['One Size'],
    availableColors: [
      { name: 'Warm Taupe', hex: '#B8977E' },
      { name: 'Pitch Black', hex: '#1C1917' },
      { name: 'Warm Cream', hex: '#F5F2EB' }
    ],
    moodTags: ['elegant', 'luxury', 'chic', 'minimal'],
    aestheticTags: ['quiet-luxury', 'old-money', 'classic', 'clean-girl'],
    occasionTags: ['office', 'casual-outings', 'date-night', 'wedding'],
    styleTags: ['Calf Leather', 'Structured', 'Top Handle', 'Handbag'],
    productTags: ['bag', 'handbag', 'leather bag', 'purse'],
    rating: 5.0,
    reviewsCount: 47,
    stock: 10,
    isTrending: true,
    editorialCollection: 'The Elegant Edit'
  },
  {
    productId: 'prod-016',
    name: 'Céleste Crystal Fringe Evening Minaudière',
    brand: 'Vesper Noir',
    description: 'Hand-set pavé crystals drape in liquid cascades from a polished gold-plated brass frame. Sized to hold evening lipstick, cards, and keys.',
    price: 310,
    discountPrice: 260,
    category: 'bags',
    subcategory: 'Clutches',
    images: [
      'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: ['One Size'],
    availableColors: [
      { name: 'Crystal Gold', hex: '#D4AF37' },
      { name: 'Crystal Noir', hex: '#1E1E1E' }
    ],
    moodTags: ['party', 'luxury', 'elegant'],
    aestheticTags: ['old-money', 'coquette', 'y2k'],
    occasionTags: ['party', 'wedding', 'date-night'],
    styleTags: ['Crystal', 'Evening Clutch', 'Minaudière', 'Gold Hardware'],
    productTags: ['clutch', 'bag', 'evening bag', 'crystal'],
    rating: 4.9,
    reviewsCount: 18,
    stock: 7,
    editorialCollection: 'Party Ready'
  },
  {
    productId: 'prod-017',
    name: 'Nordic Clean Slouchy Leather Shoulder Bag',
    brand: 'Studio Élan',
    description: 'Pliant pebbled leather formed into a gentle croissant arc that fits comfortably beneath the arm, adorned with a clean concealed magnetic clasp.',
    price: 240,
    category: 'bags',
    subcategory: 'Shoulder Bags',
    images: [
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: ['One Size'],
    availableColors: [
      { name: 'Butter Ivory', hex: '#FAF0E6' },
      { name: 'Muted Espresso', hex: '#3B2F2F' }
    ],
    moodTags: ['minimal', 'casual', 'chic'],
    aestheticTags: ['clean-girl', 'minimalist', 'classic'],
    occasionTags: ['casual-outings', 'college', 'office'],
    styleTags: ['Slouchy', 'Shoulder Bag', 'Pebbled Leather'],
    productTags: ['bag', 'shoulder bag', 'leather tote', 'minimalist'],
    rating: 4.8,
    reviewsCount: 39,
    stock: 18,
    editorialCollection: 'Minimal Wardrobe'
  },
  {
    productId: 'prod-018',
    name: 'Woven Raffia & Saddle Leather Summer Tote',
    brand: 'Atelier Riviera',
    description: 'Hand-braided natural Madagascar raffia complemented by rich vegetable-tanned saddle leather straps and an interior canvas pouch.',
    price: 195,
    category: 'bags',
    subcategory: 'Totes',
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: ['One Size'],
    availableColors: [
      { name: 'Natural Sand & Tan', hex: '#D2B48C' }
    ],
    moodTags: ['casual', 'vintage', 'romantic'],
    aestheticTags: ['bohemian', 'old-money', 'clean-girl'],
    occasionTags: ['vacation', 'casual-outings'],
    styleTags: ['Raffia', 'Woven', 'Tote Bag', 'Resort'],
    productTags: ['tote', 'basket bag', 'summer bag', 'beach bag'],
    rating: 4.7,
    reviewsCount: 23,
    stock: 16,
    editorialCollection: 'Trending This Season'
  },

  // --- JEWELLERY ---
  {
    productId: 'prod-019',
    name: 'Heirloom Baroque Pearl & 18K Gold Drop Earrings',
    brand: 'Aura Joaillerie',
    description: 'Organic freshwater baroque pearls hand-selected for unique luster, suspended from handcrafted 18-karat gold vermeil organic hoops.',
    price: 180,
    discountPrice: 145,
    category: 'jewellery',
    subcategory: 'Earrings',
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: ['One Size'],
    availableColors: [
      { name: 'Lustrous Pearl & Gold', hex: '#D4AF37' }
    ],
    moodTags: ['elegant', 'romantic', 'luxury', 'chic', 'vintage'],
    aestheticTags: ['old-money', 'coquette', 'quiet-luxury', 'classic'],
    occasionTags: ['wedding', 'date-night', 'party', 'office'],
    styleTags: ['Baroque Pearl', '18K Vermeil', 'Drop Earrings', 'Heirloom'],
    productTags: ['earrings', 'pearl earrings', 'jewelry', 'gold'],
    rating: 4.9,
    reviewsCount: 62,
    stock: 25,
    isTrending: true,
    editorialCollection: 'The Elegant Edit'
  },
  {
    productId: 'prod-020',
    name: 'Vermeil Herringbone Chain & Coin Locket',
    brand: 'Aura Joaillerie',
    description: 'Double-strand 18k yellow gold-dipped necklace pairing a liquid-smooth herringbone chain with an antiqued Roman coin pendant.',
    price: 140,
    category: 'jewellery',
    subcategory: 'Necklaces',
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: ['Adjustable 16-18"'],
    availableColors: [
      { name: '18K Gold', hex: '#D4AF37' }
    ],
    moodTags: ['elegant', 'minimal', 'chic', 'vintage'],
    aestheticTags: ['clean-girl', 'old-money', 'classic', 'minimalist'],
    occasionTags: ['casual-outings', 'office', 'date-night', 'college'],
    styleTags: ['Herringbone', 'Layered Necklace', 'Gold Vermeil', 'Coin Pendant'],
    productTags: ['necklace', 'gold chain', 'jewelry', 'pendant'],
    rating: 4.8,
    reviewsCount: 44,
    stock: 21,
    editorialCollection: 'Everyday Essentials'
  },
  {
    productId: 'prod-021',
    name: 'Swiss Horology Petite Roman Dial Watch',
    brand: 'Vanguard Genève',
    description: 'Sunray dial with classic Roman numerals, blued steel hands, and a supple alligator-grain Italian calfskin strap in rich espresso.',
    price: 520,
    discountPrice: 460,
    category: 'jewellery',
    subcategory: 'Watches',
    images: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: ['28mm Case'],
    availableColors: [
      { name: 'Gold & Espresso', hex: '#8B5A2B' },
      { name: 'Silver & Noir', hex: '#1C1917' }
    ],
    moodTags: ['luxury', 'elegant', 'vintage', 'minimal'],
    aestheticTags: ['old-money', 'quiet-luxury', 'dark-academia', 'classic'],
    occasionTags: ['office', 'college', 'wedding', 'date-night'],
    styleTags: ['Swiss Movement', 'Roman Numerals', 'Leather Strap', 'Horology'],
    productTags: ['watch', 'luxury watch', 'timepiece', 'leather watch'],
    rating: 5.0,
    reviewsCount: 33,
    stock: 6,
    isTrending: true,
    editorialCollection: 'The Elegant Edit'
  },
  {
    productId: 'prod-022',
    name: 'Pavé Crystal Tennis Bracelet',
    brand: 'Aura Joaillerie',
    description: 'Seamless row of handset lab-grown zirconia crystals set in rhodium-plated sterling silver with an archival double-safety clasp.',
    price: 210,
    discountPrice: 175,
    category: 'jewellery',
    subcategory: 'Bracelets',
    images: [
      'https://images.unsplash.com/photo-1611591475841-da83c6628c68?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: ['6.5 inch', '7.0 inch'],
    availableColors: [
      { name: 'Platinum Silver', hex: '#E5E7EB' },
      { name: '18K Yellow Gold', hex: '#D4AF37' }
    ],
    moodTags: ['party', 'elegant', 'luxury'],
    aestheticTags: ['old-money', 'quiet-luxury', 'classic'],
    occasionTags: ['party', 'wedding', 'date-night'],
    styleTags: ['Tennis Bracelet', 'Pavé Crystals', 'Sterling Silver'],
    productTags: ['bracelet', 'tennis bracelet', 'crystal', 'jewelry'],
    rating: 4.9,
    reviewsCount: 28,
    stock: 17,
    editorialCollection: 'Party Ready'
  },
  {
    productId: 'prod-023',
    name: 'Chunky Sculptural Silver Dome Hoops',
    brand: 'Sub Rosa Street',
    description: 'Hollow-core recycled sterling silver earrings engineered for lightweight comfort with a mirror-finish contemporary reflection.',
    price: 95,
    category: 'jewellery',
    subcategory: 'Earrings',
    images: [
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: ['Medium 24mm'],
    availableColors: [
      { name: 'Sterling Silver', hex: '#E2E8F0' }
    ],
    moodTags: ['streetwear', 'minimal', 'casual'],
    aestheticTags: ['street-style', 'clean-girl', 'y2k', 'minimalist'],
    occasionTags: ['college', 'casual-outings', 'party'],
    styleTags: ['Dome Hoops', 'Silver', 'Sculptural', 'Modern'],
    productTags: ['earrings', 'hoops', 'silver jewelry', 'streetwear'],
    rating: 4.8,
    reviewsCount: 52,
    stock: 35,
    editorialCollection: 'Weekend Collection'
  },

  // --- ACCESSORIES ---
  {
    productId: 'prod-024',
    name: 'Riviera Beveled Cat-Eye Acetate Sunglasses',
    brand: 'Atelier Riviera',
    description: 'Hand-polished Japanese acetate in deep tortoiseshell with 100% UV400 polarized bronze lenses and custom core wire filigree.',
    price: 190,
    category: 'accessories',
    subcategory: 'Sunglasses',
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: ['One Size'],
    availableColors: [
      { name: 'Havana Tortoise', hex: '#8B5A2B' },
      { name: 'Gloss Noir', hex: '#1C1917' }
    ],
    moodTags: ['chic', 'casual', 'elegant', 'vintage'],
    aestheticTags: ['old-money', 'clean-girl', 'classic', 'quiet-luxury'],
    occasionTags: ['vacation', 'casual-outings', 'office'],
    styleTags: ['Cat Eye', 'Polarized', 'Acetate', 'Sunglasses'],
    productTags: ['sunglasses', 'shades', 'eyewear', 'accessories'],
    rating: 4.9,
    reviewsCount: 41,
    stock: 22,
    isTrending: true,
    editorialCollection: 'Trending This Season'
  },
  {
    productId: 'prod-025',
    name: 'Fine Mulberry Silk Twill Square Scarf',
    brand: 'Maison Éthérée',
    description: '70x70cm hand-rolled silk twill featuring an archival celestial chart print in rich biscuit, taupe, and navy mineral dyes.',
    price: 125,
    category: 'accessories',
    subcategory: 'Scarves',
    images: [
      'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: ['70 x 70 cm'],
    availableColors: [
      { name: 'Celestial Navy & Ochre', hex: '#D4AF37' }
    ],
    moodTags: ['elegant', 'vintage', 'chic'],
    aestheticTags: ['old-money', 'classic', 'dark-academia'],
    occasionTags: ['office', 'casual-outings', 'vacation'],
    styleTags: ['Silk Twill', 'Hand-rolled Hem', 'Square Scarf'],
    productTags: ['scarf', 'silk scarf', 'accessories', 'neck scarf'],
    rating: 4.7,
    reviewsCount: 19,
    stock: 14,
    editorialCollection: 'The Elegant Edit'
  },
  {
    productId: 'prod-026',
    name: 'Florence Saffiano Leather Waist Belt',
    brand: 'Kaufmann & Sons',
    description: 'Reversible 25mm belt in textured saffiano leather with an understated brushed brass buckle. Perfect for cinching coats, blazers, and trousers.',
    price: 110,
    category: 'accessories',
    subcategory: 'Belts',
    images: [
      'https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: ['75cm', '85cm', '95cm'],
    availableColors: [
      { name: 'Black / Cognac Reversible', hex: '#1C1917' }
    ],
    moodTags: ['minimal', 'elegant', 'casual', 'chic'],
    aestheticTags: ['old-money', 'quiet-luxury', 'classic', 'clean-girl'],
    occasionTags: ['office', 'casual-outings', 'college'],
    styleTags: ['Saffiano Leather', 'Reversible', 'Waist Belt', 'Brass Hardware'],
    productTags: ['belt', 'leather belt', 'accessories', 'waist belt'],
    rating: 4.8,
    reviewsCount: 30,
    stock: 25,
    editorialCollection: 'Minimal Wardrobe'
  },
  {
    productId: 'prod-027',
    name: 'Brutalist Matte Black Rimless Y2K Shades',
    brand: 'Sub Rosa Street',
    description: 'Wraparound rimless silhouette with mirrored smoke lenses and chrome skull pin hinge accents.',
    price: 115,
    category: 'accessories',
    subcategory: 'Sunglasses',
    images: [
      'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: ['One Size'],
    availableColors: [
      { name: 'Chrome Mirror', hex: '#CBD5E1' }
    ],
    moodTags: ['streetwear', 'party', 'sporty'],
    aestheticTags: ['y2k', 'street-style'],
    occasionTags: ['party', 'college', 'casual-outings'],
    styleTags: ['Rimless', 'Y2K', 'Wraparound', 'Mirrored'],
    productTags: ['sunglasses', 'y2k', 'eyewear', 'futuristic'],
    rating: 4.6,
    reviewsCount: 37,
    stock: 19,
    editorialCollection: 'Party Ready'
  },
  {
    productId: 'prod-028',
    name: 'Pure Mongolian Cashmere Beanie & Scarf Set',
    brand: 'Kaufmann & Sons',
    description: '100% grade-A Mongolian 2-ply cashmere offering peerless insulation with featherlight weight and cloudlike softness.',
    price: 245,
    discountPrice: 205,
    category: 'accessories',
    subcategory: 'Winterwear',
    images: [
      'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=800&q=80'
    ],
    availableSizes: ['One Size'],
    availableColors: [
      { name: 'Oatmeal Heather', hex: '#DDD5C7' },
      { name: 'Charcoal Melange', hex: '#374151' }
    ],
    moodTags: ['luxury', 'casual', 'minimal'],
    aestheticTags: ['quiet-luxury', 'old-money', 'minimalist'],
    occasionTags: ['vacation', 'casual-outings', 'college'],
    styleTags: ['Cashmere', 'Knit Beanie', 'Winter Set'],
    productTags: ['beanie', 'cashmere', 'scarf', 'winter'],
    rating: 4.9,
    reviewsCount: 25,
    stock: 15,
    editorialCollection: 'Everyday Essentials'
  }
];

