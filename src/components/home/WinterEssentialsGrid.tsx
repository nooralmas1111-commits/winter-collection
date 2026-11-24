import React from "react";
import Image from "next/image";
import Link from "next/link";
import { WINTER_ESSENTIAL_TAGS } from "@/data/categories";

export default function WinterEssentialsGrid() {
  return (
    <section className="py-20 sm:py-28 bg-[#F7F5F0] border-b border-[#E6E1D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[11px] uppercase tracking-[0.24em] font-semibold text-[#A99B8A] block mb-2">
            DAILY WARDROBE ANCHORS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#292D32]">
            Winter Essentials
          </h2>
          <p className="text-xs sm:text-sm text-[#737D87] mt-3 font-light">
            Every garment meticulously crafted to provide warmth, longevity, and timeless versatility throughout the season.
          </p>
        </div>

        {/* Categories Grid (Jackets, Coats, Knitwear, Hoodies, Scarves, Gloves, Boots) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-4">
          {WINTER_ESSENTIAL_TAGS.map((item) => (
            <Link
              key={item.name}
              href={`/shop?subcategory=${encodeURIComponent(item.name)}`}
              className="group flex flex-col items-center bg-[#FFFFFF] border border-[#E6E1D9] p-3 text-center transition-all duration-300 hover:border-[#292D32] hover:shadow-md"
            >
              <div className="relative w-full aspect-square bg-[#EEEAE2] overflow-hidden mb-3">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 50vw, 150px"
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <h3 className="font-serif text-sm font-medium text-[#292D32] group-hover:text-[#A99B8A] transition-colors">
                {item.name}
              </h3>
              <span className="text-[10px] text-[#737D87] mt-0.5 font-sans">
                {item.count} items
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
