import { Link } from "react-router-dom";
import { ShoppingBag, ArrowRight, Trash2, ArrowLeft, AlertCircle } from "lucide-react";
import { useCart } from "../context/CartContext";
import {
  calculateDeliveryCharge,
  calculateOrderTotal,
  amountToFreeDelivery,
  meetsMinimumOrder,
  amountToMinimumOrder,
  formatPrice,
} from "../utils/cart";
import { storeConfig } from "../config/store";
import CartItem from "../components/CartItem";
import DeliveryBanner from "../components/DeliveryBanner";
import WhatsAppButton from "../components/WhatsAppButton";

export default function Cart() {
  const { items, subtotal, itemCount, clearCart } = useCart();

  const delivery   = calculateDeliveryCharge(subtotal);
  const total      = calculateOrderTotal(subtotal);
  const gap        = amountToFreeDelivery(subtotal);
  const minMet     = meetsMinimumOrder(subtotal);
  const minGap     = amountToMinimumOrder(subtotal);

  // ── Empty cart ────────────────────────────────────────
  if (items.length === 0) {
    return (
      <main className="min-h-[70vh] bg-[#FFFBF5] flex items-center justify-center px-4">
        <div className="text-center flex flex-col items-center gap-5 max-w-xs">
          <div className="w-24 h-24 rounded-full bg-[#FAF0E0] flex items-center justify-center text-5xl">
            🛒
          </div>
          <div>
            <h1 className="font-display font-bold text-[#3D1A0A] text-2xl mb-2">
              Your cart is empty
            </h1>
            <p className="text-[#7A3B15] font-body text-sm leading-relaxed">
              Your cart is waiting for something delicious! 🍬
            </p>
          </div>
          <div className="flex flex-col w-full gap-2">
            <Link
              to="/products/sweets"
              className="flex items-center justify-center gap-2 py-3 px-5 rounded-xl
                bg-[#5C2D0E] text-white text-sm font-semibold font-body
                hover:bg-[#3D1A0A] transition-colors"
            >
              Explore Sweets
            </Link>
            <Link
              to="/products"
              className="flex items-center justify-center gap-2 py-3 px-5 rounded-xl
                border border-[#EDE4D3] bg-white text-[#5C2D0E] text-sm font-semibold font-body
                hover:bg-[#FAF6F0] transition-colors"
            >
              Browse All Products
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FFFBF5]">
      {/* Page header */}
      <div className="bg-[#3D1A0A] py-10 sm:py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/products"
            className="inline-flex items-center gap-1.5 text-[#D4A96A] text-sm font-body hover:text-white transition-colors mb-4"
          >
            <ArrowLeft size={14} strokeWidth={2} />
            Continue Shopping
          </Link>
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="font-display font-bold text-white text-2xl sm:text-3xl">
                Your Cart
              </h1>
              <p className="text-[#C4A882] text-sm font-body mt-1">
                {itemCount} item{itemCount !== 1 ? "s" : ""}
              </p>
            </div>
            <button
              onClick={clearCart}
              className="flex items-center gap-1.5 text-[#C4A882] text-xs font-body
                hover:text-red-400 transition-colors py-2 px-3 rounded-lg hover:bg-white/5"
            >
              <Trash2 size={13} strokeWidth={2} />
              Clear all
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">

          {/* ── Cart items ── */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-[#EDE4D3] shadow-[0_2px_8px_rgba(58,26,10,0.06)] overflow-hidden">
              <div className="px-5 py-4 border-b border-[#EDE4D3] flex items-center gap-2">
                <ShoppingBag size={16} className="text-[#C9922A]" strokeWidth={2} />
                <h2 className="font-display font-semibold text-[#3D1A0A] text-base">
                  Order Items
                </h2>
              </div>
              <ul className="px-5 divide-y divide-[#FAF0E0]">
                {items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </ul>
            </div>

            {/* Delivery banner */}
            <div className="mt-4">
              <DeliveryBanner />
            </div>

            {/* Minimum order banner */}
            {!minMet && (
              <div className="mt-3 flex items-start gap-2.5 bg-[#FFF3F3] border border-red-200 rounded-xl px-4 py-3">
                <AlertCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" strokeWidth={2} />
                <p className="text-sm font-body text-red-700">
                  Minimum order is{" "}
                  <strong>₹{storeConfig.minimumOrder}</strong>. Add{" "}
                  <strong>{formatPrice(minGap)}</strong> more to proceed.
                </p>
              </div>
            )}
          </div>

          {/* ── Order summary ── */}
          <div className="lg:sticky lg:top-24 flex flex-col gap-4">
            <div className="bg-white rounded-2xl border border-[#EDE4D3] shadow-[0_2px_8px_rgba(58,26,10,0.06)] overflow-hidden">
              <div className="px-5 py-4 border-b border-[#EDE4D3]">
                <h2 className="font-display font-semibold text-[#3D1A0A] text-base">
                  Order Summary
                </h2>
              </div>

              <div className="px-5 py-5 flex flex-col gap-3">
                {/* Line items */}
                <div className="flex justify-between text-sm font-body text-[#5C2D0E]">
                  <span>Subtotal ({itemCount} items)</span>
                  <span className="font-semibold tabular-nums">{formatPrice(subtotal)}</span>
                </div>

                <div className="flex justify-between text-sm font-body">
                  <span className="text-[#5C2D0E]">Delivery</span>
                  {delivery === 0 ? (
                    <span className="text-[#1A5C44] font-semibold">FREE 🎉</span>
                  ) : (
                    <span className="font-semibold text-[#5C2D0E] tabular-nums">
                      {formatPrice(delivery)}
                    </span>
                  )}
                </div>

                {/* Free delivery hint */}
                {gap > 0 && (
                  <div className="text-xs text-[#9A6C4A] font-body bg-[#FFF8EE] rounded-lg px-3 py-2 border border-[#E8CFA0]">
                    Add <strong className="text-[#5C2D0E]">{formatPrice(gap)}</strong> more to get{" "}
                    <strong className="text-[#5C2D0E]">FREE delivery</strong> 🎉
                  </div>
                )}

                <div className="border-t border-[#EDE4D3] pt-3 mt-1">
                  <div className="flex justify-between">
                    <span className="font-display font-bold text-[#3D1A0A] text-base">Total</span>
                    <span className="font-display font-bold text-[#3D1A0A] text-xl tabular-nums">
                      {formatPrice(total)}
                    </span>
                  </div>
                  {delivery === 0 && (
                    <p className="text-[#1A5C44] text-xs font-body mt-1">
                      🎉 You've unlocked FREE delivery!
                    </p>
                  )}
                </div>

                {/* Proceed to checkout */}
                {minMet ? (
                  <Link
                    to="/checkout"
                    className="mt-2 flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl
                      bg-[#5C2D0E] text-white text-sm font-semibold font-body
                      hover:bg-[#3D1A0A] active:scale-[0.98] transition-all"
                  >
                    Proceed to Order
                    <ArrowRight size={15} strokeWidth={2.5} />
                  </Link>
                ) : (
                  <div className="mt-2 flex items-center justify-center gap-2 py-3.5 px-5 rounded-xl
                    bg-[#D4A96A]/40 text-[#9A6C4A] text-sm font-semibold font-body cursor-not-allowed border border-[#D4A96A]">
                    Add {formatPrice(minGap)} more to proceed
                  </div>
                )}

                {/* WhatsApp quick order */}
                {minMet && (
                  <WhatsAppButton
                    label="Quick Order on WhatsApp"
                    size="sm"
                    fullWidth
                  />
                )}

                <p className="text-[#9A6C4A] text-[11px] font-body text-center leading-relaxed">
                  {minMet
                    ? "Fill delivery details on the next page to send your complete order to WhatsApp."
                    : `Minimum order value is ₹${storeConfig.minimumOrder}.`}
                </p>
              </div>
            </div>

            {/* Delivery info card */}
            <div className="bg-[#FAF6F0] rounded-2xl border border-[#EDE4D3] px-5 py-4 text-xs font-body text-[#7A3B15] space-y-1.5">
              <p className="font-semibold text-[#5C2D0E] text-sm mb-2">Order Policy</p>
              <p>✓ Minimum order value: <strong>₹{storeConfig.minimumOrder}</strong></p>
              <p>✓ Orders above ₹{storeConfig.freeDeliveryThreshold} → <strong>FREE delivery</strong></p>
              <p>✓ Orders below ₹{storeConfig.freeDeliveryThreshold} → ₹{storeConfig.deliveryCharge} delivery charge</p>
              <p>✓ Orders placed before 2 PM delivered same day</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom padding for mobile cart bar */}
      <div className="h-20 sm:h-0" aria-hidden="true" />
    </main>
  );
}
