import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ items: [] });
    }

    const cart = await prisma.cart.findUnique({
      where: { userId: session.userId },
      include: {
        items: {
          include: {
            product: {
              include: { images: { orderBy: { sortOrder: "asc" }, take: 1 } },
            },
            variant: true,
          },
          orderBy: { createdAt: "desc" },
        },
      },
    });

    return NextResponse.json({ items: cart?.items || [] });
  } catch (error) {
    console.error("GET /api/cart error:", error);
    return NextResponse.json({ error: "Failed to fetch cart" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json(
        { error: "Authentication required to sync cart with account." },
        { status: 401 }
      );
    }

    const { productId, variantId, quantity = 1 } = await req.json();

    if (!productId) {
      return NextResponse.json({ error: "Product ID required" }, { status: 400 });
    }

    // Ensure cart exists
    let cart = await prisma.cart.findUnique({
      where: { userId: session.userId },
    });

    if (!cart) {
      cart = await prisma.cart.create({ data: { userId: session.userId } });
    }

    // Check if item variant already in cart
    const existing = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId,
        variantId: variantId || null,
      },
    });

    if (existing) {
      const updated = await prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + quantity },
      });
      return NextResponse.json({ item: updated });
    } else {
      const newItem = await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          variantId,
          quantity,
        },
      });
      return NextResponse.json({ item: newItem }, { status: 201 });
    }
  } catch (error) {
    console.error("POST /api/cart error:", error);
    return NextResponse.json({ error: "Failed to add to cart" }, { status: 500 });
  }
}
