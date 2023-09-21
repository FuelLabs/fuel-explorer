import preset from '@fuel-explorer/ui/tailwind-preset';
import type { Config } from 'tailwindcss';

export default {
  presets: [preset],
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './src/**/**/*.stories.{js,jsx,ts,tsx}',
  ],
} satisfies Config;
