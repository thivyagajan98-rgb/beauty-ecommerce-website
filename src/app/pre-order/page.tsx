import Link from "next/link";

export const metadata = { title: "Pre Order" };

export default function PreOrderPage() {
  const wa = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "94760181199";
  const waHref = `https://wa.me/${wa}?text=${encodeURIComponent(
    "Hi FACEZ.lk! I'd like to place a pre order for:"
  )}`;

  return (
    <>
      {/* Hero */}
      <section className="border-b border-blush-100 bg-blush-50">
        <div className="container-x py-14 sm:py-20">
          <p className="eyebrow">Pre Order</p>
          <h1 className="font-display mt-3 text-4xl text-ink sm:text-5xl">
            Want something we don’t stock?
          </h1>
          <p className="mt-4 max-w-prose text-sm text-ink/70 sm:text-base">
            We can pre-order any authentic product from your favourite brands. The whole
            process is handled directly through our official WhatsApp.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <WhatsAppIcon /> Pre order via WhatsApp
            </a>
            <Link href="/brands" className="btn-outline">
              Browse brands
            </Link>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="container-x section">
        <div className="mx-auto grid max-w-4xl gap-4 sm:grid-cols-3">
          <Step
            n="1"
            title="Message us"
            body={
              <>
                WhatsApp us with the product you want.
                <br />
                <a
                  href={`https://wa.me/${wa}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-blush-700 hover:underline"
                >
                  +94 760 181199
                </a>
              </>
            }
          />
          <Step n="2" title="Pay 50% advance" body="50% advance payment is required to confirm the pre order." />
          <Step n="3" title="Wait 2–3 weeks" body="Delivery time is 2–3 weeks. We’ll notify you the moment it arrives." />
        </div>

        {/* Conditions card */}
        <div className="mx-auto mt-10 max-w-3xl rounded-3xl border border-blush-200 bg-white p-6 sm:p-8">
          <p className="font-display text-xl text-ink">How pre orders work</p>
          <ul className="mt-4 space-y-3 text-sm text-ink/80">
            <Bullet>To place a pre order, contact via WhatsApp: +94 760 181199</Bullet>
            <Bullet>50% payment must be done to confirm the order</Bullet>
            <Bullet>Delivery time: 2–3 weeks</Bullet>
            <Bullet>All pre orders are handled through our official WhatsApp</Bullet>
            <Bullet>All pre orders are 100% authentic, just like our in-stock catalog</Bullet>
          </ul>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <WhatsAppIcon /> Start a pre order
            </a>
            <a
              href="mailto:facezcosmeticslk@gmail.com"
              className="btn-outline"
            >
              Email us instead
            </a>
          </div>
        </div>

        <p className="mx-auto mt-6 max-w-3xl text-center text-xs text-ink/50">
          Returns on pre orders follow our standard{" "}
          <Link href="/pages/returns" className="underline">
            Returns Policy
          </Link>
          .
        </p>
      </section>
    </>
  );
}

function Step({ n, title, body }: { n: string; title: string; body: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-blush-100 bg-white p-5">
      <span className="grid h-8 w-8 place-items-center rounded-full bg-blush-100 text-sm font-semibold text-blush-700">
        {n}
      </span>
      <p className="mt-3 font-display text-lg">{title}</p>
      <p className="mt-1 text-sm text-ink/70">{body}</p>
    </div>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-blush-500" />
      <span>{children}</span>
    </li>
  );
}

function WhatsAppIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.5 3.5A11 11 0 003.6 17.7L2 22l4.4-1.5A11 11 0 1020.5 3.5zM12 20.2a8.2 8.2 0 01-4.2-1.2l-.3-.2-2.6.9.9-2.6-.2-.3A8.2 8.2 0 1112 20.2zm4.7-6.1c-.3-.1-1.5-.7-1.7-.8s-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 01-3.3-2.9c-.2-.4 0-.4.2-.6l.4-.5c.1-.1.1-.3 0-.4l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.4-.3.3-1 1-1 2.4s1 2.8 1.2 3 2 3.2 5 4.5c2.5 1.1 3 .9 3.6.8.5 0 1.7-.7 1.9-1.4.2-.7.2-1.3.1-1.4-.1-.1-.3-.2-.6-.3z" />
    </svg>
  );
}
