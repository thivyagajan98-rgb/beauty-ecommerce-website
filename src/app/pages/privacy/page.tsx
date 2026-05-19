import LegalPage from "@/components/LegalPage";

export const metadata = { title: "Privacy Policy" };

export default function Page() {
  return (
    <LegalPage eyebrow="Legal" title="Privacy Policy" updated="May 2026">
      <p>
        We respect your privacy. This policy explains what we collect, how we use it,
        and your rights.
      </p>

      <h2>What we collect</h2>
      <ul>
        <li>Order details: name, phone, address, email (optional), and order history.</li>
        <li>Payment metadata only — full card numbers are never stored on our servers.</li>
        <li>Site analytics (page views, device type) to improve the experience.</li>
      </ul>

      <h2>How we use it</h2>
      <ul>
        <li>Fulfil your orders and communicate dispatch updates.</li>
        <li>Provide support and process returns.</li>
        <li>Send marketing only if you opt in. Unsubscribe anytime.</li>
      </ul>

      <h2>Sharing</h2>
      <p>
        We share data with delivery partners and payment processors strictly to fulfil orders.
        We never sell your data.
      </p>

      <h2>Your rights</h2>
      <p>
        You can request a copy or deletion of your data at any time by contacting us.
      </p>
    </LegalPage>
  );
}
