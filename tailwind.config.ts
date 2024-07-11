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
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
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
