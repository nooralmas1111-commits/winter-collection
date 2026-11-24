import React from "react";
import ShopCatalog from "@/components/shop/ShopCatalog";
import { getProductsByCategory } from "@/services/productService";

export const metadata = {
  title: "Women's Winter Collection — FROST & FLAIR",
  description: "Sculpted wool coats, down puffers, cloud knit sweaters, and luxury winter wear for women."
};

export default async function WomenPage() {
  const products = await getProductsByCategory("women");

  return (
    <ShopCatalog
      initialProducts={products}
      categoryFilter="women"
      pageTitle="Women's Outerwear & Knitwear"
      pageDescription="Sculpted silhouettes, double-faced Italian wool wraps, cloud alpaca mock-necks, and cocoon puffers designed for modern warmth."
    />
  );
}
