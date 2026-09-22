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
