import { z } from "zod";

export const createOrderSchema = z.object({
  items: z
    .array(
      z.object({
        productId: z.string(),
        variantId: z.string().optional(),
        productName: z.string(),
        selectedSize: z.string(),
        selectedColor: z.string(),
        quantity: z.number().int().positive(),
        unitPrice: z.number().positive(),
      })
    )
    .min(1, "Order must contain at least one item"),
  customer: z.object({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(7),
    address: z.string().min(5),
    city: z.string().min(2),
    postalCode: z.string().optional(),
    notes: z.string().optional(),
  }),
  paymentMethod: z.enum(["COD", "CARD"]),
  couponCode: z.string().optional(),
});

export const updateOrderStatusSchema = z.object({
  status: z.enum([
    "PENDING",
    "CONFIRMED",
    "PROCESSING",
    "SHIPPED",
    "DELIVERED",
    "CANCELLED",
  ]),
});
