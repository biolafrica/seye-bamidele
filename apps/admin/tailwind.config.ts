import type { Config } from "tailwindcss";
import sharedConfig from "@seye-bamidele/ui/tailwind.config";

const config: Config = {
  presets: [sharedConfig],
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
     
    }
  }
};

export default config;