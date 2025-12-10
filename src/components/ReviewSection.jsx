import { Star, Quote } from "lucide-react";
import { useState } from "react";

export default function ReviewSection({ reviews }) {
  if (!reviews || reviews.length === 0) return null;

  const gridCols =
    reviews.length <= 2
      ? "sm:grid-cols-1 md:grid-cols-2"
      : reviews.length <= 4
      ? "sm:grid-cols-2 md:grid-cols-3"
      : "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4";

  return (
    <section className="py-24 bg-[#faf9f7]">
      <h2 className="text-center text-4xl font-light tracking-[0.12em] text-[#1a1a1a] mb-16 uppercase">
        Customer Reviews
      </h2>

      <div
        className={`max-w-7xl mx-auto grid ${gridCols} gap-10 px-6 transition-all duration-300`}
      >
        {reviews.map((r) => (
          <ReviewCard key={r.id} r={r} />
        ))}
      </div>
    </section>
  );
}

function ReviewCard({ r }) {
  const [expanded, setExpanded] = useState(false);
  const hasLongText = r.comment.length > 180;

  return (
    <div
      className="relative bg-white border border-[#e8e6e1] rounded-3xl px-8 py-10 
      shadow-sm hover:shadow-[0_10px_35px_rgba(0,0,0,0.08)] 
      transition-all duration-300 group overflow-hidden"
    >
      {/* Quote icon */}
      <Quote
        size={110}
        className="absolute -top-4 -right-1 text-[#eeeae4] opacity-60"
      />

      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src={r.avatar || `https://i.pravatar.cc/150?u=${r.reviewerEmail}`}
          className="w-14 h-14 rounded-full object-cover border border-[#e7e4df]"
        />

        <div>
          <h4 className="font-medium text-[#1a1a1a] text-lg">{r.reviewerName}</h4>

          <div className="flex gap-1 mt-1">
            {Array(5)
              .fill(0)
              .map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={`${
                    i < r.rating
                      ? "text-[#d1a854] fill-[#d1a854]"
                      : "text-gray-300"
                  }`}
                />
              ))}
          </div>
        </div>
      </div>

      {/* Comment */}
      <p className="text-[#4f4e4c] leading-relaxed text-[15px]">
        {expanded || !hasLongText
          ? r.comment
          : r.comment.slice(0, 180) + "..."}
      </p>

      {hasLongText && (
        <button
          className="mt-2 text-sm text-[#d1a854] hover:underline"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "Thu gọn" : "Xem thêm"}
        </button>
      )}

      {/* Review Images */}
      {r.images && r.images.length > 0 && (
        <div className="grid grid-cols-2 gap-3 mt-6">
          {r.images.slice(0, 2).map((img, i) => (
            <div
              key={i}
              className="aspect-square rounded-xl overflow-hidden border border-[#eceae6] cursor-pointer group"
            >
              <img
                src={img}
                className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
              />
            </div>
          ))}
        </div>
      )}

      {/* Bottom line */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#d1a854] to-transparent opacity-40"></div>
    </div>
  );
}
