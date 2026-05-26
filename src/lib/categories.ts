import type { Category, Subcategory } from "./types";

export interface CategoryDef {
  slug: Category;
  name: string;
  emoji: string;
  blurb: string;
  subcategories: { slug: Subcategory; name: string }[];
}

export const CATEGORIES: CategoryDef[] = [
  {
    slug: "face",
    name: "Face",
    emoji: "✨",
    blurb: "Bases, complexion & finishing",
    subcategories: [
      { slug: "foundation", name: "Foundation" },
      { slug: "primer", name: "Primer" },
      { slug: "concealer", name: "Concealer & Colour Corrector" },
      { slug: "powder", name: "Powder & Loose Powder" },
      { slug: "setting-spray", name: "Setting Spray" },
      { slug: "face-palettes", name: "Face Palettes" },
      { slug: "brushes", name: "Brushes & Makeup Bags" }
    ]
  },
  {
    slug: "cheek",
    name: "Cheeks",
    emoji: "🌸",
    blurb: "Glow, sculpt & flush",
    subcategories: [
      { slug: "contour", name: "Contour" },
      { slug: "bronzer", name: "Bronzer" },
      { slug: "blush", name: "Blush" },
      { slug: "liquid-blush", name: "Liquid Blush" },
      { slug: "highlighter", name: "Highlighter" },
      { slug: "cheek-kits", name: "Cheek Kits" }
    ]
  },
  {
    slug: "eyes",
    name: "Eyes",
    emoji: "👁",
    blurb: "Liners, lashes & shadow",
    subcategories: [
      { slug: "eyeshadow", name: "Eyeshadow" },
      { slug: "mascara", name: "Mascara" },
      { slug: "eyeliner", name: "Eyeliner" },
      { slug: "eyebrow", name: "Eyebrow" },
      { slug: "eyelashes", name: "Eyelashes" },
      { slug: "eye-kits", name: "Eye Kits" }
    ]
  },
  {
    slug: "lips",
    name: "Lips",
    emoji: "💋",
    blurb: "Color, shine & care",
    subcategories: [
      { slug: "lipstick", name: "Lipstick" },
      { slug: "liquid-lipstick", name: "Liquid Lipstick" },
      { slug: "lip-gloss", name: "Lip Gloss" },
      { slug: "lip-liner", name: "Lip Liner" },
      { slug: "lip-balm", name: "Lip Balm" },
      { slug: "plumping-lip-gloss", name: "Plumping Lip Gloss" },
      { slug: "lip-oil", name: "Lip Oil" },
      { slug: "lip-kits", name: "Lip Kits" }
    ]
  }
];

export function findCategory(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function findSubcategoryName(slug: Subcategory) {
  for (const c of CATEGORIES) {
    const sub = c.subcategories.find((s) => s.slug === slug);
    if (sub) return sub.name;
  }
  return slug;
}
