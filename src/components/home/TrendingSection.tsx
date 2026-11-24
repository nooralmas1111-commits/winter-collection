"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/products/ProductCard";
import { Product } from "@/types/product";

interface TrendingSectionProps {
  products: Product[];
}

export default function TrendingSection({ products }: TrendingSectionProps) {
  const trendingList = products.filter((p) => p.isTrending).slice(0, 8);

  return (
    <section className="py-20 sm:py-28 bg-[#F7F5F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16">
          <div>
            <span className="text-[11px] uppercase tracking-[0.24em] font-semibold text-[#A99B8A] block mb-2">
              SEASON HIGHLIGHTS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#292D32]">
              Trending This Winter
            </h2>
            <p className="text-xs sm:text-sm text-[#737D87] mt-2 font-light">
              Pieces everyone is reaching for this season.
            </p>
          </div>

          <Link
            href="/shop?sort=featured"
            className="mt-4 sm:mt-0 inline-flex items-center text-xs uppercase tracking-[0.16em] font-semibold text-[#292D32] hover:text-[#A99B8A] transition-colors"
          >
            <span>View All Pieces</span>
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Link>
        </div>

        {/* 4 to 8 Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {trendingList.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
