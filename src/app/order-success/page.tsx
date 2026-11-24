"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, PackageCheck, Calendar, ArrowRight, ShieldCheck, Mail } from "lucide-react";
import { formatPrice } from "@/lib/utils";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "FF-2026-9481";
  const name = searchParams.get("name") || "Valued Client";
  const total = Number(searchParams.get("total") || "34990");
  const delivery = searchParams.get("delivery") || "Friday, Nov 27, 2026";

  return (
    <div className="bg-[#F7F5F0] min-h-screen py-16 sm:py-24 flex items-center justify-center">
      <div className="max-w-2xl w-full mx-auto px-4 sm:px-6">
        <div className="bg-white border border-[#E6E1D9] p-8 sm:p-12 shadow-md text-center space-y-6">
          {/* Animated / Verified Icon */}
          <div className="w-16 h-16 rounded-full bg-[#3E6B48]/10 text-[#3E6B48] flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-9 h-9 stroke-[1.5]" />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#A99B8A]">
              ATELIER ORDER CONFIRMED
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#292D32]">
              Thank You, {name}.
            </h1>
            <p className="text-xs sm:text-sm text-[#737D87] max-w-md mx-auto leading-relaxed font-light">
              Your winter order has been reserved and is now being hand-inspected and packaged in our central atelier.
            </p>
          </div>

          {/* Order Details Card */}
          <div className="bg-[#F7F5F0] p-6 border border-[#E6E1D9] text-left space-y-4 my-6 text-xs">
            <div className="flex justify-between pb-3 border-b border-[#E6E1D9]">
              <span className="text-[#737D87]">Order Reference</span>
              <strong className="text-[#292D32] font-mono tracking-wider">{orderId}</strong>
            </div>

            <div className="flex justify-between pb-3 border-b border-[#E6E1D9]">
              <span className="text-[#737D87] flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#A99B8A]" /> Estimated Delivery
              </span>
              <strong className="text-[#292D32]">{delivery}</strong>
            </div>

            <div className="flex justify-between pb-3 border-b border-[#E6E1D9]">
              <span className="text-[#737D87]">Total Order Value</span>
              <strong className="text-[#292D32] font-serif text-base">{formatPrice(total)}</strong>
            </div>

            <div className="flex justify-between items-center text-[#737D87] text-[11px] pt-1">
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-[#A99B8A]" /> Dispatch notification sent
              </span>
              <span className="text-[#3E6B48] font-medium flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Insured Delivery
              </span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/shop"
              className="bg-[#292D32] text-[#F7F5F0] hover:bg-[#3E4349] px-8 py-3.5 text-xs uppercase tracking-[0.18em] font-semibold flex items-center justify-center gap-2 transition-all shadow-sm"
            >
              Continue Exploring Collection
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/"
              className="border border-[#E6E1D9] hover:bg-[#EEEAE2] text-[#292D32] px-8 py-3.5 text-xs uppercase tracking-[0.16em] font-medium flex items-center justify-center transition-all"
            >
              Return to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-xs text-[#737D87]">Loading order details...</div>}>
      <OrderSuccessContent />
    </Suspense>
  );
}
