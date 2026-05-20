import { fetchAllProducts } from "@/lib/catalog";
import ProductCard from "@/components/ProductCard";
import CollectionHero from "@/components/CollectionHero";

export const metadata = { title: "Gift Sets" };
export const revalidate = 60;

export default async function GiftSetsPage() {
  const products = await fetchAllProducts();
  const items = products.filter((p) => p.tags?.includes("gift-set"));
  return (
    <>
      <CollectionHero
        eyebrow="For her, with love"
        title="Gift Sets"
        description="Beautifully boxed, ready to gift. Add a personal note at checkout — we’ll handwrite it."
        tone="blush"
      />
      <section className="container-x section">
        {items.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-ink/15 bg-white p-12 text-center">
            <p className="font-display text-2xl">Curating new sets</p>
            <p className="mt-2 text-sm text-ink/60">Our holiday edit drops soon.</p>
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
