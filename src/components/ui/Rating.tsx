import React from "react";
import { Star } from "lucide-react";

interface RatingProps {
  rating: number;
  reviews?: number;
  showCount?: boolean;
  size?: "sm" | "md";
}

export default function Rating({ rating, reviews, showCount = true, size = "sm" }: RatingProps) {
  const iconSize = size === "sm" ? "w-3 h-3" : "w-4 h-4";

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center text-[#A99B8A]">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${iconSize} ${
              star <= Math.round(rating)
                ? "fill-[#A99B8A] text-[#A99B8A]"
                : "text-[#E6E1D9] fill-none"
            }`}
          />
        ))}
      </div>
      {showCount && (
        <span className="text-[11px] text-[#737D87] font-sans">
          {rating.toFixed(1)} {reviews !== undefined && `(${reviews})`}
        </span>
      )}
    </div>
  );
}
