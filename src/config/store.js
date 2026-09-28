/**
 * ═══════════════════════════════════════════════════════════
 *  NANHE STORE CONFIGURATION
 *  Update all values here — they propagate across the app.
 * ═══════════════════════════════════════════════════════════
 */

export const storeConfig = {
  // ── Brand ─────────────────────────────────────────────
  brandName: "Nanhe",
  tagline: "Dairy and Sweets",
  slogan: "Freshness. Tradition. Taste.",
  heroHeadline: "Tradition You Can Taste",
  heroSubtext:
    "Fresh sweets, wholesome dairy and delicious snacks — made with quality and care.",

  // ── Contact ───────────────────────────────────────────
  // REPLACE with your actual WhatsApp number (country code + number, no + or spaces)
  whatsappNumber: "919927095355",
  phone: "+91 99270 95355",
  email: "hello@nanhe.in",
  address: "Shop No. 12, Main Market, Your City — 000000",
  landmark: "Near Clock Tower",
  googleMapsUrl: "https://maps.google.com/?q=YOUR+SHOP+ADDRESS",

  // ── Hours ─────────────────────────────────────────────
  openingHours: [
    { day: "Monday – Saturday", hours: "8:00 AM – 9:00 PM" },
    { day: "Sunday",            hours: "9:00 AM – 8:00 PM" },
  ],

  // ── Social ────────────────────────────────────────────
  social: {
    instagram: "https://instagram.com/nanhesweets",
    facebook:  "https://facebook.com/nanhesweets",
    whatsapp:  "https://wa.me/919917095355",
  },

  // ── Delivery Rules ────────────────────────────────────
  freeDeliveryThreshold: 300,   // ₹300+ → free delivery
  deliveryCharge: 30,           // ₹30 below threshold
  minimumOrder: 150,            // ₹150 minimum order value

  // ── SEO ───────────────────────────────────────────────
  siteTitle: "Nanhe — Premium Sweets, Dairy & Snacks",
  siteDescription:
    "Nanhe brings you authentic Indian sweets, fresh dairy products and crispy snacks. Order on WhatsApp for home delivery.",
};
