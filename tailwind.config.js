/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements-react/dist/js/**/*.js"
  ],
  theme: {
    colors: {
      StrongBlue: '#001466',
      StrongBlue01: '#001980',
      StrongBlue02: '#324699',
      StrongBlueHover: '#B2BAD8',
      NeutralBlue: '#005573',
      MineralGreen: '#00aa9b',
      MineralGreen01: '#66CCC3',
      AccentRed: '#f04641',
      BGAccentRed: '#F6908D',
      white: '#ffffff',
    },
    extend: {},
  },
  plugins: [
    require("tw-elements-react/dist/plugin.cjs"),
  ],
}

