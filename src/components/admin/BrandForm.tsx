"use client";

import { useState } from "react";
import {
  brandToInput,
  createBrand,
  deleteBrand,
  emptyBrandInput,
  slugify,
  updateBrand,
  type BrandInput
} from "@/lib/admin-api";
import type { Brand } from "@/lib/types";

interface Props {
  initial?: Brand | null;
  onSaved: () => void;
  onCancel: () => void;
}

export default function BrandForm({ initial, onSaved, onCancel }: Props) {
  const isEdit = Boolean(initial);
  const [form, setForm] = useState<BrandInput>(
    initial ? brandToInput(initial) : emptyBrandInput()
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const update = <K extends keyof BrandInput>(key: K, value: BrandInput[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const onNameBlur = () => {
    if (!form.slug && form.name) update("slug", slugify(form.name));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const { error: err } = isEdit ? await updateBrand(form) : await createBrand(form);
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
    const { error: err } = await deleteBrand(initial.id);
    setSubmitting(false);
    if (err) {
      setError(err);
      return;
    }
    onSaved();
  };

  return (
    <form onSubmit={submit} className="space-y-6 pb-4">
      <div className="space-y-4 rounded-2xl border border-ink/5 bg-white p-4 sm:p-5">
        <label className="block">
          <span className="label">Name *</span>
          <input
            required
            className="input"
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            onBlur={onNameBlur}
            placeholder="Charlotte Tilbury"
          />
        </label>
        <label className="block">
          <span className="label flex justify-between">
            <span>Slug *</span>
            <span className="text-[10px] normal-case tracking-normal text-ink/40">
              auto-generated from name
            </span>
          </span>
          <input
            required
            className="input font-mono text-xs"
            value={form.slug}
            onChange={(e) => update("slug", slugify(e.target.value))}
            placeholder="charlotte-tilbury"
          />
        </label>
        <label className="block">
          <span className="label">Description</span>
          <textarea
            rows={3}
            className="input resize-none"
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            placeholder="Hollywood glow, cult Pillow Talk."
          />
        </label>
        <label className="block">
          <span className="label">Logo URL (optional)</span>
          <input
            className="input"
            placeholder="https://… or leave blank"
            value={form.logo ?? ""}
            onChange={(e) => update("logo", e.target.value || null)}
          />
        </label>
      </div>

      {error && (
        <div className="rounded-xl bg-blush-50 p-3 text-xs text-blush-700">{error}</div>
      )}

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
                  <span className="text-blush-700">
                    Delete this brand? Products linked to it will block deletion.
                  </span>
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
            {submitting ? "Saving…" : isEdit ? "Save changes" : "Create brand"}
          </button>
        </div>
      </div>
    </form>
  );
}
