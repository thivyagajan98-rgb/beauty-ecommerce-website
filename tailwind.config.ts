import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,js,jsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: "#111111",
        cream: "#FAF7F2",
        beige: "#F1EAE0",
        sand: "#E8DCC9",
        blush: {
          50: "#FDF4F4",
          100: "#FAE7E7",
          200: "#F4CFCF",
          300: "#ECB1B1",
          400: "#E08F8F",
          500: "#D17070",
          600: "#B45757",
          700: "#8E4444"
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"]
      },
      boxShadow: {
        soft: "0 1px 2px rgba(0,0,0,0.04), 0 8px 24px rgba(17,17,17,0.06)",
        lift: "0 10px 30px rgba(17,17,17,0.08)"
      },
      borderRadius: {
        xl2: "1.25rem"
      },
      maxWidth: {
        prose: "70ch"
      }
    }
  },
  plugins: []
};

export default config;
