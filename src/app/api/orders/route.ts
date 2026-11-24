import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { createOrderSchema } from "@/lib/validations/order";
import { PaymentMethod, PaymentStatus, OrderStatus, DiscountType } from "@prisma/client";

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Admins see all orders; customers see their own
    const where = session.role === "ADMIN" ? {} : { userId: session.userId };

    const orders = await prisma.order.findMany({
      where,
      include: {
        items: true,
        user: { select: { name: true, email: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ orders });
  } catch (error) {
    console.error("GET /api/orders error:", error);
    return NextResponse.json({ error: "Failed to fetch orders" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getSession();
    const body = await req.json();

    const result = createOrderSchema.safeParse(body);
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid order data", details: result.error.format() },
        { status: 400 }
      );
    }

    const { items, customer, paymentMethod, couponCode } = result.data;

    // Server-side calculation & verification
    let calculatedSubtotal = 0;
    const validatedItems: any[] = [];

    // Verify products & inventory
    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
        include: { variants: true },
      });

      if (!product) {
        return NextResponse.json(
          { error: `Product "${item.productName}" no longer exists.` },
          { status: 400 }
        );
      }

      const unitPrice = Number(product.price);
      const lineTotal = unitPrice * item.quantity;
      calculatedSubtotal += lineTotal;

      // Find matching variant if variantId provided or by size/color
      const matchingVariant = product.variants.find(
        (v) =>
          v.id === item.variantId ||
          (v.size === item.selectedSize && v.color === item.selectedColor)
      );

      if (matchingVariant && matchingVariant.stockQuantity < item.quantity) {
        return NextResponse.json(
          {
            error: `Insufficient stock for "${product.name}" in size ${item.selectedSize}. Only ${matchingVariant.stockQuantity} remaining.`,
          },
          { status: 400 }
        );
      }

      validatedItems.push({
        productId: product.id,
        variantId: matchingVariant?.id || null,
        productName: product.name,
        selectedSize: item.selectedSize,
        selectedColor: item.selectedColor,
        quantity: item.quantity,
        unitPrice,
        totalPrice: lineTotal,
      });
    }

    // Verify Coupon if applied
    let discount = 0;
    if (couponCode) {
      const coupon = await prisma.coupon.findUnique({
        where: { code: couponCode.toUpperCase() },
      });

      if (
        coupon &&
        coupon.isActive &&
        (!coupon.expiresAt || coupon.expiresAt > new Date())
      ) {
        if (
          !coupon.minimumOrderAmount ||
          calculatedSubtotal >= Number(coupon.minimumOrderAmount)
        ) {
          if (coupon.discountType === DiscountType.PERCENTAGE) {
            discount = (calculatedSubtotal * Number(coupon.discountValue)) / 100;
            if (coupon.maximumDiscount && discount > Number(coupon.maximumDiscount)) {
              discount = Number(coupon.maximumDiscount);
            }
          } else {
            discount = Number(coupon.discountValue);
          }
        }
      }
    }

    const shippingCost = calculatedSubtotal >= 5000 ? 0 : 350;
    const totalAmount = Math.max(0, calculatedSubtotal - discount + shippingCost);

    // Generate unique order number: FF-2026-XXXX
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `FF-2026-${randomSuffix}`;

    // Execute safe database transaction
    const order = await prisma.$transaction(async (tx) => {
      // 1. Decrement variant stock
      for (const item of validatedItems) {
        if (item.variantId) {
          await tx.productVariant.update({
            where: { id: item.variantId },
            data: { stockQuantity: { decrement: item.quantity } },
          });
        }
      }

      // 2. Create Order
      const newOrder = await tx.order.create({
        data: {
          orderNumber,
          userId: session?.userId || null,
          subtotal: calculatedSubtotal,
          discount,
          shippingCost,
          totalAmount,
          couponCode: couponCode ? couponCode.toUpperCase() : null,
          paymentMethod: paymentMethod === "CARD" ? PaymentMethod.CARD : PaymentMethod.COD,
          paymentStatus: paymentMethod === "CARD" ? PaymentStatus.PAID : PaymentStatus.PENDING,
          orderStatus: OrderStatus.CONFIRMED,
          shippingAddress: {
            fullName: `${customer.firstName} ${customer.lastName}`,
            email: customer.email,
            phone: customer.phone,
            address: customer.address,
            city: customer.city,
            postalCode: customer.postalCode || "",
            notes: customer.notes || "",
          },
          items: {
            create: validatedItems.map((vi) => ({
              productId: vi.productId,
              variantId: vi.variantId,
              productName: vi.productName,
              selectedSize: vi.selectedSize,
              selectedColor: vi.selectedColor,
              quantity: vi.quantity,
              unitPrice: vi.unitPrice,
              totalPrice: vi.totalPrice,
            })),
          },
        },
        include: { items: true },
      });

      return newOrder;
    });

    return NextResponse.json({ order }, { status: 201 });
  } catch (error: any) {
    console.error("POST /api/orders error:", error);
    return NextResponse.json(
      { error: "Unable to process order. Please check inventory." },
      { status: 500 }
    );
  }
}
