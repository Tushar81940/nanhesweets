import { Link } from "react-router-dom";
import { Star, Leaf, ShieldCheck, Heart, ArrowRight } from "lucide-react";
import SectionHeading from "../components/SectionHeading";
import WhatsAppButton from "../components/WhatsAppButton";

const values = [
  {
    icon:  Star,
    title: "Uncompromising Quality",
    desc:  "Every product is made using carefully selected ingredients. We never cut corners on taste or freshness.",
  },
  {
    icon:  Leaf,
    title: "Traditional Recipes",
    desc:  "Our sweets and snacks are crafted using authentic recipes passed down through generations.",
  },
  {
    icon:  ShieldCheck,
    title: "Hygiene & Freshness",
    desc:  "We maintain the highest standards of cleanliness in our kitchen so every bite is safe and wholesome.",
  },
  {
    icon:  Heart,
    title: "Made with Love",
    desc:  "We pour care and passion into everything we make — from the mithai to the makhan.",
  },
];

const offerings = [
  {
    emoji: "🍬",
    title: "Indian Sweets",
    desc: "From melt-in-the-mouth rasmalai to rich kaju katli — traditional mithai made fresh daily.",
  },
  {
    emoji: "🥛",
    title: "Fresh Dairy",
    desc: "Farm-fresh milk, creamy paneer, thick curd, and pure hand-churned ghee — delivered to your door.",
  },
  {
    emoji: "🥨",
    title: "Savoury Snacks",
    desc: "Crispy sev, bhujia, namkeen and more — crafted with the same love as our sweets.",
  },
];

export default function About() {
  return (
    <main className="min-h-screen bg-[#FFFBF5]">
      {/* ── Hero ── */}
      <section
        className="relative py-20 sm:py-28 overflow-hidden bg-[#3D1A0A]"
        aria-label="About Nanhe"
      >
        {/* Decorative circles */}
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full border border-[#C9922A]/15 pointer-events-none" aria-hidden="true" />
        <div className="absolute -left-16 -bottom-16 w-64 h-64 rounded-full border border-[#C9922A]/10 pointer-events-none" aria-hidden="true" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[#D4A96A] text-xs uppercase tracking-[0.25em] font-semibold font-body mb-4 block">
            Our Story
          </span>
          <h1 className="font-display font-bold text-white text-3xl sm:text-4xl lg:text-5xl leading-tight mb-5">
            A Passion for Authentic<br className="hidden sm:block" /> Indian Flavours
          </h1>
          <p className="text-[#C4A882] font-body text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
            Nanhe was never born from a simple belief: that the finest Indian sweets, dairy and snacks
            deserve to be made with real ingredients, traditional care, and an honest heart.
          </p>
        </div>
      </section>

      {/* ── Story section ── */}
      <section className="py-16 sm:py-20 bg-[#FFFBF5]" aria-labelledby="story-heading">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* ── Image collage ── */}
            <div className="relative grid grid-cols-2 gap-3 h-80 sm:h-[420px]">
              {/* Large left — spans 2 rows */}
              <div className="rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(58,26,10,0.14)] row-span-2 img-zoom">
                <img
                  src="/images/rasmalai.jpeg"
                  alt="Fresh Rasmalai"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Top right */}
              <div className="rounded-2xl overflow-hidden shadow-[0_4px_16px_rgba(58,26,10,0.10)] img-zoom">
                <img
                  src="/images/baalu shahi.jpeg"
                  alt="Gulab Jamun"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Bottom right */}
              <div className="rounded-2xl overflow-hidden shadow-[0_4px_16px_rgba(58,26,10,0.10)] img-zoom">
                <img
                  src="/images/Paneer.png"
                  alt="Fresh Paneer"
                  className="w-full h-full object-cover"
                />
              </div>
              {/* "Made Fresh Daily" badge */}
              <div className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full
                bg-[#3D1A0A] border-4 border-[#FFFBF5]
                flex flex-col items-center justify-center shadow-lg z-10 pointer-events-none">
                <span className="text-[#C9922A] text-[9px] font-bold uppercase tracking-wider leading-tight text-center px-1">
                  Made<br />Fresh<br />Daily
                </span>
              </div>
            </div>

            {/* ── Text ── */}
            <div className="flex flex-col gap-5">
              <div>
                <span className="text-[#C9922A] text-xs uppercase tracking-widest font-semibold font-body">
                  Who We Are
                </span>
                <h2 id="story-heading" className="font-display font-bold text-[#3D1A0A] text-2xl sm:text-3xl mt-2 leading-snug">
                  Crafting Goodness, One Mithai at a Time
                </h2>
              </div>
              <p className="text-[#5C2D0E] font-body text-sm sm:text-base leading-relaxed">
                At Nanhe, we believe that great food starts with great ingredients and the patience
                to do things right. Our kitchen is built on tradition — recipes refined over years,
                techniques that honour the original, and a commitment to quality that never wavers.
              </p>
              <p className="text-[#5C2D0E] font-body text-sm sm:text-base leading-relaxed">
                Whether it's the creaminess of our paneer, the crunch of our namkeen, or the melt
                of our gulab jamun — every product that leaves our kitchen carries a promise: it
                was made with care, with pride, and with love.
              </p>
              <p className="text-[#7A3B15] font-body text-sm sm:text-base leading-relaxed">
                We source our dairy fresh every morning, prepare our sweets in small batches, and
                never use artificial colours or preservatives. Because the way things taste matters —
                and so does the way they're made.
              </p>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 text-[#C9922A] font-semibold text-sm font-body
                  hover:gap-3 transition-all self-start"
              >
                Explore Our Products
                <ArrowRight size={15} strokeWidth={2.5} />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-16 sm:py-20 bg-[#FAF6F0]" aria-labelledby="values-heading">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <SectionHeading
              label="What Drives Us"
              title="Our Values"
              subtitle="The principles we uphold in every batch we make."
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-white rounded-2xl p-6 border border-[#EDE4D3]
                  shadow-[0_2px_8px_rgba(58,26,10,0.06)] flex flex-col gap-4"
              >
                <div className="w-11 h-11 rounded-xl bg-[#FAF0E0] flex items-center justify-center">
                  <Icon size={20} className="text-[#C9922A]" strokeWidth={2} />
                </div>
                <div>
                  <h3 className="font-display font-bold text-[#3D1A0A] text-base mb-2">{title}</h3>
                  <p className="text-[#7A3B15] font-body text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What we offer ── */}
      <section className="py-16 sm:py-20 bg-[#FFFBF5]" aria-labelledby="offerings-heading">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <SectionHeading
              label="Our Range"
              title="What We Offer"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {offerings.map((o) => (
              <div
                key={o.title}
                className="text-center p-8 rounded-2xl bg-[#FAF6F0] border border-[#EDE4D3]"
              >
                <div className="text-5xl mb-4" aria-hidden="true">{o.emoji}</div>
                <h3 className="font-display font-bold text-[#3D1A0A] text-lg mb-3">{o.title}</h3>
                <p className="text-[#7A3B15] font-body text-sm leading-relaxed">{o.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-14 sm:py-16 bg-[#3D1A0A]" aria-label="Order from Nanhe">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-display font-bold text-white text-2xl sm:text-3xl mb-4">
            Experience the Nanhe Difference
          </h2>
          <p className="text-[#C4A882] font-body text-sm sm:text-base mb-7 max-w-md mx-auto">
            Order fresh sweets, dairy and snacks from Nanhe and taste the tradition we put into every bite.
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
            <WhatsAppButton label="Chat with Us" size="md" />
          </div>
        </div>
      </section>
    </main>
  );
}
