import { notFound } from "next/navigation";
import Link from "next/link";
import {
  fetchAllBrands,
  fetchBrandBySlug,
  fetchProductsByBrand
} from "@/lib/catalog";
import ProductCard from "@/components/ProductCard";

interface Props {
  params: { slug: string };
}

export const revalidate = 60;

export async function generateStaticParams() {
  const brands = await fetchAllBrands();
  return brands.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: Props) {
  const brand = await fetchBrandBySlug(params.slug);
  if (!brand) return { title: "Brand not found" };
  return { title: brand.name, description: brand.description };
}

export default async function BrandPage({ params }: Props) {
  const brand = await fetchBrandBySlug(params.slug);
  if (!brand) notFound();

  const products = await fetchProductsByBrand(brand.slug);

  return (
    <>
      <section className="border-b border-ink/5 bg-beige/60">
        <div className="container-x py-12 sm:py-16">
          <p className="eyebrow">Brand</p>
          <h1 className="font-display mt-2 text-4xl sm:text-5xl">{brand.name}</h1>
          <p className="mt-3 max-w-prose text-sm text-ink/70">{brand.description}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link href="/brands" className="btn-outline text-xs">← All brands</Link>
            <Link href={`/shop?brand=${brand.slug}`} className="btn-blush text-xs">
              Shop in store view
            </Link>
          </div>
        </div>
      </section>

      <section className="container-x section">
        {products.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-ink/15 bg-white p-12 text-center">
            <p className="font-display text-2xl">Coming soon</p>
            <p className="mt-2 text-sm text-ink/60">
              We’re sourcing {brand.name} pieces. Check back shortly or DM us on Instagram.
            </p>
            <Link href="/shop" className="btn-primary mt-4 inline-flex">Shop other brands</Link>
          </div>
        ) : (
          <>
            <p className="text-sm text-ink/60">
              {products.length} product{products.length === 1 ? "" : "s"}
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </>
        )}
      </section>

      <section className="border-t border-ink/5 bg-white">
        <div className="container-x py-8 text-xs text-ink/60">
          <p>
            Disclaimer: FACEZ.lk is an independent retailer and is not affiliated with,
            endorsed by, or sponsored by {brand.name}. All trademarks are the property of
            their respective owners.
          </p>
        </div>
      </section>
    </>
  );
}
