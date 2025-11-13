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

        // Button specific colors
        btn: {
          primary: {
            DEFAULT: 'var(--btn-primary-bg)',
            hover: 'var(--btn-primary-hover)',
            active: 'var(--btn-primary-active)',
            text: 'var(--btn-primary-text)',
          },
          secondary: {
            DEFAULT: 'var(--btn-secondary-bg)',
            hover: 'var(--btn-secondary-hover)',
            active: 'var(--btn-secondary-active)',
            text: 'var(--btn-secondary-text)',
          },
          outline: {
            border: 'var(--btn-outline-border)',
            hover: 'var(--btn-outline-hover-bg)',
            active: 'var(--btn-outline-active-bg)',
            text: 'var(--btn-outline-text)',
          },
          text: {
            DEFAULT: 'var(--btn-text-color)',
            hover: 'var(--btn-text-hover-bg)',
            active: 'var(--btn-text-active-bg)',
          },
          danger: {
            DEFAULT: 'var(--btn-danger-bg)',
            hover: 'var(--btn-danger-hover)',
            active: 'var(--btn-danger-active)',
            text: 'var(--btn-danger-text)',
          },
          disabled: {
            bg: 'var(--btn-disabled-bg)',
            text: 'var(--btn-disabled-text)',
            border: 'var(--btn-disabled-border)',
          },
        },

        focus: {
          ring: 'var(--focus-ring)',
          offset: 'var(--focus-ring-offset)',
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
      ringColor: {
        DEFAULT: 'var(--focus-ring)',
      },
      ringOffsetColor: {
        DEFAULT: 'var(--focus-ring-offset)',
      },
    },
  },
  plugins: [],
};

export default config;

