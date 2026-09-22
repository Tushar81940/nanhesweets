import { Trash2 } from "lucide-react";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/cart";
import QuantitySelector from "./QuantitySelector";

/**
 * CartItem — single row in the cart page
 */
export default function CartItem({ item }) {
  const { removeFromCart, increaseQuantity, decreaseQuantity } = useCart();

  return (
    <li className="flex items-start gap-3 sm:gap-4 py-4 border-b border-[#EDE4D3] last:border-0">
      {/* Image */}
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-[#FAF6F0] flex-shrink-0">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src =
              "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=200&q=60";
          }}
        />
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <div>
            <span className="text-[10px] uppercase tracking-widest text-[#C9922A] font-semibold font-body">
              {item.category}
            </span>
            <h4 className="font-display font-semibold text-[#3D1A0A] text-base leading-snug">
              {item.name}
            </h4>
            <p className="text-[#9A6C4A] text-xs font-body mt-0.5">
              {formatPrice(item.price)} / {item.unit}
            </p>
          </div>

          {/* Remove */}
          <button
            onClick={() => removeFromCart(item.id)}
            aria-label={`Remove ${item.name} from cart`}
            className="p-1.5 rounded-lg text-[#9A6C4A] hover:text-red-500 hover:bg-red-50 transition-colors flex-shrink-0"
          >
            <Trash2 size={15} strokeWidth={2} />
          </button>
        </div>

        {/* Qty + subtotal row */}
        <div className="flex items-center justify-between mt-2.5 gap-2">
          <QuantitySelector
            size="sm"
            quantity={item.quantity}
            onIncrease={() => increaseQuantity(item.id)}
            onDecrease={() => decreaseQuantity(item.id)}
            min={0}
          />
          <span className="font-display font-bold text-[#3D1A0A] text-base tabular-nums">
            {formatPrice(item.price * item.quantity)}
          </span>
        </div>
      </div>
    </li>
  );
}
