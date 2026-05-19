import Link from "next/link";

interface Props {
  eyebrow: string;
  title: string;
  description: string;
  cta?: { href: string; label: string };
  tone?: "blush" | "ink" | "beige";
}

export default function CollectionHero({ eyebrow, title, description, cta, tone = "blush" }: Props) {
  const bg =
    tone === "ink"
      ? "bg-ink text-cream"
      : tone === "beige"
        ? "bg-beige"
        : "bg-blush-100";
  return (
    <section className={`${bg} border-b border-ink/5`}>
      <div className="container-x py-12 sm:py-16">
        <p className={`eyebrow ${tone === "ink" ? "text-blush-300" : ""}`}>{eyebrow}</p>
        <h1 className={`font-display mt-2 text-4xl sm:text-5xl ${tone === "ink" ? "text-cream" : ""}`}>
          {title}
        </h1>
        <p className={`mt-3 max-w-prose text-sm ${tone === "ink" ? "text-cream/70" : "text-ink/70"}`}>
          {description}
        </p>
        {cta && (
          <Link
            href={cta.href}
            className={`mt-5 inline-flex ${tone === "ink" ? "btn bg-cream text-ink hover:bg-white" : "btn-primary"}`}
          >
            {cta.label}
          </Link>
        )}
      </div>
    </section>
  );
}
