# Facez.lk

A premium, mobile-first e-commerce storefront for authentic branded makeup in Sri Lanka.

Built with **Next.js 14** (App Router), **TypeScript**, **Tailwind CSS**, **Zustand**, and **Supabase**.

> Runs out-of-the-box with mock data — no Supabase setup required for local dev.

---

## Features

- **Storefront** — Home, Shop (filterable by category/subcategory/brand/tag/condition), Product detail (gallery, condition, authenticity note, related products), Brands index + per-brand pages.
- **Cart & Checkout** — Persistent cart (localStorage), Cart page, multi-step Checkout with Sri Lanka cities, two payment methods (PayHere card, Bank Transfer), order confirmation page.
- **Special pages** — Viral, Offers, Gift Sets, Online Exclusives.
- **Legal** — Authenticity Guarantee, Return Policy, Privacy Policy, Brand Disclaimer, Contact.
- **Admin** — `/admin` dashboard with **Supabase Auth** (orders + products + KPIs).
- **Mobile-first** — Sticky header, mobile menu drawer, sticky bottom bag bar, WhatsApp button, horizontal product rails on mobile.
- **SEO** — `generateMetadata` and `generateStaticParams` on all dynamic routes.
- **Live catalog** — Products and brands read from Supabase via ISR (revalidates every 60s); falls back to mock data when env vars aren’t set.

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

Open <http://localhost:3000>. Admin: <http://localhost:3000/admin>.

---

## Project structure

```
src/
├── app/                          # Next.js App Router
│   ├── admin/
│   │   ├── login/                # Supabase Auth sign-in page
│   │   └── AdminClient.tsx       # KPIs, orders, products
│   ├── brands/                   # /brands and /brands/[slug]
│   ├── cart/                     # Bag
│   ├── checkout/                 # Checkout (PayHere / Bank Transfer)
│   ├── gift-sets/, offers/, online-exclusives/, viral/
│   ├── order/[id]/               # Order confirmation
│   ├── pages/                    # Legal & info
│   ├── product/[slug]/
│   └── shop/                     # Filterable catalog
├── components/                   # Header, Footer, ProductCard, Logo, etc.
└── lib/
    ├── brands.ts                 # Mock brand list (fallback)
    ├── cart.ts                   # Zustand cart store with snapshot items
    ├── catalog.ts                # Async Supabase fetchers + mock fallback
    ├── categories.ts
    ├── format.ts
    ├── orders.ts                 # localStorage + Supabase persistence
    ├── products.ts               # Mock product list (fallback)
    ├── supabase.ts               # Browser client (anon key)
    └── types.ts
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

# Logo (optional) — overrides /public/logo.svg and /public/logo-dark.svg
NEXT_PUBLIC_LOGO_SRC=
NEXT_PUBLIC_LOGO_SRC_DARK=
```

---

## Supabase setup

1. **Create a project** on [supabase.com](https://supabase.com). Pick the Singapore region for low Sri Lanka latency.

2. **Get API keys** from **Settings → API**:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

3. **Run the schema** — open the SQL Editor in Supabase, paste the contents of `supabase/schema.sql`, click **Run**. This creates `brands`, `products`, `orders`, and `profiles` tables, plus enums and Row-Level-Security policies.

4. **(Optional) Seed the catalog** — run `supabase/seed.sql` to insert 14 brands and 15 sample products. Or skip and add your own from the Table Editor.

5. **Add env vars** to `.env.local` (and Vercel for production).

6. **Restart `npm run dev`**. Pages now read from Supabase. They revalidate every 60 seconds — add or edit a product in the Supabase dashboard, refresh the storefront after \~60s.

### Managing your catalog from Supabase

Once connected, you can:

- **Add a brand**: Table Editor → `brands` → Insert row. Fill `slug` (lowercase-with-dashes), `name`, optional `description`. The `/brands/[slug]` page will be available immediately.
- **Add a product**: Table Editor → `products` → Insert row. Required fields: `slug`, `name`, `brand_slug` (must match an existing brand), `category` (`face`/`cheek`/`eyes`/`lips`), `subcategory`, `price`, `condition` (`new`/`gently-used`), `images` (array of URLs), `stock`. Optional: `original_price`, `tags` (array — `viral`/`new`/`offer`/`exclusive`/`gift-set`), `authenticity_note`, `rating`, `reviews`.
- **Upload product images**: Storage → create a `product-images` bucket (public) → upload images → copy the public URL → paste into the product’s `images` array.

Pages revalidate every 60 seconds (ISR), so changes show up shortly after a request hits the page.

---

## Admin authentication

The admin dashboard at `/admin` is protected by **Supabase Auth (email + password)**.

### One-time setup

1. In Supabase, go to **Authentication → Providers** and confirm **Email** is enabled.
2. Disable **Enable email confirmations** if you want immediate access (Authentication → Providers → Email).
3. Create an admin user: **Authentication → Users → Add user → Create new user**. Enter your email and a strong password, mark “Auto Confirm User” if you skipped step 2.
4. (Optional) tighten access: only authenticated users can SELECT or UPDATE the `orders` table thanks to the RLS policies in `schema.sql`.

### Signing in

1. Visit `/admin` — you’ll be redirected to `/admin/login`.
2. Enter the email + password you created in Supabase.
3. You’ll land on the dashboard. The session is persisted, so you stay signed in across page reloads. Use the **Sign out** link in the dashboard header to log out.

### Local dev (no Supabase)

If env vars aren’t set, `/admin` runs in **local dev mode** with no auth — orders come from this browser’s localStorage. A banner makes this clear at the top of the page.

---

## PayHere integration (next steps)

`src/app/checkout/CheckoutClient.tsx` records the order with `status: 'pending'` and routes to `/order/<id>?pay=payhere`.

To complete the live integration:

1. Add a Next.js Route Handler at `/app/api/payhere/route.ts` that signs the merchant payload (MD5 of `merchant_id + order_id + amount + currency + secret`) and returns the redirect URL.
2. Update the checkout client to POST to `/api/payhere` and `window.location` to the returned URL.
3. Add a webhook endpoint at `/app/api/payhere/notify/route.ts` to receive payment status updates and call `updateOrderStatus(id, 'confirmed')`.

PayHere sandbox: <https://sandbox.payhere.lk> · Merchant docs: <https://support.payhere.lk>.

---

## Deploy

Ready for **Vercel**:

```bash
npx vercel
```

Set environment variables in the Vercel dashboard. Static product/brand pages are generated at build time via `generateStaticParams`; ISR keeps them fresh.

---

## Disclaimer

Facez.lk is an independent retailer. We are not affiliated with, endorsed by, or sponsored by any of the brands featured. All trademarks belong to their respective owners.
