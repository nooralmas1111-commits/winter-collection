import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";

export async function GET() {
  try {
    await requireAdmin();

    const [
      totalOrders,
      totalCustomers,
      totalProducts,
      orders,
      recentOrders,
      lowStockVariants,
    ] = await Promise.all([
      prisma.order.count(),
      prisma.user.count({ where: { role: "CUSTOMER" } }),
      prisma.product.count(),
      prisma.order.findMany({ select: { totalAmount: true } }),
      prisma.order.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: {
          items: true,
          user: { select: { name: true, email: true } },
        },
      }),
      prisma.productVariant.findMany({
        where: { stockQuantity: { lte: 5 } },
        include: { product: { select: { name: true, slug: true } } },
        take: 10,
      }),
    ]);

    const totalRevenue = orders.reduce(
      (sum, o) => sum + Number(o.totalAmount),
      0
    );

    return NextResponse.json({
      metrics: {
        totalRevenue,
        totalOrders,
        totalCustomers,
        totalProducts,
        lowStockCount: lowStockVariants.length,
      },
      recentOrders,
      lowStockVariants,
    });
  } catch (error: any) {
    if (error.message === "UNAUTHORIZED" || error.message === "FORBIDDEN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }
    console.error("GET /api/admin/metrics error:", error);
    return NextResponse.json(
      { error: "Failed to load admin metrics" },
      { status: 500 }
    );
  }
}
