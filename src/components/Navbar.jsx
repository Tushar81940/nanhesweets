import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ShoppingCart, Search, Menu, X } from "lucide-react";
import { useCart } from "../context/CartContext";
import NanheLogo from "./NanheLogo";
import SearchBar from "./SearchBar";

const navLinks = [
  { label: "Home",   to: "/"                },
  { label: "Sweets", to: "/products/sweets" },
  { label: "Dairy",  to: "/products/dairy"  },
  { label: "Snacks", to: "/products/snacks" },
  { label: "About",  to: "/about"           },
  { label: "Contact",to: "/contact"         },
];

export default function Navbar() {
  const { itemCount }         = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  // Scrolled state for shadow/glass effect
  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 10); }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <SearchBar isOpen={searchOpen} onClose={() => setSearchOpen(false)} />

      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300
          ${scrolled
            ? "bg-white/95 backdrop-blur-md shadow-[0_1px_0_rgba(201,146,42,0.15),0_4px_16px_rgba(58,26,10,0.08)]"
            : "bg-white border-b border-[#EDE4D3]"}`}
        role="banner"
      >
        <nav
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4"
          aria-label="Main navigation"
        >
          {/* ── Logo ── */}
          <Link to="/" aria-label="Nanhe — Home" className="flex-shrink-0">
            <NanheLogo size="md" />          </Link>

          {/* ── Desktop nav links ── */}
          <ul className="hidden lg:flex items-center gap-1" role="list">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    `relative px-3.5 py-2 text-sm font-semibold font-body rounded-lg transition-colors
                    ${isActive
                      ? "text-[#5C2D0E] bg-[#FAF0E0]"
                      : "text-[#7A3B15] hover:text-[#5C2D0E] hover:bg-[#FAF6F0]"}`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* ── Right actions ── */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Search products"
              className="p-2 rounded-lg text-[#7A3B15] hover:bg-[#FAF6F0] hover:text-[#5C2D0E] transition-colors"
            >
              <Search size={20} strokeWidth={2} />
            </button>

            {/* Cart */}
            <Link
              to="/cart"
              aria-label={`Cart — ${itemCount} item${itemCount !== 1 ? "s" : ""}`}
              className="relative p-2 rounded-lg text-[#7A3B15] hover:bg-[#FAF6F0] hover:text-[#5C2D0E] transition-colors"
            >
              <ShoppingCart size={20} strokeWidth={2} />
              {itemCount > 0 && (
                <span
                  className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1
                    bg-[#C9922A] text-white text-[10px] font-bold rounded-full
                    flex items-center justify-center leading-none tabular-nums"
                  aria-hidden="true"
                >
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              )}
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              className="lg:hidden p-2 rounded-lg text-[#7A3B15] hover:bg-[#FAF6F0] transition-colors"
            >
              {mobileOpen ? <X size={22} strokeWidth={2} /> : <Menu size={22} strokeWidth={2} />}
            </button>
          </div>
        </nav>

        {/* ── Mobile menu ── */}
        <div
          id="mobile-menu"
          role="dialog"
          aria-label="Navigation menu"
          className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out
            ${mobileOpen ? "max-h-screen border-t border-[#EDE4D3]" : "max-h-0"}`}
        >
          <ul className="px-4 py-3 space-y-1 bg-white pb-6" role="list">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === "/"}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-xl text-sm font-semibold font-body transition-colors
                    ${isActive
                      ? "text-[#5C2D0E] bg-[#FAF0E0]"
                      : "text-[#7A3B15] hover:text-[#5C2D0E] hover:bg-[#FAF6F0]"}`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
            <li className="pt-2">
              <Link
                to="/cart"
                className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[#5C2D0E] text-white text-sm font-semibold"
              >
                <ShoppingCart size={16} strokeWidth={2} />
                Cart
                {itemCount > 0 && (
                  <span className="ml-auto bg-[#C9922A] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                    {itemCount}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </header>
    </>
  );
}
