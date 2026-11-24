"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import Link from "next/link";

const ANNOUNCEMENTS = [
  { text: "THE WINTER EDIT — UP TO 50% OFF SELECTED STYLES", link: "/shop?sale=true" },
  { text: "COMPLIMENTARY SHIPPING ON ORDERS ABOVE RS. 5,000", link: "/shop" },
  { text: "DISCOVER THE NEW WINTER COLLECTION 2026", link: "/shop?sort=newest" },
  { text: "LIMITED EDITION ALPACA & CASHMERE ESSENTIALS", link: "/women" },
];

export default function AnnouncementBar() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + ANNOUNCEMENTS.length) % ANNOUNCEMENTS.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
  };

  const current = ANNOUNCEMENTS[currentIndex];

  return (
    <div className="bg-[#292D32] text-[#F7F5F0] py-2 px-4 text-[11px] sm:text-xs tracking-[0.16em] uppercase font-medium relative z-50 border-b border-[#292D32]/20">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <button
          onClick={handlePrev}
          aria-label="Previous announcement"
          className="text-[#D8C8B3] hover:text-white transition-colors p-1 opacity-70 hover:opacity-100"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        <div className="flex-1 text-center truncate px-4 flex items-center justify-center gap-2">
          <Sparkles className="w-3 h-3 text-[#D8C8B3] shrink-0 hidden sm:inline" />
          <Link
            href={current.link}
            className="hover:underline transition-all duration-300 font-sans tracking-widest text-[#F7F5F0]"
          >
            {current.text}
          </Link>
        </div>

        <button
          onClick={handleNext}
          aria-label="Next announcement"
          className="text-[#D8C8B3] hover:text-white transition-colors p-1 opacity-70 hover:opacity-100"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
