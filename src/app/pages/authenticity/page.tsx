import LegalPage from "@/components/LegalPage";

export const metadata = { title: "Authenticity Guarantee" };

export default function Page() {
  return (
    <LegalPage eyebrow="Our promise" title="Authenticity Guarantee" updated="May 2026">
      <p>
        Every piece sold on Facez.lk is 100% authentic. We source only from authorised
        retailers, official brand websites, and vetted resellers with verifiable provenance.
      </p>

      <h2>Our verification process</h2>
      <ul>
        <li>Batch codes are checked against brand databases on intake.</li>
        <li>Packaging, weight, scent, texture & print quality are inspected.</li>
        <li>Receipts, original boxes & sleeves are kept on file when available.</li>
        <li>Gently used items are sanitised, sealed & photographed before listing.</li>
      </ul>

      <h2>If something feels off</h2>
      <p>
        Reach out within 7 days of delivery. If our team can’t verify authenticity,
        we’ll refund you in full and cover return shipping. No questions asked.
      </p>
    </LegalPage>
  );
}
