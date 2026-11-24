"use client";

import React, { useState } from "react";
import { Mail, Check, Sparkles } from "lucide-react";
import { toast } from "sonner";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setIsSubscribed(true);
    toast.success("Welcome to the Frost & Flair Private Edit", {
      description: "You will receive exclusive winter previews and private sale invitations."
    });
    setEmail("");
  };

  return (
    <section className="py-20 sm:py-28 bg-[#F7F5F0] border-t border-[#E6E1D9]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.24em] font-semibold text-[#A99B8A]">
          <Sparkles className="w-3.5 h-3.5 text-[#D8C8B3]" />
          PRIVATE ATELIER DISPATCH
        </div>

        <h2 className="font-serif text-3xl sm:text-5xl text-[#292D32] font-normal leading-tight">
          Stay Close to the Season.
        </h2>

        <p className="text-xs sm:text-sm text-[#737D87] max-w-lg mx-auto leading-relaxed font-light">
          Be the first to discover new arrivals, exclusive edits, and seasonal winter offers. Receive private member invitations directly to your inbox.
        </p>

        {isSubscribed ? (
          <div className="p-6 bg-[#EEEAE2] border border-[#D8C8B3] max-w-md mx-auto flex items-center justify-center gap-3 text-xs text-[#292D32]">
            <Check className="w-4 h-4 text-[#3E6B48]" />
            <span>Thank you for subscribing. Your private winter lookbook is on its way.</span>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-4"
          >
            <div className="relative flex-1">
              <Mail className="w-4 h-4 text-[#737D87] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                required
                className="w-full bg-[#FFFFFF] border border-[#E6E1D9] pl-10 pr-4 py-3.5 text-xs text-[#292D32] placeholder-[#737D87] focus:outline-none focus:border-[#292D32] transition-colors"
              />
            </div>
            <button
              type="submit"
              className="bg-[#292D32] text-[#F7F5F0] hover:bg-[#3E4349] px-7 py-3.5 text-xs uppercase tracking-[0.18em] font-medium transition-all shadow-sm shrink-0"
            >
              Subscribe
            </button>
          </form>
        )}

        <p className="text-[10px] text-[#737D87] tracking-wider uppercase">
          Zero spam. Unsubscribe at any moment with one click.
        </p>
      </div>
    </section>
  );
}
