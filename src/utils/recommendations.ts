import { Product, ProductCategory, UserPreferences } from '../types';

export interface LookRecommendationResult {
  clothing: Product[];
  footwear: Product[];
  bags: Product[];
  jewellery: Product[];
  accessories: Product[];
  bestMatchingLook: {
    clothing?: Product;
    footwear?: Product;
    bags?: Product;
    jewellery?: Product;
    accessories?: Product;
  };
}

/**
 * Intelligent Stylist Engine: Complete My Look
 * Determines fashion-forward combinations based on mood, aesthetic, occasion, and palette.
 */
export function getCompleteLookRecommendations(
  heroProduct: Product,
  allProducts: Product[]
): LookRecommendationResult {
  const otherProducts = allProducts.filter(p => p.productId !== heroProduct.productId);

  // Score candidate product against hero
  const scoreProduct = (candidate: Product): number => {
    let score = 0;

    // 1. Mood alignment (high weight)
    const commonMoods = candidate.moodTags.filter(m => heroProduct.moodTags.includes(m));
    score += commonMoods.length * 25;

    // 2. Aesthetic alignment
    const commonAesthetics = candidate.aestheticTags.filter(a => heroProduct.aestheticTags.includes(a));
    score += commonAesthetics.length * 20;

    // 3. Occasion alignment
    const commonOccasions = candidate.occasionTags.filter(o => heroProduct.occasionTags.includes(o));
    score += commonOccasions.length * 15;

    // 4. Color synergy: Check if hex or color tone coordinates
    const heroHexes = heroProduct.availableColors.map(c => c.hex.toLowerCase());
    const candidateHexes = candidate.availableColors.map(c => c.hex.toLowerCase());
    const sharesColor = candidateHexes.some(hex => heroHexes.includes(hex));
    if (sharesColor) score += 10;

    // 5. Editorial collection bonus
    if (candidate.editorialCollection && candidate.editorialCollection === heroProduct.editorialCollection) {
      score += 12;
    }

    return score;
  };

  const getRankedForCategory = (cat: ProductCategory, filterSubcat?: (sub: string) => boolean) => {
    return otherProducts
      .filter(p => p.category === cat && (!filterSubcat || filterSubcat(p.subcategory)))
      .map(p => ({ product: p, score: scoreProduct(p) }))
      .sort((a, b) => b.score - a.score)
      .map(item => item.product);
  };

  // If hero is already clothing, find an outerwear/layering item or complementary piece
  const clothingCandidates = heroProduct.category === 'clothing'
    ? getRankedForCategory('clothing', (sub) => {
        if (heroProduct.subcategory === 'Dresses') return sub === 'Blazers' || sub === 'Jackets';
        if (heroProduct.subcategory === 'Shirts' || heroProduct.subcategory === 'Tops' || heroProduct.subcategory === 'Hoodies') {
          return sub === 'Trousers' || sub === 'Denim' || sub === 'Skirts';
        }
        if (heroProduct.subcategory === 'Trousers' || heroProduct.subcategory === 'Denim' || heroProduct.subcategory === 'Skirts') {
          return sub === 'Shirts' || sub === 'Tops' || sub === 'Blazers';
        }
        return true;
      })
    : getRankedForCategory('clothing');

  const footwearCandidates = getRankedForCategory('footwear');
  const bagsCandidates = getRankedForCategory('bags');
  const jewelleryCandidates = getRankedForCategory('jewellery');
  const accessoriesCandidates = getRankedForCategory('accessories');

  return {
    clothing: clothingCandidates.slice(0, 4),
    footwear: footwearCandidates.slice(0, 4),
    bags: bagsCandidates.slice(0, 4),
    jewellery: jewelleryCandidates.slice(0, 4),
    accessories: accessoriesCandidates.slice(0, 4),
    bestMatchingLook: {
      clothing: clothingCandidates[0],
      footwear: footwearCandidates[0],
      bags: bagsCandidates[0],
      jewellery: jewelleryCandidates[0],
      accessories: accessoriesCandidates[0],
    }
  };
}

/**
 * Smart Product Recommendations Engine:
 * Generates personalized product scoring tailored to user profile, moods, and aesthetics.
 */
export function getPersonalizedRecommendations(
  products: Product[],
  preferences: UserPreferences,
  viewedProductIds: string[] = []
): Product[] {
  return [...products].sort((a, b) => {
    let scoreA = 0;
    let scoreB = 0;

    // Mood match
    if (a.moodTags.includes(preferences.activeMood)) scoreA += 35;
    if (b.moodTags.includes(preferences.activeMood)) scoreB += 35;

    // Aesthetic match
    preferences.favoriteAesthetics.forEach(aes => {
      if (a.aestheticTags.includes(aes)) scoreA += 20;
      if (b.aestheticTags.includes(aes)) scoreB += 20;
    });

    // Occasion match
    preferences.occasions.forEach(occ => {
      if (a.occasionTags.includes(occ)) scoreA += 15;
      if (b.occasionTags.includes(occ)) scoreB += 15;
    });

    // Budget match
    const [minB, maxB] = preferences.budgetRange;
    const priceA = a.discountPrice || a.price;
    const priceB = b.discountPrice || b.price;
    if (priceA >= minB && priceA <= maxB) scoreA += 10;
    if (priceB >= minB && priceB <= maxB) scoreB += 10;

    // Prioritize trending or top rated
    scoreA += (a.rating || 4) * 2;
    scoreB += (b.rating || 4) * 2;

    return scoreB - scoreA;
  });
}

/**
 * Finds similar products based on category and tags
 */
export function getSimilarProducts(product: Product, allProducts: Product[]): Product[] {
  return allProducts
    .filter(p => p.productId !== product.productId)
    .map(p => {
      let sim = 0;
      if (p.category === product.category) sim += 30;
      sim += p.moodTags.filter(m => product.moodTags.includes(m)).length * 15;
      sim += p.aestheticTags.filter(a => product.aestheticTags.includes(a)).length * 15;
      return { product: p, sim };
    })
    .sort((a, b) => b.sim - a.sim)
    .map(i => i.product)
    .slice(0, 4);
}

