import { MessageCircle } from "lucide-react";
import { storeConfig } from "../config/store";

/**
 * WhatsAppButton — reusable CTA button
 * Props:
 *   label    {string}   — button text
 *   href     {string}   — override URL (defaults to plain wa.me link)
 *   onClick  {fn}       — optional click handler
 *   size     "sm"|"md"|"lg"
 *   fullWidth {boolean}
 */
export default function WhatsAppButton({
  label = "Order on WhatsApp",
  href,
  onClick,
  size = "md",
  fullWidth = false,
}) {
  const url = href || `https://wa.me/${storeConfig.whatsappNumber}`;

  const sizes = {
    sm: "text-sm px-4 py-2.5 gap-1.5",
    md: "text-sm sm:text-base px-5 py-3 gap-2",
    lg: "text-base sm:text-lg px-7 py-3.5 gap-2.5",
  };

  const cls = `btn-whatsapp inline-flex items-center justify-center font-semibold font-body
    rounded-xl ${sizes[size]} ${fullWidth ? "w-full" : ""}`;

  if (onClick) {
    return (
      <button onClick={onClick} className={cls} type="button">
        <MessageCircle size={size === "lg" ? 20 : 18} strokeWidth={2} />
        {label}
      </button>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cls}
      aria-label={label}
    >
      <MessageCircle size={size === "lg" ? 20 : 18} strokeWidth={2} />
      {label}
    </a>
  );
}
