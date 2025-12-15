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
        z: {
          primary: '#0B2A3C',
          value: '#2FBF71',
          neutral: '#6F7A83',
          white: '#FFFFFF',
          accent: '#3FA9F5',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
