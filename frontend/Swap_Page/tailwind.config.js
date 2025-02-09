/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'bounce-soft': 'bounce 3s infinite ease-in-out',
        'fade-in-up': 'fadeInUp 0.5s ease-out forwards',
        'gradient-x': 'gradient-x 3s ease infinite',
        'confetti-0': 'confetti-0 3s ease-in-out infinite',
        'confetti-1': 'confetti-1 3s ease-in-out infinite',
        'confetti-2': 'confetti-2 3s ease-in-out infinite',
        'confetti-3': 'confetti-3 3s ease-in-out infinite',
        'confetti-4': 'confetti-4 3s ease-in-out infinite',
      },
      keyframes: {
        'fadeInUp': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        'confetti-0': {
          '0%': { transform: 'translate(0, 0) rotate(0deg)' },
          '100%': { transform: 'translate(50px, 100vh) rotate(360deg)' }
        },
        'confetti-1': {
          '0%': { transform: 'translate(0, 0) rotate(0deg)' },
          '100%': { transform: 'translate(-50px, 100vh) rotate(-360deg)' }
        },
        'confetti-2': {
          '0%': { transform: 'translate(0, 0) rotate(0deg)' },
          '100%': { transform: 'translate(70px, 100vh) rotate(720deg)' }
        },
        'confetti-3': {
          '0%': { transform: 'translate(0, 0) rotate(0deg)' },
          '100%': { transform: 'translate(-70px, 100vh) rotate(-720deg)' }
        },
        'confetti-4': {
          '0%': { transform: 'translate(0, 0) rotate(0deg)' },
          '100%': { transform: 'translate(30px, 100vh) rotate(540deg)' }
        },
      },
    },
  },
  plugins: [],
}

