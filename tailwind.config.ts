import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        dark: {
          bg: "#0a0a0a",
          card: "#1a1a1a",
          hover: "#2a2a2a",
        },
        brand: {
          primary: "#6366f1",
          secondary: "#8b5cf6",
          accent: "#a78bfa",
        },
      },
    },
  },
  plugins: [],
};

export default config;
