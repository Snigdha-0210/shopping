# AURA & ATELIER ✦ Mood-Based Shopping & Smart Look Discovery

[![License: MIT](https://img.shields.io/badge/License-MIT-gold.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6.1-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)

> **"Shopping That Feels Like YOU."**  
> An editorial, intelligent e-commerce atelier reimagining fashion discovery through emotional mood alignment and automated personal styling.

---

## 📑 Table of Contents

- [Concept & Philosophy](#-concept--philosophy)
- [Signature Features](#-signature-features)
  - [1. Mood-Based Shopping](#1-mood-based-shopping-primary-feature)
  - [2. Complete My Look Studio](#2-complete-my-look-signature-feature)
  - [3. Find Your Aesthetic](#3-find-your-aesthetic-interactive-discovery)
  - [4. Smart Product Recommendation Engine](#4-smart-product-recommendation-engine)
  - [5. Editorial Lookbooks & Capsule Edits](#5-editorial-lookbooks--capsule-edits)
- [System Architecture](#-system-architecture)
- [Styling Recommendation Algorithm](#-styling-recommendation-algorithm)
- [Visual Design System](#-visual-design-system)
- [The 10 Moods Matrix](#-the-10-moods-matrix)
- [Project Directory Structure](#-project-directory-structure)
- [Getting Started](#-getting-started)
- [Deployment](#-deployment)
- [License](#-license)

---

## 🕊 Concept & Philosophy

Traditional e-commerce platforms present cold grids, generic categories, and endless filtering lists. **AURA & ATELIER** breaks this mold by functioning as an intimate luxury boutique, a sensory editorial lookbook, and an AI personal stylist.

The core journey is anchored in two synchronized pillars:
1. **Mood-Based Shopping**: Shop according to how you feel right now.
2. **Complete My Look**: Select any single piece you love, and the atelier algorithm harmonizes the rest of the outfit with an automated **15% bundle discount**.

---

## 🌟 Signature Features

### 1. Mood-Based Shopping *(Primary Feature)*
- **10 Distinct Mood Identities**: Elegant, Casual, Party, Luxury, Minimal, Streetwear, Chic, Vintage, Romantic, and Sporty.
- **Dynamic Recalibration**: Selecting a mood instantly shifts the color aura, editorial narrative, stylist keywords, and curated product collections in real time.
- **Full Faceted Refinements**: Refine by price tiers, color swatches, sizes, brands, and categories without losing mood context.

### 2. Complete My Look *(Signature Feature)*
- **"Love one piece? Let us style the rest."**
- Every product card across the entire catalog features a **"Complete My Look"** trigger.
- **5-Category Harmonization Matrix**:
  - **Clothing** (outerwear/layers/tops/trousers)
  - **Footwear** (stiletto pumps, loafers, retro trainers, metallic heels)
  - **Bags** (structured trapeze totes, crystal clutches, croissant shoulder bags)
  - **Jewellery** (baroque pearl drops, herringbone chains, Swiss watches, tennis bracelets)
  - **Accessories** (acetate cat-eye shades, silk scarves, reversible belts)
- **Interactive Mannequin Canvas**:
  - Live preview board with swappable components.
  - Automatic **15% Bundle Savings** calculation.
  - **"Add Complete Look to Bag"** in a single synchronized click.
  - **"Save This Look"** with custom naming to the user's permanent profile lookbook.

### 3. Find Your Aesthetic (Interactive Discovery)
- **10 Fashion Aesthetics**: Old Money, Coquette, Street Style, Clean Girl, Dark Academia, Minimalist, Y2K, Quiet Luxury, Bohemian, Classic.
- **8 Occasion Filters**: College, Office & Work, Date Night, Wedding Guest, Resort Vacation, Party & Nightlife, Casual Outings, Festive Wear.
- Multi-select interactive console with live budget ceiling sliders and color tone matching.

### 4. Smart Product Recommendation Engine
- **Weighted Multi-Factor Scoring**:
  $$\text{Score} = (\text{Mood Match} \times 35) + (\text{Aesthetic Matches} \times 20) + (\text{Occasion Match} \times 15) + (\text{Color Affinity} \times 10) + (\text{Budget Fit} \times 10)$$
- Real-time tracking of recently viewed garments and browsed preferences.

### 5. Editorial Lookbooks & Capsule Edits
- Magazine-style visual collections: *"The Elegant Edit"*, *"Minimal Wardrobe"*, *"Party Ready"*, and *"Everyday Essentials"*.
- Quick-View modal with 360-feel imagery, size picker, and instant outfit styling links.

---

## 🏛 System Architecture

```mermaid
flowchart TD
    Client["Client Browser (React 19 + TypeScript + Tailwind)"]
    
    subgraph State Management
        AuthCtx["AuthContext (User, Saved Looks, Wishlist, Orders)"]
        ShopCtx["ShoppingContext (Active Mood, Cart, Bundles, QuickView)"]
    end

    subgraph Recommendation & Styling Engines
        MoodEngine["MoodRecalibrator (Tag Scoring)"]
        LookEngine["CompleteLookStylist (5-Category Harmony Matrix)"]
        PersonalizeEngine["PersonalizedRecommender (Multi-Factor Scoring)"]
    end

    subgraph User Experience Pages
        Home["HomePage ('Shopping That Feels Like YOU')"]
        MoodPage["MoodShoppingPage (10 Mood Auras + Faceted Filters)"]
        LookStudio["CompleteLookStudio (Dedicated Mannequin Canvas)"]
        StylePage["StyleDiscoveryPage (Aesthetic & Occasion Quiz)"]
        Catalog["ShopPage (All Products Catalogue)"]
        Details["ProductDetailsPage (Specs + Inline Look Matcher)"]
        Profile["ProfilePage (Saved Looks, Persona, Orders)"]
        Checkout["CheckoutPage (Bundle Discounts, Order Generation)"]
    end

    subgraph Persistence Layer
        LocalStorage["Client Storage (State Persistence)"]
        Firebase["Firebase Firestore & Authentication (Ready)"]
    end

    Client --> StateManagement
    StateManagement --> Recommendation & Styling Engines
    Recommendation & Styling Engines --> User Experience Pages
    StateManagement --> Persistence Layer
```

---

## 🔄 Complete My Look Flowchart

```mermaid
sequenceDiagram
    autonumber
    actor Customer
    participant Card as Product Card
    participant Stylist as Complete My Look Engine
    participant Canvas as Mannequin Canvas
    participant Bag as Shopping Bag

    Customer->>Card: Clicks "Complete My Look"
    Card->>Stylist: Sends Hero Product (Mood, Aesthetic, Color, Occasion)
    Stylist->>Stylist: Harmonizes Clothing, Shoes, Bag, Jewels, Accessories
    Stylist->>Canvas: Renders Outfits & 15% Look Discount
    Customer->>Canvas: Toggles / Customizes Complementary Pieces
    Canvas->>Canvas: Recalculates Bundle Price & Savings
    alt Save Look
        Customer->>Canvas: Clicks "Save This Look"
        Canvas->>Canvas: Persists Lookbook to User Profile with Confetti
    else Purchase Entire Look
        Customer->>Canvas: Clicks "Add Complete Look to Bag"
        Canvas->>Bag: Injects Bundle Items with 15% Savings Tag
    end
```

---

## 🎨 Visual Design System

- **Warm Ivory & Cream**: `#FAF8F5`, `#F5F2EB`, `#EBE6DD`
- **Soft Taupe & Sand**: `#C4B5A5`, `#B8977E`, `#E2D7CF`
- **Noir & Rich Charcoal**: `#171615`, `#1C1917`, `#292524`
- **Blush & Champagne Accents**: `#E8D5CE`, `#D4AF37`, `#C5A880`
- **Serif Typography**: *Playfair Display* & *Cormorant Garamond*
- **Sans Typography**: *Plus Jakarta Sans* & *Inter*

---

## 🔮 The 10 Moods Matrix

| Mood | Tagline | Representative Silhouette | Stylist Keynotes |
| :--- | :--- | :--- | :--- |
| **Elegant** | *Timeless Grace & Poised Sophistication* | Mulberry Silk Cowl Backless Gown | Silk Slip, Peak Lapel Blazer, Stiletto Pumps, Baroque Pearls |
| **Casual** | *Effortless Ease & Daily Composure* | Relaxed Cotton Poplin & Rigid Denim | Oversized Shirt, 90s Straight Jeans, Suede Trainers |
| **Party** | *Electrifying Glamour & Nightfall Radiance* | Midnight Sequin Halter Mini Dress | Strappy Metallic Heels, Crystal Minaudière, Tennis Bracelet |
| **Luxury** | *Opulent Finishes & Master Craftsmanship* | Double-Breasted Virgin Wool Blazer | Swiss Horology Timepiece, Box Calf Leather, Suede Loafers |
| **Minimal** | *Purity of Form & Harmonious Neutrality* | Pleated Wide-Leg Crepe Trousers | Architectural Cuts, Boxy Poplin, Minimal Band Ring |
| **Streetwear** | *Contemporary Edge & Urban Culture* | 480gsm Loopback Boxy Hoodie | Parachute Pants, Chunky Trainers, Industrial Silver Hoops |
| **Chic** | *Parisian Allure & Polished Modernity* | Archival British Houndstooth Jacket | Pointed Kitten Heels, Beveled Acetate Cat-Eyes, Baguette Bag |
| **Vintage** | *Nostalgic Romance & Heritage Silhouettes* | Hand-rolled Archival Silk Twill Scarf | Blake-Stitched Loafers, Brass Hardware, Heritage Tweed |
| **Romantic** | *Soft Ethereal Tones & Whimsical Drapery* | Gossamer Floral Tiered Chiffon Maxi | Smocked Details, Pearl Choker, Ankle-Tie Ribbon Sandals |
| **Sporty** | *Athletic Precision & Dynamic Motion* | 4-Way Stretch Seamless Compression Tank | Aerodynamic Outerwear, Performance Runner, Technical Nylon |

---

## 📁 Project Directory Structure

```
website/
├── index.html                   # HTML Entry with Playfair & Jakarta Google Fonts
├── package.json                 # Dependencies & scripts
├── tsconfig.json                # TypeScript root configuration
├── tailwind.config.js           # Warm minimal palette, serif typography tokens
├── postcss.config.js            # PostCSS Autoprefixer setup
├── vite.config.ts               # Vite configuration (port 5173, host enabled)
├── src/
│   ├── main.tsx                 # Application DOM bootstrap
│   ├── App.tsx                  # Master router & modal container
│   ├── index.css                # Tailwind directives, glassmorphic styles, scrollbars
│   ├── types/
│   │   └── index.ts             # Product, Mood, Aesthetic, Cart, Look & Order types
│   ├── data/
│   │   ├── moods.ts             # 10 Mood definitions with atmospheric auras & quotes
│   │   ├── aesthetics.ts        # 10 Aesthetics, 8 Occasions, and Color palettes
│   │   └── products.ts          # Curated multi-category catalog with high-res imagery
│   ├── utils/
│   │   └── recommendations.ts   # Complete My Look & personalized scoring algorithms
│   ├── services/
│   │   └── firebase.ts          # Firebase Auth & Firestore connection with fallback
│   ├── context/
│   │   ├── AuthContext.tsx      # User profile, saved looks, wishlist, orders
│   │   └── ShoppingContext.tsx  # Mood state, cart drawer, look builder modal state
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.tsx       # Glassmorphic header with mood pill & look quick-links
│   │   │   ├── Footer.tsx       # Editorial magazine footer with newsletter
│   │   │   ├── ProductCard.tsx  # Image card with prominent "Complete My Look" CTA
│   │   │   ├── CartDrawer.tsx   # Slide-over bag with 15% bundle savings & promo codes
│   │   │   ├── QuickViewModal.tsx # 360-feel modal with live size/color selection
│   │   │   └── AuthModal.tsx    # Google and email auth with 1-click test accounts
│   │   └── look/
│   │       └── CompleteLookModal.tsx # Flagship interactive styling canvas
│   └── pages/
│       ├── HomePage.tsx         # Hero, Mood Showcase, Complete Look spotlight
│       ├── MoodShoppingPage.tsx # Dynamic 10-mood gallery & faceted filter sidebar
│       ├── CompleteLookPage.tsx # Dedicated studio for building harmonized looks
│       ├── StyleDiscoveryPage.tsx # Multi-step aesthetic & occasion stylist quiz
│       ├── ShopPage.tsx         # Complete product catalogue with live search
│       ├── ProductDetailsPage.tsx # Multi-image gallery, reviews, inline lookbuilder
│       ├── ProfilePage.tsx      # Saved looks, style persona, wishlist, order history
│       └── CheckoutPage.tsx     # Order placement simulation & instant receipt
```

---

## 💻 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm` or `pnpm`

### Installation
```bash
# Clone the repository
git clone https://github.com/Snigdha-0210/Shopping_Website.git

# Navigate into project directory
cd Shopping_Website

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will launch on `http://localhost:5173`.

---

## 🚀 Deployment

### Deploy on Vercel
This project is pre-configured for zero-configuration instant deployment on [Vercel](https://vercel.com):

```bash
# Deploy with Vercel CLI
npx vercel
```
Or connect your GitHub repository directly to Vercel via the Vercel Dashboard for automated continuous deployment on every `git push`.

---

## 📜 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

*Designed & Architected with intentionality by [Snigdha Gorai](https://github.com/Snigdha-0210).*
