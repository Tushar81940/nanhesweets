import { Phone, MapPin, Clock, MessageCircle, Mail, ExternalLink } from "lucide-react";

// Social icon SVGs (lucide-react doesn't include Instagram/Facebook in this version)
function InstagramIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}
function FacebookIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}
import { storeConfig } from "../config/store";
import SectionHeading from "../components/SectionHeading";
import WhatsAppButton from "../components/WhatsAppButton";

export default function Contact() {
  return (
    <main className="min-h-screen bg-[#FFFBF5]">
      {/* ── Page header ── */}
      <div className="bg-[#3D1A0A] py-14 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-[#D4A96A] text-xs uppercase tracking-[0.2em] font-semibold font-body mb-3 block">
            Get in Touch
          </span>
          <h1 className="font-display font-bold text-white text-3xl sm:text-4xl lg:text-5xl mb-3">
            Contact Us
          </h1>
          <p className="text-[#C4A882] font-body text-sm sm:text-base max-w-md mx-auto">
            We'd love to hear from you — for orders, feedback, or just to say hello.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">

          {/* ── Contact info ── */}
          <div className="flex flex-col gap-6">
            <SectionHeading
              label="Reach Us"
              title="We're Here for You"
              subtitle="The quickest way to order is via WhatsApp — or come visit us in person!"
              center={false}
            />

            {/* Info cards */}
            <div className="flex flex-col gap-4 mt-2">

              {/* Phone */}
              <a
                href={`tel:${storeConfig.phone}`}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-[#EDE4D3]
                  shadow-[0_2px_8px_rgba(58,26,10,0.06)] hover:border-[#C9922A] transition-colors group"
              >
                <div className="w-11 h-11 rounded-xl bg-[#FAF0E0] flex items-center justify-center flex-shrink-0
                  group-hover:bg-[#C9922A] transition-colors">
                  <Phone size={18} className="text-[#C9922A] group-hover:text-white transition-colors" strokeWidth={2} />
                </div>
                <div>
                  <p className="text-xs text-[#9A6C4A] font-body uppercase tracking-wider mb-0.5">Phone</p>
                  <p className="font-semibold text-[#3D1A0A] font-body text-sm">{storeConfig.phone}</p>
                </div>
              </a>

              {/* WhatsApp */}
              <a
                href={`https://wa.me/${storeConfig.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-[#EDE4D3]
                  shadow-[0_2px_8px_rgba(58,26,10,0.06)] hover:border-[#25D366] transition-colors group"
              >
                <div className="w-11 h-11 rounded-xl bg-[#F0FAF5] flex items-center justify-center flex-shrink-0
                  group-hover:bg-[#25D366] transition-colors">
                  <MessageCircle size={18} className="text-[#25D366] group-hover:text-white transition-colors" strokeWidth={2} />
                </div>
                <div>
                  <p className="text-xs text-[#9A6C4A] font-body uppercase tracking-wider mb-0.5">WhatsApp</p>
                  <p className="font-semibold text-[#3D1A0A] font-body text-sm">+{storeConfig.whatsappNumber}</p>
                </div>
              </a>

              {/* Email */}
              <a
                href={`mailto:${storeConfig.email}`}
                className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-[#EDE4D3]
                  shadow-[0_2px_8px_rgba(58,26,10,0.06)] hover:border-[#C9922A] transition-colors group"
              >
                <div className="w-11 h-11 rounded-xl bg-[#FAF0E0] flex items-center justify-center flex-shrink-0
                  group-hover:bg-[#C9922A] transition-colors">
                  <Mail size={18} className="text-[#C9922A] group-hover:text-white transition-colors" strokeWidth={2} />
                </div>
                <div>
                  <p className="text-xs text-[#9A6C4A] font-body uppercase tracking-wider mb-0.5">Email</p>
                  <p className="font-semibold text-[#3D1A0A] font-body text-sm">{storeConfig.email}</p>
                </div>
              </a>

              {/* Address */}
              <a
                href={storeConfig.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-[#EDE4D3]
                  shadow-[0_2px_8px_rgba(58,26,10,0.06)] hover:border-[#C9922A] transition-colors group"
              >
                <div className="w-11 h-11 rounded-xl bg-[#FAF0E0] flex items-center justify-center flex-shrink-0 mt-0.5
                  group-hover:bg-[#C9922A] transition-colors">
                  <MapPin size={18} className="text-[#C9922A] group-hover:text-white transition-colors" strokeWidth={2} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-[#9A6C4A] font-body uppercase tracking-wider mb-0.5">Address</p>
                  <address className="not-italic font-semibold text-[#3D1A0A] font-body text-sm leading-snug">
                    {storeConfig.address}
                  </address>
                  {storeConfig.landmark && (
                    <p className="text-[#9A6C4A] text-xs font-body mt-0.5">{storeConfig.landmark}</p>
                  )}
                  <span className="inline-flex items-center gap-1 text-[#C9922A] text-xs font-body mt-1">
                    View on Maps <ExternalLink size={11} strokeWidth={2} />
                  </span>
                </div>
              </a>
            </div>

            {/* Social links */}
            <div>
              <p className="text-xs text-[#9A6C4A] font-body uppercase tracking-wider mb-3">Follow Us</p>
              <div className="flex gap-3">
                <a
                  href={storeConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-10 h-10 rounded-xl bg-white border border-[#EDE4D3] flex items-center justify-center
                    text-[#C9922A] hover:bg-[#C9922A] hover:text-white hover:border-[#C9922A] transition-all"
                >
                  <InstagramIcon size={18} />
                </a>
                <a
                  href={storeConfig.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-10 h-10 rounded-xl bg-white border border-[#EDE4D3] flex items-center justify-center
                    text-[#C9922A] hover:bg-[#C9922A] hover:text-white hover:border-[#C9922A] transition-all"
                >
                  <FacebookIcon size={18} />
                </a>
                <a
                  href={`https://wa.me/${storeConfig.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="w-10 h-10 rounded-xl bg-white border border-[#EDE4D3] flex items-center justify-center
                    text-[#25D366] hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-all"
                >
                  <MessageCircle size={18} strokeWidth={2} />
                </a>
              </div>
            </div>
          </div>

          {/* ── Hours + Map + Order CTA ── */}
          <div className="flex flex-col gap-5">

            {/* Opening hours */}
            <div className="bg-white rounded-2xl border border-[#EDE4D3] shadow-[0_2px_8px_rgba(58,26,10,0.06)] overflow-hidden">
              <div className="px-5 py-4 border-b border-[#EDE4D3] flex items-center gap-2">
                <Clock size={16} className="text-[#C9922A]" strokeWidth={2} />
                <h2 className="font-display font-semibold text-[#3D1A0A] text-base">Opening Hours</h2>
              </div>
              <ul className="px-5 py-4 space-y-3">
                {storeConfig.openingHours.map((h) => (
                  <li key={h.day} className="flex items-center justify-between gap-4 text-sm font-body">
                    <span className="text-[#5C2D0E] font-medium">{h.day}</span>
                    <span className="text-[#3D1A0A] font-semibold">{h.hours}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Map placeholder */}
            <div className="rounded-2xl overflow-hidden border border-[#EDE4D3] shadow-[0_2px_8px_rgba(58,26,10,0.06)] bg-[#FAF6F0]">
              <a
                href={storeConfig.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative"
                aria-label="View location on Google Maps"
              >
                {/* Map illustration placeholder */}
                <div className="h-52 flex flex-col items-center justify-center gap-3 bg-[#FAF0E0]">
                  <MapPin size={36} className="text-[#C9922A]" strokeWidth={1.5} />
                  <div className="text-center">
                    <p className="font-display font-semibold text-[#3D1A0A] text-sm">
                      Find Us on Google Maps
                    </p>
                    <p className="text-[#9A6C4A] text-xs font-body mt-1">{storeConfig.address}</p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 bg-[#5C2D0E] text-white text-xs font-semibold px-3 py-1.5 rounded-lg mt-1">
                    <ExternalLink size={11} strokeWidth={2} />
                    Open Maps
                  </span>
                </div>
              </a>
            </div>

            {/* Order CTA */}
            <div className="bg-[#3D1A0A] rounded-2xl p-6 text-center flex flex-col items-center gap-3">
              <div className="text-4xl">🍬</div>
              <h3 className="font-display font-bold text-white text-lg">Ready to Order?</h3>
              <p className="text-[#C4A882] text-sm font-body">
                The fastest way to order is through WhatsApp. We'll confirm your order and arrange delivery.
              </p>
              <WhatsAppButton label="Order Now on WhatsApp" size="md" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
