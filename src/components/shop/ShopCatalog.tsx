"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Filter, X, ChevronDown, Check, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { Product, CategoryType } from "@/types/product";
import ProductCard from "@/components/products/ProductCard";
import { formatPrice } from "@/lib/utils";

interface ShopCatalogProps {
  initialProducts: Product[];
  categoryFilter?: CategoryType;
  pageTitle?: string;
  pageDescription?: string;
}

const ALL_SIZES = ["XS", "S", "M", "L", "XL", "2-3Y", "4-5Y", "6-7Y", "8-9Y", "One Size"];

const COLOR_SWATCHES = [
  { name: "Warm Ivory", hex: "#F7F5F0" },
  { name: "Deep Charcoal", hex: "#292D32" },
  { name: "Champagne Beige", hex: "#D8C8B3" },
  { name: "Muted Taupe", hex: "#A99B8A" },
  { name: "Slate Grey", hex: "#737D87" },
  { name: "Camel", hex: "#C2A382" }
];

export default function ShopCatalog({
  initialProducts,
  categoryFilter,
  pageTitle = "All Winter Products",
  pageDescription = "Explore our complete editorial collection of premium cold-weather outerwear, knitwear, and accessories."
}: ShopCatalogProps) {
  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryFilter || "all");
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(55000);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [onSaleOnly, setOnSaleOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>("featured");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  // Available subcategories based on current products or category
  const availableSubcategories = useMemo(() => {
    const subs = new Set<string>();
    initialProducts.forEach((p) => {
      if (selectedCategory === "all" || p.category === selectedCategory) {
        subs.add(p.subcategory);
      }
    });
    return Array.from(subs);
  }, [initialProducts, selectedCategory]);

  // Toggle helpers
  const toggleSubcategory = (sub: string) => {
    setSelectedSubcategories((prev) =>
      prev.includes(sub) ? prev.filter((s) => s !== sub) : [...prev, sub]
    );
  };

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const toggleColor = (colorName: string) => {
    setSelectedColors((prev) =>
      prev.includes(colorName) ? prev.filter((c) => c !== colorName) : [...prev, colorName]
    );
  };

  const clearAllFilters = () => {
    if (!categoryFilter) {
      setSelectedCategory("all");
    }
    setSelectedSubcategories([]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setMaxPrice(55000);
    setInStockOnly(false);
    setOnSaleOnly(false);
    setSortBy("featured");
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      // Category filter
      if (selectedCategory !== "all" && product.category !== selectedCategory) {
        return false;
      }

      // Subcategory filter
      if (
        selectedSubcategories.length > 0 &&
        !selectedSubcategories.includes(product.subcategory)
      ) {
        return false;
      }

      // Size filter
      if (
        selectedSizes.length > 0 &&
        !product.sizes.some((s) => selectedSizes.includes(s))
      ) {
        return false;
      }

      // Color filter
      if (
        selectedColors.length > 0 &&
        !product.colors.some((c) => selectedColors.includes(c.name))
      ) {
        return false;
      }

      // Price filter
      if (product.price > maxPrice) {
        return false;
      }

      // In Stock
      if (inStockOnly && product.stock <= 0) {
        return false;
      }

      // On Sale
      if (onSaleOnly && !product.isSale) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "newest":
          return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        case "featured":
        default:
          return (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0);
      }
    });
  }, [
    initialProducts,
    selectedCategory,
    selectedSubcategories,
    selectedSizes,
    selectedColors,
    maxPrice,
    inStockOnly,
    onSaleOnly,
    sortBy
  ]);

  const hasActiveFilters =
    (selectedCategory !== "all" && selectedCategory !== categoryFilter) ||
    selectedSubcategories.length > 0 ||
    selectedSizes.length > 0 ||
    selectedColors.length > 0 ||
    maxPrice < 55000 ||
    inStockOnly ||
    onSaleOnly;

  // Reusable Filter Sidebar Content
  const FilterContent = (
    <div className="space-y-8 text-xs">
      {/* Category Selection (only show if not strictly constrained) */}
      {!categoryFilter && (
        <div>
          <h4 className="font-semibold text-[#292D32] uppercase tracking-[0.16em] mb-3 text-[11px]">
            Department
          </h4>
          <div className="space-y-1.5">
            {[
              { label: "All Departments", value: "all" },
              { label: "Women", value: "women" },
              { label: "Men", value: "men" },
              { label: "Kids", value: "kids" },
              { label: "Accessories", value: "accessories" },
            ].map((cat) => (
              <label
                key={cat.value}
                className="flex items-center gap-2 cursor-pointer text-[#737D87] hover:text-[#292D32] py-1"
              >
                <input
                  type="radio"
                  name="department"
                  checked={selectedCategory === cat.value}
                  onChange={() => {
                    setSelectedCategory(cat.value);
                    setSelectedSubcategories([]);
                  }}
                  className="accent-[#292D32]"
                />
                <span>{cat.label}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Subcategories */}
      {availableSubcategories.length > 0 && (
        <div className="border-t border-[#E6E1D9] pt-6">
          <h4 className="font-semibold text-[#292D32] uppercase tracking-[0.16em] mb-3 text-[11px]">
            Category
          </h4>
          <div className="space-y-1.5 max-h-48 overflow-y-auto pr-2">
            {availableSubcategories.map((sub) => (
              <label
                key={sub}
                className="flex items-center gap-2 cursor-pointer text-[#737D87] hover:text-[#292D32] py-0.5"
              >
                <input
                  type="checkbox"
                  checked={selectedSubcategories.includes(sub)}
                  onChange={() => toggleSubcategory(sub)}
                  className="accent-[#292D32] rounded-none"
                />
                <span>{sub}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Price Range */}
      <div className="border-t border-[#E6E1D9] pt-6">
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-semibold text-[#292D32] uppercase tracking-[0.16em] text-[11px]">
            Max Price
          </h4>
          <span className="font-medium text-[#292D32]">
            {formatPrice(maxPrice)}
          </span>
        </div>
        <input
          type="range"
          min="3000"
          max="55000"
          step="1000"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-[#292D32] bg-[#EEEAE2] h-1.5 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-[#737D87] mt-1">
          <span>Rs. 3,000</span>
          <span>Rs. 55,000+</span>
        </div>
      </div>

      {/* Color Palette Filter */}
      <div className="border-t border-[#E6E1D9] pt-6">
        <h4 className="font-semibold text-[#292D32] uppercase tracking-[0.16em] mb-3 text-[11px]">
          Shades
        </h4>
        <div className="flex flex-wrap gap-2">
          {COLOR_SWATCHES.map((color) => {
            const isSelected = selectedColors.includes(color.name);
            return (
              <button
                key={color.name}
                onClick={() => toggleColor(color.name)}
                className={`flex items-center gap-1.5 px-2.5 py-1 border transition-all text-[11px] ${
                  isSelected
                    ? "border-[#292D32] bg-[#292D32] text-white"
                    : "border-[#E6E1D9] bg-white text-[#292D32] hover:border-[#292D32]"
                }`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full border border-black/10"
                  style={{ backgroundColor: color.hex }}
                />
                <span>{color.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sizes */}
      <div className="border-t border-[#E6E1D9] pt-6">
        <h4 className="font-semibold text-[#292D32] uppercase tracking-[0.16em] mb-3 text-[11px]">
          Sizes
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {ALL_SIZES.map((size) => {
            const isSelected = selectedSizes.includes(size);
            return (
              <button
                key={size}
                onClick={() => toggleSize(size)}
                className={`px-3 py-1.5 border text-xs font-medium transition-all ${
                  isSelected
                    ? "bg-[#292D32] text-[#F7F5F0] border-[#292D32]"
                    : "bg-white text-[#292D32] border-[#E6E1D9] hover:border-[#292D32]"
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Toggles */}
      <div className="border-t border-[#E6E1D9] pt-6 space-y-3">
        <label className="flex items-center gap-2 cursor-pointer text-[#292D32]">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={(e) => setInStockOnly(e.target.checked)}
            className="accent-[#292D32]"
          />
          <span className="font-medium text-xs">In Stock Only</span>
        </label>

        <label className="flex items-center gap-2 cursor-pointer text-[#292D32]">
          <input
            type="checkbox"
            checked={onSaleOnly}
            onChange={(e) => setOnSaleOnly(e.target.checked)}
            className="accent-[#292D32]"
          />
          <span className="font-medium text-xs text-[#C26D53]">Sale Items Only</span>
        </label>
      </div>

      {/* Reset button */}
      {hasActiveFilters && (
        <button
          onClick={clearAllFilters}
          className="w-full text-center py-2.5 bg-[#EEEAE2] hover:bg-[#D8C8B3] text-[#292D32] text-xs uppercase tracking-wider font-semibold transition-colors border border-[#E6E1D9]"
        >
          Reset All Filters
        </button>
      )}
    </div>
  );

  return (
    <div className="bg-[#F7F5F0] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-xs text-[#737D87] mb-6">
          <Link href="/" className="hover:text-[#292D32] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-[#292D32] transition-colors">
            Shop
          </Link>
          {categoryFilter && (
            <>
              <span>/</span>
              <span className="text-[#292D32] capitalize font-medium">
                {categoryFilter}
              </span>
            </>
          )}
        </nav>

        {/* Page Header */}
        <div className="border-b border-[#E6E1D9] pb-8 mb-10">
          <span className="text-[11px] uppercase tracking-[0.24em] font-semibold text-[#A99B8A] block mb-2">
            WINTER EDITORIAL ARCHIVE
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl text-[#292D32]">
            {pageTitle}
          </h1>
          <p className="text-xs sm:text-sm text-[#737D87] mt-3 max-w-2xl font-light leading-relaxed">
            {pageDescription}
          </p>
        </div>

        {/* Toolbar: Count, Mobile Trigger, Sort Dropdown */}
        <div className="flex items-center justify-between py-4 border-b border-[#E6E1D9] mb-8 bg-[#FFFFFF] px-4 sm:px-6 shadow-2xs">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#292D32] py-1"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters {hasActiveFilters && "(Active)"}</span>
          </button>

          {/* Product Count */}
          <div className="hidden lg:block text-xs text-[#737D87]">
            Showing <strong className="text-[#292D32] font-semibold">{filteredProducts.length}</strong> {filteredProducts.length === 1 ? "design" : "designs"}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#737D87] hidden sm:inline">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent border border-[#E6E1D9] text-[#292D32] py-1.5 px-3 font-medium text-xs focus:outline-none focus:border-[#292D32] cursor-pointer"
            >
              <option value="featured">Featured / Trending</option>
              <option value="newest">Newest Season</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Best Rated</option>
            </select>
          </div>
        </div>

        {/* Main Grid & Sidebar Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Desktop Filter Sidebar (1 col) */}
          <div className="hidden lg:block bg-[#FFFFFF] p-6 border border-[#E6E1D9] h-fit sticky top-28 shadow-xs">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#E6E1D9]">
              <h3 className="font-serif text-base text-[#292D32] flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-[#A99B8A]" /> Filter Pieces
              </h3>
              {hasActiveFilters && (
                <button
                  onClick={clearAllFilters}
                  className="text-[11px] text-[#A99B8A] hover:underline"
                >
                  Clear all
                </button>
              )}
            </div>
            {FilterContent}
          </div>

          {/* Product Grid (3 cols) */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="bg-[#FFFFFF] border border-[#E6E1D9] p-12 text-center my-8">
                <p className="font-serif text-xl text-[#292D32] mb-2">
                  No products match your current filters
                </p>
                <p className="text-xs text-[#737D87] max-w-sm mx-auto mb-6">
                  Try adjusting your price range, clearing specific color/size preferences, or browsing all departments.
                </p>
                <button
                  onClick={clearAllFilters}
                  className="bg-[#292D32] text-[#F7F5F0] px-6 py-3 text-xs uppercase tracking-widest font-medium hover:bg-[#3E4349] transition-all"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 sm:gap-8">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-[#292D32]/50 backdrop-blur-xs"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-[#F7F5F0] shadow-2xl flex flex-col z-50">
            <div className="flex items-center justify-between p-6 border-b border-[#E6E1D9]">
              <h3 className="font-serif text-lg text-[#292D32]">
                Filters & Attributes
              </h3>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-1 text-[#292D32]"
              >
                <X className="w-5 h-5 stroke-[1.5]" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-6">
              {FilterContent}
            </div>
            <div className="p-4 border-t border-[#E6E1D9] bg-[#FFFFFF]">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full bg-[#292D32] text-white py-3 text-xs uppercase tracking-wider font-semibold"
              >
                Apply Filters ({filteredProducts.length} Results)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
