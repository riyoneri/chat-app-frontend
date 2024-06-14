import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./components/**/*.{ts,tsx,mdx}", "./app/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        secondary: "rgb(3, 94, 104)",
        accent: "rgb(103, 136, 168)",
        tertiary: "rgb(89, 89, 89)",
      },
    },
  },
  plugins: [],
};
export default config;
