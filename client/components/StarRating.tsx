import { Star } from "lucide-react";

interface StarRatingProps {
  value: number; 
  max?: number; 
}

export default function StarRating({ value, max = 5 }: StarRatingProps) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: max }, (_, i) => {
        const starValue = i + 1;

        if (value >= starValue) {
          // full star
          return <Star key={i} className="w-4 h-4 text-[#2563EB] fill-[#2563EB]" />;
        } else if (value >= starValue - 0.5) {
          // half star (trick: overlay fill on half)
          return (
            <div key={i} className="relative w-5 h-5">
              <Star className="absolute w-4 h-4 text-[#2563EB]" style={{ clipPath: "inset(0 50% 0 0)" }} />
              <Star className="absolute w-4 h-4 text-gray-300" />
            </div>
          );
        } else {
          // empty star
          return <Star key={i} className="w-4 h-4 text-gray-300" />;
        }
      })}
    </div>
  );
}
