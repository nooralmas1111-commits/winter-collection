import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ productId: string }> }
) {
  try {
    const session = await requireAuth();
    const { productId } = await params;

    const wishlist = await prisma.wishlist.findUnique({
      where: { userId: session.userId },
    });

    if (wishlist) {
      await prisma.wishlistItem.deleteMany({
        where: {
          wishlistId: wishlist.id,
          productId,
        },
      });
    }

    return NextResponse.json({ message: "Item removed from wishlist" });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
