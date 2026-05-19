import type { Product } from "./types";

// Curated launch catalog — 15 products across categories & brands.
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
    id: "p_004",
    slug: "hourglass-veil-mineral-primer",
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
    id: "p_005",
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
    id: "p_006",
    slug: "abh-dipbrow-pomade-ebony",
    name: "Dipbrow Pomade — Ebony",
    brandSlug: "anastasia-beverly-hills",
    category: "eyes",
    subcategory: "eyebrow",
    price: 6900,
    condition: "new",
    description:
      "Waterproof, smudge-proof brow pomade for full, defined brows. A pro-artist staple.",
    images: [
      "https://images.unsplash.com/photo-1599387737972-1d27a78f9d65?w=1200&q=80&auto=format&fit=crop"
    ],
    stock: 7,
    rating: 4.8,
    reviews: 56
  },
  {
    id: "p_007",
    slug: "nars-orgasm-blush",
    name: "Blush — Orgasm",
    brandSlug: "nars",
    category: "cheek",
    subcategory: "blush",
    price: 11800,
    condition: "gently-used",
    description:
      "The legendary peachy-pink with golden shimmer. Used 2–3 times, sanitised and depotted with care.",
    images: [
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=1200&q=80&auto=format&fit=crop"
    ],
    stock: 1,
    authenticityNote: "Original purchased from Sephora. Receipt available on request.",
    rating: 4.9,
    reviews: 12
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
    slug: "mac-ruby-woo-lipstick",
    name: "Retro Matte Lipstick — Ruby Woo",
    brandSlug: "mac",
    category: "lips",
    subcategory: "lipstick",
    price: 7500,
    condition: "new",
    description:
      "The iconic blue-red, retro matte. A flattering universal red for every skin tone.",
    images: [
      "https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=1200&q=80&auto=format&fit=crop"
    ],
    stock: 10,
    rating: 4.8,
    reviews: 73
  },
  {
    id: "p_010",
    slug: "elf-power-grip-primer",
    name: "Power Grip Primer",
    brandSlug: "e-l-f",
    category: "face",
    subcategory: "primer",
    price: 4200,
    condition: "new",
    description:
      "Sticky, gel-based primer that grips makeup all day. Hydrating with hyaluronic acid.",
    images: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1200&q=80&auto=format&fit=crop"
    ],
    stock: 18,
    tags: ["viral"],
    rating: 4.7,
    reviews: 102
  },
  {
    id: "p_011",
    slug: "milk-cooling-water-stick",
    name: "Cooling Water Jelly Tint — Burst",
    brandSlug: "milk-makeup",
    category: "cheek",
    subcategory: "liquid-blush",
    price: 9200,
    condition: "new",
    description:
      "Buildable jelly tint for cheeks & lips. Refreshing, dewy and clean-formulated.",
    images: [
      "https://images.unsplash.com/photo-1620917669809-1af0497965f2?w=1200&q=80&auto=format&fit=crop"
    ],
    stock: 6,
    tags: ["new"],
    rating: 4.5,
    reviews: 14
  },
  {
    id: "p_012",
    slug: "tom-ford-shade-and-illuminate",
    name: "Shade & Illuminate Cream Duo — Intensity 1",
    brandSlug: "tom-ford",
    category: "cheek",
    subcategory: "contour",
    price: 24500,
    condition: "gently-used",
    description:
      "Cream sculpting duo for a sculpted, lit complexion. Gently used twice, beautifully kept.",
    images: [
      "https://images.unsplash.com/photo-1599733589046-8a35aa3a2a2f?w=1200&q=80&auto=format&fit=crop"
    ],
    stock: 1,
    authenticityNote: "Box, sleeve & receipt available.",
    tags: ["exclusive"],
    rating: 4.9,
    reviews: 4
  },
  {
    id: "p_013",
    slug: "patrick-ta-major-glow-balm",
    name: "Major Glow Body Oil",
    brandSlug: "patrick-ta",
    category: "cheek",
    subcategory: "highlighter",
    price: 13800,
    condition: "new",
    description:
      "Skin-blurring, lit-from-within glow for face & body. Lightweight, non-sticky shimmer.",
    images: [
      "https://images.unsplash.com/photo-1612817288484-6f916006741a?w=1200&q=80&auto=format&fit=crop"
    ],
    stock: 3,
    tags: ["new", "exclusive"],
    rating: 4.7,
    reviews: 9
  },
  {
    id: "p_014",
    slug: "ardell-wispies-lashes",
    name: "Wispies Lashes (3-Pack)",
    brandSlug: "ardell",
    category: "eyes",
    subcategory: "eyelashes",
    price: 2900,
    condition: "new",
    description:
      "The classic, fluttery wispy lash. Reusable up to 20 wears each.",
    images: [
      "https://images.unsplash.com/photo-1583241800698-9c2e0a4d4f88?w=1200&q=80&auto=format&fit=crop"
    ],
    stock: 25,
    rating: 4.6,
    reviews: 48
  },
  {
    id: "p_015",
    slug: "dior-lip-glow-oil-rosewood",
    name: "Lip Glow Oil — Rosewood",
    brandSlug: "dior-beauty",
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
  return PRODUCTS.filter((x) => x.id !== p.id && (x.category === p.category || x.brandSlug === p.brandSlug)).slice(
    0,
    limit
  );
}
