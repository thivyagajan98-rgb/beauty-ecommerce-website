"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { getOrders, updateOrderStatus } from "@/lib/orders";
import { PRODUCTS } from "@/lib/products";
import { BRANDS } from "@/lib/brands";
import { formatLKR } from "@/lib/format";
import type { Order } from "@/lib/types";

type Tab = "overview" | "orders" | "products";

const STATUS: Order["status"][] = ["pending", "confirmed", "shipped", "delivered", "cancelled"];

export default function AdminClient() {
  const [tab, setTab] = useState<Tab>("overview");
  const [orders, setOrders] = useState<Order[]>([]);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    setOrders(getOrders());
  }, [tick]);

  const stats = useMemo(() => {
    const totalRevenue = orders.reduce((s, o) => s + o.total, 0);
    const pending = orders.filter((o) => o.status === "pending").length;
    const confirmed = orders.filter((o) => o.status === "confirmed").length;
    return {
      orderCount: orders.length,
      revenue: totalRevenue,
      pending,
      confirmed,
      products: PRODUCTS.length,
      brands: BRANDS.length
    };
  }, [orders]);

  const onStatus = (id: string, status: Order["status"]) => {
    updateOrderStatus(id, status);
    setTick((t) => t + 1);
  };

  return (
    <section className="container-x py-10">
      <div className="flex flex-wrap items-end justify-between gap-3 border-b border-ink/10 pb-4">
        <div>
          <p className="eyebrow">Admin</p>
          <h1 className="font-display mt-1 text-3xl">Dashboard</h1>
          <p className="mt-1 text-xs text-ink/50">
            Local-only view (data persisted on this device).{" "}
            <Link href="/" className="underline">Back to site</Link>
          </p>
        </div>
        <nav className="flex gap-1 rounded-full bg-white p-1 shadow-soft">
          {(["overview", "orders", "products"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-full px-4 py-1.5 text-sm capitalize ${
                tab === t ? "bg-ink text-white" : "text-ink/60 hover:text-ink"
              }`}
            >
              {t}
            </button>
          ))}
        </nav>
      </div>

      {tab === "overview" && (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Stat label="Orders" value={stats.orderCount.toString()} />
          <Stat label="Revenue" value={formatLKR(stats.revenue)} />
          <Stat label="Pending" value={stats.pending.toString()} accent />
          <Stat label="Confirmed" value={stats.confirmed.toString()} />
          <Stat label="Products" value={stats.products.toString()} />
          <Stat label="Brands" value={stats.brands.toString()} />
        </div>
      )}

      {tab === "orders" && (
        <div className="mt-8">
          {orders.length === 0 ? (
            <Empty
              title="No orders yet"
              body="Place a test order from the storefront to see it here."
            />
          ) : (
            <div className="overflow-x-auto rounded-2xl border border-ink/5 bg-white">
              <table className="w-full text-sm">
                <thead className="border-b border-ink/5 bg-cream/60 text-left text-xs uppercase tracking-wider text-ink/60">
                  <tr>
                    <th className="px-4 py-3">Order</th>
                    <th className="px-4 py-3">Customer</th>
                    <th className="px-4 py-3">Items</th>
                    <th className="px-4 py-3">Total</th>
                    <th className="px-4 py-3">Payment</th>
                    <th className="px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink/5">
                  {orders.map((o) => (
                    <tr key={o.id}>
                      <td className="px-4 py-3 align-top">
                        <p className="font-mono text-xs">{o.id}</p>
                        <p className="text-[11px] text-ink/50">
                          {new Date(o.createdAt).toLocaleString()}
                        </p>
                      </td>
                      <td className="px-4 py-3 align-top">
                        <p className="font-medium">{o.customerName}</p>
                        <p className="text-xs text-ink/60">{o.phone}</p>
                        <p className="text-[11px] text-ink/50">{o.city}</p>
                      </td>
                      <td className="px-4 py-3 align-top text-xs">
                        {o.items.length} item{o.items.length > 1 ? "s" : ""}
                        <ul className="mt-1 max-w-xs space-y-0.5 text-[11px] text-ink/60">
                          {o.items.slice(0, 3).map((it) => (
                            <li key={it.productId}>
                              {it.qty}× {it.name}
                            </li>
                          ))}
                          {o.items.length > 3 && <li>+{o.items.length - 3} more</li>}
                        </ul>
                      </td>
                      <td className="px-4 py-3 align-top font-medium">{formatLKR(o.total)}</td>
                      <td className="px-4 py-3 align-top text-xs uppercase tracking-wider">
                        {o.paymentMethod === "cod"
                          ? "COD"
                          : o.paymentMethod === "payhere"
                            ? "Card"
                            : "Bank"}
                      </td>
                      <td className="px-4 py-3 align-top">
                        <select
                          value={o.status}
                          onChange={(e) => onStatus(o.id, e.target.value as Order["status"])}
                          className="rounded-full border border-ink/10 bg-white px-3 py-1 text-xs"
                        >
                          {STATUS.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {tab === "products" && (
        <div className="mt-8 overflow-x-auto rounded-2xl border border-ink/5 bg-white">
          <table className="w-full text-sm">
            <thead className="border-b border-ink/5 bg-cream/60 text-left text-xs uppercase tracking-wider text-ink/60">
              <tr>
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Brand</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Condition</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Stock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink/5">
              {PRODUCTS.map((p) => {
                const brand = BRANDS.find((b) => b.slug === p.brandSlug);
                return (
                  <tr key={p.id}>
                    <td className="px-4 py-3">
                      <Link href={`/product/${p.slug}`} className="font-medium hover:underline">
                        {p.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-xs">{brand?.name}</td>
                    <td className="px-4 py-3 text-xs capitalize">
                      {p.category} · {p.subcategory}
                    </td>
                    <td className="px-4 py-3 text-xs capitalize">{p.condition.replace("-", " ")}</td>
                    <td className="px-4 py-3 font-medium">{formatLKR(p.price)}</td>
                    <td className="px-4 py-3 text-xs">
                      <span className={p.stock <= 3 ? "text-blush-700" : ""}>{p.stock}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <p className="border-t border-ink/5 p-4 text-xs text-ink/50">
            Product editing connects to Supabase in production. See{" "}
            <code className="rounded bg-ink/5 px-1">supabase/schema.sql</code>.
          </p>
        </div>
      )}
    </section>
  );
}

function Stat({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className={`rounded-2xl border p-5 ${accent ? "border-blush-300 bg-blush-50" : "border-ink/5 bg-white"}`}>
      <p className="text-xs uppercase tracking-wider text-ink/60">{label}</p>
      <p className="font-display mt-2 text-2xl">{value}</p>
    </div>
  );
}

function Empty({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-ink/15 bg-white p-12 text-center">
      <p className="font-display text-2xl">{title}</p>
      <p className="mt-2 text-sm text-ink/60">{body}</p>
    </div>
  );
}
