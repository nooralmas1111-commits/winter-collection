import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ itemId: string }> }
) {
  try {
    await requireAuth();
    const { itemId } = await params;
    const { quantity } = await req.json();

    if (quantity <= 0) {
      await prisma.cartItem.delete({ where: { id: itemId } });
      return NextResponse.json({ message: "Item removed" });
    }

    const updated = await prisma.cartItem.update({
      where: { id: itemId },
      data: { quantity },
    });

    return NextResponse.json({ item: updated });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ itemId: string }> }
) {
  try {
    await requireAuth();
    const { itemId } = await params;

    await prisma.cartItem.delete({ where: { id: itemId } });
    return NextResponse.json({ message: "Item removed from cart" });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
