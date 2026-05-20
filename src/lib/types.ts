export type Category = "face" | "cheek" | "eyes" | "lips";

export type Subcategory =
  // Face
  | "foundation"
  | "primer"
  | "concealer"
  | "powder"
  | "setting-spray"
  | "face-palettes"
  | "brushes"
  // Cheek
  | "contour"
  | "bronzer"
  | "blush"
  | "liquid-blush"
  | "highlighter"
  | "cheek-kits"
  // Eyes
  | "eyeshadow"
  | "mascara"
  | "eyeliner"
  | "eyebrow"
  | "eyelashes"
  | "eye-kits"
  // Lips
  | "lipstick"
  | "lip-gloss"
  | "lip-liner"
  | "lip-balm"
  | "plumping-lip-gloss"
  | "lip-oil"
  | "lip-kits";

export type Condition = "new" | "gently-used";

export type ProductTag = "viral" | "new" | "offer" | "exclusive" | "gift-set";

export interface Brand {
  id: string;
  slug: string;
  name: string;
  description: string;
  logoText: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brandSlug: string;
  /** Brand display name. Always populated by catalog fetchers; optional on raw mock items. */
  brandName?: string;
  category: Category;
  subcategory: Subcategory;
  price: number; // LKR
  originalPrice?: number;
  condition: Condition;
  description: string;
  images: string[];
  stock: number;
  authenticityNote?: string;
  tags?: ProductTag[];
  rating?: number;
  reviews?: number;
}

/**
 * Snapshot of a product captured at the moment it's added to the cart.
 * Lets the cart render and the order persist even if the catalog later
 * changes the product or removes it.
 */
export interface ProductSnapshot {
  slug: string;
  name: string;
  brandSlug: string;
  brandName: string;
  price: number;
  image: string;
  condition: Condition;
  stock: number;
}

export interface CartItem {
  productId: string;
  qty: number;
  snapshot: ProductSnapshot;
}

export type PaymentMethod = "payhere" | "bank-transfer";

export interface OrderItem {
  productId: string;
  name: string;
  brand: string;
  qty: number;
  price: number;
  image?: string;
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  email?: string;
  address: string;
  city: string;
  notes?: string;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  paymentMethod: PaymentMethod;
  status: "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
  createdAt: string;
}
