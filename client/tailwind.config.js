/** @type {import('tailwindcss').Config} */
export default {
  content: [
      "./index.html",
      "./src/**/*.{js,jsx}"
  ],
  theme: {
      extend: {
          colors: {
              "delft-blue": "#2D3958",
              "vanilla": {
                  DEFAULT: "#FFF2A8",
                  dark: "#FFEA75"
              },
              "ghost-white": {
                  DEFAULT: "#F4F4F9",
                  dark: "#E5E5E5"
              },
              "jet": "#333333"
          }
      },
  },
  plugins: []
}

