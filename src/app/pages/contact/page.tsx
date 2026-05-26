import LegalPage from "@/components/LegalPage";

export const metadata = { title: "Contact" };

export default function Page() {
  const wa = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "94760181199";
  return (
    <LegalPage eyebrow="Get in touch" title="Contact us">
      <h2>WhatsApp</h2>
      <p>
        <a href={`https://wa.me/${wa}`} target="_blank" rel="noopener noreferrer">
          +94 760 181199
        </a>
      </p>

      <h2>Email</h2>
      <p>
        <a href="mailto:facezcosmeticslk@gmail.com">facezcosmeticslk@gmail.com</a>
      </p>

      <h2>Business Hours</h2>
      <p>
        9:00 AM – 5:00 PM
        <br />
        Monday – Friday
      </p>

      <h2>Social</h2>
      <ul>
        <li>
          Instagram —{" "}
          <a href="https://instagram.com/facez.lk" target="_blank" rel="noopener noreferrer">
            @facez.lk
          </a>
        </li>
        <li>
          Facebook —{" "}
          <a href="https://facebook.com/facez.lk" target="_blank" rel="noopener noreferrer">
            facebook.com/facez.lk
          </a>
        </li>
        <li>
          TikTok —{" "}
          <a href="https://tiktok.com/@facez.lk" target="_blank" rel="noopener noreferrer">
            @facez.lk
          </a>
        </li>
      </ul>
    </LegalPage>
  );
}
