"use client";

import Link from "next/link";
import { useCart, buildCartLines, cartTotals } from "@/lib/cart";
import { formatLKR } from "@/lib/format";

export default function MobileBottomBar() {
  const items = useCart((s) => s.items);
  const lines = buildCartLines(items);
  const { itemCount, subtotal } = cartTotals(lines);

  if (itemCount === 0) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-ink/10 bg-white/95 backdrop-blur lg:hidden">
      <div className="container-x flex items-center justify-between gap-3 py-3">
        <div className="text-sm">
          <p className="font-medium">{itemCount} item{itemCount > 1 ? "s" : ""}</p>
          <p className="text-xs text-ink/60">Subtotal · {formatLKR(subtotal)}</p>
        </div>
        <Link href="/cart" className="btn-primary">
          View Bag
        </Link>
      </div>
    </div>
  );
}
