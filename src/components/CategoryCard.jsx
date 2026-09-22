import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

/**
 * CategoryCard — links to /products/:slug
 */
export default function CategoryCard({ category }) {
  return (
    <Link
      to={`/products/${category.slug}`}
      className="group relative overflow-hidden rounded-2xl flex flex-col bg-white
        border border-[#EDE4D3] card-hover shadow-[0_2px_8px_rgba(58,26,10,0.08)]
        focus-visible:ring-2 focus-visible:ring-[#C9922A]"
      aria-label={`Browse ${category.label}`}
    >
      {/* Image */}
      <div className="img-zoom h-48 sm:h-52 w-full overflow-hidden bg-[#FAF6F0]">
        <img
          src={category.image}
          alt={category.label}
          loading="lazy"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src =
              "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=60";
          }}
        />
      </div>

      {/* Gradient overlay at bottom of image */}
      <div className="absolute inset-x-0 top-0 h-48 sm:h-52 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />

      {/* Emoji floating on image */}
      <span
        className="absolute top-4 right-4 text-3xl drop-shadow-md select-none"
        aria-hidden="true"
      >
        {category.emoji}
      </span>

      {/* Content */}
      <div className="p-5 flex flex-col gap-2 flex-1">
        <h3 className="font-display text-xl font-bold text-[#3D1A0A] group-hover:text-[#5C2D0E] transition-colors">
          {category.label}
        </h3>
        <p className="text-[#7A3B15] text-sm font-body leading-relaxed line-clamp-2 flex-1">
          {category.description}
        </p>
        <div className="flex items-center gap-1 text-[#C9922A] text-sm font-semibold mt-2 group-hover:gap-2 transition-all">
          Explore {category.label}
          <ArrowRight size={15} strokeWidth={2.5} className="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </Link>
  );
}
