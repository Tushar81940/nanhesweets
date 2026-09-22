import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft, User, Phone, MapPin, FileText,
  CheckCircle, ShoppingBag, ExternalLink
} from "lucide-react";
import { useCart } from "../context/CartContext";
import {
  calculateDeliveryCharge,
  calculateOrderTotal,
  formatPrice,
} from "../utils/cart";
import { openWhatsAppOrder } from "../utils/whatsapp";
import CartItem from "../components/CartItem";
import DeliveryBanner from "../components/DeliveryBanner";

// ── Form field component ──────────────────────────────────
function Field({ label, id, error, required, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-[#3D1A0A] font-body">
        {label}
        {required && <span className="text-red-500 ml-0.5" aria-hidden="true">*</span>}
      </label>
      {children}
      {error && (
        <p className="text-red-500 text-xs font-body" role="alert">{error}</p>
      )}
    </div>
  );
}

// ── Input ─────────────────────────────────────────────────
function Input({ id, type = "text", value, onChange, placeholder, hasError, ...rest }) {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-4 py-3 rounded-xl border font-body text-sm text-[#3D1A0A]
        placeholder-[#C4A882] bg-white transition-colors
        focus:outline-none focus:ring-1
        ${hasError
          ? "border-red-400 focus:border-red-400 focus:ring-red-200"
          : "border-[#D4A96A] focus:border-[#C9922A] focus:ring-[#C9922A]/20"}`}
      {...rest}
    />
  );
}

// ── Validation ────────────────────────────────────────────
function validate(form) {
  const errors = {};
  if (!form.name.trim())    errors.name    = "Please enter your full name.";
  if (!form.phone.trim())   errors.phone   = "Please enter your phone number.";
  else if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s/g, "")))
    errors.phone = "Enter a valid 10-digit Indian mobile number.";
  if (!form.address.trim()) errors.address = "Please enter your delivery address.";
  return errors;
}

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name:     "",
    phone:    "",
    address:  "",
    landmark: "",
    notes:    "",
  });
  const [errors, setErrors]       = useState({});
  const [submitted, setSubmitted] = useState(false);

  const delivery = calculateDeliveryCharge(subtotal);
  const total    = calculateOrderTotal(subtotal);

  // Redirect if cart is empty
  if (items.length === 0 && !submitted) {
    return (
      <main className="min-h-[70vh] bg-[#FFFBF5] flex items-center justify-center px-4">
        <div className="text-center flex flex-col items-center gap-4 max-w-xs">
          <div className="text-5xl">🛒</div>
          <h1 className="font-display font-bold text-[#3D1A0A] text-xl">Cart is empty</h1>
          <p className="text-[#7A3B15] font-body text-sm">Add some items before checking out.</p>
          <Link
            to="/products"
            className="px-6 py-3 rounded-xl bg-[#5C2D0E] text-white text-sm font-semibold font-body
              hover:bg-[#3D1A0A] transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </main>
    );
  }

  // ── Success screen ─────────────────────────────────────
  if (submitted) {
    return (
      <main className="min-h-screen bg-[#FFFBF5] flex items-center justify-center px-4 py-16">
        <div className="text-center flex flex-col items-center gap-5 max-w-sm">
          <div className="w-20 h-20 rounded-full bg-[#F0FAF5] border-2 border-[#A3D9C5] flex items-center justify-center">
            <CheckCircle size={36} className="text-[#1A5C44]" strokeWidth={1.5} />
          </div>
          <div>
            <h1 className="font-display font-bold text-[#3D1A0A] text-2xl mb-2">
              Order Sent! 🎉
            </h1>
            <p className="text-[#7A3B15] font-body text-sm leading-relaxed">
              Your order has been sent to WhatsApp. We'll confirm it shortly and arrange delivery.
            </p>
          </div>
          <div className="bg-[#FAF6F0] rounded-2xl border border-[#EDE4D3] px-5 py-4 w-full text-left">
            <p className="text-xs text-[#9A6C4A] font-body mb-1">Order Total</p>
            <p className="font-display font-bold text-[#3D1A0A] text-2xl">{formatPrice(total)}</p>
            <p className="text-xs text-[#9A6C4A] font-body mt-0.5">
              Delivery: {delivery === 0 ? "FREE 🎉" : formatPrice(delivery)}
            </p>
          </div>
          <div className="flex flex-col w-full gap-2">
            <Link
              to="/"
              className="py-3 px-5 rounded-xl bg-[#5C2D0E] text-white text-sm font-semibold font-body
                hover:bg-[#3D1A0A] transition-colors text-center"
            >
              Back to Home
            </Link>
            <Link
              to="/products"
              className="py-3 px-5 rounded-xl border border-[#EDE4D3] bg-white text-[#5C2D0E] text-sm font-semibold font-body
                hover:bg-[#FAF6F0] transition-colors text-center"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // ── Form change handler ────────────────────────────────
  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  // ── Submit ─────────────────────────────────────────────
  function handleSubmit(e) {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      // Scroll to first error
      const firstErrId = Object.keys(errs)[0];
      document.getElementById(firstErrId)?.focus();
      return;
    }
    // Open WhatsApp
    openWhatsAppOrder(items, form, subtotal);
    // Mark submitted + clear cart
    setSubmitted(true);
    clearCart();
  }

  return (
    <main className="min-h-screen bg-[#FFFBF5]">
      {/* Page header */}
      <div className="bg-[#3D1A0A] py-10 sm:py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/cart"
            className="inline-flex items-center gap-1.5 text-[#D4A96A] text-sm font-body hover:text-white transition-colors mb-4"
          >
            <ArrowLeft size={14} strokeWidth={2} />
            Back to Cart
          </Link>
          <h1 className="font-display font-bold text-white text-2xl sm:text-3xl">
            Complete Your Order
          </h1>
          <p className="text-[#C4A882] text-sm font-body mt-1">
            Fill in your delivery details and we'll send it to WhatsApp.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">

            {/* ── Left: form ── */}
            <div className="lg:col-span-2 flex flex-col gap-5">

              {/* Customer info */}
              <div className="bg-white rounded-2xl border border-[#EDE4D3] shadow-[0_2px_8px_rgba(58,26,10,0.06)] overflow-hidden">
                <div className="px-5 py-4 border-b border-[#EDE4D3] flex items-center gap-2">
                  <User size={16} className="text-[#C9922A]" strokeWidth={2} />
                  <h2 className="font-display font-semibold text-[#3D1A0A] text-base">
                    Customer Information
                  </h2>
                </div>
                <div className="px-5 py-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Full Name" id="name" error={errors.name} required>
                    <Input
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Rahul Kumar"
                      hasError={!!errors.name}
                      autoComplete="name"
                    />
                  </Field>
                  <Field label="Mobile Number" id="phone" error={errors.phone} required>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="98XXXXXXXX"
                      hasError={!!errors.phone}
                      autoComplete="tel"
                      maxLength={10}
                    />
                  </Field>
                </div>
              </div>

              {/* Delivery address */}
              <div className="bg-white rounded-2xl border border-[#EDE4D3] shadow-[0_2px_8px_rgba(58,26,10,0.06)] overflow-hidden">
                <div className="px-5 py-4 border-b border-[#EDE4D3] flex items-center gap-2">
                  <MapPin size={16} className="text-[#C9922A]" strokeWidth={2} />
                  <h2 className="font-display font-semibold text-[#3D1A0A] text-base">
                    Delivery Address
                  </h2>
                </div>
                <div className="px-5 py-5 flex flex-col gap-4">
                  <Field label="Full Address" id="address" error={errors.address} required>
                    <textarea
                      id="address"
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="House No. / Street / Area / City"
                      rows={3}
                      autoComplete="street-address"
                      className={`w-full px-4 py-3 rounded-xl border font-body text-sm text-[#3D1A0A]
                        placeholder-[#C4A882] bg-white resize-none transition-colors
                        focus:outline-none focus:ring-1
                        ${errors.address
                          ? "border-red-400 focus:border-red-400 focus:ring-red-200"
                          : "border-[#D4A96A] focus:border-[#C9922A] focus:ring-[#C9922A]/20"}`}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-xs font-body mt-0.5" role="alert">{errors.address}</p>
                    )}
                  </Field>
                  <Field label="Landmark (optional)" id="landmark">
                    <Input
                      id="landmark"
                      name="landmark"
                      value={form.landmark}
                      onChange={handleChange}
                      placeholder="Near ABC School, Opposite Park…"
                    />
                  </Field>
                </div>
              </div>

              {/* Notes */}
              <div className="bg-white rounded-2xl border border-[#EDE4D3] shadow-[0_2px_8px_rgba(58,26,10,0.06)] overflow-hidden">
                <div className="px-5 py-4 border-b border-[#EDE4D3] flex items-center gap-2">
                  <FileText size={16} className="text-[#C9922A]" strokeWidth={2} />
                  <h2 className="font-display font-semibold text-[#3D1A0A] text-base">
                    Special Instructions
                    <span className="text-[#9A6C4A] font-normal text-sm ml-1">(optional)</span>
                  </h2>
                </div>
                <div className="px-5 py-5">
                  <textarea
                    id="notes"
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    placeholder="e.g. Please deliver in the evening, extra sweet…"
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-[#D4A96A] font-body text-sm
                      text-[#3D1A0A] placeholder-[#C4A882] bg-white resize-none
                      focus:outline-none focus:border-[#C9922A] focus:ring-1 focus:ring-[#C9922A]/20 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* ── Right: order summary ── */}
            <div className="lg:sticky lg:top-24 flex flex-col gap-4">
              {/* Items */}
              <div className="bg-white rounded-2xl border border-[#EDE4D3] shadow-[0_2px_8px_rgba(58,26,10,0.06)] overflow-hidden">
                <div className="px-5 py-4 border-b border-[#EDE4D3] flex items-center gap-2">
                  <ShoppingBag size={16} className="text-[#C9922A]" strokeWidth={2} />
                  <h2 className="font-display font-semibold text-[#3D1A0A] text-base">
                    Order Review
                  </h2>
                </div>
                <ul className="px-4 max-h-56 overflow-y-auto divide-y divide-[#FAF0E0]">
                  {items.map((item) => (
                    <li key={item.id} className="flex items-center gap-3 py-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-10 h-10 rounded-lg object-cover flex-shrink-0 bg-[#FAF6F0]"
                        onError={(e) => {
                          e.currentTarget.src = "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=80&q=50";
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-display font-semibold text-[#3D1A0A] text-sm truncate">
                          {item.name}
                        </p>
                        <p className="text-[#9A6C4A] text-xs font-body">
                          {item.unit} × {item.quantity}
                        </p>
                      </div>
                      <span className="font-body font-semibold text-[#3D1A0A] text-sm tabular-nums flex-shrink-0">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Totals */}
                <div className="px-5 py-4 border-t border-[#EDE4D3] space-y-2.5">
                  <div className="flex justify-between text-sm font-body text-[#5C2D0E]">
                    <span>Subtotal</span>
                    <span className="font-semibold tabular-nums">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-body">
                    <span className="text-[#5C2D0E]">Delivery</span>
                    {delivery === 0 ? (
                      <span className="font-semibold text-[#1A5C44]">FREE 🎉</span>
                    ) : (
                      <span className="font-semibold text-[#5C2D0E] tabular-nums">{formatPrice(delivery)}</span>
                    )}
                  </div>
                  <div className="border-t border-[#EDE4D3] pt-2.5 flex justify-between">
                    <span className="font-display font-bold text-[#3D1A0A]">Total</span>
                    <span className="font-display font-bold text-[#3D1A0A] text-xl tabular-nums">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Delivery banner */}
              <DeliveryBanner />

              {/* Place order button */}
              <button
                type="submit"
                className="flex items-center justify-center gap-2 w-full py-4 px-5 rounded-xl
                  bg-[#25D366] text-white text-base font-bold font-body
                  hover:bg-[#128C7E] active:scale-[0.98] transition-all shadow-lg"
              >
                <ExternalLink size={18} strokeWidth={2} />
                Place Order on WhatsApp
              </button>

              <p className="text-[#9A6C4A] text-[11px] font-body text-center leading-relaxed px-1">
                Clicking above will open WhatsApp with your complete order. No account or payment required.
              </p>
            </div>
          </div>
        </form>
      </div>

      {/* Bottom padding for mobile */}
      <div className="h-8" aria-hidden="true" />
    </main>
  );
}
