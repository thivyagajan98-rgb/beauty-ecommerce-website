import Image from "next/image";

/**
 * Site logo.
 *
 * Defaults to /public/logo.png. Pass `withBackdrop` to wrap it in a small
 * dark rounded chip — useful when the logo has light/white text and the
 * page background is white (so the wordmark stays readable).
 */
type LogoVariant = "light" | "dark";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: LogoVariant;
  /** Force the text wordmark even if a logo image is configured. */
  textOnly?: boolean;
  /** Override the brand name shown in the text fallback. */
  text?: string;
  /**
   * Wrap the logo in a dark rounded chip. Use this whenever the image
   * has white text and the surrounding page is light.
   */
  withBackdrop?: boolean;
}

const DEFAULT_SRC: Record<LogoVariant, string> = {
  light: "/logo.png",
  dark: "/logo.png"
};

// Logo image is 833x298 px (~ 2.8 : 1).
const ASPECT = 833 / 298;

const HEIGHTS: Record<NonNullable<LogoProps["size"]>, number> = {
  sm: 24,
  md: 36,
  lg: 52
};

const TEXT_SIZE: Record<NonNullable<LogoProps["size"]>, string> = {
  sm: "text-xl",
  md: "text-2xl",
  lg: "text-3xl"
};

export default function Logo({
  className = "",
  size = "md",
  variant = "light",
  textOnly,
  text = "FACEZ",
  withBackdrop = false
}: LogoProps) {
  const customSrc =
    variant === "dark"
      ? process.env.NEXT_PUBLIC_LOGO_SRC_DARK
      : process.env.NEXT_PUBLIC_LOGO_SRC;
  const src = customSrc || DEFAULT_SRC[variant];
  const height = HEIGHTS[size];
  const width = Math.round(height * ASPECT);

  if (textOnly) {
    const textColor = variant === "dark" ? "text-cream" : "text-ink";
    return (
      <span
        className={`font-display tracking-tight ${TEXT_SIZE[size]} ${textColor} ${className}`}
      >
        {text}
      </span>
    );
  }

  const img = (
    <Image
      src={src}
      alt={text}
      height={height}
      width={width}
      priority
      className="h-auto w-auto object-contain"
      style={{ maxHeight: height }}
    />
  );

  if (withBackdrop) {
    // Dark rounded chip — good for white-on-transparent logos sitting on a
    // light page. The pink C accent in the logo pops against black.
    return (
      <span
        className={`inline-flex items-center rounded-full bg-ink px-4 py-2 shadow-soft ${className}`}
      >
        {img}
      </span>
    );
  }

  return <span className={`inline-flex items-center ${className}`}>{img}</span>;
}
