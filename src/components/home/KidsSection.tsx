import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import ProductCard from "@/components/products/ProductCard";
import { Product } from "@/types/product";

interface KidsSectionProps {
  products: Product[];
}

export default function KidsSection({ products }: KidsSectionProps) {
  const kidsProducts = products.filter((p) => p.category === "kids").slice(0, 4);

  return (
    <section className="py-20 sm:py-28 bg-[#EEEAE2]/40 border-b border-[#E6E1D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.24em] font-semibold text-[#A99B8A] mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#D8C8B3]" />
              WARMTH FOR LITTLE EXPLORERS
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#292D32]">
              Kids Winter Collection
            </h2>
            <p className="text-xs sm:text-sm text-[#737D87] mt-2 font-light max-w-lg">
              Cloud-soft sherpa zip-ups, snowproof down puffers, and organic thermal sets engineered with gentle seams for childhood adventures.
            </p>
          </div>

          <Link
            href="/kids"
            className="mt-4 md:mt-0 inline-flex items-center text-xs uppercase tracking-[0.16em] font-semibold text-[#292D32] hover:text-[#A99B8A] transition-colors"
          >
            <span>Explore All Kids Styles</span>
            <ArrowRight className="w-4 h-4 ml-1.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {kidsProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
