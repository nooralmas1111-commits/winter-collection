import React from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Globe, Shield, Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#292D32] text-[#F7F5F0] pt-16 pb-12 border-t border-[#3E4349]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-[#3E4349]">
          {/* Brand Column (Span 2) */}
          <div className="lg:col-span-2 space-y-4 pr-0 lg:pr-8">
            <Link href="/" className="inline-block">
              <span className="font-serif text-2xl tracking-[0.2em] uppercase text-[#F7F5F0] block">
                FROST & FLAIR
              </span>
              <span className="block text-[10px] uppercase tracking-[0.3em] text-[#D8C8B3] font-sans mt-0.5">
                Winter, Wrapped in Elegance
              </span>
            </Link>

            <p className="text-xs sm:text-sm text-[#737D87] leading-relaxed max-w-sm">
              An architectural winter apparel atelier celebrating quiet luxury, Peruvian baby alpaca, certified goose down, and Italian virgin wool. Designed for warmth, crafted for eternity.
            </p>

            <div className="pt-2 flex items-center space-x-4 text-xs text-[#D8C8B3]">
              <span className="flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-[#A99B8A]" /> 100% Traceable Fibres
              </span>
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#A99B8A]" /> Certified RDS Down
              </span>
            </div>
          </div>

          {/* Shop Column */}
          <div className="space-y-3">
            <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#D8C8B3]">
              Collections
            </p>
            <ul className="space-y-2 text-xs text-[#737D87]">
              <li>
                <Link href="/women" className="hover:text-[#F7F5F0] transition-colors">
                  Women&apos;s Outerwear
                </Link>
              </li>
              <li>
                <Link href="/men" className="hover:text-[#F7F5F0] transition-colors">
                  Men&apos;s Tailoring & Bombers
                </Link>
              </li>
              <li>
                <Link href="/kids" className="hover:text-[#F7F5F0] transition-colors">
                  Kids Winter Wear
                </Link>
              </li>
              <li>
                <Link href="/accessories" className="hover:text-[#F7F5F0] transition-colors">
                  Cashmere Scarves & Gloves
                </Link>
              </li>
              <li>
                <Link href="/shop" className="hover:text-[#F7F5F0] transition-colors">
                  All Winter Pieces
                </Link>
              </li>
              <li>
                <Link href="/shop?sale=true" className="hover:text-[#D8C8B3] transition-colors text-[#D8C8B3]">
                  Winter Sale (Up to 50%)
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-3">
            <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#D8C8B3]">
              Client Concierge
            </p>
            <ul className="space-y-2 text-xs text-[#737D87]">
              <li>
                <span className="hover:text-[#F7F5F0] cursor-pointer transition-colors">
                  Complimentary Shipping
                </span>
              </li>
              <li>
                <span className="hover:text-[#F7F5F0] cursor-pointer transition-colors">
                  14-Day Winter Exchanges
                </span>
              </li>
              <li>
                <span className="hover:text-[#F7F5F0] cursor-pointer transition-colors">
                  Garment & Wool Care Guide
                </span>
              </li>
              <li>
                <span className="hover:text-[#F7F5F0] cursor-pointer transition-colors">
                  Bespoke Sizing Consultation
                </span>
              </li>
              <li>
                <Link href="/wishlist" className="hover:text-[#F7F5F0] transition-colors">
                  Saved Wishlist
                </Link>
              </li>
            </ul>
          </div>

          {/* Boutiques & Contact */}
          <div className="space-y-3">
            <p className="text-[11px] uppercase tracking-[0.2em] font-semibold text-[#D8C8B3]">
              Ateliers & Contact
            </p>
            <div className="space-y-2 text-xs text-[#737D87]">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 mt-0.5 text-[#A99B8A] shrink-0" />
                <span>Beverly Centre, Blue Area, Islamabad</span>
              </p>
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 mt-0.5 text-[#A99B8A] shrink-0" />
                <span>Gulberg Galleria, MM Alam, Lahore</span>
              </p>
              <p className="flex items-center gap-2 pt-1">
                <Phone className="w-3.5 h-3.5 text-[#A99B8A] shrink-0" />
                <span>+92 (051) 844-3767</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#A99B8A] shrink-0" />
                <span>concierge@frostandflair.pk</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#737D87] space-y-4 sm:space-y-0">
          <p>© 2026 FROST & FLAIR. All Rights Reserved. Minimalist Winter Luxury.</p>
          <div className="flex space-x-6">
            <span className="hover:text-[#F7F5F0] cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-[#F7F5F0] cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-[#F7F5F0] cursor-pointer transition-colors">Ethics & Sustainability</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
