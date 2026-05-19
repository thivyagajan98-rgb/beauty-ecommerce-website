const ITEMS = [
  { title: "100% Authentic", body: "Verified sourcing & batch codes" },
  { title: "Island-wide Delivery", body: "2–4 business days" },
  { title: "Secure Payments", body: "PayHere & bank transfer" },
  { title: "Easy Returns", body: "7-day defect-free guarantee" }
];

export default function TrustStrip() {
  return (
    <section aria-label="Trust" className="border-y border-ink/5 bg-white">
      <div className="container-x grid grid-cols-2 gap-6 py-8 sm:grid-cols-4">
        {ITEMS.map((it) => (
          <div key={it.title} className="text-center">
            <p className="text-sm font-semibold tracking-tight">{it.title}</p>
            <p className="mt-1 text-xs text-ink/60">{it.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
