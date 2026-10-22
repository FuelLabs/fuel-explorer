import preset from '@fuels/ui/tailwind-preset';
import type { Config } from 'tailwindcss';

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
} satisfies Config;
