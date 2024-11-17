module.exports = {
  
    content: [
      "./index.html",
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        animation: {
          dropdown: 'dropdown 0.3s ease-in-out forwards'
        },
        keyframes: {
          dropdown: {
            '0%': { transform: 'scaleY(0)', opacity: 0 },
            '100%': { transform: 'scaleY(1)', opacity: 1 }
          }
        }
      }
    },
    plugins: [],
  }
  