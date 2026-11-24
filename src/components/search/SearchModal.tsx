"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, X, ArrowRight } from "lucide-react";
import { useSearch } from "@/context/SearchContext";
import { searchProducts } from "@/services/productService";
import { Product } from "@/types/product";
import { formatPrice } from "@/lib/utils";

const POPULAR_SEARCHES = ["Puffer Jacket", "Wool Coat", "Cloud Knit", "Snow Boot", "Cashmere", "Gloves"];

export default function SearchModal() {
  const { isSearchOpen, closeSearch, searchQuery, setSearchQuery } = useSearch();
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setIsLoading(true);
      const res = await searchProducts(searchQuery);
      setResults(res);
      setIsLoading(false);
    }, 200);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#292D32]/60 backdrop-blur-md transition-opacity"
        onClick={closeSearch}
      />

      {/* Modal Dialog */}
      <div className="relative min-h-screen flex items-start justify-center p-4 sm:p-6 lg:p-8 pt-16 sm:pt-24">
        <div className="relative w-full max-w-3xl bg-[#F7F5F0] border border-[#E6E1D9] shadow-2xl p-6 sm:p-8 z-10 animate-in fade-in zoom-in-95 duration-200">
          {/* Close Button */}
          <button
            onClick={closeSearch}
            className="absolute top-6 right-6 p-2 text-[#737D87] hover:text-[#292D32] transition-colors"
            aria-label="Close search"
          >
            <X className="w-5 h-5 stroke-[1.5]" />
          </button>

          {/* Search Header */}
          <div className="mb-6">
            <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-[#A99B8A]">
              Curated Winter Search
            </span>
            <div className="relative mt-2 flex items-center border-b-2 border-[#292D32] pb-2">
              <Search className="w-6 h-6 text-[#737D87] mr-3 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search coats, knitwear, down jackets, boots..."
                className="w-full bg-transparent font-serif text-lg sm:text-2xl text-[#292D32] placeholder-[#737D87]/60 focus:outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-xs uppercase tracking-wider text-[#737D87] hover:text-[#292D32]"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Quick Suggestions when input is empty */}
          {!searchQuery && (
            <div className="py-4">
              <p className="text-xs uppercase tracking-widest text-[#737D87] mb-3 font-medium">
                Trending Searches
              </p>
              <div className="flex flex-wrap gap-2">
                {POPULAR_SEARCHES.map((term) => (
                  <button
                    key={term}
                    onClick={() => setSearchQuery(term)}
                    className="px-3 py-1.5 bg-[#EEEAE2] hover:bg-[#D8C8B3]/50 text-xs text-[#292D32] rounded-none transition-colors border border-[#E6E1D9]"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Loading state */}
          {isLoading && (
            <div className="py-12 text-center text-xs text-[#737D87]">
              Searching winter catalog...
            </div>
          )}

          {/* Search Results */}
          {!isLoading && searchQuery && (
            <div className="mt-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#E6E1D9] text-xs text-[#737D87]">
                <span>{results.length} results found for &ldquo;{searchQuery}&rdquo;</span>
                {results.length > 0 && (
                  <Link
                    href={`/shop?q=${encodeURIComponent(searchQuery)}`}
                    onClick={closeSearch}
                    className="font-semibold text-[#292D32] hover:underline flex items-center gap-1"
                  >
                    View All in Shop <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </div>

              {results.length === 0 ? (
                <div className="py-12 text-center">
                  <p className="font-serif text-lg text-[#292D32] mb-1">
                    No matching winter pieces found
                  </p>
                  <p className="text-xs text-[#737D87] max-w-sm mx-auto">
                    Try checking your spelling or search for general keywords like &ldquo;Wool&rdquo;, &ldquo;Puffer&rdquo;, or &ldquo;Cardigan&rdquo;.
                  </p>
                </div>
              ) : (
                <div className="max-h-96 overflow-y-auto divide-y divide-[#E6E1D9] pr-2 mt-2">
                  {results.slice(0, 6).map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.id}`}
                      onClick={closeSearch}
                      className="flex items-center gap-4 py-3 hover:bg-[#EEEAE2]/60 px-2 transition-colors group"
                    >
                      <div className="relative w-14 h-18 bg-[#EEEAE2] shrink-0 overflow-hidden">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          sizes="60px"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="flex-1">
                        <span className="text-[10px] uppercase tracking-wider text-[#A99B8A] block">
                          {product.category} · {product.subcategory}
                        </span>
                        <h4 className="text-xs sm:text-sm font-medium text-[#292D32] group-hover:text-[#A99B8A] transition-colors">
                          {product.name}
                        </h4>
                        <span className="text-xs font-semibold text-[#292D32] mt-0.5 block">
                          {formatPrice(product.price)}
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#737D87] group-hover:translate-x-1 transition-transform" />
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
