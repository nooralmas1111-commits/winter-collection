import React from "react";
import ShopCatalog from "@/components/shop/ShopCatalog";
import { getProductsByCategory } from "@/services/productService";

export const metadata = {
  title: "Winter Accessories — FROST & FLAIR",
  description: "Australian merino scarves, cashmere beanies, Vibram snow boots, and nappa leather gloves."
};

export default async function AccessoriesPage() {
  const products = await getProductsByCategory("accessories");

  return (
    <ShopCatalog
      initialProducts={products}
      categoryFilter="accessories"
      pageTitle="Winter Accents & Footwear"
      pageDescription="Extra-fine Australian merino scarves, touchscreen lambskin gloves lined in cashmere, and waterproof Arctic boots with Vibram soles."
    />
  );
}
