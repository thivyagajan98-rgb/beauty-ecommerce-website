import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,js,jsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Body text. We keep `ink` for readability on white,
        // but the brand palette is strictly pink + white.
        ink: "#1A1A1A",
        // Legacy aliases still referenced in a handful of places —
        // mapped to the new palette so old class names keep working.
        cream: "#FFFFFF",
        beige: "#FDF4F4",
        sand: "#FAE7E7",
        blush: {
          50: "#FFF5F7",
          100: "#FFE4EA",
          200: "#FFC9D5",
          300: "#FFA7BC",
          400: "#FF85A1",
          500: "#F26B8A",
          600: "#D94E70",
          700: "#B33857",
          800: "#7F2640"
        }
      },
      fontFamily: {
        sans: ["var(--font-outfit)", "system-ui", "sans-serif"],
        display: ["var(--font-outfit)", "system-ui", "sans-serif"]
      },
      boxShadow: {
        soft: "0 1px 2px rgba(217,78,112,0.04), 0 8px 24px rgba(217,78,112,0.06)",
        lift: "0 10px 30px rgba(217,78,112,0.10)"
      },
      borderRadius: {
        xl2: "1.25rem"
      },
      maxWidth: {
        prose: "70ch"
      },
      keyframes: {
        "marquee-x": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" }
        }
      },
      animation: {
        "marquee-x": "marquee-x 40s linear infinite"
      }
    }
  },
  plugins: []
};

export default config;
