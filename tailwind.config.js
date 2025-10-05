/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
          DEFAULT: "15px",
      },
      },

    extend: {
      colors: {
        primary: '#1f2937',
        secondary: '#e7d2b4',
        accent: '#10B981',
      },
    },
  },

  plugins: [],

}

