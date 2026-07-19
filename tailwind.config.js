/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // --- Legacy token names (kept so nothing breaks), remapped to the darker palette ---
        "primary-bg-color": "#0E0A1C",
        "light-bg-color": "#2A2040",
        "button-bg-color": "#8B63E3",
        "highlighted-btn-bg": "#7BBFF2",

        // --- Refined system (darker ground, violet-biased neutrals) ---
        ground: {
          DEFAULT: "#070510",
          900: "#0B0816",
          800: "#0E0A1C",
          700: "#150E28",
          600: "#1E1638",
        },
        violet: {
          300: "#CBBAF5",
          400: "#B79DF0",
          500: "#A584EB",
          600: "#8B63E3",
          700: "#6D42BE",
        },
        sky: "#7BBFF2",
        ink: {
          hi: "#F1EEF8", // headings / high contrast
          DEFAULT: "#BDB4D0", // body
          low: "#8E85A5", // muted
          faint: "#5F5878", // faintest / disabled
        },
        state: {
          success: "#34D399",
          warning: "#FBBF24",
          danger: "#FB7185",
          info: "#7BBFF2",
        },
      },
      fontFamily: {
        sans: ['"Poppins"', '"Segoe UI"', "system-ui", "-apple-system", "sans-serif"],
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      boxShadow: {
        "custom-shadow": "0 0 0.3rem #000",
        card: "0 8px 30px rgba(0,0,0,0.35)",
        glow: "0 10px 30px rgba(139,99,227,0.22)",
        "glow-sky": "0 10px 30px rgba(123,191,242,0.18)",
      },
      screens: {
        mediumPhone: "420px",
        tablets: "525px",
        lgScreen: "1350px",
      },
      keyframes: {
        shimmer: { "100%": { transform: "translateX(100%)" } },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
      },
      animation: {
        shimmer: "shimmer 1.5s infinite",
        "fade-up": "fade-up 0.6s ease forwards",
        "fade-in": "fade-in 0.5s ease forwards",
      },
    },
  },
  plugins: [],
};
