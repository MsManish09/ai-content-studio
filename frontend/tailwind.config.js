import typography from '@tailwindcss/typography'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        subtleZoom: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.04)" }, // very subtle
        },
      },
      animation: {
        subtleZoom: "subtleZoom 2.8s ease-in-out infinite",
      },
    },
  },
  plugins: [typography],
}