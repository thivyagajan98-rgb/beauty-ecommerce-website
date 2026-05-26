import * as React from "react";

type Variant = "dark" | "light";

interface LogoProps {
  /**
   * Tailwind classes for sizing/spacing. Use a `text-*` class to scale the
   * whole mark — every internal dimension is in `em` units.
   * e.g. <Logo className="text-3xl" />
   */
  className?: string;
  /** Show the small "COSMETICS" sub-line. Default true. */
  withSub?: boolean;
  /** Colour theme — `dark` (default) for light backgrounds, `light` for dark. */
  variant?: Variant;
}

function cls(...arr: Array<string | false | null | undefined>) {
  return arr.filter(Boolean).join(" ");
}

/**
 * FACEZ COSMETICS wordmark.
 *
 * Implemented in HTML + CSS rather than a raster image so it stays crisp at
 * any size, scales with `font-size`, and inherits the site font (Inter).
 * The "C" sits inside a solid magenta dot — the dot is layered behind a white
 * "C" glyph using absolute positioning.
 */
export default function Logo({
  className,
  withSub = true,
  variant = "dark"
}: LogoProps) {
  const isLight = variant === "light";

  return (
    <span
      aria-label="Facez Cosmetics"
      className={cls(
        "inline-flex select-none flex-col leading-none",
        className
      )}
    >
      {/* Wordmark row */}
      <span
        aria-hidden
        className={cls(
          "flex items-center font-black tracking-[-0.05em]",
          isLight ? "text-white" : "text-ink"
        )}
      >
        <span>FA</span>
        <span className="relative inline-block">
          {/* magenta dot */}
          <span
            aria-hidden
            className="absolute left-1/2 top-1/2 h-[1.05em] w-[1.05em] -translate-x-1/2 -translate-y-[55%] rounded-full bg-magenta"
          />
          {/* white C on top of the dot */}
          <span className="relative text-white">C</span>
        </span>
        <span>EZ</span>
      </span>

      {/* Sub-line */}
      {withSub && (
        <span
          aria-hidden
          className={cls(
            "mt-[0.05em] self-end pr-[0.05em] text-[0.22em] font-medium tracking-[0.45em]",
            isLight ? "text-white/60" : "text-ink/50"
          )}
        >
          COSMETICS
        </span>
      )}
    </span>
  );
}
