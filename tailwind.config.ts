import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        zynthax: {
          bg: '#030712',
          card: '#0a0f1d',
          'card-hover': '#111e36',
          border: 'rgba(255, 255, 255, 0.08)',
          cyan: '#00f0ff',
          blue: '#3b82f6',
          purple: '#8b5cf6',
          magenta: '#d946ef',
          pink: '#f43f5e',
          text: '#f3f4f6',
          muted: '#9ca3af',
        },
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Inter', 'sans-serif'],
        display: ['var(--font-display)', 'Plus Jakarta Sans', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'radial-gradient(circle at 50% 30%, rgba(0, 240, 255, 0.15), rgba(139, 92, 246, 0.1) 40%, transparent 70%)',
        'cyan-purple-grad': 'linear-gradient(135deg, #00f0ff 0%, #8b5cf6 50%, #d946ef 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'float-reverse': 'floatReverse 7s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite alternate',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(15px)' },
        },
        glow: {
          '0%': { filter: 'drop-shadow(0 0 15px rgba(0, 240, 255, 0.4))' },
          '100%': { filter: 'drop-shadow(0 0 35px rgba(139, 92, 246, 0.7))' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

export default config;
