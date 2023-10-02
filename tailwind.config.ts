/**
 * This file is used by the tailwind telisense extension
 */
import config from './packages/app/tailwind.config';
import preset from './packages/ui/dist/theme';

export default {
  ...config,
  presets: [preset],
};
