import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { WINTER_SALE_DATA } from "@/data/collections";

export default function WinterSaleBanner() {
  return (
    <section className="relative py-24 sm:py-32 bg-[#292D32] text-[#F7F5F0] overflow-hidden">
      {/* Background with subtle texture */}
      <div className="absolute inset-0 opacity-25">
        <Image
          src={WINTER_SALE_DATA.image}
          alt="Winter Sale Campaign"
          fill
          sizes="100vw"
          className="object-cover object-center filter grayscale"
        />
        <div className="absolute inset-0 bg-[#292D32]/80 mix-blend-multiply" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 text-[#D8C8B3] border border-white/20 text-[10px] uppercase tracking-[0.24em] font-medium">
          <Sparkles className="w-3 h-3" />
          {WINTER_SALE_DATA.badge}
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-white leading-tight">
          {WINTER_SALE_DATA.headline}
        </h2>

        <p className="text-xs sm:text-base text-[#EEEAE2]/80 max-w-xl mx-auto leading-relaxed font-light">
          {WINTER_SALE_DATA.supportingText}
        </p>

        <div className="pt-4">
          <Link
            href="/shop?sale=true"
            className="inline-flex items-center gap-2 bg-[#F7F5F0] text-[#292D32] hover:bg-[#D8C8B3] px-9 py-4 text-xs uppercase tracking-[0.18em] font-semibold transition-all duration-300 shadow-xl"
          >
            {WINTER_SALE_DATA.ctaText}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
