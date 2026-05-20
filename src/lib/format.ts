export function formatLKR(amount: number) {
  // Sri Lankan Rupee, no decimals for retail clarity
  try {
    return new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
      maximumFractionDigits: 0
    }).format(amount);
  } catch {
    return `LKR ${Math.round(amount).toLocaleString()}`;
  }
}

export function discountPct(price: number, original?: number) {
  if (!original || original <= price) return 0;
  return Math.round(((original - price) / original) * 100);
}
