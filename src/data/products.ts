import { Product } from "@/types/product";

export const PRODUCTS: Product[] = [
  // 1. WOMEN - Alpine Puffer Jacket
  {
    id: "prod-01",
    name: "Alpine Puffer Jacket",
    slug: "alpine-puffer-jacket",
    category: "women",
    subcategory: "Puffer Jackets",
    price: 24990,
    originalPrice: 31990,
    discountPercent: 22,
    description: "An architectural down puffer crafted from water-repellent shell with cloud-density duck down filling. Engineered for severe winter climates with fleece-lined pockets, a storm flap, and a detachable cocoon hood.",
    shortDescription: "Ultra-warm quilted down puffer with storm-proof storm flap and detachable hood.",
    details: [
      "90/10 RDS certified goose down fill (750 fill power)",
      "Water-repellent matte Japanese nylon outer",
      "Two-way brushed metal zipper with snap storm flap",
      "Fleece-lined storm cuffs and hand warmer pockets",
      "Internal chest zip pocket for secure storage"
    ],
    materials: "Outer: 100% Recycled Matte Nylon. Fill: 90% Goose Down, 10% Feathers. Lining: 100% Bemberg Cupro.",
    care: "Professional wet clean or gentle spot wash only. Do not iron.",
    images: [
      "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=1000"
    ],
    colors: [
      { name: "Warm Ivory", hex: "#F7F5F0" },
      { name: "Deep Charcoal", hex: "#292D32" },
      { name: "Muted Taupe", hex: "#A99B8A" }
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 14,
    rating: 4.9,
    reviewCount: 42,
    isTrending: true,
    isBestSeller: true,
    isNew: false,
    isSale: true,
    season: "Winter 2026"
  },

  // 2. WOMEN - Classic Wool Coat
  {
    id: "prod-02",
    name: "Classic Wool Coat",
    slug: "classic-wool-coat",
    category: "women",
    subcategory: "Wool Coats",
    price: 34990,
    originalPrice: 42990,
    discountPercent: 18,
    description: "Tailored from heavyweight double-faced Virgin wool, this floor-grazing wrap coat features structured drop shoulders, a matching self-tie belt, and horn buttons. Designed to be layered effortlessly over chunky knits.",
    shortDescription: "Double-faced virgin wool wrap coat with drop shoulder silhouette and self-tie sash.",
    details: [
      "Hand-finished double-faced seams",
      "Removable structured belt with tonal topstitching",
      "Deep notched lapels and back walking vent",
      "Side welt pockets with silk lining"
    ],
    materials: "100% Virgin Wool from Biella, Italy.",
    care: "Specialist dry clean only. Cool iron under pressing cloth.",
    images: [
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=1000"
    ],
    colors: [
      { name: "Champagne Beige", hex: "#D8C8B3" },
      { name: "Deep Charcoal", hex: "#292D32" },
      { name: "Soft Camel", hex: "#C2A382" }
    ],
    sizes: ["XS", "S", "M", "L"],
    stock: 9,
    rating: 4.8,
    reviewCount: 31,
    isTrending: true,
    isBestSeller: true,
    isNew: true,
    isSale: false,
    season: "Winter 2026"
  },

  // 3. WOMEN - Cloud Knit Sweater
  {
    id: "prod-03",
    name: "Cloud Knit Sweater",
    slug: "cloud-knit-sweater",
    category: "women",
    subcategory: "Sweaters",
    price: 14990,
    originalPrice: 17990,
    discountPercent: 16,
    description: "Spun from an ethereal blend of brushed baby alpaca and mulberry silk. This relaxed mock-neck sweater offers weightless warmth with exaggerated ribbed cuffs and a curved hemline.",
    shortDescription: "Weightless baby alpaca and silk mock neck with voluminous ribbed sleeves.",
    details: [
      "Loose-gauge airy knit construction",
      "Rolled funnel neck that can be folded or slouched",
      "Dropped shoulders with reinforced seam binding",
      "Naturally hypoallergenic and itch-free"
    ],
    materials: "70% Royal Baby Alpaca, 30% Mulberry Silk.",
    care: "Hand wash in tepid water with wool detergent. Dry flat.",
    images: [
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&q=80&w=1000"
    ],
    colors: [
      { name: "Soft Cream", hex: "#EEEAE2" },
      { name: "Muted Taupe", hex: "#A99B8A" },
      { name: "Ice Blue", hex: "#B8C6D1" }
    ],
    sizes: ["XS", "S", "M", "L"],
    stock: 22,
    rating: 4.9,
    reviewCount: 56,
    isTrending: true,
    isBestSeller: false,
    isNew: true,
    isSale: false,
    season: "Winter 2026"
  },

  // 4. WOMEN - Winter Luxe Cardigan
  {
    id: "prod-04",
    name: "Winter Luxe Cardigan",
    slug: "winter-luxe-cardigan",
    category: "women",
    subcategory: "Cardigans",
    price: 18990,
    originalPrice: 22990,
    discountPercent: 17,
    description: "An elongated chunky cardigan knit in a heavy waffle rib. Features mother-of-pearl buttons, deep patch pockets, and an easy relaxed fit meant for cozy indoor firesides or effortless layering.",
    shortDescription: "Heavyweight chunky waffle rib cardigan with natural shell buttons.",
    details: [
      "Chunky 5-gauge waffle knit",
      "Tortoise shell resin buttons",
      "Reinforced collar stand and pocket edges",
      "Hip-length coverage with side slits"
    ],
    materials: "100% Fine Merino Wool.",
    care: "Dry clean or hand wash cold. Reshape and dry flat.",
    images: [
      "https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&q=80&w=1000"
    ],
    colors: [
      { name: "Warm Ivory", hex: "#F7F5F0" },
      { name: "Slate Grey", hex: "#737D87" },
      { name: "Charcoal", hex: "#292D32" }
    ],
    sizes: ["S", "M", "L"],
    stock: 11,
    rating: 4.7,
    reviewCount: 19,
    isTrending: false,
    isBestSeller: false,
    isNew: false,
    isSale: true,
    season: "Winter 2026"
  },

  // 5. MEN - Frostline Bomber
  {
    id: "prod-05",
    name: "Frostline Bomber Jacket",
    slug: "frostline-bomber-jacket",
    category: "men",
    subcategory: "Bomber Jackets",
    price: 26990,
    originalPrice: 32990,
    discountPercent: 18,
    description: "A refined interpretation of military outerwear, tailored in windproof tech twill with Primaloft thermal insulation. Features a removable genuine shearling collar, heavy oxidized brass zips, and ribbed wool trim.",
    shortDescription: "Primaloft-insulated winter bomber jacket with detachable shearling collar.",
    details: [
      "Waterproof Italian twill shell with matte finish",
      "Detachable Spanish curly shearling collar",
      "Primaloft Gold synthetic thermal lining",
      "Heavy duty two-way front zipper",
      "Ribbed merino-blend cuffs and waist"
    ],
    materials: "Shell: 65% Cotton, 35% Recycled Polyamide. Collar: 100% Shearling. Fill: Primaloft Gold.",
    care: "Dry clean only. Remove shearling collar before cleaning.",
    images: [
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&fit=crop&q=80&w=1000"
    ],
    colors: [
      { name: "Deep Charcoal", hex: "#292D32" },
      { name: "Muted Olive", hex: "#555D50" },
      { name: "Navy", hex: "#1F2937" }
    ],
    sizes: ["S", "M", "L", "XL"],
    stock: 16,
    rating: 4.9,
    reviewCount: 38,
    isTrending: true,
    isBestSeller: true,
    isNew: true,
    isSale: false,
    season: "Winter 2026"
  },

  // 6. MEN - Cashmere Touch Overcoat
  {
    id: "prod-06",
    name: "Cashmere Touch Overcoat",
    slug: "cashmere-touch-overcoat",
    category: "men",
    subcategory: "Winter Coats",
    price: 38990,
    originalPrice: 48990,
    discountPercent: 20,
    description: "The quintessential gentleman's winter coat. Cut with a modern straight drape from an Italian wool-cashmere blend. Features structured chest canvas construction, horn buttons, and a ticket pocket.",
    shortDescription: "Single-breasted Italian wool and cashmere blend overcoat with tailored lapels.",
    details: [
      "Single-breasted 3-button closure",
      "Peak lapels with Melton undercollar",
      "Real buffalo horn buttons",
      "Cupro satin lining for frictionless layering"
    ],
    materials: "90% Virgin Wool, 10% Cashmere.",
    care: "Specialist dry clean only.",
    images: [
      "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1520975954732-35dd22299614?auto=format&fit=crop&q=80&w=1000"
    ],
    colors: [
      { name: "Charcoal", hex: "#292D32" },
      { name: "Camel", hex: "#BFA588" },
      { name: "Midnight Navy", hex: "#1A202C" }
    ],
    sizes: ["S", "M", "L", "XL"],
    stock: 7,
    rating: 5.0,
    reviewCount: 27,
    isTrending: true,
    isBestSeller: true,
    isNew: false,
    isSale: true,
    season: "Winter 2026"
  },

  // 7. MEN - Nordic Cable-Knit Pullover
  {
    id: "prod-07",
    name: "Nordic Cable-Knit Pullover",
    slug: "nordic-cable-knit-pullover",
    category: "men",
    subcategory: "Knitwear",
    price: 15990,
    originalPrice: 19990,
    discountPercent: 20,
    description: "Crafted in Scotland from pure heavy Shetland wool. Intricate cable and honeycomb stitches trap air for outstanding insulation during freezing winter mornings.",
    shortDescription: "Heavy Shetland wool crewneck knit with traditional rope and diamond cables.",
    details: [
      "Authentic heritage cable motifs",
      "Double-rib crewneck collar",
      "Naturally water and odour-resistant wool",
      "Seamless round-knitted torso"
    ],
    materials: "100% Pure Shetland Wool.",
    care: "Hand wash cold. Dry flat away from direct heat.",
    images: [
      "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=1000"
    ],
    colors: [
      { name: "Warm Cream", hex: "#EEEAE2" },
      { name: "Muted Forest", hex: "#4A5D4E" },
      { name: "Slate Grey", hex: "#737D87" }
    ],
    sizes: ["S", "M", "L", "XL"],
    stock: 20,
    rating: 4.8,
    reviewCount: 34,
    isTrending: false,
    isBestSeller: true,
    isNew: false,
    isSale: false,
    season: "Winter 2026"
  },

  // 8. MEN - Cozy Everyday Hoodie
  {
    id: "prod-08",
    name: "Cozy Everyday Hoodie",
    slug: "cozy-everyday-hoodie",
    category: "men",
    subcategory: "Hoodies",
    price: 9990,
    originalPrice: 12490,
    discountPercent: 20,
    description: "Constructed from 480 GSM custom French terry cotton with an ultra-plush brushed interior. Generously proportioned with a double-layered hood and minimal tonal branding.",
    shortDescription: "Heavyweight 480 GSM brushed fleece hoodie with double-layer hood.",
    details: [
      "Heavyweight 480 GSM cotton fleece",
      "No drawstrings for a clean minimal aesthetic",
      "Concealed kangaroo pocket with jersey lining",
      "Ribbed side gussets for enhanced mobility"
    ],
    materials: "100% Organic Combed Cotton.",
    care: "Machine wash cold with like colors. Tumble dry low or hang dry.",
    images: [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&q=80&w=1000"
    ],
    colors: [
      { name: "Slate Grey", hex: "#737D87" },
      { name: "Deep Charcoal", hex: "#292D32" },
      { name: "Warm Ivory", hex: "#F7F5F0" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 35,
    rating: 4.8,
    reviewCount: 68,
    isTrending: true,
    isBestSeller: false,
    isNew: true,
    isSale: true,
    season: "Winter 2026"
  },

  // 9. KIDS - Little Explorer Down Jacket
  {
    id: "prod-09",
    name: "Little Explorer Down Jacket",
    slug: "little-explorer-down-jacket",
    category: "kids",
    subcategory: "Kids Jackets",
    price: 13990,
    originalPrice: 16990,
    discountPercent: 18,
    description: "Designed for snow days and winter school walks. Features high-loft synthetic down insulation, a fleece-lined collar, reflective safety piping, and waterproof ripstop fabric.",
    shortDescription: "Snowproof insulated kids puffer with reflective strips and fleece hood.",
    details: [
      "Waterproof and windproof ripstop outer",
      "High-loft down-alternative thermal fill",
      "Fleece-lined chin guard to prevent zip chafing",
      "Elasticated storm cuffs to keep snow out",
      "Internal nametag label"
    ],
    materials: "Outer & Lining: 100% Recycled Polyester. Fill: Thermal Down Alternative.",
    care: "Machine wash delicate cycle 30°C. Tumble dry low with dryer balls.",
    images: [
      "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&q=80&w=1000"
    ],
    colors: [
      { name: "Mustard Gold", hex: "#D4A373" },
      { name: "Ice Blue", hex: "#90A4AE" },
      { name: "Forest Green", hex: "#37474F" }
    ],
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y", "10-12Y"],
    stock: 18,
    rating: 4.9,
    reviewCount: 23,
    isTrending: true,
    isBestSeller: true,
    isNew: false,
    isSale: false,
    season: "Winter 2026"
  },

  // 10. KIDS - Cozy Teddy Fleece Zip-Up
  {
    id: "prod-10",
    name: "Cozy Teddy Fleece Zip-Up",
    slug: "cozy-teddy-fleece-zip-up",
    category: "kids",
    subcategory: "Sweaters",
    price: 7990,
    originalPrice: 9990,
    discountPercent: 20,
    description: "Ultra-soft sherpa fleece jacket with jersey backing. Features contrasting trim, soft zip pullers for small hands, and deep warm hand pockets.",
    shortDescription: "Cloud-soft sherpa fleece with contrast binding and easy zip closure.",
    details: [
      "Double-sided high pile sherpa fleece",
      "Smooth nylon contrast chest pocket",
      "Easy-pull zipper slider",
      "Stretchy bound cuffs and collar"
    ],
    materials: "100% Recycled Polyester Sherpa Fleece.",
    care: "Machine wash cold. Do not bleach or iron.",
    images: [
      "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1471286174890-9c112ffca56a?auto=format&fit=crop&q=80&w=1000"
    ],
    colors: [
      { name: "Soft Cream", hex: "#EEEAE2" },
      { name: "Caramel", hex: "#C68B59" },
      { name: "Dusty Rose", hex: "#D8A47F" }
    ],
    sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"],
    stock: 24,
    rating: 4.8,
    reviewCount: 30,
    isTrending: false,
    isBestSeller: true,
    isNew: true,
    isSale: false,
    season: "Winter 2026"
  },

  // 11. KIDS - Junior Winter Ribbed Set
  {
    id: "prod-11",
    name: "Junior Winter Ribbed Set",
    slug: "junior-winter-ribbed-set",
    category: "kids",
    subcategory: "Winter Sets",
    price: 8990,
    originalPrice: 11990,
    discountPercent: 25,
    description: "A two-piece thermal ribbed sweater and trouser outfit crafted from organic combed cotton with a touch of elastane for all-day comfort and warmth.",
    shortDescription: "Two-piece organic ribbed knit top and jogger lounge set.",
    details: [
      "Includes crewneck sweater and elasticated joggers",
      "Soft flatlock stitching prevents friction",
      "Adjustable drawstring waist with organic cotton cord",
      "Rollable cuffs designed to grow with your child"
    ],
    materials: "95% Organic Cotton, 5% Elastane.",
    care: "Machine wash 30°C. Reshape while damp.",
    images: [
      "https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&q=80&w=1000"
    ],
    colors: [
      { name: "Champagne Beige", hex: "#D8C8B3" },
      { name: "Sage Mist", hex: "#9EADA0" },
      { name: "Slate Grey", hex: "#737D87" }
    ],
    sizes: ["1-2Y", "3-4Y", "5-6Y", "7-8Y"],
    stock: 15,
    rating: 4.7,
    reviewCount: 16,
    isTrending: false,
    isBestSeller: false,
    isNew: true,
    isSale: true,
    season: "Winter 2026"
  },

  // 12. KIDS - Baby Alpine Snowsuit
  {
    id: "prod-12",
    name: "Baby Alpine Snowsuit",
    slug: "baby-alpine-snowsuit",
    category: "kids",
    subcategory: "Baby Snowsuits",
    price: 11990,
    originalPrice: 14990,
    discountPercent: 20,
    description: "The sweetest total body protection for infants in sub-zero winter temperatures. Dual front zippers allow easy changing without waking baby.",
    shortDescription: "Full-zip infant snowsuit with foldover mittens and cozy fleece lining.",
    details: [
      "Dual full-length zippers for effortless dressing",
      "Foldover mitten and bootie cuffs for smaller sizes",
      "Faux shearling hood lining with soft ear details",
      "Windproof water-repellent micro-twill outer"
    ],
    materials: "Shell & Fill: 100% Recycled Polyester. Hood Lining: 100% Acrylic Sherpa.",
    care: "Machine wash delicate 30°C. Air dry.",
    images: [
      "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1544126592-807ade215a0b?auto=format&fit=crop&q=80&w=1000"
    ],
    colors: [
      { name: "Warm Ivory", hex: "#F7F5F0" },
      { name: "Muted Taupe", hex: "#A99B8A" },
      { name: "Cloud Grey", hex: "#C7CCD1" }
    ],
    sizes: ["0-6M", "6-12M", "12-18M", "18-24M"],
    stock: 12,
    rating: 4.9,
    reviewCount: 28,
    isTrending: true,
    isBestSeller: false,
    isNew: false,
    isSale: false,
    season: "Winter 2026"
  },

  // 13. ACCESSORIES - Merino Wool Ribbed Scarf
  {
    id: "prod-13",
    name: "Merino Wool Ribbed Scarf",
    slug: "merino-wool-ribbed-scarf",
    category: "accessories",
    subcategory: "Scarves",
    price: 6990,
    originalPrice: 8990,
    discountPercent: 22,
    description: "Generously proportioned at 220cm long, this ribbed scarf is knitted from Australian extra-fine merino wool. Delivers enveloping warmth and luxurious drape.",
    shortDescription: "Oversized 220cm extrafine merino wool ribbed scarf.",
    details: [
      "220cm x 45cm oversized wrap dimension",
      "Wide architectural fisherman rib structure",
      "Hand-finished selvedge borders",
      "Discreet embroidered brand monogram"
    ],
    materials: "100% Extrafine Australian Merino Wool (19.5 micron).",
    care: "Hand wash in cool water with wool detergent. Dry flat.",
    images: [
      "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&q=80&w=1000"
    ],
    colors: [
      { name: "Champagne Beige", hex: "#D8C8B3" },
      { name: "Deep Charcoal", hex: "#292D32" },
      { name: "Warm Ivory", hex: "#F7F5F0" }
    ],
    sizes: ["One Size"],
    stock: 45,
    rating: 4.9,
    reviewCount: 72,
    isTrending: true,
    isBestSeller: true,
    isNew: false,
    isSale: true,
    season: "Winter 2026"
  },

  // 14. ACCESSORIES - Lambswool Beanie
  {
    id: "prod-14",
    name: "Cashmere-Wool Turnup Beanie",
    slug: "cashmere-wool-turnup-beanie",
    category: "accessories",
    subcategory: "Beanies",
    price: 4490,
    originalPrice: 5990,
    discountPercent: 25,
    description: "The timeless winter beanie, crafted in seamless circular knit with a customizable deep foldover cuff. Blends resilient lambswool with brushed cashmere.",
    shortDescription: "Seamless ribbed watch cap with wide foldover cuff.",
    details: [
      "Seamless 7-gauge tubular rib knit",
      "Versatile turn-up hem for adjustable height",
      "Zero scratchiness with cashmere finish",
      "Naturally thermoregulating"
    ],
    materials: "70% Lambswool, 30% Cashmere.",
    care: "Hand wash cold. Lay flat to dry.",
    images: [
      "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1582966772680-860e372bb558?auto=format&fit=crop&q=80&w=1000"
    ],
    colors: [
      { name: "Muted Taupe", hex: "#A99B8A" },
      { name: "Warm Ivory", hex: "#F7F5F0" },
      { name: "Deep Charcoal", hex: "#292D32" }
    ],
    sizes: ["One Size"],
    stock: 50,
    rating: 4.8,
    reviewCount: 64,
    isTrending: true,
    isBestSeller: false,
    isNew: false,
    isSale: true,
    season: "Winter 2026"
  },

  // 15. ACCESSORIES - Arctic Thermal Snow Boot
  {
    id: "prod-15",
    name: "Arctic Thermal Snow Boot",
    slug: "arctic-thermal-snow-boot",
    category: "accessories",
    subcategory: "Winter Boots",
    price: 28990,
    originalPrice: 35990,
    discountPercent: 19,
    description: "Built for sub-zero alpine conditions without compromising Scandinavian elegance. Combines waterproof nubuck leather, genuine shearling lining, and a rugged Vibram Arctic Grip outsole.",
    shortDescription: "Waterproof nubuck leather snow boots with shearling interior and Vibram sole.",
    details: [
      "Waterproof seam-sealed Italian nubuck leather",
      "Full genuine shearling wool interior lining",
      "Vibram Arctic Grip lug sole for wet ice traction",
      "Speed lacing brass eyelets with tonal climbing laces",
      "Rated to -25°C comfort"
    ],
    materials: "Upper: 100% Nubuck Leather. Lining: 100% Shearling. Sole: 100% Vibram Rubber.",
    care: "Treat with waterproof leather protector spray. Clean with suede brush.",
    images: [
      "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1542295669297-4d352b042bca?auto=format&fit=crop&q=80&w=1000"
    ],
    colors: [
      { name: "Muted Taupe", hex: "#A99B8A" },
      { name: "Deep Charcoal", hex: "#292D32" }
    ],
    sizes: ["38", "39", "40", "41", "42", "43", "44"],
    stock: 14,
    rating: 4.9,
    reviewCount: 39,
    isTrending: false,
    isBestSeller: true,
    isNew: true,
    isSale: false,
    season: "Winter 2026"
  },

  // 16. ACCESSORIES - Nappa Leather Winter Gloves
  {
    id: "prod-16",
    name: "Nappa Leather Winter Gloves",
    slug: "nappa-leather-winter-gloves",
    category: "accessories",
    subcategory: "Gloves",
    price: 8490,
    originalPrice: 10990,
    discountPercent: 23,
    description: "Buttery-soft lambskin nappa leather gloves lined entirely in pure 100% Scottish cashmere. Features touchscreen-compatible index fingers and an elasticated wrist dart.",
    shortDescription: "Touchscreen lambskin nappa gloves lined with Scottish cashmere.",
    details: [
      "Supple Italian lambskin nappa leather",
      "100% brushed Scottish cashmere inner lining",
      "Invisible conductive touchscreen thread at thumb and forefinger",
      "Subtle side vent for smooth wrist entry"
    ],
    materials: "Outer: 100% Lambskin Nappa. Lining: 100% Cashmere.",
    care: "Specialist leather dry clean only.",
    images: [
      "https://images.unsplash.com/photo-1542295669297-4d352b042bca?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=1000"
    ],
    colors: [
      { name: "Deep Charcoal", hex: "#292D32" },
      { name: "Cognac Brown", hex: "#7B3F00" }
    ],
    sizes: ["S", "M", "L"],
    stock: 25,
    rating: 4.8,
    reviewCount: 41,
    isTrending: false,
    isBestSeller: false,
    isNew: false,
    isSale: true,
    season: "Winter 2026"
  },

  // 17. WOMEN - Minimalist Leather Biker
  {
    id: "prod-17",
    name: "Minimalist Leather Shearling Jacket",
    slug: "minimalist-leather-shearling-jacket",
    category: "women",
    subcategory: "Leather Jackets",
    price: 49990,
    originalPrice: 59990,
    discountPercent: 17,
    description: "An heirloom piece crafted from heavyweight Spanish merino shearling with a crackled leather finish. An asymmetrical heavy zipper and buckled throat latch provide exceptional wind resistance.",
    shortDescription: "Spanish merino shearling jacket with cracked vintage leather finish.",
    details: [
      "100% thick Spanish merino pelts",
      "Asymmetrical double-slider Riri front zip",
      "Twin collar buckle closures for high-neck wind defense",
      "Zippered hand pockets with leather pull tabs"
    ],
    materials: "100% Natural Merino Shearling & Leather.",
    care: "Professional leather and fur clean only.",
    images: [
      "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&q=80&w=1000"
    ],
    colors: [
      { name: "Deep Charcoal", hex: "#292D32" },
      { name: "Muted Taupe", hex: "#A99B8A" }
    ],
    sizes: ["XS", "S", "M", "L"],
    stock: 5,
    rating: 5.0,
    reviewCount: 18,
    isTrending: true,
    isBestSeller: false,
    isNew: true,
    isSale: false,
    season: "Winter 2026"
  },

  // 18. WOMEN - Longline Cashmere Turtleneck
  {
    id: "prod-18",
    name: "Nordic Cashmere Turtleneck",
    slug: "nordic-cashmere-turtleneck",
    category: "women",
    subcategory: "Sweaters",
    price: 21990,
    originalPrice: 26990,
    discountPercent: 19,
    description: "Spun from 4-ply Mongolian grade-A cashmere. Designed with a structured ribbed rollneck that never wilts, raglan sleeves, and relaxed split cuffs.",
    shortDescription: "4-ply pure Mongolian cashmere rollneck with structured high collar.",
    details: [
      "100% Grade-A Mongolian Cashmere (15.5 micron)",
      "Structured anti-droop ribbed turtleneck",
      "Raglan sleeves for natural shoulder drape",
      "Extended ribbed cuffs with subtle thumb slits"
    ],
    materials: "100% Mongolian Cashmere.",
    care: "Gentle hand wash in cold water or dry clean. Store folded.",
    images: [
      "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&q=80&w=1000"
    ],
    colors: [
      { name: "Warm Ivory", hex: "#F7F5F0" },
      { name: "Champagne Beige", hex: "#D8C8B3" },
      { name: "Deep Charcoal", hex: "#292D32" }
    ],
    sizes: ["XS", "S", "M", "L"],
    stock: 19,
    rating: 4.9,
    reviewCount: 45,
    isTrending: false,
    isBestSeller: true,
    isNew: false,
    isSale: false,
    season: "Winter 2026"
  },

  // 19. MEN - Mountain Peak Fleece
  {
    id: "prod-19",
    name: "Mountain Peak Technical Fleece",
    slug: "mountain-peak-technical-fleece",
    category: "men",
    subcategory: "Knitwear",
    price: 13990,
    originalPrice: 16990,
    discountPercent: 18,
    description: "Constructed with Polartec thermal high-loft fleece and reinforced abrasion-resistant shoulder panels. A high-performance midlayer for mountain excursions or city exploration.",
    shortDescription: "Polartec high-loft fleece pullover with nylon reinforced chest.",
    details: [
      "Polartec Thermal Pro high-loft fleece",
      "DWR-coated nylon shoulder overlays resist pack straps",
      "Quarter-zip front with microfleece chin guard",
      "Elasticated hem and bound armholes"
    ],
    materials: "100% Recycled Polyester Polartec Fleece.",
    care: "Machine wash warm 40°C. Do not use fabric softeners.",
    images: [
      "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1000"
    ],
    colors: [
      { name: "Slate Grey", hex: "#737D87" },
      { name: "Warm Ivory", hex: "#F7F5F0" },
      { name: "Muted Olive", hex: "#555D50" }
    ],
    sizes: ["S", "M", "L", "XL"],
    stock: 22,
    rating: 4.7,
    reviewCount: 29,
    isTrending: false,
    isBestSeller: false,
    isNew: true,
    isSale: true,
    season: "Winter 2026"
  },

  // 20. MEN - Quilted Winter Parka
  {
    id: "prod-20",
    name: "Aspen Down Parka",
    slug: "aspen-down-parka",
    category: "men",
    subcategory: "Puffer Jackets",
    price: 36990,
    originalPrice: 44990,
    discountPercent: 18,
    description: "Engineered to withstand harsh winter gales and sub-zero temperatures. Features a 3-layer weatherproof laminated membrane, 800-fill power down, and an insulated snorkel hood.",
    shortDescription: "3-layer weatherproof goose down parka with fleece hand warmers.",
    details: [
      "800-fill power certified European white goose down",
      "20,000mm hydrostatic head waterproof shell",
      "Heavy duty two-way military zipper with storm flap",
      "6 fleece-lined exterior utility pockets"
    ],
    materials: "Shell: 100% Technical Twill. Insulation: 90% Goose Down, 10% Feather.",
    care: "Professional wet clean only.",
    images: [
      "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1000"
    ],
    colors: [
      { name: "Deep Charcoal", hex: "#292D32" },
      { name: "Muted Taupe", hex: "#A99B8A" }
    ],
    sizes: ["S", "M", "L", "XL"],
    stock: 8,
    rating: 4.9,
    reviewCount: 37,
    isTrending: true,
    isBestSeller: true,
    isNew: false,
    isSale: false,
    season: "Winter 2026"
  },

  // 21. ACCESSORIES - Brushed Alpaca Stole
  {
    id: "prod-21",
    name: "Brushed Alpaca Wool Stole",
    slug: "brushed-alpaca-wool-stole",
    category: "accessories",
    subcategory: "Scarves",
    price: 9990,
    originalPrice: 12990,
    discountPercent: 23,
    description: "Cloud-soft baby alpaca woven with twisted fringe edges. Sized generously to be draped as an evening stole or wrapped twice as an oversized winter muffler.",
    shortDescription: "Plush brushed baby alpaca wrap with artisanal fringe ends.",
    details: [
      "200cm x 70cm versatile shawl dimension",
      "Long twisted hand-knotted fringe",
      "Unbelievably soft, lightweight, and warm",
      "Crafted in Arequipa, Peru"
    ],
    materials: "80% Baby Alpaca, 20% Wool.",
    care: "Dry clean only. Brush gently with clothes brush.",
    images: [
      "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&q=80&w=1000"
    ],
    colors: [
      { name: "Champagne Beige", hex: "#D8C8B3" },
      { name: "Muted Taupe", hex: "#A99B8A" },
      { name: "Warm Ivory", hex: "#F7F5F0" }
    ],
    sizes: ["One Size"],
    stock: 30,
    rating: 4.9,
    reviewCount: 48,
    isTrending: false,
    isBestSeller: true,
    isNew: false,
    isSale: true,
    season: "Winter 2026"
  },

  // 22. ACCESSORIES - Merino Thermal Socks (3-Pack)
  {
    id: "prod-22",
    name: "Merino Wool Thermal Socks (3-Pack)",
    slug: "merino-wool-thermal-socks-pack",
    category: "accessories",
    subcategory: "Socks",
    price: 3490,
    originalPrice: 4490,
    discountPercent: 22,
    description: "Cushioned crew socks crafted from fine Merino wool with arch compression support and a seamless toe closure to prevent blistering during winter walks.",
    shortDescription: "Heavy-cushion merino wool crew socks with reinforced heel and toe.",
    details: [
      "Full footbed terry loop cushioning",
      "Seamless linked toe seam prevents chafing",
      "Arch support band keeps socks securely in place",
      "Includes 3 pairs in tonal neutral shades"
    ],
    materials: "78% Merino Wool, 20% Polyamide, 2% Elastane.",
    care: "Machine wash delicate inside out. Line dry.",
    images: [
      "https://images.unsplash.com/photo-1582966772680-860e372bb558?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&q=80&w=1000"
    ],
    colors: [
      { name: "Tonal Multi", hex: "#D8C8B3" }
    ],
    sizes: ["M (38-41)", "L (42-45)"],
    stock: 60,
    rating: 4.8,
    reviewCount: 89,
    isTrending: false,
    isBestSeller: false,
    isNew: false,
    isSale: true,
    season: "Winter 2026"
  },

  // 23. WOMEN - Velvet Touch Puffer
  {
    id: "prod-23",
    name: "Velvet Touch Short Puffer",
    slug: "velvet-touch-short-puffer",
    category: "women",
    subcategory: "Puffer Jackets",
    price: 22990,
    originalPrice: 28990,
    discountPercent: 21,
    description: "A showstopping evening winter jacket crafted in water-resistant matte micro-velvet. Cropped contemporary fit with a sculptural stand collar and internal cinch cords.",
    shortDescription: "Cropped water-resistant micro-velvet puffer with stand collar.",
    details: [
      "Plush matte velvet with hydrophobic water-repellent coating",
      "Thermal recycled insulation",
      "Bungee hem adjusters for variable crop silhouette",
      "Concealed snap closure and metal zip"
    ],
    materials: "100% Polyester Micro-Velvet. Fill: Recycled Poly-Down.",
    care: "Dry clean only.",
    images: [
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=1000"
    ],
    colors: [
      { name: "Deep Charcoal", hex: "#292D32" },
      { name: "Champagne Beige", hex: "#D8C8B3" }
    ],
    sizes: ["XS", "S", "M", "L"],
    stock: 13,
    rating: 4.8,
    reviewCount: 22,
    isTrending: true,
    isBestSeller: false,
    isNew: true,
    isSale: true,
    season: "Winter 2026"
  },

  // 24. WOMEN - Double-Faced Long Wool Coat
  {
    id: "prod-24",
    name: "Architectural Longline Coat",
    slug: "architectural-longline-coat",
    category: "women",
    subcategory: "Long Coats",
    price: 39990,
    originalPrice: 49990,
    discountPercent: 20,
    description: "An ankle-length statement coat in heavy Italian melton wool. Dramatic notch lapels, structured shoulders, and sharp tailored welt pockets define this editorial masterpiece.",
    shortDescription: "Ankle-length Italian melton wool tailored coat with sharp notched lapels.",
    details: [
      "Heavyweight 800 GSM Italian virgin wool melton",
      "Deep back vent for easy movement",
      "Horn button front closure",
      "Full Bemberg silk lining"
    ],
    materials: "100% Virgin Wool. Lining: 100% Cupro.",
    care: "Specialist dry clean only.",
    images: [
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=1000",
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=1000"
    ],
    colors: [
      { name: "Warm Ivory", hex: "#F7F5F0" },
      { name: "Deep Charcoal", hex: "#292D32" },
      { name: "Muted Taupe", hex: "#A99B8A" }
    ],
    sizes: ["XS", "S", "M", "L"],
    stock: 8,
    rating: 5.0,
    reviewCount: 35,
    isTrending: true,
    isBestSeller: true,
    isNew: true,
    isSale: false,
    season: "Winter 2026"
  }
];
