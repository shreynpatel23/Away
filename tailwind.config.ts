import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        'custom-gradient': 'linear-gradient(115.51deg, #EEF7FF -4.44%, #CDE8E5 128.04%)'
      },
      fontFamily: {
        'open-sans': ['Open Sans', 'sans-serif'],
      },
      lineHeight: {
        'custom-21.79': '21.79px',
        '27.24': '27.24px',
      },
      colors: {
        'secondary-heading-color': '#69817F',
        'dark-blue': '#4D869C',
      },
      fontWeight: {
        '700': '700',
      },
      fontSize: {
        '20': ['20px', '27.24px'],
      },
      colors: {
        gradientColor1: "#EEF7FF",
        gradientColor2: "#CDE8E5",
        accent: "#4D869C",
        secondaryAccent: "#CDE8E5",
        hover: "#EEF7FF",
        heading: "#16262D",
        secondaryHeading: "#69817F",
      },
      fontFamily: {
        roboto: ['"Roboto", sans-serif;'],
        openSans: ['"Open Sans", sans-serif;'],
      },
      boxShadow: {
        button: "0 6px 10px 0 rgba(0, 0, 0, 0.14)",
        buttonHover: "0 3px 6px 0 rgba(0, 0, 0, 0.15)",
        card: "0 10px 20px 0 rgba(0, 0, 0, 0.06)",
        table: "0 4px 10px 0 rgba(0, 0, 0, 0.03)",
      },
    },
  },
  plugins: [],
};
export default config;