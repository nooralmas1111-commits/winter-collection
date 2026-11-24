import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hashPassword, signSessionToken, setSessionCookie } from "@/lib/auth";
import { registerSchema } from "@/lib/validations/auth";
import { Role } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = registerSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.format() },
        { status: 400 }
      );
    }

    const { name, email, password, phone } = result.data;

    // Check duplicate email
    const existingUser = await prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email address already exists." },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);

    // Create user and initialize empty cart and wishlist
    const user = await prisma.user.create({
      data: {
        name,
        email: email.toLowerCase(),
        passwordHash,
        phone,
        role: Role.CUSTOMER,
        cart: { create: {} },
        wishlist: { create: {} },
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        createdAt: true,
      },
    });

    // Create session token & cookie
    const token = await signSessionToken({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    await setSessionCookie(token);

    return NextResponse.json(
      { message: "Registration successful", user },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Register Error:", error);
    return NextResponse.json(
      { error: "Unable to complete registration. Please try again later." },
      { status: 500 }
    );
  }
}
