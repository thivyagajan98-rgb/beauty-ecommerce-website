interface Props {
  eyebrow: string;
  title: string;
  updated?: string;
  children: React.ReactNode;
}

export default function LegalPage({ eyebrow, title, updated, children }: Props) {
  return (
    <article className="container-x py-12 sm:py-16">
      <div className="mx-auto max-w-prose">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="font-display mt-2 text-3xl sm:text-4xl">{title}</h1>
        {updated && <p className="mt-2 text-xs text-ink/50">Last updated: {updated}</p>}
        <div className="prose-facez mt-8 space-y-4 text-sm leading-relaxed text-ink/80 [&_h2]:font-display [&_h2]:text-xl [&_h2]:text-ink [&_h2]:mt-8 [&_h2]:mb-2 [&_h3]:font-medium [&_h3]:text-ink [&_h3]:mt-4 [&_ul]:list-disc [&_ul]:pl-5 [&_li]:my-1 [&_a]:text-blush-700 [&_a]:underline-offset-2 hover:[&_a]:underline">
          {children}
        </div>
      </div>
    </article>
  );
}
