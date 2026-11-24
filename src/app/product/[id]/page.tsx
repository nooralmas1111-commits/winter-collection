import React from "react";
import { notFound } from "next/navigation";
import { getProductById, getRelatedProducts } from "@/services/productService";
import ProductDetailView from "@/components/products/ProductDetailView";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    return {
      title: "Product Not Found — FROST & FLAIR",
    };
  }

  return {
    title: `${product.name} — FROST & FLAIR`,
    description: product.description,
  };
}

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  const related = await getRelatedProducts(product.id, 4);

  return <ProductDetailView product={product} relatedProducts={related} />;
}
