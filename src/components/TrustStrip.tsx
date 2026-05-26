const ITEMS = [
  { title: "100% Authentic", body: "Every product, every time" },
  { title: "Free Delivery", body: "On orders over LKR 25,000" },
  { title: "Island-wide", body: "2–4 business days" },
  { title: "Secure Payments", body: "PayHere & bank transfer" }
];

export default function TrustStrip() {
  return (
    <section aria-label="Trust" className="border-y border-blush-100 bg-blush-50">
      <div className="container-x grid grid-cols-2 gap-6 py-8 sm:grid-cols-4">
        {ITEMS.map((it) => (
          <div key={it.title} className="text-center">
            <p className="text-sm font-semibold tracking-tight text-ink">{it.title}</p>
            <p className="mt-1 text-xs text-ink/60">{it.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
