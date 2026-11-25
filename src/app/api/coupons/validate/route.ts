import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { validateCouponSchema } from "@/lib/validations/coupon";
import { DiscountType } from "@prisma/client";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = validateCouponSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json({ error: "Invalid coupon request" }, { status: 400 });
    }

    const { code, subtotal } = result.data;

    const coupon = await prisma.coupon.findUnique({
      where: { code: code.toUpperCase() },
    });

    if (!coupon) {
      return NextResponse.json(
        { error: "Coupon code not found." },
        { status: 404 }
      );
    }

    if (!coupon.isActive) {
      return NextResponse.json(
        { error: "This coupon is no longer active." },
        { status: 400 }
      );
    }

    if (coupon.expiresAt && coupon.expiresAt < new Date()) {
      return NextResponse.json(
        { error: "This promotional code has expired." },
        { status: 400 }
      );
    }

    if (coupon.minimumOrderAmount && subtotal < Number(coupon.minimumOrderAmount)) {
      return NextResponse.json(
        {
          error: `Minimum order amount for this coupon is Rs. ${Number(
            coupon.minimumOrderAmount
          ).toLocaleString("en-PK")}.`,
        },
        { status: 400 }
      );
    }

    let discount = 0;
    if (coupon.discountType === DiscountType.PERCENTAGE) {
      discount = (subtotal * Number(coupon.discountValue)) / 100;
      if (coupon.maximumDiscount && discount > Number(coupon.maximumDiscount)) {
        discount = Number(coupon.maximumDiscount);
      }
    } else {
      discount = Number(coupon.discountValue);
    }

    return NextResponse.json({
      valid: true,
      code: coupon.code,
      discountType: coupon.discountType,
      discountValue: Number(coupon.discountValue),
      calculatedDiscount: Math.round(discount),
    });
  } catch (error) {
    console.error("POST /api/coupons/validate error:", error);
    return NextResponse.json({ error: "Coupon validation failed" }, { status: 500 });
  }
}
