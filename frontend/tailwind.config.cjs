/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        royal: {
          50: '#f2fbf4',
          100: '#e3f6e7',
          200: '#c1eccd',
          300: '#8fdca7',
          400: '#55c878',
          500: '#2eaa55',
          600: '#166534', // Royal Green (brand primary)
          700: '#115128',
          800: '#0f4022',
          900: '#0c331c',
        },
        gold: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#facc15', // brand accent
          600: '#d1a512',
          700: '#a17e0e',
          800: '#7a600b',
          900: '#5f4b09',
        },
        surface: {
          DEFAULT: '#f9fafb', // Soft white background
          dark: '#0b0b0f',
        },
      },
      fontFamily: {
        heading: ['"Playfair Display"', 'ui-serif', 'Georgia', 'serif'],
        display: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        body: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 30px rgba(2, 6, 23, 0.08)',
        glowGold:
          '0 0 0 1px rgba(250, 204, 21, 0.35), 0 18px 60px rgba(250, 204, 21, 0.20)',
        glowGreen:
          '0 0 0 1px rgba(22, 101, 52, 0.35), 0 18px 60px rgba(22, 101, 52, 0.18)',
      },
      borderRadius: {
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
      backgroundImage: {
        hero:
          'radial-gradient(1200px 600px at 10% 10%, rgba(250, 204, 21, 0.18), transparent 60%), radial-gradient(900px 500px at 80% 20%, rgba(22, 101, 52, 0.22), transparent 65%), linear-gradient(180deg, rgba(249, 250, 251, 1), rgba(249, 250, 251, 0.85))',
        heroDark:
          'radial-gradient(1200px 600px at 10% 10%, rgba(250, 204, 21, 0.16), transparent 60%), radial-gradient(900px 500px at 80% 20%, rgba(22, 101, 52, 0.22), transparent 65%), linear-gradient(180deg, rgba(11, 11, 15, 1), rgba(11, 11, 15, 0.82))',
      },
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
}

