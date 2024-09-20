import type { StorybookConfig } from '@storybook/react-vite';
import { UserConfig, mergeConfig } from 'vite';
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
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        'next/link': require.resolve('../__mocks__/next/link.tsx'),
        'next/navigation': require.resolve('../__mocks__/next/navigation.tsx'),
      };
    }
    return mergeConfig(config, {
      plugins: [tsconfigpath()],
      define: {
        __STORYBOOK_FUEL_UI__: '"true"',
      },
    });
  },
};
export default config;
