import { useState } from "react";
import { ShoppingCart, Check, Clock } from "lucide-react";
import { useCart, cartKey } from "../context/CartContext";
import { formatPrice, isProductAvailableNow } from "../utils/cart";
import QuantitySelector from "./QuantitySelector";

/**
 * ProductCard — premium product tile with variant selector for sweets.
 * Products with a timeSlot are only orderable within that window.
 */
export default function ProductCard({ product, compact = false }) {
  const { addToCart, increaseQuantity, decreaseQuantity, isInCart, getItem } = useCart();

  const hasVariants = Array.isArray(product.variants) && product.variants.length > 0;

  const [selectedVariant, setSelectedVariant] = useState(
    hasVariants ? product.variants[0] : null
  );

  // ── Time-slot availability ─────────────────────────────
  const timeCheck      = isProductAvailableNow(product);
  const timeAvailable  = timeCheck.available;
  const timeLabel      = timeCheck.label;  // e.g. "7:30 AM – 12:00 PM"
  // Overall availability = product.available AND within time slot
  const canOrder       = product.available && timeAvailable;

  // ── Variant / price ────────────────────────────────────
  const currentPrice = hasVariants
    ? product.price * selectedVariant.multiplier
    : product.price;
  const currentUnit = hasVariants ? selectedVariant.label : product.unit;

  // ── Cart key ───────────────────────────────────────────
  const key    = cartKey(product.id, hasVariants ? selectedVariant.label : null);
  const inCart = isInCart(key);
  const item   = getItem(key);
  const qty    = item?.quantity ?? 0;

  function handleAdd(e) {
    e.preventDefault();
    if (!canOrder) return;
    addToCart(product, 1, hasVariants ? selectedVariant.label : null, currentPrice);
  }

  return (
    <article
      className={`group relative bg-white rounded-2xl overflow-hidden flex flex-col
        border border-[#EDE4D3] card-hover
        ${compact ? "shadow-sm" : "shadow-[0_2px_8px_rgba(58,26,10,0.08)]"}`}
      aria-label={product.name}
    >
      {/* Badge */}
      {product.badge && canOrder && (
        <div className="absolute top-3 left-3 z-10">
          <span className="bg-[#C9922A] text-white text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full">
            {product.badge}
          </span>
        </div>
      )}

      {/* ── Time-slot unavailable overlay ── */}
      {product.timeSlot && !timeAvailable && (
        <div className="absolute inset-0 z-20 bg-white/80 backdrop-blur-[2px] flex flex-col items-center justify-center rounded-2xl gap-2 px-4 text-center">
          <div className="w-11 h-11 rounded-full bg-[#FAF0E0] border border-[#D4A96A] flex items-center justify-center">
            <Clock size={20} className="text-[#C9922A]" strokeWidth={2} />
          </div>
          <p className="font-display font-bold text-[#3D1A0A] text-sm leading-snug">
            {product.name}
          </p>
          <p className="text-[#7A3B15] text-xs font-body leading-snug">
            Available only
          </p>
          <span className="bg-[#3D1A0A] text-[#E8CFA0] text-[11px] font-semibold font-body px-3 py-1 rounded-full">
            {timeLabel}
          </span>
          <p className="text-[#9A6C4A] text-[10px] font-body mt-0.5">
            Come back then to order!
          </p>
        </div>
      )}

      {/* Standard unavailable overlay (not time-based) */}
      {!product.available && !product.timeSlot && (
        <div className="absolute inset-0 z-20 bg-white/70 flex items-center justify-center rounded-2xl">
          <span className="text-[#9A6C4A] font-semibold text-sm bg-[#FAF6F0] px-3 py-1 rounded-full border border-[#D4A96A]">
            Currently Unavailable
          </span>
        </div>
      )}

      {/* Image */}
      <div className={`img-zoom w-full bg-[#FAF6F0] overflow-hidden ${compact ? "h-40" : "h-44 sm:h-48"}`}>
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src =
              "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=60";
          }}
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-3.5 gap-2">
        {/* Category label */}
        <span className="text-[10px] uppercase tracking-widest text-[#C9922A] font-semibold font-body">
          {product.category}
        </span>

        {/* Name */}
        <h3 className={`font-display font-semibold text-[#3D1A0A] leading-snug
          ${compact ? "text-sm" : "text-base"}`}>
          {product.name}
        </h3>

        {/* Description */}
        {!compact && (
          <p className="text-[#7A3B15] text-xs font-body leading-relaxed line-clamp-2">
            {product.description}
          </p>
        )}

        {/* Time slot tag — shown when available, as an info pill */}
        {product.timeSlot && timeAvailable && (
          <div className="flex items-center gap-1 text-[#2A6B5C] bg-[#F0FAF5] border border-[#A3D9C5] rounded-lg px-2 py-1 w-fit">
            <Clock size={10} strokeWidth={2.5} />
            <span className="text-[10px] font-semibold font-body">{timeLabel}</span>
          </div>
        )}

        {/* Variant selector */}
        {hasVariants && (
          <div className="flex flex-wrap gap-1.5 mt-1">
            {product.variants.map((v) => {
              const vKey     = cartKey(product.id, v.label);
              const vInCart  = isInCart(vKey);
              const isActive = selectedVariant.label === v.label;
              return (
                <button
                  key={v.label}
                  onClick={() => setSelectedVariant(v)}
                  aria-pressed={isActive}
                  className={`relative text-[11px] font-semibold font-body px-2 py-1 rounded-lg border transition-all
                    ${isActive
                      ? "bg-[#5C2D0E] text-white border-[#5C2D0E]"
                      : "bg-white text-[#7A3B15] border-[#D4A96A] hover:border-[#C9922A] hover:text-[#5C2D0E]"}`}
                >
                  {v.label}
                  {vInCart && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#25D366] border border-white" aria-hidden="true" />
                  )}
                </button>
              );
            })}
          </div>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-1 mt-auto pt-1">
          <span className={`font-display font-bold text-[#3D1A0A] transition-all ${compact ? "text-base" : "text-lg"}`}>
            {formatPrice(currentPrice)}
          </span>
          <span className="text-[#9A6C4A] text-xs font-body">/ {currentUnit}</span>
        </div>

        {/* Cart Controls */}
        <div className="mt-1">
          {!inCart ? (
            <button
              onClick={handleAdd}
              disabled={!canOrder}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl
                bg-[#5C2D0E] text-white text-sm font-semibold font-body
                hover:bg-[#3D1A0A] active:scale-95 transition-all duration-200
                disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label={`Add ${product.name} to cart`}
            >
              <ShoppingCart size={14} strokeWidth={2} />
              Add to Cart
            </button>
          ) : (
            <div className="flex items-center justify-between gap-2">
              <QuantitySelector
                quantity={qty}
                onIncrease={() => increaseQuantity(key)}
                onDecrease={() => decreaseQuantity(key)}
                min={0}
              />
              <div className="flex items-center gap-1 text-[#2A6B5C] text-xs font-semibold">
                <Check size={13} strokeWidth={3} />
                Added
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
