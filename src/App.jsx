import { BrowserRouter, Routes, Route, ScrollRestoration, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { CartProvider } from "./context/CartContext";
import { storeConfig } from "./config/store";

import Navbar         from "./components/Navbar";
import Footer         from "./components/Footer";
import MobileCartBar  from "./components/MobileCartBar";

import Home     from "./pages/Home";
import Products from "./pages/Products";
import Category from "./pages/Category";
import Cart     from "./pages/Cart";
import Checkout from "./pages/Checkout";
import About    from "./pages/About";
import Contact  from "./pages/Contact";

// ── ScrollToTop — resets scroll on route change ───────────
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo({ top: 0, behavior: "instant" }); }, [pathname]);
  return null;
}

// ── Page title updater ────────────────────────────────────
const pageTitles = {
  "/":               `${storeConfig.brandName} — Premium Sweets, Dairy & Snacks`,
  "/products":       `All Products | ${storeConfig.brandName}`,
  "/products/sweets":"Sweets | ${storeConfig.brandName}",
  "/products/dairy": `Dairy | ${storeConfig.brandName}`,
  "/products/snacks":`Snacks | ${storeConfig.brandName}`,
  "/cart":           `Your Cart | ${storeConfig.brandName}`,
  "/checkout":       `Checkout | ${storeConfig.brandName}`,
  "/about":          `About Us | ${storeConfig.brandName}`,
  "/contact":        `Contact | ${storeConfig.brandName}`,
};

function PageTitle() {
  const { pathname } = useLocation();
  useEffect(() => {
    const title = pageTitles[pathname] ?? storeConfig.siteTitle;
    document.title = title;
  }, [pathname]);
  return null;
}

// ── Layout wrapper ────────────────────────────────────────
function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FFFBF5]">
      <ScrollToTop />
      <PageTitle />
      <Navbar />
      <div className="flex-1">
        <Routes>
          <Route path="/"                  element={<Home />}     />
          <Route path="/products"          element={<Products />} />
          <Route path="/products/:slug"    element={<Category />} />
          <Route path="/cart"              element={<Cart />}     />
          <Route path="/checkout"          element={<Checkout />} />
          <Route path="/about"             element={<About />}    />
          <Route path="/contact"           element={<Contact />}  />
          {/* Catch-all → Home */}
          <Route path="*"                  element={<Home />}     />
        </Routes>
      </div>
      <Footer />
      {/* Sticky mobile cart bar — hidden on /cart and /checkout */}
      <MobileCartBarWrapper />
    </div>
  );
}

function MobileCartBarWrapper() {
  const { pathname } = useLocation();
  // Don't show on cart or checkout pages
  if (pathname === "/cart" || pathname === "/checkout") return null;
  return <MobileCartBar />;
}

// ── App root ──────────────────────────────────────────────
export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Layout />
      </CartProvider>
    </BrowserRouter>
  );
}
