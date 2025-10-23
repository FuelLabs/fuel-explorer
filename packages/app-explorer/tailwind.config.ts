import preset from '@fuels/ui/tailwind-preset';
import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

export default {
  darkMode: 'selector',
  presets: [preset],
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    '../app-commons/src/**/*.{js,jsx,ts,tsx}',
    '../app-portal/src/**/*.{js,jsx,ts,tsx}',
    '../app-staking/src/**/*.{js,jsx,ts,tsx}',
    '../ui/src/**/*.{js,jsx,ts,tsx}',
  ],
  plugins: [
    plugin(({ addComponents }) => {
      addComponents({
        '.hero-bg': {
          background:
            'url(/logo-faded.svg) no-repeat -40px center, var(--hero-bg)',
          backgroundSize: 'auto 100%',
        },
      });
    }),
  ],
} satisfies Config;
