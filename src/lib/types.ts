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

export interface Brand {
  id: string;
  slug: string;
  name: string;
  description: string;
  logoText: string; // we render brand-as-text logos for a clean wordmark grid
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  brandSlug: string;
  category: Category;
  subcategory: Subcategory;
  price: number; // LKR
  originalPrice?: number; // for offers
  condition: Condition;
  description: string;
  images: string[];
  stock: number;
  authenticityNote?: string;
  tags?: ("viral" | "new" | "offer" | "exclusive" | "gift-set")[];
  rating?: number;
  reviews?: number;
}

export interface CartItem {
  productId: string;
  qty: number;
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
