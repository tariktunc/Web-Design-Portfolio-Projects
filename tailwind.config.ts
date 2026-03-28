import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    screens: {
      initial: "0px",
      xs: "520px",
      sm: "768px",
      md: "1024px",
      lg: "1280px",
      xl: "1640px",
    },

    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        xs: "1.25rem",
        sm: "1.5rem",
        md: "2rem",
        lg: "2.5rem",
      },
      screens: {
        xl: "1600px",
      },
    },

    extend: {
      colors: {
        navy: {
          DEFAULT: "rgb(var(--navy-rgb) / <alpha-value>)",
          light: "rgb(var(--navy-light-rgb) / <alpha-value>)",
          lighter: "rgb(var(--navy-lighter-rgb) / <alpha-value>)",
        },
        "slate-custom": {
          DEFAULT: "rgb(var(--slate-rgb) / <alpha-value>)",
          light: "rgb(var(--slate-light-rgb) / <alpha-value>)",
        },
        "lightest-slate": "rgb(var(--lightest-slate-rgb) / <alpha-value>)",
        "white-bright": "rgb(var(--white-rgb) / <alpha-value>)",
        green: {
          DEFAULT: "rgb(var(--green-rgb) / <alpha-value>)",
          tint: "var(--green-tint)",
        },
        accent2: {
          DEFAULT: "rgb(var(--accent-2-rgb) / <alpha-value>)",
          tint: "var(--accent-2-tint)",
        },
        "accent-cyan": "rgb(var(--accent-cyan-rgb) / <alpha-value>)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      aspectRatio: {
        "4/3": "4 / 3",
      },
    },
  },
  plugins: [],
};
export default config;
