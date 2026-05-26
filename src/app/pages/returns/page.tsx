import LegalPage from "@/components/LegalPage";

export const metadata = { title: "Returns Policy" };

export default function Page() {
  const wa = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "94760181199";
  return (
    <LegalPage eyebrow="Help" title="Returns Policy">
      <p>
        Due to hygiene and safety reasons, FACEZ.lk does not accept any returns or exchanges
        on cosmetics and grooming products once sold.
      </p>

      <h2>Not accepted if</h2>
      <ul>
        <li>Product opened</li>
        <li>Packaging removed</li>
        <li>Product used</li>
      </ul>

      <h2>Only accepted if (our side mistake)</h2>
      <ul>
        <li>Wrong item sent</li>
        <li>Damaged item received</li>
        <li>Faulty product</li>
      </ul>

      <h2>Conditions</h2>
      <ul>
        <li>Must inform within 48 hours after receiving the product.</li>
        <li>Must provide proof (photo or video).</li>
      </ul>

      <h2>Resolution</h2>
      <ul>
        <li>Replacement, or</li>
        <li>Refund (if replacement is not available).</li>
      </ul>

      <h2>Contact</h2>
      <p>
        WhatsApp:{" "}
        <a href={`https://wa.me/${wa}`} target="_blank" rel="noopener noreferrer">
          +94 760 181199
        </a>
        <br />
        Email: <a href="mailto:facezcosmeticslk@gmail.com">facezcosmeticslk@gmail.com</a>
      </p>
    </LegalPage>
  );
}
