"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Search, Heart, ShoppingBag, Menu, X, User, ChevronDown, Shield } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useSearch } from "@/context/SearchContext";
import { useAuth } from "@/context/AuthContext";
import MobileMenu from "./MobileMenu";
import { CATEGORIES } from "@/data/categories";

export default function Navbar() {
  const pathname = usePathname();
  const { totalCount, openCart } = useCart();
  const { wishlistCount } = useWishlist();
  const { openSearch } = useSearch();
  const { user, openAuthModal } = useAuth();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Women", href: "/women", hasDropdown: true, slug: "women" },
    { name: "Men", href: "/men", hasDropdown: true, slug: "men" },
    { name: "Kids", href: "/kids", hasDropdown: true, slug: "kids" },
    { name: "Accessories", href: "/accessories", hasDropdown: true, slug: "accessories" },
    { name: "Sale", href: "/shop?sale=true", isHighlight: true },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-[#F7F5F0]/95 backdrop-blur-md shadow-[0_4px_20px_-8px_rgba(41,45,50,0.08)] border-b border-[#E6E1D9]"
            : "bg-[#F7F5F0] border-b border-[#E6E1D9]/70"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open mobile menu"
                className="p-2 -ml-2 text-[#292D32] hover:text-[#A99B8A] transition-colors"
              >
                <Menu className="w-6 h-6 stroke-[1.5]" />
              </button>
            </div>

            {/* Brand Logo */}
            <div className="flex-1 lg:flex-none text-center lg:text-left">
              <Link href="/" className="inline-block group">
                <span className="font-serif text-2xl sm:text-3xl font-normal tracking-[0.18em] text-[#292D32] uppercase block">
                  FROST & FLAIR
                </span>
                <span className="block text-[9px] uppercase tracking-[0.3em] text-[#737D87] font-sans -mt-1 group-hover:text-[#A99B8A] transition-colors">
                  Winter, Wrapped in Elegance
                </span>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                const categoryData = link.slug
                  ? CATEGORIES.find((c) => c.slug === link.slug)
                  : null;

                return (
                  <div
                    key={link.name}
                    className="relative group py-6"
                    onMouseEnter={() => link.hasDropdown && setActiveDropdown(link.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <Link
                      href={link.href}
                      className={`text-[13px] uppercase tracking-[0.14em] font-medium transition-all duration-200 flex items-center gap-1 ${
                        link.isHighlight
                          ? "text-[#C26D53] hover:text-[#9B4E38]"
                          : isActive
                          ? "text-[#292D32] font-semibold"
                          : "text-[#737D87] hover:text-[#292D32]"
                      }`}
                    >
                      {link.name}
                      {link.hasDropdown && (
                        <ChevronDown className="w-3 h-3 text-[#A99B8A] transition-transform duration-200 group-hover:rotate-180" />
                      )}
                    </Link>

                    {/* Underline indicator */}
                    <span
                      className={`absolute bottom-5 left-0 h-[1.5px] bg-[#292D32] transition-all duration-300 ${
                        isActive ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />

                    {/* Dropdown Menu for Categories */}
                    {link.hasDropdown && categoryData && activeDropdown === link.name && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 w-[520px] bg-[#FFFFFF] border border-[#E6E1D9] shadow-xl p-6 rounded-none z-50 animate-in fade-in-0 zoom-in-95 duration-150">
                        <div className="grid grid-cols-2 gap-6">
                          <div>
                            <p className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#A99B8A] mb-3">
                              {link.name} Collection
                            </p>
                            <ul className="space-y-2">
                              {categoryData.subcategories.map((sub) => (
                                <li key={sub}>
                                  <Link
                                    href={`/${link.slug}?subcategory=${encodeURIComponent(sub)}`}
                                    className="text-xs text-[#292D32] hover:text-[#A99B8A] hover:translate-x-1 transition-all block py-0.5"
                                  >
                                    {sub}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                            <div className="mt-4 pt-3 border-t border-[#E6E1D9]">
                              <Link
                                href={`/${link.slug}`}
                                className="text-[11px] uppercase tracking-wider font-semibold text-[#292D32] hover:underline"
                              >
                                View All {link.name} &rarr;
                              </Link>
                            </div>
                          </div>

                          <div className="relative h-48 w-full overflow-hidden bg-[#EEEAE2]">
                            <Image
                              src={categoryData.image}
                              alt={categoryData.name}
                              fill
                              sizes="250px"
                              className="object-cover transition-transform duration-500 hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-3">
                              <span className="text-white text-xs font-serif italic">
                                {categoryData.tagline}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Right-Side Actions */}
            <div className="flex items-center space-x-4 sm:space-x-6">
              {/* Search Trigger */}
              <button
                onClick={openSearch}
                aria-label="Search collection"
                className="text-[#292D32] hover:text-[#A99B8A] transition-colors p-1 relative"
              >
                <Search className="w-5 h-5 stroke-[1.5]" />
              </button>

              {/* Wishlist Link */}
              <Link
                href="/wishlist"
                aria-label="View Wishlist"
                className="text-[#292D32] hover:text-[#A99B8A] transition-colors p-1 relative"
              >
                <Heart className="w-5 h-5 stroke-[1.5]" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#292D32] text-[#F7F5F0] text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium font-sans">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Account / Auth Action */}
              {user ? (
                <Link
                  href="/account"
                  aria-label="My Account"
                  className="text-[#292D32] hover:text-[#A99B8A] transition-colors p-1 relative flex items-center gap-1"
                  title={`Signed in as ${user.name}`}
                >
                  <User className="w-5 h-5 stroke-[1.5]" />
                  {user.role === "ADMIN" && (
                    <span className="hidden sm:inline-block text-[9px] uppercase tracking-wider font-bold bg-[#292D32] text-white px-1.5 py-0.5">
                      Admin
                    </span>
                  )}
                </Link>
              ) : (
                <button
                  onClick={() => openAuthModal("login")}
                  aria-label="Sign In"
                  className="text-[#292D32] hover:text-[#A99B8A] transition-colors p-1 relative"
                  title="Sign In / Register"
                >
                  <User className="w-5 h-5 stroke-[1.5]" />
                </button>
              )}

              {/* Shopping Bag Trigger */}
              <button
                onClick={openCart}
                aria-label="View Shopping Bag"
                className="text-[#292D32] hover:text-[#A99B8A] transition-colors p-1 relative"
              >
                <ShoppingBag className="w-5 h-5 stroke-[1.5]" />
                {totalCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#A99B8A] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-semibold font-sans">
                    {totalCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}
