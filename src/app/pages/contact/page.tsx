import LegalPage from "@/components/LegalPage";
import Link from "next/link";

export const metadata = { title: "Contact" };

export default function Page() {
  const wa = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "94770000000";
  return (
    <LegalPage eyebrow="Get in touch" title="Contact us">
      <p>
        We’re a small team — drop us a line and we’ll respond within a few hours during
        business hours (9am–7pm, Mon–Sat, Colombo time).
      </p>

      <h2>WhatsApp</h2>
      <p>
        <a href={`https://wa.me/${wa}`} target="_blank" rel="noopener noreferrer">
          +{wa}
        </a>{" "}
        — fastest way to reach us.
      </p>

      <h2>Instagram</h2>
      <p>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          @facez.lk
        </a>{" "}
        — DMs are open.
      </p>

      <h2>Email</h2>
      <p>
        <a href="mailto:hello@facez.lk">hello@facez.lk</a>
      </p>

      <h2>Returns & support</h2>
      <p>
        See our <Link href="/pages/returns">return policy</Link> for help with orders.
      </p>
    </LegalPage>
  );
}
