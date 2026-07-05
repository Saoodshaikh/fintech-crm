/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#0F4C81",
          primaryDark: "#0B3A63",
          secondary: "#2563EB",
          success: "#16A34A",
          danger: "#DC2626",
          warning: "#D97706",
          bg: "#F8FAFC",
        },
      },
      borderRadius: {
        xl: "12px",
      },
    },
  },
  plugins: [],
};
