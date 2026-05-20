import LegalPage from "@/components/LegalPage";

export const metadata = { title: "Return Policy" };

export default function Page() {
  return (
    <LegalPage eyebrow="Help" title="Return Policy" updated="May 2026">
      <p>
        We want you to love what you ordered. If something isn’t right, here’s how it works:
      </p>

      <h2>Eligibility</h2>
      <ul>
        <li>Returns accepted within 7 days of delivery for defective or mis-shipped items.</li>
        <li>For hygiene reasons, opened lipsticks, mascaras, lip glosses & cream products
          are non-returnable unless defective.</li>
        <li>Sale & gently-used items are final sale unless we made an error.</li>
      </ul>

      <h2>How to start a return</h2>
      <ul>
        <li>Message us on WhatsApp with your order ID and photos.</li>
        <li>Our team confirms eligibility within 24 hours.</li>
        <li>We arrange pickup or share a return address.</li>
        <li>Refunds are issued within 3–5 business days of receipt.</li>
      </ul>

      <h2>Damaged in transit?</h2>
      <p>Please send unboxing photos within 24 hours of delivery — we’ll replace it on us.</p>
    </LegalPage>
  );
}
