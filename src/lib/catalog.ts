import { getSupabase } from "./supabase";
import { PRODUCTS as MOCK_PRODUCTS } from "./products";
import { BRANDS as MOCK_BRANDS } from "./brands";
import type { Brand, Product } from "./types";

/* ---------------------------------------------------------------- */
/* Mock fallback (used when Supabase env vars are missing or fail)  */
/* ---------------------------------------------------------------- */

// Enrich each mock product with brandName so the storefront renders
// uniformly regardless of source.
const ENRICHED_MOCK_PRODUCTS: Product[] = MOCK_PRODUCTS.map((p) => ({
  ...p,
  brandName: MOCK_BRANDS.find((b) => b.slug === p.brandSlug)?.name ?? p.brandSlug
}));

/* ---------------------------------------------------------------- */
/* Row shapes (Supabase returns snake_case)                          */
/* ---------------------------------------------------------------- */

interface ProductRow {
  id: string;
  slug: string;
  name: string;
  brand_slug: string;
  category: string;
  subcategory: string;
  price: string | number;
  original_price: string | number | null;
  condition: string;
  description: string | null;
  images: string[] | null;
  stock: number | null;
  authenticity_note: string | null;
  tags: string[] | null;
  rating: string | number | null;
  reviews: number | null;
  brands?: { name: string; slug: string } | null;
}

interface BrandRow {
  id: string;
  slug: string;
  name: string;
  description: string | null;
  logo: string | null;
}

function mapProduct(row: ProductRow): Product {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    brandSlug: row.brand_slug,
    brandName: row.brands?.name ?? row.brand_slug,
    category: row.category as Product["category"],
    subcategory: row.subcategory as Product["subcategory"],
    price: Number(row.price),
    originalPrice: row.original_price != null ? Number(row.original_price) : undefined,
    condition: row.condition as Product["condition"],
    description: row.description ?? "",
    images: row.images ?? [],
    stock: row.stock ?? 0,
    authenticityNote: row.authenticity_note ?? undefined,
    tags: (row.tags ?? []) as Product["tags"],
    rating: row.rating != null ? Number(row.rating) : undefined,
    reviews: row.reviews ?? 0
  };
}

function mapBrand(row: BrandRow): Brand {
  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description ?? "",
    logoText: row.name
  };
}

/* ---------------------------------------------------------------- */
/* Public API                                                        */
/* ---------------------------------------------------------------- */

export async function fetchAllProducts(): Promise<Product[]> {
  const sb = getSupabase();
  if (!sb) return ENRICHED_MOCK_PRODUCTS;

  try {
    const { data, error } = await sb
      .from("products")
      .select("*, brands(name, slug)")
      .order("created_at", { ascending: false });
    if (error || !data || data.length === 0) return ENRICHED_MOCK_PRODUCTS;
    return data.map((r) => mapProduct(r as unknown as ProductRow));
  } catch {
    return ENRICHED_MOCK_PRODUCTS;
  }
}

export async function fetchProductBySlug(slug: string): Promise<Product | null> {
  const sb = getSupabase();
  if (!sb) return ENRICHED_MOCK_PRODUCTS.find((p) => p.slug === slug) ?? null;

  try {
    const { data, error } = await sb
      .from("products")
      .select("*, brands(name, slug)")
      .eq("slug", slug)
      .maybeSingle();
    if (error || !data) return ENRICHED_MOCK_PRODUCTS.find((p) => p.slug === slug) ?? null;
    return mapProduct(data as unknown as ProductRow);
  } catch {
    return ENRICHED_MOCK_PRODUCTS.find((p) => p.slug === slug) ?? null;
  }
}

export async function fetchProductsByBrand(brandSlug: string): Promise<Product[]> {
  const sb = getSupabase();
  if (!sb) return ENRICHED_MOCK_PRODUCTS.filter((p) => p.brandSlug === brandSlug);

  try {
    const { data, error } = await sb
      .from("products")
      .select("*, brands(name, slug)")
      .eq("brand_slug", brandSlug)
      .order("created_at", { ascending: false });
    if (error || !data) return ENRICHED_MOCK_PRODUCTS.filter((p) => p.brandSlug === brandSlug);
    return data.map((r) => mapProduct(r as unknown as ProductRow));
  } catch {
    return ENRICHED_MOCK_PRODUCTS.filter((p) => p.brandSlug === brandSlug);
  }
}

export async function fetchAllBrands(): Promise<Brand[]> {
  const sb = getSupabase();
  if (!sb) return MOCK_BRANDS;

  try {
    const { data, error } = await sb.from("brands").select("*").order("name");
    if (error || !data || data.length === 0) return MOCK_BRANDS;
    return data.map((r) => mapBrand(r as unknown as BrandRow));
  } catch {
    return MOCK_BRANDS;
  }
}

export async function fetchBrandBySlug(slug: string): Promise<Brand | null> {
  const sb = getSupabase();
  if (!sb) return MOCK_BRANDS.find((b) => b.slug === slug) ?? null;

  try {
    const { data, error } = await sb
      .from("brands")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();
    if (error || !data) return MOCK_BRANDS.find((b) => b.slug === slug) ?? null;
    return mapBrand(data as unknown as BrandRow);
  } catch {
    return MOCK_BRANDS.find((b) => b.slug === slug) ?? null;
  }
}

export async function fetchRelatedProducts(p: Product, limit = 4): Promise<Product[]> {
  const all = await fetchAllProducts();
  return all
    .filter((x) => x.id !== p.id && (x.category === p.category || x.brandSlug === p.brandSlug))
    .slice(0, limit);
}
