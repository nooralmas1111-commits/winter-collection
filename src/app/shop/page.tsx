import React from "react";
import ShopCatalog from "@/components/shop/ShopCatalog";
import { getProducts } from "@/services/productService";

export const metadata = {
  title: "All Winter Collections — FROST & FLAIR",
  description: "Browse our complete winter catalogue: coats, down puffers, cashmere knitwear, and accessories."
};

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <ShopCatalog
      initialProducts={products}
      pageTitle="The Winter Archive"
      pageDescription="A comprehensive exhibition of winter layers engineered from Scottish wool, Mongolian cashmere, and alpine goose down."
    />
  );
}
