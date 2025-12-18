import { p, pre } from 'framer-motion/client';

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        primary2: "var(--color-primary-2)",
        textBlack: "var(--color-blacktxt)",
        backGround: "var(--color-bg)",
        bgComponent: "var(--color-bg-component)",
        neutral1: "var(--color-neutral1)",
        neutral2: "var(--color-neutral2)",
        neutral3: "var(--color-neutral3)",
        neutral4: "var(--color-neutral4)",
        neutral5: "var(--color-neutral5)",
        neutral6: "var(--color-neutral6)",
        neutral7: "var(--color-neutral7)",
        neutral8: "var(--color-neutral8)",
        neutral9: "var(--color-neutral9)",
        error: "var(--color-error)",
        premium: "var(--color-premium)",
      },
    },
  },
  plugins: [],
};
