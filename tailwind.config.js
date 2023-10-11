/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      textColors: {
        'primary': 'var(--color-text-primary)',
        'secondary': 'var(--color-text-secondary)',
      },
      fontFamily: {
        'sans': ['"Open Sans"', 'sans-serif'],
        'serif': ['"Playfair Display"', 'serif'],
      },
      backgroundColor: {
        'primary': 'var(--color-bg-primary)',
        'primary-light': 'var(--color-bg-primary-light)',
        'secondary': 'var(--color-bg-secondary)',
        'secondary-light': 'var(--color-bg-secondary-light)',
        'accent': 'var(--color-bg-accent)',
      },
      borderColor: {
        'primary': 'var(--color-border-primary)',
        'secondary': 'var(--color-border-secondary)',
      },
      backgroundImage: {
        'theme': 'url(@/assets/hero.jpg)',
      },
    },
  },
  plugins: [],
}