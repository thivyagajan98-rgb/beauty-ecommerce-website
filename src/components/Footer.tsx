import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-ink/10 bg-beige">
      <div className="container-x grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="font-display text-2xl">Facez</p>
          <p className="mt-2 max-w-xs text-sm text-ink/70">
            Curated, 100% authentic branded makeup — delivered island-wide in Sri Lanka.
          </p>
          <div className="mt-4 flex gap-3">
            <a aria-label="Instagram" href="https://instagram.com" className="rounded-full border border-ink/10 bg-white p-2 hover:shadow-soft">
              <Ig />
            </a>
            <a aria-label="TikTok" href="https://tiktok.com" className="rounded-full border border-ink/10 bg-white p-2 hover:shadow-soft">
              <Tk />
            </a>
            <a aria-label="WhatsApp" href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "94770000000"}`} className="rounded-full border border-ink/10 bg-white p-2 hover:shadow-soft">
              <Wa />
            </a>
          </div>
        </div>

        <div>
          <p className="eyebrow mb-3">Shop</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/shop?category=face">Face</Link></li>
            <li><Link href="/shop?category=cheek">Cheek</Link></li>
            <li><Link href="/shop?category=eyes">Eyes</Link></li>
            <li><Link href="/shop?category=lips">Lips</Link></li>
            <li><Link href="/brands">All Brands</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-3">Help</p>
          <ul className="space-y-2 text-sm">
            <li><Link href="/pages/authenticity">Authenticity Guarantee</Link></li>
            <li><Link href="/pages/returns">Return Policy</Link></li>
            <li><Link href="/pages/privacy">Privacy Policy</Link></li>
            <li><Link href="/pages/disclaimer">Brand Disclaimer</Link></li>
            <li><Link href="/pages/contact">Contact</Link></li>
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-3">Stay in the loop</p>
          <p className="text-sm text-ink/70">Get drops, restocks & VIP offers.</p>
          <form className="mt-3 flex gap-2">
            <input
              type="email"
              placeholder="you@email.com"
              className="input flex-1"
              aria-label="Email"
            />
            <button className="btn-primary" type="button">Join</button>
          </form>
          <p className="mt-3 text-xs text-ink/50">
            We respect your inbox. Unsubscribe anytime.
          </p>
        </div>
      </div>

      <div className="border-t border-ink/10">
        <div className="container-x flex flex-col items-start gap-2 py-5 text-xs text-ink/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Facez.lk · All rights reserved.</p>
          <p>
            We are not affiliated with any brand. All trademarks belong to their respective owners.
          </p>
        </div>
      </div>
    </footer>
  );
}

function Ig() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>
  );
}
function Tk() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 8.3a6 6 0 01-3.5-1.1v7.4a5.6 5.6 0 11-5.6-5.6c.3 0 .6 0 .9.1V12a3 3 0 102.1 2.9V3h2.5a3.6 3.6 0 003.6 3.6v1.7z"/></svg>
  );
}
function Wa() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M3 21l1.6-4.3A8 8 0 1120 12a8 8 0 01-12.3 6.7L3 21z"/><path d="M8.5 9.5c.3-.5.5-.7.9-.7s.7.1.9.6l.4 1c.1.3.1.5-.1.7l-.4.4c.6 1 1.4 1.6 2.3 2l.4-.4c.2-.2.4-.2.7-.1l1 .4c.5.2.6.5.6.9s-.2.6-.7.9c-1 .5-2.2.4-3.4-.4-1-.7-1.7-1.5-2.4-2.4-.8-1.2-.8-2.4-.4-3.4z"/></svg>
  );
}
