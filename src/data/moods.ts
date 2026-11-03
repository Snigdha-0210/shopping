import { MoodConfig } from '../types';

export const MOODS: MoodConfig[] = [
  {
    id: 'elegant',
    name: 'Elegant',
    tagline: 'Timeless Grace & Poised Sophistication',
    description: 'Satin silhouettes, tailored drape, structural refinement, and heirloom jewellery that captivate without speaking.',
    quote: '“Elegance is not standing out, but being remembered.”',
    auraGradient: 'from-amber-100/40 via-stone-200/30 to-amber-50/20',
    accentBg: 'bg-[#F2ECE4]',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=80',
    recommendedKeywords: ['Silk Slip', 'Tailored Blazer', 'Stiletto Pumps', 'Gold Drop Earrings', 'Structured Bag']
  },
  {
    id: 'casual',
    name: 'Casual',
    tagline: 'Effortless Ease & Daily Composure',
    description: 'Premium heavyweight cottons, relaxed denim cuts, breathable knits, and comfortable sneakers built for leisurely grace.',
    quote: '“True luxury is feeling effortlessly comfortable in one’s own skin.”',
    auraGradient: 'from-blue-50/40 via-neutral-100/30 to-stone-50/20',
    accentBg: 'bg-[#EDF2F4]',
    image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=1000&q=80',
    recommendedKeywords: ['Oversized Tee', 'Wide Leg Denim', 'Retro Trainers', 'Canvas Tote', 'Baseball Cap']
  },
  {
    id: 'party',
    name: 'Party',
    tagline: 'Electrifying Glamour & Nightfall Radiance',
    description: 'Light-catching sequins, sultry satin backs, statement metallic hardware, and evening clutches designed for the dance floor.',
    quote: '“Tonight belongs to the ones who dare to shine unapologetically.”',
    auraGradient: 'from-purple-100/40 via-pink-100/30 to-rose-50/20',
    accentBg: 'bg-[#F7EDF0]',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=1000&q=80',
    recommendedKeywords: ['Sequin Mini', 'Strappy Metallic Heels', 'Crystal Clutch', 'Chandelier Earrings']
  },
  {
    id: 'luxury',
    name: 'Luxury',
    tagline: 'Opulent Finishes & Master Craftsmanship',
    description: 'Double-faced cashmere, supple Italian calfskin, mother-of-pearl horology, and uncompromised artisanal tailoring.',
    quote: '“Excellence is an unspoken dialogue of materials, precision, and history.”',
    auraGradient: 'from-amber-200/30 via-yellow-100/20 to-stone-100/30',
    accentBg: 'bg-[#F4ECE1]',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1000&q=80',
    recommendedKeywords: ['Cashmere Overcoat', 'Monogram Leather Bag', 'Swiss Timepiece', 'Suede Loafers']
  },
  {
    id: 'minimal',
    name: 'Minimal',
    tagline: 'Purity of Form & Harmonious Neutrality',
    description: 'Subtle lines, architectural tailoring, monochrome palettes, and clean negative space that celebrates the beauty of less.',
    quote: '“Simplicity is the ultimate sophistication.”',
    auraGradient: 'from-stone-200/40 via-stone-100/30 to-stone-50/20',
    accentBg: 'bg-[#EFECE6]',
    image: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=1000&q=80',
    recommendedKeywords: ['Linen Trousers', 'Boxy Poplin Shirt', 'Geometric Tote', 'Minimalist Band Ring']
  },
  {
    id: 'streetwear',
    name: 'Streetwear',
    tagline: 'Contemporary Edge & Urban Culture',
    description: 'Heavyweight loopback hoodies, utilitarian cargo trousers, bold graphic narratives, and coveted sneaker silhouettes.',
    quote: '“Subculture reimagined as high fashion on the world’s runways.”',
    auraGradient: 'from-zinc-300/30 via-stone-200/30 to-neutral-200/20',
    accentBg: 'bg-[#E5E5E5]',
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1000&q=80',
    recommendedKeywords: ['Parachute Pants', 'Chunky Lows', 'Crossbody Sling', 'Industrial Belt']
  },
  {
    id: 'chic',
    name: 'Chic',
    tagline: 'Parisian Allure & Polished Modernity',
    description: 'Tweed bouclé jackets, crisp French cuff blouses, pointed kitten heels, and structured shoulder bags with gilded accents.',
    quote: '“Dress like you are already living your dream in Paris.”',
    auraGradient: 'from-rose-100/40 via-orange-50/30 to-stone-50/20',
    accentBg: 'bg-[#F9F0EE]',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=1000&q=80',
    recommendedKeywords: ['Cropped Bouclé', 'Cat-Eye Shades', 'Baguette Bag', 'Gold Coin Pendant']
  },
  {
    id: 'vintage',
    name: 'Vintage',
    tagline: 'Nostalgic Romance & Heritage Silhouettes',
    description: '70s bell sleeves, heirloom floral prints, antiqued brass hardware, and supple distressed leather with storybook charm.',
    quote: '“Treasures that carry the poetry of bygone eras into modern days.”',
    auraGradient: 'from-amber-200/30 via-orange-100/20 to-stone-100/20',
    accentBg: 'bg-[#EFE6DC]',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&w=1000&q=80',
    recommendedKeywords: ['Retro Trench', 'Lace Trim Blouse', 'Leather Saddle Bag', 'Tortoise Sunglasses']
  },
  {
    id: 'romantic',
    name: 'Romantic',
    tagline: 'Soft Ethereal Tones & Whimsical Drapery',
    description: 'Chiffon ruffles, delicate floral jacquard, pearl accents, and dusty rose hues crafted for sunlit courtyards and candlelit rendezvous.',
    quote: '“A love letter woven into silken threads and rose-kissed petals.”',
    auraGradient: 'from-rose-200/40 via-pink-100/30 to-blush-50/20',
    accentBg: 'bg-[#FBEBE8]',
    image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1000&q=80',
    recommendedKeywords: ['Tiered Chiffon Maxi', 'Pearl Choker', 'Ribbon Sandals', 'Blush Envelope Clutch']
  },
  {
    id: 'sporty',
    name: 'Sporty',
    tagline: 'Athletic Precision & Dynamic Motion',
    description: 'Performance technical fabrics, seamless compression ribs, moisture-wicking aerodynamic outerwear, and trail-ready footwear.',
    quote: '“Movement is vitality; design is its effortless catalyst.”',
    auraGradient: 'from-emerald-100/40 via-cyan-50/30 to-stone-50/20',
    accentBg: 'bg-[#EBF5F0]',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1000&q=80',
    recommendedKeywords: ['Seamless Rib Top', 'Performance Runner', 'Technical Windbreaker', 'Hydro Bottle Bag']
  }
];

