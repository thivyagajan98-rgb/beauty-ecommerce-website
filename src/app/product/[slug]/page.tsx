import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { findProductBySlug, PRODUCTS, relatedProducts } from "@/lib/products";
import { findBrand } from "@/lib/brands";
import { findSubcategoryName } from "@/lib/categories";
import { formatLKR, discountPct } from "@/lib/format";
import ProductCard from "@/components/ProductCard";
import ProductActions from "./ProductActions";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: Props) {
  const product = findProductBySlug(params.slug);
  if (!product) return { title: "Product not found" };
  const brand = findBrand(product.brandSlug);
  return {
    title: `${product.name} — ${brand?.name ?? ""}`,
    description: product.description
  };
}

export default function ProductPage({ params }: Props) {
  const product = findProductBySlug(params.slug);
  if (!product) notFound();

  const brand = findBrand(product.brandSlug);
  const off = discountPct(product.price, product.originalPrice);
  const related = relatedProducts(product, 4);
  const subName = findSubcategoryName(product.subcategory);

  return (
    <>
      {/* Breadcrumbs */}
      <div className="container-x pt-6 text-xs text-ink/60">
        <nav className="flex flex-wrap items-center gap-1.5">
          <Link href="/" className="hover:text-ink">Home</Link>
          <span>/</span>
          <Link href={`/shop?category=${product.category}`} className="capitalize hover:text-ink">
            {product.category}
          </Link>
          <span>/</span>
          <Link
            href={`/shop?category=${product.category}&sub=${product.subcategory}`}
            className="hover:text-ink"
          >
            {subName}
          </Link>
        </nav>
      </div>

      {/* Detail */}
      <section className="container-x grid gap-8 py-8 lg:grid-cols-2 lg:gap-14 lg:py-12">
        {/* Gallery */}
        <Gallery images={product.images} alt={product.name} />

        {/* Info */}
        <div>
          <Link
            href={`/brands/${product.brandSlug}`}
            className="text-xs uppercase tracking-[0.2em] text-blush-600 hover:underline"
          >
            {brand?.name}
          </Link>
          <h1 className="font-display mt-2 text-3xl leading-tight sm:text-4xl">
            {product.name}
          </h1>

          {/* Rating */}
          {product.rating && (
            <div className="mt-2 flex items-center gap-2 text-xs text-ink/70">
              <Stars value={product.rating} />
              <span>
                {product.rating.toFixed(1)} · {product.reviews ?? 0} reviews
              </span>
            </div>
          )}

          {/* Price */}
          <div className="mt-5 flex items-baseline gap-3">
            <span className="text-2xl font-semibold">{formatLKR(product.price)}</span>
            {product.originalPrice && (
              <>
                <span className="text-base text-ink/40 line-through">
                  {formatLKR(product.originalPrice)}
                </span>
                <span className="chip bg-blush-200 text-ink">-{off}%</span>
              </>
            )}
          </div>

          {/* Condition + stock */}
          <div className="mt-4 flex flex-wrap gap-2">
            <span className={`chip ${product.condition === "new" ? "bg-white" : "bg-ink text-white"}`}>
              {product.condition === "new" ? "New · Sealed" : "Gently Used"}
            </span>
            {product.stock > 0 ? (
              <span className="chip bg-blush-100 text-blush-700">In stock · {product.stock} available</span>
            ) : (
              <span className="chip bg-ink/5">Sold out</span>
            )}
            <span className="chip">{subName}</span>
          </div>

          {/* Add to cart */}
          <ProductActions productId={product.id} stock={product.stock} />

          {/* Description */}
          <div className="mt-8 space-y-4 text-sm text-ink/80">
            <p className="leading-relaxed">{product.description}</p>
          </div>

          {/* Authenticity */}
          <div className="mt-8 rounded-2xl border border-blush-200 bg-blush-50 p-5">
            <div className="flex items-start gap-3">
              <Verified />
              <div>
                <p className="text-sm font-semibold">Authenticity guaranteed</p>
                <p className="mt-1 text-xs text-ink/70">
                  {product.authenticityNote ??
                    "Sourced from authorised retailers or verified resellers. Batch codes verified on dispatch."}
                </p>
              </div>
            </div>
          </div>

          {/* Trust details */}
          <ul className="mt-6 grid grid-cols-1 gap-3 text-xs text-ink/70 sm:grid-cols-2">
            <li className="flex gap-2"><Bullet />Cash on Delivery available</li>
            <li className="flex gap-2"><Bullet />Island-wide shipping in 2–4 days</li>
            <li className="flex gap-2"><Bullet />7-day defect-free guarantee</li>
            <li className="flex gap-2"><Bullet />Discreet, secure packaging</li>
          </ul>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="section bg-beige/60">
          <div className="container-x">
            <p className="eyebrow">You may also like</p>
            <h2 className="h-display mt-2">More from {brand?.name}</h2>
            <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function Gallery({ images, alt }: { images: string[]; alt: string }) {
  return (
    <div className="lg:sticky lg:top-24 lg:self-start">
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl bg-beige">
        <Image
          src={images[0]}
          alt={alt}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>
      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-4 gap-2">
          {images.slice(0, 4).map((src, i) => (
            <div key={i} className="relative aspect-square overflow-hidden rounded-xl bg-beige">
              <Image src={src} alt={`${alt} view ${i + 1}`} fill sizes="20vw" className="object-cover" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Stars({ value }: { value: number }) {
  const full = Math.round(value);
  return (
    <div className="flex" aria-label={`${value} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < full ? "text-blush-500" : "text-ink/15"}>
          ★
        </span>
      ))}
    </div>
  );
}

function Verified() {
  return (
    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-blush-200 text-blush-700">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M9 12l2 2 4-4" />
        <circle cx="12" cy="12" r="10" />
      </svg>
    </span>
  );
}

function Bullet() {
  return <span className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-blush-500" />;
}
