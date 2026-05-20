# Facez.lk

A premium, mobile-first e-commerce storefront for authentic branded makeup in Sri Lanka.

Built with **Next.js 14** (App Router), **TypeScript**, **Tailwind CSS**, **Zustand**, and **Supabase**.

> Runs out-of-the-box with mock data — no Supabase setup required for local dev.

---

## Features

- **Storefront** — Home, Shop (with category/subcategory/brand/tag/condition filters & sort), Product detail (gallery, condition, authenticity note, related products), Brands index + per-brand pages.
- **Cart & Checkout** — Persistent cart (localStorage), Cart page, multi-step Checkout with Sri Lanka cities, two payment methods (PayHere card payments, Bank Transfer), order confirmation page.
- **Special pages** — Viral, Offers, Gift Sets, Online Exclusives.
- **Legal** — Authenticity Guarantee, Return Policy, Privacy Policy, Brand Disclaimer, Contact.
- **Admin** — `/admin` dashboard (orders + products + KPIs).
- **Mobile-first** — Sticky header, mobile menu drawer, sticky bottom bag bar, WhatsApp button, horizontal product rails on mobile.
- **SEO** — `generateMetadata` and `generateStaticParams` on all dynamic routes.
- **Trust** — “100% authentic” messaging, brand disclaimers, batch-code verification copy.

---

## Quick start

```bash
# 1. Install
npm install

# 2. (Optional) configure Supabase + WhatsApp number
cp .env.example .env.local
# edit .env.local with your values

# 3. Run dev server
npm run dev
```

Open <http://localhost:3000>.

The Admin dashboard is at <http://localhost:3000/admin>.

---

## Project structure

```
src/
├── app/                          # Next.js App Router
│   ├── admin/                    # Admin dashboard (orders, products, KPIs)
│   ├── brands/                   # /brands and /brands/[slug]
│   ├── cart/                     # Bag
│   ├── checkout/                 # Checkout form (COD / PayHere / Bank)
│   ├── gift-sets/
│   ├── offers/
│   ├── online-exclusives/
│   ├── order/[id]/               # Order confirmation
│   ├── pages/                    # Legal & info (authenticity, returns, privacy…)
│   ├── product/[slug]/           # Product detail
│   ├── shop/                     # Filterable catalog
│   ├── viral/
│   ├── globals.css
│   ├── layout.tsx
│   ├── not-found.tsx
│   └── page.tsx                  # Home
├── components/                   # Header, Footer, ProductCard, etc.
└── lib/
    ├── brands.ts                 # 34 curated brands
    ├── cart.ts                   # Zustand cart store
    ├── categories.ts             # 4 categories × subcategories
    ├── format.ts                 # LKR formatter
    ├── orders.ts                 # localStorage + Supabase persistence
    ├── products.ts               # 15 seed products
    ├── supabase.ts               # Optional client
    └── types.ts                  # Domain types
supabase/
├── schema.sql                    # Tables, enums, RLS policies
└── seed.sql                      # Optional product/brand seed
```

---

## Environment variables

Copy `.env.example` to `.env.local`:

```bash
# Supabase (optional — falls back to mock data when empty)
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# PayHere (Sri Lanka)
PAYHERE_MERCHANT_ID=
PAYHERE_MERCHANT_SECRET=
NEXT_PUBLIC_PAYHERE_SANDBOX=true

# Storefront
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_WHATSAPP_NUMBER=94770000000
```

---

## Supabase setup (production)

1. Create a project on [supabase.com](https://supabase.com).
2. In the SQL editor, run `supabase/schema.sql`.
3. (Optional) Run `supabase/seed.sql` to populate the catalog.
4. Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in your environment.
5. Create a Storage bucket called `product-images` (public) for image uploads.

The storefront currently reads its catalog from `src/lib/products.ts` and `src/lib/brands.ts`. To switch to Supabase, replace those imports with `select` queries via `getSupabase()` (a TODO — kept simple for the MVP).

Orders, however, are already saved to Supabase when the env vars are present — see `src/lib/orders.ts`.

---

## PayHere integration (next steps)

`src/app/checkout/CheckoutClient.tsx` records the order with `status: 'pending'` and routes to `/order/<id>?pay=payhere`.

To complete the live integration:

1. Add a Next.js Route Handler at `/app/api/payhere/route.ts` that:
   - Generates a PayHere checkout payload signed with `PAYHERE_MERCHANT_SECRET` (MD5 hash of merchant_id + order_id + amount + currency + secret).
   - Returns the URL to redirect the user.
2. Update the checkout client to POST to `/api/payhere` and `window.location` to the returned URL.
3. Add a webhook endpoint at `/app/api/payhere/notify/route.ts` to receive payment status updates and call `updateOrderStatus(id, 'confirmed')`.

PayHere sandbox: <https://sandbox.payhere.lk> · Merchant docs: <https://support.payhere.lk>.

---

## Deploy

This site is ready for **Vercel**:

```bash
npx vercel
```

Set environment variables in the Vercel dashboard. Static product/brand pages are generated at build time via `generateStaticParams`.

---

## Disclaimer

Facez.lk is an independent retailer. We are not affiliated with, endorsed by, or sponsored by any of the brands featured. All trademarks belong to their respective owners.
