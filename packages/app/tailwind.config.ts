import preset from '@fuels/ui/tailwind-preset';
import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

export default {
  presets: [preset],
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './src/**/**/*.stories.{js,jsx,ts,tsx}',
  ],
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        '.hero-bg': {
          background:
            'url(/logo-faded.svg) no-repeat -40px center, var(--hero-bg)',
          backgroundSize: 'auto 100%',
        },
      });
    }),
  ],
  corePlugins: {
    preflight: false,
  },
} satisfies Config;
