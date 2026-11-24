"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import Rating from "@/components/ui/Rating";
import { toast } from "sonner";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToBag = (product: (typeof wishlist)[0]) => {
    addToCart(
      product,
      product.colors[0]?.name || "Standard",
      product.sizes[0] || "Standard",
      1
    );
    removeFromWishlist(product.id);
  };

  return (
    <div className="bg-[#F7F5F0] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs text-[#737D87] mb-8">
          <Link href="/" className="hover:text-[#292D32]">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#292D32] font-medium">Wishlist</span>
        </nav>

        {/* Page Title */}
        <div className="border-b border-[#E6E1D9] pb-6 mb-10 flex flex-col sm:flex-row sm:items-baseline justify-between">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#292D32]">
              Your Saved Pieces
            </h1>
            <p className="text-xs sm:text-sm text-[#737D87] mt-1">
              Garments and accessories you are considering for the winter season.
            </p>
          </div>
          {wishlist.length > 0 && (
            <button
              onClick={clearWishlist}
              className="text-xs text-[#737D87] hover:text-[#C26D53] underline mt-3 sm:mt-0"
            >
              Clear All Wishlist
            </button>
          )}
        </div>

        {wishlist.length === 0 ? (
          <div className="bg-white border border-[#E6E1D9] p-12 sm:p-20 text-center my-8 shadow-xs">
            <div className="w-16 h-16 rounded-full bg-[#EEEAE2] flex items-center justify-center text-[#737D87] mx-auto mb-4">
              <Heart className="w-8 h-8 stroke-[1.2]" />
            </div>
            <h2 className="font-serif text-2xl text-[#292D32] mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-xs sm:text-sm text-[#737D87] max-w-sm mx-auto mb-8 font-light leading-relaxed">
              Explore our catalogue and click the heart icon on any piece you wish to save for later consideration.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-[#292D32] text-[#F7F5F0] hover:bg-[#3E4349] px-8 py-3.5 text-xs uppercase tracking-[0.18em] font-medium transition-all"
            >
              Discover Winter Collection
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {wishlist.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-[#E6E1D9] flex flex-col justify-between overflow-hidden group shadow-2xs hover:shadow-md transition-all"
              >
                {/* Image */}
                <div className="relative aspect-[3/4] bg-[#EEEAE2] overflow-hidden">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    aria-label="Remove from wishlist"
                    className="absolute top-3 right-3 p-2 rounded-full bg-white/90 text-[#737D87] hover:text-[#C26D53] transition-colors shadow-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Details */}
                <div className="p-4 flex flex-col flex-1 justify-between">
                  <div>
                    <div className="flex justify-between items-center text-[10px] uppercase tracking-wider text-[#A99B8A] mb-1">
                      <span>{product.subcategory}</span>
                      <Rating rating={product.rating} showCount={false} size="sm" />
                    </div>

                    <h3 className="font-medium text-xs sm:text-sm text-[#292D32] line-clamp-1 mb-2">
                      <Link href={`/product/${product.id}`} className="hover:underline">
                        {product.name}
                      </Link>
                    </h3>

                    <div className="flex items-baseline gap-2 mb-4">
                      <span className="font-semibold text-sm text-[#292D32]">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-[#737D87] line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Move to Bag Action */}
                  <div className="pt-2 border-t border-[#E6E1D9]/60">
                    <button
                      onClick={() => handleMoveToBag(product)}
                      className="w-full bg-[#292D32] hover:bg-[#3E4349] text-white py-2.5 px-3 text-xs uppercase tracking-wider font-medium flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" /> Move to Bag
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
