/**
 * NanheLogo — renders the Nanhe brand logo image.
 *
 * Logo file:  /public/images/logo.png
 * Favicon:    /public/favicon.png
 *
 * Props:
 *   size      "sm" | "md" | "lg" | "xl"
 *   className  extra Tailwind classes (e.g. for dark-bg inversion)
 *   variant   "default" | "light"  — "light" brightens for dark backgrounds
 */
export default function NanheLogo({ size = "md", className = "", variant = "default" }) {
  const heights = {
    sm:  "h-9",
    md:  "h-11",
    lg:  "h-16",
    xl:  "h-24",
  };

  // On dark backgrounds the cream/white parts of the logo still show fine.
  // We only slightly brighten for the dark footer so the logo pops.
  const filter = variant === "light"
    ? "brightness-110 contrast-105"
    : "";

  return (
    <img
      src="/images/logo.png?v=2"
      alt="Nanhe Dairy and Sweets"
      width="auto"
      height="auto"
      loading="eager"
      decoding="async"
      className={`${heights[size]} w-auto object-contain select-none ${filter} ${className}`}
      onError={(e) => {
        // If logo.png is missing, render a minimal text badge instead
        const parent = e.currentTarget.parentElement;
        e.currentTarget.style.display = "none";
        const badge = document.createElement("div");
        badge.className =
          "flex flex-col items-start leading-none select-none";
        badge.innerHTML = `
          <span style="font-family:'Playfair Display',Georgia,serif;font-weight:700;color:#5C2D0E;font-size:1.6rem;line-height:1">Nanhe</span>
          <span style="font-family:Inter,system-ui,sans-serif;font-size:0.55rem;letter-spacing:0.15em;color:#C9922A;font-weight:600;text-transform:uppercase">Dairy &amp; Sweets</span>
        `;
        parent.appendChild(badge);
      }}
    />
  );
}
