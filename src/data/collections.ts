import { ShopTheLook } from "@/types/testimonial";

export const SHOP_THE_LOOKS: ShopTheLook[] = [
  {
    id: "look-01",
    title: "The Everyday Layer",
    tagline: "Effortless warmth for city mornings",
    description: "A harmonious ensemble uniting airy alpaca silk knitwear with an oversized merino rib scarf and cashmere beanie.",
    editorialImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1200",
    totalPrice: 26470,
    products: [
      {
        id: "prod-03",
        name: "Cloud Knit Sweater",
        category: "women",
        price: 14990,
        image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&q=80&w=600"
      },
      {
        id: "prod-13",
        name: "Merino Wool Ribbed Scarf",
        category: "accessories",
        price: 6990,
        image: "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&q=80&w=600"
      },
      {
        id: "prod-14",
        name: "Cashmere-Wool Turnup Beanie",
        category: "accessories",
        price: 4490,
        image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&q=80&w=600"
      }
    ]
  },
  {
    id: "look-02",
    title: "The Weekend Escape",
    tagline: "Alpine ready with rugged sophistication",
    description: "Built for crisp mountain retreats with a thermal bomber, heavy Shetland cable knit, and ice-gripping snow boots.",
    editorialImage: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1200",
    totalPrice: 71970,
    products: [
      {
        id: "prod-05",
        name: "Frostline Bomber Jacket",
        category: "men",
        price: 26990,
        image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=600"
      },
      {
        id: "prod-07",
        name: "Nordic Cable-Knit Pullover",
        category: "men",
        price: 15990,
        image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=600"
      },
      {
        id: "prod-15",
        name: "Arctic Thermal Snow Boot",
        category: "accessories",
        price: 28990,
        image: "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&q=80&w=600"
      }
    ]
  },
  {
    id: "look-03",
    title: "The Winter Classic",
    tagline: "Timeless tailoring in double-faced wool",
    description: "Clean architectural lines, virgin Italian wool wrap coat paired with supple cashmere-lined lambskin gloves.",
    editorialImage: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=1200",
    totalPrice: 43480,
    products: [
      {
        id: "prod-02",
        name: "Classic Wool Coat",
        category: "women",
        price: 34990,
        image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=600"
      },
      {
        id: "prod-16",
        name: "Nappa Leather Winter Gloves",
        category: "accessories",
        price: 8490,
        image: "https://images.unsplash.com/photo-1542295669297-4d352b042bca?auto=format&fit=crop&q=80&w=600"
      }
    ]
  }
];

export const EDITORIAL_LAYER_DATA = {
  heading: "The Art of Layering",
  tagline: "NEW SEASON EDITORIAL",
  description: "Winter dressing is a dialogue between texture and proportion. By balancing sheer baby alpaca beneath structured Italian wool, FROST & FLAIR reimagines warmth not as bulk, but as graceful visual architecture.",
  quote: "“Cold days call for deliberate silhouettes that move with breath and poise.”",
  ctaText: "Explore the Edit",
  image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=1200",
  secondaryImage: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800"
};

export const WINTER_SALE_DATA = {
  badge: "LIMITED SEASON PROMOTION",
  headline: "Cold Days. Warmer Deals.",
  supportingText: "Find your winter favourites at exceptional seasonal prices. Handcrafted outerwear, luxurious knits, and warm accessories with up to 50% seasonal reductions.",
  ctaText: "Shop the Sale",
  image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=1400"
};

export const BRAND_LIFESTYLE_DATA = {
  tagline: "PHILOSOPHY & CRAFTSMANSHIP",
  headline: "Made for the Moments That Matter.",
  description: "From misty highland mornings to serene winter evenings beside a glowing hearth, FROST & FLAIR is founded on the belief that outerwear should be as enduring as the memories made within it. We select honest, regenerative fibres — Scottish wool, Peruvian alpaca, and certified down — to construct garments that honor the quiet splendour of the season.",
  stats: [
    { value: "100%", label: "Traceable Natural Fibres" },
    { value: "750+", label: "Fill Power Certified Down" },
    { value: "05 Yrs", label: "Craftsmanship Guarantee" }
  ],
  image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=1200"
};
