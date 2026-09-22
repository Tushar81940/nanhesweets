/**
 * ═══════════════════════════════════════════════════════════
 *  NANHE PRODUCT CATALOG
 *
 *  To add a product:  copy any block below, give it a unique id,
 *                     and fill in the fields.
 *
 *  image:  Put your product image in /public/images/ and set
 *          the path to  "/images/your-file.jpg"
 *          Until you have real images, Unsplash URLs are used
 *          as tasteful placeholders.
 * ═══════════════════════════════════════════════════════════
 */

// ── Category slugs ────────────────────────────────────────
export const CATEGORIES = {
  SWEETS: "sweets",
  DAIRY:  "dairy",
  SNACKS: "snacks",
};

// ── Category meta (used for cards + pages) ────────────────
export const categoryMeta = [
  {
    slug:        CATEGORIES.SWEETS,
    label:       "Sweets",
    emoji:       "🍬",
    description: "Traditional and premium Indian sweets crafted with authentic recipes and the finest ingredients.",
    image:       "/images/rasmalai.jpeg",
    color:       "#7A3B15",
    bgColor:     "#FAF0E6",
  },
  {
    slug:        CATEGORIES.DAIRY,
    label:       "Dairy",
    emoji:       "🥛",
    description: "Fresh, wholesome dairy products sourced daily — pure taste you can trust.",
    image:       "/images/fresh milk.png",
    color:       "#2A6B5C",
    bgColor:     "#F0FAF5",
  },
  {
    slug:        CATEGORIES.SNACKS,
    label:       "Snacks",
    emoji:       "🥨",
    description: "Crispy, flavourful Indian snacks — perfect for every occasion and every craving.",
    image:       "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=600&q=80",
    color:       "#7A4A15",
    bgColor:     "#FFF5E6",
  },
];

