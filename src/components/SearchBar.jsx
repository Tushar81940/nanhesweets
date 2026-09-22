import { useState, useEffect, useRef } from "react";
import { Search, X } from "lucide-react";
import { Link } from "react-router-dom";
import { searchProducts } from "../data/products";
import { formatPrice } from "../utils/cart";

/**
 * SearchBar — floating search overlay triggered from the navbar icon.
 * Props:
 *   isOpen   {boolean}
 *   onClose  {fn}
 */
export default function SearchBar({ isOpen, onClose }) {
  const [query, setQuery]     = useState("");
  const [results, setResults] = useState([]);
  const inputRef              = useRef(null);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
      setQuery("");
      setResults([]);
    }
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  function handleChange(e) {
    const val = e.target.value;
    setQuery(val);
    if (val.trim().length >= 1) {
      setResults(searchProducts(val).slice(0, 8));
    } else {
      setResults([]);
    }
  }

  function handleResultClick() {
    onClose();
    setQuery("");
    setResults([]);
  }

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Search panel */}
      <div className="fixed top-0 inset-x-0 z-50 bg-white shadow-xl animate-fade-in-up rounded-b-2xl">
        <div className="max-w-2xl mx-auto px-4 pt-4 pb-5">
          {/* Input row */}
          <div className="flex items-center gap-3 border-b-2 border-[#C9922A] pb-2">
            <Search size={20} className="text-[#C9922A] flex-shrink-0" strokeWidth={2} />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={handleChange}
              placeholder="Search sweets, dairy, snacks…"
              aria-label="Search products"
              className="flex-1 text-base sm:text-lg font-body text-[#3D1A0A] placeholder-[#C4A882]
                bg-transparent outline-none"
            />
            <button
              onClick={onClose}
              aria-label="Close search"
              className="p-1 text-[#9A6C4A] hover:text-[#3D1A0A] transition-colors"
            >
              <X size={20} strokeWidth={2} />
            </button>
          </div>

          {/* Results */}
          {query.trim() && (
            <ul className="mt-3 max-h-72 overflow-y-auto divide-y divide-[#FAF0E0]" role="listbox">
              {results.length > 0 ? (
                results.map((p) => (
                  <li key={p.id} role="option">
                    <Link
                      to={`/products/${p.category}`}
                      onClick={handleResultClick}
                      className="flex items-center gap-3 py-2.5 px-1 hover:bg-[#FAF6F0] rounded-lg transition-colors"
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-10 h-10 rounded-lg object-cover flex-shrink-0 bg-[#FAF6F0]"
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=80&q=50";
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-display font-semibold text-[#3D1A0A] text-sm truncate">
                          {p.name}
                        </p>
                        <p className="text-[#9A6C4A] text-xs capitalize">{p.category}</p>
                      </div>
                      <span className="font-body font-semibold text-[#5C2D0E] text-sm flex-shrink-0">
                        {formatPrice(p.price)}
                        <span className="text-[#9A6C4A] font-normal text-xs"> /{p.unit}</span>
                      </span>
                    </Link>
                  </li>
                ))
              ) : (
                <li className="py-6 text-center text-[#9A6C4A] font-body text-sm">
                  No delicious matches found 😋
                  <br />
                  <span className="text-xs">Try "rasmalai", "milk", or "sev"</span>
                </li>
              )}
            </ul>
          )}

          {!query.trim() && (
            <p className="mt-3 text-center text-[#C4A882] text-sm font-body">
              Start typing to search our products
            </p>
          )}
        </div>
      </div>
    </>
  );
}
