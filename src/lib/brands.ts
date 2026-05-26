import type { Brand } from "./types";

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

const NAMES: { name: string; description: string }[] = [
  { name: "Charlotte Tilbury", description: "Hollywood glow, cult Pillow Talk." },
  { name: "Dior", description: "Parisian couture beauty." },
  { name: "Huda Beauty", description: "Glam, pigment-rich palettes & lashes." },
  { name: "Fenty Beauty", description: "Inclusive shades, runway-ready finish." },
  { name: "Maybelline", description: "Drugstore icons — Sky High, Fit Me." },
  { name: "Rare Beauty", description: "Soft Pinch, Selena Gomez’s gentle glow." },
  { name: "One Size", description: "Expert formulas by Patrick Starrr." },
  { name: "NARS", description: "Sensual, French-American colour." },
  { name: "Morphe", description: "Pro-quality palettes & brushes." },
  { name: "Bobbi Brown", description: "Modern, skin-first essentials." },
  { name: "Tarte", description: "Shape Tape & cheeky tints." }
];

export const BRANDS: Brand[] = NAMES.map((b, i) => ({
  id: `b_${i + 1}`,
  slug: slugify(b.name),
  name: b.name,
  description: b.description,
  logoText: b.name
}));

export function findBrand(slug: string) {
  return BRANDS.find((b) => b.slug === slug);
}
