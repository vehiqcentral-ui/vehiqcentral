import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          indigo: '#2D2E80',
          navy: '#112337',
          teal: '#0FAFA9',
          gold: '#FFD700',
          muted: '#585E6A',
          body: '#4D4D4D',
          border: '#E4E4E4',
          'alt-bg': '#F9F9F9',
        },
        pastel: {
          purple: '#F0EEFF',
          blue: '#E8F6FA',
          peach: '#FFF3E8',
          mint: '#E6FAF9',
        },
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'system-ui', 'sans-serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        card: '16px',
        button: '8px',
      },
    },
  },
  plugins: [],
};

export default config;
