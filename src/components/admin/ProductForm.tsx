"use client";

import { useEffect, useMemo, useState } from "react";
import {
  createProduct,
  deleteProduct,
  emptyProductInput,
  productToInput,
  slugify,
  updateProduct,
  type ProductInput
} from "@/lib/admin-api";
import { CATEGORIES } from "@/lib/categories";
import type { Brand, Category, Product, ProductTag, Subcategory } from "@/lib/types";

interface Props {
  initial?: Product | null;
  brands: Brand[];
  onSaved: () => void;
  onCancel: () => void;
}

const ALL_TAGS: ProductTag[] = ["viral", "new", "offer", "exclusive", "gift-set"];
const CONDITIONS: Product["condition"][] = ["new", "gently-used"];

export default function ProductForm({ initial, brands, onSaved, onCancel }: Props) {
  const isEdit = Boolean(initial);
  const [form, setForm] = useState<ProductInput>(
    initial ? productToInput(initial) : emptyProductInput()
  );
  const [imagesText, setImagesText] = useState((form.images ?? []).join("\n"));
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  // Default brand if none yet.
  useEffect(() => {
    if (!form.brand_slug && brands.length > 0) {
      setForm((f) => ({ ...f, brand_slug: brands[0].slug }));
    }
  }, [brands, form.brand_slug]);

  const subcategories = useMemo(() => {
    return CATEGORIES.find((c) => c.slug === form.category)?.subcategories ?? [];
  }, [form.category]);

  // When category changes, snap subcategory to the first valid one.
  useEffect(() => {
    if (!subcategories.find((s) => s.slug === form.subcategory)) {
      const next = subcategories[0]?.slug;
      if (next) setForm((f) => ({ ...f, subcategory: next as Subcategory }));
    }
  }, [subcategories, form.subcategory]);

  const update = <K extends keyof ProductInput>(key: K, value: ProductInput[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const onNameBlur = () => {
    if (!form.slug && form.name) update("slug", slugify(form.name));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const images = imagesText
      .split(/\n+/)
      .map((s) => s.trim())
      .filter(Boolean);
    if (images.length === 0) {
      setError("Add at least one image URL.");
      return;
    }

    const payload: ProductInput = { ...form, images };
    setSubmitting(true);
    const { error: err } = isEdit
      ? await updateProduct(payload)
      : await createProduct(payload);
    setSubmitting(false);

    if (err) {
      setError(err);
      return;
    }
    onSaved();
  };

  const onDelete = async () => {
    if (!initial?.id) return;
    setSubmitting(true);
    const { error: err } = await deleteProduct(initial.id);
    setSubmitting(false);
    if (err) {
      setError(err);
      return;
    }
    onSaved();
  };

  return (
    <form onSubmit={submit} className="space-y-6 pb-4">
      {/* Identity */}
      <Section title="Basics">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Name *">
            <input
              required
              className="input"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              onBlur={onNameBlur}
            />
          </Field>
          <Field label="Slug *" hint="auto-generated from name">
            <input
              required
              className="input font-mono text-xs"
              value={form.slug}
              onChange={(e) => update("slug", slugify(e.target.value))}
            />
          </Field>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Brand *">
            <select
              required
              className="input"
              value={form.brand_slug}
              onChange={(e) => update("brand_slug", e.target.value)}
            >
              {brands.length === 0 && <option value="">No brands — create one first</option>}
              {brands.map((b) => (
                <option key={b.id} value={b.slug}>
                  {b.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Condition *">
            <select
              required
              className="input capitalize"
              value={form.condition}
              onChange={(e) => update("condition", e.target.value as Product["condition"])}
            >
              {CONDITIONS.map((c) => (
                <option key={c} value={c} className="capitalize">
                  {c.replace("-", " ")}
                </option>
              ))}
            </select>
          </Field>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Category *">
            <select
              required
              className="input capitalize"
              value={form.category}
              onChange={(e) => update("category", e.target.value as Category)}
            >
              {CATEGORIES.map((c) => (
                <option key={c.slug} value={c.slug}>
                  {c.name}
                </option>
              ))}
            </select>
          </Field>
          <Field label="Subcategory *">
            <select
              required
              className="input"
              value={form.subcategory}
              onChange={(e) => update("subcategory", e.target.value as Subcategory)}
            >
              {subcategories.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.name}
                </option>
              ))}
            </select>
          </Field>
        </div>
      </Section>

      {/* Pricing & stock */}
      <Section title="Pricing & stock">
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Price (LKR) *">
            <input
              type="number"
              min={0}
              required
              className="input"
              value={form.price}
              onChange={(e) => update("price", Number(e.target.value))}
            />
          </Field>
          <Field label="Original price (LKR)" hint="for offers/strikethrough">
            <input
              type="number"
              min={0}
              className="input"
              value={form.original_price ?? ""}
              onChange={(e) =>
                update("original_price", e.target.value ? Number(e.target.value) : null)
              }
            />
          </Field>
          <Field label="Stock *">
            <input
              type="number"
              min={0}
              required
              className="input"
              value={form.stock}
              onChange={(e) => update("stock", Number(e.target.value))}
            />
          </Field>
        </div>
      </Section>

      {/* Description */}
      <Section title="Content">
        <Field label="Description *">
          <textarea
            required
            rows={3}
            className="input resize-none"
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
          />
        </Field>

        <Field
          label="Image URLs *"
          hint="One URL per line. First image is the cover."
        >
          <textarea
            rows={4}
            className="input resize-none font-mono text-xs"
            placeholder="https://images.unsplash.com/photo-..."
            value={imagesText}
            onChange={(e) => setImagesText(e.target.value)}
          />
        </Field>

        <Field label="Authenticity note" hint="Shown in the trust block on the product page">
          <textarea
            rows={2}
            className="input resize-none"
            value={form.authenticity_note ?? ""}
            onChange={(e) => update("authenticity_note", e.target.value || null)}
          />
        </Field>
      </Section>

      {/* Tags & ratings */}
      <Section title="Tags & ratings">
        <Field label="Tags">
          <div className="flex flex-wrap gap-2">
            {ALL_TAGS.map((t) => {
              const active = form.tags.includes(t);
              return (
                <button
                  key={t}
                  type="button"
                  onClick={() =>
                    update(
                      "tags",
                      active ? form.tags.filter((x) => x !== t) : [...form.tags, t]
                    )
                  }
                  className={`rounded-full px-3 py-1.5 text-xs capitalize transition-colors ${
                    active
                      ? "bg-ink text-white"
                      : "border border-ink/10 bg-white text-ink/70 hover:border-ink/30"
                  }`}
                >
                  {t.replace("-", " ")}
                </button>
              );
            })}
          </div>
        </Field>

        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Rating (0–5)">
            <input
              type="number"
              min={0}
              max={5}
              step={0.1}
              className="input"
              value={form.rating ?? ""}
              onChange={(e) =>
                update("rating", e.target.value ? Number(e.target.value) : null)
              }
            />
          </Field>
          <Field label="Reviews count">
            <input
              type="number"
              min={0}
              className="input"
              value={form.reviews}
              onChange={(e) => update("reviews", Number(e.target.value))}
            />
          </Field>
        </div>
      </Section>

      {error && (
        <div className="rounded-xl bg-blush-50 p-3 text-xs text-blush-700">{error}</div>
      )}

      {/* Actions */}
      <div className="sticky bottom-0 -mx-6 -mb-6 flex items-center justify-between gap-3 border-t border-ink/10 bg-white px-6 py-4">
        <div>
          {isEdit && (
            <>
              {!confirmDelete ? (
                <button
                  type="button"
                  onClick={() => setConfirmDelete(true)}
                  className="text-xs text-blush-700 underline-offset-2 hover:underline"
                >
                  Delete
                </button>
              ) : (
                <div className="flex items-center gap-2 text-xs">
                  <span className="text-blush-700">Delete this product?</span>
                  <button
                    type="button"
                    onClick={onDelete}
                    disabled={submitting}
                    className="rounded-full bg-blush-500 px-3 py-1 text-white"
                  >
                    Yes, delete
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmDelete(false)}
                    className="text-ink/60"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </>
          )}
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={onCancel} className="btn-outline">
            Cancel
          </button>
          <button type="submit" disabled={submitting} className="btn-primary">
            {submitting ? "Saving…" : isEdit ? "Save changes" : "Create product"}
          </button>
        </div>
      </div>
    </form>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="eyebrow mb-3">{title}</p>
      <div className="space-y-4 rounded-2xl border border-ink/5 bg-white p-4 sm:p-5">
        {children}
      </div>
    </div>
  );
}

function Field({
  label,
  hint,
  children
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="label flex items-center justify-between gap-2">
        <span>{label}</span>
        {hint && <span className="text-[10px] normal-case tracking-normal text-ink/40">{hint}</span>}
      </span>
      {children}
    </label>
  );
}
