"use client";

import { useEffect } from "react";

interface Props {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

/**
 * A simple right-side drawer modal for admin forms.
 * Full-screen on mobile, side-drawer (max-w-2xl) on lg+.
 */
export default function Modal({ open, onClose, title, subtitle, children }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <div className="absolute inset-y-0 right-0 flex w-full max-w-2xl flex-col bg-cream shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-ink/10 bg-white px-6 py-5">
          <div>
            <p className="font-display text-xl">{title}</p>
            {subtitle && <p className="mt-0.5 text-xs text-ink/60">{subtitle}</p>}
          </div>
          <button
            aria-label="Close"
            onClick={onClose}
            className="rounded-full bg-ink/5 p-2 text-ink/60 hover:bg-ink/10 hover:text-ink"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-6 py-6">{children}</div>
      </div>
    </div>
  );
}
