import { storeConfig } from "../config/store";
import {
  calculateDeliveryCharge,
  calculateOrderTotal,
  formatPrice,
} from "./cart";

/**
 * Build a WhatsApp order message from cart items and customer details.
 *
 * @param {Array}  cartItems   - [{ name, unit, price, quantity }, ...]
 * @param {Object} customer    - { name, phone, address, landmark, notes }
 * @param {number} subtotal
 * @returns {string} Raw message text (not yet URL-encoded)
 */
export function buildOrderMessage(cartItems, customer, subtotal) {
  const delivery = calculateDeliveryCharge(subtotal);
  const total    = calculateOrderTotal(subtotal);
  const deliveryText = delivery === 0 ? "FREE 🎉" : formatPrice(delivery);

  // ── Order Lines ──────────────────────────────────────
  const lines = cartItems
    .map(
      (item, index) =>
        `${index + 1}. ${item.name}${item.variantLabel ? ` (${item.variantLabel})` : ""}\n   ${item.unit} × ${item.quantity} = ${formatPrice(item.price * item.quantity)}`
    )
    .join("\n\n");

  // ── Full Message ─────────────────────────────────────
  const message = `Hello ${storeConfig.brandName}! 👋

I would like to place an order.

🛍️ ORDER DETAILS

${lines}

─────────────────────────
Subtotal : ${formatPrice(subtotal)}
Delivery : ${deliveryText}

💰 TOTAL  : ${formatPrice(total)}
─────────────────────────

👤 CUSTOMER DETAILS

Name     : ${customer.name}
Phone    : ${customer.phone}
Address  : ${customer.address}${
    customer.landmark ? `\nLandmark : ${customer.landmark}` : ""
  }${
    customer.notes ? `\n\n📝 Notes  : ${customer.notes}` : ""
  }

Thank you! 🙏`;

  return message;
}

/**
 * Generate a WhatsApp URL with the pre-filled order message.
 *
 * @param {Array}  cartItems
 * @param {Object} customer
 * @param {number} subtotal
 * @returns {string} Full wa.me URL
 */
export function generateWhatsAppUrl(cartItems, customer, subtotal) {
  const message = buildOrderMessage(cartItems, customer, subtotal);
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${storeConfig.whatsappNumber}?text=${encoded}`;
}

/**
 * Open WhatsApp with the pre-filled order in a new tab.
 */
export function openWhatsAppOrder(cartItems, customer, subtotal) {
  const url = generateWhatsAppUrl(cartItems, customer, subtotal);
  window.open(url, "_blank", "noopener,noreferrer");
}
