"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getOrder } from "@/lib/orders";
import type { Order } from "@/lib/types";
import { formatLKR } from "@/lib/format";

export default function OrderConfirmationClient({ orderId }: { orderId: string }) {
  const params = useSearchParams();
  const isPayHere = params.get("pay") === "payhere";

  const [order, setOrder] = useState<Order | null | undefined>(undefined);

  useEffect(() => {
    setOrder(getOrder(orderId) ?? null);
  }, [orderId]);

  if (order === undefined) {
    return (
      <section className="container-x section">
        <div className="h-8 w-48 animate-pulse rounded bg-ink/5" />
      </section>
    );
  }

  if (order === null) {
    return (
      <section className="container-x section">
        <div className="rounded-3xl border border-dashed border-ink/15 bg-white p-12 text-center">
          <p className="font-display text-3xl">Order not found</p>
          <p className="mt-2 text-sm text-ink/60">
            We couldn’t locate this order on this device. If you used another device or browser,
            please reach out on WhatsApp with your order ID.
          </p>
          <Link href="/" className="btn-primary mt-5 inline-flex">Back home</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="container-x section">
      <div className="mx-auto max-w-2xl">
        <div className="rounded-3xl border border-blush-200 bg-blush-50 p-8 text-center">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-blush-500 text-white">
            ✓
          </span>
          <p className="font-display mt-4 text-3xl">Thank you, {order.customerName.split(" ")[0]}!</p>
          <p className="mt-2 text-sm text-ink/70">
            Your order <span className="font-mono font-medium">{order.id}</span> is{" "}
            <span className="font-medium">{order.status}</span>.
            We’ll WhatsApp you shortly to confirm delivery details.
          </p>
        </div>

        {isPayHere && order.status === "pending" && (
          <div className="mt-5 rounded-2xl border border-ink/5 bg-white p-5">
            <p className="text-sm font-semibold">Complete your card payment</p>
            <p className="mt-1 text-xs text-ink/60">
              In production, you'll be redirected to PayHere here. For demo, we’ve recorded your
              order as pending — our team will follow up to complete payment.
            </p>
          </div>
        )}

        {order.paymentMethod === "bank-transfer" && (
          <div className="mt-5 rounded-2xl border border-ink/5 bg-white p-5 text-sm">
            <p className="font-semibold">Bank transfer details</p>
            <ul className="mt-2 space-y-1 text-ink/70">
              <li>Bank: Commercial Bank of Ceylon</li>
              <li>Account name: FACEZ.lk</li>
              <li>Account #: 0000-000-0000</li>
              <li>Reference: {order.id}</li>
            </ul>
            <p className="mt-3 text-xs text-ink/60">
              Send us a screenshot on WhatsApp once paid; we’ll confirm and dispatch.
            </p>
          </div>
        )}

        <div className="mt-6 rounded-2xl border border-ink/5 bg-white p-6">
          <p className="font-display text-lg">Order summary</p>
          <ul className="mt-4 divide-y divide-ink/5">
            {order.items.map((it) => (
              <li key={it.productId} className="flex justify-between gap-4 py-3 text-sm">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.16em] text-ink/50">{it.brand}</p>
                  <p className="font-medium">{it.name}</p>
                  <p className="text-xs text-ink/60">Qty {it.qty}</p>
                </div>
                <p className="font-medium">{formatLKR(it.price * it.qty)}</p>
              </li>
            ))}
          </ul>
          <dl className="mt-4 space-y-1 border-t border-ink/10 pt-4 text-sm">
            <Row label="Subtotal" value={formatLKR(order.subtotal)} />
            <Row label="Shipping" value={order.shipping === 0 ? "Free" : formatLKR(order.shipping)} />
            <Row label="Total" value={formatLKR(order.total)} bold />
            <Row
              label="Payment"
              value={order.paymentMethod === "payhere" ? "Card · PayHere" : "Bank Transfer"}
            />
          </dl>
        </div>

        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/shop" className="btn-primary">Continue shopping</Link>
          <a
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "94760181199"}?text=${encodeURIComponent(
              `Hi FACEZ.lk! Order ${order.id}`
            )}`}
            className="btn-outline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Message us on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className={`flex justify-between ${bold ? "border-t border-ink/10 pt-2 text-base font-semibold" : ""}`}>
      <dt className={bold ? "" : "text-ink/60"}>{label}</dt>
      <dd>{value}</dd>
    </div>
  );
}
