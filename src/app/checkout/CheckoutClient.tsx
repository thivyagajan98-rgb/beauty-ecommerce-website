"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { buildCartLines, cartTotals, useCart } from "@/lib/cart";
import { formatLKR } from "@/lib/format";
import { makeOrderId, saveOrder } from "@/lib/orders";
import type { Order, OrderItem, PaymentMethod } from "@/lib/types";

const SRI_LANKAN_CITIES = [
  "Colombo",
  "Dehiwala",
  "Mount Lavinia",
  "Moratuwa",
  "Nugegoda",
  "Maharagama",
  "Battaramulla",
  "Rajagiriya",
  "Kandy",
  "Galle",
  "Matara",
  "Negombo",
  "Kurunegala",
  "Anuradhapura",
  "Jaffna",
  "Other"
];

export default function CheckoutClient() {
  const router = useRouter();
  const items = useCart((s) => s.items);
  const clear = useCart((s) => s.clear);

  const lines = useMemo(() => buildCartLines(items), [items]);
  const totals = useMemo(() => cartTotals(lines), [lines]);

  const [form, setForm] = useState({
    customerName: "",
    phone: "",
    email: "",
    address: "",
    city: "Colombo",
    notes: ""
  });
  const [payment, setPayment] = useState<PaymentMethod>("payhere");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (lines.length === 0) {
    return (
      <section className="container-x section">
        <div className="rounded-3xl border border-dashed border-ink/15 bg-white p-12 text-center">
          <p className="font-display text-3xl">Your bag is empty</p>
          <p className="mt-2 text-sm text-ink/60">Add something before checking out.</p>
          <Link href="/shop" className="btn-primary mt-5 inline-flex">Shop now</Link>
        </div>
      </section>
    );
  }

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.customerName.trim()) e.customerName = "Required";
    if (!/^[0-9+\s-]{7,}$/.test(form.phone)) e.phone = "Enter a valid phone";
    if (!form.address.trim()) e.address = "Required";
    if (!form.city.trim()) e.city = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    const orderItems: OrderItem[] = lines.map((l) => ({
      productId: l.productId,
      name: l.snapshot.name,
      brand: l.snapshot.brandName,
      qty: l.qty,
      price: l.snapshot.price,
      image: l.snapshot.image
    }));

    const order: Order = {
      id: makeOrderId(),
      customerName: form.customerName.trim(),
      phone: form.phone.trim(),
      email: form.email.trim() || undefined,
      address: form.address.trim(),
      city: form.city,
      notes: form.notes.trim() || undefined,
      items: orderItems,
      subtotal: totals.subtotal,
      shipping: totals.shipping,
      total: totals.total,
      paymentMethod: payment,
      status: "pending",
      createdAt: new Date().toISOString()
    };

    await saveOrder(order);
    clear();

    if (payment === "payhere") {
      router.push(`/order/${order.id}?pay=payhere`);
      return;
    }

    router.push(`/order/${order.id}`);
  };

  const setField =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <section className="container-x section">
      <p className="eyebrow">Checkout</p>
      <h1 className="h-display mt-2">Almost there</h1>

      <form onSubmit={submit} className="mt-8 grid gap-10 lg:grid-cols-[1fr_400px]">
        {/* Form */}
        <div className="space-y-8">
          <Section title="1 · Contact">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full name" error={errors.customerName}>
                <input className="input" value={form.customerName} onChange={setField("customerName")} />
              </Field>
              <Field label="Phone" error={errors.phone}>
                <input
                  className="input"
                  inputMode="tel"
                  placeholder="+94 77 123 4567"
                  value={form.phone}
                  onChange={setField("phone")}
                />
              </Field>
              <Field label="Email (optional)">
                <input
                  className="input"
                  type="email"
                  placeholder="you@email.com"
                  value={form.email}
                  onChange={setField("email")}
                />
              </Field>
            </div>
          </Section>

          <Section title="2 · Delivery">
            <div className="grid gap-4">
              <Field label="Address" error={errors.address}>
                <textarea
                  rows={3}
                  className="input resize-none"
                  placeholder="No. 24, Galle Road, Colombo 03"
                  value={form.address}
                  onChange={setField("address")}
                />
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="City" error={errors.city}>
                  <select className="input" value={form.city} onChange={setField("city")}>
                    {SRI_LANKAN_CITIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Notes (optional)">
                  <input
                    className="input"
                    placeholder="Apartment, landmark, gift message…"
                    value={form.notes}
                    onChange={setField("notes")}
                  />
                </Field>
              </div>
            </div>
          </Section>

          <Section title="3 · Payment">
            <div className="space-y-3">
              <PayOption
                checked={payment === "payhere"}
                onClick={() => setPayment("payhere")}
                title="Card payment · PayHere"
                body="Visa, MasterCard, Amex via PayHere (Sri Lanka). You'll be redirected to complete payment securely."
                badge="Most popular"
              />
              <PayOption
                checked={payment === "bank-transfer"}
                onClick={() => setPayment("bank-transfer")}
                title="Bank Transfer"
                body="Transfer to our Commercial Bank account; we confirm via WhatsApp before dispatch."
              />
            </div>
          </Section>
        </div>

        {/* Summary */}
        <aside className="h-fit rounded-2xl border border-ink/5 bg-white p-6 lg:sticky lg:top-24">
          <p className="font-display text-xl">Your order</p>
          <ul className="mt-4 space-y-3">
            {lines.map((l) => (
              <li key={l.productId} className="flex gap-3">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-beige">
                  {l.snapshot.image && (
                    <Image
                      src={l.snapshot.image}
                      alt={l.snapshot.name}
                      fill
                      sizes="56px"
                      className="object-cover"
                    />
                  )}
                  <span className="absolute -right-1 -top-1 grid h-5 min-w-[20px] place-items-center rounded-full bg-ink px-1 text-[10px] text-white">
                    {l.qty}
                  </span>
                </div>
                <div className="flex flex-1 items-start justify-between gap-2 text-xs">
                  <p className="line-clamp-2 pr-1">{l.snapshot.name}</p>
                  <p className="font-medium">{formatLKR(l.lineTotal)}</p>
                </div>
              </li>
            ))}
          </ul>
          <dl className="mt-5 space-y-2 border-t border-ink/10 pt-4 text-sm">
            <Row label="Subtotal" value={formatLKR(totals.subtotal)} />
            <Row
              label="Shipping"
              value={totals.shipping === 0 ? "Free" : formatLKR(totals.shipping)}
            />
            <Row label="Total" value={formatLKR(totals.total)} bold />
          </dl>
          <button type="submit" disabled={submitting} className="btn-primary mt-5 w-full">
            {submitting ? "Placing order…" : `Place order · ${formatLKR(totals.total)}`}
          </button>
          <p className="mt-3 text-[11px] text-ink/50">
            By placing your order, you agree to our Privacy Policy & Return Policy.
          </p>
        </aside>
      </form>
    </section>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="eyebrow mb-3">{title}</p>
      <div className="rounded-2xl border border-ink/5 bg-white p-5 sm:p-6">{children}</div>
    </div>
  );
}

function Field({
  label,
  error,
  children
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="label">{label}</span>
      {children}
      {error && <span className="mt-1 block text-xs text-blush-700">{error}</span>}
    </label>
  );
}

function PayOption({
  checked,
  onClick,
  title,
  body,
  badge
}: {
  checked: boolean;
  onClick: () => void;
  title: string;
  body: string;
  badge?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-start gap-3 rounded-2xl border p-4 text-left transition-colors ${
        checked ? "border-ink bg-blush-50" : "border-ink/10 bg-white hover:border-ink/30"
      }`}
    >
      <span
        className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full border ${
          checked ? "border-ink bg-ink" : "border-ink/30"
        }`}
        aria-hidden
      >
        {checked && <span className="h-2 w-2 rounded-full bg-white" />}
      </span>
      <span className="flex-1">
        <span className="flex items-center gap-2">
          <span className="text-sm font-medium">{title}</span>
          {badge && <span className="chip bg-blush-200 text-ink text-[10px]">{badge}</span>}
        </span>
        <span className="mt-1 block text-xs text-ink/60">{body}</span>
      </span>
    </button>
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
