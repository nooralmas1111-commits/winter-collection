"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShoppingBag,
  ShieldCheck,
  Tag,
  Sparkles,
  ArrowLeft
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { toast } from "sonner";

export default function CartPage() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    shippingFee,
    freeShippingThreshold,
    freeShippingProgress
  } = useCart();

  const [couponCode, setCouponCode] = useState("");
  const [appliedDiscountRate, setAppliedDiscountRate] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState("");

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (!code) return;

    try {
      const res = await fetch("/api/coupons/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, subtotal }),
      });

      if (res.ok) {
        const data = await res.json();
        setAppliedDiscountRate(data.discountValue / 100);
        setAppliedCoupon(`${data.code} (${data.discountValue}% OFF)`);
        toast.success(`Coupon ${data.code} verified with database!`);
        setCouponCode("");
        return;
      }
    } catch {
      // Fallback to local promotional logic
    }

    if (code === "WINTER20") {
      setAppliedDiscountRate(0.2); // 20% off
      setAppliedCoupon("WINTER20 (20% OFF)");
      toast.success("Coupon code applied! 20% discount granted.");
      setCouponCode("");
    } else if (code === "FLAIR10") {
      setAppliedDiscountRate(0.1); // 10% off
      setAppliedCoupon("FLAIR10 (10% OFF)");
      toast.success("Coupon code applied! 10% discount granted.");
      setCouponCode("");
    } else {
      toast.error("Invalid promotional code. Try 'WINTER20' for 20% off.");
    }
  };

  const discountAmount = Math.round(subtotal * appliedDiscountRate);
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  return (
    <div className="bg-[#F7F5F0] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-xs text-[#737D87] mb-8">
          <Link href="/" className="hover:text-[#292D32]">
            Home
          </Link>
          <span>/</span>
          <span className="text-[#292D32] font-medium">Shopping Bag</span>
        </nav>

        {/* Page Title */}
        <div className="border-b border-[#E6E1D9] pb-6 mb-10 flex flex-col sm:flex-row sm:items-baseline justify-between">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#292D32]">
              Your Shopping Bag
            </h1>
            <p className="text-xs sm:text-sm text-[#737D87] mt-1">
              Review your winter selections before express courier checkout.
            </p>
          </div>
          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="text-xs text-[#737D87] hover:text-[#C26D53] underline mt-3 sm:mt-0"
            >
              Empty Bag
            </button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="bg-white border border-[#E6E1D9] p-12 sm:p-20 text-center my-8 shadow-xs">
            <div className="w-16 h-16 rounded-full bg-[#EEEAE2] flex items-center justify-center text-[#737D87] mx-auto mb-4">
              <ShoppingBag className="w-8 h-8 stroke-[1.2]" />
            </div>
            <h2 className="font-serif text-2xl text-[#292D32] mb-2">
              Your bag is currently empty
            </h2>
            <p className="text-xs sm:text-sm text-[#737D87] max-w-sm mx-auto mb-8 font-light leading-relaxed">
              Explore our double-faced wool coats, pure alpaca knits, and weatherproof down puffers to begin your winter wardrobe.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 bg-[#292D32] text-[#F7F5F0] hover:bg-[#3E4349] px-8 py-3.5 text-xs uppercase tracking-[0.18em] font-medium transition-all"
            >
              Explore Winter Collection
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Bag Items (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              {/* Free shipping banner */}
              <div className="bg-[#EEEAE2] p-4 border border-[#E6E1D9] text-xs">
                <div className="flex justify-between items-center mb-1 font-medium text-[#292D32]">
                  <span className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-[#A99B8A]" />
                    {subtotal >= freeShippingThreshold ? (
                      <span className="text-[#3E6B48] font-semibold">
                        You have unlocked complimentary nationwide shipping!
                      </span>
                    ) : (
                      <span>
                        Add <strong>{formatPrice(freeShippingThreshold - subtotal)}</strong> more to unlock complimentary delivery
                      </span>
                    )}
                  </span>
                  <span>{freeShippingProgress}%</span>
                </div>
                <div className="w-full bg-[#E6E1D9] h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-[#292D32] h-full transition-all duration-500"
                    style={{ width: `${freeShippingProgress}%` }}
                  />
                </div>
              </div>

              {/* Items List */}
              <div className="bg-white border border-[#E6E1D9] divide-y divide-[#E6E1D9]">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center justify-between"
                  >
                    <div className="flex gap-4 items-center">
                      <div className="relative w-20 h-26 sm:w-24 sm:h-32 bg-[#EEEAE2] shrink-0 border border-[#E6E1D9] overflow-hidden">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          sizes="100px"
                          className="object-cover"
                        />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase tracking-wider text-[#A99B8A] font-medium">
                          {item.product.subcategory}
                        </span>
                        <h3 className="font-serif text-base sm:text-lg text-[#292D32]">
                          <Link href={`/product/${item.product.id}`} className="hover:underline">
                            {item.product.name}
                          </Link>
                        </h3>
                        <p className="text-xs text-[#737D87]">
                          Color: <strong className="text-[#292D32]">{item.selectedColor}</strong> · Size: <strong className="text-[#292D32]">{item.selectedSize}</strong>
                        </p>
                        <p className="text-xs font-semibold text-[#292D32] pt-1">
                          {formatPrice(item.product.price)} each
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-0 border-[#E6E1D9]">
                      {/* Quantity */}
                      <div className="flex items-center border border-[#E6E1D9]">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 text-[#292D32] hover:bg-[#EEEAE2]"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-3 text-xs font-semibold text-[#292D32]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1.5 text-[#292D32] hover:bg-[#EEEAE2]"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Total for this item */}
                      <span className="font-serif text-base font-semibold text-[#292D32] min-w-[90px] text-right">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        aria-label="Remove item"
                        className="text-[#737D87] hover:text-[#C26D53] p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex justify-between items-center text-xs">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-1.5 text-[#292D32] hover:text-[#A99B8A] font-medium"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Continue Shopping
                </Link>
                <span className="text-[#737D87]">
                  {items.length} {items.length === 1 ? "design" : "designs"} in bag
                </span>
              </div>
            </div>

            {/* Order Summary Column (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Summary Card */}
              <div className="bg-white border border-[#E6E1D9] p-6 shadow-xs space-y-6">
                <h3 className="font-serif text-xl text-[#292D32] pb-4 border-b border-[#E6E1D9]">
                  Order Summary
                </h3>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between text-[#737D87]">
                    <span>Item Subtotal</span>
                    <span className="font-medium text-[#292D32]">{formatPrice(subtotal)}</span>
                  </div>

                  {appliedDiscountRate > 0 && (
                    <div className="flex justify-between text-[#3E6B48]">
                      <span>Promo Discount ({appliedCoupon})</span>
                      <span className="font-semibold">-{formatPrice(discountAmount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-[#737D87]">
                    <span>Nationwide Shipping</span>
                    <span className="font-medium text-[#292D32]">
                      {shippingFee === 0 ? "Complimentary" : formatPrice(shippingFee)}
                    </span>
                  </div>

                  <div className="pt-4 border-t border-[#E6E1D9] flex justify-between items-baseline text-sm font-semibold text-[#292D32]">
                    <span>Estimated Total</span>
                    <span className="font-serif text-2xl font-normal text-[#292D32]">
                      {formatPrice(finalTotal)}
                    </span>
                  </div>
                </div>

                {/* Promo Code Input */}
                <form onSubmit={handleApplyCoupon} className="pt-2">
                  <label className="text-[11px] uppercase tracking-wider text-[#737D87] font-medium block mb-2">
                    Have a seasonal promo code?
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="e.g. WINTER20"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="flex-1 bg-[#F7F5F0] border border-[#E6E1D9] px-3 py-2 text-xs uppercase placeholder-normal text-[#292D32] focus:outline-none focus:border-[#292D32]"
                    />
                    <button
                      type="submit"
                      className="bg-[#292D32] text-white px-4 py-2 text-xs uppercase tracking-wider font-semibold hover:bg-[#3E4349]"
                    >
                      Apply
                    </button>
                  </div>
                  <p className="text-[10px] text-[#A99B8A] mt-1">
                    Tip: Use code <strong className="font-bold">WINTER20</strong> for 20% off.
                  </p>
                </form>

                {/* Checkout CTA */}
                <Link
                  href="/checkout"
                  className="w-full bg-[#292D32] text-[#F7F5F0] hover:bg-[#3E4349] py-4 px-6 text-xs uppercase tracking-[0.18em] font-semibold flex items-center justify-center gap-2 transition-all shadow-md block text-center"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-wider text-[#737D87] pt-2 border-t border-[#E6E1D9]">
                  <ShieldCheck className="w-4 h-4 text-[#3E6B48]" />
                  Secure Encryption & Insured Dispatch
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
