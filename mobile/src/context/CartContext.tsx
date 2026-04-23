import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { CartLine } from "../types";

type AddPayload = Omit<CartLine, "quantity"> & { quantity?: number };

type CartContextValue = {
  lines: CartLine[];
  addOrMerge: (payload: AddPayload) => void;
  setQuantity: (index: number, quantity: number) => void;
  removeAt: (index: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

function lineKey(l: CartLine) {
  return `${l.productId}|${l.size}|${l.sugar ? 1 : 0}|${l.whipped ? 1 : 0}`;
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  const addOrMerge = useCallback((payload: AddPayload) => {
    const qty = payload.quantity ?? 1;
    setLines((prev) => {
      const next = [...prev];
      const candidate: CartLine = { ...payload, quantity: qty };
      const idx = next.findIndex((l) => lineKey(l) === lineKey(candidate));
      if (idx >= 0) {
        next[idx] = { ...next[idx], quantity: next[idx].quantity + qty };
        return next;
      }
      return [...next, candidate];
    });
  }, []);

  const setQuantity = useCallback((index: number, quantity: number) => {
    setLines((prev) => {
      const next = [...prev];
      if (!next[index]) return prev;
      if (quantity <= 0) {
        next.splice(index, 1);
        return next;
      }
      next[index] = { ...next[index], quantity };
      return next;
    });
  }, []);

  const removeAt = useCallback((index: number) => {
    setLines((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const value = useMemo(
    () => ({ lines, addOrMerge, setQuantity, removeAt, clear }),
    [lines, addOrMerge, setQuantity, removeAt, clear]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart outside CartProvider");
  return ctx;
}
