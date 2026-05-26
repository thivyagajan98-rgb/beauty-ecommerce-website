import LegalPage from "@/components/LegalPage";
import Link from "next/link";

export const metadata = { title: "Terms & Conditions" };

export default function Page() {
  return (
    <LegalPage eyebrow="Legal" title="Terms & Conditions">
      <h2>Use of Website</h2>
      <ul>
        <li>You must be 18+ to use this website.</li>
        <li>You are responsible for your account details.</li>
        <li>You must provide correct information.</li>
        <li>No illegal use is permitted.</li>
      </ul>

      <h2>Product & Pricing</h2>
      <ul>
        <li>Product information may not always be 100% accurate.</li>
        <li>Prices can change at any time.</li>
        <li>Offers are limited and may end without notice.</li>
      </ul>

      <h2>Orders & Payments</h2>
      <ul>
        <li>Placing an order is an agreement to buy.</li>
        <li>FACEZ.lk may cancel orders due to errors, fraud, or stock issues.</li>
        <li>Payment must be valid.</li>
        <li>Payment is handled via secure third-party providers.</li>
      </ul>

      <h2>Shipping</h2>
      <ul>
        <li>Delivery time is not guaranteed.</li>
        <li>Delays can happen.</li>
      </ul>

      <h2>Returns</h2>
      <p>
        Returns are only allowed based on our{" "}
        <Link href="/pages/returns">Returns Policy</Link>.
      </p>

      <h2>Intellectual Property</h2>
      <p>All content on this website belongs to FACEZ.lk.</p>

      <h2>Liability</h2>
      <p>FACEZ.lk is not responsible for:</p>
      <ul>
        <li>Personal skin reactions to any product.</li>
        <li>Indirect damages of any kind.</li>
      </ul>
    </LegalPage>
  );
}
