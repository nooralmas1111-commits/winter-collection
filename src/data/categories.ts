import { CategoryInfo } from "@/types/category";

export const CATEGORIES: CategoryInfo[] = [
  {
    id: "cat-women",
    name: "Women",
    slug: "women",
    tagline: "Sculpted Warmth & Tailored Silhouettes",
    description: "Wrap yourself in double-faced wool, cloud-soft cashmere, and quilted coats engineered for the cold.",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=1200",
    subcategories: [
      "Puffer Jackets",
      "Wool Coats",
      "Long Coats",
      "Leather Jackets",
      "Sweaters",
      "Cardigans",
      "Hoodies",
      "Fleece Wear"
    ],
    featuredCount: 48
  },
  {
    id: "cat-men",
    name: "Men",
    slug: "men",
    tagline: "Structural Outerwear & Refined Knits",
    description: "Engineered shearling, weather-resistant bombers, and insulating knit layers for modern winter living.",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1200",
    subcategories: [
      "Puffer Jackets",
      "Bomber Jackets",
      "Leather Jackets",
      "Winter Coats",
      "Hoodies",
      "Knitwear",
      "Sweatshirts"
    ],
    featuredCount: 42
  },
  {
    id: "cat-kids",
    name: "Kids",
    slug: "kids",
    tagline: "Gentle Layers & Playful Protection",
    description: "Down-filled warmth, cozy ribbed sets, and soft thermal weaves created for playful winter memories.",
    image: "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?auto=format&fit=crop&q=80&w=1200",
    subcategories: [
      "Kids Jackets",
      "Sweaters",
      "Hoodies",
      "Winter Sets",
      "Baby Snowsuits",
      "Winter Accessories"
    ],
    featuredCount: 28
  },
  {
    id: "cat-accessories",
    name: "Accessories",
    slug: "accessories",
    tagline: "The Finishing Accents",
    description: "Sumptuous ribbed beanies, brushed merino scarves, leather driving gloves, and insulated snow boots.",
    image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&q=80&w=1200",
    subcategories: [
      "Scarves",
      "Beanies",
      "Gloves",
      "Winter Boots",
      "Socks",
      "Thermal Wear"
    ],
    featuredCount: 36
  }
];

export const WINTER_ESSENTIAL_TAGS = [
  { name: "Jackets", image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=800", count: 24 },
  { name: "Coats", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=800", count: 18 },
  { name: "Knitwear", image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&q=80&w=800", count: 32 },
  { name: "Hoodies", image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=800", count: 14 },
  { name: "Scarves", image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&q=80&w=800", count: 20 },
  { name: "Gloves", image: "https://images.unsplash.com/photo-1542295669297-4d352b042bca?auto=format&fit=crop&q=80&w=800", count: 12 },
  { name: "Boots", image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&q=80&w=800", count: 16 },
];
