/**
 * SectionHeading — consistent premium section title
 * Props:
 *   label     {string}  — small uppercase label above title
 *   title     {string}  — main heading
 *   subtitle  {string}  — optional paragraph below
 *   center    {boolean} — center-align (default true)
 */
export default function SectionHeading({ label, title, subtitle, center = true }) {
  return (
    <div className={`flex flex-col gap-2 ${center ? "items-center text-center" : "items-start"}`}>
      {label && (
        <span className="text-xs uppercase tracking-[0.2em] text-[#C9922A] font-semibold font-body">
          {label}
        </span>
      )}
      <h2 className="font-display font-bold text-[#3D1A0A] text-2xl sm:text-3xl lg:text-4xl leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className={`text-[#7A3B15] font-body text-base leading-relaxed mt-1 ${center ? "max-w-xl" : "max-w-lg"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
