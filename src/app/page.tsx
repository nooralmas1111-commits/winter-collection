import React from "react";
import HeroSection from "@/components/home/HeroSection";
import CategoryCards from "@/components/home/CategoryCards";
import EditorialBanner from "@/components/home/EditorialBanner";
import TrendingSection from "@/components/home/TrendingSection";
import WinterSaleBanner from "@/components/home/WinterSaleBanner";
import WinterEssentialsGrid from "@/components/home/WinterEssentialsGrid";
import BestSellersSection from "@/components/home/BestSellersSection";
import ShopTheLookSection from "@/components/home/ShopTheLookSection";
import KidsSection from "@/components/home/KidsSection";
import BrandEditorial from "@/components/home/BrandEditorial";
import ReviewsSection from "@/components/home/ReviewsSection";
import NewsletterSection from "@/components/home/NewsletterSection";
import { getProducts } from "@/services/productService";

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="flex flex-col w-full">
      {/* SECTION 1: HERO / WINTER CAMPAIGN */}
      <HeroSection />

      {/* SECTION 2: SHOP BY CATEGORY */}
      <CategoryCards />

      {/* SECTION 3: NEW SEASON / EDITORIAL BANNER */}
      <EditorialBanner />

      {/* SECTION 4: TRENDING COLLECTION */}
      <TrendingSection products={products} />

      {/* SECTION 5: WINTER SALE CAMPAIGN */}
      <WinterSaleBanner />

      {/* SECTION 6: SHOP BY CATEGORY / WINTER ESSENTIALS */}
      <WinterEssentialsGrid />

      {/* SECTION 7: BEST SELLERS */}
      <BestSellersSection products={products} />

      {/* SECTION 8: SHOP THE LOOK */}
      <ShopTheLookSection />

      {/* SECTION 9: KIDS WINTER COLLECTION */}
      <KidsSection products={products} />

      {/* SECTION 10: BRAND EDITORIAL / LIFESTYLE */}
      <BrandEditorial />

      {/* SECTION 11: CUSTOMER REVIEWS */}
      <ReviewsSection />

      {/* SECTION 12: NEWSLETTER */}
      <NewsletterSection />
    </div>
  );
}
