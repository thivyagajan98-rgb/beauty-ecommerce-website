import LegalPage from "@/components/LegalPage";

export const metadata = { title: "Brand Disclaimer" };

export default function Page() {
  return (
    <LegalPage eyebrow="Legal" title="Brand Disclaimer">
      <p>
        FACEZ.lk is an independent retailer based in Sri Lanka. We are not affiliated with,
        endorsed by, or sponsored by any of the brands featured on this website.
      </p>
      <p>
        All brand names, trademarks, logos and product imagery are the property of their
        respective owners and are used here solely for identification and editorial purposes.
      </p>
      <p>
        We curate, verify and resell genuine products. If you believe any content infringes
        a trademark or copyright, please contact us and we’ll address it promptly.
      </p>
    </LegalPage>
  );
}
