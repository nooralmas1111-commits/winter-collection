"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { formatPrice } from "@/lib/utils";
import {
  User,
  Package,
  MapPin,
  LogOut,
  ShieldAlert,
  ArrowRight,
  Clock,
  Calendar,
  CheckCircle2,
} from "lucide-react";

export default function AccountPage() {
  const router = useRouter();
  const { user, logout, isLoading, openAuthModal } = useAuth();
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    if (!isLoading && !user) {
      openAuthModal("login");
    }
  }, [user, isLoading]);

  useEffect(() => {
    async function fetchOrders() {
      if (!user) return;
      try {
        const res = await fetch("/api/orders");
        if (res.ok) {
          const data = await res.json();
          setOrders(data.orders || []);
        }
      } catch (e) {
        console.warn("Could not fetch user orders:", e);
      } finally {
        setLoadingOrders(false);
      }
    }
    fetchOrders();
  }, [user]);

  if (isLoading || !user) {
    return (
      <div className="bg-[#F7F5F0] min-h-screen py-24 text-center text-xs text-[#737D87]">
        Loading your private atelier account...
      </div>
    );
  }

  return (
    <div className="bg-[#F7F5F0] min-h-screen py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="border-b border-[#E6E1D9] pb-6 mb-10 flex flex-col sm:flex-row sm:items-baseline justify-between">
          <div>
            <span className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#A99B8A] block mb-1">
              CLIENT CONCIERGE PORTAL
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl text-[#292D32]">
              Welcome, {user.name}
            </h1>
            <p className="text-xs sm:text-sm text-[#737D87] mt-1">
              Account: {user.email} · Role: {user.role}
            </p>
          </div>

          <div className="flex items-center gap-3 mt-4 sm:mt-0">
            {user.role === "ADMIN" && (
              <Link
                href="/admin"
                className="bg-[#292D32] text-white px-4 py-2 text-xs uppercase tracking-wider font-semibold hover:bg-[#3E4349] transition-colors"
              >
                Access Admin Dashboard &rarr;
              </Link>
            )}

            <button
              onClick={logout}
              className="inline-flex items-center gap-1.5 text-xs text-[#737D87] hover:text-[#C26D53] border border-[#E6E1D9] px-3 py-2 bg-white transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" /> Sign Out
            </button>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Profile Overview (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-[#E6E1D9] p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-3 pb-3 border-b border-[#E6E1D9]">
                <div className="w-10 h-10 rounded-full bg-[#EEEAE2] flex items-center justify-center text-[#292D32]">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-xs text-[#292D32]">{user.name}</h3>
                  <span className="text-[11px] text-[#737D87]">{user.email}</span>
                </div>
              </div>

              <div className="space-y-2 text-xs text-[#737D87]">
                <div className="flex justify-between">
                  <span>Phone</span>
                  <span className="text-[#292D32]">{user.phone || "Not recorded"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Membership</span>
                  <span className="text-[#3E6B48] font-semibold">Atelier Circle</span>
                </div>
                <div className="flex justify-between">
                  <span>Privilege Tier</span>
                  <span className="text-[#292D32] font-mono">{user.role}</span>
                </div>
              </div>
            </div>

            <div className="bg-[#EEEAE2] border border-[#E6E1D9] p-6 text-xs text-[#737D87] space-y-2">
              <h4 className="font-serif text-sm font-semibold text-[#292D32]">
                Need Tailoring Assistance?
              </h4>
              <p className="leading-relaxed">
                Our Islamabad & Lahore ateliers provide bespoke alteration consultations for all online orders. Reach out to concierge@frostandflair.pk.
              </p>
            </div>
          </div>

          {/* Past Orders History (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white border border-[#E6E1D9] p-6 sm:p-8 shadow-xs">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#E6E1D9]">
                <h3 className="font-serif text-xl text-[#292D32] flex items-center gap-2">
                  <Package className="w-5 h-5 text-[#A99B8A]" />
                  Your Winter Order History
                </h3>
                <span className="text-xs text-[#737D87]">
                  {orders.length} {orders.length === 1 ? "reservation" : "reservations"}
                </span>
              </div>

              {loadingOrders ? (
                <div className="py-8 text-center text-xs text-[#737D87]">
                  Fetching order records...
                </div>
              ) : orders.length === 0 ? (
                <div className="py-12 text-center text-xs text-[#737D87] space-y-3">
                  <p>You have not placed any orders yet.</p>
                  <Link
                    href="/shop"
                    className="inline-flex items-center gap-1.5 text-[#292D32] font-semibold underline"
                  >
                    Explore Winter Collection &rarr;
                  </Link>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map((order) => (
                    <div
                      key={order.id}
                      className="border border-[#E6E1D9] p-5 bg-[#F7F5F0] space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E6E1D9] pb-3 text-xs">
                        <div>
                          <span className="text-[10px] uppercase tracking-wider text-[#737D87]">
                            Order Number
                          </span>
                          <h4 className="font-mono font-bold text-sm text-[#292D32]">
                            {order.orderNumber}
                          </h4>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 bg-[#3E6B48]/15 text-[#3E6B48]">
                            <CheckCircle2 className="w-3 h-3" />
                            {order.orderStatus}
                          </span>
                          <span className="text-xs text-[#737D87]">
                            {new Date(order.createdAt).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      </div>

                      {/* Items */}
                      <div className="space-y-2 py-2">
                        {order.items?.map((item: any) => (
                          <div
                            key={item.id}
                            className="flex justify-between text-xs text-[#292D32]"
                          >
                            <span>
                              {item.productName} ({item.selectedColor} · Size {item.selectedSize}) × {item.quantity}
                            </span>
                            <span className="font-medium">
                              {formatPrice(Number(item.totalPrice))}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between items-baseline pt-3 border-t border-[#E6E1D9] text-xs">
                        <span className="text-[#737D87]">Total Order Value</span>
                        <span className="font-serif text-base font-semibold text-[#292D32]">
                          {formatPrice(Number(order.totalAmount))}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
