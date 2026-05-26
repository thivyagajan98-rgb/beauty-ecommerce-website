import Image from "next/image";

/**
 * Site logo.
 *
 * Defaults to the placeholder wordmarks shipped at /public/logo.svg
 * and /public/logo-dark.svg (for dark backgrounds).
 *
 * To use your own logo:
 *   1. Drop your file into /public — e.g. /public/logo.png or /public/logo.svg
 *      (Optional: /public/logo-dark.svg or .png for the dark variant.)
 *   2. EITHER replace the default files in place,
 *      OR set NEXT_PUBLIC_LOGO_SRC (and NEXT_PUBLIC_LOGO_SRC_DARK) in .env.local
 *      to point to your custom paths.
 */
type LogoVariant = "light" | "dark";
// "light"  = for light backgrounds (renders dark text)
// "dark"   = for dark backgrounds  (renders light text)

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: LogoVariant;
  /** Force the text wordmark even if a logo image is configured. */
  textOnly?: boolean;
  /** Override the brand name shown in the text fallback. */
  text?: string;
}

const DEFAULT_SRC: Record<LogoVariant, string> = {
  light: "/logo.svg",
  dark: "/logo-dark.svg"
};

const HEIGHTS: Record<NonNullable<LogoProps["size"]>, number> = {
  sm: 24,
  md: 32,
  lg: 44
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
  text = "FACEZ"
}: LogoProps) {
  const customSrc =
    variant === "dark"
      ? process.env.NEXT_PUBLIC_LOGO_SRC_DARK
      : process.env.NEXT_PUBLIC_LOGO_SRC;
  const src = customSrc || DEFAULT_SRC[variant];
  const height = HEIGHTS[size];

  if (!textOnly) {
    return (
      <span className={`inline-flex items-center ${className}`}>
        <Image
          src={src}
          alt={text}
          height={height}
          width={height * 4}
          priority
          unoptimized // SVGs render best as-is
          className="h-auto w-auto object-contain"
          style={{ maxHeight: height }}
        />
      </span>
    );
  }

  const textColor = variant === "dark" ? "text-cream" : "text-ink";

  return (
    <span className={`font-display tracking-tight ${TEXT_SIZE[size]} ${textColor} ${className}`}>
      {text}
    </span>
  );
}
