import type { Config } from "tailwindcss";
const flowbite = require("flowbite-react/tailwind");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        'customShadow': '0px 0px 3px 0px rgba(14, 14, 14, 0.25)',
      },
      
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
    flowbite.plugin(),
  ],
};
export default config;
