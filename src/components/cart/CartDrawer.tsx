"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Sparkles, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";

export default function CartDrawer() {
  const {
    items,
    isCartOpen,
    closeCart,
    removeFromCart,
    updateQuantity,
    subtotal,
    shippingFee,
    total,
    freeShippingThreshold,
    freeShippingProgress
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#292D32]/50 backdrop-blur-sm transition-opacity duration-300"
        onClick={closeCart}
      />

      {/* Slide-out Drawer */}
      <div className="fixed inset-y-0 right-0 w-full max-w-md bg-[#F7F5F0] shadow-2xl flex flex-col z-50">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#E6E1D9]">
          <div className="flex items-baseline gap-2">
            <h2 className="font-serif text-xl tracking-wide text-[#292D32]">
              Shopping Bag
            </h2>
            <span className="text-xs text-[#737D87] font-sans">
              ({items.length} {items.length === 1 ? "item" : "items"})
            </span>
          </div>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="p-1.5 text-[#292D32] hover:text-[#A99B8A] transition-colors"
          >
            <X className="w-5 h-5 stroke-[1.5]" />
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="bg-[#EEEAE2] px-6 py-3 border-b border-[#E6E1D9]">
          <div className="flex items-center justify-between text-xs text-[#292D32] mb-1.5 font-medium">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-[#A99B8A]" />
              {subtotal >= freeShippingThreshold ? (
                <span className="text-[#3E6B48] font-semibold">
                  You unlocked complimentary shipping!
                </span>
              ) : (
                <span>
                  Add <strong className="font-bold">{formatPrice(freeShippingThreshold - subtotal)}</strong> for free shipping
                </span>
              )}
            </span>
            <span className="text-[11px] text-[#737D87]">{freeShippingProgress}%</span>
          </div>
          <div className="w-full bg-[#E6E1D9] h-1.5 rounded-full overflow-hidden">
            <div
              className="bg-[#292D32] h-full transition-all duration-500 ease-out"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 rounded-full bg-[#EEEAE2] flex items-center justify-center text-[#737D87] mb-4">
                <ShoppingBag className="w-8 h-8 stroke-[1.2]" />
              </div>
              <p className="font-serif text-lg text-[#292D32] mb-2">
                Your bag is empty
              </p>
              <p className="text-xs text-[#737D87] max-w-xs mb-6">
                Discover our curated winter layers crafted from pure cashmere, alpaca, and virgin wool.
              </p>
              <button
                onClick={closeCart}
                className="bg-[#292D32] text-[#F7F5F0] px-6 py-3 text-xs uppercase tracking-[0.16em] font-medium hover:bg-[#3E4349] transition-all"
              >
                Explore Collection
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex gap-4 p-3 bg-[#FFFFFF] border border-[#E6E1D9] transition-all hover:border-[#D8C8B3]"
              >
                {/* Image */}
                <div className="relative w-20 h-24 shrink-0 bg-[#EEEAE2] overflow-hidden">
                  <Image
                    src={item.product.images[0]}
                    alt={item.product.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between">
                      <h4 className="text-xs font-semibold text-[#292D32] line-clamp-1 pr-2">
                        {item.product.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        aria-label="Remove item"
                        className="text-[#737D87] hover:text-[#C26D53] transition-colors p-0.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 mt-1 text-[11px] text-[#737D87]">
                      <span>{item.selectedColor}</span>
                      <span>•</span>
                      <span>Size: {item.selectedSize}</span>
                    </div>

                    <div className="mt-1 font-semibold text-xs text-[#292D32]">
                      {formatPrice(item.product.price)}
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center border border-[#E6E1D9] bg-[#F7F5F0]">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 text-[#292D32] hover:bg-[#EEEAE2] transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-2 text-xs font-medium text-[#292D32]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 text-[#292D32] hover:bg-[#EEEAE2] transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="text-xs font-medium text-[#292D32]">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {items.length > 0 && (
          <div className="p-6 border-t border-[#E6E1D9] bg-[#FFFFFF] space-y-4">
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-[#737D87]">
                <span>Subtotal</span>
                <span className="font-medium text-[#292D32]">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-[#737D87]">
                <span>Estimated Shipping</span>
                <span className="font-medium text-[#292D32]">
                  {shippingFee === 0 ? "Complimentary" : formatPrice(shippingFee)}
                </span>
              </div>
              <div className="border-t border-[#E6E1D9] pt-2 flex justify-between text-sm font-semibold text-[#292D32]">
                <span>Estimated Total</span>
                <span className="font-serif text-base">{formatPrice(total)}</span>
              </div>
            </div>

            <div className="space-y-2">
              <Link
                href="/checkout"
                onClick={closeCart}
                className="w-full bg-[#292D32] text-[#F7F5F0] py-3.5 px-4 text-xs uppercase tracking-[0.18em] font-medium flex items-center justify-center gap-2 hover:bg-[#3E4349] transition-all shadow-sm"
              >
                Proceed to Checkout
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/cart"
                onClick={closeCart}
                className="w-full bg-transparent border border-[#E6E1D9] text-[#292D32] py-2.5 px-4 text-xs uppercase tracking-[0.16em] font-medium flex items-center justify-center hover:bg-[#EEEAE2] transition-all"
              >
                View Full Bag
              </Link>
            </div>

            <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-wider text-[#737D87] pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#3E6B48]" />
              Safe & Secure Winter Checkout
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
