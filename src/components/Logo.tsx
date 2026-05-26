import Image from "next/image";

/**
 * Site logo.
 *
 * Defaults to the FACEZ Cosmetics logo at /public/logo.png.
 *
 * To use a different logo:
 *   1. Replace /public/logo.png with your own file (any extension), OR
 *   2. Set NEXT_PUBLIC_LOGO_SRC in .env.local to a different path.
 *
 * For a dark-background variant, drop /public/logo-dark.png and set
 * NEXT_PUBLIC_LOGO_SRC_DARK if you want a different file.
 */
type LogoVariant = "light" | "dark";
// "light" = for light backgrounds, "dark" = for dark backgrounds.

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: LogoVariant;
  /** Force the text wordmark even if a logo image is configured. */
  textOnly?: boolean;
  /** Override the brand name shown in the text fallback. */
  text?: string;
}

// Default to the PNG (the wrapper SVGs at /logo.svg also embed this file
// so either path works; PNG is the source of truth).
const DEFAULT_SRC: Record<LogoVariant, string> = {
  light: "/logo.png",
  dark: "/logo.png"
};

// Logo image is 833×298 px (≈ 2.8 : 1 aspect ratio).
const ASPECT = 833 / 298;

const HEIGHTS: Record<NonNullable<LogoProps["size"]>, number> = {
  sm: 28,
  md: 40,
  lg: 56
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
  const width = Math.round(height * ASPECT);

  if (!textOnly) {
    return (
      <span className={`inline-flex items-center ${className}`}>
        <Image
          src={src}
          alt={text}
          height={height}
          width={width}
          priority
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
