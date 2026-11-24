"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Check, ShoppingBag, Heart, ArrowRight } from "lucide-react";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { formatPrice } from "@/lib/utils";
import Rating from "@/components/ui/Rating";

interface QuickViewModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickViewModal({ product, isOpen, onClose }: QuickViewModalProps) {
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [selectedColor, setSelectedColor] = useState<string>("");
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Initialize defaults on product change
  React.useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]?.name || "");
      setSelectedSize(product.sizes[0] || "");
      setActiveImageIndex(0);
      setQuantity(1);
    }
  }, [product]);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    addToCart(product, selectedColor, selectedSize, quantity);
    onClose();
  };

  const isSaved = isInWishlist(product.id);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#292D32]/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="relative w-full max-w-3xl bg-[#F7F5F0] border border-[#E6E1D9] shadow-2xl p-6 sm:p-8 z-10 animate-in fade-in zoom-in-95 duration-200">
          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 p-2 text-[#737D87] hover:text-[#292D32] transition-colors"
          >
            <X className="w-5 h-5 stroke-[1.5]" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Image section */}
            <div className="space-y-3">
              <div className="relative aspect-[3/4] w-full bg-[#EEEAE2] overflow-hidden border border-[#E6E1D9]">
                <Image
                  src={product.images[activeImageIndex] || product.images[0]}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-cover"
                />
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-2">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-16 h-20 bg-[#EEEAE2] border transition-all ${
                        activeImageIndex === idx ? "border-[#292D32]" : "border-[#E6E1D9] opacity-70"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`${product.name} thumbnail ${idx + 1}`}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Info Section */}
            <div className="flex flex-col justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#A99B8A] block mb-1">
                  {product.category} · {product.subcategory}
                </span>

                <h3 className="font-serif text-2xl text-[#292D32] mb-2">
                  {product.name}
                </h3>

                <div className="mb-4">
                  <Rating rating={product.rating} reviews={product.reviewCount} />
                </div>

                <div className="flex items-baseline gap-3 mb-4">
                  <span className="text-xl font-medium text-[#292D32]">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-[#737D87] line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                  {product.discountPercent && (
                    <span className="text-[11px] font-semibold text-[#C26D53] bg-[#C26D53]/10 px-2 py-0.5">
                      Save {product.discountPercent}%
                    </span>
                  )}
                </div>

                <p className="text-xs text-[#737D87] leading-relaxed mb-6 line-clamp-3">
                  {product.description}
                </p>

                {/* Color Selector */}
                <div className="mb-5">
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-[#292D32] font-medium">Color:</span>
                    <span className="text-[#737D87]">{selectedColor}</span>
                  </div>
                  <div className="flex gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`w-7 h-7 rounded-full border-2 transition-all flex items-center justify-center ${
                          selectedColor === color.name ? "border-[#292D32] scale-110" : "border-transparent"
                        }`}
                        title={color.name}
                      >
                        <span
                          className="w-5 h-5 rounded-full border border-[#292D32]/20"
                          style={{ backgroundColor: color.hex }}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Selector */}
                <div className="mb-6">
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-[#292D32] font-medium">Select Size:</span>
                    <span className="text-[#737D87]">In Stock ({product.stock})</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3 py-1.5 text-xs font-medium border transition-all ${
                          selectedSize === size
                            ? "bg-[#292D32] text-[#F7F5F0] border-[#292D32]"
                            : "bg-[#FFFFFF] text-[#292D32] border-[#E6E1D9] hover:border-[#292D32]"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3 pt-4 border-t border-[#E6E1D9]">
                <div className="flex gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-[#292D32] text-[#F7F5F0] py-3 text-xs uppercase tracking-[0.16em] font-medium flex items-center justify-center gap-2 hover:bg-[#3E4349] transition-all"
                  >
                    <ShoppingBag className="w-4 h-4" /> Add to Bag
                  </button>

                  <button
                    onClick={() => toggleWishlist(product)}
                    aria-label="Save to Wishlist"
                    className={`p-3 border transition-colors ${
                      isSaved
                        ? "bg-[#292D32] text-white border-[#292D32]"
                        : "border-[#E6E1D9] text-[#292D32] hover:border-[#292D32]"
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isSaved ? "fill-white" : ""}`} />
                  </button>
                </div>

                <Link
                  href={`/product/${product.id}`}
                  onClick={onClose}
                  className="w-full text-center text-xs text-[#737D87] hover:text-[#292D32] font-medium flex items-center justify-center gap-1 pt-1"
                >
                  View Full Product Details <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
