"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ShoppingBag, Check } from "lucide-react";
import { SHOP_THE_LOOKS } from "@/data/collections";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { getProductById } from "@/services/productService";
import { toast } from "sonner";

export default function ShopTheLookSection() {
  const [activeLookIndex, setActiveLookIndex] = useState(0);
  const { addToCart, openCart } = useCart();
  const currentLook = SHOP_THE_LOOKS[activeLookIndex];

  const handleAddLookToBag = async () => {
    toast.loading("Adding complete ensemble to your bag...");
    for (const item of currentLook.products) {
      const fullProduct = await getProductById(item.id);
      if (fullProduct) {
        addToCart(
          fullProduct,
          fullProduct.colors[0]?.name || "Standard",
          fullProduct.sizes[0] || "Standard",
          1
        );
      }
    }
    toast.dismiss();
    toast.success(`Ensemble "${currentLook.title}" added to your bag!`);
    openCart();
  };

  return (
    <section className="py-20 sm:py-28 bg-[#F7F5F0] border-t border-[#E6E1D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-[11px] uppercase tracking-[0.24em] font-semibold text-[#A99B8A] block mb-2">
            CURATED OUTFIT HARMONY
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#292D32]">
            Shop the Look
          </h2>
          <p className="text-xs sm:text-sm text-[#737D87] mt-3 font-light">
            Take the guesswork out of cold-weather dressing with coordinated outfits selected by our atelier stylists.
          </p>

          {/* Look Selector Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-6">
            {SHOP_THE_LOOKS.map((look, idx) => (
              <button
                key={look.id}
                onClick={() => setActiveLookIndex(idx)}
                className={`px-4 sm:px-6 py-2.5 text-xs uppercase tracking-[0.16em] font-medium transition-all ${
                  activeLookIndex === idx
                    ? "bg-[#292D32] text-[#F7F5F0] shadow-sm"
                    : "bg-[#FFFFFF] text-[#737D87] border border-[#E6E1D9] hover:border-[#292D32] hover:text-[#292D32]"
                }`}
              >
                {look.title}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Look Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-[#FFFFFF] border border-[#E6E1D9] p-6 sm:p-10 shadow-sm">
          {/* Large Editorial Photograph (7 cols) */}
          <div className="lg:col-span-7 relative aspect-[4/5] sm:aspect-[16/11] bg-[#EEEAE2] overflow-hidden">
            <Image
              src={currentLook.editorialImage}
              alt={currentLook.title}
              fill
              sizes="(max-width: 1024px) 100vw, 60vw"
              className="object-cover transition-transform duration-700 hover:scale-103"
            />
            <div className="absolute top-4 left-4 bg-[#292D32]/80 backdrop-blur-sm text-white px-3 py-1 text-[11px] font-serif italic">
              Look 0{activeLookIndex + 1}
            </div>
          </div>

          {/* Outfit breakdown and CTA (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-6">
            <div>
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#A99B8A] block">
                {currentLook.tagline}
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#292D32] mt-1 mb-3">
                {currentLook.title}
              </h3>
              <p className="text-xs sm:text-sm text-[#737D87] leading-relaxed mb-6 font-light">
                {currentLook.description}
              </p>

              {/* Items included in outfit */}
              <div className="space-y-3 border-t border-[#E6E1D9] pt-4">
                <span className="text-[11px] uppercase tracking-wider text-[#737D87] font-medium block">
                  Pieces in this look:
                </span>
                {currentLook.products.map((item) => (
                  <Link
                    key={item.id}
                    href={`/product/${item.id}`}
                    className="flex items-center gap-3 p-2 bg-[#F7F5F0] hover:bg-[#EEEAE2] transition-colors border border-[#E6E1D9]/60 group"
                  >
                    <div className="relative w-12 h-14 bg-[#EEEAE2] shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xs font-medium text-[#292D32] group-hover:text-[#A99B8A] transition-colors">
                        {item.name}
                      </h4>
                      <span className="text-xs font-semibold text-[#292D32] block">
                        {formatPrice(item.price)}
                      </span>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-[#737D87] group-hover:translate-x-1 transition-transform" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Total price and Add Look button */}
            <div className="pt-4 border-t border-[#E6E1D9]">
              <div className="flex items-baseline justify-between mb-4">
                <span className="text-xs uppercase tracking-wider text-[#737D87]">
                  Total Ensemble Price
                </span>
                <span className="font-serif text-xl font-medium text-[#292D32]">
                  {formatPrice(currentLook.totalPrice)}
                </span>
              </div>

              <button
                onClick={handleAddLookToBag}
                className="w-full bg-[#292D32] text-[#F7F5F0] hover:bg-[#3E4349] py-3.5 px-6 text-xs uppercase tracking-[0.18em] font-semibold flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <ShoppingBag className="w-4 h-4" />
                Shop This Complete Look
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
