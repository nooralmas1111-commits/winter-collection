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

    const wishlist = await prisma.wishlist.findUnique({
      where: { userId: session.userId },
      include: {
        items: {
          include: {
            product: {
              include: { images: true, variants: true },
            },
          },
        },
      },
    });

    return NextResponse.json({ items: wishlist?.items || [] });
  } catch {
    return NextResponse.json({ error: "Failed to fetch wishlist" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { productId } = await req.json();

    let wishlist = await prisma.wishlist.findUnique({
      where: { userId: session.userId },
    });

    if (!wishlist) {
      wishlist = await prisma.wishlist.create({ data: { userId: session.userId } });
    }

    const item = await prisma.wishlistItem.upsert({
      where: {
        wishlistId_productId: {
          wishlistId: wishlist.id,
          productId,
        },
      },
      update: {},
      create: {
        wishlistId: wishlist.id,
        productId,
      },
    });

    return NextResponse.json({ item }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to update wishlist" }, { status: 500 });
  }
}
