module.exports = {
  
    content: [
      "./index.html",
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        animation: {
          'fadeIn': 'fadeIn 0.5s ease-out',
          'glow': 'glow 1.5s infinite',
          'glow-1': 'glow 1.5s infinite 0.2s',
          'glow-2': 'glow 1.5s infinite 0.4s',
          'glow-3': 'glow 1.5s infinite 0.6s',
          dropdown: 'dropdown 0.3s ease-in-out forwards'
        },
        keyframes: {
          dropdown: {
            '0%': { transform: 'scaleY(0)', opacity: 0 },
            '100%': { transform: 'scaleY(1)', opacity: 1 }
          },
                  fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        glow: {
          '0%, 100%': { 
            boxShadow: '0 0 5px rgba(59, 130, 246, 0.3)',
            transform: 'scale(1)'
          },
          '50%': { 
            boxShadow: '0 0 20px rgba(59, 130, 246, 0.7)',
            transform: 'scale(1.05)'
          }
        }
        }
      }
      
    },
    variants: {
      extend: {}
    },
    plugins: [],
  }
  