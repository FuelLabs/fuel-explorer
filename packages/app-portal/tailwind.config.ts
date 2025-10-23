import preset from '@fuels/ui/tailwind-preset';
import type { Config } from 'tailwindcss';

export default {
  darkMode: 'selector',
  presets: [preset],
  content: [
    '../ui/src/**/*.{js,jsx,ts,tsx}',
    '../ui/tailwind.config.ts',
    '../app-commons/src/**/*.{js,jsx,ts,tsx}',
    './src/**/*.{js,jsx,ts,tsx}',
    './src/**/**/*.stories.{js,jsx,ts,tsx}',
  ],
  plugins: [],
} satisfies Config;
