import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Truck, Star, ShieldCheck, Clock } from "lucide-react";
import { storeConfig } from "../config/store";
import { categoryMeta, getFeaturedProducts } from "../data/products";
import ProductCard from "../components/ProductCard";
import CategoryCard from "../components/CategoryCard";
import SectionHeading from "../components/SectionHeading";
import WhatsAppButton from "../components/WhatsAppButton";

// ── Trust badges ─────────────────────────────────────────
const trustBadges = [
  { icon: Star,        label: "Premium Quality",    sub: "Only finest ingredients"   },
  { icon: Truck,       label: "Home Delivery",       sub: "Free above ₹300"           },
  { icon: ShieldCheck, label: "Hygiene Certified",   sub: "Made fresh daily"          },
  { icon: Clock,       label: "Same Day Delivery",   sub: "Delivered within the day"  },
];

// ── Testimonials ─────────────────────────────────────────
const testimonials = [
  {
    name:   "Priya Sharma",
    text:   "The Rasmalai was absolutely heavenly — soft, creamy and just the right sweetness. My family loved it!",
    rating: 5,
    city:   "Local Customer",
  },
  {
    name:   "Rahul Verma",
    text:   "Ordered Son Papdi for Diwali and it was the freshest I've ever tasted. Will order again!",
    rating: 5,
    city:   "Regular Customer",
  },
  {
    name:   "Sunita Joshi",
    text:   "The paneer and ghee are incredibly fresh. You can tell the quality difference immediately.",
    rating: 5,
    city:   "Loyal Customer",
  },
];

