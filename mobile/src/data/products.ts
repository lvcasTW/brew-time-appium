import type { Product } from "../types";

const base = (category: Product["category"], prefix: string, count: number): Product[] =>
  Array.from({ length: count }, (_, i) => {
    const n = i + 1;
    const id = `${prefix}-${String(n).padStart(2, "0")}`;
    return {
      id,
      name: `${prefix} ${n}`,
      category,
      priceCents: 450 + n * 30 + (category === "iced" ? 50 : 0),
      description: `Receita ${category} #${n}. Notas aromáticas e corpo equilibrado.`,
    };
  });

/** Lista longa para cenários de scroll no catálogo. */
export const PRODUCTS: Product[] = [
  ...base("espresso", "Expresso", 18),
  ...base("latte", "Latte", 18),
  ...base("iced", "Gelado", 20),
];

export const TARGET_SCROLL_PRODUCT_ID = "gelado-17";
