"use client";

import { getSupabase } from "./supabase";
import type { Brand, Product } from "./types";

/**
 * Admin mutation helpers. These call Supabase as the authenticated user
 * — RLS in supabase/schema.sql + supabase/admin_policies.sql ensures
 * only authenticated sessions can write.
 *
 * Each helper returns `{ error: string | null }` so the form can show
 * a friendly message without throwing.
 */

export interface ProductInput {
  id?: string; // present on update
  slug: string;
  name: string;
  brand_slug: string;
  category: Product["category"];
  subcategory: Product["subcategory"];
  price: number;
  original_price: number | null;
  condition: Product["condition"];
  description: string;
  images: string[];
  stock: number;
  authenticity_note: string | null;
  tags: NonNullable<Product["tags"]>;
  rating: number | null;
  reviews: number;
}

export interface BrandInput {
  id?: string;
  slug: string;
  name: string;
  description: string;
  logo: string | null;
}

interface Result {
  error: string | null;
}

function notConfigured(): Result {
  return {
    error: "Supabase is not configured. Set the env vars and run schema.sql + admin_policies.sql."
  };
}

/* -------------------------------- Products ------------------------------- */

export async function createProduct(input: ProductInput): Promise<Result> {
  const sb = getSupabase();
  if (!sb) return notConfigured();
  const { id: _id, ...row } = input;
  const { error } = await sb.from("products").insert(row);
  return { error: error?.message ?? null };
}

export async function updateProduct(input: ProductInput): Promise<Result> {
  const sb = getSupabase();
  if (!sb) return notConfigured();
  if (!input.id) return { error: "Missing product id" };
  const { id, ...row } = input;
  const { error } = await sb.from("products").update(row).eq("id", id);
  return { error: error?.message ?? null };
}

export async function deleteProduct(id: string): Promise<Result> {
  const sb = getSupabase();
  if (!sb) return notConfigured();
  const { error } = await sb.from("products").delete().eq("id", id);
  return { error: error?.message ?? null };
}

/* -------------------------------- Brands --------------------------------- */

export async function createBrand(input: BrandInput): Promise<Result> {
  const sb = getSupabase();
  if (!sb) return notConfigured();
  const { id: _id, ...row } = input;
  const { error } = await sb.from("brands").insert(row);
  return { error: error?.message ?? null };
}

export async function updateBrand(input: BrandInput): Promise<Result> {
  const sb = getSupabase();
  if (!sb) return notConfigured();
  if (!input.id) return { error: "Missing brand id" };
  const { id, ...row } = input;
  const { error } = await sb.from("brands").update(row).eq("id", id);
  return { error: error?.message ?? null };
}

export async function deleteBrand(id: string): Promise<Result> {
  const sb = getSupabase();
  if (!sb) return notConfigured();
  const { error } = await sb.from("brands").delete().eq("id", id);
  return { error: error?.message ?? null };
}

/* ------------------------------- Helpers --------------------------------- */

/**
 * Convert a Product (from catalog fetchers) into a ProductInput suitable for
 * pre-filling the form on edit.
 */
export function productToInput(p: Product): ProductInput {
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    brand_slug: p.brandSlug,
    category: p.category,
    subcategory: p.subcategory,
    price: p.price,
    original_price: p.originalPrice ?? null,
    condition: p.condition,
    description: p.description,
    images: p.images,
    stock: p.stock,
    authenticity_note: p.authenticityNote ?? null,
    tags: p.tags ?? [],
    rating: p.rating ?? null,
    reviews: p.reviews ?? 0
  };
}

export function brandToInput(b: Brand): BrandInput {
  return {
    id: b.id,
    slug: b.slug,
    name: b.name,
    description: b.description,
    logo: null
  };
}

export function emptyProductInput(): ProductInput {
  return {
    slug: "",
    name: "",
    brand_slug: "",
    category: "face",
    subcategory: "foundation",
    price: 0,
    original_price: null,
    condition: "new",
    description: "",
    images: [],
    stock: 0,
    authenticity_note: null,
    tags: [],
    rating: null,
    reviews: 0
  };
}

export function emptyBrandInput(): BrandInput {
  return {
    slug: "",
    name: "",
    description: "",
    logo: null
  };
}

/** Slugify a name, e.g. "Charlotte Tilbury" → "charlotte-tilbury". */
export function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}
