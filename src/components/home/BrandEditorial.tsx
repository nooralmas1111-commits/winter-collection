import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BRAND_LIFESTYLE_DATA } from "@/data/collections";

export default function BrandEditorial() {
  return (
    <section className="py-20 sm:py-32 bg-[#F7F5F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Brand Copy & Stats (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[11px] uppercase tracking-[0.24em] font-semibold text-[#A99B8A] block">
              {BRAND_LIFESTYLE_DATA.tagline}
            </span>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#292D32] font-normal leading-tight">
              {BRAND_LIFESTYLE_DATA.headline}
            </h2>

            <p className="text-xs sm:text-sm text-[#737D87] leading-relaxed font-light">
              {BRAND_LIFESTYLE_DATA.description}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#E6E1D9]">
              {BRAND_LIFESTYLE_DATA.stats.map((stat) => (
                <div key={stat.label}>
                  <span className="font-serif text-2xl sm:text-3xl font-medium text-[#292D32] block">
                    {stat.value}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-[#737D87] mt-1 block">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="pt-4">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] font-semibold text-[#292D32] hover:text-[#A99B8A] transition-colors"
              >
                Learn About Our Atelier
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* High quality editorial lifestyle photo (7 cols) */}
          <div className="lg:col-span-7 relative aspect-[4/3] bg-[#EEEAE2] overflow-hidden shadow-2xl border border-[#E6E1D9]">
            <Image
              src={BRAND_LIFESTYLE_DATA.image}
              alt="Made for the Moments That Matter — Frost and Flair"
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover transition-transform duration-700 hover:scale-103"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 text-white text-xs font-serif italic">
              Winter Highlands Collection · Hand-finished wool
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
