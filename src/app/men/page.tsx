import React from "react";
import ShopCatalog from "@/components/shop/ShopCatalog";
import { getProductsByCategory } from "@/services/productService";

export const metadata = {
  title: "Men's Winter Collection — FROST & FLAIR",
  description: "Structural outerwear, Primaloft bombers, Italian wool overcoats, and Shetland knits for men."
};

export default async function MenPage() {
  const products = await getProductsByCategory("men");

  return (
    <ShopCatalog
      initialProducts={products}
      categoryFilter="men"
      pageTitle="Men's Tailoring & Outerwear"
      pageDescription="Primaloft-insulated bombers with shearling collars, pure wool-cashmere tailored overcoats, and rugged heavyweight cable pullovers."
    />
  );
}
