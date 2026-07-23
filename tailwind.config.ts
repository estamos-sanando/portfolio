import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "px-rose": "#F2A7BB",
        "px-rose-dark": "#D4748A",
        "px-violet": "#B39DDB",
        "px-violet-dark": "#7E57C2",
        "px-cream": "#FFF8EF",
        "px-beige": "#E8D5B7",
        "px-beige-dark": "#C9B08A",
        "px-green": "#A8C5A0",
        "px-green-dark": "#6E9E66",
        "px-dark": "#2D2D3A",
        "px-dark-mid": "#3D3D4E",
        "px-window-bg": "#F5EDD5",
        "px-window-border": "#8B7355",
        "px-taskbar": "#C8A882",
        "px-accent": "#E8A0B4",
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', "monospace"],
        "pixel-body": ['"VT323"', "monospace"],
        display: ['"Pixelify Sans"', "monospace"],
      },
      screens: {
        xs: "480px",
      },
    },
  },
  plugins: [],
};

export default config;
