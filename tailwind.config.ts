import type { Config } from "tailwindcss"
import defaultTheme from "tailwindcss/defaultTheme"
import typography from "@tailwindcss/typography"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: [
        "Inter",
        "Roboto",
        "Open Sans",
        ...defaultTheme.fontFamily.sans,
      ],
    },
    fontSize: {
      base: ["16px", { lineHeight: "1.75" }],
      lg: ["18px", { lineHeight: "1.75" }],
      xl: ["20px", { lineHeight: "1.2" }],
      "2xl": ["24px", { lineHeight: "1.2" }],
      "3xl": ["30px", { lineHeight: "1.1" }],
      "4xl": ["36px", { lineHeight: "1.1" }],
      "5xl": ["48px", { lineHeight: "1.1" }],
      "6xl": ["60px", { lineHeight: "1.1" }],
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#f5f6fa", // Overall page background
          foreground: "hsl(var(--primary-foreground))",
        },
        navy: "#0A2E4D",
        lightGray: "#F5F7FA",
        accent: "#F4B400",
        white: "#FFFFFF",
        lightCyan: "#dff9fb", // Kept for existing components, review if needed
        veryLightGray: "#f9f9f9", // Can be an alternative for contrast
        softBeige: "#f4f3ef",   // Can be an alternative for contrast
        contrastLightGray: "#f0f2f5", // For contrast sections
        heroBeigeFrom: '#fbfaf7',
        heroBeigeVia: '#f7f5f0',
        heroBeigeTo: '#f3f1ea',
        heroHeadline: '#1B4D3E',
        heroAccent: '#A4C639',
        heroButtonPrimary: '#1B4D3E',
        heroButtonPrimaryHover: '#164037',
        heroButtonSecondaryText: '#1B4D3E',
        heroButtonSecondaryBorder: '#1B4D3E',
        heroButtonSecondaryHoverBg: '#f0f2f0',
        emerald: { // Adding emerald for CTAs
          50: '#ecfdf5',
          700: '#047857',
          800: '#065f46',
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        secondary: {
          DEFAULT: "#f3f4f6",
          foreground: "#1f2937",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.navy'),
            h1: {
              fontWeight: '700',
              fontSize: theme('fontSize.4xl'),
              '@screen md': {
                fontSize: theme('fontSize.6xl'),
              },
              color: theme('colors.white'),
            },
            h2: {
              fontWeight: '600',
              fontSize: theme('fontSize.3xl'),
              '@screen md': {
                fontSize: theme('fontSize.4xl'),
              },
              color: theme('colors.white'),
            },
            p: {
              fontSize: theme('fontSize.base'),
              '@screen md': {
                fontSize: theme('fontSize.lg'),
              },
              color: theme('colors.lightGray'),
              lineHeight: '1.75',
            },
          },
        },
      }),
    },
  },
  plugins: [typography, require("tailwindcss-animate")],
} satisfies Config

export default config
