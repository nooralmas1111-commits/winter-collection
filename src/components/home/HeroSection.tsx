"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass } from "lucide-react";
import { gsap } from "gsap";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Respect prefers-reduced-motion
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(imageRef.current, {
        scale: 1.08,
        opacity: 0.8,
        duration: 1.8,
      })
      .from(
        headlineRef.current,
        {
          y: 40,
          opacity: 0,
          duration: 1.2,
        },
        "-=1.2"
      )
      .from(
        subtextRef.current,
        {
          y: 25,
          opacity: 0,
          duration: 1,
        },
        "-=0.8"
      )
      .from(
        ctaRef.current,
        {
          y: 20,
          opacity: 0,
          duration: 0.8,
        },
        "-=0.6"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center bg-[#EEEAE2] overflow-hidden"
    >
      {/* Background Hero Image */}
      <div ref={imageRef} className="absolute inset-0 w-full h-full">
        <Image
          src="https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=85&w=2000"
          alt="Winter Wrapped in Elegance — Frost and Flair"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Soft Luxury Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#292D32]/80 via-[#292D32]/50 to-transparent lg:w-3/5" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#292D32]/70 via-transparent to-black/20" />
      </div>

      {/* Editorial Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 w-full">
        <div className="max-w-2xl text-white space-y-6">
          {/* Seasonal Label */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-[#D8C8B3] text-[11px] uppercase tracking-[0.24em] font-medium">
            <Compass className="w-3.5 h-3.5" />
            Winter 2026 Campaign
          </div>

          {/* Large Editorial Headline */}
          <h1
            ref={headlineRef}
            className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight text-white leading-[1.08]"
          >
            Winter, Wrapped in Elegance.
          </h1>

          {/* Supporting Text */}
          <p
            ref={subtextRef}
            className="text-sm sm:text-base lg:text-lg text-[#EEEAE2]/90 leading-relaxed font-sans max-w-lg font-light"
          >
            Discover thoughtfully selected layers designed to keep you warm and effortlessly stylish. Crafted in virgin wool, Mongolian cashmere, and alpine goose down.
          </p>

          {/* Action CTAs */}
          <div
            ref={ctaRef}
            className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
          >
            <Link
              href="/shop"
              className="bg-[#F7F5F0] text-[#292D32] hover:bg-[#D8C8B3] px-8 py-4 text-xs uppercase tracking-[0.18em] font-semibold flex items-center justify-center gap-2 transition-all duration-300 shadow-lg"
            >
              Explore the Collection
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/shop?sort=featured"
              className="border border-white/60 text-white hover:bg-white/10 px-8 py-4 text-xs uppercase tracking-[0.18em] font-medium flex items-center justify-center transition-all duration-300 backdrop-blur-xs"
            >
              Discover Winter Essentials
            </Link>
          </div>
        </div>
      </div>

      {/* Editorial Bottom Badge */}
      <div className="absolute bottom-6 right-6 sm:right-10 z-10 hidden md:block text-right text-white/80">
        <p className="font-serif italic text-sm">Alpine Silhouette No. 04</p>
        <p className="text-[10px] uppercase tracking-[0.2em] text-[#D8C8B3]">
          Italian Melton & Goose Down
        </p>
      </div>
    </section>
  );
}
