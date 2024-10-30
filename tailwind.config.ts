import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      manrope: ['Manrope', 'sans-serif'],
    },
    extend: {
      colors: {
        'primaryBlue': '#0085FE',
        'secondaryBlue': '#000032',
        'themeBlack': '#0f0f0f',
        'primaryGrey': '#B0B5B9',
        'secondaryGrey': '#191919',
        'backgroundGrey': '#f1f1f1',
        'cardGrey': '#e4e4e4',
        'ethereum': '#627EEA',
        'optimism': '#FF0420',
        'base': '#FBBB00',
        'polygon': '#8248D8',
        'arbitrum': '#00012C',
      }
    },
  },
  plugins: [],
}
export default config
