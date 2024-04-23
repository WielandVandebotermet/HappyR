/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements-react/dist/js/**/*.js"
  ],
  theme: {
    colors: {
      StrongBlue: '#232d4b',
      NeutralBlue: '#005573',
      MineralGreen: '#00aa9b',
      AccentRed: '#f04641',
    },
    extend: {},
  },
  plugins: [
    require("tw-elements-react/dist/plugin.cjs"),
  ],
}

