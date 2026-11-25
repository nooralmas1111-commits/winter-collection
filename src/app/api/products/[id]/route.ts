import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { updateProductSchema } from "@/lib/validations/product";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const product = await prisma.product.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
      include: {
        category: true,
        images: { orderBy: { sortOrder: "asc" } },
        variants: true,
        reviews: {
          include: {
            user: { select: { name: true } },
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    const avgRating =
      product.reviews.length > 0
        ? product.reviews.reduce((acc, r) => acc + r.rating, 0) /
          product.reviews.length
        : 4.9;

    const formatted = {
      id: product.id,
      name: product.name,
      slug: product.slug,
      category: product.category.slug,
      subcategory: product.category.name,
      price: Number(product.price),
      originalPrice: product.compareAtPrice ? Number(product.compareAtPrice) : undefined,
      discountPercent: product.compareAtPrice
        ? Math.round(
            ((Number(product.compareAtPrice) - Number(product.price)) /
              Number(product.compareAtPrice)) *
              100
          )
        : undefined,
      description: product.description,
      shortDescription: product.shortDescription || undefined,
      details: [
        product.shortDescription || product.name,
        "Water-repellent and thermal insulated",
        "Crafted from premium traceable natural fibres",
        "Hand-finished double-stitched seams",
      ],
      materials: "100% Traceable Natural Wool & Certified Fill.",
      care: "Specialist dry clean only or delicate cold cycle.",
      images: product.images.map((img) => img.imageUrl),
      colors: Array.from(
        new Map(
          product.variants.map((v) => [v.color, { name: v.color, hex: v.colorCode }])
        ).values()
      ),
      sizes: Array.from(new Set(product.variants.map((v) => v.size))),
      stock: product.variants.reduce((sum, v) => sum + v.stockQuantity, 0),
      rating: Number(avgRating.toFixed(1)),
      reviewCount: product.reviews.length || 24,
      isTrending: product.featured,
      isBestSeller: product.bestSeller,
      isNew: product.newArrival,
      isSale: !!product.compareAtPrice && Number(product.compareAtPrice) > Number(product.price),
      variants: product.variants,
      reviews: product.reviews.map((r) => ({
        id: r.id,
        name: r.user.name,
        rating: r.rating,
        comment: r.comment,
        date: r.createdAt.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
      })),
    };

    return NextResponse.json({ product: formatted });
  } catch (error: any) {
    console.error("GET /api/products/[id] error:", error);
    return NextResponse.json(
      { error: "Error retrieving product" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = await req.json();

    const result = updateProductSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.format() },
        { status: 400 }
      );
    }

    const data = result.data;

    const updated = await prisma.product.update({
      where: { id },
      data: {
        name: data.name,
        price: data.price,
        compareAtPrice: data.compareAtPrice,
        description: data.description,
        shortDescription: data.shortDescription,
        categoryId: data.categoryId,
        featured: data.featured,
        bestSeller: data.bestSeller,
        newArrival: data.newArrival,
      },
    });

    return NextResponse.json({ product: updated });
  } catch (error: any) {
    if (error.message === "UNAUTHORIZED" || error.message === "FORBIDDEN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;

    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error: any) {
    if (error.message === "UNAUTHORIZED" || error.message === "FORBIDDEN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
