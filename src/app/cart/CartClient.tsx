"use client";

import Image from "next/image";
import Link from "next/link";
import { buildCartLines, cartTotals, useCart } from "@/lib/cart";
import { BRANDS } from "@/lib/brands";
import { formatLKR } from "@/lib/format";

export default function CartClient() {
  const items = useCart((s) => s.items);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);

  const lines = buildCartLines(items);
  const totals = cartTotals(lines);

  if (lines.length === 0) {
    return (
      <section className="container-x section">
        <div className="rounded-3xl border border-dashed border-ink/15 bg-white p-12 text-center">
          <p className="font-display text-3xl">Your bag is empty</p>
          <p className="mt-2 text-sm text-ink/60">
            Add a few of our most-loved pieces to get started.
          </p>
          <div className="mt-5 flex justify-center gap-3">
            <Link href="/shop" className="btn-primary">Shop the edit</Link>
            <Link href="/viral" className="btn-outline">See viral picks</Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="container-x section">
      <p className="eyebrow">Bag</p>
      <h1 className="h-display mt-2">Your bag</h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_380px]">
        <ul className="space-y-4">
          {lines.map(({ product, qty, lineTotal }) => {
            const brand = BRANDS.find((b) => b.slug === product.brandSlug);
            return (
              <li
                key={product.id}
                className="flex gap-4 rounded-2xl border border-ink/5 bg-white p-3 sm:p-4"
              >
                <Link
                  href={`/product/${product.slug}`}
                  className="relative aspect-square w-24 shrink-0 overflow-hidden rounded-xl bg-beige sm:w-28"
                >
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    sizes="120px"
                    className="object-cover"
                  />
                </Link>
                <div className="flex flex-1 flex-col justify-between gap-2">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.16em] text-ink/50">
                      {brand?.name}
                    </p>
                    <Link
                      href={`/product/${product.slug}`}
                      className="line-clamp-2 text-sm font-medium hover:underline"
                    >
                      {product.name}
                    </Link>
                    {product.condition === "gently-used" && (
                      <span className="mt-1 inline-block text-[11px] text-ink/60">
                        Gently Used
                      </span>
                    )}
                  </div>
                  <div className="flex items-end justify-between gap-3">
                    <div className="flex items-center rounded-full border border-ink/10 bg-cream">
                      <button
                        aria-label="Decrease"
                        className="px-3 py-1.5 text-base"
                        onClick={() => setQty(product.id, Math.max(0, qty - 1))}
                      >
                        −
                      </button>
                      <span className="min-w-[2ch] text-center text-sm font-medium">{qty}</span>
                      <button
                        aria-label="Increase"
                        className="px-3 py-1.5 text-base"
                        onClick={() => setQty(product.id, Math.min(product.stock, qty + 1))}
                      >
                        +
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">{formatLKR(lineTotal)}</p>
                      <button
                        onClick={() => remove(product.id)}
                        className="text-[11px] text-ink/50 underline-offset-2 hover:text-blush-600 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        {/* Summary */}
        <aside className="h-fit rounded-2xl border border-ink/5 bg-white p-6 lg:sticky lg:top-24">
          <p className="font-display text-xl">Order summary</p>
          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-ink/60">Subtotal</dt>
              <dd>{formatLKR(totals.subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink/60">Shipping</dt>
              <dd>
                {totals.shipping === 0 ? (
                  <span className="text-blush-600">Free</span>
                ) : (
                  formatLKR(totals.shipping)
                )}
              </dd>
            </div>
            <div className="flex justify-between border-t border-ink/10 pt-3 text-base font-semibold">
              <dt>Total</dt>
              <dd>{formatLKR(totals.total)}</dd>
            </div>
          </dl>
          {totals.subtotal < 15000 && (
            <p className="mt-3 rounded-xl bg-blush-50 p-3 text-xs text-blush-700">
              Add {formatLKR(15000 - totals.subtotal)} more for free shipping.
            </p>
          )}
          <Link href="/checkout" className="btn-primary mt-5 w-full">Checkout</Link>
          <Link href="/shop" className="btn-outline mt-2 w-full">Continue shopping</Link>
          <p className="mt-4 text-[11px] text-ink/50">
            Cash on Delivery, PayHere & Bank Transfer accepted at checkout.
          </p>
        </aside>
      </div>
    </section>
  );
}
