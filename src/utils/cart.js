import { storeConfig } from "../config/store";

/**
 * Calculate delivery charge based on order subtotal.
 * Rule: FREE if subtotal >= ₹300, else ₹30.
 */
export function calculateDeliveryCharge(subtotal) {
  return subtotal >= storeConfig.freeDeliveryThreshold
    ? 0
    : storeConfig.deliveryCharge;
}

/**
 * Calculate grand total (subtotal + delivery).
 */
export function calculateOrderTotal(subtotal) {
  return subtotal + calculateDeliveryCharge(subtotal);
}

/**
 * How much more the customer needs to add for free delivery.
 * Returns 0 if already eligible.
 */
export function amountToFreeDelivery(subtotal) {
  const gap = storeConfig.freeDeliveryThreshold - subtotal;
  return gap > 0 ? gap : 0;
}

/**
 * Calculate subtotal from cart items array.
 * Each item: { price, quantity }
 */
export function calculateSubtotal(cartItems) {
  return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

/**
 * Format a number as Indian Rupees.
 * e.g. 1200 → "₹1,200"
 */
export function formatPrice(amount) {
  return `₹${amount.toLocaleString("en-IN")}`;
}

/**
 * Check if subtotal meets the minimum order requirement.
 */
export function meetsMinimumOrder(subtotal) {
  return subtotal >= storeConfig.minimumOrder;
}

/**
 * How much more the customer needs to meet the minimum order.
 * Returns 0 if already met.
 */
export function amountToMinimumOrder(subtotal) {
  const gap = storeConfig.minimumOrder - subtotal;
  return gap > 0 ? gap : 0;
}

/**
 * Check if a product with a timeSlot is currently available.
 *
 * timeSlot: { from: "07:30", to: "19:00", label: "7:30 AM – 7:00 PM" }
 *
 * If the product has no timeSlot, it is always available.
 * Returns { available: boolean, label: string }
 */
export function isProductAvailableNow(product) {
  if (!product.timeSlot) return { available: true, label: null };

  const now      = new Date();
  const hh       = now.getHours();
  const mm       = now.getMinutes();
  const current  = hh * 60 + mm;          // current time in minutes since midnight

  const [fromH, fromM] = product.timeSlot.from.split(":").map(Number);
  const [toH,   toM  ] = product.timeSlot.to.split(":").map(Number);
  const from = fromH * 60 + fromM;
  const to   = toH   * 60 + toM;

  return {
    available: current >= from && current < to,
    label:     product.timeSlot.label,
  };
}
