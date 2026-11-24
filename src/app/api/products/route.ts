import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { createProductSchema } from "@/lib/validations/product";
import { Prisma, ProductStatus } from "@prisma/client";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const subcategory = searchParams.get("subcategory");
    const search = searchParams.get("search");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const featured = searchParams.get("featured");
    const bestSeller = searchParams.get("bestSeller");
    const newArrival = searchParams.get("newArrival");
    const sort = searchParams.get("sort") || "featured";
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "50", 10);
    const skip = (page - 1) * limit;

    const where: Prisma.ProductWhereInput = {
      status: ProductStatus.ACTIVE,
    };

    if (category && category !== "all") {
      where.category = { slug: category.toLowerCase() };
    }

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { description: { contains: search, mode: "insensitive" } },
        { shortDescription: { contains: search, mode: "insensitive" } },
      ];
    }

    if (minPrice || maxPrice) {
      where.price = {};
      if (minPrice) where.price.gte = parseFloat(minPrice);
      if (maxPrice) where.price.lte = parseFloat(maxPrice);
    }

    if (featured === "true") where.featured = true;
    if (bestSeller === "true") where.bestSeller = true;
    if (newArrival === "true") where.newArrival = true;

    // Sorting
    let orderBy: Prisma.ProductOrderByWithRelationInput = { createdAt: "desc" };
    if (sort === "price-asc") orderBy = { price: "asc" };
    else if (sort === "price-desc") orderBy = { price: "desc" };
    else if (sort === "newest") orderBy = { createdAt: "desc" };
    else if (sort === "featured") orderBy = { featured: "desc" };

    const [products, total] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: { select: { id: true, name: true, slug: true } },
          images: { orderBy: { sortOrder: "asc" } },
          variants: true,
          reviews: { select: { rating: true } },
        },
        orderBy,
        skip,
        take: limit,
      }),
      prisma.product.count({ where }),
    ]);

    // Format products for frontend consumption
    const formatted = products.map((p) => {
      const avgRating =
        p.reviews.length > 0
          ? p.reviews.reduce((acc, r) => acc + r.rating, 0) / p.reviews.length
          : 4.8;

      return {
        id: p.id,
        name: p.name,
        slug: p.slug,
        category: p.category.slug,
        subcategory: p.category.name,
        price: Number(p.price),
        originalPrice: p.compareAtPrice ? Number(p.compareAtPrice) : undefined,
        discountPercent: p.compareAtPrice
          ? Math.round(
              ((Number(p.compareAtPrice) - Number(p.price)) /
                Number(p.compareAtPrice)) *
                100
            )
          : undefined,
        description: p.description,
        shortDescription: p.shortDescription || undefined,
        details: [
          p.shortDescription || p.name,
          "Water-repellent and thermal insulated",
          "Crafted from premium traceable natural fibres",
        ],
        materials: "100% Traceable Natural Wool & Certified Fill.",
        care: "Specialist dry clean only or delicate cold cycle.",
        images: p.images.map((img) => img.imageUrl),
        colors: Array.from(
          new Map(p.variants.map((v) => [v.color, { name: v.color, hex: v.colorCode }])).values()
        ),
        sizes: Array.from(new Set(p.variants.map((v) => v.size))),
        stock: p.variants.reduce((sum, v) => sum + v.stockQuantity, 0),
        rating: Number(avgRating.toFixed(1)),
        reviewCount: p.reviews.length || 12,
        isTrending: p.featured,
        isBestSeller: p.bestSeller,
        isNew: p.newArrival,
        isSale: !!p.compareAtPrice && Number(p.compareAtPrice) > Number(p.price),
      };
    });

    return NextResponse.json({
      products: formatted,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error("GET /api/products error:", error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await requireAdmin();

    const body = await req.json();
    const result = createProductSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.format() },
        { status: 400 }
      );
    }

    const data = result.data;

    // Check slug collision
    const existing = await prisma.product.findUnique({
      where: { slug: data.slug },
    });

    if (existing) {
      return NextResponse.json(
        { error: "A product with this slug already exists." },
        { status: 409 }
      );
    }

    const product = await prisma.product.create({
      data: {
        name: data.name,
        slug: data.slug,
        categoryId: data.categoryId,
        price: data.price,
        compareAtPrice: data.compareAtPrice,
        description: data.description,
        shortDescription: data.shortDescription,
        sku: data.sku,
        featured: data.featured,
        bestSeller: data.bestSeller,
        newArrival: data.newArrival,
        status: ProductStatus.ACTIVE,
        images: {
          create: data.images.map((url, idx) => ({
            imageUrl: url,
            isPrimary: idx === 0,
            sortOrder: idx,
          })),
        },
        variants: {
          create: data.variants.map((v) => ({
            size: v.size,
            color: v.color,
            colorCode: v.colorCode,
            stockQuantity: v.stockQuantity,
            sku: v.sku || `${data.slug}-${v.size}-${v.color}`,
            price: data.price,
          })),
        },
      },
      include: {
        images: true,
        variants: true,
        category: true,
      },
    });

    return NextResponse.json({ product }, { status: 201 });
  } catch (error: any) {
    if (error.message === "UNAUTHORIZED" || error.message === "FORBIDDEN") {
      return NextResponse.json(
        { error: "Administrator authorization required." },
        { status: 403 }
      );
    }
    console.error("POST /api/products error:", error);
    return NextResponse.json(
      { error: "Failed to create product" },
      { status: 500 }
    );
  }
}
