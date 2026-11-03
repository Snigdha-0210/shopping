import { AestheticConfig, OccasionConfig } from '../types';

export const AESTHETICS: AestheticConfig[] = [
  {
    id: 'old-money',
    name: 'Old Money',
    tagline: 'Quiet Elegance, Country Clubs & Timeless Tailoring',
    description: 'Crisp linen shirts, cable-knit sweaters draped over shoulders, tennis bracelets, horsebit loafers, and neutral navy and cream palettes.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80',
    colorPalette: ['#1A2530', '#E5DFC5', '#8C7853', '#FFFFFF'],
    vibe: 'Ivy League heritage, yacht club afternoons, generational poise'
  },
  {
    id: 'coquette',
    name: 'Coquette',
    tagline: 'Playful Romance, Dainty Ribbons & Pastel Nostalgia',
    description: 'Delicate lace trims, satin ribbon bows, baby doll silhouettes, heart locket necklaces, and ballet flats with whisper-soft blush fabrics.',
    image: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80',
    colorPalette: ['#F7D6D0', '#FFF5F5', '#E2B4BD', '#9E2A2B'],
    vibe: 'Sunlit tea parties, vintage poetry books, ballet rehearsal elegance'
  },
  {
    id: 'street-style',
    name: 'Street Style',
    tagline: 'Metropolitan Edge, Oversized Volume & Hype Details',
    description: 'Boxy oversized silhouettes, utilitarian zip hardware, chunky sneakers, statement headwear, and bold layering that commands sidewalks.',
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=800&q=80',
    colorPalette: ['#171615', '#4A4A4A', '#D9D9D9', '#C2593F'],
    vibe: 'Tokyo & Brooklyn crosswalks, vinyl records, underground gallery openings'
  },
  {
    id: 'clean-girl',
    name: 'Clean Girl',
    tagline: 'Dewy Minimalism, Slick Buns & Effortless Chic',
    description: 'Chunky gold hoops, neutral matching sets, sleek seamless bodysuits, crisp trench coats, and fresh tinted lip gloss vibes.',
    image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=800&q=80',
    colorPalette: ['#F5F2EB', '#D8C3A5', '#8E8D8A', '#2D2D2A'],
    vibe: 'Pilates at 7 AM, green juice, gold jewelry, flawless glass skin'
  },
  {
    id: 'dark-academia',
    name: 'Dark Academia',
    tagline: 'Oxford Woolens, Antiquarian Leather & Scholarly Depth',
    description: 'Tweed blazers with elbow patches, pleated plaid midi skirts, oxford brogues, leather satchels, and warm espresso tones.',
    image: 'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=800&q=80',
    colorPalette: ['#2F1B17', '#4A3B32', '#8C6D58', '#E3D7BF'],
    vibe: 'Gothic libraries, rainy campus archways, wax-sealed letters'
  },
  {
    id: 'minimalist',
    name: 'Minimalist',
    tagline: 'Architectural Cuts, Zero Clutter & Pure Form',
    description: 'Geometric cuts, monochromatic restraint, premium organic cotton and silk, seamless hemlines, and sculptural silver accents.',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
    colorPalette: ['#FFFFFF', '#D1CEBD', '#8F8B82', '#111111'],
    vibe: 'Art gallery openings, Scandinavian architecture, thoughtful living'
  },
  {
    id: 'y2k',
    name: 'Y2K',
    tagline: 'Futuristic Chrome, Low Rises & Cyber Pop Energy',
    description: 'Metallic finishes, rimless gradient sunglasses, baby tees, baguette shoulder bags, platform shoes, and bold millennium nostalgia.',
    image: 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&w=800&q=80',
    colorPalette: ['#E0AAFF', '#7B2CBF', '#C77DFF', '#3C096C'],
    vibe: 'Early 2000s music videos, flip phones, glitter gloss and silver sheen'
  },
  {
    id: 'quiet-luxury',
    name: 'Quiet Luxury',
    tagline: 'Understated Wealth, Logo-Free Cashmere & Supreme Fit',
    description: 'If you know, you know. Zero loud logos, 100% fine materials, bespoke Italian draping, horn buttons, and buttery suede accessories.',
    image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=800&q=80',
    colorPalette: ['#E6DFD5', '#B8A99A', '#7A6B5D', '#2B2623'],
    vibe: 'Private jet lounges, Swiss chalets, discrete bespoke perfection'
  },
  {
    id: 'bohemian',
    name: 'Bohemian',
    tagline: 'Artisanal Embroidery, Free-Spirited Drapes & Earth Hues',
    description: 'Flowing paisley maxi dresses, fringe suede jackets, stacked turquoise rings, woven raffia bags, and relaxed sunset wanderlust.',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=800&q=80',
    colorPalette: ['#A0522D', '#D2B48C', '#DEB887', '#556B2F'],
    vibe: 'Music festivals, desert botanical retreats, handcrafted curiosities'
  },
  {
    id: 'classic',
    name: 'Classic',
    tagline: 'The Eternal Wardrobe, Trench Coats & Crisp Shirting',
    description: 'The foundation of true style: trench coats, crisp poplin shirts, Breton stripes, tailored trousers, and timeless leather totes.',
    image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=800&q=80',
    colorPalette: ['#0A1128', '#FEFCFB', '#A72638', '#E0A96D'],
    vibe: 'Audrey Hepburn in Rome, timeless street portraiture, forever wardrobe'
  }
];

export const OCCASIONS: OccasionConfig[] = [
  {
    id: 'college',
    name: 'College',
    description: 'Effortless cool, easy backpacks, comfortable layers, and campus-ready sneakers.',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'office',
    name: 'Office & Work',
    description: 'Power blazers, tailored high-waist trousers, professional pumps, and structured work totes.',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'date-night',
    name: 'Date Night',
    description: 'Seductive slip dresses, subtle scent, gold layering, strappy heels, and candlelit ambiance.',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'wedding',
    name: 'Wedding Guest',
    description: 'Flowing floor-length gowns, pastel jacquards, crystal clutches, and celebratory grandeur.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'vacation',
    name: 'Resort & Vacation',
    description: 'Breezy linen co-ords, woven straw hats, sun dresses, oversized shades, and seaside ease.',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'party',
    name: 'Party & Nightlife',
    description: 'High-impact sparkle, metallic micro minis, stiletto boots, and bold evening jewelry.',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'casual-outings',
    name: 'Casual Outings',
    description: 'Weekend coffee runs, gallery strolls, denim jackets, knit cardigans, and easy crossbody bags.',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=600&q=80'
  },
  {
    id: 'festive-wear',
    name: 'Festive Wear',
    description: 'Rich brocades, statement celebratory embroidery, lustrous silks, and shimmering heritage accents.',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80'
  }
];

export const COLOR_PALETTES = [
  { name: 'Noir & Charcoal', hex: '#1C1917', border: '#444' },
  { name: 'Ivory & Cream', hex: '#F5F2EB', border: '#D5CEC0' },
  { name: 'Warm Taupe & Camel', hex: '#C4A482', border: '#B3916D' },
  { name: 'Sage & Olive', hex: '#708238', border: '#5A692D' },
  { name: 'Soft Blush & Rose', hex: '#E8C5C8', border: '#D4A4A9' },
  { name: 'Burgundy & Wine', hex: '#5E1914', border: '#42110E' },
  { name: 'Midnight Navy', hex: '#1B263B', border: '#111927' },
  { name: 'Champagne Gold', hex: '#D4AF37', border: '#BF9829' },
];

