"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import type { Product } from "@/lib/types";

export default function ProductActions({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const add = useCart((s) => s.add);
  const stock = product.stock;

  const onAdd = () => {
    if (stock === 0) return;
    add(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  if (stock === 0) {
    return (
      <div className="mt-6">
        <button disabled className="btn-primary w-full opacity-60">Sold out</button>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-3">
      <div className="flex items-stretch gap-3">
        <div className="flex items-center rounded-full border border-ink/10 bg-white">
          <button
            aria-label="Decrease"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="px-4 py-2.5 text-lg"
          >
            −
          </button>
          <span className="min-w-[2ch] text-center text-sm font-medium">{qty}</span>
          <button
            aria-label="Increase"
            onClick={() => setQty((q) => Math.min(stock, q + 1))}
            className="px-4 py-2.5 text-lg"
          >
            +
          </button>
        </div>
        <button onClick={onAdd} className="btn-primary flex-1">
          {added ? "✓ Added to bag" : "Add to bag"}
        </button>
      </div>
      <Link href="/cart" className="btn-outline w-full">
        View bag
      </Link>
    </div>
  );
}
