import { createContext, useContext, useReducer, useEffect, useCallback } from "react";
import { calculateSubtotal } from "../utils/cart";

// ── Storage key ───────────────────────────────────────────
const STORAGE_KEY = "nanhe_cart";

// ── Initial state ─────────────────────────────────────────
const initialState = {
  items: [],   // [{ id, name, category, image, price, unit, quantity }]
};

// ── Load from localStorage ────────────────────────────────
function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed.items)) return parsed;
    }
  } catch {
    // corrupted storage — start fresh
  }
  return initialState;
}

// ── Reducer ───────────────────────────────────────────────
function cartReducer(state, action) {
  switch (action.type) {

    case "ADD_TO_CART": {
      const existing = state.items.find((i) => i.id === action.product.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.id === action.product.id
              ? { ...i, quantity: i.quantity + (action.qty ?? 1) }
              : i
          ),
        };
      }
      return {
        ...state,
        items: [
          ...state.items,
          {
            id:       action.product.id,
            name:     action.product.name,
            category: action.product.category,
            image:    action.product.image,
            price:    action.product.price,
            unit:     action.product.unit,
            quantity: action.qty ?? 1,
          },
        ],
      };
    }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        items: state.items.filter((i) => i.id !== action.id),
      };

    case "INCREASE_QUANTITY":
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, quantity: i.quantity + 1 } : i
        ),
      };

    case "DECREASE_QUANTITY":
      return {
        ...state,
        items: state.items
          .map((i) =>
            i.id === action.id ? { ...i, quantity: i.quantity - 1 } : i
          )
          .filter((i) => i.quantity > 0),
      };

    case "CLEAR_CART":
      return { ...state, items: [] };

    case "SET_QUANTITY":
      if (action.quantity <= 0) {
        return {
          ...state,
          items: state.items.filter((i) => i.id !== action.id),
        };
      }
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, quantity: action.quantity } : i
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

  // Persist to localStorage on every change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // storage full or unavailable — fail silently
    }
  }, [state]);

  // ── Actions ───────────────────────────────────────────
  const addToCart = useCallback((product, qty = 1) => {
    dispatch({ type: "ADD_TO_CART", product, qty });
  }, []);

  const removeFromCart = useCallback((id) => {
    dispatch({ type: "REMOVE_FROM_CART", id });
  }, []);

  const increaseQuantity = useCallback((id) => {
    dispatch({ type: "INCREASE_QUANTITY", id });
  }, []);

  const decreaseQuantity = useCallback((id) => {
    dispatch({ type: "DECREASE_QUANTITY", id });
  }, []);

  const setQuantity = useCallback((id, quantity) => {
    dispatch({ type: "SET_QUANTITY", id, quantity });
  }, []);

  const clearCart = useCallback(() => {
    dispatch({ type: "CLEAR_CART" });
  }, []);

  // ── Computed ──────────────────────────────────────────
  const itemCount  = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal   = calculateSubtotal(state.items);
  const isInCart   = useCallback((id) => state.items.some((i) => i.id === id), [state.items]);
  const getItem    = useCallback((id) => state.items.find((i) => i.id === id) || null, [state.items]);

  return (
    <CartContext.Provider
      value={{
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
      }}
    >
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
