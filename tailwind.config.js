/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          beige: '#F4EDE4',
          'off-white': '#FFFBF7',
        },
        accent: {
          pink: '#F6D9E6',
          sage: '#C8D3C0',
        },
        text: {
          brown: '#6F4E37',
          'deep-brown': '#2B1E16',
        },
      },
      borderRadius: {
        'arete': '12px',
        'arete-lg': '16px',
      },
      spacing: {
        'arete': '8px',
      },
      transitionDuration: {
        'arete': '200ms',
      },
      transitionTimingFunction: {
        'arete': 'ease',
      },
      boxShadow: {
        'arete': '0 4px 6px -1px rgba(111, 78, 55, 0.1), 0 2px 4px -1px rgba(111, 78, 55, 0.06)',
        'arete-lg': '0 10px 15px -3px rgba(111, 78, 55, 0.1), 0 4px 6px -2px rgba(111, 78, 55, 0.05)',
      },
      fontFamily: {
        'heading': ['Inter', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
