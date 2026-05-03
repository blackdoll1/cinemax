/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Bebas Neue"', 'cursive'],
        body: ['"DM Sans"', 'sans-serif'],
      },
      colors: {
        cinema: {
          black:    '#0A0A0A',
          surface:  '#141414',
          surface2: '#1E1E1E',
          surface3: '#2A2A2A',
          border:   '#2E2E2E',
          muted:    '#888888',
          text:     '#F0EAE0',
          red:      '#8B0000',
          'red-mid': '#A51C1C',
          'red-bright': '#C0392B',
          'red-glow':   '#E74C3C',
        },
      },
    },
  },
  plugins: [],
};
