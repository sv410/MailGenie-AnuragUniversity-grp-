import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8B5CF6', // Purple for CTAs and highlights
          hover: '#7C3AED',
        },
        secondary: {
          DEFAULT: '#A78BFA', // Lighter purple for accents
        },
        gradientFrom: '#F3E8FF', // Purple gradient start
        gradientTo: '#EDE9FE',   // Purple gradient end
        text: {
          DEFAULT: '#1A2B3C', // Keep dark navy for text for contrast
        },
        neutral: {
          white: '#FFFFFF',
          light: '#F6F2FF',
          shadow: '#E9D5FF',
        },
        accent: {
          yellow: '#FFC542',
        },
      },
      borderRadius: {
        pill: '9999px',
        lg: '1rem',
      },
      boxShadow: {
        card: '0 4px 24px 0 #E6EAEA',
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          'sans-serif',
        ],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in-up": "fade-in-up 0.6s ease-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
