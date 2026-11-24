"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  CreditCard,
  Truck,
  ArrowRight,
  Check,
  Lock,
  Building,
  Sparkles
} from "lucide-react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/utils";
import { createMockOrder } from "@/services/orderService";
import { CustomerInfo } from "@/types/order";
import { toast } from "sonner";

const MAJOR_CITIES = [
  "Islamabad",
  "Lahore",
  "Karachi",
  "Rawalpindi",
  "Peshawar",
  "Faisalabad",
  "Multan",
  "Quetta",
  "Sialkot",
  "Gujranwala",
  "Murree",
  "Abbottabad"
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, subtotal, shippingFee, clearCart } = useCart();

  const [paymentMethod, setPaymentMethod] = useState<"cod" | "card">("cod");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form Fields
  const [formData, setFormData] = useState<CustomerInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "Islamabad",
    postalCode: "",
    notes: ""
  });

  // Card Demo Fields
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) {
      toast.error("Your shopping bag is empty.");
      router.push("/shop");
      return;
    }

    // Validation
    if (
      !formData.firstName.trim() ||
      !formData.lastName.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.address.trim()
    ) {
      toast.error("Please fill in all mandatory customer details.");
      return;
    }

    if (paymentMethod === "card") {
      if (!cardNumber || !cardExpiry || !cardCvv) {
        toast.error("Please enter the demo card credentials.");
        return;
      }
    }

    try {
      setIsSubmitting(true);
      toast.loading("Securing your winter order reservation...");

      const order = await createMockOrder(
        items,
        formData,
        paymentMethod,
        subtotal,
        shippingFee,
        0
      );

      clearCart();
      toast.dismiss();
      toast.success("Order confirmed successfully!");

      router.push(
        `/order-success?orderId=${order.id}&name=${encodeURIComponent(
          formData.firstName
        )}&total=${order.total}&delivery=${encodeURIComponent(
          order.estimatedDelivery
        )}`
      );
    } catch {
      toast.dismiss();
      toast.error("An error occurred while confirming your order.");
      setIsSubmitting(false);
    }
  };

  const finalTotal = subtotal + shippingFee;

  return (
    <div className="bg-[#F7F5F0] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-[#E6E1D9] pb-6 mb-10">
          <span className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#A99B8A] block mb-1">
            FROST & FLAIR ATELIER CONCIERGE
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#292D32]">
            Winter Order Checkout
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form Column (7 cols) */}
          <div className="lg:col-span-7 space-y-10">
            {/* Step 1: Customer Details */}
            <div className="bg-white p-6 sm:p-8 border border-[#E6E1D9] shadow-xs">
              <div className="flex items-center gap-3 pb-4 mb-6 border-b border-[#E6E1D9]">
                <div className="w-6 h-6 rounded-full bg-[#292D32] text-white flex items-center justify-center text-xs font-semibold">
                  1
                </div>
                <h3 className="font-serif text-lg text-[#292D32]">
                  Customer & Contact Information
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#737D87] font-medium block mb-1.5">
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="e.g. Amina"
                    className="w-full bg-[#F7F5F0] border border-[#E6E1D9] px-3.5 py-2.5 text-xs text-[#292D32] focus:outline-none focus:border-[#292D32]"
                  />
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#737D87] font-medium block mb-1.5">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="e.g. Tariq"
                    className="w-full bg-[#F7F5F0] border border-[#E6E1D9] px-3.5 py-2.5 text-xs text-[#292D32] focus:outline-none focus:border-[#292D32]"
                  />
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#737D87] font-medium block mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="amina@example.com"
                    className="w-full bg-[#F7F5F0] border border-[#E6E1D9] px-3.5 py-2.5 text-xs text-[#292D32] focus:outline-none focus:border-[#292D32]"
                  />
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#737D87] font-medium block mb-1.5">
                    Phone / Mobile Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="0300-1234567"
                    className="w-full bg-[#F7F5F0] border border-[#E6E1D9] px-3.5 py-2.5 text-xs text-[#292D32] focus:outline-none focus:border-[#292D32]"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Shipping Address */}
            <div className="bg-white p-6 sm:p-8 border border-[#E6E1D9] shadow-xs">
              <div className="flex items-center gap-3 pb-4 mb-6 border-b border-[#E6E1D9]">
                <div className="w-6 h-6 rounded-full bg-[#292D32] text-white flex items-center justify-center text-xs font-semibold">
                  2
                </div>
                <h3 className="font-serif text-lg text-[#292D32]">
                  Shipping Destination
                </h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#737D87] font-medium block mb-1.5">
                    Street Address & Apartment / Suite *
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="House / Apartment #, Street, Sector or Area"
                    className="w-full bg-[#F7F5F0] border border-[#E6E1D9] px-3.5 py-2.5 text-xs text-[#292D32] focus:outline-none focus:border-[#292D32]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#737D87] font-medium block mb-1.5">
                      City *
                    </label>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full bg-[#F7F5F0] border border-[#E6E1D9] px-3.5 py-2.5 text-xs text-[#292D32] focus:outline-none focus:border-[#292D32]"
                    >
                      {MAJOR_CITIES.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-[#737D87] font-medium block mb-1.5">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      placeholder="e.g. 44000"
                      className="w-full bg-[#F7F5F0] border border-[#E6E1D9] px-3.5 py-2.5 text-xs text-[#292D32] focus:outline-none focus:border-[#292D32]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#737D87] font-medium block mb-1.5">
                    Special Delivery Instructions (Optional)
                  </label>
                  <textarea
                    name="notes"
                    rows={2}
                    value={formData.notes}
                    onChange={handleChange}
                    placeholder="e.g. Ring the bell twice or leave with security"
                    className="w-full bg-[#F7F5F0] border border-[#E6E1D9] px-3.5 py-2.5 text-xs text-[#292D32] focus:outline-none focus:border-[#292D32]"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Payment Method */}
            <div className="bg-white p-6 sm:p-8 border border-[#E6E1D9] shadow-xs">
              <div className="flex items-center gap-3 pb-4 mb-6 border-b border-[#E6E1D9]">
                <div className="w-6 h-6 rounded-full bg-[#292D32] text-white flex items-center justify-center text-xs font-semibold">
                  3
                </div>
                <h3 className="font-serif text-lg text-[#292D32]">
                  Payment Preference
                </h3>
              </div>

              <div className="space-y-4">
                {/* Cash on Delivery */}
                <label
                  className={`flex items-start gap-4 p-4 border cursor-pointer transition-all ${
                    paymentMethod === "cod"
                      ? "border-[#292D32] bg-[#F7F5F0]"
                      : "border-[#E6E1D9] bg-white hover:border-[#292D32]"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                    className="mt-1 accent-[#292D32]"
                  />
                  <div>
                    <h4 className="font-semibold text-xs text-[#292D32] flex items-center gap-2">
                      Cash on Delivery (COD)
                    </h4>
                    <p className="text-xs text-[#737D87] mt-1">
                      Pay securely with cash upon delivery at your doorstep anywhere in Pakistan.
                    </p>
                  </div>
                </label>

                {/* Card Payment (UI Demo) */}
                <label
                  className={`flex items-start gap-4 p-4 border cursor-pointer transition-all ${
                    paymentMethod === "card"
                      ? "border-[#292D32] bg-[#F7F5F0]"
                      : "border-[#E6E1D9] bg-white hover:border-[#292D32]"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                    className="mt-1 accent-[#292D32]"
                  />
                  <div className="w-full">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-xs text-[#292D32] flex items-center gap-2">
                        Debit / Credit Card (UI Simulation)
                      </h4>
                      <CreditCard className="w-4 h-4 text-[#737D87]" />
                    </div>
                    <p className="text-xs text-[#737D87] mt-1">
                      Safe simulated transaction. No actual monetary charge will take place.
                    </p>

                    {paymentMethod === "card" && (
                      <div className="mt-4 pt-4 border-t border-[#E6E1D9] space-y-3">
                        <div>
                          <label className="text-[10px] uppercase tracking-wider text-[#737D87] block mb-1">
                            Card Number
                          </label>
                          <input
                            type="text"
                            placeholder="4000 1234 5678 9010"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                            className="w-full bg-white border border-[#E6E1D9] px-3 py-2 text-xs focus:outline-none focus:border-[#292D32]"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="text-[10px] uppercase tracking-wider text-[#737D87] block mb-1">
                              Expiry (MM/YY)
                            </label>
                            <input
                              type="text"
                              placeholder="12/28"
                              value={cardExpiry}
                              onChange={(e) => setCardExpiry(e.target.value)}
                              className="w-full bg-white border border-[#E6E1D9] px-3 py-2 text-xs focus:outline-none focus:border-[#292D32]"
                            />
                          </div>
                          <div>
                            <label className="text-[10px] uppercase tracking-wider text-[#737D87] block mb-1">
                              CVV
                            </label>
                            <input
                              type="password"
                              placeholder="•••"
                              maxLength={4}
                              value={cardCvv}
                              onChange={(e) => setCardCvv(e.target.value)}
                              className="w-full bg-white border border-[#E6E1D9] px-3 py-2 text-xs focus:outline-none focus:border-[#292D32]"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Order Review Sidebar (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 border border-[#E6E1D9] shadow-xs space-y-6 sticky top-28">
              <h3 className="font-serif text-xl text-[#292D32] pb-4 border-b border-[#E6E1D9]">
                Review Your Order ({items.length} {items.length === 1 ? "piece" : "pieces"})
              </h3>

              {/* Items Mini List */}
              <div className="max-h-64 overflow-y-auto divide-y divide-[#E6E1D9] pr-2">
                {items.map((item) => (
                  <div key={item.id} className="py-3 flex items-center gap-3">
                    <div className="relative w-12 h-16 bg-[#EEEAE2] shrink-0 border border-[#E6E1D9]">
                      <Image
                        src={item.product.images[0]}
                        alt={item.product.name}
                        fill
                        sizes="50px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xs font-medium text-[#292D32] line-clamp-1">
                        {item.product.name}
                      </h4>
                      <p className="text-[11px] text-[#737D87]">
                        {item.selectedColor} · Size {item.selectedSize} · Qty {item.quantity}
                      </p>
                      <span className="text-xs font-semibold text-[#292D32]">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Calculation */}
              <div className="space-y-3 pt-4 border-t border-[#E6E1D9] text-xs">
                <div className="flex justify-between text-[#737D87]">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#292D32]">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-[#737D87]">
                  <span>Insured Express Shipping</span>
                  <span className="font-medium text-[#292D32]">
                    {shippingFee === 0 ? "Complimentary" : formatPrice(shippingFee)}
                  </span>
                </div>
                <div className="pt-3 border-t border-[#E6E1D9] flex justify-between items-baseline text-sm font-semibold text-[#292D32]">
                  <span>Grand Total</span>
                  <span className="font-serif text-2xl font-normal text-[#292D32]">
                    {formatPrice(finalTotal)}
                  </span>
                </div>
              </div>

              {/* Place Order CTA */}
              <button
                type="submit"
                disabled={isSubmitting || items.length === 0}
                className="w-full bg-[#292D32] hover:bg-[#3E4349] disabled:opacity-50 text-[#F7F5F0] py-4 text-xs uppercase tracking-[0.18em] font-semibold flex items-center justify-center gap-2 transition-all shadow-md"
              >
                {isSubmitting ? "Confirming Order..." : "Confirm & Place Order"}
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-wider text-[#737D87] pt-2 border-t border-[#E6E1D9]">
                <Lock className="w-3.5 h-3.5 text-[#3E6B48]" />
                Zero Backend Overhead · 100% Privacy Protected
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
