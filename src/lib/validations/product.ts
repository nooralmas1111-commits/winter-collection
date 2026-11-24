import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(3, "Product name must be at least 3 characters"),
  slug: z.string().min(3),
  categoryId: z.string().min(1, "Category is required"),
  price: z.number().positive("Price must be positive"),
  compareAtPrice: z.number().positive().optional(),
  description: z.string().min(10, "Description must be at least 10 characters"),
  shortDescription: z.string().optional(),
  sku: z.string().optional(),
  featured: z.boolean().default(false),
  bestSeller: z.boolean().default(false),
  newArrival: z.boolean().default(false),
  images: z.array(z.string().url()).min(1, "At least one image is required"),
  variants: z
    .array(
      z.object({
        size: z.string(),
        color: z.string(),
        colorCode: z.string(),
        stockQuantity: z.number().int().nonnegative(),
        sku: z.string().optional(),
      })
    )
    .min(1, "At least one product variant is required"),
});

export const updateProductSchema = createProductSchema.partial();
