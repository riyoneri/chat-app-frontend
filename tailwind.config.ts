import daisyUI from "daisyui";
import tailwindScrollbar from "tailwind-scrollbar";
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
      screens: {
        xs: "400px",
        "3xl": "1920px",
      },
    },
  },
  plugins: [daisyUI, tailwindScrollbar],
  daisyui: {
    themes: false,
    base: false,
    prefix: "dui-",
    logs: false,
  },
};
export default config;
