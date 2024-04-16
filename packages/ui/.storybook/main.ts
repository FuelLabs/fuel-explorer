import type { StorybookConfig } from '@storybook/react-vite';
import { type UserConfig, mergeConfig } from 'vite';
import tsconfigpath from 'vite-tsconfig-paths';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-storysource',
    '@storybook/addon-a11y',
    'storybook-addon-theme/register',
  ],
  staticDirs: ['../public'],
  core: {
    disableTelemetry: true,
    builder: '@storybook/builder-vite',
  },
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  typescript: {
    check: false,
    reactDocgen: 'react-docgen',
  },
  swc: (_config, _options) => ({
    jsc: {
      transform: {
        react: {
          runtime: 'automatic',
        },
      },
    },
  }),
  async viteFinal(config: UserConfig) {
    return mergeConfig(config, {
      plugins: [tsconfigpath()],
      define: {
        __STORYBOOK_FUEL_UI__: '"true"',
      },
    });
  },
};
export default config;
