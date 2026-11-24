import React from "react";
import { TESTIMONIALS } from "@/data/testimonials";
import Rating from "@/components/ui/Rating";
import { CheckCircle2, Quote } from "lucide-react";

export default function ReviewsSection() {
  return (
    <section className="py-20 sm:py-28 bg-[#EEEAE2]/60 border-t border-[#E6E1D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-[11px] uppercase tracking-[0.24em] font-semibold text-[#A99B8A] block mb-2">
            VOICES OF ELEGANCE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#292D32]">
            What Our Patrons Say
          </h2>
          <p className="text-xs sm:text-sm text-[#737D87] mt-3 font-light">
            Genuine experiences from clients across Pakistan and abroad wearing FROST & FLAIR in sub-zero winters.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {TESTIMONIALS.slice(0, 3).map((review) => (
            <div
              key={review.id}
              className="bg-[#FFFFFF] border border-[#E6E1D9] p-6 sm:p-8 flex flex-col justify-between shadow-xs transition-all duration-300 hover:border-[#D8C8B3] hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Rating rating={review.rating} showCount={false} />
                  <Quote className="w-5 h-5 text-[#D8C8B3]" />
                </div>

                <p className="text-xs sm:text-sm text-[#292D32] font-light leading-relaxed italic mb-6">
                  &ldquo;{review.comment}&rdquo;
                </p>
              </div>

              <div className="pt-4 border-t border-[#E6E1D9]/60">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-semibold text-[#292D32]">
                      {review.name}
                    </h4>
                    <span className="text-[11px] text-[#737D87]">
                      {review.location}
                    </span>
                  </div>

                  {review.verified && (
                    <span className="inline-flex items-center gap-1 text-[10px] text-[#3E6B48] font-medium bg-[#3E6B48]/10 px-2 py-0.5">
                      <CheckCircle2 className="w-3 h-3" /> Verified Buyer
                    </span>
                  )}
                </div>

                <p className="text-[10px] text-[#A99B8A] mt-2 uppercase tracking-wider">
                  Purchased: {review.productPurchased}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
