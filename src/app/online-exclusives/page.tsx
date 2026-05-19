import { PRODUCTS } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import CollectionHero from "@/components/CollectionHero";

export const metadata = { title: "Online Exclusives" };

export default function OnlineExclusivesPage() {
  const items = PRODUCTS.filter((p) => p.tags?.includes("exclusive"));
  return (
    <>
      <CollectionHero
        eyebrow="Online only"
        title="Online Exclusives"
        description="Rare imports & limited drops you can only get on Facez.lk."
        tone="ink"
      />
      <section className="container-x section">
        {items.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-ink/15 bg-white p-12 text-center">
            <p className="font-display text-2xl">New drops coming</p>
            <p className="mt-2 text-sm text-ink/60">Follow us on Instagram for first access.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
            {items.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
