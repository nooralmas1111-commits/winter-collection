"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Heart,
  ShoppingBag,
  Ruler,
  Truck,
  ShieldCheck,
  RotateCcw,
  Plus,
  Minus,
  Sparkles,
  X,
  Share2
} from "lucide-react";
import { Product } from "@/types/product";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { formatPrice } from "@/lib/utils";
import Rating from "@/components/ui/Rating";
import ProductCard from "@/components/products/ProductCard";
import { toast } from "sonner";

interface ProductDetailViewProps {
  product: Product;
  relatedProducts: Product[];
}

export default function ProductDetailView({
  product,
  relatedProducts,
}: ProductDetailViewProps) {
  const router = useRouter();
  const { addToCart, openCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || "");
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || "");
  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"details" | "materials" | "shipping">("details");

  const isSaved = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size before adding to your bag.");
      return;
    }
    addToCart(product, selectedColor, selectedSize, quantity);
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      toast.error("Please select a size first.");
      return;
    }
    addToCart(product, selectedColor, selectedSize, quantity);
    router.push("/checkout");
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard?.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  return (
    <div className="bg-[#F7F5F0] py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-xs text-[#737D87] mb-8">
          <Link href="/" className="hover:text-[#292D32] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href={`/${product.category}`} className="capitalize hover:text-[#292D32] transition-colors">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-[#292D32] font-medium truncate max-w-xs">
            {product.name}
          </span>
        </nav>

        {/* Main Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Gallery Column (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary Large Image */}
            <div className="relative aspect-[3/4] w-full bg-[#EEEAE2] border border-[#E6E1D9] overflow-hidden shadow-xs">
              <Image
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover transition-all duration-500"
              />
            </div>

            {/* Thumbnail Gallery */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative aspect-[3/4] bg-[#EEEAE2] border transition-all ${
                      activeImageIndex === idx
                        ? "border-[#292D32] ring-1 ring-[#292D32]"
                        : "border-[#E6E1D9] opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} detail view ${idx + 1}`}
                      fill
                      sizes="120px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Purchasing Column (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div>
              {/* Category & Tags */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] uppercase tracking-[0.24em] font-semibold text-[#A99B8A]">
                  {product.category} · {product.subcategory}
                </span>
                <button
                  onClick={handleShare}
                  aria-label="Share product"
                  className="p-1 text-[#737D87] hover:text-[#292D32] transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              {/* Title */}
              <h1 className="font-serif text-3xl sm:text-4xl text-[#292D32] font-normal leading-tight mb-3">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="mb-5 flex items-center gap-3">
                <Rating rating={product.rating} reviews={product.reviewCount} />
                <span className="text-xs text-[#737D87]">|</span>
                <span className="text-xs text-[#3E6B48] font-medium flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> 100% Authentic Atelier Piece
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 pb-6 border-b border-[#E6E1D9]">
                <span className="font-serif text-2xl sm:text-3xl font-medium text-[#292D32]">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-base text-[#737D87] line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                {product.discountPercent && (
                  <span className="text-xs font-semibold text-[#C26D53] bg-[#C26D53]/10 px-2 py-0.5">
                    Save {product.discountPercent}%
                  </span>
                )}
              </div>

              {/* Short Description */}
              <p className="text-xs sm:text-sm text-[#737D87] leading-relaxed my-6 font-light">
                {product.description}
              </p>

              {/* Color Selector */}
              <div className="mb-6">
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-[#292D32] font-medium uppercase tracking-wider">
                    Color: <strong className="font-semibold">{selectedColor}</strong>
                  </span>
                </div>
                <div className="flex gap-2.5">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-8 h-8 rounded-full border-2 transition-all flex items-center justify-center ${
                        selectedColor === color.name
                          ? "border-[#292D32] scale-110 shadow-xs"
                          : "border-transparent"
                      }`}
                      title={color.name}
                    >
                      <span
                        className="w-6 h-6 rounded-full border border-black/15"
                        style={{ backgroundColor: color.hex }}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector & Size Guide */}
              <div className="mb-6">
                <div className="flex justify-between items-center text-xs mb-2">
                  <span className="text-[#292D32] font-medium uppercase tracking-wider">
                    Size: <strong className="font-semibold">{selectedSize}</strong>
                  </span>
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-[#737D87] hover:text-[#292D32] inline-flex items-center gap-1 underline text-[11px]"
                  >
                    <Ruler className="w-3.5 h-3.5" /> Size Guide
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 text-xs font-medium border transition-all ${
                        selectedSize === size
                          ? "bg-[#292D32] text-[#F7F5F0] border-[#292D32]"
                          : "bg-white text-[#292D32] border-[#E6E1D9] hover:border-[#292D32]"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Selector & Stock Info */}
              <div className="flex items-center gap-6 mb-8">
                <div className="flex items-center border border-[#E6E1D9] bg-white">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-2 text-[#292D32] hover:bg-[#EEEAE2] transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-4 text-xs font-semibold text-[#292D32]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    className="px-3 py-2 text-[#292D32] hover:bg-[#EEEAE2] transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <span className="text-xs text-[#3E6B48] font-medium">
                  In Stock ({product.stock} pieces remaining)
                </span>
              </div>

              {/* Action Buttons: Add to Bag, Buy Now, Wishlist */}
              <div className="space-y-3">
                <div className="flex gap-3">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-[#292D32] text-[#F7F5F0] hover:bg-[#3E4349] py-4 text-xs uppercase tracking-[0.18em] font-medium flex items-center justify-center gap-2 transition-all shadow-sm"
                  >
                    <ShoppingBag className="w-4 h-4" /> Add to Bag
                  </button>

                  <button
                    onClick={() => toggleWishlist(product)}
                    aria-label="Save to Wishlist"
                    className={`p-4 border transition-colors ${
                      isSaved
                        ? "bg-[#292D32] text-white border-[#292D32]"
                        : "bg-white border-[#E6E1D9] text-[#292D32] hover:border-[#292D32]"
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${isSaved ? "fill-white" : ""}`} />
                  </button>
                </div>

                <button
                  onClick={handleBuyNow}
                  className="w-full bg-[#D8C8B3] hover:bg-[#C8B8A3] text-[#292D32] py-3.5 text-xs uppercase tracking-[0.18em] font-semibold transition-all shadow-sm"
                >
                  Buy Now with Express Delivery
                </button>
              </div>

              {/* Highlights List */}
              <div className="pt-8 border-t border-[#E6E1D9] space-y-3 text-xs text-[#737D87]">
                <div className="flex items-center gap-2.5">
                  <Truck className="w-4 h-4 text-[#A99B8A]" />
                  <span>Complimentary express delivery on orders over Rs. 5,000</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <RotateCcw className="w-4 h-4 text-[#A99B8A]" />
                  <span>14-day hassle-free winter exchanges & returns</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-[#A99B8A]" />
                  <span>Certified traceable natural fibres and RDS down</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabbed Product Details: Specifications, Materials, Care, Shipping */}
        <div className="mt-20 border-t border-[#E6E1D9] pt-12">
          <div className="flex border-b border-[#E6E1D9] mb-8 space-x-8 text-xs uppercase tracking-[0.16em] font-medium">
            <button
              onClick={() => setActiveTab("details")}
              className={`pb-4 border-b-2 transition-all ${
                activeTab === "details"
                  ? "border-[#292D32] text-[#292D32] font-semibold"
                  : "border-transparent text-[#737D87] hover:text-[#292D32]"
              }`}
            >
              Tailoring & Specifications
            </button>
            <button
              onClick={() => setActiveTab("materials")}
              className={`pb-4 border-b-2 transition-all ${
                activeTab === "materials"
                  ? "border-[#292D32] text-[#292D32] font-semibold"
                  : "border-transparent text-[#737D87] hover:text-[#292D32]"
              }`}
            >
              Materials & Garment Care
            </button>
            <button
              onClick={() => setActiveTab("shipping")}
              className={`pb-4 border-b-2 transition-all ${
                activeTab === "shipping"
                  ? "border-[#292D32] text-[#292D32] font-semibold"
                  : "border-transparent text-[#737D87] hover:text-[#292D32]"
              }`}
            >
              Shipping & Concierge
            </button>
          </div>

          <div className="max-w-3xl text-xs sm:text-sm text-[#737D87] leading-relaxed">
            {activeTab === "details" && (
              <div className="space-y-4">
                <p>{product.description}</p>
                <ul className="list-disc pl-5 space-y-1.5 text-[#292D32]">
                  {product.details.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === "materials" && (
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-[#292D32] uppercase tracking-wider text-xs mb-1">
                    Composition
                  </h4>
                  <p>{product.materials}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-[#292D32] uppercase tracking-wider text-xs mb-1">
                    Care Instructions
                  </h4>
                  <p>{product.care}</p>
                </div>
              </div>
            )}

            {activeTab === "shipping" && (
              <div className="space-y-3">
                <p>
                  All orders are dispatched from our central atelier in Islamabad. Deliveries within Islamabad, Rawalpindi, and Lahore arrive within 48–72 hours. All other national destinations arrive within 3–4 business days.
                </p>
                <p>
                  Orders over Rs. 5,000 enjoy complimentary insured shipping. Cash on Delivery (COD) and major card options are available at checkout.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products Carousel / Grid */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 border-t border-[#E6E1D9] pt-16">
            <div className="text-center mb-12">
              <span className="text-[11px] uppercase tracking-[0.24em] font-semibold text-[#A99B8A] block mb-2">
                COMPLETE YOUR WINTER WARDROBE
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#292D32]">
                Pairs Beautifully With
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Size Guide Modal */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div
            className="fixed inset-0 bg-[#292D32]/60 backdrop-blur-sm"
            onClick={() => setIsSizeGuideOpen(false)}
          />
          <div className="relative min-h-screen flex items-center justify-center p-4">
            <div className="relative w-full max-w-lg bg-[#FFFFFF] border border-[#E6E1D9] p-6 sm:p-8 shadow-2xl z-10">
              <button
                onClick={() => setIsSizeGuideOpen(false)}
                className="absolute top-4 right-4 p-1 text-[#737D87] hover:text-[#292D32]"
              >
                <X className="w-5 h-5 stroke-[1.5]" />
              </button>

              <div className="mb-4">
                <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#A99B8A]">
                  FROST & FLAIR ATELIER
                </span>
                <h3 className="font-serif text-2xl text-[#292D32]">
                  Winter Outerwear Sizing Chart
                </h3>
                <p className="text-xs text-[#737D87] mt-1">
                  All measurements are listed in inches (standard body measurement). Designed to accommodate layered knitwear underneath.
                </p>
              </div>

              <div className="overflow-x-auto my-6">
                <table className="w-full text-xs text-left">
                  <thead>
                    <tr className="border-b border-[#292D32] text-[#292D32] uppercase tracking-wider">
                      <th className="py-2">Size</th>
                      <th className="py-2">Bust / Chest</th>
                      <th className="py-2">Waist</th>
                      <th className="py-2">Length</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E6E1D9] text-[#737D87]">
                    <tr>
                      <td className="py-2 font-semibold text-[#292D32]">XS</td>
                      <td className="py-2">32 - 34&quot;</td>
                      <td className="py-2">25 - 26&quot;</td>
                      <td className="py-2">38&quot;</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-semibold text-[#292D32]">S</td>
                      <td className="py-2">35 - 37&quot;</td>
                      <td className="py-2">27 - 28&quot;</td>
                      <td className="py-2">39&quot;</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-semibold text-[#292D32]">M</td>
                      <td className="py-2">38 - 40&quot;</td>
                      <td className="py-2">29 - 31&quot;</td>
                      <td className="py-2">40&quot;</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-semibold text-[#292D32]">L</td>
                      <td className="py-2">41 - 43&quot;</td>
                      <td className="py-2">32 - 34&quot;</td>
                      <td className="py-2">41&quot;</td>
                    </tr>
                    <tr>
                      <td className="py-2 font-semibold text-[#292D32]">XL</td>
                      <td className="py-2">44 - 46&quot;</td>
                      <td className="py-2">35 - 37&quot;</td>
                      <td className="py-2">42&quot;</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <button
                onClick={() => setIsSizeGuideOpen(false)}
                className="w-full bg-[#292D32] text-[#F7F5F0] py-3 text-xs uppercase tracking-widest font-medium"
              >
                Close Size Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
