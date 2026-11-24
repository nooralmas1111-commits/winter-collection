"use client";

import React, { useState } from "react";
import { X, Lock, Mail, User, Phone, Sparkles } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AuthModal() {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authModalMode,
    setAuthModalMode,
    login,
    register,
  } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (authModalMode === "login") {
      await login(email, password);
    } else {
      await register(name, email, password, phone);
    }

    setIsSubmitting(false);
  };

  const fillAdminDemo = () => {
    setEmail("admin@frostandflair.pk");
    setPassword("AdminPassword2026!");
    setAuthModalMode("login");
  };

  const fillCustomerDemo = () => {
    setEmail("amina@example.com");
    setPassword("CustomerPassword123!");
    setAuthModalMode("login");
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#292D32]/60 backdrop-blur-sm transition-opacity"
        onClick={closeAuthModal}
      />

      {/* Modal Card */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="relative w-full max-w-md bg-[#F7F5F0] border border-[#E6E1D9] p-6 sm:p-8 shadow-2xl z-10 animate-in fade-in zoom-in-95 duration-200">
          <button
            onClick={closeAuthModal}
            className="absolute top-5 right-5 p-1 text-[#737D87] hover:text-[#292D32] transition-colors"
          >
            <X className="w-5 h-5 stroke-[1.5]" />
          </button>

          {/* Modal Header */}
          <div className="text-center mb-6">
            <span className="text-[10px] uppercase tracking-[0.24em] font-semibold text-[#A99B8A] block mb-1">
              FROST & FLAIR ATELIER
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#292D32]">
              {authModalMode === "login" ? "Client Sign In" : "Create Private Account"}
            </h2>
            <p className="text-xs text-[#737D87] mt-1 font-light">
              {authModalMode === "login"
                ? "Access saved measurements, winter orders, and wishlist."
                : "Join our private winter client circle for privileged seasonal dispatches."}
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex border-b border-[#E6E1D9] mb-6 text-xs uppercase tracking-wider font-semibold">
            <button
              onClick={() => setAuthModalMode("login")}
              className={`flex-1 pb-3 text-center border-b-2 transition-all ${
                authModalMode === "login"
                  ? "border-[#292D32] text-[#292D32]"
                  : "border-transparent text-[#737D87] hover:text-[#292D32]"
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setAuthModalMode("register")}
              className={`flex-1 pb-3 text-center border-b-2 transition-all ${
                authModalMode === "register"
                  ? "border-[#292D32] text-[#292D32]"
                  : "border-transparent text-[#737D87] hover:text-[#292D32]"
              }`}
            >
              Register
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {authModalMode === "register" && (
              <>
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#737D87] font-medium block mb-1">
                    Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#737D87] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Amina Tariq"
                      className="w-full bg-white border border-[#E6E1D9] pl-9 pr-3 py-2.5 text-xs text-[#292D32] focus:outline-none focus:border-[#292D32]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-[#737D87] font-medium block mb-1">
                    Phone (Optional)
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#737D87] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="0300-1234567"
                      className="w-full bg-white border border-[#E6E1D9] pl-9 pr-3 py-2.5 text-xs text-[#292D32] focus:outline-none focus:border-[#292D32]"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="text-[11px] uppercase tracking-wider text-[#737D87] font-medium block mb-1">
                Email Address *
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#737D87] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full bg-white border border-[#E6E1D9] pl-9 pr-3 py-2.5 text-xs text-[#292D32] focus:outline-none focus:border-[#292D32]"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] uppercase tracking-wider text-[#737D87] font-medium block mb-1">
                Password *
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#737D87] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white border border-[#E6E1D9] pl-9 pr-3 py-2.5 text-xs text-[#292D32] focus:outline-none focus:border-[#292D32]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#292D32] hover:bg-[#3E4349] text-[#F7F5F0] py-3 text-xs uppercase tracking-[0.18em] font-semibold transition-all mt-4 disabled:opacity-50"
            >
              {isSubmitting
                ? "Processing..."
                : authModalMode === "login"
                ? "Sign In to Account"
                : "Create Private Account"}
            </button>
          </form>

          {/* Quick Demo Fill Buttons for Testing */}
          <div className="mt-6 pt-4 border-t border-[#E6E1D9] space-y-2 text-[11px]">
            <p className="text-[#737D87] text-center mb-2 font-medium">
              Demo Credentials Auto-fill:
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={fillAdminDemo}
                className="bg-[#EEEAE2] hover:bg-[#D8C8B3] text-[#292D32] py-1.5 px-2 border border-[#E6E1D9] transition-colors font-medium text-center truncate"
              >
                Fill Admin Demo
              </button>
              <button
                type="button"
                onClick={fillCustomerDemo}
                className="bg-[#EEEAE2] hover:bg-[#D8C8B3] text-[#292D32] py-1.5 px-2 border border-[#E6E1D9] transition-colors font-medium text-center truncate"
              >
                Fill Customer Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
