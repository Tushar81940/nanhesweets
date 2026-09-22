import { Link } from "react-router-dom";
import { ShoppingCart, ArrowRight } from "lucide-react";
import { useCart } from "../context/CartContext";
import { calculateOrderTotal, formatPrice } from "../utils/cart";

/**
 * MobileCartBar — sticky bottom bar on mobile showing cart total.
 * Only visible on small screens when cart has items.
 */
export default function MobileCartBar() {
  const { items, subtotal, itemCount } = useCart();

  if (items.length === 0) return null;

  const total = calculateOrderTotal(subtotal);

  return (
    <div className="fixed bottom-0 inset-x-0 z-30 sm:hidden px-4 pb-4 pointer-events-none">
      <Link
        to="/cart"
        className="flex items-center justify-between gap-3 w-full
          bg-[#5C2D0E] text-white rounded-2xl px-4 py-3.5 shadow-2xl
          hover:bg-[#3D1A0A] active:scale-[0.98] transition-all
          pointer-events-auto"
        aria-label={`View cart — ${itemCount} items — ${formatPrice(total)}`}
      >
        <div className="flex items-center gap-2.5">
          <div className="relative">
            <ShoppingCart size={20} strokeWidth={2} />
            <span className="absolute -top-1.5 -right-1.5 bg-[#C9922A] text-white text-[9px] font-bold
              rounded-full w-4 h-4 flex items-center justify-center leading-none">
              {itemCount > 9 ? "9+" : itemCount}
            </span>
          </div>
          <span className="font-semibold text-sm">View Cart</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="font-display font-bold text-base">{formatPrice(total)}</span>
          <ArrowRight size={16} strokeWidth={2.5} />
        </div>
      </Link>
    </div>
  );
}
