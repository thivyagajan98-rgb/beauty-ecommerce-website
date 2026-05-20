import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-x section">
      <div className="mx-auto max-w-md rounded-3xl border border-ink/5 bg-white p-10 text-center">
        <p className="eyebrow">404</p>
        <p className="font-display mt-2 text-3xl">We can’t find that page</p>
        <p className="mt-2 text-sm text-ink/60">
          The link may be broken or the product may be sold out.
        </p>
        <Link href="/" className="btn-primary mt-5 inline-flex">Back home</Link>
      </div>
    </section>
  );
}
