import { Minus, Plus } from "lucide-react";

/**
 * QuantitySelector — inline ± stepper
 * Props:
 *   quantity   {number}
 *   onIncrease {fn}
 *   onDecrease {fn}
 *   min        {number} default 1
 *   size       "sm" | "md"
 */
export default function QuantitySelector({
  quantity,
  onIncrease,
  onDecrease,
  min = 1,
  size = "md",
}) {
  const isSm = size === "sm";

  return (
    <div className="flex items-center rounded-lg border border-[#D4A96A] bg-white overflow-hidden select-none">
      <button
        onClick={onDecrease}
        disabled={quantity <= min}
        aria-label="Decrease quantity"
        className={`flex items-center justify-center text-[#5C2D0E] hover:bg-[#FAF0E0] transition-colors disabled:opacity-30 disabled:cursor-not-allowed
          ${isSm ? "w-7 h-7" : "w-9 h-9"}`}
      >
        <Minus size={isSm ? 12 : 14} strokeWidth={2.5} />
      </button>

      <span
        className={`font-body font-semibold text-[#3D1A0A] text-center tabular-nums
          ${isSm ? "w-6 text-sm" : "w-8 text-base"}`}
        aria-label={`Quantity: ${quantity}`}
      >
        {quantity}
      </span>

      <button
        onClick={onIncrease}
        aria-label="Increase quantity"
        className={`flex items-center justify-center text-[#5C2D0E] hover:bg-[#FAF0E0] transition-colors
          ${isSm ? "w-7 h-7" : "w-9 h-9"}`}
      >
        <Plus size={isSm ? 12 : 14} strokeWidth={2.5} />
      </button>
    </div>
  );
}
