export type CategoryId = "espresso" | "latte" | "iced";

export type Product = {
  id: string;
  name: string;
  category: CategoryId;
  priceCents: number;
  description: string;
};

export type CartLine = {
  productId: string;
  name: string;
  size: "P" | "M" | "G";
  sugar: boolean;
  whipped: boolean;
  quantity: number;
  unitPriceCents: number;
};
