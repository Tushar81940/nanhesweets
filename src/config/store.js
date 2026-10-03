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
  email: "nanhedairyandsweet@gmail.com",
  address: "Moh. Katramaliyan, Kashipur, Uttarakhand",
  landmark: "Near Shiv Mandir",
  googleMapsUrl: "https://maps.google.com/?q=YOUR+SHOP+ADDRESS",

  // ── Hours ─────────────────────────────────────────────
  openingHours: [
    { day: "Everyday", hours: "6:00 AM – 11:00 PM" },
  ],

  // ── Social ────────────────────────────────────────────
  social: {
    instagram: "https://instagram.com/nanhesweets",
    facebook:  "https://facebook.com/nanhesweets",
    whatsapp:  "https://wa.me/919917095355",
  },

  // ── Delivery Rules ────────────────────────────────────
  freeDeliveryThreshold: 399,   // ₹399+ → free delivery
  deliveryCharge: 40,           // ₹40 below threshold
  minimumOrder: 100,            // ₹150 minimum order value

  // ── SEO ───────────────────────────────────────────────
  siteTitle: "Nanhe — Premium Sweets, Dairy & Snacks",
  siteDescription:
    "Nanhe brings you authentic Indian sweets, fresh dairy products and crispy snacks. Order on WhatsApp for home delivery.",
};
