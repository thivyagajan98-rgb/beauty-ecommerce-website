"use client";

import type { Order } from "./types";
import { getSupabase } from "./supabase";

const STORAGE_KEY = "facez-orders-v1";

function readLocal(): Order[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Order[]) : [];
  } catch {
    return [];
  }
}

function writeLocal(orders: Order[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}

export async function saveOrder(order: Order): Promise<void> {
  // Always persist locally so admin/confirmation works without Supabase.
  const orders = readLocal();
  writeLocal([order, ...orders]);

  const supabase = getSupabase();
  if (!supabase) return;

  // Best-effort persistence to Supabase. Schema in supabase/schema.sql
  try {
    await supabase.from("orders").insert({
      id: order.id,
      customer_name: order.customerName,
      phone: order.phone,
      email: order.email ?? null,
      address: order.address,
      city: order.city,
      notes: order.notes ?? null,
      items: order.items,
      subtotal: order.subtotal,
      shipping: order.shipping,
      total: order.total,
      payment_method: order.paymentMethod,
      status: order.status,
      created_at: order.createdAt
    });
  } catch (e) {
    // We swallow remote errors so the local copy is the source of truth on dev.
    // eslint-disable-next-line no-console
    console.warn("[facez] Supabase order insert failed:", e);
  }
}

export function getOrders(): Order[] {
  return readLocal();
}

export function getOrder(id: string): Order | undefined {
  return readLocal().find((o) => o.id === id);
}

export function updateOrderStatus(id: string, status: Order["status"]) {
  const orders = readLocal().map((o) => (o.id === id ? { ...o, status } : o));
  writeLocal(orders);
}

export function makeOrderId() {
  const ts = Date.now().toString(36).toUpperCase();
  const rnd = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `FCZ-${ts}-${rnd}`;
}
