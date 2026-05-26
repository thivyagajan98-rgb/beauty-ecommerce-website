import Link from "next/link";
import Image from "next/image";
import { CATEGORIES } from "@/lib/categories";
import { fetchAllBrands, fetchAllProducts } from "@/lib/catalog";
import type { Brand, Product } from "@/lib/types";
import ProductCard from "@/components/ProductCard";
import TrustStrip from "@/components/TrustStrip";

export const revalidate = 60;

export default async function HomePage() {
  const [allProducts, allBrands] = await Promise.all([fetchAllProducts(), fetchAllBrands()]);

  const viral = allProducts.filter((p) => p.tags?.includes("viral")).slice(0, 8);
  const newArrivals = allProducts.filter((p) => p.tags?.includes("new")).slice(0, 8);
  const offers = allProducts.filter((p) => p.tags?.includes("offer")).slice(0, 8);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="container-x grid gap-8 pt-10 pb-12 sm:pt-14 lg:grid-cols-12 lg:gap-12 lg:pt-20 lg:pb-16">
          <div className="lg:col-span-6 lg:pt-8 fade-up">
            <p className="eyebrow">FACEZ.lk · Since 2015</p>
            <h1 className="h-display mt-3">
              Sri Lanka{" "}
              <span className="font-semibold text-blush-600">No.1 Brand</span>{" "}
              to bring Authentic Makeup products since 2015.
            </h1>
            <p className="mt-5 max-w-prose text-ink/70">
              Charlotte Tilbury, Dior, Huda Beauty, Fenty, Rare Beauty, MAC favourites &
              more — every product 100% authentic, delivered island-wide.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/shop" className="btn-primary">Shop the edit</Link>
              <Link href="/brands" className="btn-outline">Shop by brands</Link>
            </div>

            <ul className="mt-8 grid grid-cols-2 gap-3 text-xs text-ink/70 sm:grid-cols-3">
              <li className="flex items-center gap-2"><Dot /> 100% Authentic</li>
              <li className="flex items-center gap-2"><Dot /> Free over LKR 25,000</li>
              <li className="flex items-center gap-2"><Dot /> Island-wide</li>
            </ul>
          </div>

          <div className="relative lg:col-span-6">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-blush-50 sm:aspect-[5/4] lg:aspect-[4/5]">
              <Image
                src="https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=1600&q=80&auto=format&fit=crop"
                alt="FACEZ.lk authentic makeup"
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute bottom-4 left-4 rounded-2xl bg-white/90 p-3 shadow-soft backdrop-blur sm:bottom-6 sm:left-6">
                <p className="text-[10px] uppercase tracking-[0.2em] text-blush-600">Editor’s pick</p>
                <p className="mt-0.5 text-sm font-medium">Soft Pinch · Rare Beauty</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TrustStrip />

      {/* 100% AUTHENTIC centerpiece */}
      <section className="bg-white py-16 sm:py-20 lg:py-24">
        <div className="container-x text-center">
          <p className="eyebrow">Our promise</p>
          <p className="font-display mt-3 text-5xl tracking-tight text-blush-600 sm:text-6xl lg:text-7xl">
            100% AUTHENTIC
          </p>
          <p className="mx-auto mt-4 max-w-md text-sm text-ink/60">
            Sourced from authorised retailers and verified suppliers. Every batch code
            checked. Sealed on dispatch.
          </p>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="section bg-blush-50">
        <div className="container-x">
          <SectionHead
            eyebrow="Shop by category"
            title="Find your finish"
            cta={{ href: "/shop", label: "Shop all" }}
          />
          <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                href={`/shop?category=${c.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-blush-100 bg-white p-6 shadow-soft transition-shadow hover:shadow-lift"
              >
                <div className="text-3xl">{c.emoji}</div>
                <p className="mt-4 font-display text-2xl">{c.name}</p>
                <p className="mt-1 text-xs text-ink/60">{c.blurb}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-blush-700">
                  Shop {c.name.toLowerCase()}
                  <Arrow />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* BRANDS RUNNING MARQUEE */}
      <BrandMarquee brands={allBrands} />

      {/* VIRAL */}
      <ProductRail
        eyebrow="Viral right now"
        title="Viral Products"
        href="/viral"
        products={viral}
      />

      {/* NEW ARRIVALS */}
      <section className="section bg-blush-50">
        <div className="container-x">
          <SectionHead
            eyebrow="Just dropped"
            title="New arrivals"
            cta={{ href: "/shop?tag=new", label: "Shop new" }}
          />
          <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
            {newArrivals.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* OFFERS */}
      <ProductRail
        eyebrow="Edits & deals"
        title="Offers / Sale"
        href="/offers"
        products={offers}
      />

      {/* PRE ORDER CTA */}
      <section className="section bg-blush-50">
        <div className="container-x">
          <div className="rounded-3xl border border-blush-200 bg-white p-8 text-center sm:p-12">
            <p className="eyebrow">Pre Order</p>
            <h2 className="font-display mt-3 text-3xl text-ink sm:text-4xl">
              Want something we don’t stock?
            </h2>
            <p className="mx-auto mt-3 max-w-prose text-sm text-ink/70">
              We pre-order any authentic product from your favourite brands. 50% advance,
              2–3 weeks delivery — handled directly through WhatsApp.
            </p>
            <div className="mt-5 flex justify-center gap-3">
              <Link href="/pre-order" className="btn-primary">Place a pre order</Link>
              <Link href="/brands" className="btn-outline">Browse brands</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function BrandMarquee({ brands }: { brands: Brand[] }) {
  if (brands.length === 0) return null;
  // Duplicate the list so the marquee loops seamlessly.
  const track = [...brands, ...brands];
  return (
    <section className="border-y border-blush-100 bg-white py-10 sm:py-12">
      <div className="container-x">
        <p className="eyebrow text-center">The brands we love</p>
      </div>
      <div className="mt-6 overflow-hidden">
        <div className="flex w-max animate-marquee-x items-center gap-12 px-6 text-ink/70">
          {track.map((b, i) => (
            <Link
              key={`${b.id}-${i}`}
              href={`/brands/${b.slug}`}
              className="font-display whitespace-nowrap text-2xl tracking-tight transition-colors hover:text-blush-700 sm:text-3xl"
            >
              {b.name}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductRail({
  eyebrow,
  title,
  href,
  products
}: {
  eyebrow: string;
  title: string;
  href: string;
  products: Product[];
}) {
  if (products.length === 0) return null;
  return (
    <section className="section">
      <div className="container-x">
        <SectionHead eyebrow={eyebrow} title={title} cta={{ href, label: "View all" }} />
        <div className="mt-8 -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 no-scrollbar sm:mx-0 sm:px-0 sm:grid sm:grid-cols-3 sm:gap-6 lg:grid-cols-4">
          {products.map((p) => (
            <div key={p.id} className="w-[70vw] shrink-0 snap-start sm:w-auto">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function SectionHead({
  eyebrow,
  title,
  cta
}: {
  eyebrow: string;
  title: string;
  cta?: { href: string; label: string };
}) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="h-display mt-2">{title}</h2>
      </div>
      {cta && (
        <Link
          href={cta.href}
          className="hidden items-center gap-1 text-sm text-blush-700 hover:text-blush-800 sm:inline-flex"
        >
          {cta.label}
          <Arrow />
        </Link>
      )}
    </div>
  );
}

function Arrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M5 12h14" />
      <path d="M13 6l6 6-6 6" />
    </svg>
  );
}

function Dot() {
  return <span className="inline-block h-1.5 w-1.5 rounded-full bg-blush-500" />;
}
