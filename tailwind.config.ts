import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        gold: {
          50: '#FDFBEB',
          100: '#FBF5CC',
          200: '#F7EA99',
          300: '#F2D966',
          400: '#EDC633',
          500: '#D4AF37', // Base Gold
          600: '#B8860B',
          700: '#996515',
          800: '#7A4D0F',
          900: '#5C380A',
        }
      },
    },
  },
  plugins: [],
};
export default config;
