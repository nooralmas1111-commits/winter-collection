import React from "react";
import ShopCatalog from "@/components/shop/ShopCatalog";
import { getProductsByCategory } from "@/services/productService";

export const metadata = {
  title: "Kids Winter Collection — FROST & FLAIR",
  description: "Down-filled winter jackets, sherpa fleeces, and organic ribbed sets for children and toddlers."
};

export default async function KidsPage() {
  const products = await getProductsByCategory("kids");

  return (
    <ShopCatalog
      initialProducts={products}
      categoryFilter="kids"
      pageTitle="Kids Winter Wear"
      pageDescription="Sub-zero snowsuits, cloud-soft sherpa fleeces, and gentle ribbed organic knitwear built for playground snow days and cozy indoor play."
    />
  );
}
