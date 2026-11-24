import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EDITORIAL_LAYER_DATA } from "@/data/collections";

export default function EditorialBanner() {
  return (
    <section className="py-20 sm:py-28 bg-[#EEEAE2] overflow-hidden border-y border-[#E6E1D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Asymmetrical Images (7 cols) */}
          <div className="lg:col-span-7 relative">
            <div className="grid grid-cols-12 gap-4 items-center">
              {/* Primary Large Image */}
              <div className="col-span-8 relative aspect-[4/5] bg-[#F7F5F0] overflow-hidden shadow-xl border border-[#E6E1D9]">
                <Image
                  src={EDITORIAL_LAYER_DATA.image}
                  alt="The Art of Layering — Frost and Flair"
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>

              {/* Offset Secondary Image */}
              <div className="col-span-4 relative aspect-[3/4] bg-[#F7F5F0] overflow-hidden shadow-lg border border-[#E6E1D9] -mt-12 sm:-mt-20">
                <Image
                  src={EDITORIAL_LAYER_DATA.secondaryImage}
                  alt="Layering detail"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/10" />
              </div>
            </div>

            {/* Small Floating Label */}
            <div className="absolute -bottom-6 left-6 bg-[#292D32] text-[#F7F5F0] p-4 text-xs font-serif italic shadow-lg hidden sm:block">
              Volume & Texture · No. 02
            </div>
          </div>

          {/* Editorial Content (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[11px] uppercase tracking-[0.24em] font-semibold text-[#A99B8A] block">
              {EDITORIAL_LAYER_DATA.tagline}
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#292D32] font-normal leading-tight">
              {EDITORIAL_LAYER_DATA.heading}
            </h2>

            <blockquote className="font-serif italic text-base sm:text-lg text-[#292D32] border-l-2 border-[#D8C8B3] pl-4 py-1 leading-snug">
              {EDITORIAL_LAYER_DATA.quote}
            </blockquote>

            <p className="text-xs sm:text-sm text-[#737D87] leading-relaxed font-light">
              {EDITORIAL_LAYER_DATA.description}
            </p>

            <div className="pt-2">
              <Link
                href="/shop?sort=featured"
                className="inline-flex items-center gap-2 bg-[#292D32] text-[#F7F5F0] hover:bg-[#3E4349] px-7 py-3.5 text-xs uppercase tracking-[0.18em] font-medium transition-all shadow-sm"
              >
                {EDITORIAL_LAYER_DATA.ctaText}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
