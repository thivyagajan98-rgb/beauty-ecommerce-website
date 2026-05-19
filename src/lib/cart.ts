"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { PRODUCTS } from "./products";
import type { CartItem, Product } from "./types";

interface CartState {
  items: CartItem[];
  add: (productId: string, qty?: number) => void;
  remove: (productId: string) => void;
  setQty: (productId: string, qty: number) => void;
  clear: () => void;
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      add: (productId, qty = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.productId === productId);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === productId ? { ...i, qty: i.qty + qty } : i
              )
            };
          }
          return { items: [...state.items, { productId, qty }] };
        }),
      remove: (productId) =>
        set((state) => ({ items: state.items.filter((i) => i.productId !== productId) })),
      setQty: (productId, qty) =>
        set((state) => ({
          items: state.items
            .map((i) => (i.productId === productId ? { ...i, qty } : i))
            .filter((i) => i.qty > 0)
        })),
      clear: () => set({ items: [] })
    }),
    {
      name: "facez-cart-v1",
      version: 1
    }
  )
);

export interface CartLine {
  product: Product;
  qty: number;
  lineTotal: number;
}

export function buildCartLines(items: CartItem[]): CartLine[] {
  return items
    .map((i) => {
      const product = PRODUCTS.find((p) => p.id === i.productId);
      if (!product) return null;
      return { product, qty: i.qty, lineTotal: product.price * i.qty };
    })
    .filter(Boolean) as CartLine[];
}

export function cartTotals(lines: CartLine[]) {
  const subtotal = lines.reduce((s, l) => s + l.lineTotal, 0);
  const itemCount = lines.reduce((s, l) => s + l.qty, 0);
  // Free shipping threshold; flat LKR 450 otherwise. Tweak as needed.
  const shipping = subtotal === 0 ? 0 : subtotal >= 15000 ? 0 : 450;
  const total = subtotal + shipping;
  return { subtotal, shipping, total, itemCount };
}
