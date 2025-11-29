/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // nền tổng thể
        "night": "#050816",
        "night-soft": "#090d1f",

        // accent
        "neon-cyan": "#32f5ff",
        "neon-pink": "#ff5bf1",
        "neon-purple": "#a855ff",
        "text-dim": "#9ca3af",
      },
      boxShadow: {
        "neon": "0 0 25px rgba(50,245,255,0.4)",
        "neon-soft": "0 0 18px rgba(168,85,255,0.35)",
      },
      backgroundImage: {
        "radial-grid":
          "radial-gradient(circle at top, rgba(50,245,255,0.25), transparent 55%), radial-gradient(circle at bottom, rgba(168,85,255,0.25), transparent 55%)",
      },
    },
  },
  plugins: [],
};
