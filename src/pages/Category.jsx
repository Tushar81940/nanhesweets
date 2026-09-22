import { useState, useMemo } from "react";
import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, Search } from "lucide-react";
import { getProductsByCategory, categoryMeta } from "../data/products";
import ProductCard from "../components/ProductCard";
import SectionHeading from "../components/SectionHeading";
import WhatsAppButton from "../components/WhatsAppButton";

export default function Category() {
  const { slug }  = useParams();
  const [query, setQuery] = useState("");

  // Find category meta
  const meta = categoryMeta.find((c) => c.slug === slug);

  // Redirect to /products if slug is invalid
  if (!meta) return <Navigate to="/products" replace />;

  const allProducts = getProductsByCategory(slug);

  const filtered = useMemo(() => {
    if (!query.trim()) return allProducts;
    const q = query.toLowerCase();
    return allProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }, [allProducts, query]);

  return (
    <main className="min-h-screen bg-[#FFFBF5]">
      {/* ── Hero banner ── */}
      <section
        className="relative py-16 sm:py-20 overflow-hidden"
        aria-label={`${meta.label} category`}
      >
        {/* BG image */}
        <div className="absolute inset-0 z-0">
          <img
            src={meta.image}
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#2A0E02]/90 via-[#3D1A0A]/75 to-[#3D1A0A]/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-[#D4A96A] text-sm font-body
              hover:text-white transition-colors mb-6"
          >
            <ArrowLeft size={15} strokeWidth={2} />
            All Products
          </Link>

          {/* Heading */}
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl drop-shadow-lg" aria-hidden="true">{meta.emoji}</span>
            <div>
              <span className="text-[#D4A96A] text-xs uppercase tracking-[0.2em] font-semibold font-body block mb-1">
                Category
              </span>
              <h1 className="font-display font-bold text-white text-3xl sm:text-4xl lg:text-5xl">
                {meta.label}
              </h1>
            </div>
          </div>
          <p className="text-[#C4A882] font-body text-sm sm:text-base max-w-lg mb-6">
            {meta.description}
          </p>
          <WhatsAppButton label={`Order ${meta.label} on WhatsApp`} size="md" />
        </div>
      </section>

      {/* ── Product grid ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">

        {/* Search */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="relative max-w-xs w-full">
            <Search
              size={15}
              strokeWidth={2}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#C9922A] pointer-events-none"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={`Search ${meta.label.toLowerCase()}…`}
              aria-label={`Search ${meta.label}`}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#EDE4D3] bg-white
                text-[#3D1A0A] text-sm font-body placeholder-[#C4A882]
                focus:outline-none focus:border-[#C9922A] focus:ring-1 focus:ring-[#C9922A]/30"
            />
          </div>
          <p className="text-[#9A6C4A] text-sm font-body flex-shrink-0">
            {filtered.length} item{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>

        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-center">
            <div className="text-5xl">😋</div>
            <h3 className="font-display font-bold text-[#3D1A0A] text-xl">No matches found</h3>
            <p className="text-[#9A6C4A] font-body text-sm">Try a different search term.</p>
            <button
              onClick={() => setQuery("")}
              className="mt-2 px-5 py-2.5 rounded-xl bg-[#5C2D0E] text-white text-sm font-semibold
                font-body hover:bg-[#3D1A0A] transition-colors"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Other categories */}
        <div className="mt-14 pt-10 border-t border-[#EDE4D3]">
          <p className="text-[#9A6C4A] text-xs uppercase tracking-widest font-semibold font-body mb-5 text-center">
            Also explore
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {categoryMeta
              .filter((c) => c.slug !== slug)
              .map((c) => (
                <Link
                  key={c.slug}
                  to={`/products/${c.slug}`}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#EDE4D3]
                    bg-white text-[#5C2D0E] text-sm font-semibold font-body
                    hover:bg-[#FAF0E0] hover:border-[#C9922A] transition-all"
                >
                  <span>{c.emoji}</span>
                  {c.label}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </main>
  );
}