export default function Home() {
  const featuredProducts = getFeaturedProducts(8);
  const heroRef = useRef(null);

  // Simple intersection observer for fade-in sections
  useEffect(() => {
    const sections = document.querySelectorAll(".js-fade-section");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up");
            entry.target.style.opacity = "1";
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <main>
      {/* ══════════════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-[90vh] sm:min-h-[80vh] flex items-center overflow-hidden bg-[#FAF6F0]"
        aria-label="Hero"
      >
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <img
            src="/images/fresh milk.png"
            alt=""
            aria-hidden="true"
            className="w-full h-full object-cover"
          />
          {/* Multi-layer overlay: left heavy for text, lighter on right */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#2A0E02]/85 via-[#3D1A0A]/60 to-[#5C2D0E]/20" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2A0E02]/40 via-transparent to-transparent" />
        </div>

        {/* Decorative gold circle */}
        <div
          className="absolute -right-24 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full
            border-2 border-[#C9922A]/20 hidden lg:block pointer-events-none"
          aria-hidden="true"
        />
        <div
          className="absolute -right-8 top-1/2 -translate-y-1/2 w-[380px] h-[380px] rounded-full
            border border-[#C9922A]/15 hidden lg:block pointer-events-none"
          aria-hidden="true"
        />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 w-full">
          <div className="max-w-xl lg:max-w-2xl">
            {/* Label */}
            <span className="inline-block text-[#D4A96A] text-xs sm:text-sm uppercase tracking-[0.25em] font-semibold font-body mb-4 animate-fade-in">
              {storeConfig.tagline}
            </span>

            {/* Headline */}
            <h1 className="font-display font-bold text-white text-4xl sm:text-5xl lg:text-6xl leading-[1.1] mb-5 animate-fade-in-up">
              {storeConfig.heroHeadline}
            </h1>

            {/* Subtext */}
            <p className="text-[#E8CFA0] font-body text-base sm:text-lg leading-relaxed mb-8 max-w-md animate-fade-in-up"
               style={{ animationDelay: "0.1s" }}>
              {storeConfig.heroSubtext}
            </p>

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3 animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-[#C9922A] text-white font-semibold font-body
                  text-sm sm:text-base px-6 py-3.5 rounded-xl
                  hover:bg-[#B8800A] active:scale-95 transition-all duration-200 shadow-lg"
              >
                Explore Products
                <ArrowRight size={16} strokeWidth={2.5} />
              </Link>
              <WhatsAppButton
                label="Order on WhatsApp"
                size="md"
              />
            </div>

            {/* Quick trust row */}
            <div className="flex flex-wrap gap-4 mt-10 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              {["🍬 Fresh Sweets", "🥛 Daily Dairy", "🥨 Crispy Snacks"].map((tag) => (
                <span
                  key={tag}
                  className="text-[#D4A96A] text-xs font-body border border-[#C9922A]/30
                    px-3 py-1.5 rounded-full bg-white/5 backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom wave separator */}
        <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none" aria-hidden="true">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path d="M0 60L1440 60L1440 20C1200 60 720 0 0 40L0 60Z" fill="#FFFBF5" />
          </svg>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          TRUST BADGES
      ══════════════════════════════════════════════ */}
      <section className="bg-[#FFFBF5] py-8 sm:py-10 border-b border-[#EDE4D3]" aria-label="Our promises">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {trustBadges.map(({ icon: Icon, label, sub }) => (
              <div key={label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FAF0E0] flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-[#C9922A]" strokeWidth={2} />
                </div>
                <div>
                  <p className="font-semibold text-[#3D1A0A] text-sm font-body leading-snug">{label}</p>
                  <p className="text-[#9A6C4A] text-xs font-body">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          CATEGORIES
      ══════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 bg-[#FFFBF5]" aria-labelledby="categories-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="js-fade-section opacity-0 mb-10">
            <SectionHeading
              label="What We Offer"
              title="Our Categories"
              subtitle="Handcrafted sweets, farm-fresh dairy and crispy snacks — all made with authentic recipes and the finest ingredients."
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 js-fade-section opacity-0">
            {categoryMeta.map((cat) => (
              <CategoryCard key={cat.slug} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FEATURED PRODUCTS / BEST SELLERS
      ══════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 bg-[#FAF6F0]" aria-labelledby="featured-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="js-fade-section opacity-0 mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <SectionHeading
              label="Customer Favourites"
              title="Best Sellers"
              subtitle="The products our customers keep coming back for."
              center={false}
            />
            <Link
              to="/products"
              className="flex items-center gap-1.5 text-[#C9922A] font-semibold text-sm font-body
                hover:gap-2.5 transition-all flex-shrink-0 self-start sm:self-auto"
            >
              View All Products
              <ArrowRight size={15} strokeWidth={2.5} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 js-fade-section opacity-0">
            {featuredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FREE DELIVERY BANNER
      ══════════════════════════════════════════════ */}
      <section className="py-12 bg-[#3D1A0A]" aria-label="Free delivery offer">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center js-fade-section opacity-0">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Truck size={22} className="text-[#C9922A]" strokeWidth={2} />
            <span className="text-[#D4A96A] text-xs uppercase tracking-widest font-semibold font-body">
              Delivery Offer
            </span>
          </div>
          <h2 className="font-display font-bold text-white text-2xl sm:text-3xl mb-3">
            FREE Delivery on Orders Above ₹399
          </h2>
          <p className="text-[#C4A882] font-body text-sm sm:text-base mb-7 max-w-md mx-auto">
            Order sweets, dairy and snacks together and enjoy complimentary home delivery.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-[#C9922A] text-white font-semibold
                text-sm px-6 py-3 rounded-xl hover:bg-[#B8800A] transition-colors"
            >
              Shop Now
              <ArrowRight size={15} strokeWidth={2.5} />
            </Link>
            <WhatsAppButton label="Order Fresh on WhatsApp" size="md" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          TESTIMONIALS
      ══════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 bg-[#FFFBF5]" aria-labelledby="testimonials-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="js-fade-section opacity-0 mb-10">
            <SectionHeading
              label="Customer Stories"
              title="What People Say"
              subtitle="Real words from our wonderful customers."
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 js-fade-section opacity-0">
            {testimonials.map((t) => (
              <blockquote
                key={t.name}
                className="bg-white rounded-2xl p-6 border border-[#EDE4D3]
                  shadow-[0_2px_8px_rgba(58,26,10,0.06)] flex flex-col gap-4"
              >
                {/* Stars */}
                <div className="flex gap-0.5" aria-label={`${t.rating} stars`}>
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={14} className="text-[#C9922A] fill-[#C9922A]" />
                  ))}
                </div>
                <p className="text-[#5C2D0E] font-body text-sm leading-relaxed flex-1">
                  "{t.text}"
                </p>
                <footer className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#FAF0E0] flex items-center justify-center
                    font-display font-bold text-[#5C2D0E] text-sm flex-shrink-0">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <cite className="font-semibold text-[#3D1A0A] text-sm font-body not-italic">{t.name}</cite>
                    <p className="text-[#9A6C4A] text-xs font-body">{t.city}</p>
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 bg-[#FAF6F0] border-t border-[#EDE4D3]" aria-label="Order now">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center js-fade-section opacity-0">
          {/* Decorative ring */}
          <div className="w-20 h-20 rounded-full border-2 border-[#C9922A]/30 flex items-center justify-center mx-auto mb-6">
            <div className="w-14 h-14 rounded-full bg-[#FAF0E0] flex items-center justify-center text-3xl">
              🍬
            </div>
          </div>
          <h2 className="font-display font-bold text-[#3D1A0A] text-2xl sm:text-3xl lg:text-4xl mb-4">
            Ready to Order?
          </h2>
          <p className="text-[#7A3B15] font-body text-base leading-relaxed mb-8 max-w-md mx-auto">
            Browse our selection, fill your cart, and place your order directly on WhatsApp. Simple, fast and fresh.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-[#5C2D0E] text-white font-semibold
                text-sm sm:text-base px-6 py-3.5 rounded-xl hover:bg-[#3D1A0A]
                active:scale-95 transition-all"
            >
              Browse All Products
              <ArrowRight size={16} strokeWidth={2.5} />
            </Link>
            <WhatsAppButton label="Chat with Us" size="md" />
          </div>
        </div>
      </section>
    </main>
  );
}
