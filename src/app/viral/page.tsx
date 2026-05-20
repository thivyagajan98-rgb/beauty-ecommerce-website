import { fetchAllProducts } from "@/lib/catalog";
import ProductCard from "@/components/ProductCard";
import CollectionHero from "@/components/CollectionHero";

export const metadata = { title: "Viral picks" };
export const revalidate = 60;

export default async function ViralPage() {
  const products = await fetchAllProducts();
  const items = products.filter((p) => p.tags?.includes("viral"));
  return (
    <>
      <CollectionHero
        eyebrow="As seen on TikTok"
        title="Viral right now"
        description="The pieces you keep DM-ing us about. Limited stock — grab before they’re gone."
      />
      <section className="container-x section">
        <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}
