import { ShoppingCart, Check } from "lucide-react";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/cart";
import QuantitySelector from "./QuantitySelector";

/**
 * ProductCard — premium product tile
 * Props:
 *   product  {Object}  — full product record from products.js
 *   compact  {boolean} — smaller variant for grids
 */
export default function ProductCard({ product, compact = false }) {
  const { addToCart, increaseQuantity, decreaseQuantity, isInCart, getItem } =
    useCart();

  const inCart  = isInCart(product.id);
  const item    = getItem(product.id);
  const qty     = item?.quantity ?? 0;

  function handleAdd(e) {
    e.preventDefault();
    addToCart(product, 1);
  }

  return (
    <article
      className={`group relative bg-white rounded-2xl overflow-hidden flex flex-col
        border border-[#EDE4D3] card-hover
        ${compact ? "shadow-sm" : "shadow-[0_2px_8px_rgba(58,26,10,0.08)]"}`}
      aria-label={product.name}
    >
      {/* Badge */}
      {product.badge && (
        <div className="absolute top-3 left-3 z-10">
          <span className="bg-[#C9922A] text-white text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full">
            {product.badge}
          </span>
        </div>
      )}

      {/* Unavailable overlay */}
      {!product.available && (
        <div className="absolute inset-0 z-20 bg-white/70 flex items-center justify-center rounded-2xl">
          <span className="text-[#9A6C4A] font-semibold text-sm bg-[#FAF6F0] px-3 py-1 rounded-full border border-[#D4A96A]">
            Currently Unavailable
          </span>
        </div>
      )}

      {/* Image */}
      <div className={`img-zoom w-full bg-[#FAF6F0] overflow-hidden ${compact ? "h-40" : "h-48 sm:h-52"}`}>
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
      <div className="flex flex-col flex-1 p-4 gap-2">
        {/* Category label */}
        <span className="text-[10px] uppercase tracking-widest text-[#C9922A] font-semibold font-body">
          {product.category}
        </span>

        {/* Name */}
        <h3 className={`font-display font-semibold text-[#3D1A0A] leading-snug
          ${compact ? "text-base" : "text-lg"}`}>
          {product.name}
        </h3>

        {/* Description */}
        {!compact && (
          <p className="text-[#7A3B15] text-sm font-body leading-relaxed line-clamp-2 flex-1">
            {product.description}
          </p>
        )}

        {/* Price */}
        <div className="flex items-baseline gap-1 mt-auto pt-1">
          <span className={`font-display font-bold text-[#3D1A0A] ${compact ? "text-base" : "text-xl"}`}>
            {formatPrice(product.price)}
          </span>
          <span className="text-[#9A6C4A] text-xs font-body">/ {product.unit}</span>
        </div>

        {/* Cart Controls */}
        <div className="mt-2">
          {!inCart ? (
            <button
              onClick={handleAdd}
              disabled={!product.available}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl
                bg-[#5C2D0E] text-white text-sm font-semibold font-body
                hover:bg-[#3D1A0A] active:scale-95
                transition-all duration-200
                disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label={`Add ${product.name} to cart`}
            >
              <ShoppingCart size={15} strokeWidth={2} />
              Add to Cart
            </button>
          ) : (
            <div className="flex items-center justify-between gap-2">
              <QuantitySelector
                quantity={qty}
                onIncrease={() => increaseQuantity(product.id)}
                onDecrease={() => decreaseQuantity(product.id)}
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
