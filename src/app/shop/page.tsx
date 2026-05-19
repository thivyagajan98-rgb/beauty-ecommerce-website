import { Suspense } from "react";
import ShopClient from "./ShopClient";

export const metadata = {
  title: "Shop"
};

export default function ShopPage() {
  return (
    <Suspense fallback={<ShopSkeleton />}>
      <ShopClient />
    </Suspense>
  );
}

function ShopSkeleton() {
  return (
    <div className="container-x section">
      <div className="h-8 w-40 animate-pulse rounded bg-ink/5" />
      <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="aspect-[4/5] animate-pulse rounded-2xl bg-ink/5" />
        ))}
      </div>
    </div>
  );
}
