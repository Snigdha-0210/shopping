/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: '#FAF8F5',
          100: '#F5F2EB',
          200: '#EFECE6',
          300: '#E5DFC5',
          400: '#DDD5C7',
          500: '#C8BEAF',
        },
        sand: {
          light: '#F8F6F0',
          DEFAULT: '#EBE6DD',
          dark: '#DDD5C7',
        },
        taupe: {
          light: '#E2D7CF',
          DEFAULT: '#C4B5A5',
          dark: '#9E8B7A',
        },
        blush: {
          light: '#FAF0ED',
          DEFAULT: '#E8D5CE',
          dark: '#CFABA0',
        },
        bronze: {
          DEFAULT: '#9A7B56',
          dark: '#7A5E3F',
        },
        charcoal: {
          50: '#F6F6F6',
          100: '#E7E7E7',
          200: '#D1D1D1',
          300: '#B0B0B0',
          400: '#888888',
          500: '#666666',
          600: '#444444',
          700: '#2C2B2A',
          800: '#21201F',
          900: '#171615',
          950: '#0F0E0E',
        },
        gold: {
          light: '#F4E8C1',
          DEFAULT: '#C9A96E',
          dark: '#A68345',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 2px 10px rgba(0, 0, 0, 0.03)',
        'soft': '0 8px 30px rgba(0, 0, 0, 0.05)',
        'elevated': '0 20px 40px -15px rgba(28, 25, 23, 0.08)',
        'glow': '0 0 25px rgba(201, 169, 110, 0.25)',
      },
      animation: {
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
      },
      keyframes: {
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        }
      }
    },
  },
  plugins: [],
}

