import { useCart } from "../context/CartContext";
import { amountToFreeDelivery, formatPrice } from "../utils/cart";
import { storeConfig } from "../config/store";
import { Truck, PartyPopper } from "lucide-react";

/**
 * DeliveryBanner — inline free-delivery progress indicator
 * Shown inside cart and anywhere subtotal is relevant.
 */
export default function DeliveryBanner() {
  const { subtotal } = useCart();
  const gap = amountToFreeDelivery(subtotal);
  const isFree = gap === 0 && subtotal > 0;
  const progress = Math.min((subtotal / storeConfig.freeDeliveryThreshold) * 100, 100);

  if (subtotal === 0) return null;

  return (
    <div
      className={`rounded-xl p-3.5 border text-sm font-body
        ${isFree
          ? "bg-[#F0FAF5] border-[#A3D9C5] text-[#1A5C44]"
          : "bg-[#FFF8EE] border-[#E8CFA0] text-[#7A4A15]"}`}
      role="status"
      aria-live="polite"
    >
      {isFree ? (
        <div className="flex items-center gap-2 font-semibold text-[#1A5C44]">
          <PartyPopper size={16} strokeWidth={2} />
          🎉 You've unlocked FREE delivery!
        </div>
      ) : (
        <>
          <div className="flex items-center gap-2 mb-2">
            <Truck size={15} strokeWidth={2} className="text-[#C9922A]" />
            <span>
              Add <strong className="text-[#5C2D0E]">{formatPrice(gap)}</strong> more for{" "}
              <strong className="text-[#5C2D0E]">FREE delivery</strong> 🎉
            </span>
          </div>
          {/* Progress bar */}
          <div className="h-1.5 rounded-full bg-[#EDE4D3] overflow-hidden">
            <div
              className="h-full rounded-full bg-[#C9922A] transition-all duration-500"
              style={{ width: `${progress}%` }}
              aria-hidden="true"
            />
          </div>
        </>
      )}
    </div>
  );
}
