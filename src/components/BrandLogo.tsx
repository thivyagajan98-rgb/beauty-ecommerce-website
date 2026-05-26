import Link from "next/link";
import type { Brand } from "@/lib/types";

interface Props {
  brand: Brand;
  compact?: boolean;
}

export default function BrandLogo({ brand, compact }: Props) {
  return (
    <Link
      href={`/brands/${brand.slug}`}
      className={`group flex items-center justify-center rounded-2xl border border-blush-100 bg-white text-center transition-all duration-200 hover:border-blush-300 hover:shadow-lift ${
        compact ? "h-16 px-3" : "h-24 px-4"
      }`}
    >
      <span className="font-display text-base text-ink/80 group-hover:text-blush-700 sm:text-lg">
        {brand.name}
      </span>
    </Link>
  );
}
