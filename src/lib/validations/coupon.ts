import { z } from "zod";

export const validateCouponSchema = z.object({
  code: z.string().min(2, "Coupon code is required"),
  subtotal: z.number().positive("Subtotal must be positive"),
});

export const createReviewSchema = z.object({
  productId: z.string(),
  rating: z.number().int().min(1).max(5),
  comment: z.string().min(5, "Review comment must be at least 5 characters"),
});
