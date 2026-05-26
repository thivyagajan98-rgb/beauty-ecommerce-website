"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import Logo from "@/components/Logo";

const NAV = [
  { href: "/brands", label: "Shop by Brands" },
  { href: "/shop?category=face", label: "Face" },
  { href: "/shop?category=cheek", label: "Cheeks" },
  { href: "/shop?category=eyes", label: "Eyes" },
  { href: "/shop?category=lips", label: "Lips" },
  { href: "/viral", label: "Viral Product" },
  { href: "/offers", label: "Offers / Sale" },
  { href: "/gift-sets", label: "Gift Set" },
  { href: "/pre-order", label: "Pre Order" }
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const itemCount = useCart((s) => s.items.reduce((n, i) => n + i.qty, 0));

  return (
    <header className="sticky top-0 z-40 border-b border-blush-100 bg-white/85 backdrop-blur">
      {/* Top promo bar */}
      <div className="bg-blush-600 py-1.5 text-center text-[11px] font-medium uppercase tracking-[0.18em] text-white">
        100% Authentic · Free Delivery on Orders Over LKR 25,000
      </div>

      {/* Main row */}
      <div className="container-x flex h-16 items-center justify-between gap-4">
        {/* Mobile menu toggle */}
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="-ml-2 rounded-full p-2 hover:bg-blush-50 lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <MenuIcon open={open} />
        </button>

        {/* Logo (centered on mobile, left on desktop) */}
        <Link
          href="/"
          aria-label="FACEZ home"
          className="flex flex-1 items-center justify-center gap-1.5 lg:flex-none lg:justify-start"
        >
          <Logo size="md" withBackdrop />
          <span className="hidden text-[10px] uppercase tracking-[0.3em] text-ink/50 sm:inline">
            .lk
          </span>
        </Link>

        {/* Right actions */}
        <div className="flex items-center gap-1 lg:flex-none">
          <Link
            href="/shop"
            aria-label="Search"
            className="rounded-full p-2 hover:bg-blush-50"
          >
            <SearchIcon />
          </Link>
          <Link
            href="/cart"
            aria-label="Cart"
            className="relative rounded-full p-2 hover:bg-blush-50"
          >
            <BagIcon />
            {itemCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-4 min-w-[16px] place-items-center rounded-full bg-blush-600 px-1 text-[10px] font-semibold text-white">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Desktop secondary nav row */}
      <nav className="hidden border-t border-blush-100 bg-white lg:block">
        <ul className="container-x flex items-center justify-center gap-7 py-3 text-sm">
          {NAV.map((n) => (
            <li key={n.href}>
              <Link
                href={n.href}
                className="text-ink/75 transition-colors hover:text-blush-700"
              >
                {n.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile drawer */}
      {open && (
        <div className="border-t border-blush-100 bg-white lg:hidden">
          <ul className="container-x flex flex-col py-3 text-sm">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-blush-50 px-2 py-3 text-ink/80"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
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
