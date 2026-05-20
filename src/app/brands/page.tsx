import Link from "next/link";
import { fetchAllBrands, fetchAllProducts } from "@/lib/catalog";

export const metadata = { title: "Brands" };
export const revalidate = 60;

export default async function BrandsPage() {
  const [brands, products] = await Promise.all([fetchAllBrands(), fetchAllProducts()]);

  // Group brands alphabetically
  const groups = brands.reduce<Record<string, typeof brands>>((acc, b) => {
    const key = b.name[0].toUpperCase();
    if (!acc[key]) acc[key] = [];
    acc[key].push(b);
    return acc;
  }, {});

  const letters = Object.keys(groups).sort();

  return (
    <>
      <section className="border-b border-ink/5 bg-white">
        <div className="container-x py-10 sm:py-14">
          <p className="eyebrow">Brands</p>
          <h1 className="h-display mt-2">All brands, A–Z</h1>
          <p className="mt-2 max-w-prose text-sm text-ink/60">
            From Armani Beauty to YSL — discover the houses we curate. Each brand page
            shows authentic, in-stock products only.
          </p>

          <div className="mt-6 flex flex-wrap gap-1.5">
            {letters.map((l) => (
              <a
                key={l}
                href={`#${l}`}
                className="rounded-full border border-ink/10 bg-white px-3 py-1 text-xs hover:bg-blush-100"
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x section">
        <div className="space-y-12">
          {letters.map((l) => (
            <div key={l} id={l}>
              <p className="font-display text-2xl text-ink/80">{l}</p>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                {groups[l].map((b) => {
                  const count = products.filter((p) => p.brandSlug === b.slug).length;
                  return (
                    <Link
                      key={b.id}
                      href={`/brands/${b.slug}`}
                      className="group rounded-2xl border border-ink/5 bg-white p-5 text-center transition-shadow hover:shadow-lift"
                    >
                      <p className="font-display text-lg group-hover:text-ink">{b.name}</p>
                      <p className="mt-1 text-[11px] text-ink/50">
                        {count > 0 ? `${count} product${count > 1 ? "s" : ""}` : "Coming soon"}
                      </p>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
