import Image from "next/image";

/**
 * Site logo.
 *
 * To use a custom logo image:
 *   1. Drop your file into /public — e.g. /public/logo.png or /public/logo.svg
 *   2. Set NEXT_PUBLIC_LOGO_SRC in your .env.local to the public path:
 *        NEXT_PUBLIC_LOGO_SRC=/logo.png
 *   3. (Optional) override colour or size with the props below.
 *
 * If NEXT_PUBLIC_LOGO_SRC is not set, the wordmark "Facez" is rendered
 * in Playfair Display — the original text logo.
 */
interface LogoProps {
  /** Class for the wrapping element. */
  className?: string;
  /** Visual size variant. */
  size?: "sm" | "md" | "lg";
  /** Force text logo even if NEXT_PUBLIC_LOGO_SRC is set. */
  textOnly?: boolean;
  /** Override the brand name shown in the text logo. */
  text?: string;
}

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
  textOnly,
  text = "Facez"
}: LogoProps) {
  const src = process.env.NEXT_PUBLIC_LOGO_SRC;
  const height = HEIGHTS[size];

  if (src && !textOnly) {
    // Width 4x height is a sensible default for wordmark logos; the image
    // honours its intrinsic aspect ratio thanks to object-contain.
    return (
      <span className={`inline-flex items-center ${className}`}>
        <Image
          src={src}
          alt={text}
          height={height}
          width={height * 4}
          priority
          className="h-auto w-auto object-contain"
          style={{ maxHeight: height }}
        />
      </span>
    );
  }

  return (
    <span className={`font-display tracking-tight ${TEXT_SIZE[size]} ${className}`}>
      {text}
    </span>
  );
}
