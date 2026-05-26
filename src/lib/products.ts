import type { Product } from "./types";

// Curated launch catalog — products from FACEZ.lk's 11 official brands.
// Images use Unsplash for stable, royalty-free product photography.
export const PRODUCTS: Product[] = [
  {
    id: "p_001",
    slug: "soft-pinch-liquid-blush-joy",
    name: "Soft Pinch Liquid Blush — Joy",
    brandSlug: "rare-beauty",
    category: "cheek",
    subcategory: "liquid-blush",
    price: 9800,
    condition: "new",
    description:
      "Weightless, blendable liquid blush for a natural, lit-from-within flush. Soft matte finish, long-wearing.",
    images: [
      "https://images.unsplash.com/photo-1631214540242-3cd8c4b0b3b8?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1620917669809-1af0497965f2?w=1200&q=80&auto=format&fit=crop"
    ],
    stock: 12,
    authenticityNote: "Sourced from authorised retailers. Batch code verified.",
    tags: ["viral", "new"],
    rating: 4.8,
    reviews: 42
  },
  {
    id: "p_002",
    slug: "pillow-talk-matte-revolution-lipstick",
    name: "Matte Revolution Lipstick — Pillow Talk",
    brandSlug: "charlotte-tilbury",
    category: "lips",
    subcategory: "lipstick",
    price: 14500,
    condition: "new",
    description:
      "The cult nude-pink that flatters every skin tone. Hydrating matte formula with a soft-focus finish.",
    images: [
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=1200&q=80&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1599733589046-8a35aa3a2a2f?w=1200&q=80&auto=format&fit=crop"
    ],
    stock: 6,
    authenticityNote: "Boxed, sealed, with batch code.",
    tags: ["viral"],
    rating: 4.9,
    reviews: 88
  },
  {
    id: "p_003",
    slug: "charlotte-tilbury-airbrush-flawless-setting-spray",
    name: "Airbrush Flawless Setting Spray",
    brandSlug: "charlotte-tilbury",
    category: "face",
    subcategory: "setting-spray",
    price: 11200,
    originalPrice: 13500,
    condition: "new",
    description:
      "Magic mist that locks makeup in place for up to 16 hours. Lightweight, hydrating, transfer-resistant.",
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1200&q=80&auto=format&fit=crop"
    ],
    stock: 9,
    tags: ["offer"],
    rating: 4.6,
    reviews: 19
  },
  {
    id: "p_004",
    slug: "fenty-pro-filtr-soft-matte-foundation-240",
    name: "Pro Filt’r Soft Matte Longwear Foundation — 240",
    brandSlug: "fenty-beauty",
    category: "face",
    subcategory: "foundation",
    price: 13500,
    condition: "new",
    description:
      "Climate-adaptive, soft-matte foundation that resists sweat & humidity. Buildable medium-to-full coverage.",
    images: [
      "https://images.unsplash.com/photo-1631730486572-226d1f595b68?w=1200&q=80&auto=format&fit=crop"
    ],
    stock: 4,
    authenticityNote: "Imported from authorised stockist. Sealed.",
    tags: ["new"],
    rating: 4.7,
    reviews: 31
  },
  {
    id: "p_005",
    slug: "fenty-stunna-lip-paint-uncensored",
    name: "Stunna Lip Paint — Uncensored",
    brandSlug: "fenty-beauty",
    category: "lips",
    subcategory: "liquid-lipstick",
    price: 10800,
    condition: "new",
    description:
      "The universal-flattering red liquid lipstick. Long-wear, weightless and ultra-pigmented matte finish.",
    images: [
      "https://images.unsplash.com/photo-1599733589046-8a35aa3a2a2f?w=1200&q=80&auto=format&fit=crop"
    ],
    stock: 7,
    tags: ["viral", "new"],
    rating: 4.7,
    reviews: 56
  },
  {
    id: "p_006",
    slug: "maybelline-sky-high-mascara",
    name: "Lash Sensational Sky High Mascara",
    brandSlug: "maybelline",
    category: "eyes",
    subcategory: "mascara",
    price: 3200,
    condition: "new",
    description:
      "Limitless length & volume with a flexible bamboo-tech brush. The TikTok cult favourite.",
    images: [
      "https://images.unsplash.com/photo-1631214540242-3cd8c4b0b3b8?w=1200&q=80&auto=format&fit=crop"
    ],
    stock: 22,
    tags: ["viral"],
    rating: 4.7,
    reviews: 124
  },
  {
    id: "p_007",
    slug: "nars-orgasm-blush",
    name: "Blush — Orgasm",
    brandSlug: "nars",
    category: "cheek",
    subcategory: "blush",
    price: 11800,
    condition: "new",
    description:
      "The legendary peachy-pink with golden shimmer. A universally flattering classic.",
    images: [
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=1200&q=80&auto=format&fit=crop"
    ],
    stock: 5,
    authenticityNote: "Boxed, sealed, with batch code.",
    rating: 4.9,
    reviews: 32
  },
  {
    id: "p_008",
    slug: "huda-obsessions-warm-brown",
    name: "Obsessions Eyeshadow Palette — Warm Brown",
    brandSlug: "huda-beauty",
    category: "eyes",
    subcategory: "eyeshadow",
    price: 8400,
    originalPrice: 9900,
    condition: "new",
    description:
      "Pocket-size palette with 9 buttery shades — mattes, shimmers & a foiled topper.",
    images: [
      "https://images.unsplash.com/photo-1583241800698-9c2e0a4d4f88?w=1200&q=80&auto=format&fit=crop"
    ],
    stock: 5,
    tags: ["offer"],
    rating: 4.6,
    reviews: 27
  },
  {
    id: "p_009",
    slug: "dior-lip-glow-oil-rosewood",
    name: "Lip Glow Oil — Rosewood",
    brandSlug: "dior",
    category: "lips",
    subcategory: "lip-oil",
    price: 15800,
    originalPrice: 17500,
    condition: "new",
    description:
      "Nourishing, plumping lip oil with cherry oil. Glossy, non-sticky shine in a flattering rosewood tint.",
    images: [
      "https://images.unsplash.com/photo-1599733589046-8a35aa3a2a2f?w=1200&q=80&auto=format&fit=crop"
    ],
    stock: 4,
    tags: ["viral", "offer", "gift-set"],
    rating: 4.8,
    reviews: 38
  },
  {
    id: "p_010",
    slug: "one-size-on-til-dawn-setting-spray",
    name: "On 'Til Dawn Setting Spray",
    brandSlug: "one-size",
    category: "face",
    subcategory: "setting-spray",
    price: 12500,
    condition: "new",
    description:
      "All-night-wear setting spray that locks makeup for up to 24 hours. Weightless, sweat & humidity-proof.",
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1200&q=80&auto=format&fit=crop"
    ],
    stock: 6,
    tags: ["new"],
    rating: 4.6,
    reviews: 14
  },
  {
    id: "p_011",
    slug: "morphe-35o-nature-glow-eyeshadow-palette",
    name: "35O Original Nature Glow Eyeshadow Palette",
    brandSlug: "morphe",
    category: "eyes",
    subcategory: "eyeshadow",
    price: 8900,
    condition: "new",
    description:
      "35 buttery, blendable shades from earthy mattes to molten metallics. The cult eye-look palette.",
    images: [
      "https://images.unsplash.com/photo-1583241800698-9c2e0a4d4f88?w=1200&q=80&auto=format&fit=crop"
    ],
    stock: 4,
    tags: ["viral"],
    rating: 4.7,
    reviews: 61
  },
  {
    id: "p_012",
    slug: "bobbi-brown-luxe-lip-color-pink-nude",
    name: "Luxe Lip Color — Pink Nude",
    brandSlug: "bobbi-brown",
    category: "lips",
    subcategory: "lipstick",
    price: 9800,
    condition: "new",
    description:
      "Creamy, hydrating pigment in a sleek metal bullet. The grown-up pink-nude that feels like skin.",
    images: [
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=1200&q=80&auto=format&fit=crop"
    ],
    stock: 8,
    tags: ["new"],
    rating: 4.6,
    reviews: 22
  },
  {
    id: "p_013",
    slug: "tarte-shape-tape-concealer-fair-light-neutral",
    name: "Shape Tape Concealer — Fair Light Neutral",
    brandSlug: "tarte",
    category: "face",
    subcategory: "concealer",
    price: 7800,
    condition: "new",
    description:
      "Award-winning, full-coverage concealer that lifts, brightens & camouflages. 16-hour wear.",
    images: [
      "https://images.unsplash.com/photo-1631730486572-226d1f595b68?w=1200&q=80&auto=format&fit=crop"
    ],
    stock: 11,
    tags: ["viral"],
    rating: 4.8,
    reviews: 73
  }
];

export function findProductBySlug(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function findProductsByBrand(brandSlug: string) {
  return PRODUCTS.filter((p) => p.brandSlug === brandSlug);
}

export function findProductsByCategory(slug: string) {
  return PRODUCTS.filter((p) => p.category === slug);
}

export function relatedProducts(p: Product, limit = 4) {
  return PRODUCTS.filter(
    (x) => x.id !== p.id && (x.category === p.category || x.brandSlug === p.brandSlug)
  ).slice(0, limit);
}
