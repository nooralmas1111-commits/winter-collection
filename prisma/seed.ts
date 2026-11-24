import { PrismaClient, Role, ProductStatus, DiscountType } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting FROST & FLAIR database seed...");

  // 1. Seed Administrator and Test Customer
  const adminPasswordHash = await bcrypt.hash("AdminPassword2026!", 10);
  const customerPasswordHash = await bcrypt.hash("CustomerPassword123!", 10);

  const admin = await prisma.user.upsert({
    where: { email: "admin@frostandflair.pk" },
    update: {},
    create: {
      name: "Atelier Administrator",
      email: "admin@frostandflair.pk",
      passwordHash: adminPasswordHash,
      role: Role.ADMIN,
      phone: "+92 300 8443767",
    },
  });
  console.log(`👤 Admin created/verified: ${admin.email}`);

  const customer = await prisma.user.upsert({
    where: { email: "amina@example.com" },
    update: {},
    create: {
      name: "Amina Tariq",
      email: "amina@example.com",
      passwordHash: customerPasswordHash,
      role: Role.CUSTOMER,
      phone: "+92 321 5551234",
    },
  });
  console.log(`👤 Customer created/verified: ${customer.email}`);

  // 2. Seed Coupons
  const coupons = [
    {
      code: "WINTER20",
      discountType: DiscountType.PERCENTAGE,
      discountValue: 20,
      minimumOrderAmount: 5000,
      maximumDiscount: 10000,
      isActive: true,
    },
    {
      code: "FLAIR10",
      discountType: DiscountType.PERCENTAGE,
      discountValue: 10,
      minimumOrderAmount: 3000,
      maximumDiscount: 5000,
      isActive: true,
    },
  ];

  for (const c of coupons) {
    await prisma.coupon.upsert({
      where: { code: c.code },
      update: c,
      create: c,
    });
  }
  console.log("🏷️ Coupons seeded: WINTER20, FLAIR10");

  // 3. Seed Main Categories & Subcategories
  const categoriesData = [
    {
      name: "Women",
      slug: "women",
      description: "Sculpted warmth, double-faced wool, and cloud-soft cashmere outerwear.",
      image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=1200",
    },
    {
      name: "Men",
      slug: "men",
      description: "Structural outerwear, weather-resistant bombers, and insulating knit layers.",
      image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1200",
    },
    {
      name: "Kids",
      slug: "kids",
      description: "Down-filled warmth, cozy ribbed sets, and soft thermal weaves for children.",
      image: "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?auto=format&fit=crop&q=80&w=1200",
    },
    {
      name: "Baby",
      slug: "baby",
      description: "Gentle infant snowsuits and soft thermal fleece essentials.",
      image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&q=80&w=1200",
    },
    {
      name: "Accessories",
      slug: "accessories",
      description: "Ribbed beanies, brushed merino scarves, leather gloves, and snow boots.",
      image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&q=80&w=1200",
    },
  ];

  const categoryMap = new Map<string, string>();

  for (const cat of categoriesData) {
    const created = await prisma.category.upsert({
      where: { slug: cat.slug },
      update: cat,
      create: cat,
    });
    categoryMap.set(cat.slug, created.id);
  }
  console.log("📁 5 Root categories verified");

  // 4. Seed Products with Variants and Images
  const products = [
    {
      name: "Alpine Puffer Jacket",
      slug: "alpine-puffer-jacket",
      categorySlug: "women",
      price: 24990,
      compareAtPrice: 31990,
      sku: "FF-W-01",
      description: "An architectural down puffer crafted from water-repellent shell with cloud-density duck down filling. Engineered for severe winter climates with fleece-lined pockets, a storm flap, and a detachable cocoon hood.",
      shortDescription: "Ultra-warm quilted down puffer with storm-proof storm flap and detachable hood.",
      featured: true,
      bestSeller: true,
      newArrival: false,
      images: [
        "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1000",
      ],
      colors: [
        { name: "Warm Ivory", code: "#F7F5F0" },
        { name: "Deep Charcoal", code: "#292D32" },
      ],
      sizes: ["XS", "S", "M", "L", "XL"],
    },
    {
      name: "Classic Wool Coat",
      slug: "classic-wool-coat",
      categorySlug: "women",
      price: 34990,
      compareAtPrice: 42990,
      sku: "FF-W-02",
      description: "Tailored from heavyweight double-faced Virgin wool, this floor-grazing wrap coat features structured drop shoulders, a matching self-tie belt, and horn buttons.",
      shortDescription: "Double-faced virgin wool wrap coat with drop shoulder silhouette and self-tie sash.",
      featured: true,
      bestSeller: true,
      newArrival: true,
      images: [
        "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=1000",
      ],
      colors: [
        { name: "Champagne Beige", code: "#D8C8B3" },
        { name: "Deep Charcoal", code: "#292D32" },
      ],
      sizes: ["XS", "S", "M", "L"],
    },
    {
      name: "Cloud Knit Sweater",
      slug: "cloud-knit-sweater",
      categorySlug: "women",
      price: 14990,
      compareAtPrice: 17990,
      sku: "FF-W-03",
      description: "Spun from an ethereal blend of brushed baby alpaca and mulberry silk. This relaxed mock-neck sweater offers weightless warmth with exaggerated ribbed cuffs.",
      shortDescription: "Weightless baby alpaca and silk mock neck with voluminous ribbed sleeves.",
      featured: true,
      bestSeller: false,
      newArrival: true,
      images: [
        "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&q=80&w=1000",
      ],
      colors: [
        { name: "Soft Cream", code: "#EEEAE2" },
        { name: "Muted Taupe", code: "#A99B8A" },
      ],
      sizes: ["XS", "S", "M", "L"],
    },
    {
      name: "Winter Luxe Cardigan",
      slug: "winter-luxe-cardigan",
      categorySlug: "women",
      price: 18990,
      compareAtPrice: 22990,
      sku: "FF-W-04",
      description: "An elongated chunky cardigan knit in a heavy waffle rib. Features mother-of-pearl buttons, deep patch pockets, and an easy relaxed fit.",
      shortDescription: "Heavyweight chunky waffle rib cardigan with natural shell buttons.",
      featured: false,
      bestSeller: false,
      newArrival: false,
      images: [
        "https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?auto=format&fit=crop&q=80&w=1000",
      ],
      colors: [
        { name: "Warm Ivory", code: "#F7F5F0" },
        { name: "Slate Grey", code: "#737D87" },
      ],
      sizes: ["S", "M", "L"],
    },
    {
      name: "Frostline Bomber Jacket",
      slug: "frostline-bomber-jacket",
      categorySlug: "men",
      price: 26990,
      compareAtPrice: 32990,
      sku: "FF-M-01",
      description: "A refined interpretation of military outerwear, tailored in windproof tech twill with Primaloft thermal insulation. Features a removable genuine shearling collar.",
      shortDescription: "Primaloft-insulated winter bomber jacket with detachable shearling collar.",
      featured: true,
      bestSeller: true,
      newArrival: true,
      images: [
        "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&fit=crop&q=80&w=1000",
      ],
      colors: [
        { name: "Deep Charcoal", code: "#292D32" },
        { name: "Muted Olive", code: "#555D50" },
      ],
      sizes: ["S", "M", "L", "XL"],
    },
    {
      name: "Cashmere Touch Overcoat",
      slug: "cashmere-touch-overcoat",
      categorySlug: "men",
      price: 38990,
      compareAtPrice: 48990,
      sku: "FF-M-02",
      description: "The quintessential gentleman's winter coat. Cut with a modern straight drape from an Italian wool-cashmere blend with horn buttons.",
      shortDescription: "Single-breasted Italian wool and cashmere blend overcoat with tailored lapels.",
      featured: true,
      bestSeller: true,
      newArrival: false,
      images: [
        "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&q=80&w=1000",
      ],
      colors: [
        { name: "Charcoal", code: "#292D32" },
        { name: "Camel", code: "#BFA588" },
      ],
      sizes: ["S", "M", "L", "XL"],
    },
    {
      name: "Nordic Cable-Knit Pullover",
      slug: "nordic-cable-knit-pullover",
      categorySlug: "men",
      price: 15990,
      compareAtPrice: 19990,
      sku: "FF-M-03",
      description: "Crafted in Scotland from pure heavy Shetland wool. Intricate cable and honeycomb stitches trap air for outstanding insulation.",
      shortDescription: "Heavy Shetland wool crewneck knit with traditional rope and diamond cables.",
      featured: false,
      bestSeller: true,
      newArrival: false,
      images: [
        "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=1000",
      ],
      colors: [
        { name: "Warm Cream", code: "#EEEAE2" },
        { name: "Slate Grey", code: "#737D87" },
      ],
      sizes: ["S", "M", "L", "XL"],
    },
    {
      name: "Cozy Everyday Hoodie",
      slug: "cozy-everyday-hoodie",
      categorySlug: "men",
      price: 9990,
      compareAtPrice: 12490,
      sku: "FF-M-04",
      description: "Constructed from 480 GSM custom French terry cotton with an ultra-plush brushed interior. Generously proportioned with double-layered hood.",
      shortDescription: "Heavyweight 480 GSM brushed fleece hoodie with double-layer hood.",
      featured: true,
      bestSeller: false,
      newArrival: true,
      images: [
        "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=1000",
      ],
      colors: [
        { name: "Slate Grey", code: "#737D87" },
        { name: "Deep Charcoal", code: "#292D32" },
      ],
      sizes: ["S", "M", "L", "XL", "XXL"],
    },
    {
      name: "Little Explorer Down Jacket",
      slug: "little-explorer-down-jacket",
      categorySlug: "kids",
      price: 13990,
      compareAtPrice: 16990,
      sku: "FF-K-01",
      description: "Designed for snow days and winter school walks. Features high-loft synthetic down insulation, fleece-lined collar, and reflective piping.",
      shortDescription: "Snowproof insulated kids puffer with reflective strips and fleece hood.",
      featured: true,
      bestSeller: true,
      newArrival: false,
      images: [
        "https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?auto=format&fit=crop&q=80&w=1000",
      ],
      colors: [
        { name: "Mustard Gold", code: "#D4A373" },
        { name: "Ice Blue", code: "#90A4AE" },
      ],
      sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"],
    },
    {
      name: "Cozy Teddy Fleece Zip-Up",
      slug: "cozy-teddy-fleece-zip-up",
      categorySlug: "kids",
      price: 7990,
      compareAtPrice: 9990,
      sku: "FF-K-02",
      description: "Ultra-soft sherpa fleece jacket with jersey backing. Features contrasting trim and soft pullers for small hands.",
      shortDescription: "Cloud-soft sherpa fleece with contrast binding and easy zip closure.",
      featured: false,
      bestSeller: true,
      newArrival: true,
      images: [
        "https://images.unsplash.com/photo-1503919545889-aef636e10ad4?auto=format&fit=crop&q=80&w=1000",
      ],
      colors: [
        { name: "Soft Cream", code: "#EEEAE2" },
        { name: "Caramel", code: "#C68B59" },
      ],
      sizes: ["2-3Y", "4-5Y", "6-7Y", "8-9Y"],
    },
    {
      name: "Baby Alpine Snowsuit",
      slug: "baby-alpine-snowsuit",
      categorySlug: "baby",
      price: 11990,
      compareAtPrice: 14990,
      sku: "FF-B-01",
      description: "The sweetest total body protection for infants in sub-zero winter temperatures. Dual front zippers allow easy changing.",
      shortDescription: "Full-zip infant snowsuit with foldover mittens and cozy fleece lining.",
      featured: true,
      bestSeller: false,
      newArrival: false,
      images: [
        "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&q=80&w=1000",
      ],
      colors: [
        { name: "Warm Ivory", code: "#F7F5F0" },
        { name: "Cloud Grey", code: "#C7CCD1" },
      ],
      sizes: ["0-6M", "6-12M", "12-18M"],
    },
    {
      name: "Merino Wool Ribbed Scarf",
      slug: "merino-wool-ribbed-scarf",
      categorySlug: "accessories",
      price: 6990,
      compareAtPrice: 8990,
      sku: "FF-A-01",
      description: "Generously proportioned at 220cm long, this ribbed scarf is knitted from Australian extra-fine merino wool.",
      shortDescription: "Oversized 220cm extrafine merino wool ribbed scarf.",
      featured: true,
      bestSeller: true,
      newArrival: false,
      images: [
        "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&q=80&w=1000",
      ],
      colors: [
        { name: "Champagne Beige", code: "#D8C8B3" },
        { name: "Deep Charcoal", code: "#292D32" },
      ],
      sizes: ["One Size"],
    },
    {
      name: "Cashmere-Wool Turnup Beanie",
      slug: "cashmere-wool-turnup-beanie",
      categorySlug: "accessories",
      price: 4490,
      compareAtPrice: 5990,
      sku: "FF-A-02",
      description: "The timeless winter beanie, crafted in seamless circular knit with a customizable deep foldover cuff.",
      shortDescription: "Seamless ribbed watch cap with wide foldover cuff.",
      featured: true,
      bestSeller: false,
      newArrival: false,
      images: [
        "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&q=80&w=1000",
      ],
      colors: [
        { name: "Muted Taupe", code: "#A99B8A" },
        { name: "Warm Ivory", code: "#F7F5F0" },
      ],
      sizes: ["One Size"],
    },
    {
      name: "Arctic Thermal Snow Boot",
      slug: "arctic-thermal-snow-boot",
      categorySlug: "accessories",
      price: 28990,
      compareAtPrice: 35990,
      sku: "FF-A-03",
      description: "Built for sub-zero alpine conditions without compromising Scandinavian elegance. Combines waterproof nubuck leather, genuine shearling, and Vibram Arctic Grip outsole.",
      shortDescription: "Waterproof nubuck leather snow boots with shearling interior and Vibram sole.",
      featured: false,
      bestSeller: true,
      newArrival: true,
      images: [
        "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&q=80&w=1000",
      ],
      colors: [
        { name: "Muted Taupe", code: "#A99B8A" },
        { name: "Deep Charcoal", code: "#292D32" },
      ],
      sizes: ["39", "40", "41", "42", "43"],
    },
    {
      name: "Nappa Leather Winter Gloves",
      slug: "nappa-leather-winter-gloves",
      categorySlug: "accessories",
      price: 8490,
      compareAtPrice: 10990,
      sku: "FF-A-04",
      description: "Buttery-soft lambskin nappa leather gloves lined entirely in pure 100% Scottish cashmere with touchscreen fingers.",
      shortDescription: "Touchscreen lambskin nappa gloves lined with Scottish cashmere.",
      featured: false,
      bestSeller: false,
      newArrival: false,
      images: [
        "https://images.unsplash.com/photo-1542295669297-4d352b042bca?auto=format&fit=crop&q=80&w=1000",
      ],
      colors: [
        { name: "Deep Charcoal", code: "#292D32" },
      ],
      sizes: ["S", "M", "L"],
    },
    {
      name: "Minimalist Leather Shearling Jacket",
      slug: "minimalist-leather-shearling-jacket",
      categorySlug: "women",
      price: 49990,
      compareAtPrice: 59990,
      sku: "FF-W-05",
      description: "An heirloom piece crafted from heavyweight Spanish merino shearling with a crackled vintage finish.",
      shortDescription: "Spanish merino shearling jacket with cracked vintage leather finish.",
      featured: true,
      bestSeller: false,
      newArrival: true,
      images: [
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=1000",
      ],
      colors: [
        { name: "Deep Charcoal", code: "#292D32" },
      ],
      sizes: ["XS", "S", "M", "L"],
    },
    {
      name: "Nordic Cashmere Turtleneck",
      slug: "nordic-cashmere-turtleneck",
      categorySlug: "women",
      price: 21990,
      compareAtPrice: 26990,
      sku: "FF-W-06",
      description: "Spun from 4-ply Mongolian grade-A cashmere. Structured ribbed rollneck with raglan sleeves.",
      shortDescription: "4-ply pure Mongolian cashmere rollneck with structured high collar.",
      featured: false,
      bestSeller: true,
      newArrival: false,
      images: [
        "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?auto=format&fit=crop&q=80&w=1000",
      ],
      colors: [
        { name: "Warm Ivory", code: "#F7F5F0" },
        { name: "Champagne Beige", code: "#D8C8B3" },
      ],
      sizes: ["XS", "S", "M", "L"],
    },
    {
      name: "Mountain Peak Technical Fleece",
      slug: "mountain-peak-technical-fleece",
      categorySlug: "men",
      price: 13990,
      compareAtPrice: 16990,
      sku: "FF-M-05",
      description: "Constructed with Polartec thermal high-loft fleece and reinforced abrasion-resistant shoulder panels.",
      shortDescription: "Polartec high-loft fleece pullover with nylon reinforced chest.",
      featured: false,
      bestSeller: false,
      newArrival: true,
      images: [
        "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&q=80&w=1000",
      ],
      colors: [
        { name: "Slate Grey", code: "#737D87" },
        { name: "Warm Ivory", code: "#F7F5F0" },
      ],
      sizes: ["S", "M", "L", "XL"],
    },
    {
      name: "Aspen Down Parka",
      slug: "aspen-down-parka",
      categorySlug: "men",
      price: 36990,
      compareAtPrice: 44990,
      sku: "FF-M-06",
      description: "Engineered to withstand harsh winter gales with 3-layer weatherproof laminated membrane and 800-fill power goose down.",
      shortDescription: "3-layer weatherproof goose down parka with fleece hand warmers.",
      featured: true,
      bestSeller: true,
      newArrival: false,
      images: [
        "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&fit=crop&q=80&w=1000",
      ],
      colors: [
        { name: "Deep Charcoal", code: "#292D32" },
      ],
      sizes: ["S", "M", "L", "XL"],
    },
    {
      name: "Brushed Alpaca Wool Stole",
      slug: "brushed-alpaca-wool-stole",
      categorySlug: "accessories",
      price: 9990,
      compareAtPrice: 12990,
      sku: "FF-A-05",
      description: "Cloud-soft baby alpaca woven with twisted fringe edges. Sized generously at 200cm x 70cm.",
      shortDescription: "Plush brushed baby alpaca wrap with artisanal fringe ends.",
      featured: false,
      bestSeller: true,
      newArrival: false,
      images: [
        "https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?auto=format&fit=crop&q=80&w=1000",
      ],
      colors: [
        { name: "Champagne Beige", code: "#D8C8B3" },
      ],
      sizes: ["One Size"],
    },
  ];

  for (const p of products) {
    const categoryId = categoryMap.get(p.categorySlug);
    if (!categoryId) continue;

    const product = await prisma.product.upsert({
      where: { slug: p.slug },
      update: {
        name: p.name,
        description: p.description,
        shortDescription: p.shortDescription,
        price: p.price,
        compareAtPrice: p.compareAtPrice,
        sku: p.sku,
        categoryId,
        featured: p.featured,
        bestSeller: p.bestSeller,
        newArrival: p.newArrival,
        status: ProductStatus.ACTIVE,
      },
      create: {
        name: p.name,
        slug: p.slug,
        description: p.description,
        shortDescription: p.shortDescription,
        price: p.price,
        compareAtPrice: p.compareAtPrice,
        sku: p.sku,
        categoryId,
        featured: p.featured,
        bestSeller: p.bestSeller,
        newArrival: p.newArrival,
        status: ProductStatus.ACTIVE,
      },
    });

    // Create Images
    for (let i = 0; i < p.images.length; i++) {
      const img = p.images[i];
      const existingImg = await prisma.productImage.findFirst({
        where: { productId: product.id, imageUrl: img },
      });

      if (!existingImg) {
        await prisma.productImage.create({
          data: {
            productId: product.id,
            imageUrl: img,
            altText: `${p.name} image ${i + 1}`,
            isPrimary: i === 0,
            sortOrder: i,
          },
        });
      }
    }

    // Create ProductVariants for each color and size combination
    for (const color of p.colors) {
      for (const size of p.sizes) {
        const variantSku = `${p.sku}-${color.name.slice(0, 3).toUpperCase()}-${size}`;
        await prisma.productVariant.upsert({
          where: { sku: variantSku },
          update: {
            stockQuantity: 25,
            price: p.price,
          },
          create: {
            productId: product.id,
            color: color.name,
            colorCode: color.code,
            size,
            sku: variantSku,
            stockQuantity: 25,
            price: p.price,
          },
        });
      }
    }
  }

  console.log(`📦 Seeded ${products.length} products with multi-color & size variants and images.`);
  console.log("✅ Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
