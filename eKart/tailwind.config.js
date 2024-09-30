/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#434955", // Dark Gray
        secondary: "#677079", // Light Gray
        tertiary: "#88878D", // Lighter Gray
        rating: "FECE22", // Rating stars
        pred: "#D62E2E", // Primary Redw
        Lwhite: "#BFAFAF", // lighter white
        h_f_gray: "#434955", // Header & Footer gray
        bgwhite: "#D9D9D9", // lIGHT bACKGROUND
        darkblack: "#434955", // Buttons
      },
      fontFamily: {
        cursive: ["Dancing Script", "cursive"],
      },
    },
  },
  plugins: [],
};
