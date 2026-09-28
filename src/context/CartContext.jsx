import { createContext, useContext, useReducer, useEffect, useCallback } from "react";
import { calculateSubtotal } from "../utils/cart";

// ── Storage key ───────────────────────────────────────────
const STORAGE_KEY = "nanhe_cart_v2";  // bumped to clear old variant-less cache

// ── Cart key helper ───────────────────────────────────────
// Products with variants get a unique key per variant so 250g and 500g
// of the same sweet sit as separate line items in the cart.
export function cartKey(productId, variantLabel) {
  return variantLabel ? `${productId}::${variantLabel}` : productId;
}

// ── Initial state ─────────────────────────────────────────
const initialState = { items: [] };

// ── Load from localStorage ────────────────────────────────
function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed.items)) return parsed;
    }
  } catch { /* corrupted — start fresh */ }
  return initialState;
}

// ── Reducer ───────────────────────────────────────────────
function cartReducer(state, action) {
  switch (action.type) {

    case "ADD_TO_CART": {
      const key = action.key;
      const existing = state.items.find((i) => i.key === key);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.key === key ? { ...i, quantity: i.quantity + (action.qty ?? 1) } : i
          ),
        };
      }
      return {
        ...state,
        items: [
          ...state.items,
          {
            key:          key,                     // unique cart key
            id:           action.product.id,       // original product id
            name:         action.product.name,
            category:     action.product.category,
            image:        action.product.image,
            price:        action.price,            // already-calculated variant price
            unit:         action.variantLabel ?? action.product.unit,
            variantLabel: action.variantLabel ?? null,
            quantity:     action.qty ?? 1,
          },
        ],
      };
    }

    case "REMOVE_FROM_CART":
      return { ...state, items: state.items.filter((i) => i.key !== action.key) };

    case "INCREASE_QUANTITY":
      return {
        ...state,
        items: state.items.map((i) =>
          i.key === action.key ? { ...i, quantity: i.quantity + 1 } : i
        ),
      };

    case "DECREASE_QUANTITY":
      return {
        ...state,
        items: state.items
          .map((i) => i.key === action.key ? { ...i, quantity: i.quantity - 1 } : i)
          .filter((i) => i.quantity > 0),
      };

    case "CLEAR_CART":
      return { ...state, items: [] };

    case "SET_QUANTITY":
      if (action.quantity <= 0) {
        return { ...state, items: state.items.filter((i) => i.key !== action.key) };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.key === action.key ? { ...i, quantity: action.quantity } : i
        ),
      };

    default:
      return state;
  }
}

// ── Context ───────────────────────────────────────────────
const CartContext = createContext(null);

// ── Provider ──────────────────────────────────────────────
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, undefined, loadCart);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
    catch { /* storage full */ }
  }, [state]);

  // ── Actions ───────────────────────────────────────────
  // addToCart now accepts optional variantLabel + variantPrice
  const addToCart = useCallback((product, qty = 1, variantLabel = null, variantPrice = null) => {
    const key   = cartKey(product.id, variantLabel);
    const price = variantPrice ?? product.price;
    dispatch({ type: "ADD_TO_CART", product, qty, key, variantLabel, price });
  }, []);

  const removeFromCart   = useCallback((key) => dispatch({ type: "REMOVE_FROM_CART",   key }),   []);
  const increaseQuantity = useCallback((key) => dispatch({ type: "INCREASE_QUANTITY",  key }),   []);
  const decreaseQuantity = useCallback((key) => dispatch({ type: "DECREASE_QUANTITY",  key }),   []);
  const clearCart        = useCallback(()    => dispatch({ type: "CLEAR_CART"               }),  []);

  const setQuantity = useCallback((key, quantity) => {
    dispatch({ type: "SET_QUANTITY", key, quantity });
  }, []);

  // ── Computed ──────────────────────────────────────────
  const itemCount = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal  = calculateSubtotal(state.items);

  // isInCart / getItem now work by cart key
  const isInCart = useCallback((key) => state.items.some((i) => i.key === key),              [state.items]);
  const getItem  = useCallback((key) => state.items.find((i) => i.key === key) ?? null,      [state.items]);

  return (
    <CartContext.Provider value={{
      items: state.items,
      itemCount,
      subtotal,
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      setQuantity,
      clearCart,
      isInCart,
      getItem,
    }}>
      {children}
    </CartContext.Provider>
  );
}

// ── Hook ──────────────────────────────────────────────────
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
