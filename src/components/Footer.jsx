import { Link } from "react-router-dom";
import { Phone, MapPin, MessageCircle, Clock } from "lucide-react";

// Social icon SVGs (lucide-react doesn't include Instagram/Facebook in this version)
function InstagramIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );
}
function FacebookIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}
import { storeConfig } from "../config/store";
import NanheLogo from "./NanheLogo";

const quickLinks = [
  { label: "Home",    to: "/"                },
  { label: "Sweets",  to: "/products/sweets" },
  { label: "Dairy",   to: "/products/dairy"  },
  { label: "Snacks",  to: "/products/snacks" },
  { label: "About",   to: "/about"           },
  { label: "Contact", to: "/contact"         },
];

const customerLinks = [
  { label: "Cart",              to: "/cart"     },
  { label: "Checkout",          to: "/checkout" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#2A0E02] text-[#E8CFA0]" role="contentinfo">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1 flex flex-col gap-4">
            <NanheLogo size="lg" variant="light" />
            <p className="text-sm text-[#C4A882] leading-relaxed font-body max-w-xs">
              {storeConfig.slogan}
            </p>
            <p className="text-sm text-[#C4A882] leading-relaxed font-body max-w-xs">
              Crafting authentic Indian sweets, dairy &amp; snacks with love and the finest ingredients.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3 mt-1">
              <a
                href={storeConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Instagram"
                className="w-9 h-9 rounded-lg bg-[#3D1A0A] flex items-center justify-center
                  text-[#C9922A] hover:bg-[#C9922A] hover:text-white transition-colors"
              >
                <InstagramIcon size={16} />
              </a>
              <a
                href={storeConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Facebook"
                className="w-9 h-9 rounded-lg bg-[#3D1A0A] flex items-center justify-center
                  text-[#C9922A] hover:bg-[#C9922A] hover:text-white transition-colors"
              >
                <FacebookIcon size={16} />
              </a>
              <a
                href={`https://wa.me/${storeConfig.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="w-9 h-9 rounded-lg bg-[#3D1A0A] flex items-center justify-center
                  text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors"
              >
                <MessageCircle size={16} strokeWidth={2} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-semibold text-[#E8CFA0] text-base mb-4 gold-underline">
              Quick Links
            </h3>
            <ul className="space-y-2.5" role="list">
              {quickLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-[#C4A882] hover:text-[#E8CFA0] font-body transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer */}
          <div>
            <h3 className="font-display font-semibold text-[#E8CFA0] text-base mb-4 gold-underline">
              Customer
            </h3>
            <ul className="space-y-2.5 mb-5" role="list">
              {customerLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-sm text-[#C4A882] hover:text-[#E8CFA0] font-body transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <a
              href={`https://wa.me/${storeConfig.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white text-xs font-semibold
                px-4 py-2.5 rounded-xl hover:bg-[#128C7E] transition-colors"
            >
              <MessageCircle size={14} strokeWidth={2} />
              Order on WhatsApp
            </a>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display font-semibold text-[#E8CFA0] text-base mb-4 gold-underline">
              Contact Us
            </h3>
            <ul className="space-y-3" role="list">
              <li className="flex items-start gap-2.5 text-sm text-[#C4A882] font-body">
                <Phone size={14} className="text-[#C9922A] flex-shrink-0 mt-0.5" strokeWidth={2} />
                <a href={`tel:${storeConfig.phone}`} className="hover:text-[#E8CFA0] transition-colors">
                  {storeConfig.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5 text-sm text-[#C4A882] font-body">
                <MapPin size={14} className="text-[#C9922A] flex-shrink-0 mt-0.5" strokeWidth={2} />
                <address className="not-italic leading-relaxed">{storeConfig.address}</address>
              </li>
              {storeConfig.openingHours.map((h) => (
                <li key={h.day} className="flex items-start gap-2.5 text-sm text-[#C4A882] font-body">
                  <Clock size={14} className="text-[#C9922A] flex-shrink-0 mt-0.5" strokeWidth={2} />
                  <div>
                    <span className="block text-[#E8CFA0] text-xs font-medium">{h.day}</span>
                    {h.hours}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-[#3D1A0A]" />

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#9A6C4A] font-body">
        <p>© {year} {storeConfig.brandName}. All rights reserved.</p>
        <p>Made with ❤️ for quality &amp; taste</p>
      </div>
    </footer>
  );
}
