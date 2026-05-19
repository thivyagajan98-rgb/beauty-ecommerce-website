import type { Brand } from "./types";

const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

const NAMES: { name: string; description: string }[] = [
  { name: "Armani Beauty", description: "Italian luxury beauty house, known for Luminous Silk." },
  { name: "Anastasia Beverly Hills", description: "Brow & eye expertise, iconic palettes." },
  { name: "Barry M", description: "Playful, accessible UK colour cosmetics." },
  { name: "Benefit", description: "San Francisco brow & cheek experts." },
  { name: "Ardell", description: "Lash specialist, salon-grade falsies." },
  { name: "Bobbi Brown", description: "Modern, skin-first essentials." },
  { name: "Charlotte Tilbury", description: "Hollywood glow, cult Pillow Talk." },
  { name: "Dior Beauty", description: "Parisian couture beauty." },
  { name: "Clinique", description: "Allergy-tested, dermatologist-developed." },
  { name: "Danessa Myricks", description: "Pro-artist multi-use formulas." },
  { name: "e.l.f", description: "Cult buys at gentle prices." },
  { name: "Embryolisse", description: "French pharmacy hero — Lait-Crème Concentré." },
  { name: "Estée Lauder", description: "Iconic American luxury beauty." },
  { name: "Fenty Beauty", description: "Inclusive shades, runway-ready finish." },
  { name: "Gucci", description: "Italian house glamour, decadent finishes." },
  { name: "Huda Beauty", description: "Glam, pigment-rich palettes & lashes." },
  { name: "Haus Labs", description: "Skincare-powered colour by Lady Gaga." },
  { name: "La Mer", description: "Ultra-luxe complexion & treatment." },
  { name: "L’Oréal", description: "Because you’re worth it — Parisian classics." },
  { name: "MAC", description: "Pro-loved colour & artistry." },
  { name: "Makeup by Mario", description: "Pro-grade essentials by Mario Dedivanovic." },
  { name: "Made by Mitchell", description: "Viral, blendable colour by Mitchell Halliday." },
  { name: "Maybelline", description: "Drugstore icons — Sky High, Fit Me." },
  { name: "Milk Makeup", description: "Clean, vegan, multi-use sticks." },
  { name: "NARS", description: "Sensual, French-American colour." },
  { name: "NYX", description: "Pro-quality, Insta-ready everyday." },
  { name: "One Size", description: "Expert formulas by Patrick Starrr." },
  { name: "Patrick Ta", description: "Celebrity glam, sculpted finishes." },
  { name: "P.Louise", description: "Bold, viral UK colour." },
  { name: "Rare Beauty", description: "Soft Pinch, Selena Gomez’s gentle glow." },
  { name: "Tarte", description: "Shape Tape & cheeky tints." },
  { name: "Tom Ford", description: "Sleek, decadent luxury beauty." },
  { name: "Urban Decay", description: "Naked palettes & All Nighter." },
  { name: "YSL Beauty", description: "Parisian rebel chic." }
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
