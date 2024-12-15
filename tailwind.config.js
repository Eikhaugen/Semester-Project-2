/** @type {import('tailwindcss').Config} */
export default {
  content: ["./**/*.{html,js,ts}", "!./node_modules/**/*"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1D4ED8', 
          light: '#3B82F6',   
          dark: '#1E40AF',    
        },
        secondary: {
          DEFAULT: '#9333EA',
          light: '#A855F7',
          dark: '#7E22CE',
        },
        text: {
          DEFAULT: '#111827', 
          light: '#374151',   
          muted: '#6B7280',   
        },
        accent: {
          DEFAULT: '#F59E0B',  
          light: '#FBBF24',
          dark: '#D97706',
        },
        background: {
          DEFAULT: '#F3F4F6', 
          light: '#F9FAFB',
          dark: '#E5E7EB',
        },
        
      },
      backgroundImage: {
        'promo-bg': "url('sign-up-promo.jpg')"
      },
    },
  },
  plugins: [],
}
