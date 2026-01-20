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
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        elevated: 'var(--elevated)',
        text: 'var(--text)',
        muted: 'var(--muted)',
        border: 'var(--border)',
        accent: 'var(--accent)',
        'accent-muted': 'var(--accent-muted)',
        support: 'var(--support)',
        danger: 'var(--danger)',
        warning: 'var(--warning)',
        info: 'var(--info)',
      },
      fontSize: {
        '900': 'var(--fs-900)',
        '800': 'var(--fs-800)',
        '700': 'var(--fs-700)',
        '600': 'var(--fs-600)',
        '500': 'var(--fs-500)',
        '400': 'var(--fs-400)',
      },
      fontWeight: {
        '700': 700,
        '600': 600,
        '500': 500,
        '400': 400,
      },
      spacing: {
        '1': 'var(--space-1)',
        '2': 'var(--space-2)',
        '3': 'var(--space-3)',
        '4': 'var(--space-4)',
        '5': 'var(--space-5)',
        '6': 'var(--space-6)',
        '7': 'var(--space-7)',
        '8': 'var(--space-8)',
      },
      borderRadius: {
        '1': 'var(--radius-1)',
        '2': 'var(--radius-2)',
        '3': 'var(--radius-3)',
      },
      transitionDuration: {
        '1': 'var(--dur-1)',
        '2': 'var(--dur-2)',
        '3': 'var(--dur-3)',
      },
    },
  },
  plugins: [],
};
export default config;
