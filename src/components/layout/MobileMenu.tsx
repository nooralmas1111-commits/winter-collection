"use client";

import React, { useState } from "react";
import Link from "next/link";
import { X, ChevronDown, Heart, ShoppingBag, ArrowRight } from "lucide-react";
import { CATEGORIES } from "@/data/categories";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const { wishlistCount } = useWishlist();
  const { totalCount } = useCart();

  if (!isOpen) return null;

  const toggleCategory = (slug: string) => {
    setExpandedCategory((prev) => (prev === slug ? null : slug));
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#292D32]/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 left-0 w-full max-w-xs sm:max-w-sm bg-[#F7F5F0] shadow-2xl flex flex-col z-50 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#E6E1D9]">
          <Link href="/" onClick={onClose} className="font-serif text-xl tracking-[0.16em] uppercase text-[#292D32]">
            FROST & FLAIR
          </Link>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="p-1.5 text-[#292D32] hover:text-[#A99B8A] transition-colors"
          >
            <X className="w-5 h-5 stroke-[1.5]" />
          </button>
        </div>

        {/* Navigation Content */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          <div className="space-y-4">
            <Link
              href="/"
              onClick={onClose}
              className="block text-sm uppercase tracking-[0.15em] font-medium text-[#292D32] hover:text-[#A99B8A]"
            >
              Home
            </Link>

            <Link
              href="/shop"
              onClick={onClose}
              className="block text-sm uppercase tracking-[0.15em] font-medium text-[#292D32] hover:text-[#A99B8A]"
            >
              All Products
            </Link>

            {CATEGORIES.map((cat) => {
              const isExpanded = expandedCategory === cat.slug;
              return (
                <div key={cat.id} className="border-b border-[#E6E1D9]/60 pb-3">
                  <div className="flex items-center justify-between">
                    <Link
                      href={`/${cat.slug}`}
                      onClick={onClose}
                      className="text-sm uppercase tracking-[0.15em] font-medium text-[#292D32] hover:text-[#A99B8A]"
                    >
                      {cat.name}
                    </Link>
                    <button
                      onClick={() => toggleCategory(cat.slug)}
                      aria-label={`Toggle ${cat.name} categories`}
                      className="p-1 text-[#737D87]"
                    >
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="mt-3 pl-3 space-y-2 border-l border-[#D8C8B3]">
                      {cat.subcategories.map((sub) => (
                        <Link
                          key={sub}
                          href={`/${cat.slug}?subcategory=${encodeURIComponent(sub)}`}
                          onClick={onClose}
                          className="block text-xs text-[#737D87] hover:text-[#292D32] py-0.5"
                        >
                          {sub}
                        </Link>
                      ))}
                      <Link
                        href={`/${cat.slug}`}
                        onClick={onClose}
                        className="block text-xs font-semibold text-[#292D32] pt-1"
                      >
                        Explore All {cat.name} &rarr;
                      </Link>
                    </div>
                  )}
                </div>
              );
            })}

            <Link
              href="/shop?sale=true"
              onClick={onClose}
              className="block text-sm uppercase tracking-[0.15em] font-semibold text-[#C26D53] hover:text-[#9B4E38]"
            >
              Winter Sale (Up to 50% Off)
            </Link>
          </div>

          {/* Quick Links */}
          <div className="pt-6 border-t border-[#E6E1D9] space-y-3">
            <Link
              href="/wishlist"
              onClick={onClose}
              className="flex items-center justify-between text-xs uppercase tracking-wider text-[#292D32] hover:text-[#A99B8A]"
            >
              <span className="flex items-center gap-2">
                <Heart className="w-4 h-4" /> Wishlist
              </span>
              <span className="font-semibold">{wishlistCount}</span>
            </Link>

            <Link
              href="/cart"
              onClick={onClose}
              className="flex items-center justify-between text-xs uppercase tracking-wider text-[#292D32] hover:text-[#A99B8A]"
            >
              <span className="flex items-center gap-2">
                <ShoppingBag className="w-4 h-4" /> Shopping Bag
              </span>
              <span className="font-semibold">{totalCount}</span>
            </Link>
          </div>
        </div>

        {/* Footer in Drawer */}
        <div className="p-6 bg-[#EEEAE2] border-t border-[#E6E1D9] text-xs text-[#737D87]">
          <p className="font-serif italic text-sm text-[#292D32] mb-1">
            Winter, Wrapped in Elegance.
          </p>
          <p className="text-[11px]">Free delivery on orders above Rs. 5,000</p>
        </div>
      </div>
    </div>
  );
}
