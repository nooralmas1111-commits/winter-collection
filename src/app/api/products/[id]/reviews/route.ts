import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { createReviewSchema } from "@/lib/validations/coupon";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const reviews = await prisma.review.findMany({
      where: { productId: id },
      include: {
        user: { select: { name: true } },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ reviews });
  } catch {
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await requireAuth();
    const { id } = await params;
    const body = await req.json();

    const result = createReviewSchema.safeParse({ ...body, productId: id });
    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.format() },
        { status: 400 }
      );
    }

    const review = await prisma.review.create({
      data: {
        userId: session.userId,
        productId: id,
        rating: result.data.rating,
        comment: result.data.comment,
      },
    });

    return NextResponse.json({ review }, { status: 201 });
  } catch (error: any) {
    if (error.message === "UNAUTHORIZED") {
      return NextResponse.json(
        { error: "Please sign in to submit a verified product review." },
        { status: 401 }
      );
    }
    return NextResponse.json({ error: "Failed to post review" }, { status: 500 });
  }
}
