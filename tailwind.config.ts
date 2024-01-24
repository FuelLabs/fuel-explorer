/**
 * This file is used by the tailwind telisense extension
 */
import config from './packages/app-explorer/tailwind.config';
import preset from './packages/ui/src/theme/tailwind-preset';

export default {
  ...config,
  presets: [preset],
};
