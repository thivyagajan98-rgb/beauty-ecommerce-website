"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { discountPct, formatLKR } from "@/lib/format";
import { BRANDS } from "@/lib/brands";
import { useCart } from "@/lib/cart";

interface Props {
  product: Product;
  priority?: boolean;
}

export default function ProductCard({ product, priority }: Props) {
  const brand = BRANDS.find((b) => b.slug === product.brandSlug);
  const off = discountPct(product.price, product.originalPrice);
  const add = useCart((s) => s.add);

  return (
    <div className="group card overflow-hidden">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative aspect-[4/5] w-full overflow-hidden bg-beige">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
            priority={priority}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute left-3 top-3 flex flex-col gap-1.5">
            {product.condition === "gently-used" && (
              <span className="chip bg-ink text-white">Gently Used</span>
            )}
            {product.tags?.includes("viral") && (
              <span className="chip bg-blush-200 text-ink">Viral</span>
            )}
            {off > 0 && <span className="chip bg-white">-{off}%</span>}
          </div>
          {product.stock <= 3 && product.stock > 0 && (
            <span className="absolute bottom-3 left-3 chip bg-white text-ink/80">
              Only {product.stock} left
            </span>
          )}
          {product.stock === 0 && (
            <span className="absolute inset-0 grid place-items-center bg-white/70 text-sm font-medium">
              Sold out
            </span>
          )}
        </div>
      </Link>

      <div className="p-4">
        <p className="text-[11px] uppercase tracking-[0.16em] text-ink/50">{brand?.name}</p>
        <Link
          href={`/product/${product.slug}`}
          className="mt-1 line-clamp-2 block text-sm font-medium text-ink hover:underline"
        >
          {product.name}
        </Link>

        <div className="mt-2 flex items-baseline gap-2">
          <span className="text-sm font-semibold">{formatLKR(product.price)}</span>
          {product.originalPrice && (
            <span className="text-xs text-ink/40 line-through">
              {formatLKR(product.originalPrice)}
            </span>
          )}
        </div>

        <button
          type="button"
          disabled={product.stock === 0}
          onClick={() => add(product.id, 1)}
          className="btn-outline mt-3 w-full text-xs"
        >
          {product.stock === 0 ? "Sold out" : "Add to bag"}
        </button>
      </div>
    </div>
  );
}
