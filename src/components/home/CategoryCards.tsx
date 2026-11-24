import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CATEGORIES } from "@/data/categories";

export default function CategoryCards() {
  return (
    <section className="py-20 sm:py-28 bg-[#F7F5F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
          <div>
            <span className="text-[11px] uppercase tracking-[0.24em] font-semibold text-[#A99B8A] block mb-2">
              CURATED WINTER EDITIONS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#292D32]">
              Shop by Category
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#737D87] max-w-md mt-4 md:mt-0 font-light leading-relaxed">
            From sculpted heavy wool overcoats to whisper-soft baby alpaca knits, explore deliberate cold-weather design for every member of the family.
          </p>
        </div>

        {/* 4 Category Editorial Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {CATEGORIES.map((category) => (
            <Link
              key={category.id}
              href={`/${category.slug}`}
              className="group relative flex flex-col bg-[#FFFFFF] border border-[#E6E1D9] overflow-hidden transition-all duration-300 hover:border-[#D8C8B3] hover:shadow-[0_12px_36px_rgba(41,45,50,0.06)]"
            >
              {/* Image Container with zoom */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#EEEAE2]">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />

                {/* Subtitle overlay */}
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#D8C8B3] font-medium block mb-1">
                    {category.subcategories.slice(0, 3).join(" · ")}
                  </span>
                  <h3 className="font-serif text-2xl font-normal tracking-wide">
                    {category.name}
                  </h3>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-5 flex flex-col justify-between flex-1 bg-[#FFFFFF]">
                <p className="text-xs text-[#737D87] line-clamp-2 leading-relaxed mb-4">
                  {category.description}
                </p>

                <div className="flex items-center text-xs uppercase tracking-[0.16em] font-medium text-[#292D32] group-hover:text-[#A99B8A] transition-colors">
                  <span>Explore {category.name}</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
