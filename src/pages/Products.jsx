import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { products, categoryMeta, CATEGORIES } from "../data/products";
import ProductCard from "../components/ProductCard";
import SectionHeading from "../components/SectionHeading";

const SORT_OPTIONS = [
  { value: "default",    label: "Default"         },
  { value: "price-asc",  label: "Price: Low → High" },
  { value: "price-desc", label: "Price: High → Low" },
  { value: "name-asc",   label: "Name: A → Z"     },
];

const ALL_FILTER = { slug: "all", label: "All", emoji: "✨" };
const FILTER_TABS = [ALL_FILTER, ...categoryMeta];

export default function Products() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [query, setQuery]                   = useState("");
  const [sort, setSort]                     = useState("default");
  const [filtersOpen, setFiltersOpen]       = useState(false);

  const filtered = useMemo(() => {
    let list = products;

    // Category filter
    if (activeCategory !== "all") {
      list = list.filter((p) => p.category === activeCategory);
    }

    // Search filter
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // Sort
    const sorted = [...list];
    if (sort === "price-asc")  sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    if (sort === "name-asc")   sorted.sort((a, b) => a.name.localeCompare(b.name));

    return sorted;
  }, [activeCategory, query, sort]);

  function clearFilters() {
    setActiveCategory("all");
    setQuery("");
    setSort("default");
  }

  const hasFilters = activeCategory !== "all" || query.trim() || sort !== "default";

  return (
    <main className="min-h-screen bg-[#FFFBF5]">
      {/* ── Page header ── */}
      <div className="bg-[#3D1A0A] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[#D4A96A] text-xs uppercase tracking-[0.2em] font-semibold font-body mb-3 block">
            Our Collection
          </span>
          <h1 className="font-display font-bold text-white text-3xl sm:text-4xl lg:text-5xl mb-3">
            All Products
          </h1>
          <p className="text-[#C4A882] font-body text-sm sm:text-base max-w-md mx-auto">
            Sweets, dairy and snacks — crafted fresh with traditional recipes.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">

        {/* ── Filter / Search bar ── */}
        <div className="flex flex-col gap-4 mb-8">

          {/* Category tabs */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none -mx-1 px-1">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab.slug}
                onClick={() => setActiveCategory(tab.slug)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold font-body
                  whitespace-nowrap border transition-all flex-shrink-0
                  ${activeCategory === tab.slug
                    ? "bg-[#5C2D0E] text-white border-[#5C2D0E]"
                    : "bg-white text-[#7A3B15] border-[#EDE4D3] hover:border-[#C9922A] hover:text-[#5C2D0E]"}`}
              >
                <span>{tab.emoji}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search + sort row — search full-width on mobile */}
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
            {/* Search — always full width on mobile */}
            <div className="relative w-full sm:flex-1">
              <Search
                size={16}
                strokeWidth={2}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#C9922A] pointer-events-none"
              />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products…"
                aria-label="Search products"
                className="w-full pl-9 pr-4 py-3 rounded-xl border-2 border-[#D4A96A] bg-white
                  text-[#3D1A0A] text-base font-body placeholder-[#B8956A]
                  focus:outline-none focus:border-[#C9922A] focus:ring-2 focus:ring-[#C9922A]/20
                  transition-colors"
              />
            </div>

            {/* Sort + Clear — side by side on mobile too */}
            <div className="flex gap-2 sm:gap-3 sm:flex-shrink-0">
              {/* Sort */}
              <div className="relative flex-1 sm:flex-shrink-0 sm:flex-auto">
                <SlidersHorizontal
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#C9922A] pointer-events-none"
                />
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  aria-label="Sort products"
                  className="w-full pl-8 pr-8 py-3 rounded-xl border-2 border-[#D4A96A] bg-white
                    text-[#3D1A0A] text-sm font-body
                    focus:outline-none focus:border-[#C9922A]
                    appearance-none cursor-pointer transition-colors"
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              </div>

              {/* Clear filters */}
              {hasFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-1.5 px-4 py-3 rounded-xl border-2 border-[#EDE4D3]
                    bg-white text-[#9A6C4A] text-sm font-body hover:text-red-500 hover:border-red-200
                    transition-colors flex-shrink-0"
                  aria-label="Clear all filters"
                >
                  <X size={14} strokeWidth={2} />
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Result count */}
          <p className="text-[#9A6C4A] text-sm font-body">
            {filtered.length === 0
              ? "No products found"
              : `Showing ${filtered.length} product${filtered.length !== 1 ? "s" : ""}${
                  activeCategory !== "all" ? ` in ${activeCategory}` : ""
                }`}
          </p>
        </div>

        {/* ── Product grid ── */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-24 gap-4 text-center">
            <div className="text-5xl">😋</div>
            <h3 className="font-display font-bold text-[#3D1A0A] text-xl">
              No delicious matches found
            </h3>
            <p className="text-[#9A6C4A] font-body text-sm max-w-xs">
              Try a different search term or browse a different category.
            </p>
            <button
              onClick={clearFilters}
              className="mt-2 px-5 py-2.5 rounded-xl bg-[#5C2D0E] text-white text-sm font-semibold
                font-body hover:bg-[#3D1A0A] transition-colors"
            >
              Show All Products
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
