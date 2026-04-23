import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

type FavoritesContextValue = {
  ids: Set<string>;
  toggle: (productId: string) => void;
  has: (productId: string) => boolean;
};

const FavoritesContext = createContext<FavoritesContextValue | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [ids, setIds] = useState<Set<string>>(() => new Set());

  const toggle = useCallback((productId: string) => {
    setIds((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) next.delete(productId);
      else next.add(productId);
      return next;
    });
  }, []);

  const has = useCallback((productId: string) => ids.has(productId), [ids]);

  const value = useMemo(() => ({ ids, toggle, has }), [ids, toggle, has]);

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites outside FavoritesProvider");
  return ctx;
}
