import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { updateOrderStatusSchema } from "@/lib/validations/order";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin();
    const { id } = await params;
    const body = await req.json();

    const result = updateOrderStatusSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid status value" },
        { status: 400 }
      );
    }

    const updated = await prisma.order.update({
      where: { id },
      data: { orderStatus: result.data.status },
    });

    return NextResponse.json({ order: updated });
  } catch (error: any) {
    if (error.message === "UNAUTHORIZED" || error.message === "FORBIDDEN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
    return NextResponse.json(
      { error: "Failed to update order status" },
      { status: 500 }
    );
  }
}
