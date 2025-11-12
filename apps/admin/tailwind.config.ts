import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    // Include UI package
    "../../packages/ui/src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // Custom semantic colors using CSS variables
        heading: 'var(--heading-text)',
        text: 'var(--text)',
        secondary: 'var(--secondary-text)',
        disabled: 'var(--disabled-text)',
        
        border: 'var(--default-border)',
        separator: 'var(--separator)',
        
        layout: 'var(--layout-bg)',
        background: 'var(--background)',
        card: 'var(--card-bg)',
        hover: 'var(--hover-bg)',
        active: 'var(--active-bg)',
        
        accent: {
          DEFAULT: 'var(--accent-primary)',
          hover: 'var(--accent-hover)',
        },
      },
      backgroundColor: {
        layout: 'var(--layout-bg)',
        card: 'var(--card-bg)',
      },
      textColor: {
        heading: 'var(--heading-text)',
        body: 'var(--text)',
      },
      borderColor: {
        DEFAULT: 'var(--default-border)',
        separator: 'var(--separator)',
      },
    },
  },
  plugins: [],
};

export default config;

