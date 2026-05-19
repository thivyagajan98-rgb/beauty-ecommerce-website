import { PRODUCTS } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import CollectionHero from "@/components/CollectionHero";

export const metadata = { title: "Offers & deals" };

export default function OffersPage() {
  const items = PRODUCTS.filter((p) => p.tags?.includes("offer") || p.originalPrice);
  return (
    <>
      <CollectionHero
        eyebrow="Edits & deals"
        title="Offers you'll love"
        description="Hand-picked markdowns on authentic pieces. Once they’re gone, they’re gone."
        tone="beige"
      />
      <section className="container-x section">
        {items.length === 0 ? (
          <Empty />
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

function Empty() {
  return (
    <div className="rounded-2xl border border-dashed border-ink/15 bg-white p-12 text-center">
      <p className="font-display text-2xl">No offers right now</p>
      <p className="mt-2 text-sm text-ink/60">Check back soon — we drop new markdowns weekly.</p>
    </div>
  );
}
