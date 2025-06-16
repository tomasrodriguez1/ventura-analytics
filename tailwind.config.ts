import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          300: '#a855f7',
          400: '#9333ea',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          900: '#4c1d95',
        },
        secondary: {
          300: '#06b6d4',
          400: '#0891b2',
          500: '#0e7490',
          600: '#0369a1',
          700: '#075985',
          900: '#0c4a6e',
        },
        accent: {
          300: '#f59e0b',
          400: '#d97706',
          500: '#b45309',
          600: '#92400e',
          700: '#78350f',
          900: '#451a03',
        },
        success: {
          600: '#059669',
        },
        danger: {
          600: '#dc2626',
        },
        warning: {
          600: '#d97706',
        },
        neutral: {
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
