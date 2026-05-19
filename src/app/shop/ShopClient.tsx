"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { CATEGORIES, findCategory } from "@/lib/categories";
import { BRANDS } from "@/lib/brands";
import { PRODUCTS } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import type { Category } from "@/lib/types";

type Sort = "featured" | "price-asc" | "price-desc" | "new";

export default function ShopClient() {
  const router = useRouter();
  const params = useSearchParams();

  const category = params.get("category") as Category | null;
  const subcategory = params.get("sub");
  const brand = params.get("brand");
  const tag = params.get("tag");
  const condition = params.get("condition");
  const [sort, setSort] = useState<Sort>("featured");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const cat = category ? findCategory(category) : undefined;

  const products = useMemo(() => {
    let list = [...PRODUCTS];
    if (category) list = list.filter((p) => p.category === category);
    if (subcategory) list = list.filter((p) => p.subcategory === subcategory);
    if (brand) list = list.filter((p) => p.brandSlug === brand);
    if (tag) list = list.filter((p) => p.tags?.includes(tag as never));
    if (condition) list = list.filter((p) => p.condition === condition);

    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "new":
        list.sort((a, b) => Number(b.tags?.includes("new")) - Number(a.tags?.includes("new")));
        break;
    }
    return list;
  }, [category, subcategory, brand, tag, condition, sort]);

  const setParam = (key: string, value: string | null) => {
    const next = new URLSearchParams(params.toString());
    if (value === null || value === "") next.delete(key);
    else next.set(key, value);
    // When changing category, reset subcategory
    if (key === "category") next.delete("sub");
    router.push(`/shop?${next.toString()}`);
  };

  const clearAll = () => router.push("/shop");

  const activeBrand = brand ? BRANDS.find((b) => b.slug === brand) : undefined;

  return (
    <>
      {/* Page header */}
      <section className="border-b border-ink/5 bg-white">
        <div className="container-x py-8 sm:py-10">
          <p className="eyebrow">Shop</p>
          <h1 className="h-display mt-2">
            {cat ? cat.name : activeBrand ? activeBrand.name : "All products"}
          </h1>
          <p className="mt-2 text-sm text-ink/60">
            {cat?.blurb ?? activeBrand?.description ?? "Curated, authentic & ready to ship."}
          </p>

          {/* Category pills */}
          <div className="mt-5 flex flex-wrap gap-2">
            <button
              onClick={() => setParam("category", null)}
              className={pill(!category)}
            >
              All
            </button>
            {CATEGORIES.map((c) => (
              <button
                key={c.slug}
                onClick={() => setParam("category", c.slug)}
                className={pill(category === c.slug)}
              >
                <span className="mr-1.5">{c.emoji}</span>
                {c.name}
              </button>
            ))}
          </div>

          {/* Subcategory pills */}
          {cat && (
            <div className="mt-3 flex flex-wrap gap-2">
              <button
                onClick={() => setParam("sub", null)}
                className={subPill(!subcategory)}
              >
                All {cat.name.toLowerCase()}
              </button>
              {cat.subcategories.map((s) => (
                <button
                  key={s.slug}
                  onClick={() => setParam("sub", s.slug)}
                  className={subPill(subcategory === s.slug)}
                >
                  {s.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Body */}
      <section className="container-x section">
        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          {/* Sidebar (desktop) */}
          <aside className="hidden lg:block">
            <Filters
              brand={brand}
              condition={condition}
              tag={tag}
              setParam={setParam}
              clearAll={clearAll}
            />
          </aside>

          {/* Main */}
          <div>
            {/* Toolbar */}
            <div className="mb-6 flex items-center justify-between gap-3">
              <p className="text-sm text-ink/60">
                {products.length} product{products.length === 1 ? "" : "s"}
              </p>
              <div className="flex items-center gap-2">
                <button
                  className="btn-outline lg:hidden"
                  onClick={() => setFiltersOpen(true)}
                >
                  Filters
                </button>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as Sort)}
                  className="rounded-full border border-ink/10 bg-white px-4 py-2.5 text-sm focus:border-ink/30 focus:outline-none"
                  aria-label="Sort"
                >
                  <option value="featured">Featured</option>
                  <option value="new">Newest</option>
                  <option value="price-asc">Price: low to high</option>
                  <option value="price-desc">Price: high to low</option>
                </select>
              </div>
            </div>

            {products.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-ink/15 bg-white p-12 text-center">
                <p className="font-display text-2xl">No products match these filters</p>
                <p className="mt-2 text-sm text-ink/60">Try clearing some filters.</p>
                <button className="btn-primary mt-4" onClick={clearAll}>
                  Clear filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
                {products.map((p, i) => (
                  <ProductCard key={p.id} product={p} priority={i < 4} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Mobile filter drawer */}
      {filtersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-ink/40"
            onClick={() => setFiltersOpen(false)}
            aria-hidden
          />
          <div className="absolute inset-x-0 bottom-0 max-h-[85vh] overflow-auto rounded-t-3xl bg-cream p-6">
            <div className="mb-4 flex items-center justify-between">
              <p className="font-display text-xl">Filters</p>
              <button
                aria-label="Close"
                className="rounded-full bg-white p-2"
                onClick={() => setFiltersOpen(false)}
              >
                ✕
              </button>
            </div>
            <Filters
              brand={brand}
              condition={condition}
              tag={tag}
              setParam={(k, v) => {
                setParam(k, v);
              }}
              clearAll={() => {
                clearAll();
                setFiltersOpen(false);
              }}
            />
            <button
              className="btn-primary mt-6 w-full"
              onClick={() => setFiltersOpen(false)}
            >
              Show {products.length} results
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function pill(active: boolean) {
  return `inline-flex items-center rounded-full border px-4 py-2 text-sm transition-colors ${
    active
      ? "border-ink bg-ink text-white"
      : "border-ink/10 bg-white text-ink/80 hover:border-ink/30"
  }`;
}

function subPill(active: boolean) {
  return `inline-flex items-center rounded-full px-3 py-1.5 text-xs transition-colors ${
    active ? "bg-blush-200 text-ink" : "bg-white text-ink/70 hover:bg-blush-100"
  }`;
}

function Filters({
  brand,
  condition,
  tag,
  setParam,
  clearAll
}: {
  brand: string | null;
  condition: string | null;
  tag: string | null;
  setParam: (k: string, v: string | null) => void;
  clearAll: () => void;
}) {
  return (
    <div className="space-y-7">
      <div className="flex items-center justify-between">
        <p className="font-display text-lg">Filters</p>
        <button onClick={clearAll} className="text-xs text-ink/60 underline-offset-2 hover:underline">
          Clear all
        </button>
      </div>

      <div>
        <p className="label">Condition</p>
        <div className="flex flex-wrap gap-2">
          <FilterChip active={!condition} onClick={() => setParam("condition", null)}>
            All
          </FilterChip>
          <FilterChip active={condition === "new"} onClick={() => setParam("condition", "new")}>
            New
          </FilterChip>
          <FilterChip
            active={condition === "gently-used"}
            onClick={() => setParam("condition", "gently-used")}
          >
            Gently Used
          </FilterChip>
        </div>
      </div>

      <div>
        <p className="label">Tags</p>
        <div className="flex flex-wrap gap-2">
          {(["viral", "new", "offer", "exclusive", "gift-set"] as const).map((t) => (
            <FilterChip
              key={t}
              active={tag === t}
              onClick={() => setParam("tag", tag === t ? null : t)}
            >
              {t.replace("-", " ")}
            </FilterChip>
          ))}
        </div>
      </div>

      <div>
        <p className="label">Brand</p>
        <div className="max-h-72 space-y-1 overflow-auto pr-1">
          <FilterRadio
            label="All brands"
            checked={!brand}
            onClick={() => setParam("brand", null)}
          />
          {BRANDS.map((b) => (
            <FilterRadio
              key={b.id}
              label={b.name}
              checked={brand === b.slug}
              onClick={() => setParam("brand", b.slug)}
            />
          ))}
        </div>
        <Link href="/brands" className="mt-3 inline-block text-xs text-blush-600 hover:underline">
          View all brand pages →
        </Link>
      </div>
    </div>
  );
}

function FilterChip({
  active,
  onClick,
  children
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3 py-1.5 text-xs capitalize ${
        active ? "bg-ink text-white" : "border border-ink/10 bg-white hover:border-ink/30"
      }`}
    >
      {children}
    </button>
  );
}

function FilterRadio({
  label,
  checked,
  onClick
}: {
  label: string;
  checked: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-sm transition-colors ${
        checked ? "bg-blush-100 text-ink" : "hover:bg-ink/5"
      }`}
    >
      <span
        className={`grid h-4 w-4 place-items-center rounded-full border ${
          checked ? "border-blush-500 bg-blush-500" : "border-ink/30"
        }`}
        aria-hidden
      >
        {checked && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
      </span>
      <span className="truncate">{label}</span>
    </button>
  );
}
