import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0B1F3A",
          royal: "#132F55",
          mist: "#E9EEF5",
        },
        slate: {
          DEFAULT: "#526176",
          deep: "#26364A",
        },
        soft: "#F7F9FC",
        line: "#DCE3EC",
        accent: "#285A91",
      },
      fontFamily: {
        display: ["Cormorant Garamond", "Georgia", "serif"],
        sans: ["Manrope", "Arial", "sans-serif"],
      },
      maxWidth: {
        site: "1280px",
      },
      transitionTimingFunction: {
        soft: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
