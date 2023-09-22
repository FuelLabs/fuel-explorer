import type { Config } from 'tailwindcss';

import preset from './src/theme/tailwind-preset';

export default {
  presets: [preset],
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './src/**/**/*.stories.{js,jsx,ts,tsx}',
  ],
} satisfies Config;