// ── Products ──────────────────────────────────────────────
export const products = [

  // ════════ SWEETS ════════

  {
    id:          "sw-001",
    name:        "Rasmalai",
    category:    CATEGORIES.SWEETS,
    description: "Soft, spongy cottage cheese dumplings soaked in rich saffron-flavoured milk. A timeless classic.",
    image:       "/images/rasmalai.jpeg",
    price:       180,
    unit:        "500g",
    available:   true,
    featured:    true,
    badge:       "Best Seller",
  },
  {
    id:          "sw-002",
    name:        "Bal Mithai",
    category:    CATEGORIES.SWEETS,
    description: "A Kumaoni speciality — chocolate-brown fudge coated in white sugar balls. Rich and irresistible.",
    image:       "/images/bal mithai.jpeg",
    price:       220,
    unit:        "500g",
    available:   true,
    featured:    true,
    badge:       "Local Favourite",
  },
  {
    id:          "sw-003",
    name:        "Gulab Jamun",
    category:    CATEGORIES.SWEETS,
    description: "Golden milk-solid dumplings soaked in rose-cardamom sugar syrup. Melt-in-the-mouth perfection.",
    image:       "/images/gulab jamun.jpeg",
    price:       160,
    unit:        "500g",
    available:   true,
    featured:    true,
    badge:       null,
  },
  {
    id:          "sw-004",
    name:        "Safed Rasgulla",
    category:    CATEGORIES.SWEETS,
    description: "Pillowy soft chenna balls in light sugar syrup — light, delicate and refreshing.",
    image:       "/images/safed rasgulla.jpeg",
    price:       150,
    unit:        "500g",
    available:   true,
    featured:    true,
    badge:       null,
  },
  {
    id:          "sw-005",
    name:        "Barfi",
    category:    CATEGORIES.SWEETS,
    description: "Classic milk-solid barfi — dense, sweet and melt-in-the-mouth with a pure milky flavour.",
    image:       "/images/barfi.jpeg",
    price:       240,
    unit:        "250g",
    available:   true,
    featured:    true,
    badge:       null,
  },
  {
    id:          "sw-006",
    name:        "Mawa Barfi",
    category:    CATEGORIES.SWEETS,
    description: "Rich mawa-based barfi with a soft, creamy texture and subtle cardamom fragrance.",
    image:       "/images/mawa barfi.jpeg",
    price:       280,
    unit:        "250g",
    available:   true,
    featured:    true,
    badge:       "Premium",
  },
  {
    id:          "sw-007",
    name:        "Laal Barfi",
    category:    CATEGORIES.SWEETS,
    description: "Vibrant red barfi made with mawa and natural colour — festive, rich and beautifully presented.",
    image:       "/images/laal barfi.jpeg",
    price:       260,
    unit:        "250g",
    available:   true,
    featured:    false,
    badge:       null,
  },
  {
    id:          "sw-008",
    name:        "Gola Barfi",
    category:    CATEGORIES.SWEETS,
    description: "Ball-shaped mawa barfi with a distinct texture and rich milky sweetness.",
    image:       "/images/gola barfi.jpeg",
    price:       260,
    unit:        "250g",
    available:   true,
    featured:    false,
    badge:       null,
  },
  {
    id:          "sw-009",
    name:        "Peda",
    category:    CATEGORIES.SWEETS,
    description: "Thick milk solids scented with cardamom and saffron, shaped into small discs.",
    image:       "/images/peda.jpeg",
    price:       200,
    unit:        "250g",
    available:   true,
    featured:    false,
    badge:       null,
  },
  {
    id:          "sw-010",
    name:        "Cham Cham",
    category:    CATEGORIES.SWEETS,
    description: "Elongated chenna sweets soaked in sugar syrup and coated in mawa — soft, juicy and indulgent.",
    image:       "/images/chamcham.jpeg",
    price:       180,
    unit:        "500g",
    available:   true,
    featured:    true,
    badge:       "Must Try",
  },
  {
    id:          "sw-011",
    name:        "Baalu Shahi",
    category:    CATEGORIES.SWEETS,
    description: "Flaky, melt-in-the-mouth fried dough discs dipped in sugar syrup — a North Indian classic.",
    image:       "/images/baalu shahi.jpeg",
    price:       160,
    unit:        "250g",
    available:   true,
    featured:    false,
    badge:       null,
  },
  {
    id:          "sw-012",
    name:        "Boondi Laddu",
    category:    CATEGORIES.SWEETS,
    description: "Golden boondi spheres bound together with sugar syrup, ghee and cardamom.",
    image:       "/images/boondi laddu.jpeg",
    price:       180,
    unit:        "500g",
    available:   true,
    featured:    false,
    badge:       null,
  },
  {
    id:          "sw-013",
    name:        "Chocolate Barfi",
    category:    CATEGORIES.SWEETS,
    description: "A modern twist on classic barfi — rich chocolate flavour in a traditional mawa base.",
    image:       "/images/choclate.jpeg",
    price:       300,
    unit:        "250g",
    available:   true,
    featured:    true,
    badge:       "New",
  },
  {
    id:          "sw-014",
    name:        "Strawberry Sweet",
    category:    CATEGORIES.SWEETS,
    description: "Fruity strawberry-flavoured mawa sweet — bright, fresh and irresistibly pretty.",
    image:       "/images/stawberry.jpeg",
    price:       300,
    unit:        "250g",
    available:   true,
    featured:    false,
    badge:       "New",
  },

  // ════════ DAIRY ════════

  {
    id:          "da-001",
    name:        "Fresh Milk",
    category:    CATEGORIES.DAIRY,
    description: "Farm-fresh full-cream milk, delivered daily. Pure, rich and creamy.",
    image:       "/images/fresh milk.png",
    price:       60,
    unit:        "1 Litre",
    available:   true,
    featured:    true,
    badge:       "Daily Fresh",
  },
  {
    id:          "da-002",
    name:        "Paneer",
    category:    CATEGORIES.DAIRY,
    description: "Soft, fresh cottage cheese made from full-cream milk — rich and versatile.",
    image:       "/images/Paneer.png",
    price:       120,
    unit:        "250g",
    available:   true,
    featured:    true,
    badge:       "Fresh Daily",
  },
  {
    id:          "da-003",
    name:        "Dahi (Curd)",
    category:    CATEGORIES.DAIRY,
    description: "Thick, creamy set curd cultured fresh every morning. Smooth and mildly tangy.",
    image:       "/images/Curd (Dahi).png",
    price:       80,
    unit:        "500g",
    available:   true,
    featured:    false,
    badge:       null,
  },
  {
    id:          "da-004",
    name:        "Sweet Lassi",
    category:    CATEGORIES.DAIRY,
    description: "Chilled blended curd with sugar and cardamom — refreshing, thick and cooling.",
    image:       "/images/Sweet lassi.png",
    price:       50,
    unit:        "300ml",
    available:   true,
    featured:    true,
    badge:       "Popular",
  },
  {
    id:          "da-005",
    name:        "Chaach (Buttermilk)",
    category:    CATEGORIES.DAIRY,
    description: "Spiced chaach with cumin and mint — the perfect digestive and summer coolant.",
    image:       "/images/Buttermilk (Chaach).png",
    price:       30,
    unit:        "300ml",
    available:   true,
    featured:    false,
    badge:       null,
  },
  {
    id:          "da-006",
    name:        "Desi Ghee",
    category:    CATEGORIES.DAIRY,
    description: "Hand-churned cow ghee — golden, aromatic, and made the traditional way.",
    image:       "/images/Desi Ghee.png",
    price:       280,
    unit:        "500ml",
    available:   true,
    featured:    true,
    badge:       "Premium",
  },
  {
    id:          "da-007",
    name:        "White Butter",
    category:    CATEGORIES.DAIRY,
    description: "Fresh unsalted white butter, churned from morning cream. Melt it on hot rotis.",
    image:       "/images/White Butter.png",
    price:       100,
    unit:        "250g",
    available:   true,
    featured:    false,
    badge:       null,
  },
  {
    id:          "da-008",
    name:        "Fresh Cream",
    category:    CATEGORIES.DAIRY,
    description: "Thick malai-style fresh cream — perfect for desserts, gravies and more.",
    image:       "/images/Fresh Cream.png",
    price:       90,
    unit:        "200ml",
    available:   true,
    featured:    false,
    badge:       null,
  },
  {
    id:          "da-009",
    name:        "Khoya (Mawa)",
    category:    CATEGORIES.DAIRY,
    description: "Slow-reduced full-cream milk solids — the base of our finest sweets and desserts.",
    image:       "/images/Khoya (Mawa).png",
    price:       160,
    unit:        "250g",
    available:   true,
    featured:    false,
    badge:       null,
  },
  {
    id:          "da-010",
    name:        "Rabdi",
    category:    CATEGORIES.DAIRY,
    description: "Thickened sweetened milk layered with malai — rich, fragrant and utterly indulgent.",
    image:       "/images/Rabdi.png",
    price:       120,
    unit:        "250g",
    available:   true,
    featured:    true,
    badge:       "Must Try",
  },

  // ════════ SNACKS ════════

  {
    id:          "sn-001",
    name:        "Chaina Toast",
    category:    CATEGORIES.SNACKS,
    description: "A Kumaoni snack sensation — crispy, airy puffs with a distinctive crunch.",
    image:       "/images/chaina toast.jpeg",
    price:       120,
    unit:        "250g",
    available:   true,
    featured:    true,
    badge:       "Local Gem",
  },
  {
    id:          "sn-002",
    name:        "Fine Sev",
    category:    CATEGORIES.SNACKS,
    description: "Thin, crispy gram flour noodles seasoned with ajwain and turmeric. Endlessly snackable.",
    image:       "https://images.unsplash.com/photo-1599490659213-e2b9527bd087?w=500&q=80",
    price:       100,
    unit:        "250g",
    available:   true,
    featured:    true,
    badge:       "Best Seller",
  },
  {
    id:          "sn-003",
    name:        "Aloo Bhujia",
    category:    CATEGORIES.SNACKS,
    description: "Classic fine potato and gram flour bhujia — light, spiced and impossibly moreish.",
    image:       "https://images.unsplash.com/photo-1607478900766-efe13248b125?w=500&q=80",
    price:       110,
    unit:        "250g",
    available:   true,
    featured:    true,
    badge:       null,
  },
  {
    id:          "sn-004",
    name:        "Mix Namkeen",
    category:    CATEGORIES.SNACKS,
    description: "A satisfying medley of sev, flattened rice, peanuts and spiced dals.",
    image:       "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=500&q=80",
    price:       130,
    unit:        "250g",
    available:   true,
    featured:    false,
    badge:       null,
  },
  {
    id:          "sn-005",
    name:        "Samosa",
    category:    CATEGORIES.SNACKS,
    description: "Crispy golden pastry filled with spiced potato and peas. Best with green chutney.",
    image:       "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=500&q=80",
    price:       20,
    unit:        "1 pc",
    available:   true,
    featured:    false,
    badge:       null,
  },
  {
    id:          "sn-006",
    name:        "Kachori",
    category:    CATEGORIES.SNACKS,
    description: "Flaky fried rounds stuffed with spiced moong dal — rich, flavourful and hearty.",
    image:       "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=500&q=80",
    price:       25,
    unit:        "1 pc",
    available:   true,
    featured:    false,
    badge:       null,
  },
  {
    id:          "sn-007",
    name:        "Mathri",
    category:    CATEGORIES.SNACKS,
    description: "Flaky wheat crackers seasoned with ajwain and black pepper. Perfect with tea.",
    image:       "https://images.unsplash.com/photo-1603046891744-1f7f5d6b0099?w=500&q=80",
    price:       140,
    unit:        "250g",
    available:   true,
    featured:    false,
    badge:       null,
  },
  {
    id:          "sn-008",
    name:        "Masala Mungfali",
    category:    CATEGORIES.SNACKS,
    description: "Crunchy roasted peanuts coated in spiced besan batter — the ultimate tea-time companion.",
    image:       "https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?w=500&q=80",
    price:       90,
    unit:        "200g",
    available:   true,
    featured:    false,
    badge:       null,
  },
];

// ── Helpers ───────────────────────────────────────────────

/** Get all products in a category */
export function getProductsByCategory(category) {
  return products.filter((p) => p.category === category);
}

/** Get featured products (optionally limited) */
export function getFeaturedProducts(limit = 8) {
  return products.filter((p) => p.featured).slice(0, limit);
}

/** Search products by name or description */
export function searchProducts(query) {
  const q = query.toLowerCase().trim();
  if (!q) return products;
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
  );
}

/** Get product by id */
export function getProductById(id) {
  return products.find((p) => p.id === id) || null;
}
