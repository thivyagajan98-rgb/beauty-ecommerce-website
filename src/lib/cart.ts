"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { BRANDS } from "./brands";
import type { CartItem, Product, ProductSnapshot } from "./types";

function makeSnapshot(p: Product): ProductSnapshot {
  const brandName =
    p.brandName ?? BRANDS.find((b) => b.slug === p.brandSlug)?.name ?? p.brandSlug;
  return {
    slug: p.slug,
    name: p.name,
    brandSlug: p.brandSlug,
    brandName,
    price: p.price,
    image: p.images[0] ?? "",
    condition: p.condition,
    stock: p.stock
  };
}

interface CartState {
  items: CartItem[];
  add: (product: Product, qty?: number) => void;
  remove: (productId: string) => void;
  setQty: (productId: string, qty: number) => void;
  clear: () => void;
}

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      add: (product, qty = 1) =>
        set((state) => {
          const existing = state.items.find((i) => i.productId === product.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === product.id
                  ? { ...i, qty: i.qty + qty, snapshot: makeSnapshot(product) }
                  : i
              )
            };
          }
          return {
            items: [
              ...state.items,
              { productId: product.id, qty, snapshot: makeSnapshot(product) }
            ]
          };
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
      // Bumped from v1 — old carts only stored {productId, qty} without snapshots.
      // Existing users on v1 will start with an empty cart on v2.
      name: "facez-cart-v2",
      version: 2,
      migrate: (persisted, version) => {
        if (version < 2) return { items: [] };
        return persisted as CartState;
      }
    }
  )
);

export interface CartLine {
  productId: string;
  qty: number;
  snapshot: ProductSnapshot;
  lineTotal: number;
}

export function buildCartLines(items: CartItem[]): CartLine[] {
  return items.map((i) => ({
    productId: i.productId,
    qty: i.qty,
    snapshot: i.snapshot,
    lineTotal: i.snapshot.price * i.qty
  }));
}

export function cartTotals(lines: CartLine[]) {
  const subtotal = lines.reduce((s, l) => s + l.lineTotal, 0);
  const itemCount = lines.reduce((s, l) => s + l.qty, 0);
  // Free shipping over LKR 25,000; flat LKR 450 otherwise.
  const shipping = subtotal === 0 ? 0 : subtotal >= 25000 ? 0 : 450;
  const total = subtotal + shipping;
  return { subtotal, shipping, total, itemCount };
}
