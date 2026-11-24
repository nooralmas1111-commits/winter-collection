import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import { SearchProvider } from "@/context/SearchContext";
import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import SearchModal from "@/components/search/SearchModal";
import AuthModal from "@/components/auth/AuthModal";
import { Toaster } from "sonner";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "FROST & FLAIR — Winter, Wrapped in Elegance",
  description:
    "Discover thoughtfully selected layers designed to keep you warm and effortlessly stylish. Scandinavian-inspired winter luxury outerwear, cashmere, and alpaca.",
  keywords: [
    "Winter Fashion",
    "Wool Coats",
    "Cashmere Sweaters",
    "Puffer Jackets",
    "Luxury Winter Apparel",
    "Frost and Flair",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F7F5F0] text-[#292D32] selection:bg-[#D8C8B3] selection:text-[#292D32]">
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <SearchProvider>
                <AnnouncementBar />
                <Navbar />
                <main className="flex-1">{children}</main>
                <Footer />
                <CartDrawer />
                <SearchModal />
                <AuthModal />
                <Toaster
                  position="top-right"
                  toastOptions={{
                    style: {
                      background: "#292D32",
                      color: "#F7F5F0",
                      border: "1px solid #3E4349",
                      fontFamily: "var(--font-inter), sans-serif",
                      borderRadius: "0px",
                    },
                  }}
                />
              </SearchProvider>
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
