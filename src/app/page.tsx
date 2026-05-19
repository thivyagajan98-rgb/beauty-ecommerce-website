import Link from "next/link";
import Image from "next/image";
import { CATEGORIES } from "@/lib/categories";
import { BRANDS } from "@/lib/brands";
import { PRODUCTS } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import BrandLogo from "@/components/BrandLogo";
import TrustStrip from "@/components/TrustStrip";

export default function HomePage() {
  const viral = PRODUCTS.filter((p) => p.tags?.includes("viral")).slice(0, 8);
  const newArrivals = PRODUCTS.filter((p) => p.tags?.includes("new")).slice(0, 8);
  const offers = PRODUCTS.filter((p) => p.tags?.includes("offer")).slice(0, 8);
  const featuredBrands = BRANDS.slice(0, 12);

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="container-x grid gap-8 pt-10 pb-12 sm:pt-14 lg:grid-cols-12 lg:gap-12 lg:pt-20 lg:pb-16">
          <div className="lg:col-span-6 lg:pt-8 fade-up">
            <p className="eyebrow">New in · Sri Lanka</p>
            <h1 className="h-display mt-3">
              Authentic luxury makeup,
              <br />
              <span className="italic text-blush-600">delivered to your door.</span>
            </h1>
            <p className="mt-5 max-w-prose text-ink/70">
              Curated drops from Charlotte Tilbury, Rare Beauty, Fenty, MAC, Dior & more.
              Every piece is verified — sealed new or gently used, never fake.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/shop" className="btn-primary">Shop the edit</Link>
              <Link href="/brands" className="btn-outline">Browse brands</Link>
            </div>

            <ul className="mt-8 grid grid-cols-2 gap-3 text-xs text-ink/70 sm:grid-cols-3">
              <li className="flex items-center gap-2"><Dot /> 100% Authentic</li>
              <li className="flex items-center gap-2"><Dot /> Secure Card Payments</li>
              <li className="flex items-center gap-2"><Dot /> Island-wide</li>
            </ul>
          </div>

          <div className="relative lg:col-span-6">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-beige sm:aspect-[5/4] lg:aspect-[4/5]">
              <Image
                src="https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=1600&q=80&auto=format&fit=crop"
                alt="Curated makeup edit"
                fill
                priority
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div className="absolute bottom-4 left-4 rounded-2xl bg-white/90 p-3 shadow-soft backdrop-blur sm:bottom-6 sm:left-6">
                <p className="text-[10px] uppercase tracking-[0.2em] text-ink/50">Editor’s pick</p>
                <p className="mt-0.5 text-sm font-medium">Soft Pinch · Rare Beauty</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TrustStrip />

      {/* CATEGORIES */}
      <section className="section">
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
                className="group relative overflow-hidden rounded-2xl border border-ink/5 bg-white p-6 shadow-soft transition-shadow hover:shadow-lift"
              >
                <div className="text-3xl">{c.emoji}</div>
                <p className="mt-4 font-display text-2xl">{c.name}</p>
                <p className="mt-1 text-xs text-ink/60">{c.blurb}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium text-ink/70">
                  Shop {c.name.toLowerCase()}
                  <Arrow />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* BRANDS */}
      <section className="section bg-beige/60">
        <div className="container-x">
          <SectionHead
            eyebrow="Shop by brand"
            title="The houses we love"
            cta={{ href: "/brands", label: "All brands" }}
          />
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {featuredBrands.map((b) => (
              <BrandLogo key={b.id} brand={b} />
            ))}
          </div>
        </div>
      </section>

      {/* VIRAL */}
      <ProductRail
        eyebrow="As seen on TikTok"
        title="Viral right now"
        href="/viral"
        products={viral}
      />

      {/* NEW ARRIVALS */}
      <section className="section bg-beige/60">
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
        title="Offers you'll love"
        href="/offers"
        products={offers}
      />

      {/* TRUST CTA */}
      <section className="section">
        <div className="container-x">
          <div className="grid gap-6 rounded-3xl border border-ink/5 bg-ink p-8 text-cream sm:p-12 lg:grid-cols-2 lg:p-16">
            <div>
              <p className="eyebrow text-blush-300">Our promise</p>
              <h2 className="h-display mt-3 text-cream">
                100% authentic.
                <br />
                <span className="italic text-blush-300">Or your money back.</span>
              </h2>
            </div>
            <div className="grid gap-4 text-sm text-cream/80">
              <p>
                Every piece is sourced from authorised retailers or verified resellers.
                Batch codes are checked, packaging is scrutinised, and gently used items
                are sanitised before dispatch.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/pages/authenticity" className="btn bg-cream text-ink hover:bg-white">
                  Authenticity guarantee
                </Link>
                <Link href="/pages/returns" className="btn border border-cream/20 text-cream hover:bg-cream/10">
                  Return policy
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
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
  products: typeof PRODUCTS;
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
        <Link href={cta.href} className="hidden items-center gap-1 text-sm text-ink/70 hover:text-ink sm:inline-flex">
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
