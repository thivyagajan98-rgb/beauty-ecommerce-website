"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { CATEGORIES } from "@/lib/categories";
import Logo from "@/components/Logo";

const NAV = [
  { href: "/shop", label: "Shop" },
  { href: "/brands", label: "Brands" },
  { href: "/viral", label: "Viral" },
  { href: "/offers", label: "Offers" },
  { href: "/gift-sets", label: "Gift Sets" }
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const itemCount = useCart((s) => s.items.reduce((n, i) => n + i.qty, 0));

  return (
    <header className="sticky top-0 z-40 border-b border-ink/5 bg-cream/80 backdrop-blur">
      {/* Top announcement */}
      <div className="bg-ink py-1.5 text-center text-[11px] font-medium uppercase tracking-[0.2em] text-cream">
        100% Authentic · Island-wide Delivery · Secure Card Payments
      </div>

      <div className="container-x flex h-16 items-center justify-between gap-4">
        {/* Mobile menu toggle */}
        <button
          aria-label="Open menu"
          className="lg:hidden -ml-2 rounded-full p-2 hover:bg-ink/5"
          onClick={() => setOpen((v) => !v)}
        >
          <MenuIcon open={open} />
        </button>

        {/* Logo */}
        <Link
          href="/"
          aria-label="Facez Cosmetics — Home"
          className="flex items-center lg:flex-1"
        >
          <Logo className="text-[1.6rem] sm:text-[1.75rem]" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 text-sm lg:flex lg:flex-1 lg:justify-center">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="text-ink/80 transition-colors hover:text-ink"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-1 lg:flex-1 lg:justify-end">
          <Link
            href="/shop"
            aria-label="Search"
            className="rounded-full p-2 hover:bg-ink/5"
          >
            <SearchIcon />
          </Link>
          <Link
            href="/cart"
            aria-label="Cart"
            className="relative rounded-full p-2 hover:bg-ink/5"
          >
            <BagIcon />
            {itemCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-[16px] place-items-center rounded-full bg-blush-500 px-1 text-[10px] font-semibold text-white">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden">
          <div className="border-t border-ink/5 bg-cream">
            <div className="container-x grid grid-cols-2 gap-2 py-4">
              {NAV.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl border border-ink/5 bg-white px-4 py-3 text-sm font-medium"
                >
                  {n.label}
                </Link>
              ))}
            </div>
            <div className="container-x pb-5">
              <p className="eyebrow mb-2">Categories</p>
              <div className="grid grid-cols-2 gap-2">
                {CATEGORIES.map((c) => (
                  <Link
                    key={c.slug}
                    href={`/shop?category=${c.slug}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 rounded-xl border border-ink/5 bg-white px-4 py-3 text-sm"
                  >
                    <span aria-hidden>{c.emoji}</span>
                    <span>{c.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      {open ? (
        <>
          <path d="M6 6l12 12" />
          <path d="M18 6L6 18" />
        </>
      ) : (
        <>
          <path d="M4 7h16" />
          <path d="M4 12h16" />
          <path d="M4 17h16" />
        </>
      )}
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M5 7h14l-1.2 12.2a2 2 0 01-2 1.8H8.2a2 2 0 01-2-1.8L5 7z" />
      <path d="M9 7V5a3 3 0 016 0v2" />
    </svg>
  );
}
