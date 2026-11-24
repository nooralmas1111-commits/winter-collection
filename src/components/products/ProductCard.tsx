"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Eye, ShoppingBag } from "lucide-react";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { formatPrice } from "@/lib/utils";
import Rating from "@/components/ui/Rating";
import QuickViewModal from "./QuickViewModal";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority = false }: ProductCardProps) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || "");
  const [isHovered, setIsHovered] = useState(false);

  const isSaved = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(
      product,
      selectedColor,
      product.sizes[0] || "Standard",
      1
    );
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsQuickViewOpen(true);
  };

  // Image to display
  const primaryImage = product.images[0];
  const secondaryImage = product.images[1] || product.images[0];

  return (
    <>
      <div
        className="group relative flex flex-col bg-[#FFFFFF] border border-[#E6E1D9] transition-all duration-300 hover:border-[#D8C8B3] hover:shadow-[0_8px_30px_rgba(41,45,50,0.06)]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Badges Container */}
        <div className="absolute top-3 left-3 z-20 flex flex-col gap-1 pointer-events-none">
          {product.isSale && (
            <span className="bg-[#292D32] text-[#F7F5F0] text-[10px] uppercase tracking-[0.16em] px-2 py-0.5 font-medium">
              Sale -{product.discountPercent}%
            </span>
          )}
          {product.isNew && (
            <span className="bg-[#D8C8B3] text-[#292D32] text-[10px] uppercase tracking-[0.16em] px-2 py-0.5 font-semibold">
              New Season
            </span>
          )}
          {product.isBestSeller && !product.isSale && (
            <span className="bg-[#EEEAE2] text-[#292D32] text-[10px] uppercase tracking-[0.16em] px-2 py-0.5 font-medium border border-[#E6E1D9]">
              Best Seller
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleToggleWishlist}
          aria-label={isSaved ? "Remove from wishlist" : "Add to wishlist"}
          className={`absolute top-3 right-3 z-20 p-2 rounded-full transition-all duration-200 ${
            isSaved
              ? "bg-[#292D32] text-white shadow-md"
              : "bg-white/80 backdrop-blur-sm text-[#292D32] hover:bg-white hover:scale-110 shadow-sm"
          }`}
        >
          <Heart className={`w-4 h-4 ${isSaved ? "fill-white" : ""}`} />
        </button>

        {/* Product Image Link */}
        <Link
          href={`/product/${product.id}`}
          className="relative aspect-[3/4] w-full overflow-hidden bg-[#EEEAE2] block"
        >
          <Image
            src={isHovered ? secondaryImage : primaryImage}
            alt={product.name}
            fill
            priority={priority}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Quick Action Overlay on Hover */}
          <div className="absolute inset-x-3 bottom-3 hidden sm:flex items-center gap-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-20">
            <button
              onClick={handleQuickAdd}
              className="flex-1 bg-[#292D32]/90 hover:bg-[#292D32] text-[#F7F5F0] py-2.5 text-[11px] uppercase tracking-[0.14em] font-medium backdrop-blur-sm transition-colors flex items-center justify-center gap-1.5 shadow-sm"
            >
              <ShoppingBag className="w-3.5 h-3.5" /> Quick Add
            </button>
            <button
              onClick={handleQuickView}
              aria-label="Quick View"
              className="bg-white/90 hover:bg-white text-[#292D32] p-2.5 backdrop-blur-sm transition-colors shadow-sm"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
          </div>
        </Link>

        {/* Product Meta */}
        <div className="p-4 flex flex-col flex-1 justify-between bg-[#FFFFFF]">
          <div>
            {/* Category label */}
            <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-[#A99B8A] mb-1">
              <span>{product.subcategory}</span>
              <Rating rating={product.rating} showCount={false} size="sm" />
            </div>

            {/* Title */}
            <h3 className="font-sans text-xs sm:text-sm font-medium text-[#292D32] group-hover:text-[#A99B8A] transition-colors line-clamp-1 mb-2">
              <Link href={`/product/${product.id}`}>{product.name}</Link>
            </h3>

            {/* Colors */}
            <div className="flex items-center gap-1.5 mb-3">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedColor(color.name);
                  }}
                  className={`w-3.5 h-3.5 rounded-full border transition-all ${
                    selectedColor === color.name
                      ? "ring-1 ring-[#292D32] ring-offset-1 scale-110"
                      : "opacity-80 hover:opacity-100"
                  }`}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
              <span className="text-[10px] text-[#737D87] ml-1 font-sans">
                {product.colors.length} {product.colors.length === 1 ? "shade" : "shades"}
              </span>
            </div>
          </div>

          {/* Pricing */}
          <div className="flex items-baseline justify-between pt-2 border-t border-[#E6E1D9]/50">
            <div className="flex items-baseline gap-2">
              <span className="text-sm sm:text-base font-semibold text-[#292D32]">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-[#737D87] line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Mobile-only quick add button */}
            <button
              onClick={handleQuickAdd}
              aria-label="Add to bag"
              className="sm:hidden p-1.5 text-[#292D32] hover:text-[#A99B8A]"
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick View Modal instance */}
      <QuickViewModal
        product={product}
        isOpen={isQuickViewOpen}
        onClose={() => setIsQuickViewOpen(false)}
      />
    </>
  );
}
